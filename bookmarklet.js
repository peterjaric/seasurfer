(function(){
    var w = window.open();
    getScripts(['http://code.jquery.com/jquery-1.7.2.min.js', 
		'http://localhost:8080/seasurfer.js'],
//		'https://raw.github.com/peterjaric/seasurfer/v3/seasurfer.js'],
	       function() {
		   // Remove all global traces of our newly loaded
		   // jQuery and then run the seaSurfer
		   jQuery.noConflict(true)(function(jQuery) {
		       seaSurfer(jQuery, w, location.hostname);
		   });
	       });
    
    // getScript() by paul irish
    // http://pastie.org/462639
    // modified to load many scripts
    function getScripts(urls, success){
        var head = document.getElementsByTagName('head')[0],
            done = false,
            script = document.createElement('script');
	script.src = urls.shift();

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = 
	    function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
		    if (urls.length === 0 ) { 
			success();
		    } else {
			getScripts(urls, success);
		    }
		}
            };
        head.appendChild(script);
    }
})();

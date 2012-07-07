(function(){
    var repo = 'https://raw.github.com/peterjaric/seasurfer';
    var branch = 'v3';

    // getScript() by paul irish
    // http://pastie.org/462639
    function getScript(url, success){
        var head = document.getElementsByTagName("head")[0],
        done = false;
        var script = document.createElement("script");
        script.src = url;
         
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                success();
            }
        };
        head.appendChild(script);
    }

    getScript('http://code.jquery.com/jquery-1.7.2.min.js', function() {
        // Remove all global traces of our newly loaded
        // jQuery and then run the seaSurfer
        jQuery.noConflict(true)(function(jQuery) {
	    getScript(repo + '/' + branch + '/seasurfer.js', function() {
		seaSurfer(jQuery);
            });
        });
    });
})();

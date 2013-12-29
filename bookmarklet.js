(function(){
    var version = 2;
    var w = window.open();
     
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
     
    function seaSurfer($) {
        function convertToHidden(elem) {
            return '<input name="' + elem.attr('name') + '" value="' + elem.val() + '" type="hidden"/>';
        }
         
        var body = $(w.document.body);
        body.append('<h1>Sea Surfer v' + version + '</h1><p>By <a href="http://twitter.com/peterjaric">@peterjaric</a> at <a href="http://javahacker.com">javahacker.com</a>.</p>');
         
        // Create test entry for each form on the page
        $('form').each(function(i) {
            var form, formInputs, inputs, area, desc, script, a, autoSubmit, formHtml;
            form = $(this).clone();
             
            // Some info about the form
            desc = '<h2>Form ' + (i + 1) + ' (' + form.attr('action') + ')</h2>';
            body.append(desc);
 
            // Prepare the form code
            a = document.createElement('a');
            a.href = form.attr('action');
            form.attr('action', a.href);
            form.removeAttr('onsubmit');
            form.removeAttr('class');
            form.removeAttr('style');
 
            // Find the current inputs (etc) of the form, only caring about the current values
            formInputs = 'input[type=text],input[type=hidden],input[type=password],input:checked,select,textarea';
            inputs = $(this).find(formInputs); // using $(this) instead of form since clone doesn't clone textarea values
 
            // Replace them with hidden inputs (and some formatting)
            form.empty();
            form.append('\n');
            inputs.each(function() {
                console.log($(this).val());
                form.append('  ' + convertToHidden($(this)) + '\n');
            });
 
            // Create a textarea and insert the form and some code that will auto submit the form later
            area = $('<textarea id=\'area' + i + '\' cols=120 rows=20>');
            autoSubmit = '<script>document.getElementsByTagName(\'form\')[0].submit();</script>';
            formHtml = form.wrap('<div>').parent().html();
            area.text(formHtml + autoSubmit);
            body.append(area);
 
            // Create a button that will open a new window that will submit the form
            script = 'javascript:function insertAfter(newChild,refChild){refChild.parentNode.insertBefore(newChild,refChild.nextSibling);} var area = document.getElementById(\'area' + i + '\'); var csrfWin = window.open();  csrfWin.document.write(area.value);';
            body.append('<br/><input type=submit value="Test vulnerability" onclick="' + script + '"/><br/>');
        });
    }
 
 
    getScript('//code.jquery.com/jquery-1.7.2.min.js', function() {
        // Remove all global traces of our newly loaded
        // jQuery and Then run the seaSurfer
        jQuery.noConflict(true)(function(jQuery) {
            seaSurfer(jQuery);
        });
    });
})();

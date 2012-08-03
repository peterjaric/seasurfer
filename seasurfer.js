function seaSurfer($, w, hostname) {
    function createSimpleInput(inputElem) {
	var name = inputElem.attr('name');
	// Escape quotes to avoid breaking out of the value attribute when looking for XSS vulns
	var value = inputElem.val().replace('"', '&quot;');
        return '<input name="' + name + '" value="' + value + '" type="hidden"/>';
    }
    
    var version = '3',
        body = $(w.document.body),
        links,
        foundLinks = false;

    body.append('<h1>Sea Surfer v' + version + '</h1><p>By <a href="http://twitter.com/peterjaric">@peterjaric</a> at <a href="http://javahacker.com">javahacker.com</a>.</p>');
    
    // Create a test entry for each internal link on the page
    links = $('<div id="links">');
    $('a').each(function(i) {
	if (this.hostname === hostname && this.search) {
	    foundLinks = true;
            // Prepare the form code
            var submit, input = $('<input id="link' + i + '" type="text" size="160">');
	    input.val(this.href);
            links.append(input);
            script = 'javascript:var input = document.getElementById(\'link' + i + '\'); window.open(input.value);';
            links.append('<input type=submit value="Test vulnerability" onclick="' + script + '"/><br/>');
	}
    });
    if (foundLinks) {
	body.append('<p id="showLinks"><a onclick="javascript:document.getElementById(\'links\').style.display=\'block\'; document.getElementById(\'showLinks\').style.display=\'none\';">Click to show internal links</a></p>');
	body.append(links);
	links.hide();
    }

    // Create a test entry for each form on the page
    $('form').each(function(i) {
        var form, formInputs, inputs, area, desc, script, a, autoSubmit, formHtml, action;
        form = $(this).clone();
        action = form.attr('action') || ''

        // Prepare the form code
        a = document.createElement('a');
        a.href = action;
        form.attr('action', a.href);
        form.removeAttr('onsubmit');
        form.removeAttr('class');
        form.removeAttr('style');

        // Some info about the form
        desc = '<h2>Form ' + (i + 1) + ' (' + a.href + ')</h2>';
        body.append(desc);
	
        // Find the current inputs (etc) of the form, only caring about the current values
        formInputs = 'input[type=text],input[type=hidden],input[type=password],input:checked,select,textarea';
        inputs = $(this).find(formInputs); // using $(this) instead of form since clone doesn't clone textarea values
	
        // Replace them with hidden inputs (and some formatting)
        form.empty();
        form.append('\n');
        inputs.each(function() {
            form.append('  ' + createSimpleInput($(this)) + '\n');
        });

        // Create a textarea and insert the form and some code that will auto submit the form later
        area = $('<textarea id=\'area' + i + '\' cols=120 rows=20>');
        autoSubmit = '<script>document.getElementsByTagName(\'form\')[0].submit();</script>';
        formHtml = form.wrap('<div>').parent().html();
        area.text(formHtml + '\n' + autoSubmit);
        body.append(area);

        // Create a button that will open a new window that will submit the form
        script = 'javascript:var area = document.getElementById(\'area' + i + '\'); var csrfWin = window.open();  csrfWin.document.write(area.value);';
        body.append('<br/><input type=submit value="Test vulnerability" onclick="' + script + '"/><br/>');
    });
}


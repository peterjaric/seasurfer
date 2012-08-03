seasurfer
=========

Drag this bookmarklet to your bookmarks bar: [Sea Surfer v3][1]


[1]: javascript:(function(){(function(){var%20w=window.open();getScripts(['http://code.jquery.com/jquery-1.7.2.min.js','https://raw.github.com/peterjaric/seasurfer/v3/seasurfer.js'],function(){jQuery.noConflict(true)(function(jQuery){seaSurfer(jQuery,w,location.hostname);});});function%20getScripts(urls,success){var%20head=document.getElementsByTagName('head')[0],done=false,script=document.createElement('script');script.src=urls.shift();script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=='loaded'||this.readyState=='complete')){done=true;if(urls.length===0){success();}else{getScripts(urls,success);}}};head.appendChild(script);}})();})();


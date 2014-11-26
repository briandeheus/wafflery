window.onload = function () {

	var settings = window.settings;
	var loader   = document.getElementById('loader');
	var fillers  = {
		views:   document.getElementById('views'),
		dialogs: document.getElementById('dialogs'),
		app:      document.getElementById('app')
	};

	function addStyles(style) {
		var f  = document.createElement('style');
		f.textContent = style;
		fillers.app.appendChild(f);
	}

	function addScript(script) {
		var f  = document.createElement('script');
		f.textContent = script;
		fillers.app.appendChild(f);
	}

	function addViews(html) {
		fillers.views.innerHTML = html;
	}

	function fetch(type, onSuccess, cb) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {

			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

				
				onSuccess(xmlHttp.responseText);

				if (typeof cb === 'function') {
					cb();
				}

			} else if (xmlHttp.readyState === 0) {

				alert('Failed to fetch ' + type);
				return;

			}

		}

		xmlHttp.open("GET", window.settings.host + '/' + type , false);
		xmlHttp.send();

	}

	fetch('styles', addStyles, function () {

		fetch('views', addViews, function () {

			fetch('js', addScript);

		});

	});

	
}

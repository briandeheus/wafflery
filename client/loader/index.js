window.onload = function () {

	var settings = window.settings;
	var URL      = settings.urls[settings.mode];
	
	var loader   = document.getElementById('loader');
	var fillers  = {
		views:    document.getElementById('views'),
		dialogs:  document.getElementById('dialogs'),
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


	function fetchAndCompareHash(type, cb) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {

			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

				var hash  = xmlHttp.responseText;
				var cHash = localStorage.getItem('cache/hash/' + type);

				if (cHash !== hash) {

					console.debug('Fetching', type, 'because the hash is different', hash, cHash);
					localStorage.setItem('cache/hash/' + type, hash);
					cb(null, true);

				} else {

					console.debug('Serving', type, 'from cache because the hash is the same', hash, cHash);
					cb(null, false);

				}

			} else if (xmlHttp.readyState === 0) {

				alert('Failed to fetch ' + type);
				return;

			}

		}

		xmlHttp.open("GET", URL + '/' + type + '/version', false);
		xmlHttp.send();

	}

	function fetch(type, onSuccess, cb) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {

			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

				localStorage.setItem('cache/' + type, xmlHttp.responseText);
				onSuccess(xmlHttp.responseText);

				if (typeof cb === 'function') {
					cb();
				}

			} else if (xmlHttp.readyState === 0) {

				alert('Failed to fetch ' + type);
				return;

			}

		}

		xmlHttp.open("GET", URL + '/' + type , false);
		xmlHttp.send();

	}

	function fetchStyles() {

		fetchAndCompareHash('css', function (error, shouldUpdate) {

			if (shouldUpdate) {

				fetch('css', addStyles, fetchViews);
				return;

			}

			addStyles(localStorage.getItem('cache/css'));
			fetchViews();

		});

	}

	function fetchViews() {

		fetchAndCompareHash('html', function (error, shouldUpdate) {

			if (shouldUpdate) {

				fetch('html', addViews, fetchJS);
				return;

			}

			addViews(localStorage.getItem('cache/html'));
			fetchJS();

		});

	}

	function fetchJS() {

		fetchAndCompareHash('js', function (error, shouldUpdate) {

			if (shouldUpdate) {

				fetch('js', addScript);
				return;

			}

			addScript(localStorage.getItem('cache/js'));

		});

	}

	fetchStyles();
	
}

exports.views      = {};
var activeView;


function hide(elm) {
	elm.className = 'view';
}

function show(elm) {
	elm.className = 'view active';
}

exports.switchView = function (viewname, data) {

	hide(activeView.elm);
	activeView = exports.views[viewname]

	window.scrollTo(0, 0)

	if (typeof activeView.beforeload === 'function') {

		if (exports.views.spinner) {
			show(exports.views.spinner.elm);
		}

		activeView.beforeload(data, function () {

			hide(exports.views.spinner.elm);
			show(activeView.elm);

		});

	} else {

		window.scrollTo(0, 0)
		show(activeView.elm);

	}
	
};

exports.addView = function (name, elm, active) {

	exports.views[name] = {
		elm: elm,
		onload: null,
		onsetup: null,
		onleave: null,
		buttons: {},
		inputs: {},
		vars: {},
		getInput: function (inputName) {
			return exports.views[name].inputs[inputName].value;
		},
		setVar: function (varName, value) {
			exports.views[name].vars[varName].textContent = value
		},
		makeActive: function () {
			activeView = exports.views[name]
			show(elm);
		}
	};

	var buttons = elm.querySelectorAll('[data-button]');

	for (var i = 0, l = buttons.length; i < l; i++) {

		var btn = buttons[i];
		exports.views[name].buttons[btn.dataset.button] = new exports.Button(btn);

	}

	var inputs = elm.querySelectorAll('input');

	for (i = 0, l = inputs.length; i < l; i++) {

		var input = inputs[i];
		exports.views[name].inputs[input.name] = input;

	}

	var vars = elm.querySelectorAll('var');

	for (i = 0, l = vars.length; i < l; i++) {

		var v = vars[i];
		exports.views[name].vars[v.getAttribute('name')] = v;

	}


	if (active) {
		activeView = exports.views[name];
		elm.className = elm.className + ' active';
	}

	return exports.views[name];

};

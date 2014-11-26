var touchEvent = ('ontouchstart' in document) ? 'touchend' : 'click'
var dragging   = false;

var startX = 0;
var startY = 0;

var checkX = 'clientX';
var checkY = 'clientY';

if (touchEvent === 'touchend') {

    document.addEventListener('touchstart', function (evt) {

        console.log('touchstart');
        startX = event.changedTouches[0][checkX];
        startY = event.changedTouches[0][checkY];

    });

    document.addEventListener('touchmove', function (evt) {

        if (Math.abs(event.changedTouches[0][checkX] - startX) > 20 || Math.abs(event.changedTouches[0][checkY] - startY) > 20) {

            dragging = true;

        }

    });

    document.addEventListener('touchend', function (evt) {

        dragging = false;    

    });

}


exports.Button = function (element) {

    var that = this;
    this.elm = element;
    
	element.addEventListener(touchEvent, function (event) {

	    if (dragging) {

    	    return;

	    }
	    
	    that.ontap();
	
	}, false);

}
// THIS IS THE JAVASCRIPT TEMPLATE

(function(window) {

    application = function(caller) {

        /**
         * Holds the instance of the class that called this 
         * 
         * @property currentSection
         * @type {class}
         */
        this.caller = caller;

        /**
         * Initialize the class 
         *
         * @private
         * @method init
         */

        this.init();

    }

    application.prototype.init = function() {

        //Get the hright of the window
        console.log("Class has been created: " + this.caller);

    };

})(window);


/*********************
 * 
 * Called when the page starts scrolling
 *
 **********************/

function beginPageScroll() {
    console.log("beginPageScroll: ");
}

/*********************
 * 
 * Called when the page stops scrolling
 *
 **********************/

function endPageScroll() {

    console.log("endPageScroll: ");

    //Reset animation... I need a flag to allow for this to be set in the DIV	
    if (_allax.checkSectionPlayed("animation_nav")) {

        //console.log("reseting club section");
        //_allax.resetSection("ourClub_nav");

    }

}

/*********************
 * 
 * Called when the header design changes from the full header to the menu header
 *
 **********************/

function headerChange() {

    console.log("Form application.js header changed: " + $("#headerImages"));

    //Hide rotating images when the inside header is shown
    $("#headerImages").toggle();

}

/*********************
 * 
 * Called when the page gets to the "about" section
 *
 **********************/

function text_nav() {

    console.log("     text_nav Section");

}

/*********************
 * 
 * Called when the page gets to the "Our Club" section
 *
 **********************/

function animation_nav() {

    var w = $(window).width();

    var leftPos = (((w / 3) - 150) / w) * 100;


    var rightPos = ((((w / 3) * 2) - 150) / w) * 100;

    $("#leftOne").delay(0).animate({ left: (leftPos + '%') }, 1000);
    $("#rightOne").delay(500).animate({ left: (rightPos + '%') }, 1000);

    $("#leftTwo").delay(1000).animate({ left: (leftPos + '%') }, 1000);
    $("#rightTwo").delay(1500).animate({ left: (rightPos + '%') }, 1000);

    $("#leftThree").delay(2000).animate({ left: (leftPos + '%') }, 1000);
    $("#rightThree").delay(2500).animate({ left: (rightPos + '%') }, 1000);

    console.log("leftOne: " + $("#leftOne"))

}

/*********************
 * 
 * Called when the page gets to the "Events" section
 *
 **********************/

function events_nav() {

    console.log("     Events Section: ");

}

/*********************
 * 
 * Called when the events has finished loading and formating (this is called from events.js)
 *
 **********************/

function eventsCompleted() {

    console.log("     eventsCompleted");


    //$( "#accordion" ).accordion({ 

    //heightStyle: "content" 

    //});

}
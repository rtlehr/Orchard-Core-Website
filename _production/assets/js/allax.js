/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

(function(window) {

    /**
     * Returns the type of device user is looking at the page on. 
     * 
     * @property isMobile
     * @type {Boolean}
     */

    var isMobile = {

        Android: function() {

            return navigator.userAgent.match(/Android/i);

        },
        BlackBerry: function() {

            return navigator.userAgent.match(/BlackBerry/i);

        },
        iOS: function() {

            return navigator.userAgent.match(/iPhone|iPad|iPod/i);

        },
        Opera: function() {

            return navigator.userAgent.match(/Opera Mini/i);

        },
        Windows: function() {

            return navigator.userAgent.match(/IEMobile/i);

        },
        any: function() {

            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());

        }

    };

    /**
     * Base class for allax
     *
     * @class allax
     */

    allax = function() {

        /**
         * Holds the scrollTop position 
         * 
         * @property currentSection
         * @type {Number}
         * @default 0
         */
        this.windowPos = 0;

        /**
         * Holds the last page section that was scrolled to. 
         * 
         * @property currentSection
         * @type {String}
         * @default ""
         */
        this.currentSection = "";

        /**
         * Holds the height of the window (used to determin how fast each section is animated to) 
         * 
         * @property windowHeight
         * @type {Number}
         * @default 0
         */
        this.windowHeight = 0;

        /**
         * Holds which menu is being showen
         * true = show the menu when the page is at the top
         * false = show the menu when the page is at a section 
         * 
         * @property isMainMenuDefault
         * @type {Boolean}
         * @default true
         */
        this.isMainMenuDefault = true;

        //Holds the width when the mobile view should be showen
        /**
         * DESCRIPTION 
         * 
         * @property currentSection
         * @type {String}
         * @default ""
         */
        this.mobilWidth = 1050;

        /**
         * Holds the scrollTop position of the page 
         * 
         * @property scroll
         * @type {Number}
         * @default 0
         */
        this.scroll = 0;

        /**
         * Holds the width the desktop design sholud be used 
         * this shouldbe the same size as the desktop css media query
         * 
         * @property desktopSize
         * @type {Number}
         * @default 0
         */
        this.desktopSize = 0;

        /**
         * Holds the width the tablet design sholud be used 
         * this shouldbe the same size as the tablet css media query
         * 
         * @property tabletSize
         * @type {Number}
         * @default 0
         */
        this.tabletSize = 0;

        /**
         * Holds the width the mobil design should be used 
         * this shouldbe the same size as the mobile css media query
         * 
         * @property mobileSize
         * @type {Number}
         * @default 0
         */
        this.mobileSize = 320;

        /**
         * If you want the default #backToTop <div> showen true = show div 
         * 
         * @property showBackToTop
         * @type {Boolean}
         * @default true
         */
        this.showBackToTop = true;

        /**
         * hold top position of content divs 
         * 
         * @property contentTopPos
         * @type {Array}
         * @default BLANK
         */
        this.contentTopPos = [];

        /**
         * The buffer size that calls the section function 
         * This number takes the section top position and subtracts 1/2 of the sectionCallbackBuffer
         * and adds 1/2 the number to it, and if the scrollTop() is inbetween those numbers
         * then the section function is called
         * 
         * @property sectionCallbackBuffer
         * @type {Number}
         * @default 200
         */
        this.sectionCallbackBuffer = 200;

        /**
         * When this is true the start scrolling callback gets called 
         * 
         * @property startScrolling
         * @type {Boolean}
         * @default BLANK
         */
        this.startScrolling = true;

        //Initialize allax.js
        this.init();

    };

    /**
     * Initialize the ALLAX framework 
     *
     * @private
     * @method init
     */

    allax.prototype.init = function() {

        //Get the hright of the window
        this.windowHeight = $(window).height();

    };

    /**
     * Sets up the page for use 
     *
     * @private
     * @method setUp
     */

    allax.prototype.setUp = function() {

        //Create a refernece for this class to be used in jQuery functions
        var _this = this;

        //Scroll thru all the .allax-content classes
        //Record their top position in the contentTopPos[] key and thier ID in the vaule
        $(".allax-content").each(function() {

            var p = $(this).position();

            //Create the object to hold the section object
            _this.contentTopPos[Math.floor(p.top - 70)] = {
                id: "",
                topPos: 0,
                bottomPos: 0,
                content: "",
                played: false
            };

            //Set the section ID
            _this.contentTopPos[Math.floor(p.top - 70)].id = $(this).attr("id");

            //Set the section top position
            _this.contentTopPos[Math.floor(p.top - 70)].topPos = Math.floor(p.top - 70);

            //Load the content of the DIV into the content
            _this.contentTopPos[Math.floor(p.top - 70)].content = $(this).html();

            //Set the section bottom position
            _this.contentTopPos[Math.floor(p.top - 70)].bottomPos = $(this).height() + Math.floor(p.top - 70);

        });

        //Check is the site is being viewed on a mobile browser
        if (isMobile.any()) {

            //Scroll thru the .allax-image classes
            //change the class
            $(".allax-image").each(function(index, element) {

                //REMOVE THESE TWO LINES ONCE CHECKED ON MOBILE DEVICE
                //$(this).removeClass("allax-image");
                //$(this).addClass("allax-image-mobile");

                $(this).toggleClass("allax-image allax-image-mobile");

            });

        }

        //If there are additional things to do create a "mobileDevice" function
        if (typeof window["mobileDevice"] == 'function') {

            window["mobileDevice"]();

        }

        //If there are additional things to do create a "desktopDevice" function
        if (typeof window["desktopDevice"] == 'function') {

            window["desktopDevice"]();

        }

        //Add function to scroll back to the top when an element with this class is clicked
        $(".allax-top").click(function() {

            //Check that the default menu is not showen, if it is, then the page is already at the top
            if (!this.mainMenuDefault) {
                //Clear the last section that was clicked
                _this.currentSection = "";

                //Pull the header above the top of the window, so it can be transformed into the default header out of view
                $('#header').animate({

                    //Pulls the header the amount of the #headHeight div
                    marginTop: "-=" + $("#headHeight").height()

                }, 500, function() {

                    //Scroll the page back to the top of the window
                    $('html, body').animate({

                        scrollTop: 0

                    }, (750 * ($(window).scrollTop() / _this.windowHeight))).promise().done(function() {

                        //When the window is back to the top, transform the menu into the default style
                        _this.adjustMainMenu();

                    });

                });

            }

        });

        //Add the navigation function to the .allax-navButton class
        $(".allax-navButton").click(function() {

            //Loop thru the .allax-navButtons to close all of the open sub menus
            //We need to do this incase there is more than one sumenu on the page
            $(".allax-navButton").each(function(index, value) {

                if ($(this).parent().has("ul").length == 1) {

                    $(this).parent().find("ul").addClass("hide");

                }

            });

            //this option has no submenu and is a href link, or link to a page section
            if ($(this).parent().has("ul").length === 0) {

                //Check to see if the link is a href link
                if ($(this).attr("href").length === 1) {

                    //Get the CLASS of the <DIV> to scroll to.
                    //The exact name that is in the links rel sttribute MOST be a psudo class in the <div> to scroll to
                    var l = $(this).attr("rel");

                    //Check the currentSection
                    //If the user IS NOT clicking on the link to the current section, then go there
                    if (l != this.currentSection) {

                        //Store the new section into the currentSection
                        _this.currentSection = l;

                        //Check to see if the top of page menu is showing
                        //If it is, remove it and show the inside menu
                        if (_this.isMainMenuDefault) {
                            //Animate the menu up
                            $('#header').animate({

                                marginTop: "-=" + $("#headHeight").height()

                            }, 500, function() {

                                //Show the inside menu
                                _this.adjustMainMenu();

                                //When the menu is gone, scroll to the section
                                setTimeout(function() {
                                    _this.scrollPage()
                                }, 400);

                            });

                        } else {

                            //Scroll to the selected section
                            _this.scrollPage();

                        }

                    }

                } else {

                    //If there is a href on the menu option, open that link in a new window
                    window.location.href = $(this).attr("href");

                }

                //If the mobile menu bar is active, close it when an option is clicked

                if ($(window).width() <= _this.mobileSize) {

                    $("#mainMenu").slideToggle("slow", function() {

                        // Animation complete.

                    });

                }


            } else {

                //If this menu option has a submenu, show it
                $(this).parent().children().eq(1).removeClass("hide");

            }

            //Prevent the browser from going to the href if javascript is called
            return false;

        });

        //Add the click function to the #mobileMenu <div>
        $("#mobileMenu").click(function() {

            $("#mainMenu").slideToggle("slow", function() {

                // Animation complete.

            });

        });

        //Creates a timer to check the page scrolling
        setInterval(function() {

            // Check your page position and then
            // Load in more results
            this.scroll = $(window).scrollTop();

        }, 250);

        //Checks the scrolling of the window
        $(window).scroll(function() {

            if (_this.startScrolling) {

                //If there is an beginPageScroll function, call it and send to it the current section
                if (typeof window["beginPageScroll"] == 'function') {

                    window["beginPageScroll"]();

                }

                _this.startScrolling = false;
            }

            clearTimeout($.data(this, 'scrollTimer'));

            $.data(this, 'scrollTimer', setTimeout(function() {

                console.log("Haven't scrolled in 250ms!");

                _this.startScrolling = true;

                for (var key in _this.contentTopPos) {

                    //if the number in the key is >= than the scrollTop position, than check if there is a function to run for that keys value

                    if ($(window).scrollTop() >= (Number(key) - (_this.sectionCallbackBuffer / 2)) && $(window).scrollTop() <= (Number(key) + (_this.sectionCallbackBuffer / 2))) {
                        //Check to see if there is a section function, if there is, call it
                        if (typeof window[_this.contentTopPos[key].id] == 'function' && !_this.contentTopPos[key].played) {

                            window[_this.contentTopPos[key].id]();
                            _this.contentTopPos[key].played = true;

                        }

                    }

                }

                //If there is an endPageScroll function, call it and send to it the current section
                if (typeof window["endPageScroll"] == 'function') {

                    window["endPageScroll"]();

                }

                //if the user has scrolled to a section, then change the default window to the inside window
                if (this.scroll >= ($(window).height() - $("#headHeight").height()) && _this.isMainMenuDefault) {

                    $('#header').animate({

                        marginTop: "-=" + $("#headHeight").height()

                    }, 500, function() {

                        _this.adjustMainMenu();

                    });

                }

                //If the window moves back to the top, then change the inside menu to the default 
                if (this.scroll === 0 && !_this.isMainMenuDefault) {

                    $('#header').animate({

                        marginTop: "-=" + $("#headHeight").height()
                    }, 500, function() {

                        _this.adjustMainMenu();

                    });

                }

                //Clear the currentSelection
                this.currentSection = "";

            }, 250));
        });

    };

    /**
     * Used to switch the menus from the default view to the inside view and back again 
     *
     * @private
     * @method adjustMainMenu
     */

    allax.prototype.adjustMainMenu = function() {
        //Switch the header look
        $("#header").toggleClass("headerInside", "headerDefault");

        //Switch the logo look
        $("#logo").toggleClass("logoInside", "logoDefault");

        //Switch the main menu look
        $("#mainMenu").toggleClass("mainMenuInside", "mainMenuDefault");

        //If there are additional things to do create a "headerChange" function
        if (typeof window["headerChange"] == 'function') {

            window["headerChange"]();

        }

        //Animate the header back into the window
        $("#header").animate({

            marginTop: "+=" + $("#headHeight").height()

        }, 1000);

        //If the page is moved to a section and showBackToTop = true, then show the #backToTop <div>
        //Used to add a button to the bottom of the page that will send the page back to the top
        if (this.showBackToTop) {

            var h = $("#backToTop").height();

            //If the #backToTop button is showen, then hide it, if it's not show it
            if (!this.isMainMenuDefault) {
                h = h * -1;
            }

            //Animate the #backToTop <div>
            $("#backToTop").animate({

                bottom: "+=" + h

            }, 250);

        }

        //Toggle the isMainMenuDefault Boolean
        this.isMainMenuDefault = !this.isMainMenuDefault;

    };

    /**
     * Used to scroll the page 
     *
     * @private
     * @method scrollPage
     */

    allax.prototype.scrollPage = function() {

        //Get the position of the <div> to scroll to
        var p = $("#" + this.currentSection).position();

        //calculate the speed inwhch to scroll at.
        var t = 750 * (Math.abs(p.top - $(window).scrollTop()) / this.windowHeight);

        //Create an instance of this for use in the jQuery code
        var _this = this;

        //Animate the page to the correct <div>
        $('html, body').animate({

            scrollTop: $("#" + this.currentSection).offset().top - $("#header").height()

        }, t).promise().done(function() {

            //Anything in here will get called when the animation is finished

        });

    };

    /**
     * Disable the user from scrolling the page 
     *
     * @method disableUserScroll
     */

    allax.prototype.disableUserScroll = function() {

        $("body").css("overflow", "hidden");

    };

    /**
     * enable the user to scroll the page 
     *
     * @method enableUserScroll
     */

    allax.prototype.enableUserScroll = function() {

        $("body").css("overflow", "");

    };

    /**
     * Allows for the user to scroll to a page inside of a JS function 
     *
     * @method gotoSection
     * @param {String} sectionName Name of section you want the site to navigate to.
     */

    allax.prototype.gotoSection = function(sectionName) {

        //Set the current section to the sectionName
        this.currentSection = sectionName;

        //Scroll to that section
        this.scrollPage();

    };

    /**
     * Allows user to change the sectionCallbackBuffer
     * <br/><strong>WARNING</strong>: a number below 200 can cause issues with a function being called
     *          when the user is manully scrolling the page
     *
     * @method setSectionCallbackBuffer
     * @param {Number} The number to change the setSectionCallbackBuffer to
     */

    allax.prototype.setSectionCallbackBuffer = function(sectionNumber) {

        //Set the section buffer to the sectionNumber
        this.sectionCallbackBuffer = sectionNumber;

    };

    /**
     * Reset the played section back to false
     *
     * @method resetSection
     * @param {String} sectionName Name of section you want the site to navigate to.
     */

    allax.prototype.resetSection = function(sectionName) {

        //Loop thru contentTopPos objects
        for (var key in this.contentTopPos) {

            //Find the one with the same sectionName
            if (this.contentTopPos[key].id == sectionName) {

                //Set the played verible to flase
                this.contentTopPos[key].played = false;

                //copy the loaded state of the section into the div
                $("#" + sectionName).html(this.contentTopPos[key].content);

                //Stop the loop
                break;

            }

        }

    };

    /**
     * Returns the boolean if the section has been played or not
     *
     * @method checkSectionPlayed
     * @param {String} sectionName Name of section you want the site to navigate to.
     * @return {boolean} true = section callback has been played false = section callback has not been played
     */

    allax.prototype.checkSectionPlayed = function(sectionName) {

        //Loop thru contentTopPos objects
        for (var key in this.contentTopPos) {
            //Find the one with the same sectionName
            if (this.contentTopPos[key].id == sectionName) {

                //Return it's played value
                return this.contentTopPos[key].played;

            }

        }

    };

})(window);
/**
 * Add items to text with a 'add-glossary' class
 *
 * @class events
 */

(function(window) {

    /**
     * Base class for events
     *
     * @class allax
     */

    events = function(eventsLayout) {

        if (eventsLayout == undefined) {

            this.eventsLayout = "<div class='event'>";

            this.eventsLayout += "\n\t<div class='eventTitle'>{{eventTitle}}</div>";
            this.eventsLayout += "\n\t\t<div class='eventDetails'>";
            this.eventsLayout += "\n\t\t<div class='eventDate'>{{eventDate}}</div>";
            this.eventsLayout += "\n\t\t<div class='eventTime'>{{eventTime}}</div>";
            this.eventsLayout += "\n\t</div>";
            this.eventsLayout += "\n\t<div class='eventDecription'>{{eventDescription}}</div>";
            this.eventsLayout += "</div>";
        } else {
            this.eventsLayout = eventsLayout;
        }

    }

    /**
     * Currently there is nothing to initialize 
     *
     * @private
     * @method init
     */

    events.prototype.init = function(eventsLayout) {};

    /**
     * Currently there is nothing to initialize 
     *
     * @method loadEvents
     * @param {string} relative path to the events.xml file
     */

    events.prototype.loadEvents = function(eventsFile) {

        $.ajax({
            async: false,
            cache: false,
            context: this,
            type: "GET",
            url: eventsFile,
            dataType: "xml",
            success: this.build,
            fail: this.eventsXMLLoadFail
        });

    };

    /**
     * Get's called if the events.xml fails to load 
     *
     * @private
     * @method eventsXMLLoadFail
     */

    events.prototype.eventsXMLLoadFail = function() {
        console.log("EVENTS XML DID NOT LOAD");
    }

    /**
     * Takes the events.xml information and this.eventsLayout builds the events HTML   
     *
     * @private
     * @method build
     */

    events.prototype.build = function(xml) {

        //Get the event nodes from the event.xml
        var xmlevents = $(xml).find("event");

        //Sort events by the date and make them in date order
        xmlevents.sort(function(a, b) {
            a = $(a).find("eventStartDate").text();
            b = $(b).find("eventStartDate").text();
            return (a.localeCompare(b));
        });

        //Create a new date
        var todayDate = new Date();

        //create a holder for the event start date
        var eventStart;

        //create a holder for the event element
        var eventElement;

        //reference to this class for use in jQuery.each
        var _this = this;

        //Loop thru all the event elements
        xmlevents.each(function() {

            //Check and see if event should be printed
            if (new Date($(this).find("listDateStart").text()) < todayDate && new Date($(this).find("listDateEnd").text()) > todayDate) {

                //This gets the layout and puts it in the eventElement var
                eventElement = _this.eventsLayout;

                //Put the title of the event in the eventElement
                eventElement = eventElement.replace(/\{{eventTitle}}/, $(this).find("title").text());

                //Get the event start date
                eventStart = $(this).find("eventStartDate").text();

                //If the event is more than one day, modify the event date to be the correct range
                if (Number($(this).find("eventLength").text()) > 1) {

                    //adds "-" to the eventStart date (ie. mm/dd/yyyy -)
                    eventStart += " - ";

                    //turn the event start date into a JS date
                    var dat = new Date($(this).find("eventStartDate").text());

                    //Turn the date into the final date of the event
                    dat.setTime(dat.getTime() + (Number($(this).find("eventLength").text()) * 86400000));

                    //reformat the date into mm/dd/yyyy
                    eventStart += (dat.getMonth() + 1);

                    eventStart += "/";

                    eventStart += dat.getDate();

                    eventStart += "/";

                    eventStart += dat.getFullYear();

                    //At the end the eventStart date looks like mm/dd/yyyy - mm/dd/yyyy

                }

                //Put the startDate of the event in the eventElement
                eventElement = eventElement.replace(/\{{eventDate}}/, eventStart);

                //Put the startTime of the event in the eventElement
                eventElement = eventElement.replace(/\{{eventTime}}/, $(this).find("time").text());

                //Put the eventDescription of the event in the eventElement
                eventElement = eventElement.replace(/\{{eventDescription}}/, $(this).find("description").text());

                //add the event to the .add-events DIV
                $(".add-events").append(eventElement);

            }


        });

        //If there are additional things to do create a "headerChange" function
        if (typeof window["eventsCompleted"] == 'function') {

            window["eventsCompleted"]();

        }
    }

})(window);
/**
 * Add items to text with a 'run-glossary' class
 *
 * @class glossary
 */

(function() {

	//Load glossary xml
	loadGlossary = function(glossaryPath) {
		var gP = glossaryPath;

		if ($(".add-glossary").length > 0) {

			$.ajax({
				type: "GET",
				url: gP,
				dataType: "xml",
				success: runGlossary,
				fail: glossaryXMLLoadFail
			});

		}
	};

	//Run the glossary
	runGlossary = function(xml) {
		//go thru all the content with the 'run-glossary' class
		$(".add-glossary").each(function(index) {
			//get the text of the content
			var words = $.trim($(this).html());

			//create the contentText verible
			var contentText = null;

			//go thru all the words in the glossary.xml file
			$(xml).find("item").each(function() {
				//if the content has a glossary.xml word replace it with the 'replaceWith' tag
				contentText = words.replace(new RegExp($(this).find("word").text(), 'g'), $(this).find("replaceWith").text());

				//set "words" to the updated content
				words = contentText;

			});

			//change the text of the content to the new updated words
			$(this).html(contentText);
		});

	};

	glossaryXMLLoadFail = function() {
		alert("failed to load glossary file.");
	};

}());

/*Rotate Images
 */

function rotateImages() {

    $(".rotateImages").each(function(index) {

        var RI = $(this);

        var count = 0;

        $(RI).children().eq(count).children().eq(0).delay(500).switchClass("start", "finish", 1000);

        setInterval(function() {

            //Fade Out
            $(RI).children().eq(count).fadeToggle("slow", "linear");

            $(RI).children().eq(count).children().eq(0).delay(500).switchClass("finish", "start", 0);

            //Fade In
            if (count == ($(RI).children().length - 1)) {

                count = -1;

            }

            $(RI).children().eq(count + 1).fadeToggle("slow", "linear");

            $(RI).children().eq(count + 1).children().eq(0).delay(500).switchClass("start", "finish", 1000);

            count++;

        }, 3000);

    });

}
/*********************
 * 
 * Create instance of Allax.js 
 *
 **********************/

var _allax;

_allax = new allax();

var eventsLayout;

var clubEvents;

/*********************
 * 
 * Get load bar physical information
 *
 **********************/

var lPos = $("#loadingBar").position();

var loadTop = lPos.top;

var loadLeft = lPos.left;

var loadHeight = $("#loadingBar").height();

var loadWidth = $("#loadingBar").width();

var assetCount = 0;

/*********************
 * 
 * Preload assets for the site
 *
 **********************/

//Create the queue
var queue = new createjs.LoadQueue(true);

//Set up queue handelers
queue.on("fileload", handleFileLoad, this);
queue.on("complete", handleComplete, this);
//queue.on("progress", handleProgress, this);

//Load the queue with assets
queue.loadFile("assets/images/activityLeftOne.jpg");
/*queue.loadFile("assets/images/activityLeftTwo.jpg");
queue.loadFile("assets/images/activityLeftThree.jpg");
queue.loadFile("assets/images/activityRightOne.jpg");
queue.loadFile("assets/images/activityRightTwo.jpg");
queue.loadFile("assets/images/activityRightThree.jpg");

queue.loadFile("assets/images/icon-email.png");
queue.loadFile("assets/images/icon-top.png");
queue.loadFile("assets/images/icon-twitter.png");

queue.loadFile("assets/images/backgroundOne.jpg");
queue.loadFile("assets/images/backgroundTwo.jpg");
queue.loadFile("assets/images/backgroundThree.jpg");

queue.loadFile("assets/images/headerOne.jpg");
queue.loadFile("assets/images/headerTwo.jpg");
queue.loadFile("assets/images/headerThree.jpg");
queue.loadFile("assets/images/headerFour.jpg");*/

queue.loadFile("assets/images/headerLogoDefault.png");

queue.loadFile("assets/images/rtlLogo.jpg");

//Total number of assets, used for the loading bar (need to check if there is a way to get this info from createjs.LoadQueue)
var assetsTotal = queue.getItems().length;

//This is called after a preloaded item is finished loading
//This menipulates the loading bar

function handleFileLoad() {

    //Add 1 to the assetsCount
    assetCount++;

    //Gets the precentage of the total assets / number of assets loaded
    var prec = assetCount / assetsTotal;


    $("#loadingBottom").css({ top: 0 });
    $("#loadingBottom").css({ height: (loadHeight * (prec)) });

    //Minipulate the top loading image based on the precentage loaded
    $("#loadingTop").css({ top: (loadHeight * (prec)) });
    $("#loadingTop").css({ height: (loadHeight * (100 - prec)) });

    //Minipulate the image itself to move based on the precentage loaded
    $("#loadingTopImageHolder").css({ position: "absolute" });
    $("#loadingTopImageHolder").css({ top: 0 - (loadHeight * (prec)) });

    $("#loadingText").html(prec + "% loaded");
}

function handleProgress(x) {}

//Called when the total preload queue is finished
function handleComplete() {

    //Hide the loading bar
    $("#loadingBar").addClass("hide");

    //Show the website
    $("#design").removeClass("hide");

    //Start rotating the images (might move this into a function that is called for specific sites)
    rotateImages();

    //Activate tool tips (might move this into a function that is called for specific sites)
    $('.toolTipRight').tooltip({
        position: { my: "left+15 center", at: "right center" }
    });

    //Activate tool tips (might move this into a function that is called for specific sites)
    $('.toolTipLeft').tooltip({
        position: { my: "right+45 center", at: "left center" }
    });

    //Load Glossary data
    loadGlossary("assets/data/glossary.xml");

    //Create custom events layout
    eventsLayout = "<h3>{{eventTitle}} {{eventDate}} {{eventTime}}</h3>\n<div>\n<p>{{eventDescription}}</p>\n</div>";

    //create events
    var clubEvents = new events();

    //load events
    clubEvents.loadEvents("assets/data/events.xml");

    _allax.mobileSize = 768;

    console.log("Ready to set up!! ");

    _allax.setUp();

}
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

				console.log("mobile size: " + $(window).width());
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
				if (this.scroll <= ($(window).height() - $("#headHeight").height()) && !_this.isMainMenuDefault) {

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

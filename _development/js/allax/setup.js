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
queue.loadFile("assets/images/activityLeftTwo.jpg");
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
queue.loadFile("assets/images/headerFour.jpg");

queue.loadFile("assets/images/headerLogoDefault.png");

queue.loadFile("assets/images/rtlLogo.jpg");

//Total number of assets, used for the loading bar (need to check if there is a way to get this info from createjs.LoadQueue)
var assetsTotal = 18;

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

    console.log("moved stuff here")

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
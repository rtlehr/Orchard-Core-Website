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
            console.log("in the iff");
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
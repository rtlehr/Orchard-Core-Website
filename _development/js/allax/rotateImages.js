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
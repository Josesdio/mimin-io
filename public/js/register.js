$(document).ready(function () {

    var current_fs, next_fs, previous_fs; //fieldsets
    var current_part, next_part, previous_part; //parts
    var opacity;
    var opacityp;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next").click(function () {

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //Add Class Active
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    $(".previous").click(function () {

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //Remove class active
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();

        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacity = 1 - now;

                current_fs.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_fs.css({
                    'opacity': opacity
                });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function () {
        return false;
    })


    $(".nextpart").click(function () {

        current_part = $(this).parent();
        next_part = $(this).parent().next();

        //show the next part
        next_part.show();
        //hide the current part with style
        current_part.animate({
            opacityp: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacityp = 1 - now;

                document.getElementById('backbutton').style.visibility = 'hidden';

                current_part.css({
                    'display': 'none',
                    'position': 'relative'
                });
                next_part.css({
                    'opacity': opacityp
                });
            },
            duration: 500
        });
    });

    $(".previouspart").click(function () {

        current_part = $(this).parent();
        previous_part = $(this).parent().prev();

        //show the previous part
        previous_part.show();

        document.getElementById('nextbutton').style.visibility = 'hidden';

        //hide the current fieldset with style
        current_part.animate({
            opacityp: 0
        }, {
            step: function (now) {
                // for making fielset appear animation
                opacityp = 1 - now;

                current_part.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previous_part.css({
                    'opacity': opacityp
                });
            },
            duration: 500
        });
    });

});

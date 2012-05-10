(function($) {
    var steps = [];
    var createLayout = function() {
        var html = "<div id='litmus-bookmarklet' style='z-index:9999;border-width:1px;border-style:solid;position:fixed;right:10px;top:60px;padding:20px;'><div id='litmus-bookmarklet-container' style='width:200px;height:200px'><a id='litmus-record' href='#'>record</a></div></div>";
        $('body').append(html);
    };
    createLayout();

    var start = function() {
        $(document).bind('click.litmus', function(e) {
            steps.push(e.target);
            $('#litmus-bookmarklet-container').append('<p>clicked: '+$(e.target).prop('tagName')+' tag</p>');
        });
    };

    var stop = function() {
        $(document).unbind('click.litmus');
        console.log(steps);
    };
    
    $('#litmus-record').toggle(function() {
        $(this).html('stop');
        start();
    }, function() {
        $(this).html('record');
        if (($.isEmptyObject(steps) === false) && ($('#litmus-play').length === 0)) {
            $('#litmus-record').after(" | <a id='litmus-play' href='#'>play</a>"); 
        }
        stop();
    });

})(jQuery);

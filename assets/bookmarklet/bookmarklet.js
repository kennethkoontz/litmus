(function($) {
    var steps = [];
    var createLayout = function() {
        var html = "<div id='litmus-bookmarklet' style='z-index:999999;border-width:1px;border-style:solid;position:fixed;right:10px;top:60px;padding:20px;'><div id='litmus-bookmarklet-container' style='width:200px;height:200px'><a id='litmus-record' href='#'>record</a></div></div>";
        $('body').append(html);
    };
    createLayout();

    $.fn.getPath = function () {
        if (this.length != 1) throw 'Requires one element.';

        var path, node = this;
        while (node.length) {
            var realNode = node[0], name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();

            var parent = node.parent();

            var siblings = parent.children(name);
            if (siblings.length > 1) { 
                name += ':eq(' + siblings.index(realNode) + ')';
            }

            path = name + (path ? '>' + path : '');
            node = parent;
        }

        return path;
    };

    var listener = function(event) {
        var e = event,
            tag = (parseFloat($.fn.jquery) >= 1.6) ? 'prop' : 'attr';
        if (($(e.target).parents("#litmus-bookmarklet").length === 0) && !$(e.target).is("#litmus-bookmarklet")) {
            steps.push({action: 'click', element: $(e.target).getPath()});
            $('#litmus-bookmarklet-container').append('<p>clicked: '+$(e.target)[tag]("tagName")+' tag</p>');
        }
    }

    var start = function() {
        document.addEventListener('click', listener, true);
    };

    var stop = function() {
        document.removeEventListener('click', listener);
        console.log(steps);
    };

    var run = function(steps, interval, timeout) {
        var timer,
            time = 0,
            i = 0;

        runSingle(steps[0]);

        function abort() {
            console.log("Run aborted");
        }

        function runSingle(step) {
            timer = setInterval(function() {
                time += interval;
                if ($(step.element).is(':visible') === true) {
                    clearInterval(timer);
                    time = 0;
                    $(step.element).trigger(step.action);
                    (i < (steps.length - 1)) && runSingle(steps[++i]);
                } else if (time >= timeout) {
                    clearInterval(timer);
                    abort();
                }
            }, interval);
            console.log("Performed: ", step.action, "on", step.element) 
            if (i === (steps.length - 1)) console.log("Run successful");
        }
    }
    
    $('#litmus-record').toggle(function() {
        $(this).html('stop');
        start();
    }, function() {
        $(this).html('record');
        if (($.isEmptyObject(steps) === false) && ($('#litmus-play').length === 0)) {
            $('#litmus-record').after(" | <a id='litmus-play' href='#'>run</a>"); 
            $('#litmus-play').bind('click', function() {
                run(steps, 500, 3000);
            });
        }
        stop();
    });

})(jQuery);

(function($) {
    Projects = Backbone.Collection.extend({
        model: Project,
        url: '/projects'
    });
})(jQuery);

(function($) {
    ProjectTable = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        el: '#projectTable',
        render: function() {
            var self = this;
            var projects = new Projects();
            projects.fetch({
                success: function(projects) {
                    var source = $("#project-template").html(),
                        template = Handlebars.compile(source);

                    for (var i in projects.models) {
                        context = {
                            title: projects.models[i].attributes.value.title,
                            description: projects.models[i].attributes.value.description
                        };
                        html = template(context);
                        $(self.el).append(html);
                    }
                }
            });
        }
    });
    projectTable = new ProjectTable()
})(jQuery);

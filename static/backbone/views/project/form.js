(function($) {
    ProjectForm = Backbone.View.extend({
        initialize: function() {
        },
        el: '#projectForm',
        events: {
            'click .btn-primary': 'postProject'
        },
        postProject: function() {
            var self = this,
                project = new Project();
                project.save({ title: $('.title').val(), description: $('.description').val()}, {
                success: function() {
                    self.trigger('postProject');
                }
            });
        }
    });

    projectForm = new ProjectForm();
})(jQuery);

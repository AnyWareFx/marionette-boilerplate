/*global define */

define([
	'marionette',
	'templates',
    'underscore'
], function (Marionette, templates, _) {
	'use strict';

	return Marionette.ItemView.extend({
		template: templates.page,

        ui: {
            header: 'h2'
        },

        events: {
            'click #notify' : 'notify',
            'click #modal' : 'showSampleModal',
            'click #confirm' : 'showSampleConfirm'
        },

        onBeforeRender: function(){
            this.model.set('content', _.result(templates.pages, this.model.get('name')))
        },

        onRender: function() {
            this.ui.header.remove();
        },

        // Event handlers
        notify: function() {
            app.commands.execute('app:notify', {
                type: 'warning',
                title: 'A Warning',
                description: 'Something important happened! Let the user know it.'
            });
        },
        showSampleModal: function() {
            app.commands.execute("app:dialog:simple", {
                title: 'Dialog title!', // Optional
                message: 'The important message for user!'
            });
        },

        showSampleConfirm: function() {
            app.commands.execute("app:dialog:confirm", {
                icon: 'info-sign',
                title: 'Action confirmation!',
                message: 'Are you sure to perform this serious action?',
                confirmNo: function() {
                    app.commands.execute('app:notify', {
                        type: 'warning',
                        title: 'You\'ve chosen No',
                        description: 'No problem. No action was taken.'
                    }
                )},
                confirmYes: function() {
                    app.commands.execute('app:notify', {
                        type: 'success',
                        title: 'You\'ve chosen Yes',
                        description: 'You\'ve agreed! Thanks :)'
                    }
                )}
            });
        }

	});
});

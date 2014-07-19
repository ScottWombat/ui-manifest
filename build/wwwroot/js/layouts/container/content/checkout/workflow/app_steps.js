define([ "application"], function(App) {
	
	App.module("StepsBuilder", function(StepsBuilder, App, Backbone,Marionette, $, _) {
		 'use strict';
		 
		 StepsBuilder.Controller = Marionette.Controller.extend({
			 initialize: function(options){
				 this.navbarRegion = options.navbarRegion;
				 this.mainRegion = options.mainRegion;
				 var workflow = this._initWorkflow();
				 this._setupNavigation(workflow, this.navbarRegion, this.footerRegion){
					 
				 },
				showPool: function(pool){
					// create view, show in a region
				},	 
				selectShape: function(pool){
					// create view, show in a region
				},
				selectCorners: function(pool){
					// create view, show in a region
				},
				selectHopper: function(pool){
					// create view, show in a region
				}, 
				selectDimensions: function(pool){
					// create view, show in a region
				}, 
				selectSteps: function(pool){
					// create view, show in a region
				}, 
				selectDetail: function(pool){
					// create view, show in a region
				},
				_initWorkflow: function(pool){
					this.layout = new SomeLayout();
					App.someRegion.show(this.layout);
					this.workflow = this._buildWorkflow(pool);
				},
				 _buildWorkflow: function(pool){
					 var workflow = new App.MyWorkflow.Controller();
					  
					 workflow.addStep('', this.showPool, this);
					 workflow.addStep('shape', this.selectShape, this);
					 workflow.addStep('hopper', this.selectHopper, this);
					 workflow.addStep('corners', this.selectCorners, this);
					 workflow.addStep('dimensions', this.selectDimensions, this);
					 workflow.addStep('steps', this.selectSteps, this);
					 workflow.addStep('detail', this.selectDetail, this);
					  
					 // always do this before moving to the next step
					 workflow.beforeMove(function(done){
						 this._saveIt(done);
					 }, this);
					  
					 return workflow;
				},
				_saveIt: function(done){
					 this.myModel.save(null, {
						 success: function(){
							 done();
						 }
					 });
				},
					  
				 _setupNavigation: function(workflow, navbarRegion, footerRegion){
					 var nav = new StepsBuilder.Navigation.Controller({
					 workflow: workflow,
					 navbarRegion: navbarRegion,
					 footernavRegion: footerRegion
					 });
					 return nav;
				}
		 });
		 
		
	});

	return App.StepsBuilder;
});
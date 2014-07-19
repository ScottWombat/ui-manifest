define([ "application" ,'backbone.picky'], function(App) {

	App.module("Workflow", function(Workflow, App,Backbone, Marionette, $,_) {
		Workflow.WorkflowStep = Backbone.Model.extend({
			initialize : function() {
				var selectable = new Backbone.Picky.Selectable(this);
				_.extend(this, selectable);
			}
		});

		Workflow.WorkflowStepCollection = Backbone.Collection.extend({
			model : Workflow.WorkflowStep,

			initialize : function() {
				this.emptyStep = new this.model({
					isEmpty : true
				});

				var selectable = new Backbone.Picky.SingleSelect(this);
				_.extend(this, selectable);
			},

			getNext : function() {
				var index, nextIndex;

				if (!this.selected) {
					index = 0;
				} else {
					index = this.indexOf(this.selected);
				}

				if (index < this.length) {
					nextIndex = index + 1;
				} else {
					nextIndex = -1;
				}

				return this.at(nextIndex) || this.emptyStep;
			},
			getPrevious : function() {
				var index, nextIndex;

				if (!this.selected) {
					index = 0;
				} else {
					index = this.indexOf(this.selected);
				}

				if (index > 0) {
					nextIndex = index - 1;
				} else {
					nextIndex = -1;
				}

				return this.at(nextIndex) || this.emptyStep;
			}
		});

		var workflowStepData = [ 
			{id : 1,key : "",name : "Info"},
		    {id : 2,key : "shape",name : "Shape"},
		    {id : 3,key : "corners",name : "Corners"},
		    {id : 4,key : "hopper",name : "Hopper"},
		    {id : 5,key : "dimensions",name : "Dimensions"},
		    {id : 6,key : "steps",name : "Steps"},
		    {id : 7,key : "detail",name : "Detail"} ];

		Workflow.Controller = Marionette.Controller.extend({
			initialize : function(options) {
				this.steps = new Workflow.WorkflowStepCollection(workflowStepData);
				this.filters = {};
			},
			getSteps: function(){
				 return this.steps;
			},
			nextStep: function(){
			var nextStep = this.steps.getNext();
			this.moveTo(nextStep);
			},  
			previousStep: function(){
				 var previousStep = this.steps.getPrevious();
				 this.moveTo(previousStep);
			},
				 moveTo: function(step){
				 this._triggerStep(step);
			},
			beforeMove: function(fn, context){
				 this.filters.beforeMove = {fn: fn, context: context};
			},		  
			setStepByKey: function(stepKey){
				 stepKey = stepKey || "";
				 var step = this.steps.where({key: stepKey})[0];
				 if (step){
					 step.select();
				 }
			},  
			_triggerStep: function(step){
				 var key = step.get("key");
				  
				 var done = _.bind(function(){
				 step.select();
				 this.trigger("step:" + key);
				 }, this);
				  
				 var beforeMove = this.filters.beforeMove;
				 if (_.isObject(beforeMove)){
				 beforeMove.fn.call(beforeMove.context, done);
				 } else {
					 done();
				 }
			}
		});

	});
	return App.Workflow;
});
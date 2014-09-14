define([ "application",
         'utils/templateManager',
         'text!layouts/header/hsecond/search/templates/search_template.html',
         'i18n!nls/locales','i18next'
         ], function(App,TemplateManager,tpl) {
	
	App.module("Search.View", function(View,App,Backbone, Marionette, $, _) {
		 View.Search  = Marionette.ItemView.extend({
				template : TemplateManager.getTemplate(tpl),
				tagName : "div",
				className:'search',
				initialize:function(){
					 var $input = $("#search");
					 $input.attr("placeholder", "Type an ID");
					//var searchinput = $("input[name*='search']" );
					//searchinput.attr("placeholder", "Type an ID");
					
					//alert('searchinput');
				},
				events : {
					"click a" : "navigate",
					"click .button-search": "doSearch"
				},
				doSearch:function(e){
					e.preventDefault();
					var keyword = $('input:text[name=search]').val();
					if(keyword.length==0){
						this.doValidateKeyword();
					}
					this.trigger("search:navigate",keyword,keyword);
					
				},
				doValidateKeyword:function(){
					$('input:text[name=search]').focus();
					$dvMsg=$('<div></div>').html('<br><br>Please enter your keyword').dialog({
						autoOpen:false,
						width:250, height:200,
						show: {
							effect:"drop",
							duration:700
						},
						hide: {
							effect:"drop",
							duration:700
						},
				        title:"Search",
				        modal: true,
				        overlay: { opacity: 0.5, backgroundColor: 'black'},
						buttons:[{
							text:'OK',
							width:50,
							click:function(){
								$(this).dialog('close');
							}
						}],
						open: function(){
				          
				            $(".ui-dialog-titlebar-close").hide();   
				        }
					});
					$dvMsg.dialog('open');
					 
					
					return false;
				},
				navigate : function(e) {
					e.preventDefault();
					e.stopPropagation();
					var menuId = $(e.currentTarget).attr('id');
				
					this.trigger("menu:navigate",menuId,menuId);
					alert('dddd');
					// this.trigger("menu:navigate",menuId);
				},
				onRender : function() {
					var svgEl = this.$el.find("search");
					svgEl.attr("placeholder", "Type an ID")
					
				}
		 });
	});
	return App.Search.View;
});
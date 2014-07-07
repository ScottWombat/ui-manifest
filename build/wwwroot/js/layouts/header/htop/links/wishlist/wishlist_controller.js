define(["application"], function(App){
	
  App.module("Main", function(Main, App, Backbone, Marionette, $, _){
    Main.Controller = {
      addLayout: function(){
    			 //var layout = new ViewHsecondLayout.Layout()
    			//App.hsecond.show(layout);
      },
      deleteItem:function(id){
    	  App.linksRegion.close();
      },
      addItem:function(id){
    	  //alert('here'+ id);
    	  App.trigger("cart:additem",id);
    	  /*
    	  $.ajax({
				url : REST_URL + 'addCartItem/' + id +'?callback=jsonCallback',
				// url: REST_URL + 'user/authenticate',
				crossDomain : true,
				type : 'POST',
				data : data,
				success : function(data) {
					alert(data);
				},
				error: function (error) {
	                  alert('error; ' + eval(error));
	             },
				beforeSend : function(xhr) {
					//xhr.setRequestHeader("accept", "text/html");
					xhr.setRequestHeader("accept", "application/json");
					xhr.setRequestHeader("Content-Type","application/json");
				}
			});
    	 
    	  $.ajax({
    	        url: options.apiUrl + '/my-app-api-module',
    	        type: 'GET',
    	        contentType: 'application/json; charset=utf-8',
    	        success: function (results) {
    	            MyApp.Resources.urls = results;
    	            MyApp.vent.trigger("some:event:to:say:it:is:done")
    	        }
    	 });
    	 */
      }
    };
  });

  return App.Main.Controller;
});

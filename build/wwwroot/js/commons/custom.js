define(["jquery",'bootstrap'], function ($) {
	$(function() {
		
		$('.carousel').carousel({
			
		    interval:17000,
			cycle: false
		});
		/*
		$('form').validate({
	        rules: {
	            email: {
	                minlength: 3,
	                maxlength: 15,
	                required: true
	            },
	            pwd: {
	                minlength: 3,
	                maxlength: 15,
	                required: true
	            }
	        },
	        highlight: function(element) {
	            $(element).closest('.form-group').addClass('has-error');
	        },
	        unhighlight: function(element) {
	            $(element).closest('.form-group').removeClass('has-error');
	        },
	        errorElement: 'span',
	        errorClass: 'help-block',
	        errorPlacement: function(error, element) {
	            if(element.parent('.input-group').length) {
	                error.insertAfter(element.parent());
	            } else {
	                error.insertAfter(element);
	            }
	        }
	    });
	    */   
	});
});
jQuery(document).ready(function($) {
 
	// for user registration form
	$("form#rsUserRegistration").submit(function(){
		var submit = $(".userRegistration #submit"),
			message	= $(".userRegistration #message"),
			contents = {
				action: 	'user_registration',
				nonce: 		this.rs_user_registration_nonce.value,
				log:		this.log.value,
				pwd:		this.pwd.value,
dpname: this.dpname.value,
email: this.email.value,
			};
		
		// disable button onsubmit to avoid double submision
		submit.attr("disabled", "disabled").addClass('disabled');
		
		// Display our pre-loading
		
		$.post( theme_ajax.url, contents, function( data ){
			submit.removeAttr("disabled").removeClass('disabled');
						
			// check response data
			if( 1 == data ) {
				$("#message-success").html('<div class="alert-box success">Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ!</div>');
			} else {
message.html( data ).show(500);				
			}
		});
		
		return false;
	});
	
});					
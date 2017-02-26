function openNav() {
    document.getElementById("mobile-menu").style.width = "250px";
    document.getElementById("main-body").style.marginLeft = "-250px";
    document.getElementById("header").style.marginLeft = "-250px";
}

function closeNav() {
    document.getElementById("mobile-menu").style.width = "0";
    document.getElementById("main-body").style.marginLeft = "0";
    document.getElementById("header").style.marginLeft = "0";
}

$(document).ready(function(){
$(document).scroll(function(){
      if($(this).scrollTop() > 0){
        $('#header').addClass('scroll');
      }
      else
        $('#header').removeClass('scroll');
    });
    $('.grid').mouseenter(function(){
      var max_width = $('.site-content')[0].getBoundingClientRect().left + $('.site-content').width();
      var min_width = $(this).children('.grid-anime-info')[0].getBoundingClientRect().left + $(this).children('.grid-anime-info').width();
      if(max_width - min_width < 21){
        $(this).children('.grid-anime-info').addClass('grid-left');
        $(this).children('.grid-anime-info').removeClass('grid-right');
      }
    });
	/*Ajax Search*/
	$('.ajax-search-form').keyup(function() {
		$(this).attr('autocomplete','off');
		var searchTerm = $('.ajax-search-form').val();
		if(searchTerm.length > 1){
			$('.anivn-ajax-search').html('<center><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></center>').show();
			$.ajax({
				url : anivn_ajax.url,
				type:"POST",
				data:{
					'action':'ajax_search',
					'term' :searchTerm
				},
				success:function(result){
					$('.anivn-ajax-search').html(result).show(500);
				}
			});
		}
		else{
			$('.anivn-ajax-search').hide(500);
		}
	});

	$('body').click(function(event){
		if((event.target.id != 'ajax-search' && event.target.id != 's' && event.target.id != 'anivn-ajax-search') || $('.ajax-search-form').val().length <= 1){
			$('.anivn-ajax-search').hide(500);
		}
	});
	$('#s').focusin(function(){
		if($('.ajax-search-form').val().length > 1){
			$('.anivn-ajax-search').css('display', 'block');
		}
	});

	/*AniVn Customize*/
	var i = 0;
	var j = 0;
		$(".main-button").click(function(){
			if(i == 0){
				$(".main-button").html('<i class="fa fa-times"></i><div class="customize-info main-customize">Đóng</div>');
				$("#customize-area").slideDown();
				i++;
			}
			else{
				j = 1;
				$(".pick-epi-button").click();
				$("#customize-area").slideUp();
				$(".main-button").html('<i class="fa fa-cog"></i><div class="customize-info main-customize">Menu tùy chỉnh</div>').fadeIn();
				i = 0;
			} 
	});
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	/*Pick Epi*/
	$(".pick-epi-button").click(function(){
		if(j == 0){
			$('.pick-epi-info').fadeOut('fast');
			$("#pick-epi-icon").html('<i class="fa fa-times"></i>').show('fast');
			setTimeout(function(){
				$(".pick-epi-customize").show(1000);
			}, 1000);
			j++;
		}
		else{
			$(".pick-epi-customize").fadeOut('fast');
			$("#pick-epi-icon").html('<i class="fa fa-space-shuttle"></i><div class="customize-info icon-customize pick-epi-info">Chọn tập nhanh</div>').show('slow');
			j = 0;
		}
	});

	$(".light-off-button").click(function(){
		$(".main-button").click();
	});

	/*User Edit Profile*/

	// Avatar Change
	$('.edit-user-avatar').click(function(){
    $('.files-data').click();
    $('#upload_button').fadeIn();
    $('.cancel-upload-button').click(function(){
	$('#upload_button').fadeOut();
    });
    });

    $('.fa-check').click(function(){
	$('#upload_alert').text('');
    });

    $('body').on('click', '.btn-upload', function(e){
        e.preventDefault;
	$('#upload_button').fadeOut();
    $('#upload_alert').html('<div class="loader upload-loader"></div>').fadeIn();
    
        var fd = new FormData();
        var files_data = $('.files-data'); // The <input type="file" /> field
        
        // Loop through each data and create an array file[] containing our files data.
        $.each($(files_data), function(i, obj) {
            $.each(obj.files,function(j,file){
                fd.append('files[' + j + ']', file);
            })
        });
        
        fd.append('action', 'anivn_file_upload');  
        
        fd.append('user_id', $('.profile-area').attr('id')); 

        $.ajax({
            type: 'POST',
            url: anivn_ajax.url,
            data: fd,
            contentType: false,
            processData: false,
            success: function(response){
                $('.upload-loader').fadeOut();
                if(response.indexOf("successfully") != -1){
                    $('#upload_alert').html('<i class="fa fa-check fa-2x"></i>').fadeIn(700);
		    $('#upload_alert').fadeOut(700);
		}
                else{
                    $('#upload_alert').html('<i class="fa fa-times fa-2x"></i>').fadeIn(700);
		    $('#upload_alert').fadeOut(700);
                }
            }
        });
    });

	//Display Name change
	$('.displayname-ed').click(function(){
		$('#edit-dpname-area h3').fadeOut('fast');
		$('.dpname').show(700);
		$('.displayname-ed').fadeOut();
	});
	$('#dpname-cancel').click(function(){
		$('.dpname').fadeOut('fast');
		$('#edit-dpname-area h3').show(700);
		$('.displayname-ed').fadeIn();
	});
	$('#dpname-check').click(function(){
		$('.dpname-cc').fadeOut();
		$('#dpname-alert').html('<div class="loader dpname-loader"></div>').fadeIn();
		$.ajax({
        	    type: 'POST',
        	    url: anivn_ajax.url,
        	    data: {
			action: 'anivn_edit_dpname',
			dpname: $('input.edit-dpname').val(),
			user_id: $('.profile-area').attr('id')
			},
        	    success: function(data){
			if(data.indexOf(1) != -1){
				$('#dpname-alert').html('<i class="fa fa-check"></i>').fadeIn('slow');
				$('#dpname-alert').hide();
				$('.dpname-cc').fadeIn();
				$('.dpname').fadeOut('fast');
				$('#edit-dpname-area h3').text($('input.edit-dpname').val()).show(700);
				$('.displayname-ed').fadeIn();
			}
			else{
				alert(data);
				$('#dpname-alert').fadeOut();
				$('.dpname-cc').fadeIn();
			}
		    }
		});
	});

	//Sex Change
	$('.sex2').click(function(){
		$('#edit-sex-area h4').fadeOut('fast');
		$('.sx').show(700);
		$('.sex2').fadeOut();
	});
	$('#sex-cancel').click(function(){
		$('.sx').fadeOut('fast');
		$('#edit-sex-area h4').show(700);
		$('.sex2').fadeIn();
	});
	$('#sex-check').click(function(){
		$('.sex-cc').fadeOut();
		$('#sex-alert').html('<div class="loader sex-loader"></div>').fadeIn();
		$.ajax({
        	    type: 'POST',
        	    url: anivn_ajax.url,
        	    data: {
			action: 'anivn_edit_sex',
			sex: $('select.edit-sex :selected').val(),
			user_id: $('.profile-area').attr('id')
			},
        	    success: function(data){
			if(data.indexOf(1) != -1){
				$('#sex-alert').html('<i class="fa fa-check"></i>').fadeIn('slow');
				$('#sex-alert').hide();
				$('.sex-cc').fadeIn();
				$('.sx').fadeOut('fast');
				$('#edit-sex-area h4').text($('select.edit-sex :selected').val()).show(700);
				$('.sex2').fadeIn();
			}
			else{
				alert(data);
				$('#sex-alert').fadeOut();
				$('.sex-cc').fadeIn();
			}
		    }		
		});
	});

	//Date Change
	$('.date2').click(function(){
		$('#edit-date-area h4').fadeOut('fast');
		$('.date').show(700);
		$('.date2').fadeOut();
	});
	$('#date-cancel').click(function(){
		$('.date').fadeOut('fast');
		$('#edit-date-area h4').show(700);
		$('.date2').fadeIn();
	});
	$('#date-check').click(function(){
		$('.date-cc').fadeOut();
		$('#date-alert').html('<div class="loader date-loader"></div>').fadeIn();
		$.ajax({
        	    type: 'POST',
        	    url: anivn_ajax.url,
        	    data: {
			action: 'anivn_edit_date',
			ngay: $('select#edit-ngay :selected').val(),
			thang: $('select#edit-thang :selected').val(),
			nam: $('select#edit-nam :selected').val(),
			user_id: $('.profile-area').attr('id')
			},
        	    success: function(data){
			if(data.indexOf(1) != -1){
				$('#date-alert').html('<i class="fa fa-check"></i>').fadeIn('slow');
				$('#date-alert').hide();
				$('.date-cc').fadeIn();
				$('.date').fadeOut('fast');
				$('#edit-date-area h4').text($('select#edit-ngay :selected').val() + '/' + $('select#edit-thang :selected').val() + '/' + $('select#edit-nam :selected').val()).show(700);
				$('.date2').fadeIn();
			}
			else{
				alert(data);
				$('#date-alert').fadeOut();
		   		$('.date-cc').fadeIn(); 
			}	
		   }		
		});
	});
	
	//Email Change
	$('.mail').click(function(){
		$('#edit-email-area h4').fadeOut('fast');
		$('.email').show(700);
		$('.mail').fadeOut();
	});
	$('#mail-cancel').click(function(){
		$('.email').fadeOut('fast');
		$('#edit-email-area h4').show(700);
		$('.mail').fadeIn();
	});
	$('#mail-check').click(function(){
		$('.mail-cc').fadeOut();
		$('#mail-alert').html('<div class="loader mail-loader"></div>').fadeIn();
		$.ajax({
        	    type: 'POST',
        	    url: anivn_ajax.url,
        	    data: {
			action: 'anivn_edit_mail',
			mail: $('input.edit-mail').val(),
			user_id: $('.profile-area').attr('id')
			},
        	    success: function(data){
			if(data.indexOf(1) != -1){
				$('#mail-alert').html('<i class="fa fa-check"></i>').fadeIn('slow');
				$('#mail-alert').hide();
				$('.mail-cc').fadeIn();
				$('.email').fadeOut('fast');
				$('#edit-email-area h4').text($('input.edit-mail').val()).show(700);
				$('.mail').fadeIn();
			}
			else{
				alert(data);
				$('#mail-alert').fadeOut();
				$('.mail-cc').fadeIn();
			}
		    }
		});
	});

	/*Change Episode*/
	$('.epi-id').click(function(){
		$('.episode-loader').fadeIn();
		var id = $(this).attr('id');
		$.ajax({
	        type: 'POST',
	        url: anivn_ajax.url,				
	        data: {
				action: 'pick_epi',
				id: id,
				parent: $('.chose-epi').attr('parent'),
			},
			dataType: "json",
	            		success: function(data){
					$('.episode-active').removeClass('episode-active').addClass('episode');
					$("div#" + id).removeClass('episode').addClass('episode-active');
					$('html, body').animate({scrollTop : 0},800);
	                		$('#light-on').html(data['source']);
					$('title').text(data['title']);
					window.history.pushState({path:data['url']},'',data['url']);
					$('#view').text(data['view']);
					$('#like').html(data['like']);
					$('#comment').html('<fb:comments href="'+data['url']+'" num_posts="10" width="100%"></fb:comments>');
					FB.XFBML.parse($('#comment').get(0),function(){
        					$(".FB_Loader").remove();
    					});
					$('.episode-loader').fadeOut();
	            		},
				error: function(data){
					alert('Lỗi khi lấy tập mới!');
				}
	        	});
		});
		$('#pick-epi-button').click(function(){
			$('.episode-loader').fadeIn();
			var k = 0;
			$('.epi-id').each(function(index, element){
				if($(this).text().indexOf($('#epi-number').val()) != -1 ){
					k = 1;
					var id_new = $(this).attr('id');
					$.ajax({
	           				type: 'POST',
	            				url: anivn_ajax.url,				
	            				data: {
							action: 'pick_epi',
							id: id_new,
							parent: $('.chose-epi').attr('parent'),
						},
						dataType: "json",
	            				success: function(data){
							$('.episode-active').removeClass('episode-active').addClass('episode');
							$("div#" + id_new).removeClass('episode').addClass('episode-active');
							$('html, body').animate({scrollTop : 0},800);
	                				$('#light-on').html(data['source']);
							$('title').text(data['title']);
							window.history.pushState({path:data['url']},'',data['url']);
							$('#view').text(data['view']);
							$('#like').html(data['like']);
							$('#comment').html('<fb:comments href="'+data['url']+'" num_posts="10" width="100%"></fb:comments>');
							FB.XFBML.parse($('#comment').get(0),function(){
        							$(".FB_Loader").remove();
    							});
							$('.episode-loader').fadeOut();
						},
						error: function(data){
							alert('Lỗi khi lấy tập mới!');
						}
	        			}); 
					return false;
				}
			});
			if(k == 0){
				$('.episode-loader').fadeOut();
				$('.episode-alert').text('Không tìm thấy!').show(500);
				setTimeout(function(){
					$('.episode-alert').hide(500);
				},3000);					
			}
		});
		$('#epi-number').keypress(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if(keycode == '13'){
				$('#pick-epi-button').click();
			}
		});

		$(".login_button").click(function(){
        	$("#login_modal").modal();
			$("#registration_modal").modal("hide");
    	});
		$("#show_registration").click(function(){
			$("#login_modal").modal("hide");
        	$("#registration_modal").modal();
    	});
		$(".close").click(function(){
        	$("#login_modal").modal("hide");
			$("#registration_modal").modal("hide");
    	});
$('.vmcarousel-normal').vmcarousel({

  // delay in ms
  delay: 4000,

  // transition speed
  speed: 500,

  // enabe autoplay
  autoplay: false,

  // 0 for auto calc
  items_to_show: 1, 

  // min number of items
  min_items_to_show: 6,

  // items to slide at a time
  items_to_slide: 1,
  dont_cut: false,

  // center the current image
  centered: false,

  // start item
  start_item: 0,
  start_item_centered: false,

  // infinite loop
  infinite: false,

  // callback
  changed_slide: $.noop()

});
});			
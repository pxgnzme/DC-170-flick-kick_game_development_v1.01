// VERSION 1.01

$(document).ready(function(){

	$('.table_head a').on('click',function(e){

		e.preventDefault();

		var targetSort = $(this).attr("data-sort");

		$.post(

			'../includes/admin_user_sort.php',

			{
				sort:targetSort
			},

			function(data){

				$('.table_content').html(data);				

			}

		);

	});

	$('.table_head_plays a').on('click',function(e){

		e.preventDefault();

		var targetSort = $(this).attr("data-sort");

		$.logThis("year:"+$('.date_filter[data-sort="year"]').val()+
				" month:"+$('.date_filter[data-sort="month"]').val()+
				" day:"+$('.date_filter[data-sort="day"]').val());

		$.post(

			'../includes/admin_plays_sort.php',

			{
				sort:targetSort,
				year:$('.date_filter[data-sort="year"]').val(),
				month:$('.date_filter[data-sort="month"]').val(),
				day:$('.date_filter[data-sort="day"]').val()
			},

			function(data){

				$('.table_content_plays').html(data);				

			}

		);

	});

	$('.table_content_plays').on('click','.user_info',function(e){

		e.preventDefault();

		var targetUid = $(this).attr("data-uid");

		$.post(

			'../includes/get_user_data.php',

			{
				uid:targetUid
			},

			function(data){

				$('#userModal #user_text').html(data);	

				$('#userModal').foundation('reveal', 'open');			

			}

		);

	});

	$('.date_filter').on('change',function(){

		// sort

		$.post(

			'../includes/admin_plays_sort.php',

			{
				sort:-1,
				year:$('.date_filter[data-sort="year"]').val(),
				month:$('.date_filter[data-sort="month"]').val(),
				day:$('.date_filter[data-sort="day"]').val()
			},

			function(data){

				$('.table_content_plays').html(data);				

			}

		);

	});

	$('#login_form').on('invalid.fndtn.abide', function () {

		var invalid_fields = $(this).find('[data-invalid]');

		$.logThis(invalid_fields);

	})

	.on('valid.fndtn.abide', function () {

		var formdata = $('#login_form .serial').serialize();

		$.post(

			'../includes/admin_login.php',

			{formdata:formdata},

			function(data){

				top.location.href = 'index.php';

			}

		)

	});

});


// =====================================================================================================
// ADDITIONAL FUNCTIONS
// =====================================================================================================
// validate email

function validateEmail(email){ 

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	
	if(!reg.test(email)){ 
	
		return false;
	
	}else{
		
		return true;
		
	} 

} 

function getUniqueTime() {
	var time = new Date().getTime();
	while (time == new Date().getTime());
	return new Date().getTime();
}


//IE placehoder input fix
function placeholderFix(){

    //ie placeholder fix
    $.support.placeholder = ( 'placeholder' in document.createElement('input') );
	
	if($.support.placeholder){
		
		$('.form_label').hide();
	}

}
// resize event


// CONSOLE LOG FUNCTION ---------------------------------------------
// taken from http://www.nodans.com/index.cfm/2010/7/12/consolelog-throws-error-on-Internet-Explorer-IE

jQuery.logThis = function(text){
  
   if((window['console'] !== undefined)){
     
        console.log(text);
    
   }

}


(function ($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
	/* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}

	$(document).ready(function () {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
		/* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
		/* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
		/* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery(document.getElementById('grid-gallery'));
		}

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
		/* ----------------------------------------------------------- */

		$(".grid figure").on('click', function () {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
		/* ----------------------------------------------------------- */

		$(".nav-close").on('click', function () {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function () {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function () {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
		/* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
		/* ----------------------------------------------------------- */

		$("#submit-form").submit((e)=>{
			if (validateName() && validateMsg() && validateNmbr()){
				
			$(".output_message").text("Sending...");
			e.preventDefault()

			var form = $(this);
			$.ajax({
				url: "https://script.google.com/macros/s/AKfycbx-S7dBP9B2t_4p8yiB10rsPfskw2vcWLHTowrB4ZC-pC8BOo7LNLpm87VlpuxqCgs/exec",
				method: "post",
				data: $("#submit-form").serialize(),
				success: function (response) {
					$(".form-inputs").css("display", "none");
					$(".box p").css("display", "none");
					$(".contactform").find(".output_message").addClass("success");
					$(".output_message").text("Message Sent!");
					window.location.reload()
				},
				error: function (err) {
					$(".tabs-container").css("height", "440px");

					$(".contactform").find(".output_message").addClass("error");
					$(".output_message").text("Error Sending!");
				}
			}
			);


		return false;
			}else{
				alert("not working")
				e.preventDefault()
			}
	});

});

$(document).keyup(function (e) {

	/* ----------------------------------------------------------- */
	/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
	/* ----------------------------------------------------------- */
	if (e.keyCode === 27) {
		stop_videos();
		$('.close-content').click();
		$("#navbar-collapse-toggle").removeClass('hide-header');
	}
	if ((e.keyCode === 37) || (e.keyCode === 39)) {
		stop_videos();
	}
});


}) (jQuery);


function validateName() {
    
    let x = document.forms["submit-form"]["name"].value;
    if (x[0] == " ") {
		$(".myspanname").addClass("eror");
        return false;
    }
    else{
		$(".myspanname").removeClass("eror");
        return true;
    }
    
}

function validateMsg() {
    
    let x = document.forms["submit-form"]["message"].value;
    if (x[0] == " ") {
		$(".myspanmsg").addClass("eror");
        return false;
    }
    else{
		$(".myspanmsg").removeClass("eror");
        return true;
    }
    
}

function validateNmbr() {

	let x = document.forms["submit-form"]["number"].value.length;
    if (x != 10) {
		$(".myspannmbr").addClass("eror");
        return false;
    }else{
		$(".myspannmbr").removeClass("eror");
        return true;
    }
}
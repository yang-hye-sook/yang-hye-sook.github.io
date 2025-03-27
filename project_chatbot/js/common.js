$(function () {

	// header의 info 호버시 
	admin_pop();
	function admin_pop(){
		$(".ic_account").click(function(){
			$(".admin_pop").toggle();
		});
	}

	/* GNB */
	var $wrap = $("#wrapper");
	var $gnbLi = $("#gnb>ul li");
	var $gnbMenu = $("#gnb>ul a");
	var $d2bar = $("#depth2_bar");
	setD2bar();
	$gnbMenu.click(function () {
		$gnbLi.removeClass("active");
		$(this).closest("li").addClass("active");
	});
	$gnbLi.bind("addClass", setD2bar);
	function setD2bar() {
		var $active = $("#gnb .active").eq(-1);
		var hHeight = $("#header").outerHeight();
		if ($active.find("ul").length > 0) {
			var $moreTarget = $active.find("li").eq(0);
			if (!$moreTarget.hasClass("active")) $moreTarget.addClass("active");
			$d2bar.show();
			$wrap.css("padding-top", hHeight + $d2bar.outerHeight());
		} else if ($active.parent("ul").parent("li")[0]) {
			var $moreTarget = $active.parent("ul").parent("li");
			if (!$moreTarget.hasClass("active")) $moreTarget.addClass("active");
			$d2bar.show();
			$wrap.css("padding-top", hHeight + $d2bar.outerHeight());
		} else {
			$d2bar.hide();
			$wrap.css("padding-top", hHeight);
		}
	}

	/* #left/#right show/hide 바인딩 */
	$("#right").bind("show", function () {
		$("#util .ic_test").addClass("active");
	});
	$("#right").bind("hide", function () {
		$("#util .ic_test").removeClass("active");
	});
	$("#left, #right").bind("show hide", function () {
		$(window).trigger("resize"); //DataTables 칼럼 폭 리사이즈 등
	});
	/* #center show/hide 바인딩 */
	$("#center").bind("show", function () {
		$("#left").removeClass("wide");
	});
	$("#center").bind("hide", function () {
		$("#left").addClass("wide");
	});
});

(function ($) {
	$.each(["show", "hide", "addClass"], function (i, ev) {
		//Trigger Event 만들기
		var el = $.fn[ev];
		$.fn[ev] = function () {
			el.apply(this, arguments);
			this.trigger(ev);
			return this;
		};
	});

	$.fn.autoTextareaHeight = function () {
		return this.each(function () {
			var $textarea = $(this);
			var bw = Number($textarea.css("border-top-width").replace("px", "")) + Number($textarea.css("border-bottom-width").replace("px", ""));
			clearTimeout($textarea[0].timeoutForH);
			$textarea[0].timeoutForH = setTimeout(function () {
				//Timeout : 붙여넣기 대응
				$textarea.css("height", $textarea.height(0).prop("scrollHeight") + bw);
			}, 0);
		});
	};
})(jQuery);

function openModal(href) {
	var dNum = $(".modal_wrap").length;
	$("#blank").append('<div class="modal_back"></div><div class="modal_wrap modal_wrap' + dNum + '"></div>');
	$(".modal_wrap" + dNum).load(href, function () {
		var box = $(this);
		var boxBack = box.prev(".modal_back");
		boxBack.css({ "z-index": 500 + dNum });
		box
			.css({ "z-index": 500 + dNum, left: "50%", top: "50%", "margin-left": -box.outerWidth() / 2, "margin-top": -box.outerHeight() / 2 })
			.find(".modal_close")
			.click(function () {
				boxBack.remove();
				box.remove();
				return false;
			});
	});
}
function setDatepicker() {
	$("input.datepicker").datepicker({
		duration: 0,
		dateFormat: "yy.mm.dd",
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: true,
		prevText: "이전달",
		nextText: "다음달",
		currentText: "오늘",
		monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
		showMonthAfterYear: !0,
		yearSuffix: ".",
		showOn: "focus",
		buttonImage: "../img/btn_datepicker.png",
		buttonImageOnly: true,
		buttonText: "일자선택",
	});
}





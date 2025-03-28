// ---------------------COMMON MODULE---------------------
var $chatbot;
var $fn = {
	$wrapper: $(".wrapper"),
	$main: $("main"),
	$contents: $(".contents"),
	$popupElem: $(".popup-wrapper"),
	init: function () {
		var _this = this;
		var $top = $(window).scrollTop();
		if (this.$main.hasClass("dashboard")) {
			this.$wrapper.addClass("wrapper-dashboard");
		}
		if (this.$main.hasClass("login-main")) {
			this.$wrapper.addClass("wrapper-login-form");
		}
		// if (this.$main.height() > this.$contents.height()) {
		// 	this.$contents.css("height", this.$main.height());
		// }

		// _this.scrollTop.call(_this, $top);
		return _this;
	},
	sticky: function () {
		var _this = this;
		var timer;
		$(window).on("scroll", function () {
			var $top = $(this).scrollTop();
			clearTimeout(timer);
			timer = setTimeout(function () {
				// _this.scrollTop.call(_this, $top);
			}, 0);
		});
	},
	scrollTop: function ($top) {
		var $header = $(".header"),
			$headerTop = $(".header-top");
		if ($top > 0) {
			$header.css("top", $top);
			$headerTop.css("top", $top + 70);
		} else {
			$header.add($headerTop).removeAttr("style");
		}
	},
	popup: function (type, fn) {
		var _this = this;
		switch (type) {
			case "open":
				_this.$popupElem.addClass("show");
				break;
			case "close":
				_this.$popupElem.removeClass("show");
				break;
		}
		var $bg = _this.$popupElem.find(".popup-bg");
		var $close = _this.$popupElem.find(".popup-close-button");
		$bg.add($close).on("click", function () {
			_this.$popupElem.removeClass("show");
		});
		if (typeof fn === "function") {
			fn();
		}
	},
};
$chatbot = $.extend({}, $fn);
$.fn.select = function () {
	var $select = $(this);
	if ($select.attr("data-select") !== undefined) {
		$select.each(function () {
			var $this = $(this),
				$orgSelect = $this.children("select"),
				$orgData = $orgSelect.attr("name"),
				$orgOption = $orgSelect.children("option"),
				$selected = $("<div class='selected'></span>"),
				$selectList = $("<ul class='select-list'></ul>");

			$this.children("select").siblings().remove();

			$this.append($selected, $selectList);
			$orgOption.each(function (idx) {
				var $selectItem = $("<li class='select-item'></li>");
				if ($(this).filter(":selected").length != 0) {
					$selectItem = $("<li class='select-item on'></li>");
					$selected.text($(this).text());
				}
				$selectItem.text($(this).text());
				$selectList.append($selectItem).attr("id", $orgData);
			});
			$this.off("click").on("click", function () {
				var $this = $(this),
					$list = $this.children(".select-list"),
					$item = $list.children(".select-item"),
					$text = $this.children(".selected");

				if (!$this.hasClass("on")) {
					$this.children("select").focus();
					$this.addClass("on");
				}
				$item.off("click").on("click", function (e) {
					var $list = $(this),
						$idx = $list.index(),
						$option = $list.parent(".select-list").siblings("select").children("option");
					$option.eq($idx).prop("selected", true).siblings($option).prop("selected", false);
					$text.text($list.text());
					$list.addClass("on").siblings().removeClass("on");
					$option.parent().trigger("change");
					setTimeout(function () {
						$this.removeClass("on");
					}, 100);
				});
			});
			$this.children("select").on("blur", function (e) {
				setTimeout(function () {
					if ($this.hasClass("on")) {
						$this.removeClass("on");
					}
				}, 300);
			});
		});
	}
};
// ---------------------COMMON MODULE END---------------------
$(function () {
	$chatbot.init().sticky();
	$(".select").each(function () {
		$(this).attr("data-select", "");
	});
	$(".select").select();

	// 200821
	if ($(".dashboard").length != 0) {
		$(window).on("scroll", function () {
			var $top = $("html, body").scrollTop();
			if ($top > 70) {
				$(".dashboard .right").css({
					top: 0,
					"max-height": "100%",
				});
			} else {
				$(".dashboard .right").removeAttr("style");
			}
		});
	}

	//200826
	if ($(".main").children(".add-section").length != 0) {
		if ($(".main").height() < 749) {
			$(".add-section").wrap("<div class='add-section-wrap'></div>");
			$(".add-section-wrap")
				.css({
					position: "relative",
					width: "100%",
					height: 600,
				})
				.children(".add-section")
				.css({
					bottom: 50,
				});
		}
	}
});

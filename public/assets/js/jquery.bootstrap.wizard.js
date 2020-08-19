/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */
;(function ($) {
const bootstrapWizardCreate = function(_element, _options) {
	var element = $(_element)
	var obj = this

	// selector skips any 'li' elements that do not contain a child with a tab data-toggle
	const baseItemSelector = 'li:has([data-toggle="tab"])'

	// Merge options with defaults
	var $settings = $.extend({}, $.fn.bootstrapWizard.defaults, _options)
	var $activeTab = null
	var $navigation = null

	this.rebindClick = function(selector, fn)
	{
		selector.unbind('click', fn).bind('click', fn)
	}

	this.next = function () {

		// If we clicked the last then dont activate this
		if(element.hasClass('last')) {
			return false
		}

		if ($settings.onNext && typeof $settings.onNext === 'function' && $settings.onNext($activeTab, $navigation, obj.nextIndex())===false){
			return false
		}

		// Did we click the last button
		const $index = obj.nextIndex()

		if ($index > obj.navigationLength()) {
            //
		} else {
			$navigation.find(baseItemSelector + ':eq('+$index+') a').tab('show')
		}
	}

	this.display = function(index) {
		$navigation.find(baseItemSelector + ':eq('+index+')').show()
	}

	this.remove = function(args) {
		var $index = args[0];
		var $removeTabPane = typeof args[1] != 'undefined' ? args[1] : false;
		var $item = $navigation.find(baseItemSelector + ':eq('+$index+')');

		// Remove the tab pane first if needed
		if($removeTabPane) {
			var $href = $item.find('a').attr('href');
			$($href).remove();
		}

		// Remove menu item
		$item.remove();
	};

	const innerTabClick = function (e) {
		// Get the index of the clicked tab
		var clickedIndex = $navigation.find(baseItemSelector).index($(e.currentTarget).parent(baseItemSelector));

		if($settings.onTabClick && typeof $settings.onTabClick === 'function' && $settings.onTabClick($activeTab, $navigation, obj.currentIndex(), clickedIndex)===false){
			return false
		}
	}

	$navigation = element.find('ul:first', element)
	$activeTab = $navigation.find(baseItemSelector + '.active', element)

	if (!$navigation.hasClass($settings.tabClass)) {
		$navigation.addClass($settings.tabClass)
	}

	// Load onInit
	if ($settings.onInit && typeof $settings.onInit === 'function'){
		$settings.onInit($activeTab, $navigation, 0)
	}

	// Load onShow
	if ($settings.onShow && typeof $settings.onShow === 'function') {
		$settings.onShow($activeTab, $navigation, obj.nextIndex())
	}

	$('a[data-toggle="tab"]', $navigation).on('click', innerTabClick)
}

$.fn.bootstrapWizard = function(options) {
	return this.each(function () {
		const element = $(this)

		// Return early if this element already has a plugin instance
		if (element.data('bootstrapWizard')) return

		// pass options to plugin constructor
		const wizard = new bootstrapWizardCreate(element, options)

		// Store plugin object in this element's data
		element.data('bootstrapWizard', wizard)
	})
}

// expose options
$.fn.bootstrapWizard.defaults = {
	tabClass:         'nav nav-pills',
	nextSelector:     '.wizard li.next',
	previousSelector: '.wizard li.previous',
	firstSelector:    '.wizard li.first',
	lastSelector:     '.wizard li.last',
	onShow:           null,
	onInit:           null,
	onNext:           null,
	onPrevious:       null,
	onLast:           null,
	onFirst:          null,
	onTabChange:      null,
	onTabClick:       null,
	onTabShow:        null
};

})(jQuery)

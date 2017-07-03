(function ($) {
    "use strict";
    var items;
    var settings;
    var currentBreakpoint;
    var windowHeight;
    $.fn.vh = function (options) {

        settings = $.extend(true, {
            // defaults
            debug: false,
            force: false,
            hardSetHeight: false,
            breakpoints: {
                xs: 400,
                sm: 576,
                md: 768,
                xmd: 992,
                lg: 1024,
                xl: 1200,
                xxl: 1400,
                xxxl: 1600,
                xxxxl: 1900
            }
        }, options);
        //sort breakpoint by value ASC
        var keysSorted = Object.keys(settings.breakpoints).sort(function (a, b) {
            return settings.breakpoints[a] - settings.breakpoints[b]
        });
        var sortedBreakpoints = {};
        for (var ind in keysSorted) {
            sortedBreakpoints[keysSorted[ind]] = settings.breakpoints[keysSorted[ind]];
        }
        settings.breakpoints = sortedBreakpoints;

        currentBreakpoint = getCurrentBreakpoint();

        settings.debug ? console.log('Init VH') : false;
        settings.debug ? console.log('Settings', settings) : false;
        //do work ?
        var work = settings.force;

        if (!work) {
            //check browser
            work = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
            settings.debug ? console.log('browser detection returns : ', work ? 'yes' : 'no') : false;
        } else {
            settings.debug ? console.log('Force work on all browsers') : false;
        }

        if (work) {
            var selectors = '[data-vh]';
            for (var key in settings.breakpoints) {
                selectors += ',[data-vh-' + key + ']';
            }
            settings.debug ? console.log('Generated selectors : ', selectors) : false;

            items = this.filter(selectors);
            this.each(function (ind, el) {
                items = items.add($(el).find(selectors))
            });

            if (items.length > 0) {
                //have items. continue.
                settings.debug ? console.log('Items found : ', items) : false;
                resize(true);
                $(window).resize(function () {
                    if (windowHeight != window.innerHeight) {
                        windowHeight = window.innerHeight;
                        resize(true);
                    } else {
                        resize();
                    }
                })
            }
        }
        return this;
    };

    //resizes the elements to the specified percentage of the window height
    function resize(force) {
        if (force || currentBreakpoint != getCurrentBreakpoint()) {
            currentBreakpoint = getCurrentBreakpoint();
            var height = window.innerHeight;
            var res = getBreakpointSpecificKeysAndSelectors();
            settings.debug ? console.log(res) : false;
            items.removeAttr('style').filter(res.selectors).each(function (ind, el) {
                if (res.keys) {
                    var fallback = true;
                    for (var ind in res.keys) {
                        if ($(el).data('vh-' + res.keys[ind])) {
                            if (settings.hardSetHeight) {
                                $(el).height(height * ($(el).data('vh-' + res.keys[ind]) / 100));

                            } else {
                                $(el).css('min-height', height * ($(el).data('vh-' + res.keys[ind]) / 100));

                            }
                            fallback = false;
                            break;
                        }

                    }
                    settings.debug ? console.log('Fallback to general ( data-vh ) ? ', fallback ? 'yes' : 'no') : false;
                    if (fallback) {
                        if ($(el).data('vh')) {
                            if (settings.hardSetHeight) {
                                $(el).height(height * ($(el).data('vh') / 100));
                            } else {
                                $(el).css('min-height', height * ($(el).data('vh') / 100));
                            }

                        }
                    }
                } else {
                    if ($(el).data('vh')) {

                        if (settings.hardSetHeight) {
                            $(el).height(height * ($(el).data('vh') / 100));
                        } else {
                            $(el).css('min-height', height * ($(el).data('vh') / 100));
                        }
                    }
                }
            })
        }
    }

    function getCurrentBreakpoint() {
        var result = 'all';
        var width = window.innerWidth;
        for (var key in settings.breakpoints) {
            if (settings.breakpoints[key] <= width) {
                result = key;
            }
        }
        return result;
    }

    function getBreakpointSpecificKeysAndSelectors() {
        var result = '[data-vh]';
        if (currentBreakpoint != 'all') {
            var keys = Object.keys(settings.breakpoints);
            //slice from breakpoint up
            keys = keys.slice(0, keys.indexOf(currentBreakpoint) + 1).reverse();
            for (var key in keys) {
                result += ',[data-vh-' + keys[key] + ']';
            }
        }
        return {
            selectors: result,
            keys: keys ? keys : false
        };
    }

})(jQuery);
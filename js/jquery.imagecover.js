/**
 * imagecover.js
 * Author & copyright (c) 2014: Andrea Dell'Orco
 * Url: adostudio.it
 * ispirated by johnpolacek / imagefill.js plugin
 * MIT license
 *
 *
 * REQUIRES:
 * imagesLoaded - https://github.com/desandro/imagesloaded
 * modernizr (optional)
 *
 */

(function($) {

    $.fn.imagecover = function(options) {
    
        var $container  = this,
            defaults    =  {
                throttle        : 200, 
                runOnce         : false,
                css2            : false,
                preloadAllImages: false,
                addPreload      : false,
                loadingClass    : 'ic-loading'
            },
            settings = $.extend({}, defaults, options);

        var prepareCoverImage = function() {
            
            $container.each(function() {
                var $single      = $(this),
                    $img         = $single.find('>img').first().css({'position':'absolute'}),
                    containerPos = $single.css('position');
                
                $single.css({
                    'overflow':'hidden',
                    'position': (containerPos === 'static') ? 'relative' : containerPos
                });

                toggleLoading.call(this);
                 
                var $preloadItem = (settings.preloadAllImages) ? $(this) : $img;
                 
                $preloadItem.imagesLoaded().done(function (img) {
                    
                    var imgRatio;
                    
                    $single.data('ic-height',$single.height());
                    $single.data('ic-width', $single.width());

                    var width   = $img.width(),
                        height  = $img.height();

                    imgRatio = (!width && !height) ? false : $img.width() / $img.height();
                    
                    $single.data('ic-imgRatio', imgRatio);
                    
                    if (!imgRatio) {
                        delegateCover.call(this);
                    } else {
                        toggleLoading.call(this);
                        coverImage.call(this);
                    }
                });
                
            });
            
            if (!settings.runOnce)
                window.setInterval(function() {
                    checkSizeChange()
                }, settings.throttle);
        };
        

        var toggleLoading = function() {
            var loaded = $(this).hasClass(settings.loadingClass);

            if (loaded) {
                $(this).removeClass(settings.loadingClass);             
            } else {
                $(this).addClass(settings.loadingClass);                
            }

            if (settings.addPreload) {
                var preloaderClass = (!settings.addPreload) ? settings.addPreload : 'ic-preloader';

                if (loaded) {
                    var html = '<div class="' + preloaderClass + '" style="position:absolute; left:0; right:0; bottom:0; top:0; z-index:999999;"></div>';
                    $(this).prepend(html);
                } else {
                    $(this).find('.' + preloaderClass).fadeOut(function() {
                        $(this).remove();
                    });
                }
            }
        };

        
        var coverImage = function(forced) {

            var $containerToCover = (forced) ? forced : $container;
            
            $containerToCover.each(function() {
                
                var $single = $(this),
                    $img    = $single.find('>img').first();
                    width   = $single.width(),
                    height  = $single.height(),
                    iRatio  = $single.data('ic-imgRatio'),
                    cRatio  = width / height;
                
                if (typeof iRatio === "undefined" || !iRatio) 
                    return false;

                if (cRatio < iRatio) {
                    $img.css({
                        width: 'auto',
                        height: height,
                        top: 0,
                        left: -((height * iRatio) - width) / 2
                    });
                } else {
                    $img.css({
                        width: width,
                        height: 'auto',
                        top: -((width / iRatio) - height) / 2,
                        left: 0
                    });
                }
            });
        };
        
        var coverImageCss3 = function() {
            $container.each(function() {
                var $single = $(this),
                    $img    = $single.find('>img').first();
        
                var $preloadItem = (settings.preloadAllImages) ? $single : $img;

                toggleLoading.call(this);
                
                $preloadItem.imagesLoaded().done(function (img) {
                    toggleLoading.call(this);
                });
                
                $single.css({
                    'background-repeat':'no-repeat',
                    'background-position':'center',
                    'background-size':'cover',
                    'background-image':'url(' + $img.attr('src') + ')'
                });

                $img.remove();
            });
        };
        
        var delegateCover = function() {
            var $single = $(this);

            window.setTimeout(function(){
                var $img = $single.find('>img').first();
                
                imgRatio = (!width && !height) ? false : $img.width() / $img.height();
                    
                $single.data('ic-imgRatio', imgRatio);

                if (!imgRatio) {
                    delegateCover.call(this);
                } else {
                    toggleLoading.call(this);
                    coverImage.call(this);
                }
            }, settings.throttle);
        };
        
        var checkSizeChange = function() {      
            $container.each(function() {
                var $single = $(this),
                    height  = $single.height(),
                    width   = $single.width();
                            
                if (($single.data('ic-height') !== height || $single.data('ic-height') !== width)) {
                    $single.data('ic-height', height);
                    $single.data('ic-height', width);

                    coverImage($single);
                }
            });
        };
        
        
        if (!Modernizr.backgroundsize || settings.css2) 
            prepareCoverImage();
        else 
            coverImageCss3();
        
        return this;
  };

})(jQuery);

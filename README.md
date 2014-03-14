Imagecover.js
==========
Imagecover is a jQuery plugin that allows an image to cover all its container.

####Author: Andrea Dell'Orco - [Adostudio](http://www.adostudio.it)
####License: Mit License
* * *
##Demo & Usage:
+ Regular Usage: (http://dev.adostudio.it/jquery/imagecover/demo.html)
+ Background Fullscreen: (http://dev.adostudio.it/jquery/imagecover/demo-background.html)
+ Background Fullscreen (with preloader): (http://dev.adostudio.it/jquery/imagecover/demo-background-loading.html)
* * *

## Install

+ Include [imagesloaded.pkgd.min.js](http://imagesloaded.desandro.com/imagesloaded.pkgd.min.js) - [Imagesloaded Plugin](https://github.com/desandro/imagesloaded)
+ Include [jquery.imagecover.js](http://dev.adostudio.it/jquery/imagecover/js/jquery.imagecover.js)

## Usage
Javascript: 
``` js
$('.containerClass').imagecover();
```
HTML Markup:
``` html
<div class="containerClass">
  <img src="img/monkey.jpg">
</div>
```
## Options
``` js
$('.containerClass').imagecover({
  runOnce	: false,
	throttle: 200 , 
	css2	: false,
	preloadAllImages:false,
	loadingClass: 'ic-loading',
	addPreload: false
});
```

+ `runOnce` _false_/_true_: Don't Monitor costantly the changes of the conatainers. If you want use "oneshot" feature.
+ `throttle` _integer_ : Elapsed time between checks the variation of the container.
+ `css2` _false_ / _true_ : Avoid css3 features and force to use css2 procedure (used for old browsers). 
+ `preloadAllImages` _false_ / _true_ : Wait the loading of all images in the container to cover itself with the image (maybe  the container size depends from inner images) and  to remove _ladingClass_ and _preloader_.
+ `loadingClass` _css class_ : Class applied to the containers while loading the image/s.
+ `addPreload` _false_ / _true_ / _css class_ : If is specified a class, will be append an element _preloader_ with this class to the containers while images are loading. If is set _true_ the default class is _ic-preloader_

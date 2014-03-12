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

;(function($) {

  $.fn.imagecover = function(options) {
  		
  	    var $container = this,
  	    $img = $container.find('>img').first().addClass('ic-loading').css({'position':'absolute'}),
	    defaults =  {
	    	runOnce	: false,
	    	throttle: 200 , // 5fps
	    	css2	: false
	    	},
        settings =  $.extend({}, defaults, options);


        // -------------------------- inizializzo la procedura  -------------------------- //
        var __prepareCoverImage=function(){
        	  $container.each(function(){

	        	var $thisContainer=$(this),
	        	$img=$thisContainer.find('>img').first().addClass('loading').css({'position':'absolute'}),
	        	containerPos = $thisContainer.css('position');;

	    	     $thisContainer.css({'overflow':'hidden','position':(containerPos === 'static') ? 'relative' : containerPos});
	    	     
	    	     //attendo caricamento di tutte le immagini all'interno del div 
	    	     //per essere sicuro che le dimensioni non varino una volta che queste sono state caricate.
			     $thisContainer.imagesLoaded().done(function(img) {
			     	
			     	var thisImgRatio;
			     	
			     	$thisContainer.data('ic-height',$thisContainer.height());
			     	$thisContainer.data('ic-width',$thisContainer.width());
			     	
			     	//può succedere che a causa di latenza, l'immagine è caricata ma non riesco a 
			     	//stabilirne ancora le dimensioni all'interno del dom, allora inizio la ricorsivtà di controllo
		      		if( $img.width()== 0 && $img.height()==0) 
		      			thisImgRatio= false;
		      		else 
		      			thisImgRatio=$img.width()/$img.height();
		      		
		      		$thisContainer.data('ic-imgRatio', thisImgRatio);
			        
			        if(thisImgRatio==false)	
			       	 	__delegateCover($thisContainer);
				    else{
				    	$img.removeClass('ic-loading');
				    	__coverImage($thisContainer);
				    }
			     	
			     });
	        	
	        });
	        
	        //controllo periodico sulle dimensioni dei container
	        if(!settings.runOnce)
	        	window.setInterval(function(){__checkSizeChange()},settings.throttle);
        };
        
        // -------------------------- manipolo l'immagine  -------------------------- //
        var __coverImage=function($containerForced){
        	var $containerToCover=($containerForced?$containerForced:$container);
        	
        	$containerToCover.each(function(){
        		
        		var $thisContainer = $(this),
        		containerW = $thisContainer.width(),
        		containerH = $thisContainer.height(),
        		imgRatio =	$thisContainer.data('ic-imgRatio'),
        		containerRatio = containerW/containerH,
        		$img = $thisContainer.find('>img').first();
				
				//vuol dire che non ho ancora finito il preloading
		        if(imgRatio==undefined||!imgRatio) return false;

		        if (containerRatio < imgRatio) {
		          //va alzata
		          $img.css({
		              width : 'auto',
		              height : containerH,
		              top : 0,
		              left : -(containerH*imgRatio-containerW)/2
		            });
				} else {
		          //va allargata
		          $img.css({
		              width : containerW,
		              height : 'auto',
		              top : -(containerW/imgRatio-containerH)/2,
		              left : 0
		            });
		        }
        		
        		
        	});
        	
        };
        
         // -------------------------- applico struttura css3  -------------------------- //
        var __coverImageCss3=function(){
        	$container.each(function(){
        		var $thisContainer=$(this),
        		$img=$thisContainer.find('>img').first();
        
	        	$thisContainer.css({
	        		'background-repeat':'no-repeat',
	        		'background-position':'center',
	        		'background-size':'cover',
	        		'background-image':'url('+$img.attr('src')+')'
	        	});
	        	$img.remove();
        	});
        };
        
        // -------------------------- controllo quando l'immagina ha finito di caricarsi realmente  -------------------------- //
        var __delegateCover=function($dContainer){
        	window.setTimeout(function(){

					var $img = $dContainer.find('>img').first(),
					thisImgRatio;
					
					if( $img.width()== 0 && $img.height()==0) thisImgRatio= false;
	      			else thisImgRatio=$img.width()/$img.height();
	      			
	      			$dContainer.data('ic-imgRatio', thisImgRatio);
	      			
	      			if(!thisImgRatio) 
	      				__delegateCover($dContainer);
					else { 
						$img.removeClass('ic-loading');
						__coverImage($dContainer);
					}
					return true;
					
			},settings.throttle);
        };
        
       // -------------------------- controllo se le dimensioni sono variate  -------------------------- //
        var __checkSizeChange=function(){
        	
        	  $container.each(function() {
        	  	
        	  	var $thisContainer=$(this),
		        checkH = $thisContainer.height();
		        checkW = $thisContainer.width();
		        		    
			      if (($thisContainer.data('ic-height')!== checkH || $thisContainer.data('ic-height') !== checkW )) {
			      	$thisContainer.data('ic-height',checkH);
			      	$thisContainer.data('ic-height',checkW);
			       __coverImage($thisContainer);
			      }
			      
		      });
        };
        
        
        //se posso usare css3, uso css3, altrimenti avvio procedura js
        if (!Modernizr.backgroundsize||settings.css2) 
        	__prepareCoverImage();
       	else 
       		__coverImageCss3();
        
        return this;
        

  };

}(jQuery));
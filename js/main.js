$(document).ready(function(){
	
    // vars
    var $wh = $(window).height(),
    	$ww = $(window).width(),
    	$window = $(window),
    	modulesVertPos = new Array(),
    	$root = $('html,body'),
    	$navLinks = $('.mainNavigation a');
    
    // methods
    function setHeight(el, perc){
		var ht = $wh * perc / 100;
		$(el).css({
			height : ht
		});
    };
    
    function setVertPos($el, perc, isPositioned){
    	var ht = $el.height(),
    		topShift = (($wh * perc / 100) - (ht/2)) + 'px';
    	
    		//console.log(topShift);
    	
    	if(isPositioned){
	    	$($el).css({
	    		top : topShift
	    	});
    	} else {
	    	$($el).css({
	    		marginTop : topShift
	    	});
    	}
    };
    
    
    // css manipulation        
    $('.blowUp .content').css({
	   height: $wh 
    });
    
    $('.blowUp .sandwich').css({
	   height: $wh 
    });
	
	$('.blowUp .showApp').css({
	   height: $wh 
    });
    
    $('.preShowApp').css({
	   height: $wh 
    });
    
    
    $('.description').css({
	   right : (($wh/2)-320) + 'px' 
    });
    $('.showAppDescription').css({
	   right: (($wh/2)-260) + 'px',
	   width: 350 
    });
     
    var i = 0;
    $('.module').each(function(){
	   setVertPos($(this), 60-i*3, true);
	   modulesVertPos.push(parseInt($(this).css('top')));
	   i++;
    });
        
    console.log(modulesVertPos);
	function getCenterPos($el){
		var w = $el.width();
		return parseInt((($ww/2) - (w/2)));
	}
		    
	$('.blowUp').find('.content').waypoint(function(direction){
	    
	    var thisModule = $(this).find('.module'),
	   		dataScroll = thisModule.attr('data-scroll'),
	    	thisLink = $('a.'+dataScroll);	    
    if(direction == 'down'){
	    
	    $navLinks.removeClass('activeLink');
	    thisLink.addClass('activeLink');
	    	 
	    thisModule.transition({
	    	left : getCenterPos(thisModule)//,
		   //opacity: 1 
	    },500,'snap', function(){
		    var info = thisModule.next('.info').text().replace(/\s+/g, ' ');
		    $('.description').text(info);
	    });
    } else {
    	thisLink.removeClass('activeLink');
    	var prevDataScroll = thisModule.parent().prev('.content').find('.module').attr('data-scroll');
    	$('a.'+ prevDataScroll).addClass('activeLink');
    	
    	
	    thisModule.transition({
	    	left : '-100%'//,
		   //opacity: 1 
	    },500,'ease', function(){
		    var info = $(this).parent().prev('.content').find('.info').text().replace(/\s+/g, ' ');
		    $('.description').text(info);
	    });
    }

    });
    
    $('.blowUp').waypoint(function(direction){
	    
	    if(direction == 'down'){
	    	$('.mainNavigation').transition({
		    	right: 0
	    	},200,'snap');   
		} else {
			$('.mainNavigation').transition({
		    	right: '-100px'
	    	},200,'snap'); 
		   			
	   		
	   		
		}

    });
    
    $('.blowUp').find('.sandwich').waypoint(function(direction){
	    
	    if(direction == 'down'){
	    	console.log('sandwhich down');
		    $('.module').transition({
		    	top : ($wh/3)
			    
		    },500,'easeInBack');    
		} else {
			var j = 0;
	   		$('.module').each(function(){
		   		$(this).transition({
			   		top : modulesVertPos[j]
		   		}, 500, 'easeOutBack');
		   		j++;
		   		if(j > modulesVertPos.lenght) j = modulesVertPos.lenght; 
	   		});
		   			
	   		
	   		
		}

    });
    
    $('.blowUp').find('.preShowApp').waypoint(function(direction){
	    
	    if(direction == 'down'){
	    	console.log('preShowApp down');
		    $('.module').transition({
		    	opacity: 0
		    },300,'ease');    
		} else {
			console.log('preShowApp up');
			$('.module').transition({
		    	opacity : 1
		    },300,'ease');
		    		   			
	   		
	   		
		}

    });
    
    $('.blowUp').find('.showApp').waypoint(function(direction){
	    if(direction == 'down'){
	    	$navLinks.removeClass('activeLink');
	    	$('a.showAppNav').addClass('activeLink');
			$('.description').transition({
				opacity : 0
			},100,'ease',function(){
				$('.showAppDescription').transition({
					opacity: 1
				},200,'snap');
			});		        
		} else {
			console.log('ShowApp up');
			$('a.showAppNav').removeClass('activeLink');
			$('.showAppDescription').transition({
				opacity : 0
			},100,'ease',function(){
				$('.description').transition({
					opacity: 1
				},200,'snap');
			});
		}

    });
    
     // timer
     var timeout = 180000;
     $(document).bind("idle.idleTimer", function(){
	     window.scrollTo(0, 0);
     });
     $.idleTimer(timeout);
    $(window).scroll(function(){
	   //console.log($(window).scrollTop()); 
	   var numPixScrolled = $(window).scrollTop();
	   if( numPixScrolled >= $wh/2){
	   		
	   		$('.centered').transition({
		    	opacity : 1
		    });
		   
	   }
	});
    
    var centered = $('.centered').offset().top;
    console.log(centered);
    
    // call methods
    setHeight('.home', 100);
    setHeight('.overlayBlack', 100);
    setHeight('.blowUp', 1100);
    setVertPos($('.home .content'), 40, false);
    setVertPos($('.mainNavigation'), 50, true);
    setVertPos($('.showAppDescription'), 47, true);
    setVertPos($('.description'), 47, true);
    setVertPos($('.home .downArrow'), 90, false);
    
   
    
    
      	    
    
});
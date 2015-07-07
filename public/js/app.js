(function($) {

  var mobile = false,
      collection = $('[role="collection"]');

  if(collection){

    var info = false, displayOut = null,
        author_text = '', desc_text = '', title_text ='', type_text = '', typeclass = '',
        $info = $('.bite-description');

    var tgt = $('.bite-sphere li'),
        devs = $('.devs li'),
        l = tgt.length,
        r = 200,
        center = 240,
        rad = (360/l) * (Math.PI/180); 

    // scroll vars

    var a = $('.bite-sphere'),
        b = $('.developers'),
        height = $('.page-a').height()
    
    var excess = 500 - height,
        ratio = 0, top = 0, ztop = 0;

    // var ypos = 'calc(50% - 250px)';
    var targetY = 150,
        ypos = 0;

    function init(){

      buildDevs();

      pageSwitch(0); // set page A active        
      $(window).scrollTop(0);

      tgt.each(function(i){

        $this = tgt.eq(i);

        var img = $this.data('src'),
            tx = center + Math.sin(rad*i)*r,
            ty = center + Math.cos(rad*i)*r;
            
        $this.css({
            'transform':'translate('+tx+'px, '+ty+'px)',
            'z-index':1
        }).find('.sphere-container').css({
          'background-image':'url(/img/'+ img.toLowerCase() +'.png)'
        })   

        $this
            .on('mouseenter', function (e){
                // display info
                info = true;
                author_text = tgt.eq(i).find('input').data('author')
                desc_text = tgt.eq(i).find('input').data('description');
                title_text = tgt.eq(i).find('input').data('title')
                type_text = tgt.eq(i).find('input').data('type');

                $info.find('.author').html(author_text)
                $info.find('.description').html(desc_text)
                $info.find('.title').html(title_text)
                $info.find('.type').html(type_text).removeClass(typeclass).addClass(type_text);


                if(!$info.hasClass('active')){
                  typeclass = type_text
                  $info.velocity("slideDown", {duration: 300});
                  $info.addClass('active')
                }                        
            })
            .on('mouseleave', function (e){
                removeInfoDisplay()
                info = false;
            })
      })
      radialTest();

      setInterval(function (e){
        
        a.css({
          opacity: 1 - ratio
        })
        b.css({
          top: ypos,
          opacity: ratio * ratio
        })
      }, 1000/60)

      tgt.velocity({opacity:1},{delay:400, duration: 300});

    }
    function buildDevs(){
      var num = devs.length + 1 // humanised
          // devpad = 200// total width is 100px + 100px 
      devs.each(function (i, el){
        $this = $(el);

        var avatar = $this.data('avatar'),
            tag = $this.data('tag');
            
        $this.css({
          'background-image': 'url(/'+ avatar +')'
        })
        
      })
    }

    function removeInfoDisplay(){
      displayOut = setTimeout(function(){
        if(info) {
          clearTimeout(displayOut)
        } else {
          info = false;
          $info.velocity("slideUp", {duration: 300});
          $info.removeClass('active')
        }

      }, 3000)
    }

    function radialStar(dimension){

      tgt.each(function(i){

        $this = tgt.eq(i);

        var tx = center + Math.sin(rad*i)*r,
            ty = center + Math.cos(rad*i)*r;

        $this.css({
          'transform':'translate('+tx+'px, '+ty+'px)'
        }).find('.sphere-container').css({
          'width':dimension,
          'height':dimension,
          'transform':'translate(-'+dimension/2+'px,-'+dimension/2+'px)'
        })
      })
    }
    function gridView(dimension){

        var row = 0, pad = 25, wpad = (window.innerWidth/3)/4;
    
        tgt.each(function(i){

            $this = tgt.eq(i);

            var mod = i % 3;

            if(mod == 0) row++;

            var tx = (mod * (100 + wpad)) + (150-wpad),
                ty =  row*(r+pad)

            $this.css({
                'transform':'translate('+tx+'px, '+ty+'px)',
            }).find('.sphere-container').css({
                'width':dimension,
                'height':dimension,
                'transform':'translate(-'+dimension/2+'px,-'+dimension/2+'px)'
            })
        })
    }

    var cwidth = window.innerWidth,
        small = false;

    
    window.addEventListener('scroll', function (e){

      top = window.pageYOffset;
      ratio = top/height
      pageSwitch(ratio); 

      if(top > 0) {
        $('.page-a').addClass('scrolling')
        ypos = ((1 - ratio) * height) + ((1 - ratio) * (height/2)) + targetY;
      } else {
        ypos = 0;
        $('.page-a').removeClass('scrolling')
      }

    })

    function getSizes(){
      height = $('.page-a').height();
      excess = 500 - height;
    }

    function radialTest(){
      cwidth = window.innerWidth;

      if(cwidth < 480){
        r = 480/5;
        gridView(100);
        small = true;
      } else {

        if(cwidth < 768){
          r = 200;
          radialStar(cwidth/5);
          small = true;
        } else{
          r = 200;
          if(small){
            radialStar(150);
            small = false;
          }
        }
      }
    }

    function pageActive(name){
      
      $('.page-' + name).css({
        "border-bottom": "100vh solid rgba(230, 90, 140, 1)"
      }).velocity({ borderBottomWidth: 0},{
        delay: 50,
        duration: 250
      })
    }

    function pageSwitch(val){
      switch (val){
        case 0:
          $('.page-a').addClass('active')
          $('.page-b').removeClass('active')
        break;
        case 1:
          $('.page-a').removeClass('active')
          $('.page-b').addClass('active')
          pageActive('b');
        break;
      }
    }

    setTimeout(function(){
        // shitty icon load timeout (should use hidden src tags with listeners)
        init();
    },200)
  }

  window.addEventListener('resize', function(){

    mobile = (window.innerHeight < 500)? true : false;
    
    if(collection) {
      getSizes();
      radialTest();
    }
  })

  /***
  * burger toggle
  ***/

  var menu = false,
      nav = $('.burger-menu'),
      mobilemenu = $('.nav--main'),
      mainpages = $('.pages-container'),
      navclose = $('.mobile-close');

  nav.on('click', function (e){
    toggleNav()
  })
  navclose.on('click', function (e){
    toggleNav()
  })

  function toggleNav(){
    menu = !menu;

    if(menu){
      mainpages.velocity({opacity: 0.1},{duration: 500})
      mobilemenu.addClass('active')
      navclose.addClass('active')
    } else {
      mainpages.velocity({opacity: 1},{duration: 300})
      mobilemenu.removeClass('active')
      navclose.removeClass('active')
    }
  }

  // email toggle

  var mail = false,
      emailbtn = $('.email'),
      econtainer = $('.email-float'),
      eclose = $('span.ei');

  emailbtn.on('click', function (e){
    econtainer.addClass('active')
  })
  eclose.on('click', function(e){
    econtainer.removeClass('active')
  })



})(jQuery);
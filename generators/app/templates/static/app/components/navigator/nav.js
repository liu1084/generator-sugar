/**
 * Created by jim on 2016年8月9日,0009.
 */
(function($){
    var NAV = function(){};
    NAV.prototype.init = function(){
        $('nav').addClass('user-no-select');
        this.bind();
    };

    NAV.prototype.bind = function(){
        $('nav li').off('click')
            .on('click', function () {
                $(this).addClass('nav-active').siblings().removeClass('nav-active');
            });
    };

    var nav = new NAV();
    nav.init();
})(jQuery);

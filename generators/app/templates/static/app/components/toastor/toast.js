/**
 * Created by jim.liu on 2016-07-11.
 */
(function ($, Handlebars){
    'use strict';
    var Toast = function(){};
    var options = {
        type: 'toast-info',
        logo: 'icon-nextui-error-outline',
        message: 'no message yet!',
        seconds: 2000,
        autoHidden: true
    };
    Toast.prototype.options = function(params){
        options = $.extend(true, options, params);
    };
    Toast.prototype.init = function(params){
        this.options(params);
        var hbs = templates["src/templates/toast.hbs"];
        var body = $('body');
        body.find('.toast-template').remove();
        body.append(hbs);
    };
    Toast.prototype.render = function(){
        var toast = $('.toast');
        toast.remove();
        var source = $('.toast-template').html();
        var template = Handlebars.compile(source);
        var context = {type: options.type, logo: options.logo, message: options.message};
        var html = template(context);
        $('body').append(html);
        toast.show();
        if (options.autoHidden === true){
            setTimeout(function () {
                toast.hide();
            }, options.seconds);
        }
    };

    $.fn.extend({
        toastSuccess: function (message, seconds) {
            var params = {};
            params.type = 'toast-success';
            params.logo = 'icon-nextui-check-circle';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        },
        toastWarning: function(message, seconds){
            var params = {};
            params.type = 'toast-warning';
            params.logo = 'icon-nextui-report-problem';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        },
        toastInfo: function(message, seconds){
            var params = {};
            params.type = 'toast-info';
            params.logo = 'icon-nextui-error-outline';
            params.message = message;
            params.seconds = seconds ? Number(seconds) : options.seconds;
            var t = new Toast();
            t.init(params);
            t.render();
        }
    });
})(jQuery, Handlebars);
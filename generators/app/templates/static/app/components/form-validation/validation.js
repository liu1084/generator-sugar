/**
 * Created by jim.liu on 2016-07-11.
 */
(function ($) {
    var Validation = function () {
    };
    var options = {
        message: '',
        rules: {
            //key is id
            'projectMoney': [
                {required: false, prompt: 'can not be blank'},
                {number: true, prompt: 'must be a number'}
            ]
        }
    };
    Validation.prototype.options = function (params) {
        options = $.extend(true, options, params);
    };
    Validation.prototype.init = function (params) {
        this.options(params);
    };
    Validation.prototype.required = function (value) {
        var result = false;
        result = !(!value || value == " " || value == "null");
        return result;
    };

    Validation.prototype.number = function (value) {
        var result = false;
        if ($.isNumeric(value)) {
            result = true;
        }
        return result;
    };

    Validation.prototype.doValid = function (value, rules) {
        var _this = this;
        var errors = [];
        $.each(rules, function (i, rule) {
            for (r in rule) {
                switch (r) {
                    case 'required':
                        if (!_this.required(value)){
                            errors.push();
                        }
                        break;

                    case 'numberic':
                        break;
                }
            }
        });
    };

    $.fn.extend({
        valid: function () {
            var selector = $(this).selector;
            var errors = [];
            var rules = options.rules;
            for (var rule in rules) {
                var element = $('#' + rule);
                var value = element.val();
                var myRules = options.rules[rule];

                if (element.length === 1) {

                }
            }


            $.each(rules, function (i, r) {
                switch (r.type) {
                    case 'required':
                        break;
                    case 'number':
                        break;
                }
                if (!r.test(value)) {
                    $().toastWarning(options.message);
                }
            });
        }
    });
})(jQuery);
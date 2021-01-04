window._ = require('lodash');
// import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'

window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
window.axios  = require('axios');
// this.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.axios.default.withCredentials = true;
// this.axios.defaults.headers.common['Accept'] = 'application/json';
// window.axios.defaults.headers.common['Content-type'] = 'application/json';
// window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// window.axios.defaults.headers.common['Access-Control-Request-Method'] = '*';
require('bootstrap');


window.daterangepicker = require('daterangepicker');
window.bootbox = require('bootbox');
require("./config");
window.cmsHattApp = {
    getMessage(status){
        var messages = window.appConfig.messages;
        return window._.get(messages, status);
    },
    showSuccess: function (configs) {
        var args = {};
        if (typeof configs == 'object') {
            args = configs;
        } else {
            args.message = configs;
        }
        if (!args.title) {
            args.title = "Success";
        }
        args.centerVertical = true;
        window.bootbox.alert(args);
    },
    showError: function (configs) {
        var args = {};
        if (typeof configs == 'object') {
            args = configs;
        } else {
            args.message = configs;
        }
        if (!args.title) {
            args.title = "Warning";
        }
        args.centerVertical = true;
        window.bootbox.alert(args);
    },
    showAjaxError: function (e) {
        var json = e.responseJSON;
        if (typeof json != 'undefined') {
            if (typeof json.errors != 'undefined') {
                var html = '';
                this._.forEach(json.errors, function (val) {
                    html += val + '<br>';
                });

                return this.showError(html);
            }
            if (json.message) {
                return this.showError(json.message);
            }
        }
        if (e.responseText) {
            return this.showError(e.responseText);
        }
    },
    showAjaxMessage: function (json) {
        if (json.message) {
            if (json.status) {
                this.showSuccess(json);
            } else {
                this.showError(json);
            }
        }
    },
    showConfirm: function (configs) {
        var args = {};
        if (typeof configs == 'object') {
            args = configs;
        }
        args.buttons = {
            confirm: {
                label: '<i class="fa fa-check"></i> Confirm',
            },
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel',
            }
        };
        args.centerVertical = true;
        window.bootbox.confirm(args);
    }
};

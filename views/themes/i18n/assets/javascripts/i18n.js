!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function i(e,s){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,t.isPlainObject(s)&&s),this.multiple=!1,this.init()}function e(i){var e=[];return t.isPlainObject(i)&&t.each(i,function(t,i){e.push([t,i].join("="))}),e.join("&")}function s(i){var e={};return i&&(i=i.replace("?","").split("&"),t.each(i,function(t,i){i=i.split("="),t=i[0],e[t]=i[1]})),e}var n=window.location,a="qor.i18n",o="click."+a,r="change."+a,l="input";i.prototype={contructor:i,init:function(){var t=this.$element;this.$languages=t.find(".qor-js-language"),this.$items=t.find(".i18n-list > li"),this.bind()},bind:function(){this.$element.on(o,t.proxy(this.click,this)).on(r,t.proxy(this.change,this)),this.$languages.on(r,t.proxy(this.reload,this))},unbind:function(){this.$element.off(o,this.click).off(r,this.change),this.$languages.off(r,this.reload)},click:function(i){var e,s,n=t(i.target),o=this.$items;if(n.is("button")||(s=n.closest("button")),s&&1===s.size()?n=s:(e=n.closest(".i18n-list-item"),e.hasClass("active highlight")||(n=e)),n.length)switch(String(n.data("toggle")).replace("."+a,"")){case"bulk":this.multiple=!0,n.addClass("hidden").siblings("button").removeClass("hidden"),o.addClass("active highlight").find(".qor-js-translator").trigger(l);break;case"exit":this.multiple=!1,n.addClass("hidden"),n.siblings("button").addClass("hidden").filter(".qor-js-bulk").removeClass("hidden"),o.removeClass("active highlight");break;case"edit":o.removeClass("active highlight"),n.closest("li").addClass("active highlight").find(".qor-js-translator").trigger(l);break;case"save":e=n.closest("li"),this.submit(e.find("form"),function(){e.removeClass("active highlight")});break;case"cancel":n.closest("li").removeClass("active highlight");break;case"copy":e=n.closest("li"),e.find(".qor-js-translator").val(e.find(".qor-js-translation-source").text()).trigger(l);break;case"copyall":o.find(".qor-js-copy").click()}},change:function(i){var e=t(i.target);e.is(".qor-js-translator")&&(this.multiple&&this.submit(e.closest("form"),function(t){var i=t.find(".qor-js-help");i.addClass("in"),setTimeout(function(){i.removeClass("in")},3e3)}),e.trigger(l))},reload:function(i){var a=t(i.target),o=s(n.search);o[a.attr("name")]=a.val(),n.search=e(o)},submit:function(i,e){i.is("form")&&t.ajax(n.pathname,{method:"POST",data:i.serialize(),success:function(){i.siblings(".qor-js-translation-target").text(i.find(".qor-js-translator").val()),t.isFunction(e)&&e(i)}})},destroy:function(){this.unbind(),this.$element.removeData(a)}},i.DEFAULTS={},i.plugin=function(e){return this.each(function(){var s,n=t(this),o=n.data(a);o||n.data(a,o=new i(this,e)),"string"==typeof e&&t.isFunction(s=o[e])&&s.apply(o)})},t(function(){i.plugin.call(t(".qor-i18n"))})});
(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{189:function(t,e,r){"use strict";r.r(e);r(29);var o=r(4),n=r(79),l=r.n(n),c={name:"settingIndex",middleware:"authenticated",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("http://localhost:3000/data.json");case 2:return r=e.sent,data=r.data,console.log(t,"data about"),e.abrupt("return",data);case 6:case"end":return e.stop()}}),e)})))()},data:function(){return{data:"datas数据",data1:"sssssssssssss"}}},f=r(22),component=Object(f.a)(c,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"settings-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6 offset-md-3 col-xs-12"},[r("h1",{staticClass:"text-xs-center"},[t._v("Your Settings")]),t._v(" "),r("form",[r("fieldset",[r("fieldset",{staticClass:"form-group"},[r("input",{staticClass:"form-control",attrs:{type:"text",placeholder:"URL of profile picture"}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Your Name"}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("textarea",{staticClass:"form-control form-control-lg",attrs:{rows:"8",placeholder:"Short bio about you"}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Email"}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{staticClass:"form-control form-control-lg",attrs:{type:"password",placeholder:"Password"}})]),t._v(" "),r("button",{staticClass:"btn btn-lg btn-primary pull-xs-right"},[t._v("\n                Update Settings\n              ")])])])])])])])}],!1,null,null,null);e.default=component.exports}}]);
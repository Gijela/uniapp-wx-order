(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index"],{"058c":function(e,t,n){"use strict";(function(e,a){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2eee")),c=i(n("c973")),r=n("ce8d"),u=n("01a9"),s={components:{PastPage:function(){n.e("pages/pastPage").then(function(){return resolve(n("3e11"))}.bind(null,n)).catch(n.oe)}},data:function(){return{curPage:"home",routerConfig:{homePage:"home",pastPage:"past",myInfo:"myInfo"},data:[],ApiKey:"暂无",videoAd:null}},onLoad:function(){this.mockData(),this.exciteVideoAd()},methods:{copyText:u.copyText,generateWeChatIDs:function(){for(var e=[],t=0;t<30;t++){var n=Math.random().toString(36).substr(2,3)+"*****"+Math.random().toString(36).substr(2,3);e.push(n)}return e},mockData:function(){for(var e=[{title:"聊天训练营 - 第 15 期",subTitle:"已结束",key:15,pastTimeData:this.generateWeChatIDs(),endTime:"2024.3.20"},{title:"聊天训练营 - 第 14 期",subTitle:"已结束",key:14,pastTimeData:this.generateWeChatIDs(),endTime:"2024.2.20"},{title:"聊天训练营 - 第 13 期",subTitle:"已结束",key:13,pastTimeData:this.generateWeChatIDs(),endTime:"2024.1.20"}],t=12;t>0;t--)e.push({title:"聊天训练营 - 第 ".concat(t," 期"),subTitle:"已结束",key:t,pastTimeData:this.generateWeChatIDs(),endTime:"2023.".concat(t,".20")});this.data=e},exciteVideoAd:function(){var t=this;e.createRewardedVideoAd&&(this.videoAd=e.createRewardedVideoAd({adUnitId:"adunit-585a8e725bc2bdf8"}),this.videoAd.onLoad((function(){})),this.videoAd.onError((function(e){(0,u.showToast)("激励视频广告加载失败",!1)})),this.videoAd.onClose(function(){var e=(0,c.default)(o.default.mark((function e(n){var a;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!n||!n.isEnded){e.next=8;break}return e.next=3,(0,r.getApiKey)();case 3:a=e.sent,t.ApiKey=a,(0,u.showToast)("奖励已下发, 请在「我的」页面查收~",!0),e.next=9;break;case 8:(0,u.showToast)("未获得奖励, 继续加油~",!1);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))},callExciteAd:function(){var e=this;this.videoAd?this.videoAd.show().catch((function(){e.videoAd.load().then((function(){return e.videoAd.show()})).catch((function(e){(0,u.showToast)("激励视频 广告显示失败",!1)}))})):this.ApiKey="临时钥匙"},jumpPastTimePage:function(e){a.navigateTo({url:"/pages/detail?info=".concat(JSON.stringify(e))})}}};t.default=s}).call(this,n("bc2e")["default"],n("543d")["default"])},"2e3e":function(e,t,n){"use strict";n.r(t);var a=n("058c"),i=n.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},"2fbe":function(e,t,n){},"9b59":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.curPage=e.routerConfig.homePage},e.e1=function(t){e.curPage=e.routerConfig.pastPage},e.e2=function(t){e.curPage=e.routerConfig.myInfo})},i=[]},"9de2":function(e,t,n){"use strict";n.r(t);var a=n("9b59"),i=n("2e3e");for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("d287");var c=n("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"4cb390c4",null,!1,a["a"],void 0);t["default"]=r.exports},c5ec:function(e,t,n){"use strict";(function(e,t){var a=n("4ea4");n("8742");a(n("66fd"));var i=a(n("9de2"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},d287:function(e,t,n){"use strict";var a=n("2fbe"),i=n.n(a);i.a}},[["c5ec","common/runtime","common/vendor"]]]);
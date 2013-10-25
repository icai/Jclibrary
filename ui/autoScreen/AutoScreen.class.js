function SetAutoSreen(e) {
  if (!(this instanceof SetAutoSreen)) return new SetAutoSreen(e);
  this.initialize.apply(this, arguments)
}
SetAutoSreen.prototype = {
  constructor: "SetAutoSreen",
  initialize: function(e) {
    this.container = $(e.container),
    this.containerWidth = this.container.width(),
    this.containerMarginLeft = this.container.css("marginLeft"),
    this.minWindowWidth = e.minWindowWidth,
    this.guid = e.guid,
    this.cookieDay = e.cookieDay;
    if (this.getCookie() == null || this.getCookie() == "show") this.show(), this.bindEvent();
  },
  hide: function() {
    this.container.hide(), this.setCookie("hide", this.cookieDay)
  },
  show: function() {
    this.container.show(), this.setCookie("show", this.cookieDay)
  },
  autoScreen: function(e) {
    var t = $(window).width();
    t < this.minWindowWidth ? this.container.css({
      marginLeft: (t - this.containerWidth * 2) / 2 + "px"
    }) : this.container.css({
      marginLeft: this.containerMarginLeft
    })
  },
  getCookie: function() {
    return this.cookie("fn_" + this.guid)
  },
  setCookie: function(e, t) {
    this.cookie("fn_" + this.guid, e, {
      expires: t,
      path: "/",
      domain: '.itour.cn'
    })
  },
  cookie: $.cookie || function() {},
  removeCookie: $.removeCookie || function() {},
  bindEvent: function() {
    var e = this;
    this.container.find(".close").click(function() {
      e.hide()
    }), $(window).bind("resize." + this.guid, $.proxy(e.autoScreen, e)).resize()
  }
}, new SetAutoSreen({
  container: "#js_online_autoscreen",
  minWindowWidth: 1076,
  cookieDay: null,
  guid: 'OnlineService'
});
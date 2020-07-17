if ("undefined" == typeof jQuery) 
  throw new Error("to.gather App requires jQuery");

  // This function treats the collapsing of the sidebar
  (function (i) {
    "use strict";
    function s(t) {
      (this.options = t), this.init();
    }
    var r = "lte.pushmenu",
      a = { collapseScreenSize: 767, expandOnHover: !1, expandTransitionDelay: 200 },
      e = ".main-sidebar",
      o = ".content-wrapper",
      n = ".sidebar-form .form-control",
      d = '[data-toggle="push-menu"]',
      l = ".sidebar-mini",
      c = ".sidebar-expanded-on-hover",
      h = ".fixed",
      f = "sidebar-collapse",
      p = "sidebar-open",
      u = "sidebar-expanded-on-hover",
      g = "sidebar-mini-expand-feature",
      v = "expanded.pushMenu",
      b = "collapsed.pushMenu";
    function m(n) {
      return this.each(function () {
        var t = i(this),
          e = t.data(r);
        if (!e) {
          var o = i.extend({}, a, t.data(), "object" == typeof n && n);
          t.data(r, (e = new s(o)));
        }
        "toggle" === n && e.toggle();
      });
    }
    (s.prototype.init = function () {
      (this.options.expandOnHover || i("body").is(l + h)) && (this.expandOnHover(), i("body").addClass(g)),
        i(o).click(
          function () {
            i(window).width() <= this.options.collapseScreenSize && i("body").hasClass(p) && this.close();
          }.bind(this)
        );
    }),
      (s.prototype.toggle = function () {
        var t = i(window).width(),
          e = !i("body").hasClass(f);
        t <= this.options.collapseScreenSize && (e = i("body").hasClass(p)), e ? this.close() : this.open();
      }),
      (s.prototype.open = function () {
        if (i(window).width() <= this.options.collapseScreenSize) 
          i("body").addClass(p).trigger(i.Event(v));
      }),
      (s.prototype.close = function () {
        if (i(window).width() <= this.options.collapseScreenSize)
          i("body").removeClass(p).trigger(i.Event(b));
      }),
      (s.prototype.expandOnHover = function () {
        i(e).hover(
          function () {
            // i("body").is(l + t) && i(window).width() > this.options.collapseScreenSize && this.expand();
            i("body").is(l) && i(window).width() > this.options.collapseScreenSize;
          }.bind(this),
          function () {
            i("body").is(c) && this.collapse();
          }.bind(this)
        );
      });
    var y = i.fn.pushMenu;
    (i.fn.pushMenu = m),
      (i.fn.pushMenu.Constructor = s),
      (i.fn.pushMenu.noConflict = function () {
        return (i.fn.pushMenu = y), this;
      }),
      i(document).on("click", d, function (t) {
        t.preventDefault(), m.call(i(this), "toggle");
      }),
      i(window).on("load", function () {
        m.call(i(d));
      });
  })(jQuery),
 
  // This function treats each session of the sidebar (expanding and collapsing)
  (function (s) {
    "use strict";
    function n(t, e) {
      (this.element = t), (this.options = e), s(this.element).addClass(h), s(a + o, this.element).addClass(c), this._setUpListeners();
    }
    var i = "lte.tree",
      r = { animationSpeed: 500, accordion: !0, followLink: !1, trigger: ".treeview a" },
      a = ".treeview",
      d = ".treeview-menu",
      l = ".menu-open, .active",
      t = '[data-widget="tree"]',
      o = ".active",
      c = "menu-open",
      h = "tree",
      f = "collapsed.tree",
      p = "expanded.tree";
    function e(o) {
      return this.each(function () {
        var t = s(this);
        if (!t.data(i)) {
          var e = s.extend({}, r, t.data(), "object" == typeof o && o);
          t.data(i, new n(t, e));
        }
      });
    }
    (n.prototype.toggle = function (t, e) {
      var o = t.next(d),
        n = t.parent(),
        i = n.hasClass(c);
      n.is(a) && ((this.options.followLink && "#" !== t.attr("href")) || e.preventDefault(), i ? this.collapse(o, n) : this.expand(o, n));
    }),
      (n.prototype.expand = function (t, e) {
        var o = s.Event(p);
        if (this.options.accordion) {
          var n = e.siblings(l),
            i = n.children(d);
          this.collapse(i, n);
        }
        e.addClass(c),
          t.slideDown(
            this.options.animationSpeed,
            function () {
              s(this.element).trigger(o), e.height("auto");
            }.bind(this)
          );
      }),
      (n.prototype.collapse = function (t, e) {
        var o = s.Event(f);
        e.removeClass(c),
          t.slideUp(
            this.options.animationSpeed,
            function () {
              s(this.element).trigger(o), e.find(a).removeClass(c).find(d).hide();
            }.bind(this)
          );
      }),
      (n.prototype._setUpListeners = function () {
        var e = this;
        s(this.element).on("click", this.options.trigger, function (t) {
          e.toggle(s(this), t);
        });
      });
    var u = s.fn.tree;
    (s.fn.tree = e),
      (s.fn.tree.Constructor = n),
      (s.fn.tree.noConflict = function () {
        return (s.fn.tree = u), this;
      }),
      s(window).on("load", function () {
        s(t).each(function () {
          e.call(s(this));
        });
      });
  })(jQuery),

  // This function fixes the footer and allows the scrolling on the page
  (function (a) {
    "use strict";
    function i(t) {
      (this.options = t), (this.bindedResize = !1), this.activate();
    }
    var s = "lte.layout",
      r = { slimscroll: !0, resetHeight: !0 },
      d = ".wrapper",
      l = ".content-wrapper",
      c = ".layout-boxed",
      h = ".main-footer",
      f = ".main-header",
      t = ".main-sidebar",
      e = "slimScrollDiv",
      p = ".sidebar",
      u = ".control-sidebar",
      o = ".sidebar-menu",
      n = ".main-header .logo",
      g = "fixed",
      v = "hold-transition";
    function b(n) {
      return this.each(function () {
        var t = a(this),
          e = t.data(s);
        if (!e) {
          var o = a.extend({}, r, t.data(), "object" == typeof n && n);
          t.data(s, (e = new i(o)));
        }
        if ("string" == typeof n) {
          if (void 0 === e[n]) throw new Error("No method named " + n);
          e[n]();
        }
      });
    }
    (i.prototype.activate = function () {
      this.fix(),
        this.fixSidebar(),
        a("body").removeClass(v),
        this.options.resetHeight && a("body, html, " + d).css({ height: "auto", "min-height": "100%" }),
        this.bindedResize ||
          (a(window).resize(
            function () {
              this.fix(),
                this.fixSidebar(),
                a(n + ", " + p).one(
                  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                  function () {
                    this.fix(), this.fixSidebar();
                  }.bind(this)
                );
            }.bind(this)
          ),
          (this.bindedResize = !0)),
        a(o).on(
          "expanded.tree",
          function () {
            this.fix(), this.fixSidebar();
          }.bind(this)
        ),
        a(o).on(
          "collapsed.tree",
          function () {
            this.fix(), this.fixSidebar();
          }.bind(this)
        );
    }),
      (i.prototype.fix = function () {
        a(c + " > " + d).css("overflow", "hidden");
        var t = a(h).outerHeight() || 0,
          e = a(f).outerHeight() || 0,
          o = e + t,
          n = a(window).height(),
          i = a(p).outerHeight() || 0;
        if (a("body").hasClass(g)) a(l).css("min-height", n - t);
        else {
          var s;
          s = i + e <= n ? (a(l).css("min-height", n - o), n - o) : (a(l).css("min-height", i), i);
          var r = a(u);
          void 0 !== r && r.height() > s && a(l).css("min-height", r.height());
        }
      }),
      (i.prototype.fixSidebar = function () {
        a("body").hasClass(g)
          ? this.options.slimscroll && void 0 !== a.fn.slimScroll && 0 === a(t).find(e).length && a(p).slimScroll({ height: a(window).height() - a(f).height() + "px" })
          : void 0 !== a.fn.slimScroll && a(p).slimScroll({ destroy: !0 }).height("auto");
      });
    var m = a.fn.layout;
    (a.fn.layout = b),
      (a.fn.layout.Constuctor = i),
      (a.fn.layout.noConflict = function () {
        return (a.fn.layout = m), this;
      }),
      a(window).on("load", function () {
        b.call(a("body"));
      });
  })(jQuery);

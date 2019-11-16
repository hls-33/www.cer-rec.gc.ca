/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 *
 * Version: v3.1.12 Build: 2014-06-17 04:33 PM EDT
 *
 */
(function($) {
  var pe, _pe;
  pe =
    typeof window.pe !== "undefined" && window.pe !== null
      ? window.pe
      : { fn: {} };
  _pe = {
    language: "en",
    languages: [
      "en",
      "fr",
      "af",
      "sq",
      "ar",
      "hy",
      "bg",
      "zh",
      "zh-Hans",
      "cs",
      "nl",
      "et",
      "de",
      "el",
      "hi",
      "hu",
      "is",
      "id",
      "it",
      "ja",
      "ko",
      "lv",
      "lt",
      "pl",
      "pt",
      "pt-BR",
      "ru",
      "sk",
      "es",
      "th",
      "tr",
      "uk",
      "vi"
    ],
    rtl: false,
    touchscreen: "ontouchstart" in document.documentElement,
    mobileview:
      wet_boew_theme !== null &&
      typeof wet_boew_theme.mobileview === "function",
    suffix:
      $('body script[src*="/pe-ap"]')
        .attr("src")
        .indexOf("-min") !== -1
        ? "-min"
        : "",
    header: $("#wb-head"),
    bodydiv: $("body > div"),
    main: $("#wb-main"),
    secnav: $("#wb-sec"),
    footer: $("#wb-foot"),
    html: $("html"),
    document: $(document),
    window: $(window),
    urlpage: "",
    urlhash: "",
    urlquery: "",
    svg:
      $('<svg xmlns="http://www.w3.org/2000/svg" />').get(0).ownerSVGElement !==
      undefined,
    svgfix: false,
    viewtest: "",
    resizetest: "",
    settings:
      typeof wet_boew_properties !== "undefined" && wet_boew_properties !== null
        ? wet_boew_properties
        : false,
    scrollTopInit: window.pageYOffset || document.documentElement.scrollTop,
    leftMouseButton: 0,
    dic: {
      get: function(key, state, mixin) {
        var truthiness =
          (typeof key === "string" && key !== "") |
          ((typeof state === "string" && state !== "") << 1) |
          ((typeof mixin === "string" && mixin !== "") << 2);
        switch (truthiness) {
          case 1:
            return this.ind[key];
          case 3:
            return this.ind[key][state];
          case 7:
            return this.ind[key][state].replace("[MIXIN]", mixin);
          default:
            return "";
        }
      },
      ago: function(time_value) {
        var delta, parsed_date, r, relative_to;
        parsed_date = pe.date.convert(time_value);
        relative_to = arguments.length > 1 ? arguments[1] : new Date();
        delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
        delta = delta + relative_to.getTimezoneOffset() * 60;
        r = "";
        if (delta < 60) {
          r = this.get("%minute-ago");
        } else {
          if (delta < 120) {
            r = this.get("%couple-of-minutes");
          } else {
            if (delta < 45 * 60) {
              r = this.get(
                "%minutes-ago",
                "mixin",
                parseInt(delta / 60, 10).toString()
              );
            } else {
              if (delta < 90 * 60) {
                r = this.get("%hour-ago");
              } else {
                if (delta < 24 * 60 * 60) {
                  r = this.get(
                    "%hours-ago",
                    "mixin",
                    parseInt(delta / 3600, 10).toString()
                  );
                } else {
                  if (delta < 48 * 60 * 60) {
                    r = this.get("%yesterday");
                  } else {
                    r = this.get(
                      "%days-ago",
                      "mixin",
                      parseInt(delta / 86400, 10).toString()
                    );
                  }
                }
              }
            }
          }
        }
        return r;
      }
    },
    ie: (/(MSIE) ([\w.]+)/.exec(navigator.userAgent) || [])[2] || "0",
    preIE10: false,
    preIE9: false,
    preIE8: false,
    preIE7: false,
    _init: function() {
      var $html = pe.html,
        hlinks_same = [],
        classes = "",
        test,
        test_elms,
        silentscroll_fired = false,
        pageinit_fired = false,
        init_on_mobileinit = false;
      if (pe.ie > 0 && pe.ie < 10) {
        pe.preIE10 = true;
        if (pe.ie < 9) {
          pe.preIE9 = true;
          if (pe.ie < 8) {
            pe.preIE8 = true;
            if (pe.ie < 7) {
              pe.preIE7 = true;
            }
          }
        }
      }
      test = $html.attr("lang");
      if (typeof test !== "undefined" && test.length > 0) {
        pe.language = test;
      }
      test = $html.attr("dir");
      if (typeof test !== "undefined" && test.length > 0) {
        pe.rtl = test === "rtl";
      }
      pe.viewtest = document.createElement("div");
      pe.viewtest.setAttribute("id", "viewtest");
      pe.resizetest = document.createElement("span");
      pe.resizetest.innerHTML = "&#160;";
      pe.resizetest.setAttribute("id", "resizetest");
      test_elms = document.createElement("div");
      test_elms.appendChild(pe.viewtest);
      test_elms.appendChild(pe.resizetest);
      document.body.appendChild(test_elms);
      pe.polyfills.init();
      pe.urlpage = pe.url(window.location.href);
      pe.urlhash = pe.urlpage.hash;
      pe.urlquery = pe.urlpage.params;
      pe.mobile = pe.mobilecheck();
      pe.medium = pe.mediumcheck();
      if (wet_boew_theme !== null) {
        classes +=
          wet_boew_theme.theme +
          (pe.mobile
            ? " mobile-view" + (pe.medium ? " medium-screen" : " small-screen")
            : " desktop-view large-screen");
        if (typeof wet_boew_theme.favicon !== "undefined") {
          pe.add.favicon(
            pe.add.themecsslocation.replace(
              /css\/$/,
              wet_boew_theme.favicon.href
            ),
            wet_boew_theme.favicon.rel,
            wet_boew_theme.favicon.sizes
          );
        }
      }
      classes += pe.touchscreen ? " touchscreen" : "";
      classes += pe.svg ? " svg" : " no-svg";
      classes += pe.ie < 1 ? " no-ie" : " ie" + parseInt(pe.ie, 10);
      test = navigator.userAgent.match(/WebKit\/53(\d)\.(\d{1,2})/i);
      pe.svgfix = !(
        test === null ||
        parseInt(test[1], 10) > 4 ||
        (parseInt(test[1], 10) === 4 && parseInt(test[2], 10) >= 46)
      );
      if (pe.mobile) {
        test = navigator.userAgent.indexOf("BlackBerry");
        if (test === 0) {
          classes += " bb-pre6 bb-pre7";
        } else {
          if (test !== -1 && navigator.userAgent.indexOf("Version/6") !== -1) {
            classes += " bb-pre7";
          }
        }
      }
      $html.removeClass("no-js").addClass(classes);
      pe.bodydiv.attr("data-role", "page").addClass("ui-page-active");
      pe.window.on("scroll.wbinit", function() {
        var scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 1) {
          pe.scrollTopInit = scrollTop;
        }
      });
      pe.document.on("silentscroll.wbinit", function() {
        var scrollTop = pe.scrollTopInit,
          target;
        silentscroll_fired = true;
        if (pageinit_fired) {
          pe.document.off("silentscroll.wbinit");
        }
        pe.window.off("scroll.wbinit");
        if (pe.urlhash.length !== 0) {
          target = pe.main.find("#" + pe.string.jqescape(pe.urlhash));
          target
            .filter(":not(a, button, input, textarea, select)")
            .attr("tabindex", "-1");
        }
        if (typeof target !== "undefined" && target.length !== 0) {
          pe.focus(target);
          $.mobile.silentScroll(
            scrollTop > 1 ? scrollTop : target.offset().top
          );
        } else {
          if (scrollTop > 1) {
            $.mobile.silentScroll(scrollTop);
          }
        }
      });
      pe.document.on("mobileinit", function() {
        $.extend($.mobile, {
          ajaxEnabled: false,
          pushStateEnabled: false,
          autoInitializePage: init_on_mobileinit ? true : false
        });
        if (init_on_mobileinit) {
          pe.mobilelang();
        }
      });
      pe.document.on("pageinit", function() {
        pageinit_fired = true;
        if (silentscroll_fired) {
          pe.document.off("silentscroll.wbinit");
        }
        if (document.activeElement.nodeName.toLowerCase() !== "body") {
          pe.document.one("focusout.wbinit", function(e) {
            pe.focus(e.target);
          });
        }
        pe.bodydiv.removeAttr("tabindex");
        $(hlinks_same)
          .off("click vclick")
          .on("click.hlinks vclick.hlinks", function(e) {
            var hash = this.hash,
              node = document.getElementById(hash.substring(1)),
              $node,
              nodeName,
              role,
              button = e.button;
            if (
              node !== null &&
              (typeof button === "undefined" || button === pe.leftMouseButton)
            ) {
              $node = $(node);
              nodeName = node.nodeName.toLowerCase();
              if (
                nodeName !== "a" &&
                nodeName !== "button" &&
                nodeName !== "input" &&
                nodeName !== "textarea" &&
                nodeName !== "select"
              ) {
                node.setAttribute("tabindex", "-1");
              }
              pe.focus($node);
              role = $node.jqmData("role");
              if (
                role === undefined ||
                (role !== "page" && role !== "dialog" && role !== "popup")
              ) {
                window.location.hash = hash;
              }
            }
          });
        pe.document.on("expand", function(e) {
          var yPos = $(e.target).offset().top;
          if (yPos < _pe.window.scrollTop()) {
            $.mobile.silentScroll(yPos);
          }
        });
      });
      $.when
        .apply(
          $,
          $.map($("*[data-ajax-replace], *[data-ajax-append]"), function(o) {
            var $o = $(o),
              replace = false,
              url;
            if ($o.attr("data-ajax-replace") !== undefined) {
              replace = true;
              url = $o.attr("data-ajax-replace");
            } else {
              if ($o.attr("data-ajax-append") !== undefined) {
                url = $o.attr("data-ajax-append");
              }
            }
            return $.get(
              url,
              function(data) {
                if (replace) {
                  $o.empty();
                }
                $o.append($.trim(data));
              },
              "html"
            );
          })
        )
        .always(function() {
          var hlinks = document.getElementsByTagName("a"),
            hlink,
            pathname = window.location.pathname,
            search = window.location.search,
            len = hlinks.length,
            href;
          while (len--) {
            hlink = hlinks[len];
            href = hlink.getAttribute("href");
            if (
              href !== null &&
              href.length !== 1 &&
              href.indexOf("#") !== -1 &&
              hlink.getAttribute("data-rel") === null &&
              pathname.indexOf(hlink.pathname) !== -1 &&
              hlink.search === search
            ) {
              hlinks_same.push(hlink);
            }
          }
          pe.document.one("languageloaded", function() {
            if (wet_boew_theme !== null) {
              wet_boew_theme.init();
            }
            if (pe.pedisable() === true) {
              return false;
            }
            if (wet_boew_theme !== null) {
              pe.document.one("themeviewloaded", function() {
                if (typeof $.mobile !== "undefined") {
                  pe.mobilelang();
                  $.mobile.initializePage();
                } else {
                  init_on_mobileinit = true;
                }
              });
              if (pe.mobile) {
                wet_boew_theme.mobileview();
              } else {
                wet_boew_theme.desktopview();
              }
            } else {
              if (typeof $.mobile !== "undefined") {
                pe.mobilelang();
                $.mobile.initializePage();
              } else {
                init_on_mobileinit = true;
              }
            }
            pe.dance();
          });
          pe.add.language(pe.language);
        });
    },
    mobile: false,
    mobilecheck: function() {
      return pe.viewtest.offsetWidth > 1;
    },
    medium: false,
    mediumcheck: function() {
      return pe.viewtest.offsetWidth === 3;
    },
    mobilelang: function() {
      $.mobile.collapsible.prototype.options.expandCueText = pe.dic.get(
        "%jqm-expand"
      );
      $.mobile.collapsible.prototype.options.collapseCueText = pe.dic.get(
        "%jqm-collapse"
      );
      $.mobile.dialog.prototype.options.closeBtnText = pe.dic.get("%close");
      $.mobile.page.prototype.options.backBtnText = pe.dic.get("%back");
      $.mobile.textinput.prototype.options.clearSearchButtonText = pe.dic.get(
        "%jqm-clear-search"
      );
      $.mobile.selectmenu.prototype.options.closeText = pe.dic.get("%close");
      $.mobile.listview.prototype.options.filterPlaceholder = pe.dic.get(
        "%jqm-filter"
      );
      $.mobile.table.prototype.options.columnBtnText = pe.dic.get(
        "%jqm-tbl-col-toggle"
      );
    },
    pagecontainer: function() {
      return $("#wb-body-sec-sup, #wb-body-sec, #wb-body-secr, #wb-body")
        .add("body")
        .eq(0);
    },
    resizeutil: {
      sizes: [],
      events: [
        "wb-text-resize",
        "wb-window-resize-width",
        "wb-window-resize-height"
      ],
      events_all: "",
      initialized: false,
      init: function() {
        var ru = pe.resizeutil;
        if (!ru.initialized) {
          ru.sizes = [
            pe.resizetest.offsetHeight,
            pe.window.width(),
            pe.window.height()
          ];
          ru.events_all = ru.events.join(" ");
          window.setInterval(function() {
            pe.resizeutil.test();
          }, 500);
          ru.initialized = true;
        }
      },
      test: function() {
        var curr_sizes = [
            pe.resizetest.offsetHeight,
            pe.window.width(),
            pe.window.height()
          ],
          i,
          len,
          ru = pe.resizeutil;
        for (i = 0, len = curr_sizes.length; i !== len; i += 1) {
          if (curr_sizes[i] !== ru.sizes[i]) {
            pe.document.trigger(ru.events[i], curr_sizes);
          }
        }
        ru.sizes = curr_sizes;
        return;
      }
    },
    resize: function(callback) {
      pe.document.on(pe.resizeutil.events_all, function(e, sizes) {
        callback(e, sizes);
      });
      return;
    },
    url: function(uri) {
      var el = document.createElement("div"),
        a;
      el.innerHTML = '<a href="' + uri + '">x</a>';
      a = el.firstChild;
      return {
        source: a.href,
        protocol: a.protocol.replace(":", ""),
        host: a.hostname,
        port: a.port === "0" ? "80" : a.port,
        query: a.search,
        params: (function() {
          var key, ret, s, seg, _i, _len;
          ret = {};
          seg = a.search.replace(/^\?/, "").split("&");
          for (_i = 0, _len = seg.length; _i < _len; _i += 1) {
            key = seg[_i];
            if (key) {
              s = key.split("=");
              ret[s[0]] = s[1];
            }
          }
          return ret;
        })(),
        file: a.pathname.match(/\/([^\/?#]+)$/i)
          ? a.pathname.match(/\/([^\/?#]+)$/i)[1]
          : "",
        hash: a.hash.replace("#", ""),
        path: a.pathname.replace(/^([^\/])/, "/$1"),
        relative: a.href.match(/tps?:\/\/[^\/]+(.+)/)
          ? a.href.match(/tps?:\/\/[^\/]+(.+)/)[1]
          : "",
        segments: a.pathname.replace(/^\//, "").split("/"),
        removehash: function() {
          return this.source.replace(/#([A-Za-z0-9\-_=&\.:]+)/, "");
        }
      };
    },
    cssenabled: function() {
      return pe.viewtest.offsetWidth < 2;
    },
    limit: function(elm) {
      var count;
      count = $(elm)
        .attr("class")
        .match(/\blimit-\d+/);
      if (!count) {
        return 0;
      }
      return Number(count[0].replace(/limit-/i, ""));
    },
    focus: function(elm) {
      setTimeout(function() {
        var $elm =
            typeof elm.jquery !== "undefined" ? elm.focus() : $(elm).focus(),
          $archivedVisible = $(".archived[aria-hidden=false]");
        if ($archivedVisible.length !== 0) {
          document.documentElement.scrollTop -= $archivedVisible.outerHeight();
        }
        return $elm;
      }, 0);
      return elm;
    },
    string: {
      ify: (function() {
        return {
          link: function(t) {
            return t.replace(
              /[a-z]+:\/\/[a-z0-9\-_]+\.[a-z0-9\-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/gi,
              function(m) {
                return (
                  '<a href="' +
                  m +
                  '">' +
                  (m.length > 25 ? m.substr(0, 24) + "..." : m) +
                  "</a>"
                );
              }
            );
          },
          at: function(t) {
            return t.replace(
              /(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9\-_]+)*)/g,
              function(m, m1, m2) {
                return (
                  m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + "</a>"
                );
              }
            );
          },
          hash: function(t) {
            return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g, function(
              m,
              m1,
              m2
            ) {
              return (
                m1 +
                '#<a href="http://search.twitter.com/search?q=%23' +
                m2 +
                '">' +
                m2 +
                "</a>"
              );
            });
          },
          clean: function(tweet) {
            return this.hash(this.at(this.link(tweet)));
          }
        };
      })(),
      pad: function(number, length) {
        var str;
        str = String(number);
        while (str.length < length) {
          str = "0" + str;
        }
        return str;
      },
      jqescape: function(str) {
        return str.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1");
      },
      normalizeDiacritics: function(str) {
        var diacritics = {
            "\u24B6": "A",
            Ａ: "A",
            À: "A",
            Á: "A",
            Â: "A",
            Ầ: "A",
            Ấ: "A",
            Ẫ: "A",
            Ẩ: "A",
            Ã: "A",
            Ā: "A",
            Ă: "A",
            Ằ: "A",
            Ắ: "A",
            Ẵ: "A",
            Ẳ: "A",
            Ȧ: "A",
            Ǡ: "A",
            Ä: "A",
            Ǟ: "A",
            Ả: "A",
            Å: "A",
            Ǻ: "A",
            Ǎ: "A",
            Ȁ: "A",
            Ȃ: "A",
            Ạ: "A",
            Ậ: "A",
            Ặ: "A",
            Ḁ: "A",
            Ą: "A",
            Ⱥ: "A",
            Ɐ: "A",
            Ꜳ: "AA",
            Æ: "AE",
            Ǽ: "AE",
            Ǣ: "AE",
            Ꜵ: "AO",
            Ꜷ: "AU",
            Ꜹ: "AV",
            Ꜻ: "AV",
            Ꜽ: "AY",
            "\u24B7": "B",
            Ｂ: "B",
            Ḃ: "B",
            Ḅ: "B",
            Ḇ: "B",
            Ƀ: "B",
            Ƃ: "B",
            Ɓ: "B",
            "\u24B8": "C",
            Ｃ: "C",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            Ç: "C",
            Ḉ: "C",
            Ƈ: "C",
            Ȼ: "C",
            Ꜿ: "C",
            "\u24B9": "D",
            Ｄ: "D",
            Ḋ: "D",
            Ď: "D",
            Ḍ: "D",
            Ḑ: "D",
            Ḓ: "D",
            Ḏ: "D",
            Đ: "D",
            Ƌ: "D",
            Ɗ: "D",
            Ɖ: "D",
            Ꝺ: "D",
            Ǳ: "DZ",
            Ǆ: "DZ",
            ǲ: "Dz",
            ǅ: "Dz",
            "\u24BA": "E",
            Ｅ: "E",
            È: "E",
            É: "E",
            Ê: "E",
            Ề: "E",
            Ế: "E",
            Ễ: "E",
            Ể: "E",
            Ẽ: "E",
            Ē: "E",
            Ḕ: "E",
            Ḗ: "E",
            Ĕ: "E",
            Ė: "E",
            Ë: "E",
            Ẻ: "E",
            Ě: "E",
            Ȅ: "E",
            Ȇ: "E",
            Ẹ: "E",
            Ệ: "E",
            Ȩ: "E",
            Ḝ: "E",
            Ę: "E",
            Ḙ: "E",
            Ḛ: "E",
            Ɛ: "E",
            Ǝ: "E",
            "\u24BB": "F",
            Ｆ: "F",
            Ḟ: "F",
            Ƒ: "F",
            Ꝼ: "F",
            "\u24BC": "G",
            Ｇ: "G",
            Ǵ: "G",
            Ĝ: "G",
            Ḡ: "G",
            Ğ: "G",
            Ġ: "G",
            Ǧ: "G",
            Ģ: "G",
            Ǥ: "G",
            Ɠ: "G",
            Ꞡ: "G",
            Ᵹ: "G",
            Ꝿ: "G",
            "\u24BD": "H",
            Ｈ: "H",
            Ĥ: "H",
            Ḣ: "H",
            Ḧ: "H",
            Ȟ: "H",
            Ḥ: "H",
            Ḩ: "H",
            Ḫ: "H",
            Ħ: "H",
            Ⱨ: "H",
            Ⱶ: "H",
            Ɥ: "H",
            "\u24BE": "I",
            Ｉ: "I",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            İ: "I",
            Ï: "I",
            Ḯ: "I",
            Ỉ: "I",
            Ǐ: "I",
            Ȉ: "I",
            Ȋ: "I",
            Ị: "I",
            Į: "I",
            Ḭ: "I",
            Ɨ: "I",
            "\u24BF": "J",
            Ｊ: "J",
            Ĵ: "J",
            Ɉ: "J",
            "\u24C0": "K",
            Ｋ: "K",
            Ḱ: "K",
            Ǩ: "K",
            Ḳ: "K",
            Ķ: "K",
            Ḵ: "K",
            Ƙ: "K",
            Ⱪ: "K",
            Ꝁ: "K",
            Ꝃ: "K",
            Ꝅ: "K",
            Ꞣ: "K",
            "\u24C1": "L",
            Ｌ: "L",
            Ŀ: "L",
            Ĺ: "L",
            Ľ: "L",
            Ḷ: "L",
            Ḹ: "L",
            Ļ: "L",
            Ḽ: "L",
            Ḻ: "L",
            Ł: "L",
            Ƚ: "L",
            Ɫ: "L",
            Ⱡ: "L",
            Ꝉ: "L",
            Ꝇ: "L",
            Ꞁ: "L",
            Ǉ: "LJ",
            ǈ: "Lj",
            "\u24C2": "M",
            Ｍ: "M",
            Ḿ: "M",
            Ṁ: "M",
            Ṃ: "M",
            Ɱ: "M",
            Ɯ: "M",
            "\u24C3": "N",
            Ｎ: "N",
            Ǹ: "N",
            Ń: "N",
            Ñ: "N",
            Ṅ: "N",
            Ň: "N",
            Ṇ: "N",
            Ņ: "N",
            Ṋ: "N",
            Ṉ: "N",
            Ƞ: "N",
            Ɲ: "N",
            Ꞑ: "N",
            Ꞥ: "N",
            Ǌ: "NJ",
            ǋ: "Nj",
            "\u24C4": "O",
            Ｏ: "O",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Ồ: "O",
            Ố: "O",
            Ỗ: "O",
            Ổ: "O",
            Õ: "O",
            Ṍ: "O",
            Ȭ: "O",
            Ṏ: "O",
            Ō: "O",
            Ṑ: "O",
            Ṓ: "O",
            Ŏ: "O",
            Ȯ: "O",
            Ȱ: "O",
            Ö: "O",
            Ȫ: "O",
            Ỏ: "O",
            Ő: "O",
            Ǒ: "O",
            Ȍ: "O",
            Ȏ: "O",
            Ơ: "O",
            Ờ: "O",
            Ớ: "O",
            Ỡ: "O",
            Ở: "O",
            Ợ: "O",
            Ọ: "O",
            Ộ: "O",
            Ǫ: "O",
            Ǭ: "O",
            Ø: "O",
            Ǿ: "O",
            Ɔ: "O",
            Ɵ: "O",
            Ꝋ: "O",
            Ꝍ: "O",
            Œ: "OE",
            Ƣ: "OI",
            Ꝏ: "OO",
            Ȣ: "OU",
            "\u24C5": "P",
            Ｐ: "P",
            Ṕ: "P",
            Ṗ: "P",
            Ƥ: "P",
            Ᵽ: "P",
            Ꝑ: "P",
            Ꝓ: "P",
            Ꝕ: "P",
            "\u24C6": "Q",
            Ｑ: "Q",
            Ꝗ: "Q",
            Ꝙ: "Q",
            Ɋ: "Q",
            "\u24C7": "R",
            Ｒ: "R",
            Ŕ: "R",
            Ṙ: "R",
            Ř: "R",
            Ȑ: "R",
            Ȓ: "R",
            Ṛ: "R",
            Ṝ: "R",
            Ŗ: "R",
            Ṟ: "R",
            Ɍ: "R",
            Ɽ: "R",
            Ꝛ: "R",
            Ꞧ: "R",
            Ꞃ: "R",
            "\u24C8": "S",
            Ｓ: "S",
            Ś: "S",
            Ṥ: "S",
            Ŝ: "S",
            Ṡ: "S",
            Š: "S",
            Ṧ: "S",
            Ṣ: "S",
            Ṩ: "S",
            Ș: "S",
            Ş: "S",
            Ȿ: "S",
            Ꞩ: "S",
            Ꞅ: "S",
            ẞ: "SS",
            "\u24C9": "T",
            Ｔ: "T",
            Ṫ: "T",
            Ť: "T",
            Ṭ: "T",
            Ț: "T",
            Ţ: "T",
            Ṱ: "T",
            Ṯ: "T",
            Ŧ: "T",
            Ƭ: "T",
            Ʈ: "T",
            Ⱦ: "T",
            Ꞇ: "T",
            Ꜩ: "TZ",
            "\u24CA": "U",
            Ｕ: "U",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ũ: "U",
            Ṹ: "U",
            Ū: "U",
            Ṻ: "U",
            Ŭ: "U",
            Ü: "U",
            Ǜ: "U",
            Ǘ: "U",
            Ǖ: "U",
            Ǚ: "U",
            Ủ: "U",
            Ů: "U",
            Ű: "U",
            Ǔ: "U",
            Ȕ: "U",
            Ȗ: "U",
            Ư: "U",
            Ừ: "U",
            Ứ: "U",
            Ữ: "U",
            Ử: "U",
            Ự: "U",
            Ụ: "U",
            Ṳ: "U",
            Ų: "U",
            Ṷ: "U",
            Ṵ: "U",
            Ʉ: "U",
            "\u24CB": "V",
            Ｖ: "V",
            Ṽ: "V",
            Ṿ: "V",
            Ʋ: "V",
            Ꝟ: "V",
            Ʌ: "V",
            Ꝡ: "VY",
            "\u24CC": "W",
            Ｗ: "W",
            Ẁ: "W",
            Ẃ: "W",
            Ŵ: "W",
            Ẇ: "W",
            Ẅ: "W",
            Ẉ: "W",
            Ⱳ: "W",
            "\u24CD": "X",
            Ｘ: "X",
            Ẋ: "X",
            Ẍ: "X",
            "\u24CE": "Y",
            Ｙ: "Y",
            Ỳ: "Y",
            Ý: "Y",
            Ŷ: "Y",
            Ỹ: "Y",
            Ȳ: "Y",
            Ẏ: "Y",
            Ÿ: "Y",
            Ỷ: "Y",
            Ỵ: "Y",
            Ƴ: "Y",
            Ɏ: "Y",
            Ỿ: "Y",
            "\u24CF": "Z",
            Ｚ: "Z",
            Ź: "Z",
            Ẑ: "Z",
            Ż: "Z",
            Ž: "Z",
            Ẓ: "Z",
            Ẕ: "Z",
            Ƶ: "Z",
            Ȥ: "Z",
            Ɀ: "Z",
            Ⱬ: "Z",
            Ꝣ: "Z",
            "\u24D0": "a",
            ａ: "a",
            ẚ: "a",
            à: "a",
            á: "a",
            â: "a",
            ầ: "a",
            ấ: "a",
            ẫ: "a",
            ẩ: "a",
            ã: "a",
            ā: "a",
            ă: "a",
            ằ: "a",
            ắ: "a",
            ẵ: "a",
            ẳ: "a",
            ȧ: "a",
            ǡ: "a",
            ä: "a",
            ǟ: "a",
            ả: "a",
            å: "a",
            ǻ: "a",
            ǎ: "a",
            ȁ: "a",
            ȃ: "a",
            ạ: "a",
            ậ: "a",
            ặ: "a",
            ḁ: "a",
            ą: "a",
            ⱥ: "a",
            ɐ: "a",
            ꜳ: "aa",
            æ: "ae",
            ǽ: "ae",
            ǣ: "ae",
            ꜵ: "ao",
            ꜷ: "au",
            ꜹ: "av",
            ꜻ: "av",
            ꜽ: "ay",
            "\u24D1": "b",
            ｂ: "b",
            ḃ: "b",
            ḅ: "b",
            ḇ: "b",
            ƀ: "b",
            ƃ: "b",
            ɓ: "b",
            "\u24D2": "c",
            ｃ: "c",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            ç: "c",
            ḉ: "c",
            ƈ: "c",
            ȼ: "c",
            ꜿ: "c",
            ↄ: "c",
            "\u24D3": "d",
            ｄ: "d",
            ḋ: "d",
            ď: "d",
            ḍ: "d",
            ḑ: "d",
            ḓ: "d",
            ḏ: "d",
            đ: "d",
            ƌ: "d",
            ɖ: "d",
            ɗ: "d",
            ꝺ: "d",
            ǳ: "dz",
            ǆ: "dz",
            "\u24D4": "e",
            ｅ: "e",
            è: "e",
            é: "e",
            ê: "e",
            ề: "e",
            ế: "e",
            ễ: "e",
            ể: "e",
            ẽ: "e",
            ē: "e",
            ḕ: "e",
            ḗ: "e",
            ĕ: "e",
            ė: "e",
            ë: "e",
            ẻ: "e",
            ě: "e",
            ȅ: "e",
            ȇ: "e",
            ẹ: "e",
            ệ: "e",
            ȩ: "e",
            ḝ: "e",
            ę: "e",
            ḙ: "e",
            ḛ: "e",
            ɇ: "e",
            ɛ: "e",
            ǝ: "e",
            "\u24D5": "f",
            ｆ: "f",
            ḟ: "f",
            ƒ: "f",
            ꝼ: "f",
            "\u24D6": "g",
            ｇ: "g",
            ǵ: "g",
            ĝ: "g",
            ḡ: "g",
            ğ: "g",
            ġ: "g",
            ǧ: "g",
            ģ: "g",
            ǥ: "g",
            ɠ: "g",
            ꞡ: "g",
            ᵹ: "g",
            ꝿ: "g",
            "\u24D7": "h",
            ｈ: "h",
            ĥ: "h",
            ḣ: "h",
            ḧ: "h",
            ȟ: "h",
            ḥ: "h",
            ḩ: "h",
            ḫ: "h",
            ẖ: "h",
            ħ: "h",
            ⱨ: "h",
            ⱶ: "h",
            ɥ: "h",
            ƕ: "hv",
            "\u24D8": "i",
            ｉ: "i",
            ì: "i",
            í: "i",
            î: "i",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            ï: "i",
            ḯ: "i",
            ỉ: "i",
            ǐ: "i",
            ȉ: "i",
            ȋ: "i",
            ị: "i",
            į: "i",
            ḭ: "i",
            ɨ: "i",
            ı: "i",
            "\u24D9": "j",
            ｊ: "j",
            ĵ: "j",
            ǰ: "j",
            ɉ: "j",
            "\u24DA": "k",
            ｋ: "k",
            ḱ: "k",
            ǩ: "k",
            ḳ: "k",
            ķ: "k",
            ḵ: "k",
            ƙ: "k",
            ⱪ: "k",
            ꝁ: "k",
            ꝃ: "k",
            ꝅ: "k",
            ꞣ: "k",
            "\u24DB": "l",
            ｌ: "l",
            ŀ: "l",
            ĺ: "l",
            ľ: "l",
            ḷ: "l",
            ḹ: "l",
            ļ: "l",
            ḽ: "l",
            ḻ: "l",
            ł: "l",
            ƚ: "l",
            ɫ: "l",
            ⱡ: "l",
            ꝉ: "l",
            ꞁ: "l",
            ꝇ: "l",
            ǉ: "lj",
            "\u24DC": "m",
            ｍ: "m",
            ḿ: "m",
            ṁ: "m",
            ṃ: "m",
            ɱ: "m",
            ɯ: "m",
            "\u24DD": "n",
            ｎ: "n",
            ǹ: "n",
            ń: "n",
            ñ: "n",
            ṅ: "n",
            ň: "n",
            ṇ: "n",
            ņ: "n",
            ṋ: "n",
            ṉ: "n",
            ƞ: "n",
            ɲ: "n",
            ŉ: "n",
            ꞑ: "n",
            ꞥ: "n",
            ǌ: "nj",
            "\u24DE": "o",
            ｏ: "o",
            ò: "o",
            ó: "o",
            ô: "o",
            ồ: "o",
            ố: "o",
            ỗ: "o",
            ổ: "o",
            õ: "o",
            ṍ: "o",
            ȭ: "o",
            ṏ: "o",
            ō: "o",
            ṑ: "o",
            ṓ: "o",
            ŏ: "o",
            ȯ: "o",
            ȱ: "o",
            ö: "o",
            ȫ: "o",
            ỏ: "o",
            ő: "o",
            ǒ: "o",
            ȍ: "o",
            ȏ: "o",
            ơ: "o",
            ờ: "o",
            ớ: "o",
            ỡ: "o",
            ở: "o",
            ợ: "o",
            ọ: "o",
            ộ: "o",
            ǫ: "o",
            ǭ: "o",
            ø: "o",
            ǿ: "o",
            ɔ: "o",
            ꝋ: "o",
            ꝍ: "o",
            ɵ: "o",
            œ: "oe",
            ɶ: "oe",
            ƣ: "oi",
            ȣ: "ou",
            ꝏ: "oo",
            "\u24DF": "p",
            ｐ: "p",
            ṕ: "p",
            ṗ: "p",
            ƥ: "p",
            ᵽ: "p",
            ꝑ: "p",
            ꝓ: "p",
            ꝕ: "p",
            "\u24E0": "q",
            ｑ: "q",
            ɋ: "q",
            ꝗ: "q",
            ꝙ: "q",
            "\u24E1": "r",
            ｒ: "r",
            ŕ: "r",
            ṙ: "r",
            ř: "r",
            ȑ: "r",
            ȓ: "r",
            ṛ: "r",
            ṝ: "r",
            ŗ: "r",
            ṟ: "r",
            ɍ: "r",
            ɽ: "r",
            ꝛ: "r",
            ꞧ: "r",
            ꞃ: "r",
            "\u24E2": "s",
            ｓ: "s",
            ś: "s",
            ṥ: "s",
            ŝ: "s",
            ṡ: "s",
            š: "s",
            ṧ: "s",
            ṣ: "s",
            ṩ: "s",
            ș: "s",
            ş: "s",
            ȿ: "s",
            ꞩ: "s",
            ꞅ: "s",
            ſ: "s",
            ẛ: "s",
            ß: "ss",
            "\u24E3": "t",
            ｔ: "t",
            ṫ: "t",
            ẗ: "t",
            ť: "t",
            ṭ: "t",
            ț: "t",
            ţ: "t",
            ṱ: "t",
            ṯ: "t",
            ŧ: "t",
            ƭ: "t",
            ʈ: "t",
            ⱦ: "t",
            ꞇ: "t",
            ꜩ: "tz",
            "\u24E4": "u",
            ｕ: "u",
            ù: "u",
            ú: "u",
            û: "u",
            ũ: "u",
            ṹ: "u",
            ū: "u",
            ṻ: "u",
            ŭ: "u",
            ü: "u",
            ǜ: "u",
            ǘ: "u",
            ǖ: "u",
            ǚ: "u",
            ủ: "u",
            ů: "u",
            ű: "u",
            ǔ: "u",
            ȕ: "u",
            ȗ: "u",
            ư: "u",
            ừ: "u",
            ứ: "u",
            ữ: "u",
            ử: "u",
            ự: "u",
            ụ: "u",
            ṳ: "u",
            ų: "u",
            ṷ: "u",
            ṵ: "u",
            ʉ: "u",
            "\u24E5": "v",
            ｖ: "v",
            ṽ: "v",
            ṿ: "v",
            ʋ: "v",
            ꝟ: "v",
            ʌ: "v",
            ꝡ: "vy",
            "\u24E6": "w",
            ｗ: "w",
            ẁ: "w",
            ẃ: "w",
            ŵ: "w",
            ẇ: "w",
            ẅ: "w",
            ẘ: "w",
            ẉ: "w",
            ⱳ: "w",
            "\u24E7": "x",
            ｘ: "x",
            ẋ: "x",
            ẍ: "x",
            "\u24E8": "y",
            ｙ: "y",
            ỳ: "y",
            ý: "y",
            ŷ: "y",
            ỹ: "y",
            ȳ: "y",
            ẏ: "y",
            ÿ: "y",
            ỷ: "y",
            ẙ: "y",
            ỵ: "y",
            ƴ: "y",
            ɏ: "y",
            ỿ: "y",
            "\u24E9": "z",
            ｚ: "z",
            ź: "z",
            ẑ: "z",
            ż: "z",
            ž: "z",
            ẓ: "z",
            ẕ: "z",
            ƶ: "z",
            ȥ: "z",
            ɀ: "z",
            ⱬ: "z",
            ꝣ: "z",
            "\uFF10": "0",
            "\u2080": "0",
            "\u24EA": "0",
            "\u2070": "0",
            "\u00B9": "1",
            "\u2474": "1",
            "\u2081": "1",
            "\u2776": "1",
            "\u24F5": "1",
            "\u2488": "1",
            "\u2460": "1",
            "\uFF11": "1",
            "\u00B2": "2",
            "\u2777": "2",
            "\u2475": "2",
            "\uFF12": "2",
            "\u2082": "2",
            "\u24F6": "2",
            "\u2461": "2",
            "\u2489": "2",
            "\u00B3": "3",
            "\uFF13": "3",
            "\u248A": "3",
            "\u2476": "3",
            "\u2083": "3",
            "\u2778": "3",
            "\u24F7": "3",
            "\u2462": "3",
            "\u24F8": "4",
            "\u2463": "4",
            "\u248B": "4",
            "\uFF14": "4",
            "\u2074": "4",
            "\u2084": "4",
            "\u2779": "4",
            "\u2477": "4",
            "\u248C": "5",
            "\u2085": "5",
            "\u24F9": "5",
            "\u2478": "5",
            "\u277A": "5",
            "\u2464": "5",
            "\uFF15": "5",
            "\u2075": "5",
            "\u2479": "6",
            "\u2076": "6",
            "\uFF16": "6",
            "\u277B": "6",
            "\u2086": "6",
            "\u2465": "6",
            "\u24FA": "6",
            "\u248D": "6",
            "\uFF17": "7",
            "\u2077": "7",
            "\u277C": "7",
            "\u24FB": "7",
            "\u248E": "7",
            "\u2087": "7",
            "\u247A": "7",
            "\u2466": "7",
            "\u2467": "8",
            "\u248F": "8",
            "\u24FC": "8",
            "\u247B": "8",
            "\u2078": "8",
            "\uFF18": "8",
            "\u277D": "8",
            "\u2088": "8",
            "\u24FD": "9",
            "\uFF19": "9",
            "\u2490": "9",
            "\u277E": "9",
            "\u247C": "9",
            "\u2089": "9",
            "\u2468": "9",
            "\u2079": "9"
          },
          chars = str.split(""),
          len = chars.length,
          normalized = false,
          i,
          character;
        for (i = 0; i !== len; i += 1) {
          character = chars[i];
          if (diacritics.hasOwnProperty(character)) {
            chars[i] = diacritics[character];
            normalized = true;
          }
        }
        return normalized ? chars.join("") : str;
      }
    },
    array: {
      noduplicates: function(arr) {
        var i,
          _ilen,
          j,
          out = [],
          obj = {};
        for (i = 0, _ilen = arr.length; i !== _ilen; i += 1) {
          obj[arr[i]] = 0;
        }
        for (j in obj) {
          if (obj.hasOwnProperty(j)) {
            out.push(j);
          }
        }
        return out;
      },
      diff: function(arr1, arr2) {
        var i,
          _ilen,
          _iarr,
          j,
          _jlen,
          match,
          out = [];
        for (i = 0, _ilen = arr1.length; i !== _ilen; i += 1) {
          _iarr = arr1[i];
          match = false;
          for (j = 0, _jlen = arr2.length; j !== _jlen; j += 1) {
            if (arr2[j] === _iarr) {
              match = true;
              break;
            }
          }
          if (!match) {
            out.push(_iarr);
          }
        }
      },
      keys: function(obj) {
        var keys = [];
        $.each(obj, function(key) {
          keys.push(key);
        });
        return keys;
      }
    },
    date: {
      convert: function(d) {
        if (d.constructor === Date) {
          return d;
        }
        if (d.constructor === Array) {
          return new Date(d[0], d[1], d[2]);
        }
        if (d.constructor === Number) {
          return new Date(d);
        }
        if (d.constructor === String) {
          return new Date(d);
        }
        if (typeof d === "object") {
          return new Date(d.year, d.month, d.date);
        }
        return NaN;
      },
      compare: function(a, b) {
        if (
          isFinite((a = this.convert(a).valueOf())) &&
          isFinite((b = this.convert(b).valueOf()))
        ) {
          return (a > b) - (a < b);
        }
        return NaN;
      },
      in_range: function(d, start, end) {
        if (
          isFinite((d = this.convert(d).valueOf())) &&
          isFinite((start = this.convert(start).valueOf())) &&
          isFinite((end = this.convert(end).valueOf()))
        ) {
          return start <= d && d <= end;
        }
        return NaN;
      },
      daysInMonth: function(iYear, iMonth) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
      },
      daysBetween: function(datelow, datehigh) {
        var date1 = pe.date.convert(datelow),
          date2 = pe.date.convert(datehigh),
          DSTAdjust = 0,
          oneMinute = 1000 * 60,
          oneDay = oneMinute * 60 * 24,
          diff;
        date1.setHours(0);
        date1.setMinutes(0);
        date1.setSeconds(0);
        date2.setHours(0);
        date2.setMinutes(0);
        date2.setSeconds(0);
        if (date2 > date1) {
          DSTAdjust =
            (date2.getTimezoneOffset() - date1.getTimezoneOffset()) * oneMinute;
        } else {
          DSTAdjust =
            (date1.getTimezoneOffset() - date2.getTimezoneOffset()) * oneMinute;
        }
        diff = Math.abs(date2.getTime() - date1.getTime()) - DSTAdjust;
        return Math.ceil(diff / oneDay);
      },
      to_iso_format: function(d, timepresent) {
        var date;
        date = this.convert(d);
        if (timepresent) {
          return (
            date.getFullYear() +
            "-" +
            pe.string.pad(date.getMonth() + 1, 2, "0") +
            "-" +
            pe.string.pad(date.getDate(), 2, "0") +
            " " +
            pe.string.pad(date.getHours(), 2, "0") +
            ":" +
            pe.string.pad(date.getMinutes(), 2, "0")
          );
        }
        return (
          date.getFullYear() +
          "-" +
          pe.string.pad(date.getMonth() + 1, 2, "0") +
          "-" +
          pe.string.pad(date.getDate(), 2, "0")
        );
      },
      from_iso_format: function(s) {
        var date = null;
        if (s) {
          if (s.match(/\d{4}-\d{2}-\d{2}/)) {
            date = new Date();
            date.setFullYear(
              s.substr(0, 4),
              s.substr(5, 2) - 1,
              s.substr(8, 2) - 1
            );
          }
          return date;
        }
        return null;
      }
    },
    data: {
      getData: function(elm, data_name) {
        var $elm = typeof elm.jquery !== "undefined" ? elm : $(elm),
          dataAttr = $elm.attr("data-" + data_name),
          dataObj = null;
        if (dataAttr) {
          dataObj = this.toObject(dataAttr);
        }
        $.data(elm, data_name, dataObj);
        return dataObj;
      },
      toObject: function(data_string) {
        var obj = null;
        try {
          obj = $.parseJSON(data_string);
        } catch (e) {
          if (data_string.indexOf("{") === -1) {
            data_string = "{" + data_string + "}";
          }
          obj = eval("(" + data_string + ")");
        }
        return obj;
      }
    },
    pedisable: function() {
      var lsenabled = typeof localStorage !== "undefined",
        disablels = lsenabled ? localStorage.getItem("pedisable") : null,
        disable =
          pe.urlquery.pedisable !== undefined
            ? pe.urlquery.pedisable
            : disablels,
        tphp = document.getElementById("wb-tphp"),
        li = document.createElement("li"),
        qparams = pe.urlquery,
        qparam,
        newquery = "?",
        settings = pe.settings,
        $html = pe.html,
        pedisable_link =
          settings && typeof settings.pedisable_link === "boolean"
            ? settings.pedisable_link
            : true;
      if (tphp !== null) {
        for (qparam in qparams) {
          if (qparams.hasOwnProperty(qparam) && qparam !== "pedisable") {
            newquery += qparam + "=" + qparams[qparam] + "&amp;";
          }
        }
        try {
          if (
            disable === "true" ||
            ((pe.preIE7 || $html.hasClass("bb-pre6")) && disable !== "false")
          ) {
            $html.addClass("no-js pe-disable");
            if (lsenabled) {
              localStorage.setItem("pedisable", "true");
            }
            if (pedisable_link) {
              li.innerHTML =
                '<a href="' +
                newquery +
                'pedisable=false">' +
                pe.dic.get("%pe-enable") +
                "</a>";
              tphp.appendChild(li);
            }
            return true;
          } else {
            if (disable === "false" || disablels !== null) {
              if (lsenabled) {
                localStorage.setItem("pedisable", "false");
              }
            }
          }
        } catch (error) {}
        if (pedisable_link) {
          li.innerHTML =
            '<a href="' +
            newquery +
            'pedisable=true">' +
            pe.dic.get("%pe-disable") +
            "</a>";
          tphp.appendChild(li);
        }
      }
      return false;
    },
    menu: {
      navcurrent: function(menusrc, bcsrc, navclass) {
        var pageurl =
            window.location.hostname +
            window.location.pathname.replace(/^([^\/])/, "/$1"),
          pageurlquery = window.location.search,
          link,
          linkhref,
          linkurl,
          linkurllen,
          linkquery,
          linkquerylen,
          linkindex,
          menulinks,
          menulink = [],
          menulinkurl = [],
          menulinkslen,
          bclinks,
          bclinkslen,
          bcindex,
          bclink,
          bclinkurl,
          match = false,
          hrefBug = pe.preIE8;
        menusrc = typeof menusrc.jquery !== "undefined" ? menusrc : $(menusrc);
        menulinks = menusrc.find("a").get();
        navclass = typeof navclass === "undefined" ? "nav-current" : navclass;
        menulinkslen = menulinks.length;
        while (menulinkslen--) {
          link = menulinks[menulinkslen];
          linkhref = link.getAttribute("href");
          if (linkhref !== null) {
            if (hrefBug && linkhref !== window.location.href) {
              linkhref = linkhref.replace(window.location.href, "");
            }
            if (linkhref.length !== 0 && linkhref.slice(0, 1) !== "#") {
              linkurl =
                link.hostname + link.pathname.replace(/^([^\/])/, "/$1");
              linkquery = link.search;
              linkquerylen = linkquery.length;
              if (
                pageurl.slice(-linkurl.length) === linkurl &&
                (linkquerylen === 0 ||
                  pageurlquery.slice(-linkquerylen) === linkquery)
              ) {
                match = true;
                break;
              }
              menulink.push(link);
              menulinkurl.push(linkurl);
            }
          }
        }
        if (!match) {
          bclink = [];
          bclinkurl = [];
          bcsrc = typeof bcsrc.jquery !== "undefined" ? bcsrc : $(bcsrc);
          bclinks = bcsrc.find("a").get();
          bclinkslen = bclinks.length;
          for (bcindex = 0; bcindex !== bclinkslen; bcindex += 1) {
            link = bclinks[bcindex];
            linkhref = link.getAttribute("href");
            if (hrefBug && linkhref !== window.location.href) {
              linkhref = linkhref.replace(window.location.href, "");
            }
            if (linkhref.length !== 0 && linkhref.slice(0, 1) !== "#") {
              bclink.push(link);
              bclinkurl.push(
                link.hostname + link.pathname.replace(/^([^\/])/, "/$1")
              );
            }
          }
          bclinkslen = bclinkurl.length;
          for (
            linkindex = 0, menulinkslen = menulink.length;
            linkindex !== menulinkslen;
            linkindex += 1
          ) {
            link = menulink[linkindex];
            linkurl = menulinkurl[linkindex];
            linkurllen = linkurl.length;
            linkquery = link.search;
            linkquerylen = linkquery.length;
            bcindex = bclinkslen;
            while (bcindex--) {
              if (
                bclinkurl[bcindex].slice(-linkurllen) === linkurl &&
                (linkquerylen === 0 ||
                  bclink[bcindex].search.slice(-linkquerylen) === linkquery)
              ) {
                match = true;
                break;
              }
            }
            if (match) {
              break;
            }
          }
        }
        return match ? $(link).addClass(navclass) : $();
      },
      buildmobile: function(
        menusrc,
        hlevel,
        theme_1,
        mbar,
        collapseTopOnly,
        theme_2,
        top,
        returnString,
        collapsible
      ) {
        var heading = "h" + hlevel,
          headingOpen = "<" + heading + ">",
          headingClose = "</" + heading + ">",
          m = typeof menusrc.jquery !== "undefined" ? menusrc : $(menusrc),
          mDOM = m[0].parentNode,
          mItems = m.find(
            "> div, > ul, > " + heading + ", > section > " + heading
          ),
          mItemsDOM = mItems.get(),
          mItems_i,
          mItems_len,
          mItem,
          mItemDOM,
          mItemTag,
          nextDOM,
          prevDOM,
          hlink,
          hlinkDOM,
          navCurrent,
          navCurrentNoCSS,
          nested,
          nested_i,
          nested_len,
          hnestDOM,
          hnestTag,
          hnestLinkDOM,
          hnestLinkDOM2,
          menubar = mbar !== undefined ? mbar : false,
          mainText = pe.dic.get("%main-page"),
          toplevel = top !== undefined ? top : true,
          secnav2Top = false,
          theme2 = theme_2 !== undefined ? theme_2 : theme_1,
          theme1 = toplevel ? theme_1 : theme_2,
          listView = '<ul data-role="listview" data-theme="' + theme2 + '">',
          listItems,
          listItem,
          listItem2,
          sectionOpenStart = '<div data-theme="',
          sectionOpenEnd = '" class="wb-nested-menu',
          sectionOpen1 = sectionOpenStart + theme1 + sectionOpenEnd,
          sectionOpen2 = sectionOpenStart + theme2 + sectionOpenEnd,
          sectionLinkStart = '<a data-role="button" data-theme="',
          sectionLinkEnd =
            '" data-icon="arrow-d" data-iconpos="left" data-corners="false" href="',
          sectionLinkOpen1 =
            '">' + headingOpen + sectionLinkStart + theme1 + sectionLinkEnd,
          sectionLinkOpen2 = sectionLinkStart + theme2 + sectionLinkEnd,
          sectionLinkClose = "</a>" + headingClose,
          link =
            '<a data-role="button" data-icon="arrow-r" data-iconpos="right" data-corners="false" href="',
          disableLink = 'javascript:;" class="ui-disabled',
          menu,
          url,
          i,
          len;
        collapseTopOnly =
          collapseTopOnly !== undefined ? collapseTopOnly : true;
        collapsible = collapsible !== undefined ? collapsible : false;
        returnString = returnString !== undefined ? returnString : false;
        if (mItemsDOM.length !== 0) {
          if (menubar && mDOM.getElementsByTagName(heading).length === 0) {
            menu =
              sectionOpen1 +
              '"><ul data-role="listview" data-theme="' +
              theme1 +
              '">';
            mItemsDOM = mDOM.getElementsByTagName("a");
            for (
              mItems_i = 0, mItems_len = mItemsDOM.length;
              mItems_i < mItems_len;
              mItems_i += 1
            ) {
              mItemDOM = mItemsDOM[mItems_i];
              menu +=
                '<li><a href="' +
                mItemDOM.href +
                '">' +
                mItemDOM.innerHTML +
                "</a></li>";
            }
            menu += "</ul></div>";
          } else {
            menu = "";
            for (
              mItems_i = 0, mItems_len = mItemsDOM.length;
              mItems_i < mItems_len;
              mItems_i += 1
            ) {
              mItemDOM = mItemsDOM[mItems_i];
              mItem = $(mItemDOM);
              mItemTag = mItemDOM.tagName.toLowerCase();
              if (mItemTag === heading) {
                menu += sectionOpen1;
                hlink = mItem.children("a");
                if (hlink.length !== 0) {
                  hlinkDOM = hlink[0];
                  url = hlinkDOM.getAttribute("href");
                  navCurrent = hlinkDOM.className.indexOf("nav-current") !== -1;
                  navCurrentNoCSS =
                    hlinkDOM.className.indexOf("nav-current-nocss") !== -1;
                  menu += navCurrent && !navCurrentNoCSS ? " nav-current" : "";
                } else {
                  navCurrent = false;
                  url = disableLink;
                }
                if (toplevel) {
                  secnav2Top = mItemDOM.className.indexOf("top-section") !== -1;
                }
                if (toplevel || collapsible || !collapseTopOnly) {
                  menu +=
                    '" data-role="collapsible"' +
                    (secnav2Top || navCurrent
                      ? ' data-collapsed="false">'
                      : ">") +
                    headingOpen +
                    mItem.text() +
                    headingClose;
                } else {
                  menu +=
                    sectionLinkOpen1 +
                    url +
                    '">' +
                    mItem.text() +
                    sectionLinkClose;
                }
                nextDOM = mItem.next()[0];
                if (typeof nextDOM !== "undefined") {
                  if (nextDOM.tagName.toLowerCase() === "ul") {
                    menu += listView;
                    nested = nextDOM.querySelector("li ul");
                    if (nested !== null && nested.length !== 0) {
                      hnestTag = "h" + (hlevel + 1);
                      listItems = nextDOM.children;
                      for (i = 0, len = listItems.length; i !== len; i += 1) {
                        listItem = listItems[i];
                        hnestDOM = listItem.getElementsByTagName("li");
                        menu += "<li>";
                        if (hnestDOM.length !== 0) {
                          hnestLinkDOM = listItem.children[0];
                          menu +=
                            sectionOpen2 +
                            '"><' +
                            hnestTag +
                            ' class="wb-nested-li-heading">' +
                            sectionLinkOpen2 +
                            hnestLinkDOM.href +
                            '">' +
                            hnestLinkDOM.innerHTML +
                            "</a></" +
                            hnestTag +
                            ">" +
                            listView;
                          for (
                            nested_i = 0, nested_len = hnestDOM.length;
                            nested_i !== nested_len;
                            nested_i += 1
                          ) {
                            listItem2 = hnestDOM[nested_i];
                            hnestLinkDOM2 = listItem2.querySelector("a");
                            menu +=
                              '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-icon="arrow-r" data-iconpos="right"><a href="' +
                              hnestLinkDOM2.href +
                              '">' +
                              hnestLinkDOM2.innerHTML +
                              "</a></li>";
                          }
                          menu += "</ul></div>";
                        } else {
                          menu += listItem.innerHTML;
                        }
                        menu += "</li>";
                      }
                    } else {
                      menu += nextDOM.innerHTML;
                    }
                    menu += "</ul>";
                  } else {
                    if (menubar) {
                      menu += pe.menu.buildmobile(
                        mItem.parent().find(".mb-sm"),
                        hlevel + 1,
                        theme1,
                        false,
                        collapseTopOnly,
                        theme2,
                        false,
                        true
                      );
                    } else {
                      menu += pe.menu.buildmobile(
                        mItem.parent(),
                        hlevel + 1,
                        theme1,
                        false,
                        collapseTopOnly,
                        theme2,
                        false,
                        true,
                        secnav2Top
                      );
                    }
                  }
                }
                if (
                  !menubar &&
                  hlink.length > 0 &&
                  (toplevel || collapsible || !collapseTopOnly)
                ) {
                  if (toplevel) {
                    menu =
                      menu.substring(0, menu.length - 6) +
                      link +
                      hlinkDOM.href +
                      '" class="ui-corner-bottom';
                  } else {
                    menu += link + hlinkDOM.href;
                  }
                  menu += '">' + hlinkDOM.innerHTML + " - " + mainText + "</a>";
                }
                menu += "</div>";
              } else {
                if (mItemTag === "ul") {
                  prevDOM = mItem.prev()[0];
                  if (
                    (typeof prevDOM === "undefined" ||
                      prevDOM.tagName.toLowerCase() !== heading) &&
                    mItemDOM.parentNode.tagName.toLowerCase() !== "li"
                  ) {
                    menu += listView + mItemDOM.innerHTML + "</ul>";
                  }
                } else {
                  if (mItemTag === "div") {
                    hnestDOM = mItem.children("a").get();
                    if (hnestDOM.length !== 0) {
                      for (i = 0, len = hnestDOM.length; i !== len; i += 1) {
                        hnestLinkDOM = hnestDOM[i];
                        menu +=
                          link +
                          hnestLinkDOM.href +
                          '" data-theme="' +
                          (toplevel ? theme1 : theme2) +
                          '">' +
                          hnestLinkDOM.innerHTML +
                          "</a>";
                      }
                    } else {
                      if (mItemDOM.children.length !== 0) {
                        menu += pe.menu.buildmobile(
                          mItemDOM,
                          hlevel,
                          theme1,
                          false,
                          collapseTopOnly,
                          theme2,
                          false,
                          true,
                          secnav2Top
                        );
                      }
                    }
                  }
                }
              }
            }
            if (toplevel || collapsible || !collapseTopOnly) {
              menu =
                '<div data-role="collapsible-set" data-inset="false" data-theme="' +
                theme1 +
                '"' +
                (toplevel ? ' class="ui-corner-all"' : "") +
                ">" +
                menu +
                "</div>";
            }
          }
          if (toplevel) {
            menu =
              '<div data-role="controlgroup" data-theme="' +
              theme1 +
              '">' +
              menu +
              "</div>";
          }
        }
        return returnString ? menu : $(menu);
      }
    },
    polyfills: {
      init: function() {
        var lib = pe.add.liblocation,
          $html = pe.html;
        if (!window.localStorage) {
          pe.add._load(
            lib + "polyfills/localstorage" + pe.suffix + ".js",
            "localstorage-loaded"
          );
          $html.addClass("polyfill-localstorage");
        } else {
          $html.addClass("localstorage");
        }
        if (!window.sessionStorage) {
          pe.add._load(
            lib + "polyfills/sessionstorage" + pe.suffix + ".js",
            "sessionstorage-loaded"
          );
          $html.addClass("polyfill-sessionstorage");
        } else {
          $html.addClass("sessionstorage");
        }
      },
      polyload: function(force, msg, checkdom) {
        var polyfills = this.polyfill,
          polyname,
          polyprefs,
          elms,
          polydep = {},
          loadnow = [],
          deps,
          dep_paths,
          dep_needed,
          lib = pe.add.liblocation,
          payload = [],
          needsinit = [],
          js = [],
          i,
          _len,
          $html = pe.html;
        for (polyname in polyfills) {
          if (polyfills.hasOwnProperty(polyname)) {
            polyprefs = polyfills[polyname];
            elms = checkdom ? $(polyprefs.selector) : $();
            if (elms.length !== 0 || $.inArray(polyname, force) !== -1) {
              if (typeof polyprefs.supported === "undefined") {
                polyprefs.supported =
                  typeof polyprefs.support_check === "function"
                    ? polyprefs.support_check()
                    : polyprefs.support_check;
                if (!polyprefs.supported) {
                  deps = polyprefs.depends;
                  if (typeof deps !== "undefined") {
                    dep_paths = pe.add.depends(deps);
                    dep_needed = [];
                    for (i = 0, _len = deps.length; i !== _len; i += 1) {
                      if ($.inArray(deps[i], pe.add.staged) === -1) {
                        dep_needed.push(deps[i]);
                      }
                    }
                    if (dep_needed.length !== 0) {
                      polydep[polyname] = dep_needed;
                    } else {
                      loadnow.push(polyname);
                    }
                  } else {
                    loadnow.push(polyname);
                  }
                  $html.addClass("polyfill-" + polyname);
                  elms.addClass("polyfill");
                } else {
                  $html.addClass(polyname);
                }
              } else {
                if (
                  !polyprefs.supported &&
                  typeof polyprefs.loaded === "undefined"
                ) {
                  loadnow.push(polyname);
                }
              }
            }
          }
        }
        _len = loadnow.length;
        while (_len--) {
          polyprefs = polyfills[loadnow[_len]];
          js[js.length] =
            typeof polyprefs.load !== "undefined"
              ? polyprefs.load
              : lib + "polyfills/" + loadnow[_len] + pe.suffix + ".js";
          if (typeof polyprefs.init !== "undefined") {
            needsinit.push(loadnow[_len]);
          }
          polyprefs.loaded = true;
        }
        payload.push(polydep);
        payload.push(needsinit);
        pe.add._load_arr(js, msg, payload);
      },
      enhance: function(poly_name, objs) {
        if (pe.html.hasClass("polyfill-" + poly_name)) {
          objs = typeof objs.jquery !== "undefined" ? objs.get() : objs;
          var polyobj = this.polyfill[poly_name],
            objs_len = objs.length;
          while (objs_len--) {
            polyobj.update($(objs[objs_len]).addClass("polyfill"));
          }
        }
      },
      polyfill: {
        datalist: {
          selector: "input[list]",
          update: function(elms) {
            elms.datalist();
          },
          support_check: !!(
            document.createElement("datalist") && window.HTMLDataListElement
          )
        },
        datepicker: {
          selector: 'input[type="date"]',
          depends: ["calendar", "xregexp"],
          update: function(elms) {
            elms.datepicker();
          },
          support_check: function() {
            var el = document.createElement("input"),
              supported;
            el.setAttribute("type", "date");
            el.value = ":)";
            el.style.cssText = "position:absolute;visibility:hidden;";
            document.body.appendChild(el);
            supported = el.value !== ":)";
            document.body.removeChild(el);
            return supported;
          }
        },
        detailssummary: {
          selector: "details",
          init: function() {
            $("details").details();
          },
          update: function(elms) {
            elms.details();
          },
          support_check: function() {
            var doc = document,
              el = doc.createElement("details"),
              fake,
              root,
              diff;
            if (typeof el.open === "undefined") {
              return false;
            }
            root =
              doc.body ||
              (function() {
                var de = doc.documentElement;
                fake = true;
                return de.insertBefore(
                  doc.createElement("body"),
                  de.firstElementChild || de.firstChild
                );
              })();
            el.innerHTML = "<summary>a</summary>b";
            el.style.display = "block";
            root.appendChild(el);
            diff = el.offsetHeight;
            el.open = true;
            diff = diff !== el.offsetHeight;
            root.removeChild(el);
            if (fake) {
              root.parentNode.removeChild(root);
            }
            return diff;
          }
        },
        mathml: {
          selector: "math",
          load:
            "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=Accessible",
          support_check: function() {
            var hasMathML = false,
              ns,
              divParent,
              div,
              divCompare,
              mrow,
              mo,
              mfrac;
            if (document.createElementNS) {
              ns = "http://www.w3.org/1998/Math/MathML";
              divParent = document.createElement("div");
              div = divParent.appendChild(document.createElement("div"));
              div.style.position = "absolute";
              div.style.color = "#fff";
              mrow = div
                .appendChild(document.createElementNS(ns, "math"))
                .appendChild(document.createElementNS(ns, "mrow"));
              mo = mrow.appendChild(document.createElementNS(ns, "mo"));
              mo.appendChild(document.createTextNode("|"));
              mfrac = mrow.appendChild(document.createElementNS(ns, "mfrac"));
              mfrac
                .appendChild(document.createElementNS(ns, "mi"))
                .appendChild(document.createTextNode("xx"));
              mfrac
                .appendChild(document.createElementNS(ns, "mi"))
                .appendChild(document.createTextNode("yy"));
              mrow
                .appendChild(document.createElementNS(ns, "mo"))
                .appendChild(document.createTextNode("|"));
              divCompare = divParent.appendChild(document.createElement("div"));
              divCompare.style.color = "#fff";
              divCompare.style.display = "inline";
              divCompare.appendChild(document.createTextNode("|xx|"));
              document.body.appendChild(divParent);
              hasMathML = div.offsetHeight > div.offsetWidth;
              div.style.position = "static";
              div.style.display = "inline";
              hasMathML = hasMathML && div.offsetWidth < divCompare.offsetWidth;
              divParent.parentNode.removeChild(divParent);
            }
            return hasMathML;
          }
        },
        meter: {
          selector: "meter",
          update: function(elms) {
            var meters = elms.get(),
              i = meters.length;
            while (i--) {
              makeMeter(meters[i]);
            }
          },
          support_check: document.createElement("meter").max !== undefined
        },
        progress: {
          selector: "progress",
          update: function(elms) {
            elms.progress();
          },
          support_check:
            document.createElement("progress").position !== undefined
        },
        slider: {
          selector: 'input[type="range"]',
          init: function() {
            fdSlider.onDomReady();
          },
          update: function() {
            fdSlider.onDomReady();
          },
          support_check: function() {
            var el = document.createElement("input"),
              defaultView,
              bool;
            el.setAttribute("type", "range");
            el.value = ":)";
            el.style.cssText = "position:absolute;visibility:hidden;";
            document.body.appendChild(el);
            defaultView = document.defaultView;
            bool =
              el.style.WebkitAppearance !== undefined &&
              defaultView.getComputedStyle &&
              defaultView.getComputedStyle(el, null).WebkitAppearance !==
                "textfield" &&
              el.offsetHeight !== 0;
            document.body.removeChild(el);
            return bool;
          }
        }
      }
    },
    get_language: function(lang, supported, sep) {
      var d;
      sep = typeof sep === "undefined" ? "-" : sep;
      if (typeof supported.indexOf === "undefined") {
        supported.indexOf = function(val) {
          var i, len;
          for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] === val) {
              return i;
            }
          }
          return -1;
        };
      }
      if (supported.indexOf(lang) !== -1) {
        return lang;
      } else {
        d = lang.indexOf(sep);
        if (d !== -1) {
          lang = lang.substr(0, d);
          if (supported.indexOf(lang) !== -1) {
            return lang;
          }
        }
      }
      return null;
    },
    add: (function() {
      return {
        head: document.head || document.getElementsByTagName("head")[0],
        liblocation: (function() {
          var pefile = $('body script[src*="/pe-ap"]').attr("src");
          return pefile.substr(0, pefile.lastIndexOf("/") + 1);
        })(),
        themecsslocation: (function() {
          var themecss =
            wet_boew_theme !== null
              ? $(
                  'head link[rel="stylesheet"][href*="' +
                    wet_boew_theme.theme +
                    '"]'
                )
              : "";
          return themecss.length > 0
            ? themecss
                .attr("href")
                .substr(0, themecss.attr("href").lastIndexOf("/") + 1)
            : "theme-not-found/";
        })(),
        staged: [],
        _load: function(js, message) {
          var head = pe.add.head,
            msg =
              message !== undefined ? message : "wet-boew-dependency-loaded";
          if ($.inArray(js, this.staged) > -1) {
            pe.document.trigger({ type: msg, js: js });
            return this;
          }
          setTimeout(function timeout() {
            if (typeof head.item !== "undefined") {
              if (!head[0]) {
                setTimeout(timeout, 25);
                return;
              }
              head = head[0];
            }
            var scriptElem = document.createElement("script"),
              scriptdone = false;
            pe.add.set(scriptElem, "async", "async");
            scriptElem.onload = scriptElem.onreadystatechange = function() {
              if (
                scriptdone ||
                (scriptElem.readyState &&
                  scriptElem.readyState !== "complete" &&
                  scriptElem.readyState !== "loaded")
              ) {
                return false;
              }
              scriptElem.onload = scriptElem.onreadystatechange = null;
              scriptdone = true;
              pe.document.trigger({ type: msg, js: js });
            };
            scriptElem.src = js;
            if (pe.preIE9 || !head.insertBefore) {
              $(scriptElem)
                .appendTo($(head))
                .delay(100);
            } else {
              head.insertBefore(scriptElem, head.firstChild);
            }
          }, 0);
          this.staged[this.staged.length] = js;
          return this;
        },
        _load_arr: function(js, msg_all, payload) {
          var js_loaded = 0,
            i,
            _len,
            msg_single = msg_all + "-single";
          pe.document.on(msg_single, function() {
            js_loaded += 1;
            if (js_loaded === js.length) {
              pe.document.off(msg_single);
              pe.document.trigger({ type: msg_all, payload: payload });
            }
          });
          if (js.length > 0) {
            for (i = 0, _len = js.length; i < _len; i += 1) {
              pe.add._load(js[i], msg_single);
            }
          } else {
            pe.document.off(msg_single);
            pe.document.trigger({ type: msg_all, payload: payload });
          }
          return this;
        },
        set: function(elm, name, value) {
          elm.setAttribute(name, value);
          return this;
        },
        css: function(css) {
          var head = pe.add.head,
            styleElement = document.createElement("link");
          pe.add
            .set(styleElement, "rel", "stylesheet")
            .set(styleElement, "href", css);
          if (pe.preIE10 || !head.insertBefore) {
            $(styleElement)
              .appendTo($(head))
              .attr("href", css);
          } else {
            head.insertBefore(styleElement, head.firstChild);
          }
          return this;
        },
        depends: function(d, css) {
          var iscss = typeof css !== "undefined" ? css : false,
            extension = pe.suffix + (iscss ? ".css" : ".js"),
            dir = pe.add.liblocation + "dependencies/" + (iscss ? "css/" : ""),
            c_d = $.map(d, function(a) {
              return /^http(s)?/i.test(a) ? a : dir + a + extension;
            });
          return c_d;
        },
        language: function(lang) {
          var url;
          lang = pe.get_language(lang, pe.languages);
          url =
            pe.add.liblocation +
            "i18n/" +
            (lang !== null ? lang : "en") +
            pe.suffix +
            ".js";
          pe.add._load(url);
        },
        meta: function(name, content) {
          var styleElement;
          styleElement = document.createElement("meta");
          pe.add
            .set(styleElement, "name", name)
            .set(styleElement, "content", content);
          pe.add.head.appendChild(styleElement);
          return this;
        },
        favicon: function(href, rel, sizes) {
          var favicon = document.createElement("link");
          pe.add
            .set(favicon, "href", href)
            .set(favicon, "rel", rel)
            .set(favicon, "sizes", sizes);
          pe.add.head.appendChild(favicon);
          return this;
        }
      };
    })(),
    wb_load: function(options, finished_event) {
      if (typeof options === "undefined") {
        options = {};
      }
      if (typeof finished_event === "undefined") {
        finished_event = "wb-loaded";
      }
      var i,
        j,
        _len,
        _len2,
        settings = pe.settings,
        plugins = typeof options.plugins !== "undefined" ? options.plugins : {},
        plug,
        _pcalls,
        pcalls = typeof options.global !== "undefined" ? options.global : [],
        pcall,
        node,
        classes,
        dep = typeof options.dep !== "undefined" ? options.dep : [],
        depcss = typeof options.depcss !== "undefined" ? options.depcss : [],
        poly = typeof options.poly !== "undefined" ? options.poly : [],
        checkdom =
          typeof options.checkdom !== "undefined" ? options.checkdom : false,
        polycheckdom =
          typeof options.polycheckdom !== "undefined"
            ? options.polycheckdom
            : false,
        wetboew = checkdom ? $('[class^="wet-boew-"]') : $(),
        time = new Date().getTime(),
        event_polyinit = "wb-polyinit-loaded-" + time,
        event_pcalldeps = "wb-pcalldeps-loaded-" + time,
        event_polydep = "wb-polydeps-loaded-" + time;
      for (plug in plugins) {
        if (plugins.hasOwnProperty(plug)) {
          wetboew = wetboew.add(plugins[plug].addClass("wet-boew-" + plug));
        }
      }
      for (j = 0, _len2 = wetboew.length; j !== _len2; j += 1) {
        node = wetboew[j];
        classes = node.className.split(" ");
        _pcalls = [];
        for (i = 0, _len = classes.length; i !== _len; i += 1) {
          if (classes[i].indexOf("wet-boew-") === 0) {
            _pcalls.push(classes[i].substr(9).toLowerCase());
          }
        }
        node.setAttribute("data-load", _pcalls.join(","));
        pcalls.push.apply(pcalls, _pcalls);
      }
      if (settings) {
        pcalls.push(settings.globals);
      }
      pcalls = pe.array.noduplicates(pcalls);
      for (i = 0, _len = pcalls.length; i !== _len; i += 1) {
        pcall = pcalls[i];
        if (typeof pe.fn[pcall] !== "undefined") {
          if (typeof pe.fn[pcall].polyfills !== "undefined") {
            poly.push.apply(poly, pe.fn[pcall].polyfills);
          }
          if (typeof pe.fn[pcall].depends !== "undefined") {
            dep.push.apply(dep, pe.fn[pcall].depends);
            if (typeof pe.fn[pcall].dependscss !== "undefined") {
              dep.push.apply(depcss, pe.fn[pcall].dependscss);
            }
          }
        }
      }
      pe.document.one(event_polyinit, function(e) {
        var polyfills = pe.polyfills.polyfill,
          polydeps = e.payload[0],
          polyinit = e.payload[1],
          polydeps_load = [],
          polyname;
        for (i = 0, _len = polyinit.length; i !== _len; i += 1) {
          polyfills[polyinit[i]].init();
        }
        for (polyname in polydeps) {
          if (polydeps.hasOwnProperty(polyname)) {
            dep.push.apply(dep, polydeps[polyname]);
            polydeps_load.push(polyname);
          }
        }
        pe.document.one(event_pcalldeps, function() {
          pe.document.one(event_polydep, function(e) {
            polyinit = typeof e.payload !== "undefined" ? e.payload[1] : [];
            for (i = 0, _len = polyinit.length; i !== _len; i += 1) {
              polyfills[polyinit[i]].init();
            }
            var _len2 = wetboew.length,
              _node,
              _fcall;
            while (_len2--) {
              _node = wetboew.eq(_len2);
              _fcall = _node.attr("data-load").split(",");
              for (i = 0, _len = _fcall.length; i !== _len; i += 1) {
                if (typeof pe.fn[_fcall[i]] !== "undefined") {
                  pe.fn[_fcall[i]]._exec(_node);
                }
              }
            }
            if (settings) {
              for (i = 0, _len = settings.globals.length; i !== _len; i += 1) {
                pe.fn[settings.globals[i]]._exec(document);
              }
            }
            pe.document.trigger(finished_event);
          });
          if (polydeps_load.length !== 0) {
            pe.polyfills.polyload(polydeps_load, event_polydep, false);
          } else {
            pe.document.trigger(event_polydep);
          }
        });
        if (dep.length !== 0) {
          if (depcss.length > 0) {
            depcss = pe.add.depends(pe.array.noduplicates(depcss), true);
            _len = depcss.length;
            while (_len--) {
              pe.add.css(depcss[_len]);
            }
          }
          pe.add._load_arr(
            pe.add.depends(pe.array.noduplicates(dep)),
            event_pcalldeps
          );
        } else {
          pe.document.trigger(event_pcalldeps);
        }
      });
      pe.polyfills.polyload(
        pe.array.noduplicates(poly),
        event_polyinit,
        polycheckdom
      );
    },
    dance: function() {
      var loading_finished = "wb-init-loaded",
        plugins = {};
      pe.document.one(loading_finished, function() {
        if (!pe.preIE9) {
          pe.resize(function() {
            var mobilecheck = pe.mobilecheck(),
              mediumcheck;
            if (pe.mobile !== mobilecheck) {
              pe.mobile = mobilecheck;
              window.location.reload();
            } else {
              mediumcheck = pe.mediumcheck();
              if (pe.medium !== mediumcheck) {
                pe.html.toggleClass("medium-screen small-screen");
              }
              pe.medium = mediumcheck;
            }
          });
        }
      });
      if (pe.ie > 0) {
        plugins.equalize = pe.main;
        if (pe.preIE9) {
          plugins.css3ie = pe.main;
        }
      }
      pe.resizeutil.init();
      pe.wb_load(
        { plugins: plugins, checkdom: true, polycheckdom: true },
        loading_finished
      );
    }
  };
  window.pe = $.extend(true, pe, _pe);
  return window.pe;
})(jQuery)._init();
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.archived = {
    type: "plugin",
    _exec: function(f) {
      if (a.mobile) {
        return;
      }
      var c = b(
          '<div class="archived" role="toolbar"><a class="archived-top-page" href="#archived" role="link">' +
            a.dic.get("%archived-page") +
            "</a></div>"
        ),
        e = a.window,
        d = e.scrollTop();
      e.on("scroll", function() {
        if (b(this).scrollTop() > 10) {
          c.fadeIn("normal").attr("aria-hidden", "false");
        } else {
          c.fadeOut("normal").attr("aria-hidden", "true");
        }
      });
      a.document.on("focusin", function(h) {
        var g = b(h.target);
        if (
          c.attr("aria-hidden") === "false" &&
          typeof g.offset() !== "undefined" &&
          g.offset().top <= c.offset().top + c.outerHeight()
        ) {
          setTimeout(function() {
            e.scrollTop(g.offset().top - c.outerHeight());
          }, 100);
        }
      });
      c.on("click", "a", function(h) {
        var g = h.button;
        if (typeof g === "undefined" || g === a.leftMouseButton) {
          window.location.hash = this.hash;
        }
      });
      if (d < 10 || d === "undefined") {
        c.attr("aria-hidden", "true");
      } else {
        c.fadeIn("normal").attr("aria-hidden", "false");
      }
      a.pagecontainer().append(c);
      return f;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.charts = {
    type: "plugin",
    depends: a.preIE9
      ? ["parserTable", "excanvas", "flot", "charts"]
      : ["parserTable", "flot", "charts"],
    polyfills: ["detailssummary"],
    _exec: function(b) {
      a.fn.chartsGraph.generate(b);
    }
  };
  window.pe = a;
  return a;
})();
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.css3ie = {
    type: "plugin",
    depends: a.preIE9 ? ["pie"] : [],
    _exec: function(j) {
      if (a.mobile || !a.preIE9) {
        return;
      }
      var l = b(".rounded, .pie-enhance, .ui-icon"),
        g = false,
        k = b("#wb-core"),
        d = k.children("#wb-core-in"),
        i = k.css("margin-bottom"),
        h,
        c,
        f,
        e;
      f = function() {
        l.each(function() {
          PIE.attach(this);
        });
        return true;
      };
      e = function() {
        l.each(function() {
          PIE.detach(this);
        });
        return false;
      };
      if (window.PIE) {
        l.filter(function() {
          return b(this).css("position") === "static";
        }).css("position", "relative");
        if (a.ie > 0 && a.ie < 8) {
          h = document.body;
          c = h.getBoundingClientRect();
          if ((c.left - c.right) / h.offsetWidth === -1) {
            g = f();
          } else {
            k.css(
              "margin-bottom",
              d.offset().top + d.height() - (k.offset().top + k.height())
            );
          }
        } else {
          g = f();
        }
        a.resize(function() {
          if (a.ie === 7) {
            var m = document.body,
              n = m.getBoundingClientRect();
            if ((n.left - n.right) / m.offsetWidth !== -1) {
              g = e(l);
              k.css(
                "margin-bottom",
                d.offset().top + d.height() - (k.offset().top + k.height())
              );
            } else {
              if (!g) {
                f();
              }
              k.css("margin-bottom", i);
            }
          }
        });
      }
      return j;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.datemodified = {
    type: "plugin",
    _exec: function() {
      var c,
        d,
        e = document.getElementsByName("dcterms.modified")[0];
      if (typeof e === "undefined" || e === null) {
        return false;
      }
      c = { updateNonEmpty: false, modifiedId: "gcwu-date-mod" };
      if (typeof wet_boew_datemodified !== "undefined") {
        b.extend(c, wet_boew_datemodified);
      }
      d = document.getElementById(c.modifiedId);
      if (typeof d === "undefined" || d === null) {
        return false;
      }
      d = d.getElementsByTagName("time")[0];
      if (typeof d === "undefined" || d === null) {
        return false;
      }
      if (d.innerHTML === "" || c.updateNonEmpty) {
        d.innerHTML = e.content;
      }
      return false;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.deselectradio = {
    type: "plugin",
    depends: [],
    _exec: function(e) {
      var b = document.getElementsByTagName("input"),
        d = b.length,
        c;
      while (d--) {
        c = b[d];
        if (c.type === "radio" && c.className.indexOf("deselect-off") === -1) {
          c.className += " deselectable" + (c.checked ? " checked" : "");
        }
      }
      a.document.on(
        "click vclick",
        'input[type="radio"].deselectable',
        function(k) {
          var h,
            f,
            g,
            j,
            i = k.button;
          if (typeof i === "undefined" || i === a.leftMouseButton) {
            k.stopPropagation();
            if (this.className.indexOf(" checked") !== -1) {
              this.checked = false;
              this.className = this.className.replace(" checked", "");
            } else {
              h = this.getAttribute("name");
              if (h !== undefined) {
                f = document.getElementsByName(h);
                j = f.length;
                while (j--) {
                  g = f[j];
                  if (g.className.indexOf(" checked") !== -1) {
                    g.className = g.className.replace(" checked", "");
                  }
                }
                this.className += " checked";
              }
            }
          }
        }
      );
      return e;
    }
  };
  window.pe = a;
  return a;
})();
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.equalize = {
    type: "plugin",
    depends: a.mobile ? [] : ["equalheights"],
    _exec: function(c) {
      if (a.mobile) {
        return;
      }
      b(".equalize")
        .children()
        .css("min-height", "")
        .parent()
        .equalHeights(true);
      a.resize(function() {
        b(".equalize")
          .children()
          .css("min-height", "")
          .parent()
          .equalHeights(true);
      });
      return c;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.eventscalendar = {
    type: "plugin",
    depends: ["calendar", "xregexp"],
    _exec: function(h) {
      var w = new Date(),
        q = a.fn.calendar,
        m = w.getFullYear(),
        x = w.getMonth(),
        y = h.find(".year"),
        j = h.find(".month"),
        s,
        d,
        n,
        p,
        z,
        v,
        t,
        o,
        e,
        l,
        c,
        r,
        u,
        g,
        k,
        f,
        i = a.dic.get("%calendar-monthNames");
      z = function(D) {
        var C = !b(D).hasClass("event-anchoring"),
          B = { minDate: null, maxDate: null, iCount: 0, list: [{ a: 1 }] },
          A = null;
        if (D.find("ol").length > 0) {
          A = D.find("ol");
        } else {
          if (D.find("ul").length > 0) {
            A = D.find("ul");
          }
        }
        if (A.length > 0) {
          A.children("li").each(function() {
            var F = b(this),
              K = F.find("*:header:first"),
              P = K.text(),
              I = F.find("a").first(),
              N = I.attr("href"),
              G,
              H,
              E,
              R,
              S,
              Q,
              O,
              M,
              J,
              L;
            if (!C) {
              G = F.attr("id") !== undefined ? F.attr("id") : v(6);
              F.attr("id", G);
              if (a.ie > 0) {
                F.attr("tabindex", "-1");
              }
              N = "#" + G;
            }
            H = new Date();
            E = F.find("time, span.datetime");
            if (E.length > 1) {
              S =
                b(E[0])
                  .get(0)
                  .nodeName.toLowerCase() === "time"
                  ? b(E[0])
                      .attr("datetime")
                      .substr(0, 10)
                      .split("-")
                  : b(E[0])
                      .attr("class")
                      .match(/datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/)[1]
                      .substr(0, 10)
                      .split("-");
              Q =
                b(E[1])
                  .get(0)
                  .nodeName.toLowerCase() === "time"
                  ? b(E[1])
                      .attr("datetime")
                      .substr(0, 10)
                      .split("-")
                  : b(E[1])
                      .attr("class")
                      .match(/datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/)[1]
                      .substr(0, 10)
                      .split("-");
              S[1] = S[1] - 1;
              Q[1] = Q[1] - 1;
              H.setFullYear(S[0], S[1], S[2]);
              for (M = 0, J = a.date.daysBetween(S, Q); M <= J; M += 1) {
                if (B.minDate === null || H < B.minDate) {
                  B.minDate = H;
                }
                if (B.maxDate === null || H > B.maxDate) {
                  B.maxDate = H;
                }
                B.list[B.iCount] = {
                  title: P,
                  date: new Date(H.getTime()),
                  href: N
                };
                H = new Date(H.setDate(H.getDate() + 1));
                L =
                  "filter-" +
                  H.getFullYear() +
                  "-" +
                  a.string.pad(H.getMonth() + 1, 2);
                if (!K.hasClass(L)) {
                  K.addClass(L);
                }
                B.iCount += 1;
              }
            } else {
              if (E.length === 1) {
                R = b(E[0]);
                O =
                  R.get(0).nodeName.toLowerCase() === "time"
                    ? R.attr("datetime")
                        .substr(0, 10)
                        .split("-")
                    : R.attr("class")
                        .match(/datetime\s+\{date\:\s*(\d+-\d+-\d+)\}/)[1]
                        .substr(0, 10)
                        .split("-");
                H.setFullYear(O[0], O[1] - 1, O[2]);
                if (B.minDate === null || H < B.minDate) {
                  B.minDate = H;
                }
                if (B.maxDate === null || H > B.maxDate) {
                  B.maxDate = H;
                }
                B.list[B.iCount] = { title: P, date: H, href: N };
                L =
                  "filter-" +
                  H.getFullYear() +
                  "-" +
                  a.string.pad(H.getMonth() + 1, 2);
                if (!K.hasClass(L)) {
                  K.addClass(L);
                }
                B.iCount += 1;
              }
            }
          });
        }
        window.events = B;
        return B;
      };
      v = function(C) {
        var B = "",
          A,
          D;
        A = function() {
          D = Math.floor(Math.random() * 62);
          if (D < 10) {
            return D;
          }
          if (D < 36) {
            return String.fromCharCode(D + 55);
          }
          return String.fromCharCode(D + 61);
        };
        while (B.length < C) {
          B += A();
        }
        return "id" + B;
      };
      l = function(C) {
        var B, A, D;
        switch (C.keyCode) {
          case 13:
          case 32:
          case 38:
          case 40:
            a.focus(C.data.details.find("a").first());
            return false;
          case 37:
            D = b(this);
            B = D.closest("li").index();
            A = D.closest("ol")
              .children("li:lt(" + B + ")")
              .children("a")
              .last();
            a.focus(A);
            return false;
          case 39:
            D = b(this);
            B = D.closest("li").index();
            A = D.closest("ol")
              .children("li:gt(" + B + ")")
              .children("a")
              .first();
            a.focus(A);
            return false;
          case 27:
            b(this)
              .siblings(".ev-details")
              .removeClass("ev-details")
              .addClass("wb-invisible");
            return false;
        }
      };
      e = function(E) {
        var C,
          A,
          D,
          F = b(this),
          B;
        switch (E.keyCode) {
          case 38:
            C = F.closest("li").index();
            B = F.closest("ul").children("li");
            D = B.length;
            a.focus(B.eq((C - 1) % D).children("a"));
            return false;
          case 40:
            C = F.closest("li").index();
            B = F.closest("ul").children("li");
            D = B.length;
            a.focus(B.eq((C + 1) % D).children("a"));
            return false;
          case 37:
            C = F.closest("li[id^=cal-]").index();
            A = F.closest("ol")
              .children("li:lt(" + C + ")")
              .children("a")
              .last();
            a.focus(A);
            return false;
          case 39:
            C = F.closest("li[id^=cal-]").index();
            A = F.closest("ol")
              .children("li:gt(" + C + ")")
              .children("a")
              .first();
            a.focus(A);
            return false;
          case 27:
            a.focus(F.closest("li[id^=cal-]").children(".cal-event"));
            return false;
        }
      };
      c = function(A) {
        A.data.details.dequeue();
        A.data.details.removeClass("wb-invisible");
        A.data.details.addClass("ev-details");
      };
      r = function(A) {
        A.data.details.delay(100).queue(function() {
          b(this).removeClass("ev-details");
          b(this).addClass("wb-invisible");
          b(this).dequeue();
        });
      };
      u = function(A) {
        A.data.details.removeClass("wb-invisible");
        A.data.details.addClass("ev-details");
      };
      g = function(A) {
        setTimeout(function() {
          if (A.data.details.find("a:focus").length === 0) {
            A.data.details.removeClass("ev-details");
            A.data.details.addClass("wb-invisible");
          }
        }, 5);
      };
      k = function(A) {
        setTimeout(function() {
          if (A.data.details.find("a:focus").length === 0) {
            A.data.details.removeClass("ev-details");
            A.data.details.addClass("wb-invisible");
          }
        }, 5);
      };
      f = function(A) {
        A.data.details.removeClass("wb-invisible");
        A.data.details.addClass("ev-details");
      };
      t = function(J, H, M, C, B) {
        var I, N, A, L, G, E, K, F, D;
        M.each(function(P, O) {
          b(O).css("z-index", 31 - P);
        });
        for (I = 0, N = B.length; I !== N; I += 1) {
          A = new Date(B[I].date);
          if (A.getMonth() === H && A.getFullYear() === J) {
            L = b(M[A.getDate() - 1]);
            G = L.children("div").html();
            if (L.children("a").length < 1) {
              L.empty();
              K = b(
                '<a data-ajax="false" href="#ev-' +
                  L.attr("id") +
                  '" class="cal-event">' +
                  G +
                  "</a>"
              );
              L.append(K);
              E = b('<ul class="wb-invisible"></ul>');
              K.on("keydown", { details: E }, l);
              L.on("mouseover", { details: E }, c);
              L.on("mouseout", { details: E }, r);
              K.on("focus", { details: E }, u);
              K.on("blur", { details: E }, g);
              L.append(E);
            } else {
              E = L.find("ul.wb-invisible");
            }
            F = b(
              '<li><a data-ajax="false" href="' +
                B[I].href +
                '">' +
                B[I].title +
                "</a></li>"
            );
            if (a.cssenabled) {
              F.children("a").attr("tabindex", "-1");
            }
            E.append(F);
            D = F.children("a");
            D.on("keydown", e);
            D.on("blur", { details: E }, k);
            D.on("focus", { details: E }, f);
          }
        }
      };
      o = function(B, C, A) {
        b("." + A + " li.calendar-display-onshow")
          .addClass("wb-invisible")
          .has(
            ":header[class*=filter-" +
              B +
              "-" +
              a.string.pad(parseInt(C, 10) + 1, 2) +
              "]"
          )
          .removeClass("wb-invisible");
      };
      b.when
        .apply(
          b,
          b.map(h.find("[data-cal-events]"), function(E) {
            var H = b(E),
              G = H.attr("data-cal-events").split(/\s+/),
              B = b.Deferred(),
              D,
              A = G.length,
              C = [],
              F;
            F = function(I) {
              H.append(b.trim(I));
            };
            for (D = 0; D < A; D += 1) {
              C.push(b.get(G[D], F, "html"));
            }
            b.when.apply(b, C).always(function() {
              B.resolve();
            });
            return B.promise();
          })
        )
        .always(function() {
          if (y.length > 0 && j.length > 0) {
            m = y.text();
            if (j.hasClass("textformat")) {
              s = b.inArray(j.text(), i);
              x = s;
            } else {
              x = j.text() - 1;
            }
          }
          d = z(h);
          n = h
            .attr("class")
            .split(" ")
            .slice(-1);
          p = b("#" + n);
          if (b("#wb-main-in").css("padding-left") === "0px") {
            p.css("margin-left", "10px");
          }
          p.on("calendarDisplayed", function(C, A, B, D) {
            t(A, B, D, n, d.list);
            o(A, B, n);
          });
          q.create(n, m, x, true, d.minDate, d.maxDate);
          p.attr("aria-label", a.dic.get("%calendar"));
        });
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.expandcollapseall = {
    type: "plugin",
    _open: false,
    _polyfill: false,
    _togglers: [],
    _aria_controls: null,
    _exec: function(f) {
      var e, c, d;
      c = {
        togglers: { toggle: false, open: false, close: false },
        accentFirst: false,
        printOpen: false,
        text: {
          toggle: a.dic.get("%td-toggle"),
          open: a.dic.get("%td-open"),
          close: a.dic.get("%td-close"),
          titleOpen: a.dic.get("%td-ttl-open"),
          titleClose: a.dic.get("%td-ttl-close")
        }
      };
      d = {
        togglers: {
          toggle: f.hasClass("toggle") ? true : false,
          open: f.hasClass("toggle-open") ? true : false,
          close: f.hasClass("toggle-close") ? true : false
        },
        accentFirst: f.hasClass("accent-first") ? true : undefined,
        printOpen: f.hasClass("print-open") ? true : undefined
      };
      b.extend(
        c,
        typeof wet_boew_expandcollapseall !== "undefined"
          ? wet_boew_expandcollapseall
          : {},
        d,
        a.data.getData(f, "wet-boew")
      );
      this._polyfill = a.html.hasClass("polyfill-detailssummary");
      this._initTogglers(f, c);
      if (c.printOpen) {
        a.window.on(
          "beforeprint",
          b.proxy(function() {
            this.setOpen(false);
            this.toggle();
          }, this)
        );
        if (typeof window.matchMedia !== "undefined") {
          e = window.matchMedia("print");
          if (typeof e.addListener !== "undefined") {
            e.addListener(function(g) {
              if (g.matches) {
                a.window.trigger("beforeprint");
              }
            });
          }
        }
        b("details").addClass("print-open");
      }
      return f;
    },
    isOpen: function() {
      return this._open === true;
    },
    setOpen: function(c) {
      this._open = c;
    },
    toggle: function() {
      var e,
        d = 0,
        c = b("details");
      if (this._polyfill) {
        c.prop("open", this.isOpen());
        c.find("summary").click();
      } else {
        c.prop("open", !this.isOpen());
      }
      this.setOpen(!this.isOpen());
      for (e = this._togglers.length; d < e; d++) {
        this._setTitle(this._togglers[d]);
      }
    },
    _initTogglers: function(k, h) {
      var c,
        j,
        f,
        g,
        e = 0,
        d = document.createElement("ul");
      if (
        !h.togglers ||
        (!h.togglers.toggle && !h.togglers.open && !h.togglers.close)
      ) {
        h.togglers.toggle = true;
      }
      f = a.array.keys(h.togglers);
      for (g = f.length; e < g; e++) {
        if (h.togglers[f[e]] === true) {
          j = this._createToggler(f[e], h);
          c = document.createElement("li");
          c.appendChild(j[0]);
          d.appendChild(c);
          this._togglers.push(j);
        }
      }
      d.className = "menu-horizontal";
      k.append(d);
      if (h.accentFirst === true) {
        b(d)
          .find("li:first-child > .button")
          .addClass("button-accent");
      }
    },
    _createToggler: function(d, e) {
      var c = b("<a>")
        .attr({
          href: "#",
          role: "button",
          class: "button",
          "aria-controls": this._getAriaControls(),
          "data-type": d,
          "data-title-close": e.text.titleClose,
          "data-title-open": e.text.titleOpen
        })
        .text(e.text[d]);
      c.on(
        "click",
        b.proxy(function(g) {
          var f = g.button;
          if (typeof f === "undefined" || f === a.leftMouseButton) {
            this.setOpen(
              d === "open" ? false : d === "close" ? true : this.isOpen()
            );
            this.toggle();
            g.preventDefault();
            g.target.focus();
          }
        }, this)
      );
      this._setTitle(c);
      return c;
    },
    _getAriaControls: function() {
      var c = "";
      if (this._aria_controls === null) {
        b("details").each(function(d) {
          if (this.id === "") {
            this.id = "details_" + d;
          }
          c += this.id + " ";
        });
        this._aria_controls = b.trim(c);
      }
      return this._aria_controls;
    },
    _setTitle: function(d) {
      var c = d.data("type");
      d[0].title =
        c === "close" || (c !== "open" && this.isOpen())
          ? d.data("title-close")
          : d.data("title-open");
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.feedback = {
    type: "plugin",
    depends: [],
    _exec: function(k) {
      var c = k.find("#feedback"),
        h = k.find("#web"),
        g = h.find("#access"),
        b = h.find("#mobile"),
        l = h.find("#computer"),
        n = k.find("#contact-coord"),
        o = n.find("#contact1"),
        i = o.attr("type"),
        j = typeof i !== "undefined" && i.toLowerCase() === "checkbox",
        m = n.find("#contact2"),
        f = n.find("#info"),
        e = document.referrer,
        d = a.url(window.location.href).params;
      c.attr("aria-controls", "web").on("keyup click load", function(r) {
        var q = r.type === "load",
          p = r.button;
        if (typeof p === "undefined" || p === a.leftMouseButton) {
          if (!q && this.value === "web") {
            this.setAttribute("aria-hidden", "false");
            h.show("slow");
          } else {
            this.setAttribute("aria-hidden", "true");
            if (q) {
              h.css("display", "none");
            } else {
              h.hide("slow");
            }
          }
        }
      });
      if (d.submit === undefined && d.feedback !== undefined) {
        c.find('option[value="' + d.feedback + '"]').attr(
          "selected",
          "selected"
        );
      }
      c.trigger("load");
      g.attr("aria-controls", "mobile computer")
        .on("keyup click load", function(r) {
          var q = r.type === "load",
            p = r.button;
          if (typeof p === "undefined" || p === a.leftMouseButton) {
            if (!q && this.value === "mobile") {
              b.attr("aria-hidden", "false").show("slow");
              l.attr("aria-hidden", "true").hide("slow");
            } else {
              l.attr("aria-hidden", "false");
              b.attr("aria-hidden", "true");
              if (q) {
                l.css("display", "block");
                b.css("display", "none");
              } else {
                l.show("slow");
                b.hide("slow");
              }
            }
          }
        })
        .trigger("load");
      o.on("keyup click load", function(r) {
        var q = r.type === "load",
          p = r.button;
        if (typeof p === "undefined" || p === a.leftMouseButton) {
          if (!q && (this.checked || (!j && this.value === "yes"))) {
            f.attr("aria-hidden", "false").show("slow");
          } else {
            if (
              q ||
              (!this.checked && !m.prop("checked")) ||
              (!j && this.value !== "yes" && m.val() !== "yes")
            ) {
              f.attr("aria-hidden", "true");
              if (q) {
                f.css("display", "none");
              } else {
                f.hide("slow");
              }
            }
          }
        }
      }).trigger("load");
      m.on("keyup click load", function(r) {
        var q = r.type === "load",
          p = r.button;
        if (typeof p === "undefined" || p === a.leftMouseButton) {
          if (!q && (this.checked || (!j && this.value === "yes"))) {
            f.attr("aria-hidden", "false").show("slow");
          } else {
            if (
              q ||
              (!this.checked && !o.prop("checked")) ||
              (!j && this.value !== "yes" && o.val() !== "yes")
            ) {
              f.attr("aria-hidden", "true");
              if (q) {
                f.css("display", "none");
              } else {
                f.hide("slow");
              }
            }
          }
        }
      }).trigger("load");
      h.find("#page").attr("value", e);
      k.find("input[type=reset]").on("click", function(q) {
        var p = q.button;
        if (typeof p === "undefined" || p === a.leftMouseButton) {
          c.trigger("load");
          g.trigger("load");
          o.trigger("load");
          m.trigger("load");
        }
      });
      return k;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.footnotes = {
    type: "plugin",
    _exec: function(e) {
      var c = a.main.not(".wet-boew-footnotes"),
        d = e.find("dd").attr("tabindex", "-1");
      d.each(function() {
        var g = b(this),
          f = this.id + "-dt";
        g.attr("aria-labelledby", f)
          .prev()
          .attr("id", f);
      });
      d.find("p.footnote-return a").each(function() {
        var g,
          f,
          h = b(this);
        h.find("span span").remove();
        h.off("click vclick").on("click vclick", function(j) {
          var i = j.button;
          if (typeof i === "undefined" || i === a.leftMouseButton) {
            (g = a.string.jqescape(b(this).attr("href")).substring(1)),
              (f = c.find(g).find("a"));
            if (a.mobile) {
              b.mobile.silentScroll(a.focus(f).offset().top);
            } else {
              a.focus(f);
            }
            return false;
          }
        });
      });
      c.find("sup a.footnote-link").on("click vclick", function(h) {
        var f = e.find(a.string.jqescape(b(this).attr("href")).substring(1)),
          g = h.button;
        if (typeof g === "undefined" || g === a.leftMouseButton) {
          f.find("p.footnote-return a")
            .attr("href", "#" + this.parentNode.id)
            .off("click vclick")
            .on("click vclick", function(l) {
              var j = l.button,
                k,
                i;
              if (typeof j === "undefined" || j === a.leftMouseButton) {
                k = a.string.jqescape(b(this).attr("href")).substring(1);
                i = c.find(k).find("a");
                if (a.mobile) {
                  b.mobile.silentScroll(a.focus(i).offset().top);
                } else {
                  a.focus(i);
                }
                return false;
              }
            });
          if (a.mobile) {
            b.mobile.silentScroll(a.focus(f).offset().top);
          } else {
            a.focus(f);
          }
          if (a.preIE8) {
            f.addClass("footnote-focus").one("blur", function() {
              b(this).removeClass("footnote-focus");
            });
          }
          return false;
        }
      });
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.formvalid = {
    type: "plugin",
    inited: false,
    depends: ["validate", "validateAdditional", "metadata"],
    languages: [
      "ar",
      "bg",
      "ca",
      "cs",
      "da",
      "de",
      "el",
      "es",
      "et",
      "eu",
      "fa",
      "fi",
      "fr",
      "he",
      "hr",
      "hu",
      "it",
      "ja",
      "ka",
      "kk",
      "ko",
      "lt",
      "lv",
      "my",
      "nl",
      "no",
      "pl",
      "pt",
      "pt_BR",
      "pt_PT",
      "ro",
      "ru",
      "si",
      "sk",
      "sl",
      "sr",
      "sv",
      "th",
      "tr",
      "uk",
      "vi",
      "zh",
      "zh_TW"
    ],
    methods: ["de", "nl", "pt"],
    _exec: function(h) {
      var d = h.find("form"),
        m = d.get(0),
        w = m.getElementsByTagName("label"),
        v = w.length,
        e = d.find("input, select, textarea"),
        f,
        k = e.filter("input"),
        s = k.filter("[pattern]"),
        p,
        q,
        j,
        o,
        c,
        n = false,
        l = d.find("[required]").attr("aria-required", "true"),
        y = "errors-" + (d.attr("id") === undefined ? "default" : d.attr("id")),
        g,
        r = a.language.replace("-", "_"),
        z = a.get_language(r, a.fn.formvalid.languages, "_"),
        x = a.get_language(r, a.fn.formvalid.methods, "_"),
        u = a.add.liblocation,
        t = a.suffix + ".js";
      h.append(
        '<div class="arialive wb-invisible" aria-live="polite" aria-relevant="all"></div>'
      );
      if (z !== null) {
        a.add._load(u + "i18n/formvalid/messages_" + z + t);
      }
      if (x !== null) {
        a.add._load(u + "i18n/formvalid/methods_" + x + t);
      }
      if (!a.fn.formvalid.inited) {
        a.fn.formvalid.inited = true;
        b.validator.addMethod(
          "postcodeCA",
          function(A, i) {
            return (
              this.optional(i) ||
              /^([a-zA-Z]\d[a-zA-z](?: )?\d[a-zA-Z]\d)$/.test(A)
            );
          },
          "The specified postal code is invalid"
        );
        if (z === "fr") {
          b.validator.messages.postcodeCA =
            "Veuillez fournir un code postal valide.";
        }
      }
      q = v;
      while (q--) {
        w[q].innerHTML += " ";
      }
      q = s.length;
      while (q--) {
        s.eq(q).removeAttr("pattern");
      }
      if (a.mobile) {
        m.setAttribute("data-ajax", "false");
        k.filter('[type="checkbox"]')
          .closest("fieldset")
          .attr("data-role", "controlgroup");
      }
      k.filter('[type="reset"]').on("click vclick touchstart", function(B) {
        var i,
          A = B.button,
          C = h.find(".arialive")[0];
        if (typeof A === "undefined" || A === a.leftMouseButton) {
          g.resetForm();
          i = d.find("#" + y);
          if (i.length > 0) {
            i.empty();
          }
          d.find('[aria-invalid="true"]').removeAttr("aria-invalid");
        }
        d.find('[aria-invalid="true"]').removeAttr("aria-invalid");
        if (C.innerHTML.length !== 0) {
          C.innerHTML = "";
        }
      });
      if (a.preIE9) {
        l.removeAttr("required").each(function() {
          this.setAttribute("data-rule-required", "true");
        });
        k.filter('[type="date"]').each(function() {
          var B = b(this),
            i = B.wrap("<div/>").parent(),
            A = b(i.html().replace("type=date", "type=text"));
          i.replaceWith(A);
        });
        e = d.find("input, select, textarea");
      }
      g = d.validate({
        meta: "validate",
        focusInvalid: false,
        errorElement: "strong",
        errorPlacement: function(A, B) {
          var D = B.attr("type"),
            i,
            C;
          A.data("element-id", B.attr("id"));
          if (typeof D !== "undefined") {
            D = D.toLowerCase();
            if (D === "radio" || D === "checkbox") {
              i = B.closest("fieldset");
              if (i.length !== 0) {
                C = i.find("legend").first();
                if (
                  C.length !== 0 &&
                  i.find('input[name="' + B.attr("name") + '"]') !== 1
                ) {
                  A.appendTo(C);
                  return;
                }
              }
            }
          }
          A.appendTo(d.find('label[for="' + B.attr("id") + '"]'));
          return;
        },
        showErrors: function(C) {
          this.defaultShowErrors();
          var I = d.find("strong.error").filter(":not(:hidden)"),
            A = d.find("input.error, select.error, textarea.error"),
            F = d.find("#" + y),
            E = '<span class="prefix">' + a.dic.get("%error") + "&#160;",
            i = a.dic.get("%colon") + " </span>",
            D = a.dic.get("%hyphen"),
            J = h.find(".arialive")[0],
            G,
            K,
            H,
            B;
          d.find('[aria-invalid="true"]').removeAttr("aria-invalid");
          if (I.length !== 0) {
            if (F.length === 0) {
              F = b(
                '<div id="' + y + '" class="errorContainer" tabindex="-1"/>'
              ).prependTo(d);
            } else {
              F.empty();
            }
            G =
              "<p>" +
              a.dic.get("%form-not-submitted") +
              I.length +
              (I.length !== 1
                ? a.dic.get("%errors-found")
                : a.dic.get("%error-found")) +
              "</p><ul>";
            A.attr("aria-invalid", "true");
            I.each(function(N) {
              var M = b(this),
                O = E + (N + 1) + i,
                P = M.closest("label").find(".field-name"),
                L;
              if (P.length === 0) {
                L = M.closest("fieldset");
                if (L.length !== 0) {
                  P = L.find("legend .field-name");
                }
              }
              M.find("span.prefix").detach();
              G +=
                '<li><a href="#' +
                M.data("element-id") +
                '">' +
                O +
                (P.length !== 0 ? P.html() + D : "") +
                this.innerHTML +
                "</a></li>";
              M.prepend(O);
            });
            G += "</ul>";
            F.append(G);
            if (n) {
              a.focus(F);
            } else {
              p = 0;
              for (K in C) {
                if (C.hasOwnProperty(K)) {
                  p += 1;
                  break;
                }
              }
              if (p !== 0) {
                q = I.length;
                for (p = 0; p !== q; p += 1) {
                  H = I[p].parentNode;
                  if (H.getAttribute("for") === K) {
                    B = H.innerHTML;
                    if (B !== J.innerHTML) {
                      J.innerHTML = B;
                    }
                    break;
                  }
                }
              } else {
                if (J.innerHTML.length !== 0) {
                  J.innerHTML = "";
                }
              }
            }
            d.find(".errorContainer a").on("click vclick", function(R) {
              var Q = this.href.substring(this.href.indexOf("#")),
                L = b(Q),
                M = L.prev(),
                P = M.length === 0 ? L.closest("fieldset").find("legend") : [],
                O =
                  M.length !== 0
                    ? M.offset().top
                    : P.length !== 0
                    ? P.offset().top
                    : -1,
                N = R.button;
              if (typeof N === "undefined" || N === a.leftMouseButton) {
                a.focus(L);
                if (O !== -1) {
                  b.mobile.silentScroll(O);
                }
                return false;
              }
            });
            n = false;
          } else {
            if (J.innerHTML.length !== 0) {
              J.innerHTML = "";
            }
            F.detach();
          }
        },
        invalidHandler: function() {
          n = true;
        }
      });
      o = e.filter('[class*="{validate"]');
      for (p = 0, q = o.length; p !== q; p += 1) {
        f = o.eq(p);
        c = f.attr("class");
        j = c.indexOf("{validate");
        f.rules(
          "add",
          a.data.toObject(
            c.substring(c.indexOf("{", j + 1), c.indexOf("}", j + 1) + 1)
          )
        );
      }
      return h;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(d) {
  var c = window.pe || { fn: {} },
    b = 2000,
    f = 0,
    e = [],
    a;
  c.fn.geomap = {
    type: "plugin",
    depends: ["openlayers", "proj4js"],
    polyfills: ["detailssummary"],
    debug: false,
    _exec: function(k) {
      var h,
        g,
        j,
        i = c.add.liblocation;
      h = {
        config: {
          controls: [],
          autoUpdateSize: true,
          fractionalZoom: true,
          theme: null
        },
        overlays: [],
        features: [],
        tables: [],
        useScaleLine: false,
        useMousePosition: false,
        debug: false,
        useLegend: false,
        useTab: false,
        useMapControls: true
      };
      j = {
        useScaleLine: k.hasClass("scaleline") ? true : undefined,
        useMousePosition: k.hasClass("position") ? true : undefined,
        debug: k.hasClass("debug"),
        useLegend: k.hasClass("legend"),
        useTab: k.hasClass("tab"),
        useMapControls: k.hasClass("static") ? false : true
      };
      d.extend(
        h,
        typeof wet_boew_geomap !== "undefined" ? wet_boew_geomap : {},
        j,
        c.data.getData(k, "wet-boew")
      );
      OpenLayers.Lang.setCode(c.language);
      OpenLayers.ImgPath = i + "images/geomap/";
      Proj4js.defs["EPSG:3978"] =
        "+proj=lcc +lat_1=49 +lat_2=77 +lat_0=49 +lon_0=-95 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";
      c.document.on("wb-init-loaded", function() {
        c.document.one("geomap-init", function() {
          if (h.debug) {
            c.fn.geomap_debug.init();
          }
          f += 1;
          g = c.fn.geomap.setGeomapObject(k);
          if (typeof h.layersFile !== "undefined") {
            d.ajax({
              url: h.layersFile,
              dataType: "script",
              async: false,
              success: function() {
                d.extend(h, wet_boew_geomap);
                c.fn.geomap.createMap(g, h);
                if (h.debug) {
                  c.document.trigger("geomap-overlayLoad");
                }
              },
              error: function() {
                if (h.debug) {
                  c.document.trigger("geomap-overlayNotLoad");
                }
              }
            });
          } else {
            c.fn.geomap.createMap(g, h);
            if (h.debug) {
              c.document.trigger("geomap-overlayNotSpecify");
            }
          }
          if (!g.overlays) {
            c.fn.geomap.refreshPlugins(g);
          }
        });
        if (h.debug) {
          c.fn.geomap.debug = true;
          c.add._load(
            i + "dependencies/geomap-debug" + c.suffix + ".js",
            "geomap-init"
          );
        } else {
          c.document.trigger("geomap-init");
        }
      });
      return k;
    },
    setGeomapObject: function(i) {
      var g = {
          uniqueid: f,
          mapid: i.attr("id"),
          map: null,
          selectControl: null,
          showAttribNRCan: false,
          queryLayers: [],
          overlays: 0,
          overlaysLoaded: 0,
          overlaysLoading: {}
        },
        h = i.find(".wet-boew-geomap-map");
      if (h.length !== 0) {
        g.gmap = h.attr("id", "geomap-map-" + f).height(h.width() * 0.8);
        g.glegend = i
          .find(".wet-boew-geomap-legend")
          .attr("id", "geomap-legend-" + f);
        g.glayers = i
          .find(".wet-boew-geomap-layers")
          .attr("id", "geomap-layers-" + f);
      } else {
        g.gmap = i
          .attr("id", "geomap-map-" + f)
          .height(i.width() * 0.8)
          .addClass("wet-boew-geomap-map");
        g.glegend = c.main
          .find(".wet-boew-geomap-legend")
          .attr("id", "geomap-legend-" + f);
        g.glayers = c.main
          .find(".wet-boew-geomap-layers")
          .attr("id", "geomap-layers-" + f);
      }
      return g;
    },
    addPanZoomBar: function(g) {
      var h = new OpenLayers.Control.PanZoomBar();
      OpenLayers.Util.extend(h, {
        draw: function() {
          var k = this,
            j = ["zoomworld", "zoomout", "zoomin"],
            l = ["zoom-world-mini", "zoom-minus-mini", "zoom-plus-mini"],
            i = j.length;
          OpenLayers.Control.prototype.draw.apply(k, arguments);
          k.buttons = [];
          while (i--) {
            k._addButton(j[i], l[i] + ".png");
          }
          return k.div;
        }
      });
      g.map.addControl(h);
      c.fn.geomap.setPanZoomBar(g);
    },
    setPanZoomBar: function(k) {
      var m = k.gmap.find(".olControlPanZoomBar")[0],
        i = m.getElementsByTagName("div"),
        g = i.length,
        n,
        h,
        j,
        l;
      m.setAttribute("role", "toolbar");
      while (g--) {
        n = i[g];
        h = n.getElementsByTagName("img")[0];
        if (typeof h !== "undefined") {
          l = n.action;
          j = c.dic.get("%geo-" + l);
          n.setAttribute("aria-label", j);
          n.setAttribute("title", j);
          n.setAttribute("role", "button");
          n.className += " olControl" + l;
          n.tabIndex = 0;
          h.setAttribute("alt", j);
          h.className += " olControl" + l;
        }
      }
    },
    onFeatureSelect: function(g) {
      d("#" + g.id.replace(/\W/g, "_")).addClass("background-highlight");
      d("#cb_" + g.id.replace(/\W/g, "_")).prop("checked", true);
    },
    onFeatureUnselect: function(g) {
      d("#" + g.id.replace(/\W/g, "_")).removeClass("background-highlight");
      d("#cb_" + g.id.replace(/\W/g, "_")).prop("checked", false);
      if (g.popup !== null && g.popup.visible()) {
        g.popup.hide();
      }
    },
    onFeatureClick: function(g) {
      var h = g.layer.map.getControlsByClass(
        "OpenLayers.Control.SelectFeature"
      )[0];
      if (typeof g._lastHighlighter !== "undefined") {
        h.unselect(g);
      } else {
        h.select(g);
        if (g.layer.popups !== undefined) {
          if (a !== undefined && a.popup !== null && a.popup.visible()) {
            a.popup.hide();
          }
          a = g;
          if (g.popup === null) {
            c.fn.geomap.createPopup(g);
          } else {
            g.popup.toggle();
          }
        }
      }
    },
    createPopup: function(t) {
      var l = t.layer.popupsInfo,
        i,
        r,
        j,
        s,
        n,
        h,
        g,
        o,
        p,
        k = t.id.replace(/\W/g, "_"),
        q = c.dic.get("%close"),
        m = t.layer.map.size;
      if (l) {
        i = (typeof l.id !== "undefined" ? l.id : "popup_") + "_" + k;
        r = typeof l.height !== "undefined" ? l.height : m.size.h / 2;
        j = typeof l.width !== "undefined" ? l.width : m.size.w / 2;
        s = typeof l.width !== "undefined" ? l.close : true;
        n =
          "<h3>" +
          d("#" + t.layer.name).attr("aria-label") +
          "</h3>" +
          l.content;
        for (h in t.attributes) {
          if (t.attributes.hasOwnProperty(h) && h.length !== 0) {
            p = new RegExp("_" + h, "igm");
            n = n.replace(p, t.attributes[h]);
          }
        }
      } else {
        i = "popup_" + k;
        r = m.h / 2;
        j = m.w / 2;
        s = true;
        n = "<h3>" + d("#" + t.layer.name).attr("aria-label") + "</h3>";
        for (h in t.attributes) {
          if (t.attributes.hasOwnProperty(h) && h.length !== 0) {
            n +=
              "<p><strong>" +
              h +
              c.dic.get("%colon") +
              "</strong><br />" +
              t.attributes[h] +
              "</p>";
          }
        }
      }
      g = new OpenLayers.Popup.FramedCloud(
        i,
        t.geometry.getBounds().getCenterLonLat(),
        new OpenLayers.Size(j, r),
        n,
        null,
        s,
        null
      );
      g.maxSize = new OpenLayers.Size(j, r);
      t.popup = g;
      t.layer.map.addPopup(g);
      o = document.createElement("span");
      o.setAttribute("class", "wb-icon-x-alt2 close_" + k);
      o.setAttribute("aria-label", q);
      o.setAttribute("title", q);
      o.setAttribute("role", "button");
      o.setAttribute("tabindex", "0");
      t.popup.closeDiv.appendChild(o);
      d(".close_" + k).on("keypress click", function(v) {
        var u = v.button;
        if (v.type === "keypress") {
          if (v.keyCode === 13) {
            t.popup.hide();
          }
        } else {
          if (typeof u === "undefined" || u === c.leftMouseButton) {
            t.layer.map
              .getControlsByClass("OpenLayers.Control.SelectFeature")[0]
              .unselect(a);
          }
        }
      });
    },
    getMap: function(i) {
      var h,
        g = e.length;
      if (typeof i !== "undefined") {
        while (g--) {
          if (e[g].id === i) {
            h = e[g];
          }
        }
      } else {
        h = e[0];
      }
      return h;
    },
    createLegend: function() {
      if (c.fn.geomap.debug && !d(".wet-boew-geomap-legend").length) {
        c.document.trigger("geomap-warningLegend");
      }
    },
    createLayerHolder: function(h, i) {
      if (i) {
        var g = h.glayers.find(".wet-boew-geomap-tabs");
        if (g.length !== 0) {
          g.attr({
            class: "wet-boew-tabbedinterface auto-height-none",
            id: "geomap-tabs-" + f
          }).append('<ul class="tabs"></ul><div class="tabs-panel"></div>');
        } else {
          h.glayers
            .attr("id", "geomap-tabs-" + f)
            .append(
              '<div class="clear"></div><div class="wet-boew-geomap-tabs wet-boew-tabbedinterface auto-height-none" style="width: ' +
                h.glayers.width() +
                'px;"><ul class="tabs"></ul><div class="tabs-panel"></div></div><div class="clear"></div>'
            );
        }
      }
    },
    createTable: function(i, j, h, g) {
      return d(
        '<table class="table-simplify' +
          (g ? " wet-boew-tables" : "") +
          ' width-100" aria-label="' +
          j +
          '" id="overlay_' +
          i +
          '"><caption>' +
          h +
          "</caption><thead></thead><tbody></tbody>" +
          (g ? '<tfoot></tfoot></table><div class="clear"></div>' : "</table>")
      );
    },
    randomColor: function() {
      var j = "0123456789ABCDEF".split(""),
        g = "#",
        h;
      for (h = 0; h !== 6; h += 1) {
        g += j[Math.round(Math.random() * 15)];
      }
      return g;
    },
    addLayerData: function(p, i, k, l, g) {
      if (p.glegend.length !== 0) {
        c.fn.geomap.addToLegend(p, i, k, l);
      }
      var q = p.glayers,
        o = d(i).attr("id"),
        n = d('<div id="tabs_' + o + '">'),
        m = i[0].attributes["aria-label"].value,
        h = d('<h3 class="background-light">' + m + "</h3>"),
        j = d(
          '<div id="msg_' +
            o +
            '" class="module-attention module-simplify margin-top-medium margin-bottom-medium"><p>' +
            c.dic.get("%geo-hiddenlayer") +
            "</p></div>"
        );
      if (c.fn.geomap.debug && q.length === 0) {
        c.document.trigger("geomap-layersNotSpecify");
      }
      if (g && d(".wet-boew-geomap-tabs").length !== 0) {
        c.fn.geomap.addToTabs(p, i, k, l);
      } else {
        n.append(h, i);
        q.append(n, '<div class="clear"></div>');
        if (!k) {
          n.append(j);
          i.fadeOut();
        }
      }
      if (c.fn.geomap.debug && g && d(".wet-boew-geomap-tabs").length === 0) {
        c.document.trigger("geomap-warningTab");
      }
    },
    addToLegend: function(q, j, m, n) {
      var h = d(j),
        p = h.attr("id"),
        l,
        i,
        g,
        k,
        o;
      if (typeof q.glegend !== "undefined") {
        l = q.glegend.find("fieldset");
        if (l.length === 0) {
          l = d(
            '<fieldset name="legend" data-role="controlgroup"><legend class="wb-invisible">' +
              c.dic.get("%geo-togglelayer") +
              "</legend></fieldset>"
          ).appendTo(q.glegend);
        }
        g = m ? 'checked="checked"' : "";
        i = q.glegend.find("ul");
        if (i.length === 0) {
          i = d('<ul class="list-bullet-none margin-left-none"></ul>').appendTo(
            l
          );
        }
        k = d(
          '<input type="checkbox" id="cb_' +
            p +
            '" value="' +
            p +
            '"' +
            g +
            " />"
        ).appendTo('<div class="geomap-legend-chk"></div>');
        k.on("change", function() {
          var t = q.map.getLayer(n),
            r = q.glegend.find("#cb_" + p).prop("checked") ? true : false,
            s = q.glayers.find("#" + p),
            v = s.parent(),
            u;
          t.setVisibility(r);
          if (!v.hasClass("dataTables_wrapper")) {
            v = s;
          }
          u = d("#msg_" + p);
          if (u.length !== 0) {
            u.fadeToggle();
          } else {
            v.after(
              '<div id="msg_' +
                p +
                '"><p>' +
                c.dic.get("%geo-hiddenlayer") +
                "</p></div>"
            );
          }
          if (r) {
            v.css("display", "table");
          } else {
            v.css("display", "none");
          }
        });
        o = d("<label>", {
          for: "cb_" + p,
          html: h.attr("aria-label"),
          class: "form-checkbox"
        }).append(k, '<div id="sb_' + p + '"></div>');
        i.append(d("<li>").append(o));
      }
    },
    symbolizeLegend: function(q) {
      var o = q.map.layers.length,
        n,
        p,
        j,
        m,
        h,
        k,
        i,
        g,
        r,
        l = c.dic.get("%colon");
      while (o--) {
        m = q.map.layers[o];
        if (!m.isBaseLayer) {
          p = d("#sb_" + m.name);
          j = "";
          if (p.length) {
            h = m.styleMap.styles["default"];
            k = h.defaultStyle;
            n = h.rules.length;
            if (n) {
              j += '<ul class="list-bullet-none margin-left-none">';
              while (n--) {
                i = h.rules[n].filter;
                g = i.type;
                r = h.rules[n].symbolizer;
                if (g === "==") {
                  g = l;
                }
                j += '<li class="margin-bottom-medium">' + i.property + " ";
                if (i.value !== null) {
                  j +=
                    g +
                    " " +
                    i.value +
                    c.fn.geomap.getLegendSymbol(r) +
                    "</li>";
                } else {
                  j +=
                    i.lowerBoundary +
                    " " +
                    g +
                    " " +
                    i.upperBoundary +
                    "</label>" +
                    c.fn.geomap.getLegendSymbol(r) +
                    "</li>";
                }
              }
              j += "</ul>";
            } else {
              if (typeof k.fillColor !== "undefined") {
                j += c.fn.geomap.getLegendSymbol(k);
              } else {
                if (typeof k.externalGraphic !== "undefined") {
                  j += c.fn.geomap.getLegendGraphic(k);
                }
              }
            }
            p.append(j);
          }
        }
      }
    },
    getLegendSymbol: function(i) {
      var h = "",
        k = i.fillColor,
        j = i.strokeColor,
        g = i.fillOpacity;
      if (typeof k !== "undefined") {
        h += "background-color: " + k + ";";
      }
      if (typeof j !== "undefined") {
        h += "border-style: solid; border-width: 2px; border-color: " + j + ";";
      }
      if (typeof g !== "undefined") {
        h += "opacity: " + g + ";";
      }
      return (
        '<div class="geomap-legend-symbol"' +
        (h !== "" ? ' style="' + h + '"/>' : "/>")
      );
    },
    getLegendGraphic: function(k, m) {
      var j = "",
        g = typeof m !== "undefined" ? m : "",
        h = k.graphicOpacity,
        l = k.pointRadius,
        i = k.graphicHeight,
        n = k.graphicWidth;
      if (typeof h !== "undefined") {
        if (c.preIE8) {
          j += "filter:alpha(opacity=" + h * 10 + ");";
        } else {
          j += "opacity: " + h + ";";
        }
      }
      if (typeof l !== "undefined") {
        j += "height: " + l + "px; width: " + l + "px;";
      } else {
        if (typeof i !== "undefined" && typeof n !== "undefined") {
          j += "height: " + i + "px; width: " + n + "px;";
        }
      }
      return (
        '<img src="' +
        k.externalGraphic +
        '" alt="' +
        g +
        (j !== "" ? '" style="' + j + '" />' : '" />')
      );
    },
    addToTabs: function(o, h, i) {
      var k = o.glayers.find(".wet-boew-geomap-tabs"),
        j = k.find("ul.tabs"),
        l = k.find("div.tabs-panel"),
        g = d(h),
        n = g.attr("id"),
        m;
      j.append(
        '<li><a href="#tabs_' + n + '">' + g.attr("aria-label") + "</a></li>"
      );
      m = d('<div id="tabs_' + n + '">').append(h);
      l.append(m);
      if (!i) {
        m.append(
          '<div id="msg_' +
            n +
            '"><p>' +
            c.dic.get("%geo-hiddenlayer") +
            "</p></div>"
        );
        h.fadeOut();
      }
    },
    getStyleMap: function(n) {
      var o,
        j,
        q,
        r,
        p,
        l,
        m,
        g,
        t = c.fn.geomap.randomColor(),
        h = t,
        s = {
          strokeColor: t,
          fillColor: h,
          fillOpacity: 0.5,
          pointRadius: 5,
          strokeWidth: 0.5
        },
        k = {
          strokeColor: "#00f",
          fillColor: "#00f",
          fillOpacity: 0.4,
          strokeWidth: 2
        };
      if (typeof n.style !== "undefined") {
        if (n.style.type === "unique") {
          q = typeof n.style.select !== "undefined" ? n.style.select : k;
          o = new OpenLayers.StyleMap({ select: new OpenLayers.Style(q) });
          o.addUniqueValueRules("default", n.style.field, n.style.init);
        } else {
          if (n.style.type === "rule") {
            r = [];
            l;
            m;
            g = new OpenLayers.Style();
            for (l = 0, m = n.style.rule.length; l !== m; l += 1) {
              p = n.style.rule[l];
              if (p.filter === "LESS_THAN") {
                j = OpenLayers.Filter.Comparison.LESS_THAN;
              } else {
                if (p.filter === "LESS_THAN_OR_EQUAL_TO") {
                  j = OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO;
                } else {
                  if (p.filter === "GREATER_THAN_OR_EQUAL_TO") {
                    j = OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO;
                  } else {
                    if (p.filter === "GREATER_THAN") {
                      j = OpenLayers.Filter.Comparison.GREATER_THAN;
                    } else {
                      if (p.filter === "BETWEEN") {
                        j = OpenLayers.Filter.Comparison.BETWEEN;
                      } else {
                        if (p.filter === "EQUAL_TO") {
                          j = OpenLayers.Filter.Comparison.EQUAL_TO;
                        } else {
                          if (p.filter === "NOT_EQUAL_TO") {
                            j = OpenLayers.Filter.Comparison.NOT_EQUAL_TO;
                          } else {
                            if (p.filter === "LIKE") {
                              j = OpenLayers.Filter.Comparison.LIKE;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (p.filter !== "BETWEEN") {
                r.push(
                  new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Comparison({
                      type: j,
                      property: p.field,
                      value: p.value[0]
                    }),
                    symbolizer: p.init
                  })
                );
              } else {
                r.push(
                  new OpenLayers.Rule({
                    filter: new OpenLayers.Filter.Comparison({
                      type: j,
                      property: p.field,
                      lowerBoundary: p.value[0],
                      upperBoundary: p.value[1]
                    }),
                    symbolizer: p.init
                  })
                );
              }
            }
            g.addRules(r);
            q = typeof n.style.select !== "undefined" ? n.style.select : k;
            o = new OpenLayers.StyleMap({
              default: g,
              select: new OpenLayers.Style(q)
            });
          } else {
            q = typeof n.style.select !== "undefined" ? n.style.select : k;
            o = new OpenLayers.StyleMap({
              default: new OpenLayers.Style(n.style.init),
              select: new OpenLayers.Style(q)
            });
          }
        }
      } else {
        o = new OpenLayers.StyleMap({
          default: new OpenLayers.Style(s),
          select: new OpenLayers.Style(k)
        });
      }
      return o;
    },
    createRow: function(k, j, l) {
      var g = d("<tr>"),
        m = [],
        i,
        h = j.feature.attributes,
        n = j.feature.id.replace(/\W/g, "_");
      if (j.type !== "head") {
        g.attr("id", n);
        i = d(
          '<td><label class="wb-invisible" for="cb_' +
            n +
            '">' +
            c.dic.get("%geo-labelselect") +
            '</label><input type="checkbox" id="cb_' +
            n +
            '"/></td>'
        );
        m.push(i);
      }
      d.each(h, function(o, q) {
        var p;
        if (j.type === "head") {
          p = d("<th>" + o + "</th>");
        } else {
          p = d("<td>" + q + "</td>");
        }
        m.push(p);
      });
      if (l) {
        m.push(c.fn.geomap.addZoomTo(k, g, j.feature, l));
      }
      if (j.type !== "head") {
        i.on("change", function() {
          if (!d("#cb_" + n).prop("checked")) {
            k.selectControl.unselect(j.feature);
          } else {
            c.fn.geomap.onFeatureClick(j.feature);
          }
        });
      }
      g.append(m);
      return g;
    },
    onFeaturesAdded: function(q, o, n, p, h, k) {
      var j = c.fn.geomap.createRow(q, {
          type: "head",
          feature: n.features[0]
        }),
        l = c.fn.geomap.createRow(q, { type: "head", feature: n.features[0] }),
        m,
        i = "<th>" + c.dic.get("%geo-select") + "</th>",
        g = d("table#" + o.attr("id")),
        r = g.find("tbody");
      if (k && p) {
        m = "<th>" + c.dic.get("%geo-zoomfeature") + "</th>";
        j.append(m);
        l.append(m);
      }
      j.prepend(i);
      l.prepend(i);
      g.find("thead").append(j);
      g.find("tfoot").append(l);
      d.each(n.features, function(s, u) {
        var t = {
          type: "body",
          id: u.id.replace(/\W/g, "_"),
          feature: u,
          selectControl: q.selectControl
        };
        r.append(c.fn.geomap.createRow(q, t, p));
      });
      if (h) {
        g.addClass("createDatatable");
      }
    },
    onLoadEnd: function(g) {
      g.gmap.find(".olTileImage").attr("alt", "");
      g.overlaysLoaded += 1;
      if (g.overlays === g.overlaysLoaded) {
        c.fn.geomap.refreshPlugins(g);
        g.overlays = 0;
        g.overlaysLoaded = 0;
      }
    },
    onTabularFeaturesAdded: function(i, h, k, l) {
      var m = h.id.replace(/\W/g, "_"),
        j = i.glayers.find("tr#" + m),
        g;
      g = d(
        '<td><label class="wb-invisible" for="cb_' +
          m +
          '">' +
          c.dic.get("%geo-labelselect") +
          '</label><input type="checkbox" id="cb_' +
          m +
          '"/></td>'
      );
      j.prepend(g);
      if (l && k) {
        j.append(c.fn.geomap.addZoomTo(i, j, h, k));
      }
      g.on("change", function() {
        if (!d("#cb_" + m).prop("checked")) {
          i.selectControl.unselect(h);
        } else {
          c.fn.geomap.onFeatureClick(h);
        }
      });
    },
    addZoomTo: function(h, l, g, i) {
      var k =
          '<td><a href="javascript:;" class="button" title="' +
          c.dic.get("%geo-zoomfeature") +
          '">',
        j;
      if (typeof i.length !== "undefined" && i[1].type === "text") {
        j = d(k + c.dic.get("%geo-zoomfeature") + "</a></td>");
      } else {
        if (typeof i.length !== "undefined" && i[1].type === "image") {
          j = d(k + '<span class="wb-icon-target"></span></a></td>');
        } else {
          j = d(
            k +
              '<span class="wb-icon-target"></span>' +
              c.dic.get("%geo-zoomfeature") +
              "</a></td>"
          );
        }
      }
      j.on("click", "a", function(n) {
        var m = n.button;
        if (typeof m === "undefined" || m === c.leftMouseButton) {
          n.preventDefault();
          h.map.zoomToExtent(g.geometry.bounds);
          d.mobile.silentScroll(c.focus(h.gmap).offset().top);
        }
      });
      return j;
    },
    setDefaultBaseMap: function(h, j) {
      var g = h.gmap.width(),
        k,
        i = {
          matrixSet: "nativeTileMatrixSet",
          tileSize: new OpenLayers.Size(256, 256),
          format: "image/jpg",
          style: "default",
          requestEncoding: "REST",
          isBaseLayer: true,
          isSingleTile: false,
          tileOrigin: new OpenLayers.LonLat(-34655800, 39310000),
          zoomOffset: 0,
          resolutions: [
            38364.660062653464,
            22489.62831258996,
            13229.193125052918,
            7937.5158750317505,
            4630.2175937685215,
            2645.8386250105837,
            1587.5031750063501,
            926.0435187537042,
            529.1677250021168,
            317.50063500127004,
            185.20870375074085,
            111.12522225044451,
            66.1459656252646,
            38.36466006265346,
            22.48962831258996,
            13.229193125052918,
            7.9375158750317505,
            4.6302175937685215
          ]
        };
      if (j.debug) {
        c.document.trigger("geomap-basemapDefault");
      }
      if (g > 260 && g <= 500) {
        i.zoomOffset = 1;
      } else {
        if (g > 500 && g <= 725) {
          i.zoomOffset = 2;
        } else {
          if (g > 725 && g <= 1175) {
            i.zoomOffset = 3;
          } else {
            if (g > 1175 && g <= 2300) {
              i.zoomOffset = 4;
            } else {
              i.zoomOffset = 5;
            }
          }
        }
      }
      k = i.zoomOffset;
      while (k--) {
        i.resolutions.shift();
      }
      h.map.addLayer(
        new OpenLayers.Layer.WMTS({
          name: c.dic.get("%geo-basemaptitle"),
          url: c.dic.get("%geo-basemapurl"),
          layer: c.dic.get("%geo-basemaptitle"),
          matrixSet: "nativeTileMatrixSet",
          tileSize: i.tileSize,
          format: i.format,
          style: i.style,
          requestEncoding: i.requestEncoding,
          isBaseLayer: i.isBaseLayer,
          isSingleTile: i.isSingleTile,
          tileOrigin: i.tileOrigin,
          zoomOffset: i.zoomOffset,
          resolutions: i.resolutions,
          transitionEffect: "resize"
        })
      );
      h.map.addLayer(
        new OpenLayers.Layer.WMTS({
          name: c.dic.get("%geo-basemaptitle"),
          url: c.dic.get("%geo-basemapurltxt"),
          layer: c.dic.get("%geo-basemaptitle"),
          matrixSet: "nativeTileMatrixSet",
          tileSize: i.tileSize,
          format: i.format,
          style: i.style,
          requestEncoding: i.requestEncoding,
          isBaseLayer: false,
          isSingleTile: i.isSingleTile,
          tileOrigin: i.tileOrigin,
          zoomOffset: i.zoomOffset,
          resolutions: i.resolutions
        })
      );
    },
    setDefaultMapOptions: function() {
      var g = {
        maxExtent: new OpenLayers.Bounds(-2750000, -900000, 3600000, 4630000),
        restrictedExtent: new OpenLayers.Bounds(
          -2850000,
          -1000000,
          3700000,
          4730000
        ),
        maxResolution: "auto",
        projection: "EPSG:3978",
        units: "m",
        displayProjection: new OpenLayers.Projection("EPSG:4269"),
        aspectRatio: 0.8,
        fractionalZoom: false
      };
      return g;
    },
    addBasemapData: function(i, k) {
      var g = {},
        l,
        m = typeof k.basemap !== "undefined" && k.basemap.length !== 0,
        h;
      i.gmap.height(i.gmap.width() * g.aspectRatio);
      if (m) {
        h = k.basemap;
        if (h.mapOptions) {
          l = h.mapOptions;
          try {
            g.maxExtent = new OpenLayers.Bounds(l.maxExtent.split(","));
            g.maxResolution = l.maxResolution;
            g.projection = l.projection;
            g.restrictedExtent = new OpenLayers.Bounds(
              l.restrictedExtent.split(",")
            );
            g.units = l.units;
            g.displayProjection = new OpenLayers.Projection(
              l.displayProjection
            );
            g.numZoomLevels = l.numZoomLevels;
            g.aspectRatio = l.aspectRatio;
          } catch (j) {
            if (k.debug) {
              c.document.trigger("geomap-baseMapMapOptionsLoadError");
            }
          }
        }
      } else {
        g = c.fn.geomap.setDefaultMapOptions();
      }
      i.map = new OpenLayers.Map(i.gmap.attr("id"), d.extend(k.config, g));
      if (m) {
        if (!h.options) {
          h.options = {};
        }
        h.options.isBaseLayer = true;
        if (h.type === "wms") {
          i.map.addLayer(
            new OpenLayers.Layer.WMS(
              h.title,
              h.url,
              { layers: h.layers, version: h.version, format: h.format },
              h.options
            )
          );
        } else {
          if (h.type === "esri") {
            i.map.addLayer(new OpenLayers.Layer.ArcGIS93Rest(h.title, h.url));
          }
        }
      } else {
        c.fn.geomap.setDefaultBaseMap(i, k);
        i.showAttribNRCan = true;
      }
    },
    addOverlayData: function(g, i) {
      var h = i.overlays,
        j;
      if (h.length !== 0) {
        g.overlays = h.length;
        d.each(h, function(l, m) {
          var k = c.fn.geomap.createTable(l, m.title, m.caption, m.datatable);
          if (m.type === "kml") {
            j = new OpenLayers.Layer.Vector(m.title, {
              strategies: [new OpenLayers.Strategy.Fixed()],
              protocol: new OpenLayers.Protocol.HTTP({
                url: m.url,
                format: new OpenLayers.Format.KML({
                  extractStyles: !m.style,
                  extractAttributes: true,
                  internalProjection: g.map.getProjectionObject(),
                  externalProjection: new OpenLayers.Projection("EPSG:4269"),
                  read: function(q) {
                    var v,
                      x,
                      u,
                      s,
                      y,
                      r,
                      t,
                      p = 0,
                      o = [],
                      w = m.attributes,
                      n;
                    if (typeof q === "string") {
                      if (c.ie > 0) {
                        t = new ActiveXObject("Microsoft.XMLDOM");
                        t.async = false;
                        t.loadXML(q);
                        q = t;
                      } else {
                        q = new DOMParser().parseFromString(q, "text/xml");
                      }
                    }
                    v = this.getElementsByTagNameNS(q, "*", "Placemark");
                    for (s = v.length; p !== s; p += 1) {
                      x = v[p];
                      u = d(x);
                      y = new OpenLayers.Feature.Vector();
                      y.geometry = this.parseFeature(x).geometry;
                      r = {};
                      for (n in w) {
                        if (w.hasOwnProperty(n)) {
                          r[w[n]] = u.find(n).text();
                        }
                      }
                      y.attributes = r;
                      o.push(y);
                    }
                    return o;
                  }
                })
              }),
              eventListeners: {
                featuresadded: function(n) {
                  c.fn.geomap.onFeaturesAdded(
                    g,
                    k,
                    n,
                    m.zoom,
                    m.datatable,
                    i.useMapControls
                  );
                  if (g.overlaysLoading[m.title]) {
                    c.fn.geomap.onLoadEnd(g);
                  }
                },
                loadstart: function() {
                  g.overlaysLoading[m.title] = true;
                  setTimeout(function() {
                    if (g.overlaysLoading[m.title]) {
                      c.fn.geomap.onLoadEnd(g);
                    }
                  }, b);
                }
              },
              styleMap: c.fn.geomap.getStyleMap(h[l])
            });
            j.name = "overlay_" + l;
            j.datatable = m.datatable;
            j.popupsInfo = m.popupsInfo;
            j.popups = m.popups;
            j.visibility = true;
            g.queryLayers.push(j);
            g.map.addLayer(j);
            c.fn.geomap.addLayerData(g, k, m.visible, j.id, m.tab);
            j.visibility = m.visible;
          } else {
            if (m.type === "atom") {
              j = new OpenLayers.Layer.Vector(m.title, {
                projection: g.map.displayProjection,
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                  url: m.url,
                  format: new OpenLayers.Format.Atom({
                    read: function(p) {
                      var u = this.getElementsByTagNameNS(p, "*", "entry"),
                        w,
                        t,
                        q,
                        s,
                        x,
                        r,
                        o = [],
                        v = m.attributes,
                        n;
                      for (q = 0, s = u.length; q !== s; q += 1) {
                        w = u[q];
                        t = d(w);
                        x = new OpenLayers.Feature.Vector();
                        x.geometry = this.parseFeature(w).geometry;
                        r = {};
                        for (n in v) {
                          if (v.hasOwnProperty(n)) {
                            r[v[n]] = t.find(n).text();
                          }
                        }
                        x.attributes = r;
                        o.push(x);
                      }
                      return o;
                    }
                  })
                }),
                eventListeners: {
                  featuresadded: function(n) {
                    c.fn.geomap.onFeaturesAdded(
                      g,
                      k,
                      n,
                      m.zoom,
                      m.datatable,
                      i.useMapControls
                    );
                    if (g.overlaysLoading[m.title]) {
                      c.fn.geomap.onLoadEnd(g);
                    }
                  },
                  loadstart: function() {
                    g.overlaysLoading[m.title] = true;
                    setTimeout(function() {
                      if (g.overlaysLoading[m.title]) {
                        c.fn.geomap.onLoadEnd(g);
                      }
                    }, b);
                  }
                },
                styleMap: c.fn.geomap.getStyleMap(h[l])
              });
              j.name = "overlay_" + l;
              j.datatable = m.datatable;
              j.popupsInfo = m.popupsInfo;
              j.popups = m.popups;
              j.visibility = true;
              g.queryLayers.push(j);
              g.map.addLayer(j);
              c.fn.geomap.addLayerData(g, k, m.visible, j.id, m.tab);
              j.visibility = m.visible;
            } else {
              if (m.type === "georss") {
                j = new OpenLayers.Layer.Vector(m.title, {
                  projection: g.map.displayProjection,
                  strategies: [new OpenLayers.Strategy.Fixed()],
                  protocol: new OpenLayers.Protocol.HTTP({
                    url: m.url,
                    format: new OpenLayers.Format.GeoRSS({
                      read: function(p) {
                        var u = this.getElementsByTagNameNS(p, "*", "item"),
                          w,
                          t,
                          q,
                          s,
                          x,
                          r,
                          o = [],
                          v = m.attributes,
                          n;
                        for (q = 0, s = u.length; q !== s; q += 1) {
                          w = u[q];
                          t = d(w);
                          x = new OpenLayers.Feature.Vector();
                          x.geometry = this.createGeometryFromItem(w);
                          r = {};
                          for (n in v) {
                            if (v.hasOwnProperty(n)) {
                              r[v[n]] = t.find(n).text();
                            }
                          }
                          x.attributes = r;
                          if (x.geometry) {
                            o.push(x);
                          }
                        }
                        return o;
                      }
                    })
                  }),
                  eventListeners: {
                    featuresadded: function(n) {
                      c.fn.geomap.onFeaturesAdded(
                        g,
                        k,
                        n,
                        m.zoom,
                        m.datatable,
                        i.useMapControls
                      );
                      if (g.overlaysLoading[m.title]) {
                        c.fn.geomap.onLoadEnd(g);
                      }
                    },
                    loadstart: function() {
                      g.overlaysLoading[m.title] = true;
                      setTimeout(function() {
                        if (g.overlaysLoading[m.title]) {
                          c.fn.geomap.onLoadEnd(g);
                        }
                      }, b);
                    }
                  },
                  styleMap: c.fn.geomap.getStyleMap(h[l])
                });
                j.name = "overlay_" + l;
                j.datatable = m.datatable;
                j.popupsInfo = m.popupsInfo;
                j.popups = m.popups;
                j.visibility = true;
                g.queryLayers.push(j);
                g.map.addLayer(j);
                c.fn.geomap.addLayerData(g, k, m.visible, j.id, m.tab);
                j.visibility = m.visible;
              } else {
                if (m.type === "json") {
                  j = new OpenLayers.Layer.Vector(m.title, {
                    projection: g.map.displayProjection,
                    strategies: [new OpenLayers.Strategy.Fixed()],
                    protocol: new OpenLayers.Protocol.Script({
                      url: m.url,
                      params: m.params,
                      format: new OpenLayers.Format.GeoJSON({
                        read: function(p) {
                          var t = p[m.root] ? p[m.root] : p,
                            v,
                            q,
                            s,
                            w,
                            r,
                            o = [],
                            u = m.attributes,
                            n;
                          for (q = 0, s = t.length; q !== s; q += 1) {
                            v = t[q];
                            w = new OpenLayers.Feature.Vector();
                            w.geometry = this.parseGeometry(v.geometry);
                            r = {};
                            for (n in u) {
                              if (u.hasOwnProperty(n)) {
                                r[u[n]] = v[n];
                              }
                            }
                            w.attributes = r;
                            if (w.geometry) {
                              o.push(w);
                            }
                          }
                          return o;
                        }
                      })
                    }),
                    eventListeners: {
                      featuresadded: function(n) {
                        c.fn.geomap.onFeaturesAdded(
                          g,
                          k,
                          n,
                          m.zoom,
                          m.datatable,
                          i.useMapControls
                        );
                        if (g.overlaysLoading[m.title]) {
                          c.fn.geomap.onLoadEnd(g);
                        }
                      },
                      loadstart: function() {
                        g.overlaysLoading[m.title] = true;
                        setTimeout(function() {
                          if (g.overlaysLoading[m.title]) {
                            c.fn.geomap.onLoadEnd(g);
                          }
                        }, b);
                      }
                    },
                    styleMap: c.fn.geomap.getStyleMap(h[l])
                  });
                  j.name = "overlay_" + l;
                  j.datatable = m.datatable;
                  j.popupsInfo = m.popupsInfo;
                  j.popups = m.popups;
                  j.visibility = true;
                  g.queryLayers.push(j);
                  g.map.addLayer(j);
                  c.fn.geomap.addLayerData(g, k, m.visible, j.id, m.tab);
                  j.visibility = m.visible;
                } else {
                  if (m.type === "geojson") {
                    j = new OpenLayers.Layer.Vector(m.title, {
                      projection: g.map.displayProjection,
                      strategies: [new OpenLayers.Strategy.Fixed()],
                      protocol: new OpenLayers.Protocol.Script({
                        url: m.url,
                        params: m.params,
                        format: new OpenLayers.Format.GeoJSON({
                          read: function(p) {
                            var t = p.features,
                              q,
                              s,
                              v,
                              w,
                              r,
                              o = [],
                              u = m.attributes,
                              n;
                            for (q = 0, s = t.length; q !== s; q += 1) {
                              v = t[q];
                              w = new OpenLayers.Feature.Vector();
                              w.geometry = this.parseGeometry(v.geometry);
                              r = {};
                              for (n in u) {
                                if (u.hasOwnProperty(n)) {
                                  r[u[n]] = v.properties[n];
                                }
                              }
                              w.attributes = r;
                              if (w.geometry) {
                                o.push(w);
                              }
                            }
                            return o;
                          }
                        })
                      }),
                      eventListeners: {
                        featuresadded: function(n) {
                          c.fn.geomap.onFeaturesAdded(
                            g,
                            k,
                            n,
                            m.zoom,
                            m.datatable,
                            i.useMapControls
                          );
                          if (g.overlaysLoading[m.title]) {
                            c.fn.geomap.onLoadEnd(g);
                          }
                        },
                        loadstart: function() {
                          g.overlaysLoading[m.title] = true;
                          setTimeout(function() {
                            if (g.overlaysLoading[m.title]) {
                              c.fn.geomap.onLoadEnd(g);
                            }
                          }, b);
                        }
                      },
                      styleMap: c.fn.geomap.getStyleMap(h[l])
                    });
                    j.name = "overlay_" + l;
                    j.datatable = m.datatable;
                    j.popupsInfo = m.popupsInfo;
                    j.popups = m.popups;
                    j.visibility = true;
                    g.queryLayers.push(j);
                    g.map.addLayer(j);
                    c.fn.geomap.addLayerData(g, k, m.visible, j.id, m.tab);
                    j.visibility = m.visible;
                  }
                }
              }
            }
          }
        });
      }
    },
    addTabularData: function(u, x, h, r) {
      var v,
        E,
        z,
        B,
        k,
        j,
        F,
        q,
        s,
        y,
        D,
        i,
        l,
        t,
        p,
        C,
        o,
        H,
        g,
        A = "<th>" + c.dic.get("%geo-zoomfeature") + "</th>",
        n = "<th>" + c.dic.get("%geo-select") + "</th>",
        G,
        m = new OpenLayers.Format.WKT({
          internalProjection: r,
          externalProjection: h
        }),
        w = x.tables.length;
      while (w--) {
        v = d("#" + x.tables[w].id);
        E = x.tables[w];
        z = [];
        k = new OpenLayers.Layer.Vector(v.find("caption").text(), {
          styleMap: c.fn.geomap.getStyleMap(E)
        });
        j = v[0].getElementsByTagName("th");
        F = j.length;
        q = v[0].getElementsByTagName("tr");
        s = q.length;
        y = x.useMapControls;
        while (F--) {
          z[F] = j[F].innerHTML.replace(/<\/?[^>]+>/gi, "");
        }
        B = v.find("thead tr, tfoot tr");
        if (E.zoom && y) {
          B.append(A);
        }
        B.prepend(n);
        while (s--) {
          D = {};
          i = q[s];
          l = i.getAttribute("data-type");
          p = i.getElementsByTagName("td");
          C = p.length;
          while (C--) {
            o = p[C];
            H = o.getElementsByTagName("script")[0];
            if (typeof H !== "undefined") {
              H.parentNode.removeChild(H);
            }
            D[z[C]] = o.innerHTML;
          }
          if (l !== null) {
            if (l === "bbox") {
              g = i.getAttribute("data-geometry").split(",");
              G =
                "POLYGON((" +
                g[0] +
                " " +
                g[1] +
                ", " +
                g[0] +
                " " +
                g[3] +
                ", " +
                g[2] +
                " " +
                g[3] +
                ", " +
                g[2] +
                " " +
                g[1] +
                ", " +
                g[0] +
                " " +
                g[1] +
                "))";
            } else {
              if (l === "wkt") {
                G = i.getAttribute("data-geometry");
              }
            }
            t = m.read(G);
            i.setAttribute("id", t.id.replace(/\W/g, "_"));
            t.attributes = D;
            k.addFeatures([t]);
          }
        }
        k.id = "#" + E.id;
        k.datatable = E.datatable;
        k.popupsInfo = E.popupsInfo;
        k.popups = E.popups;
        k.name = E.id;
        u.map.addLayer(k);
        u.queryLayers.push(k);
        if (E.tab) {
          c.fn.geomap.addLayerData(u, v, true, k.id, E.tab);
        } else {
          if (u.glegend) {
            c.fn.geomap.addToLegend(u, v, true, k.id);
          }
        }
        if (E.datatable) {
          v.addClass("wet-boew-tables");
        }
      }
    },
    loadControls: function(h, j) {
      var i = h.gmap,
        k = h.map,
        g,
        l;
      h.selectControl = new OpenLayers.Control.SelectFeature(h.queryLayers, {
        onSelect: this.onFeatureSelect,
        onUnselect: this.onFeatureUnselect,
        clickFeature: this.onFeatureClick
      });
      d.each(j.tables, function(o, n) {
        var m = "#" + n.id;
        d.each(h.queryLayers, function(p, q) {
          if (q.id === m) {
            d.each(q.features, function(r, s) {
              c.fn.geomap.onTabularFeaturesAdded(
                h,
                s,
                j.tables[o].zoom,
                j.useMapControls
              );
            });
          }
        });
        if (n.datatable) {
          d(m).addClass("createDatatable");
        }
      });
      if (j.useMapControls) {
        k.addControl(h.selectControl);
        h.selectControl.activate();
        if (j.useMousePosition) {
          k.addControl(new OpenLayers.Control.MousePosition());
          k.getControlsByClass(
            "OpenLayers.Control.MousePosition"
          )[0].div.setAttribute("aria-label", c.dic.get("%geo-mouseposition"));
          k.getControlsByClass(
            "OpenLayers.Control.MousePosition"
          )[0].div.setAttribute("title", c.dic.get("%geo-mouseposition"));
        }
        if (j.useScaleLine) {
          k.addControl(new OpenLayers.Control.ScaleLine());
          k.getControlsByClass(
            "OpenLayers.Control.ScaleLine"
          )[0].div.setAttribute("aria-label", c.dic.get("%geo-scaleline"));
          k.getControlsByClass(
            "OpenLayers.Control.ScaleLine"
          )[0].div.setAttribute("title", c.dic.get("%geo-scaleline"));
        }
        k.addControl(
          new OpenLayers.Control.Navigation({ zoomWheelEnabled: true })
        );
        k.addControl(new OpenLayers.Control.KeyboardDefaults());
        k.getControlsByClass(
          "OpenLayers.Control.KeyboardDefaults"
        )[0].deactivate();
        i.attr("tabindex", "0").on(
          "mouseenter mouseleave focusin focusout",
          function(o) {
            var m = o.type,
              n = d(this);
            if (m === "mouseenter" || m === "focusin") {
              if (!n.hasClass("active")) {
                k.getControlsByClass(
                  "OpenLayers.Control.KeyboardDefaults"
                )[0].activate();
                k.getControlsByClass(
                  "OpenLayers.Control.Navigation"
                )[0].activate();
                n.addClass("active");
              }
            } else {
              if (m === "mouseleave" || m === "focusout") {
                if (n.hasClass("active")) {
                  k.getControlsByClass(
                    "OpenLayers.Control.Navigation"
                  )[0].deactivate();
                  k.getControlsByClass(
                    "OpenLayers.Control.KeyboardDefaults"
                  )[0].deactivate();
                  n.removeClass("active");
                }
              }
            }
          }
        );
        c.fn.geomap.addPanZoomBar(h);
        if (!c.mobile) {
          i.before(
            '<details id="geomap-details-' +
              h.uniqueid +
              '" class="wet-boew-geomap-detail" style="width:' +
              (i.width() - 10) +
              'px;"><summary>' +
              c.dic.get("%geo-accessibilizetitle") +
              "</summary><p>" +
              c.dic.get("%geo-accessibilize") +
              "</p></details>"
          );
          c.polyfills.enhance(
            "detailssummary",
            c.main.find("#geomap-details-" + h.uniqueid)
          );
        }
      }
      if (h.showAttribNRCan || j.attribution) {
        k.addControl(new OpenLayers.Control.Attribution());
        if (h.showAttribNRCan) {
          g = document.createElement("a");
          g.setAttribute("href", c.dic.get("%geo-attributionlink"));
          l = "\u00A9" + c.dic.get("%geo-attributiontitle");
        } else {
          if (j.attribution.href) {
            g = document.createElement("a");
            g.setAttribute("href", j.attribution.href);
            l = j.attribution.text;
          } else {
            g = document.createElement("p");
            l = j.attribution.text;
          }
        }
        g.appendChild(document.createTextNode(l));
        k.getControlsByClass(
          "OpenLayers.Control.Attribution"
        )[0].div.appendChild(g);
      }
      k.zoomToMaxExtent();
      window.onresize = function() {
        if (c.mobile) {
          i.removeClass("span-6").addClass("span-8");
        }
        i.height(i.width() * 0.8);
        k.updateSize();
        k.zoomToMaxExtent();
      };
    },
    createMap: function(g, j) {
      c.fn.geomap.addBasemapData(g, j);
      var i = new OpenLayers.Projection("EPSG:4326"),
        h = g.map.getProjectionObject();
      if (j.debug) {
        c.document.trigger("geomap-projection", h.getCode());
      }
      g.selectControl = new OpenLayers.Control.SelectFeature();
      if (j.useLegend) {
        c.fn.geomap.createLegend();
      }
      c.fn.geomap.createLayerHolder(g, j.useTab);
      c.fn.geomap.addTabularData(g, j, i, h);
      c.fn.geomap.addOverlayData(g, j);
      c.fn.geomap.loadControls(g, j);
      g.gmap.attr({ role: "dialog", "aria-label": c.dic.get("%geo-ariamap") });
    },
    refreshPlugins: function(g) {
      c.fn.geomap.symbolizeLegend(g);
      c.wb_load({
        plugins: {
          tabbedinterface: g.glayers.find(".wet-boew-geomap-tabs"),
          tables: g.glayers.find(".createDatatable")
        }
      });
      if (c.mobile) {
        g.glegend.trigger("create");
      }
      c.polyfills.enhance(
        "detailssummary",
        c.main.find(".geomap-legend" + g.uniqueid)
      );
      if (typeof g.mapid !== "undefined") {
        g.map.id = g.mapid;
      } else {
        g.map.id = "map_" + f;
      }
      e.push(g.map);
      if (e.length === c.main.find(".wet-boew-geomap").length) {
        setTimeout(function() {
          g.gmap.find("img").attr("alt", "");
          c.main.find(".olTileImage").attr("alt", "");
        }, 2000);
        g.map.events.on({
          moveend: function() {
            c.main.find(".olTileImage").attr("alt", "");
          }
        });
        c.document.trigger("geomap-ready");
      }
    }
  };
  window.pe = c;
  return c;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.langselect = {
    type: "plugin",
    _exec: function(b) {
      b.on("click", function(f) {
        var c = window.location.toString(),
          d = f.button;
        if (typeof d === "undefined" || d === a.leftMouseButton) {
          if (
            c.search(/_f\.htm/) !== -1 ||
            c.search(/-fra\./) !== -1 ||
            c.search(/-fra\./) !== -1
          ) {
            c = c
              .replace(/_f\./, "_e.")
              .replace(/-fra\./, "-eng.")
              .replace(/-fr\./, "-en.");
          } else {
            c = c
              .replace(/_e\./, "_f.")
              .replace(/-eng\./, "-fra.")
              .replace(/-en\./, "-fr.");
          }
          if (c.search(/lang=/) !== -1) {
            if (c.search(/lang=eng/) !== -1) {
              c = c.replace(/lang=eng/, "lang=fra");
            } else {
              if (c.search(/lang=fra/) !== -1) {
                c = c.replace(/lang=fra/, "lang=eng");
              } else {
                if (c.search(/lang=en/) !== -1) {
                  c = c.replace(/lang=en/, "lang=fr");
                } else {
                  c = c.replace(/lang=fr/, "lang=en");
                }
              }
            }
          }
          window.location = c;
          return false;
        }
      });
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.lightbox = {
    type: "plugin",
    depends: ["colorbox"],
    groupindex: 0,
    _exec: function(g) {
      var o,
        n,
        e,
        q,
        w,
        v,
        l,
        d,
        j,
        c,
        s,
        r,
        u,
        p = " " + a.dic.get("%lb-slideshow"),
        k,
        h,
        f,
        t,
        i,
        m = false;
      o = {
        transition: "elastic",
        loop: true,
        current: a.dic.get("%lb-current"),
        previous: a.dic.get("%previous-left"),
        next: a.dic.get("%next-right"),
        close: a.dic.get("%close-esc"),
        xhrError: a.dic.get("%lb-xhr-error"),
        imgError: a.dic.get("%lb-img-error"),
        maxWidth: "100%",
        maxHeight: "100%",
        slideshowStart: a.dic.get("%start") + p,
        slideshowStop: a.dic.get("%stop") + p,
        slideshow: false,
        slideshowAuto: false,
        onComplete: function() {
          var C = j.text(),
            z = d.text(),
            y,
            B,
            A,
            x;
          c = l.find("#cboxLoadedContent");
          B = c.children(".cboxPhoto");
          e.attr("aria-label", z + (C.length !== 0 ? " - " + C : ""));
          if (B.length === 0) {
            c.attr({
              tabindex: "0",
              role: "document",
              "aria-labelledby": "cboxTitle"
            });
          } else {
            B.attr({ alt: z, tabindex: "0" });
            y = b.colorbox.element().find("img");
            A = y.attr("aria-describedby");
            x = y.attr("longdesc");
            if (typeof A !== "undefined") {
              B.attr("aria-describedby", A);
            }
            if (typeof x !== "undefined") {
              B.attr("longdesc", x);
            }
          }
          a.focus(e);
          m = true;
        },
        onClosed: function() {
          m = false;
        }
      };
      n = {
        transition: g.hasClass("transition-fade")
          ? "fade"
          : g.hasClass("transition-none")
          ? "none"
          : undefined,
        loop: g.hasClass("loop-none") ? false : undefined,
        slideshow: g.hasClass("slideshow") ? true : undefined,
        slideshowAuto: g.hasClass("slideshow-auto") ? true : undefined,
        photo: g.hasClass("force-photo") ? true : false
      };
      b.extend(
        o,
        typeof wet_boew_lightbox !== "undefined" ? wet_boew_lightbox : {},
        n,
        a.data.getData(g, "wet-boew")
      );
      q = g.find(".lb-item, .lb-gallery, .lb-hidden-gallery").get();
      for (h = 0, t = q.length; h !== t; h += 1) {
        v = q[h];
        if (v.className.indexOf("lb-item") !== -1) {
          a.fn.lightbox._init_colorbox(v, o);
        } else {
          k = "group" + (a.fn.lightbox.groupindex += 1);
          w = b(v)
            .find(".lb-item-gal")
            .get();
          for (f = 0, i = w.length; f !== i; f += 1) {
            a.fn.lightbox._init_colorbox(w[f], o, k);
          }
        }
      }
      e = b("#colorbox").attr("tabindex", "0");
      l = b("#cboxContent");
      d = l.find("#cboxTitle");
      j = l.find("#cboxCurrent");
      s = l.find("#cboxNext");
      r = l.find("#cboxPrevious");
      u = l.find("#cboxClose");
      s.add(r)
        .add(u)
        .attr({
          tabindex: "0",
          role: "button",
          "aria-controls": "cboxLoadedContent"
        });
      e.on("keydown swipeleft swiperight", function(z) {
        var x = z.target.id,
          y = z.type;
        if (y === "keydown") {
          if (!(z.ctrlKey || z.altKey || z.metaKey)) {
            if (z.keyCode === 9) {
              if (z.shiftKey && x === "colorbox") {
                a.focus(u);
                z.preventDefault();
              } else {
                if (
                  (!z.shiftKey && x === "cboxClose") ||
                  (z.shiftKey && x === "cboxLoadedContent")
                ) {
                  a.focus(e);
                  z.preventDefault();
                }
              }
            } else {
              if (z.keyCode === 13 || z.keyCode === 32) {
                if (
                  x === "cboxLoadedContent" ||
                  x === "colorbox" ||
                  x === "cboxNext"
                ) {
                  b.colorbox.next();
                  z.preventDefault();
                } else {
                  if (x === "cboxPrevious") {
                    b.colorbox.prev();
                    z.preventDefault();
                  } else {
                    if (x === "cboxClose") {
                      b.colorbox.close();
                      z.preventDefault();
                    }
                  }
                }
              }
            }
          }
        } else {
          if (y === "swipeleft") {
            b.colorbox.next();
            z.preventDefault();
          } else {
            b.colorbox.prev();
            z.preventDefault();
          }
        }
      });
    },
    _init_colorbox: function(i, c, k) {
      var g = b(i),
        e = g.attr("href").substring(0, 1) === "#",
        j = k !== undefined,
        d = j ? k : false,
        l = document.getElementById(i.getAttribute("data-title")),
        f = a.data.getData(g, "wet-boew-lightbox"),
        h = { inline: e, rel: d };
      c = b.extend(
        c,
        e || j || l
          ? l && l.innerHTML.length > 0
            ? b.extend({ title: l.innerHTML }, h)
            : h
          : {},
        f !== null ? { data: f.postData } : {}
      );
      g.colorbox(c);
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.menubar = {
    type: "plugin",
    depends: a.mobile ? [] : ["hoverintent"],
    ignoreMenuBarClicks: false,
    _exec: function(j) {
      if (a.mobile) {
        return;
      }
      var d,
        i,
        k = j,
        f,
        e,
        h = k.parent(),
        m,
        c,
        g,
        l = a.dic.get("%sub-menu-help");
      g = function(p) {
        var o = b(p).closest("li"),
          n = o.find(".mb-sm");
        if (n.length !== 0) {
          c();
          n.attr({ "aria-expanded": "true", "aria-hidden": "false" })
            .toggleClass("mb-sm mb-sm-open")
            .find("a")
            .attr("tabindex", "0");
          if (a.rtl) {
            if (
              Math.floor(n.offset().left) - Math.floor(i.offset().left) <=
              0
            ) {
              n.css("left", "0");
            }
          } else {
            if (
              Math.floor(n.offset().left + n.width()) -
                Math.floor(i.offset().left + i.width()) >=
              -1
            ) {
              n.css("right", "0");
            }
          }
          o.addClass("mb-active");
        }
        return;
      };
      c = function(o) {
        var n =
          o === undefined ? d.find(".mb-sm-open") : b(o).find(".mb-sm-open");
        n.attr({ "aria-expanded": "false", "aria-hidden": "true" })
          .toggleClass("mb-sm mb-sm-open")
          .css("right", "");
        if (a.cssenabled) {
          n.find("a").attr("tabindex", "-1");
        }
        return n.closest("li").removeClass("mb-active");
      };
      m = function() {
        var n = d.children("li:last"),
          o = n.offset().top + n.outerHeight() - k.offset().top;
        return k.css("min-height", o);
      };
      i = k.children("div");
      d = i.children("ul");
      k.detach();
      k.find("> div > ul").attr("role", "menubar");
      a.resize(m);
      f = k.find("ul.mb-menu > li").find("a:eq(0)");
      e = f.length;
      f.each(function(v, A) {
        var p = b(A)
            .addClass("knav-" + v + "-0-0")
            .attr({
              role: "menuitem",
              "aria-posinset": v + 1,
              "aria-setsize": e
            }),
          t = p.closest("li").find(".mb-sm"),
          n,
          o,
          z,
          w,
          y,
          B,
          s,
          r,
          u,
          q,
          x;
        if (t.length > 0) {
          p.attr("aria-haspopup", "true")
            .addClass("mb-has-sm")
            .attr("href", "#")
            .wrapInner(
              '<span class="expandicon"><span class="sublink"></span></span>'
            );
          t.attr({
            role: "menu",
            "aria-expanded": "false",
            "aria-hidden": "true"
          })
            .find(":has(:header) ul")
            .attr("role", "menu");
          p.append('<span class="wb-invisible"> ' + l + "</span>");
          p.closest("li").hoverIntent({
            over: function() {
              return g(this);
            },
            out: function() {
              return c(this);
            },
            timeout: 500
          });
          n = t.find("h3, h4, div.top-level, li.top-level, div.mb-main-link");
          for (s = 0, u = n.length; s !== u; s += 1) {
            o = n.eq(s);
            z = o[0].nodeName.toLowerCase();
            w = o.children("a");
            x = s + 1;
            if (w.length !== 0) {
              w.addClass("knav-" + v + "-" + x + "-0");
            } else {
              o.addClass("no-link");
              w = o;
            }
            w.attr({ role: "menuitem", "aria-posinset": x, "aria-setsize": u });
            if (z === "h3" || z === "h4") {
              o.children("a").attr("aria-haspopup", "true");
              B = o
                .next("ul")
                .find("a")
                .get();
              for (r = 0, q = B.length; r !== q; r += 1) {
                y = B[r];
                x = r + 1;
                y.className += " knav-" + v + "-" + (s + 1) + "-" + (r + 1);
                y.setAttribute("role", "menuitem");
                y.setAttribute("aria-posinset", x);
                y.setAttribute("aria-setsize", q);
              }
            }
          }
          B = t
            .find("> ul li, > div > ul li")
            .filter(":not(.top-level)")
            .children("a")
            .get();
          for (s = 0, u = B.length; s !== u; s += 1) {
            y = B[s];
            x = s + 1;
            y.className += " knav-" + v + "-0-" + (s + 1);
            y.setAttribute("role", "menuitem");
            y.setAttribute("aria-posinset", x);
            y.setAttribute("aria-setsize", u);
          }
        }
      });
      if (a.cssenabled) {
        k.find(".mb-sm a").attr("tabindex", "-1");
      }
      k.appendTo(h);
      m();
      k.on("click vclick touchstart focusin", function(o) {
        var n = o.button;
        if (typeof n === "undefined" || n === a.leftMouseButton) {
          if (o.stopPropagation) {
            o.stopPropagation();
          } else {
            o.cancelBubble = true;
          }
        }
      })
        .parent()
        .on(
          "click vclick touchstart mouseenter mouseleave",
          "> :header a",
          function(p) {
            var o = p.type,
              n = p.button;
            switch (o) {
              case "mouseenter":
                a.fn.menubar.ignoreMenuBarClicks = true;
                break;
              case "mouseleave":
                a.fn.menubar.ignoreMenuBarClicks = false;
                break;
              default:
                if (
                  b(this)
                    .closest("li")
                    .hasClass("mb-active")
                ) {
                  if (
                    o !== "click" ||
                    ((typeof n === "undefined" || n === a.leftMouseButton) &&
                      !a.fn.menubar.ignoreMenuBarClicks)
                  ) {
                    c(this);
                  }
                } else {
                  g(this);
                }
                return false;
            }
          }
        );
      k.on(
        "keydown focusin section-next section-previous item-next item-previous close",
        "li",
        function(y) {
          var t,
            o,
            z = y.target,
            C = b(z),
            w = k.find(".mb-active"),
            B = b.map(
              /\bknav-(\d+)-(\d+)-(\d+)/.exec(C.attr("class")),
              function(E) {
                return parseInt(E, 10);
              }
            ),
            D = y.keyCode,
            A = y.type,
            v,
            x,
            q,
            s,
            r,
            n = (!!B[2] << 1) | !!B[3],
            p,
            u;
          switch (A) {
            case "keydown":
              if (!(y.ctrlKey || y.altKey || y.metaKey)) {
                switch (D) {
                  case 13:
                  case 32:
                    if (n === 0 && C.attr("aria-haspopup") === "true") {
                      C.trigger("item-next");
                    } else {
                      window.location = C.attr("href");
                    }
                    return false;
                  case 27:
                    C.trigger("close");
                    return false;
                  case 37:
                    C.trigger("section-previous");
                    return false;
                  case 38:
                    if (n === 0) {
                      C.trigger("item-next");
                    } else {
                      C.trigger("item-previous");
                    }
                    return false;
                  case 39:
                    C.trigger("section-next");
                    return false;
                  case 40:
                    C.trigger("item-next");
                    return false;
                  default:
                    if (
                      (D > 47 && D < 91) ||
                      (D > 95 && D < 112) ||
                      (D > 185 && D < 223)
                    ) {
                      v = String.fromCharCode(D).toLowerCase();
                      x = B[2] !== 0 || B[3] !== 0;
                      q = C.text();
                      s = w.find(".mb-sm-open a").filter(function() {
                        var E = b(this);
                        return (
                          E.text()
                            .substring(0, 1)
                            .toLowerCase() === v ||
                          (x && E.text() === q)
                        );
                      });
                      if (s.length !== 0) {
                        if (x) {
                          r = s.length;
                          for (p = 0, u = r; p !== u; p += 1) {
                            if (s.eq(p).text() === q) {
                              r = p;
                              break;
                            }
                          }
                          if (r < s.length - 1) {
                            a.focus(s.eq(r + 1));
                            return false;
                          }
                        }
                        a.focus(s.eq(0));
                      }
                      return false;
                    }
                    break;
                }
              }
              break;
            case "close":
              if (n === 0) {
                a.focus(a.main.find("#wb-cont").attr("tabindex", "-1"));
              } else {
                a.focus(w.find(".knav-" + B[1] + "-0-0"));
              }
              setTimeout(function() {
                return c();
              }, 5);
              break;
            case "section-previous":
              switch (n) {
                case 0:
                case 1:
                  o = k.find(".knav-" + (B[1] - 1) + "-0-0");
                  if (o.length > 0) {
                    a.focus(o);
                  } else {
                    a.focus(k.find("ul.mb-menu > li:last").find("a:eq(0)"));
                  }
                  break;
                case 2:
                case 3:
                  o = w
                    .find(
                      ".knav-" +
                        B[1] +
                        "-" +
                        (B[2] - 1) +
                        "-0, .knav-" +
                        B[1] +
                        "-" +
                        (B[2] - 1) +
                        "-1"
                    )
                    .first();
                  if (o.length > 0 && B[2] > 1) {
                    a.focus(o);
                  } else {
                    o = k.find(".knav-" + (B[1] - 1) + "-0-0");
                    if (o.length > 0) {
                      a.focus(o);
                    } else {
                      a.focus(k.find("ul.mb-menu > li:last").find("a:eq(0)"));
                    }
                  }
                  break;
              }
              break;
            case "section-next":
              switch (n) {
                case 0:
                case 1:
                  t = k.find(".knav-" + (B[1] + 1) + "-0-0");
                  if (t.length > 0) {
                    a.focus(t);
                  } else {
                    a.focus(k.find(".knav-0-0-0"));
                  }
                  break;
                case 2:
                case 3:
                  t = w
                    .find(
                      ".knav-" +
                        B[1] +
                        "-" +
                        (B[2] + 1) +
                        "-0, .knav-" +
                        B[1] +
                        "-" +
                        (B[2] + 1) +
                        "-1"
                    )
                    .first();
                  if (t.length > 0) {
                    a.focus(t);
                  } else {
                    t = k.find(".knav-" + (B[1] + 1) + "-0-0");
                    if (t.length > 0) {
                      a.focus(t);
                    } else {
                      a.focus(k.find(".knav-0-0-0"));
                    }
                  }
                  break;
              }
              break;
            case "item-next":
              if (n === 0) {
                g(z);
              }
              t = w.find(".knav-" + B[1] + "-" + B[2] + "-" + (B[3] + 1));
              if (t.length === 0) {
                t = w
                  .find(
                    ".knav-" +
                      B[1] +
                      "-" +
                      (B[2] + 1) +
                      "-0, .knav-" +
                      B[1] +
                      "-" +
                      (B[2] + 1) +
                      "-1"
                  )
                  .first();
              }
              if (t.length !== 0) {
                a.focus(t);
              } else {
                a.focus(
                  w
                    .find(
                      ".knav-" +
                        B[1] +
                        "-0-1, .knav-" +
                        B[1] +
                        "-1-0, .knav-" +
                        B[1] +
                        "-1-1"
                    )
                    .first()
                );
              }
              break;
            case "item-previous":
              o =
                n === 3 || (n === 1 && B[3] > 1)
                  ? w.find(".knav-" + B[1] + "-" + B[2] + "-" + (B[3] - 1))
                  : "";
              if (o.length === 0) {
                o =
                  B[2] !== 0
                    ? w
                        .find("a")
                        .filter(
                          '[class*="knav-' +
                            B[1] +
                            "-" +
                            (B[2] - 1) +
                            '-"]:not(.knav-' +
                            B[1] +
                            "-0-0)"
                        )
                        .last()
                    : "";
              }
              if (o.length !== 0) {
                a.focus(o);
              } else {
                a.focus(w.find('[class*="knav-"]').last());
              }
              break;
            case "focusin":
              if (n === 0) {
                c();
                if (C.find(".expandicon").length > 0) {
                  g(y.target);
                }
              }
              break;
          }
        }
      );
      a.document.on("touchstart focusin", function() {
        return c();
      });
      return k;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.multimedia = {
    type: "plugin",
    polyfills: ["progress"],
    icons: b(
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><g id="play"><path d="M 14.299775,10.18788 5.7002247,4.610169 5.7867772,15.389831 14.299775,10.18788 z" /></g><g id="pause" style="display:inline"><path d="M 5.3405667,4.610169 5.3405667,15.389831 8.9169966,15.389831 8.9169966,4.610169 5.3405667,4.610169 z M 11.083003,4.610169 11.083003,15.389831 14.659433,15.389831 14.659433,4.610169 11.083003,4.610169 z" /></g><g id="rewind" transform="matrix(-1,0,0,-1,20,20)"><path d="M 8.4182018,15.389831 16.924761,10.187472 8.3244655,4.610169 8.3478995,8.03154 3.0752388,4.610169 3.168975,15.389831 8.3947677,12.202801 8.4182018,15.389831 z" /></g><g id="ff"><path  d="M 16.929004,10.187879 8.3294498,4.610169 8.4160023,15.389831 16.929004,10.187879 z M 11.67055,10.187879 3.0709963,4.610169 3.157549,15.389831 11.67055,10.187879 z" /></g><g id="mute_off"><path d="M 12.476712,4.599486 9.3409347,7.735268 5.5431537,7.735268 5.5431537,12.22989 9.3235137,12.22989 12.476712,15.400514 12.476712,4.599486 z"/></g><g id="mute_on"><path  d="M 12.466782,4.5994858 9.3309993,7.7352682 5.5332183,7.7352682 5.5332183,12.22989 9.3135782,12.22989 12.466782,15.400514 12.466782,4.5994858 z" /><path d="M 10,1.75 C 5.454363,1.75 1.78125,5.4543629 1.78125,10 1.78125,14.545637 5.454363,18.25 10,18.25 14.545637,18.25 18.25,14.545637 18.25,10 18.25,5.4543629 14.545637,1.75 10,1.75 z M 10,3.25 C 11.602784,3.25 13.062493,3.7896774 14.21875,4.71875 L 4.71875,14.21875 C 3.8057703,13.065541 3.28125,11.593619 3.28125,10 3.28125,6.2650231 6.2650232,3.25 10,3.25 z M 15.25,5.8125 C 16.169282,6.9656383 16.75,8.4065929 16.75,10 16.75,13.734977 13.734977,16.75 10,16.75 8.4063811,16.75 6.9279359,16.200753 5.78125,15.28125 L 15.25,5.8125 z"/></g><g id="cc"><path d="M 9.2241211,6.4042969 9.2241211,8.4003906 C 8.8914318,8.1725317 8.5564712,8.0039121 8.2192383,7.8945312 7.88655,7.7851623 7.5401961,7.7304748 7.1801758,7.7304687 6.4965774,7.7304748 5.9633748,7.9309955 5.5805664,8.3320313 5.2023079,8.7285207 5.0131804,9.2845097 5.0131836,10 5.0131804,10.715498 5.2023079,11.273766 5.5805664,11.674805 5.9633748,12.071291 6.4965774,12.269533 7.1801758,12.269531 7.5629826,12.269533 7.9252869,12.212567 8.2670898,12.098633 8.6134373,11.984702 8.9324474,11.816083 9.2241211,11.592773 L 9.2241211,13.595703 C 8.8413016,13.736979 8.4516536,13.841797 8.0551758,13.910156 7.6632429,13.983073 7.2690376,14.019531 6.8725586,14.019531 5.4916956,14.019531 4.4116185,13.666341 3.6323242,12.959961 2.8530264,12.249025 2.4633783,11.262372 2.4633789,10 2.4633783,8.7376353 2.8530264,7.7532613 3.6323242,7.046875 4.4116185,6.335945 5.4916956,5.9804766 6.8725586,5.9804687 7.2735948,5.9804766 7.6678002,6.0169349 8.0551758,6.0898437 8.4470963,6.1582108 8.8367443,6.2630284 9.2241211,6.4042969" /><path d="M 17.536621,6.4042969 17.536621,8.4003906 C 17.203932,8.1725317 16.868971,8.0039121 16.531738,7.8945312 16.19905,7.7851623 15.852696,7.7304748 15.492676,7.7304687 14.809077,7.7304748 14.275875,7.9309955 13.893066,8.3320313 13.514808,8.7285207 13.32568,9.2845097 13.325684,10 13.32568,10.715498 13.514808,11.273766 13.893066,11.674805 14.275875,12.071291 14.809077,12.269533 15.492676,12.269531 15.875483,12.269533 16.237787,12.212567 16.57959,12.098633 16.925937,11.984702 17.244947,11.816083 17.536621,11.592773 L 17.536621,13.595703 C 17.153802,13.736979 16.764154,13.841797 16.367676,13.910156 15.975743,13.983073 15.581538,14.019531 15.185059,14.019531 13.804196,14.019531 12.724119,13.666341 11.944824,12.959961 11.165526,12.249025 10.775878,11.262372 10.775879,10 10.775878,8.7376353 11.165526,7.7532613 11.944824,7.046875 12.724119,6.335945 13.804196,5.9804766 15.185059,5.9804687 15.586095,5.9804766 15.9803,6.0169349 16.367676,6.0898437 16.759596,6.1582108 17.149244,6.2630284 17.536621,6.4042969" /></g><g id="overlay"><rect rx="3" ry="3" width="20" height="20" style="fill:#000;opacity:0.4"/><polygon points="5,5 15,10, 5,15" fill="#FFF" style="fill:#FFF;" /></g><g id="loading"><rect rx="3" ry="3" width="20" height="20" style="fill:#000;opacity:0.4"/><g id="spinner" style="stroke-linecap:round;stroke:#FFF;stroke-width:1.5px" transform="translate(9.8,9.8)"><line x1="0" y1="5" x2="0" y2="7" transform="rotate(0,0,0)" opacity="0.09"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(30,0,0)" opacity="0.17"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(60,0,0)" opacity="0.25"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(90,0,0)" opacity="0.33"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(120,0,0)" opacity="0.42"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(150,0,0)" opacity="0.50"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(180,0,0)" opacity="0.58"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(210,0,0)" opacity="0.66"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(240,0,0)" opacity="0.75"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(270,0,0)" opacity="0.83"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(300,0,0)" opacity="0.91"/><line x1="0" y1="5" x2="0" y2="7" transform="rotate(330,0,0)" opacity="1"/></g></g></svg>'
    ),
    seed: 0,
    get_image: function(i, h, c, e) {
      var d, f;
      c = c !== undefined ? c : 20;
      e = e !== undefined ? e : 20;
      if (a.svg) {
        d = a.fn.multimedia.icons.clone();
        d.attr({ height: c, width: e });
        d.prepend("<title>" + h + "</title>");
        d.children(':not(g[id="' + i + '"])').remove();
        f = d.children("g");
        f.removeAttr("id");
        if (c !== 20 || e !== 20) {
          f.attr("transform", "scale(" + e / 20 + "," + c / 20 + ")");
        }
        return d.attr({ role: "img", "aria-label": h });
      }
      return b(
        '<img src="' +
          a.add.liblocation +
          "images/multimedia/" +
          i +
          '.png" alt="' +
          h +
          '" height="' +
          c +
          '" width="' +
          e +
          '" />'
      );
    },
    _exec: function(h) {
      var p,
        v = false,
        u = h.get(0),
        g = h.children("audio, video").eq(0),
        w = g.is("video") ? "video" : "audio",
        c,
        q = w === "video" ? g.attr("width") : "0",
        n = w === "video" ? g.attr("height") : "0",
        d,
        o = true,
        i,
        l,
        t = "video/mp4",
        f = "audio/mp3",
        k = a.add.liblocation + "binary/multimedia.swf?seed=" + Math.random(),
        r,
        j,
        m;
      if (h.attr("id") !== undefined) {
        p = h.attr("id");
      } else {
        p = "wet-boew-mediaplayer" + a.fn.multimedia.seed++;
        h.attr("id", p);
      }
      if (g.attr("id") !== undefined) {
        c = g.attr("id");
      } else {
        c = p + "-media";
        g.attr("id", c);
      }
      if (g.children('track[kind="captions"]')) {
        d = g.children('track[kind="captions"]').attr("src");
      }
      if (
        g.get(0).error === null &&
        g.get(0).currentSrc !== "" &&
        g.get(0).currentSrc !== undefined
      ) {
        v = true;
      } else {
        r = "id=" + h.attr("id");
        if (w === "video") {
          l =
            '<img src="' +
            g.attr("poster") +
            '" width="' +
            q +
            '" height="' +
            n +
            '" alt="' +
            g.attr("title") +
            '"/>';
          if (o && g.find("source").filter('[type="' + t + '"]').length > 0) {
            r +=
              "&height=" +
              g.height() +
              "&width=" +
              g.width() +
              "&posterimg=" +
              encodeURI(a.url(g.attr("poster")).source) +
              "&media=" +
              encodeURI(
                a.url(
                  g
                    .find("source")
                    .filter('[type="' + t + '"]')
                    .attr("src")
                ).source
              );
            v = true;
          }
        } else {
          if (
            o &&
            w === "audio" &&
            g.find("source").filter('[type="' + f + '"]').length > 0
          ) {
            r +=
              "&media=" +
              a.url(
                g
                  .find("source")
                  .filter('[type="' + f + '"]')
                  .attr("src")
              ).source;
            v = true;
          } else {
            v = false;
          }
        }
        if (v) {
          i = b(
            '<object play="" pause="" id="' +
              c +
              '" width="' +
              q +
              '" height="' +
              n +
              '" class="' +
              w +
              '" type="application/x-shockwave-flash" data="' +
              k +
              '" tabindex="-1"><param name="movie" value="' +
              k +
              '"/><param name="flashvars" value="' +
              r +
              '"/><param name="allowScriptAccess" value="always"/><param name="bgcolor" value="#000000"/><param name="wmode" value="opaque"/>' +
              (typeof l === "string" ? l : "")
          );
          g.before(i);
          g.remove();
          g = i;
        } else {
          if (l !== undefined) {
            g.before(b(l));
            g.remove();
          }
        }
      }
      if (v) {
        j = g.is("object") ? g.children(":first-child") : g;
        b.extend(u, { object: g.get(0), evtmgr: j }, a.fn.multimedia._intf);
        if (w === "video") {
          g.before(
            b('<button class="wb-mm-overlay" type="button" data-role="none"/>')
              .append(
                a.fn.multimedia.get_image(
                  "overlay",
                  a.dic.get("%play"),
                  100,
                  100
                )
              )
              .attr("title", a.dic.get("%play"))
          );
        }
        g.after(a.fn.multimedia._get_ui(c, w === "video" ? true : false));
        if (a.html.hasClass("polyfill-progress")) {
          h.find("progress").progress();
        }
        a.window.on("resize", { media: g, ratio: n / q }, function(x) {
          var s = x.data.media.parent().width() * x.data.ratio;
          x.data.media.height(s);
          g.parent()
            .find(".wb-mm-overlay")
            .height(s);
        });
        setTimeout(function() {
          a.window.trigger("resize");
        }, 1);
        h.on("click", function(B) {
          var x = b(B.target),
            y = B.button,
            A,
            z;
          if (typeof y === "undefined" || y === a.leftMouseButton) {
            if (
              x.hasClass("playpause") ||
              B.target === this.object ||
              x.hasClass("wb-mm-overlay")
            ) {
              if (this.getPaused() === true) {
                this.play();
              } else {
                this.pause();
              }
            }
            if (x.hasClass("cc")) {
              this.setCaptionsVisible(!this.getCaptionsVisible());
            }
            if (x.hasClass("mute")) {
              this.setMuted(!this.getMuted());
            }
            if (
              x.is("progress") ||
              x.hasClass("wb-progress-inner") ||
              x.hasClass("wb-progress-outer")
            ) {
              A = (B.pageX - x.offset().left) / x.width();
              this.setCurrentTime(this.getDuration() * A);
            }
            if (x.hasClass("rewind") || x.hasClass("fastforward")) {
              z = this.getDuration() * 0.05;
              if (x.hasClass("rewind")) {
                z *= -1;
              }
              this.setCurrentTime(this.getCurrentTime() + z);
            }
          }
        });
        h.on("keydown", function(y) {
          var x = b(this),
            s = 0;
          if ((y.which === 32 || y.which === 13) && y.target === this.object) {
            x.find(".wb-mm-controls .playpause").click();
            return false;
          }
          if (y.keyCode === 37) {
            x.find(".wb-mm-controls .rewind").click();
            return false;
          }
          if (y.keyCode === 39) {
            x.find(".wb-mm-controls .fastforward").click();
            return false;
          }
          if (y.keyCode === 38) {
            s = Math.round(this.getVolume() * 10) / 10 + 0.1;
            s = s < 1 ? s : 1;
            this.setVolume(s);
            return false;
          }
          if (y.keyCode === 40) {
            s = Math.round(this.getVolume() * 10) / 10 - 0.1;
            s = s > 0 ? s : 0;
            this.setVolume(s);
            return false;
          }
          return true;
        });
        j.on(
          "durationchange play pause ended volumechange timeupdate captionsloaded captionsloadfailed captionsvisiblechange waiting canplay progress",
          b.proxy(function(A) {
            var y = b(this),
              C,
              s,
              z,
              B,
              x;
            switch (A.type) {
              case "durationchange":
                C = this.getDuration();
                if (!isNaN(C) && C !== Infinity) {
                  y.find(".wb-mm-timeline-total span:not(.wb-invisible)").text(
                    a.fn.multimedia._format_time(C)
                  );
                  if (a.urlquery[this.id] !== undefined) {
                    m = a.fn.multimedia._parse_time(a.urlquery[this.id]);
                    this.setCurrentTime(m);
                  }
                }
                break;
              case "play":
                s = y.find(".playpause");
                s.empty().append(
                  a.fn.multimedia.get_image("pause", a.dic.get("%pause"))
                );
                s.attr("title", a.dic.get("%pause"));
                y.find(".wb-mm-overlay").hide();
                break;
              case "pause":
              case "ended":
                s = y.find(".playpause");
                s.empty().append(
                  a.fn.multimedia.get_image("play", a.dic.get("%play"))
                );
                s.attr("title", a.dic.get("%play"));
                B = y.find(".wb-mm-overlay");
                B.empty()
                  .append(
                    a.fn.multimedia.get_image(
                      "overlay",
                      a.dic.get("%play"),
                      100,
                      100
                    )
                  )
                  .attr("title", a.dic.get("%play"));
                B.show();
                clearTimeout(this.loading);
                this.loading = false;
                break;
              case "volumechange":
                s = y.find(".mute").empty();
                if (this.getMuted()) {
                  s.append(
                    a.fn.multimedia.get_image(
                      "mute_on",
                      a.dic.get("%mute", "disable")
                    )
                  );
                  s.attr("title", a.dic.get("%mute", "disable"));
                } else {
                  s.append(
                    a.fn.multimedia.get_image(
                      "mute_off",
                      a.dic.get("%mute", "enable")
                    )
                  );
                  s.attr("title", a.dic.get("%mute", "enable"));
                }
                break;
              case "timeupdate":
                z =
                  Math.round(
                    (this.getCurrentTime() / this.getDuration()) * 1000
                  ) / 10;
                x = y.find(".wb-mm-timeline progress");
                x.attr("value", z);
                y.find(".wb-mm-timeline-current span:not(.wb-invisible)").text(
                  a.fn.multimedia._format_time(this.getCurrentTime())
                );
                if (b.data(A.target, "captions") !== undefined) {
                  a.fn.multimedia._update_captions(
                    y.find(".wb-mm-captionsarea"),
                    this.getCurrentTime(),
                    b.data(A.target, "captions")
                  );
                }
                break;
              case "captionsloaded":
                b.data(A.target, "captions", A.captions);
                if (!isNaN(this.getDuration())) {
                  j.trigger("durationchange");
                }
                break;
              case "captionsloadfailed":
                y.find(".wb-mm-captionsarea").append(
                  "<p>" + a.dic.get("%closed-caption-error") + "</p>"
                );
                if (!isNaN(this.getDuration())) {
                  j.trigger("durationchange");
                }
                break;
              case "captionsvisiblechange":
                s = y.find(".cc").empty();
                if (this.getCaptionsVisible()) {
                  s.append(
                    a.fn.multimedia.get_image(
                      "cc",
                      a.dic.get("%closed-caption", "disable")
                    )
                  );
                  s.attr("title", a.dic.get("%closed-caption", "disable"));
                } else {
                  s.append(
                    a.fn.multimedia.get_image(
                      "cc",
                      a.dic.get("%closed-caption", "enable")
                    )
                  );
                  s.attr("title", a.dic.get("%closed-caption", "enable"));
                }
                break;
              case "waiting":
                if (this.getPaused() === false && !this.loading) {
                  this.loading = setTimeout(function() {
                    B = y.find(".wb-mm-overlay");
                    B.empty().append(
                      a.fn.multimedia._get_loading_ind(
                        this,
                        "loading",
                        a.dic.get("%loading"),
                        100,
                        100
                      )
                    );
                    B.show();
                  }, 500);
                }
                break;
              case "canplay":
                clearTimeout(this.loading);
                this.loading = false;
                if (this.getPaused() === false) {
                  B = y.find(".wb-mm-overlay");
                  B.empty()
                    .append(
                      a.fn.multimedia.get_image(
                        "overlay",
                        a.dic.get("%play"),
                        100,
                        100
                      )
                    )
                    .attr("title", a.dic.get("%play"));
                  B.hide();
                }
                break;
              case "progress":
                if (this.getWaiting() === true) {
                  if (this.getBuffering() === false) {
                    this.setBuffering(true);
                    j.trigger("waiting");
                  }
                } else {
                  if (this.getBuffering() === true) {
                    this.setBuffering(false);
                    j.trigger("canplay");
                  }
                }
                this.setPreviousTime(this.getCurrentTime());
                break;
            }
          }, u)
        );
        if (d !== undefined) {
          g.after(b('<div class="wb-mm-captionsarea"/>').hide());
          a.fn.multimedia._load_captions(j, d);
        }
      }
      return h;
    },
    _get_loading_ind: function(d, c, i, j, g) {
      var f = a.fn.multimedia.get_image(c, i, j, g).attr("title", i),
        e = 0,
        k,
        l;
      if (f.is("svg")) {
        k = f.find("#spinner");
        l = k.attr("transform");
        clearInterval(d.spin);
        d.spin = setInterval(function() {
          k.attr("transform", l + ",rotate(" + (e += 20) + " 0 0)");
        }, 50);
      }
      return f;
    },
    _get_ui: function(h, g) {
      var e = b('<div class="wb-mm-controls">'),
        d = b('<div class="wb-mm-controls-start">'),
        f = b(
          '<div class="wb-mm-timeline" tabindex="0"><p class="wb-mm-timeline-current"><span class="wb-invisible">' +
            a.dic.get("%position") +
            '</span><span>00:00:00</span></p><p class="wb-mm-timeline-total"><span class="wb-invisible">' +
            a.dic.get("%duration") +
            '</span><span>--:--:--</span></p><p class="wb-mm-timeline-inner"><span class="wb-invisible">' +
            a.dic.get("%percentage") +
            '</span><progress value="0" max="100" aria-live="off" /></p>'
        ),
        c = b('<div class="wb-mm-controls-end">');
      d.append(
        b("<button>")
          .attr({
            type: "button",
            class: "rewind",
            "aria-controls": h,
            title: a.dic.get("%rewind"),
            "data-role": "none"
          })
          .append(a.fn.multimedia.get_image("rewind", a.dic.get("%rewind")))
      );
      d.append(
        b("<button>")
          .attr({
            type: "button",
            class: "playpause",
            "aria-controls": h,
            title: a.dic.get("%play"),
            "data-role": "none"
          })
          .append(a.fn.multimedia.get_image("play", a.dic.get("%play")))
      );
      d.append(
        b("<button>")
          .attr({
            type: "button",
            class: "fastforward",
            "aria-controls": h,
            title: a.dic.get("%fast-forward"),
            "data-role": "none"
          })
          .append(a.fn.multimedia.get_image("ff", a.dic.get("%fast-forward")))
      );
      if (g === true) {
        c.append(
          b("<button>")
            .attr({
              type: "button",
              class: "cc",
              "aria-controls": h,
              title: a.dic.get("%closed-caption", "enable"),
              "data-role": "none"
            })
            .append(
              a.fn.multimedia.get_image(
                "cc",
                a.dic.get("%closed-caption", "enable")
              )
            )
        );
      } else {
        e.addClass("wb-mm-no-cc");
      }
      c.append(
        b("<button>")
          .attr({
            type: "button",
            class: "mute",
            "aria-controls": h,
            title: a.dic.get("%mute", "enable"),
            "data-role": "none"
          })
          .append(
            a.fn.multimedia.get_image("mute_off", a.dic.get("%mute", "enable"))
          )
      );
      e.append(d)
        .append(c)
        .append(f);
      return e;
    },
    _intf: {
      play: function() {
        try {
          this.object.play();
        } catch (c) {
          this.object.doPlay();
        }
      },
      pause: function() {
        try {
          this.object.pause();
        } catch (c) {
          this.object.doPause();
        }
      },
      getPaused: function() {
        return typeof this.object.paused !== "function"
          ? this.object.paused
          : this.object.paused();
      },
      getPlayed: function() {
        return typeof this.object.played !== "function"
          ? this.object.played
          : this.object.played();
      },
      getEnded: function() {
        return typeof this.object.ended !== "function"
          ? this.object.ended
          : this.object.ended();
      },
      getSeeking: function() {
        return typeof this.object.seeking !== "function"
          ? this.object.seeking
          : this.object.seeking();
      },
      getDuration: function() {
        return typeof this.object.duration !== "function"
          ? this.object.duration
          : this.object.duration();
      },
      getBuffered: function() {
        return typeof this.object.buffered !== "function"
          ? this.object.buffered.length > 0
            ? this.object.buffered.end(0)
            : 0
          : this.object.buffered();
      },
      getCurrentTime: function() {
        return typeof this.object.currentTime !== "function"
          ? this.object.currentTime
          : this.object.currentTime();
      },
      setCurrentTime: function(c) {
        if (typeof this.object.currentTime !== "function") {
          this.object.currentTime = c;
        } else {
          this.object.setCurrentTime(c);
        }
      },
      getPreviousTime: function() {
        return typeof this.object.previousTime !== "undefined"
          ? this.object.previousTime
          : 0;
      },
      setPreviousTime: function(c) {
        this.object.previousTime = c;
      },
      getCaptionsVisible: function() {
        return b(this)
          .find(".wb-mm-captionsarea")
          .is(":visible");
      },
      setCaptionsVisible: function(c) {
        if (c) {
          b(this)
            .find(".wb-mm-captionsarea")
            .show();
        } else {
          b(this)
            .find(".wb-mm-captionsarea")
            .hide();
        }
        b(this.evtmgr).trigger("captionsvisiblechange");
      },
      getMuted: function() {
        return typeof this.object.muted !== "function"
          ? this.object.muted
          : this.object.muted();
      },
      setMuted: function(c) {
        if (typeof this.object.muted !== "function") {
          this.object.muted = c;
        } else {
          this.object.setMuted(c);
        }
      },
      getVolume: function() {
        return typeof this.object.volume !== "function"
          ? this.object.volume
          : this.object.volume();
      },
      setVolume: function(c) {
        if (typeof this.object.volume !== "function") {
          this.object.volume = c;
        } else {
          this.object.setVolume(c);
        }
      },
      getWaiting: function() {
        return (
          this.getPaused() === false &&
          this.getCurrentTime() === this.getPreviousTime()
        );
      },
      getBuffering: function() {
        return typeof this.object.buffering !== "undefined"
          ? this.object.buffering
          : false;
      },
      setBuffering: function(c) {
        this.object.buffering = c;
      }
    },
    _parse_time: function(e) {
      var g,
        h = 0,
        f,
        d,
        c;
      if (e !== undefined) {
        if (e.substring(e.length - 1) === "s") {
          return parseFloat(e.substring(0, e.length - 1));
        } else {
          g = e.split(":").reverse();
          for (f = 0, d = g.length; f < d; f += 1) {
            c = f === 0 ? parseFloat(g[f]) : parseInt(g[f], 10);
            h += c * Math.pow(60, f);
          }
          return h;
        }
      }
      return -1;
    },
    _format_time: function(g) {
      var e = "",
        d,
        h,
        f;
      g = Math.floor(g);
      for (d = 2; d >= 0; d -= 1) {
        f = Math.pow(60, d);
        h = Math.floor(g / f);
        if (e !== "") {
          e += ":";
        }
        e += a.string.pad(h, 2);
        g -= f * h;
      }
      return e;
    },
    _load_captions: function(g, d) {
      var e, f, i, l, h, j, k;
      e = function(n) {
        var m = ".wet-boew-tt",
          o = n.find(m),
          c = [];
        o.each(function() {
          var s = b(this),
            r = -1,
            p = -1,
            q;
          if (s.attr("data-begin") !== undefined) {
            r = a.fn.multimedia._parse_time(s.attr("data-begin"));
            p =
              s.attr("data-end") !== undefined
                ? a.fn.multimedia._parse_time(s.attr("data-end"))
                : a.fn.multimedia._parse_time(s.attr("data-dur")) + r;
          } else {
            if (s.attr("data") !== undefined) {
              q = s.attr("data");
              q = q.replace(/(begin|dur|end)/gi, '"$1"').replace(/'/g, '"');
              q = b.parseJSON(q);
              r = a.fn.multimedia._parse_time(q.begin);
              p =
                q.end !== undefined
                  ? a.fn.multimedia._parse_time(q.end)
                  : a.fn.multimedia._parse_time(q.dur) + r;
            }
          }
          s = s.clone();
          s.find(m).detach();
          c[c.length] = { text: s.html(), begin: r, end: p };
        });
        return c;
      };
      f = function(n) {
        var m = "[begin]",
          o = n.find(m),
          c = [];
        o.each(function() {
          var r = b(this),
            q = -1,
            p = -1;
          q = a.fn.multimedia._parse_time(r.attr("begin"));
          p =
            r.attr("end") !== undefined
              ? a.fn.multimedia._parse_time(r.attr("end"))
              : a.fn.multimedia._parse_time(r.attr("dur")) + q;
          r = r.clone();
          r.find(m).detach();
          c[c.length] = { text: r.html(), begin: q, end: p };
        });
        return c;
      };
      i = function(m) {
        var c = { type: "captionsloaded", captions: e(m) };
        g.trigger(c);
      };
      l = function(c) {
        b.ajax({
          url: c,
          context: g,
          dataType: "html",
          dataFilter: function(m) {
            return m.replace(/<img [^>]*>/gi, "");
          },
          success: function(n) {
            var m = { type: "captionsloaded" };
            if (n.indexOf("<html") > -1) {
              m.captions = e(b(n));
            } else {
              m.captions = f(b(n));
            }
            b(this).trigger(m);
          },
          error: function(m, o, n) {
            b(this).trigger({ type: "captionsloadfailed", error: n });
          }
        });
      };
      if (d !== undefined) {
        h = a.url(window.location.href);
        j = a.url(d);
        if (j.removehash() === h.source) {
          k = b("#" + j.hash);
          if (k.length > 0) {
            i(k);
            return;
          }
          g.trigger({
            type: "captionsloadfailed",
            error: new Error('Object with id "' + j.anchor + '" not found')
          });
          return;
        } else {
          l(j.source);
          return;
        }
      }
      g.trigger({
        type: "captionsloadfailed",
        error: new Error("Caption source is missing")
      });
    },
    _update_captions: function(f, h, e) {
      var i, g, d;
      f.empty();
      for (i = 0, g = e.length; i < g; i += 1) {
        d = e[i];
        if (h >= d.begin && h <= d.end) {
          f.append(b("<div>" + d.text + "</div>"));
        }
      }
    }
  };
  a.triggermediaevent = function(d, c) {
    b("#" + d)
      .find("param:eq(0)")
      .trigger(c);
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.prettify = {
    type: "plugin",
    depends: ["prettify"],
    executed: false,
    _exec: function(h) {
      if (!a.fn.prettify.executed) {
        var c,
          l,
          e = b("body").find("pre"),
          f = h.attr("class").split(" "),
          g,
          m,
          k,
          j = a.add.liblocation + "dependencies/prettify/",
          d = a.suffix + ".js";
        for (g = 0, m = f.length; g < m; g += 1) {
          k = f[g];
          if (k.length < 12 && k.indexOf("lang-") === 0) {
            a.add._load([j + k + d]);
          }
        }
        c = { linenums: false, allpre: false };
        l = {
          linenums: h.hasClass("linenums") ? true : undefined,
          allpre: h.hasClass("all-pre") ? true : undefined
        };
        if (
          typeof wet_boew_prettify !== "undefined" &&
          wet_boew_prettify !== null
        ) {
          b.extend(c, wet_boew_prettify, l);
        } else {
          b.extend(c, l);
        }
        if (c.allpre) {
          e.addClass("prettyprint");
        }
        if (c.linenums) {
          e.filter(".prettyprint").addClass("linenums");
        }
        prettyPrint();
        a.fn.prettify.executed = true;
      }
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.responsiveimg = {
    type: "plugin",
    depends: ["picturefill", "matchMedia"],
    _initialized: false,
    _exec: function(c) {
      var b = window;
      if (this._initialized === false) {
        if (b.removeEventListener) {
          b.removeEventListener("resize", b.picturefill, false);
        }
        a.resize(function() {
          b.picturefill();
        });
        b.picturefill();
        this._initialized = true;
      }
      return c;
    }
  };
  window.pe = a;
  return a;
})();
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.sessiontimeout = {
    type: "plugin",
    _exec: function(i) {
      var p,
        e = '<div class="sOverlay jqmOverlay">&#160;</div>',
        n,
        f,
        t,
        h,
        k,
        q,
        s,
        m,
        o,
        l,
        j,
        d = a.dic.get("%st-already-timeout-msg"),
        c = a.dic.get("%st-timeout-msg"),
        r,
        g = 0;
      p = {
        ajaxLimiter: 200000,
        inactivity: 1200000,
        reactionTime: 180000,
        sessionalive: 1200000,
        logouturl: "./",
        refreshOnClick: true,
        refreshCallbackUrl: "./",
        regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
        powers: {
          ms: 1,
          cs: 10,
          ds: 100,
          s: 1000,
          das: 10000,
          hs: 100000,
          ks: 1000000
        }
      };
      b.extend(
        p,
        typeof wet_boew_sessiontimeout !== "undefined"
          ? wet_boew_sessiontimeout
          : {},
        a.data.getData(i, "wet-boew")
      );
      t = function() {
        if (p.refreshCallbackUrl.length > 2) {
          b.post(p.refreshCallbackUrl, function(u) {
            if (u && u.replace(/\s/g, "") === "true") {
              k();
            } else {
              alert(d);
              o();
            }
          });
        }
      };
      h = function() {
        clearTimeout(n);
        n = setTimeout(s, l(p.inactivity));
      };
      k = function() {
        clearTimeout(f);
        f = setTimeout(t, l(p.sessionalive));
      };
      q = function() {
        var v = document.activeElement,
          u;
        b(document.body).append(e);
        u = confirm(c.replace("#expireTime#", j()));
        v.focus();
        b(".jqmOverlay").detach();
        return u;
      };
      s = function() {
        var u = m();
        if (q() && m() - u <= p.reactionTime) {
          t();
          h();
          k();
        } else {
          o();
        }
      };
      m = function() {
        return new Date().getTime();
      };
      o = function() {
        window.location.href = p.logouturl;
      };
      l = function(w) {
        var u, v, x;
        if (typeof w === "undefined" || w === null) {
          return null;
        }
        u = p.regex.exec(b.trim(w.toString()));
        if (u[2]) {
          v = parseFloat(u[1]);
          x = p.powers[u[2]] || 1;
          return v * x;
        } else {
          return w;
        }
      };
      j = function() {
        var w = new Date(m() + p.reactionTime),
          v = w.getHours(),
          x = w.getMinutes(),
          y = w.getSeconds(),
          u = v < 12 ? " AM" : " PM";
        v = v % 12;
        if (v === 0) {
          v = 12;
        }
        v = v < 10 ? "0" + v : v;
        x = x < 10 ? "0" + x : x;
        y = y < 10 ? "0" + y : y;
        return v + ":" + x + ":" + y + u;
      };
      h();
      k();
      if (p.refreshOnClick) {
        a.document.on("click", function(u) {
          if (
            typeof u.button === "undefined" ||
            u.button === a.leftMouseButton
          ) {
            if (r >= 1 && m() - g > p.ajaxLimiter) {
              g = m();
              r = 0;
              t();
            } else {
              r = m();
            }
            h();
            k();
          }
        });
      }
      return i;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.share = {
    type: "plugin",
    ignoreFocusoutside: false,
    depends: ["bookmark"],
    _exec: function(j) {
      var o,
        n,
        r,
        t,
        d,
        e,
        g,
        h,
        q,
        m,
        l,
        i,
        k,
        u = a.language,
        f =
          u === "zh" ||
          u === "zh-Hans" ||
          u === "hi" ||
          u === "ja" ||
          u === "ko",
        s,
        p,
        c;
      o = {
        url: "",
        sourceTag: "",
        title: "",
        description: "",
        sites: [],
        compact: false,
        hint:
          (f
            ? a.dic.get("%share-hint") + a.dic.get("%share-text") + " "
            : a.dic.get("%share-text") + a.dic.get("%share-hint")) +
          a.dic.get("%new-window"),
        popup: true,
        popupTag: "h2",
        popupText: a.dic.get("%share-text"),
        includeDisclaimer: true,
        popupDisclaimer: a.dic.get("%share-disclaimer"),
        hideText: a.dic.get("%hide") + " - ",
        addFavorite: false,
        favoriteText: a.dic.get("%favourite"),
        addEmail: false,
        emailText: a.dic.get("%email"),
        emailSubject: a.dic.get("%share-email-subject"),
        emailBody: a.dic.get("%share-email-body"),
        manualBookmark: a.dic.get("%share-manual"),
        addShowAll: false,
        showAllText: a.dic.get("%share-showall"),
        showAllTitle: a.dic.get("%share-showall-title"),
        addAnalytics: false,
        analyticsName: "/share/{r}/{s}",
        addSites: {}
      };
      n = {
        compact: j.hasClass("compact") ? true : undefined,
        popup: j.hasClass("popup-none") ? false : undefined,
        addFavorite: j.hasClass("favourite") ? true : undefined,
        addEmail: j.hasClass("email") ? true : undefined,
        addShowAll: j.hasClass("showall") ? true : undefined,
        addAnalytics: j.hasClass("analytics") ? true : undefined
      };
      b.extend(
        o,
        typeof wet_boew_share !== "undefined" ? wet_boew_share : {},
        n,
        a.data.getData(j, "wet-boew")
      );
      s = o.addSites;
      if (s.length !== 0) {
        for (p in s) {
          if (s.hasOwnProperty(p)) {
            c = s[p];
            b.bookmark.addSite(p, c.display, c.icon, c.lang, c.category, c.url);
          }
        }
      }
      j.bookmark(o);
      if (o.popup && a.cssenabled) {
        if (o.popupTag.substring(0, 1) === "h") {
          j.wrapInner("<section />");
        }
        r = j.find(".bookmark_popup").detach();
        t = r[0];
        t.setAttribute("id", "bookmark_popup");
        t.setAttribute("aria-hidden", "true");
        r.prepend('<p class="popup_title">' + o.popupText + "</p>");
        e = t.getElementsByTagName("ul")[0];
        e.setAttribute("role", "menu");
        h = e.getElementsByTagName("a");
        g = b(h);
        m = h.length;
        l = m;
        while (l--) {
          q = h[l];
          q.setAttribute("role", "menuitem");
          q.setAttribute("rel", "external");
          q.setAttribute("aria-posinset", l + 1);
          q.setAttribute("aria-setsize", m);
          i = q.getElementsByTagName("span");
          if (i.length !== 0) {
            i = i[0];
            q.title = i.title;
            i.removeAttribute("title");
          }
        }
        if (o.addEmail) {
          k = r
            .find('a[href*="mailto:"]')
            .removeAttr("target")
            .removeAttr("rel");
          k.attr(
            "title",
            k.attr("title").replace(a.dic.get("%new-window"), "")
          );
        }
        if (o.addFavorite) {
          k = r
            .find('a[href*="#"]')
            .removeAttr("target")
            .removeAttr("rel")
            .attr("title", o.favoriteText + a.dic.get("%share-fav-title"));
        }
        if (o.includeDisclaimer) {
          r.append('<p class="popup_disclaimer">' + o.popupDisclaimer + "</p>");
        }
        j.append(r);
        d = j
          .find(".bookmark_popup_text")
          .off("click vclick touchstart keydown")
          .wrap("<" + o.popupTag + " />");
        d.attr({ role: "button", "aria-controls": "bookmark_popup" }).on(
          "click vclick touchstart keydown",
          function(x) {
            var w = x.keyCode,
              v = x.button;
            if (x.type === "keydown") {
              if (!(x.ctrlKey || x.altKey || x.metaKey)) {
                if (w === 13 || w === 32) {
                  x.preventDefault();
                  if (r.attr("aria-hidden") === "true") {
                    r.trigger("open");
                  } else {
                    r.trigger("close");
                  }
                } else {
                  if (w === 38 || w === 40) {
                    x.preventDefault();
                    r.trigger("open");
                  }
                }
              }
            } else {
              if (typeof v === "undefined" || v === a.leftMouseButton) {
                if (r.attr("aria-hidden") === "true") {
                  r.trigger("open");
                } else {
                  r.trigger("close");
                }
                return false;
              }
            }
          }
        );
        r.on(
          "keydown open close closenofocus focusin mouseenter mouseleave",
          function(C) {
            var E = C.type,
              F = C.keyCode,
              D,
              v,
              B,
              y,
              z,
              A,
              x,
              w;
            if (E === "keydown") {
              if (!(C.ctrlKey || C.altKey || C.metaKey)) {
                D = b(C.target);
                switch (F) {
                  case 27:
                    r.trigger("close");
                    return false;
                  case 37:
                    D = D.closest("li")
                      .prev()
                      .find("a");
                    if (D.length === 0) {
                      D = g;
                    }
                    a.focus(D.last());
                    return false;
                  case 38:
                    v = C.target.offsetLeft;
                    D = D.closest("li")
                      .prevAll()
                      .find("a")
                      .filter(function() {
                        return this.offsetLeft === v;
                      });
                    if (D.length > 0) {
                      a.focus(D.first());
                    } else {
                      D = g.filter(function() {
                        return this.offsetLeft < v;
                      });
                      if (D.length > 0) {
                        a.focus(D.last());
                      } else {
                        v = h[h.length - 1].offsetLeft;
                        D = g.filter(function() {
                          return this.offsetLeft > v;
                        });
                        if (D.length > 0) {
                          a.focus(D.last());
                        } else {
                          a.focus(g.last());
                        }
                      }
                    }
                    return false;
                  case 39:
                    D = D.closest("li")
                      .next()
                      .find("a");
                    if (D.length === 0) {
                      D = g;
                    }
                    a.focus(D.first());
                    return false;
                  case 40:
                    v = C.target.offsetLeft;
                    D = D.closest("li")
                      .nextAll()
                      .find("a")
                      .filter(function() {
                        return this.offsetLeft === v;
                      });
                    if (D.length !== 0) {
                      a.focus(D.first());
                    } else {
                      D = g.filter(function() {
                        return this.offsetLeft > v;
                      });
                      if (D.length !== 0) {
                        a.focus(D.first());
                      } else {
                        a.focus(g.first());
                      }
                    }
                    return false;
                  default:
                    if (
                      (F > 47 && F < 91) ||
                      (F > 95 && F < 112) ||
                      (F > 185 && F < 223)
                    ) {
                      B = String.fromCharCode(F).toLowerCase();
                      w = D.text();
                      y = g.filter(function() {
                        return (
                          b(this)
                            .text()
                            .substring(1, 2)
                            .toLowerCase() === B
                        );
                      });
                      if (y.length !== 0) {
                        if (
                          D.hasClass("bookmark_popup_text") ||
                          w.substring(1, 2).toLowerCase() !== B
                        ) {
                          a.focus(y.eq(0));
                        } else {
                          z = y.length;
                          for (x = 0, A = z; x !== A; x += 1) {
                            if (y.eq(x).text() === w) {
                              z = x;
                              break;
                            }
                          }
                          if (z < y.length - 1) {
                            a.focus(y.eq(z + 1));
                            return false;
                          }
                          a.focus(y.eq(0));
                        }
                      }
                      return false;
                    }
                }
              }
            } else {
              if (
                E === "click" ||
                E === "vclick" ||
                E === "touchstart" ||
                E === "focusin"
              ) {
                if (C.stopPropagation) {
                  C.stopImmediatePropagation();
                } else {
                  C.cancelBubble = true;
                }
              } else {
                if (C.type === "open") {
                  d.text(o.hideText + o.popupText);
                  r.attr("aria-hidden", "false").addClass("show");
                  a.focus(r.find("li a").first());
                } else {
                  if (C.type === "close" || C.type === "closenofocus") {
                    d.text(o.popupText);
                    r.attr("aria-hidden", "true").removeClass("show");
                    if (C.type === "close") {
                      a.focus(d.first());
                    }
                  } else {
                    if (E === "mouseenter") {
                      a.fn.share.ignoreFocusoutside = true;
                    } else {
                      if (E === "mouseleave") {
                        a.fn.share.ignoreFocusoutside = false;
                      }
                    }
                  }
                }
              }
            }
          }
        ).on("click vclick touchstart", "a", function(w) {
          var v = w.button;
          if (typeof v === "undefined" || v === a.leftMouseButton) {
            window.open(this.href, "_blank");
            r.trigger("close");
            return false;
          }
        });
        a.document.on("click vclick touchstart focusin", function(x) {
          var w = x.target.className,
            v = x.button;
          if (
            !a.fn.share.ignoreFocusoutside &&
            r.attr("aria-hidden") === "false" &&
            (w === null || w.indexOf("bookmark_popup_text") === -1)
          ) {
            if (x.type === "focusin") {
              r.trigger("closenofocus");
            } else {
              if (typeof v === "undefined" || v === a.leftMouseButton) {
                r.trigger("close");
              }
            }
          }
        });
      } else {
        j.addClass("popup-none");
      }
      return j;
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.slideout = {
    type: "plugin",
    opened: false,
    _exec: function(j) {
      var B = 10,
        A = a.dic.get("%table-contents"),
        m = a.dic.get("%hide"),
        x = a.dic.get("%interword-space"),
        z = m + '<span class="wb-invisible">' + x + A + "</span>",
        w = 2,
        y = false,
        u,
        c = true,
        t,
        v,
        e,
        h,
        o,
        n,
        k,
        f,
        q,
        p,
        i = a.preIE7,
        g = b("#wb-core-in"),
        s = false,
        d,
        r = a.rtl ? "left" : "right",
        l;
      s = j.hasClass("wb-slideout-open");
      p = { txtShow: a.dic.get("%show-toc") + " " + A, txtHide: m + " " + A };
      b.extend(
        p,
        typeof wet_boew_slideout !== "undefined" ? wet_boew_slideout : {},
        a.data.getData(j, "wet-boew")
      );
      if (!a.cssenabled()) {
        return;
      }
      n = j
        .wrap(
          '<div><div id="slideoutWrapper"><div id="slideoutInnerWrapper"></div></div></div>'
        )
        .parent();
      h = n.parent();
      o = h.parent();
      h.detach();
      j.attr({ role: "menu", id: "slideout-body" })
        .find("ul, li")
        .attr("role", "presentation");
      f = j.find("a").attr("role", "menuitem");
      u = function() {
        if (!y) {
          var C = g.offset().left;
          if (C <= B || (navigator.userAgent.match(/WebKit/i) && a.rtl)) {
            C = 0;
          }
          h.css("top", g.offset().top);
          h.css(r, C);
        }
      };
      t = function(G) {
        var C = h.offset(),
          D,
          E = G.button,
          F = { top: C.top - g.offset().top };
        F[r] = B - 10;
        if (typeof E === "undefined" || E === a.leftMouseButton) {
          v.off("click vclick touchstart", t);
          f.off("click vclick touchstart", t);
          e.off("click vclick touchstart", t);
          h.off("keydown", k);
          j.off("keydown", k);
          a.document.off("click vclick touchstart", q);
          if (!y) {
            if (a.ie <= 0 || document.documentMode !== undefined) {
              h.removeClass("slideoutWrapper")
                .addClass("slideoutWrapperRel")
                .css(F);
            }
            setTimeout(function() {
              j.show();
            }, 50);
            a.focus(f.eq(0));
          }
          y = !y;
          if (!a.preIE9) {
            D = d.outerWidth();
          } else {
            D = 0;
          }
          h.animate(
            { width: y ? j.outerWidth() + (D + w) : D + w + "px" },
            function() {
              if (!y) {
                j.hide();
                h.find("#slideoutInnerWrapper").css("width", d.height());
                if (a.ie <= 0 || document.documentMode !== undefined) {
                  h.addClass("slideoutWrapper");
                  h.removeClass("slideoutWrapperRel");
                  h.css("width", D + w + "px").css("top", g.offset().top);
                  u();
                }
              } else {
                if (i && document.documentMode === undefined) {
                  j.find("ul").html(j.find("ul").html());
                }
              }
              v.on("click vclick touchstart", t);
              f.on("click vclick touchstart", t);
              e.on("click vclick touchstart", t);
              h.on("keydown", k);
              j.on("keydown", k);
              a.document.on("click vclick touchstart", q);
            }
          );
          if (y) {
            v.text(p.txtHide);
            j.attr("aria-hidden", "false");
            h.find("#slideoutInnerWrapper").css("width", "");
          } else {
            v.text(p.txtShow);
            j.attr("aria-hidden", "true");
          }
          if (typeof G !== "undefined" && b(G.target).is(e)) {
            return false;
          }
        }
      };
      k = function(H) {
        var I = b(H.target),
          K = H.keyCode,
          J = I.is('[role="menuitem"]'),
          F,
          G,
          C,
          E,
          D;
        if (J) {
          f.each(function(L) {
            if (b(this).is(I)) {
              F = L;
              return false;
            }
          });
        }
        if (!(H.ctrlKey || H.altKey || H.metaKey)) {
          switch (H.keyCode) {
            case 9:
              if (y && ((H.shiftKey && I.is(v)) || (!H.shiftKey && I.is(e)))) {
                v.trigger("click");
                a.focus(v);
                return false;
              }
              break;
            case 13:
              I.trigger("click");
              if (I.is(e)) {
                a.focus(v);
                return false;
              }
              break;
            case 27:
              if (y) {
                t();
                a.focus(v);
                return false;
              }
              break;
            case 32:
              I.trigger("click");
              if (I.is(e)) {
                a.focus(v);
                return false;
              }
              break;
            case 38:
              if (!J) {
                if (y) {
                  a.focus(f.eq(f.length - 1));
                } else {
                  v.trigger("click");
                }
              } else {
                if (F === 0) {
                  a.focus(f.eq(f.length - 1));
                } else {
                  a.focus(f.eq(F - 1));
                }
              }
              return false;
            case 40:
              if (!J) {
                if (y) {
                  a.focus(f.eq(0));
                } else {
                  v.trigger("click");
                }
              } else {
                if (F === f.length - 1) {
                  a.focus(f.eq(0));
                } else {
                  a.focus(f.eq(F + 1));
                }
              }
              return false;
            default:
              if (
                (K > 47 && K < 91) ||
                (K > 95 && K < 112) ||
                (K > 185 && K < 223)
              ) {
                G = String.fromCharCode(K).toLowerCase();
                C = I.text();
                D = j.find("a").filter(function() {
                  return (
                    b(this)
                      .text()
                      .substring(0, 1)
                      .toLowerCase() === G || b(this).text() === C
                  );
                });
                if (D.length > 0) {
                  D.each(function(L) {
                    if (b(this).text() === C) {
                      E = L;
                      return false;
                    }
                  });
                  if (E < D.length - 1) {
                    a.focus(D.eq(E + 1));
                    return false;
                  }
                  a.focus(D.eq(0));
                }
                return false;
              }
          }
        } else {
          if (H.metaKey && H.keycode === 9) {
            if (I.is(v)) {
              v.trigger("click");
              return false;
            }
          }
        }
      };
      f.on("click vclick touchstart", t);
      h.on("keydown", k);
      j.on("keydown", k);
      q = function(E) {
        var C = b(E.target),
          D = E.button;
        if (typeof D === "undefined" || D === a.leftMouseButton) {
          if (y && !C.is(j) && !C.is(h) && C.closest(j).length === 0) {
            t();
          }
        }
      };
      a.document.on("click vclick touchstart", q);
      j.append(
        '<a href="#" id="slideoutClose" role="button" aria-controls="slideout-body">' +
          z +
          "</a>"
      );
      e = j.find("#slideoutClose");
      n.css("padding", w / 2 + "px").prepend(
        '<div id="slideoutToggle" class="slideoutToggle"><a id="toggleLink" role="button" aria-controls="slideout-body" href="#" onclick="return false;">' +
          p.txtShow +
          "</a></div>"
      );
      d = n.find("#slideoutToggle");
      v = n.find("#toggleLink");
      j.addClass("tabbedSlideout");
      j.hide().attr("aria-hidden", "true");
      if (i && document.documentMode === undefined) {
        c = false;
      }
      if (c) {
        h.addClass("slideoutWrapper");
        a.resize(u);
        u();
      } else {
        h.addClass("so-ie7");
        l = { top: 0 };
        l[r] = B - 10;
        h.addClass("slideoutWrapperRel").css(l);
      }
      v.on("click vclick touchstart", t);
      e.on("click vclick touchstart", t);
      o.append(h);
      h.unwrap();
      if (!a.preIE9) {
        d.css({ height: v.outerWidth() + "px", width: v.outerHeight() + "px" });
      } else {
        d.css({ height: v.outerHeight() + "px", width: v.outerWidth() + "px" });
      }
      if (a.ie === "8.0") {
        b("#slideoutToggle").css({
          left: (a.rtl ? "" : "-") + b("#slideoutToggle").outerWidth() + "px",
          top: b("#slideoutToggle").outerWidth() + "px"
        });
        h.width(w);
      } else {
        h.css("width", d.outerWidth() + w + "px").css("top", g.offset().top);
      }
      if (i) {
        a.html.css("overflowY", "auto");
      }
      if (s) {
        t();
      }
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.tabbedinterface = {
    type: "plugin",
    depends: a.mobile ? [] : ["easytabs"],
    mobile: function(m) {
      var c,
        o,
        d = m.children(".tabs-panel").children("div"),
        k = m.children(".tabs").children("li"),
        n,
        e = b(".wet-boew-tabbedinterface").index(m),
        g =
          '<div data-role="collapsible-set" data-mini="true" data-content-theme="b" data-theme="b">',
        l = 0,
        j,
        q,
        f,
        p,
        i,
        h;
      n = k.find('a[href="#' + a.urlhash + '"]');
      if (n.length === 0) {
        n = k.find('a[href="' + this._get_active_panel(e) + '"]');
      }
      if (n.length > 0) {
        k.removeClass("default");
        n.parent("li").addClass("default");
      }
      for (i = 0, h = k.length; i < h; i += 1) {
        if (k.eq(i).hasClass("default")) {
          l = i;
          break;
        }
      }
      q = this._get_heading_level(m);
      f = "<h" + q + ">";
      p = "</h" + q + ">";
      for (i = 0, h = d.length; i < h; i += 1) {
        j = k.eq(i).children("a");
        g +=
          '<div data-role="collapsible"' +
          (i === l ? ' data-collapsed="false"' : "") +
          ' data-tab="' +
          this._get_hash(j.attr("href")) +
          '">' +
          f +
          j.html() +
          p +
          "</div>";
      }
      c = b(g);
      o = c.find("div");
      while (h--) {
        o.eq(h).append(d.eq(h));
      }
      m.empty().append(c);
      this._init_panel_links(o, o, "data-tab", function(s) {
        var r = s.button;
        if (typeof r === "undefined" || r === a.leftMouseButton) {
          s.data.tab.trigger("expand");
          return false;
        }
      });
      o.on("expand", function() {
        a.fn.tabbedinterface._set_active_panel(b(this).data("tab"), e);
        setTimeout(function() {
          a.window.trigger("resize");
        }, 1);
      });
      return m;
    },
    _exec: function(L) {
      if (a.mobile) {
        return a.fn.tabbedinterface.mobile(L).trigger("create");
      }
      var m,
        h = L.children(".tabs"),
        q = h.find("a").filter(":not(.tabs-toggle)"),
        j = L.children(".tabs-panel"),
        J = b(".wet-boew-tabbedinterface"),
        i,
        r = j.children(),
        K = r.get(),
        c,
        N,
        f,
        G,
        x,
        E,
        o,
        k,
        M,
        v,
        g,
        A = { pressed: false, timeout: null },
        I,
        t,
        p = a.dic.get("%pause"),
        e = a.dic.get("%tab-rotation", "disable"),
        H = a.dic.get("%play"),
        l = a.dic.get("%tab-rotation", "enable"),
        y = " " + a.dic.get("%hyphen") + " ",
        D,
        B,
        n = J.index(L),
        w = J.length > 1 ? " " + (n + 1) : "",
        F,
        z = "-link",
        u,
        C,
        d,
        s;
      x = {
        panelActiveClass: "active",
        tabActiveClass: "active",
        defaultTab: "li:first-child",
        autoHeight: true,
        cycle: false,
        carousel: false,
        autoPlay: false,
        animate: false,
        animationSpeed: "normal",
        updateHash: false,
        transition: false
      };
      E = {
        defaultTab: L.find(".default").length ? ".default" : undefined,
        autoHeight: L.hasClass("auto-height-none") ? false : undefined,
        cycle: L.hasClass("cycle-slow")
          ? 8000
          : L.hasClass("cycle-fast")
          ? 2000
          : L.hasClass("cycle")
          ? 6000
          : undefined,
        carousel: L.hasClass("style-carousel") ? true : undefined,
        autoPlay: L.hasClass("auto-play") ? true : undefined,
        animate:
          L.hasClass("animate") ||
          L.hasClass("animate-slow") ||
          L.hasClass("animate-fast")
            ? true
            : undefined,
        animationSpeed: L.hasClass("animate-slow")
          ? "slow"
          : L.hasClass("animate-fast")
          ? "fast"
          : undefined,
        transition: L.hasClass("fade")
          ? "fade"
          : L.hasClass("slide-vert")
          ? "slide-vert"
          : L.hasClass("slide-horz")
          ? "slide-horz"
          : undefined
      };
      b.extend(
        x,
        typeof wet_boew_tabbedinterface !== "undefined"
          ? wet_boew_tabbedinterface
          : {},
        E,
        a.data.getData(L, "wet-boew")
      );
      i = b("<h" + this._get_heading_level(L) + ' class="wb-invisible">').text(
        a.dic.get("%tab-list") + w
      );
      if (a.preIE9) {
        i.wrap("<div>");
      }
      i.insertBefore(h);
      if (r.length > 1) {
        r.append(
          '<p class="panel-end"><span class="wb-invisible">' +
            a.dic.get("%tab-panel-end-1") +
            (j.prev().hasClass("tabs")
              ? '</span><a href="javascript:;" class="wb-show-onfocus button button-accent position-bottom-medium position-left">' +
                a.dic.get("%tab-panel-end-2") +
                '</a><span class="wb-invisible">' +
                a.dic.get("%tab-panel-end-3")
              : "") +
            "</span></p>"
        )
          .find(".panel-end a")
          .on("click", function(P) {
            var O = P.button;
            if (typeof O === "undefined" || O === a.leftMouseButton) {
              a.focus(q.filter("." + x.tabActiveClass));
              P.preventDefault();
            }
          });
      }
      h.attr({ role: "tablist", "aria-live": "off" })
        .children("li")
        .attr("role", "presentation");
      q.attr({ role: "tab", "aria-selected": "false" }).each(function() {
        var O = a.fn.tabbedinterface._get_hash(this.href),
          P = O.length > 0 ? O.substring(1) : false;
        if (P !== false) {
          this.setAttribute("aria-controls", P);
          this.setAttribute("id", P + z);
        }
      });
      j.attr("id", r.eq(0).attr("id") + "-parent");
      r.attr({
        tabindex: "-1",
        role: "tabpanel",
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function() {
        this.setAttribute("aria-labelledby", this.id + z);
      });
      L.on("easytabs:after", function(O, P, Q) {
        r.not(Q).attr({ "aria-hidden": "true", "aria-expanded": "false" });
        Q.attr({ "aria-hidden": "false", "aria-expanded": "true" });
        q.not(P).attr({ "aria-selected": "false", tabindex: "-1" });
        P.attr({ "aria-selected": "true", tabindex: "0" });
        if (L.data("easytabs") !== undefined && !h.hasClass("started")) {
          a.focus(P);
        }
        O.stopPropagation();
      });
      m = q.filter('[href="#' + a.urlhash + '"]');
      if (m.length === 0) {
        m = q.filter('[href="' + this._get_active_panel(n) + '"]');
        if (m.length > 0) {
          x.defaultTab = ".default";
          h.find("li").removeClass("default");
          m.parent("li").addClass("default");
        } else {
          m = h.find(".default a");
          if (m.length === 0) {
            m = h.find("li:first-child a");
          }
        }
      }
      u = m.attr("href");
      L.trigger("easytabs:after", [m, r.filter(u.substring(u.indexOf("#")))]);
      if (a.preIE8) {
        if (q.parent().hasClass("img")) {
          q.parent().removeClass("img");
          q.find("span").removeClass("wb-invisible");
          q.find("img").remove();
        }
      }
      q.off("click vclick").on("keydown click", function(R) {
        var O = b(R.target),
          Q = R.button,
          W,
          S,
          P,
          V,
          T,
          U;
        if (R.type === "keydown") {
          U = R.keyCode === 13 || R.keyCode === 32;
          T = R.keyCode === 37 || R.keyCode === 38;
          V = R.keyCode === 39 || R.keyCode === 40;
          if ((U || T || V) && !(R.ctrlKey || R.altKey || R.metaKey)) {
            if (x.cycle) {
              D();
            }
            if (!U) {
              t(T ? M(q) : k(q), q, r, x, false);
            }
          }
        } else {
          if (typeof Q === "undefined" || Q === a.leftMouseButton) {
            S = R.target.tagName.toLowerCase() !== "a" ? O.closest("a") : O;
            P = a.fn.tabbedinterface._get_hash(S.attr("href"));
            if (S.is(q.filter("." + x.tabActiveClass))) {
              a.focus(r.filter(S.attr("href")));
            }
            S.parents("a:first");
            W = r.filter(P);
            if (W.data("easytabs") && !W.data("easytabs").lastHeight) {
              W.data("easytabs").lastHeight = W.outerHeight();
            }
          }
        }
        if (P !== undefined) {
          a.fn.tabbedinterface._set_active_panel(P, n);
        }
      });
      r.on("swipeleft swiperight", function(O) {
        if (!A.pressed) {
          O.preventDefault();
          t(O.type === "swipeleft" ? k(q) : M(q), q, r, x, false);
        }
      }).on("mousedown mouseup", function(O) {
        if (O.type === "mousedown") {
          clearTimeout(A.timeout);
          A.pressed = true;
        } else {
          A.timeout = setTimeout(function() {
            A.pressed = false;
          }, b.event.special.swipe.durationThreshold);
        }
      });
      k = function(O) {
        var P = O.filter("." + x.tabActiveClass)
          .parent()
          .next(":not(.tabs-toggle)");
        return P.length === 0 ? O.first() : P.children("a");
      };
      M = function(O) {
        var P = O.filter("." + x.tabActiveClass)
          .parent()
          .prev();
        return P.length === 0 ? O.last() : P.children("a");
      };
      t = function(T, U, P, O, Q) {
        var V,
          R,
          S = a.fn.tabbedinterface._get_hash(T.attr("href")),
          W = P.filter(S);
        P.stop(true, true);
        if (O.animate) {
          R = P.filter("." + O.panelActiveClass).removeClass(
            O.panelActiveClass
          );
          if (g()) {
            P.show();
            f.stop().animate(v(W), O.animationSpeed, function() {
              W.addClass(O.panelActiveClass);
              P.filter(":not(." + O.panelActiveClass + ")").hide();
            });
            if (!O.autoHeight) {
              j.stop().animate({ height: W.outerHeight() }, O.animationSpeed);
            }
          } else {
            R.fadeOut(O.animationSpeed, function() {
              return W.fadeIn(O.animationSpeed, function() {
                W.addClass(O.panelActiveClass);
                return W;
              });
            });
          }
        } else {
          P.removeClass(O.panelActiveClass).hide();
          W.addClass(O.panelActiveClass).show();
        }
        a.fn.tabbedinterface._set_active_panel(S, n);
        U.removeClass(O.tabActiveClass)
          .parent()
          .removeClass(O.tabActiveClass);
        T.addClass(O.tabActiveClass)
          .parent()
          .addClass(O.tabActiveClass);
        L.trigger("easytabs:after", [T, W]);
        V = T.parent().siblings(".tabs-toggle");
        if (!Q && (V.length === 0 || V.data("state") === "stopped")) {
          return a.focus(T);
        }
      };
      B = function() {
        if (N.data("state") === "stopped") {
          G(q, r, x);
          c.removeClass("tabs-start")
            .addClass("tabs-stop")
            .html(p + '<span class="wb-invisible">' + y + e + "</span>");
          return b(".wb-invisible", c).text(y + e);
        }
        if (N.data("state") === "started") {
          return D();
        }
      };
      o = function() {
        var Q,
          O = r.length,
          P = 0;
        r.css({ width: "", height: "", minHeight: "" });
        while (O--) {
          Q = r.eq(O).addClass("display-block");
          P = Math.max(P, Q.outerHeight());
          Q.removeClass("display-block");
        }
        return { width: j.width(), height: P };
      };
      v = function(O) {
        var P = { left: 0, top: 0 },
          Q;
        if (O && typeof O.jquery !== "undefined") {
          Q = O.parent().position();
          P = { left: Q.left * -1, top: Q.top * -1 };
        }
        return P;
      };
      g = function() {
        return x.transition === "slide-horz" || x.transition === "slide-vert";
      };
      I = function() {
        var R = j.parents(".tabs-panel > div").filter(":hidden"),
          S = x.transition === "slide-horz",
          Q = { width: 0, height: 0 },
          T = 0,
          P,
          O;
        if (typeof f === "undefined") {
          r.wrapAll('<div class="viewport">').wrap('<div class="panel">');
          f = r.closest(".viewport");
        } else {
          f.css({ width: "", height: "" });
          j.css({ width: "", height: "" });
        }
        R.addClass("display-block");
        O = o();
        for (P = r.length; T < P; T++) {
          r.eq(T)
            .parent()
            .css(
              b.extend(
                { position: "absolute", top: Q.height, left: Q.width },
                O
              )
            );
          if (S) {
            Q.width += O.width;
          } else {
            Q.height += O.height;
          }
        }
        if (x.autoHeight) {
          j.css(O);
        } else {
          j.css("height", r.filter("." + x.panelActiveClass).outerHeight());
        }
        if (S) {
          f.css(
            b.extend(
              { width: Q.width, height: O.height },
              v(r.filter("." + x.panelActiveClass))
            )
          );
        } else {
          f.css(
            b.extend(
              { width: O.width, height: Q.height },
              v(r.filter("." + x.panelActiveClass))
            )
          );
        }
        R.removeClass("display-block");
      };
      if (
        x.autoHeight &&
        !L.hasClass("tabs-style-4") &&
        !L.hasClass("tabs-style-5")
      ) {
        r.show();
        C = 0;
        s = K.length;
        while (s--) {
          d = K[s].offsetHeight;
          if (d > C) {
            C = d;
          }
        }
        r.css({ "min-height": C });
      }
      L.easytabs(b.extend({}, x, { cycle: false }));
      if (x.cycle) {
        G = function(O, R, Q) {
          var P, S;
          P = O.filter("." + Q.tabActiveClass);
          S = P.siblings(".tabs-roller");
          h.addClass("started");
          L.find(".tabs-toggle").data("state", "started");
          return S.show().animate(
            { width: P.parent().width() },
            Q.cycle - 200,
            "linear",
            function() {
              b(this)
                .width(0)
                .hide();
              t(k(O), O, R, Q, true);
              return L.data(
                "interval",
                setTimeout(function() {
                  return G(O, R, Q);
                }, 0)
              );
            }
          );
        };
        D = function() {
          clearTimeout(L.data("interval"));
          L.find(".tabs-roller")
            .width(0)
            .hide()
            .stop();
          L.find(".tabs-toggle").data("state", "stopped");
          h.removeClass("started");
          c.removeClass("tabs-stop")
            .addClass("tabs-start")
            .html(H + '<span class="wb-invisible">' + y + l + "</span>");
          return b(".wb-invisible", c).text(y + l);
        };
        F = j.attr("id");
        h.append(
          '<li class="tabs-toggle"><a class="tabs-prev" href="javascript:;" role="button">&nbsp;&nbsp;&nbsp;<span class="wb-invisible">' +
            a.dic.get("%previous-left") +
            "</span></a></li>"
        );
        h.find(".tabs-prev").on("click", function(P) {
          var O = P.button;
          if (typeof O === "undefined" || O === a.leftMouseButton) {
            t(M(q), q, r, x, true);
          }
        });
        h.append(
          '<li class="tabs-toggle"><a class="tabs-next" href="javascript:;" role="button">&nbsp;&nbsp;&nbsp;<span class="wb-invisible">' +
            a.dic.get("%next-right") +
            "</span></a></li>"
        );
        h.find(".tabs-next").on("click", function(P) {
          var O = P.button;
          if (typeof O === "undefined" || O === a.leftMouseButton) {
            t(k(q), q, r, x, true);
          }
        });
        N = b(
          '<li class="tabs-toggle"><a class="tabs-stop" href="javascript:;" role="button">' +
            p +
            '<span class="wb-invisible">' +
            y +
            e +
            "</span></a></li>"
        );
        c = N.find("a");
        h.append(N);
        N.click(B).on("keydown", function(O) {
          if (O.keyCode === 32 && !(O.ctrlKey || O.altKey || O.metaKey)) {
            B();
            return O.preventDefault();
          }
        });
        h.find("li a")
          .not(N.find("a"))
          .on("click", function(P) {
            var O = P.button;
            if (typeof O === "undefined" || O === a.leftMouseButton) {
              return D();
            }
          });
        q.each(function() {
          var O;
          O = b('<div class="tabs-roller">')
            .hide()
            .on("click", function(Q) {
              var P = Q.button;
              if (typeof P === "undefined" || P === a.leftMouseButton) {
                return b(this)
                  .siblings("a")
                  .trigger("click");
              }
            });
          if (a.preIE8) {
            b(".tabs-style-2 .tabs, .tabs-style-2 .tabs li").css("filter", "");
          }
          return b(this)
            .parent()
            .append(O);
        });
        G(q, r, x);
        if (!x.autoPlay) {
          D();
        }
        a.document.on("keydown", function(O) {
          if (O.keyCode === 27) {
            if (N.data("state") === "started") {
              a.focus(L.find(".tabs ." + x.tabActiveClass));
              D();
            }
          }
        });
        c.on("focus blur", function(O) {
          c.attr("aria-live", O.type === "focus" ? "polite" : "off");
        });
      }
      L.find("a")
        .filter('[href^="#"]')
        .each(function() {
          var Q = b(this),
            O,
            P = a.fn.tabbedinterface._get_hash(Q.attr("href"));
          if (P.length > 1) {
            O = b(P, r);
            if (O.length) {
              return Q.on("click", function(U) {
                var R,
                  T,
                  S = U.button;
                if (typeof S === "undefined" || S === a.leftMouseButton) {
                  R = O.parents('[role="tabpanel"]:hidden');
                  if (R.length !== 0) {
                    U.preventDefault();
                    T = R.attr("id");
                    R.parent()
                      .siblings(".tabs")
                      .find("a")
                      .filter('[href="#' + T + '"]')
                      .trigger("click");
                    return O.get(0).scrollIntoView(true);
                  }
                }
              });
            }
          }
        });
      if (g()) {
        a.window.on("resize", I);
        I();
        L.on("easytabs:before", function(P, O) {
          t(O, q, r, x, true);
          return false;
        });
      }
      this._init_panel_links(r, q, "href", function(O) {
        O.data.tab.trigger("click");
        if (x.cycle) {
          D();
        }
        return false;
      });
      return L.attr(
        "class",
        L.attr("class").replace(/\bwidget-style-/, "style-")
      );
    },
    _init_panel_links: function(g, e, d, j) {
      var h,
        i,
        f = g.find("a").filter('[href^="#"]'),
        c = f.length;
      while (c--) {
        i = this._get_hash(f[c].href);
        if (i.length > 1) {
          h = e.filter("[" + d + '="' + i + '"]');
          if (h.length !== 0) {
            b(f[c])
              .off("click.hlinks vclick.hlinks")
              .on("click vclick", { tab: h }, j);
          }
        }
      }
    },
    _get_heading_level: function(f) {
      var e = f.find(":header"),
        d,
        c;
      if (e.length !== 0) {
        d = parseInt(e.prop("tagName").substr(1), 10);
      } else {
        c = f;
        while (e.length === 0) {
          c = c.parent();
          e = c.find(":header");
        }
        d = parseInt(e.prop("tagName").substr(1), 10) + 1;
      }
      return d;
    },
    _set_active_panel: function(e, c) {
      if (typeof window.sessionStorage !== "undefined") {
        try {
          window.sessionStorage.setItem("activePanel-" + a.urlpage.path + c, e);
        } catch (d) {}
      }
    },
    _get_active_panel: function(c) {
      if (typeof window.sessionStorage !== "undefined") {
        return window.sessionStorage.getItem(
          "activePanel-" + a.urlpage.path + c
        );
      }
      return null;
    },
    _get_hash: function(c) {
      return c !== null ? c.substring(c.indexOf("#")) : "";
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.tables = {
    type: "plugin",
    depends: ["datatables"],
    _exec: function(g) {
      var f = function(h, i) {
          return a.string
            .normalizeDiacritics(h)
            .localeCompare(a.string.normalizeDiacritics(i));
        },
        d = function(h, i) {
          return a.string
            .normalizeDiacritics(i)
            .localeCompare(a.string.normalizeDiacritics(h));
        },
        c,
        e;
      c = {
        aaSorting: [[1, "asc"]],
        aColumns: [],
        aLengthMenu: [10, 25, 50, 100],
        aMobileColumns: false,
        bInfo: true,
        bPaginate: true,
        bSearch: true,
        bSort: true,
        bStateSave: false,
        bVisible: true,
        bZebra: false,
        iDisplayLength: 10,
        sPaginationType: "two_button"
      };
      e = {};
      b.extend(
        c,
        typeof wet_boew_tables !== "undefined" ? wet_boew_tables : {},
        e,
        a.data.getData(g, "wet-boew")
      );
      b.fn.dataTableExt.oSort["html-asc"] = f;
      b.fn.dataTableExt.oSort["html-desc"] = d;
      b.fn.dataTableExt.oSort["string-case-asc"] = f;
      b.fn.dataTableExt.oSort["string-case-desc"] = d;
      b.extend(b.fn.dataTableExt.oSort, {
        "formatted-num-pre": function(h) {
          h = h === "-" || h === "" ? 0 : h.replace(/[^\d\-\.]/g, "");
          return parseFloat(h);
        },
        "formatted-num-asc": function(i, h) {
          return i - h;
        },
        "formatted-num-desc": function(i, h) {
          return h - i;
        }
      });
      b.fn.dataTableExt.aTypes.unshift(function(h) {
        var i = h.replace(/<[^>]*>/g, "").replace(/[^\d\-\/a-zA-Z]/g, "");
        if (b.isNumeric(i) || i === "-") {
          return "formatted-num";
        }
        return null;
      });
      g.dataTable({
        aaSorting: c.aaSorting,
        aoColumnDefs: [
          {
            bVisible: c.bVisible === true,
            aTargets: a.mobile
              ? c.aMobileColumns === false
                ? c.aColumns
                : c.aMobileColumns
              : c.aColumns
          }
        ],
        asStripeClasses: c.bZebra === true ? ["odd", "even"] : [],
        bFilter: c.bSearch === true,
        bInfo:
          c.bInfo === true
            ? c.bSearch === true || c.bPaginate === true
              ? true
              : false
            : false,
        bPaginate: c.bPaginate === true,
        iDisplayLength: c.iDisplayLength,
        aLengthMenu: c.aLengthMenu,
        bSort: c.bSort === true,
        bStateSave: c.bStateSave === true,
        sPaginationType:
          c.sPaginationType === "two_button"
            ? c.sPaginationType
            : "full_numbers",
        oLanguage: {
          oAria: {
            sSortAscending: a.dic.get("%sSortAscending"),
            sSortDescending: a.dic.get("%sSortDecending")
          },
          oPaginate: {
            sFirst: a.dic.get("%first"),
            sLast: a.dic.get("%last"),
            sNext: a.dic.get("%next"),
            sPrevious: a.dic.get("%previous")
          },
          sEmptyTable: a.dic.get("%sEmptyTable"),
          sInfo: a.dic.get("%sInfo"),
          sInfoEmpty: a.dic.get("%sInfoEmpty"),
          sInfoFiltered: a.dic.get("%sInfoFiltered"),
          sInfoThousands: a.dic.get("%sInfoThousands"),
          sLengthMenu: a.dic.get("%sLengthMenu"),
          sLoadingRecords: a.dic.get("%loading"),
          sProcessing: a.dic.get("%processing"),
          sSearch: a.dic.get("%jqm-filter") + a.dic.get("%colon"),
          sZeroRecords: a.dic.get("%no-match-found")
        },
        fnDrawCallback: function() {
          if (a.main.hasClass("wet-boew-equalize")) {
            a.fn.equalize._exec(a.main);
          }
        }
      });
      g.parent().removeAttr("role");
    }
  };
  window.pe = a;
  return a;
})(jQuery);
(function() {
  var a = window.pe || { fn: {} };
  a.fn.texthighlight = {
    type: "plugin",
    _exec: function(c) {
      function b(g, j) {
        var d, h, f, e;
        g = g.replace(/^\s+|\s+$/g, "");
        g = g.replace(/\|+/g, "");
        d = g.split("+");
        if (d.length > 0) {
          g = "";
          for (f = 0, e = d.length; f < e; f += 1) {
            g += d[f] + " ";
          }
          g = g.replace(/^\s+|\s+$|\"|\(|\)/g, "");
        }
        g = g.replace(/\s+/g, "|");
        g = decodeURIComponent(g);
        g = "(?=([^>]*<))([\\s'])?(" + g + ")(?!>)";
        h = j.html().replace(new RegExp(g, "gi"), function(m, l, k, i) {
          return (
            (typeof k === "undefined" ? "" : k) +
            '<span class="texthighlight"><mark>' +
            i +
            "</mark></span>"
          );
        });
        j.html(h);
        return null;
      }
      if (a.urlquery.texthighlight !== undefined) {
        b(a.urlquery.texthighlight, c);
      }
      return this;
    }
  };
  window.pe = a;
  return a;
})();
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.webwidget = {
    type: "plugin",
    weather: {
      _parse_entries: function(d, e, g) {
        var f = d[1],
          c =
            '<li><a href="' +
            f.link +
            '">' +
            f.title +
            '</a> <span class="widget-datestamp">[' +
            a.date.to_iso_format(f.publishedDate, true) +
            "]</span></li>";
        return g.empty().append(c);
      },
      _map_entries: function(c) {
        return c.responseData.feed.entries;
      },
      _json_request: function(d, c) {
        var e;
        d = d.replace(
          /^.*?\.gc\.ca\/([a-z]+).+\/(.*?)_[a-z]+_([ef])\.html/i,
          "http://weather.gc.ca/rss/$1/$2_$3.xml"
        );
        e =
          a.urlpage.protocol +
          "://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" +
          encodeURIComponent(decodeURIComponent(d));
        if (c > 0) {
          e += "&num=" + c;
        }
        return e;
      }
    },
    rss: {
      _parse_entries: function(d, e, k) {
        var j,
          h,
          c = "",
          g,
          f;
        j = e > 0 && e < d.length ? e : d.length;
        g = d.sort(function(l, i) {
          return a.date.compare(i.publishedDate, l.publishedDate);
        });
        for (h = 0; h < j; h += 1) {
          f = g[h];
          c +=
            '<li><a href="' +
            f.link +
            '">' +
            f.title +
            "</a>" +
            (f.publishedDate !== ""
              ? ' <span class="widget-datestamp">[' +
                a.date.to_iso_format(f.publishedDate, true) +
                "]</span>"
              : "") +
            "</li>";
        }
        return k.empty().append(c);
      },
      _map_entries: function(c) {
        return c.responseData.feed.entries;
      },
      _json_request: function(d, c) {
        var e;
        e =
          a.urlpage.protocol +
          "://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" +
          encodeURIComponent(decodeURIComponent(d));
        if (c > 0) {
          e += "&num=" + c;
        }
        return e;
      }
    },
    _exec: function(l, m) {
      var p, c, s, g, j, k, h, q, t, o, f, n, e, r, d;
      g = a.limit(l);
      s = l.find("a").map(function() {
        var i = this.href;
        if (!m && /twitter.com/i.test(i)) {
          m = "twitter";
        }
        if (!m && /weather.gc.ca/i.test(i)) {
          m = "weather";
        }
        if (!m) {
          m = "rss";
        }
        return i;
      });
      d = m === "twitter" ? "a" : "li";
      p = b(
        "<" +
          d +
          ' class="widget-state-loading"><img src="' +
          a.add.liblocation +
          'images/webfeeds/ajax-loader.gif" alt="' +
          a.dic.get("%loading") +
          '" /></' +
          d +
          ">"
      );
      c = l.find(".widget-content, .twitter-timeline");
      c.append(p);
      if (m !== "twitter") {
        j = a.fn.webwidget[m];
        q = s.length - 1;
        k = [];
        o = j._parse_entries;
        h = q;
        f = [];
        t = function(v) {
          v = j._map_entries(v);
          for (var u = 0, i = v.length; u < i; u += 1) {
            k.push(v[u]);
          }
          if (!q) {
            o(k, g, c);
          }
          q -= 1;
          return q;
        };
        n = function() {
          p.remove();
          c.find("li").show();
        };
        e = [];
        while (h >= 0) {
          e[h] = b
            .ajax({
              url: j._json_request(s[h], g),
              dataType: "json",
              timeout: 1000
            })
            .done(t);
          f.push((h -= 1));
        }
        b.when.apply(null, e).always(n);
        b.extend({}, f);
      } else {
        r = a.urlpage.protocol;
        a.add._load(
          (r.indexOf("http") === -1 ? "http" : r) +
            "://platform.twitter.com/widgets.js"
        );
      }
      return;
    }
  };
  window.pe = a;
  return window.pe;
})(jQuery);
(function(b) {
  var a = window.pe || { fn: {} };
  a.fn.zebra = {
    type: "plugin",
    fnZebraComplexTable: function(f, c) {
      var g, h, k, d, e, j, l;
      if (!b(f).data().tblparser) {
        a.fn.parsertable.parse(b(f));
      }
      g = b(f).data().tblparser;
      if (g.keycell) {
        for (h = 0; h < g.keycell.length; h += 1) {
          b(g.keycell[h].elem).addClass("table-keycell");
        }
      }
      if (g.desccell) {
        for (h = 0; h < g.desccell.length; h += 1) {
          b(g.desccell[h].elem).addClass("table-desccell");
        }
      }
      if (g.layoutCell) {
        for (h = 0; h < g.layoutCell.length; h += 1) {
          b(g.layoutCell[h].elem).addClass("table-layoutCell");
        }
      }
      if (g.row) {
        for (h = 0; h < g.row.length; h += 1) {
          if (g.row[h].type === 3) {
            b(g.row[h].elem).addClass("table-summary");
          }
          if (
            g.row[h].type &&
            g.row[h].type === 3 &&
            g.row[h].rowgroup.elem &&
            h > 0 &&
            g.row[h - 1].type &&
            g.row[h - 1].type === 3 &&
            g.row[h - 1].rowgroup.uid !== g.row[h].rowgroup.uid
          ) {
            b(g.row[h].rowgroup.elem).addClass("table-rowgroupmarker");
          }
        }
      }
      if (g.colgroup) {
        for (h = 0; h < g.colgroup.length; h += 1) {
          if (g.colgroup[h].type === 3) {
            b(g.colgroup[h].elem).addClass("table-summary");
          }
          if (
            g.colgroup[h].elem &&
            ((h > 0 &&
              g.colgroup[h].type === 3 &&
              g.colgroup[h - 1].type === 3 &&
              g.colgroup[h - 1].level > g.colgroup[h].level) ||
              (g.colgroup[h].type === 2 &&
                ((h > 0 && g.colgroup[0].type === 2) ||
                  (h > 1 && g.colgroup[0].type === 1))))
          ) {
            b(g.colgroup[h].elem).addClass("table-colgroupmarker");
          }
        }
      }
      if (g.lstrowgroup) {
        for (h = 0; h < g.lstrowgroup.length; h += 1) {
          if (g.lstrowgroup[h].elem && g.lstrowgroup[h].type === 2 && h > 0) {
            b(g.lstrowgroup[h].elem).addClass("table-rowgroupmarker");
          }
        }
      }
      if (!c.noheaderhighlight || c.columnhighlight) {
        k = function(p) {
          var o = [],
            n = b(p),
            m = n.data().tblparser,
            i;
          if (m.row && m.row.header && !c.norowheaderhighlight) {
            for (h = 0, i = m.row.header.length; h !== i; h += 1) {
              o.push(m.row.header[h].elem);
            }
            if (m.addrowheaders) {
              for (h = 0, i = m.addrowheaders.length; h !== i; h += 1) {
                o.push(m.addrowheaders[h].elem);
              }
            }
          }
          if (m.col && m.col.header && !c.nocolheaderhighlight) {
            for (h = 0, i = m.col.header.length; h !== i; h += 1) {
              o.push(m.col.header[h].elem);
            }
            if (m.addcolheaders) {
              for (h = 0, i = m.addcolheaders.length; h !== i; h += 1) {
                o.push(m.addcolheaders[h].elem);
              }
            }
          }
          b(p).data().cellsheader = o;
        };
        b("td, th", f).on("mouseenter focusin", function() {
          var n = b(this),
            i = n.data().tblparser,
            m;
          if (!c.noheaderhighlight) {
            clearTimeout(d);
            m = b("th.table-hover", f);
            if (i.type !== 1) {
              if (!n.data().cellsheader) {
                k(this);
              }
              b.each(n.data().cellsheader, function() {
                var o = b(this);
                o.addClass("table-hover");
                o.data().zebrafor = i.uid;
              });
            } else {
              if (i.scope === "row" && !c.norowheaderhighlight) {
                n.addClass("table-hover");
                n.data().zebrafor = i.uid;
              }
            }
            b.each(m, function() {
              var o = b(this);
              if (o.data().zebrafor && o.data().zebrafor !== i.uid) {
                o.removeClass("table-hover");
                delete o.data().zebrafor;
              }
            });
          }
          if (c.columnhighlight && i.col && i.col.elem) {
            b(i.col.elem).addClass("table-hover");
          }
        });
        b("td, th", f).on("mouseleave focusout", function() {
          var i = b(this).data().tblparser,
            m = this;
          if (!c.noheaderhighlight) {
            d = setTimeout(function() {
              var p,
                n,
                o = b(m),
                q;
              if (i.type === 1) {
                o.removeClass("table-hover");
                delete o.data().zebrafor;
                return;
              }
              for (p = 0, n = o.data().cellsheader.length; p !== n; p += 1) {
                q = b(b(m).data().cellsheader[p]);
                if (q.data().zebrafor === i.uid) {
                  q.removeClass("table-hover");
                  delete q.data().zebrafor;
                }
              }
            }, 25);
          }
          if (c.columnhighlight && i.col && i.col.elem) {
            b(i.col.elem).removeClass("table-hover");
          }
        });
      }
      e = f
        .children("tr")
        .add(f.children("tbody").children("tr"))
        .filter(function() {
          return b(this).children("td").length > 0;
        });
      if (!c.nohover) {
        if (!c.norowheaderhighlight && !c.noheaderhighlight) {
          f.addClass("rowhover");
        } else {
          f.addClass("rowtdhover");
        }
        if (a.preIE9) {
          e.on("mouseleave focusout", function(i) {
            i.stopPropagation();
            b(this).removeClass("table-hover");
          });
          e.on("mouseenter focusin", function(i) {
            i.stopPropagation();
            b(this).addClass("table-hover");
          });
        }
      }
      if (c.vectorstripe) {
        if (!c.columnhighlight) {
          f.addClass("rowzebra");
          if (a.preIE9) {
            e.filter(":odd").addClass("table-odd");
          }
        } else {
          f.addClass("colzebra");
          if (a.preIE9) {
            j = [];
            for (h = 0, l = g.col.length; h < l; h += 1) {
              if (g.col[h].elem) {
                j.push(g.col[h].elem);
              }
            }
            b(j)
              .filter(":odd")
              .addClass("table-odd");
          }
        }
      }
    },
    _exec: function(f) {
      var d,
        l,
        k,
        g,
        p = true,
        j,
        c,
        o,
        n = [],
        m,
        e = [],
        h;
      c = {
        noheaderhighlight: false,
        norowheaderhighlight: false,
        nocolheaderhighlight: false,
        columnhighlight: false,
        nohover: false,
        vectorstripe: false,
        complextableparsing: false
      };
      o = {
        noheaderhighlight: f.hasClass("noheaderhighlight") ? true : undefined,
        norowheaderhighlight: f.hasClass("norowheaderhighlight")
          ? true
          : undefined,
        nocolheaderhighlight: f.hasClass("nocolheaderhighlight")
          ? true
          : undefined,
        columnhighlight: f.hasClass("columnhighlight") ? true : undefined,
        nohover: f.hasClass("nohover") ? true : undefined,
        vectorstripe: f.hasClass("vectorstripe") ? true : undefined,
        complextableparsing: f.hasClass("complextableparsing")
          ? true
          : undefined
      };
      b.extend(
        c,
        typeof wet_boew_zebra !== "undefined" ? wet_boew_zebra : {},
        o
      );
      if (f.is("table")) {
        if (c.complextableparsing || c.nocolheaderhighlight || c.vectorstripe) {
          p = false;
        }
        if (
          p &&
          (f.children("tbody").length > 1 ||
            f.children("thead").children("tr").length > 1 ||
            f.children("colgroup").length > 2)
        ) {
          p = false;
        }
        if (
          p &&
          f.children("colgroup").length === 2 &&
          f.children("colgroup:first").children("col").length > 1
        ) {
          p = false;
        }
        if (
          p &&
          b("tr:first th, tr:first td, tr", f).length < b("th", f).length
        ) {
          p = false;
        }
        j = 0;
        b("tr:eq(2)", f)
          .children()
          .each(function() {
            var i = this.nodeName.toLowerCase();
            if (!p) {
              return;
            }
            if (i === "th" && j > 0) {
              p = false;
              return;
            }
            j += 1;
          });
        if (p) {
          h = f.get(0);
          if (
            !h.tHead &&
            h.rows[0].cells[h.rows[0].cells.length - 1].nodeName === "TH"
          ) {
            b("tr:first()", f).appendTo(b(h.createTHead()));
          }
          if (!a.preIE9) {
            if (!c.columnhighlight) {
              f.addClass("rowzebra");
            } else {
              f.addClass("colzebra");
            }
            if (!c.nohover) {
              if (!c.norowheaderhighlight && !c.noheaderhighlight) {
                f.addClass("rowhover");
              } else {
                f.addClass("rowtdhover");
              }
            }
            return;
          } else {
            d = f
              .children("tr")
              .add(f.children("tbody").children("tr"))
              .filter(function() {
                return b(this).children("td").length > 0;
              });
            if (!c.nohover) {
              if (!c.norowheaderhighlight && !c.noheaderhighlight) {
                f.addClass("rowhover");
              } else {
                f.addClass("rowtdhover");
              }
              d.on("mouseleave focusout", function(i) {
                i.stopPropagation();
                b(this).removeClass("table-hover");
              });
              d.on("mouseenter focusin", function(i) {
                i.stopPropagation();
                b(this).addClass("table-hover");
              });
            }
            if (!c.columnhighlight) {
              f.addClass("rowzebra");
              d.filter(":odd").addClass("table-odd");
            } else {
              f.addClass("colzebra");
              l = f.children("colgroup:last").children("col");
              l.filter(":odd").addClass("table-odd");
            }
            return;
          }
        }
        if (a.fn.parsertable) {
          a.fn.zebra.fnZebraComplexTable(f, c);
          return;
        }
        if (a.fn.zebra.complexTblStack) {
          a.fn.zebra.complexTblStack.push(f);
          a.fn.zebra.complexTblOptsStack.push(jQuery.extend(true, {}, c));
          return;
        }
        a.fn.zebra.complexTblStack = [];
        a.fn.zebra.complexTblOptsStack = [];
        a.fn.zebra.complexTblStack.push(f);
        a.fn.zebra.complexTblOptsStack.push(jQuery.extend(true, {}, c));
        a.document.on("depsTableParserLoaded", function() {
          while (a.fn.zebra.complexTblStack.length > 0) {
            a.fn.zebra.fnZebraComplexTable(
              a.fn.zebra.complexTblStack.shift(),
              a.fn.zebra.complexTblOptsStack.shift()
            );
          }
        });
        a.wb_load({ dep: ["parserTable"] }, "depsTableParserLoaded");
      } else {
        if (f.is("dl")) {
          b(f)
            .children()
            .each(function() {
              var i = b(this);
              switch (this.nodeName.toLowerCase()) {
                case "dt":
                  if (m) {
                    m = false;
                    i.addClass("list-even");
                  } else {
                    m = true;
                    i.addClass("list-odd");
                  }
                  e = [];
                  n.push(i.get(0));
                  i.data().dlitem = e;
                  e.push(i.get(0));
                  break;
                case "dd":
                  if (m) {
                    i.addClass("list-odd");
                  } else {
                    i.addClass("list-even");
                  }
                  n.push(i.get(0));
                  i.data().dlitem = e;
                  e.push(i.get(0));
                  break;
                default:
                  break;
              }
            });
          if (!c.nohover) {
            b(n).on("mouseleave focusout", function(i) {
              i.stopPropagation();
              b(b(this).data().dlitem).removeClass("list-hover");
            });
            b(n).on("mouseenter focusin", function(i) {
              i.stopPropagation();
              b(b(this).data().dlitem).addClass("list-hover");
            });
          }
        } else {
          if (!c.nohover) {
            f.addClass("zebra-hover");
          }
          if (a.preIE9) {
            k = f.children("li");
            g = (f.parents("li").length + 1) % 2;
            k.filter(":odd").addClass(g === 0 ? "list-odd" : "list-even");
            k.filter(":even").addClass(g === 1 ? "list-odd" : "list-even");
            if (!c.nohover) {
              k.on("mouseleave focusout", function(i) {
                i.stopPropagation();
                b(this).removeClass("list-hover");
              });
              k.on("mouseenter focusin", function(i) {
                i.stopPropagation();
                b(this).addClass("list-hover");
              });
            }
          }
        }
      }
    }
  };
  window.pe = a;
  return a;
})(jQuery);

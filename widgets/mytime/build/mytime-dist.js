"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../node_modules/dayjs/dayjs.min.js
  var require_dayjs_min = __commonJS({
    "../node_modules/dayjs/dayjs.min.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
      })(exports, (function() {
        "use strict";
        var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $2 = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
          var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
          return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
        } }, m = function(t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
        }, v = { s: m, z: function(t2) {
          var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
          return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
        }, m: function t2(e2, n2) {
          if (e2.date() < n2.date()) return -t2(n2, e2);
          var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
          return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
        }, a: function(t2) {
          return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
        }, p: function(t2) {
          return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
        }, u: function(t2) {
          return void 0 === t2;
        } }, g = "en", D = {};
        D[g] = M;
        var p = "$isDayjsObject", S = function(t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        }, w = function t2(e2, n2, r2) {
          var i2;
          if (!e2) return g;
          if ("string" == typeof e2) {
            var s2 = e2.toLowerCase();
            D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
            var u2 = e2.split("-");
            if (!i2 && u2.length > 1) return t2(u2[0]);
          } else {
            var a2 = e2.name;
            D[a2] = e2, i2 = a2;
          }
          return !r2 && i2 && (g = i2), i2 || !r2 && g;
        }, O = function(t2, e2) {
          if (S(t2)) return t2.clone();
          var n2 = "object" == typeof e2 ? e2 : {};
          return n2.date = t2, n2.args = arguments, new _(n2);
        }, b = v;
        b.l = w, b.i = S, b.w = function(t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        };
        var _ = (function() {
          function M2(t2) {
            this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
          }
          var m2 = M2.prototype;
          return m2.parse = function(t2) {
            this.$d = (function(t3) {
              var e2 = t3.date, n2 = t3.utc;
              if (null === e2) return /* @__PURE__ */ new Date(NaN);
              if (b.u(e2)) return /* @__PURE__ */ new Date();
              if (e2 instanceof Date) return new Date(e2);
              if ("string" == typeof e2 && !/Z$/i.test(e2)) {
                var r2 = e2.match($2);
                if (r2) {
                  var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                  return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                }
              }
              return new Date(e2);
            })(t2), this.init();
          }, m2.init = function() {
            var t2 = this.$d;
            this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
          }, m2.$utils = function() {
            return b;
          }, m2.isValid = function() {
            return !(this.$d.toString() === l);
          }, m2.isSame = function(t2, e2) {
            var n2 = O(t2);
            return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
          }, m2.isAfter = function(t2, e2) {
            return O(t2) < this.startOf(e2);
          }, m2.isBefore = function(t2, e2) {
            return this.endOf(e2) < O(t2);
          }, m2.$g = function(t2, e2, n2) {
            return b.u(t2) ? this[e2] : this.set(n2, t2);
          }, m2.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
          }, m2.valueOf = function() {
            return this.$d.getTime();
          }, m2.startOf = function(t2, e2) {
            var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
              var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
              return r2 ? i2 : i2.endOf(a);
            }, $3 = function(t3, e3) {
              return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
            }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
            switch (f2) {
              case h:
                return r2 ? l2(1, 0) : l2(31, 11);
              case c:
                return r2 ? l2(1, M3) : l2(0, M3 + 1);
              case o:
                var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
              case a:
              case d:
                return $3(v2 + "Hours", 0);
              case u:
                return $3(v2 + "Minutes", 1);
              case s:
                return $3(v2 + "Seconds", 2);
              case i:
                return $3(v2 + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }, m2.endOf = function(t2) {
            return this.startOf(t2, false);
          }, m2.$set = function(t2, e2) {
            var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $3 = o2 === a ? this.$D + (e2 - this.$W) : e2;
            if (o2 === c || o2 === h) {
              var y2 = this.clone().set(d, 1);
              y2.$d[l2]($3), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
            } else l2 && this.$d[l2]($3);
            return this.init(), this;
          }, m2.set = function(t2, e2) {
            return this.clone().$set(t2, e2);
          }, m2.get = function(t2) {
            return this[b.p(t2)]();
          }, m2.add = function(r2, f2) {
            var d2, l2 = this;
            r2 = Number(r2);
            var $3 = b.p(f2), y2 = function(t2) {
              var e2 = O(l2);
              return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
            };
            if ($3 === c) return this.set(c, this.$M + r2);
            if ($3 === h) return this.set(h, this.$y + r2);
            if ($3 === a) return y2(1);
            if ($3 === o) return y2(7);
            var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$3] || 1, m3 = this.$d.getTime() + r2 * M3;
            return b.w(m3, this);
          }, m2.subtract = function(t2, e2) {
            return this.add(-1 * t2, e2);
          }, m2.format = function(t2) {
            var e2 = this, n2 = this.$locale();
            if (!this.isValid()) return n2.invalidDate || l;
            var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
              return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
            }, d2 = function(t3) {
              return b.s(s2 % 12 || 12, t3, "0");
            }, $3 = f2 || function(t3, e3, n3) {
              var r3 = t3 < 12 ? "AM" : "PM";
              return n3 ? r3.toLowerCase() : r3;
            };
            return r2.replace(y, (function(t3, r3) {
              return r3 || (function(t4) {
                switch (t4) {
                  case "YY":
                    return String(e2.$y).slice(-2);
                  case "YYYY":
                    return b.s(e2.$y, 4, "0");
                  case "M":
                    return a2 + 1;
                  case "MM":
                    return b.s(a2 + 1, 2, "0");
                  case "MMM":
                    return h2(n2.monthsShort, a2, c2, 3);
                  case "MMMM":
                    return h2(c2, a2);
                  case "D":
                    return e2.$D;
                  case "DD":
                    return b.s(e2.$D, 2, "0");
                  case "d":
                    return String(e2.$W);
                  case "dd":
                    return h2(n2.weekdaysMin, e2.$W, o2, 2);
                  case "ddd":
                    return h2(n2.weekdaysShort, e2.$W, o2, 3);
                  case "dddd":
                    return o2[e2.$W];
                  case "H":
                    return String(s2);
                  case "HH":
                    return b.s(s2, 2, "0");
                  case "h":
                    return d2(1);
                  case "hh":
                    return d2(2);
                  case "a":
                    return $3(s2, u2, true);
                  case "A":
                    return $3(s2, u2, false);
                  case "m":
                    return String(u2);
                  case "mm":
                    return b.s(u2, 2, "0");
                  case "s":
                    return String(e2.$s);
                  case "ss":
                    return b.s(e2.$s, 2, "0");
                  case "SSS":
                    return b.s(e2.$ms, 3, "0");
                  case "Z":
                    return i2;
                }
                return null;
              })(t3) || i2.replace(":", "");
            }));
          }, m2.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }, m2.diff = function(r2, d2, l2) {
            var $3, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
              return b.m(y2, m3);
            };
            switch (M3) {
              case h:
                $3 = D2() / 12;
                break;
              case c:
                $3 = D2();
                break;
              case f:
                $3 = D2() / 3;
                break;
              case o:
                $3 = (g2 - v2) / 6048e5;
                break;
              case a:
                $3 = (g2 - v2) / 864e5;
                break;
              case u:
                $3 = g2 / n;
                break;
              case s:
                $3 = g2 / e;
                break;
              case i:
                $3 = g2 / t;
                break;
              default:
                $3 = g2;
            }
            return l2 ? $3 : b.a($3);
          }, m2.daysInMonth = function() {
            return this.endOf(c).$D;
          }, m2.$locale = function() {
            return D[this.$L];
          }, m2.locale = function(t2, e2) {
            if (!t2) return this.$L;
            var n2 = this.clone(), r2 = w(t2, e2, true);
            return r2 && (n2.$L = r2), n2;
          }, m2.clone = function() {
            return b.w(this.$d, this);
          }, m2.toDate = function() {
            return new Date(this.valueOf());
          }, m2.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
          }, m2.toISOString = function() {
            return this.$d.toISOString();
          }, m2.toString = function() {
            return this.$d.toUTCString();
          }, M2;
        })(), Y = _.prototype;
        return O.prototype = Y, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {
          Y[t2[1]] = function(e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        })), O.extend = function(t2, e2) {
          return t2.$i || (t2(e2, _, O), t2.$i = true), O;
        }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
          return O(1e3 * t2);
        }, O.en = D[g], O.Ls = D, O.p = {}, O;
      }));
    }
  });

  // ../node_modules/dayjs/plugin/duration.js
  var require_duration = __commonJS({
    "../node_modules/dayjs/plugin/duration.js"(exports, module) {
      !(function(t, s) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = s() : "function" == typeof define && define.amd ? define(s) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_duration = s();
      })(exports, (function() {
        "use strict";
        var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = 31536e6, u = 2628e6, d = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, a = /\[([^\]]+)]|YYYY|YY|Y|M{1,2}|D{1,2}|H{1,2}|m{1,2}|s{1,2}|SSS/g, h = { years: o, months: u, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
          return t2 instanceof g;
        }, f = function(t2, s2, n2) {
          return new g(t2, n2, s2.$l);
        }, m = function(t2) {
          return s.p(t2) + "s";
        }, l = function(t2) {
          return t2 < 0;
        }, $2 = function(t2) {
          return l(t2) ? Math.ceil(t2) : Math.floor(t2);
        }, y = function(t2) {
          return Math.abs(t2);
        }, v = function(t2, s2) {
          return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
        }, g = (function() {
          function l2(t2, s2, n2) {
            var i2 = this;
            if (this.$d = {}, this.$l = n2, void 0 === t2 && (this.$ms = 0, this.parseFromMilliseconds()), s2) return f(t2 * h[m(s2)], this);
            if ("number" == typeof t2) return this.$ms = t2, this.parseFromMilliseconds(), this;
            if ("object" == typeof t2) return Object.keys(t2).forEach((function(s3) {
              i2.$d[m(s3)] = t2[s3];
            })), this.calMilliseconds(), this;
            if ("string" == typeof t2) {
              var e2 = t2.match(d);
              if (e2) {
                var r2 = e2.slice(2).map((function(t3) {
                  return null != t3 ? Number(t3) : 0;
                }));
                return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
              }
            }
            return this;
          }
          var y2 = l2.prototype;
          return y2.calMilliseconds = function() {
            var t2 = this;
            this.$ms = Object.keys(this.$d).reduce((function(s2, n2) {
              return s2 + (t2.$d[n2] || 0) * h[n2];
            }), 0);
          }, y2.parseFromMilliseconds = function() {
            var t2 = this.$ms;
            this.$d.years = $2(t2 / o), t2 %= o, this.$d.months = $2(t2 / u), t2 %= u, this.$d.days = $2(t2 / r), t2 %= r, this.$d.hours = $2(t2 / e), t2 %= e, this.$d.minutes = $2(t2 / i), t2 %= i, this.$d.seconds = $2(t2 / n), t2 %= n, this.$d.milliseconds = t2;
          }, y2.toISOString = function() {
            var t2 = v(this.$d.years, "Y"), s2 = v(this.$d.months, "M"), n2 = +this.$d.days || 0;
            this.$d.weeks && (n2 += 7 * this.$d.weeks);
            var i2 = v(n2, "D"), e2 = v(this.$d.hours, "H"), r2 = v(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
            this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3, o2 = Math.round(1e3 * o2) / 1e3);
            var u2 = v(o2, "S"), d2 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", h2 = (d2 ? "-" : "") + "P" + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
            return "P" === h2 || "-P" === h2 ? "P0D" : h2;
          }, y2.toJSON = function() {
            return this.toISOString();
          }, y2.format = function(t2) {
            var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i2 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
            return n2.replace(a, (function(t3, s2) {
              return s2 || String(i2[t3]);
            }));
          }, y2.as = function(t2) {
            return this.$ms / h[m(t2)];
          }, y2.get = function(t2) {
            var s2 = this.$ms, n2 = m(t2);
            return "milliseconds" === n2 ? s2 %= 1e3 : s2 = "weeks" === n2 ? $2(s2 / h[n2]) : this.$d[n2], s2 || 0;
          }, y2.add = function(t2, s2, n2) {
            var i2;
            return i2 = s2 ? t2 * h[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i2 * (n2 ? -1 : 1), this);
          }, y2.subtract = function(t2, s2) {
            return this.add(t2, s2, true);
          }, y2.locale = function(t2) {
            var s2 = this.clone();
            return s2.$l = t2, s2;
          }, y2.clone = function() {
            return f(this.$ms, this);
          }, y2.humanize = function(s2) {
            return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
          }, y2.valueOf = function() {
            return this.asMilliseconds();
          }, y2.milliseconds = function() {
            return this.get("milliseconds");
          }, y2.asMilliseconds = function() {
            return this.as("milliseconds");
          }, y2.seconds = function() {
            return this.get("seconds");
          }, y2.asSeconds = function() {
            return this.as("seconds");
          }, y2.minutes = function() {
            return this.get("minutes");
          }, y2.asMinutes = function() {
            return this.as("minutes");
          }, y2.hours = function() {
            return this.get("hours");
          }, y2.asHours = function() {
            return this.as("hours");
          }, y2.days = function() {
            return this.get("days");
          }, y2.asDays = function() {
            return this.as("days");
          }, y2.weeks = function() {
            return this.get("weeks");
          }, y2.asWeeks = function() {
            return this.as("weeks");
          }, y2.months = function() {
            return this.get("months");
          }, y2.asMonths = function() {
            return this.as("months");
          }, y2.years = function() {
            return this.get("years");
          }, y2.asYears = function() {
            return this.as("years");
          }, l2;
        })(), p = function(t2, s2, n2) {
          return t2.add(s2.years() * n2, "y").add(s2.months() * n2, "M").add(s2.days() * n2, "d").add(s2.hours() * n2, "h").add(s2.minutes() * n2, "m").add(s2.seconds() * n2, "s").add(s2.milliseconds() * n2, "ms");
        };
        return function(n2, i2, e2) {
          t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
            var n3 = e2.locale();
            return f(t2, { $l: n3 }, s2);
          }, e2.isDuration = c;
          var r2 = i2.prototype.add, o2 = i2.prototype.subtract;
          i2.prototype.add = function(t2, s2) {
            return c(t2) ? p(this, t2, 1) : r2.bind(this)(t2, s2);
          }, i2.prototype.subtract = function(t2, s2) {
            return c(t2) ? p(this, t2, -1) : o2.bind(this)(t2, s2);
          };
        };
      }));
    }
  });

  // ../package.json
  var version = "2.4.0";

  // mytime/js/support/util.js
  function toBoolSafe(input) {
    return input !== false && input !== "false" && Boolean(input);
  }

  // mytime/js/widgets/countdownNixie.js
  var countdownNixie = {
    intervaltime: 500,
    flips: [],
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length || !jQuery().mtFlipClock) {
        return setTimeout(function() {
          vis.binds["mytime"].countdownnixie.createWidget(widgetID, view, data, style);
        }, 100);
      }
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var mytime = vis.binds["mytime"];
      var showsec = toBoolSafe(data.countdown_showsec);
      var showmin = toBoolSafe(data.countdown_showmin);
      var showhrs = toBoolSafe(data.countdown_showhrs);
      var showday = toBoolSafe(data.countdown_showday);
      var showweek = toBoolSafe(data.countdown_showweek);
      var showmonth = toBoolSafe(data.countdown_showmonth);
      var showyear = toBoolSafe(data.countdown_showyear);
      var units = {
        years: showyear,
        months: showmonth,
        weeks: showweek,
        days: showday,
        hours: showhrs,
        minutes: showmin,
        seconds: showsec
      };
      var error = mytime.validateCountdownUnits(units);
      if (error) {
        return error;
      }
      var color_act = data.countdown_color_active || "#FFE548";
      var color_inact = data.countdown_color_inactive || "#323232";
      var opacity_inact = data.countdown_opacity_inactive || 0.35;
      var glowcolor = data.countdown_glowcolor || "#F58732";
      function onChange(e) {
        var idParts = e.type.split(".");
        var dp = idParts[idParts.length - 2];
        if (dp != "action" && dp != "timer" && dp != "start" && dp != "end") {
          return;
        }
        vis.binds["mytime"].countdownnixie.setState(widgetID, data, vis.binds["mytime"].countdownnixie.setState);
      }
      if (countdown_oid) {
        vis.binds["mytime"].bindStates(
          $div,
          [
            `${countdown_oid}.action`,
            `${countdown_oid}.end`,
            `${countdown_oid}.timer`,
            `${countdown_oid}.config`,
            `${countdown_oid}.start`
          ],
          onChange
        );
      }
      var text = "";
      text += "<style>\n";
      text += `#${widgetID} .cdclock p.separator,
`;
      text += `#${widgetID} .cdclock section p.active {
`;
      text += `    color: ${color_act};
`;
      text += `    text-shadow: 0px 0px 20px ${glowcolor};
`;
      text += "}\n";
      text += `#${widgetID} .cdclock  {
`;
      text += `    color: ${color_inact}${`0${parseInt(255 * opacity_inact).toString(16)}`.slice(-2)};
`;
      text += "}\n";
      text += "</style>\n";
      text += '<div class="cdclock">\n';
      if (showyear) {
        text += '    <section class="years">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showyear && (showmonth || showweek || showday || showhrs || showmin || showsec)) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showmonth) {
        text += '    <section class="months">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showmonth && (showday || showhrs || showmin || showsec)) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showweek) {
        text += '    <section class="weeks">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showweek && (showday || showhrs || showmin || showsec)) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showday) {
        text += '    <section class="days">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showday && showhrs) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showhrs) {
        text += '    <section class="hours">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showhrs && showmin) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showmin) {
        text += '    <section class="mins">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      if (showmin && showsec) {
        text += '    <p class="separator">:</p>\n';
      }
      if (showsec) {
        text += '    <section class="secs">\n';
        text += '        <div class="tens">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += '        <div class="ones">\n';
        text += "            <p>0</p>\n";
        text += "            <p>1</p>\n";
        text += "            <p>2</p>\n";
        text += "            <p>3</p>\n";
        text += "            <p>4</p>\n";
        text += "            <p>5</p>\n";
        text += "            <p>6</p>\n";
        text += "            <p>7</p>\n";
        text += "            <p>8</p>\n";
        text += "            <p>9</p>\n";
        text += "        </div>\n";
        text += "    </section>\n";
      }
      text += "</div>\n";
      text += '<div class="timer"></div>';
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].startTimer(
        widgetID,
        data,
        vis.binds["mytime"].countdownnixie.intervaltime,
        vis.binds["mytime"].countdownnixie.setState
      );
      if (vis.editMode) {
        vis.binds["mytime"].countdownnixie.setState(widgetID, data);
      }
    },
    setState: function(widgetID, data) {
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
      var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
      var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
      var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : "stop";
      var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || "{}") : {};
      var stopbehaviour = config.stopbehaviour || "timer";
      var mytime = vis.binds["mytime"];
      var showsec = toBoolSafe(data.countdown_showsec);
      var showmin = toBoolSafe(data.countdown_showmin);
      var showhrs = toBoolSafe(data.countdown_showhrs);
      var showday = toBoolSafe(data.countdown_showday);
      var showweek = toBoolSafe(data.countdown_showweek);
      var showmonth = toBoolSafe(data.countdown_showmonth);
      var showyear = toBoolSafe(data.countdown_showyear);
      var units = {
        years: showyear,
        months: showmonth,
        weeks: showweek,
        days: showday,
        hours: showhrs,
        minutes: showmin,
        seconds: showsec
      };
      var error = mytime.validateCountdownUnits(units);
      if (error) {
        return error;
      }
      var now = (/* @__PURE__ */ new Date()).getTime() - (vis.binds["mytime"].serversync.serverTimeDiff || 0);
      var ms = 0;
      if (action == "stop" || action == "") {
        $(`#${widgetID} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = stopbehaviour == "timer" ? timer : 0;
      }
      if (action == "run") {
        ms = end - now;
        $(`#${widgetID} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun");
        vis.binds["mytime"].startTimer(
          widgetID,
          data,
          vis.binds["mytime"].countdownnixie.intervaltime,
          vis.binds["mytime"].countdownnixie.setState
        );
      }
      if (action == "pause") {
        $(`#${widgetID} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = end - start;
      }
      if (ms <= 0) {
        ms = 0;
        vis.binds["mytime"].stopTimer(widgetID);
      }
      if (action == "end") {
        $(`#${widgetID} .cdclock`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend");
        vis.binds["mytime"].stopTimer(widgetID);
        if (stopbehaviour == "timer") {
          ms = timer;
        } else {
          ms = 0;
        }
      }
      let cdObj;
      let format = "";
      if (units.weeks) {
        format = "YYYY:ww:dd:HH:mm:ss";
      } else {
        format = "YYYY:MM:dd:HH:mm:ss";
      }
      if (action == "end" || action == "stop") {
        cdObj = vis.binds["mytime"].formatDateFromMs(ms, format).split(":");
      }
      if (action == "run") {
        cdObj = vis.binds["mytime"].formatDateFromRange(now, end, format).split(":");
      }
      if (action == "pause") {
        cdObj = vis.binds["mytime"].formatDateFromRange(start, end, format).split(":");
      }
      if (showyear) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .years`), cdObj[0]);
      }
      if (showmonth) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .months`), cdObj[1]);
      }
      if (showweek) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .weeks`), cdObj[1]);
      }
      if (showday) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .days`), cdObj[2]);
      }
      if (showhrs) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .hours`), cdObj[3]);
      }
      if (showmin) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .mins`), cdObj[4]);
      }
      if (showsec) {
        vis.binds["mytime"].countdownnixie.setDigits($(`#${widgetID} .secs`), cdObj[5]);
      }
    },
    setDigits: function(section, digit) {
      const tens = [...$(section).find(".tens")[0].children];
      const ones = [...$(section).find(".ones")[0].children];
      var l = digit.length;
      tens.forEach((number) => number.classList.remove("active"));
      tens[digit[l - 2]].classList.add("active");
      ones.forEach((number) => number.classList.remove("active"));
      ones[digit[l - 1]].classList.add("active");
    }
  };
  var countdownNixie_default = countdownNixie;

  // mytime/js/widgets/countdownFlip.js
  var countdownFlip = {
    intervaltime: 500,
    flips: [],
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length || !jQuery().mtFlipClock) {
        return setTimeout(function() {
          vis.binds["mytime"].countdownflip.createWidget(widgetID, view, data, style);
        }, 100);
      }
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var showsec = toBoolSafe(data.countdown_showsec);
      var showmin = toBoolSafe(data.countdown_showmin);
      var showhrs = toBoolSafe(data.countdown_showhrs);
      var showday = toBoolSafe(data.countdown_showday);
      var font = style["font-family"] && style["font-family"] != "" ? style["font-family"] : "";
      var color = data.countdown_color ? data.countdown_color : "";
      var bcolor = data.countdown_background_color ? data.countdown_background_color : "";
      var dotcolor = data.countdown_dot_color ? data.countdown_dot_color : "";
      var pattern = (showday ? "1" : "0") + (showhrs ? "1" : "0") + (showmin ? "1" : "0") + (showsec ? "1" : "0");
      if (pattern.indexOf("101") >= 0 || pattern.indexOf("1001") >= 0) {
        $(`#${widgetID}`).html("Error: Invalid Format");
        return;
      }
      function onChange(e) {
        var idParts = e.type.split(".");
        var dp = idParts[idParts.length - 2];
        if (dp != "action" && dp != "timer" && dp != "start" && dp != "end") {
          return;
        }
        vis.binds["mytime"].countdownflip.setState(widgetID, data, vis.binds["mytime"].countdownflip.setState);
      }
      if (countdown_oid) {
        vis.binds["mytime"].bindStates(
          $div,
          [
            `${countdown_oid}.action`,
            `${countdown_oid}.end`,
            `${countdown_oid}.timer`,
            `${countdown_oid}.config`,
            `${countdown_oid}.start`
          ],
          onChange
        );
      }
      var text = "";
      text += "<style>\n";
      if (font != "") {
        text += `#${widgetID} .flip-clock-wrapper {
`;
        text += `   font-family:  ${font};
`;
        text += "}\n";
      }
      if (bcolor != "" || color != "") {
        text += `#${widgetID} .flip-clock-wrapper ul li a div div.inn {
`;
        if (bcolor != "") {
          text += `   background-color:  ${bcolor};
`;
        }
        if (color != "") {
          text += `   color:  ${color};
`;
        }
        text += "}\n";
      }
      if (dotcolor != "") {
        text += `#${widgetID} .flip-clock-dot {
`;
        text += `   background-color:  ${dotcolor};
`;
        text += "}\n";
      }
      text += "</style>\n";
      text += '<div class="timer"></div>';
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].countdownflip.flips[widgetID] = $(`#${widgetID} .timer`).mtFlipClock(0, {
        clockFace: "Mytime",
        countdown: true,
        autoStart: false,
        pattern
      });
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].startTimer(
        widgetID,
        data,
        vis.binds["mytime"].countdownflip.intervaltime,
        vis.binds["mytime"].countdownflip.setState
      );
      if (vis.editMode) {
        vis.binds["mytime"].countdownflip.setState(widgetID, data);
      }
    },
    setState: function(widgetID, data) {
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
      var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
      var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
      var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : "stop";
      var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || "{}") : {};
      var stopbehaviour = config.stopbehaviour || "timer";
      var now = (/* @__PURE__ */ new Date()).getTime() - (vis.binds["mytime"].serversync.serverTimeDiff || 0);
      var ms = 0;
      if (action == "stop" || action == "") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = stopbehaviour == "timer" ? timer : 0;
      }
      if (action == "run") {
        ms = end - now;
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun");
        vis.binds["mytime"].startTimer(
          widgetID,
          data,
          vis.binds["mytime"].countdownflip.intervaltime,
          vis.binds["mytime"].countdownflip.setState
        );
      }
      if (action == "pause") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = end - start;
      }
      if (ms <= 0) {
        ms = 0;
        vis.binds["mytime"].stopTimer(widgetID);
      }
      if (action == "end") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend");
        vis.binds["mytime"].stopTimer(widgetID);
        if (stopbehaviour == "timer") {
          ms = timer;
        } else {
          ms = 0;
        }
      }
      if (ms > 8639999e3) {
        ms = 8639999e3;
      }
      vis.binds["mytime"].countdownflip.flips[widgetID].setTime(parseInt(ms / 1e3));
    }
  };
  var countdownFlip_default = countdownFlip;

  // mytime/js/widgets/countdownCircle.js
  var countdownCircle = {
    intervaltime: 500,
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(function() {
          vis.binds["mytime"].countdowncircle.createWidget(widgetID, view, data, style);
        }, 100);
      }
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var mytime = vis.binds["mytime"];
      var showsec = toBoolSafe(data.countdown_showsec);
      var showmin = toBoolSafe(data.countdown_showmin);
      var showhrs = toBoolSafe(data.countdown_showhrs);
      var showday = toBoolSafe(data.countdown_showday);
      var showweek = toBoolSafe(data.countdown_showweek);
      var showmonth = toBoolSafe(data.countdown_showmonth);
      var showyear = toBoolSafe(data.countdown_showyear);
      var error = mytime.validateCountdownUnits({
        Y: showyear,
        M: showmonth,
        w: showweek,
        d: showday,
        H: showhrs,
        m: showmin,
        s: showsec
      });
      if (error) {
        $(`#${widgetID}`).html(error);
        return error;
      }
      function onChange(e) {
        var idParts = e.type.split(".");
        var dp = idParts[idParts.length - 2];
        if (dp != "action" && dp != "timer" && dp != "start" && dp != "end") {
          return;
        }
        vis.binds["mytime"].countdowncircle.setState(widgetID, data);
      }
      if (countdown_oid) {
        vis.binds["mytime"].bindStates(
          $div,
          [
            `${countdown_oid}.action`,
            `${countdown_oid}.end`,
            `${countdown_oid}.timer`,
            `${countdown_oid}.config`,
            `${countdown_oid}.start`
          ],
          onChange
        );
      }
      var width = $(`#${widgetID}`).width();
      var height = $(`#${widgetID}`).height();
      var text = "";
      text += "<style>\n";
      text += `#${widgetID} .timer {
`;
      text += "   position:  absolute;\n";
      text += "   left:      50%;\n";
      text += "   top:       50%;\n";
      text += "   transform: translate(-50%, -50%);\n";
      text += "}\n";
      text += "</style>\n";
      text += `<canvas class="canvas" width="${width}" height="${height}"></canvas>`;
      text += '<div class="timer"></div>';
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].countdowncircle.setState(widgetID, data);
      vis.binds["mytime"].startTimer(
        widgetID,
        data,
        //vis.binds["mytime"].countdowncircle.calcInterval(timer),
        vis.binds["mytime"].countdowncircle.intervaltime,
        vis.binds["mytime"].countdowncircle.setState
      );
    },
    calcInterval: function(timer) {
      return Math.min(Math.max(timer / 720, 25), 500);
    },
    setState: function(widgetID, data) {
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var mytime = vis.binds["mytime"];
      var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
      var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
      var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
      var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : "stop";
      var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || "{}") : {};
      var linewidth = data.countdown_width || 20;
      var notimetext = data.countdown_notimetext;
      var format = data.countdown_format || "mm:ss";
      var stopbehaviour = config && config.stopbehaviour || "timer";
      var bcolor = data.countdown_background || "grey";
      var colorSec = data.countdown_color_second || "#87ceeb";
      var colorMin = data.countdown_color_minute || "#87ceeb";
      var colorHrs = data.countdown_color_hour || "#87ceeb";
      var colorDay = data.countdown_color_day || "#87ceeb";
      var colorWeek = data.countdown_color_week || "#87ceeb";
      var colorMonth = data.countdown_color_month || "#87ceeb";
      var colorYear = data.countdown_color_year || "#87ceeb";
      var reverse = data.countdown_reverse;
      var partring = data.countdown_partring;
      var caps = data.countdown_caps || "straight";
      var ringgap = data.countdown_ringgap || 5;
      var showsec = toBoolSafe(data.countdown_showsec);
      var showmin = toBoolSafe(data.countdown_showmin);
      var showhrs = toBoolSafe(data.countdown_showhrs);
      var showday = toBoolSafe(data.countdown_showday);
      var showweek = toBoolSafe(data.countdown_showweek);
      var showmonth = toBoolSafe(data.countdown_showmonth);
      var showyear = toBoolSafe(data.countdown_showyear);
      var units = {
        years: showyear,
        months: showmonth,
        weeks: showweek,
        days: showday,
        hours: showhrs,
        minutes: showmin,
        seconds: showsec
      };
      var error = mytime.validateCountdownUnits(units);
      if (error) {
        return error;
      }
      var now = (/* @__PURE__ */ new Date()).getTime() - (vis.binds["mytime"].serversync.serverTimeDiff || 0);
      var ms = 0;
      if (action == "stop" || action == "") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = stopbehaviour == "timer" ? timer : 0;
      }
      if (action == "run") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun");
        ms = end - now;
        vis.binds["mytime"].startTimer(
          widgetID,
          data,
          vis.binds["mytime"].countdowncircle.calcInterval(timer),
          vis.binds["mytime"].countdowncircle.setState
        );
      }
      if (action == "pause") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = end - start;
      }
      if (ms <= 0) {
        ms = 0;
        vis.binds["mytime"].stopTimer(widgetID);
      }
      if (action == "end") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend");
        vis.binds["mytime"].stopTimer(widgetID);
        if (stopbehaviour == "timer") {
          ms = timer;
        } else {
          ms = 0;
        }
      }
      var cdObjnow = mytime.calcCountdownFromMilliseconds(ms, units);
      var cdObjtimer = mytime.calcCountdownFromMilliseconds(timer, units);
      var canvas = $(`#${widgetID} canvas`);
      var ctx = canvas[0].getContext("2d");
      vis.binds["mytime"].countdowncircle.clearBase(ctx);
      ctx.lineWidth = linewidth;
      var radius, bound, gap;
      var x = ctx.canvas.width / 2;
      var y = ctx.canvas.height / 2;
      var length = Math.min(ctx.canvas.width, ctx.canvas.height);
      var startangle = 0;
      const order = ["seconds", "minutes", "hours", "days", "weeks", "months", "years"];
      const smallestUnit = order.reverse().find((unit) => units[unit] === true);
      order.forEach((ring) => {
        if (!units[ring]) {
          return;
        }
        if (ring == "weeks" && !units.weeks || ring == "months" && !units.months) {
          return;
        }
        bound = bound == void 0 ? length / 2 : radius - linewidth / 2;
        gap = gap == void 0 ? 0 : ringgap;
        radius = vis.binds["mytime"].countdowncircle.calcRadius(bound, linewidth, gap);
        if (ring === "seconds" && units.seconds) {
          const isFull = smallestUnit === "seconds" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 60;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorSec, caps, reverse);
        }
        if (ring === "minutes" && units.minutes) {
          const isFull = smallestUnit === "minutes" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 60;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorMin, caps, reverse);
        }
        if (ring === "hours" && units.minutes) {
          const isFull = smallestUnit === "hours" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 24;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorHrs, caps, reverse);
        }
        if (ring === "days" && units.minutes) {
          const isFull = smallestUnit === "days" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 365;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorDay, caps, reverse);
        }
        if (ring === "weeks" && units.minutes) {
          const isFull = smallestUnit === "weeks" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 52;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorWeek, caps, reverse);
        }
        if (ring === "months" && units.minutes) {
          const isFull = smallestUnit === "months" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 12;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorMonth, caps, reverse);
        }
        if (ring === "years" && units.minutes) {
          const isFull = smallestUnit === "years" && partring === false;
          const denom = isFull ? cdObjtimer[ring] : 12;
          startangle = cdObjnow[ring] * 360 / denom || 0;
          if (vis.editMode) {
            startangle = 180;
          }
          vis.binds["mytime"].countdowncircle.drawBase(ctx, x, y, radius, bcolor);
          vis.binds["mytime"].countdowncircle.drawRing(ctx, x, y, radius, startangle, colorYear, caps, reverse);
        }
      });
      if (!notimetext) {
        vis.binds["mytime"].countdowncircle.drawText(widgetID, ms, format);
      }
    },
    calcRadius: function(bound, linewidth, gap) {
      var radius = bound - linewidth / 2 - gap;
      return radius >= linewidth / 2 ? radius : linewidth / 2;
    },
    clearBase: function(ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
    drawBase: function(ctx, x, y, radius, color) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 360 * (Math.PI / 180), 0 * (Math.PI / 180), 1);
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    },
    drawRing: function(ctx, x, y, radius, startangle, color, caps, reverse) {
      if (caps == "straight") {
        ctx.lineCap = "butt";
      }
      if (caps == "round") {
        ctx.lineCap = "round";
      }
      ctx.beginPath();
      ctx.strokeStyle = color;
      var sh = -90 * (Math.PI / 180);
      if (reverse) {
        ctx.arc(x, y, radius, (360 - startangle) * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
      } else {
        ctx.arc(x, y, radius, startangle * (Math.PI / 180) + sh, 0 * (Math.PI / 180) + sh, 1);
      }
      ctx.stroke();
      ctx.closePath();
    },
    drawText: function(widgetID, ms, format) {
      var text = "";
      text += vis.binds["mytime"].formatDateFromMs(ms, format);
      $(`#${widgetID} .timer`).html(text);
    }
  };
  var countdownCircle_default = countdownCircle;

  // mytime/js/widgets/reverseCountdownPlain.js
  var reverseCountdownPlain = {
    intervaltime: 500,
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(function() {
          vis.binds["mytime"].reversecountdownplain.createWidget(widgetID, view, data, style);
        }, 100);
      }
      data.datetime = data.countdown_datetime || (/* @__PURE__ */ new Date()).toISOString();
      var text = "";
      text += '<div class="timer"></div>';
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].startTimer(
        widgetID,
        data,
        vis.binds["mytime"].reversecountdownplain.intervaltime,
        vis.binds["mytime"].reversecountdownplain.setState
      );
      if (vis.editMode) {
        vis.binds["mytime"].reversecountdownplain.setState(widgetID, data);
      }
    },
    setState: function(widgetID, data) {
      var format = data.countdown_format || "dd\\d HH\\h mm\\m ss\\s";
      var htmlprepend = data.countdown_html_prepend || "";
      var htmlappend = data.countdown_html_append || "";
      var now = (/* @__PURE__ */ new Date()).getTime() - (vis.binds["mytime"].serversync.serverTimeDiff || 0);
      var end = new Date(data.datetime).getTime();
      var text = "";
      text += vis.binds["mytime"].formatDateFromRange(now, end, format);
      $(`#${widgetID} .timer`).html(htmlprepend + text + htmlappend);
    }
  };
  var reverseCountdownPlain_default = reverseCountdownPlain;

  // mytime/js/widgets/countdownPlain.js
  var countdownPlain = {
    intervaltime: 500,
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(function() {
          vis.binds["mytime"].countdownplain.createWidget(widgetID, view, data, style);
        }, 100);
      }
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      function onChange(e) {
        var idParts = e.type.split(".");
        var dp = idParts[idParts.length - 2];
        if (dp != "action" && dp != "timer" && dp != "start" && dp != "end") {
          return;
        }
        vis.binds["mytime"].countdownplain.setState(widgetID, data);
      }
      if (countdown_oid) {
        vis.binds["mytime"].bindStates(
          $div,
          [
            `${countdown_oid}.action`,
            `${countdown_oid}.end`,
            `${countdown_oid}.timer`,
            `${countdown_oid}.config`,
            `${countdown_oid}.start`
          ],
          onChange
        );
      }
      var text = "";
      text += '<div class="timer"></div>';
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].startTimer(
        widgetID,
        data,
        vis.binds["mytime"].countdownplain.intervaltime,
        vis.binds["mytime"].countdownplain.setState
      );
      if (vis.editMode) {
        vis.binds["mytime"].countdownplain.setState(widgetID, data);
      }
    },
    setState: function(widgetID, data) {
      var countdown_oid;
      if (!data.countdown_oid || (countdown_oid = vis.binds["mytime"].getCountdownId(data.countdown_oid)) == false) {
        console.error(`Error: invalid countdown_oid ${data.countdown_oid}`);
        return;
      }
      var start = countdown_oid ? vis.states.attr(`${countdown_oid}.start.val`) : 0;
      var end = countdown_oid ? vis.states.attr(`${countdown_oid}.end.val`) : 0;
      var timer = countdown_oid ? vis.states.attr(`${countdown_oid}.timer.val`) : 0;
      var action = countdown_oid ? vis.states.attr(`${countdown_oid}.action.val`) : "stop";
      var config = countdown_oid ? JSON.parse(vis.states.attr(`${countdown_oid}.config.val`) || "{}") : {};
      var format = data.countdown_format || "dd\\d HH\\h mm\\m ss\\s";
      var stopbehaviour = config.stopbehaviour || "timer";
      var htmlprepend = data.countdown_html_prepend || "";
      var htmlappend = data.countdown_html_append || "";
      var now = (/* @__PURE__ */ new Date()).getTime() - (vis.binds["mytime"].serversync.serverTimeDiff || 0);
      var ms = 0;
      if (action == "stop" || action == "") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdstop");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = stopbehaviour == "timer" ? timer : 0;
      }
      if (action == "run") {
        ms = end - now;
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdrun");
        vis.binds["mytime"].startTimer(
          widgetID,
          data,
          vis.binds["mytime"].countdownplain.intervaltime,
          vis.binds["mytime"].countdownplain.setState
        );
      }
      if (action == "pause") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdpause");
        vis.binds["mytime"].stopTimer(widgetID);
        ms = end - start;
      }
      if (ms <= 0) {
        ms = 0;
        vis.binds["mytime"].stopTimer(widgetID);
      }
      if (action == "end") {
        $(`#${widgetID} .timer`).removeClass("cdstop cdrun cdpause cdend").addClass("cdend");
        vis.binds["mytime"].stopTimer(widgetID);
        if (stopbehaviour == "timer") {
          ms = timer;
        } else {
          ms = 0;
        }
      }
      var text = "";
      if (action == "end" || action == "stop") {
        text += vis.binds["mytime"].formatDateFromMs(ms, format);
      }
      if (action == "run") {
        text += vis.binds["mytime"].formatDateFromRange(now, end, format);
      }
      if (action == "pause") {
        text += vis.binds["mytime"].formatDateFromRange(start, end, format);
      }
      $(`#${widgetID} .timer`).html(htmlprepend + text + htmlappend);
    }
  };
  var countdownPlain_default = countdownPlain;

  // mytime/js/widgets/wordclock.js
  var wordclock = {
    lang_pack: [],
    lang_map: {
      english: "EN",
      german: "DE",
      swiss: "CH_BERN",
      swabian: "DE_SWG",
      italian: "IT",
      spanish: "ES",
      russian: "RU",
      french: "fr-CA",
      turkish: "TR",
      dutch: "NL"
    },
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(function() {
          vis.binds["mytime"].wordclock.createWidget(widgetID, view, data, style);
        }, 100);
      }
      var language = data.language || "english";
      var letterActivated = data.letterActivated || "#fff";
      var letterDeactivated = data.letterDeactivated || "#333";
      var wordclockMargin = data.wordclockMargin || 0;
      var withMinutes = data.withMinutes || false;
      var withSeconds = data.withSeconds || false;
      var minuteSize = data.minuteSize || 5;
      var secondSize = data.secondSize || 5;
      var minuteColor = data.minuteColor || "green";
      var secondColor = data.secondColor || "blue";
      var lang_key = this.lang_map[language];
      var lang_pack = this.lang_pack.find((el) => el.langCode == lang_key);
      var text = "";
      text += "<style>\n";
      text += `#${widgetID} .wc__frame {
`;
      text += "   display: table;\n";
      text += "   margin: auto;\n";
      text += "   position: relative;\n";
      text += "   top: 50%;\n";
      text += "   transform: translateY(-50%);\n";
      text += "}\n";
      text += `#${widgetID} .wc__frame__row {
`;
      text += "   display: flex;\n";
      text += "}\n";
      text += `#${widgetID} .wc__column__left, .wc__column__right {
`;
      text += "   display: flex;\n";
      text += `   width: ${withMinutes ? Math.max(minuteSize, secondSize) : "0"}px;
`;
      text += "   flex-direction: column;\n";
      text += "   justify-content: space-around;\n";
      text += "   align-items: center;\n";
      text += "   line-height: 0px;\n";
      text += "}\n";
      text += `#${widgetID} .wc__column__middle {
`;
      text += "   display: flex;\n";
      text += "   justify-content: space-around;\n";
      text += "   flex-grow: 1;\n";
      text += "}\n";
      text += `#${widgetID} .wc__minute {
`;
      text += `   width: ${minuteSize}px;
`;
      text += `   height: ${minuteSize}px;
`;
      text += "}\n";
      text += `#${widgetID} .wc__minute_active {
`;
      text += `   background-color: ${minuteColor};
`;
      text += "   border-radius: 50%;\n";
      text += "}\n";
      text += `#${widgetID} .wc__second {
`;
      text += "   display: inline-block;\n";
      text += "   border-radius: 50%;\n";
      text += "}\n";
      text += `#${widgetID} .wc__column__left .wc__second, .wc__column__right .wc__second {
`;
      text += `   width: ${secondSize}px;
`;
      text += `   height: ${secondSize}px;
`;
      text += "}\n";
      text += `#${widgetID} .wc__column__middle .wc__second {
`;
      text += `   width: ${secondSize}px;
`;
      text += `   height: ${secondSize}px;
`;
      text += "}\n";
      text += `#${widgetID} .wc__second__container {
`;
      text += "   display: table-cell;\n";
      text += "   vertical-align: middle;\n";
      text += "   text-align: center;\n";
      text += "   line-height: 0px;\n";
      text += "}\n";
      text += `#${widgetID} .wc__second_active {
`;
      text += `   background-color: ${secondColor};
`;
      text += "   border-radius: 50%;\n";
      text += "}\n";
      text += `#${widgetID} .wc__wordclock {
`;
      text += "   display: flex;\n";
      text += "   flex-direction: column;\n";
      text += `   margin: ${wordclockMargin}px;
`;
      text += "}\n";
      text += `#${widgetID} .wc__row {
`;
      text += "   display: flex;\n";
      text += "   flex-direction: row;\n";
      text += "   align-items: stretch;\n";
      text += "}\n";
      text += `#${widgetID} .wc__row__letter {
`;
      text += "   width: 1em;\n";
      text += "   text-align:center;\n";
      text += `   color:${letterDeactivated};
`;
      text += "   transition: color 1s;\n";
      text += "}\n";
      text += `#${widgetID} .wc__row__letter_active {
`;
      text += `   color:${letterActivated};
`;
      text += "}\n";
      text += "</style>\n";
      text += '<div class="wc__frame">\n';
      text += '  <div class="wc__frame__row wc__frame__row__top">\n';
      text += '    <div class="wc__column__left">\n';
      if (withMinutes) {
        text += '    <div class="wc__minute"></div>\n';
      }
      text += "    </div>\n";
      text += '    <div class="wc__column__middle">\n';
      if (withSeconds) {
        text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
      }
      text += "    </div>\n";
      text += '    <div class="wc__column__right">\n';
      if (withMinutes) {
        text += '    <div class="wc__minute"></div>\n';
      }
      text += "    </div>\n";
      text += "  </div>\n";
      text += '  <div class="wc__frame__row wc__frame__row__middle">\n';
      text += '    <div class="wc__column__left">\n';
      if (withSeconds) {
        text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
      }
      text += "    </div>\n";
      text += '    <div class="wc__column__middle">\n';
      text += '<div class="wc__wordclock">\n';
      for (const row of lang_pack.letterSet) {
        text += '<div class="wc__row">\n';
        for (const letter of row) {
          text += `<span class="wc__row__letter">${letter}</span>
`;
        }
        text += "</div>\n";
      }
      text += "</div>\n";
      text += "    </div>\n";
      text += '    <div class="wc__column__right">\n';
      if (withSeconds) {
        text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
      }
      text += "    </div>\n";
      text += "  </div>\n";
      text += '  <div class="wc__frame__row wc__frame__row__bottom">\n';
      text += '    <div class="wc__column__left">\n';
      if (withMinutes) {
        text += '    <div class="wc__minute"></div>\n';
      }
      text += "    </div>\n";
      text += '    <div class="wc__column__middle">\n';
      if (withSeconds) {
        text += '    <div class="wc__second__container"><div class="wc__second"></div></div>\n'.repeat(15);
      }
      text += "    </div>\n";
      text += '    <div class="wc__column__right">\n';
      if (withMinutes) {
        text += '    <div class="wc__minute"></div>\n';
      }
      text += "    </div>\n";
      text += "  </div>\n";
      text += "</div>\n";
      $(`#${widgetID}`).html(text);
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].startTimer(widgetID, data, 1e3, vis.binds["mytime"].wordclock.render.bind(this));
      this.render(widgetID, data);
    },
    render: function(widgetID, data) {
      var timezone = data.timezone || vis.binds["mytime"].getCurrentTimezone();
      var language = data.language || "english";
      var lang_key = this.lang_map[language];
      var lang_pack = this.lang_pack.find((el) => el.langCode == lang_key);
      var date = /* @__PURE__ */ new Date();
      date = vis.binds["mytime"].convertDate2Timezone(date, timezone);
      var min_rest = date.getMinutes() % 5;
      var $frame = $(`#${widgetID} .wc__frame`);
      var $wordclock = $frame.find(" .wc__wordclock");
      var $letters = $wordclock.find(".wc__row__letter");
      $letters.removeClass("wc__row__letter_active");
      var timewords = lang_pack.timeString(date.getHours(), date.getMinutes()).split(" ");
      var displayChars = lang_pack.letterSet.map((row) => row.join("")).join("");
      var offset = 0;
      for (var j = 0; j < timewords.length; j++) {
        var start = displayChars.indexOf(timewords[j], offset);
        offset = start + 1;
        $letters.slice(start, start + timewords[j].length).addClass("wc__row__letter_active");
      }
      var $minutes = $frame.find(".wc__minute");
      $minutes.removeClass("wc__minute_active");
      if (min_rest == 1) {
        $minutes.eq(0).addClass("wc__minute_active");
      }
      if (min_rest == 2) {
        $minutes.eq(0).addClass("wc__minute_active");
        $minutes.eq(1).addClass("wc__minute_active");
      }
      if (min_rest == 3) {
        $minutes.eq(0).addClass("wc__minute_active");
        $minutes.eq(1).addClass("wc__minute_active");
        $minutes.eq(3).addClass("wc__minute_active");
      }
      if (min_rest == 4) {
        $minutes.eq(0).addClass("wc__minute_active");
        $minutes.eq(1).addClass("wc__minute_active");
        $minutes.eq(2).addClass("wc__minute_active");
        $minutes.eq(3).addClass("wc__minute_active");
      }
      var $seconds = $(
        [].concat(
          $frame.find(".wc__frame__row__top .wc__column__middle .wc__second ").get(),
          $frame.find(".wc__frame__row__middle .wc__column__right .wc__second ").get(),
          $frame.find(".wc__frame__row__bottom .wc__column__middle .wc__second ").get().reverse(),
          $frame.find(".wc__frame__row__middle .wc__column__left .wc__second ").get().reverse()
        )
      );
      $seconds.removeClass("wc__second_active");
      $seconds.slice(0, date.getSeconds()).addClass("wc__second_active");
    },
    addLanguage: function(language_pack) {
      this.lang_pack.push(language_pack);
    }
  };
  var wordclock_default = wordclock;

  // mytime/js/widgets/clockPlain.js
  var clockPlain = {
    intervaltime: 250,
    createWidget: function(widgetID, view, data) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(() => vis.binds["mytime"].clockplain.createWidget(widgetID, view, data), 100);
      }
      $div.html('<div class="timer"></div>');
      vis.binds["mytime"].stopTimer(widgetID);
      vis.binds["mytime"].clockplain.setState(widgetID, data);
      vis.binds["mytime"].startTimer(widgetID, data, clockPlain.intervaltime, clockPlain.setState);
    },
    setState: function(widgetID, data) {
      var value = vis.binds["mytime"].formatClockDate(
        vis.binds["mytime"].getClockDate(data),
        data.clock_format || "DD.MM.YYYY HH:mm:ss"
      );
      $(`#${widgetID} .timer`).html((data.clock_html_prepend || "") + value + (data.clock_html_append || ""));
    }
  };
  var clockPlain_default = clockPlain;

  // mytime/js/widgets/clockNixie.js
  var dateUnits = {
    Y: ["year", "years"],
    M: ["month", "months"],
    D: ["day", "days"]
  };
  var timeUnits = [
    ["hours", "hours"],
    ["minutes", "mins"],
    ["seconds", "secs"]
  ];
  function getUnits(data) {
    var order = data.clock_date_order || "DMY";
    return [...order.split("").map((key) => dateUnits[key]), ...timeUnits];
  }
  function digitColumn(className) {
    return `<div class="${className}">${Array.from({ length: 10 }, (_value, digit) => `<p>${digit}</p>`).join("")}</div>`;
  }
  var clockNixie = {
    intervaltime: 250,
    createWidget: function(widgetID, view, data) {
      var $div = $(`#${widgetID}`);
      if (!$div.length) {
        return setTimeout(() => vis.binds["mytime"].clocknixie.createWidget(widgetID, view, data), 100);
      }
      var enabled = getUnits(data).filter(([key]) => toBoolSafe(data[`clock_show${key}`]));
      var active = data.clock_color_active || "#FFE548";
      var inactive = data.clock_color_inactive || "#323232";
      var opacity = data.clock_opacity_inactive === void 0 ? 0.35 : Number(data.clock_opacity_inactive);
      var glow = data.clock_glowcolor || "#F58732";
      var alpha = `0${Math.round(255 * opacity).toString(16)}`.slice(-2);
      var content = `<style>#${widgetID} .cdclock p.separator,#${widgetID} .cdclock section p.active{color:${active};text-shadow:0 0 20px ${glow}}#${widgetID} .cdclock{color:${inactive}${alpha}}</style>`;
      content += '<div class="cdclock">';
      enabled.forEach(([_key, className], index) => {
        if (index) {
          content += '<p class="separator">:</p>';
        }
        content += `<section class="${className}">${digitColumn("tens")}${digitColumn("ones")}</section>`;
      });
      content += "</div>";
      $div.html(content);
      vis.binds["mytime"].stopTimer(widgetID);
      clockNixie.setState(widgetID, data);
      vis.binds["mytime"].startTimer(widgetID, data, clockNixie.intervaltime, clockNixie.setState);
    },
    setState: function(widgetID, data) {
      var parts = vis.binds["mytime"].getClockParts(data);
      getUnits(data).forEach(([key, className]) => {
        if (toBoolSafe(data[`clock_show${key}`])) {
          var value = key === "year" ? parts[key] % 100 : parts[key];
          vis.binds["mytime"].countdownnixie.setDigits(
            $(`#${widgetID} .${className}`),
            vis.binds["mytime"].pad(value, 2)
          );
        }
      });
    }
  };
  var clockNixie_default = clockNixie;

  // mytime/js/widgets/clockFlip.js
  var dateUnits2 = {
    Y: ["year", "day", 86400],
    M: ["month", "day", 86400],
    D: ["day", "day", 86400]
  };
  var timeUnits2 = [
    ["hours", "hours", 3600],
    ["minutes", "minutes", 60],
    ["seconds", "seconds", 1]
  ];
  function getUnits2(data) {
    var order = data.clock_date_order || "DMY";
    return [...order.split("").map((key) => dateUnits2[key]), ...timeUnits2];
  }
  var clockFlip = {
    intervaltime: 250,
    flips: {},
    createWidget: function(widgetID, view, data, style) {
      var $div = $(`#${widgetID}`);
      if (!$div.length || !jQuery().mtFlipClock) {
        return setTimeout(() => vis.binds["mytime"].clockflip.createWidget(widgetID, view, data, style), 100);
      }
      var enabled = getUnits2(data).filter(([key]) => toBoolSafe(data[`clock_show${key}`]));
      var font = style["font-family"] || "";
      var color = data.clock_color || "";
      var background = data.clock_background_color || "";
      var dots = data.clock_dot_color || "";
      var content = `<style>#${widgetID} .clock-flip{display:flex;align-items:flex-start;white-space:nowrap}`;
      content += `#${widgetID} .clock-flip-unit{flex:0 0 140px;width:140px}`;
      content += `#${widgetID} .clock-flip-unit .flip-clock-wrapper{display:flex;width:140px;min-width:140px;margin:0}`;
      content += `#${widgetID} .clock-flip-separator{font-size:48px;line-height:100px;margin:0 4px}`;
      if (font) content += `#${widgetID} .flip-clock-wrapper{font-family:${font}}`;
      if (color || background) content += `#${widgetID} .flip-clock-wrapper ul li a div div.inn{${color ? `color:${color};` : ""}${background ? `background-color:${background};` : ""}}`;
      if (dots) content += `#${widgetID} .flip-clock-dot{background-color:${dots}}#${widgetID} .clock-flip-separator{color:${dots}}`;
      content += `#${widgetID} .clock-flip-unit{display:inline-block}</style><div class="clock-flip">`;
      enabled.forEach(([key], index) => {
        if (index) content += '<span class="clock-flip-separator">:</span>';
        content += `<span class="clock-flip-unit clock-${key}"></span>`;
      });
      content += "</div>";
      $div.html(content);
      clockFlip.flips[widgetID] = {};
      enabled.forEach(([key, faceUnit]) => {
        var pattern = faceUnit === "day" ? "1000" : faceUnit === "hours" ? "0100" : faceUnit === "minutes" ? "0010" : "0001";
        clockFlip.flips[widgetID][key] = $(`#${widgetID} .clock-${key}`).mtFlipClock(0, {
          clockFace: "Mytime",
          countdown: false,
          autoStart: false,
          pattern
        });
      });
      vis.binds["mytime"].stopTimer(widgetID);
      clockFlip.setState(widgetID, data);
      vis.binds["mytime"].startTimer(widgetID, data, clockFlip.intervaltime, clockFlip.setState);
    },
    setState: function(widgetID, data) {
      var parts = vis.binds["mytime"].getClockParts(data);
      getUnits2(data).forEach(([key, _faceUnit, multiplier]) => {
        var flip = clockFlip.flips[widgetID] && clockFlip.flips[widgetID][key];
        if (flip) flip.setTime((key === "year" ? parts[key] % 100 : parts[key]) * multiplier);
      });
    }
  };
  var clockFlip_default = clockFlip;

  // mytime/js/support/runtime.js
  var runtime = {
    startTimer: function(widgetID, data, time, callback) {
      if (vis.binds["mytime"].intervals[widgetID]) {
        return;
      }
      if (vis.editMode) {
        return;
      }
      var interval;
      interval = setInterval(callback, time, widgetID, data, callback);
      vis.binds["mytime"].intervals[widgetID] = interval;
    },
    stopTimer: function(widgetID) {
      var interval;
      if (vis.editMode) {
        return;
      }
      interval = vis.binds["mytime"].intervals[widgetID] ? vis.binds["mytime"].intervals[widgetID] : null;
      if (interval) {
        delete vis.binds["mytime"].intervals[widgetID];
      }
      if (interval) {
        clearInterval(interval);
      }
    },
    getCountdownId: function(countdown_oid) {
      var idParts = countdown_oid.split(".");
      if (idParts[2] != "Countdowns" || idParts.length < 4) {
        return false;
      }
      idParts = idParts.slice(0, 4);
      return idParts.join(".");
    },
    calcCountdownFromMiliSeconds: function(miliseconds, pattern) {
      var ret = {};
      if (pattern[0] == "1") {
        ret.days = Math.floor(miliseconds / 1e3 / 60 / 60 / 24);
        miliseconds -= ret.days * 1e3 * 60 * 60 * 24;
      }
      if (pattern[1] == "1") {
        ret.hours = Math.floor(miliseconds / 1e3 / 60 / 60);
        miliseconds -= ret.hours * 1e3 * 60 * 60;
      }
      if (pattern[2] == "1") {
        ret.minutes = Math.floor(miliseconds / 1e3 / 60);
        miliseconds -= ret.minutes * 1e3 * 60;
      }
      if (pattern[3] == "1") {
        ret.seconds = Math.floor(miliseconds / 1e3);
        miliseconds -= ret.seconds * 1e3;
      }
      return ret;
    },
    bindStates: function(elem, bound, change_callback) {
      var $div = $(elem);
      var boundstates = $div.data("bound");
      var boundHandler = $div.data("bindHandler");
      if (boundstates) {
        for (var i = 0; i < boundstates.length; i++) {
          vis.states.unbind(boundstates[i], boundHandler);
        }
      }
      $div.data("bound", null);
      $div.data("bindHandler", null);
      if (vis.editMode) {
        vis.binds["mytime"].getStates(bound, void 0, void 0);
      } else {
        vis.binds["mytime"].getStates(bound, $div, change_callback);
      }
    },
    getStates: function(bound, $div, change_callback) {
      vis.conn.gettingStates = 0;
      vis.conn.getStates(
        bound,
        function(error, states) {
          vis.binds["mytime"].updateStates(states);
          vis.conn.subscribe(bound);
          for (var i = 0; i < bound.length; i++) {
            bound[i] = `${bound[i]}.val`;
            if (change_callback) {
              vis.states.bind(bound[i], change_callback);
            }
          }
          if ($div) {
            $div.data("bound", bound);
            $div.data("bindHandler", change_callback);
          }
        }.bind({ change_callback })
      );
    },
    updateStates: function(states) {
      for (var id in states) {
        if (!Object.prototype.hasOwnProperty.call(states, id)) {
          continue;
        }
        var obj = states[id];
        try {
          if (vis.editMode) {
            vis.states[`${id}.val`] = obj.val;
            vis.states[`${id}.ts`] = obj.ts;
            vis.states[`${id}.ack`] = obj.ack;
            vis.states[`${id}.lc`] = obj.lc;
            if (obj.q !== void 0 && obj.q !== null) {
              vis.states[`${id}.q`] = obj.q;
            }
          } else {
            const oo = {};
            oo[`${id}.val`] = obj.val;
            oo[`${id}.ts`] = obj.ts;
            oo[`${id}.ack`] = obj.ack;
            oo[`${id}.lc`] = obj.lc;
            if (obj.q !== void 0 && obj.q !== null) {
              oo[`${id}.q`] = obj.q;
            }
            vis.states.attr(oo);
          }
        } catch (e) {
          console.error(`Error: can't create states object for ${id}(${e})`);
        }
      }
    }
  };
  var runtime_default = runtime;

  // mytime/js/support/countdown.js
  var import_dayjs = __toESM(require_dayjs_min());
  var import_duration = __toESM(require_duration());
  import_dayjs.default.extend(import_duration.default);
  var countdown = {
    formatDate: function(ms, format) {
      function ii(i, len) {
        var s2 = `${i}`;
        len = len || 2;
        while (s2.length < len) {
          s2 = `0${s2}`;
        }
        return s2;
      }
      var pattern = (format.search(/(^|[^\\])d/g) >= 0 ? "1" : "0") + (format.search(/(^|[^\\])H/g) >= 0 ? "1" : "0") + (format.search(/(^|[^\\])m/g) >= 0 ? "1" : "0") + (format.search(/(^|[^\\])s/g) >= 0 ? "1" : "0");
      if (pattern.indexOf("101") >= 0 || pattern.indexOf("1001") >= 0) {
        return "Error: Invalid Format";
      }
      var cdObj = vis.binds["mytime"].calcCountdownFromMiliSeconds(ms, pattern);
      var d = cdObj.days;
      format = format.replace(/(^|[^\\])dd/g, `$1${ii(d)}`);
      format = format.replace(/(^|[^\\])d/g, `$1${d}`);
      var H = cdObj.hours;
      format = format.replace(/(^|[^\\])HH+/g, `$1${ii(H)}`);
      format = format.replace(/(^|[^\\])H/g, `$1${H}`);
      var m = cdObj.minutes;
      format = format.replace(/(^|[^\\])mm+/g, `$1${ii(m)}`);
      format = format.replace(/(^|[^\\])m/g, `$1${m}`);
      var s = cdObj.seconds;
      format = format.replace(/(^|[^\\])ss+/g, `$1${ii(s)}`);
      format = format.replace(/(^|[^\\])s/g, `$1${s}`);
      format = format.replace(/\\(.)/g, "$1");
      return format;
    },
    // ****************************************************************
    // Helper: Zahl mit fÃ¼hrenden Nullen auffÃ¼llen
    pad: function(i, len) {
      var s = `${i}`;
      len = len || 2;
      while (s.length < len) {
        s = `0${s}`;
      }
      return s;
    },
    // Helper: prÃ¼ft, ob ein (nicht-escaped) Placeholder im Format vorkommt
    hasToken: function(format, letter) {
      var re = new RegExp(`(^|[^\\\\])${letter}+`);
      return re.test(format);
    },
    // Einheiten aus dem Format extrahieren
    parseCountdownUnits: function(format) {
      return {
        years: vis.binds["mytime"].hasToken(format, "Y"),
        // Jahre
        months: vis.binds["mytime"].hasToken(format, "M"),
        // Monate
        weeks: vis.binds["mytime"].hasToken(format, "w"),
        // Wochen
        days: vis.binds["mytime"].hasToken(format, "d"),
        // Tage
        hours: vis.binds["mytime"].hasToken(format, "H"),
        // Stunden
        minutes: vis.binds["mytime"].hasToken(format, "m"),
        // Minuten
        seconds: vis.binds["mytime"].hasToken(format, "s")
        // Sekunden
      };
    },
    // Pattern validieren (keine LÃ¼cken, nicht M und w gleichzeitig)
    validateCountdownUnits: function(units) {
      if (units.months && units.weeks) {
        return "Error: Invalid Format (cannot mix months (M) and weeks (w))";
      }
      var slots = [units.years, units.months || units.weeks, units.days, units.hours, units.minutes, units.seconds];
      var pattern = slots.map(function(b) {
        return b ? "1" : "0";
      }).join("");
      var first = pattern.indexOf("1");
      if (first !== -1) {
        var last = pattern.lastIndexOf("1");
        var middle = pattern.slice(first, last + 1);
        if (middle.indexOf("0") !== -1) {
          return "Error: Invalid Format";
        }
      }
      return null;
    },
    calcCountdownFromMilliseconds: function(ms, units) {
      var now = (0, import_dayjs.default)();
      var end = now.add(ms, "millisecond");
      return vis.binds["mytime"].calcCountdownFromDates(now, end, units);
    },
    calcCountdownFromDates: function(start, end, units) {
      var from = (0, import_dayjs.default)(start);
      var to = (0, import_dayjs.default)(end);
      if (!to.isValid() || !from.isValid()) {
        return {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      if (to.isBefore(from)) {
        return {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      var result = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      function take(unit) {
        var diff = to.diff(from, unit);
        if (diff > 0) {
          from = from.add(diff, unit);
        }
        return diff;
      }
      if (units.years) {
        result.years = take("year");
      }
      if (units.months) {
        result.months = take("month");
      } else if (units.weeks) {
        var totalDays = to.diff(from, "day");
        result.weeks = Math.floor(totalDays / 7);
        if (result.weeks > 0) {
          from = from.add(result.weeks * 7, "day");
        }
      }
      if (units.days) {
        result.days = take("day");
      }
      if (units.hours) {
        result.hours = take("hour");
      }
      if (units.minutes) {
        result.minutes = take("minute");
      }
      if (units.seconds) {
        result.seconds = take("second");
      }
      return result;
    },
    formatDateFromMs: function(ms, format) {
      var mytime = vis.binds["mytime"];
      var units = mytime.parseCountdownUnits(format);
      var error = mytime.validateCountdownUnits(units);
      if (error) {
        return error;
      }
      var cdObj = mytime.calcCountdownFromMilliseconds(ms, units);
      return mytime.applyCountdownFormat(format, units, cdObj);
    },
    formatDateFromRange: function(startMs, endMs, format) {
      var mytime = vis.binds["mytime"];
      var units = mytime.parseCountdownUnits(format);
      var error = mytime.validateCountdownUnits(units);
      if (error) {
        return error;
      }
      var cdObj = mytime.calcCountdownFromDates(startMs, endMs, units);
      return mytime.applyCountdownFormat(format, units, cdObj);
    },
    applyCountdownFormat: function(format, units, cdObj) {
      var pad = vis.binds["mytime"].pad;
      if (units.years) {
        var Y = cdObj.years;
        format = format.replace(/(^|[^\\])YYYY/g, function(_m, p1) {
          return p1 + pad(Y, 4);
        });
        format = format.replace(/(^|[^\\])YY/g, function(_m, p1) {
          return p1 + pad(Y, 2);
        });
        format = format.replace(/(^|[^\\])Y/g, function(_m, p1) {
          return p1 + Y;
        });
      }
      if (units.months) {
        var M = cdObj.months;
        format = format.replace(/(^|[^\\])MM/g, function(_m, p1) {
          return p1 + pad(M, 2);
        });
        format = format.replace(/(^|[^\\])M/g, function(_m, p1) {
          return p1 + M;
        });
      }
      if (units.weeks) {
        var w = cdObj.weeks;
        format = format.replace(/(^|[^\\])ww/g, function(_m, p1) {
          return p1 + pad(w, 2);
        });
        format = format.replace(/(^|[^\\])w/g, function(_m, p1) {
          return p1 + w;
        });
      }
      if (units.days) {
        var d = cdObj.days;
        format = format.replace(/(^|[^\\])dd/g, function(_m, p1) {
          return p1 + pad(d, 2);
        });
        format = format.replace(/(^|[^\\])d/g, function(_m, p1) {
          return p1 + d;
        });
      }
      if (units.hours) {
        var H = cdObj.hours;
        format = format.replace(/(^|[^\\])HH/g, function(_m, p1) {
          return p1 + pad(H, 2);
        });
        format = format.replace(/(^|[^\\])H/g, function(_m, p1) {
          return p1 + H;
        });
      }
      if (units.minutes) {
        var m = cdObj.minutes;
        format = format.replace(/(^|[^\\])mm/g, function(_m, p1) {
          return p1 + pad(m, 2);
        });
        format = format.replace(/(^|[^\\])m/g, function(_m, p1) {
          return p1 + m;
        });
      }
      if (units.seconds) {
        var s = cdObj.seconds;
        format = format.replace(/(^|[^\\])ss/g, function(_m, p1) {
          return p1 + pad(s, 2);
        });
        format = format.replace(/(^|[^\\])s/g, function(_m, p1) {
          return p1 + s;
        });
      }
      format = format.replace(/\\(.)/g, "$1");
      return format;
    }
    // ****************************************************************
  };
  var countdown_default = countdown;

  // mytime/js/timezones.js
  var fallbackTimezones = [
    "Africa/Abidjan",
    "Africa/Accra",
    "Africa/Addis_Ababa",
    "Africa/Algiers",
    "Africa/Asmara",
    "Africa/Bamako",
    "Africa/Bangui",
    "Africa/Banjul",
    "Africa/Bissau",
    "Africa/Blantyre",
    "Africa/Brazzaville",
    "Africa/Bujumbura",
    "Africa/Cairo",
    "Africa/Casablanca",
    "Africa/Ceuta",
    "Africa/Conakry",
    "Africa/Dakar",
    "Africa/Dar_es_Salaam",
    "Africa/Djibouti",
    "Africa/Douala",
    "Africa/El_Aaiun",
    "Africa/Freetown",
    "Africa/Gaborone",
    "Africa/Harare",
    "Africa/Johannesburg",
    "Africa/Juba",
    "Africa/Kampala",
    "Africa/Khartoum",
    "Africa/Kigali",
    "Africa/Kinshasa",
    "Africa/Lagos",
    "Africa/Libreville",
    "Africa/Lome",
    "Africa/Luanda",
    "Africa/Lubumbashi",
    "Africa/Lusaka",
    "Africa/Malabo",
    "Africa/Maputo",
    "Africa/Maseru",
    "Africa/Mbabane",
    "Africa/Mogadishu",
    "Africa/Monrovia",
    "Africa/Nairobi",
    "Africa/Ndjamena",
    "Africa/Niamey",
    "Africa/Nouakchott",
    "Africa/Ouagadougou",
    "Africa/Porto-Novo",
    "Africa/Sao_Tome",
    "Africa/Tripoli",
    "Africa/Tunis",
    "Africa/Windhoek",
    "America/Adak",
    "America/Anchorage",
    "America/Anguilla",
    "America/Antigua",
    "America/Araguaina",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Catamarca",
    "America/Argentina/Cordoba",
    "America/Argentina/Jujuy",
    "America/Argentina/La_Rioja",
    "America/Argentina/Mendoza",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Salta",
    "America/Argentina/San_Juan",
    "America/Argentina/San_Luis",
    "America/Argentina/Tucuman",
    "America/Argentina/Ushuaia",
    "America/Aruba",
    "America/Asuncion",
    "America/Atikokan",
    "America/Bahia",
    "America/Bahia_Banderas",
    "America/Barbados",
    "America/Belem",
    "America/Belize",
    "America/Blanc-Sablon",
    "America/Boa_Vista",
    "America/Bogota",
    "America/Boise",
    "America/Cambridge_Bay",
    "America/Campo_Grande",
    "America/Cancun",
    "America/Caracas",
    "America/Cayenne",
    "America/Cayman",
    "America/Chicago",
    "America/Chihuahua",
    "America/Costa_Rica",
    "America/Creston",
    "America/Cuiaba",
    "America/Curacao",
    "America/Danmarkshavn",
    "America/Dawson",
    "America/Dawson_Creek",
    "America/Denver",
    "America/Detroit",
    "America/Dominica",
    "America/Edmonton",
    "America/Eirunepe",
    "America/El_Salvador",
    "America/Fort_Nelson",
    "America/Fortaleza",
    "America/Glace_Bay",
    "America/Godthab",
    "America/Goose_Bay",
    "America/Grand_Turk",
    "America/Grenada",
    "America/Guadeloupe",
    "America/Guatemala",
    "America/Guayaquil",
    "America/Guyana",
    "America/Halifax",
    "America/Havana",
    "America/Hermosillo",
    "America/Indiana/Indianapolis",
    "America/Indiana/Knox",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Tell_City",
    "America/Indiana/Vevay",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Inuvik",
    "America/Iqaluit",
    "America/Jamaica",
    "America/Juneau",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    "America/Kralendijk",
    "America/La_Paz",
    "America/Lima",
    "America/Los_Angeles",
    "America/Lower_Princes",
    "America/Maceio",
    "America/Managua",
    "America/Manaus",
    "America/Marigot",
    "America/Martinique",
    "America/Matamoros",
    "America/Mazatlan",
    "America/Menominee",
    "America/Merida",
    "America/Metlakatla",
    "America/Mexico_City",
    "America/Miquelon",
    "America/Moncton",
    "America/Monterrey",
    "America/Montevideo",
    "America/Montserrat",
    "America/Nassau",
    "America/New_York",
    "America/Nipigon",
    "America/Nome",
    "America/Noronha",
    "America/North_Dakota/Beulah",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/Ojinaga",
    "America/Panama",
    "America/Pangnirtung",
    "America/Paramaribo",
    "America/Phoenix",
    "America/Port-au-Prince",
    "America/Port_of_Spain",
    "America/Porto_Velho",
    "America/Puerto_Rico",
    "America/Punta_Arenas",
    "America/Rainy_River",
    "America/Rankin_Inlet",
    "America/Recife",
    "America/Regina",
    "America/Resolute",
    "America/Rio_Branco",
    "America/Santarem",
    "America/Santiago",
    "America/Santo_Domingo",
    "America/Sao_Paulo",
    "America/Scoresbysund",
    "America/Sitka",
    "America/St_Barthelemy",
    "America/St_Johns",
    "America/St_Kitts",
    "America/St_Lucia",
    "America/St_Thomas",
    "America/St_Vincent",
    "America/Swift_Current",
    "America/Tegucigalpa",
    "America/Thule",
    "America/Thunder_Bay",
    "America/Tijuana",
    "America/Toronto",
    "America/Tortola",
    "America/Vancouver",
    "America/Whitehorse",
    "America/Winnipeg",
    "America/Yakutat",
    "America/Yellowknife",
    "Antarctica/Casey",
    "Antarctica/Davis",
    "Antarctica/DumontDUrville",
    "Antarctica/Macquarie",
    "Antarctica/Mawson",
    "Antarctica/McMurdo",
    "Antarctica/Palmer",
    "Antarctica/Rothera",
    "Antarctica/Syowa",
    "Antarctica/Troll",
    "Antarctica/Vostok",
    "Arctic/Longyearbyen",
    "Asia/Aden",
    "Asia/Almaty",
    "Asia/Amman",
    "Asia/Anadyr",
    "Asia/Aqtau",
    "Asia/Aqtobe",
    "Asia/Ashgabat",
    "Asia/Atyrau",
    "Asia/Baghdad",
    "Asia/Bahrain",
    "Asia/Baku",
    "Asia/Bangkok",
    "Asia/Barnaul",
    "Asia/Beirut",
    "Asia/Bishkek",
    "Asia/Brunei",
    "Asia/Chita",
    "Asia/Choibalsan",
    "Asia/Colombo",
    "Asia/Damascus",
    "Asia/Dhaka",
    "Asia/Dili",
    "Asia/Dubai",
    "Asia/Dushanbe",
    "Asia/Famagusta",
    "Asia/Gaza",
    "Asia/Hebron",
    "Asia/Ho_Chi_Minh",
    "Asia/Hong_Kong",
    "Asia/Hovd",
    "Asia/Irkutsk",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Jerusalem",
    "Asia/Kabul",
    "Asia/Kamchatka",
    "Asia/Karachi",
    "Asia/Kathmandu",
    "Asia/Khandyga",
    "Asia/Kolkata",
    "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Kuwait",
    "Asia/Macau",
    "Asia/Magadan",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Muscat",
    "Asia/Nicosia",
    "Asia/Novokuznetsk",
    "Asia/Novosibirsk",
    "Asia/Omsk",
    "Asia/Oral",
    "Asia/Phnom_Penh",
    "Asia/Pontianak",
    "Asia/Pyongyang",
    "Asia/Qatar",
    "Asia/Qostanay",
    "Asia/Qyzylorda",
    "Asia/Riyadh",
    "Asia/Sakhalin",
    "Asia/Samarkand",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Srednekolymsk",
    "Asia/Taipei",
    "Asia/Tashkent",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Thimphu",
    "Asia/Tokyo",
    "Asia/Tomsk",
    "Asia/Ulaanbaatar",
    "Asia/Urumqi",
    "Asia/Ust-Nera",
    "Asia/Vientiane",
    "Asia/Vladivostok",
    "Asia/Yakutsk",
    "Asia/Yangon",
    "Asia/Yekaterinburg",
    "Asia/Yerevan",
    "Atlantic/Azores",
    "Atlantic/Bermuda",
    "Atlantic/Canary",
    "Atlantic/Cape_Verde",
    "Atlantic/Faroe",
    "Atlantic/Madeira",
    "Atlantic/Reykjavik",
    "Atlantic/South_Georgia",
    "Atlantic/St_Helena",
    "Atlantic/Stanley",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/Lindeman",
    "Australia/Lord_Howe",
    "Australia/Melbourne",
    "Australia/Perth",
    "Australia/Sydney",
    "Europe/Amsterdam",
    "Europe/Andorra",
    "Europe/Astrakhan",
    "Europe/Athens",
    "Europe/Belgrade",
    "Europe/Berlin",
    "Europe/Bratislava",
    "Europe/Brussels",
    "Europe/Bucharest",
    "Europe/Budapest",
    "Europe/Busingen",
    "Europe/Chisinau",
    "Europe/Copenhagen",
    "Europe/Dublin",
    "Europe/Gibraltar",
    "Europe/Guernsey",
    "Europe/Helsinki",
    "Europe/Isle_of_Man",
    "Europe/Istanbul",
    "Europe/Jersey",
    "Europe/Kaliningrad",
    "Europe/Kiev",
    "Europe/Kirov",
    "Europe/Lisbon",
    "Europe/Ljubljana",
    "Europe/London",
    "Europe/Luxembourg",
    "Europe/Madrid",
    "Europe/Malta",
    "Europe/Mariehamn",
    "Europe/Minsk",
    "Europe/Monaco",
    "Europe/Moscow",
    "Europe/Oslo",
    "Europe/Paris",
    "Europe/Podgorica",
    "Europe/Prague",
    "Europe/Riga",
    "Europe/Rome",
    "Europe/Samara",
    "Europe/San_Marino",
    "Europe/Sarajevo",
    "Europe/Saratov",
    "Europe/Simferopol",
    "Europe/Skopje",
    "Europe/Sofia",
    "Europe/Stockholm",
    "Europe/Tallinn",
    "Europe/Tirane",
    "Europe/Ulyanovsk",
    "Europe/Uzhgorod",
    "Europe/Vaduz",
    "Europe/Vatican",
    "Europe/Vienna",
    "Europe/Vilnius",
    "Europe/Volgograd",
    "Europe/Warsaw",
    "Europe/Zagreb",
    "Europe/Zaporozhye",
    "Europe/Zurich",
    "Indian/Antananarivo",
    "Indian/Chagos",
    "Indian/Christmas",
    "Indian/Cocos",
    "Indian/Comoro",
    "Indian/Kerguelen",
    "Indian/Mahe",
    "Indian/Maldives",
    "Indian/Mauritius",
    "Indian/Mayotte",
    "Indian/Reunion",
    "Pacific/Apia",
    "Pacific/Auckland",
    "Pacific/Bougainville",
    "Pacific/Chatham",
    "Pacific/Chuuk",
    "Pacific/Easter",
    "Pacific/Efate",
    "Pacific/Enderbury",
    "Pacific/Fakaofo",
    "Pacific/Fiji",
    "Pacific/Funafuti",
    "Pacific/Galapagos",
    "Pacific/Gambier",
    "Pacific/Guadalcanal",
    "Pacific/Guam",
    "Pacific/Honolulu",
    "Pacific/Kiritimati",
    "Pacific/Kosrae",
    "Pacific/Kwajalein",
    "Pacific/Majuro",
    "Pacific/Marquesas",
    "Pacific/Midway",
    "Pacific/Nauru",
    "Pacific/Niue",
    "Pacific/Norfolk",
    "Pacific/Noumea",
    "Pacific/Pago_Pago",
    "Pacific/Palau",
    "Pacific/Pitcairn",
    "Pacific/Pohnpei",
    "Pacific/Port_Moresby",
    "Pacific/Rarotonga",
    "Pacific/Saipan",
    "Pacific/Tahiti",
    "Pacific/Tarawa",
    "Pacific/Tongatapu",
    "Pacific/Wake",
    "Pacific/Wallis",
    "UTC"
  ];
  var timezones_default = fallbackTimezones;

  // mytime/js/support/timezones.js
  var timezones = {
    getTimezones: function() {
      if (typeof Intl.supportedValuesOf === "function") {
        return [.../* @__PURE__ */ new Set(["UTC", ...Intl.supportedValuesOf("timeZone")])];
      }
      return timezones_default;
    },
    convertDate2Timezone: function(date, tzString) {
      return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString })
      );
    },
    getCurrentTimezone: function() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    },
    attrSelect: function(wid_attr, options) {
      var line = {};
      if (wid_attr === "timezone") {
        options = this.getTimezones();
        var html = "";
        var currentTimezone = vis.widgets[vis.activeWidgets].data.timezone || this.getCurrentTimezone();
        for (var i = 0; i < options.length; i++) {
          if (options[i] === currentTimezone) {
            html += `<option value="${options[i]}" selected="selected">${options[i]}</option>`;
          } else {
            html += `<option value="${options[i]}">${options[i]}</option>`;
          }
        }
        line = {
          input: `<select type="text" id="inspect_${wid_attr}">${html}</select>`
        };
      }
      return line;
    }
  };
  var timezones_default2 = timezones;

  // mytime/js/support/serverSync.js
  var serverSync = {
    calcServerTimeDiff: function() {
      return __async(this, null, function* () {
        try {
          let serverTime = yield this.sendToAsync("mytime.0", "getServerTime");
          let now = (/* @__PURE__ */ new Date()).getTime();
          this.serversync.serverTimeDiff = now - serverTime;
          this.serversync.retryDelay = 1e3;
          setTimeout(() => {
            this.calcServerTimeDiff();
          }, 15e3);
        } catch (error) {
          console.log("Error retrieving server time:", error);
          const retryDelay = this.serversync.retryDelay || 1e3;
          this.serversync.retryDelay = Math.min(retryDelay * 2, 6e4);
          setTimeout(() => {
            this.calcServerTimeDiff();
          }, retryDelay);
        }
      });
    },
    sendToAsync: function(instance, command, sendData) {
      return __async(this, null, function* () {
        return new Promise((resolve, reject) => {
          try {
            if (!vis.conn) {
              reject("no vis.conn object");
              return;
            }
            vis.conn.sendTo(instance, command, sendData, function(receiveData) {
              resolve(receiveData);
            });
          } catch (error) {
            reject(error);
          }
        });
      });
    }
  };
  var serverSync_default = serverSync;

  // mytime/js/support/clock.js
  var clock = {
    getClockDate: function(data) {
      var now = Date.now();
      if ((data.clock_time_source || "client") === "server") {
        now -= vis.binds["mytime"].serversync.serverTimeDiff || 0;
      }
      return new Date(now);
    },
    getClockParts: function(data) {
      var date = vis.binds["mytime"].getClockDate(data);
      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
      };
    },
    formatClockDate: function(date, format) {
      var pad = vis.binds["mytime"].pad;
      var values = {
        YYYY: pad(date.getFullYear(), 4),
        YY: pad(date.getFullYear() % 100, 2),
        MM: pad(date.getMonth() + 1, 2),
        M: date.getMonth() + 1,
        DD: pad(date.getDate(), 2),
        D: date.getDate(),
        HH: pad(date.getHours(), 2),
        H: date.getHours(),
        mm: pad(date.getMinutes(), 2),
        m: date.getMinutes(),
        ss: pad(date.getSeconds(), 2),
        s: date.getSeconds()
      };
      return (format || "DD.MM.YYYY HH:mm:ss").replace(/YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g, (token) => values[token]);
    }
  };
  var clock_default = clock;

  // mytime/js/support/support.js
  var support_default = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, runtime_default), countdown_default), timezones_default2), serverSync_default), clock_default);

  // mytime/js/mytime.js
  fetch("widgets/mytime/myi18n/translations.json").then((response) => response.json()).then((i18n) => $.extend(true, systemDictionary, i18n));
  vis.binds.mytime = __spreadValues({
    version,
    showVersion() {
      if (this.version) {
        console.log(`Version mytime: ${this.version}`);
        this.version = null;
      }
    },
    intervals: [],
    serversync: {},
    countdownnixie: countdownNixie_default,
    countdownflip: countdownFlip_default,
    countdowncircle: countdownCircle_default,
    reversecountdownplain: reverseCountdownPlain_default,
    countdownplain: countdownPlain_default,
    wordclock: wordclock_default,
    clockplain: clockPlain_default,
    clocknixie: clockNixie_default,
    clockflip: clockFlip_default
  }, support_default);
  vis.binds.mytime.showVersion();
  vis.binds.mytime.calcServerTimeDiff();

  // mytime/js/wc_langPack_CH_BERN.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "CH_BERN",
    letterSet: [
      ["\xC4", "S", "M", "I", "S", "C", "H", "U", "F", "\xDC", "F"],
      ["Z", "\xC4", "H", "N", "Z", "W", "\xC4", "N", "Z", "G", "I"],
      ["N", "A", "B", "H", "V", "I", "E", "R", "T", "U", "L"],
      ["V", "O", "R", "N", "A", "B", "H", "A", "U", "B", "I"],
      ["E", "I", "S", "S", "Z", "W", "\xD6", "I", "W", "E", "I"],
      ["D", "R", "\xDC", "\xDC", "E", "A", "V", "I", "E", "R", "I"],
      ["F", "\xDC", "F", "I", "N", "S", "\xC4", "C", "H", "S", "I"],
      ["S", "I", "B", "N", "I", "I", "A", "C", "H", "T", "I"],
      ["N", "\xDC", "N", "I", "Z", "\xC4", "H", "N", "I", "L", "F"],
      ["E", "U", "F", "I", "F", "Z", "W", "\xD6", "U", "F", "I"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "\xC4S ISCH ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "EIS",
        "ZW\xD6I",
        "DR\xDC\xDC",
        "VIERI",
        "F\xDCFI",
        "S\xC4CHSI",
        "SIBNI",
        "ACHTI",
        "N\xDCNI",
        "Z\xC4HNI",
        "EUFI",
        "ZW\xD6UFI"
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += h == 1 ? "EIS" : hourNames[h - 1];
          break;
        case 5:
          ret += `F\xDCF AB ${hourNames[h - 1]}`;
          break;
        case 10:
          ret += `Z\xC4H AB ${hourNames[h - 1]}`;
          break;
        case 15:
          ret += `VIERTU AB ${hourNames[h - 1]}`;
          break;
        case 20:
          ret += `ZW\xC4NZG AB ${hourNames[h - 1]}`;
          break;
        case 25:
          ret += `F\xDCF VOR HAUBI ${hourNames[h % 12]}`;
          break;
        case 30:
          ret += `HAUBI ${hourNames[h % 12]}`;
          break;
        case 35:
          ret += `F\xDCF AB HAUBI ${hourNames[h % 12]}`;
          break;
        case 40:
          ret += `ZW\xC4NZG VOR ${hourNames[h % 12]}`;
          break;
        case 45:
          ret += `VIERTU VOR ${hourNames[h % 12]}`;
          break;
        case 50:
          ret += `Z\xC4H VOR ${hourNames[h % 12]}`;
          break;
        case 55:
          ret += `F\xDCF VOR ${hourNames[h % 12]}`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_DE.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "DE",
    letterSet: [
      ["E", "S", "T", "I", "S", "T", "I", "M", "E", "I", "N", "E"],
      ["V", "I", "E", "R", "T", "E", "L", "A", "Z", "E", "H", "N"],
      ["Z", "W", "A", "N", "Z", "I", "G", "F", "\xDC", "N", "F", "N"],
      ["N", "A", "C", "H", "V", "O", "R", "D", "H", "A", "L", "B"],
      ["D", "A", "T", "Z", "W", "\xD6", "L", "F", "E", "I", "N", "S"],
      ["Z", "W", "E", "I", "D", "R", "E", "I", "V", "I", "E", "R"],
      ["F", "\xDC", "N", "F", "S", "E", "C", "H", "S", "E", "L", "F"],
      ["E", "S", "I", "E", "B", "E", "N", "A", "C", "H", "T", "T"],
      ["N", "E", "U", "N", "I", "Z", "E", "H", "N", "U", "H", "R"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "ES IST ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "EINS ",
        "ZWEI ",
        "DREI ",
        "VIER ",
        "F\xDCNF ",
        "SECHS ",
        "SIEBEN ",
        "ACHT ",
        "NEUN ",
        "ZEHN ",
        "ELF ",
        "ZW\xD6LF "
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += `${h == 1 ? "EIN " : hourNames[h - 1]}UHR`;
          break;
        case 5:
          ret += `F\xDCNF NACH ${hourNames[h - 1]}`;
          break;
        case 10:
          ret += `ZEHN NACH ${hourNames[h - 1]}`;
          break;
        case 15:
          ret += `VIERTEL NACH ${hourNames[h - 1]}`;
          break;
        case 20:
          ret += `ZWANZIG NACH ${hourNames[h - 1]}`;
          break;
        case 25:
          ret += `F\xDCNF VOR HALB ${hourNames[h % 12]}`;
          break;
        case 30:
          ret += `HALB ${hourNames[h % 12]}`;
          break;
        case 35:
          ret += `F\xDCNF NACH HALB ${hourNames[h % 12]}`;
          break;
        case 40:
          ret += `ZWANZIG VOR ${hourNames[h % 12]}`;
          break;
        case 45:
          ret += `VIERTEL VOR ${hourNames[h % 12]}`;
          break;
        case 50:
          ret += `ZEHN VOR ${hourNames[h % 12]}`;
          break;
        case 55:
          ret += `F\xDCNF VOR ${hourNames[h % 12]}`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_DE_SWG.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "DE_SWG",
    letterSet: [
      ["E", "S", "K", "I", "S", "C", "H", "F", "U", "N", "K"],
      ["D", "R", "E", "I", "V", "I", "E", "R", "T", "L", "A"],
      ["Z", "E", "H", "N", "B", "I", "E", "F", "\xDC", "N", "F"],
      ["N", "A", "C", "H", "G", "E", "R", "T", "V", "O", "R"],
      ["H", "A", "L", "B", "X", "F", "\xDC", "N", "F", "E", "I"],
      ["O", "I", "S", "E", "C", "H", "S", "E", "L", "F", "E"],
      ["Z", "W", "O", "I", "E", "A", "C", "H", "T", "E", "D"],
      ["D", "R", "E", "I", "E", "Z", "W", "\xD6", "L", "F", "E"],
      ["Z", "E", "H", "N", "E", "U", "N", "E", "U", "H", "L"],
      ["S", "I", "E", "B", "N", "E", "V", "I", "E", "R", "E"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "ES ISCH ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "OISE",
        "ZWOIE",
        "DREIE",
        "VIERE",
        "F\xDCNFE",
        "SECHSE",
        "SIEBNE",
        "ACHTE",
        "NEUNE",
        "ZEHNE",
        "ELFE",
        "ZW\xD6LFE"
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += hourNames[h - 1];
          break;
        case 5:
          ret += `F\xDCNF NACH ${hourNames[h - 1]}`;
          break;
        case 10:
          ret += `ZEHN NACH ${hourNames[h - 1]}`;
          break;
        case 15:
          ret += `VIERTL ${hourNames[h % 12]}`;
          break;
        case 20:
          ret += `ZEHN VOR HALB ${hourNames[h % 12]}`;
          break;
        case 25:
          ret += `F\xDCNF VOR HALB ${hourNames[h % 12]}`;
          break;
        case 30:
          ret += `HALB ${hourNames[h % 12]}`;
          break;
        case 35:
          ret += `F\xDCNF NACH HALB ${hourNames[h % 12]}`;
          break;
        case 40:
          ret += `ZEHN NACH HALB ${hourNames[h % 12]}`;
          break;
        case 45:
          ret += `DREIVIERTL ${hourNames[h % 12]}`;
          break;
        case 50:
          ret += `ZEHN VOR ${hourNames[h % 12]}`;
          break;
        case 55:
          ret += `F\xDCNF VOR ${hourNames[h % 12]}`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_EN.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "EN",
    letterSet: [
      ["I", "T", "E", "I", "S", "Z", "S", "J", "U", "S", "T"],
      ["A", "F", "T", "E", "R", "N", "E", "A", "R", "L", "Y"],
      ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "K", "O"],
      ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"],
      ["H", "A", "L", "F", "C", "T", "E", "N", "E", "T", "O"],
      ["P", "A", "S", "T", "B", "S", "E", "V", "E", "N", "L"],
      ["O", "N", "E", "T", "W", "O", "T", "H", "R", "E", "E"],
      ["F", "O", "U", "R", "F", "I", "V", "E", "S", "I", "X"],
      ["N", "I", "N", "E", "K", "T", "W", "E", "L", "V", "E"],
      ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"],
      ["T", "E", "N", "P", "Y", "O", "C", "L", "O", "C", "K"]
    ],
    timeString: function(h, m, settings = { round: false, fuzzyTime: "none" }) {
      var ret = "IT IS ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "ONE",
        "TWO",
        "THREE",
        "FOUR",
        "FIVE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINE",
        "TEN",
        "ELEVEN",
        "TWELVE"
      ];
      if ((settings.fuzzyTime == "both" || settings.fuzzyTime == "after") && m % 5 <= 2 && m % 5 != 0) {
        ret += "JUST AFTER ";
      }
      if ((settings.fuzzyTime == "both" || settings.fuzzyTime == "before") && m % 5 >= 3) {
        if (m > 55) {
          h = (h + 1) % 12;
          if (h == 0) {
            h = 12;
          }
        }
        ret += "NEARLY ";
      }
      switch ((settings.round || settings.fuzzyTime == "both" || settings.fuzzyTime == "before" ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += `${hourNames[h - 1]} OCLOCK`;
          break;
        case 5:
          ret += `FIVE PAST ${hourNames[h - 1]}`;
          break;
        case 10:
          ret += `TEN PAST ${hourNames[h - 1]}`;
          break;
        case 15:
          ret += `A QUARTER PAST ${hourNames[h - 1]}`;
          break;
        case 20:
          ret += `TWENTY PAST ${hourNames[h - 1]}`;
          break;
        case 25:
          ret += `TWENTYFIVE PAST ${hourNames[h - 1]}`;
          break;
        case 30:
          ret += `HALF PAST ${hourNames[h - 1]}`;
          break;
        case 35:
          ret += `TWENTYFIVE TO ${hourNames[h % 12]}`;
          break;
        case 40:
          ret += `TWENTY TO ${hourNames[h % 12]}`;
          break;
        case 45:
          ret += `A QUARTER TO ${hourNames[h % 12]}`;
          break;
        case 50:
          ret += `TEN TO ${hourNames[h % 12]}`;
          break;
        case 55:
          ret += `FIVE TO ${hourNames[h % 12]}`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_NL.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "NL",
    letterSet: [
      ["H", "E", "T", "K", "I", "S", "A", "V", "I", "J", "F"],
      ["T", "I", "E", "N", "A", "T", "Z", "V", "O", "O", "R"],
      ["O", "V", "E", "R", "M", "E", "K", "W", "A", "R", "T"],
      ["H", "A", "L", "F", "S", "P", "M", "O", "V", "E", "R"],
      ["V", "O", "O", "R", "T", "H", "G", "E", "E", "N", "S"],
      ["T", "W", "E", "E", "A", "M", "C", "D", "R", "I", "E"],
      ["V", "I", "E", "R", "V", "I", "J", "F", "Z", "E", "S"],
      ["Z", "E", "V", "E", "N", "O", "N", "E", "G", "E", "N"],
      ["A", "C", "H", "T", "T", "I", "E", "N", "E", "L", "F"],
      ["T", "W", "A", "A", "L", "F", "P", "M", "U", "U", "R"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "HET IS ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "EEN",
        "TWEE",
        "DRIE",
        "VIER",
        "VIJF",
        "ZES",
        "ZEVEN",
        "ACHT",
        "NEGEN",
        "TIEN",
        "ELF",
        "TWAALF"
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += `${h == 1 ? "EEN" : hourNames[h - 1]} UUR`;
          break;
        case 5:
          ret += `VIJF OVER ${hourNames[h - 1]}`;
          break;
        case 10:
          ret += `TIEN OVER ${hourNames[h - 1]}`;
          break;
        case 15:
          ret += `KWART OVER ${hourNames[h - 1]}`;
          break;
        case 20:
          ret += `TIEN VOOR HALF ${hourNames[h - 1]}`;
          break;
        case 25:
          ret += `VIJF VOOR HALF ${hourNames[h % 12]}`;
          break;
        case 30:
          ret += `HALF ${hourNames[h % 12]}`;
          break;
        case 35:
          ret += `VIJF OVER HALF ${hourNames[h % 12]}`;
          break;
        case 40:
          ret += `TIEN OVER HALF ${hourNames[h % 12]}`;
          break;
        case 45:
          ret += `KWART OVER ${hourNames[h % 12]}`;
          break;
        case 50:
          ret += `TIEN VOOR ${hourNames[h % 12]}`;
          break;
        case 55:
          ret += `VIJF VOOR ${hourNames[h % 12]}`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_IT.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "IT",
    letterSet: [
      ["S", "O", "N", "O", "R", "L", "E", "B", "O", "R", "E"],
      ["\xC8", "R", "L", "'", "U", "N", "A", "D", "U", "E", "Z"],
      ["T", "R", "E", "O", "T", "T", "O", "N", "O", "V", "E"],
      ["D", "I", "E", "C", "I", "U", "N", "D", "I", "C", "I"],
      ["D", "O", "D", "I", "C", "I", "S", "E", "T", "T", "E"],
      ["Q", "U", "A", "T", "T", "R", "O", "C", "S", "E", "I"],
      ["C", "I", "N", "Q", "U", "E", "S", "M", "E", "N", "O"],
      ["E", "C", "U", "N", "O", "Q", "U", "A", "R", "T", "O"],
      ["V", "E", "N", "T", "I", "C", "I", "N", "Q", "U", "E"],
      ["D", "I", "E", "C", "I", "E", "M", "E", "Z", "Z", "A"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "";
      h %= 12;
      var min = (settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60;
      var hourNames = [
        "DODICI ",
        "UNA ",
        "DUE ",
        "TRE ",
        "QUATTRO ",
        "CINQUE ",
        "SEI ",
        "SETTE ",
        "OTTO ",
        "NOVE ",
        "DIECI ",
        "UNDICI "
      ];
      if (h == 1 && min < 30 || h == 0 && min > 30) {
        ret += "\xC8 L' ";
      } else {
        ret += "SONO LE ORE ";
      }
      if (min >= 5) {
        if (min < 35) {
          ret += `${hourNames[h]}E `;
        } else {
          ret += `${hourNames[h + 1 == 12 ? 0 : h + 1]}MENO `;
        }
      }
      switch (min) {
        case 0:
          ret += hourNames[h];
          break;
        case 5:
          ret += "CINQUE ";
          break;
        case 10:
          ret += "DIECI ";
          break;
        case 15:
          ret += "UN QUARTO ";
          break;
        case 20:
          ret += "VENTI ";
          break;
        case 25:
          ret += "VENTICINQUE ";
          break;
        case 30:
          ret += "MEZZA ";
          break;
        case 35:
          ret += "VENTICINQUE ";
          break;
        case 40:
          ret += "VENTI ";
          break;
        case 45:
          ret += "UN QUARTO ";
          break;
        case 50:
          ret += "DIECI ";
          break;
        case 55:
          ret += "CINQUE ";
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_FR.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "fr-CA",
    letterSet: [
      ["I", "L", "W", "E", "S", "T", "B", "S", "I", "X", "G"],
      ["U", "N", "D", "E", "U", "X", "T", "R", "A", "I", "S"],
      ["Q", "U", "A", "T", "R", "E", "D", "O", "U", "Z", "E"],
      ["C", "I", "N", "Q", "S", "E", "P", "T", "D", "I", "X"],
      ["H", "U", "I", "T", "F", "N", "E", "U", "F", "K", "I"],
      ["O", "N", "Z", "E", "C", "H", "E", "U", "R", "E", "S"],
      ["E", "T", "D", "U", "T", "R", "E", "N", "T", "E", "R"],
      ["M", "O", "I", "N", "S", "H", "D", "E", "M", "I", "K"],
      ["D", "I", "X", "Z", "Q", "U", "A", "R", "T", "S", "D"],
      ["G", "A", "M", "V", "T", "U", "A", "R", "T", "U", "C"],
      ["V", "I", "N", "G", "T", "-", "C", "I", "N", "Q", "R"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "IL EST ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "UN",
        "DEUX",
        "TROIS",
        "QUATRE",
        "CINQ",
        "SIX",
        "SEPT",
        "HUIT",
        "NEUF",
        "DIX",
        "ONZE",
        "DOUZE"
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += `${hourNames[h - 1]} HEURES`;
          break;
        case 5:
          ret += `${hourNames[h - 1]} HEURES CINQ`;
          break;
        case 10:
          ret += `${hourNames[h - 1]} HEURES DIX`;
          break;
        case 15:
          ret += `${hourNames[h - 1]} HEURES ET QUART`;
          break;
        case 20:
          ret += `${hourNames[h - 1]} HEURES ET VINGT`;
          break;
        case 25:
          ret += `${hourNames[h - 1]} HEURES ET VINGT-CINQ`;
          break;
        case 30:
          ret += `${hourNames[h - 1]} HEURES ET DEMI`;
          break;
        case 35:
          ret += `${hourNames[h - 1]} HEURES TRENTE CINQ`;
          break;
        case 40:
          ret += `${hourNames[h % 12]} HEURES MOINS VINGT`;
          break;
        case 45:
          ret += `${hourNames[h % 12]} HEURES MOINS QUART`;
          break;
        case 50:
          ret += `${hourNames[h % 12]} HEURES MOINS DIX`;
          break;
        case 55:
          ret += `${hourNames[h % 12]} HEURES MOINS CINQ`;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_RU.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "RU",
    letterSet: [
      ["\u041E", "\u0414", "\u0418", "\u041D", "\u041F", "\u042F", "\u0422", "\u042C", "\u0414", "\u0412", "\u0410"],
      ["\u0414", "\u0415", "\u0428", "\u0415", "\u0421", "\u0422", "\u042C", "\u0412", "\u042F", "\u0422", "\u042C"],
      ["\u0412", "\u041E", "\u0427", "\u0415", "\u0421", "\u0415", "\u041C", "\u042C", "\u0422", "\u0420", "\u0418"],
      ["\u0422", "\u042B", "\u0414", "\u0412", "\u0415", "\u0420", "\u0415", "\u0421", "\u042F", "\u0422", "\u042C"],
      ["\u041D", "\u0410", "\u0414", "\u0426", "\u0410", "\u0422", "\u042C", "\u0427", "\u0410", "\u0421", "\u0410"],
      ["\u0427", "\u0410", "\u0421", "\u041E", "\u0412", "\u0414", "\u0421", "\u041E", "\u0420", "\u041E", "\u041A"],
      ["\u0422", "\u0420", "\u0418", "\u0414", "\u0412", "\u0410", "\u0414", "\u041F", "\u042F", "\u0422", "\u042C"],
      ["\u041F", "\u042F", "\u0422", "\u041D", "\u0410", "\u0414", "\u0415", "\u0426", "\u0410", "\u0422", "\u042C"],
      ["\u0410", "\u041C", "\u0414", "\u0415", "\u0421", "\u042F", "\u0422", "\u0421", "\u042F", "\u0422", "\u042C"],
      ["\u041F", "\u042F", "\u0422", "\u042C", "\u042F", "\u0420", "\u041C", "\u0418", "\u041D", "\u0423", "\u0422"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "\u0421\u0415\u0419\u0427\u0410\u0421 ";
      h %= 12;
      if (h == 0) {
        h = 12;
      }
      var hourNames = [
        "\u0427\u0410\u0421 ",
        "\u0414\u0412\u0410 \u0427\u0410\u0421\u0410 ",
        "\u0422\u0420\u0418 \u0427\u0410\u0421\u0410 ",
        "\u0427\u0415 \u0422\u042B \u0420\u0415 \u0427\u0410\u0421\u0410 ",
        "\u041F\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0428\u0415\u0421\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0421\u0415\u041C\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0412\u041E \u0421\u0415\u041C\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0414\u0415 \u0412\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0414\u0415 \u0421\u042F\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u041E\u0414\u0418\u041D \u041D\u0410\u0414\u0426\u0410\u0422\u042C \u0427\u0410\u0421\u041E\u0412 ",
        "\u0414\u0412\u0415 \u041D\u0410\u0414\u0426\u0410\u0422\u042C \u0427\u0410\u0421\u041E\u0412 "
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += hourNames[h - 1];
          break;
        case 5:
          ret += `${hourNames[h]}\u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 10:
          ret += `${hourNames[h]}\u0414\u0415 \u0421\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 15:
          ret += `${hourNames[h]}\u041F\u042F\u0422\u041D\u0410\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 20:
          ret += `${hourNames[h]}\u0414\u0412\u0410\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 25:
          ret += `${hourNames[h]}\u0414\u0412\u0410\u0414 \u0426\u0410\u0422\u042C \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 30:
          ret += `${hourNames[h]}\u0422\u0420\u0418\u0414 \u0426\u0410\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 35:
          ret += `${hourNames[h]}\u0422\u0420\u0418\u0414 \u0426\u0410\u0422\u042C \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 40:
          ret += `${hourNames[h]}\u0421\u041E\u0420\u041E\u041A \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 45:
          ret += `${hourNames[h]}\u0421\u041E\u0420\u041E\u041A \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 50:
          ret += `${hourNames[h]}\u041F\u042F\u0422\u042C \u0414\u0415\u0421\u042F\u0422 \u041C\u0418\u041D\u0423\u0422 `;
          break;
        case 55:
          ret += `${hourNames[h]}\u041F\u042F\u0422\u042C \u0414\u0415\u0421\u042F\u0422 \u041F\u042F\u0422\u042C \u041C\u0418\u041D\u0423\u0422 `;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_ES.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "ES",
    letterSet: [
      ["E", "S", "O", "N", "E", "L", "A", "S", "U", "N", "A"],
      ["D", "O", "S", "I", "T", "R", "E", "S", "O", "A", "M"],
      ["C", "U", "A", "T", "R", "O", "C", "I", "N", "C", "O"],
      ["S", "E", "I", "S", "A", "S", "I", "E", "T", "E", "N"],
      ["O", "C", "H", "O", "N", "U", "E", "V", "E", "P", "M"],
      ["L", "A", "D", "I", "E", "Z", "S", "O", "N", "C", "E"],
      ["D", "O", "C", "E", "L", "Y", "M", "E", "N", "O", "S"],
      ["O", "V", "E", "I", "N", "T", "E", "D", "I", "E", "Z"],
      ["V", "E", "I", "N", "T", "I", "C", "I", "N", "C", "O"],
      ["M", "E", "D", "I", "A", "C", "U", "A", "R", "T", "O"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "";
      h %= 12;
      var hourNames = [
        "SON LAS DOCE ",
        "ES LA UNA ",
        "SON LAS DOS  ",
        "SON LAS TRES ",
        "SON LAS CUATRO ",
        "SON LAS CINCO ",
        "SON LAS SEIS ",
        "SON LAS SIETE ",
        "SON LAS OCHO ",
        "SON LAS NUEVE ",
        "SON LAS DIEZ ",
        "SON LAS ONCE "
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += hourNames[h];
          break;
        case 5:
          ret += `${hourNames[h]}Y CINCO `;
          break;
        case 10:
          ret += `${hourNames[h]}Y DIEZ `;
          break;
        case 15:
          ret += `${hourNames[h]}Y CUARTO `;
          break;
        case 20:
          ret += `${hourNames[h]}Y VEINTE `;
          break;
        case 25:
          ret += `${hourNames[h]}Y VEINTICINCO `;
          break;
        case 30:
          ret += `${hourNames[h]}Y MEDIA `;
          break;
        case 35:
          ret += `${hourNames[h]}MENOS VEINTICINCO `;
          break;
        case 40:
          ret += `${hourNames[h]}MENOS VEINTE `;
          break;
        case 45:
          ret += `${hourNames[h]}MENOS CUARTO `;
          break;
        case 50:
          ret += `${hourNames[h]}MENOS DIEZ `;
          break;
        case 55:
          ret += `${hourNames[h]}MENOS DIEZ `;
          break;
      }
      return ret;
    }
  });

  // mytime/js/wc_langPack_TR.js
  vis.binds["mytime"].wordclock.addLanguage({
    langCode: "TR",
    letterSet: [
      ["S", "A", "A", "T", "R", "O", "N", "U", "\xDC", "\xC7", "\xDC"],
      ["B", "\u0130", "R", "\u0130", "A", "L", "T", "I", "Y", "I", "D"],
      ["\u0130", "K", "\u0130", "Y", "\u0130", "D", "O", "K", "U", "Z", "U"],
      ["D", "\xD6", "R", "D", "\xDC", "Y", "E", "D", "\u0130", "Y", "\u0130"],
      ["S", "E", "K", "I", "Z", "\u0130", "Y", "A", "R", "I", "M"],
      ["D", "\xD6", "R", "T", "A", "M", "S", "B", "E", "\u015E", "\u0130"],
      ["K", "P", "M", "O", "T", "U", "Z", "K", "I", "R", "K"],
      ["E", "L", "L", "\u0130", "O", "N", "Y", "\u0130", "R", "M", "\u0130"],
      ["B", "U", "\xC7", "U", "K", "\xC7", "E", "Y", "R", "E", "K"],
      ["B", "E", "\u015E", "M", "G", "E", "\xC7", "\u0130", "Y", "O", "R"]
    ],
    timeString: function(h, m, settings = { round: false }) {
      var ret = "SAAT ";
      h %= 12;
      var hourNames1 = [
        "ON \u0130K\u0130 ",
        "B\u0130R ",
        "\u0130K\u0130 ",
        "\xDC\xC7 ",
        "D\xD6RT ",
        "BE\u015E ",
        "ALTI ",
        "YED\u0130 ",
        "SEKIZ ",
        "DOKUZ ",
        "ON ",
        "ON B\u0130R "
      ];
      var hourNames2 = [
        "ON \u0130K\u0130Y\u0130 ",
        "B\u0130R\u0130 ",
        "\u0130K\u0130Y\u0130 ",
        "\xDC\xC7\xDC ",
        "D\xD6RD\xDC ",
        "BE\u015E\u0130 ",
        "ALTIYI ",
        "YED\u0130Y\u0130 ",
        "SEKIZ\u0130 ",
        "DOKUZU ",
        "ONU ",
        "ON B\u0130R\u0130 "
      ];
      switch ((settings.round ? Math.round(m / 5) * 5 : Math.floor(m / 5) * 5) % 60) {
        case 0:
          ret += `${hourNames1[h]} `;
          break;
        case 5:
          ret += `${hourNames2[h]}BE\u015E GE\xC7\u0130YOR `;
          break;
        case 10:
          ret += `${hourNames2[h]}ON GE\xC7\u0130YOR `;
          break;
        case 15:
          ret += `${hourNames2[h]}ON BE\u015E GE\xC7\u0130YOR `;
          break;
        case 20:
          ret += `${hourNames2[h]}Y\u0130RM\u0130 GE\xC7\u0130YOR `;
          break;
        case 25:
          ret += `${hourNames2[h]}Y\u0130RM\u0130 BE\u015E GE\xC7\u0130YOR `;
          break;
        case 30:
          ret += `${hourNames1[h]}BU\xC7UK `;
          break;
        case 35:
          ret += `${hourNames2[h]}OTUZ  BE\u015E GE\xC7\u0130YOR `;
          break;
        case 40:
          ret += `${hourNames2[h]}KIRK GE\xC7\u0130YOR `;
          break;
        case 45:
          ret += `${hourNames2[h]}KIRK BE\u015E GE\xC7\u0130YOR `;
          break;
        case 50:
          ret += `${hourNames2[h]}ELL\u0130 GE\xC7\u0130YOR `;
          break;
        case 55:
          ret += `${hourNames2[h]}ELL\u0130 BE\u015E GE\xC7\u0130YOR `;
          break;
      }
      return ret;
    }
  });
})();
//# sourceMappingURL=mytime-dist.js.map

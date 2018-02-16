/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function (a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }

    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl)
            }
            ck[a] = e
        }
        return ck[a]
    }

    function cu(a, b) {
        var c = {};
        f.each(cq.concat.apply([], cq.slice(0, b)), function () {
            c[this] = a
        });
        return c
    }

    function ct() {
        cr = b
    }

    function cs() {
        setTimeout(ct, 0);
        return cr = f.now()
    }

    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function ci() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        if (j) {
            j !== f[0] && f.unshift(j);
            return d[j]
        }
    }

    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function (b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        }); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b)
    }

    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g));
        return l
    }

    function bZ(a) {
        return function (b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }

    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function bo(a) {
        var b = c.createElement("div");
        bh.appendChild(b), b.innerHTML = a.outerHTML;
        return b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        if (b.nodeType === 1) {
            b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
            if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
                if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
            } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
            b.removeAttribute(f.expando)
        }
    }

    function bj(a, b) {
        if (b.nodeType === 1 && !!f.hasData(a)) {
            var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function (a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function (a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function (a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function () {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {
                }
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }

    var c = a.document, d = a.navigator, e = a.location, f = function () {
        function J() {
            if (!e.isReady) {
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
        }

        var e = function (a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/,
            m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g,
            r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/,
            u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function (a, b) {
                return (b + "").toUpperCase()
            }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty,
            E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf,
            I = {};
        e.fn = e.prototype = {
            constructor: e, init: function (a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) {
                    this.context = this[0] = a, this.length = 1;
                    return this
                }
                if (a === "body" && !d && c.body) {
                    this.context = c, this[0] = c.body, this.selector = a, this.length = 1;
                    return this
                }
                if (typeof a == "string") {
                    a.charAt(0) !== "<" || a.charAt(a.length - 1) !== ">" || a.length < 3 ? g = i.exec(a) : g = [null, a, null];
                    if (g && (g[1] || !d)) {
                        if (g[1]) {
                            d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes);
                            return e.merge(this, a)
                        }
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h
                        }
                        this.context = c, this.selector = a;
                        return this
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                }
                if (e.isFunction(a)) return f.ready(a);
                a.selector !== b && (this.selector = a.selector, this.context = a.context);
                return e.makeArray(a, this)
            }, selector: "", jquery: "1.7.1", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return F.call(this, 0)
            }, get: function (a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
            }, pushStack: function (a, b, c) {
                var d = this.constructor();
                e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")");
                return d
            }, each: function (a, b) {
                return e.each(this, a, b)
            }, ready: function (a) {
                e.bindReady(), A.add(a);
                return this
            }, eq: function (a) {
                a = +a;
                return a === -1 ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(e.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: E, sort: [].sort, splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function () {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
            }
            return i
        }, e.extend({
            noConflict: function (b) {
                a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f);
                return e
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? e.readyWait++ : e.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!A) {
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {
                        }
                        c.documentElement.doScroll && b && J()
                    }
                }
            }, isFunction: function (a) {
                return e.type(a) === "function"
            }, isArray: Array.isArray || function (a) {
                return e.type(a) === "array"
            }, isWindow: function (a) {
                return a && typeof a == "object" && "setInterval" in a
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return a == null ? String(a) : I[C.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                } catch (c) {
                    return !1
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d)
            }, isEmptyObject: function (a) {
                for (var b in a) return !1;
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                e.error("Invalid JSON: " + b)
            }, parseXML: function (c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                } catch (g) {
                    d = b
                }
                (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c);
                return d
            }, noop: function () {
            }, globalEval: function (b) {
                b && j.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(w, "ms-").replace(v, x)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break
                    } else for (; g < h;) if (c.apply(a[g++], d) === !1) break
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break
                } else for (; g < h;) if (c.call(a[g], g, a[g++]) === !1) break;
                return a
            }, trim: G ? function (a) {
                return a == null ? "" : G.call(a)
            } : function (a) {
                return a == null ? "" : (a + "").replace(k, "").replace(l, "")
            }, makeArray: function (a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                }
                return c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) if (c in b && b[c] === a) return c
                }
                return -1
            }, merge: function (a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                a.length = d;
                return a
            }, grep: function (a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d
            }, map: function (a, c, d) {
                var f, g, h = [], i = 0, j = a.length,
                    k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function () {
                    return a.apply(c, f.concat(F.call(arguments)))
                };
                g.guid = a.guid = a.guid || g.guid || e.guid++;
                return g
            }, access: function (a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) e.access(a, j, c[j], f, g, d);
                    return a
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                    return a
                }
                return i ? g(a[0], c) : b
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (d, f) {
                    f && f instanceof e && !(f instanceof a) && (f = a(f));
                    return e.fn.init.call(this, d, f, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a
            }, browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            I["[object " + b + "]"] = b.toLowerCase()
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function () {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
        } : c.attachEvent && (B = function () {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
        });
        return e
    }(), g = {};
    f.Callbacks = function (a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function (b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
        }, n = function (b, f) {
            f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
            for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
        }, o = {
            add: function () {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                }
                return this
            }, remove: function () {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                        if (a.unique) break
                    }
                }
                return this
            }, has: function (a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) if (a === c[b]) return !0
                }
                return !1
            }, empty: function () {
                c = [];
                return this
            }, disable: function () {
                c = d = e = b;
                return this
            }, disabled: function () {
                return !c
            }, lock: function () {
                d = b, (!e || e === !0) && o.disable();
                return this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c));
                return this
            }, fire: function () {
                o.fireWith(this, arguments);
                return this
            }, fired: function () {
                return !!e
            }
        };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function (a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"),
                e = "pending", g = {resolve: b, reject: c, notify: d}, h = {
                    done: b.add, fail: c.add, progress: d.add, state: function () {
                        return e
                    }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                        i.done(a).fail(b).progress(c);
                        return this
                    }, always: function () {
                        i.done.apply(i, arguments).fail.apply(i, arguments);
                        return this
                    }, pipe: function (a, b, c) {
                        return f.Deferred(function (d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function (a, b) {
                                var c = b[0], e = b[1], g;
                                f.isFunction(c) ? i[a](function () {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    }, promise: function (a) {
                        if (a == null) a = h; else for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            i.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i);
            return i
        }, when: function (a) {
            function m(a) {
                return function (b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function (c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            var b = i.call(arguments, 0), c = 0, d = b.length, e = Array(d), g = d, h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function () {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {marginRight: 0}).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in{
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        k.removeChild(q), k = g = h = j = q = i = null, f(function () {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            !r || (j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i))
        });
        return b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando];
            return !!a && !m(a)
        },
        data: function (a, c, d, e) {
            if (!!f.acceptData(a)) {
                var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j, o = c === "events";
                if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
                n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
                if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
                g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d);
                if (o && !h[c]) return g.events;
                k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h;
                return i
            }
        },
        removeData: function (a, b, c) {
            if (!!f.acceptData(a)) {
                var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
                if (!j[k]) return;
                if (b) {
                    d = c ? j[k] : j[k].data;
                    if (d) {
                        f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                        for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                        if (!(c ? m : f.isEmptyObject)(d)) return
                    }
                }
                if (!c) {
                    delete j[k].data;
                    if (!m(j[k])) return
                }
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function (a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function (a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            if (typeof a == "object") return this.each(function () {
                f.data(this, a)
            });
            d = a.split("."), d[1] = d[1] ? "." + d[1] : "";
            if (c === b) {
                h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h));
                return h === b && d[1] ? this.data(d[0]) : h
            }
            return this.each(function () {
                var b = f(this), e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            })
        }, removeData: function (a) {
            return this.each(function () {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        }, _unmark: function (a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            if (a) {
                b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c));
                return d || []
            }
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function () {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function (a, c) {
            typeof a != "string" && (c = a, a = "fx");
            if (c === b) return f.queue(this[0], a);
            return this.each(function () {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                f.dequeue(this, a)
            })
        }, delay: function (a, b) {
            a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx";
            return this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }

            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            m();
            return d.promise()
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function (a, b) {
            return f.access(this, a, b, !0, f.attr)
        }, removeAttr: function (a) {
            return this.each(function () {
                f.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return f.access(this, a, b, !0, f.prop)
        }, removeProp: function (a) {
            a = f.propFix[a] || a;
            return this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g)
                    }
                }
            }
            return this
        }, removeClass: function (a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h)
                    } else g.className = ""
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = typeof b == "boolean";
            if (f.isFunction(a)) return this.each(function (c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            });
            return this.each(function () {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        }, hasClass: function (a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        }, val: function (a) {
            var c, d, e, g = this[0];
            {
                if (!!arguments.length) {
                    e = f.isFunction(a);
                    return this.each(function (d) {
                        var g = f(this), h;
                        if (this.nodeType === 1) {
                            e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function (a) {
                                return a == null ? "" : a + ""
                            })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                            if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
                        }
                    })
                }
                if (g) {
                    c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type];
                    if (c && "get" in c && (d = c.get(g, "value")) !== b) return d;
                    d = g.value;
                    return typeof d == "string" ? d.replace(q, "") : d == null ? "" : d
                }
            }
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    if (j && !h.length && i.length) return f(i[g]).val();
                    return h
                }, set: function (a, b) {
                    var c = f.makeArray(b);
                    f(a).find("option").each(function () {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1);
                    return c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!!a && j !== 3 && j !== 8 && j !== 2) {
                if (e && c in f.attrFn) return f(a)[c](d);
                if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
                i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
                if (d !== b) {
                    if (d === null) {
                        f.removeAttr(a, c);
                        return
                    }
                    if (h && "set" in h && i && (g = h.set(a, d, c)) !== b) return g;
                    a.setAttribute(c, "" + d);
                    return d
                }
                if (h && "get" in h && i && (g = h.get(a, c)) !== null) return g;
                g = a.getAttribute(c);
                return g === null ? b : g
            }
        },
        removeAttr: function (a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        a.setAttribute("type", b), c && (a.value = c);
                        return b
                    }
                }
            }, value: {
                get: function (a, b) {
                    if (w && f.nodeName(a, "button")) return w.get(a, b);
                    return b in a ? a.value : null
                }, set: function (a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!!a && i !== 3 && i !== 8 && i !== 2) {
                h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]);
                return d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function (a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase()));
            return c
        }
    }, v || (y = {name: !0, id: !0}, w = f.valHooks.button = {
        get: function (a, c) {
            var d;
            d = a.getAttributeNode(c);
            return d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        }, set: function (a, b, d) {
            var e = a.getAttributeNode(d);
            e || (e = c.createAttribute(d), a.setAttributeNode(e));
            return e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function (a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function (a, c) {
                if (c === "") {
                    a.setAttribute(b, "auto");
                    return c
                }
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get, set: function (a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function (a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
            return null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = {
            get: function (a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function () {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function (a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/,
        D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function (a) {
            var b = F.exec(a);
            b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)"));
            return b
        }, H = function (a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function (a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function (a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (!(a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a)))) {
                d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function (a) {
                    return typeof f != "undefined" && (!a || f.event.triggered !== a.type) ? f.event.dispatch.apply(i.elem, arguments) : b
                }, i.elem = a), c = f.trim(I(c)).split(" ");
                for (k = 0; k < c.length; k++) {
                    l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: G(g),
                        namespace: n.join(".")
                    }, p), r = j[m];
                    if (!r) {
                        r = j[m] = [], r.delegateCount = 0;
                        if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                    }
                    s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
                }
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!!g && !!(o = g.events)) {
                b = f.trim(I(b || "")).split(" ");
                for (h = 0; h < b.length; h++) {
                    i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                    if (!j) {
                        for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                        continue
                    }
                    p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                    for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                    r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                }
                f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [[e, p.bindType || h]];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n));
                return c.result
            }
        },
        dispatch: function (c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({elem: l, matches: q})
                }
            }
            d.length > e && i.push({elem: this, matches: d.slice(e)});
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode);
                return a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0);
                return a
            }
        },
        fix: function (a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey);
            return h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {setup: f.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = f.extend(new f.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function (a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        }, isDefaultPrevented: J, isPropagationStopped: J, isImmediatePropagationStopped: J
    }, f.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        f.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function (a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        }, teardown: function () {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function () {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function (a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function (a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        }, handle: function (a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        }, teardown: function () {
            f.event.remove(this, "._change");
            return z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var d = 0, e = function (a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0)
        };
        f.event.special[b] = {
            setup: function () {
                d++ === 0 && c.addEventListener(a, e, !0)
            }, teardown: function () {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function (a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            g === 1 && (h = e, e = function (a) {
                f().off(a);
                return h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++));
            return this.each(function () {
                f.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        }, off: function (a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler);
                return this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            d === !1 && (d = J);
            return this.each(function () {
                f.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            f(this.context).on(a, this.selector, b, c);
            return this
        }, die: function (a, b) {
            f(this.context).off(a, this.selector || "**", b);
            return this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                f.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        }, toggle: function (a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function (c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault();
                return b[e].apply(this, arguments) || !1
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        f.fn[b] = function (a, c) {
            c == null && (c = a, a = null);
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }), function () {
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1,
            i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            i = !1;
            return 0
        });
        var m = function (b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length === 1 && (w[0] === "~" || w[0] === "+") && d.parentNode ? d.parentNode : d, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                } else k = w = []
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            l && (m(l, h, e, f), m.uniqueSort(e));
            return e
        };
        m.uniqueSort = function (a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []);
            return {set: d, expr: a}
        }, m.filter = function (a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break
                    }
                }
                if (a === q) if (g == null) m.error(a); else break;
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                } else if (d === 3 || d === 4) return a.nodeValue
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                    }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                }, "": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                }, "~": function (a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c
                    }
                }, TAG: function (a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a, b) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else a[2] && m.error(a[0]);
                    a[0] = e++;
                    return a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " ");
                    return a
                }, PSEUDO: function (b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        d || e.push.apply(e, g);
                        return !1
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b
                }, POS: function (a) {
                    a.unshift(!0);
                    return a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && a.type !== "hidden"
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    a.parentNode && a.parentNode.selectedIndex;
                    return a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                }, radio: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                }, checkbox: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                }, file: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type
                }, password: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type
                }, image: function (a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button"
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return b === 0
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return b % 2 === 0
                }, odd: function (a, b) {
                    return b % 2 === 1
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                            if (k === "first") return !0;
                            l = a;
                        case"last":
                            while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                            return !0;
                        case"nth":
                            c = b[2], e = b[3];
                            if (c === 1 && e === 0) return !0;
                            f = b[0], g = a.parentNode;
                            if (g && (g[d] !== f || !a.nodeIndex)) {
                                i = 0;
                                for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                g[d] = f
                            }
                            j = a.nodeIndex - e;
                            return c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1],
                        d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                        e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d)
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function (a, b) {
            a = Array.prototype.slice.call(a, 0);
            if (b) {
                b.push.apply(b, a);
                return b
            }
            return a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (!a.compareDocumentPosition || !b.compareDocumentPosition) return a.compareDocumentPosition ? -1 : 1;
            return a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function (a, b) {
            if (a === b) {
                h = !0;
                return 0
            }
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function (a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }), function () {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function (a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(), function () {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function () {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (!b.querySelectorAll || b.querySelectorAll(".TEST").length !== 0) {
                m = function (b, e, f, g) {
                    e = e || c;
                    if (!g && !m.isXML(e)) {
                        var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                            if (h[1]) return s(e.getElementsByTagName(b), f);
                            if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                        }
                        if (e.nodeType === 9) {
                            if (b === "body" && e.body) return s([e.body], f);
                            if (h && h[3]) {
                                var i = e.getElementById(h[3]);
                                if (!i || !i.parentNode) return s([], f);
                                if (i.id === h[3]) return s([i], f)
                            }
                            try {
                                return s(e.querySelectorAll(b), f)
                            } catch (j) {
                            }
                        } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                            var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                            l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                            try {
                                if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                            } catch (r) {
                            } finally {
                                l || k.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, e, f, g)
                };
                for (var e in a) m[e] = a[e];
                b = null
            }
        }(), function () {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function (a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {
                    }
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!!a.getElementsByClassName && a.getElementsByClassName("e").length !== 0) {
                a.lastChild.className = "e";
                if (a.getElementsByClassName("e").length === 1) return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), c.documentElement.contains ? m.contains = function (a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function (a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function () {
            return !1
        }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function (a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice,
        Q = f.expr.match.POS, R = {children: !0, contents: !0, next: !0, prev: !0};
    f.fn.extend({
        find: function (a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function () {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break
                }
            }
            return e
        }, has: function (a) {
            var b = f(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0
            })
        }, not: function (a) {
            return this.pushStack(T(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({selector: a[d], elem: g, level: h});
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            c = c.length > 1 ? f.unique(c) : c;
            return this.pushStack(c, "closest", a)
        }, index: function (a) {
            if (!a) return this[0] && this[0].parentNode ? this.prevAll().length : -1;
            if (typeof a == "string") return f.inArray(this[0], f(a));
            return f.inArray(a.jquery ? a[0] : a, this)
        }, add: function (a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        }, parents: function (a) {
            return f.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return f.dir(a, "parentNode", c)
        }, next: function (a) {
            return f.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return f.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return f.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return f.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return f.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return f.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return f.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return f.sibling(a.firstChild)
        }, contents: function (a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function (a, b) {
        f.fn[a] = function (c, d) {
            var e = f.map(this, b, c);
            L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse());
            return this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function (a, b, c) {
            c && (a = ":not(" + a + ")");
            return b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        }, dir: function (a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        }, nth: function (a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a
        }, sibling: function (a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i,
        _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            });
            if (typeof a != "object" && a !== b) return this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            return f.text(this)
        }, wrapAll: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            if (f.isFunction(a)) return this.each(function (b) {
                f(this).wrapInner(a.call(this, b))
            });
            return this.each(function () {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = f.isFunction(a);
            return this.each(function (c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, f.clean(arguments));
                return a
            }
        }, remove: function (a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [d]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        }, empty: function () {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        }, clone: function (a, b) {
            a = a == null ? !1 : a, b = b == null ? a : b;
            return this.map(function () {
                return f.clone(this, a, b)
            })
        }, html: function (a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function (b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        }, replaceWith: function (a) {
            if (this[0] && this[0].parentNode) {
                if (f.isFunction(a)) return this.each(function (b) {
                    var c = f(this), d = c.html();
                    c.replaceWith(a.call(this, b, d))
                });
                typeof a != "string" && (a = f(a).detach());
                return this.each(function () {
                    var b = this.nextSibling, c = this.parentNode;
                    f(this).remove(), b ? f(b).before(a) : f(c).append(a)
                })
            }
            return this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function () {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function (e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {fragment: i} : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, bp)
            }
            return this
        }
    }), f.buildFragment = function (a, b, d) {
        var e, g, h, i, j = a[0];
        b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1);
        return {fragment: e, cacheable: g}
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        f.fn[a] = function (c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) {
                e[b](this[0]);
                return this
            }
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function (a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g])
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g])
                }
            }
            d = e = null;
            return h
        }, clean: function (a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || ["", ""])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0],
                        o = b.createElement("div");
                    b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k),
                            q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                    }
                    !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function (a) {
                    return !a.type || be.test(a.type)
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [j + 1, 0].concat(s))
                    }
                    d.appendChild(h[j])
                }
            }
            return h
        }, cleanData: function (a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/,
        bv = /^([\-+])=([\-+.\de]+)/, bw = {position: "absolute", visibility: "hidden", display: "block"},
        bx = ["Left", "Right"], by = ["Top", "Bottom"], bz, bA, bB;
    f.fn.css = function (a, c) {
        if (arguments.length === 2 && c === b) return this;
        return f.access(this, a, c, !0, function (a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": f.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (!!a && a.nodeType !== 3 && a.nodeType !== 8 && !!a.style) {
                var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
                c = f.cssProps[i] || i;
                if (d === b) {
                    if (k && "get" in k && (g = k.get(a, !1, e)) !== b) return g;
                    return j[c]
                }
                h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
                if (d == null || h === "number" && isNaN(d)) return;
                h === "number" && !f.cssNumber[i] && (d += "px");
                if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                    j[c] = d
                } catch (l) {
                }
            }
        },
        css: function (a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c)
        },
        swap: function (a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function (a, b) {
        f.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                if (c) {
                    if (a.offsetWidth !== 0) return bC(a, b, d);
                    f.swap(a, bw, function () {
                        e = bC(a, b, d)
                    });
                    return e
                }
            }, set: function (a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function (a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e
        }
    }), f(function () {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                f.swap(a, {display: "inline-block"}, function () {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight
                });
                return c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function (a, b) {
        var c, d, e;
        b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b)));
        return c
    }), c.documentElement.currentStyle && (bB = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d));
        return f === "" ? "auto" : f
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function (a) {
        return !f.expr.filters.hidden(a)
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//,
        bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/,
        bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {},
        bV, bW, bX = ["*/"] + ["*"];
    try {
        bV = e.href
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function (a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            f.ajax({
                url: a, type: h, dataType: "html", data: c, complete: function (a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function (a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            });
            return this
        }, serialize: function () {
            return f.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type))
            }).map(function (a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function (a, c) {
                    return {name: b.name, value: a.replace(bF, "\r\n")}
                }) : {name: b.name, value: c.replace(bF, "\r\n")}
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        f.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function (a, c) {
        f[c] = function (a, d, e, g) {
            f.isFunction(d) && (g = g || e, e = d, d = b);
            return f.ajax({type: c, url: a, data: d, success: e, dataType: g})
        }
    }), f.extend({
        getScript: function (a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b);
            return a
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": f.parseJSON, "text xml": f.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function (a, c) {
            function w(a, c, l, m) {
                if (s !== 2) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                    if (a >= 200 && a < 300 || a === 304) {
                        if (d.ifModified) {
                            if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                            if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                        }
                        if (a === 304) w = "notmodified", o = !0; else try {
                            r = cc(d, x), w = "success", o = !0
                        } catch (A) {
                            w = "parsererror", u = A
                        }
                    } else {
                        u = w;
                        if (!w || a) w = "error", a < 0 && (a = 0)
                    }
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }

            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(),
                i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u,
                v = {
                    readyState: 0, setRequestHeader: function (a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return s === 2 ? n : null
                    }, getResponseHeader: function (a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    }, overrideMimeType: function (a) {
                        s || (d.mimeType = a);
                        return this
                    }, abort: function (a) {
                        a = a || "abort", p && p.abort(a), w(0, a);
                        return this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function (a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [j[b], a[b]]; else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || s === 2)) {
                v.abort();
                return !1
            }
            for (u in{success: 1, error: 1, complete: 1}) v[u](d[u]);
            p = b$(bU, d, c, v);
            if (!p) w(-1, "No Transport"); else {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function () {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                } catch (z) {
                    if (s < 2) w(-1, z); else throw z
                }
            }
            return v
        },
        param: function (a, c) {
            var d = [], e = function (a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function () {
                e(this.name, this.value)
            }); else for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+")
        }
    }), f.extend({active: 0, lastModified: {}, etag: {}});
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return f.expando + "_" + cd++
        }
    }), f.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h],
                j = b.url, k = b.data, l = "$1" + h + "$2";
            b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function (a) {
                g = [a]
            }, d.always(function () {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function () {
                g || f.error(h + " was not called");
                return g[0]
            }, b.dataTypes[0] = "json";
            return "script"
        }
    }), f.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                f.globalEval(a);
                return a
            }
        }
    }), f.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function (f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function (a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                }, abort: function () {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cf = a.ActiveXObject ? function () {
        for (var a in ch) ch[a](0, 1)
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && ci() || cj()
    } : ci, function (a) {
        f.extend(f.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function (c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function (e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {
                    }
                    h.send(c.hasContent && c.data || null), d = function (a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d)
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp,
        cq = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]],
        cr;
    f.fn.extend({
        show: function (a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        }, hide: function (a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        }, _toggle: f.fn.toggle, toggle: function (a, b, c) {
            var d = typeof a == "boolean";
            f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function () {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(cu("toggle", 3), a, b, c);
            return this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m,
                    n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }

            var e = f.speed(b, c, d);
            if (f.isEmptyObject(a)) return this.each(e.complete, [!1]);
            a = f.extend({}, a);
            return e.queue === !1 ? this.each(g) : this.queue(e.queue, g)
        }, stop: function (a, c, d) {
            typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []);
            return this.each(function () {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }

                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        f.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function (a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            d.old = d.complete, d.complete = function (a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            };
            return d
        }, easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            }, swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        }, cur: function () {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
        }, custom: function (a, c, d) {
            function h(a) {
                return e.step(a)
            }

            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function () {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval))
        }, show: function () {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function (a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update();
            return !0
        }
    }, f.extend(f.fx, {
        tick: function () {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(cp), cp = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                f.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function (a, b) {
        f.fx.step[b] = function (a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function (a) {
        return f.grep(f.timers, function (b) {
            return a === b.elem
        }).length
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function (a) {
        var b = this[0], c;
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {
        }
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {top: c.top, left: c.left} : {top: 0, left: 0};
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j,
            o = c.left + m - k;
        return {top: n, left: o}
    } : f.fn.offset = function (a) {
        var b = this[0];
        if (a) return this.each(function (b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft));
        return {top: l, left: m}
    }, f.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0);
            return {top: b, left: c}
        }, setOffset: function (a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function () {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(),
                d = cx.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
            c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0;
            return {top: c.top - d.top, left: c.left - d.left}
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + c;
        f.fn[d] = function (c) {
            var e, g;
            if (c === b) {
                e = this[0];
                if (!e) return null;
                g = cy(e);
                return g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]
            }
            return this.each(function () {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function (a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function (b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return f
    })
})(window);
/*jQuery.browser.mobile*/
(function (a) {
    jQuery.browser.mobile = /android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

function checkMobile() {
    if ($.browser.mobile && -1 === window.location.href.indexOf("/static")) window.location.href = "/static?hl=" + current_language
}

checkMobile();
(function () {
    function $c(a) {
        for (var b = -1, c = a.length, d = []; ++b < c;) d.push(a[b]);
        return d
    }

    function N() {
    }

    function Y(a) {
        return a
    }

    function ad() {
        return this
    }

    function xb() {
        return !0
    }

    function z(a) {
        return "function" === typeof a ? a : function () {
            return a
        }
    }

    function bd(a, b, c) {
        return function () {
            var d = c.apply(b, arguments);
            return arguments.length ? a : d
        }
    }

    function Ka(a) {
        return null != a && !isNaN(a)
    }

    function cd(a) {
        return a.length
    }

    function dd(a) {
        return null == a
    }

    function yb(a) {
        return a.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ")
    }

    function La() {
    }

    function zb(a) {
        function b() {
            for (var b = c, d = -1, g = b.length, h; ++d < g;) (h = b[d].on) && h.apply(this, arguments);
            return a
        }

        var c = [], d = new N;
        b.on = function (b, f) {
            var e;
            var g = d.get(b), h;
            if (2 > arguments.length) return g && g.on;
            if (g) g.on = null, e = c.slice(0, h = c.indexOf(g)).concat(c.slice(h + 1)), c = e, d.remove(b);
            f && c.push(d.set(b, {on: f}));
            return a
        };
        return b
    }

    function Ab(a, b) {
        return b - (a ? 1 + Math.floor(Math.log(a + Math.pow(10, 1 + Math.floor(Math.log(a) / Math.LN10) - b)) / Math.LN10) : 1)
    }

    function ed(a) {
        return a + ""
    }

    function Bb(a) {
        for (var b =
            a.lastIndexOf("."), c = 0 <= b ? a.substring(b) : (b = a.length, ""), d = []; 0 < b;) d.push(a.substring(b -= 3, b + 3));
        return d.reverse().join(",") + c
    }

    function fd(a) {
        return function (b) {
            return 0 >= b ? 0 : 1 <= b ? 1 : a(b)
        }
    }

    function Cb(a) {
        return function (b) {
            return 1 - a(1 - b)
        }
    }

    function Db(a) {
        return function (b) {
            return 0.5 * (0.5 > b ? a(2 * b) : 2 - a(2 - 2 * b))
        }
    }

    function Ma(a) {
        return a
    }

    function Na(a) {
        return function (b) {
            return Math.pow(b, a)
        }
    }

    function gd(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    }

    function hd(a) {
        return Math.pow(2, 10 * (a - 1))
    }

    function id(a) {
        return 1 -
            Math.sqrt(1 - a * a)
    }

    function jd(a) {
        return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    }

    function B() {
        d3.event.stopPropagation();
        d3.event.preventDefault()
    }

    function Eb() {
        for (var a = d3.event, b; b = a.sourceEvent;) a = b;
        return a
    }

    function Oa(a) {
        for (var b = new La, c = 0, d = arguments.length; ++c < d;) b[arguments[c]] = zb(b);
        b.of = function (c, d) {
            return function (g) {
                try {
                    var h = g.sourceEvent = d3.event;
                    g.target = a;
                    d3.event = g;
                    b[g.type].apply(c, d)
                } finally {
                    d3.event =
                        h
                }
            }
        };
        return b
    }

    function kd(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return (c - a) * b
        }
    }

    function ld(a, b) {
        b = b - (a = +a) ? 1 / (b - a) : 0;
        return function (c) {
            return Math.max(0, Math.min(1, (c - a) * b))
        }
    }

    function M(a, b, c) {
        return new O(a, b, c)
    }

    function O(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c
    }

    function Z(a) {
        return 16 > a ? "0" + Math.max(0, a).toString(16) : Math.min(255, a).toString(16)
    }

    function Pa(a, b, c) {
        var d = 0, e = 0, f = 0, g, h;
        if (g = /([a-z]+)\((.*)\)/i.exec(a)) switch (h = g[2].split(","), g[1]) {
            case "hsl":
                return c(parseFloat(h[0]), parseFloat(h[1]) /
                    100, parseFloat(h[2]) / 100);
            case "rgb":
                return b(Qa(h[0]), Qa(h[1]), Qa(h[2]))
        }
        if (c = ma.get(a)) return b(c.r, c.g, c.b);
        null != a && "#" === a.charAt(0) && (4 === a.length ? (d = a.charAt(1), d += d, e = a.charAt(2), e += e, f = a.charAt(3), f += f) : 7 === a.length && (d = a.substring(1, 3), e = a.substring(3, 5), f = a.substring(5, 7)), d = parseInt(d, 16), e = parseInt(e, 16), f = parseInt(f, 16));
        return b(d, e, f)
    }

    function Fb(a, b, c) {
        var d = Math.min(a /= 255, b /= 255, c /= 255), e = Math.max(a, b, c), f = e - d, g = (e + d) / 2;
        f ? (d = 0.5 > g ? f / (e + d) : f / (2 - e - d), a = 60 * (a == e ? (b - c) / f + (b < c ? 6 : 0) :
            b == e ? (c - a) / f + 2 : (a - b) / f + 4)) : d = a = 0;
        return $(a, d, g)
    }

    function Qa(a) {
        var b = parseFloat(a);
        return "%" === a.charAt(a.length - 1) ? Math.round(2.55 * b) : b
    }

    function $(a, b, c) {
        return new P(a, b, c)
    }

    function P(a, b, c) {
        this.h = a;
        this.s = b;
        this.l = c
    }

    function na(a, b, c) {
        function d(a) {
            360 < a ? a -= 360 : 0 > a && (a += 360);
            return 60 > a ? e + (f - e) * a / 60 : 180 > a ? f : 240 > a ? e + (f - e) * (240 - a) / 60 : e
        }

        var e, f, a = a % 360;
        0 > a && (a += 360);
        b = 0 > b ? 0 : 1 < b ? 1 : b;
        c = 0 > c ? 0 : 1 < c ? 1 : c;
        f = 0.5 >= c ? c * (1 + b) : c + b - c * b;
        e = 2 * c - f;
        return M(Math.round(255 * d(a + 120)), Math.round(255 * d(a)), Math.round(255 *
            d(a - 120)))
    }

    function K(a) {
        Ra(a, w);
        return a
    }

    function Gb(a) {
        return function () {
            return oa(a, this)
        }
    }

    function Hb(a) {
        return function () {
            return Ib(a, this)
        }
    }

    function Jb(a, b) {
        function c() {
            if (b = this.classList) return b.add(a);
            var b = this.className, c = null != b.baseVal, d = c ? b.baseVal : b;
            f.lastIndex = 0;
            if (!f.test(d)) d = yb(d + " " + a), c ? b.baseVal = d : this.className = d
        }

        function d() {
            if (b = this.classList) return b.remove(a);
            var b = this.className, c = null != b.baseVal, d = c ? b.baseVal : b, d = yb(d.replace(f, " "));
            c ? b.baseVal = d : this.className = d
        }

        function e() {
            (b.apply(this, arguments) ? c : d).call(this)
        }

        var f = RegExp("(^|\\s+)" + d3.requote(a) + "(\\s+|$)", "g");
        if (2 > arguments.length) {
            var g = this.node();
            if (h = g.classList) return h.contains(a);
            var h = g.className;
            f.lastIndex = 0;
            return f.test(null != h.baseVal ? h.baseVal : h)
        }
        return this.each("function" === typeof b ? e : b ? c : d)
    }

    function md(a) {
        return function () {
            return Kb(this, a)
        }
    }

    function nd(a) {
        if (!arguments.length) a = d3.ascending;
        return function (b, c) {
            return a(b && b.__data__, c && c.__data__)
        }
    }

    function Lb(a) {
        Ra(a, Q);
        return a
    }

    function Sa(a, b, c) {
        Ra(a, E);
        var d = new N, e = d3.dispatch("start", "end"), f = pa;
        a.id = b;
        a.time = c;
        a.tween = function (b, c) {
            if (2 > arguments.length) return d.get(b);
            null == c ? d.remove(b) : d.set(b, c);
            return a
        };
        a.ease = function (b) {
            if (!arguments.length) return f;
            f = "function" === typeof b ? b : d3.ease.apply(d3, arguments);
            return a
        };
        a.each = function (b, c) {
            if (2 > arguments.length) return od.call(a, b);
            e.on(b, c);
            return a
        };
        d3.timer(function (g) {
            a.each(function (h, i, j) {
                function k(a) {
                    if (u.active > b) return n();
                    u.active = b;
                    d.forEach(function (a,
                                        b) {
                        (b = b.call(o, h, i)) && m.push(b)
                    });
                    e.start.call(o, h, i);
                    l(a) || d3.timer(l, 0, c);
                    return 1
                }

                function l(a) {
                    if (u.active !== b) return n();
                    for (var a = (a - q) / r, c = f(a), d = m.length; 0 < d;) m[--d].call(o, c);
                    if (1 <= a) return n(), R = b, e.end.call(o, h, i), R = 0, 1
                }

                function n() {
                    --u.count || delete o.__transition__;
                    return 1
                }

                var m = [], o = this, q = a[j][i].delay, r = a[j][i].duration,
                    u = o.__transition__ || (o.__transition__ = {active: 0, count: 0});
                ++u.count;
                q <= g ? k(g) : d3.timer(k, q, c)
            });
            return 1
        }, 0, c);
        return a
    }

    function pd(a, b, c) {
        return "" != c && ca
    }

    function Mb(a,
                b) {
        function c(a, c, d) {
            a = b.call(this, a, c);
            return null == a ? "" != d && ca : d != a && e(d, a)
        }

        function d(a, c, d) {
            return d != b && e(d, b)
        }

        var e = "transform" == a ? d3.interpolateTransform : d3.interpolate;
        return "function" === typeof b ? c : null == b ? pd : (b += "", d)
    }

    function od(a) {
        var b = R, c = pa, d = qa, e = ra;
        R = this.id;
        pa = this.ease();
        for (var f = 0, g = this.length; f < g; f++) for (var h = this[f], i = 0, j = h.length; i < j; i++) {
            var k = h[i];
            if (k) qa = this[f][i].delay, ra = this[f][i].duration, a.call(k = k.node, k.__data__, i, f)
        }
        R = b;
        pa = c;
        qa = d;
        ra = e;
        return this
    }

    function Ta() {
        for (var a,
                 b = Date.now(), c = S; c;) {
            a = b - c.then;
            if (a >= c.delay) c.flush = c.callback(a);
            c = c.next
        }
        a = Nb() - b;
        24 < a ? (isFinite(a) && (clearTimeout(sa), sa = setTimeout(Ta, a)), ta = 0) : (ta = 1, Ob(Ta))
    }

    function Nb() {
        var d;
        for (var a = null, b = S, c = Infinity; b;) b.flush ? (d = a ? a.next = b.next : S = b.next, b = d) : (c = Math.min(c, b.then + b.delay), b = (a = b).next);
        return c
    }

    function Pb(a) {
        var b = [a.a, a.b], c = [a.c, a.d], d = Qb(b), e = b[0] * c[0] + b[1] * c[1], f = -e;
        c[0] += f * b[0];
        c[1] += f * b[1];
        f = Qb(c) || 0;
        b[0] * c[1] < c[0] * b[1] && (b[0] *= -1, b[1] *= -1, d *= -1, e *= -1);
        this.rotate = (d ? Math.atan2(b[1],
            b[0]) : Math.atan2(-c[0], c[1])) * Rb;
        this.translate = [a.e, a.f];
        this.scale = [d, f];
        this.skew = f ? Math.atan2(e, f) * Rb : 0
    }

    function Qb(a) {
        var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
        b && (a[0] /= b, a[1] /= b);
        return b
    }

    function Sb(a, b) {
        var c = a.ownerSVGElement || a;
        if (c.createSVGPoint) {
            var d = c.createSVGPoint();
            if (0 > Ua && (window.scrollX || window.scrollY)) {
                var c = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0),
                    e = c[0][0].getScreenCTM();
                Ua = !(e.f || e.e);
                c.remove()
            }
            Ua ? (d.x = b.pageX, d.y = b.pageY) :
                (d.x = b.clientX, d.y = b.clientY);
            d = d.matrixTransform(a.getScreenCTM().inverse());
            return [d.x, d.y]
        }
        c = a.getBoundingClientRect();
        return [b.clientX - c.left - a.clientLeft, b.clientY - c.top - a.clientTop]
    }

    function da(a) {
        var b = a[0], a = a[a.length - 1];
        return b < a ? [b, a] : [a, b]
    }

    function ua(a) {
        return a.rangeExtent ? a.rangeExtent() : da(a.range())
    }

    function Va(a, b) {
        var c = 0, d = a.length - 1, e = a[c], f = a[d], g;
        f < e && (g = c, c = d, d = g, g = e, e = f, f = g);
        if (g = f - e) b = b(g), a[c] = b.floor(e), a[d] = b.ceil(f);
        return a
    }

    function qd() {
        return Math
    }

    function Tb(a, b,
                c, d) {
        function e() {
            var e = 2 < Math.min(a.length, b.length) ? rd : sd, j = d ? ld : kd;
            g = e(a, b, j, c);
            h = e(b, a, j, d3.interpolate);
            return f
        }

        function f(a) {
            return g(a)
        }

        var g, h;
        f.invert = function (a) {
            return h(a)
        };
        f.domain = function (b) {
            if (!arguments.length) return a;
            a = b.map(Number);
            return e()
        };
        f.range = function (a) {
            if (!arguments.length) return b;
            b = a;
            return e()
        };
        f.rangeRound = function (a) {
            return f.range(a).interpolate(d3.interpolateRound)
        };
        f.clamp = function (a) {
            if (!arguments.length) return d;
            d = a;
            return e()
        };
        f.interpolate = function (a) {
            if (!arguments.length) return c;
            c = a;
            return e()
        };
        f.ticks = function (b) {
            return Wa(a, b)
        };
        f.tickFormat = function (b) {
            return Xa(a, b)
        };
        f.nice = function () {
            Va(a, Ub);
            return e()
        };
        f.copy = function () {
            return Tb(a, b, c, d)
        };
        return e()
    }

    function Vb(a, b) {
        return d3.rebind(a, b, "range", "rangeRound", "interpolate", "clamp")
    }

    function Ub(a) {
        a = Math.pow(10, Math.round(Math.log(a) / Math.LN10) - 1);
        return {
            floor: function (b) {
                return Math.floor(b / a) * a
            }, ceil: function (b) {
                return Math.ceil(b / a) * a
            }
        }
    }

    function Wb(a, b) {
        var c = da(a), d = c[1] - c[0], e = Math.pow(10, Math.floor(Math.log(d / b) /
            Math.LN10)), d = b / d * e;
        0.15 >= d ? e *= 10 : 0.35 >= d ? e *= 5 : 0.75 >= d && (e *= 2);
        c[0] = Math.ceil(c[0] / e) * e;
        c[1] = Math.floor(c[1] / e) * e + 0.5 * e;
        c[2] = e;
        return c
    }

    function Wa(a, b) {
        return d3.range.apply(d3, Wb(a, b))
    }

    function Xa(a, b) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(Wb(a, b)[2]) / Math.LN10 + 0.01)) + "f")
    }

    function sd(a, b, c, d) {
        var e = c(a[0], a[1]), f = d(b[0], b[1]);
        return function (a) {
            return f(e(a))
        }
    }

    function rd(a, b, c, d) {
        var e = [], f = [], g = 0, h = Math.min(a.length, b.length) - 1;
        a[h] < a[0] && (a = a.slice().reverse(), b = b.slice().reverse());
        for (; ++g <= h;) e.push(c(a[g - 1], a[g])), f.push(d(b[g - 1], b[g]));
        return function (b) {
            var c = d3.bisect(a, b, 1, h) - 1;
            return f[c](e[c](b))
        }
    }

    function Xb(a, b) {
        function c(c) {
            return a(b(c))
        }

        var d = b.pow;
        c.invert = function (b) {
            return d(a.invert(b))
        };
        c.domain = function (e) {
            if (!arguments.length) return a.domain().map(d);
            b = 0 > e[0] ? va : Ya;
            d = b.pow;
            a.domain(e.map(b));
            return c
        };
        c.nice = function () {
            a.domain(Va(a.domain(), qd));
            return c
        };
        c.ticks = function () {
            var c = da(a.domain()), f = [];
            if (c.every(isFinite)) {
                var g = Math.floor(c[0]), h = Math.ceil(c[1]),
                    i = d(c[0]), c = d(c[1]);
                if (b === va) for (f.push(d(g)); g++ < h;) for (var j = 9; 0 < j; j--) f.push(d(g) * j); else {
                    for (; g < h; g++) for (j = 1; 10 > j; j++) f.push(d(g) * j);
                    f.push(d(g))
                }
                for (g = 0; f[g] < i; g++) ;
                for (h = f.length; f[h - 1] > c; h--) ;
                f = f.slice(g, h)
            }
            return f
        };
        c.tickFormat = function (a, f) {
            2 > arguments.length && (f = td);
            if (1 > arguments.length) return f;
            var g = a / c.ticks().length, h = b === va ? (i = -1.0E-12, Math.floor) : (i = 1.0E-12, Math.ceil), i;
            return function (a) {
                return a / d(h(b(a) + i)) < g ? f(a) : ""
            }
        };
        c.copy = function () {
            return Xb(a.copy(), b)
        };
        return Vb(c, a)
    }

    function Ya(a) {
        return Math.log(0 > a ? 0 : a) / Math.LN10
    }

    function va(a) {
        return -Math.log(0 < a ? 0 : -a) / Math.LN10
    }

    function Yb(a, b) {
        function c(b) {
            return a(d(b))
        }

        var d = wa(b), e = wa(1 / b);
        c.invert = function (b) {
            return e(a.invert(b))
        };
        c.domain = function (b) {
            if (!arguments.length) return a.domain().map(e);
            a.domain(b.map(d));
            return c
        };
        c.ticks = function (a) {
            return Wa(c.domain(), a)
        };
        c.tickFormat = function (a) {
            return Xa(c.domain(), a)
        };
        c.nice = function () {
            return c.domain(Va(c.domain(), Ub))
        };
        c.exponent = function (a) {
            if (!arguments.length) return b;
            var g = c.domain();
            d = wa(b = a);
            e = wa(1 / b);
            return c.domain(g)
        };
        c.copy = function () {
            return Yb(a.copy(), b)
        };
        return Vb(c, a)
    }

    function wa(a) {
        return function (b) {
            return 0 > b ? -Math.pow(-b, a) : Math.pow(b, a)
        }
    }

    function Zb(a, b) {
        function c(b) {
            return f[((e.get(b) || e.set(b, a.push(b))) - 1) % f.length]
        }

        function d(b, c) {
            return d3.range(a.length).map(function (a) {
                return b + c * a
            })
        }

        var e, f, g;
        c.domain = function (d) {
            if (!arguments.length) return a;
            a = [];
            e = new N;
            for (var f = -1, g = d.length, k; ++f < g;) e.has(k = d[f]) || e.set(k, a.push(k));
            return c[b.t](b.x,
                b.p)
        };
        c.range = function (a) {
            if (!arguments.length) return f;
            f = a;
            g = 0;
            b = {t: "range", x: a};
            return c
        };
        c.rangePoints = function (e, i) {
            2 > arguments.length && (i = 0);
            var j = e[0], k = e[1], l = (k - j) / (a.length - 1 + i);
            f = d(2 > a.length ? (j + k) / 2 : j + l * i / 2, l);
            g = 0;
            b = {t: "rangePoints", x: e, p: i};
            return c
        };
        c.rangeBands = function (e, i) {
            2 > arguments.length && (i = 0);
            var j = e[1] < e[0], k = e[j - 0], l = (e[1 - j] - k) / (a.length + i);
            f = d(k + l * i, l);
            j && f.reverse();
            g = l * (1 - i);
            b = {t: "rangeBands", x: e, p: i};
            return c
        };
        c.rangeRoundBands = function (e, i) {
            2 > arguments.length && (i = 0);
            var j =
                e[1] < e[0], k = e[j - 0], l = e[1 - j], n = Math.floor((l - k) / (a.length + i));
            f = d(k + Math.round((l - k - (a.length - i) * n) / 2), n);
            j && f.reverse();
            g = Math.round(n * (1 - i));
            b = {t: "rangeRoundBands", x: e, p: i};
            return c
        };
        c.rangeBand = function () {
            return g
        };
        c.rangeExtent = function () {
            return da(b.x)
        };
        c.copy = function () {
            return Zb(a, b)
        };
        return c.domain(a)
    }

    function $b(a, b) {
        function c() {
            var c = 0, g = b.length;
            for (e = []; ++c < g;) e[c - 1] = d3.quantile(a, c / g);
            return d
        }

        function d(a) {
            return isNaN(a = +a) ? NaN : b[d3.bisect(e, a)]
        }

        var e;
        d.domain = function (b) {
            if (!arguments.length) return a;
            a = b.filter(function (a) {
                return !isNaN(a)
            }).sort(d3.ascending);
            return c()
        };
        d.range = function (a) {
            if (!arguments.length) return b;
            b = a;
            return c()
        };
        d.quantiles = function () {
            return e
        };
        d.copy = function () {
            return $b(a, b)
        };
        return c()
    }

    function ac(a, b, c) {
        function d(b) {
            return c[Math.max(0, Math.min(g, Math.floor(f * (b - a))))]
        }

        function e() {
            f = c.length / (b - a);
            g = c.length - 1;
            return d
        }

        var f, g;
        d.domain = function (c) {
            if (!arguments.length) return [a, b];
            a = +c[0];
            b = +c[c.length - 1];
            return e()
        };
        d.range = function (a) {
            if (!arguments.length) return c;
            c = a;
            return e()
        };
        d.copy = function () {
            return ac(a, b, c)
        };
        return e()
    }

    function bc(a) {
        function b(a) {
            return +a
        }

        b.invert = b;
        b.domain = b.range = function (c) {
            if (!arguments.length) return a;
            a = c.map(b);
            return b
        };
        b.ticks = function (b) {
            return Wa(a, b)
        };
        b.tickFormat = function (b) {
            return Xa(a, b)
        };
        b.copy = function () {
            return bc(a)
        };
        return b
    }

    function ud(a) {
        return a.innerRadius
    }

    function vd(a) {
        return a.outerRadius
    }

    function cc(a) {
        return a.startAngle
    }

    function dc(a) {
        return a.endAngle
    }

    function ec(a) {
        function b(b) {
            function f() {
                k.push("M",
                    g(a(l), h))
            }

            for (var k = [], l = [], n = -1, m = b.length, o, q = z(c), r = z(d); ++n < m;) e.call(this, o = b[n], n) ? l.push([+q.call(this, o, n), +r.call(this, o, n)]) : l.length && (f(), l = []);
            l.length && f();
            return k.length ? k.join("") : null
        }

        var c = Za, d = fc, e = xb, f = xa, g = F, h = 0.7;
        b.x = function (a) {
            if (!arguments.length) return c;
            c = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length) return d;
            d = a;
            return b
        };
        b.defined = function (a) {
            if (!arguments.length) return e;
            e = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length) return f;
            if (!ya.has(a += "")) a = xa;
            g = ya.get(f = a);
            return b
        };
        b.tension = function (a) {
            if (!arguments.length) return h;
            h = a;
            return b
        };
        return b
    }

    function Za(a) {
        return a[0]
    }

    function fc(a) {
        return a[1]
    }

    function F(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("L", (d = a[b])[0], ",", d[1]);
        return e.join("")
    }

    function $a(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("V", (d = a[b])[1], "H", d[0]);
        return e.join("")
    }

    function ab(a) {
        for (var b = 0, c = a.length, d = a[0], e = [d[0], ",", d[1]]; ++b < c;) e.push("H", (d = a[b])[0], "V", d[1]);
        return e.join("")
    }

    function za(a, b) {
        if (1 > b.length || a.length != b.length && a.length != b.length + 2) return F(a);
        var c = a.length != b.length, d = "", e = a[0], f = a[1], g = b[0], h = g, i = 1;
        c && (d += "Q" + (f[0] - 2 * g[0] / 3) + "," + (f[1] - 2 * g[1] / 3) + "," + f[0] + "," + f[1], e = a[1], i = 2);
        if (1 < b.length) {
            h = b[1];
            f = a[i];
            i++;
            d += "C" + (e[0] + g[0]) + "," + (e[1] + g[1]) + "," + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1];
            for (e = 2; e < b.length; e++, i++) f = a[i], h = b[e], d += "S" + (f[0] - h[0]) + "," + (f[1] - h[1]) + "," + f[0] + "," + f[1]
        }
        c && (c = a[i], d += "Q" + (f[0] + 2 * h[0] / 3) + "," + (f[1] + 2 * h[1] / 3) + "," + c[0] + "," + c[1]);
        return d
    }

    function bb(a, b) {
        for (var c = [], d = (1 - b) / 2, e, f = a[0], g = a[1], h = 1, i = a.length; ++h < i;) e = f, f = g, g = a[h], c.push([d * (g[0] - e[0]), d * (g[1] - e[1])]);
        return c
    }

    function gc(a) {
        if (3 > a.length) return F(a);
        var b = 1, c = a.length, d = a[0], e = d[0], f = d[1], g = [e, e, e, (d = a[1])[0]], h = [f, f, f, d[1]],
            e = [e, ",", f];
        for (ea(e, g, h); ++b < c;) d = a[b], g.shift(), g.push(d[0]), h.shift(), h.push(d[1]), ea(e, g, h);
        for (b = -1; 2 > ++b;) g.shift(), g.push(d[0]), h.shift(), h.push(d[1]), ea(e, g, h);
        return e.join("")
    }

    function J(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] *
            b[2] + a[3] * b[3]
    }

    function ea(a, b, c) {
        a.push("C", J(hc, b), ",", J(hc, c), ",", J(ic, b), ",", J(ic, c), ",", J(aa, b), ",", J(aa, c))
    }

    function cb(a, b) {
        return (b[1] - a[1]) / (b[0] - a[0])
    }

    function jc(a) {
        for (var b, c = -1, d = a.length, e, f; ++c < d;) b = a[c], e = b[0], f = b[1] + T, b[0] = e * Math.cos(f), b[1] = e * Math.sin(f);
        return a
    }

    function kc(a) {
        function b(b) {
            function h() {
                o.push("M", i(a(r), l), k, j(a(q.reverse()), l), "Z")
            }

            for (var o = [], q = [], r = [], u = -1, s = b.length, v, x = z(c), A = z(e), y = c === d ? function () {
                return t
            } : z(d), G = e === f ? function () {
                return U
            } : z(f), t, U; ++u <
                 s;) g.call(this, v = b[u], u) ? (q.push([t = +x.call(this, v, u), U = +A.call(this, v, u)]), r.push([+y.call(this, v, u), +G.call(this, v, u)])) : q.length && (h(), q = [], r = []);
            q.length && h();
            return o.length ? o.join("") : null
        }

        var c = Za, d = Za, e = 0, f = fc, g = xb, h = xa, i = F, j = F, k = "L", l = 0.7;
        b.x = function (a) {
            if (!arguments.length) return d;
            c = d = a;
            return b
        };
        b.x0 = function (a) {
            if (!arguments.length) return c;
            c = a;
            return b
        };
        b.x1 = function (a) {
            if (!arguments.length) return d;
            d = a;
            return b
        };
        b.y = function (a) {
            if (!arguments.length) return f;
            e = f = a;
            return b
        };
        b.y0 = function (a) {
            if (!arguments.length) return e;
            e = a;
            return b
        };
        b.y1 = function (a) {
            if (!arguments.length) return f;
            f = a;
            return b
        };
        b.defined = function (a) {
            if (!arguments.length) return g;
            g = a;
            return b
        };
        b.interpolate = function (a) {
            if (!arguments.length) return h;
            if (!ya.has(a += "")) a = xa;
            i = ya.get(h = a);
            j = i.reverse || i;
            k = /-closed$/.test(a) ? "M" : "L";
            return b
        };
        b.tension = function (a) {
            if (!arguments.length) return l;
            l = a;
            return b
        };
        return b
    }

    function lc(a) {
        return a.source
    }

    function mc(a) {
        return a.target
    }

    function wd(a) {
        return a.radius
    }

    function nc(a) {
        return [a.x, a.y]
    }

    function xd(a) {
        return function () {
            var b =
                a.apply(this, arguments), c = b[0], b = b[1] + T;
            return [c * Math.cos(b), c * Math.sin(b)]
        }
    }

    function yd() {
        return 64
    }

    function zd() {
        return "circle"
    }

    function oc(a) {
        a = Math.sqrt(a / Math.PI);
        return "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a + "Z"
    }

    function pc(a, b) {
        a.attr("transform", function (a) {
            return "translate(" + b(a) + ",0)"
        })
    }

    function qc(a, b) {
        a.attr("transform", function (a) {
            return "translate(0," + b(a) + ")"
        })
    }

    function Ad(a, b, c) {
        d = [];
        if (c && 1 < b.length) {
            for (var a = da(a.domain()), d, e = -1, f = b.length, g = (b[1] - b[0]) / ++c,
                     h, i; ++e < f;) for (h = c; 0 < --h;) (i = +b[e] - h * g) >= a[0] && d.push(i);
            for (--e, h = 0; ++h < c && (i = +b[e] + h * g) < a[1];) d.push(i)
        }
        return d
    }

    function Bd() {
        if (!fa) fa = d3.select("body").append("div").style("visibility", "hidden").style("top", 0).style("height", 0).style("width", 0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode;
        var a = d3.event, b;
        try {
            fa.scrollTop = 1E3, fa.dispatchEvent(a), b = 1E3 - fa.scrollTop
        } catch (c) {
            b = a.wheelDelta || 5 * -a.detail
        }
        return b
    }

    function Cd(a) {
        var b = a.source, a = a.target, c;
        var d = a;
        if (b === d) c = b; else {
            c = rc(b);
            for (var d = rc(d), e = c.pop(), f = d.pop(), g = null; e === f;) g = e, e = c.pop(), f = d.pop();
            c = g
        }
        for (d = [b]; b !== c;) b = b.parent, d.push(b);
        for (b = d.length; a !== c;) d.splice(b, 0, a), a = a.parent;
        return d
    }

    function rc(a) {
        for (var b = [], c = a.parent; null != c;) b.push(a), a = c, c = c.parent;
        b.push(a);
        return b
    }

    function sc(a) {
        a.fixed |= 2
    }

    function Dd(a) {
        a !== V && (a.fixed &= 1)
    }

    function Ed() {
        V.fixed &= 1;
        db = V = null
    }

    function Fd() {
        V.px = d3.event.x;
        V.py = d3.event.y;
        db.resume()
    }

    function tc(a, b, c) {
        var d = 0, e = 0;
        a.charge = 0;
        if (!a.leaf) for (var f =
            a.nodes, g = f.length, h = -1, i; ++h < g;) i = f[h], null != i && (tc(i, b, c), a.charge += i.charge, d += i.charge * i.cx, e += i.charge * i.cy);
        if (a.point) a.leaf || (a.point.x += Math.random() - 0.5, a.point.y += Math.random() - 0.5), b *= c[a.point.index], a.charge += a.pointCharge = b, d += b * a.point.x, e += b * a.point.y;
        a.cx = d / a.charge;
        a.cy = e / a.charge
    }

    function Gd() {
        return 20
    }

    function Hd() {
        return 1
    }

    function Id(a) {
        return a.x
    }

    function Jd(a) {
        return a.y
    }

    function Kd(a, b, c) {
        a.y0 = b;
        a.y = c
    }

    function eb(a) {
        return d3.range(a.length)
    }

    function fb(a) {
        for (var b = -1,
                 a = a[0].length, c = []; ++b < a;) c[b] = 0;
        return c
    }

    function Ld(a) {
        for (var b = 1, c = 0, d = a[0][1], e, f = a.length; b < f; ++b) if ((e = a[b][1]) > d) c = b, d = e;
        return c
    }

    function Md(a) {
        return a.reduce(Nd, 0)
    }

    function Nd(a, b) {
        return a + b[1]
    }

    function Od(a, b) {
        return uc(a, Math.ceil(Math.log(b.length) / Math.LN2 + 1))
    }

    function uc(a, b) {
        for (var c = -1, d = +a[0], e = (a[1] - d) / b, f = []; ++c <= b;) f[c] = e * c + d;
        return f
    }

    function Pd(a) {
        return [d3.min(a), d3.max(a)]
    }

    function ga(a, b) {
        d3.rebind(a, b, "sort", "children", "value");
        a.links = Qd;
        a.nodes = function (b) {
            gb = !0;
            return (a.nodes =
                a)(b)
        };
        return a
    }

    function Rd(a) {
        return a.children
    }

    function Sd(a) {
        return a.value
    }

    function Td(a, b) {
        return b.value - a.value
    }

    function Qd(a) {
        return d3.merge(a.map(function (a) {
            return (a.children || []).map(function (c) {
                return {source: a, target: c}
            })
        }))
    }

    function Ud(a, b) {
        return a.value - b.value
    }

    function hb(a, b) {
        var c = a._pack_next;
        a._pack_next = b;
        b._pack_prev = a;
        b._pack_next = c;
        c._pack_prev = b
    }

    function vc(a, b) {
        a._pack_next = b;
        b._pack_prev = a
    }

    function wc(a, b) {
        var c = b.x - a.x, d = b.y - a.y, e = a.r + b.r;
        return 0.0010 < e * e - c * c - d * d
    }

    function Vd(a) {
        function b(a) {
            c =
                Math.min(a.x - a.r, c);
            d = Math.max(a.x + a.r, d);
            e = Math.min(a.y - a.r, e);
            f = Math.max(a.y + a.r, f)
        }

        var c = Infinity, d = -Infinity, e = Infinity, f = -Infinity, g = a.length, h, i, j, k, l;
        a.forEach(Wd);
        h = a[0];
        h.x = -h.r;
        h.y = 0;
        b(h);
        if (1 < g && (i = a[1], i.x = i.r, i.y = 0, b(i), 2 < g)) {
            j = a[2];
            xc(h, i, j);
            b(j);
            hb(h, j);
            h._pack_prev = j;
            hb(j, i);
            i = h._pack_next;
            for (var n = 3; n < g; n++) {
                xc(h, i, j = a[n]);
                var m = 0, o = 1, q = 1;
                for (k = i._pack_next; k !== i; k = k._pack_next, o++) if (wc(k, j)) {
                    m = 1;
                    break
                }
                if (1 == m) for (l = h._pack_prev; l !== k._pack_prev && !wc(l, j); l = l._pack_prev, q++) ;
                m ?
                    (o < q || o == q && i.r < h.r ? vc(h, i = k) : vc(h = l, i), n--) : (hb(h, j), i = j, b(j))
            }
        }
        h = (c + d) / 2;
        i = (e + f) / 2;
        for (n = j = 0; n < g; n++) k = a[n], k.x -= h, k.y -= i, j = Math.max(j, k.r + Math.sqrt(k.x * k.x + k.y * k.y));
        a.forEach(Xd);
        return j
    }

    function Wd(a) {
        a._pack_next = a._pack_prev = a
    }

    function Xd(a) {
        delete a._pack_next;
        delete a._pack_prev
    }

    function yc(a) {
        var b = a.children;
        b && b.length ? (b.forEach(yc), a.r = Vd(b)) : a.r = Math.sqrt(a.value)
    }

    function zc(a, b, c, d) {
        var e = a.children;
        a.x = b += d * a.x;
        a.y = c += d * a.y;
        a.r *= d;
        if (e) for (var a = -1, f = e.length; ++a < f;) zc(e[a], b, c,
            d)
    }

    function xc(a, b, c) {
        var d = a.r + c.r, e = b.x - a.x, f = b.y - a.y;
        if (d && (e || f)) {
            var g = b.r + c.r, b = Math.sqrt(e * e + f * f),
                h = Math.max(-1, Math.min(1, (d * d + b * b - g * g) / (2 * d * b))), g = Math.acos(h),
                b = h * (d /= b), d = Math.sin(g) * d;
            c.x = a.x + b * e + d * f;
            c.y = a.y + b * f - d * e
        } else c.x = a.x + d, c.y = a.y
    }

    function Yd(a) {
        return 1 + d3.max(a, function (a) {
            return a.y
        })
    }

    function Zd(a) {
        return a.reduce(function (a, c) {
            return a + c.x
        }, 0) / a.length
    }

    function Ac(a) {
        var b = a.children;
        return b && b.length ? Ac(b[0]) : a
    }

    function Bc(a) {
        var b = a.children, c;
        return b && (c = b.length) ? Bc(b[c -
        1]) : a
    }

    function Cc(a, b) {
        return a.parent == b.parent ? 1 : 2
    }

    function ib(a) {
        var b = a.children;
        return b && b.length ? b[0] : a._tree.thread
    }

    function jb(a) {
        var b = a.children, c;
        return b && (c = b.length) ? b[c - 1] : a._tree.thread
    }

    function Aa(a, b) {
        var c = a.children;
        if (c && (e = c.length)) for (var d, e, f = -1; ++f < e;) if (0 < b(d = Aa(c[f], b), a)) a = d;
        return a
    }

    function $d(a, b) {
        return a.x - b.x
    }

    function ae(a, b) {
        return b.x - a.x
    }

    function be(a, b) {
        return a.depth - b.depth
    }

    function Ba(a, b) {
        function c(a, e) {
            var f = a.children;
            if (f && (j = f.length)) for (var g, h =
                null, i = -1, j; ++i < j;) g = f[i], c(g, h), h = g;
            b(a, e)
        }

        c(a, null)
    }

    function kb(a) {
        return {x: a.x, y: a.y, dx: a.dx, dy: a.dy}
    }

    function Dc(a, b) {
        var c = a.x + b[3], d = a.y + b[0], e = a.dx - b[1] - b[3], f = a.dy - b[0] - b[2];
        0 > e && (c += e / 2, e = 0);
        0 > f && (d += f / 2, f = 0);
        return {x: c, y: d, dx: e, dy: f}
    }

    function ce(a) {
        return a.map(de).join(",")
    }

    function de(a) {
        return /[",\n]/.test(a) ? '"' + a.replace(/\"/g, '""') + '"' : a
    }

    function Ca(a, b) {
        return function (c) {
            return c && a.hasOwnProperty(c.type) ? a[c.type](c) : b
        }
    }

    function lb(a) {
        return "m0," + a + "a" + a + "," + a + " 0 1,1 0," + -2 * a +
            "a" + a + "," + a + " 0 1,1 0," + 2 * a + "z"
    }

    function Da(a, b) {
        if (Ec.hasOwnProperty(a.type)) Ec[a.type](a, b)
    }

    function Fc(a, b) {
        for (var c = a.coordinates, d = 0, e = c.length; d < e; d++) b.apply(null, c[d])
    }

    function ee(a) {
        return a.source
    }

    function fe(a) {
        return a.target
    }

    function ha(a, b) {
        function c(a) {
            var b = Math.sin(o - (a *= o)) / q, c = Math.sin(a) / q, a = b * h * e + c * n * j,
                d = b * h * f + c * n * k, b = b * i + c * m;
            return [Math.atan2(d, a) / p, Math.atan2(b, Math.sqrt(a * a + d * d)) / p]
        }

        var d = a[0] * p, e = Math.cos(d), f = Math.sin(d), g = a[1] * p, h = Math.cos(g), i = Math.sin(g),
            g = b[0] * p, j =
                Math.cos(g), k = Math.sin(g), l = b[1] * p, n = Math.cos(l), m = Math.sin(l),
            o = c.d = Math.acos(Math.max(-1, Math.min(1, i * m + h * n * Math.cos(g - d)))), q = Math.sin(o);
        return c
    }

    function ge(a, b, c, d) {
        var e, f, g, a = d[a];
        e = a[0];
        f = a[1];
        a = d[b];
        b = a[0];
        g = a[1];
        a = d[c];
        return 0 < (a[1] - f) * (b - e) - (g - f) * (a[0] - e)
    }

    function mb(a, b, c) {
        return (c[0] - b[0]) * (a[1] - b[1]) < (c[1] - b[1]) * (a[0] - b[0])
    }

    function Gc(a, b, c, d) {
        var e = a[0], f = c[0], a = a[1], g = c[1], c = b[0] - e, h = d[0] - f, b = b[1] - a, d = d[1] - g,
            f = (h * (a - g) - d * (e - f)) / (d * c - h * b);
        return [e + f * c, a + f * b]
    }

    function Hc(a, b) {
        var c =
            a.map(function (a, b) {
                return {index: b, x: a[0], y: a[1]}
            }).sort(function (a, b) {
                return a.y < b.y ? -1 : a.y > b.y ? 1 : a.x < b.x ? -1 : a.x > b.x ? 1 : 0
            }), d = null, e = {
            list: [], leftEnd: null, rightEnd: null, init: function () {
                e.leftEnd = e.createHalfEdge(null, "l");
                e.rightEnd = e.createHalfEdge(null, "l");
                e.leftEnd.r = e.rightEnd;
                e.rightEnd.l = e.leftEnd;
                e.list.unshift(e.leftEnd, e.rightEnd)
            }, createHalfEdge: function (a, b) {
                return {edge: a, side: b, vertex: null, l: null, r: null}
            }, insert: function (a, b) {
                b.l = a;
                b.r = a.r;
                a.r.l = b;
                a.r = b
            }, leftBound: function (a) {
                var b = e.leftEnd;
                do b = b.r; while (b != e.rightEnd && f.rightOf(b, a));
                return b = b.l
            }, del: function (a) {
                a.l.r = a.r;
                a.r.l = a.l;
                a.edge = null
            }, right: function (a) {
                return a.r
            }, left: function (a) {
                return a.l
            }, leftRegion: function (a) {
                return null == a.edge ? d : a.edge.region[a.side]
            }, rightRegion: function (a) {
                return null == a.edge ? d : a.edge.region[nb[a.side]]
            }
        }, f = {
            bisect: function (a, b) {
                var c = {region: {l: a, r: b}, ep: {l: null, r: null}}, d = b.x - a.x, e = b.y - a.y;
                c.c = a.x * d + a.y * e + 0.5 * (d * d + e * e);
                (0 < d ? d : -d) > (0 < e ? e : -e) ? (c.a = 1, c.b = e / d, c.c /= d) : (c.b = 1, c.a = d / e, c.c /= e);
                return c
            },
            intersect: function (a, b) {
                var c = a.edge, d = b.edge;
                if (!c || !d || c.region.r == d.region.r) return null;
                var e = c.a * d.b - c.b * d.a;
                if (1.0E-10 > Math.abs(e)) return null;
                var f = (c.c * d.b - d.c * c.b) / e, e = (d.c * c.a - c.c * d.a) / e, g = c.region.r, h = d.region.r;
                g.y < h.y || g.y == h.y && g.x < h.x ? g = a : (g = b, c = d);
                return (c = f >= c.region.r.x) && "l" === g.side || !c && "r" === g.side ? null : {x: f, y: e}
            }, rightOf: function (a, b) {
                var c = a.edge, d = c.region.r, e = b.x > d.x;
                if (e && "l" === a.side) return 1;
                if (!e && "r" === a.side) return 0;
                if (1 === c.a) {
                    var f = b.y - d.y, g = b.x - d.x, h = 0, i = 0;
                    !e &&
                    0 > c.b || e && 0 <= c.b ? i = h = f >= c.b * g : (i = b.x + b.y * c.b > c.c, 0 > c.b && (i = !i), i || (h = 1));
                    h || (d = d.x - c.region.l.x, i = c.b * (g * g - f * f) < d * f * (1 + 2 * g / d + c.b * c.b), 0 > c.b && (i = !i))
                } else g = c.c - c.a * b.x, c = b.y - g, f = b.x - d.x, d = g - d.y, i = c * c > f * f + d * d;
                return "l" === a.side ? i : !i
            }, endPoint: function (a, c, d) {
                a.ep[c] = d;
                a.ep[nb[c]] && b(a)
            }, distance: function (a, b) {
                var c = a.x - b.x, d = a.y - b.y;
                return Math.sqrt(c * c + d * d)
            }
        }, g = {
            list: [], insert: function (a, b, c) {
                a.vertex = b;
                a.ystar = b.y + c;
                for (var c = 0, d = g.list, e = d.length; c < e; c++) {
                    var f = d[c];
                    if (!(a.ystar > f.ystar || a.ystar ==
                            f.ystar && b.x > f.vertex.x)) break
                }
                d.splice(c, 0, a)
            }, del: function (a) {
                for (var b = 0, c = g.list, d = c.length; b < d && c[b] != a; ++b) ;
                c.splice(b, 1)
            }, empty: function () {
                return 0 === g.list.length
            }, nextEvent: function (a) {
                for (var b = 0, c = g.list, d = c.length; b < d; ++b) if (c[b] == a) return c[b + 1];
                return null
            }, min: function () {
                var a = g.list[0];
                return {x: a.vertex.x, y: a.ystar}
            }, extractMin: function () {
                return g.list.shift()
            }
        };
        e.init();
        for (var d = c.shift(), h = c.shift(), i, j, k, l, n, m, o, q, r; ;) if (g.empty() || (i = g.min()), h && (g.empty() || h.y < i.y || h.y == i.y &&
                h.x < i.x)) {
            j = e.leftBound(h);
            k = e.right(j);
            o = e.rightRegion(j);
            r = f.bisect(o, h);
            m = e.createHalfEdge(r, "l");
            e.insert(j, m);
            if (q = f.intersect(j, m)) g.del(j), g.insert(j, q, f.distance(q, h));
            j = m;
            m = e.createHalfEdge(r, "r");
            e.insert(j, m);
            (q = f.intersect(m, k)) && g.insert(m, q, f.distance(q, h));
            h = c.shift()
        } else if (g.empty()) break; else {
            j = g.extractMin();
            l = e.left(j);
            k = e.right(j);
            n = e.right(k);
            o = e.leftRegion(j);
            m = e.rightRegion(k);
            q = j.vertex;
            f.endPoint(j.edge, j.side, q);
            f.endPoint(k.edge, k.side, q);
            e.del(j);
            g.del(k);
            e.del(k);
            j =
                "l";
            o.y > m.y && (j = o, o = m, m = j, j = "r");
            r = f.bisect(o, m);
            m = e.createHalfEdge(r, j);
            e.insert(l, m);
            f.endPoint(r, nb[j], q);
            if (q = f.intersect(l, m)) g.del(l), g.insert(l, q, f.distance(q, o));
            (q = f.intersect(m, n)) && g.insert(m, q, f.distance(q, o))
        }
        for (j = e.right(e.leftEnd); j != e.rightEnd; j = e.right(j)) b(j.edge)
    }

    function ia(a, b, c, d, e, f) {
        if (!a(b, c, d, e, f)) {
            var g = 0.5 * (c + e), h = 0.5 * (d + f), b = b.nodes;
            b[0] && ia(a, b[0], c, d, g, h);
            b[1] && ia(a, b[1], g, d, e, h);
            b[2] && ia(a, b[2], c, h, g, f);
            b[3] && ia(a, b[3], g, h, e, f)
        }
    }

    function he(a) {
        return {x: a[0], y: a[1]}
    }

    function W() {
        this._ = new Date(1 < arguments.length ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Ea(a, b, c, d) {
        for (var e, f = 0, g = b.length, h = c.length; f < g;) {
            if (d >= h) return -1;
            e = b.charCodeAt(f++);
            if (37 == e) {
                if (e = ie[b.charAt(f++)], !e || 0 > (d = e(a, c, d))) return -1
            } else if (e != c.charCodeAt(d++)) return -1
        }
        return d
    }

    function Ic(a, b, c) {
        C.lastIndex = 0;
        return (b = C.exec(b.substring(c, c + 2))) ? (a.d = +b[0], c + b[0].length) : -1
    }

    function Jc(a, b, c) {
        C.lastIndex = 0;
        return (b = C.exec(b.substring(c, c + 2))) ? (a.H = +b[0], c + b[0].length) : -1
    }

    function ob(a) {
        return a.toISOString()
    }

    function X(a, b, c) {
        function d(b) {
            var c = a(b), d = f(c, 1);
            return b - c < d - b ? c : d
        }

        function e(c) {
            b(c = a(new D(c - 1)), 1);
            return c
        }

        function f(a, c) {
            b(a = new D(+a), c);
            return a
        }

        function g(a, d, f) {
            var a = e(a), g = [];
            if (1 < f) for (; a < d;) c(a) % f || g.push(new Date(+a)), b(a, 1); else for (; a < d;) g.push(new Date(+a)), b(a, 1);
            return g
        }

        a.floor = a;
        a.round = d;
        a.ceil = e;
        a.offset = f;
        a.range = g;
        var h = a.utc = Fa(a);
        h.floor = h;
        h.round = Fa(d);
        h.ceil = Fa(e);
        h.offset = Fa(f);
        h.range = function (a, b, c) {
            try {
                D = W;
                var d = new W;
                d._ = a;
                return g(d, b, c)
            } finally {
                D = Date
            }
        };
        return a
    }

    function Fa(a) {
        return function (b, c) {
            try {
                D = W;
                var d = new W;
                d._ = b;
                return a(d, c)._
            } finally {
                D = Date
            }
        }
    }

    function pb(a, b, c) {
        function d(b) {
            return a(b)
        }

        d.invert = function (b) {
            return qb(a.invert(b))
        };
        d.domain = function (b) {
            if (!arguments.length) return a.domain().map(qb);
            a.domain(b);
            return d
        };
        d.nice = function (a) {
            var b = Kc(d.domain());
            return d.domain([a.floor(b[0]), a.ceil(b[1])])
        };
        d.ticks = function (c, f) {
            var g = Kc(d.domain());
            if ("function" !== typeof c) {
                var h = (g[1] - g[0]) / c, i = d3.bisect(Ga, h);
                if (i == Ga.length) return b.year(g,
                    c);
                if (!i) return a.ticks(c).map(qb);
                Math.log(h / Ga[i - 1]) < Math.log(Ga[i] / h) && --i;
                c = b[i];
                f = c[1];
                c = c[0].range
            }
            return c(g[0], new Date(+g[1] + 1), f)
        };
        d.tickFormat = function () {
            return c
        };
        d.copy = function () {
            return pb(a.copy(), b, c)
        };
        return d3.rebind(d, a, "range", "rangeRound", "interpolate", "clamp")
    }

    function Kc(a) {
        var b = a[0], a = a[a.length - 1];
        return b < a ? [b, a] : [a, b]
    }

    function qb(a) {
        return new Date(a)
    }

    function Lc(a) {
        return function (b) {
            for (var c = a.length - 1, d = a[c]; !d[1](b);) d = a[--c];
            return d[0](b)
        }
    }

    function rb(a) {
        var b = new Date(a,
            0, 1);
        b.setFullYear(a);
        return b
    }

    function je(a) {
        var b = a.getFullYear(), c = rb(b), d = rb(b + 1);
        return b + (a - c) / (d - c)
    }

    function sb(a) {
        var b = new Date(Date.UTC(a, 0, 1));
        b.setUTCFullYear(a);
        return b
    }

    function ke(a) {
        var b = a.getUTCFullYear(), c = sb(b), d = sb(b + 1);
        return b + (a - c) / (d - c)
    }

    if (!Date.now) Date.now = function () {
        return +new Date
    };
    try {
        document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (Se) {
        if (!window.CSSStyleDeclaration) window.CSSStyleDeclaration = {};
        if (!Array.prototype.map) Array.prototype.map = function (a,
                                                                  b) {
            var c = this.length;
            if ("function" != typeof a) throw new TypeError;
            for (var d = Array(c), e = 0; e < c; e++) e in this && (d[e] = a.call(b, this[e], e, this));
            return d
        };
        if (!Array.prototype.forEach) Array.prototype.forEach = function (a, b) {
            var c = this.length;
            if ("function" != typeof a) throw new TypeError;
            for (var d = 0; d < c; d++) d in this && a.call(b, this[d], d, this)
        };
        var Mc = CSSStyleDeclaration.prototype, le = Mc.setProperty;
        Mc.setProperty = function (a, b, c) {
            le.call(this, a, b + "", c)
        }
    }
    d3 = {version: "2.9.2"};
    var ja = function (a) {
        return Array.prototype.slice.call(a)
    };
    try {
        ja(document.documentElement.childNodes)
    } catch (Te) {
        ja = $c
    }
    var Ra = [].__proto__ ? function (a, b) {
        a.__proto__ = b
    } : function (a, b) {
        for (var c in b) a[c] = b[c]
    };
    d3.map = function (a) {
        var b = new N, c;
        for (c in a) b.set(c, a[c]);
        return b
    };
    (function (a, b) {
        try {
            for (var c in b) Object.defineProperty(a.prototype, c, {value: b[c], enumerable: !1})
        } catch (d) {
            a.prototype = b
        }
    })(N, {
        has: function (a) {
            return ka + a in this
        }, get: function (a) {
            return this[ka + a]
        }, set: function (a, b) {
            return this[ka + a] = b
        }, remove: function (a) {
            a = ka + a;
            return a in this && delete this[a]
        },
        keys: function () {
            var a = [];
            this.forEach(function (b) {
                a.push(b)
            });
            return a
        }, values: function () {
            var a = [];
            this.forEach(function (b, c) {
                a.push(c)
            });
            return a
        }, entries: function () {
            var a = [];
            this.forEach(function (b, c) {
                a.push({key: b, value: c})
            });
            return a
        }, forEach: function (a) {
            for (var b in this) b.charCodeAt(0) === me && a.call(this, b.substring(1), this[b])
        }
    });
    var ka = "\x00", me = ka.charCodeAt(0);
    d3.functor = z;
    d3.rebind = function (a, b) {
        for (var c = 1, d = arguments.length, e; ++c < d;) a[e = arguments[c]] = bd(a, b, b[e]);
        return a
    };
    d3.ascending =
        function (a, b) {
            return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN
        };
    d3.descending = function (a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN
    };
    d3.mean = function (a, b) {
        var c = a.length, d, e = 0, f = -1, g = 0;
        if (1 === arguments.length) for (; ++f < c;) {
            if (Ka(d = a[f])) e += (d - e) / ++g
        } else for (; ++f < c;) if (Ka(d = b.call(a, a[f], f))) e += (d - e) / ++g;
        return g ? e : void 0
    };
    d3.median = function (a, b) {
        1 < arguments.length && (a = a.map(b));
        a = a.filter(Ka);
        return a.length ? d3.quantile(a.sort(d3.ascending), 0.5) : void 0
    };
    d3.min = function (a, b) {
        var c = -1, d = a.length, e, f;
        if (1 === arguments.length) {
            for (; ++c <
                   d && (null == (e = a[c]) || e != e);) e = void 0;
            for (; ++c < d;) if (null != (f = a[c]) && e > f) e = f
        } else {
            for (; ++c < d && (null == (e = b.call(a, a[c], c)) || e != e);) e = void 0;
            for (; ++c < d;) if (null != (f = b.call(a, a[c], c)) && e > f) e = f
        }
        return e
    };
    d3.max = function (a, b) {
        var c = -1, d = a.length, e, f;
        if (1 === arguments.length) {
            for (; ++c < d && (null == (e = a[c]) || e != e);) e = void 0;
            for (; ++c < d;) if (null != (f = a[c]) && f > e) e = f
        } else {
            for (; ++c < d && (null == (e = b.call(a, a[c], c)) || e != e);) e = void 0;
            for (; ++c < d;) if (null != (f = b.call(a, a[c], c)) && f > e) e = f
        }
        return e
    };
    d3.extent = function (a, b) {
        var c =
            -1, d = a.length, e, f, g;
        if (1 === arguments.length) {
            for (; ++c < d && (null == (e = g = a[c]) || e != e);) e = g = void 0;
            for (; ++c < d;) if (null != (f = a[c])) e > f && (e = f), g < f && (g = f)
        } else {
            for (; ++c < d && (null == (e = g = b.call(a, a[c], c)) || e != e);) e = void 0;
            for (; ++c < d;) if (null != (f = b.call(a, a[c], c))) e > f && (e = f), g < f && (g = f)
        }
        return [e, g]
    };
    d3.random = {
        normal: function (a, b) {
            2 > arguments.length && (b = 1);
            1 > arguments.length && (a = 0);
            return function () {
                var c, d;
                do c = 2 * Math.random() - 1, d = 2 * Math.random() - 1, d = c * c + d * d; while (!d || 1 < d);
                return a + b * c * Math.sqrt(-2 * Math.log(d) /
                    d)
            }
        }
    };
    d3.sum = function (a, b) {
        var c = 0, d = a.length, e, f = -1;
        if (1 === arguments.length) for (; ++f < d;) {
            if (!isNaN(e = +a[f])) c += e
        } else for (; ++f < d;) if (!isNaN(e = +b.call(a, a[f], f))) c += e;
        return c
    };
    d3.quantile = function (a, b) {
        var c = (a.length - 1) * b + 1, d = Math.floor(c), e = a[d - 1];
        return (c -= d) ? e + c * (a[d] - e) : e
    };
    d3.transpose = function (a) {
        return d3.zip.apply(d3, a)
    };
    d3.zip = function () {
        if (!(e = arguments.length)) return [];
        for (var a = -1, b = d3.min(arguments, cd), c = Array(b); ++a < b;) for (var d = -1, e, f = c[a] = Array(e); ++d < e;) f[d] = arguments[d][a];
        return c
    };
    d3.bisector = function (a) {
        return {
            left: function (b, c, d, e) {
                3 > arguments.length && (d = 0);
                if (4 > arguments.length) e = b.length;
                for (; d < e;) {
                    var f = d + e >> 1;
                    a.call(b, b[f], f) < c ? d = f + 1 : e = f
                }
                return d
            }, right: function (b, c, d, e) {
                3 > arguments.length && (d = 0);
                if (4 > arguments.length) e = b.length;
                for (; d < e;) {
                    var f = d + e >> 1;
                    c < a.call(b, b[f], f) ? e = f : d = f + 1
                }
                return d
            }
        }
    };
    var Nc = d3.bisector(function (a) {
        return a
    });
    d3.bisectLeft = Nc.left;
    d3.bisect = d3.bisectRight = Nc.right;
    d3.first = function (a, b) {
        var c = 0, d = a.length, e = a[0], f;
        if (1 === arguments.length) b = d3.ascending;
        for (; ++c < d;) if (0 < b.call(a, e, f = a[c])) e = f;
        return e
    };
    d3.last = function (a, b) {
        var c = 0, d = a.length, e = a[0], f;
        if (1 === arguments.length) b = d3.ascending;
        for (; ++c < d;) if (0 >= b.call(a, e, f = a[c])) e = f;
        return e
    };
    d3.nest = function () {
        function a(b, e) {
            if (e >= d.length) return g ? g.call(c, b) : f ? b.sort(f) : b;
            for (var j = -1, k = b.length, l = d[e++], n, m, o = new N, q, r = {}; ++j < k;) (q = o.get(n = l(m = b[j]))) ? q.push(m) : o.set(n, [m]);
            o.forEach(function (b) {
                r[b] = a(o.get(b), e)
            });
            return r
        }

        function b(a, c) {
            if (c >= d.length) return a;
            var f = [], g = e[c++], l;
            for (l in a) f.push({
                key: l,
                values: b(a[l], c)
            });
            g && f.sort(function (a, b) {
                return g(a.key, b.key)
            });
            return f
        }

        var c = {}, d = [], e = [], f, g;
        c.map = function (b) {
            return a(b, 0)
        };
        c.entries = function (c) {
            return b(a(c, 0), 0)
        };
        c.key = function (a) {
            d.push(a);
            return c
        };
        c.sortKeys = function (a) {
            e[d.length - 1] = a;
            return c
        };
        c.sortValues = function (a) {
            f = a;
            return c
        };
        c.rollup = function (a) {
            g = a;
            return c
        };
        return c
    };
    d3.keys = function (a) {
        var b = [], c;
        for (c in a) b.push(c);
        return b
    };
    d3.values = function (a) {
        var b = [], c;
        for (c in a) b.push(a[c]);
        return b
    };
    d3.entries = function (a) {
        var b =
            [], c;
        for (c in a) b.push({key: c, value: a[c]});
        return b
    };
    d3.permute = function (a, b) {
        for (var c = [], d = -1, e = b.length; ++d < e;) c[d] = a[b[d]];
        return c
    };
    d3.merge = function (a) {
        return Array.prototype.concat.apply([], a)
    };
    d3.split = function (a, b) {
        var c = [], d = [], e, f = -1, g = a.length;
        for (2 > arguments.length && (b = dd); ++f < g;) b.call(d, e = a[f], f) ? d = [] : (d.length || c.push(d), d.push(e));
        return c
    };
    d3.range = function (a, b, c) {
        3 > arguments.length && (c = 1, 2 > arguments.length && (b = a, a = 0));
        if (Infinity === (b - a) / c) throw Error("infinite range");
        var d = [],
            e;
        e = Math.abs(c);
        for (var f = 1; e * f % 1;) f *= 10;
        e = f;
        var f = -1, g;
        a *= e;
        b *= e;
        c *= e;
        if (0 > c) for (; (g = a + c * ++f) > b;) d.push(g / e); else for (; (g = a + c * ++f) < b;) d.push(g / e);
        return d
    };
    d3.requote = function (a) {
        return a.replace(ne, "\\$&")
    };
    var ne = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (a, b) {
        return b ? Math.round(a * (b = Math.pow(10, b))) / b : Math.round(a)
    };
    d3.xhr = function (a, b, c) {
        var d = new XMLHttpRequest;
        3 > arguments.length ? (c = b, b = null) : b && d.overrideMimeType && d.overrideMimeType(b);
        d.open("GET", a, !0);
        b && d.setRequestHeader("Accept",
            b);
        d.onreadystatechange = function () {
            if (4 === d.readyState) {
                var a = d.status;
                c(200 <= a && 300 > a || 304 === a ? d : null)
            }
        };
        d.send(null)
    };
    d3.text = function (a, b, c) {
        3 > arguments.length && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseText)
        })
    };
    d3.json = function (a, b) {
        d3.text(a, "application/json", function (a) {
            b(a ? JSON.parse(a) : null)
        })
    };
    d3.html = function (a, b) {
        d3.text(a, "text/html", function (a) {
            if (null != a) {
                var d = document.createRange();
                d.selectNode(document.body);
                a = d.createContextualFragment(a)
            }
            b(a)
        })
    };
    d3.xml = function (a, b, c) {
        3 >
        arguments.length && (c = b, b = null);
        d3.xhr(a, b, function (a) {
            c(a && a.responseXML)
        })
    };
    var tb = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: tb, qualify: function (a) {
            var b = a.indexOf(":"), c = a;
            0 <= b && (c = a.substring(0, b), a = a.substring(b + 1));
            return tb.hasOwnProperty(c) ? {space: tb[c], local: a} : a
        }
    };
    d3.dispatch = function () {
        for (var a = new La, b = -1, c = arguments.length; ++b <
        c;) a[arguments[b]] = zb(a);
        return a
    };
    La.prototype.on = function (a, b) {
        var c = a.indexOf("."), d = "";
        0 < c && (d = a.substring(c + 1), a = a.substring(0, c));
        return 2 > arguments.length ? this[a].on(d) : this[a].on(d, b)
    };
    d3.format = function (a) {
        var a = oe.exec(a), b = a[1] || " ", c = a[3] || "", d = a[5], e = +a[6], f = a[7], g = a[8], h = a[9], i = 1,
            j = "", k = !1;
        g && (g = +g.substring(1));
        d && (b = "0", f && (e -= Math.floor((e - 1) / 4)));
        switch (h) {
            case "n":
                f = !0;
                h = "g";
                break;
            case "%":
                i = 100;
                j = "%";
                h = "f";
                break;
            case "p":
                i = 100;
                j = "%";
                h = "r";
                break;
            case "d":
                k = !0;
                g = 0;
                break;
            case "s":
                i =
                    -1, h = "r"
        }
        "r" == h && !g && (h = "g");
        h = pe.get(h) || ed;
        return function (a) {
            if (k && a % 1) return "";
            var n = 0 > a && (a = -a) ? "\u2212" : c;
            if (0 > i) {
                var m = d3.formatPrefix(a, g), a = m.scale(a);
                j = m.symbol
            } else a *= i;
            a = h(a, g);
            d ? (m = a.length + n.length, m < e && (a = Array(e - m + 1).join(b) + a), f && (a = Bb(a)), a = n + a) : (f && (a = Bb(a)), a = n + a, m = a.length, m < e && (a = Array(e - m + 1).join(b) + a));
            return a + j
        }
    };
    var oe = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/, pe = d3.map({
        g: function (a, b) {
            return a.toPrecision(b)
        }, e: function (a, b) {
            return a.toExponential(b)
        },
        f: function (a, b) {
            return a.toFixed(b)
        }, r: function (a, b) {
            return d3.round(a, b = Ab(a, b)).toFixed(Math.max(0, Math.min(20, b)))
        }
    }), qe = "y,z,a,f,p,n,\u03bc,m,,k,M,G,T,P,E,Z,Y".split(",").map(function (a, b) {
        var c = Math.pow(10, 3 * Math.abs(8 - b));
        return {
            scale: 8 < b ? function (a) {
                return a / c
            } : function (a) {
                return a * c
            }, symbol: a
        }
    });
    d3.formatPrefix = function (a, b) {
        var c = 0;
        a && (0 > a && (a *= -1), b && (a = d3.round(a, Ab(a, b))), c = 1 + Math.floor(1.0E-12 + Math.log(a) / Math.LN10), c = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= c ? c + 1 : c - 1) / 3))));
        return qe[8 +
        c / 3]
    };
    var re = Na(2), se = Na(3), Oc = function () {
            return Ma
        }, te = d3.map({
            linear: Oc, poly: Na, quad: function () {
                return re
            }, cubic: function () {
                return se
            }, sin: function () {
                return gd
            }, exp: function () {
                return hd
            }, circle: function () {
                return id
            }, elastic: function (a, b) {
                var c;
                2 > arguments.length && (b = 0.45);
                1 > arguments.length ? (a = 1, c = b / 4) : c = b / (2 * Math.PI) * Math.asin(1 / a);
                return function (d) {
                    return 1 + a * Math.pow(2, 10 * -d) * Math.sin(2 * (d - c) * Math.PI / b)
                }
            }, back: function (a) {
                a || (a = 1.70158);
                return function (b) {
                    return b * b * ((a + 1) * b - a)
                }
            }, bounce: function () {
                return jd
            }
        }),
        ue = d3.map({
            "in": Ma, out: Cb, "in-out": Db, "out-in": function (a) {
                return Db(Cb(a))
            }
        });
    d3.ease = function (a) {
        var b = a.indexOf("-"), c = 0 <= b ? a.substring(0, b) : a, b = 0 <= b ? a.substring(b + 1) : "in",
            c = te.get(c) || Oc, b = ue.get(b) || Ma;
        return fd(b(c.apply(null, Array.prototype.slice.call(arguments, 1))))
    };
    d3.event = null;
    d3.interpolate = function (a, b) {
        for (var c = d3.interpolators.length, d; 0 <= --c && !(d = d3.interpolators[c](a, b));) ;
        return d
    };
    d3.interpolateNumber = function (a, b) {
        b -= a;
        return function (c) {
            return a + b * c
        }
    };
    d3.interpolateRound = function (a,
                                    b) {
        b -= a;
        return function (c) {
            return Math.round(a + b * c)
        }
    };
    d3.interpolateString = function (a, b) {
        var c, d, e = 0, f = [], g = [], h, i;
        for (d = Ha.lastIndex = 0; c = Ha.exec(b); ++d) c.index && f.push(b.substring(e, c.index)), g.push({
            i: f.length,
            x: c[0]
        }), f.push(null), e = Ha.lastIndex;
        e < b.length && f.push(b.substring(e));
        for (d = 0, h = g.length; (c = Ha.exec(a)) && d < h; ++d) if (i = g[d], i.x == c[0]) {
            if (i.i) if (null == f[i.i + 1]) {
                f[i.i - 1] += i.x;
                f.splice(i.i, 1);
                for (c = d + 1; c < h; ++c) g[c].i--
            } else {
                f[i.i - 1] += i.x + f[i.i + 1];
                f.splice(i.i, 2);
                for (c = d + 1; c < h; ++c) g[c].i -=
                    2
            } else if (null == f[i.i + 1]) f[i.i] = i.x; else {
                f[i.i] = i.x + f[i.i + 1];
                f.splice(i.i + 1, 1);
                for (c = d + 1; c < h; ++c) g[c].i--
            }
            g.splice(d, 1);
            h--;
            d--
        } else i.x = d3.interpolateNumber(parseFloat(c[0]), parseFloat(i.x));
        for (; d < h;) i = g.pop(), null == f[i.i + 1] ? f[i.i] = i.x : (f[i.i] = i.x + f[i.i + 1], f.splice(i.i + 1, 1)), h--;
        return 1 === f.length ? null == f[0] ? g[0].x : function () {
            return b
        } : function (a) {
            for (d = 0; d < h; ++d) f[(i = g[d]).i] = i.x(a);
            return f.join("")
        }
    };
    d3.interpolateTransform = function (a, b) {
        var c = [], d = [], e, f = d3.transform(a), g = d3.transform(b), h =
            f.translate, i = g.translate, j = f.rotate, k = g.rotate, l = f.skew, n = g.skew, f = f.scale, g = g.scale;
        h[0] != i[0] || h[1] != i[1] ? (c.push("translate(", null, ",", null, ")"), d.push({
            i: 1,
            x: d3.interpolateNumber(h[0], i[0])
        }, {i: 3, x: d3.interpolateNumber(h[1], i[1])})) : i[0] || i[1] ? c.push("translate(" + i + ")") : c.push("");
        j != k ? d.push({
            i: c.push(c.pop() + "rotate(", null, ")") - 2,
            x: d3.interpolateNumber(j, k)
        }) : k && c.push(c.pop() + "rotate(" + k + ")");
        l != n ? d.push({
            i: c.push(c.pop() + "skewX(", null, ")") - 2,
            x: d3.interpolateNumber(l, n)
        }) : n && c.push(c.pop() +
            "skewX(" + n + ")");
        f[0] != g[0] || f[1] != g[1] ? (e = c.push(c.pop() + "scale(", null, ",", null, ")"), d.push({
            i: e - 4,
            x: d3.interpolateNumber(f[0], g[0])
        }, {
            i: e - 2,
            x: d3.interpolateNumber(f[1], g[1])
        })) : (1 != g[0] || 1 != g[1]) && c.push(c.pop() + "scale(" + g + ")");
        e = d.length;
        return function (a) {
            for (var b = -1, f; ++b < e;) c[(f = d[b]).i] = f.x(a);
            return c.join("")
        }
    };
    d3.interpolateRgb = function (a, b) {
        var a = d3.rgb(a), b = d3.rgb(b), c = a.r, d = a.g, e = a.b, f = b.r - c, g = b.g - d, h = b.b - e;
        return function (a) {
            return "#" + Z(Math.round(c + f * a)) + Z(Math.round(d + g * a)) + Z(Math.round(e +
                h * a))
        }
    };
    d3.interpolateHsl = function (a, b) {
        var a = d3.hsl(a), b = d3.hsl(b), c = a.h, d = a.s, e = a.l, f = b.h - c, g = b.s - d, h = b.l - e;
        return function (a) {
            return na(c + f * a, d + g * a, e + h * a).toString()
        }
    };
    d3.interpolateArray = function (a, b) {
        var c = [], d = [], e = a.length, f = b.length, g = Math.min(a.length, b.length), h;
        for (h = 0; h < g; ++h) c.push(d3.interpolate(a[h], b[h]));
        for (; h < e; ++h) d[h] = a[h];
        for (; h < f; ++h) d[h] = b[h];
        return function (a) {
            for (h = 0; h < g; ++h) d[h] = c[h](a);
            return d
        }
    };
    d3.interpolateObject = function (a, b) {
        var c = {}, d = {}, e;
        for (e in a) e in b ? c[e] =
            ("transform" == e ? d3.interpolateTransform : d3.interpolate)(a[e], b[e]) : d[e] = a[e];
        for (e in b) e in a || (d[e] = b[e]);
        return function (a) {
            for (e in c) d[e] = c[e](a);
            return d
        }
    };
    var Ha = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators = [d3.interpolateObject, function (a, b) {
        return b instanceof Array && d3.interpolateArray(a, b)
    }, function (a, b) {
        return ("string" === typeof a || "string" === typeof b) && d3.interpolateString(a + "", b + "")
    }, function (a, b) {
        return ("string" === typeof b ? ma.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof
            O || b instanceof P) && d3.interpolateRgb(a, b)
    }, function (a, b) {
        return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b)
    }];
    d3.rgb = function (a, b, c) {
        return 1 === arguments.length ? a instanceof O ? M(a.r, a.g, a.b) : Pa("" + a, M, na) : M(~~a, ~~b, ~~c)
    };
    O.prototype.brighter = function (a) {
        var a = Math.pow(0.7, arguments.length ? a : 1), b = this.r, c = this.g, d = this.b;
        if (!b && !c && !d) return M(30, 30, 30);
        b && 30 > b && (b = 30);
        c && 30 > c && (c = 30);
        d && 30 > d && (d = 30);
        return M(Math.min(255, Math.floor(b / a)), Math.min(255, Math.floor(c / a)), Math.min(255, Math.floor(d /
            a)))
    };
    O.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return M(Math.floor(a * this.r), Math.floor(a * this.g), Math.floor(a * this.b))
    };
    O.prototype.hsl = function () {
        return Fb(this.r, this.g, this.b)
    };
    O.prototype.toString = function () {
        return "#" + Z(this.r) + Z(this.g) + Z(this.b)
    };
    var ma = d3.map({
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    });
    ma.forEach(function (a, b) {
        ma.set(a, Pa(b, M, na))
    });
    d3.hsl = function (a, b, c) {
        return 1 === arguments.length ? a instanceof P ? $(a.h, a.s, a.l) : Pa("" + a, Fb, $) : $(+a, +b, +c)
    };
    P.prototype.brighter = function (a) {
        a = Math.pow(0.7, arguments.length ? a : 1);
        return $(this.h, this.s, this.l / a)
    };
    P.prototype.darker = function (a) {
        a = Math.pow(0.7, arguments.length ?
            a : 1);
        return $(this.h, this.s, a * this.l)
    };
    P.prototype.rgb = function () {
        return na(this.h, this.s, this.l)
    };
    P.prototype.toString = function () {
        return this.rgb().toString()
    };
    var oa = function (a, b) {
            return b.querySelector(a)
        }, Ib = function (a, b) {
            return b.querySelectorAll(a)
        }, ba = document.documentElement,
        ve = ba.matchesSelector || ba.webkitMatchesSelector || ba.mozMatchesSelector || ba.msMatchesSelector || ba.oMatchesSelector,
        Kb = function (a, b) {
            return ve.call(a, b)
        };
    if ("function" === typeof Sizzle) oa = function (a, b) {
        return Sizzle(a, b)[0]
    },
        Ib = function (a, b) {
            return Sizzle.uniqueSort(Sizzle(a, b))
        }, Kb = Sizzle.matchesSelector;
    var w = [];
    d3.selection = function () {
        return la
    };
    d3.selection.prototype = w;
    w.select = function (a) {
        var b = [], c, d, e, f;
        "function" !== typeof a && (a = Gb(a));
        for (var g = -1, h = this.length; ++g < h;) {
            b.push(c = []);
            c.parentNode = (e = this[g]).parentNode;
            for (var i = -1, j = e.length; ++i < j;) if (f = e[i]) {
                if (c.push(d = a.call(f, f.__data__, i)), d && "__data__" in f) d.__data__ = f.__data__
            } else c.push(null)
        }
        return K(b)
    };
    w.selectAll = function (a) {
        var b = [], c, d;
        "function" !==
        typeof a && (a = Hb(a));
        for (var e = -1, f = this.length; ++e < f;) for (var g = this[e], h = -1, i = g.length; ++h < i;) if (d = g[h]) b.push(c = ja(a.call(d, d.__data__, h))), c.parentNode = d;
        return K(b)
    };
    w.attr = function (a, b) {
        function c() {
            this.removeAttribute(a)
        }

        function d() {
            this.removeAttributeNS(a.space, a.local)
        }

        function e() {
            this.setAttribute(a, b)
        }

        function f() {
            this.setAttributeNS(a.space, a.local, b)
        }

        function g() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttribute(a) : this.setAttribute(a, c)
        }

        function h() {
            var c = b.apply(this, arguments);
            null == c ? this.removeAttributeNS(a.space, a.local) : this.setAttributeNS(a.space, a.local, c)
        }

        a = d3.ns.qualify(a);
        if (2 > arguments.length) {
            var i = this.node();
            return a.local ? i.getAttributeNS(a.space, a.local) : i.getAttribute(a)
        }
        return this.each(null == b ? a.local ? d : c : "function" === typeof b ? a.local ? h : g : a.local ? f : e)
    };
    w.classed = function (a, b) {
        var c = a.split(we), d = c.length, e = -1;
        if (1 < arguments.length) {
            for (; ++e < d;) Jb.call(this, c[e], b);
            return this
        }
        for (; ++e < d;) if (!Jb.call(this, c[e])) return !1;
        return !0
    };
    var we = /\s+/g;
    w.style =
        function (a, b, c) {
            function d() {
                this.style.removeProperty(a)
            }

            function e() {
                this.style.setProperty(a, b, c)
            }

            function f() {
                var d = b.apply(this, arguments);
                null == d ? this.style.removeProperty(a) : this.style.setProperty(a, d, c)
            }

            3 > arguments.length && (c = "");
            return 2 > arguments.length ? window.getComputedStyle(this.node(), null).getPropertyValue(a) : this.each(null == b ? d : "function" === typeof b ? f : e)
        };
    w.property = function (a, b) {
        function c() {
            delete this[a]
        }

        function d() {
            this[a] = b
        }

        function e() {
            var c = b.apply(this, arguments);
            null == c ?
                delete this[a] : this[a] = c
        }

        return 2 > arguments.length ? this.node()[a] : this.each(null == b ? c : "function" === typeof b ? e : d)
    };
    w.text = function (a) {
        return 1 > arguments.length ? this.node().textContent : this.each("function" === typeof a ? function () {
            var b = a.apply(this, arguments);
            this.textContent = null == b ? "" : b
        } : null == a ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = a
        })
    };
    w.html = function (a) {
        return 1 > arguments.length ? this.node().innerHTML : this.each("function" === typeof a ? function () {
            var b = a.apply(this, arguments);
            this.innerHTML =
                null == b ? "" : b
        } : null == a ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = a
        })
    };
    w.append = function (a) {
        function b() {
            try {
                return this.appendChild(document.createElementNS(this.namespaceURI, a))
            } catch (b) {
            }
        }

        function c() {
            try {
                return this.appendChild(document.createElementNS(a.space, a.local))
            } catch (b) {
            }
        }

        a = d3.ns.qualify(a);
        return this.select(a.local ? c : b)
    };
    w.insert = function (a, b) {
        function c() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, a), oa(b, this))
        }

        function d() {
            return this.insertBefore(document.createElementNS(a.space,
                a.local), oa(b, this))
        }

        a = d3.ns.qualify(a);
        return this.select(a.local ? d : c)
    };
    w.remove = function () {
        return this.each(function () {
            var a = this.parentNode;
            a && a.removeChild(this)
        })
    };
    w.data = function (a, b) {
        function c(a, c) {
            var d, e = a.length, f = c.length, g = Math.min(e, f), r = Math.max(e, f), u = [], s = [], v = [], x, A;
            if (b) {
                var g = new N, r = [], y;
                A = c.length;
                for (d = -1; ++d < e;) y = b.call(x = a[d], x.__data__, d), g.has(y) ? v[A++] = x : g.set(y, x), r.push(y);
                for (d = -1; ++d < f;) y = b.call(c, A = c[d], d), g.has(y) ? (u[d] = x = g.get(y), x.__data__ = A, s[d] = v[d] = null) : (s[d] =
                    {__data__: A}, u[d] = v[d] = null), g.remove(y);
                for (d = -1; ++d < e;) g.has(r[d]) && (v[d] = a[d])
            } else {
                for (d = -1; ++d < g;) x = a[d], A = c[d], x ? (x.__data__ = A, u[d] = x, s[d] = v[d] = null) : (s[d] = {__data__: A}, u[d] = v[d] = null);
                for (; d < f; ++d) s[d] = {__data__: c[d]}, u[d] = v[d] = null;
                for (; d < r; ++d) v[d] = a[d], s[d] = u[d] = null
            }
            s.update = u;
            s.parentNode = u.parentNode = v.parentNode = a.parentNode;
            h.push(s);
            i.push(u);
            j.push(v)
        }

        var d = -1, e = this.length, f, g;
        if (!arguments.length) {
            for (a = Array(e = (f = this[0]).length); ++d < e;) if (g = f[d]) a[d] = g.__data__;
            return a
        }
        var h =
            Lb([]), i = K([]), j = K([]);
        if ("function" === typeof a) for (; ++d < e;) c(f = this[d], a.call(f, f.parentNode.__data__, d)); else for (; ++d < e;) c(f = this[d], a);
        i.enter = function () {
            return h
        };
        i.exit = function () {
            return j
        };
        return i
    };
    w.datum = w.map = function (a) {
        return 1 > arguments.length ? this.property("__data__") : this.property("__data__", a)
    };
    w.filter = function (a) {
        var b = [], c, d, e;
        "function" !== typeof a && (a = md(a));
        for (var f = 0, g = this.length; f < g; f++) {
            b.push(c = []);
            c.parentNode = (d = this[f]).parentNode;
            for (var h = 0, i = d.length; h < i; h++) (e = d[h]) &&
            a.call(e, e.__data__, h) && c.push(e)
        }
        return K(b)
    };
    w.order = function () {
        for (var a = -1, b = this.length; ++a < b;) for (var c = this[a], d = c.length - 1, e = c[d], f; 0 <= --d;) if (f = c[d]) e && e !== f.nextSibling && e.parentNode.insertBefore(f, e), e = f;
        return this
    };
    w.sort = function (a) {
        for (var a = nd.apply(this, arguments), b = -1, c = this.length; ++b < c;) this[b].sort(a);
        return this.order()
    };
    w.on = function (a, b, c) {
        3 > arguments.length && (c = !1);
        var d = "__on" + a, e = a.indexOf(".");
        0 < e && (a = a.substring(0, e));
        return 2 > arguments.length ? (e = this.node()[d]) && e._ :
            this.each(function (e, g) {
                function h(a) {
                    var c = d3.event;
                    d3.event = a;
                    try {
                        b.call(i, i.__data__, g)
                    } finally {
                        d3.event = c
                    }
                }

                var i = this, j = i[d];
                j && (i.removeEventListener(a, j, j.$), delete i[d]);
                if (b) i.addEventListener(a, i[d] = h, h.$ = c), h._ = b
            })
    };
    w.each = function (a) {
        for (var b = -1, c = this.length; ++b < c;) for (var d = this[b], e = -1, f = d.length; ++e < f;) {
            var g = d[e];
            g && a.call(g, g.__data__, e, b)
        }
        return this
    };
    w.call = function (a) {
        a.apply(this, (arguments[0] = this, arguments));
        return this
    };
    w.empty = function () {
        return !this.node()
    };
    w.node = function () {
        for (var a =
            0, b = this.length; a < b; a++) for (var c = this[a], d = 0, e = c.length; d < e; d++) {
            var f = c[d];
            if (f) return f
        }
        return null
    };
    w.transition = function () {
        for (var a = [], b, c, d = -1, e = this.length; ++d < e;) {
            a.push(b = []);
            for (var f = this[d], g = -1, h = f.length; ++g < h;) b.push((c = f[g]) ? {
                node: c,
                delay: qa,
                duration: ra
            } : null)
        }
        return Sa(a, R || ++xe, Date.now())
    };
    var la = K([[document]]);
    la[0].parentNode = ba;
    d3.select = function (a) {
        return "string" === typeof a ? la.select(a) : K([[a]])
    };
    d3.selectAll = function (a) {
        return "string" === typeof a ? la.selectAll(a) : K([ja(a)])
    };
    var Q = [];
    d3.selection.enter = Lb;
    d3.selection.enter.prototype = Q;
    Q.append = w.append;
    Q.insert = w.insert;
    Q.empty = w.empty;
    Q.node = w.node;
    Q.select = function (a) {
        for (var b = [], c, d, e, f, g, h = -1, i = this.length; ++h < i;) {
            e = (f = this[h]).update;
            b.push(c = []);
            c.parentNode = f.parentNode;
            for (var j = -1, k = f.length; ++j < k;) (g = f[j]) ? (c.push(e[j] = d = a.call(f.parentNode, g.__data__, j)), d.__data__ = g.__data__) : c.push(null)
        }
        return K(b)
    };
    var ca = {}, E = [], xe = 0, R = 0, qa = 0, ra = 250, pa = d3.ease("cubic-in-out");
    E.call = w.call;
    d3.transition = function (a) {
        return arguments.length ?
            R ? a.transition() : a : la.transition()
    };
    d3.transition.prototype = E;
    E.select = function (a) {
        var b = [], c, d, e;
        "function" !== typeof a && (a = Gb(a));
        for (var f = -1, g = this.length; ++f < g;) {
            b.push(c = []);
            for (var h = this[f], i = -1, j = h.length; ++i < j;) if ((e = h[i]) && (d = a.call(e.node, e.node.__data__, i))) {
                if ("__data__" in e.node) d.__data__ = e.node.__data__;
                c.push({node: d, delay: e.delay, duration: e.duration})
            } else c.push(null)
        }
        return Sa(b, this.id, this.time).ease(this.ease())
    };
    E.selectAll = function (a) {
        var b = [], c, d, e;
        "function" !== typeof a &&
        (a = Hb(a));
        for (var f = -1, g = this.length; ++f < g;) for (var h = this[f], i = -1, j = h.length; ++i < j;) if (e = h[i]) {
            d = a.call(e.node, e.node.__data__, i);
            b.push(c = []);
            for (var k = -1, l = d.length; ++k < l;) c.push({node: d[k], delay: e.delay, duration: e.duration})
        }
        return Sa(b, this.id, this.time).ease(this.ease())
    };
    E.attr = function (a, b) {
        return this.attrTween(a, Mb(a, b))
    };
    E.attrTween = function (a, b) {
        function c(a, c) {
            var d = b.call(this, a, c, this.getAttribute(e));
            return d === ca ? (this.removeAttribute(e), null) : d && function (a) {
                this.setAttribute(e, d(a))
            }
        }

        function d(a, c) {
            var d = b.call(this, a, c, this.getAttributeNS(e.space, e.local));
            return d === ca ? (this.removeAttributeNS(e.space, e.local), null) : d && function (a) {
                this.setAttributeNS(e.space, e.local, d(a))
            }
        }

        var e = d3.ns.qualify(a);
        return this.tween("attr." + a, e.local ? d : c)
    };
    E.style = function (a, b, c) {
        3 > arguments.length && (c = "");
        return this.styleTween(a, Mb(a, b), c)
    };
    E.styleTween = function (a, b, c) {
        3 > arguments.length && (c = "");
        return this.tween("style." + a, function (d, e) {
            var f = b.call(this, d, e, window.getComputedStyle(this, null).getPropertyValue(a));
            return f === ca ? (this.style.removeProperty(a), null) : f && function (b) {
                this.style.setProperty(a, f(b), c)
            }
        })
    };
    E.text = function (a) {
        return this.tween("text", function (b, c) {
            this.textContent = "function" === typeof a ? a.call(this, b, c) : a
        })
    };
    E.remove = function () {
        return this.each("end.transition", function () {
            var a;
            !this.__transition__ && (a = this.parentNode) && a.removeChild(this)
        })
    };
    E.delay = function (a) {
        var b = this;
        return b.each("function" === typeof a ? function (c, d, e) {
            b[e][d].delay = a.apply(this, arguments) | 0
        } : (a |= 0, function (c, d,
                               e) {
            b[e][d].delay = a
        }))
    };
    E.duration = function (a) {
        var b = this;
        return b.each("function" === typeof a ? function (c, d, e) {
            b[e][d].duration = Math.max(1, a.apply(this, arguments) | 0)
        } : (a = Math.max(1, a | 0), function (c, d, e) {
            b[e][d].duration = a
        }))
    };
    E.transition = function () {
        return this.select(ad)
    };
    var S = null, ta, sa;
    d3.timer = function (a, b, c) {
        var d = !1, e = S;
        if (3 > arguments.length) {
            if (2 > arguments.length) b = 0; else if (!isFinite(b)) return;
            c = Date.now()
        }
        for (; e;) {
            if (e.callback === a) {
                e.then = c;
                e.delay = b;
                d = !0;
                break
            }
            e = e.next
        }
        d || (S = {
            callback: a,
            then: c, delay: b, next: S
        });
        ta || (sa = clearTimeout(sa), ta = 1, Ob(Ta))
    };
    d3.timer.flush = function () {
        for (var a, b = Date.now(), c = S; c;) {
            a = b - c.then;
            if (!c.delay) c.flush = c.callback(a);
            c = c.next
        }
        Nb()
    };
    var Ob = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
        setTimeout(a, 17)
    };
    d3.transform = function (a) {
        var b = document.createElementNS(d3.ns.prefix.svg, "g"), c = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
        return (d3.transform =
            function (a) {
                b.setAttribute("transform", a);
                a = b.transform.baseVal.consolidate();
                return new Pb(a ? a.matrix : c)
            })(a)
    };
    Pb.prototype.toString = function () {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var Rb = 180 / Math.PI;
    d3.mouse = function (a) {
        return Sb(a, Eb())
    };
    var Ua = /WebKit/.test(navigator.userAgent) ? -1 : 0;
    d3.touches = function (a, b) {
        if (2 > arguments.length) b = Eb().touches;
        return b ? ja(b).map(function (b) {
            var d = Sb(a, b);
            d.identifier = b.identifier;
            return d
        }) : []
    };
    d3.scale = {};
    d3.scale.linear = function () {
        return Tb([0, 1], [0, 1], d3.interpolate, !1)
    };
    d3.scale.log = function () {
        return Xb(d3.scale.linear(), Ya)
    };
    var td = d3.format(".0e");
    Ya.pow = function (a) {
        return Math.pow(10, a)
    };
    va.pow = function (a) {
        return -Math.pow(10, -a)
    };
    d3.scale.pow = function () {
        return Yb(d3.scale.linear(), 1)
    };
    d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(0.5)
    };
    d3.scale.ordinal = function () {
        return Zb([], {t: "range", x: []})
    };
    d3.scale.category10 = function () {
        return d3.scale.ordinal().range(ye)
    };
    d3.scale.category20 =
        function () {
            return d3.scale.ordinal().range(ze)
        };
    d3.scale.category20b = function () {
        return d3.scale.ordinal().range(Ae)
    };
    d3.scale.category20c = function () {
        return d3.scale.ordinal().range(Be)
    };
    var ye = "#1f77b4,#ff7f0e,#2ca02c,#d62728,#9467bd,#8c564b,#e377c2,#7f7f7f,#bcbd22,#17becf".split(","),
        ze = "#1f77b4,#aec7e8,#ff7f0e,#ffbb78,#2ca02c,#98df8a,#d62728,#ff9896,#9467bd,#c5b0d5,#8c564b,#c49c94,#e377c2,#f7b6d2,#7f7f7f,#c7c7c7,#bcbd22,#dbdb8d,#17becf,#9edae5".split(","),
        Ae = "#393b79,#5254a3,#6b6ecf,#9c9ede,#637939,#8ca252,#b5cf6b,#cedb9c,#8c6d31,#bd9e39,#e7ba52,#e7cb94,#843c39,#ad494a,#d6616b,#e7969c,#7b4173,#a55194,#ce6dbd,#de9ed6".split(","),
        Be = "#3182bd,#6baed6,#9ecae1,#c6dbef,#e6550d,#fd8d3c,#fdae6b,#fdd0a2,#31a354,#74c476,#a1d99b,#c7e9c0,#756bb1,#9e9ac8,#bcbddc,#dadaeb,#636363,#969696,#bdbdbd,#d9d9d9".split(",");
    d3.scale.quantile = function () {
        return $b([], [])
    };
    d3.scale.quantize = function () {
        return ac(0, 1, [0, 1])
    };
    d3.scale.identity = function () {
        return bc([0, 1])
    };
    d3.svg = {};
    d3.svg.arc = function () {
        function a() {
            var a = b.apply(this, arguments), g = c.apply(this, arguments), h = d.apply(this, arguments) + T,
                i = e.apply(this, arguments) + T, j = (i < h && (j = h, h = i, i = j), i -
                h), k = j < Math.PI ? "0" : "1", l = Math.cos(h), h = Math.sin(h), n = Math.cos(i), i = Math.sin(i);
            return j >= Ce ? a ? "M0," + g + "A" + g + "," + g + " 0 1,1 0," + -g + "A" + g + "," + g + " 0 1,1 0," + g + "M0," + a + "A" + a + "," + a + " 0 1,0 0," + -a + "A" + a + "," + a + " 0 1,0 0," + a + "Z" : "M0," + g + "A" + g + "," + g + " 0 1,1 0," + -g + "A" + g + "," + g + " 0 1,1 0," + g + "Z" : a ? "M" + g * l + "," + g * h + "A" + g + "," + g + " 0 " + k + ",1 " + g * n + "," + g * i + "L" + a * n + "," + a * i + "A" + a + "," + a + " 0 " + k + ",0 " + a * l + "," + a * h + "Z" : "M" + g * l + "," + g * h + "A" + g + "," + g + " 0 " + k + ",1 " + g * n + "," + g * i + "L0,0Z"
        }

        var b = ud, c = vd, d = cc, e = dc;
        a.innerRadius = function (c) {
            if (!arguments.length) return b;
            b = z(c);
            return a
        };
        a.outerRadius = function (b) {
            if (!arguments.length) return c;
            c = z(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return d;
            d = z(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return e;
            e = z(b);
            return a
        };
        a.centroid = function () {
            var a = (b.apply(this, arguments) + c.apply(this, arguments)) / 2,
                g = (d.apply(this, arguments) + e.apply(this, arguments)) / 2 + T;
            return [Math.cos(g) * a, Math.sin(g) * a]
        };
        return a
    };
    var T = -Math.PI / 2, Ce = 2 * Math.PI - 1.0E-6;
    d3.svg.line = function () {
        return ec(Y)
    };
    var xa = "linear",
        ya = d3.map({
            linear: F, "step-before": $a, "step-after": ab, basis: gc, "basis-open": function (a) {
                if (4 > a.length) return F(a);
                for (var b = [], c = -1, d = a.length, e, f = [0], g = [0]; 3 > ++c;) e = a[c], f.push(e[0]), g.push(e[1]);
                b.push(J(aa, f) + "," + J(aa, g));
                for (--c; ++c < d;) e = a[c], f.shift(), f.push(e[0]), g.shift(), g.push(e[1]), ea(b, f, g);
                return b.join("")
            }, "basis-closed": function (a) {
                for (var b, c = -1, d = a.length, e = d + 4, f, g = [], h = []; 4 > ++c;) f = a[c % d], g.push(f[0]), h.push(f[1]);
                b = [J(aa, g), ",", J(aa, h)];
                for (--c; ++c < e;) f = a[c % d], g.shift(), g.push(f[0]),
                    h.shift(), h.push(f[1]), ea(b, g, h);
                return b.join("")
            }, bundle: function (a, b) {
                for (var c = a.length - 1, d = a[0][0], e = a[0][1], f = a[c][0] - d, g = a[c][1] - e, h = -1, i, j; ++h <= c;) i = a[h], j = h / c, i[0] = b * i[0] + (1 - b) * (d + j * f), i[1] = b * i[1] + (1 - b) * (e + j * g);
                return gc(a)
            }, cardinal: function (a, b) {
                return 3 > a.length ? F(a) : a[0] + za(a, bb(a, b))
            }, "cardinal-open": function (a, b) {
                return 4 > a.length ? F(a) : a[1] + za(a.slice(1, a.length - 1), bb(a, b))
            }, "cardinal-closed": function (a, b) {
                return 3 > a.length ? F(a) : a[0] + za((a.push(a[0]), a), bb([a[a.length - 2]].concat(a,
                    [a[1]]), b))
            }, monotone: function (a) {
                if (3 > a.length) a = F(a); else {
                    var b = a[0], c = [], d, e, f, g;
                    d = 0;
                    e = a.length - 1;
                    var h = [];
                    f = a[1];
                    for (g = h[0] = cb(a[0], f); ++d < e;) h[d] = g + (g = cb(f, f = a[d + 1]));
                    h[d] = g;
                    for (var i = -1, j = a.length - 1; ++i < j;) d = cb(a[i], a[i + 1]), 1.0E-6 > Math.abs(d) ? h[i] = h[i + 1] = 0 : (e = h[i] / d, f = h[i + 1] / d, g = e * e + f * f, 9 < g && (g = 3 * d / Math.sqrt(g), h[i] = g * e, h[i + 1] = g * f));
                    for (i = -1; ++i <= j;) g = (a[Math.min(j, i + 1)][0] - a[Math.max(0, i - 1)][0]) / (6 * (1 + h[i] * h[i])), c.push([g || 0, h[i] * g || 0]);
                    a = b + za(a, c)
                }
                return a
            }
        }), hc = [0, 2 / 3, 1 / 3, 0], ic = [0, 1 / 3, 2 /
        3, 0], aa = [0, 1 / 6, 2 / 3, 1 / 6];
    d3.svg.line.radial = function () {
        var a = ec(jc);
        a.radius = a.x;
        delete a.x;
        a.angle = a.y;
        delete a.y;
        return a
    };
    $a.reverse = ab;
    ab.reverse = $a;
    d3.svg.area = function () {
        return kc(Object)
    };
    d3.svg.area.radial = function () {
        var a = kc(jc);
        a.radius = a.x;
        delete a.x;
        a.innerRadius = a.x0;
        delete a.x0;
        a.outerRadius = a.x1;
        delete a.x1;
        a.angle = a.y;
        delete a.y;
        a.startAngle = a.y0;
        delete a.y0;
        a.endAngle = a.y1;
        delete a.y1;
        return a
    };
    d3.svg.chord = function () {
        function a(a, e) {
            var f = b(this, c, a, e), g = b(this, d, a, e);
            return "M" + f.p0 +
                ("A" + f.r + "," + f.r + " 0 " + +(f.a1 - f.a0 > Math.PI) + ",1 " + f.p1) + (f.a0 == g.a0 && f.a1 == g.a1 ? "Q 0,0 " + f.p0 : "Q 0,0 " + g.p0 + ("A" + g.r + "," + g.r + " 0 " + +(g.a1 - g.a0 > Math.PI) + ",1 " + g.p1) + ("Q 0,0 " + f.p0)) + "Z"
        }

        function b(a, b, c, d) {
            var l = b.call(a, c, d), b = e.call(a, l, d), c = f.call(a, l, d) + T, a = g.call(a, l, d) + T;
            return {r: b, a0: c, a1: a, p0: [b * Math.cos(c), b * Math.sin(c)], p1: [b * Math.cos(a), b * Math.sin(a)]}
        }

        var c = lc, d = mc, e = wd, f = cc, g = dc;
        a.radius = function (b) {
            if (!arguments.length) return e;
            e = z(b);
            return a
        };
        a.source = function (b) {
            if (!arguments.length) return c;
            c = z(b);
            return a
        };
        a.target = function (b) {
            if (!arguments.length) return d;
            d = z(b);
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return f;
            f = z(b);
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return g;
            g = z(b);
            return a
        };
        return a
    };
    d3.svg.diagonal = function () {
        function a(a, f) {
            var g = b.call(this, a, f), h = c.call(this, a, f), i = (g.y + h.y) / 2,
                g = [g, {x: g.x, y: i}, {x: h.x, y: i}, h], g = g.map(d);
            return "M" + g[0] + "C" + g[1] + " " + g[2] + " " + g[3]
        }

        var b = lc, c = mc, d = nc;
        a.source = function (c) {
            if (!arguments.length) return b;
            b = z(c);
            return a
        };
        a.target = function (b) {
            if (!arguments.length) return c;
            c = z(b);
            return a
        };
        a.projection = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        return a
    };
    d3.svg.diagonal.radial = function () {
        var a = d3.svg.diagonal(), b = nc, c = a.projection;
        a.projection = function (a) {
            return arguments.length ? c(xd(b = a)) : b
        };
        return a
    };
    d3.svg.mouse = d3.mouse;
    d3.svg.touches = d3.touches;
    d3.svg.symbol = function () {
        function a(a, e) {
            return (Pc.get(b.call(this, a, e)) || oc)(c.call(this, a, e))
        }

        var b = zd, c = yd;
        a.type = function (c) {
            if (!arguments.length) return b;
            b = z(c);
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return c;
            c = z(b);
            return a
        };
        return a
    };
    var Pc = d3.map({
        circle: oc, cross: function (a) {
            a = Math.sqrt(a / 5) / 2;
            return "M" + -3 * a + "," + -a + "H" + -a + "V" + -3 * a + "H" + a + "V" + -a + "H" + 3 * a + "V" + a + "H" + a + "V" + 3 * a + "H" + -a + "V" + a + "H" + -3 * a + "Z"
        }, diamond: function (a) {
            var a = Math.sqrt(a / (2 * Qc)), b = a * Qc;
            return "M0," + -a + "L" + b + ",0 0," + a + " " + -b + ",0Z"
        }, square: function (a) {
            a = Math.sqrt(a) / 2;
            return "M" + -a + "," + -a + "L" + a + "," + -a + " " + a + "," + a + " " + -a + "," + a + "Z"
        }, "triangle-down": function (a) {
            var a = Math.sqrt(a /
                Ia), b = a * Ia / 2;
            return "M0," + b + "L" + a + "," + -b + " " + -a + "," + -b + "Z"
        }, "triangle-up": function (a) {
            var a = Math.sqrt(a / Ia), b = a * Ia / 2;
            return "M0," + -b + "L" + a + "," + b + " " + -a + "," + b + "Z"
        }
    });
    d3.svg.symbolTypes = Pc.keys();
    var Ia = Math.sqrt(3), Qc = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        function a(a) {
            a.each(function () {
                var a = d3.select(this), l = null == i ? b.ticks ? b.ticks.apply(b, h) : b.domain() : i,
                    o = null == j ? b.tickFormat ? b.tickFormat.apply(b, h) : String : j, q = Ad(b, l, k),
                    r = a.selectAll(".minor").data(q, String), q = r.enter().insert("line", "g").attr("class",
                    "tick minor").style("opacity", 1.0E-6),
                    u = d3.transition(r.exit()).style("opacity", 1.0E-6).remove(),
                    r = d3.transition(r).style("opacity", 1), s = a.selectAll("g").data(l, String),
                    l = s.enter().insert("g", "path").style("opacity", 1.0E-6),
                    v = d3.transition(s.exit()).style("opacity", 1.0E-6).remove(),
                    s = d3.transition(s).style("opacity", 1), x, A = ua(b), a = a.selectAll(".domain").data([0]);
                a.enter().append("path").attr("class", "domain");
                var a = d3.transition(a), y = b.copy(), G = this.__chart__ || y;
                this.__chart__ = y;
                l.append("line").attr("class",
                    "tick");
                l.append("text");
                s.select("text").text(o);
                switch (c) {
                    case "bottom":
                        x = pc;
                        q.attr("y2", e);
                        r.attr("x2", 0).attr("y2", e);
                        l.select("line").attr("y2", d);
                        l.select("text").attr("y", Math.max(d, 0) + g);
                        s.select("line").attr("x2", 0).attr("y2", d);
                        s.select("text").attr("x", 0).attr("y", Math.max(d, 0) + g).attr("dy", ".71em").attr("text-anchor", "middle");
                        a.attr("d", "M" + A[0] + "," + f + "V0H" + A[1] + "V" + f);
                        break;
                    case "top":
                        x = pc;
                        q.attr("y2", -e);
                        r.attr("x2", 0).attr("y2", -e);
                        l.select("line").attr("y2", -d);
                        l.select("text").attr("y",
                            -(Math.max(d, 0) + g));
                        s.select("line").attr("x2", 0).attr("y2", -d);
                        s.select("text").attr("x", 0).attr("y", -(Math.max(d, 0) + g)).attr("dy", "0em").attr("text-anchor", "middle");
                        a.attr("d", "M" + A[0] + "," + -f + "V0H" + A[1] + "V" + -f);
                        break;
                    case "left":
                        x = qc;
                        q.attr("x2", -e);
                        r.attr("x2", -e).attr("y2", 0);
                        l.select("line").attr("x2", -d);
                        l.select("text").attr("x", -(Math.max(d, 0) + g));
                        s.select("line").attr("x2", -d).attr("y2", 0);
                        s.select("text").attr("x", -(Math.max(d, 0) + g)).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "end");
                        a.attr("d", "M" + -f + "," + A[0] + "H0V" + A[1] + "H" + -f);
                        break;
                    case "right":
                        x = qc, q.attr("x2", e), r.attr("x2", e).attr("y2", 0), l.select("line").attr("x2", d), l.select("text").attr("x", Math.max(d, 0) + g), s.select("line").attr("x2", d).attr("y2", 0), s.select("text").attr("x", Math.max(d, 0) + g).attr("y", 0).attr("dy", ".32em").attr("text-anchor", "start"), a.attr("d", "M" + f + "," + A[0] + "H0V" + A[1] + "H" + f)
                }
                if (b.ticks) l.call(x, G), s.call(x, y), v.call(x, y), q.call(x, G), r.call(x, y), u.call(x, y); else {
                    var t = y.rangeBand() / 2, o = function (a) {
                        return y(a) +
                            t
                    };
                    l.call(x, o);
                    s.call(x, o)
                }
            })
        }

        var b = d3.scale.linear(), c = "bottom", d = 6, e = 6, f = 6, g = 3, h = [10], i = null, j, k = 0;
        a.scale = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.orient = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.ticks = function () {
            if (!arguments.length) return h;
            h = arguments;
            return a
        };
        a.tickValues = function (b) {
            if (!arguments.length) return i;
            i = b;
            return a
        };
        a.tickFormat = function (b) {
            if (!arguments.length) return j;
            j = b;
            return a
        };
        a.tickSize = function (b, c, g) {
            if (!arguments.length) return d;
            var h =
                arguments.length - 1;
            d = +b;
            e = 1 < h ? +c : d;
            f = 0 < h ? +arguments[h] : d;
            return a
        };
        a.tickPadding = function (b) {
            if (!arguments.length) return g;
            g = +b;
            return a
        };
        a.tickSubdivide = function (b) {
            if (!arguments.length) return k;
            k = +b;
            return a
        };
        return a
    };
    d3.svg.brush = function () {
        function a(f) {
            f.each(function () {
                var f = d3.select(this), j = f.selectAll(".background").data([0]), l = f.selectAll(".extent").data([0]),
                    k = f.selectAll(".resize").data(i, String);
                f.style("pointer-events", "all").on("mousedown.brush", e).on("touchstart.brush", e);
                j.enter().append("rect").attr("class",
                    "background").style("visibility", "hidden").style("cursor", "crosshair");
                l.enter().append("rect").attr("class", "extent").style("cursor", "move");
                k.enter().append("g").attr("class", function (a) {
                    return "resize " + a
                }).style("cursor", function (a) {
                    return De[a]
                }).append("rect").attr("x", function (a) {
                    return /[ew]$/.test(a) ? -3 : null
                }).attr("y", function (a) {
                    return /^[ns]/.test(a) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
                k.style("display", a.empty() ? "none" : null);
                k.exit().remove();
                g && (l = ua(g),
                    j.attr("x", l[0]).attr("width", l[1] - l[0]), c(f));
                h && (l = ua(h), j.attr("y", l[0]).attr("height", l[1] - l[0]), d(f));
                b(f)
            })
        }

        function b(a) {
            a.selectAll(".resize").attr("transform", function (a) {
                return "translate(" + j[+/e$/.test(a)][0] + "," + j[+/^s/.test(a)][1] + ")"
            })
        }

        function c(a) {
            a.select(".extent").attr("x", j[0][0]);
            a.selectAll(".extent,.n>rect,.s>rect").attr("width", j[1][0] - j[0][0])
        }

        function d(a) {
            a.select(".extent").attr("y", j[0][1]);
            a.selectAll(".extent,.e>rect,.w>rect").attr("height", j[1][1] - j[0][1])
        }

        function e() {
            function e() {
                var a =
                    d3.event.changedTouches;
                return a ? d3.touches(q, a)[0] : d3.mouse(q)
            }

            function i() {
                var a = e(), f = !1;
                U && (a[0] += U[0], a[1] += U[1]);
                y || (d3.event.altKey ? (G || (G = [(j[0][0] + j[1][0]) / 2, (j[0][1] + j[1][1]) / 2]), t[0] = j[+(a[0] < G[0])][0], t[1] = j[+(a[1] < G[1])][1]) : G = null);
                x && m(a, g, 0) && (c(s), f = !0);
                A && m(a, h, 1) && (d(s), f = !0);
                f && (b(s), u({type: "brush", mode: y ? "move" : "resize"}))
            }

            function m(a, b, c) {
                var d = ua(b), b = d[0], e = d[1], d = t[c], f = j[1][c] - j[0][c];
                y && (b -= d, e -= f + d);
                a = Math.max(b, Math.min(e, a[c]));
                y ? b = (a += d) + f : (G && (d = Math.max(b, Math.min(e,
                    2 * G[c] - a))), d < a ? (b = a, a = d) : b = d);
                if (j[0][c] !== a || j[1][c] !== b) return k = null, j[0][c] = a, j[1][c] = b, !0
            }

            function o() {
                i();
                s.style("pointer-events", "all").selectAll(".resize").style("display", a.empty() ? "none" : null);
                d3.select("body").style("cursor", null);
                I.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
                u({type: "brushend"});
                B()
            }

            var q = this, r = d3.select(d3.event.target), u = f.of(q, arguments), s = d3.select(q), v =
                    r.datum(), x = !/^(n|s)$/.test(v) && g, A = !/^(e|w)$/.test(v) && h, y = r.classed("extent"), G,
                t = e(), U,
                I = d3.select(window).on("mousemove.brush", i).on("mouseup.brush", o).on("touchmove.brush", i).on("touchend.brush", o).on("keydown.brush", function () {
                    32 == d3.event.keyCode && (y || (G = null, t[0] -= j[1][0], t[1] -= j[1][1], y = 2), B())
                }).on("keyup.brush", function () {
                    32 == d3.event.keyCode && 2 == y && (t[0] += j[1][0], t[1] += j[1][1], y = 0, B())
                });
            if (y) t[0] = j[0][0] - t[0], t[1] = j[0][1] - t[1]; else if (v) {
                var p = +/w$/.test(v), v = +/^n/.test(v);
                U = [j[1 - p][0] -
                t[0], j[1 - v][1] - t[1]];
                t[0] = j[p][0];
                t[1] = j[v][1]
            } else d3.event.altKey && (G = t.slice());
            s.style("pointer-events", "none").selectAll(".resize").style("display", null);
            d3.select("body").style("cursor", r.style("cursor"));
            u({type: "brushstart"});
            i();
            B()
        }

        var f = Oa(a, "brushstart", "brush", "brushend"), g = null, h = null, i = ub[0], j = [[0, 0], [0, 0]], k;
        a.x = function (b) {
            if (!arguments.length) return g;
            g = b;
            i = ub[!g << 1 | !h];
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return h;
            h = b;
            i = ub[!g << 1 | !h];
            return a
        };
        a.extent = function (b) {
            var c,
                d, e, f, i;
            if (!arguments.length) return b = k || j, g && (c = b[0][0], d = b[1][0], k || (c = j[0][0], d = j[1][0], g.invert && (c = g.invert(c), d = g.invert(d)), d < c && (i = c, c = d, d = i))), h && (e = b[0][1], f = b[1][1], k || (e = j[0][1], f = j[1][1], h.invert && (e = h.invert(e), f = h.invert(f)), f < e && (i = e, e = f, f = i))), g && h ? [[c, e], [d, f]] : g ? [c, d] : h && [e, f];
            k = [[0, 0], [0, 0]];
            g && (c = b[0], d = b[1], h && (c = c[0], d = d[0]), k[0][0] = c, k[1][0] = d, g.invert && (c = g(c), d = g(d)), d < c && (i = c, c = d, d = i), j[0][0] = c | 0, j[1][0] = d | 0);
            h && (e = b[0], f = b[1], g && (e = e[1], f = f[1]), k[0][1] = e, k[1][1] = f, h.invert &&
            (e = h(e), f = h(f)), f < e && (i = e, e = f, f = i), j[0][1] = e | 0, j[1][1] = f | 0);
            return a
        };
        a.clear = function () {
            k = null;
            j[0][0] = j[0][1] = j[1][0] = j[1][1] = 0;
            return a
        };
        a.empty = function () {
            return g && j[0][0] === j[1][0] || h && j[0][1] === j[1][1]
        };
        return d3.rebind(a, f, "on")
    };
    var De = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }, ub = ["n,e,s,w,nw,ne,se,sw".split(","), ["e", "w"], ["n", "s"], []];
    d3.behavior = {};
    d3.behavior.drag = function () {
        function a() {
            this.on("mousedown.drag",
                b).on("touchstart.drag", b)
        }

        function b() {
            function a() {
                var b = i.parentNode, c = d3.event.changedTouches;
                return c ? d3.touches(b, c)[0] : d3.mouse(b)
            }

            function b() {
                if (!i.parentNode) return g();
                var c = a(), d = c[0] - n[0], f = c[1] - n[1];
                m |= d | f;
                n = c;
                B();
                j({type: "drag", x: c[0] + l[0], y: c[1] + l[1], dx: d, dy: f})
            }

            function g() {
                j({type: "dragend"});
                if (m && (B(), d3.event.target === k)) o.on("click.drag", h, !0);
                o.on("mousemove.drag", null).on("touchmove.drag", null).on("mouseup.drag", null).on("touchend.drag", null)
            }

            function h() {
                B();
                o.on("click.drag",
                    null)
            }

            var i = this, j = c.of(i, arguments), k = d3.event.target, l, n = a(), m = 0,
                o = d3.select(window).on("mousemove.drag", b).on("touchmove.drag", b).on("mouseup.drag", g, !0).on("touchend.drag", g, !0);
            d ? (l = d.apply(i, arguments), l = [l.x - n[0], l.y - n[1]]) : l = [0, 0];
            B();
            j({type: "dragstart"})
        }

        var c = Oa(a, "drag", "dragstart", "dragend"), d = null;
        a.origin = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        return d3.rebind(a, c, "on")
    };
    d3.behavior.zoom = function () {
        function a() {
            this.on("mousedown.zoom", f).on("mousewheel.zoom", g).on("mousemove.zoom",
                h).on("DOMMouseScroll.zoom", g).on("dblclick.zoom", i).on("touchstart.zoom", j).on("touchmove.zoom", k).on("touchend.zoom", j)
        }

        function b(a) {
            return [(a[0] - l[0]) / m, (a[1] - l[1]) / m]
        }

        function c(a) {
            m = Math.max(q[0], Math.min(q[1], a))
        }

        function d(a, b) {
            b = [b[0] * m + l[0], b[1] * m + l[1]];
            l[0] += a[0] - b[0];
            l[1] += a[1] - b[1]
        }

        function e(a) {
            s && s.domain(u.range().map(function (a) {
                return (a - l[0]) / m
            }).map(u.invert));
            x && x.domain(v.range().map(function (a) {
                return (a - l[1]) / m
            }).map(v.invert));
            d3.event.preventDefault();
            a({
                type: "zoom", scale: m,
                translate: l
            })
        }

        function f() {
            function a() {
                B();
                i.on("click.zoom", null)
            }

            var c = this, f = r.of(c, arguments), g = d3.event.target, h = 0,
                i = d3.select(window).on("mousemove.zoom", function () {
                    h = 1;
                    d(d3.mouse(c), j);
                    e(f)
                }).on("mouseup.zoom", function () {
                    h && B();
                    i.on("mousemove.zoom", null).on("mouseup.zoom", null);
                    if (h && d3.event.target === g) i.on("click.zoom", a, !0)
                }), j = b(d3.mouse(c));
            window.focus();
            B()
        }

        function g() {
            n || (n = b(d3.mouse(this)));
            c(Math.pow(2, 0.0020 * Bd()) * m);
            d(d3.mouse(this), n);
            e(r.of(this, arguments))
        }

        function h() {
            n =
                null
        }

        function i() {
            var a = d3.mouse(this), f = b(a);
            c(d3.event.shiftKey ? m / 2 : 2 * m);
            d(a, f);
            e(r.of(this, arguments))
        }

        function j() {
            var a = d3.touches(this), f = Date.now();
            o = m;
            n = {};
            a.forEach(function (a) {
                n[a.identifier] = b(a)
            });
            B();
            if (1 === a.length && 500 > f - A) {
                var g = a[0], a = b(a[0]);
                c(2 * m);
                d(g, a);
                e(r.of(this, arguments))
            }
            A = f
        }

        function k() {
            var a = d3.touches(this), b = a[0], f = n[b.identifier];
            if (a = a[1]) {
                var g = n[a.identifier], b = [(b[0] + a[0]) / 2, (b[1] + a[1]) / 2],
                    f = [(f[0] + g[0]) / 2, (f[1] + g[1]) / 2];
                c(d3.event.scale * o)
            }
            d(b, f);
            e(r.of(this, arguments))
        }

        var l = [0, 0], n, m = 1, o, q = Rc, r = Oa(a, "zoom"), u, s, v, x, A;
        a.translate = function (b) {
            if (!arguments.length) return l;
            l = b.map(Number);
            return a
        };
        a.scale = function (b) {
            if (!arguments.length) return m;
            m = +b;
            return a
        };
        a.scaleExtent = function (b) {
            if (!arguments.length) return q;
            q = null == b ? Rc : b.map(Number);
            return a
        };
        a.x = function (b) {
            if (!arguments.length) return s;
            s = b;
            u = b.copy();
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return x;
            x = b;
            v = b.copy();
            return a
        };
        return d3.rebind(a, r, "on")
    };
    var fa, Rc = [0, Infinity];
    d3.layout = {};
    d3.layout.bundle =
        function () {
            return function (a) {
                for (var b = [], c = -1, d = a.length; ++c < d;) b.push(Cd(a[c]));
                return b
            }
        };
    d3.layout.chord = function () {
        function a() {
            var a = {}, c = [], m = d3.range(g), o = [], q, r, u, s, v;
            d = [];
            e = [];
            for (q = 0, s = -1; ++s < g;) {
                for (r = 0, v = -1; ++v < g;) r += f[s][v];
                c.push(r);
                o.push(d3.range(g));
                q += r
            }
            i && m.sort(function (a, b) {
                return i(c[a], c[b])
            });
            j && o.forEach(function (a, b) {
                a.sort(function (a, c) {
                    return j(f[b][a], f[b][c])
                })
            });
            q = (2 * Math.PI - h * g) / q;
            for (r = 0, s = -1; ++s < g;) {
                for (u = r, v = -1; ++v < g;) {
                    var x = m[s], A = o[x][v], y = f[x][A], G = r, t = r += y *
                        q;
                    a[x + "-" + A] = {index: x, subindex: A, startAngle: G, endAngle: t, value: y}
                }
                e[x] = {index: x, startAngle: u, endAngle: r, value: (r - u) / q};
                r += h
            }
            for (s = -1; ++s < g;) for (v = s - 1; ++v < g;) if (m = a[s + "-" + v], o = a[v + "-" + s], m.value || o.value) d.push(m.value < o.value ? {
                source: o,
                target: m
            } : {source: m, target: o});
            k && b()
        }

        function b() {
            d.sort(function (a, b) {
                return k((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2)
            })
        }

        var c = {}, d, e, f, g, h = 0, i, j, k;
        c.matrix = function (a) {
            if (!arguments.length) return f;
            g = (f = a) && f.length;
            d = e = null;
            return c
        };
        c.padding = function (a) {
            if (!arguments.length) return h;
            h = a;
            d = e = null;
            return c
        };
        c.sortGroups = function (a) {
            if (!arguments.length) return i;
            i = a;
            d = e = null;
            return c
        };
        c.sortSubgroups = function (a) {
            if (!arguments.length) return j;
            j = a;
            d = null;
            return c
        };
        c.sortChords = function (a) {
            if (!arguments.length) return k;
            k = a;
            d && b();
            return c
        };
        c.chords = function () {
            d || a();
            return d
        };
        c.groups = function () {
            e || a();
            return e
        };
        return c
    };
    d3.layout.force = function () {
        function a(a) {
            return function (b, c, d, e) {
                if (b.point !== a) {
                    var d = b.cx - a.x, f = b.cy - a.y, g =
                        1 / Math.sqrt(d * d + f * f);
                    if ((e - c) * g < n) return c = b.charge * g * g, a.px -= d * c, a.py -= f * c, !0;
                    b.point && isFinite(g) && (c = b.pointCharge * g * g, a.px -= d * c, a.py -= f * c)
                }
                return !b.charge
            }
        }

        function b(a) {
            sc(V = a);
            db = c
        }

        var c = {}, d = d3.dispatch("start", "tick", "end"), e = [1, 1], f, g, h = 0.9, i = Gd, j = Hd, k = -30,
            l = 0.1, n = 0.8, m = [], o = [], q, r, u;
        c.tick = function () {
            if (0.0050 > (g *= 0.99)) return d.end({type: "end", alpha: g = 0}), !0;
            var b = m.length, c = o.length, f, i, j, n, t, p, I;
            for (f = 0; f < c; ++f) if (i = o[f], j = i.source, n = i.target, p = n.x - j.x, I = n.y - j.y, t = p * p + I * I) t = g * r[f] * ((t =
                Math.sqrt(t)) - q[f]) / t, p *= t, I *= t, n.x -= p * (t = j.weight / (n.weight + j.weight)), n.y -= I * t, j.x += p * (t = 1 - t), j.y += I * t;
            if (t = g * l) if (p = e[0] / 2, I = e[1] / 2, f = -1, t) for (; ++f < b;) i = m[f], i.x += (p - i.x) * t, i.y += (I - i.y) * t;
            if (k) {
                tc(c = d3.geom.quadtree(m), g, u);
                for (f = -1; ++f < b;) (i = m[f]).fixed || c.visit(a(i))
            }
            for (f = -1; ++f < b;) i = m[f], i.fixed ? (i.x = i.px, i.y = i.py) : (i.x -= (i.px - (i.px = i.x)) * h, i.y -= (i.py - (i.py = i.y)) * h);
            d.tick({type: "tick", alpha: g})
        };
        c.nodes = function (a) {
            if (!arguments.length) return m;
            m = a;
            return c
        };
        c.links = function (a) {
            if (!arguments.length) return o;
            o = a;
            return c
        };
        c.size = function (a) {
            if (!arguments.length) return e;
            e = a;
            return c
        };
        c.linkDistance = function (a) {
            if (!arguments.length) return i;
            i = z(a);
            return c
        };
        c.distance = c.linkDistance;
        c.linkStrength = function (a) {
            if (!arguments.length) return j;
            j = z(a);
            return c
        };
        c.friction = function (a) {
            if (!arguments.length) return h;
            h = a;
            return c
        };
        c.charge = function (a) {
            if (!arguments.length) return k;
            k = "function" === typeof a ? a : +a;
            return c
        };
        c.gravity = function (a) {
            if (!arguments.length) return l;
            l = a;
            return c
        };
        c.theta = function (a) {
            if (!arguments.length) return n;
            n = a;
            return c
        };
        c.alpha = function (a) {
            if (!arguments.length) return g;
            g ? g = 0 < a ? a : 0 : 0 < a && (d.start({type: "start", alpha: g = a}), d3.timer(c.tick));
            return c
        };
        c.start = function () {
            function a(c, e) {
                var h;
                if (!n) {
                    n = [];
                    for (d = 0; d < f; ++d) n[d] = [];
                    for (d = 0; d < g; ++d) h = o[d], n[h.source.index].push(h.target), n[h.target.index].push(h.source)
                }
                h = n[b];
                for (var i = -1, j = h.length, k; ++i < j;) if (!isNaN(k = h[i][c])) return k;
                return Math.random() * e
            }

            var b, d, f = m.length, g = o.length, h = e[0], l = e[1], n, p;
            for (b = 0; b < f; ++b) (p = m[b]).index = b, p.weight = 0;
            q = [];
            r =
                [];
            for (b = 0; b < g; ++b) {
                p = o[b];
                if ("number" == typeof p.source) p.source = m[p.source];
                if ("number" == typeof p.target) p.target = m[p.target];
                q[b] = i.call(this, p, b);
                r[b] = j.call(this, p, b);
                ++p.source.weight;
                ++p.target.weight
            }
            for (b = 0; b < f; ++b) {
                p = m[b];
                if (isNaN(p.x)) p.x = a("x", h);
                if (isNaN(p.y)) p.y = a("y", l);
                if (isNaN(p.px)) p.px = p.x;
                if (isNaN(p.py)) p.py = p.y
            }
            u = [];
            if ("function" === typeof k) for (b = 0; b < f; ++b) u[b] = +k.call(this, m[b], b); else for (b = 0; b < f; ++b) u[b] = k;
            return c.resume()
        };
        c.resume = function () {
            return c.alpha(0.1)
        };
        c.stop = function () {
            return c.alpha(0)
        };
        c.drag = function () {
            f || (f = d3.behavior.drag().origin(Y).on("dragstart", b).on("drag", Fd).on("dragend", Ed));
            this.on("mouseover.force", sc).on("mouseout.force", Dd).call(f)
        };
        return d3.rebind(c, d, "on")
    };
    var db, V;
    d3.layout.partition = function () {
        function a(b, c, d, e) {
            var j = b.children;
            b.x = c;
            b.y = b.depth * e;
            b.dx = d;
            b.dy = e;
            if (j && (l = j.length)) for (var k = -1, l, n, d = b.value ? d / b.value : 0; ++k < l;) a(n = j[k], c, b = n.value * d, e), c += b
        }

        function b(a) {
            var a = a.children, c = 0;
            if (a && (e = a.length)) for (var d = -1, e; ++d < e;) c = Math.max(c, b(a[d]));
            return 1 +
                c
        }

        function c(c, g) {
            var h = d.call(this, c, g);
            a(h[0], 0, e[0], e[1] / b(h[0]));
            return h
        }

        var d = d3.layout.hierarchy(), e = [1, 1];
        c.size = function (a) {
            if (!arguments.length) return e;
            e = a;
            return c
        };
        return ga(c, d)
    };
    d3.layout.pie = function () {
        function a(f, g) {
            var h = f.map(function (c, d) {
                    return +b.call(a, c, d)
                }), i = +("function" === typeof d ? d.apply(this, arguments) : d),
                j = (("function" === typeof e ? e.apply(this, arguments) : e) - d) / d3.sum(h), k = d3.range(f.length);
            null != c && k.sort(c === Sc ? function (a, b) {
                return h[b] - h[a]
            } : function (a, b) {
                return c(f[a],
                    f[b])
            });
            var l = [];
            k.forEach(function (a) {
                var b;
                l[a] = {data: f[a], value: b = h[a], startAngle: i, endAngle: i += b * j}
            });
            return l
        }

        var b = Number, c = Sc, d = 0, e = 2 * Math.PI;
        a.value = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.sort = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.startAngle = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        a.endAngle = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return a
    };
    var Sc = {};
    d3.layout.stack = function () {
        function a(h, i) {
            var j = h.map(function (c, d) {
                    return b.call(a,
                        c, d)
                }), k = j.map(function (b) {
                    return b.map(function (b, c) {
                        return [f.call(a, b, c), g.call(a, b, c)]
                    })
                }), l = c.call(a, k, i), j = d3.permute(j, l), k = d3.permute(k, l), l = d.call(a, k, i), n = j.length,
                m = j[0].length, o, q, r;
            for (q = 0; q < m; ++q) {
                e.call(a, j[0][q], r = l[q], k[0][q][1]);
                for (o = 1; o < n; ++o) e.call(a, j[o][q], r += k[o - 1][q][1], k[o][q][1])
            }
            return h
        }

        var b = Y, c = eb, d = fb, e = Kd, f = Id, g = Jd;
        a.values = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.order = function (b) {
            if (!arguments.length) return c;
            c = "function" === typeof b ? b : Ee.get(b) ||
                eb;
            return a
        };
        a.offset = function (b) {
            if (!arguments.length) return d;
            d = "function" === typeof b ? b : Fe.get(b) || fb;
            return a
        };
        a.x = function (b) {
            if (!arguments.length) return f;
            f = b;
            return a
        };
        a.y = function (b) {
            if (!arguments.length) return g;
            g = b;
            return a
        };
        a.out = function (b) {
            if (!arguments.length) return e;
            e = b;
            return a
        };
        return a
    };
    var Ee = d3.map({
        "inside-out": function (a) {
            for (var b = a.length, c, d = a.map(Ld), e = a.map(Md), f = d3.range(b).sort(function (a, b) {
                return d[a] - d[b]
            }), g = 0, h = 0, i = [], j = [], a = 0; a < b; ++a) c = f[a], g < h ? (g += e[c], i.push(c)) :
                (h += e[c], j.push(c));
            return j.reverse().concat(i)
        }, reverse: function (a) {
            return d3.range(a.length).reverse()
        }, "default": eb
    }), Fe = d3.map({
        silhouette: function (a) {
            var b = a.length, c = a[0].length, d = [], e = 0, f, g, h, i = [];
            for (g = 0; g < c; ++g) {
                for (f = 0, h = 0; f < b; f++) h += a[f][g][1];
                h > e && (e = h);
                d.push(h)
            }
            for (g = 0; g < c; ++g) i[g] = (e - d[g]) / 2;
            return i
        }, wiggle: function (a) {
            var b = a.length, c = a[0], d = c.length, e, f, g, h, i, j, k, l, n, m = [];
            m[0] = l = n = 0;
            for (f = 1; f < d; ++f) {
                for (e = 0, h = 0; e < b; ++e) h += a[e][f][1];
                for (e = 0, i = 0, k = c[f][0] - c[f - 1][0]; e < b; ++e) {
                    for (g =
                             0, j = (a[e][f][1] - a[e][f - 1][1]) / (2 * k); g < e; ++g) j += (a[g][f][1] - a[g][f - 1][1]) / k;
                    i += j * a[e][f][1]
                }
                m[f] = l -= h ? i / h * k : 0;
                l < n && (n = l)
            }
            for (f = 0; f < d; ++f) m[f] -= n;
            return m
        }, expand: function (a) {
            var b = a.length, c = a[0].length, d = 1 / b, e, f, g, h = [];
            for (f = 0; f < c; ++f) {
                for (e = 0, g = 0; e < b; e++) g += a[e][f][1];
                if (g) for (e = 0; e < b; e++) a[e][f][1] /= g; else for (e = 0; e < b; e++) a[e][f][1] = d
            }
            for (f = 0; f < c; ++f) h[f] = 0;
            return h
        }, zero: fb
    });
    d3.layout.histogram = function () {
        function a(a, g) {
            for (var h = [], i = a.map(c, this), j = d.call(this, i, g), k = e.call(this, j, i, g), l, g =
                -1, n = i.length, m = k.length - 1, o = b ? 1 : 1 / n; ++g < m;) l = h[g] = [], l.dx = k[g + 1] - (l.x = k[g]), l.y = 0;
            if (0 < m) for (g = -1; ++g < n;) l = i[g], l >= j[0] && l <= j[1] && (l = h[d3.bisect(k, l, 1, m) - 1], l.y += o, l.push(a[g]));
            return h
        }

        var b = !0, c = Number, d = Pd, e = Od;
        a.value = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.range = function (b) {
            if (!arguments.length) return d;
            d = z(b);
            return a
        };
        a.bins = function (b) {
            if (!arguments.length) return e;
            e = "number" === typeof b ? function (a) {
                return uc(a, b)
            } : z(b);
            return a
        };
        a.frequency = function (c) {
            if (!arguments.length) return b;
            b = !!c;
            return a
        };
        return a
    };
    d3.layout.hierarchy = function () {
        function a(b, h, i) {
            var j = e.call(c, b, h), k = gb ? b : {data: b};
            k.depth = h;
            i.push(k);
            if (j && (l = j.length)) {
                for (var b = -1, l, n = k.children = [], m = 0, h = h + 1, o; ++b < l;) o = a(j[b], h, i), o.parent = k, n.push(o), m += o.value;
                d && n.sort(d);
                if (f) k.value = m
            } else if (f) k.value = +f.call(c, b, h) || 0;
            return k
        }

        function b(a, d) {
            var e = a.children, j = 0;
            if (e && (l = e.length)) for (var k = -1, l, n = d + 1; ++k < l;) j += b(e[k], n); else f && (j = +f.call(c, gb ? a : a.data, d) || 0);
            if (f) a.value = j;
            return j
        }

        function c(b) {
            var c =
                [];
            a(b, 0, c);
            return c
        }

        var d = Td, e = Rd, f = Sd;
        c.sort = function (a) {
            if (!arguments.length) return d;
            d = a;
            return c
        };
        c.children = function (a) {
            if (!arguments.length) return e;
            e = a;
            return c
        };
        c.value = function (a) {
            if (!arguments.length) return f;
            f = a;
            return c
        };
        c.revalue = function (a) {
            b(a, 0);
            return a
        };
        return c
    };
    var gb = !1;
    d3.layout.pack = function () {
        function a(a, e) {
            var f = b.call(this, a, e), g = f[0];
            g.x = 0;
            g.y = 0;
            yc(g);
            var h = c[0], i = c[1], j = 1 / Math.max(2 * g.r / h, 2 * g.r / i);
            zc(g, h / 2, i / 2, j);
            return f
        }

        var b = d3.layout.hierarchy().sort(Ud), c = [1, 1];
        a.size = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        return ga(a, b)
    };
    d3.layout.cluster = function () {
        function a(a, f) {
            var g = b.call(this, a, f), h = g[0], i, j = 0;
            Ba(h, function (a) {
                var b = a.children;
                b && b.length ? (a.x = Zd(b), a.y = Yd(b)) : (a.x = i ? j += c(a, i) : 0, a.y = 0, i = a)
            });
            var k = Ac(h), l = Bc(h), n = k.x - c(k, l) / 2, m = l.x + c(l, k) / 2;
            Ba(h, function (a) {
                a.x = (a.x - n) / (m - n) * d[0];
                a.y = (1 - (h.y ? a.y / h.y : 1)) * d[1]
            });
            return g
        }

        var b = d3.layout.hierarchy().sort(null).value(null), c = Cc, d = [1, 1];
        a.separation = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        return ga(a, b)
    };
    d3.layout.tree = function () {
        function a(a, f) {
            function g(a, b) {
                var d = a.children, e = a._tree;
                if (d && (f = d.length)) {
                    for (var f, h = d[0], i, j = h, k, l = -1; ++l < f;) {
                        k = d[l];
                        g(k, i);
                        var m = k;
                        if (i) {
                            for (var n = m, q = m, o = m.parent.children[0], p = n._tree.mod, w = q._tree.mod, z = i._tree.mod, D = o._tree.mod, C = void 0; i = jb(i), n = ib(n), i && n;) {
                                o = ib(o);
                                q = jb(q);
                                q._tree.ancestor = m;
                                C = i._tree.prelim + z - n._tree.prelim - p + c(i, n);
                                if (0 < C) {
                                    var E = i._tree.ancestor.parent ==
                                        m.parent ? i._tree.ancestor : j, B = m, F = C, E = E._tree, B = B._tree,
                                        H = F / (B.number - E.number);
                                    E.change += H;
                                    B.change -= H;
                                    B.shift += F;
                                    B.prelim += F;
                                    B.mod += F;
                                    p += C;
                                    w += C
                                }
                                z += i._tree.mod;
                                p += n._tree.mod;
                                D += o._tree.mod;
                                w += q._tree.mod
                            }
                            if (i && !jb(q)) q._tree.thread = i, q._tree.mod += z - w;
                            if (n && !ib(o)) o._tree.thread = n, o._tree.mod += p - D, j = m
                        }
                        i = k
                    }
                    f = d = 0;
                    l = a.children;
                    for (m = l.length; 0 <= --m;) j = l[m]._tree, j.prelim += d, j.mod += d, d += j.shift + (f += j.change);
                    h = 0.5 * (h._tree.prelim + k._tree.prelim);
                    b ? (e.prelim = b._tree.prelim + c(a, b), e.mod = e.prelim - h) : e.prelim =
                        h
                } else if (b) e.prelim = b._tree.prelim + c(a, b)
            }

            function h(a, b) {
                a.x = a._tree.prelim + b;
                var c = a.children;
                if (c && (e = c.length)) for (var d = -1, e, b = b + a._tree.mod; ++d < e;) h(c[d], b)
            }

            var i = b.call(this, a, f), j = i[0];
            Ba(j, function (a, b) {
                a._tree = {ancestor: a, prelim: 0, mod: 0, change: 0, shift: 0, number: b ? b._tree.number + 1 : 0}
            });
            g(j);
            h(j, -j._tree.prelim);
            var k = Aa(j, ae), l = Aa(j, $d), n = Aa(j, be), m = k.x - c(k, l) / 2, o = l.x + c(l, k) / 2,
                q = n.depth || 1;
            Ba(j, function (a) {
                a.x = (a.x - m) / (o - m) * d[0];
                a.y = a.depth / q * d[1];
                delete a._tree
            });
            return i
        }

        var b = d3.layout.hierarchy().sort(null).value(null),
            c = Cc, d = [1, 1];
        a.separation = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.size = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        return ga(a, b)
    };
    d3.layout.treemap = function () {
        function a(a, b) {
            for (var c = -1, d = a.length, e, f; ++c < d;) f = (e = a[c]).value * (0 > b ? 0 : b), e.area = isNaN(f) || 0 >= f ? 0 : f
        }

        function b(c) {
            var e = c.children;
            if (e && e.length) {
                var f = j(c), g = [], h = e.slice(), i = Infinity, k = Math.min(f.dx, f.dy);
                a(h, f.dx * f.dy / c.value);
                for (g.area = 0; 0 < (c = h.length);) {
                    g.push(c = h[c - 1]);
                    g.area += c.area;
                    for (var c = k, l =
                        g.area, p = void 0, y = 0, w = Infinity, t = -1, z = g.length; ++t < z;) if (p = g[t].area) p < w && (w = p), p > y && (y = p);
                    l *= l;
                    c *= c;
                    (c = l ? Math.max(c * y * n / l, l / (c * w * n)) : Infinity) <= i ? (h.pop(), i = c) : (g.area -= g.pop().area, d(g, k, f, !1), k = Math.min(f.dx, f.dy), g.length = g.area = 0, i = Infinity)
                }
                if (g.length) d(g, k, f, !0), g.length = g.area = 0;
                e.forEach(b)
            }
        }

        function c(b) {
            var e = b.children;
            if (e && e.length) {
                var f = j(b), g = e.slice(), h = [];
                a(g, f.dx * f.dy / b.value);
                for (h.area = 0; b = g.pop();) if (h.push(b), h.area += b.area, null != b.z) d(h, b.z ? f.dx : f.dy, f, !g.length), h.length =
                    h.area = 0;
                e.forEach(c)
            }
        }

        function d(a, b, c, d) {
            var e = -1, f = a.length, h = c.x, i = c.y, j = b ? g(a.area / b) : 0, k;
            if (b == c.dx) {
                if (d || j > c.dy) j = c.dy;
                for (; ++e < f;) k = a[e], k.x = h, k.y = i, k.dy = j, h += k.dx = Math.min(c.x + c.dx - h, j ? g(k.area / j) : 0);
                k.z = !0;
                k.dx += c.x + c.dx - h;
                c.y += j;
                c.dy -= j
            } else {
                if (d || j > c.dx) j = c.dx;
                for (; ++e < f;) k = a[e], k.x = h, k.y = i, k.dx = j, i += k.dy = Math.min(c.y + c.dy - i, j ? g(k.area / j) : 0);
                k.z = !1;
                k.dy += c.y + c.dy - i;
                c.x += j;
                c.dx -= j
            }
        }

        function e(d) {
            var d = l || f(d), e = d[0];
            e.x = 0;
            e.y = 0;
            e.dx = h[0];
            e.dy = h[1];
            l && f.revalue(e);
            a([e], e.dx * e.dy / e.value);
            (l ? c : b)(e);
            k && (l = d);
            return d
        }

        var f = d3.layout.hierarchy(), g = Math.round, h = [1, 1], i = null, j = kb, k = !1, l,
            n = 0.5 * (1 + Math.sqrt(5));
        e.size = function (a) {
            if (!arguments.length) return h;
            h = a;
            return e
        };
        e.padding = function (a) {
            function b(c) {
                var d = a.call(e, c, c.depth);
                return null == d ? kb(c) : Dc(c, "number" === typeof d ? [d, d, d, d] : d)
            }

            function c(b) {
                return Dc(b, a)
            }

            if (!arguments.length) return i;
            var d;
            j = null == (i = a) ? kb : "function" === (d = typeof a) ? b : "number" === d ? (a = [a, a, a, a], c) : c;
            return e
        };
        e.round = function (a) {
            if (!arguments.length) return g !=
                Number;
            g = a ? Math.round : Number;
            return e
        };
        e.sticky = function (a) {
            if (!arguments.length) return k;
            k = a;
            l = null;
            return e
        };
        e.ratio = function (a) {
            if (!arguments.length) return n;
            n = a;
            return e
        };
        return ga(e, f)
    };
    d3.csv = function (a, b) {
        d3.text(a, "text/csv", function (a) {
            b(a && d3.csv.parse(a))
        })
    };
    d3.csv.parse = function (a) {
        var b;
        return d3.csv.parseRows(a, function (a, d) {
            if (d) {
                for (var e = {}, f = -1, g = b.length; ++f < g;) e[b[f]] = a[f];
                return e
            }
            b = a;
            return null
        })
    };
    d3.csv.parseRows = function (a, b) {
        function c() {
            if (g.lastIndex >= a.length) return e;
            if (j) return j = !1, d;
            var b = g.lastIndex;
            if (34 === a.charCodeAt(b)) {
                for (var c = b; c++ < a.length;) if (34 === a.charCodeAt(c)) {
                    if (34 !== a.charCodeAt(c + 1)) break;
                    c++
                }
                g.lastIndex = c + 2;
                var f = a.charCodeAt(c + 1);
                13 === f ? (j = !0, 10 === a.charCodeAt(c + 2) && g.lastIndex++) : 10 === f && (j = !0);
                return a.substring(b + 1, c).replace(/""/g, '"')
            }
            if (c = g.exec(a)) return j = 44 !== c[0].charCodeAt(0), a.substring(b, c.index);
            g.lastIndex = a.length;
            return a.substring(b)
        }

        var d = {}, e = {}, f = [], g = /\r\n|[,\r\n]/g, h = 0, i, j;
        for (g.lastIndex = 0; (i = c()) !== e;) {
            for (var k =
                []; i !== d && i !== e;) k.push(i), i = c();
            (!b || (k = b(k, h++))) && f.push(k)
        }
        return f
    };
    d3.csv.format = function (a) {
        return a.map(ce).join("\n")
    };
    d3.geo = {};
    var p = Math.PI / 180;
    d3.geo.azimuthal = function () {
        function a(a) {
            var c = a[0] * p - f, g = a[1] * p, a = Math.cos(c), c = Math.sin(c), n = Math.cos(g), g = Math.sin(g),
                m = "orthographic" !== b ? i * g + h * n * a : null, o,
                m = "stereographic" === b ? 1 / (1 + m) : "gnomonic" === b ? 1 / m : "equidistant" === b ? (o = Math.acos(m), o ? o / Math.sin(o) : 0) : "equalarea" === b ? Math.sqrt(2 / (1 + m)) : 1;
            return [d * m * n * c + e[0], d * m * (i * n * a - h * g) + e[1]]
        }

        var b =
            "orthographic", c, d = 200, e = [480, 250], f, g, h, i;
        a.invert = function (a) {
            var c = (a[0] - e[0]) / d, a = (a[1] - e[1]) / d, g = Math.sqrt(c * c + a * a),
                n = "stereographic" === b ? 2 * Math.atan(g) : "gnomonic" === b ? Math.atan(g) : "equidistant" === b ? g : "equalarea" === b ? 2 * Math.asin(0.5 * g) : Math.asin(g),
                m = Math.sin(n), n = Math.cos(n);
            return [(f + Math.atan2(c * m, g * h * n + a * i * m)) / p, Math.asin(n * i - (g ? a * m * h / g : 0)) / p]
        };
        a.mode = function (c) {
            if (!arguments.length) return b;
            b = c + "";
            return a
        };
        a.origin = function (b) {
            if (!arguments.length) return c;
            c = b;
            f = c[0] * p;
            g = c[1] * p;
            h = Math.cos(g);
            i = Math.sin(g);
            return a
        };
        a.scale = function (b) {
            if (!arguments.length) return d;
            d = +b;
            return a
        };
        a.translate = function (b) {
            if (!arguments.length) return e;
            e = [+b[0], +b[1]];
            return a
        };
        return a.origin([0, 0])
    };
    d3.geo.albers = function () {
        function a(a) {
            var b = h * (p * a[0] - g), a = Math.sqrt(i - 2 * h * Math.sin(p * a[1])) / h;
            return [e * a * Math.sin(b) + f[0], e * (a * Math.cos(b) - j) + f[1]]
        }

        function b() {
            var b = p * d[0], e = p * d[1], f = p * c[1], m = Math.sin(b), b = Math.cos(b);
            g = p * c[0];
            h = 0.5 * (m + Math.sin(e));
            i = b * b + 2 * h * m;
            j = Math.sqrt(i - 2 * h * Math.sin(f)) / h;
            return a
        }

        var c =
            [-98, 38], d = [29.5, 45.5], e = 1E3, f = [480, 250], g, h, i, j;
        a.invert = function (a) {
            var b = (a[0] - f[0]) / e, c = j + (a[1] - f[1]) / e, a = Math.atan2(b, c), b = Math.sqrt(b * b + c * c);
            return [(g + a / h) / p, Math.asin((i - b * b * h * h) / (2 * h)) / p]
        };
        a.origin = function (a) {
            if (!arguments.length) return c;
            c = [+a[0], +a[1]];
            return b()
        };
        a.parallels = function (a) {
            if (!arguments.length) return d;
            d = [+a[0], +a[1]];
            return b()
        };
        a.scale = function (b) {
            if (!arguments.length) return e;
            e = +b;
            return a
        };
        a.translate = function (b) {
            if (!arguments.length) return f;
            f = [+b[0], +b[1]];
            return a
        };
        return b()
    };
    d3.geo.albersUsa = function () {
        function a(a) {
            var g = a[0], h = a[1];
            return (50 < h ? c : -140 > g ? d : 21 > h ? e : b)(a)
        }

        var b = d3.geo.albers(), c = d3.geo.albers().origin([-160, 60]).parallels([55, 65]),
            d = d3.geo.albers().origin([-160, 20]).parallels([8, 18]),
            e = d3.geo.albers().origin([-60, 10]).parallels([8, 18]);
        a.scale = function (f) {
            if (!arguments.length) return b.scale();
            b.scale(f);
            c.scale(0.6 * f);
            d.scale(f);
            e.scale(1.5 * f);
            return a.translate(b.translate())
        };
        a.translate = function (f) {
            if (!arguments.length) return b.translate();
            var g = b.scale() / 1E3, h = f[0], i = f[1];
            b.translate(f);
            c.translate([h - 400 * g, i + 170 * g]);
            d.translate([h - 190 * g, i + 200 * g]);
            e.translate([h + 580 * g, i + 430 * g]);
            return a
        };
        return a.scale(b.scale())
    };
    d3.geo.bonne = function () {
        function a(a) {
            var i = a[0] * p - d, j = a[1] * p - e;
            f ? (a = g + f - j, j = i * Math.cos(j) / a, i = a * Math.sin(j), j = a * Math.cos(j) - g) : (i *= Math.cos(j), j *= -1);
            return [b * i + c[0], b * j + c[1]]
        }

        var b = 200, c = [480, 250], d, e, f, g;
        a.invert = function (a) {
            var e = (a[0] - c[0]) / b, a = (a[1] - c[1]) / b;
            if (f) var j = g + a, k = Math.sqrt(e * e + j * j), a = g + f - k, e = d + k * Math.atan2(e,
                j) / Math.cos(a); else a *= -1, e /= Math.cos(a);
            return [e / p, a / p]
        };
        a.parallel = function (b) {
            if (!arguments.length) return f / p;
            g = 1 / Math.tan(f = b * p);
            return a
        };
        a.origin = function (b) {
            if (!arguments.length) return [d / p, e / p];
            d = b[0] * p;
            e = b[1] * p;
            return a
        };
        a.scale = function (c) {
            if (!arguments.length) return b;
            b = +c;
            return a
        };
        a.translate = function (b) {
            if (!arguments.length) return c;
            c = [+b[0], +b[1]];
            return a
        };
        return a.origin([0, 0]).parallel(45)
    };
    d3.geo.equirectangular = function () {
        function a(a) {
            return [b * (a[0] / 360) + c[0], b * (-a[1] / 360) + c[1]]
        }

        var b = 500, c = [480, 250];
        a.invert = function (a) {
            return [360 * ((a[0] - c[0]) / b), -360 * ((a[1] - c[1]) / b)]
        };
        a.scale = function (c) {
            if (!arguments.length) return b;
            b = +c;
            return a
        };
        a.translate = function (b) {
            if (!arguments.length) return c;
            c = [+b[0], +b[1]];
            return a
        };
        return a
    };
    d3.geo.mercator = function () {
        function a(a) {
            var e = a[0] / 360, a = -(Math.log(Math.tan(Math.PI / 4 + a[1] * p / 2)) / p) / 360;
            return [b * e + c[0], b * Math.max(-0.5, Math.min(0.5, a)) + c[1]]
        }

        var b = 500, c = [480, 250];
        a.invert = function (a) {
            return [360 * ((a[0] - c[0]) / b), 2 * Math.atan(Math.exp(-360 *
                ((a[1] - c[1]) / b) * p)) / p - 90]
        };
        a.scale = function (c) {
            if (!arguments.length) return b;
            b = +c;
            return a
        };
        a.translate = function (b) {
            if (!arguments.length) return c;
            c = [+b[0], +b[1]];
            return a
        };
        return a
    };
    d3.geo.path = function () {
        function a(a, b) {
            "function" === typeof e && (f = lb(e.apply(this, arguments)));
            return h(a) || null
        }

        function b(a) {
            return g(a).join(",")
        }

        function c(a) {
            for (var b = Math.abs(d3.geom.polygon(a[0].map(g)).area()), c = 0, d = a.length; ++c < d;) b -= Math.abs(d3.geom.polygon(a[c].map(g)).area());
            return b
        }

        function d(a) {
            for (var b =
                d3.geom.polygon(a[0].map(g)), c = b.area(), b = b.centroid(0 > c ? (c *= -1, 1) : -1), d = b[0], e = b[1], f = c, h = 0, i = a.length; ++h < i;) b = d3.geom.polygon(a[h].map(g)), c = b.area(), b = b.centroid(0 > c ? (c *= -1, 1) : -1), d -= b[0], e -= b[1], f -= c;
            return [d, e, 6 * f]
        }

        var e = 4.5, f = lb(e), g = d3.geo.albersUsa(), h = Ca({
            FeatureCollection: function (a) {
                for (var b = [], a = a.features, c = -1, d = a.length; ++c < d;) b.push(h(a[c].geometry));
                return b.join("")
            }, Feature: function (a) {
                return h(a.geometry)
            }, Point: function (a) {
                return "M" + b(a.coordinates) + f
            }, MultiPoint: function (a) {
                for (var c =
                    [], a = a.coordinates, d = -1, e = a.length; ++d < e;) c.push("M", b(a[d]), f);
                return c.join("")
            }, LineString: function (a) {
                for (var c = ["M"], a = a.coordinates, d = -1, e = a.length; ++d < e;) c.push(b(a[d]), "L");
                c.pop();
                return c.join("")
            }, MultiLineString: function (a) {
                for (var c = [], a = a.coordinates, d = -1, e = a.length, f, g, h; ++d < e;) {
                    f = a[d];
                    g = -1;
                    h = f.length;
                    for (c.push("M"); ++g < h;) c.push(b(f[g]), "L");
                    c.pop()
                }
                return c.join("")
            }, Polygon: function (a) {
                for (var c = [], a = a.coordinates, d = -1, e = a.length, f, g, h; ++d < e;) if (f = a[d], g = -1, 0 < (h = f.length - 1)) {
                    for (c.push("M"); ++g <
                    h;) c.push(b(f[g]), "L");
                    c[c.length - 1] = "Z"
                }
                return c.join("")
            }, MultiPolygon: function (a) {
                for (var c = [], a = a.coordinates, d = -1, e = a.length, f, g, h, i, j, p; ++d < e;) {
                    f = a[d];
                    g = -1;
                    for (h = f.length; ++g < h;) if (i = f[g], j = -1, 0 < (p = i.length - 1)) {
                        for (c.push("M"); ++j < p;) c.push(b(i[j]), "L");
                        c[c.length - 1] = "Z"
                    }
                }
                return c.join("")
            }, GeometryCollection: function (a) {
                for (var b = [], a = a.geometries, c = -1, d = a.length; ++c < d;) b.push(h(a[c]));
                return b.join("")
            }
        }), i = a.area = Ca({
            FeatureCollection: function (a) {
                for (var b = 0, a = a.features, c = -1, d = a.length; ++c <
                d;) b += i(a[c]);
                return b
            }, Feature: function (a) {
                return i(a.geometry)
            }, Polygon: function (a) {
                return c(a.coordinates)
            }, MultiPolygon: function (a) {
                for (var b = 0, a = a.coordinates, d = -1, e = a.length; ++d < e;) b += c(a[d]);
                return b
            }, GeometryCollection: function (a) {
                for (var b = 0, a = a.geometries, c = -1, d = a.length; ++c < d;) b += i(a[c]);
                return b
            }
        }, 0), j = a.centroid = Ca({
            Feature: function (a) {
                return j(a.geometry)
            }, Polygon: function (a) {
                a = d(a.coordinates);
                return [a[0] / a[2], a[1] / a[2]]
            }, MultiPolygon: function (a) {
                for (var a = a.coordinates, b, c = 0, e = 0, f =
                    0, g = -1, h = a.length; ++g < h;) b = d(a[g]), c += b[0], e += b[1], f += b[2];
                return [c / f, e / f]
            }
        });
        a.projection = function (b) {
            g = b;
            return a
        };
        a.pointRadius = function (b) {
            "function" === typeof b ? e = b : (e = +b, f = lb(e));
            return a
        };
        return a
    };
    d3.geo.bounds = function (a) {
        var b = Infinity, c = Infinity, d = -Infinity, e = -Infinity;
        Da(a, function (a, g) {
            a < b && (b = a);
            a > d && (d = a);
            g < c && (c = g);
            g > e && (e = g)
        });
        return [[b, c], [d, e]]
    };
    var Ec = {
        Feature: function (a, b) {
            Da(a.geometry, b)
        }, FeatureCollection: function (a, b) {
            for (var c = a.features, d = 0, e = c.length; d < e; d++) Da(c[d].geometry,
                b)
        }, GeometryCollection: function (a, b) {
            for (var c = a.geometries, d = 0, e = c.length; d < e; d++) Da(c[d], b)
        }, LineString: Fc, MultiLineString: function (a, b) {
            for (var c = a.coordinates, d = 0, e = c.length; d < e; d++) for (var f = c[d], g = 0, h = f.length; g < h; g++) b.apply(null, f[g])
        }, MultiPoint: Fc, MultiPolygon: function (a, b) {
            for (var c = a.coordinates, d = 0, e = c.length; d < e; d++) for (var f = c[d][0], g = 0, h = f.length; g < h; g++) b.apply(null, f[g])
        }, Point: function (a, b) {
            b.apply(null, a.coordinates)
        }, Polygon: function (a, b) {
            for (var c = a.coordinates[0], d = 0, e = c.length; d <
            e; d++) b.apply(null, c[d])
        }
    };
    d3.geo.circle = function () {
        function a() {
        }

        function b(a) {
            return g.distance(a) < f
        }

        function c(a) {
            for (var b = -1, c = a.length, d = [], e, h, o, q, p; ++b < c;) p = g.distance(o = a[b]), p < f ? (h && d.push(ha(h, o)((q - f) / (q - p))), d.push(o), e = h = null) : (h = o, !e && d.length && (d.push(ha(d[d.length - 1], h)((f - q) / (p - q))), e = h)), q = p;
            h && d.length && (p = g.distance(o = d[0]), d.push(ha(h, o)((q - f) / (q - p))));
            a = 0;
            h = (b = d.length) ? [d[0]] : d;
            for (q = g.source(); ++a < b;) {
                o = g.source(d[a - 1])(d[a]).coordinates;
                for (c = 0, e = o.length; ++c < e;) h.push(o[c])
            }
            g.source(q);
            return h
        }

        var d = [0, 0], e = 89.99, f = e * p, g = d3.geo.greatArc().target(Y);
        a.clip = function (a) {
            g.source("function" === typeof d ? d.apply(this, arguments) : d);
            return h(a)
        };
        var h = Ca({
            FeatureCollection: function (a) {
                var b = a.features.map(h).filter(Y);
                return b && (a = Object.create(a), a.features = b, a)
            }, Feature: function (a) {
                var b = h(a.geometry);
                return b && (a = Object.create(a), a.geometry = b, a)
            }, Point: function (a) {
                return b(a.coordinates) && a
            }, MultiPoint: function (a) {
                var c = a.coordinates.filter(b);
                return c.length && {type: a.type, coordinates: c}
            },
            LineString: function (a) {
                var b = c(a.coordinates);
                return b.length && (a = Object.create(a), a.coordinates = b, a)
            }, MultiLineString: function (a) {
                var b = a.coordinates.map(c).filter(function (a) {
                    return a.length
                });
                return b.length && (a = Object.create(a), a.coordinates = b, a)
            }, Polygon: function (a) {
                var b = a.coordinates.map(c);
                return b[0].length && (a = Object.create(a), a.coordinates = b, a)
            }, MultiPolygon: function (a) {
                var b = a.coordinates.map(function (a) {
                    return a.map(c)
                }).filter(function (a) {
                    return a[0].length
                });
                return b.length && (a = Object.create(a),
                    a.coordinates = b, a)
            }, GeometryCollection: function (a) {
                var b = a.geometries.map(h).filter(Y);
                return b.length && (a = Object.create(a), a.geometries = b, a)
            }
        });
        a.origin = function (b) {
            if (!arguments.length) return d;
            d = b;
            return a
        };
        a.angle = function (b) {
            if (!arguments.length) return e;
            f = (e = +b) * p;
            return a
        };
        a.precision = function (b) {
            if (!arguments.length) return g.precision();
            g.precision(b);
            return a
        };
        return a
    };
    d3.geo.greatArc = function () {
        function a() {
            for (var a = "function" === typeof b ? b.apply(this, arguments) : b, f = "function" === typeof c ?
                c.apply(this, arguments) : c, g = ha(a, f), h = d / g.d, i = 0, a = [a]; 1 > (i += h);) a.push(g(i));
            a.push(f);
            return {type: "LineString", coordinates: a}
        }

        var b = ee, c = fe, d = 6 * p;
        a.distance = function () {
            var a = "function" === typeof b ? b.apply(this, arguments) : b,
                d = "function" === typeof c ? c.apply(this, arguments) : c;
            return ha(a, d).d
        };
        a.source = function (c) {
            if (!arguments.length) return b;
            b = c;
            return a
        };
        a.target = function (b) {
            if (!arguments.length) return c;
            c = b;
            return a
        };
        a.precision = function (b) {
            if (!arguments.length) return d / p;
            d = b * p;
            return a
        };
        return a
    };
    d3.geo.greatCircle = d3.geo.circle;
    d3.geom = {};
    d3.geom.contour = function (a, b) {
        var c;
        if (!(c = b)) a:{
            for (var d = c = 0; ;) {
                if (a(c, d)) {
                    c = [c, d];
                    break a
                }
                0 === c ? (c = d + 1, d = 0) : (c -= 1, d += 1)
            }
            c = void 0
        }
        var d = [], e = c[0], f = c[1], g = 0, h = 0, i = NaN, j = NaN, h = 0;
        do h = 0, a(e - 1, f - 1) && (h += 1), a(e, f - 1) && (h += 2), a(e - 1, f) && (h += 4), a(e, f) && (h += 8), 6 === h ? (g = -1 === j ? -1 : 1, h = 0) : 9 === h ? (g = 0, h = 1 === i ? -1 : 1) : (g = Ge[h], h = He[h]), g != i && h != j && (d.push([e, f]), i = g, j = h), e += g, f += h; while (c[0] != e || c[1] != f);
        return d
    };
    var Ge = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN], He = [0, -1,
        0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN];
    d3.geom.hull = function (a) {
        if (3 > a.length) return [];
        var b = a.length, c = b - 1, d = [], e = [], f, g = 0, h, i, j, k, l, n, m;
        for (f = 1; f < b; ++f) a[f][1] < a[g][1] ? g = f : a[f][1] == a[g][1] && (g = a[f][0] < a[g][0] ? f : g);
        for (f = 0; f < b; ++f) f !== g && (i = a[f][1] - a[g][1], h = a[f][0] - a[g][0], d.push({
            angle: Math.atan2(i, h),
            index: f
        }));
        d.sort(function (a, b) {
            return a.angle - b.angle
        });
        m = d[0].angle;
        n = d[0].index;
        l = 0;
        for (f = 1; f < c; ++f) b = d[f].index, m == d[f].angle ? (h = a[n][0] - a[g][0], i = a[n][1] - a[g][1], j = a[b][0] - a[g][0], k = a[b][1] - a[g][1],
            h * h + i * i >= j * j + k * k ? d[f].index = -1 : (d[l].index = -1, m = d[f].angle, l = f, n = b)) : (m = d[f].angle, l = f, n = b);
        e.push(g);
        for (f = 0, b = 0; 2 > f; ++b) -1 !== d[b].index && (e.push(d[b].index), f++);
        for (g = e.length; b < c; ++b) if (-1 !== d[b].index) {
            for (; !ge(e[g - 2], e[g - 1], d[b].index, a);) --g;
            e[g++] = d[b].index
        }
        c = [];
        for (f = 0; f < g; ++f) c.push(a[e[f]]);
        return c
    };
    d3.geom.polygon = function (a) {
        a.area = function () {
            for (var b = 0, c = a.length, d = a[c - 1][0] * a[0][1], e = a[c - 1][1] * a[0][0]; ++b < c;) d += a[b - 1][0] * a[b][1], e += a[b - 1][1] * a[b][0];
            return 0.5 * (e - d)
        };
        a.centroid =
            function (b) {
                var c = -1, d = a.length, e = 0, f = 0, g, h = a[d - 1], i;
                for (arguments.length || (b = -1 / (6 * a.area())); ++c < d;) g = h, h = a[c], i = g[0] * h[1] - h[0] * g[1], e += (g[0] + h[0]) * i, f += (g[1] + h[1]) * i;
                return [e * b, f * b]
            };
        a.clip = function (b) {
            for (var c, d = -1, e = a.length, f, g, h = a[e - 1], i, j, k; ++d < e;) {
                c = b.slice();
                b.length = 0;
                i = a[d];
                j = c[(g = c.length) - 1];
                for (f = -1; ++f < g;) k = c[f], mb(k, h, i) ? (mb(j, h, i) || b.push(Gc(j, k, h, i)), b.push(k)) : mb(j, h, i) && b.push(Gc(j, k, h, i)), j = k;
                h = i
            }
            return b
        };
        return a
    };
    d3.geom.voronoi = function (a) {
        var b = a.map(function () {
            return []
        });
        Hc(a, function (a) {
            var d, e, f, g;
            1 === a.a && 0 <= a.b ? (d = a.ep.r, e = a.ep.l) : (d = a.ep.l, e = a.ep.r);
            1 === a.a ? (f = d ? d.y : -1E6, d = a.c - a.b * f, g = e ? e.y : 1E6, e = a.c - a.b * g) : (d = d ? d.x : -1E6, f = a.c - a.a * d, e = e ? e.x : 1E6, g = a.c - a.a * e);
            d = [d, f];
            e = [e, g];
            b[a.region.l.index].push(d, e);
            b[a.region.r.index].push(d, e)
        });
        return b.map(function (b, d) {
            var e = a[d][0], f = a[d][1];
            b.forEach(function (a) {
                a.angle = Math.atan2(a[0] - e, a[1] - f)
            });
            return b.sort(function (a, b) {
                return a.angle - b.angle
            }).filter(function (a, d) {
                return !d || 1.0E-10 < a.angle - b[d - 1].angle
            })
        })
    };
    var nb =
        {l: "r", r: "l"};
    d3.geom.delaunay = function (a) {
        var b = a.map(function () {
            return []
        }), c = [];
        Hc(a, function (c) {
            b[c.region.l.index].push(a[c.region.r.index])
        });
        b.forEach(function (b, e) {
            var f = a[e], g = f[0], h = f[1];
            b.forEach(function (a) {
                a.angle = Math.atan2(a[0] - g, a[1] - h)
            });
            b.sort(function (a, b) {
                return a.angle - b.angle
            });
            for (var i = 0, j = b.length - 1; i < j; i++) c.push([f, b[i], b[i + 1]])
        });
        return c
    };
    d3.geom.quadtree = function (a, b, c, d, e) {
        function f(a, b, c, d, e, f) {
            if (!isNaN(b.x) && !isNaN(b.y)) if (a.leaf) {
                var h = a.point;
                if (h) {
                    if (!(0.01 > Math.abs(h.x -
                            b.x) + Math.abs(h.y - b.y))) a.point = null, g(a, h, c, d, e, f);
                    g(a, b, c, d, e, f)
                } else a.point = b
            } else g(a, b, c, d, e, f)
        }

        function g(a, b, c, d, e, g) {
            var h = 0.5 * (c + e), i = 0.5 * (d + g), j = b.x >= h, k = b.y >= i, p = (k << 1) + j;
            a.leaf = !1;
            a = a.nodes[p] || (a.nodes[p] = {leaf: !0, nodes: [], point: null});
            j ? c = h : e = h;
            k ? d = i : g = i;
            f(a, b, c, d, e, g)
        }

        var h, i = -1, j = a.length;
        j && isNaN(a[0].x) && (a = a.map(he));
        if (5 > arguments.length) if (3 === arguments.length) e = d = c, c = b; else {
            b = c = Infinity;
            for (d = e = -Infinity; ++i < j;) {
                h = a[i];
                if (h.x < b) b = h.x;
                if (h.y < c) c = h.y;
                if (h.x > d) d = h.x;
                if (h.y > e) e =
                    h.y
            }
            h = d - b;
            i = e - c;
            h > i ? e = c + h : d = b + i
        }
        var k = {leaf: !0, nodes: [], point: null};
        k.add = function (a) {
            f(k, a, b, c, d, e)
        };
        k.visit = function (a) {
            ia(a, k, b, c, d, e)
        };
        a.forEach(k.add);
        return k
    };
    d3.time = {};
    var D = Date;
    W.prototype = {
        getDate: function () {
            return this._.getUTCDate()
        }, getDay: function () {
            return this._.getUTCDay()
        }, getFullYear: function () {
            return this._.getUTCFullYear()
        }, getHours: function () {
            return this._.getUTCHours()
        }, getMilliseconds: function () {
            return this._.getUTCMilliseconds()
        }, getMinutes: function () {
            return this._.getUTCMinutes()
        },
        getMonth: function () {
            return this._.getUTCMonth()
        }, getSeconds: function () {
            return this._.getUTCSeconds()
        }, getTime: function () {
            return this._.getTime()
        }, getTimezoneOffset: function () {
            return 0
        }, valueOf: function () {
            return this._.valueOf()
        }, setDate: function () {
            L.setUTCDate.apply(this._, arguments)
        }, setDay: function () {
            L.setUTCDay.apply(this._, arguments)
        }, setFullYear: function () {
            L.setUTCFullYear.apply(this._, arguments)
        }, setHours: function () {
            L.setUTCHours.apply(this._, arguments)
        }, setMilliseconds: function () {
            L.setUTCMilliseconds.apply(this._,
                arguments)
        }, setMinutes: function () {
            L.setUTCMinutes.apply(this._, arguments)
        }, setMonth: function () {
            L.setUTCMonth.apply(this._, arguments)
        }, setSeconds: function () {
            L.setUTCSeconds.apply(this._, arguments)
        }, setTime: function () {
            L.setTime.apply(this._, arguments)
        }
    };
    var L = Date.prototype;
    d3.time.format = function (a) {
        function b(b) {
            for (var e = [], f = -1, g = 0, h, i; ++f < c;) 37 == a.charCodeAt(f) && (e.push(a.substring(g, f), (i = Ja[h = a.charAt(++f)]) ? i(b) : h), g = f + 1);
            e.push(a.substring(g, f));
            return e.join("")
        }

        var c = a.length;
        b.parse = function (b) {
            var c =
                {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
            if (Ea(c, a, b, 0) != b.length) return null;
            if ("p" in c) c.H = c.H % 12 + 12 * c.p;
            b = new D;
            b.setFullYear(c.y, c.m, c.d);
            b.setHours(c.H, c.M, c.S, c.L);
            return b
        };
        b.toString = function () {
            return a
        };
        return b
    };
    var H = d3.format("02d"), Tc = d3.format("03d"), Ie = d3.format("04d"), Je = d3.format("2d"), Ja = {
            a: function (a) {
                return vb[a.getDay()].substring(0, 3)
            }, A: function (a) {
                return vb[a.getDay()]
            }, b: function (a) {
                return Uc[a.getMonth()].substring(0, 3)
            }, B: function (a) {
                return Uc[a.getMonth()]
            }, c: d3.time.format("%a %b %e %H:%M:%S %Y"),
            d: function (a) {
                return H(a.getDate())
            }, e: function (a) {
                return Je(a.getDate())
            }, H: function (a) {
                return H(a.getHours())
            }, I: function (a) {
                return H(a.getHours() % 12 || 12)
            }, j: function (a) {
                return Tc(1 + d3.time.dayOfYear(a))
            }, L: function (a) {
                return Tc(a.getMilliseconds())
            }, m: function (a) {
                return H(a.getMonth() + 1)
            }, M: function (a) {
                return H(a.getMinutes())
            }, p: function (a) {
                return 12 <= a.getHours() ? "PM" : "AM"
            }, S: function (a) {
                return H(a.getSeconds())
            }, U: function (a) {
                return H(d3.time.sundayOfYear(a))
            }, w: function (a) {
                return a.getDay()
            },
            W: function (a) {
                return H(d3.time.mondayOfYear(a))
            }, x: d3.time.format("%m/%d/%y"), X: d3.time.format("%H:%M:%S"), y: function (a) {
                return H(a.getFullYear() % 100)
            }, Y: function (a) {
                return Ie(a.getFullYear() % 1E4)
            }, Z: function (a) {
                var b = a.getTimezoneOffset(), a = 0 < b ? "-" : "+", c = ~~(Math.abs(b) / 60), b = Math.abs(b) % 60;
                return a + H(c) + H(b)
            }, "%": function () {
                return "%"
            }
        }, ie = {
            a: function (a, b, c) {
                return Ke.test(b.substring(c, c += 3)) ? c : -1
            }, A: function (a, b, c) {
                Vc.lastIndex = 0;
                return (a = Vc.exec(b.substring(c, c + 10))) ? c + a[0].length : -1
            }, b: function (a,
                            b, c) {
                b = Le.get(b.substring(c, c += 3).toLowerCase());
                return null == b ? -1 : (a.m = b, c)
            }, B: function (a, b, c) {
                Wc.lastIndex = 0;
                return (b = Wc.exec(b.substring(c, c + 12))) ? (a.m = Me.get(b[0].toLowerCase()), c + b[0].length) : -1
            }, c: function (a, b, c) {
                return Ea(a, Ja.c.toString(), b, c)
            }, d: Ic, e: Ic, H: Jc, I: Jc, L: function (a, b, c) {
                C.lastIndex = 0;
                return (b = C.exec(b.substring(c, c + 3))) ? (a.L = +b[0], c + b[0].length) : -1
            }, m: function (a, b, c) {
                C.lastIndex = 0;
                return (b = C.exec(b.substring(c, c + 2))) ? (a.m = b[0] - 1, c + b[0].length) : -1
            }, M: function (a, b, c) {
                C.lastIndex =
                    0;
                return (b = C.exec(b.substring(c, c + 2))) ? (a.M = +b[0], c + b[0].length) : -1
            }, p: function (a, b, c) {
                b = Ne.get(b.substring(c, c += 2).toLowerCase());
                return null == b ? -1 : (a.p = b, c)
            }, S: function (a, b, c) {
                C.lastIndex = 0;
                return (b = C.exec(b.substring(c, c + 2))) ? (a.S = +b[0], c + b[0].length) : -1
            }, x: function (a, b, c) {
                return Ea(a, Ja.x.toString(), b, c)
            }, X: function (a, b, c) {
                return Ea(a, Ja.X.toString(), b, c)
            }, y: function (a, b, c) {
                C.lastIndex = 0;
                return (b = C.exec(b.substring(c, c + 2))) ? (a.y = 1E3 * ~~((new Date).getFullYear() / 1E3) + +b[0], c + b[0].length) : -1
            }, Y: function (a,
                            b, c) {
                C.lastIndex = 0;
                return (b = C.exec(b.substring(c, c + 4))) ? (a.y = +b[0], c + b[0].length) : -1
            }
        }, Ke = /^(?:sun|mon|tue|wed|thu|fri|sat)/i, Vc = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i,
        vb = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
        Le = d3.map({jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11}),
        Wc = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig,
        Me = d3.map({
            january: 0, february: 1, march: 2, april: 3, may: 4,
            june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
        }), Uc = "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
        C = /\s*\d+/, Ne = d3.map({am: 0, pm: 1});
    d3.time.format.utc = function (a) {
        function b(a) {
            try {
                D = W;
                var b = new D;
                b._ = a;
                return c(b)
            } finally {
                D = Date
            }
        }

        var c = d3.time.format(a);
        b.parse = function (a) {
            try {
                D = W;
                var b = c.parse(a);
                return b && b._
            } finally {
                D = Date
            }
        };
        b.toString = c.toString;
        return b
    };
    var Xc = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso =
        Date.prototype.toISOString ? ob : Xc;
    ob.parse = function (a) {
        return new Date(a)
    };
    ob.toString = Xc.toString;
    d3.time.second = X(function (a) {
        return new D(1E3 * Math.floor(a / 1E3))
    }, function (a, b) {
        a.setTime(a.getTime() + 1E3 * Math.floor(b))
    }, function (a) {
        return a.getSeconds()
    });
    d3.time.seconds = d3.time.second.range;
    d3.time.seconds.utc = d3.time.second.utc.range;
    d3.time.minute = X(function (a) {
        return new D(6E4 * Math.floor(a / 6E4))
    }, function (a, b) {
        a.setTime(a.getTime() + 6E4 * Math.floor(b))
    }, function (a) {
        return a.getMinutes()
    });
    d3.time.minutes =
        d3.time.minute.range;
    d3.time.minutes.utc = d3.time.minute.utc.range;
    d3.time.hour = X(function (a) {
        var b = a.getTimezoneOffset() / 60;
        return new D(36E5 * (Math.floor(a / 36E5 - b) + b))
    }, function (a, b) {
        a.setTime(a.getTime() + 36E5 * Math.floor(b))
    }, function (a) {
        return a.getHours()
    });
    d3.time.hours = d3.time.hour.range;
    d3.time.hours.utc = d3.time.hour.utc.range;
    d3.time.day = X(function (a) {
        return new D(a.getFullYear(), a.getMonth(), a.getDate())
    }, function (a, b) {
        a.setDate(a.getDate() + b)
    }, function (a) {
        return a.getDate() - 1
    });
    d3.time.days =
        d3.time.day.range;
    d3.time.days.utc = d3.time.day.utc.range;
    d3.time.dayOfYear = function (a) {
        var b = d3.time.year(a);
        return Math.floor((a - b) / 864E5 - (a.getTimezoneOffset() - b.getTimezoneOffset()) / 1440)
    };
    vb.forEach(function (a, b) {
        var a = a.toLowerCase(), b = 7 - b, c = d3.time[a] = X(function (a) {
            (a = d3.time.day(a)).setDate(a.getDate() - (a.getDay() + b) % 7);
            return a
        }, function (a, b) {
            a.setDate(a.getDate() + 7 * Math.floor(b))
        }, function (a) {
            var c = d3.time.year(a).getDay();
            return Math.floor((d3.time.dayOfYear(a) + (c + b) % 7) / 7) - (c !== b)
        });
        d3.time[a +
        "s"] = c.range;
        d3.time[a + "s"].utc = c.utc.range;
        d3.time[a + "OfYear"] = function (a) {
            var c = d3.time.year(a).getDay();
            return Math.floor((d3.time.dayOfYear(a) + (c + b) % 7) / 7)
        }
    });
    d3.time.week = d3.time.sunday;
    d3.time.weeks = d3.time.sunday.range;
    d3.time.weeks.utc = d3.time.sunday.utc.range;
    d3.time.weekOfYear = d3.time.sundayOfYear;
    d3.time.month = X(function (a) {
        return new D(a.getFullYear(), a.getMonth(), 1)
    }, function (a, b) {
        a.setMonth(a.getMonth() + b)
    }, function (a) {
        return a.getMonth()
    });
    d3.time.months = d3.time.month.range;
    d3.time.months.utc =
        d3.time.month.utc.range;
    d3.time.year = X(function (a) {
        return new D(a.getFullYear(), 0, 1)
    }, function (a, b) {
        a.setFullYear(a.getFullYear() + b)
    }, function (a) {
        return a.getFullYear()
    });
    d3.time.years = d3.time.year.range;
    d3.time.years.utc = d3.time.year.utc.range;
    var Ga = [1E3, 5E3, 15E3, 3E4, 6E4, 3E5, 9E5, 18E5, 36E5, 108E5, 216E5, 432E5, 864E5, 1728E5, 6048E5, 2592E6, 7776E6, 31536E6],
        wb = [[d3.time.second, 1], [d3.time.second, 5], [d3.time.second, 15], [d3.time.second, 30], [d3.time.minute, 1], [d3.time.minute, 5], [d3.time.minute, 15], [d3.time.minute,
            30], [d3.time.hour, 1], [d3.time.hour, 3], [d3.time.hour, 6], [d3.time.hour, 12], [d3.time.day, 1], [d3.time.day, 2], [d3.time.week, 1], [d3.time.month, 1], [d3.time.month, 3], [d3.time.year, 1]],
        Oe = [[d3.time.format("%Y"), function () {
            return !0
        }], [d3.time.format("%B"), function (a) {
            return a.getMonth()
        }], [d3.time.format("%b %d"), function (a) {
            return 1 != a.getDate()
        }], [d3.time.format("%a %d"), function (a) {
            return a.getDay() && 1 != a.getDate()
        }], [d3.time.format("%I %p"), function (a) {
            return a.getHours()
        }], [d3.time.format("%I:%M"), function (a) {
            return a.getMinutes()
        }],
            [d3.time.format(":%S"), function (a) {
                return a.getSeconds()
            }], [d3.time.format(".%L"), function (a) {
                return a.getMilliseconds()
            }]], Yc = d3.scale.linear(), Pe = Lc(Oe);
    wb.year = function (a, b) {
        return Yc.domain(a.map(je)).ticks(b).map(rb)
    };
    d3.time.scale = function () {
        return pb(d3.scale.linear(), wb, Pe)
    };
    var Zc = wb.map(function (a) {
        return [a[0].utc, a[1]]
    }), Qe = [[d3.time.format.utc("%Y"), function () {
        return !0
    }], [d3.time.format.utc("%B"), function (a) {
        return a.getUTCMonth()
    }], [d3.time.format.utc("%b %d"), function (a) {
        return 1 != a.getUTCDate()
    }],
        [d3.time.format.utc("%a %d"), function (a) {
            return a.getUTCDay() && 1 != a.getUTCDate()
        }], [d3.time.format.utc("%I %p"), function (a) {
            return a.getUTCHours()
        }], [d3.time.format.utc("%I:%M"), function (a) {
            return a.getUTCMinutes()
        }], [d3.time.format.utc(":%S"), function (a) {
            return a.getUTCSeconds()
        }], [d3.time.format.utc(".%L"), function (a) {
            return a.getUTCMilliseconds()
        }]], Re = Lc(Qe);
    Zc.year = function (a, b) {
        return Yc.domain(a.map(ke)).ticks(b).map(sb)
    };
    d3.time.scale.utc = function () {
        return pb(d3.scale.linear(), Zc, Re)
    };
    d3.selection.prototype.moveToFront =
        function () {
            return this.each(function () {
                this.parentNode.appendChild(this)
            })
        }
})();
(function (d) {
    var k = this, m = k.document, J = d(m), v = d(k), C = Array.prototype, K = !0, E = !1,
        y = navigator.userAgent.toLowerCase(), L = k.location.hash.replace(/#\//, ""), s = function () {
        }, R = function () {
            return !1
        }, n = function () {
            var a = 3, b = m.createElement("div"), c = b.getElementsByTagName("i");
            do b.innerHTML = "<\!--[if gt IE " + ++a + "]><i></i><![endif]--\>"; while (c[0]);
            return 4 < a ? a : void 0
        }(), t = function () {
            return {html: m.documentElement, body: m.body, head: m.getElementsByTagName("head")[0], title: m.title}
        }, M = function () {
            var a = [];
            d.each("data ready thumbnail loadstart loadfinish image play pause progress fullscreen_enter fullscreen_exit idle_enter idle_exit rescale lightbox_open lightbox_close lightbox_image".split(" "),
                function (b, c) {
                    a.push(c);
                    /_/.test(c) && a.push(c.replace(/_/g, ""))
                });
            return a
        }(), N = function (a) {
            var b;
            if ("object" !== typeof a) return a;
            d.each(a, function (c, e) {
                /^[a-z]+_/.test(c) && (b = "", d.each(c.split("_"), function (a, c) {
                    b += 0 < a ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
                }), a[b] = e, delete a[c])
            });
            return a
        }, F = function (a) {
            return -1 < d.inArray(a, M) ? Galleria[a.toUpperCase()] : a
        }, A = {
            youtube: {
                reg: /https?:\/\/(?:[a-zA_Z]{2,3}.)?(?:youtube\.com\/watch\?)((?:[\w\d\-\_\=]+&amp;(?:amp;)?)*v(?:&lt;[A-Z]+&gt;)?=([0-9a-zA-Z\-\_]+))/i,
                embed: function (a) {
                    return "http://www.youtube.com/embed/" + a
                }, getThumb: function (a, b, c) {
                    c = c || s;
                    d.getJSON("http://gdata.youtube.com/feeds/api/videos/" + a + "?v=2&alt=json-in-script&callback=?", function (a) {
                        try {
                            b(a.entry.media$group.media$thumbnail[0].url)
                        } catch (d) {
                            c()
                        }
                    }).error(c)
                }
            }, vimeo: {
                reg: /https?:\/\/(?:www\.)?(vimeo\.com)\/(?:hd#)?([0-9]+)/i, embed: function (a) {
                    return "http://player.vimeo.com/video/" + a
                }, getThumb: function (a, b, c) {
                    c = c || s;
                    d.getJSON("http://vimeo.com/api/v2/video/" + a + ".json?callback=?", function (a) {
                        try {
                            b(a[0].thumbnail_medium)
                        } catch (d) {
                            c()
                        }
                    }).error(c)
                }
            },
            dailymotion: {
                reg: /https?:\/\/(?:www\.)?(dailymotion\.com)\/video\/([^_]+)/, embed: function (a) {
                    return "http://www.dailymotion.com/embed/video/" + a
                }, getThumb: function (a, b, c) {
                    c = c || s;
                    d.getJSON("https://api.dailymotion.com/video/" + a + "?fields=thumbnail_medium_url&callback=?", function (a) {
                        try {
                            b(a.thumbnail_medium_url)
                        } catch (d) {
                            c()
                        }
                    }).error(c)
                }
            }
        }, O = function (a) {
            var b, c;
            for (c in A) if ((b = a && a.match(A[c].reg)) && b.length) return {id: b[2], provider: c};
            return !1
        }, z = {
            trunk: {}, add: function (a, b, c, d) {
                a = a || (new Date).getTime();
                d = d || !1;
                this.clear(a);
                if (d) var g = b, b = function () {
                    g();
                    z.add(a, b, c)
                };
                this.trunk[a] = k.setTimeout(b, c)
            }, clear: function (a) {
                var b = function (a) {
                    k.clearTimeout(this.trunk[a]);
                    delete this.trunk[a]
                }, c;
                if (a && a in this.trunk) b.call(z, a); else if ("undefined" === typeof a) for (c in this.trunk) this.trunk.hasOwnProperty(c) && b.call(z, c)
            }
        }, D = [], B = [], P = !1, u = !1, Q = [], G = function (a) {
            Galleria.theme = a;
            d.each(Q, function (a, c) {
                c._initialized || c._init.call(c)
            })
        }, f = function () {
            return {
                array: function (a) {
                    return C.slice.call(a, 0)
                }, create: function (a,
                                     b) {
                    var c = m.createElement(b || "div");
                    c.className = a;
                    return c
                }, getScriptPath: function (a) {
                    a = a || d("script:last").attr("src");
                    a = a.split("/");
                    if (1 == a.length) return "";
                    a.pop();
                    return a.join("/") + "/"
                }, animate: function () {
                    var a = function (a) {
                        var b = "transition WebkitTransition MozTransition OTransition".split(" "), c;
                        if (k.opera) return !1;
                        for (c = 0; b[c]; c++) if ("undefined" !== typeof a[b[c]]) return b[c];
                        return !1
                    }((m.body || m.documentElement).style), b = {
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        WebkitTransition: "webkitTransitionEnd",
                        transition: "transitionend"
                    }[a], c = {
                        _default: [0.25, 0.1, 0.25, 1],
                        galleria: [0.645, 0.045, 0.355, 1],
                        galleriaIn: [0.55, 0.085, 0.68, 0.53],
                        galleriaOut: [0.25, 0.46, 0.45, 0.94],
                        ease: [0.25, 0, 0.25, 1],
                        linear: [0.25, 0.25, 0.75, 0.75],
                        "ease-in": [0.42, 0, 1, 1],
                        "ease-out": [0, 0, 0.58, 1],
                        "ease-in-out": [0.42, 0, 0.58, 1]
                    }, e = function (a, b, c) {
                        var l = {}, c = c || "transition";
                        d.each("webkit moz ms o".split(" "), function () {
                            l["-" + this + "-" + c] = b
                        });
                        a.css(l)
                    }, g = function (a) {
                        e(a, "none", "transition");
                        Galleria.WEBKIT && Galleria.TOUCH && (e(a, "translate3d(0,0,0)",
                            "transform"), a.data("revert") && (a.css(a.data("revert")), a.data("revert", null)))
                    }, i, j, h, l, r, x, w;
                    return function (o, q, p) {
                        p = d.extend({duration: 400, complete: s, stop: !1}, p);
                        o = d(o);
                        p.duration ? a ? (p.stop && (o.unbind(b), g(o)), i = !1, d.each(q, function (a, b) {
                            w = o.css(a);
                            f.parseValue(w) != f.parseValue(b) && (i = !0);
                            o.css(a, w)
                        }), i ? (j = [], h = p.easing in c ? c[p.easing] : c._default, l = " " + p.duration + "ms cubic-bezier(" + h.join(",") + ")", k.setTimeout(function (a, b, c, l) {
                            return function () {
                                a.one(b, function (a) {
                                    return function () {
                                        g(a);
                                        p.complete.call(a[0])
                                    }
                                }(a));
                                if (Galleria.WEBKIT && Galleria.TOUCH && (r = {}, x = [0, 0, 0], d.each(["left", "top"], function (b, l) {
                                        l in c && (x[b] = f.parseValue(c[l]) - f.parseValue(a.css(l)) + "px", r[l] = c[l], delete c[l])
                                    }), x[0] || x[1])) a.data("revert", r), j.push("-webkit-transform" + l), e(a, "translate3d(" + x.join(",") + ")", "transform");
                                d.each(c, function (a) {
                                    j.push(a + l)
                                });
                                e(a, j.join(","));
                                a.css(c)
                            }
                        }(o, b, q, l), 2)) : k.setTimeout(function () {
                            p.complete.call(o[0])
                        }, p.duration)) : o.animate(q, p) : (o.css(q), p.complete.call(o[0]))
                    }
                }(), removeAlpha: function (a) {
                    if (9 > n &&
                        a) {
                        var b = a.style, a = (a = a.currentStyle) && a.filter || b.filter || "";
                        if (/alpha/.test(a)) b.filter = a.replace(/alpha\([^)]*\)/i, "")
                    }
                }, forceStyles: function (a, b) {
                    a = d(a);
                    a.attr("style") && a.data("styles", a.attr("style")).removeAttr("style");
                    a.css(b)
                }, revertStyles: function () {
                    d.each(f.array(arguments), function (a, b) {
                        b = d(b);
                        b.removeAttr("style");
                        b.attr("style", "");
                        b.data("styles") && b.attr("style", b.data("styles")).data("styles", null)
                    })
                }, moveOut: function (a) {
                    f.forceStyles(a, {position: "absolute", left: -1E4})
                }, moveIn: function () {
                    f.revertStyles.apply(f,
                        f.array(arguments))
                }, elem: function (a) {
                    return a instanceof d ? {$: a, dom: a[0]} : {$: d(a), dom: a}
                }, hide: function (a, b, c) {
                    var c = c || s, d = f.elem(a), g = d.$, a = d.dom;
                    g.data("opacity") || g.data("opacity", g.css("opacity"));
                    d = {opacity: 0};
                    b ? f.animate(a, d, {
                        duration: b, complete: 9 > n && a ? function () {
                            f.removeAlpha(a);
                            a.style.visibility = "hidden";
                            c.call(a)
                        } : c, stop: !0
                    }) : 9 > n && a ? (f.removeAlpha(a), a.style.visibility = "hidden") : g.css(d)
                }, show: function (a, b, c) {
                    var c = c || s, d = f.elem(a), g = d.$, a = d.dom, i = {
                        opacity: parseFloat(g.data("opacity")) ||
                        1
                    };
                    if (b) {
                        if (9 > n) g.css("opacity", 0), a.style.visibility = "visible";
                        f.animate(a, i, {
                            duration: b, complete: 9 > n && a ? function () {
                                1 == i.opacity && f.removeAlpha(a);
                                c.call(a)
                            } : c, stop: !0
                        })
                    } else 9 > n && 1 == i.opacity && a ? (f.removeAlpha(a), a.style.visibility = "visible") : g.css(i)
                }, optimizeTouch: function () {
                    var a, b, c, e, g = {}, i = function (a) {
                        a.preventDefault();
                        g = d.extend({}, a, !0)
                    }, f = function () {
                        this.evt = g
                    }, h = function () {
                        this.handler.call(a, this.evt)
                    };
                    return function (l) {
                        d(l).bind("touchend", function (l) {
                            a = l.target;
                            for (e = !0; a.parentNode &&
                            a != l.currentTarget && e;) b = d(a).data("events"), c = d(a).data("fakes"), b && "click" in b ? (e = !1, l.preventDefault(), d(a).click(i).click(), b.click.pop(), d.each(b.click, f), d(a).data("fakes", b.click), delete b.click) : c && (e = !1, l.preventDefault(), d.each(c, h)), a = a.parentNode
                        })
                    }
                }(), addTimer: function () {
                    z.add.apply(z, f.array(arguments));
                    return this
                }, clearTimer: function () {
                    z.clear.apply(z, f.array(arguments));
                    return this
                }, wait: function (a) {
                    var a = d.extend({
                        until: R, success: s, error: function () {
                            Galleria.raise("Could not complete wait function.")
                        },
                        timeout: 3E3
                    }, a), b = f.timestamp(), c, e, g = function () {
                        e = f.timestamp();
                        c = e - b;
                        if (a.until(c)) return a.success(), !1;
                        if ("number" == typeof a.timeout && e >= b + a.timeout) return a.error(), !1;
                        k.setTimeout(g, 10)
                    };
                    k.setTimeout(g, 10)
                }, toggleQuality: function (a, b) {
                    if (!(7 !== n && 8 !== n || !a || "IMG" != a.nodeName.toUpperCase())) "undefined" === typeof b && (b = "nearest-neighbor" === a.style.msInterpolationMode), a.style.msInterpolationMode = b ? "bicubic" : "nearest-neighbor"
                }, insertStyleTag: function (a) {
                    var b = m.createElement("style");
                    t().head.appendChild(b);
                    b.styleSheet ? b.styleSheet.cssText = a : (a = m.createTextNode(a), b.appendChild(a))
                }, loadScript: function (a, b) {
                    var c = !1, e = d("<script>").attr({src: a, async: !0}).get(0);
                    e.onload = e.onreadystatechange = function () {
                        if (!c && (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState)) c = !0, e.onload = e.onreadystatechange = null, "function" === typeof b && b.call(this, this)
                    };
                    t().head.appendChild(e)
                }, parseValue: function (a) {
                    if ("number" === typeof a) return a;
                    return "string" === typeof a ? (a = a.match(/\-?\d|\./g)) && a.constructor ===
                    Array ? 1 * a.join("") : 0 : 0
                }, timestamp: function () {
                    return (new Date).getTime()
                }, loadCSS: function (a, b, c) {
                    var e, g = !1, i, j = function () {
                        var b = new Image;
                        b.onload = b.onerror = function () {
                            b = null;
                            g = !0
                        };
                        b.src = a
                    };
                    d("link[rel=stylesheet]").each(function () {
                        if (RegExp(a).test(this.href)) return e = this, !1
                    });
                    "function" === typeof b && (c = b, b = void 0);
                    c = c || s;
                    if (e) return c.call(e, e), e;
                    i = m.styleSheets.length;
                    d("#" + b).length ? (d("#" + b).attr("href", a), i--, g = !0) : (e = d("<link>").attr({
                        rel: "stylesheet",
                        href: a,
                        id: b
                    }).get(0), k.setTimeout(function () {
                        var b =
                            d('link[rel="stylesheet"], style');
                        b.length ? b.get(0).parentNode.insertBefore(e, b[0]) : t().head.appendChild(e);
                        if (n) 31 <= i ? Galleria.raise("You have reached the browser stylesheet limit (31)", !0) : e.onreadystatechange = function () {
                            if (!g && (!this.readyState || "loaded" === this.readyState || "complete" === this.readyState)) g = !0
                        }; else {
                            var b = m.createElement("a"), c = k.location;
                            b.href = a;
                            !/file/.test(c.protocol) && c.hostname == b.hostname && c.port == b.port && c.protocol == b.protocol ? d.ajax({
                                    url: a,
                                    success: function () {
                                        g = !0
                                    },
                                    error: j
                                }) :
                                j()
                        }
                    }, 10));
                    "function" === typeof c && f.wait({
                        until: function () {
                            return g && m.styleSheets.length > i
                        }, success: function () {
                            k.setTimeout(function () {
                                c.call(e, e)
                            }, 100)
                        }, error: function () {
                            Galleria.raise("Theme CSS could not load", !0)
                        }, timeout: 1E4
                    });
                    return e
                }
            }
        }(), I = function () {
            var a = function (a, c, e, g) {
                var i = this.getOptions("easing"), j = this.getStageWidth(), h = {left: j * (a.rewind ? -1 : 1)},
                    l = {left: 0};
                e ? (h.opacity = 0, l.opacity = 1) : h.opacity = 1;
                d(a.next).css(h);
                f.animate(a.next, l, {
                    duration: a.speed, complete: function (a) {
                        return function () {
                            c();
                            a.css({left: 0})
                        }
                    }(d(a.next).add(a.prev)), queue: !1, easing: i
                });
                if (g) a.rewind = !a.rewind;
                if (a.prev) {
                    h = {left: 0};
                    l = {left: j * (a.rewind ? 1 : -1)};
                    if (e) h.opacity = 1, l.opacity = 0;
                    d(a.prev).css(h);
                    f.animate(a.prev, l, {
                        duration: a.speed, queue: !1, easing: i, complete: function () {
                            d(this).css("opacity", 0)
                        }
                    })
                }
            };
            return {
                fade: function (a, c) {
                    d(a.next).css({opacity: 0, left: 0}).show();
                    f.animate(a.next, {opacity: 1}, {duration: a.speed, complete: c});
                    a.prev && (d(a.prev).css("opacity", 1).show(), f.animate(a.prev, {opacity: 0}, {duration: a.speed}))
                },
                flash: function (a, c) {
                    d(a.next).css({opacity: 0, left: 0});
                    a.prev ? f.animate(a.prev, {opacity: 0}, {
                        duration: a.speed / 2, complete: function () {
                            f.animate(a.next, {opacity: 1}, {duration: a.speed, complete: c})
                        }
                    }) : f.animate(a.next, {opacity: 1}, {duration: a.speed, complete: c})
                }, pulse: function (a, c) {
                    a.prev && d(a.prev).hide();
                    d(a.next).css({opacity: 0, left: 0}).show();
                    f.animate(a.next, {opacity: 1}, {duration: a.speed, complete: c})
                }, slide: function (b, c) {
                    a.apply(this, f.array(arguments))
                }, fadeslide: function (b, c) {
                    a.apply(this, f.array(arguments).concat([!0]))
                },
                doorslide: function (b, c) {
                    a.apply(this, f.array(arguments).concat([!1, !0]))
                }
            }
        }();
    Galleria = function () {
        var a = this;
        this._options = {};
        this._playing = !1;
        this._playtime = 5E3;
        this._active = null;
        this._queue = {length: 0};
        this._data = [];
        this._dom = {};
        this._thumbnails = [];
        this._layers = [];
        this._firstrun = this._initialized = !1;
        this._stageHeight = this._stageWidth = 0;
        this._target = void 0;
        this._id = parseInt(1E4 * Math.random(), 10);
        d.each("container stage images image-nav image-nav-left image-nav-right info info-text info-title info-description thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right loader counter tooltip".split(" "),
            function (b, c) {
                a._dom[c] = f.create("galleria-" + c)
            });
        d.each("current total".split(" "), function (b, c) {
            a._dom[c] = f.create("galleria-" + c, "span")
        });
        var b = this._keyboard = {
            keys: {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, RETURN: 13, ESCAPE: 27, BACKSPACE: 8, SPACE: 32},
            map: {},
            bound: !1,
            press: function (c) {
                var d = c.keyCode || c.which;
                d in b.map && "function" === typeof b.map[d] && b.map[d].call(a, c)
            },
            attach: function (a) {
                var c, d;
                for (c in a) a.hasOwnProperty(c) && (d = c.toUpperCase(), d in b.keys ? b.map[b.keys[d]] = a[c] : b.map[d] = a[c]);
                if (!b.bound) b.bound =
                    !0, J.bind("keydown", b.press)
            },
            detach: function () {
                b.bound = !1;
                b.map = {};
                J.unbind("keydown", b.press)
            }
        }, c = this._controls = {
            "0": void 0, 1: void 0, active: 0, swap: function () {
                c.active = c.active ? 0 : 1
            }, getActive: function () {
                return c[c.active]
            }, getNext: function () {
                return c[1 - c.active]
            }
        }, e = this._carousel = {
            next: a.$("thumb-nav-right"),
            prev: a.$("thumb-nav-left"),
            width: 0,
            current: 0,
            max: 0,
            hooks: [],
            update: function () {
                var b = 0, c = 0, g = [0];
                d.each(a._thumbnails, function (a, e) {
                    e.ready && (b += e.outerWidth || d(e.container).outerWidth(!0),
                        g[a + 1] = b, c = Math.max(c, e.outerHeight || d(e.container).outerHeight(!0)))
                });
                a.$("thumbnails").css({width: b, height: c});
                e.max = b;
                e.hooks = g;
                e.width = a.$("thumbnails-list").width();
                e.setClasses();
                a.$("thumbnails-container").toggleClass("galleria-carousel", b > e.width);
                e.width = a.$("thumbnails-list").width()
            },
            bindControls: function () {
                var b;
                e.next.bind("click", function (c) {
                    c.preventDefault();
                    if ("auto" === a._options.carouselSteps) for (b = e.current; b < e.hooks.length; b++) {
                        if (e.hooks[b] - e.hooks[e.current] > e.width) {
                            e.set(b -
                                2);
                            break
                        }
                    } else e.set(e.current + a._options.carouselSteps)
                });
                e.prev.bind("click", function (c) {
                    c.preventDefault();
                    if ("auto" === a._options.carouselSteps) for (b = e.current; 0 <= b; b--) if (e.hooks[e.current] - e.hooks[b] > e.width) {
                        e.set(b + 2);
                        break
                    } else {
                        if (0 === b) {
                            e.set(0);
                            break
                        }
                    } else e.set(e.current - a._options.carouselSteps)
                })
            },
            set: function (a) {
                for (a = Math.max(a, 0); e.hooks[a - 1] + e.width >= e.max && 0 <= a;) a--;
                e.current = a;
                e.animate()
            },
            getLast: function (a) {
                return (a || e.current) - 1
            },
            follow: function (a) {
                if (0 === a || a === e.hooks.length -
                    2) e.set(a); else {
                    for (var b = e.current; e.hooks[b] - e.hooks[e.current] < e.width && b <= e.hooks.length;) b++;
                    a - 1 < e.current ? e.set(a - 1) : a + 2 > b && e.set(a - b + e.current + 2)
                }
            },
            setClasses: function () {
                e.prev.toggleClass("disabled", !e.current);
                e.next.toggleClass("disabled", e.hooks[e.current] + e.width >= e.max)
            },
            animate: function () {
                e.setClasses();
                var b = -1 * e.hooks[e.current];
                isNaN(b) || f.animate(a.get("thumbnails"), {left: b}, {
                    duration: a._options.carouselSpeed,
                    easing: a._options.easing,
                    queue: !1
                })
            }
        }, g = this._tooltip = {
            initialized: !1,
            open: !1, timer: "tooltip" + a._id, swapTimer: "swap" + a._id, init: function () {
                g.initialized = !0;
                f.insertStyleTag(".galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}");
                a.$("tooltip").css("opacity", 0.8);
                f.hide(a.get("tooltip"))
            }, move: function (b) {
                var c = a.getMousePosition(b).x, b = a.getMousePosition(b).y, d =
                        a.$("tooltip"), e = b, g = d.outerHeight(!0) + 1, i = d.outerWidth(!0), f = g + 15,
                    i = a.$("container").width() - i - 2, g = a.$("container").height() - g - 2;
                !isNaN(c) && !isNaN(e) && (e -= 30, c = Math.max(0, Math.min(i, c + 10)), e = Math.max(0, Math.min(g, e)), b < f && (e = f), d.css({
                    left: c,
                    top: e
                }))
            }, bind: function (b, c) {
                if (!Galleria.TOUCH) {
                    g.initialized || g.init();
                    var e = function (b, c) {
                        g.define(b, c);
                        d(b).hover(function () {
                            f.clearTimer(g.swapTimer);
                            a.$("container").unbind("mousemove", g.move).bind("mousemove", g.move).trigger("mousemove");
                            g.show(b);
                            f.addTimer(g.timer,
                                function () {
                                    a.$("tooltip").stop().show().animate({opacity: 1});
                                    g.open = !0
                                }, g.open ? 0 : 500)
                        }, function () {
                            a.$("container").unbind("mousemove", g.move);
                            f.clearTimer(g.timer);
                            a.$("tooltip").stop().animate({opacity: 0}, 200, function () {
                                a.$("tooltip").hide();
                                f.addTimer(g.swapTimer, function () {
                                    g.open = !1
                                }, 1E3)
                            })
                        }).click(function () {
                            d(this).trigger("mouseout")
                        })
                    };
                    "string" === typeof c ? e(b in a._dom ? a.get(b) : b, c) : d.each(b, function (b, c) {
                        e(a.get(b), c)
                    })
                }
            }, show: function (b) {
                var b = d(b in a._dom ? a.get(b) : b), c = b.data("tt"), e = function (a) {
                    k.setTimeout(function (a) {
                            return function () {
                                g.move(a)
                            }
                        }(a),
                        10);
                    b.unbind("mouseup", e)
                };
                if (c = "function" === typeof c ? c() : c) a.$("tooltip").html(c.replace(/\s/, "&nbsp;")), b.bind("mouseup", e)
            }, define: function (b, c) {
                if ("function" !== typeof c) var e = c, c = function () {
                    return e
                };
                b = d(b in a._dom ? a.get(b) : b).data("tt", c);
                g.show(b)
            }
        }, i = this._fullscreen = {
            scrolled: 0, crop: void 0, transition: void 0, active: !1, keymap: a._keyboard.map, os: {
                callback: s, support: function () {
                    var a = t().html;
                    return a.requestFullscreen || a.mozRequestFullScreen || a.webkitRequestFullScreen
                }(), enter: function (a) {
                    i.os.callback =
                        a || s;
                    a = t().html;
                    a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullScreen && a.webkitRequestFullScreen()
                }, exit: function (a) {
                    i.os.callback = a || s;
                    m.exitFullscreen ? m.exitFullscreen() : m.mozCancelFullScreen ? m.mozCancelFullScreen() : m.webkitCancelFullScreen && m.webkitCancelFullScreen()
                }, listen: function () {
                    if (i.os.support) {
                        var a = function () {
                            m.fullscreen || m.mozFullScreen || m.webkitIsFullScreen ? i._enter(i.os.callback) : i._exit(i.os.callback)
                        };
                        m.addEventListener("fullscreenchange",
                            a, !1);
                        m.addEventListener("mozfullscreenchange", a, !1);
                        m.addEventListener("webkitfullscreenchange", a, !1)
                    }
                }
            }, enter: function (b) {
                a._options.trueFullscreen && i.os.support ? i.os.enter(b) : i._enter(b)
            }, _enter: function (b) {
                i.active = !0;
                f.hide(a.getActiveImage());
                a.$("container").addClass("fullscreen");
                i.scrolled = v.scrollTop();
                f.forceStyles(a.get("container"), {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1E4
                });
                var c = {height: "100%", overflow: "hidden", margin: 0, padding: 0}, e = a.getData(), g = a._options;
                f.forceStyles(t().html, c);
                f.forceStyles(t().body, c);
                i.keymap = d.extend({}, a._keyboard.map);
                a.attachKeyboard({escape: a.exitFullscreen, right: a.next, left: a.prev});
                i.crop = g.imageCrop;
                if (void 0 != g.fullscreenCrop) g.imageCrop = g.fullscreenCrop;
                if (e && e.big && e.image !== e.big) {
                    var c = new Galleria.Picture, h = c.isCached(e.big), j = a.getIndex(), p = a._thumbnails[j];
                    a.trigger({
                        type: Galleria.LOADSTART,
                        cached: h,
                        rewind: !1,
                        index: j,
                        imageTarget: a.getActiveImage(),
                        thumbTarget: p,
                        galleriaData: e
                    });
                    c.load(e.big, function (b) {
                        a._scaleImage(b,
                            {
                                complete: function (b) {
                                    a.trigger({
                                        type: Galleria.LOADFINISH,
                                        cached: h,
                                        index: j,
                                        rewind: !1,
                                        imageTarget: b.image,
                                        thumbTarget: p
                                    });
                                    var c = a._controls.getActive().image;
                                    c && d(c).width(b.image.width).height(b.image.height).attr("style", d(b.image).attr("style")).attr("src", b.image.src)
                                }
                            })
                    })
                }
                a.rescale(function () {
                    f.addTimer(!1, function () {
                        f.show(a.getActiveImage());
                        "function" === typeof b && b.call(a)
                    }, 100);
                    a.trigger(Galleria.FULLSCREEN_ENTER)
                });
                v.resize(function () {
                    i.scale()
                })
            }, scale: function () {
                a.rescale()
            }, exit: function (b) {
                a._options.trueFullscreen &&
                i.os.support ? i.os.exit(b) : i._exit(b)
            }, _exit: function (b) {
                i.active = !1;
                f.hide(a.getActiveImage());
                a.$("container").removeClass("fullscreen");
                f.revertStyles(a.get("container"), t().html, t().body);
                k.scrollTo(0, i.scrolled);
                a.detachKeyboard();
                a.attachKeyboard(i.keymap);
                a._options.imageCrop = i.crop;
                var c = a.getData().big, d = a._controls.getActive().image;
                !a.getData().iframe && d && c && c == d.src && k.setTimeout(function (a) {
                    return function () {
                        d.src = a
                    }
                }(a.getData().image), 1);
                a.rescale(function () {
                    f.addTimer(!1, function () {
                        f.show(a.getActiveImage());
                        "function" === typeof b && b.call(a);
                        v.trigger("resize")
                    }, 50);
                    a.trigger(Galleria.FULLSCREEN_EXIT)
                });
                v.unbind("resize", i.scale)
            }
        };
        i.os.listen();
        var j = this._idle = {
            timer: "idle" + a._id, trunk: [], bound: !1, add: function (a, b) {
                if (a) {
                    j.bound || j.addEvent();
                    var a = d(a), c = {}, e;
                    for (e in b) b.hasOwnProperty(e) && (c[e] = a.css(e));
                    a.data("idle", {from: c, to: b, complete: !0, busy: !1});
                    j.addTimer();
                    j.trunk.push(a)
                }
            }, remove: function (b) {
                b = jQuery(b);
                d.each(j.trunk, function (c, d) {
                    d && d.length && !d.not(b).length && (a._idle.show(b), a._idle.trunk.splice(c,
                        1))
                });
                j.trunk.length || (j.removeEvent(), f.clearTimer(j.timer))
            }, addEvent: function () {
                j.bound = !0;
                a.$("container").bind("mousemove click", j.showAll)
            }, removeEvent: function () {
                j.bound = !1;
                a.$("container").unbind("mousemove click", j.showAll)
            }, addTimer: function () {
                f.addTimer(j.timer, function () {
                    j.hide()
                }, a._options.idleTime)
            }, hide: function () {
                a._options.idleMode && !1 !== a.getIndex() && (a.trigger(Galleria.IDLE_ENTER), d.each(j.trunk, function (b, c) {
                    var d = c.data("idle");
                    if (d) c.data("idle").complete = !1, f.animate(c, d.to,
                        {duration: a._options.idleSpeed})
                }))
            }, showAll: function () {
                f.clearTimer(j.timer);
                d.each(j.trunk, function (a, b) {
                    j.show(b)
                })
            }, show: function (b) {
                var c = b.data("idle");
                if (!c.busy && !c.complete) c.busy = !0, a.trigger(Galleria.IDLE_EXIT), f.clearTimer(j.timer), f.animate(b, c.from, {
                    duration: a._options.idleSpeed / 2,
                    complete: function () {
                        d(this).data("idle").busy = !1;
                        d(this).data("idle").complete = !0
                    }
                });
                j.addTimer()
            }
        }, h = this._lightbox = {
            width: 0, height: 0, initialized: !1, active: null, image: null, elems: {}, keymap: !1, init: function () {
                a.trigger(Galleria.LIGHTBOX_OPEN);
                if (!h.initialized) {
                    h.initialized = !0;
                    var b = {}, c = a._options, e = "", c = {
                        overlay: "position:fixed;display:none;opacity:" + c.overlayOpacity + ";filter:alpha(opacity=" + 100 * c.overlayOpacity + ");top:0;left:0;width:100%;height:100%;background:" + c.overlayBackground + ";z-index:99990",
                        box: "position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991",
                        shadow: "position:absolute;background:#000;width:100%;height:100%;",
                        content: "position:absolute;background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden",
                        info: "position:absolute;bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px",
                        close: "position:absolute;top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999",
                        image: "position:absolute;top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;",
                        prevholder: "position:absolute;width:50%;top:0;bottom:40px;cursor:pointer;",
                        nextholder: "position:absolute;width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;",
                        prev: "position:absolute;top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif",
                        next: "position:absolute;top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000",
                        title: "float:left",
                        counter: "float:right;margin-left:8px;"
                    }, g = {};
                    n && 7 < n && (c.nextholder += "background:#000;filter:alpha(opacity=0);", c.prevholder +=
                        "background:#000;filter:alpha(opacity=0);");
                    d.each(c, function (a, b) {
                        e += ".galleria-lightbox-" + a + "{" + b + "}"
                    });
                    e += ".galleria-lightbox-box.iframe .galleria-lightbox-prevholder,.galleria-lightbox-box.iframe .galleria-lightbox-nextholder{width:100px;height:100px;top:50%;margin-top:-70px}";
                    f.insertStyleTag(e);
                    d.each("overlay box content shadow title info close prevholder prev nextholder next counter image".split(" "), function (c, d) {
                        a.addElement("lightbox-" + d);
                        b[d] = h.elems[d] = a.get("lightbox-" + d)
                    });
                    h.image =
                        new Galleria.Picture;
                    d.each({
                        box: "shadow content close prevholder nextholder",
                        info: "title counter",
                        content: "info image",
                        prevholder: "prev",
                        nextholder: "next"
                    }, function (a, b) {
                        var c = [];
                        d.each(b.split(" "), function (a, b) {
                            c.push("lightbox-" + b)
                        });
                        g["lightbox-" + a] = c
                    });
                    a.append(g);
                    d(b.image).append(h.image.container);
                    d(t().body).append(b.overlay, b.box);
                    f.optimizeTouch(b.box);
                    (function (a) {
                        return a.hover(function () {
                            d(this).css("color", "#bbb")
                        }, function () {
                            d(this).css("color", "#444")
                        })
                    })(d(b.close).bind("click",
                        h.hide).html("&#215;"));
                    d.each(["Prev", "Next"], function (a, c) {
                        var e = d(b[c.toLowerCase()]).html(/v/.test(c) ? "&#8249;&nbsp;" : "&nbsp;&#8250;"),
                            g = d(b[c.toLowerCase() + "holder"]);
                        g.bind("click", function () {
                            h["show" + c]()
                        });
                        8 > n || Galleria.TOUCH ? e.show() : g.hover(function () {
                            e.show()
                        }, function () {
                            e.stop().fadeOut(200)
                        })
                    });
                    d(b.overlay).bind("click", h.hide);
                    if (Galleria.IPAD) a._options.lightboxTransitionSpeed = 0
                }
            }, rescale: function (b) {
                var c = Math.min(v.width() - 40, h.width), e = Math.min(v.height() - 60, h.height), e = Math.min(c /
                    h.width, e / h.height), c = Math.round(h.width * e) + 40, e = Math.round(h.height * e) + 60, c = {
                    width: c,
                    height: e,
                    "margin-top": -1 * Math.ceil(e / 2),
                    "margin-left": -1 * Math.ceil(c / 2)
                };
                b ? d(h.elems.box).css(c) : d(h.elems.box).animate(c, {
                    duration: a._options.lightboxTransitionSpeed,
                    easing: a._options.easing,
                    complete: function () {
                        var b = h.image, c = a._options.lightboxFadeSpeed;
                        a.trigger({type: Galleria.LIGHTBOX_IMAGE, imageTarget: b.image});
                        d(b.container).show();
                        d(b.image).animate({opacity: 1}, c);
                        f.show(h.elems.info, c)
                    }
                })
            }, hide: function () {
                h.image.image =
                    null;
                v.unbind("resize", h.rescale);
                d(h.elems.box).hide();
                f.hide(h.elems.info);
                a.detachKeyboard();
                a.attachKeyboard(h.keymap);
                h.keymap = !1;
                f.hide(h.elems.overlay, 200, function () {
                    d(this).hide().css("opacity", a._options.overlayOpacity);
                    a.trigger(Galleria.LIGHTBOX_CLOSE)
                })
            }, showNext: function () {
                h.show(a.getNext(h.active))
            }, showPrev: function () {
                h.show(a.getPrev(h.active))
            }, show: function (b) {
                h.active = b = "number" === typeof b ? b : a.getIndex() || 0;
                h.initialized || h.init();
                if (!h.keymap) h.keymap = d.extend({}, a._keyboard.map),
                    a.attachKeyboard({escape: h.hide, right: h.showNext, left: h.showPrev});
                v.unbind("resize", h.rescale);
                var c = a.getData(b), e = a.getDataLength(), g = a.getNext(b), i, j, p;
                f.hide(h.elems.info);
                try {
                    for (p = a._options.preload; 0 < p; p--) j = new Galleria.Picture, i = a.getData(g), j.preload("big" in i ? i.big : i.image), g = a.getNext(g)
                } catch (H) {
                }
                h.image.isIframe = !!c.iframe;
                d(h.elems.box).toggleClass("iframe", !!c.iframe);
                h.image.load(c.iframe || c.big || c.image, function (a) {
                    h.width = a.isIframe ? d(k).width() : a.original.width;
                    h.height = a.isIframe ?
                        d(k).height() : a.original.height;
                    d(a.image).css({
                        width: a.isIframe ? "100%" : "100.1%",
                        height: a.isIframe ? "100%" : "100.1%",
                        top: 0,
                        zIndex: 99998,
                        opacity: 0,
                        visibility: "visible"
                    });
                    h.elems.title.innerHTML = c.title || "";
                    h.elems.counter.innerHTML = b + 1 + " / " + e;
                    v.resize(h.rescale);
                    h.rescale()
                });
                d(h.elems.overlay).show().css("visibility", "visible");
                d(h.elems.box).show()
            }
        };
        return this
    };
    Galleria.prototype = {
        constructor: Galleria, init: function (a, b) {
            b = N(b);
            this._original = {target: a, options: b, data: null};
            this._target = this._dom.target =
                a.nodeName ? a : d(a).get(0);
            this._original.html = this._target.innerHTML;
            B.push(this);
            if (this._target) {
                this._options = {
                    autoplay: !1,
                    carousel: !0,
                    carouselFollow: !0,
                    carouselSpeed: 400,
                    carouselSteps: "auto",
                    clicknext: !1,
                    dailymotion: {
                        foreground: "%23EEEEEE",
                        highlight: "%235BCEC5",
                        background: "%23222222",
                        logo: 0,
                        hideInfos: 1
                    },
                    dataConfig: function () {
                        return {}
                    },
                    dataSelector: "img",
                    dataSource: this._target,
                    debug: void 0,
                    dummy: void 0,
                    easing: "galleria",
                    extend: function () {
                    },
                    fullscreenCrop: void 0,
                    fullscreenDoubleTap: !0,
                    fullscreenTransition: void 0,
                    height: 0,
                    idleMode: !0,
                    idleTime: 3E3,
                    idleSpeed: 200,
                    imageCrop: !1,
                    imageMargin: 0,
                    imagePan: !1,
                    imagePanSmoothness: 12,
                    imagePosition: "50%",
                    imageTimeout: void 0,
                    initialTransition: void 0,
                    keepSource: !1,
                    layerFollow: !0,
                    lightbox: !1,
                    lightboxFadeSpeed: 200,
                    lightboxTransitionSpeed: 200,
                    linkSourceImages: !0,
                    maxScaleRatio: void 0,
                    minScaleRatio: void 0,
                    overlayOpacity: 0.85,
                    overlayBackground: "#0b0b0b",
                    pauseOnInteraction: !0,
                    popupLinks: !1,
                    preload: 2,
                    queue: !0,
                    responsive: !1,
                    show: 0,
                    showInfo: !0,
                    showCounter: !0,
                    showImagenav: !0,
                    swipe: !0,
                    thumbCrop: !0,
                    thumbEventType: "click",
                    thumbFit: !0,
                    thumbMargin: 0,
                    thumbQuality: "auto",
                    thumbnails: !0,
                    touchTransition: void 0,
                    transition: "fade",
                    transitionInitial: void 0,
                    transitionSpeed: 400,
                    trueFullscreen: !0,
                    useCanvas: !1,
                    vimeo: {title: 0, byline: 0, portrait: 0, color: "aaaaaa"},
                    wait: 5E3,
                    width: "auto",
                    youtube: {modestbranding: 1, autohide: 1, color: "white", hd: 1, rel: 0, showinfo: 0}
                };
                this._options.initialTransition = this._options.initialTransition || this._options.transitionInitial;
                b && !1 === b.debug && (K = !1);
                if (b && "string" === typeof b.dummy) E =
                    b.dummy;
                d(this._target).children().hide();
                "object" === typeof Galleria.theme ? this._init() : Q.push(this);
                return this
            }
            Galleria.raise("Target not found", !0)
        }, _init: function () {
            var a = this, b = this._options;
            if (this._initialized) return Galleria.raise("Init failed: Gallery instance already initialized."), this;
            this._initialized = !0;
            if (!Galleria.theme) return Galleria.raise("Init failed: No theme found.", !0), this;
            d.extend(!0, b, Galleria.theme.defaults, this._original.options, Galleria.configure.options);
            (function (a) {
                "getContext" in
                a && (u = u || {elem: a, context: a.getContext("2d"), cache: {}, length: 0})
            })(m.createElement("canvas"));
            this.bind(Galleria.DATA, function () {
                Galleria.QUIRK && Galleria.raise("Your page is in Quirks mode, Galleria may not render correctly. Please validate your HTML.");
                this._original.data = this._data;
                this.get("total").innerHTML = this.getDataLength();
                var b = this.$("container"), c = {width: 0, height: 0}, d = function () {
                    return a.$("stage").height()
                };
                f.wait({
                    until: function () {
                        c = a._getWH();
                        b.width(c.width).height(c.height);
                        return d() &&
                            c.width && 50 < c.height
                    }, success: function () {
                        a._width = c.width;
                        a._height = c.height;
                        Galleria.WEBKIT ? k.setTimeout(function () {
                            a._run()
                        }, 1) : a._run()
                    }, error: function () {
                        d() ? Galleria.raise("Could not extract sufficient width/height of the gallery container. Traced measures: width:" + c.width + "px, height: " + c.height + "px.", !0) : Galleria.raise("Could not extract a stage height from the CSS. Traced height: " + d() + "px.", !0)
                    }, timeout: "number" == typeof this._options.wait ? this._options.wait : !1
                })
            });
            this.append({
                "info-text": ["info-title",
                    "info-description"],
                info: ["info-text"],
                "image-nav": ["image-nav-right", "image-nav-left"],
                stage: ["images", "loader", "counter", "image-nav"],
                "thumbnails-list": ["thumbnails"],
                "thumbnails-container": ["thumb-nav-left", "thumbnails-list", "thumb-nav-right"],
                container: ["stage", "thumbnails-container", "info", "tooltip"]
            });
            f.hide(this.$("counter").append(this.get("current"), m.createTextNode(" / "), this.get("total")));
            this.setCounter("&#8211;");
            f.hide(a.get("tooltip"));
            this.$("container").addClass(Galleria.TOUCH ?
                "touch" : "notouch");
            d.each(Array(2), function (b) {
                var c = new Galleria.Picture;
                d(c.container).css({
                    position: "absolute",
                    top: 0,
                    left: 0
                }).prepend(a._layers[b] = d(f.create("galleria-layer")).css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2
                })[0]);
                a.$("images").append(c.container);
                a._controls[b] = c
            });
            this.$("images").css({position: "relative", top: 0, left: 0, width: "100%", height: "100%"});
            this.$("thumbnails, thumbnails-list").css({overflow: "hidden", position: "relative"});
            this.$("image-nav-right, image-nav-left").bind("click",
                function (c) {
                    b.clicknext && c.stopPropagation();
                    b.pauseOnInteraction && a.pause();
                    c = /right/.test(this.className) ? "next" : "prev";
                    a[c]()
                });
            d.each(["info", "counter", "image-nav"], function (c, d) {
                !1 === b["show" + d.substr(0, 1).toUpperCase() + d.substr(1).replace(/-/, "")] && f.moveOut(a.get(d.toLowerCase()))
            });
            this.load();
            if (!b.keepSource && !n) this._target.innerHTML = "";
            this.get("errors") && this.appendChild("target", "errors");
            this.appendChild("target", "container");
            if (b.carousel) {
                var c = 0, e = b.show;
                this.bind(Galleria.THUMBNAIL,
                    function () {
                        this.updateCarousel();
                        ++c == this.getDataLength() && "number" == typeof e && 0 < e && this._carousel.follow(e)
                    })
            }
            b.responsive && v.bind("resize", function () {
                a.isFullscreen() || a.resize()
            });
            b.swipe && (function (b) {
                var c = [0, 0], d = [0, 0], e = !1, l = 0, r, k = function (a) {
                    a.originalEvent.touches && 1 < a.originalEvent.touches.length || (r = a.originalEvent.touches ? a.originalEvent.touches[0] : a, d = [r.pageX, r.pageY], c[0] || (c = d), 10 < Math.abs(c[0] - d[0]) && a.preventDefault())
                }, m = function (o) {
                    b.unbind("touchmove", k);
                    o.originalEvent.touches &&
                    o.originalEvent.touches.length || e ? e = !e : (1E3 > f.timestamp() - l && 30 < Math.abs(c[0] - d[0]) && 100 > Math.abs(c[1] - d[1]) && (o.preventDefault(), a[c[0] > d[0] ? "next" : "prev"]()), c = d = [0, 0])
                };
                b.bind("touchstart", function (a) {
                    a.originalEvent.touches && 1 < a.originalEvent.touches.length || (r = a.originalEvent.touches ? a.originalEvent.touches[0] : a, l = f.timestamp(), c = d = [r.pageX, r.pageY], b.bind("touchmove", k).one("touchend", m))
                })
            }(a.$("images")), b.fullscreenDoubleTap && this.$("stage").bind("touchstart", function () {
                var b, c, d, e, f, r;
                return function (k) {
                    r =
                        Galleria.utils.timestamp();
                    c = (k.originalEvent.touches ? k.originalEvent.touches[0] : k).pageX;
                    d = (k.originalEvent.touches ? k.originalEvent.touches[0] : k).pageY;
                    500 > r - b && 20 > c - e && 20 > d - f ? (a.toggleFullscreen(), k.preventDefault(), a.$("stage").unbind("touchend", arguments.callee)) : (b = r, e = c, f = d)
                }
            }()));
            f.optimizeTouch(this.get("container"));
            d.each(Galleria.on.binds, function (b, c) {
                a.bind(c.type, c.callback)
            });
            return this
        }, _getWH: function () {
            var a = this.$("container"), b = this.$("target"), c = this, e = {}, g;
            d.each(["width", "height"],
                function (d, j) {
                    c._options[j] && "number" === typeof c._options[j] ? e[j] = c._options[j] : (g = [f.parseValue(a.css(j)), f.parseValue(b.css(j)), a[j](), b[j]()], c["_" + j] || g.splice(g.length, f.parseValue(a.css("min-" + j)), f.parseValue(b.css("min-" + j))), e[j] = Math.max.apply(Math, g))
                });
            if (c._options.height && 2 > c._options.height) e.height = e.width * c._options.height;
            return e
        }, _createThumbnails: function () {
            this.get("total").innerHTML = this.getDataLength();
            var a, b, c, e, g, i, j = this, h = this._options, l = function () {
                    var a = j.$("thumbnails").find(".active");
                    return !a.length ? !1 : a.find("img").attr("src")
                }(), r = "string" === typeof h.thumbnails ? h.thumbnails.toLowerCase() : null, x = function (a) {
                    return m.defaultView && m.defaultView.getComputedStyle ? m.defaultView.getComputedStyle(c.container, null)[a] : i.css(a)
                }, n = function (a, b, c) {
                    return function () {
                        d(c).append(a);
                        j.trigger({type: Galleria.THUMBNAIL, thumbTarget: a, index: b, galleriaData: j.getData(b)})
                    }
                }, o = function (a) {
                    h.pauseOnInteraction && j.pause();
                    var b = d(a.currentTarget).data("index");
                    j.getIndex() !== b && j.show(b);
                    a.preventDefault()
                },
                q = function (a) {
                    a.scale({
                        width: a.data.width,
                        height: a.data.height,
                        crop: h.thumbCrop,
                        margin: h.thumbMargin,
                        canvas: h.useCanvas,
                        complete: function (a) {
                            var b = ["left", "top"], c, e, g = j.getData(a.index), i = g.thumb.split(":");
                            d.each(["Width", "Height"], function (g, f) {
                                c = f.toLowerCase();
                                if ((!0 !== h.thumbCrop || h.thumbCrop === c) && h.thumbFit) e = {}, e[c] = a[c], d(a.container).css(e), e = {}, e[b[g]] = 0, d(a.image).css(e);
                                a["outer" + f] = d(a.container)["outer" + f](!0)
                            });
                            f.toggleQuality(a.image, !0 === h.thumbQuality || "auto" === h.thumbQuality &&
                                a.original.width < 3 * a.width);
                            g.iframe && 2 == i.length && i[0] in A && A[i[0]].getThumb(i[1], function (a) {
                                return function (b) {
                                    a.src = b
                                }
                            }(a.image));
                            j.trigger({
                                type: Galleria.THUMBNAIL,
                                thumbTarget: a.image,
                                index: a.data.order,
                                galleriaData: j.getData(a.data.order)
                            })
                        }
                    })
                };
            this._thumbnails = [];
            this.$("thumbnails").empty();
            for (a = 0; this._data[a]; a++) e = this._data[a], !0 === h.thumbnails && (e.thumb || e.image) ? (c = new Galleria.Picture(a), c.index = a, b = e.thumb || e.image, this.$("thumbnails").append(c.container), i = d(c.container), c.data =
                {
                    width: f.parseValue(x("width")),
                    height: f.parseValue(x("height")),
                    order: a
                }, h.thumbFit && !0 !== h.thumbCrop ? i.css({
                width: "auto",
                height: "auto"
            }) : i.css({
                width: c.data.width,
                height: c.data.height
            }), g = b.split(":"), 2 == g.length && g[0] in A ? c.load("data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D", {
                height: c.data.height,
                width: 1.25 * c.data.height
            }, q) : c.load(b, q), "all" === h.preload && c.preload(e.image)) : e.iframe || "empty" === r || "numbers" === r ? (c = {
                container: f.create("galleria-image"),
                image: f.create("img", "span"), ready: !0
            }, "numbers" === r && d(c.image).text(a + 1), e.iframe && d(c.image).addClass("iframe"), this.$("thumbnails").append(c.container), k.setTimeout(n(c.image, a, c.container), 50 + 20 * a)) : c = {
                container: null,
                image: null
            }, d(c.container).add(h.keepSource && h.linkSourceImages ? e.original : null).data("index", a).bind(h.thumbEventType, o), l === b && d(c.container).addClass("active"), this._thumbnails.push(c)
        }, _run: function () {
            var a = this;
            a._createThumbnails();
            f.wait({
                timeout: 1E4, until: function () {
                    Galleria.OPERA &&
                    a.$("stage").css("display", "inline-block");
                    a._stageWidth = a.$("stage").width();
                    a._stageHeight = a.$("stage").height();
                    return a._stageWidth && 50 < a._stageHeight
                }, success: function () {
                    D.push(a);
                    f.show(a.get("counter"));
                    a._options.carousel && a._carousel.bindControls();
                    if (a._options.autoplay) {
                        a.pause();
                        if ("number" === typeof a._options.autoplay) a._playtime = a._options.autoplay;
                        a.trigger(Galleria.PLAY);
                        a._playing = !0
                    }
                    a._firstrun ? "number" === typeof a._options.show && a.show(a._options.show) : (a._firstrun = !0, Galleria.History &&
                    Galleria.History.change(function (b) {
                        isNaN(b) ? k.history.go(-1) : a.show(b, void 0, !0)
                    }), a.trigger(Galleria.READY), Galleria.theme.init.call(a, a._options), d.each(Galleria.ready.callbacks, function () {
                        this.call(a, a._options)
                    }), a._options.extend.call(a, a._options), /^[0-9]{1,4}$/.test(L) && Galleria.History ? a.show(L, void 0, !0) : a._data[a._options.show] && a.show(a._options.show))
                }, error: function () {
                    Galleria.raise("Stage width or height is too small to show the gallery. Traced measures: width:" + a._stageWidth + "px, height: " +
                        a._stageHeight + "px.", !0)
                }
            })
        }, load: function (a, b, c) {
            var e = this;
            this._data = [];
            this._thumbnails = [];
            this.$("thumbnails").empty();
            "function" === typeof b && (c = b, b = null);
            a = a || this._options.dataSource;
            b = b || this._options.dataSelector;
            c = c || this._options.dataConfig;
            /^function Object/.test(a.constructor) && (a = [a]);
            if (a.constructor === Array) return this.validate(a) ? (this._data = a, this._parseData().trigger(Galleria.DATA)) : Galleria.raise("Load failed: JSON Array not valid."), this;
            d(a).find(b + ",.video,.iframe").each(function (a,
                                                            b) {
                var b = d(b), f = {}, h = b.parent(), l = h.attr("href"), h = h.attr("rel");
                l && ("IMG" == b[0].nodeName || b.hasClass("video")) && O(l) ? f.video = l : l && b.hasClass("iframe") ? f.iframe = l : f.image = f.big = l;
                if (h) f.big = h;
                d.each("big title description link layer".split(" "), function (a, c) {
                    b.data(c) && (f[c] = b.data(c))
                });
                e._data.push(d.extend({
                    title: b.attr("title") || "",
                    thumb: b.attr("src"),
                    image: b.attr("src"),
                    big: b.attr("src"),
                    description: b.attr("alt") || "",
                    link: b.attr("longdesc"),
                    original: b.get(0)
                }, f, c(b)))
            });
            this.getDataLength() ?
                this._parseData().trigger(Galleria.DATA) : Galleria.raise("Load failed: no data found.");
            return this
        }, _parseData: function () {
            var a = this, b;
            d.each(this._data, function (c, e) {
                b = a._data[c];
                if (!1 === "thumb" in e) b.thumb = e.image;
                if (!1 in e) b.big = e.image;
                if ("video" in e) {
                    var f = O(e.video);
                    if (f && (b.iframe = A[f.provider].embed(f.id) + function () {
                            if ("object" == typeof a._options[f.provider]) {
                                var b = [];
                                d.each(a._options[f.provider], function (a, c) {
                                    b.push(a + "=" + c)
                                });
                                "youtube" == f.provider && (b = ["wmode=opaque"].concat(b));
                                return "?" +
                                    b.join("&")
                            }
                            return ""
                        }(), delete b.video, !("thumb" in b) || !b.thumb)) b.thumb = f.provider + ":" + f.id
                }
            });
            return this
        }, destroy: function () {
            this.get("target").innerHTML = this._original.html;
            return this
        }, splice: function () {
            var a = this, b = f.array(arguments);
            k.setTimeout(function () {
                C.splice.apply(a._data, b);
                a._parseData()._createThumbnails()
            }, 2);
            return a
        }, push: function () {
            var a = this, b = f.array(arguments);
            k.setTimeout(function () {
                C.push.apply(a._data, b);
                a._parseData()._createThumbnails()
            }, 2);
            return a
        }, _getActive: function () {
            return this._controls.getActive()
        },
        validate: function () {
            return !0
        }, bind: function (a, b) {
            a = F(a);
            this.$("container").bind(a, this.proxy(b));
            return this
        }, unbind: function (a) {
            a = F(a);
            this.$("container").unbind(a);
            return this
        }, trigger: function (a) {
            a = "object" === typeof a ? d.extend(a, {scope: this}) : {type: F(a), scope: this};
            this.$("container").trigger(a);
            return this
        }, addIdleState: function (a, b) {
            this._idle.add.apply(this._idle, f.array(arguments));
            return this
        }, removeIdleState: function (a) {
            this._idle.remove.apply(this._idle, f.array(arguments));
            return this
        },
        enterIdleMode: function () {
            this._idle.hide();
            return this
        }, exitIdleMode: function () {
            this._idle.showAll();
            return this
        }, enterFullscreen: function (a) {
            this._fullscreen.enter.apply(this, f.array(arguments));
            return this
        }, exitFullscreen: function (a) {
            this._fullscreen.exit.apply(this, f.array(arguments));
            return this
        }, toggleFullscreen: function (a) {
            this._fullscreen[this.isFullscreen() ? "exit" : "enter"].apply(this, f.array(arguments));
            return this
        }, bindTooltip: function (a, b) {
            this._tooltip.bind.apply(this._tooltip, f.array(arguments));
            return this
        }, defineTooltip: function (a, b) {
            this._tooltip.define.apply(this._tooltip, f.array(arguments));
            return this
        }, refreshTooltip: function (a) {
            this._tooltip.show.apply(this._tooltip, f.array(arguments));
            return this
        }, openLightbox: function () {
            this._lightbox.show.apply(this._lightbox, f.array(arguments));
            return this
        }, closeLightbox: function () {
            this._lightbox.hide.apply(this._lightbox, f.array(arguments));
            return this
        }, getActiveImage: function () {
            return this._getActive().image || void 0
        }, getActiveThumb: function () {
            return this._thumbnails[this._active].image ||
                void 0
        }, getMousePosition: function (a) {
            return {x: a.pageX - this.$("container").offset().left, y: a.pageY - this.$("container").offset().top}
        }, addPan: function (a) {
            if (!1 !== this._options.imageCrop) {
                var a = d(a || this.getActiveImage()), b = this, c = a.width() / 2, e = a.height() / 2,
                    g = parseInt(a.css("left"), 10), i = parseInt(a.css("top"), 10), j = g || 0, h = i || 0, l = 0,
                    k = 0, m = !1, w = f.timestamp(), o = 0, q = 0, p = function (b, c, d) {
                        if (0 < b && (q = Math.round(Math.max(-1 * b, Math.min(0, c))), o !== q)) if (o = q, 8 === n) a.parent()["scroll" + d](-1 * q); else b = {}, b[d.toLowerCase()] =
                            q, a.css(b)
                    }, H = function (a) {
                        if (!(50 > f.timestamp() - w)) m = !0, c = b.getMousePosition(a).x, e = b.getMousePosition(a).y
                    };
                8 === n && (a.parent().scrollTop(-1 * h).scrollLeft(-1 * j), a.css({top: 0, left: 0}));
                this.$("stage").unbind("mousemove", H).bind("mousemove", H);
                f.addTimer("pan" + b._id, function () {
                    m && (l = a.width() - b._stageWidth, k = a.height() - b._stageHeight, g = -1 * c / b._stageWidth * l, i = -1 * e / b._stageHeight * k, j += (g - j) / b._options.imagePanSmoothness, h += (i - h) / b._options.imagePanSmoothness, p(k, h, "Top"), p(l, j, "Left"))
                }, 50, !0);
                return this
            }
        },
        proxy: function (a, b) {
            if ("function" !== typeof a) return s;
            b = b || this;
            return function () {
                return a.apply(b, f.array(arguments))
            }
        }, removePan: function () {
            this.$("stage").unbind("mousemove");
            f.clearTimer("pan" + this._id);
            return this
        }, addElement: function (a) {
            var b = this._dom;
            d.each(f.array(arguments), function (a, d) {
                b[d] = f.create("galleria-" + d)
            });
            return this
        }, attachKeyboard: function (a) {
            this._keyboard.attach.apply(this._keyboard, f.array(arguments));
            return this
        }, detachKeyboard: function () {
            this._keyboard.detach.apply(this._keyboard,
                f.array(arguments));
            return this
        }, appendChild: function (a, b) {
            this.$(a).append(this.get(b) || b);
            return this
        }, prependChild: function (a, b) {
            this.$(a).prepend(this.get(b) || b);
            return this
        }, remove: function (a) {
            this.$(f.array(arguments).join(",")).remove();
            return this
        }, append: function (a) {
            var b, c;
            for (b in a) if (a.hasOwnProperty(b)) if (a[b].constructor === Array) for (c = 0; a[b][c]; c++) this.appendChild(b, a[b][c]); else this.appendChild(b, a[b]);
            return this
        }, _scaleImage: function (a, b) {
            if (a = a || this._controls.getActive()) {
                var c,
                    e = function (a) {
                        d(a.container).children(":first").css({
                            top: Math.max(0, f.parseValue(a.image.style.top)),
                            left: Math.max(0, f.parseValue(a.image.style.left)),
                            width: f.parseValue(a.image.width),
                            height: f.parseValue(a.image.height)
                        })
                    }, b = d.extend({
                        width: this._stageWidth,
                        height: this._stageHeight,
                        crop: this._options.imageCrop,
                        max: this._options.maxScaleRatio,
                        min: this._options.minScaleRatio,
                        margin: this._options.imageMargin,
                        position: this._options.imagePosition
                    }, b);
                this._options.layerFollow && !0 !== this._options.imageCrop ?
                    "function" == typeof b.complete ? (c = b.complete, b.complete = function () {
                        c.call(a, a);
                        e(a)
                    }) : b.complete = e : d(a.container).children(":first").css({top: 0, left: 0});
                a.scale(b);
                return this
            }
        }, updateCarousel: function () {
            this._carousel.update();
            return this
        }, resize: function (a, b) {
            "function" == typeof a && (b = a, a = void 0);
            var a = d.extend({width: 0, height: 0}, a), c = this, e = this.$("container"),
                f = "aspect" == this._options.responsive && (!a.width || !a.height), i;
            d.each(a, function (b, d) {
                d || (e[b]("auto"), a[b] = c._getWH()[b])
            });
            f && (i = Math.min(a.width /
                this._width, a.height / this._height));
            d.each(a, function (a, b) {
                e[a](i ? i * c["_" + a] : b)
            });
            return this.rescale(b)
        }, rescale: function (a, b, c) {
            var d = this;
            "function" === typeof a && (c = a, a = void 0);
            var g = function () {
                d._stageWidth = a || d.$("stage").width();
                d._stageHeight = b || d.$("stage").height();
                d._scaleImage();
                d._options.carousel && d.updateCarousel();
                d.trigger(Galleria.RESCALE);
                "function" === typeof c && c.call(d)
            };
            Galleria.WEBKIT && !Galleria.TOUCH && !a && !b ? f.addTimer(!1, g, 10) : g.call(d);
            return this
        }, refreshImage: function () {
            this._scaleImage();
            this._options.imagePan && this.addPan();
            return this
        }, show: function (a, b, c) {
            if (!(!1 === a || !this._options.queue && this._queue.stalled)) if (a = Math.max(0, Math.min(parseInt(a, 10), this.getDataLength() - 1)), b = "undefined" !== typeof b ? !!b : a < this.getIndex(), !c && Galleria.History) Galleria.History.set(a.toString()); else return this._active = a, C.push.call(this._queue, {
                index: a,
                rewind: b
            }), this._queue.stalled || this._show(), this
        }, _show: function () {
            var a = this, b = this._queue[0], c = this.getData(b.index);
            if (c) {
                d("article.browsers .info h2").text(c.title);
                d("article.browsers .info p").text(c.description);
                d("article.browsers ul.dots-list li a").each(function (a, b) {
                    d(b).removeClass("selected")
                });
                d('article.browsers ul.dots-list li a[href="#version' + c.version + '"]').addClass("selected");
                var e = c.iframe || (this.isFullscreen() && "big" in c ? c.big : c.image),
                    g = this._controls.getActive(), i = this._controls.getNext(), j = i.isCached(e),
                    h = this._thumbnails[b.index], l = function () {
                        d(i.image).trigger("mouseup")
                    }, m = function (b, c, e, g, h) {
                        return function () {
                            a._queue.stalled = !1;
                            f.toggleQuality(c.image,
                                a._options.imageQuality);
                            a._layers[a._controls.active].innerHTML = "";
                            d(e.container).css({zIndex: 0, opacity: 0}).show();
                            e.isIframe && d(e.container).find("iframe").remove();
                            a.$("container").toggleClass("iframe", !!b.iframe);
                            d(c.container).css({zIndex: 1, left: 0, top: 0}).show();
                            a._controls.swap();
                            a._options.imagePan && a.addPan(c.image);
                            (b.link || a._options.lightbox || a._options.clicknext) && d(c.image).css({cursor: "pointer"}).bind("mouseup", function () {
                                a._options.clicknext && !Galleria.TOUCH ? (a._options.pauseOnInteraction &&
                                a.pause(), a.next()) : b.link ? a._options.popupLinks ? k.open(b.link, "_blank") : k.location.href = b.link : a._options.lightbox && a.openLightbox()
                            });
                            C.shift.call(a._queue);
                            a._queue.length && a._show();
                            a._playCheck();
                            a.trigger({
                                type: Galleria.IMAGE,
                                index: g.index,
                                imageTarget: c.image,
                                thumbTarget: h.image,
                                galleriaData: b
                            })
                        }
                    }(c, i, g, b, h);
                this._options.carousel && this._options.carouselFollow && this._carousel.follow(b.index);
                if (this._options.preload) {
                    var n, w, o = this.getNext(), q;
                    try {
                        for (w = this._options.preload; 0 < w; w--) n = new Galleria.Picture,
                            q = a.getData(o), n.preload(this.isFullscreen() && "big" in q ? q.big : q.image), o = a.getNext(o)
                    } catch (p) {
                    }
                }
                f.show(i.container);
                i.isIframe = !!c.iframe;
                d(a._thumbnails[b.index].container).addClass("active").siblings(".active").removeClass("active");
                a.trigger({
                    type: Galleria.LOADSTART,
                    cached: j,
                    index: b.index,
                    rewind: b.rewind,
                    imageTarget: i.image,
                    thumbTarget: h.image,
                    galleriaData: c
                });
                i.load(e, function (e) {
                    var h = d(a._layers[1 - a._controls.active]).html(c.layer || "").hide();
                    a._scaleImage(e, {
                        complete: function (e) {
                            "image" in
                            g && f.toggleQuality(g.image, !1);
                            f.toggleQuality(e.image, !1);
                            a._queue.stalled = !0;
                            a.removePan();
                            a.setInfo(b.index);
                            a.setCounter(b.index);
                            c.layer && (h.show(), (c.link || a._options.lightbox || a._options.clicknext) && h.css("cursor", "pointer").unbind("mouseup").mouseup(l));
                            a.trigger({
                                type: Galleria.LOADFINISH,
                                cached: j,
                                index: b.index,
                                rewind: b.rewind,
                                imageTarget: e.image,
                                thumbTarget: a._thumbnails[b.index].image,
                                galleriaData: a.getData(b.index)
                            });
                            var i = a._options.transition;
                            d.each({
                                initial: null === g.image, touch: Galleria.TOUCH,
                                fullscreen: a.isFullscreen()
                            }, function (b, c) {
                                if (c && void 0 !== a._options[b + "Transition"]) return i = a._options[b + "Transition"], !1
                            });
                            !1 === i in I ? m() : I[i].call(a, {
                                prev: g.container,
                                next: e.container,
                                rewind: b.rewind,
                                speed: a._options.transitionSpeed || 400
                            }, m)
                        }
                    })
                })
            }
        }, getNext: function (a) {
            a = "number" === typeof a ? a : this.getIndex();
            return a === this.getDataLength() - 1 ? 0 : a + 1
        }, getPrev: function (a) {
            a = "number" === typeof a ? a : this.getIndex();
            return 0 === a ? this.getDataLength() - 1 : a - 1
        }, next: function () {
            1 < this.getDataLength() && this.show(this.getNext(),
                !1);
            return this
        }, prev: function () {
            1 < this.getDataLength() && this.show(this.getPrev(), !0);
            return this
        }, get: function (a) {
            return a in this._dom ? this._dom[a] : null
        }, getData: function (a) {
            return a in this._data ? this._data[a] : this._data[this._active]
        }, getDataLength: function () {
            return this._data.length
        }, getIndex: function () {
            return "number" === typeof this._active ? this._active : !1
        }, getStageHeight: function () {
            return this._stageHeight
        }, getStageWidth: function () {
            return this._stageWidth
        }, getOptions: function (a) {
            return "undefined" ===
            typeof a ? this._options : this._options[a]
        }, setOptions: function (a, b) {
            "object" === typeof a ? d.extend(this._options, a) : this._options[a] = b;
            return this
        }, play: function (a) {
            this._playing = !0;
            this._playtime = a || this._playtime;
            this._playCheck();
            this.trigger(Galleria.PLAY);
            return this
        }, pause: function () {
            this._playing = !1;
            this.trigger(Galleria.PAUSE);
            return this
        }, playToggle: function (a) {
            return this._playing ? this.pause() : this.play(a)
        }, isPlaying: function () {
            return this._playing
        }, isFullscreen: function () {
            return this._fullscreen.active
        },
        _playCheck: function () {
            var a = this, b = 0, c = f.timestamp(), d = "play" + this._id;
            if (this._playing) {
                f.clearTimer(d);
                var g = function () {
                    b = f.timestamp() - c;
                    b >= a._playtime && a._playing ? (f.clearTimer(d), a.next()) : a._playing && (a.trigger({
                        type: Galleria.PROGRESS,
                        percent: Math.ceil(100 * (b / a._playtime)),
                        seconds: Math.floor(b / 1E3),
                        milliseconds: b
                    }), f.addTimer(d, g, 20))
                };
                f.addTimer(d, g, 20)
            }
        }, setPlaytime: function (a) {
            this._playtime = a;
            return this
        }, setIndex: function (a) {
            this._active = a;
            return this
        }, setCounter: function (a) {
            "number" ===
            typeof a ? a++ : "undefined" === typeof a && (a = this.getIndex() + 1);
            this.get("current").innerHTML = a;
            if (n) {
                var a = this.$("counter"), b = a.css("opacity");
                1 === parseInt(b, 10) ? f.removeAlpha(a[0]) : this.$("counter").css("opacity", b)
            }
            return this
        }, setInfo: function (a) {
            var b = this, c = this.getData(a);
            d.each(["title", "description"], function (a, d) {
                var f = b.$("info-" + d);
                c[d] ? f[c[d].length ? "show" : "hide"]().html(c[d]) : f.empty().hide()
            });
            return this
        }, hasInfo: function (a) {
            var b = "title description".split(" "), c;
            for (c = 0; b[c]; c++) if (this.getData(a)[b[c]]) return !0;
            return !1
        }, jQuery: function (a) {
            var b = this, c = [];
            d.each(a.split(","), function (a, e) {
                e = d.trim(e);
                b.get(e) && c.push(e)
            });
            var e = d(b.get(c.shift()));
            d.each(c, function (a, c) {
                e = e.add(b.get(c))
            });
            return e
        }, $: function (a) {
            return this.jQuery.apply(this, f.array(arguments))
        }
    };
    d.each(M, function (a, b) {
        var c = /_/.test(b) ? b.replace(/_/g, "") : b;
        Galleria[b.toUpperCase()] = "galleria." + c
    });
    d.extend(Galleria, {
        IE9: 9 === n,
        IE8: 8 === n,
        IE7: 7 === n,
        IE6: 6 === n,
        IE: n,
        WEBKIT: /webkit/.test(y),
        CHROME: /chrome/.test(y),
        SAFARI: /safari/.test(y) && !/chrome/.test(y),
        QUIRK: n && m.compatMode && "BackCompat" === m.compatMode,
        MAC: /mac/.test(navigator.platform.toLowerCase()),
        OPERA: !!k.opera,
        IPHONE: /iphone/.test(y),
        IPAD: /ipad/.test(y),
        ANDROID: /android/.test(y),
        TOUCH: "ontouchstart" in m
    });
    Galleria.addTheme = function (a) {
        a.name || Galleria.raise("No theme name specified");
        a.defaults = "object" !== typeof a.defaults ? {} : N(a.defaults);
        var b = !1, c;
        "string" === typeof a.css ? (d("link").each(function (d, f) {
            c = RegExp(a.css);
            if (c.test(f.href)) return b = !0, G(a), !1
        }), b || d("script").each(function (d,
                                            g) {
            c = RegExp("galleria\\." + a.name.toLowerCase() + "\\.");
            c.test(g.src) && (b = g.src.replace(/[^\/]*$/, "") + a.css, f.addTimer("css", function () {
                f.loadCSS(b, "galleria-theme", function () {
                    G(a)
                })
            }, 1))
        }), b || Galleria.raise("No theme CSS loaded")) : G(a);
        return a
    };
    Galleria.loadTheme = function (a, b) {
        var c = D.length, e = k.setTimeout(function () {
            Galleria.raise("Theme at " + a + " could not load, check theme path.", !0)
        }, 5E3);
        Galleria.theme = void 0;
        f.loadScript(a, function () {
            k.clearTimeout(e);
            if (c) {
                var a = [];
                d.each(Galleria.get(), function (c,
                                                 e) {
                    var f = d.extend(e._original.options, {data_source: e._data}, b);
                    e.$("container").remove();
                    var l = new Galleria;
                    l._id = e._id;
                    l.init(e._original.target, f);
                    a.push(l)
                });
                D = a
            }
        });
        return Galleria
    };
    Galleria.get = function (a) {
        if (B[a]) return B[a];
        if ("number" !== typeof a) return B;
        Galleria.raise("Gallery index " + a + " not found")
    };
    Galleria.configure = function (a, b) {
        var c = {};
        "string" == typeof a && b ? (c[a] = b, a = c) : d.extend(c, a);
        Galleria.configure.options = c;
        d.each(Galleria.get(), function (a, b) {
            b.setOptions(c)
        });
        return Galleria
    };
    Galleria.configure.options = {};
    Galleria.on = function (a, b) {
        if (a) return Galleria.on.binds.push({type: a, callback: b || s}), d.each(Galleria.get(), function (c, d) {
            d.bind(a, b)
        }), Galleria
    };
    Galleria.on.binds = [];
    Galleria.run = function (a, b) {
        d(a || "#galleria").galleria(b);
        return Galleria
    };
    Galleria.addTransition = function (a, b) {
        I[a] = b;
        return Galleria
    };
    Galleria.utils = f;
    Galleria.log = function () {
        return "console" in k && "log" in k.console ? k.console.log : function () {
            k.alert(f.array(arguments).join(", "))
        }
    }();
    Galleria.ready = function (a) {
        d.each(D,
            function (b, c) {
                a.call(c, c._options)
            });
        Galleria.ready.callbacks.push(a);
        return Galleria
    };
    Galleria.ready.callbacks = [];
    Galleria.raise = function (a, b) {
        var c = b ? "Fatal error" : "Error", e = {color: "#fff", position: "absolute", top: 0, left: 0, zIndex: 1E5},
            f = function (a) {
                var f = '<div style="padding:4px;margin:0 0 2px;background:#' + (b ? "811" : "222") + '";>' + (b ? "<strong>" + c + ": </strong>" : "") + a + "</div>";
                d.each(B, function () {
                    var a = this.$("errors"), b = this.$("target");
                    a.length || (b.css("position", "relative"), a = this.addElement("errors").appendChild("target",
                        "errors").$("errors").css(e));
                    a.append(f)
                });
                B.length || d("<div>").css(d.extend(e, {position: "fixed"})).append(f).appendTo(t().body)
            };
        if (K) {
            if (f(a), b) throw Error(c + ": " + a);
        } else b && !P && (P = !0, b = !1, f("Gallery could not load."))
    };
    Galleria.version = 1.27;
    Galleria.requires = function (a, b) {
        Galleria.version < a && Galleria.raise(b || "You need to upgrade Galleria to version " + a + " to use one or more components.", !0);
        return Galleria
    };
    Galleria.Picture = function (a) {
        this.id = a || null;
        this.image = null;
        this.container = f.create("galleria-image");
        d(this.container).css({overflow: "hidden", position: "relative"});
        this.original = {width: 0, height: 0};
        this.isIframe = this.ready = !1
    };
    Galleria.Picture.prototype = {
        cache: {}, show: function () {
            f.show(this.image)
        }, hide: function () {
            f.moveOut(this.image)
        }, clear: function () {
            this.image = null
        }, isCached: function (a) {
            return !!this.cache[a]
        }, preload: function (a) {
            d(new Image).load(function (a, c) {
                return function () {
                    c[a] = a
                }
            }(a, this.cache)).attr("src", a)
        }, load: function (a, b, c) {
            "function" == typeof b && (c = b, b = null);
            if (this.isIframe) {
                var e =
                    "if" + (new Date).getTime();
                this.image = d("<iframe>", {
                    src: a,
                    frameborder: 0,
                    id: e,
                    allowfullscreen: !0,
                    css: {visibility: "hidden"}
                })[0];
                d(this.container).find("iframe,img").remove();
                this.container.appendChild(this.image);
                d("#" + e).load(function (a, b) {
                    return function () {
                        k.setTimeout(function () {
                            d(a.image).css("visibility", "visible");
                            "function" == typeof b && b.call(a, a)
                        }, 10)
                    }
                }(this, c));
                return this.container
            }
            this.image = new Image;
            var g = !1, i = !1, e = d(this.container), j = d(this.image), h = function (a, c, e) {
                return function () {
                    var f =
                        function () {
                            d(this).unbind("load");
                            a.original = b || {height: this.height, width: this.width};
                            a.container.appendChild(this);
                            a.cache[e] = e;
                            "function" == typeof c && k.setTimeout(function () {
                                c.call(a, a)
                            }, 1)
                        };
                    !this.width || !this.height ? k.setTimeout(function (a) {
                        return function () {
                            a.width && a.height ? f.call(a) : i ? Galleria.raise("Could not extract width/height from image: " + a.src + ". Traced measures: width:" + a.width + "px, height: " + a.height + "px.") : (d(new Image).load(h).attr("src", a.src), i = !0)
                        }
                    }(this), 2) : f.call(this)
                }
            }(this,
                c, a);
            e.find("iframe,img").remove();
            j.css("display", "block");
            f.hide(this.image);
            d.each("minWidth minHeight maxWidth maxHeight".split(" "), function (a, b) {
                j.css(b, /min/.test(b) ? "0" : "none")
            });
            if (this.cache[a]) return j.load(h).attr("src", a), this.container;
            j.load(h).error(function () {
                g ? E ? d(this).attr("src", E) : Galleria.raise("Image not found: " + a) : (g = !0, k.setTimeout(function (a, b) {
                    return function () {
                        a.attr("src", b + "?" + f.timestamp())
                    }
                }(d(this), a), 50))
            }).attr("src", a);
            return this.container
        }, scale: function (a) {
            var b =
                this, a = d.extend({
                width: 0,
                height: 0,
                min: void 0,
                max: void 0,
                margin: 0,
                complete: s,
                position: "center",
                crop: !1,
                canvas: !1
            }, a);
            if (this.isIframe) {
                d(this.image).width(a.width).height(a.height).removeAttr("width").removeAttr("height");
                d(this.container).width(a.width).height(a.height);
                a.complete.call(b, b);
                try {
                    this.image.contentWindow && d(this.image.contentWindow).trigger("resize")
                } catch (c) {
                }
                return this.container
            }
            if (!this.image) return this.container;
            var e, g, i = d(b.container), j;
            f.wait({
                until: function () {
                    e = a.width || i.width() ||
                        f.parseValue(i.css("width"));
                    g = a.height || i.height() || f.parseValue(i.css("height"));
                    return e && g
                }, success: function () {
                    var c = (e - 2 * a.margin) / b.original.width, i = (g - 2 * a.margin) / b.original.height,
                        k = Math.min(c, i), m = Math.max(c, i), n = {
                            "true": m,
                            width: c,
                            height: i,
                            "false": k,
                            landscape: b.original.width > b.original.height ? m : k,
                            portrait: b.original.width < b.original.height ? m : k
                        }[a.crop.toString()], c = "";
                    a.max && (n = Math.min(a.max, n));
                    a.min && (n = Math.max(a.min, n));
                    d.each(["width", "height"], function (a, c) {
                        d(b.image)[c](b[c] = b.image[c] =
                            Math.round(b.original[c] * n))
                    });
                    d(b.container).width(e).height(g);
                    if (a.canvas && u) u.elem.width = b.width, u.elem.height = b.height, c = b.image.src + ":" + b.width + "x" + b.height, b.image.src = u.cache[c] || function (a) {
                        u.context.drawImage(b.image, 0, 0, b.original.width * n, b.original.height * n);
                        try {
                            return j = u.elem.toDataURL(), u.length += j.length, u.cache[a] = j
                        } catch (c) {
                            return b.image.src
                        }
                    }(c);
                    var o = {}, q = {}, c = function (a, c, e) {
                        var g = 0;
                        /\%/.test(a) ? (a = parseInt(a, 10) / 100, c = b.image[c] || d(b.image)[c](), g = Math.ceil(-1 * c * a + e * a)) : g = f.parseValue(a);
                        return g
                    }, p = {top: {top: 0}, left: {left: 0}, right: {left: "100%"}, bottom: {top: "100%"}};
                    d.each(a.position.toLowerCase().split(" "), function (a, b) {
                        "center" === b && (b = "50%");
                        o[a ? "top" : "left"] = b
                    });
                    d.each(o, function (a, b) {
                        p.hasOwnProperty(b) && d.extend(q, p[b])
                    });
                    o = o.top ? d.extend(o, q) : q;
                    o = d.extend({top: "50%", left: "50%"}, o);
                    d(b.image).css({position: "absolute", top: c(o.top, "height", g), left: c(o.left, "width", e)});
                    b.show();
                    b.ready = !0;
                    a.complete.call(b, b)
                }, error: function () {
                    Galleria.raise("Could not scale image: " + b.image.src)
                },
                timeout: 1E3
            });
            return this
        }
    };
    d.extend(d.easing, {
        galleria: function (a, b, c, d, f) {
            return 1 > (b /= f / 2) ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        }, galleriaIn: function (a, b, c, d, f) {
            return d * (b /= f) * b + c
        }, galleriaOut: function (a, b, c, d, f) {
            return -d * (b /= f) * (b - 2) + c
        }
    });
    d.fn.galleria = function (a) {
        var b = this.selector;
        return !d(this).length ? (d(function () {
            d(b).length ? d(b).galleria(a) : Galleria.utils.wait({
                until: function () {
                    return d(b).length
                }, success: function () {
                    d(b).galleria(a)
                }, error: function () {
                    Galleria.raise('Init failed: Galleria could not find the element "' +
                        b + '".')
                }, timeout: 5E3
            })
        }), this) : this.each(function () {
            d.data(this, "galleria") || d.data(this, "galleria", (new Galleria).init(this, a))
        })
    }
})(jQuery);
(function () {
    Galleria.addTheme({
        name: "classic",
        author: "Galleria",
        defaults: {transition: "slide", thumbCrop: "height"},
        init: function () {
        }
    })
})(jQuery);
//fgnass.github.com/spin.js#v1.2.5
(function (a, b, c) {
    function g(a, c) {
        var d = b.createElement(a || "div"), e;
        for (e in c) d[e] = c[e];
        return d
    }

    function h(a) {
        for (var b = 1, c = arguments.length; b < c; b++) a.appendChild(arguments[b]);
        return a
    }

    function j(a, b, c, d) {
        var g = ["opacity", b, ~~(a * 100), c, d].join("-"), h = .01 + c / d * 100,
            j = Math.max(1 - (1 - a) / b * (100 - h), a), k = f.substring(0, f.indexOf("Animation")).toLowerCase(),
            l = k && "-" + k + "-" || "";
        return e[g] || (i.insertRule("@" + l + "keyframes " + g + "{" + "0%{opacity:" + j + "}" + h + "%{opacity:" + a + "}" + (h + .01) + "%{opacity:1}" + (h + b) % 100 + "%{opacity:" + a + "}" + "100%{opacity:" + j + "}" + "}", 0), e[g] = 1), g
    }

    function k(a, b) {
        var e = a.style, f, g;
        if (e[b] !== c) return b;
        b = b.charAt(0).toUpperCase() + b.slice(1);
        for (g = 0; g < d.length; g++) {
            f = d[g] + b;
            if (e[f] !== c) return f
        }
    }

    function l(a, b) {
        for (var c in b) a.style[k(a, c) || c] = b[c];
        return a
    }

    function m(a) {
        for (var b = 1; b < arguments.length; b++) {
            var d = arguments[b];
            for (var e in d) a[e] === c && (a[e] = d[e])
        }
        return a
    }

    function n(a) {
        var b = {x: a.offsetLeft, y: a.offsetTop};
        while (a = a.offsetParent) b.x += a.offsetLeft, b.y += a.offsetTop;
        return b
    }

    var d = ["webkit", "Moz", "ms", "O"], e = {}, f, i = function () {
        var a = g("style");
        return h(b.getElementsByTagName("head")[0], a), a.sheet || a.styleSheet
    }(), o = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        color: "#000",
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "auto",
        left: "auto"
    }, p = function q(a) {
        if (!this.spin) return new q(a);
        this.opts = m(a || {}, q.defaults, o)
    };
    p.defaults = {}, m(p.prototype, {
        spin: function (a) {
            this.stop();
            var b = this, c = b.opts,
                d = b.el = l(g(0, {className: c.className}), {position: "relative", zIndex: c.zIndex}),
                e = c.radius + c.length + c.width, h, i;
            a && (a.insertBefore(d, a.firstChild || null), i = n(a), h = n(d), l(d, {
                left: (c.left == "auto" ? i.x - h.x + (a.offsetWidth >> 1) : c.left + e) + "px",
                top: (c.top == "auto" ? i.y - h.y + (a.offsetHeight >> 1) : c.top + e) + "px"
            })), d.setAttribute("aria-role", "progressbar"), b.lines(d, b.opts);
            if (!f) {
                var j = 0, k = c.fps, m = k / c.speed, o = (1 - c.opacity) / (m * c.trail / 100), p = m / c.lines;
                !function q() {
                    j++;
                    for (var a = c.lines; a; a--) {
                        var e = Math.max(1 - (j + a * p) % m * o, c.opacity);
                        b.opacity(d, c.lines - a, e, c)
                    }
                    b.timeout = b.el && setTimeout(q, ~~(1e3 / k))
                }()
            }
            return b
        }, stop: function () {
            var a = this.el;
            return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = c), this
        }, lines: function (a, b) {
            function e(a, d) {
                return l(g(), {
                    position: "absolute",
                    width: b.length + b.width + "px",
                    height: b.width + "px",
                    background: a,
                    boxShadow: d,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / b.lines * c + b.rotate) + "deg) translate(" + b.radius + "px" + ",0)",
                    borderRadius: (b.width >> 1) + "px"
                })
            }

            var c = 0, d;
            for (; c < b.lines; c++) d = l(g(), {
                position: "absolute",
                top: 1 + ~(b.width / 2) + "px",
                transform: b.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: b.opacity,
                animation: f && j(b.opacity, b.trail, c, b.lines) + " " + 1 / b.speed + "s linear infinite"
            }), b.shadow && h(d, l(e("#000", "0 0 4px #000"), {top: "2px"})), h(a, h(d, e(b.color, "0 0 1px rgba(0,0,0,.1)")));
            return a
        }, opacity: function (a, b, c) {
            b < a.childNodes.length && (a.childNodes[b].style.opacity = c)
        }
    }), !function () {
        function a(a, b) {
            return g("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', b)
        }

        var b = l(g("group"), {behavior: "url(#default#VML)"});
        !k(b, "transform") && b.adj ? (i.addRule(".spin-vml", "behavior:url(#default#VML)"), p.prototype.lines = function (b, c) {
            function f() {
                return l(a("group", {coordsize: e + " " + e, coordorigin: -d + " " + -d}), {width: e, height: e})
            }

            function k(b, e, g) {
                h(i, h(l(f(), {
                    rotation: 360 / c.lines * b + "deg",
                    left: ~~e
                }), h(l(a("roundrect", {arcsize: 1}), {
                    width: d,
                    height: c.width,
                    left: c.radius,
                    top: -c.width >> 1,
                    filter: g
                }), a("fill", {color: c.color, opacity: c.opacity}), a("stroke", {opacity: 0}))))
            }

            var d = c.length + c.width, e = 2 * d, g = -(c.width + c.length) * 2 + "px",
                i = l(f(), {position: "absolute", top: g, left: g}), j;
            if (c.shadow) for (j = 1; j <= c.lines; j++) k(j, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (j = 1; j <= c.lines; j++) k(j);
            return h(b, i)
        }, p.prototype.opacity = function (a, b, c, d) {
            var e = a.firstChild;
            d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c))
        }) : f = k(b, "animation")
    }(), a.Spinner = p
})(window, document);
/*
 GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
*/
if (typeof window.console !== "object" || typeof window.console.emulated === "undefined") {
    if (typeof window.console !== "object" || !(typeof window.console.log === "function" || typeof window.console.log === "object")) {
        window.console = {};
        window.console.log = window.console.debug = window.console.warn = window.console.trace = function () {
        };
        window.console.error = function () {
            for (var c = "An error has occured. More information will be available in the console log.", a = 0; a < arguments.length; ++a) {
                if (typeof arguments[a] !== "string") break;
                c += "\n" + arguments[a]
            }
            if (typeof Error !== "undefined") throw Error(c); else throw c;
        }
    } else {
        if (typeof window.console.debug === "undefined") window.console.debug = function () {
            for (var c = ["console.debug:"], a = 0; a < arguments.length; a++) c.push(arguments[a]);
            window.console.log.apply(window.console, c)
        };
        if (typeof window.console.warn === "undefined") window.console.warn = function () {
            for (var c = ["console.warn:"], a = 0; a < arguments.length; a++) c.push(arguments[a]);
            window.console.log.apply(window.console, c)
        };
        if (typeof window.console.error ===
            "undefined") window.console.error = function () {
            for (var c = ["console.error"], a = 0; a < arguments.length; a++) c.push(arguments[a]);
            window.console.log.apply(window.console, c)
        };
        if (typeof window.console.trace === "undefined") window.console.trace = function () {
            window.console.error.apply(window.console, ["console.trace does not exist"])
        }
    }
    window.console.emulated = true
}
(function (c) {
    if (c.History) window.console.warn("$.History has already been defined..."); else {
        c.History = {
            options: {debug: false},
            state: "",
            $window: null,
            $iframe: null,
            handlers: {generic: [], specific: {}},
            extractHash: function (a) {
                return a.replace(/^[^#]*#/, "").replace(/^#+|#+$/, "")
            },
            getState: function () {
                return c.History.state
            },
            setState: function (a) {
                var b = c.History;
                a = b.extractHash(a);
                b.state = a;
                return b.state
            },
            getHash: function () {
                return c.History.extractHash(window.location.hash || location.hash)
            },
            setHash: function (a) {
                a =
                    c.History.extractHash(a);
                if (typeof window.location.hash !== "undefined") {
                    if (window.location.hash !== a) window.location.hash = a
                } else if (location.hash !== a) location.hash = a;
                return a
            },
            go: function (a) {
                var b = c.History;
                a = b.extractHash(a);
                var d = b.getHash(), f = b.getState();
                if (a !== d) b.setHash(a); else {
                    a !== f && b.setState(a);
                    b.trigger()
                }
                return true
            },
            hashchange: function () {
                var a = c.History, b = a.getHash();
                a.go(b);
                return true
            },
            bind: function (a, b) {
                var d = c.History;
                if (b) {
                    if (typeof d.handlers.specific[a] === "undefined") d.handlers.specific[a] =
                        [];
                    d.handlers.specific[a].push(b)
                } else {
                    b = a;
                    d.handlers.generic.push(b)
                }
                return true
            },
            trigger: function (a) {
                var b = c.History;
                if (typeof a === "undefined") a = b.getState();
                var d, f, g, e;
                if (typeof b.handlers.specific[a] !== "undefined") {
                    e = b.handlers.specific[a];
                    d = 0;
                    for (f = e.length; d < f; ++d) {
                        g = e[d];
                        g(a)
                    }
                }
                e = b.handlers.generic;
                d = 0;
                for (f = e.length; d < f; ++d) {
                    g = e[d];
                    g(a)
                }
                return true
            },
            construct: function () {
                var a = c.History;
                c(document).ready(function () {
                    a.domReady()
                });
                return true
            },
            configure: function (a) {
                var b = c.History;
                b.options =
                    c.extend(b.options, a);
                return true
            },
            domReadied: false,
            domReady: function () {
                var a = c.History;
                if (!a.domRedied) {
                    a.domRedied = true;
                    a.$window = c(window);
                    a.$window.bind("hashchange", this.hashchange);
                    setTimeout(a.hashchangeLoader, 200);
                    return true
                }
            },
            nativeSupport: function (a) {
                a = a || c.browser;
                var b = a.version, d = parseInt(b, 10), f = b.split(/[^0-9]/g);
                b = parseInt(f[0], 10);
                var g = parseInt(f[1], 10);
                f = parseInt(f[2], 10);
                var e = false;
                if ((a.msie || 0) && d >= 8) e = true; else if ((a.webkit || 0) && d >= 528) e = true; else if (a.mozilla) if (b > 1) e = true;
                else {
                    if (b === 1) if (g > 9) e = true; else if (g === 9) if (f >= 2) e = true
                } else if (a.opera) if (b > 10) e = true; else if (b === 10) if (g >= 60) e = true;
                return e
            },
            hashchangeLoader: function () {
                var a = c.History;
                if (a.nativeSupport()) a.getHash() && a.$window.trigger("hashchange"); else {
                    var b;
                    if (c.browser.msie) {
                        a.$iframe = c('<iframe id="jquery-history-iframe" style="display: none;"></$iframe>').prependTo(document.body)[0];
                        a.$iframe.contentWindow.document.open();
                        a.$iframe.contentWindow.document.close();
                        var d = false;
                        b = function () {
                            var f = a.getHash(),
                                g = a.getState(), e = a.extractHash(a.$iframe.contentWindow.document.location.hash);
                            if (g !== f) {
                                if (!d) {
                                    a.$iframe.contentWindow.document.open();
                                    a.$iframe.contentWindow.document.close();
                                    a.$iframe.contentWindow.document.location.hash = f
                                }
                                d = false;
                                a.$window.trigger("hashchange")
                            } else if (g !== e) {
                                d = true;
                                a.setHash(e)
                            }
                        }
                    } else b = function () {
                        var f = a.getHash();
                        a.getState() !== f && a.$window.trigger("hashchange")
                    };
                    setInterval(b, 200)
                }
                return true
            }
        };
        c.History.construct()
    }
})(jQuery);
(function () {
    var g, i = Array.prototype.slice;
    g = function () {
        function a(c, d) {
            var b, e, f;
            this.elem = $(c);
            e = $.extend({}, a.defaults, d);
            for (b in e) f = e[b], this[b] = f;
            this.elem.data(this.dataName, this);
            this.wrapCheckboxWithDivs();
            this.attachEvents();
            this.disableTextSelection();
            this.resizeHandle && this.optionallyResize("handle");
            this.resizeContainer && this.optionallyResize("container");
            this.initialPosition()
        }

        a.prototype.isDisabled = function () {
            return this.elem.is(":disabled")
        };
        a.prototype.wrapCheckboxWithDivs = function () {
            this.elem.wrap("<div class='" +
                this.containerClass + "' />");
            this.container = this.elem.parent();
            this.offLabel = $("<label class='" + this.labelOffClass + "'>\n  <span>" + this.uncheckedLabel + "</span>\n</label>").appendTo(this.container);
            this.offSpan = this.offLabel.children("span");
            this.onLabel = $("<label class='" + this.labelOnClass + "'>\n  <span>" + this.checkedLabel + "</span>\n</label>").appendTo(this.container);
            this.onSpan = this.onLabel.children("span");
            return this.handle = $("<div class='" + this.handleClass + "'>\n  <div class='" + this.handleRightClass +
                "'>\n    <div class='" + this.handleCenterClass + "' />\n  </div>\n</div>").appendTo(this.container)
        };
        a.prototype.disableTextSelection = function () {
            if ($.browser.msie) return $([this.handle, this.offLabel, this.onLabel, this.container]).attr("unselectable", "on")
        };
        a.prototype._getDimension = function (c, a) {
            return null != $.fn.actual ? c.actual(a) : c[a]()
        };
        a.prototype.optionallyResize = function (a) {
            var d, b;
            b = this._getDimension(this.onLabel, "width");
            d = this._getDimension(this.offLabel, "width");
            return "container" === a ? (a = (b >
            d ? b : d) + (this._getDimension(this.handle, "width") + this.handleMargin), this.container.css({width: a})) : this.handle.css({width: b > d ? b : d})
        };
        a.prototype.onMouseDown = function (c) {
            c.preventDefault();
            if (!this.isDisabled()) return c = c.pageX || c.originalEvent.changedTouches[0].pageX, a.currentlyClicking = this.handle, a.dragStartPosition = c, a.handleLeftOffset = parseInt(this.handle.css("left"), 10) || 0
        };
        a.prototype.onDragMove = function (c, d) {
            var b, e;
            if (a.currentlyClicking === this.handle) return e = (d + a.handleLeftOffset - a.dragStartPosition) /
                this.rightSide, 0 > e && (e = 0), 1 < e && (e = 1), b = e * this.rightSide, this.handle.css({left: b}), this.onLabel.css({width: b + this.handleRadius}), this.offSpan.css({marginRight: -b}), this.onSpan.css({marginLeft: -(1 - e) * this.rightSide})
        };
        a.prototype.onDragEnd = function (c, d) {
            var b;
            if (!(a.currentlyClicking !== this.handle || this.isDisabled())) return a.dragging ? (b = (d - a.dragStartPosition) / this.rightSide, this.elem.prop("checked", 0.5 <= b)) : this.elem.prop("checked", !this.elem.prop("checked")), a.currentlyClicking = null, a.dragging = null,
                this.didChange()
        };
        a.prototype.refresh = function () {
            return this.didChange()
        };
        a.prototype.didChange = function () {
            var a;
            if ("function" === typeof this.onChange) this.onChange(this.elem, this.elem.prop("checked"));
            if (this.isDisabled()) return this.container.addClass(this.disabledClass), !1;
            this.container.removeClass(this.disabledClass);
            a = this.elem.prop("checked") ? this.rightSide : 0;
            this.handle.animate({left: a}, this.duration);
            this.onLabel.animate({width: a + this.handleRadius}, this.duration);
            this.offSpan.animate({marginRight: -a},
                this.duration);
            return this.onSpan.animate({marginLeft: a - this.rightSide}, this.duration)
        };
        a.prototype.attachEvents = function () {
            var a, d, b;
            b = this;
            a = function (a) {
                return b.onGlobalMove.apply(b, arguments)
            };
            d = function (e) {
                b.onGlobalUp.apply(b, arguments);
                $(document).unbind("mousemove touchmove", a);
                return $(document).unbind("mouseup touchend", d)
            };
            this.elem.change(function () {
                return b.refresh()
            });
            return this.container.bind("mousedown touchstart", function (e) {
                b.onMouseDown.apply(b, arguments);
                $(document).bind("mousemove touchmove",
                    a);
                return $(document).bind("mouseup touchend", d)
            })
        };
        a.prototype.initialPosition = function () {
            var a, d;
            a = this._getDimension(this.container, "width");
            this.offLabel.css({width: a - this.containerRadius});
            d = this.containerRadius + 1;
            $.browser.msie && 7 > $.browser.version && (d -= 3);
            this.rightSide = a - this._getDimension(this.handle, "width") - d;
            this.elem.is(":checked") ? (this.handle.css({left: this.rightSide}), this.onLabel.css({width: this.rightSide + this.handleRadius}), this.offSpan.css({marginRight: -this.rightSide})) : (this.onLabel.css({width: 0}),
                this.onSpan.css({marginLeft: -this.rightSide}));
            if (this.isDisabled()) return this.container.addClass(this.disabledClass)
        };
        a.prototype.onGlobalMove = function (c) {
            var d;
            if (!this.isDisabled() && a.currentlyClicking) {
                c.preventDefault();
                d = c.pageX || c.originalEvent.changedTouches[0].pageX;
                if (!a.dragging && Math.abs(a.dragStartPosition - d) > this.dragThreshold) a.dragging = !0;
                return this.onDragMove(c, d)
            }
        };
        a.prototype.onGlobalUp = function (c) {
            if (a.currentlyClicking) return c.preventDefault(), this.onDragEnd(c, c.pageX || c.originalEvent.changedTouches[0].pageX),
                !1
        };
        a.defaults = {
            duration: 200,
            checkedLabel: "ON",
            uncheckedLabel: "OFF",
            resizeHandle: !0,
            resizeContainer: !0,
            disabledClass: "iPhoneCheckDisabled",
            containerClass: "iPhoneCheckContainer",
            labelOnClass: "iPhoneCheckLabelOn",
            labelOffClass: "iPhoneCheckLabelOff",
            handleClass: "iPhoneCheckHandle",
            handleCenterClass: "iPhoneCheckHandleCenter",
            handleRightClass: "iPhoneCheckHandleRight",
            dragThreshold: 5,
            handleMargin: 15,
            handleRadius: 4,
            containerRadius: 5,
            dataName: "iphoneStyle",
            onChange: function () {
            }
        };
        return a
    }();
    $.iphoneStyle =
        this.iOSCheckbox = g;
    $.fn.iphoneStyle = function () {
        var a, c, d, b, e, f, j, h, k;
        a = 1 <= arguments.length ? i.call(arguments, 0) : [];
        d = null != (b = null != (f = a[0]) ? f.dataName : void 0) ? b : g.defaults.dataName;
        h = this.filter(":checkbox");
        for (f = 0, j = h.length; f < j; f++) c = h[f], b = $(c).data(d), null != b ? (c = a[0], e = 2 <= a.length ? i.call(a, 1) : [], null != (k = b[c]) && k.apply(b, e)) : new g(c, a[0]);
        return this
    };
    $.fn.iOSCheckbox = function (a) {
        null == a && (a = {});
        return this.iphoneStyle($.extend({}, a, {
            resizeHandle: !1,
            disabledClass: "iOSCheckDisabled",
            containerClass: "iOSCheckContainer",
            labelOnClass: "iOSCheckLabelOn",
            labelOffClass: "iOSCheckLabelOff",
            handleClass: "iOSCheckHandle",
            handleCenterClass: "iOSCheckHandleCenter",
            handleRightClass: "iOSCheckHandleRight",
            dataName: "iOSCheckbox"
        }))
    }
}).call(this);
var paths_data = {
    IndexedDB: "m 2456.172,953.301 c 28.4382,-60.77338 64.4248,-119.30379 113.6991,-165.44584 22.2148,-21.64275 55.176,-34.2566 67.8558,-64.38787 9.3281,-30.33394 -0.6504,-62.00603 1.0236,-92.97215 -0.014,-55.45366 16.2549,-113.87285 58.119,-152.51406 44.915,-42.46857 108.4943,-56.33755 168.45,-58.49552 4.374,3.40456 0.9367,11.67765 2.0295,17.09682 0,8.97654 0,17.95308 0,26.92962 -54.9322,-1.81525 -115.7517,6.92736 -156.5538,47.14676 -40.4657,39.8453 -50.0996,99.90351 -48.8562,154.40133 0.9721,29.80464 1.1943,63.97694 -21.9001,86.37459 -22.7997,22.8419 -53.8006,34.98513 -76.47,58.06421 -43.7544,41.20552 -78.2174,91.43463 -106.4969,144.22811 l -0.8472,-0.40099 -0.053,-0.025 0,0 z",
    "Offline Web Apps: AppCache": "m 2291.135,217.555 c 0.07,59.94111 12.2006,123.08173 49.5097,171.51564 14.1526,19.38561 34.8702,31.70889 54.5413,44.60426 26.2478,18.34393 39.1853,50.43831 39.6549,81.73659 1.367,50.67594 -4.4316,104.85241 21.1814,150.94883 11.257,19.35174 26.8127,38.05923 48.0472,46.56924 19.175,4.65867 26.4023,-19.67469 30.3027,-33.81799 13.0933,-54.72468 0.1732,-110.96641 -3.5616,-166.01906 -2.3757,-39.15135 -7.7868,-80.18624 5.747,-117.95872 7.6549,-22.30692 32.3241,-36.92783 55.4745,-30.72426 27.2797,6.48613 47.1423,27.60508 67.5607,45.20438 36.0944,24.2462 80.2649,32.14228 122.6945,37.14059 28.2464,2.85222 56.6865,3.49831 85.0557,2.7575 0,22.66667 0,45.33333 0,68 -74.0714,-2.41399 -150.6611,-11.40108 -216.8694,-47.02743 -14.5676,-6.97951 -36.6045,-26.09258 -40.2893,-31.54216 -6.5309,-9.72653 -24.9573,-19.30088 -28.2663,-24.97374 -2.8231,10.63068 -7.3767,34.01065 -6.8946,50.20542 -2.686,65.20552 10.0278,130.69744 0.2106,195.61205 -5.2435,29.56253 -14.1929,62.97762 -41.3175,79.84791 -24.291,14.72793 -53.9226,0.47993 -71.4692,-18.23586 -36.9126,-35.18053 -50.4385,-87.85628 -49.101,-137.49595 -1.292,-35.84705 9.1864,-73.38641 -4.2075,-107.98026 -9.1419,-25.12149 -34.3857,-37.15743 -53.5509,-53.32222 -45.7887,-41.49153 -62.6219,-104.94653 -65.7732,-164.70331 -0.423,-13.31385 -1.0389,-26.97232 0.5791,-40.06613 l 0.7412,-0.27532 0,0 z",
    Canvas: "m 1820.038,263.429 c 22.1465,56.1878 44.1323,112.4458 67.4069,168.17921 15.6404,36.84983 31.3049,73.80185 50.5487,108.95102 10.3355,17.78037 21.1532,35.33201 33.2254,51.99477 4.641,5.93687 9.1835,12.29185 15.563,16.487 2.413,0.2664 -4.2046,1.69637 -0.645,-0.836 5.251,-10.16175 6.9094,-21.69031 8.8621,-32.84017 7.2512,-48.16379 12.9119,-96.81022 26.758,-143.65756 6.5212,-21.02943 14.3659,-42.47017 29.1003,-59.25194 9.5323,-10.88976 23.8003,-18.28298 38.5194,-16.96786 18.3577,1.46574 33.8762,13.24861 46.4422,25.86553 16.2789,16.62239 29.194,36.09879 42.7647,54.89689 43.3937,61.60879 83.5322,125.71575 132.01,183.57657 20.6495,24.17819 42.6446,47.84326 69.3656,65.42131 14.7026,9.38661 31.8267,17.38912 49.7102,15.57987 17.3618,-1.87328 31.7134,-13.5668 42.8075,-26.29064 10.1893,-11.88884 18.4585,-25.24563 27.3971,-38.06109 39.2084,-57.9212 74.2188,-118.64972 115.5576,-175.12891 31.0199,-42.23741 66.5662,-82.37922 111.2484,-110.53968 38.4615,-24.55224 83.4226,-38.3879 128.932,-40.75096 3.4941,0.60984 10.3143,-2.06204 11.8869,0.69127 0,22.95446 0,45.90891 0,68.86337 -33.2037,-0.97307 -66.8149,5.60566 -96.4957,20.74927 -38.3406,19.28415 -69.4783,49.94689 -96.8738,82.44883 -35.929,43.0598 -66.5698,90.13468 -98.576,136.09248 -18.1152,26.02871 -36.294,52.0456 -55.7475,77.09942 -17.539,21.93227 -40.2364,41.34329 -67.831,48.77406 -23.7373,6.61758 -49.4868,2.89362 -71.555,-7.55406 -30.7967,-14.43489 -55.947,-38.25258 -78.4909,-63.25227 -36.9516,-41.6933 -67.6202,-88.40484 -97.7268,-135.13633 -25.4009,-39.43129 -49.6176,-79.66324 -76.7036,-117.98124 -9.0979,-12.06896 -18.816,-24.42302 -32.1147,-32.07916 -5.2787,-3.14086 -12.4211,-4.22836 -17.5495,-0.16687 -9.8268,7.36631 -15.2145,18.94869 -20.0543,29.89961 -11.8357,28.90056 -17.9248,59.72199 -23.5536,90.31772 -4.762,26.36177 -8.1954,52.94889 -13.133,79.27885 -2.9669,13.57488 -6.1543,27.93124 -15.1313,38.95107 -6.387,8.02592 -17.9312,11.52224 -27.5183,7.50262 -12.4184,-5.05316 -20.6073,-16.44825 -28.166,-26.98 -12.1667,-17.93853 -22.7241,-36.92172 -32.8576,-56.06355 -18.9465,-37.96977 -33.5051,-77.9288 -47.4807,-117.93679 -19.131,-55.92888 -36.2352,-112.56872 -50.8557,-169.84566 0.318,-0.1 0.636,-0.2 0.954,-0.3 z",
    HTTP: "m 2866.916,478.511 c -29.5013,0.38393 -58.4842,7.06858 -86.8436,14.69422 -58.0368,16.20655 -114.0881,38.76335 -169.0113,63.38474 -62.9618,28.55103 -124.5622,60.27947 -183.5055,96.44788 -27.3702,17.08062 -54.564,34.78191 -78.8769,56.0904 -9.0826,8.43347 -17.6678,17.49901 -27.9597,24.52229 -20.2699,14.7215 -45.4676,22.87357 -70.5874,21.27725 -31.3761,-1.75433 -60.547,-15.60013 -86.8611,-31.91047 -37.2576,-23.50528 -70.524,-52.65307 -102.96,-82.2962 -13.465,-12.33893 -26.4159,-25.38491 -41.7223,-35.50043 -26.4932,-18.13067 -58.4174,-30.21949 -90.8973,-28.14109 -24.8141,1.41036 -49.0498,12.60999 -65.5249,31.33741 -6.7521,6.90968 -10.6185,16.42509 -18.8877,21.86438 -10.6623,7.62639 -24.9416,7.16245 -36.8461,2.98204 -20.2956,-7.08269 -37.961,-19.72223 -55.7632,-31.45373 -34.8721,-23.51749 -70.1465,-47.87588 -110.5028,-61.01433 -81.1759,-25.85952 -166.0114,-38.67641 -250.8852,-43.94672 -80.038,-4.77141 -160.4835,-2.94666 -240.2189,5.4925 -32.0122,3.44396 -64.0068,7.90693 -95.1977,16.07605 -57.69834,14.47513 -112.71994,37.61106 -169.89909,53.8102 -32.89473,9.24508 -66.8409,15.55049 -101.07997,16.02561 -20.86676,-0.002 -43.02981,-2.60102 -60.49347,-14.99686 -14.8446,-10.35068 -22.94207,-27.6633 -26.41006,-44.97759 -5.76612,-28.55332 -4.62023,-58.05905 -11.10413,-86.50886 -4.87659,-23.07844 -15.35923,-45.24401 -31.90183,-62.25699 -22.68784,-24.66395 -46.29437,-48.87942 -74.10717,-67.83067 -40.11168,-27.87905 -87.14646,-44.3833 -135.00047,-52.86903 -39.62957,-7.01275 -79.98941,-9.44012 -120.19603,-8.78482 -36.60363,1.18092 -74.02427,9.53385 -104.71356,30.28839 -26.24411,17.52248 -46.01722,43.71925 -57.70419,72.87408 -9.0338,22.46742 -14.30163,46.53373 -15.02643,70.75535 -2.5723,-1.70194 -0.55201,-8.24788 -1.13784,-11.72288 1.34919,-41.50243 14.62459,-83.50161 41.69734,-115.48633 24.05247,-28.72769 58.73712,-47.08534 94.99956,-55.14037 26.93992,-6.26116 54.75912,-7.21553 82.30167,-6.31397 58.01025,1.54443 116.66787,9.97219 170.46495,32.58134 36.51252,15.19649 69.75882,37.68741 98.38318,64.89726 13.61959,12.92626 26.67096,26.45354 39.33616,40.31143 18.31692,20.94301 28.8216,47.63842 33.53561,74.82051 4.68492,24.70163 4.61741,50.03517 9.43839,74.70754 2.61827,13.06873 7.92739,26.78843 19.48445,34.45235 13.64343,9.00841 30.62166,10.34283 46.53353,10.45912 25.95142,-0.34344 51.74237,-4.53025 76.94165,-10.55729 51.045,-12.64377 99.73077,-32.9059 149.84945,-48.56767 36.5036,-11.64846 73.8845,-20.82776 111.9611,-25.46544 75.6151,-9.85435 152.0347,-13.18065 228.2417,-11.12725 90.2253,2.72638 180.6233,13.2716 267.8236,37.1737 22.9399,6.41493 45.9683,13.1082 67.3858,23.72689 35.4475,16.87369 67.1932,40.1784 100.2169,61.15626 11.1112,6.70864 22.3333,13.96508 35.1128,16.99364 4.7739,1.31336 10.6274,0.43813 13.2827,-4.20468 16.231,-25.00863 41.9053,-43.78926 70.9157,-50.94258 34.0049,-8.73325 70.4414,-2.35327 101.7088,12.70304 23.4235,11.07767 44.2186,26.99243 62.7486,44.97717 32.6533,30.3569 65.9773,60.33808 103.2152,85.03411 22.3174,14.47533 46.5391,27.57794 73.2045,31.41942 19.4362,2.91929 39.7451,-1.30813 56.4261,-11.69419 11.2552,-6.58214 20.6183,-15.73519 29.9103,-24.75172 24.9387,-22.42378 53.1389,-40.83114 81.5091,-58.56467 59.3448,-36.4654 121.4129,-68.37425 184.8164,-97.14994 55.7398,-25.02101 112.6797,-47.76047 171.509,-64.46691 31.4309,-8.6374 63.5696,-16.086 96.2999,-16.77125 3.5724,-1.26403 2.2374,2.44034 2.4891,4.53282 0.028,5.84851 0.055,11.69703 0.083,17.54554 z",
    "DOM Mutation Observers": "m 2716.291,901.761 c -4.0143,-63.39601 -0.063,-129.39728 25.6414,-188.29017 17.4781,-40.98362 53.4888,-75.21327 98.0697,-83.71618 9.469,-0.16199 31.1993,-10.67002 26.9509,6.02715 0,9.5424 0,19.0848 0,28.6272 -33.9554,-3.14749 -66.4837,15.31505 -86.6181,41.85243 -35.6575,46.39467 -50.5113,104.82045 -59.2042,161.70975 -2.3844,10.75014 -1.4672,25.01735 -4.8397,33.78982 z",
    Flash: "m 855.38,215.042 c -10.63395,22.78673 -19.42909,47.07854 -20.28871,72.46233 -1.40756,31.13762 9.11971,62.05574 27.04638,87.31771 22.23612,31.63741 53.39742,55.71509 86.25849,75.47915 22.91104,13.44558 46.64497,25.50369 70.93894,36.24624 37.1709,16.35207 77.1959,26.96737 117.9396,27.84644 52.2368,1.3298 103.7431,-10.64918 153.139,-26.66561 32.3534,-10.48909 63.9567,-23.12414 95.2511,-36.40398 33.359,-13.18635 70.3651,-13.63651 105.3617,-7.83741 47.4402,8.02288 92.5037,26.28454 135.2108,47.99429 49.2146,25.33364 95.8132,55.65448 139.5184,89.58877 12.6772,9.87101 25.017,20.20007 36.4519,31.4984 26.8973,24.33589 56.8364,45.71239 89.867,60.90966 23.0284,10.27526 48.608,17.9289 74.0212,13.95244 16.3758,-2.45308 31.2846,-11.27646 42.4492,-23.34283 26.0173,-25.76862 59.1843,-44.71192 95.2614,-51.80769 42.5187,-8.64777 87.1429,-1.3283 126.5912,15.93009 29.1679,12.75413 56.1014,30.73866 78.7004,53.19 12.3801,10.46729 28.1389,15.73264 43.4188,20.38371 37.7844,10.57427 77.1133,14.30426 116.2191,15.51619 53.6142,1.32564 107.5262,-2.77044 159.9633,-14.2793 33.9085,-7.75326 67.8187,-18.33784 97.3449,-37.17354 10.1229,-6.33279 18.9927,-14.38102 27.1173,-23.07842 22.0684,-22.14491 44.827,-43.81866 70.1844,-62.20061 12.3277,-8.5397 25.5459,-17.25284 40.806,-18.95325 3.5087,-1.34419 3.4369,1.21645 3.1982,3.82842 0,12.00727 0,24.01453 0,36.0218 -3.6648,0.91962 -9.2921,3.87578 -13.2362,6.37653 -21.9268,14.06832 -41.1841,31.80229 -60.077,49.62991 -9.3305,8.60806 -17.7567,18.15648 -27.3251,26.50455 -26.3393,22.3029 -58.6714,36.10453 -91.3654,46.2183 -48.6143,14.68956 -99.3349,21.38607 -149.9673,23.66272 -50.1003,1.98824 -100.5832,-0.2661 -149.9007,-9.70729 -25.896,-5.24136 -51.9586,-12.14442 -74.967,-25.51691 -7.9756,-4.54347 -14.948,-10.56291 -21.3358,-17.1038 -30.0399,-28.24308 -67.9984,-48.40054 -108.584,-56.14065 -32.9277,-6.29804 -68.0734,-2.64671 -98.1156,12.64272 -17.4809,8.59797 -32.8262,20.9239 -46.5271,34.6617 -17.9184,16.73546 -41.8613,26.67421 -66.3449,27.70976 -31.1095,1.51413 -61.5113,-8.66708 -88.9903,-22.46728 -32.5378,-16.61183 -62.282,-38.42391 -89.05,-63.21288 -9.9669,-9.98452 -20.5804,-19.29476 -31.6102,-28.08871 -41.1796,-32.91428 -85.1752,-62.38746 -131.618,-87.35853 -40.8578,-21.67999 -83.9537,-40.22231 -129.6091,-48.84639 -32.7072,-6.01897 -67.7651,-6.28939 -98.7587,7.16134 -53.5757,22.09644 -108.4965,41.85033 -165.5468,52.79288 -44.2456,8.51149 -90.1718,10.6235 -134.5492,1.81939 -47.0418,-9.13476 -90.74131,-30.10235 -132.07963,-53.71965 -37.28847,-21.27304 -72.91204,-47.10408 -99.37253,-81.31897 -19.6336,-25.34259 -33.11202,-56.16267 -34.63052,-88.44291 -1.17965,-25.04458 4.10032,-50.48313 15.52902,-72.82288 4.14383,-7.74916 9.02535,-15.21407 15.25806,-21.45295 0.268,0.199 0.536,0.398 0.804,0.597 z",
    "Full Screen API": "m 2780.375,303.287 c -39.3781,66.27574 -70.0146,138.69344 -83.6286,214.83079 -10.3652,59.8521 -7.4781,126.00446 27.117,178.04042 2.8165,3.92248 11.9775,13.75238 7.5159,7.94187 3.3832,-24.95027 -1.9318,-50.20857 0.033,-75.30241 0.9121,-43.59161 14.314,-91.06946 51.2964,-117.69764 24.3343,-17.8309 54.9063,-24.79818 84.6426,-25.58503 0,16.66667 0,33.33333 0,50 -29.1447,-1.72662 -62.4016,6.05238 -79.0032,32.25226 -23.9004,37.36543 -20.1828,83.73929 -22.4478,126.12833 -0.7867,17.3602 -8.0903,40.06894 -28.1504,42.40901 -21.3916,1.91858 -36.4529,-17.63557 -44.1353,-35.25301 -30.7874,-61.51497 -27.3504,-134.11004 -9.663,-198.90313 19.7214,-71.20489 53.477,-138.13212 95.203,-198.88309 l 0.608,-0.24795 0.6127,0.26958 0,0 z",
    "File System API": "m 2584.525,827.604 c 47.0311,-89.54657 129.7386,-163.2228 229.0751,-187.93499 17.63,-4.42674 35.6311,-7.36375 53.7489,-8.82101 0,18.18833 0,36.37667 0,54.565 -73.4816,-7.3002 -148.5911,16.14751 -206.3634,61.78806 -29.2818,22.84863 -55.3787,50.11598 -75.6706,81.28494 l -0.79,-0.882 z",
    Java: "m 758.16,169.475 c 2.48854,49.35391 7.25373,98.65518 15.7207,147.36013 5.38563,29.58078 11.90872,59.20212 23.37411,87.09469 6.18543,14.25841 13.78923,27.88267 21.95791,41.09162 11.05252,17.48466 25.29579,34.11597 44.68591,42.47989 16.78401,7.2906 35.6964,8.51597 53.68053,6.1773 23.46569,-3.82786 44.40949,-16.02592 64.35884,-28.33163 34.3829,-21.83328 67.5649,-45.82953 104.2545,-63.77948 37.1928,-18.60016 77.7002,-30.91831 119.2176,-34.36509 23.3006,-1.91484 46.7269,-1.3374 70.0572,-0.32549 75.3311,3.78102 149.8426,20.12411 220.5199,46.268 52.0241,19.41593 102.3375,45.46935 144.1268,82.45577 22.2283,19.73713 41.681,43.03592 54.5757,69.96538 9.9512,19.78573 16.4434,41.03596 25.3595,61.26398 3.7528,7.62405 7.6381,16.38226 15.6836,20.29458 8.5748,3.18919 17.7652,-0.63576 25.7116,-3.92335 15.2797,-6.76961 28.4656,-17.2988 43.4328,-24.66836 43.5297,-22.52092 91.5727,-35.05207 139.8918,-42.00868 66.2848,-9.22983 134.018,-7.81251 199.9282,3.6989 59.785,10.65998 118.6705,29.95531 170.5514,61.97273 13.6887,8.3539 26.5595,17.94857 39.0512,27.9789 20.5262,14.82046 46.95,18.457 71.6694,16.66536 38.0598,-2.98635 74.217,-18.16228 106.2164,-38.41947 26.1529,-16.56995 49.6331,-37.02497 71.0917,-59.26949 36.7217,-36.7044 81.5865,-65.43966 130.8539,-82.0609 42.5374,-14.6348 87.6266,-20.30852 132.4468,-21.24929 0.1913,15.99767 0.3827,31.99533 0.574,47.993 -43.2513,-0.24243 -87.0512,4.16243 -128.0311,18.66665 -41.624,14.40161 -79.4391,38.87803 -110.7624,69.72738 -38.756,37.69157 -84.2976,69.49498 -135.6558,87.29262 -35.4045,12.12601 -74.1286,17.48315 -111.009,9.20884 -19.9277,-4.45584 -38.9678,-13.47419 -54.2727,-27.09849 -40.776,-33.46557 -89.7653,-55.57052 -140.1712,-70.14842 -63.9706,-18.2396 -131.0634,-24.97809 -197.431,-21.38608 -50.0475,2.88269 -100.174,11.48378 -147.0493,29.66389 -17.7225,6.85398 -34.7127,15.51793 -50.7541,25.69525 -14.9256,8.59852 -31.0546,16.87877 -48.6435,17.34111 -13.4143,0.49802 -26.3702,-6.4749 -34.17,-17.24973 -10.871,-14.73059 -15.9711,-32.54541 -22.3937,-49.45491 -8.341,-23.31032 -18.4845,-46.37294 -34.0958,-65.81309 -24.7148,-31.22175 -57.1138,-55.47669 -91.3507,-75.36201 -47.4401,-27.36239 -99.5312,-46.2268 -153.0837,-57.38587 -56.4216,-11.78462 -114.1178,-16.3687 -171.6709,-17.45561 -36.4954,-1.03644 -73.1404,4.68802 -107.5681,16.84798 -40.9886,14.18351 -78.1245,37.07608 -114.6127,60.10456 -24.19748,14.89507 -48.52652,30.52211 -75.93804,38.83366 -19.99669,6.08196 -41.5868,6.13553 -61.89123,1.542 -20.54998,-4.68714 -38.95237,-16.85106 -52.27875,-33.059 -14.62849,-17.62045 -24.84664,-38.35055 -34.34199,-59.04587 -12.69254,-30.35354 -18.69335,-62.96827 -23.40031,-95.37503 -6.39685,-46.46032 -9.07067,-93.38509 -9.42707,-140.26276 0.56301,-3.10195 -1.15719,-8.48697 0.86247,-10.18384 l 0.14862,-0.002 0,0 z",
    "CSS3 Gradients": "m 2437.562,765.39 c 10.2181,-52.02081 21.9094,-105.87838 52.27,-150.30452 10.2231,-13.20688 31.834,-21.04438 44.9935,-7.575 20.8683,19.70493 24.7592,50.1134 41.8254,72.52357 8.8876,14.50312 17.9124,33.08722 36.4705,36.28509 20.2578,-23.1238 20.5464,-55.57572 28.5438,-83.81186 17.0235,-75.01282 31.1724,-151.24555 59.0467,-223.20552 6.7488,-16.50928 20.9164,-35.7665 41.1901,-32.04468 21.5714,4.40258 28.2929,28.81095 31.191,47.66605 4.5814,34.72595 40.737,54.63273 72.9497,56.71784 15.5567,-4.63495 25.9745,6.54969 21.3063,21.45064 0,10.47413 0,20.94826 0,31.42239 -47.6461,0.75352 -99.9819,-16.80451 -126.172,-59.01326 -10.8842,-16.94563 -15.8708,-37.05803 -17.1867,-56.98813 4.995,12.04721 32.9813,-5.38488 17.3446,12.63522 -28.892,68.17046 -44.6078,140.83274 -65.1247,211.72597 -8.3173,31.75369 -15.0732,65.94439 -36.2485,92.03313 -13.4411,14.66189 -38.6378,17.85639 -53.2602,3.04859 -31.0738,-25.98177 -43.9237,-66.05084 -58.8321,-102.20817 -7.0568,-21.82739 -27.1107,-9.6682 -32.6712,5.52071 -25.7337,38.00009 -40.0934,81.97034 -56.6652,124.37194 l -0.9077,-0.2337 -0.063,-0.0163 0,0 z",
    RegisterProtocalHandler: "m 2300.531,897.604 c -9.8092,-69.42178 -8.6966,-139.74343 -7.7719,-209.66381 2.5342,-43.1082 6.1783,-88.77445 29.1314,-126.52485 13.5679,-23.02293 41.4731,-36.70666 67.9412,-30.45526 35.5829,7.0533 63.3156,32.3176 93.9771,49.88441 52.9244,32.59079 105.9098,66.17361 163.8529,89.23657 12.614,3.1351 31.441,13.63325 41.556,4.8207 -0.2495,-38.33397 -4.9058,-76.66059 -4.1121,-115.0808 0.5615,-66.19328 7.4426,-135.68609 42.8945,-193.28301 26.3503,-43.92931 74.9898,-72.14874 125.8638,-75.31567 10.2708,-2.83203 16.0392,-0.29598 13.4833,10.53708 0,17.58421 0,35.16843 0,52.75264 -33.6939,-2.06515 -68.7117,11.61998 -88.6688,39.58445 -29.7604,40.54314 -38.7142,91.81717 -43.9427,140.73118 -5.0006,46.89491 -2.4583,94.1091 -3.7341,141.12245 -1.2376,21.61196 -18.8741,41.21088 -41.0821,41.68835 -33.6116,0.98177 -64.0463,-16.42902 -92.9267,-31.55197 -64.3692,-35.77932 -123.3659,-80.11398 -183.8239,-121.8925 -19.137,-12.50953 -47.5011,-21.03526 -66.4131,-3.51797 -24.2486,23.26893 -31.4366,58.0222 -37.7946,89.74182 -9.7323,54.479 -7.6849,110.05465 -9.0607,165.14437 -0.2996,27.31969 -0.075,54.65825 1.6227,81.93482 l -0.992,0.107 -2e-4,0 z",
    "Audio and Video elements": "m 2517.271,755.625 c -58.8183,-30.92777 -94.8414,-95.09242 -100.7713,-160.1341 -4.8162,-48.70507 2.7841,-98.24252 18.031,-144.50027 16.0685,-34.22992 49.8665,-62.74352 89.1248,-62.20056 46.7702,0.21515 87.1336,29.5081 120.5558,59.45426 23.122,22.12728 45.2507,45.64661 72.5226,62.86883 44.1543,29.62244 97.09,47.62053 150.6171,45.40184 0,20 0,40 0,60 -92.6533,-2.0353 -179.2499,-52.05113 -237.995,-121.96508 -26.3677,-29.36713 -56.2088,-59.75009 -95.6291,-69.91681 -27.9284,-7.53766 -55.5108,9.71848 -70.0307,32.76147 -10.1313,16.06472 -14.0341,35.25427 -19.6688,53.22695 -16.9325,61.593 -16.2762,131.4357 18.3515,187.05619 14.1228,22.59662 32.6065,42.92577 55.3541,57.05928 l -0.4326,0.83148 -0.029,0.0565 0,0 z",
    "Web Audio API": "m 2738.03,868.574 c -48.1053,-39.19672 -91.8529,-88.3312 -110.4736,-148.63629 -14.787,-46.86309 -4.0111,-101.42808 30.4758,-137.059 53.2648,-58.01064 131.3762,-89.61199 209.3198,-93.36471 0,20.66667 0,41.33333 0,62 -69.942,-4.57823 -143.8133,17.72098 -193.576,68.41145 -29.0326,31.43476 -32.2989,78.99708 -19.0042,118.13099 16.2388,49.53835 47.6978,92.83615 83.9132,129.75856 l -0.655,0.759 0,0 z",
    Javascript: "m 710.776,210.749 c 27.34575,24.95538 50.53803,54.56599 67.87953,87.28638 13.77621,25.81092 21.47369,54.21014 28.22856,82.50983 5.59513,21.73554 10.40447,44.13554 21.21631,64.01446 6.90596,12.78207 18.53374,23.70458 33.18102,26.48235 12.05971,2.32726 24.77169,2.15389 36.68081,-0.94712 19.70857,-5.56718 34.60615,-20.60392 48.22723,-35.08315 21.27868,-23.05266 41.66676,-47.12149 65.84674,-67.26785 16.7931,-14.27547 35.1468,-26.54721 53.3015,-38.99344 22.8099,-15.33561 47.8129,-28.24285 75.0393,-33.3646 35.5183,-6.89319 72.1382,-3.38995 107.3999,3.33701 33.7182,6.89952 66.8161,16.54197 99.6031,26.93746 63.299,20.43674 125.3367,45.08654 184.6396,75.2778 39.6868,20.55884 78.5548,43.71668 111.8542,73.77879 19.2943,17.67764 36.6636,38.5307 45.5807,63.4556 6.1885,16.06427 11.9178,32.38181 19.7589,47.73367 3.6282,6.84003 8.2047,14.14566 16.1181,16.42424 11.5121,3.62951 23.7971,2.93898 35.7147,3.53277 40.3811,0.37483 80.9449,0.38618 120.97,6.46463 68.5212,9.63745 135.6872,26.65117 203.5607,39.79382 85.7852,16.91159 173.3531,29.10432 260.9714,23.92936 36.6208,-2.28689 73.1475,-6.06882 109.5264,-10.82303 39.3453,-5.59797 78.8571,-12.37733 116.3854,-25.82395 24.8183,-8.88474 48.2995,-21.95971 67.7523,-39.87403 23.362,-21.04906 43.3928,-46.05634 70.0803,-63.20632 28.3688,-18.59863 61.7879,-27.48255 95.0249,-32.3497 20.0175,-3.00557 40.2101,-4.66275 60.4094,-5.83698 0.757,15.31433 1.514,30.62867 2.271,45.943 -35.8391,1.77061 -72.2349,4.30692 -106.4523,15.91388 -19.9789,6.99377 -37.9259,18.92933 -53.1066,33.58221 -20.6781,19.36004 -40.0306,40.50256 -63.8917,56.09665 -34.2938,22.93636 -74.4486,35.01858 -114.5324,43.12931 -52.4467,10.47412 -105.8465,15.04372 -159.142,18.62746 -39.5555,2.72384 -79.2943,2.72945 -118.8316,-0.32415 -85.2937,-6.19478 -169.0232,-24.58072 -252.2295,-43.4962 -47.2454,-10.43491 -94.5096,-21.39158 -142.6085,-27.15304 -39.0621,-4.88385 -78.5197,-3.61791 -117.7373,-6.11485 -15.8448,-1.19291 -32.8385,-5.33952 -43.7347,-17.76523 -12.8747,-14.24217 -18.592,-33.028 -25.5684,-50.5078 -5.4434,-14.49145 -9.8038,-29.69199 -19.062,-42.35324 -17.3078,-24.68784 -41.4356,-43.53153 -65.9462,-60.62676 -43.5868,-29.60765 -91.1804,-52.75143 -139.4852,-73.54315 -53.3829,-22.64115 -108.2002,-41.92809 -163.984,-57.75101 -36.9379,-10.17331 -74.9504,-18.44436 -113.4613,-17.79506 -24.8716,0.53725 -49.6561,6.74643 -71.4174,18.91812 -21.1168,11.45256 -40.4532,25.84138 -59.7058,40.12192 -26.2816,20.66862 -46.39373,47.67363 -67.09406,73.6072 -15.96368,19.68715 -34.56973,39.30489 -59.3508,47.27503 -21.44669,6.99981 -45.11999,4.06348 -65.59367,-4.68728 -19.23541,-8.52853 -31.80319,-27.06636 -38.57748,-46.37752 -10.45677,-30.14759 -12.99714,-62.2145 -20.06904,-93.187 -9.84374,-46.60354 -34.50983,-88.77057 -64.67266,-125.12011 -2.92244,-4.64513 -10.08495,-9.46785 -10.96739,-13.80038 z",
    "CSS3 2D Transforms": "m 2393.801,178.914 c -26.4454,21.50508 -49.195,47.34872 -68.7068,75.23212 -33.4467,48.02581 -55.6551,104.53742 -59.7332,163.16713 -4.1763,55.4497 8.0111,111.27885 30.6282,161.80082 12.3482,27.8958 27.8144,54.32303 44.9708,79.51093 12.6397,22.56487 34.3462,38.98026 57.9221,48.86012 19.8779,8.06648 42.7528,11.95938 63.5028,4.85088 15.3447,-5.10305 27.2689,-17.80434 33.1948,-32.64191 8.7363,-20.91649 8.4682,-44.06281 7.4756,-66.30218 -1.7718,-50.40719 -6.9435,-100.83036 -4.0625,-151.29561 1.7278,-24.19362 4.9231,-49.20015 16.973,-70.68396 8.5262,-15.26019 23.1492,-27.91513 40.7832,-30.72634 18.3714,-3.23028 37.0266,4.39607 50.7963,16.31986 12.4509,10.38977 21.3184,24.13522 29.1505,38.15376 11.2233,18.96066 22.3253,38.29037 37.2231,54.66582 7.9501,8.80374 18.3644,15.6779 30.1829,17.76437 18.483,3.40999 37.3956,1.7332 56.0357,0.90267 35.7099,-2.18082 71.4313,-4.42455 107.2125,-4.97748 0,16.66667 0,33.33333 0,50 -39.0876,-0.90834 -78.1682,0.53205 -117.2458,1.18973 -24.9579,0.10063 -51.0582,-0.067 -74.1157,-10.86557 -21.7756,-10.03373 -37.5931,-29.18397 -50.2907,-48.95752 -11.1224,-17.05004 -20.3604,-35.20607 -30.1182,-53.0419 -6.2926,-10.35956 -14.5027,-20.85631 -26.4306,-24.80874 -7.5526,-2.6352 -15.5239,1.51404 -20.1394,7.49875 -9.8821,12.335 -13.1741,28.35613 -15.8746,43.55125 -5.3794,35.08515 -4.6338,70.71726 -4.2627,106.10056 0.3265,28.42222 1.4244,56.86946 0.2262,85.28258 -1.5975,25.76274 -8.3431,52.58549 -25.979,72.22121 -14.8457,16.87341 -37.4,25.64972 -59.6474,25.60656 -31.4374,0.0611 -61.9366,-13.03518 -86.0643,-32.71264 C 2344.647,694.03 2333.5175,681.24554 2326.04,666.402 c 1.1177,1.90729 -2.5028,-3.89269 -3.0007,-4.66115 -33.6876,-53.50454 -59.0642,-113.3875 -66.3017,-176.58926 -6.3769,-53.62785 1.4717,-108.80311 22.457,-158.55869 22.38,-53.29811 58.0024,-100.72052 101.5962,-138.52975 4.1343,-2.63516 8.9647,-9.19203 13.0102,-9.14915 l 0,0 z",
    HTML: "m 2867.35,568.754 c -31.6281,1.70371 -63.2897,3.36401 -94.7342,7.31946 -78.1849,9.23684 -155.8322,22.8987 -232.6251,40.21425 -50.7333,11.69341 -101.2597,24.83037 -150.2303,42.63783 -17.0744,6.14859 -33.6983,13.45435 -50.0117,21.38722 -20.5308,9.18006 -41.7239,17.89954 -64.1902,20.76848 -9.1292,1.32488 -18.3647,-0.17494 -26.9984,-3.23097 -27.4851,-9.38202 -53.6353,-22.19412 -79.8009,-34.68966 -38.4218,-18.66035 -76.2269,-38.55488 -113.9219,-58.62992 -15.4923,-7.76398 -31.7077,-14.50678 -48.9185,-17.24825 -34.7239,-5.94772 -70.0975,-2.9885 -105.0325,-0.95142 -19.798,1.33745 -39.6288,2.21286 -59.4741,2.19397 -27.5952,0.86302 -56.4115,-1.55979 -81.0449,-15.07694 -4.2383,-2.07934 -8.0162,-4.87978 -11.1469,-8.4025 -24.4696,-25.12866 -47.6414,-51.4844 -72.0166,-76.70531 -46.314,-48.2587 -95.2781,-94.66171 -151.1951,-131.7264 -16.4031,-10.68843 -33.243,-20.85155 -51.0355,-29.06494 -25.6789,-10.61473 -52.5611,-18.62108 -80.0816,-22.67203 -14.6114,-2.13136 -29.5241,-2.45938 -44.1221,-0.0252 -17.2113,2.41806 -34.6248,4.10604 -51.3676,8.99313 -25.428,6.83995 -50.9114,13.55821 -76.0002,21.57104 -95.6492,35.3562 -188.9713,76.90479 -285.75414,109.20693 -42.71877,14.10371 -86.1777,26.77857 -130.84314,32.90785 -27.28558,3.47689 -55.53106,4.8637 -82.35734,-2.33197 -13.4489,-3.57618 -26.08897,-10.16337 -36.46496,-19.46516 C 668.04,439.1593 651.611,418.24344 641.19137,394.43746 627.60851,364.16038 621.91754,330.58298 604.41835,302.03231 599.46393,293.83103 593.77034,286.04803 587.158,279.101 c -6.59383,-16.43302 -15.10898,-32.24767 -18.73792,-49.72486 -5.55677,-21.48677 -9.23562,-43.63581 -8.51408,-65.89014 -2.98939,3.17477 -1.54273,11.55221 -2.43336,16.62545 -1.00432,18.11779 1.06574,36.18808 3.87893,54.05442 0.98156,10.23443 6.05835,19.39893 8.36143,29.30813 -31.19794,-23.64199 -69.66624,-35.69491 -108.08391,-40.85874 -18.66739,-2.37656 -37.54713,-3.54676 -56.36117,-2.79499 -41.83334,2.23604 -84.10158,12.80188 -119.36741,36.07055 -20.33627,13.60204 -38.66926,31.14382 -50.259,52.90001 -1.93652,5.75083 3.55538,-2.88823 4.91962,-4.30853 23.55015,-28.04477 57.25945,-46.21114 92.4808,-55.00044 25.79929,-6.62193 52.62556,-8.11397 79.15217,-6.96569 39.30183,0.80533 79.32624,7.17212 114.74384,24.9598 21.57458,10.91146 41.50702,26.6875 53.32445,48.14426 14.64354,25.76813 19.41442,55.47819 30.21048,82.8113 10.07667,26.82847 25.97775,51.432 46.5206,71.43513 12.09118,11.88207 25.2772,23.08353 40.91585,30.01136 2.76641,1.00318 5.03463,1.9053 1.2315,3.41429 -19.74627,13.38863 -34.50476,34.00274 -41.10201,56.89976 -1.35443,2.08955 0.26006,5.1521 1.0263,1.3877 8.32203,-18.08406 22.45041,-33.50712 39.61517,-43.57209 7.62825,-4.40213 15.97186,-7.56148 24.60672,-9.29868 35.72261,8.66408 73.01109,6.30829 109.04743,0.98156 35.63763,-5.41775 70.63366,-14.37513 105.16857,-24.59056 -4.83697,4.41972 -7.01884,10.78285 -10.41856,16.23728 -7.37363,13.52421 -15.12122,26.84035 -22.96797,40.09022 -4.45784,9.03332 -7.15167,18.84622 -12.16707,27.62809 -3.54728,7.15843 -6.89489,14.42096 -9.8474,21.84641 3.36871,-1.26387 4.78373,-8.35074 7.64321,-11.59668 10.37796,-17.61968 22.67863,-33.97957 35.14191,-50.15319 8.765,-12.13375 16.62338,-25.00545 27.08606,-35.81425 6.25657,-6.72567 12.69936,-13.34777 19.96582,-18.99588 48.3312,-15.78037 95.906,-33.76004 143.324,-52.072 -15.666,14.18931 -30.4218,29.4494 -43.0609,46.4271 -11.0794,14.73665 -21.5711,29.90756 -32.2514,44.93106 -9.5254,14.78127 -16.515,31.00802 -25.8109,45.92949 -7.0429,12.27917 -13.7281,24.79803 -19.2708,37.83435 3.15351,-0.27498 4.21363,-6.94018 6.7393,-9.52518 11.3664,-18.85188 24.7996,-36.32558 37.5925,-54.20664 9.5476,-12.92274 20.7321,-24.50715 30.7709,-37.03702 14.9094,-18.13589 30.624,-35.85188 49.3839,-50.12729 30.6394,-24.28167 63.5526,-45.78534 98.3507,-63.60769 20.5304,-7.42018 40.846,-15.4337 61.4987,-22.51151 32.1448,-10.8574 66.2307,-18.37802 100.3187,-15.10789 44.5929,3.89853 87.098,21.30118 124.6272,45.16275 54.4288,34.08584 102.6521,77.06312 148.0108,122.28245 24.5628,24.37873 47.8213,50.02464 72.1619,74.61798 7.5803,8.10952 16.9007,14.44357 27.0653,18.88005 25.2518,11.05162 53.1187,14.87117 80.5084,15.07813 13.4796,-0.0455 26.8849,-1.80224 40.3709,-1.81217 29.5504,-0.50022 58.949,-4.31324 88.5183,-4.37591 20.7936,0.0319 42.2152,0.97917 61.748,8.78339 17.7798,10.132 35.4356,20.48757 53.2984,30.47001 41.6323,21.71736 84.0891,42.00779 127.9083,58.9448 21.022,7.75969 42.3865,15.56749 64.7758,18.14528 21.9986,1.71074 43.7398,-4.6302 63.7835,-13.17742 10.2984,-4.52966 19.4607,-11.20439 29.7143,-15.83878 33.2502,-15.92262 68.5131,-27.11339 103.8368,-37.40964 67.3895,-19.1123 136.0306,-33.58711 205.0702,-45.2911 58.4344,-9.70002 117.2238,-17.77652 176.3723,-21.46486 6.6812,-0.36006 13.367,-0.62966 20.0519,-0.91074 0,-9.53167 -0.01,-19.074 0,-28.599 z",
    "Web Fonts": "m 1208.807,800.334 c 8.2397,-27.39545 22.9383,-52.53478 40.5369,-74.94867 33.8627,-42.8999 81.403,-74.07951 133.2513,-90.76332 59.1556,-19.31006 122.6821,-21.32623 184.0789,-13.93109 44.7663,5.7754 89.0648,14.70126 133.1301,24.38214 107.5166,23.89635 213.105,55.44507 319.7966,82.62007 62.6488,15.61333 125.7931,30.54679 190.2144,36.51962 36.5,3.06867 73.9567,3.59863 109.57,-6.13594 25.1803,-6.87387 49.1405,-20.7429 64.6453,-42.13508 18.5507,-25.15258 25.2411,-56.8543 26.9323,-87.51999 1.1077,-26.85934 -0.1135,-53.74767 -0.5432,-80.61095 -0.5092,-34.23575 -2.0145,-68.66703 2.1861,-102.74273 2.2678,-15.60409 5.4318,-32.05954 15.6527,-44.60752 6.753,-8.42263 17.6168,-12.97652 28.3396,-12.35492 9.1726,-0.38845 18.2426,4.36224 22.8814,12.3348 7.0713,11.87072 9.0006,25.87578 10.9892,39.32002 4.4754,35.9031 4.6168,72.13553 5.2519,108.25695 2.8198,44.87588 5.859,89.80799 12.2529,134.34116 1.6434,9.57398 2.8538,19.83779 6.4096,28.67345 4.412,6.32809 9.7301,13.07971 17.512,15.143 7.5543,1.1448 13.5793,-4.94243 18.3023,-9.97871 13.4439,-15.77696 21.5629,-35.20501 29.124,-54.28424 16.262,-43.18023 26.857,-88.23628 36.2533,-133.33141 0.6948,-3.55879 2.1791,-10.46471 2.0612,-10.28707 5.2683,-33.55492 15.4141,-66.30638 29.3185,-97.27316 19.4727,-43.26456 48.217,-83.20887 86.9236,-111.20647 35.1003,-25.70837 77.9697,-39.8018 121.2408,-42.42903 3.7586,0.32526 9.9025,-1.67866 12.2373,0.30856 0,15.49918 0,30.99835 0,46.49753 -34.4213,-1.08386 -69.4712,6.26711 -99.3874,23.67638 -33.9924,19.39622 -60.2684,50.06413 -79.3187,83.85838 -17.0509,30.41073 -29.2091,63.54718 -36.3137,97.66426 -2.8761,15.38049 -7.1094,30.49641 -10.8544,45.69811 -10.9456,41.6465 -22.989,83.26309 -40.8368,122.5512 -8.9049,18.86571 -19.0106,37.80723 -34.3808,52.25134 -10.1976,9.62714 -24.5235,16.16937 -38.7299,13.31667 -15.8363,-3.0326 -27.8603,-15.40664 -36.0283,-28.63434 -5.2184,-9.99409 -6.4914,-21.41862 -8.3357,-32.39199 -5.378,-39.10062 -7.589,-78.55113 -9.8406,-117.9301 -0.6931,-13.22649 -1.5233,-26.45482 -1.2138,-39.7044 -0.1309,-32.26194 -0.2316,-64.65201 -4.283,-96.7082 -1.4291,-8.82111 -2.5093,-18.06736 -6.9453,-25.98289 -1.6098,-2.94501 -5.3602,-1.93563 -8.1408,-1.99519 -7.86,0.89346 -11.5795,9.04609 -14.0444,15.57352 -6.3245,18.83177 -6.9424,38.94817 -7.7385,58.62284 -1.2086,46.98168 2.0322,93.95149 1.09,140.93155 -1.2368,32.76966 -7.5063,66.31589 -24.7171,94.68548 -13.8872,23.19386 -35.5638,41.25175 -60.3103,51.90551 -33.4138,14.53002 -70.4683,17.92533 -106.5386,17.48595 -56.2205,-1.06144 -111.7958,-11.12975 -166.655,-22.78329 -76.4814,-16.70531 -151.9516,-37.58863 -227.5867,-57.69636 -89.5356,-23.8434 -179.3777,-47.28885 -270.8982,-62.27978 -60.6177,-9.48057 -123.5187,-10.74743 -183.2389,4.93447 -49.1099,12.74372 -95.1973,38.0962 -130.7471,74.48745 -20.9886,21.53311 -39.0336,46.30812 -51.1656,73.9104 0.1861,1.65508 -0.771,0.79584 -1.3894,0.69603 z",
    WebRTC: "m 2675.028,846.391 c 20.9192,-60.55041 53.821,-120.03698 106.1815,-158.78101 25.0305,-18.17344 55.1549,-29.56966 86.1405,-31.09599 0,12.78433 0,25.56867 0,38.353 -48.1981,-3.77129 -91.3142,25.24834 -123.7715,58.10542 -26.9712,27.67833 -49.5709,59.56527 -67.6065,93.70758 l -0.944,-0.289 z",
    XML: "m 859.871,698.202 c 8.23579,-23.07883 20.46957,-44.54645 34.14219,-64.80539 41.66366,-61.05778 100.84495,-109.25411 167.34831,-141.02708 32.9251,-15.76787 67.6053,-27.78195 103.1164,-36.20181 30.9628,-7.92938 62.2034,-15.72868 91.487,-28.78792 11.5852,-5.47855 23.8085,-11.60825 31.1512,-22.54309 16.0211,-22.4584 30.189,-46.20564 46.8853,-68.19301 13.9648,-18.28841 29.0162,-36.50719 48.699,-48.89219 11.5969,-7.41554 25.6766,-11.15674 39.3956,-9.1515 16.6494,1.87951 31.0051,12.4233 40.9308,25.47853 14.2312,18.61077 23.6031,40.25704 34.441,60.88224 16.516,32.57674 35.8366,64.06868 60.7901,90.91857 19.7309,21.51801 42.6597,39.94493 67.322,55.50815 7.8586,5.0642 15.5957,10.35377 23.5303,15.27701 13.4383,5.83983 26.8765,11.67966 40.3148,17.51949 47.0268,11.61721 94.23,23.51099 139.1507,41.90783 19.4131,8.14852 38.729,17.60962 54.2892,32.07958 25.9761,23.55433 48.1739,50.82488 71.8003,76.64253 14.7571,15.95617 29.371,32.39555 47.0691,45.19146 9.1598,6.707 20.3037,9.55447 30.8087,13.41459 43.9458,14.93403 90.9832,22.8713 137.3489,17.0926 47.7525,-5.64211 92.7966,-25.57548 132.3112,-52.44703 47.8082,-32.50314 88.8455,-73.89954 126.1997,-117.76713 16.2255,-19.02187 31.2982,-38.99951 47.8774,-57.72565 48.2781,-55.31588 101.9995,-106.38673 162.8116,-147.77604 50.3074,-34.12737 106.0699,-61.62567 165.9535,-73.77864 19.8847,-4.02858 40.1342,-6.33148 60.4267,-6.5971 0.1757,19.98767 0.3513,39.97533 0.527,59.963 -51.3818,0.11823 -101.3881,16.40847 -146.7197,39.75302 -54.6595,28.28591 -103.5341,66.59517 -148.1685,108.71303 -31.004,29.31934 -59.778,60.9317 -86.771,93.96404 -40.7065,48.27756 -85.3553,93.79864 -136.8058,130.695 -43.8443,31.3919 -93.4548,55.99894 -146.7733,65.8697 -47.6629,9.13469 -97.184,5.84075 -143.9539,-6.53571 -21.6932,-5.75203 -43.0396,-12.95933 -63.6246,-21.90688 -20.099,-10.17164 -36.6814,-25.87908 -52.5602,-41.5789 -28.9084,-29.04509 -54.0373,-61.49094 -81.0728,-92.21572 -6.0949,-6.85384 -12.5434,-13.58922 -20.68,-18.02359 -25.4806,-15.1691 -53.9301,-24.30946 -82.067,-33.15896 -29.2003,-9.13559 -58.9604,-16.61145 -87.602,-27.44943 -13.2803,-6.11063 -26.6256,-12.10651 -39.8652,-18.28875 -14.6852,-10.29566 -29.7661,-20.03124 -44.1547,-30.74369 -35.233,-26.42151 -65.1006,-59.76896 -88.0972,-97.29254 -16.0294,-25.61902 -28.4091,-53.23624 -41.9116,-80.20689 -6.6587,-12.55514 -13.2389,-25.88264 -24.6032,-34.8731 -8.953,-6.91859 -21.9699,-7.18775 -31.542,-1.34549 -15.9095,9.08072 -28.046,23.23484 -39.506,37.24434 -18.7719,23.27749 -34.2767,48.92291 -51.9533,72.99704 -8.986,12.8505 -22.8333,21.12993 -36.8113,27.59794 -27.8068,12.59801 -57.569,20.04588 -87.1503,27.1617 -20.4447,4.77867 -41.0273,9.12546 -60.9916,15.71762 -67.6404,21.38655 -131.11288,56.987 -182.79045,105.79492 -29.19346,27.63824 -55.08338,59.07276 -74.8055,94.18188 -1.95791,2.12495 -2.52741,7.65322 -5.14685,7.74742 l 0,0 z",
    XMLHTTPRequest2: "m 2866.373,345.848 c -22.483,1.29406 -45.5282,3.41026 -66.3909,12.5092 -12.1339,5.26426 -23.6083,14.7978 -26.648,28.22149 -1.1363,3.23051 -1.1153,11.27185 -1.1817,11.7524 0.4497,4.00678 0.972,9.51083 1.3399,14.10257 1.9923,26.25376 1.8945,53.24625 -5.8005,78.65447 -4.7773,15.87149 -14.6059,30.91297 -29.6168,38.71449 -12.293,6.61924 -26.3371,8.25351 -40.0144,9.61551 -14.406,1.78752 -27.5961,10.29474 -35.4292,22.47732 -10.3183,15.68006 -14.0749,34.58255 -16.0171,52.96853 -2.2038,28.89434 -4.2524,57.88689 -9.5987,86.40386 -2.4833,11.1231 -4.9061,23.03336 -12.5495,31.90593 -6.138,7.38704 -17.9669,7.0821 -24.8526,0.94061 -9.6116,-8.4834 -13.9049,-21.10123 -17.9741,-32.87909 -5.6398,-17.87961 -9.5697,-36.26247 -12.7707,-54.72061 -3.7262,-25.30701 -7.7468,-51.21864 -19.4793,-74.25654 -8.3019,-15.23785 -20.1483,-28.26699 -32.7757,-40.03989 -31.806,-28.79782 -71.7035,-47.36567 -112.8254,-58.57332 -8.6013,-2.38635 -17.3704,-4.13506 -26.1229,-5.80349 -76.2777,-22.3148 -150.2319,-54.86874 -214.7683,-101.66653 -45.9328,-33.37054 -87.6025,-73.66696 -117.9845,-121.90221 -4.3284,-6.97115 -8.4323,-14.09984 -11.8716,-21.5567 3.1967,0.852 4.4818,7.65512 7.2453,10.51625 24.8723,38.67964 57.5184,71.85989 93.1561,100.69439 55.9909,44.95733 120.4491,78.54326 187.7507,103.09483 19.9344,7.27706 40.1601,13.75318 60.6009,19.45353 -2.2837,-0.51694 3.8429,0.60207 5.3381,0.89101 36.3314,7.36251 71.7074,20.47018 103.2759,40.02431 26.5153,16.57634 50.6005,38.0911 66.8945,65.01151 13.1134,23.34389 17.7047,50.18607 21.4706,76.36092 0.5097,3.37615 0.7865,6.60179 1.3715,9.69616 3.8571,21.07187 7.7618,42.34178 15.7015,62.32571 3.0623,6.71052 6.2302,14.53588 13.3055,17.86976 5.0862,2.31083 9.5725,-2.05132 11.6123,-6.32794 6.3127,-12.49223 8.3093,-26.58308 10.616,-40.23747 3.6082,-23.67212 5.3847,-47.56719 7.5484,-71.39659 2.8318,-21.12792 8.1381,-43.16179 22.5243,-59.59612 10.1003,-11.7897 25.2512,-18.48672 40.6328,-19.31881 15.1618,-1.25761 31.3106,-4.57097 42.5927,-15.56364 13.0211,-12.56845 17.7566,-30.99582 19.9859,-48.38431 2.8226,-22.81185 1.3341,-45.89719 -1.325,-68.6475 -0.8235,-13.38438 3.8112,-27.16197 13.6217,-36.49711 14.4201,-13.85967 34.4985,-19.40758 53.6943,-22.79902 11.7916,-2.08813 23.7443,-3.03508 35.689,-3.70287 0.01,3.22034 0.027,6.45132 0.029,9.665 z",
    Geolocation: "m 2362.855,873.505 c -0.3788,-65.94958 2.0384,-132.61632 17.0296,-197.08153 6.6564,-22.73755 13.5527,-49.92732 36.1635,-61.86925 18.388,-8.546 36.3499,5.42618 49.6442,16.85421 22.8195,17.74066 42.9419,38.89431 66.7092,55.36857 11.433,1.99371 7.0543,-22.77411 8.935,-32.70921 0.9571,-71.34567 -10.3197,-142.56087 -4.8427,-213.86462 2.0045,-18.98083 7.6735,-44.68787 29.6324,-49.26014 24.3491,-3.1453 41.2571,18.57109 57.1345,33.46554 29.0967,27.13599 56.4612,60.90519 97.1847,69.97664 36.7928,7.31941 74.4767,3.1833 111.7198,3.43933 11.6803,-0.17251 23.3605,-0.34503 35.0408,-0.51754 -3.5355,12.20312 9.2031,40.62366 -9.5041,37.70625 -43.0817,-1.071 -86.4789,1.79086 -129.3089,-3.89745 -36.6058,-4.47639 -68.6981,-25.28191 -94.019,-51.19013 -19.431,-18.29751 -36.5073,-39.07378 -56.7478,-56.46908 -13.6223,-10.26862 -11.5886,22.53195 -14.195,31.27502 -5.225,74.2548 5.1063,148.85478 -2.3013,223.00345 -0.4065,16.42478 -13.1211,38.64277 -32.2576,29.54464 -21.5162,-10.84733 -36.9268,-30.40779 -55.0926,-45.77769 -13.3021,-11.25326 -25.3413,-24.83238 -40.947,-32.83626 -15.6363,-4.84504 -25.181,12.7163 -30.8082,24.40108 -19.756,45.38947 -25.4141,95.25563 -31.6474,143.9316 -2.8731,25.44145 -4.9509,50.96795 -6.5171,76.52157 l -0.9372,-0.014 -0.068,-0.001 0,0 z",
    "CSS3 Animation": "m 2394.443,352.812 c -1.3239,137.19685 48.642,275.4671 141.2419,377.18757 18.7085,16.11005 44.5107,33.1249 70.0313,23.1663 25.9784,-14.09689 36.0308,-44.92762 42.4079,-72.00323 7.558,-27.80248 8.4604,-56.65199 12.9046,-84.95697 3.5903,-20.32397 14.0845,-40.11924 30.4586,-52.78968 15.8062,-9.92024 37.2608,-6.69509 51.3691,-19.79334 15.2712,-50.54774 -8.2597,-103.87507 6.8282,-154.37392 8.2677,-32.21713 36.792,-54.953 68.0418,-63.11268 15.0423,-2.85439 38.9886,-10.66935 49.4857,-2.94639 -1.2921,15.2366 3.3406,37.31017 -2.3805,48.26928 -24.5147,-0.33908 -55.2778,2.27292 -68.5656,26.21709 -13.5582,34.05651 -3.0578,71.42351 -6.9713,106.88707 -0.9961,28.484 -5.2873,63.13121 -32.5706,78.78817 -17.9163,8.29794 -43.2579,2.47869 -55.795,20.99028 -13.9235,30.35407 -11.2453,65.24597 -21.9617,96.66817 -9.8248,34.67333 -23.3563,73.30019 -56.7224,91.91096 -29.4639,16.37768 -65.9454,2.68582 -89.6396,-17.92177 -28.4738,-25.35781 -48.0769,-58.87595 -67.2829,-91.39542 -51.9783,-93.41926 -77.9479,-201.67067 -71.9603,-308.50558 -0.01,-1.02702 0.1599,-1.72214 1.0808,-2.28591 z",
    SVG: "m 1465.455,187.134 c 1.6802,0.68461 0.4477,3.17746 0.8383,4.74457 0.6468,38.12219 6.5409,76.20999 17.7567,112.66193 13.6183,44.22091 36.6228,86.54809 71.3173,117.74511 30.7435,27.92545 70.1843,45.21044 110.9558,52.00463 47.5209,8.01779 96.2768,3.95824 143.2958,-5.36802 58.0209,-11.76777 114.138,-31.52339 168.5139,-54.69697 16.8746,-7.06262 33.3493,-15.02199 50.0575,-22.45539 27.9562,-11.99474 59.219,-19.23491 89.5538,-13.2839 26.6546,4.98091 50.1638,20.75487 68.1545,40.61807 24.8249,27.33068 41.792,60.48661 58.8081,92.94644 15.7287,29.8623 30.5019,60.67676 51.9692,86.97428 13.3684,16.25787 30.7188,30.65709 51.7951,35.03825 6.5381,1.41346 13.2596,1.91449 19.939,1.654 2.9558,-1.69017 6.1855,-5.77237 8.328,-9.165 10.4148,-16.88296 16.5788,-35.9005 23.5843,-54.34249 6.4493,-16.84859 12.0744,-34.34641 22.3207,-49.37164 5.8529,-8.60534 15.6918,-15.67468 26.5309,-14.44374 12.1115,1.1561 20.751,11.29311 26.2499,21.28907 10.636,19.67724 16.6706,41.39305 22.7223,62.80762 15.3116,57.356 26.3094,115.74198 37.1939,174.06518 -0.6997,-2.56217 -0.8571,-3.11941 0.415,-0.148 0.6412,2.36696 5.0452,5.46553 0.4328,3.58939 -5.3164,1.22325 2.8137,-3.70016 3.1434,-6.21837 10.1584,-16.12137 16.1753,-34.38952 21.9885,-52.42245 13.7027,-44.74072 23.2046,-90.63468 31.8793,-136.5743 3.1604,-16.23038 5.5883,-32.60024 8.9703,-48.78537 7.433,-33.38875 25.4305,-64.13396 50.3637,-87.47898 30.6185,-28.98034 69.8529,-47.10613 110.0105,-58.64456 33.7033,-9.62194 68.544,-14.73281 103.4425,-17.41936 0.909,14.63867 1.818,29.27733 2.727,43.916 -44.3957,2.20495 -89.1275,8.67946 -130.6529,25.12995 -32.532,13.02117 -63.3349,33.57384 -82.4287,63.5548 -10.369,15.88277 -16.531,34.12997 -19.6363,52.75795 -9.9433,51.61189 -20.6534,103.15538 -35.2307,153.68568 -7.4413,24.79085 -15.2913,49.72278 -27.6992,72.5515 -6.6892,11.79614 -15.3455,24.138 -28.8246,28.52998 -11.0108,3.73986 -23.4907,-0.71196 -30.8626,-9.39886 -5.0382,-5.82267 -9.0037,-12.76457 -11.0765,-20.19196 -9.3363,-53.25972 -19.1758,-106.48454 -32.1248,-159.00224 -5.6012,-21.56705 -11.1727,-43.32668 -20.3894,-63.6888 -1.8927,-3.79523 -3.7536,-7.74362 -6.7316,-10.82463 2.1586,2.90384 10.2323,-1.99881 5.6407,2.15738 -7.6346,11.64826 -11.9547,25.05347 -17.0176,37.93048 -8.4845,22.17219 -15.9369,45.0853 -28.9267,65.14661 -7.247,11.12961 -18.2357,21.59012 -32.1636,22.52895 -25.3772,1.41673 -51.0069,-6.69165 -71.117,-22.19898 -25.6428,-19.53721 -43.258,-47.28474 -58.7414,-75.07954 -21.1547,-37.99115 -37.7602,-78.6221 -62.7809,-114.38056 -13.7822,-19.43259 -31.0416,-37.87211 -53.8165,-46.43874 -22.0552,-8.48046 -46.6409,-5.98678 -68.7915,0.77225 -18.9391,5.64423 -36.4916,14.89414 -54.8176,22.14066 -68.3825,28.27718 -139.4624,51.68063 -213.1068,61.09927 -50.9708,6.41201 -103.8063,5.57307 -153.0736,-10.25457 -38.0566,-12.04496 -72.972,-34.20809 -99.2961,-64.30205 -32.361,-36.57877 -51.7393,-83.0023 -61.6959,-130.42089 -6.8114,-32.91232 -9.7479,-66.69033 -8.0882,-100.27564 0.05,-0.60666 1.3545,0.37302 0.192,-0.764 z",
    WebGL: "m 2631.021,898.993 c -21.5472,-70.2601 -31.7788,-145.78713 -18.6246,-218.67944 5.5266,-33.9563 20.826,-64.97222 36.1183,-95.40284 33.6897,-74.64476 76.618,-144.57555 119.9698,-213.87045 22.3399,-28.83031 49.2142,-58.10607 85.6568,-67.84404 11.5491,-5.37657 15.14,0.1409 13.2097,10.50141 0,12.60512 0,25.21024 0,37.81536 -22.2247,1.93957 -39.1602,19.37844 -54.8716,33.63142 -20.7618,21.55564 -36.2763,47.4884 -54.3195,71.27368 -34.5164,47.579 -66.3723,97.04344 -94.7958,148.50774 -19.588,29.96386 -33.9203,63.40678 -40.0552,98.77148 -11.622,64.59465 -6.4305,131.43026 8.6701,195.00368 l -0.958,0.292 0,0 z",
    "Drag and Drop": "m 2256.99,265.604 c -5.6638,49.21942 -8.2096,98.92803 -5.336,148.43036 2.4492,34.93493 7.0651,70.5141 21.661,102.69744 7.1498,15.5884 17.7287,30.12418 32.5643,39.15944 22.7638,15.54978 47.5073,27.83306 72.4509,39.43658 18.7203,8.74515 36.8881,19.57829 50.903,35.0021 20.2301,21.94235 33.6628,49.03468 46.165,75.84722 3.7012,7.87557 7.0897,15.89531 10.3898,23.93135 7.9731,15.69618 25.2883,24.00992 41.9945,26.74184 29.5276,4.74173 59.7657,-3.81227 85.527,-18.11374 39.9287,-22.39225 70.1825,-59.05292 90.9154,-99.36069 27.5608,-53.90628 39.9407,-114.30577 44.1439,-174.33964 1.5107,-21.47033 1.9043,-43.01063 1.4272,-64.52626 0.1926,2.56476 0.1077,2.47554 -0.097,0.0407 -2.2726,-28.53768 8.0875,-58.44997 29.6846,-77.68948 20.2408,-18.38143 47.6753,-26.42218 74.4358,-28.6417 4.5023,-0.3809 9.017,-0.60765 13.534,-0.71254 0,15.33333 0,30.66667 0,46 -19.5937,-0.39391 -40.5816,1.52477 -57.151,12.982 -14.6791,9.96545 -21.6658,28.56355 -21.14,45.619 0.4282,7.17825 -0.3632,14.42154 -0.4771,21.61488 -2.8443,63.93981 -12.8789,128.25695 -36.3609,188.07107 -18.3079,46.34138 -45.2346,90.16497 -82.9739,123.19618 -29.6525,25.92267 -66.3278,45.11293 -105.8041,49.61387 -25.1213,2.77929 -52.0065,-0.63722 -73.4094,-14.89042 -12.4554,-8.26409 -22.3149,-20.69922 -26.4856,-35.14458 0.8583,2.35308 -1.712,-4.15713 -2.1304,-5.05098 -11.1572,-26.29481 -23.4752,-52.64739 -41.9237,-74.7146 -11.7186,-14.17045 -27.3017,-24.5444 -43.8757,-32.21236 -22.2121,-10.35594 -44.7172,-20.33359 -65.341,-33.70103 -13.0975,-8.59436 -26.8225,-17.04073 -36.6005,-29.571 -17.4105,-21.70893 -25.8372,-49.07978 -30.4456,-76.14167 -7.3391,-44.4278 -5.5375,-89.81836 -0.6972,-134.41119 3.1105,-26.65654 7.3632,-53.20707 13.4771,-79.34817 0.3253,0.062 0.6507,0.124 0.976,0.186 z",
    AJAX: "m 1146.496,548.555 c -6.9488,-20.54074 -7.6724,-42.8484 -4.3646,-64.16082 5.4423,-34.53453 23.2007,-66.23302 46.9509,-91.53887 30.8118,-32.94979 70.2512,-56.50233 111.2227,-74.62768 34.688,-15.16931 70.8763,-26.80618 107.6643,-35.66816 54.3835,-12.41703 110.8862,-15.50165 166.3177,-9.33504 30.347,3.6671 60.8714,9.78414 88.6431,22.97414 11.3193,5.30906 21.644,12.54177 30.6966,21.14396 24.1835,21.96341 44.0164,49.44922 53.7796,80.85729 9.3709,28.93579 9.7184,59.69428 9.1858,89.80593 -0.1739,23.83294 -1.0502,48.49205 7.7038,71.11884 6.5306,17.28478 19.5686,31.17229 34.3957,41.79458 13.8138,10.0488 28.9989,19.48695 46.2094,21.94057 10.7107,1.67848 22.0463,-2.32046 29.0414,-10.67174 11.2356,-13.08076 16.1176,-30.14359 19.6274,-46.68852 6.537,-33.28198 6.6026,-67.44878 4.9447,-101.20364 -0.6905,-15.94125 -2.5009,-31.80086 -3.7417,-47.69847 -1.0589,-19.86143 4.3892,-40.96466 18.7643,-55.32862 15.8625,-16.29712 40.5526,-21.78393 62.3733,-16.82197 24.9336,5.24462 46.1636,23.27988 57.0463,46.0981 6.5633,12.7175 8.3945,27.06548 12.9461,40.49489 17.2843,54.41421 49.9694,103.22454 91.0445,142.58675 29.3473,28.06044 62.5383,52.28827 98.8067,70.62748 15.7412,7.65054 32.1113,14.9091 49.617,17.13067 41.1957,3.36187 82.2095,-7.74857 119.2913,-25.05118 48.6597,-22.81676 91.9781,-55.52219 131.7748,-91.33275 18.5133,-16.65249 35.9719,-34.41903 53.2789,-52.30571 35.9844,-35.75139 82.2538,-59.62974 130.4611,-74.30173 46.3293,-13.96521 94.8614,-20.50041 143.2269,-19.8633 3.178,2.21261 2.581,7.5837 3.3709,11.20993 0.5146,3.49802 0.7756,7.01413 0.1312,10.51593 -0.5558,4.07669 -0.5053,8.51177 -2.5401,12.15714 -10.7856,0.7368 -21.667,1.37413 -32.424,2.76017 -49.0546,6.00275 -97.7246,18.46486 -142.1328,40.47973 -27.8577,13.87767 -53.7898,32.06755 -74.852,55.09583 -44.7999,47.14562 -94.4928,90.25211 -150.6507,123.38146 -42.2481,24.75113 -88.7889,43.81494 -137.8086,48.95134 -17.3066,1.65001 -34.8938,2.04446 -52.1217,-0.59808 -25.5692,-4.72545 -49.2994,-16.28122 -71.5412,-29.39457 -44.428,-26.79777 -83.1721,-62.58657 -115.0082,-103.45268 -31.4805,-40.60464 -56.078,-87.23198 -67.3324,-137.59454 -2.8726,-12.31001 -3.915,-25.25355 -10.013,-36.57753 -9.956,-20.71072 -32.209,-35.51437 -55.4741,-34.37042 -16.2427,0.38208 -32.0493,10.06758 -38.8157,25.00191 -6.3207,12.93689 -6.2598,27.70661 -4.6374,41.69252 3.4791,40.63989 6.0098,81.59018 2.5443,122.32143 -2.2208,22.7288 -6.1566,46.03165 -17.6555,66.10143 -8.0918,14.23851 -21.9545,25.80625 -38.454,28.328 -19.7594,3.24145 -39.4343,-4.17537 -56.3445,-13.8507 -20.2946,-12.03459 -39.6928,-27.12731 -51.8074,-47.7631 -12.8252,-21.3047 -16.283,-46.67476 -16.287,-71.14266 -0.1181,-31.81264 3.5963,-64.05172 -3.1237,-95.47593 -5.447,-27.24677 -19.4203,-52.34174 -38.3149,-72.55814 -10.3512,-10.99514 -21.3489,-21.88897 -35.1223,-28.5218 -23.9754,-11.8815 -50.5959,-17.16445 -76.9826,-20.343 -46.2232,-5.15014 -93.0645,-3.07137 -139.0129,3.67198 -36.4106,5.46766 -72.121,14.98399 -107.02,26.60957 -43.3036,14.83217 -85.7524,34.28232 -121.4798,63.32006 -27.2523,22.15014 -50.0351,50.9359 -60.9266,84.64724 -7.6058,23.70704 -9.8277,49.48782 -4.4151,73.90248 0.3372,1.10033 0.5252,1.29852 -0.6562,1.52 z",
    HTML5: "m 2248.5,816.16 c -0.2666,-26.79962 4.1203,-53.59253 12.0881,-79.15234 10.5061,-33.26182 28.7172,-64.83283 55.8082,-87.28615 25.338,-21.35677 57.741,-33.20516 90.5405,-36.21181 6.6049,-0.7962 13.2751,-0.68688 19.8904,-1.24633 8.0353,-0.79293 13.2149,-8.14763 15.3935,-15.30867 5.2801,-17.03446 3.9068,-35.2436 2.0091,-52.71498 -4.4037,-34.19168 -8.2217,-68.66305 -6.7978,-103.18872 0.9836,-16.13225 2.5831,-33.00868 10.9214,-47.23437 5.7675,-10.04967 17.3001,-16.90293 29.0257,-15.47845 14.6286,1.64194 26.0444,12.31876 35.1672,23.05574 5.5999,6.41452 9.2505,14.22361 13.5039,21.53012 21.453,40.01988 36.4832,83.86276 41.1036,129.16335 4.5915,35.94032 10.6154,71.90372 21.7042,106.47461 3.4028,9.75391 6.6931,19.80634 12.677,28.332 -1.5214,-1.65918 -8.0831,-4.25178 -12.0751,-3.2982 -5.0313,0.53578 -9.9886,3.18599 -12.7049,7.5402 2.2366,-9.33722 2.4467,-19.0188 3.6362,-28.52184 5.7993,-61.03984 13.8753,-122.55992 34.8721,-180.49137 16.5937,-45.93805 42.1337,-89.61591 79.1457,-122.06177 33.8761,-30.01862 76.8041,-48.9041 121.3181,-56.15836 17.0508,-2.87086 34.3393,-4.23123 51.6239,-4.38966 0,20 0,40 0,60 -38.9556,-0.49847 -78.9288,6.77611 -112.7811,26.81419 -31.6294,18.44518 -56.1827,47.19982 -73.4557,79.17374 -24.3652,45.03055 -36.8808,95.32543 -45.3492,145.49935 -4.6305,27.06199 -7.6097,54.36838 -11.7239,81.50581 -2.1384,12.54292 -6.8069,26.21439 -18.3785,33.03067 -10.2281,6.32657 -24.1059,4.56785 -33.0671,-3.2164 -11.6067,-9.96528 -17.2136,-24.81237 -22.2884,-38.81857 -11.1368,-33.39903 -16.8183,-68.33687 -20.928,-103.21502 -2.5164,-20.3916 -2.9063,-41.06592 -7.3329,-61.19887 -6.7868,-32.54114 -18.5742,-64.0591 -34.6991,-93.1219 -1.5888,-2.624 1.6464,2.19456 -0.9236,-1.41919 -3.7164,-4.71147 -7.5601,-9.65636 -12.8715,-12.65381 2.7753,-0.002 4.3076,-2.27349 1.8895,1.05652 -5.4259,11.74508 -6.1733,24.97389 -7.182,37.68997 -1.7865,31.91861 0.9128,63.83256 3.5683,95.62302 1.1481,20.32985 0.9359,41.44926 -6.6565,60.64833 -5.1112,13.2143 -15.996,24.83419 -30.2148,27.8593 -8.9834,2.12353 -18.261,0.44413 -27.3595,1.40486 -30.7297,1.58735 -61.3926,11.78245 -85.4094,31.3387 -29.8893,23.99488 -48.9464,58.87909 -60.6283,94.85489 -5.6121,17.5297 -9.8504,35.54081 -12.0603,53.82541 -0.333,-0.0113 -0.666,-0.0227 -0.999,-0.034 z",
    "CSS3 Transitions": "m 2393.495,812.235 c -32.0362,-36.08692 -62.1693,-73.9492 -89.0574,-114.042 -17.489,-26.58877 -34.2353,-54.1 -44.8372,-84.258 -5.4861,-16.50609 -9.5783,-34.7774 -4.1114,-51.8407 4.0649,-13.19011 15.5944,-22.97388 28.6081,-26.81026 7.0957,-2.35448 14.6998,-3.51504 22.0988,-1.9146 17.9363,3.46679 32.9029,14.9677 46.3642,26.69928 25.3787,22.92621 46.8667,49.66438 69.1309,75.51319 14.1999,16.33299 28.232,33.03576 45.0025,46.82418 7.2062,5.41116 15.1686,11.01717 24.4146,11.80488 5.7809,0.60556 8.3212,-5.66701 9.4891,-10.23875 2.8753,-11.74631 1.5385,-23.89797 1.6489,-35.85797 -0.7417,-59.78461 -2.4004,-119.55163 -4.1049,-179.31499 -0.4537,-17.96725 -1.2093,-35.93022 -1.4692,-53.90026 0.9886,-18.32896 13.3183,-34.51365 28.6654,-43.76297 14.1506,-8.73678 32.937,-10.33315 47.6765,-2.08079 16.5724,8.99291 26.2152,26.47502 31.9204,43.8169 5.2383,16.04887 7.4225,32.85558 11.0082,49.30522 6.8067,32.94828 13.7073,66.11201 26.0843,97.50201 4.6796,10.87505 9.5506,22.32013 18.4629,30.45381 3.7094,4.20599 9.3993,1.97346 13.1154,-0.90279 12.7654,-9.39887 21.1719,-23.21183 30.3913,-35.81861 16.3059,-23.11843 29.7961,-48.02412 42.7785,-73.11085 8.9537,-17.00261 19.2225,-34.37269 35.7529,-45.04234 18.9453,-12.45502 42.124,-15.28785 64.251,-16.57833 6.6601,-0.35666 13.3295,-0.50444 19.9982,-0.57526 0,14.33333 0,28.66667 0,43 -17.5791,0.0793 -35.5805,-0.14566 -52.57,4.98994 -9.4606,2.70142 -16.926,9.73883 -22.0954,17.89183 -10.6992,16.66644 -19.1805,34.62985 -29.4572,51.5537 -13.6835,22.97853 -28.8621,45.12325 -45.9224,65.73153 -11.6748,13.43235 -26.2526,26.20396 -44.4698,28.90417 -15.3224,2.46044 -30.7853,-4.66292 -40.9612,-15.94046 -13.994,-15.29844 -21.7822,-34.9901 -28.3234,-54.36443 -13.104,-40.42151 -19.7388,-82.50922 -27.4526,-124.18553 -2.7507,-12.21995 -6.1244,-25.23208 -15.023,-34.53475 -4.1899,-4.68541 -11.2693,-5.38094 -16.6812,-2.52249 -7.0144,3.32742 -13.4956,10.08905 -14.9118,17.48749 0.5394,62.06643 1.4378,124.13152 1.4491,186.20173 -0.068,22.50003 0.024,45.00383 -0.3376,67.50107 -0.621,14.98425 -3.6612,31.28625 -14.9313,42.10106 -9.4603,9.2952 -24.1478,10.92957 -36.3542,6.83893 -19.8095,-6.40014 -35.111,-21.41772 -48.9394,-36.33894 -29.7261,-32.36091 -54.7741,-68.74602 -85.4222,-100.28743 -11.3235,-11.12661 -23.2988,-22.66566 -38.5184,-28.1376 -2.2841,-1.06161 -8.0068,-1.53288 -8.5551,-1.54095 -4.2117,0.50801 -11.4648,2.02302 -15.9867,5.14122 -9.2927,5.69037 -11.3142,17.62822 -10.6203,27.67484 1.2868,19.05957 8.2056,37.18223 15.6271,54.59707 16.5557,37.51143 38.3683,72.41109 61.0489,106.46791 15.0123,22.18496 30.5283,44.0417 46.8911,65.25409 -0.255,0.21533 -0.51,0.43067 -0.765,0.646 z",
    "CSS3 3D Transforms": "m 2394.805,249.91 c -39.9507,37.70115 -53.362,98.20102 -37.8457,150.27123 19.0355,66.57363 65.1288,121.22341 115.4447,167.06267 46.1632,41.27227 95.2862,81.26122 152.8966,105.2901 21.1665,7.95749 49.5686,16.47789 68.1479,-1.3565 36.6445,-38.36023 58.3999,-90.26044 59.0218,-143.39284 2.2713,-49.33616 -8.6038,-100.71215 8.9033,-148.3154 12.1926,-35.36488 45.6924,-60.90895 82.5873,-65.22994 9.1966,-0.11721 27.5987,-7.55799 23.3937,7.65048 0,10.87573 0,21.75147 0,32.6272 -25.6827,-1.05375 -54.4598,9.25496 -65.2895,34.388 -15.3624,34.36927 -9.5011,72.97678 -10.2629,109.45914 1.5566,54.75654 -9.5429,111.21852 -40.9909,156.9545 -15.1074,20.37761 -29.9644,43.64399 -53.9311,54.33941 -35.5197,13.82033 -73.7486,-1.30951 -105.4869,-17.93886 -63.7634,-35.13209 -118.1973,-84.94057 -167.5701,-137.90747 -41.9918,-47.03954 -77.6128,-103.8516 -85.3587,-167.58861 -6.3129,-51.09939 13.7222,-106.15552 55.7341,-137.10311 l 0.606,0.79 4e-4,0 z",
    CSS2: "m 2868.351,773.327 c -16.6843,-0.68603 -33.263,-3.03823 -49.5139,-6.87571 -25.2046,-5.21943 -51.0736,-6.55022 -76.7601,-6.29449 -56.5074,0.78789 -112.0121,12.86055 -166.6706,26.24735 -36.4232,8.61514 -72.8753,18.41684 -110.4034,20.53185 -27.2122,1.54217 -55.7182,-2.71517 -78.9262,-17.81546 -8.3973,-5.53785 -16.5599,-11.78731 -22.5681,-19.95463 -44.1131,-52.99858 -94.282,-101.90563 -153.236,-138.21138 -48.3285,-29.86002 -103.2419,-50.17082 -160.1515,-54.27934 -54.0296,-4.26886 -108.4548,6.16505 -158.7732,25.66714 -48.526,18.51904 -93.3908,45.10246 -137.2189,72.67592 -13.0891,7.81319 -27.9937,15.29598 -43.6899,13.45312 -12.4802,-1.38263 -22.5984,-10.73159 -28.0139,-21.62819 -9.0502,-17.90354 -12.0538,-38.00297 -15.932,-57.47649 -3.8876,-21.66549 -8.1754,-43.27868 -14.0347,-64.50761 -14.3422,-53.47731 -31.2024,-106.66599 -56.334,-156.16242 -14.4572,-27.81118 -31.6734,-55.02115 -55.799,-75.4761 -16.6463,-14.16889 -37.8857,-23.76052 -60.0152,-23.5287 -26.7624,0.0557 -51.8437,12.00948 -73.6729,26.5965 -35.6884,24.22508 -65.3444,55.99542 -93.8628,88.05475 -12.1976,13.57802 -23.8419,27.67118 -36.5475,40.78356 -16.4311,16.02516 -39.4641,22.4576 -61.6405,25.40697 -19.6287,2.95779 -39.7503,2.59738 -59.0707,7.48936 -33.1105,10.41957 -64.7784,28.67295 -86.2689,56.43819 -14.056,18.18115 -23.9778,40.05045 -26.2481,63.04781 -2.5723,-2.34845 0.072,-9.41187 0.046,-13.40973 5.1124,-33.61564 24.7268,-63.92119 51.0206,-85.02378 17.822,-14.30676 38.3099,-25.25604 59.9129,-32.64461 23.7699,-6.64545 48.8313,-6.42071 72.701,-12.65319 15.7159,-3.87617 31.3855,-10.9754 41.7906,-23.79802 23.13,-26.61728 45.0152,-54.35845 69.7164,-79.57743 26.6302,-27.17391 55.8916,-52.9694 90.9016,-68.72871 24.5979,-11.12204 53.0042,-15.6749 79.3178,-8.18657 29.164,7.97983 53.1091,28.44939 71.6849,51.63881 25.3463,31.98234 43.1128,69.19025 57.9849,106.98018 16.4354,42.45057 29.276,86.23203 39.7969,130.4991 6.0493,26.07557 9.0466,52.79048 15.9197,78.67928 2.8007,9.03032 5.5522,19.05581 13.1251,25.32967 7.0903,5.00313 16.2183,1.94479 23.4995,-0.9566 12.9033,-5.61025 24.3222,-13.98186 36.489,-20.9477 51.8199,-31.35799 106.4663,-59.41751 165.4467,-74.46266 53.718,-14.02268 110.7093,-16.43225 165.0932,-4.69104 60.8879,12.77565 117.2807,42.04175 166.8343,79.13117 44.7518,33.4759 84.6203,73.10079 120.8953,115.51283 -2.2886,-2.37025 3.3852,2.97782 4.4359,3.56016 16.5272,13.34164 38.0832,18.9072 59.0556,18.69234 31.1005,-0.2179 61.3324,-8.73415 91.053,-17.06876 50.0517,-14.68858 99.707,-31.14736 151.0443,-40.89377 47.567,-9.35248 96.3508,-13.0247 144.7332,-9.31664 10.3019,0.64077 20.6414,-0.0238 30.849,-1.47433 0.6683,19.876 1.3367,39.752 2.005,59.628 z",
    Cookies: "m 595.655,146.598 c -5.96591,36.83976 -8.31393,74.34088 -6.19884,111.61928 2.04142,31.00963 7.10765,62.56047 21.20858,90.57477 9.71933,19.38792 25.36212,36.53161 45.79758,44.68288 11.8922,5.07768 25.01857,5.77512 37.17797,10.00976 18.4115,5.71477 36.79873,15.71475 46.83593,32.824 9.95573,16.61244 10.06801,36.79149 8.10831,55.47635 -0.97812,12.24226 -3.66435,24.56485 -1.99463,36.85896 0.57872,5.82994 4.62337,10.972 10.2916,12.61873 12.36593,4.06688 25.68194,2.9964 38.43536,1.84039 26.04325,-3.32704 51.25788,-11.04269 76.34148,-18.53173 78.80457,-24.468 155.90486,-54.27195 235.41056,-76.50411 29.7678,-8.01191 60.1313,-15.58836 91.1552,-15.55325 38.1385,-0.61562 76.5389,6.83821 111.1245,23.10616 33.942,15.53135 63.3789,38.7964 93.4313,60.55028 24.4851,17.68673 50.9144,34.15842 80.8225,40.57229 15.9671,3.49724 32.5166,4.53057 48.7839,2.90351 17.0286,-2.78223 32.0547,-11.9124 47.0983,-19.82426 22.9876,-12.55717 47.2225,-25.11557 73.8926,-26.57612 23.8049,-1.58715 47.3263,7.27103 66.1142,21.54725 9.949,7.53064 19.2969,15.96673 27.0405,25.78412 24.2487,28.56503 51.5965,54.78049 83.0009,75.39211 16.5262,10.85021 35.0656,18.09549 53.4355,25.16522 50.5546,18.66131 103.0873,31.74573 156.2353,40.46569 57.3524,9.19461 115.9545,13.00231 173.8147,6.50769 42.9356,-4.99262 85.9691,-15.99157 123.3224,-38.34666 16.3932,-9.71881 31.1702,-21.97154 44.2519,-35.80168 56.9677,-57.69892 119.8303,-110.4537 190.982,-149.85225 55.0174,-30.70484 114.466,-53.0768 175.5821,-68.156 38.3585,-9.49997 77.3406,-16.37273 116.5373,-21.32138 1.7707,15.87433 3.5413,31.74867 5.312,47.623 -76.8406,7.33594 -153.4686,22.8134 -224.9757,52.47149 -66.3652,27.17636 -127.1395,66.76483 -181.6005,113.19402 -22.6342,19.11095 -44.1623,39.47888 -65.3015,60.21705 -33.8147,31.93481 -77.2186,52.14508 -122.0552,63.20096 -55.5722,13.67323 -113.4718,14.9952 -170.2857,10.34104 -65.9595,-5.60921 -131.1846,-19.14172 -194.2424,-39.20161 -28.7226,-9.38443 -57.3152,-19.7235 -84.0114,-34.01059 -15.7355,-8.85727 -30.1773,-19.83104 -44.2376,-31.1105 -23.5607,-19.21737 -44.781,-41.12354 -64.742,-64.00986 1.9522,2.09215 -3.2696,-3.13538 -4.1901,-3.81188 -14.0043,-12.57438 -31.3434,-23.26684 -50.6838,-23.73764 -20.112,-0.49868 -38.6266,8.9421 -55.8324,18.29675 -21.3821,11.65153 -42.3916,25.29462 -66.7333,29.7076 -13.6496,2.20786 -27.6101,1.67744 -41.3353,0.52305 -31.8586,-2.92173 -62.2419,-15.26097 -88.9044,-32.62137 -37.8035,-24.26707 -70.2799,-56.44609 -110.5683,-76.90072 -29.7451,-15.52069 -63.2164,-23.34387 -96.7026,-23.81424 -17.9815,-0.62364 -35.9311,1.50841 -53.5187,5.15093 -42.3099,8.71664 -83.4615,22.11069 -124.5099,35.39058 -56.72093,18.43957 -112.95468,38.58202 -170.6635,53.80544 -28.61874,7.16702 -58.16869,14.03843 -87.8507,10.6305 -13.77206,-1.53804 -28.56947,-7.14869 -35.55361,-19.94038 -7.29599,-13.29737 -4.96359,-29.04606 -2.74187,-43.35288 2.60874,-16.77229 6.68101,-34.24818 1.96253,-51.02995 -3.90779,-14.21159 -15.75369,-24.59195 -28.56438,-30.92468 -11.70198,-6.07249 -24.55868,-9.21052 -37.22584,-12.53853 -21.89036,-6.3685 -40.75762,-21.3987 -52.80772,-40.64017 -16.48403,-26.0168 -22.91674,-56.94921 -25.61529,-87.24533 -3.31776,-41.01928 0.0199,-82.3615 7.01786,-122.83636 1.26905,-3.19902 0.42834,-9.659 3.12232,-10.85772 l 0,0 z",
    "Content Security Policy": "m 2726.486,199.75 c -23.1727,48.79848 -42.853,99.24913 -59.2958,150.70037 -16.8579,53.7408 -30.3544,108.96527 -34.156,165.3134 -2.1793,36.2709 -0.4636,73.67219 12.5473,107.97415 7.9368,20.96267 21.0504,40.16987 38.8375,53.97508 9.5891,8.32614 19.7126,16.96822 32.1039,20.65788 5.305,2.40261 10.093,-1.70594 11.058,-6.86361 4.3268,-14.61626 2.4045,-30.07653 1.9163,-45.061 -2.3699,-43.75135 -5.3707,-88.31554 4.5428,-131.41144 6.4511,-28.26525 19.9761,-55.8577 42.6588,-74.56995 23.4798,-19.77612 54.4591,-28.16596 84.6591,-29.41752 3.5551,-0.49271 7.1894,-0.9513 5.9931,3.49768 0,11.65732 0,23.31464 0,34.97196 -23.6365,-0.5746 -48.6838,3.33025 -68.0294,17.85827 -18.9435,14.06417 -29.5046,36.44318 -35.218,58.78666 -9.8155,39.0038 -8.4277,79.5772 -8.0234,119.46115 -0.01,19.1383 1.1195,39.20122 -6.6904,57.15523 -4.3571,10.26812 -13.9316,18.75919 -25.3866,19.46564 -14.4956,1.02815 -27.6688,-7.05005 -38.7759,-15.47268 -5.3683,-4.13744 -10.4103,-8.68152 -15.2633,-13.40827 -0.6009,-0.5076 -4.0619,-3.55427 -5.403,-4.906 -23.9058,-22.66738 -37.798,-54.10017 -43.514,-86.17899 -7.6928,-42.9669 -3.7005,-87.09027 4.1837,-129.72416 12.2398,-63.98496 33.7956,-125.82097 59.0665,-185.73444 12.6587,-29.67783 26.2323,-58.98667 41.2988,-87.52441 0.2967,0.15167 0.5933,0.30333 0.89,0.455 z",
    "CSS3 Filters": "m 2735.699,821.42 c 6.0049,-51.60071 23.4559,-105.81404 64.0854,-140.60843 18.9071,-15.94258 42.9671,-25.35744 67.5656,-27.29857 0,14.66667 0,29.33333 0,44 -34.3873,-5.27224 -66.9843,15.0742 -87.4711,41.30304 -19.6189,24.41919 -33.7337,53.00905 -43.1949,82.78296 l -0.985,-0.179 z",
    requestAnimationFrame: "m 2671.024,952.668 c -29.0158,-78.40896 -48.4712,-161.10996 -51.0257,-244.89387 -1.7675,-69.96391 11.5065,-144.47631 57.3987,-199.6848 42.1528,-51.67639 108.1256,-77.01859 173.0258,-83.17908 8.682,-0.87792 20.564,-4.68491 16.9272,7.97455 0,11.40406 0,22.80813 0,34.2122 -58.6347,-0.40488 -120.9092,14.48184 -163.3388,57.40736 -46.4291,46.20944 -62.8542,113.31535 -66.3289,176.79846 -4.0763,84.86085 10.3425,169.84406 34.2927,251.04618 l -0.8886,0.29808 -0.062,0.0209 0,0 z",
    "Touch Events": "m 2663.997,279.571 c -4.8191,86.85911 -0.3196,175.00593 20.8807,259.62434 15.5408,58.04535 40.2745,118.61346 91.1814,154.27245 26.5566,18.18419 59.3591,25.81224 91.2909,24.04621 0,15.33333 0,30.66667 0,46 -55.4377,-0.90912 -110.3669,-26.54308 -144.0617,-71.06462 -44.3705,-57.35002 -59.9872,-130.71852 -66.7541,-201.42825 -6.0957,-70.45254 -3.2777,-141.57293 6.4698,-211.56513 l 0.993,0.115 0,0 z",
    SSL: "m 640.686,169.466 c 2.76121,30.21425 2.30275,60.66582 6.31278,90.77764 4.20021,35.52864 8.57047,71.11248 16.02757,106.13107 6.26843,28.23491 16.01652,56.46536 33.85802,79.59476 12.27645,15.95097 29.94402,28.78282 50.36855,31.13536 15.54649,2.27976 30.91032,-2.45267 45.40943,-7.56979 32.73313,-11.9338 64.02648,-27.37398 95.52788,-42.16339 46.83571,-22.11213 93.54549,-44.87701 142.55647,-61.86087 24.2723,-8.26408 49.3847,-15.08321 75.1569,-15.85059 32.4986,-1.72792 65.096,2.71695 96.4147,11.32621 38.2009,10.45483 75.2849,24.50051 113.1272,36.1247 27.1867,8.64673 54.7737,15.92994 82.36,23.16838 74.766,20.09234 147.9719,45.38574 221.4694,69.5847 28.0244,9.22384 56.2117,17.95832 84.6127,25.94895 26.5302,8.20552 48.2526,26.76903 66.6815,46.92897 27.5125,29.99433 50.6862,64.41119 83.1877,89.49956 21.0646,16.51741 46.3671,27.6839 72.9339,31.325 19.4739,2.87607 39.2214,1.65344 58.8033,0.98874 34.1129,-1.62026 68.4642,-5.94309 100.743,-17.57802 19.2827,-6.88774 38.5852,-14.37988 59.0326,-16.97788 33.4689,-4.74061 67.6481,-0.77452 100.0762,8.20897 44.8661,12.11072 86.7246,32.70965 130.2486,48.61135 21.12,7.499 43.2069,14.15868 65.8704,13.03192 46.4405,-1.10683 91.7086,-14.23818 134.3558,-31.95169 63.4089,-26.1019 122.5083,-61.97667 187.4158,-84.5435 33.4438,-11.62908 68.5799,-19.30239 104.1086,-19.34455 0,14.99933 0,29.99867 0,44.998 -41.4148,-0.18844 -81.7167,12.03703 -119.6869,27.65262 -59.6786,24.63735 -115.9868,56.96608 -176.8284,78.87201 -45.1816,16.45481 -93.123,27.00937 -141.4078,25.61571 -31.3702,-1.70092 -61.123,-13.00855 -89.9823,-24.59581 -41.9586,-17.05472 -83.291,-37.01889 -128.0288,-45.79802 -29.3317,-5.69045 -60.3158,-5.65364 -88.8499,3.93159 -19.2502,6.44478 -38.3371,13.60399 -58.2766,17.69673 -37.7499,8.09178 -76.5546,9.49026 -115.0445,9.06605 -34.1627,-0.68014 -68.3481,-9.87575 -97.3904,-28.08845 -31.0375,-19.03789 -55.3853,-46.70798 -78.062,-74.75211 -16.8058,-20.36295 -32.8526,-41.89967 -54.0208,-58.02899 -9.7676,-7.5457 -21.0905,-12.85327 -33.0143,-15.93831 -62.9601,-18.73707 -124.5169,-41.7765 -186.8029,-62.57332 -44.637,-15.07475 -89.6533,-29.0392 -135.1115,-41.42995 -43.8043,-12.30834 -86.6575,-27.66255 -129.4737,-42.9857 -34.0095,-12.02338 -68.9405,-23.04269 -105.2061,-24.99609 -19.495,-1.07952 -39.2526,-0.64366 -58.3383,3.85607 -33.8682,7.65896 -66.2182,20.67028 -98.13063,34.12179 -49.94653,21.20073 -98.47256,45.60231 -148.59722,66.39054 -18.81862,7.47446 -37.86949,15.17536 -58.03423,18.06209 -23.2882,2.82125 -47.45145,-4.72377 -65.19249,-20.02948 -21.91634,-18.57294 -35.23112,-45.15249 -43.7863,-72.12671 -9.66925,-30.78645 -12.77474,-63.08663 -15.73585,-95.06761 -1.6362,-20.99007 -3.28293,-42.00223 -3.7989,-63.05373 0.11339,-13.73167 1.0542,-27.45237 0.57276,-41.18848 -0.0122,-11.37496 0.52462,-22.74195 0.55606,-34.11644 0.33767,-0.0133 0.67533,-0.0267 1.013,-0.04 z",
    "Web Workers": "m 2403,311.52 c 2.1393,87.34634 7.3102,175.20092 25.4802,260.8592 7.7866,30.8073 14.9542,63.86672 36.6298,88.2468 14.4643,11.71244 29.42,27.30595 49.0615,28.26765 14.1472,-4.4205 13.9878,-23.2009 15.5115,-35.47037 4.1909,-70.88269 -5.1326,-142.11866 2.7304,-212.82944 3.1873,-22.25328 10.1847,-49.4957 33.9311,-57.73506 24.3843,-7.3593 46.2804,10.28259 67.0695,20.08747 45.6279,25.69808 94.0438,48.29172 146.3303,55.8602 29.6407,4.84233 59.7535,6.36188 89.7567,5.70855 0,14.66667 0,29.33333 0,44 -74.403,-0.79794 -149.7094,-16.48466 -214.562,-54.05889 -24.5277,-13.02191 -47.4378,-29.17773 -72.7271,-40.66956 -20.5511,-1.24672 -19.2354,30.73757 -22.8103,45.63807 -7.3738,68.17934 -1.6787,137.12989 -9.9897,205.23512 -2.5238,18.38196 -12.0266,41.58785 -33.3852,42.99045 -25.3715,0.49366 -44.8825,-19.62203 -62.3627,-35.47519 -22.9052,-26.52658 -29.6243,-62.3722 -36.6503,-95.67829 -14.8769,-86.45091 -16.4655,-174.60887 -15.0773,-262.12135 l 0.066,-2.86836 0.998,0.013 0,0 z",
    "CSS3 Flexbox": "m 2435.079,885.279 c 34.1607,-59.6115 88.3846,-105.69621 147.5268,-139.43587 86.6895,-48.66217 186.1909,-69.91643 284.7442,-75.33013 0,16 0,32 0,48 -115.4907,-6.92083 -236.5466,11.55526 -335.4908,74.61342 -37.3651,24.31997 -72.226,54.42503 -95.8962,92.62158 l -0.884,-0.469 z",
    "Date/time input types": "m 2518.271,314.66 c -4.8973,31.55768 20.3437,57.76148 46.384,71.17715 51.1662,25.93747 109.6716,30.89164 166.1037,33.37996 44.6059,1.43999 89.258,-0.33881 133.7413,-3.70411 0,20.66667 0,41.33333 0,62 -86.6487,-7.03553 -174.6407,-17.30627 -255.8964,-49.94936 -35.5543,-15.51599 -73.9259,-36.82424 -89.3897,-74.59856 -4.2245,-11.58106 -7.0982,-28.55333 -0.9429,-38.30508 z"
};
var paths = [{
    name: "HTML",
    path: "M2867.35,568.754c-28.49,1.496-55.179,3.176-68.414,4.469      c-30.4,3.044-60.625,6.955-90.738,11.46c-30.111,4.512-60.105,9.632-89.993,15.328c-29.891,5.684-59.685,11.901-89.342,18.848      c-29.659,6.946-59.183,14.599-88.51,23.357c-14.662,4.39-29.269,9.078-43.792,14.246c-14.521,5.182-28.962,10.806-43.248,17.424      c-7.143,3.321-60.566,30.697-90.9,27.364c-35.798-3.934-198.586-91.982-200.579-93.069c-9.11-4.969-19.371-9.616-27.48-12.913      c-8.12-3.309-16.396-5.607-24.593-7.258c-8.206-1.648-16.354-2.67-24.403-3.305c-16.106-1.25-31.836-1.043-47.29-0.441      c-15.452,0.62-30.646,1.688-45.635,2.586c-14.982,0.895-29.781,1.649-44.244,1.57c-14.434-0.09-59.688,4.094-94.453-18.988      l-0.785-0.707l-0.693-0.652l-1.84-1.814l-3.788-3.838c-2.526-2.592-5.058-5.238-7.587-7.911      c-5.057-5.349-10.125-10.782-15.186-16.261c-10.115-10.965-20.314-21.99-30.604-32.98c-20.618-21.954-41.705-43.701-63.784-64.657      c-22.104-20.926-45.11-41.179-69.679-59.933c-12.283-9.373-24.945-18.38-38.072-26.869c-13.142-8.468-26.764-16.393-40.93-23.581      c-14.159-7.2-79.287-31.714-122.353-26.356c-8.39,1.044-40.696,5.212-48.3,7.231c-0.79,0.21-1.578,0.41-2.366,0.602      c-14.041,3.422-73.638,19.721-85.628,24.16c-28.602,10.597-56.812,21.652-84.863,32.843c-28.048,11.193-55.994,22.366-83.925,33.361      c-13.971,5.483-27.95,10.887-41.955,16.164c-13.997,5.289-28.007,10.488-42.062,15.485c-14.053,5.004-28.15,9.798-42.279,14.38      c-14.129,4.58-28.307,8.9-42.538,12.84c-28.448,7.816-57.161,14.39-85.761,17.575c-14.278,1.568-28.518,2.27-42.378,1.561      c-13.839-0.724-27.323-2.905-39.514-7.274c-6.091-2.18-11.842-4.904-17.124-8.215c-1.316-0.83-2.615-1.688-3.873-2.591l-0.862-0.625      l-0.421-0.302l-0.556-0.429l-0.973-0.751l-1.025-0.821c-2.735-2.191-5.397-4.448-8.003-6.751      c-10.41-9.229-19.699-19.382-27.465-30.546c-7.803-11.152-14.021-23.314-19.183-36.356c-5.202-13.033-9.364-26.959-14.294-41.383      c-2.471-7.203-5.159-14.525-8.334-21.815c-3.168-7.284-6.836-14.532-11.133-21.492c-2.133-3.462-4.471-6.93-6.861-10.155      c-2.551-3.465-5.188-6.657-8.006-9.756c-0.524-0.578-1.06-1.145-1.595-1.712c-5.612-14.235-13.407-28.812-17.211-43.679      c-2.909-11.393-6.245-24.951-7.866-36.632c-0.81-5.841-1.438-11.711-1.841-17.603c-0.384-5.885-0.615-11.817-0.334-17.701      l-0.966-0.109c-0.902,5.927-1.284,11.882-1.512,17.854c-0.21,5.973-0.189,11.956,0.017,17.938      c0.415,11.967,2.566,25.928,4.325,37.82c1.316,8.873,5.973,17.706,7.943,26.485c-12.776-9.743-26.8-17.41-41.302-23.454      c-14.817-6.165-30.159-10.646-45.643-13.838c-15.493-3.188-31.14-5.088-46.761-5.984c-7.821-0.44-15.6-0.64-23.432-0.607      l-2.871,0.02l-2.967,0.131c-1.959,0.102-3.917,0.212-5.875,0.347c-3.914,0.265-7.824,0.601-11.727,1.009      c-15.607,1.678-31.104,4.58-46.175,8.914c-7.538,2.148-14.956,4.699-22.192,7.66c-7.242,2.941-14.309,6.275-21.145,9.987      c-13.684,7.399-26.32,16.54-37.474,27.031c-5.542,5.286-10.697,10.928-15.362,16.903c-2.335,2.987-4.513,6.086-6.555,9.256      c-2.03,3.181-3.939,6.418-5.507,9.855l0.862,0.439c4.123-6.128,9.119-11.677,14.371-16.855c5.264-5.18,10.92-9.938,16.856-14.283      c5.91-4.375,12.108-8.338,18.518-11.891c6.415-3.546,13.028-6.7,19.775-9.496c6.755-2.781,13.661-5.178,20.672-7.188      c3.503-1.012,7.036-1.922,10.585-2.747c3.543-0.849,7.107-1.604,10.689-2.271c14.324-2.69,28.894-3.972,43.471-4.199      c3.645-0.064,7.291-0.061,10.938,0.007c1.822,0.032,3.646,0.087,5.469,0.149l2.706,0.107l2.801,0.044      c7.294,0.136,14.64,0.489,21.909,1.065c14.555,1.151,28.973,3.217,43.023,6.422c14.045,3.203,27.73,7.544,40.637,13.24      c12.896,5.689,25.023,12.761,35.617,21.292c5.29,4.265,10.186,8.896,14.524,13.864c2.159,2.467,4.22,5.083,6.034,7.656      c1.983,2.808,3.744,5.564,5.449,8.474c6.795,11.556,11.648,24.434,15.987,38.174c4.35,13.726,8.333,28.321,13.818,42.978      c5.429,14.65,12.466,29.295,21.479,42.755c8.966,13.497,19.749,25.751,31.521,36.624c2.946,2.717,5.945,5.367,9.007,7.928      l2.371,1.963l0.545,0.445l0.697,0.55l1.382,1.071c1.749,1.34,3.546,2.61,5.368,3.839c6.333,4.25,13.063,7.807,19.967,10.729      c-2.84,1.777-5.581,3.68-8.18,5.724c-9.262,7.252-16.927,15.993-23.024,25.456c-3.048,4.738-5.718,9.663-7.98,14.736      c-1.13,2.536-2.158,5.11-3.055,7.725c-0.876,2.623-1.709,5.256-2.102,8.031l0.953,0.193c0.807-2.522,2.047-4.949,3.315-7.316      c1.29-2.363,2.696-4.664,4.187-6.902c2.983-4.477,6.305-8.708,9.896-12.648c7.186-7.877,15.505-14.583,24.592-19.528      c7.265-3.972,15.007-6.756,22.912-8.351c10.215,2.545,20.519,4.055,30.688,4.902c16.333,1.339,32.437,0.948,48.256-0.352      c15.826-1.308,31.385-3.558,46.74-6.35c15.354-2.795,30.492-6.197,45.473-9.957c14.49-3.642,28.832-7.622,43.059-11.852      c-1.309,1.503-2.923,2.795-3.893,4.53c-14.438,25.833-17.433,31.688-27.711,48.615c-5.136,8.467-6.962,17.092-11.459,25.86      c-4.479,8.78-8.706,17.663-12.338,26.797l0.891,0.381c4.561-8.643,9.691-17.001,15.033-25.184      c5.361-8.177,11.014-16.151,16.93-23.91c11.836-15.512,6.742-8.344,23.715-32.727c7.124-10.234,23.399-27.657,33.268-35.12      c3.592-1.173,7.178-2.358,10.757-3.555c14.478-4.839,28.871-9.828,43.185-14.966c14.307-5.152,28.545-10.416,42.734-15.744      c15.615-5.844,31.15-11.812,46.648-17.807c-5.016,4.62-9.973,9.297-14.822,14.067c-23.935,23.55-37.842,45.899-57.375,72.769      c-9.762,13.436-16.933,30.253-25.399,44.441c-4.231,7.098-8.286,14.286-12.124,21.58c-3.819,7.304-7.485,14.671-10.674,22.265      l1.023,0.455c3.868-7.195,8.211-14.163,12.678-21.019c4.486-6.85,9.172-13.566,14.014-20.165      c9.688-13.194,18.004-25.915,28.823-38.169c21.648-24.503,37.324-47.137,62.594-67.693c25.272-20.557,52.156-39.021,80.271-55.2      c7.513-4.323,15.118-8.479,22.8-12.476c6.766-2.527,13.531-5.025,20.304-7.48c28.034-10.132,76.12-31.124,124.807-31.124      c68.343,0,125.033,35.574,137.354,43.077c12.337,7.484,24.407,15.551,36.23,24.047c23.645,17.008,46.356,35.64,68.247,55.312      c21.918,19.662,43.067,40.318,63.755,61.589c10.372,10.615,20.596,21.413,30.919,32.256c5.165,5.423,10.324,10.882,15.598,16.337      c2.639,2.729,5.302,5.459,8.021,8.191l4.134,4.104l2.173,2.104l1.361,1.26l1.31,1.163c28.212,23.55,83.212,29.55,116.844,26.657      c15.738-1.354,31.224-0.971,46.425-1.995c15.198-1.031,30.178-2.198,44.949-2.905c14.758-0.697,29.34-0.963,43.413,0.025      c14.037,0.99,27.63,3.291,39.372,8.001l49.542,28.434c0.884,0.76,151.914,81.034,204.737,79.586      c18.842-0.517,32.553-4.563,48.359-10.47c3.951-1.49,7.875-3.166,11.764-5.086c1.944-0.964,3.879-1.989,5.803-3.09l1.439-0.843      l1.289-0.778l2.223-1.322c5.968-3.485,12.309-6.724,18.814-9.776c13.031-6.102,26.701-11.506,40.576-16.514      c13.887-5.002,28.015-9.599,42.262-13.925c28.506-8.643,57.494-16.171,86.657-23.073c58.353-13.758,117.485-24.902,176.882-33.777      c29.701-4.416,59.482-8.244,89.279-11.202c14.896-1.481,29.797-2.71,44.67-3.603c3.538-0.212,11.101-0.554,20.762-0.952V568.754z",
    color: "#F16724",
    techs: [{
        title: gettext("HTML 1"),
        info: gettext("HyperText Markup Language\nis the predominant markup\nlanguage for web pages"),
        url: "http://en.wikipedia.org/wiki/Html",
        position: {x: 232.185, y: 323}
    }, {
        title: gettext("HTML 2"),
        info: gettext("Second version of the\nHyperText Markup Language"),
        url: "http://en.wikipedia.org/wiki/Html",
        position: {x: 560.021, y: 143}
    }, {
        title: gettext("HTML 3"),
        info: gettext("Draft of third version\nof the HyperText Markup\nLanguage."),
        url: "http://en.wikipedia.org/wiki/Html",
        position: {x: 658.659, y: 570}
    }, {
        title: gettext("HTML 3.2"),
        info: gettext("Third version of the\nHyperText Markup\nLanguage."),
        url: "http://en.wikipedia.org/wiki/Html",
        position: {x: 881.486, y: 596}
    }, {
        title: gettext("HTML 4"),
        info: gettext("Fourth version of the\nHyperText Markup\nLanguage"),
        url: "http://en.wikipedia.org/wiki/Html",
        position: {x: 995.555, y: 608}
    }],
    adaps: [{x: 401, y: 247.663, b: "Mosaic"}, {x: 598, y: 322.621, b: "Netscape"}, {
        x: 660,
        y: 397.621,
        b: "Opera"
    }, {x: 701, y: 472.621, b: "Internet Explorer"}, {
        x: 1676, y: 547.485,
        b: "Safari"
    }, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
}, {
    name: "HTTP",
    path: "M2866.916,478.511c-15.65,0.075-31.591,2.294-47.487,5.346      c-15.897,3.089-31.744,7.104-47.48,11.638c-31.479,9.104-62.541,20.23-93.213,32.361c-30.668,12.17-60.968,25.394-90.897,39.415      c-29.925,14.034-59.481,28.88-88.567,44.544c-29.068,15.682-57.716,32.148-85.43,49.829c-13.841,8.85-27.451,18.013-40.521,27.675      c-6.526,4.832-12.919,9.791-19.022,14.934c-3.051,2.57-6.026,5.188-8.879,7.855c-1.443,1.352-2.779,2.639-4.215,4.078l-2.359,2.318      l-2.428,2.301c-6.544,6.08-13.642,11.748-21.389,16.674c-7.737,4.922-16.141,9.085-25.039,12.082      c-8.889,3.008-18.248,4.814-27.609,5.344c-9.365,0.542-18.7-0.162-27.707-1.791c-18.06-3.288-34.733-10.02-50.234-18      c-15.514-8.033-29.979-17.396-43.826-27.347c-13.842-9.967-27.082-20.533-39.983-31.39c-12.898-10.863-25.452-22.027-37.814-33.344      l-9.235-8.518l-9.125-8.52c-5.803-5.412-11.825-10.48-18.104-15.209c-12.545-9.436-26.078-17.425-40.35-23.295      c-14.252-5.872-29.262-9.581-44.283-10.459c-15.006-0.883-30.016,1.191-43.714,6.52c-13.708,5.295-26.003,13.858-35.84,24.865      c-2.461,2.75-4.782,5.639-6.942,8.661c-0.539,0.757-1.074,1.517-1.593,2.29l-0.966,1.413l-0.676,0.938l-0.665,0.875      c-1.815,2.324-3.985,4.597-6.562,6.596c-2.563,2-5.541,3.695-8.67,4.864c-3.129,1.181-6.367,1.843-9.447,2.091      c-6.2,0.483-11.691-0.484-16.606-1.799c-4.925-1.344-9.365-3.109-13.575-5.016c-4.206-1.914-8.176-3.988-12.023-6.135      c-7.688-4.301-14.907-8.881-21.976-13.523c-14.112-9.291-27.688-18.744-41.456-27.666c-13.747-8.928-27.638-17.367-41.923-24.729      c-7.14-3.68-14.374-7.086-21.71-10.128c-3.667-1.521-7.359-2.95-11.076-4.274c-1.857-0.664-3.723-1.298-5.592-1.908l-5.852-1.854      c-31.275-9.771-63.227-17.555-95.506-23.793c-32.286-6.227-64.915-10.879-97.698-14.225c-65.581-6.656-131.758-8.234-197.73-5.653      c-32.985,1.317-65.939,3.687-98.7,7.319c-8.189,0.91-16.364,1.903-24.519,2.992c-4.077,0.543-8.148,1.111-12.213,1.707      c-4.065,0.593-8.039,1.201-12.052,1.887c-16.021,2.712-31.944,6.26-47.77,10.41c-31.668,8.287-62.879,19.017-94.35,29.839      c-31.479,10.772-63.313,21.766-96.578,29.296c-8.295,1.868-16.746,3.518-25.149,4.833c-8.427,1.326-16.857,2.445-25.41,3.256      c-8.545,0.805-17.18,1.305-25.936,1.272c-8.752-0.044-17.641-0.605-26.633-2.224c-8.96-1.634-18.144-4.356-26.738-9.254      c-4.28-2.439-8.361-5.441-11.991-8.939c-3.631-3.496-6.785-7.475-9.374-11.672c-5.201-8.434-8.166-17.493-10.165-26.24      c-1.989-8.786-3.045-17.408-3.91-25.859c-1.667-16.896-2.582-33.254-5.087-49.098c-2.455-15.814-6.479-31.092-13.222-45      c-3.36-6.949-7.366-13.549-12.008-19.693c-2.319-3.073-4.784-6.043-7.398-8.89l-8.447-9.068      c-11.294-12.099-22.658-23.845-34.738-34.71c-12.059-10.875-24.808-20.871-38.321-29.727c-13.504-8.864-27.751-16.59-42.551-23.169      c-29.613-13.181-61.317-21.747-93.593-27.068c-32.3-5.298-65.239-7.529-98.144-7.735c-16.296-0.262-32.529,0.677-48.495,3.307      c-7.977,1.311-15.869,3.061-23.622,5.266c-7.756,2.191-15.367,4.874-22.743,8.09c-14.753,6.418-28.556,15.045-40.608,25.777      c-12.095,10.683-22.441,23.417-30.692,37.482c-8.244,14.07-14.562,29.36-18.97,45.234c-4.331,15.874-7.183,32.33-7.567,48.883      l-0.999,0.041c-0.465-8.373-0.073-16.73,0.692-25.07c0.781-8.336,2.074-16.638,3.874-24.845c3.59-16.406,9.121-32.514,17.026-47.543      c7.866-15.028,18.048-29.001,30.371-40.933c12.322-11.93,26.691-21.769,42.146-29.264c7.727-3.758,15.718-6.952,23.868-9.624      c8.154-2.665,16.471-4.774,24.855-6.454c16.771-3.351,33.849-4.905,50.81-5.208c33.611-0.213,67.301,1.57,100.729,6.754      c33.378,5.17,66.538,13.735,97.899,27.323c15.667,6.78,30.842,14.814,45.242,24.066c14.409,9.24,28.017,19.703,40.771,30.982      c12.774,11.266,24.677,23.348,36.2,35.449l8.65,9.105c3.045,3.246,5.947,6.645,8.665,10.188      c5.449,7.081,10.183,14.729,14.131,22.721c7.937,16.009,12.551,33.255,15.338,50.245c2.832,17.016,3.907,33.92,5.661,50.106      c0.888,8.081,1.972,15.991,3.713,23.425c1.739,7.425,4.194,14.346,7.802,20.072c3.588,5.743,8.344,10.248,14.269,13.56      c5.906,3.325,12.893,5.459,20.276,6.741c7.396,1.28,15.175,1.751,23.048,1.729c7.881-0.024,15.869-0.534,23.877-1.348      c8.002-0.813,16.062-1.938,24.057-3.255c8.023-1.309,15.899-2.889,23.821-4.719c31.64-7.338,62.789-18.24,94.163-29.185      c31.374-10.982,63.08-22.104,95.755-30.854c16.329-4.38,32.886-8.173,49.654-11.108c4.182-0.735,8.425-1.419,12.588-2.036      c4.164-0.617,8.328-1.207,12.494-1.771c8.331-1.127,16.667-2.156,25.009-3.1c33.364-3.763,66.812-6.229,100.306-7.632      c66.977-2.745,134.169-1.28,201.007,5.374c33.412,3.345,66.729,8.026,99.789,14.338c33.056,6.315,65.857,14.287,98.109,24.316      l6.045,1.906c2.088,0.664,4.166,1.354,6.23,2.073c4.129,1.437,8.206,2.981,12.234,4.615c8.055,3.271,15.909,6.9,23.584,10.782      c15.353,7.768,29.989,16.532,44.207,25.611c14.219,9.067,28.023,18.524,41.767,27.422c6.874,4.425,13.725,8.738,20.565,12.547      c3.417,1.898,6.832,3.664,10.201,5.188c3.363,1.521,6.695,2.797,9.801,3.631c3.098,0.842,5.952,1.188,8.063,0.996      c2.143-0.213,3.428-0.729,4.856-1.814c0.71-0.555,1.449-1.297,2.191-2.25l0.277-0.368l0.234-0.326l0.791-1.163      c0.641-0.955,1.301-1.896,1.967-2.834c2.672-3.746,5.562-7.355,8.644-10.807c6.167-6.898,13.157-13.124,20.796-18.443      c7.641-5.317,15.922-9.726,24.581-13.092c17.334-6.77,36.043-9.293,54.221-8.238c18.222,1.025,35.923,5.557,52.401,12.359      c16.5,6.821,31.812,15.94,45.826,26.514c7.002,5.289,13.711,10.963,20.062,16.905l9.102,8.521l9.096,8.41      c12.162,11.162,24.46,22.125,36.995,32.709c12.536,10.578,25.31,20.79,38.456,30.28c13.147,9.47,26.658,18.282,40.68,25.588      c13.998,7.285,28.559,13.089,43.281,15.804c7.352,1.355,14.719,1.914,21.967,1.521c7.248-0.389,14.373-1.739,21.251-4.036      c13.777-4.567,26.476-12.973,37.769-23.422l2.105-1.981l2.098-2.048c1.502-1.501,3.164-3.101,4.759-4.585      c3.228-3.008,6.507-5.877,9.821-8.66c6.629-5.564,13.396-10.791,20.247-15.844c13.711-10.08,27.748-19.457,41.958-28.488      c28.438-18.023,57.566-34.648,87.098-50.471c29.542-15.798,59.51-30.74,89.865-44.87c30.359-14.123,61.111-27.432,92.347-39.659      c31.244-12.201,62.939-23.418,95.425-32.667c16.249-4.604,32.699-8.709,49.477-11.896c8.39-1.587,16.863-2.94,25.453-3.929      c8.568-0.982,17.35-1.615,26.124-1.604L2866.916,478.511z",
    color: "#0065FB",
    techs: [{
        title: gettext("HTTP"),
        info: gettext("A networking protocol for\ndistributed, collaborative,\nhypermedia information\nsystems"),
        url: "http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol",
        position: {x: 146.225, y: 434}
    }],
    adaps: [{x: 401, y: 247.663, b: "Mosaic"}, {x: 598, y: 322.621, b: "Netscape"}, {
        x: 660,
        y: 397.621,
        b: "Opera"
    }, {x: 701, y: 472.621, b: "Internet Explorer"}, {x: 1676, y: 547.485, b: "Safari"}, {
        x: 1853,
        y: 622.443,
        b: "Firefox"
    }, {x: 2361, y: 697.193, b: "Chrome"}]
}, {
    name: "Cookies",
    path: "M595.655,146.598c-2.664,15.727-4.396,31.616-5.576,47.51      c-1.149,15.9-1.64,31.84-1.296,47.738c0.352,15.893,1.533,31.758,3.944,47.387c2.427,15.612,6.071,31.033,11.704,45.595      c5.621,14.52,13.338,28.229,23.818,39.227c5.227,5.487,11.117,10.263,17.555,14.094c6.428,3.846,13.391,6.737,20.627,8.706      c1.811,0.492,3.638,0.928,5.479,1.309l2.899,0.57l3.045,0.629c4.026,0.861,8.045,1.847,12.044,2.994      c7.994,2.303,15.934,5.239,23.574,9.279c7.61,4.037,14.953,9.323,20.952,16.274c2.991,3.462,5.618,7.317,7.731,11.437      c2.124,4.113,3.732,8.473,4.875,12.878c2.292,8.839,2.735,17.749,2.477,26.249c-0.268,8.52-1.279,16.727-2.141,24.603      c-0.839,7.839-1.682,15.499-1.195,22.068c0.23,3.265,0.847,6.157,1.792,8.358c0.957,2.219,2.159,3.746,3.919,5.106      c1.748,1.354,4.188,2.496,7.08,3.343c2.898,0.836,6.183,1.424,9.631,1.754c6.918,0.668,14.394,0.461,21.912-0.137      c7.293-0.572,14.776-1.802,22.311-3.312c7.533-1.519,15.104-3.337,22.669-5.312c15.13-3.982,30.28-8.47,45.381-13.247      c15.101-4.792,30.206-9.741,45.298-14.826c30.188-10.157,60.391-20.613,90.795-30.771c15.205-5.077,30.463-10.08,45.826-14.896      c15.368-4.8,30.816-9.483,46.486-13.739c15.682-4.229,31.523-8.182,47.922-11.107c8.209-1.445,16.555-2.642,25.233-3.25l3.288-0.195      l3.08-0.145c2.123-0.088,4.188-0.158,6.289-0.201c4.186-0.094,8.381-0.1,12.582-0.016c16.803,0.326,33.721,2.178,50.361,5.766      c16.638,3.582,32.932,9.032,48.425,15.983c15.507,6.942,30.159,15.401,44.004,24.501c13.864,9.093,26.946,18.819,39.763,28.236      c12.828,9.4,25.391,18.538,38.252,26.394c12.859,7.844,25.971,14.462,39.611,19.007c13.627,4.551,27.724,7.181,42.154,7.782      c3.604,0.156,7.228,0.192,10.862,0.118c1.817-0.038,3.639-0.104,5.462-0.197l2.668-0.156l0.983-0.082l1.083-0.117      c5.803-0.676,12.056-2.555,18.518-5.169c6.473-2.603,13.119-5.96,19.943-9.563c6.834-3.602,13.822-7.524,21.146-11.346      c7.319-3.828,14.953-7.625,23.114-10.926c8.149-3.305,16.842-6.156,26.087-7.905c9.222-1.767,19.021-2.301,28.692-1.214      c9.678,1.061,19.113,3.758,27.729,7.572c8.641,3.81,16.489,8.68,23.642,14.06c7.151,5.396,13.646,11.294,19.683,17.444l0.529,0.539      l0.281,0.338c16.606,19.932,34.071,38.765,53.327,55.377c9.624,8.309,19.659,16.094,30.124,23.3      c2.614,1.804,5.252,3.576,7.912,5.316c2.363,1.536,4.898,3.014,7.559,4.465c5.318,2.896,10.983,5.619,16.75,8.207      c11.562,5.171,23.571,9.836,35.72,14.165c12.159,4.326,24.487,8.311,36.915,12.008c24.859,7.387,50.105,13.645,75.543,18.82      c50.862,10.281,102.641,16.443,154.058,16.053c25.685-0.213,51.266-2.1,76.269-6.294c24.98-4.2,49.41-10.739,72.215-20.419      c22.795-9.645,43.875-22.583,61.646-38.922c2.222-2.04,4.393-4.131,6.51-6.271l6.985-7.082c4.716-4.75,9.471-9.469,14.268-14.151      c9.592-9.367,19.355-18.589,29.313-27.63c39.798-36.143,82.856-69.512,129.751-97.241c23.419-13.874,47.733-26.329,72.695-37.292      c24.967-10.959,50.595-20.37,76.601-28.336c26.002-7.993,52.371-14.588,78.907-19.984c26.536-5.408,53.226-9.715,79.969-13.076      l5.312,47.623c-25.756,2.494-51.378,5.817-76.736,10.297c-25.354,4.486-50.457,10.059-75.131,16.99      c-49.348,13.844-96.96,33.207-141.514,58.496c-22.297,12.6-43.864,26.58-64.711,41.698c-20.861,15.101-40.941,31.41-60.44,48.497      c-9.747,8.547-19.343,17.301-28.804,26.227c-4.732,4.461-9.43,8.965-14.098,13.508l-7.045,6.903      c-2.563,2.517-5.188,4.97-7.865,7.356c-21.439,19.143-46.328,33.76-72.264,44.394c-25.986,10.654-53.049,17.472-80.184,21.706      c-27.162,4.217-54.456,5.871-81.584,5.771c-27.138-0.1-54.125-2.003-80.887-5.142c-26.763-3.157-53.301-7.634-79.576-13.229      c-26.275-5.606-52.292-12.317-77.998-20.223c-12.852-3.957-25.625-8.218-38.309-12.866c-12.686-4.66-25.273-9.676-37.772-15.408      c-6.253-2.88-12.476-5.931-18.726-9.41c-3.119-1.74-6.281-3.614-9.436-5.705c-2.857-1.887-5.693-3.81-8.506-5.768      c-11.238-7.849-22.115-16.256-32.512-25.178c-20.843-17.82-39.688-37.586-57.354-57.822l0.811,0.877      c-10.498-10.281-22.121-18.887-34.274-23.811c-6.073-2.459-12.246-3.97-18.481-4.457c-6.237-0.499-12.559,0.041-18.993,1.432      c-12.899,2.772-26.014,9.168-39.521,16.568l-20.917,11.646c-7.249,3.954-14.854,7.879-23.178,11.328      c-8.313,3.412-17.46,6.338-27.546,7.568l-1.896,0.207l-2.003,0.168l-1.689,0.102l-1.624,0.082c-2.167,0.1-4.339,0.168-6.516,0.202      c-4.354,0.067-8.724,0.002-13.1-0.21c-17.494-0.826-35.134-4.105-51.732-9.956c-16.63-5.789-32.141-13.864-46.353-22.963      c-14.253-9.085-27.375-19.032-40.08-28.834c-12.713-9.8-25.075-19.439-37.725-28.2c-12.641-8.766-25.582-16.639-39.1-23.102      c-13.5-6.49-27.589-11.504-42.125-14.971c-14.531-3.492-29.508-5.36-44.646-5.913c-3.785-0.138-7.58-0.196-11.383-0.173      c-1.894,0.008-3.822,0.041-5.691,0.088l-2.907,0.088l-2.696,0.122c-7.271,0.404-14.784,1.354-22.326,2.577      c-15.105,2.479-30.371,6.008-45.568,9.987c-30.435,7.978-60.735,17.624-91.01,27.499c-30.283,9.898-60.538,20.189-91.045,30.062      c-15.26,4.924-30.564,9.808-46.022,14.371c-15.46,4.559-31.015,8.979-46.898,12.718c-7.942,1.87-15.961,3.597-24.131,5.039      c-8.167,1.429-16.511,2.62-25.169,3.089c-8.414,0.426-16.983,0.492-25.959-0.611c-4.485-0.572-9.098-1.437-13.818-3.023      c-4.694-1.592-9.621-3.91-14.059-7.646c-2.206-1.852-4.241-4.054-5.926-6.475c-1.691-2.42-3.022-5.041-3.995-7.656      c-1.952-5.264-2.53-10.383-2.663-15.084c-0.113-4.723,0.246-9.131,0.733-13.371c0.489-4.239,1.142-8.308,1.802-12.286      c1.326-7.946,2.647-15.569,3.316-23.009c0.674-7.425,0.669-14.664-0.663-21.419c-1.312-6.755-4.003-12.981-8.167-18.409      c-4.15-5.432-9.712-10.036-15.996-13.836c-6.286-3.817-13.279-6.819-20.518-9.307c-3.625-1.242-7.322-2.35-11.064-3.35l-2.793-0.726      l-2.951-0.722c-2.055-0.504-4.097-1.07-6.121-1.701c-8.092-2.523-15.9-6.107-23.025-10.736c-7.137-4.61-13.563-10.242-19.129-16.535      c-11.162-12.628-18.805-27.658-24.144-43.082c-5.339-15.48-8.481-31.483-10.377-47.514c-1.874-16.045-2.476-32.159-2.242-48.218      c0.243-16.062,1.327-32.077,3.067-48.003c1.771-15.922,4.09-31.771,7.343-47.453L595.655,146.598z",
    color: "#BC77B2",
    techs: [{
        title: gettext("Cookies"),
        info: gettext("A small piece of data sent by\nwebsites and stored in a user's\nweb browser to remember the\nwebsite's state or past user\nactivity"),
        url: "http://en.wikipedia.org/wiki/HTTP_cookie",
        position: {x: 599.371, y: 125}
    }],
    adaps: [{x: 598, y: 322.621, b: "Netscape"}, {x: 660, y: 397.621, b: "Opera"}, {
        x: 733,
        y: 472.621,
        b: "Internet Explorer"
    }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
}, {
    name: "SSL",
    path: "M640.686,169.466c2.566,27.325,2.241,54.62,5.305,81.847      c3.029,27.223,6.425,54.401,10.738,81.313c2.177,13.436,4.604,26.849,7.702,39.886c3.103,13.032,7.104,25.806,12.208,38      c5.1,12.182,11.388,23.79,19.147,34.029c7.735,10.227,17.087,19.006,27.835,24.861c10.709,5.922,22.783,8.676,35.019,8.203      c0.765-0.028,1.529-0.068,2.295-0.117c0.81-0.051,1.388-0.104,2.156-0.184c1.456-0.154,2.954-0.379,4.468-0.645      c3.031-0.539,6.135-1.266,9.25-2.104c6.236-1.682,12.526-3.791,18.792-6.078c12.54-4.605,25.013-9.928,37.432-15.447      c12.421-5.535,24.796-11.306,37.171-17.139c24.75-11.678,49.495-23.611,74.565-35.073c25.081-11.442,50.445-22.521,76.7-32.046      c13.138-4.738,26.502-9.088,40.309-12.565c6.906-1.731,13.925-3.24,21.111-4.374c3.593-0.564,7.229-1.035,10.916-1.373      c1.834-0.172,3.759-0.299,5.41-0.418l5.357-0.316c14.199-0.733,28.546-0.476,42.79,0.906c14.247,1.369,28.353,3.863,42.126,7.117      c13.784,3.246,27.242,7.207,40.484,11.385c13.244,4.186,26.289,8.587,39.282,12.92c25.962,8.723,51.793,17.11,77.9,24.562      c6.522,1.868,13.059,3.687,19.608,5.45c6.546,1.779,13.1,3.439,19.76,5.197c13.401,3.539,26.693,7.205,39.976,11.012      c26.548,7.609,52.915,15.734,79.136,24.152c26.223,8.412,52.301,17.114,78.312,25.765c26.011,8.644,51.958,17.241,77.944,25.261      c6.497,2.002,12.996,3.967,19.5,5.881l9.758,2.836l9.859,2.785c7.705,2.175,15.238,5.269,22.215,8.987      c6.999,3.721,13.506,8.062,19.547,12.729c12.09,9.366,22.355,19.932,31.857,30.541c9.49,10.637,18.235,21.4,26.95,31.818      c8.704,10.422,17.368,20.52,26.429,29.886c9.053,9.366,18.503,17.995,28.566,25.454c10.056,7.465,20.725,13.738,31.98,18.562      c11.25,4.83,23.079,8.213,35.275,10.193c6.098,0.996,12.283,1.646,18.526,1.983c3.121,0.17,6.257,0.261,9.403,0.276l4.89-0.02      l5.027-0.064c13.419-0.211,26.778-0.739,39.995-1.744c13.213-1.009,26.281-2.504,39.047-4.715      c12.787-2.213,25.15-5.205,37.416-9.154c6.152-1.966,12.322-4.174,18.775-6.508c6.447-2.326,13.227-4.775,20.406-6.95      c7.168-2.18,14.698-4.029,22.272-5.336c7.579-1.317,15.182-2.121,22.671-2.536c3.746-0.207,7.469-0.32,11.166-0.357      c3.631-0.033,7.573,0.025,11.287,0.188c7.514,0.327,14.966,1.022,22.316,2.042c14.707,2.033,29.011,5.292,42.893,9.252      c27.779,7.943,53.911,18.607,79.32,29.027c12.707,5.205,25.229,10.393,37.648,15.097c12.41,4.692,24.738,8.925,36.838,11.953      c6.044,1.513,12.022,2.708,17.859,3.47c2.918,0.383,5.797,0.651,8.627,0.795c1.416,0.078,2.814,0.111,4.203,0.121l2.295-0.008      l2.362-0.032c12.783-0.23,25.565-1.326,38.284-3.218c25.45-3.771,50.598-10.76,75.348-19.785      c24.768-9.018,49.151-20.041,73.588-31.764c24.448-11.72,48.963-24.17,74.308-35.955c25.333-11.774,51.589-22.865,79.401-31.258      c13.897-4.183,28.18-7.658,42.79-10.084c14.604-2.428,29.538-3.791,44.558-3.829v44.998c-24.832-0.107-49.883,4.259-74.64,11.573      c-24.785,7.295-49.271,17.438-73.767,28.532c-48.988,22.238-98.089,48.696-151.883,67.773c-26.846,9.521-54.877,17.11-83.757,21.129      c-14.427,2.017-29.04,3.144-43.683,3.275l-2.779,0.013l-2.848-0.016c-2.041-0.029-4.068-0.098-6.075-0.221      c-4.017-0.236-7.966-0.641-11.843-1.18c-7.755-1.075-15.23-2.653-22.474-4.523c-14.487-3.754-28.094-8.6-41.294-13.695      c-13.193-5.113-25.973-10.523-38.592-15.846c-25.209-10.639-49.906-20.916-74.84-28.29c-12.451-3.685-24.936-6.63-37.387-8.472      c-6.225-0.926-12.438-1.561-18.62-1.891c-3.136-0.167-6.052-0.236-9.276-0.247c-3.159-0.007-6.293,0.052-9.395,0.188      c-6.207,0.271-12.271,0.847-18.217,1.808c-5.953,0.957-11.785,2.305-17.759,4.04c-5.97,1.728-12.124,3.853-18.603,6.106      c-6.469,2.253-13.24,4.594-20.178,6.72c-13.894,4.3-28.295,7.6-42.562,9.886c-14.29,2.312-28.528,3.714-42.673,4.604      c-14.147,0.881-28.213,1.238-42.219,1.27l-5.258-0.006l-5.395-0.045c-3.711-0.062-7.43-0.211-11.152-0.457      c-7.445-0.487-14.908-1.354-22.332-2.652c-14.846-2.58-29.539-6.947-43.424-13.104c-13.895-6.14-26.923-14.043-38.779-23.062      c-11.877-9.017-22.607-19.101-32.493-29.561c-9.894-10.466-18.966-21.316-27.722-32.04c-8.758-10.72-17.203-21.34-25.867-31.267      c-8.658-9.912-17.558-19.146-27.094-26.693c-9.541-7.561-19.643-13.291-30.535-16.486l-9.902-2.926l-9.959-3.029      c-6.626-2.044-13.229-4.131-19.811-6.252c-26.324-8.49-52.34-17.482-78.273-26.465c-25.929-8.99-51.774-17.98-77.678-26.653      c-25.9-8.679-51.858-17.038-77.945-24.876c-13.035-3.916-26.14-7.707-39.211-11.338c-6.582-1.806-13.279-3.678-19.936-5.61      c-6.658-1.927-13.299-3.909-19.923-5.94c-26.499-8.107-52.696-17.149-78.558-26.401c-25.872-9.196-51.381-18.655-77.074-25.311      c-12.851-3.321-25.767-5.876-38.799-7.407c-13.029-1.54-26.172-2.059-39.375-1.657l-4.916,0.187      c-1.771,0.085-3.268,0.164-4.85,0.294c-3.145,0.249-6.317,0.618-9.504,1.081c-6.373,0.925-12.793,2.216-19.207,3.743      c-12.834,3.065-25.639,7.047-38.35,11.46c-25.433,8.877-50.522,19.457-75.472,30.48c-24.956,11.045-49.765,22.641-74.766,34.068      c-12.504,5.71-25.058,11.381-37.758,16.856c-12.71,5.464-25.54,10.767-38.808,15.459c-6.644,2.333-13.393,4.517-20.421,6.322      c-3.517,0.899-7.105,1.701-10.833,2.317c-1.866,0.306-3.765,0.567-5.721,0.752c-0.938,0.09-2.067,0.173-2.97,0.215      c-0.946,0.042-1.895,0.071-2.844,0.087c-7.591,0.12-15.275-0.712-22.711-2.606c-7.438-1.885-14.599-4.826-21.187-8.617      c-6.598-3.787-12.604-8.422-18-13.547c-5.395-5.136-10.182-10.771-14.445-16.689c-8.524-11.861-14.941-24.814-20.057-38.062      c-5.102-13.271-8.802-26.92-11.599-40.664l-0.995-5.145l-0.895-5.172c-0.57-3.436-1.099-6.869-1.596-10.301      c-0.988-6.865-1.875-13.724-2.639-20.588c-1.544-13.723-2.774-27.443-3.759-41.172c-0.983-13.727-1.866-27.445-2.486-41.176      c-0.608-13.73,0.812-27.454,0.508-41.188c-0.345-13.73,0.43-27.46,0.468-41.196L640.686,169.466z",
    color: "#F0543A",
    techs: [{
        title: gettext("SSL"),
        info: gettext("A specification language for\nrecursive descent parsers,\nsemantic analyzers and code\ngenerators"),
        url: gettext("http://en.wikipedia.org/wiki/Secure_Socket_Layer"),
        position: {x: 642.102, y: 146}
    }],
    adaps: [{x: 650, y: 322.621, b: "Netscape"}, {x: 992, y: 397.621, b: "Opera"}, {
        x: 733,
        y: 472.621,
        b: "Internet Explorer"
    }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
}, {
    name: "Javascript",
    path: "M710.776,210.749c5.03,4.43,9.782,9.133,14.43,13.951c4.637,4.826,9.157,9.775,13.502,14.883      c8.696,10.206,16.863,20.904,24.343,32.117c7.442,11.234,14.208,22.975,20.032,35.246c2.91,6.127,5.586,12.422,7.964,18.783      c2.4,6.41,4.511,12.85,6.451,19.346c3.862,12.981,7.052,26.063,10.277,38.985c3.214,12.913,6.435,25.722,10.564,37.872      c4.134,12.091,9.229,23.674,16.441,32.535c3.586,4.426,7.654,8.111,12.203,10.887c4.535,2.803,9.566,4.709,14.968,5.869      c0.675,0.145,1.353,0.283,2.041,0.399l0.514,0.091l0.508,0.062l1.244,0.149l2.174,0.207c0.746,0.066,1.49,0.137,2.231,0.184      c2.968,0.205,5.894,0.312,8.771,0.258c5.757-0.062,11.288-0.738,16.578-2.008c5.29-1.289,10.348-3.232,15.228-5.879      c2.447-1.303,4.846-2.789,7.206-4.419c2.372-1.61,4.706-3.38,7.006-5.263c9.221-7.547,17.96-16.888,26.806-26.56      c8.842-9.697,17.761-19.813,27.168-29.651c9.368-9.877,19.245-19.469,29.639-28.527c5.216-4.51,10.543-8.909,16.042-13.099      c2.741-2.105,5.522-4.161,8.342-6.163l8.188-5.82c5.449-3.869,10.936-7.746,16.525-11.564c5.576-3.838,11.248-7.629,17.097-11.256      c5.854-3.617,11.857-7.117,18.083-10.326c6.225-3.205,12.668-6.114,19.287-8.652c13.245-5.072,27.214-8.445,41.218-10.16      c14.018-1.732,28.047-1.923,41.863-1.168c13.825,0.752,27.466,2.409,40.941,4.578c13.644,2.321,26.849,5.391,39.977,8.664      c26.227,6.582,52.033,14.193,77.598,22.564c25.562,8.366,50.85,17.523,75.89,27.375c25.034,9.865,49.808,20.467,74.205,32.026      c24.387,11.577,48.416,24.087,71.742,38.139c11.657,7.032,23.135,14.458,34.321,22.442c11.182,7.99,22.083,16.531,32.452,25.937      c10.35,9.416,20.212,19.687,28.841,31.435c4.306,5.875,8.278,12.14,11.7,18.866c1.703,3.368,3.273,6.845,4.646,10.448l3.598,9.375      c2.385,6.212,4.759,12.4,7.174,18.48c2.416,6.072,4.871,12.058,7.477,17.647c2.596,5.565,5.396,10.772,8.344,14.536      c1.472,1.886,2.939,3.37,4.461,4.535c1.527,1.164,3.152,2.069,5.152,2.852c3.964,1.57,9.483,2.486,15.466,3.002      c5.999,0.521,12.437,0.711,18.957,0.842c13.08,0.23,26.535,0.256,39.972,0.527c6.725,0.127,13.46,0.299,20.197,0.523      c3.385,0.115,6.701,0.227,10.143,0.385l5.168,0.262l5.15,0.322c13.721,0.928,27.311,2.407,40.789,4.224      c26.955,3.655,53.472,8.614,79.766,13.909c26.293,5.311,52.369,10.982,78.389,16.459c26.017,5.482,51.975,10.784,77.961,15.498      c51.947,9.441,104.09,16.518,156.262,18.642c26.074,1.073,52.133,0.921,78.044-0.708c6.431-0.395,13.039-0.937,19.632-1.478      c6.588-0.544,13.168-1.116,19.742-1.722c13.146-1.209,26.264-2.548,39.332-4.057c26.129-3.031,52.104-6.699,77.537-11.675      c25.391-5.008,50.349-11.281,73.324-20.407c11.477-4.572,22.384-9.886,32.547-16.166c10.186-6.27,19.606-13.539,28.76-21.821      c4.581-4.134,9.107-8.511,13.662-13.061l14.038-14.161c9.666-9.635,20.097-19.625,32.204-28.626      c6.033-4.489,12.445-8.686,19.108-12.417c6.663-3.736,13.558-7.014,20.525-9.834c13.957-5.653,28.115-9.533,42.093-12.475      c13.994-2.932,27.869-4.934,41.645-6.469c13.776-1.527,27.459-2.567,41.085-3.338l2.271,45.943      c-12.993,0.555-25.909,1.363-38.643,2.598c-12.729,1.237-25.286,2.893-37.417,5.262c-12.127,2.371-23.808,5.462-34.626,9.676      c-10.847,4.207-20.734,9.551-30.131,16.357c-9.406,6.771-18.463,15.086-27.779,24.135l-7.021,6.88l-7.311,7.127      c-4.963,4.776-10.105,9.577-15.507,14.274c-10.775,9.406-22.692,18.295-35.361,25.758c-12.659,7.5-25.938,13.624-39.313,18.664      c-13.389,5.047-26.898,9.066-40.397,12.469c-13.504,3.396-27.012,6.17-40.501,8.562c-26.981,4.759-53.9,8.038-80.771,10.655      c-13.436,1.301-26.86,2.42-40.275,3.404c-6.708,0.492-13.414,0.951-20.117,1.38c-6.698,0.422-13.383,0.842-20.256,1.204      c-27.312,1.4-54.631,1.237-81.801-0.195c-54.367-2.847-108.043-10.807-160.838-21.031c-52.824-10.18-104.83-22.769-156.621-33.891      c-25.895-5.529-51.752-10.662-77.584-14.467c-12.914-1.893-25.818-3.444-38.682-4.463l-4.821-0.357l-4.81-0.3l-9.827-0.513      c-6.579-0.316-13.162-0.582-19.759-0.805c-13.208-0.463-26.406-0.68-39.971-1.119c-6.798-0.241-13.688-0.525-20.959-1.26      c-3.639-0.377-7.383-0.873-11.299-1.663c-3.906-0.794-8.018-1.89-12.211-3.605c-4.18-1.698-8.419-4.099-12.126-7.062      c-3.723-2.953-6.854-6.365-9.422-9.772c-5.127-6.868-8.402-13.63-11.372-20.149c-2.926-6.537-5.424-12.93-7.844-19.274      c-2.41-6.343-4.717-12.632-7.016-18.896l-3.428-9.338c-0.982-2.631-2.142-5.242-3.429-7.829c-2.59-5.169-5.729-10.227-9.271-15.119      c-7.094-9.796-15.692-18.94-24.999-27.499c-9.323-8.562-19.382-16.561-29.838-24.124c-10.463-7.563-21.334-14.696-32.457-21.497      c-22.26-13.594-45.492-25.881-69.187-37.302c-23.708-11.409-47.906-21.938-72.405-31.764c-24.5-9.829-49.32-18.916-74.335-27.386      c-25.023-8.421-50.254-16.309-75.655-23.009c-12.694-3.31-25.453-6.356-38.064-8.648c-12.776-2.413-25.588-4.312-38.36-5.351      c-12.768-1.029-25.496-1.225-37.984-0.062c-12.489,1.148-24.711,3.709-36.464,7.904c-23.571,8.299-45.059,23.183-66.646,38.633      l-8.085,5.788c-2.588,1.89-5.141,3.829-7.658,5.817c-5.02,3.992-9.888,8.188-14.575,12.596c-4.703,4.391-9.223,8.994-13.625,13.732      c-4.379,4.763-8.64,9.661-12.831,14.664c-8.359,10.035-16.378,20.504-24.884,31.041c-8.534,10.498-17.594,21.153-28.867,30.701      c-2.833,2.363-5.787,4.66-8.915,6.813c-3.136,2.136-6.422,4.146-9.869,5.952c-6.887,3.604-14.43,6.369-22.167,7.901      c-7.736,1.571-15.602,1.882-23.156,1.287c-3.779-0.324-7.499-0.825-11.126-1.562c-0.91-0.174-1.811-0.369-2.71-0.564      c-0.89-0.191-1.888-0.438-2.749-0.65l-1.21-0.321c-0.252-0.062-0.291-0.089-0.718-0.179l-0.708-0.167      c-0.944-0.218-1.888-0.464-2.829-0.722c-7.528-2.038-14.953-5.411-21.488-10.043c-6.545-4.629-12.079-10.465-16.439-16.725      c-4.379-6.275-7.699-12.926-10.382-19.597c-2.685-6.681-4.745-13.409-6.491-20.108c-3.467-13.408-5.755-26.71-8.076-39.859      c-2.282-13.152-4.531-26.176-7.49-38.965c-1.469-6.387-3.112-12.742-4.992-18.952c-1.898-6.261-4.07-12.392-6.503-18.474      c-4.862-12.148-10.713-23.961-17.297-35.387c-6.558-11.445-13.837-22.523-21.719-33.185c-7.884-10.652-16.28-21.002-25.437-30.632      L710.776,210.749z",
    color: "#FFD213",
    offset: {x: 0, y: -50},
    techs: [{
        title: gettext("Javascript"),
        info: gettext("A prototype-based, object-\noriented scripting language"),
        url: "http://en.wikipedia.org/wiki/JavaScript",
        position: {x: 715.123, y: 195}
    }],
    adaps: [{x: 774, y: 322.621, b: "Netscape"}, {x: 992, y: 397.621, b: "Opera"}, {
        x: 826,
        y: 472.621,
        b: "Internet Explorer"
    }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
}, {
    name: "Java",
    path: "M758.16,169.475c1.272,27.047,3.479,54.046,6.378,80.93      c2.988,26.871,6.695,53.659,11.896,80.088c2.611,13.207,5.615,26.32,9.208,39.214c3.586,12.884,7.757,25.593,13.08,37.624      c1.334,3.008,2.739,5.949,4.247,8.854c1.544,2.991,3.101,5.96,4.686,8.907c3.169,5.895,6.443,11.694,9.916,17.312      c6.937,11.223,14.723,21.773,24.024,30.342c9.268,8.593,20.174,14.896,32.128,18.305c11.935,3.451,24.772,4.238,37.558,3.355      c12.222-0.92,24.427-4.782,36.162-10.062c11.773-5.284,23.193-11.937,34.495-18.997c11.303-7.078,22.499-14.607,33.856-22.062      c11.349-7.469,22.839-14.912,34.63-22.01c23.542-14.23,48.456-26.951,74.827-36.424c26.332-9.525,54.093-15.577,82.13-17.812      c7.009-0.562,14.034-0.898,21.058-1.008l5.202-0.046l5.13-0.013c3.465-0.004,6.877,0.019,10.315,0.061      c13.73,0.188,27.46,0.768,41.167,1.74c54.849,3.913,109.161,14.561,161.759,30.52c26.3,8.012,52.229,17.342,77.484,28.443      c25.233,11.129,49.732,24.19,72.819,39.703c23.03,15.545,44.787,33.49,63.321,55.039c4.62,5.393,9.019,11.018,13.126,16.905      c1.021,1.461,2.049,2.982,3.01,4.44c1.018,1.553,1.963,3.035,2.912,4.574c1.887,3.057,3.682,6.158,5.395,9.289      c6.863,12.527,12.357,25.545,17.321,38.365l7.267,18.936c2.417,6.152,4.887,12.143,7.648,17.508      c2.74,5.346,5.877,10.051,9.133,12.874c1.625,1.425,3.221,2.378,4.916,3.007c1.695,0.624,3.569,0.951,5.76,0.961      c4.369,0.041,9.774-1.308,15.208-3.421c5.462-2.116,11.023-4.946,16.513-8.095c2.747-1.578,5.483-3.242,8.205-4.971      c2.675-1.721,5.865-3.746,8.887-5.536c6.109-3.648,12.343-7.032,18.664-10.196c25.312-12.623,51.924-21.75,78.917-28.615      c27.017-6.837,54.48-11.363,82.069-14.053c27.595-2.679,55.33-3.508,83.018-2.609c27.687,0.904,55.337,3.505,82.749,7.965      c27.407,4.463,54.588,10.768,81.214,19.241c26.613,8.486,52.696,19.138,77.579,32.531c12.436,6.698,24.562,14.083,36.237,22.232      c5.833,4.079,11.559,8.339,17.141,12.808l3.996,3.221c0.611,0.471,0.936,0.724,1.548,1.17l1.669,1.199      c2.258,1.562,4.617,3.015,7.072,4.346c9.825,5.329,21.066,8.717,32.771,10.398c11.723,1.684,23.918,1.689,36.096,0.367      c24.406-2.672,48.632-10.537,71.39-21.59c22.808-11.069,44.223-25.419,64.042-41.811c9.914-8.205,19.438-16.936,28.573-26.094      l7.111-7.191c2.586-2.577,5.12-5.034,7.74-7.504c5.217-4.919,10.591-9.689,16.11-14.307c22.064-18.465,46.579-34.38,72.849-46.721      c13.122-6.188,26.657-11.496,40.438-15.935c13.785-4.433,27.811-7.999,41.925-10.784c28.233-5.591,56.819-7.88,84.723-8.541      l0.574,47.993c-26.248-0.074-51.924,1.358-77,5.629c-25.056,4.212-49.402,11.31-72.43,21.49      c-23.028,10.162-44.708,23.41-64.542,39.285c-4.961,3.965-9.815,8.082-14.551,12.354c-2.357,2.123-4.734,4.329-6.995,6.483      l-7.352,7.077c-10.26,9.755-20.979,19.074-32.174,27.851c-22.387,17.542-46.718,32.938-72.962,44.942      c-26.222,11.94-54.472,20.529-84.071,23.066c-14.777,1.238-29.886,0.925-44.938-1.609c-15.023-2.539-30.053-7.341-43.896-15.262      c-3.457-1.975-6.828-4.15-10.087-6.516c-0.81-0.6-1.622-1.196-2.418-1.818c-0.744-0.565-1.742-1.373-2.456-1.955l-3.859-3.22      c-4.934-4.071-10.023-7.978-15.234-11.739c-10.431-7.514-21.375-14.412-32.697-20.73c-22.653-12.635-46.787-22.942-71.662-31.281      c-24.888-8.332-50.537-14.697-76.535-19.329c-52.012-9.22-105.445-11.677-158.181-7.298c-26.36,2.22-52.564,6.195-78.164,12.318      c-25.571,6.141-50.609,14.408-73.96,25.679c-5.829,2.822-11.547,5.831-17.111,9.056c-2.828,1.623-5.37,3.208-8.429,5.09      c-3.03,1.848-6.114,3.65-9.272,5.388c-6.323,3.468-12.912,6.719-20.134,9.373c-3.614,1.32-7.397,2.483-11.436,3.341      c-4.033,0.852-8.347,1.4-12.945,1.285c-4.576-0.104-9.479-0.953-14.099-2.794c-4.629-1.817-8.818-4.597-12.219-7.706      c-3.422-3.117-6.131-6.521-8.417-9.908c-2.283-3.396-4.159-6.802-5.832-10.17c-3.326-6.741-5.89-13.349-8.329-19.836l-6.995-19.115      c-4.616-12.508-9.52-24.576-15.505-35.916c-1.494-2.834-3.049-5.622-4.678-8.354c-0.806-1.357-1.66-2.743-2.479-4.036      c-0.881-1.383-1.73-2.68-2.629-4.009c-3.562-5.278-7.436-10.399-11.553-15.356c-16.524-19.837-36.641-37.061-58.252-52.118      c-21.67-15.049-44.967-27.954-69.129-39.053c-24.167-11.116-49.306-20.265-74.994-27.49c-6.417-1.825-12.876-3.51-19.364-5.076      c-6.485-1.576-12.992-3.061-19.521-4.446c-13.065-2.74-26.217-5.061-39.414-7.061c-26.404-3.961-52.993-6.549-79.635-8.227      c-13.323-0.843-26.666-1.426-40.021-1.779l-10-0.23l-5.029-0.072l-4.957-0.043c-6.521-0.016-13.038,0.182-19.539,0.588      c-13.004,0.812-25.945,2.491-38.729,5.033c-12.785,2.545-25.41,5.949-37.819,10.119c-12.409,4.174-24.591,9.133-36.542,14.721      c-11.951,5.592-23.676,11.795-35.256,18.395c-11.582,6.604-23.007,13.622-34.459,20.777c-11.454,7.156-22.951,14.433-34.799,21.426      c-11.855,6.969-24.076,13.696-37.184,19.171c-13.085,5.429-27.213,9.568-42.104,10.255c-7.146,0.293-14.297,0.141-21.493-0.645      c-7.182-0.781-14.371-2.211-21.356-4.464c-6.984-2.241-13.752-5.311-20.019-9.153c-6.276-3.832-12.035-8.418-17.205-13.469      c-10.378-10.125-18.361-21.941-25.267-33.953c-3.452-6.023-6.638-12.137-9.683-18.277c-1.522-3.07-3.01-6.152-4.472-9.23      c-1.507-3.158-2.914-6.383-4.218-9.611c-5.207-12.941-9.045-26.193-12.278-39.516c-3.193-13.335-5.701-26.768-7.829-40.23      c-4.227-26.933-6.922-54.001-8.68-81.096c-1.752-27.094-2.682-54.217-2.52-81.34L758.16,169.475z",
    color: "#394FA2",
    offset: {x: 0, y: -45},
    techs: [{
        title: gettext("Java"),
        info: gettext("Java applets, which can\nrun in a web browser using a\nJava Virtual Machine, were\nintroduced in the first\nversion of the Java language."),
        url: "http://en.wikipedia.org/wiki/Java_(programming_language)",
        position: {x: 756.585, y: 155}
    }],
    adaps: [{x: 774, y: 322.621, b: "Netscape"}, {x: 1106, y: 397.621, b: "Opera"}, {
        x: 826,
        y: 472.621,
        b: "Internet Explorer"
    }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
},
    {
        name: "Flash",
        path: "M855.38,215.042c-5.427,11.341-9.911,22.819-13.551,34.483      c-3.672,11.646-5.981,23.667-6.634,35.72c-0.654,12.05,0.307,24.104,2.836,35.776c2.525,11.68,6.641,22.959,12.01,33.62      c5.385,10.659,11.996,20.712,19.518,30.085c7.496,9.398,15.879,18.142,24.863,26.273c18.013,16.239,38.192,30.238,59.424,42.503      c5.318,3.083,10.662,6.013,16.144,8.927c5.478,2.918,10.972,5.783,16.487,8.574c11.04,5.569,22.143,10.904,33.385,15.773      c22.472,9.752,45.563,17.532,69.219,22.199c23.631,4.766,47.796,6.35,71.965,5.153c24.175-1.181,48.334-4.948,72.211-10.404      c23.889-5.458,47.514-12.554,70.875-20.593c23.363-8.053,46.466-17.078,69.357-26.697l8.656-3.67      c1.333-0.566,3.18-1.318,4.719-1.906c1.602-0.614,3.211-1.206,4.832-1.762c6.475-2.244,13.08-4.025,19.732-5.408      c13.316-2.751,26.808-3.854,40.135-3.746c26.697,0.252,52.67,5.132,77.607,12.207c24.961,7.13,48.985,16.547,72.259,27.262      c23.271,10.734,45.801,22.803,67.726,35.783c21.922,12.994,43.242,26.901,64.006,41.625c10.38,7.366,20.617,14.938,30.705,22.777      c5.044,3.922,10.049,7.91,15.017,12.01c4.979,4.124,9.874,8.262,14.88,12.902l1.91,1.814l1.729,1.695      c1.037,1.013,2.1,2.027,3.178,3.037c2.156,2.023,4.371,4.031,6.618,6.017c4.496,3.972,9.122,7.852,13.829,11.629      c9.422,7.554,19.178,14.708,29.202,21.347c10.026,6.635,20.331,12.759,30.882,18.151c10.548,5.386,21.352,10.044,32.294,13.574      c10.933,3.525,22.019,5.91,32.86,6.571c10.836,0.664,21.379-0.44,31.042-3.663c9.671-3.201,18.466-8.529,26.166-15.637      c0.963-0.886,1.909-1.8,2.839-2.737c1.125-1.132,2.404-2.395,3.604-3.553c2.434-2.344,4.922-4.639,7.471-6.877      c5.098-4.475,10.424-8.73,15.982-12.705c11.105-7.959,23.141-14.809,35.852-20.193c12.705-5.395,26.073-9.312,39.674-11.648      c13.602-2.346,27.422-3.115,41.088-2.48c13.672,0.633,27.19,2.66,40.35,5.838c26.335,6.386,51.217,17.221,73.982,31.369      c11.385,7.092,22.25,15.041,32.463,23.902c2.551,2.218,5.063,4.49,7.527,6.828l1.84,1.766l1.699,1.663l0.773,0.746l0.481,0.438      c0.396,0.358,0.807,0.717,1.237,1.072c3.431,2.861,7.791,5.584,12.531,8.018c9.533,4.889,20.5,8.736,31.758,11.894      c11.297,3.153,23,5.628,34.851,7.632c23.727,3.988,48.038,6.149,72.402,7.062c24.378,0.909,48.86,0.536,73.224-1.059      c24.36-1.608,48.622-4.435,72.48-8.742c23.838-4.325,47.333-10.108,69.649-18.073c11.143-3.988,21.979-8.532,32.217-13.787      c10.225-5.255,19.871-11.227,28.331-18.037c2.112-1.701,4.151-3.453,6.098-5.258c0.973-0.902,1.928-1.813,2.853-2.742l3.053-3.158      c4.501-4.629,9.018-9.154,13.595-13.646c9.153-8.973,18.499-17.77,28.199-26.355c9.727-8.578,19.721-16.958,30.729-24.91      c5.536-3.969,11.294-7.837,17.905-11.46c3.326-1.806,6.87-3.556,11.033-5.132c2.101-0.781,4.348-1.523,6.951-2.133      c2.589-0.6,5.554-1.097,9.156-1.121v40c0.469-0.005,0.313-0.053-0.146,0.059c-0.45,0.094-1.19,0.314-2.027,0.618      c-1.704,0.624-3.817,1.601-6,2.773c-4.401,2.36-9.113,5.421-13.774,8.724c-9.36,6.651-18.67,14.299-27.784,22.232      c-9.122,7.958-18.09,16.275-26.89,24.781c-4.396,4.253-8.762,8.564-13.025,12.889l-3.507,3.568c-1.296,1.281-2.616,2.523-3.948,3.74      c-2.667,2.436-5.401,4.746-8.183,6.955c-11.142,8.822-23.005,15.959-35.096,22.072c-12.104,6.1-24.473,11.155-36.948,15.521      c-24.968,8.699-50.359,14.705-75.845,19.146c-25.496,4.412-51.115,7.199-76.769,8.709c-25.656,1.492-51.352,1.699-77.048,0.557      c-25.696-1.186-51.394-3.665-77.062-8.199c-12.834-2.285-25.66-5.094-38.473-8.785c-12.809-3.736-25.619-8.221-38.357-14.861      c-6.358-3.358-12.724-7.262-18.893-12.469c-0.77-0.65-1.535-1.326-2.295-2.026l-1.236-1.163l-0.91-0.893l-1.644-1.639l-1.538-1.5      c-2.064-1.992-4.182-3.941-6.342-5.852c-8.648-7.637-18.006-14.615-27.837-20.855c-19.669-12.469-41.257-22.045-63.604-27.653      c-22.33-5.614-45.477-7.124-67.709-3.473c-22.242,3.585-43.413,12.44-62.023,25.586c-4.662,3.274-9.168,6.809-13.518,10.562      c-2.175,1.877-4.309,3.812-6.404,5.796c-1.062,1.01-2.021,1.937-3.114,3.018c-1.286,1.276-2.605,2.526-3.958,3.75      c-5.404,4.894-11.356,9.335-17.768,13.103c-6.405,3.771-13.268,6.848-20.344,9.131c-14.183,4.596-29.049,5.873-43.184,4.854      c-14.182-1.013-27.738-4.16-40.6-8.437c-12.87-4.293-25.087-9.734-36.793-15.851c-11.705-6.127-22.906-12.941-33.705-20.236      c-10.798-7.301-21.194-15.083-31.244-23.301c-5.025-4.111-9.961-8.332-14.814-12.702c-2.427-2.187-4.832-4.409-7.224-6.694      c-1.196-1.144-2.388-2.303-3.581-3.49l-1.609-1.611l-1.483-1.435c-4.143-3.921-8.773-7.933-13.407-11.841      c-4.658-3.918-9.416-7.786-14.227-11.602c-9.625-7.629-19.468-15.057-29.453-22.288c-19.979-14.458-40.539-28.149-61.609-40.913      c-21.073-12.752-42.672-24.58-64.812-35.051c-22.136-10.453-44.834-19.576-68.014-26.434c-23.15-6.822-46.868-11.417-70.344-11.851      c-11.72-0.208-23.352,0.655-34.605,2.868c-5.623,1.113-11.153,2.549-16.535,4.357c-1.348,0.447-2.683,0.924-4.011,1.418      c-1.39,0.521-2.45,0.936-4.008,1.576l-8.681,3.582c-23.401,9.57-47.092,18.568-71.189,26.619      c-24.096,8.041-48.611,15.135-73.646,20.585c-25.021,5.429-50.605,9.231-76.523,10.155c-25.89,0.955-52.094-1.09-77.536-6.566      c-25.458-5.465-49.957-14.305-73.247-24.916c-11.662-5.3-23.056-11.03-34.23-17.053c-5.59-3.006-11.133-6.072-16.64-9.182      c-5.507-3.104-11.073-6.336-16.515-9.674c-10.914-6.676-21.584-13.809-31.885-21.504c-10.305-7.688-20.227-15.961-29.541-24.948      c-9.317-8.976-18.065-18.635-25.861-29.094c-7.772-10.467-14.6-21.732-19.959-33.72c-5.376-11.97-9.256-24.661-11.293-37.627      c-1.018-6.482-1.594-13.025-1.703-19.562c-0.094-6.537,0.261-13.064,1.049-19.519c1.582-12.909,4.848-25.524,9.594-37.476      c2.403-5.965,5.271-11.731,8.622-17.191c1.675-2.73,3.47-5.385,5.405-7.934c1.946-2.539,3.967-5.018,6.286-7.253L855.38,215.042z",
        color: "#90A3D1",
        offset: {x: 0, y: -70},
        techs: [{
            title: gettext("Flash"),
            info: gettext("A multimedia platform\nused to add animation,\nvideo, and interactivity to\nweb pages."),
            url: "http://en.wikipedia.org/wiki/Adobe_Flash",
            position: {x: 860.747, y: 195}
        }],
        adaps: [{x: 826, y: 322.621, b: "Netscape"}, {x: 867, y: 397.621, b: "Opera"}, {
            x: 971,
            y: 472.621,
            b: "Internet Explorer"
        }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
    }, {
        name: "SVG",
        path: "M1465.455,187.134c1.652,0.888,0.459,0.489,0.826,0.788l-0.002,0.404l-0.003,0.806      l0.001,1.61l0.032,3.219c0.034,2.146,0.092,4.291,0.169,6.437c0.156,4.289,0.391,8.575,0.694,12.854      c0.607,8.558,1.487,17.092,2.623,25.584c2.231,16.988,5.476,33.825,9.834,50.334c4.38,16.498,9.783,32.701,16.538,48.283      c6.74,15.582,14.791,30.555,24.273,44.49c9.445,13.953,20.344,26.856,32.609,38.227c12.253,11.381,25.869,21.203,40.458,29.218      c14.587,8.022,30.103,14.306,46.132,18.86c16.029,4.569,32.545,7.463,49.209,8.982c16.669,1.531,33.487,1.66,50.276,0.811      c16.794-0.852,33.565-2.748,50.229-5.445c33.342-5.408,66.234-13.958,98.539-24.381c32.336-10.367,64.109-22.659,95.369-36.2      c7.815-3.387,15.598-6.856,23.35-10.397l11.605-5.366l2.979-1.386l3.103-1.403c2.062-0.919,4.143-1.812,6.238-2.681      c16.74-6.922,34.65-12.32,53.709-13.947c9.503-0.805,19.268-0.622,28.962,0.864c9.689,1.472,19.272,4.274,28.253,8.287      c8.992,4.001,17.354,9.175,24.938,15.054c7.596,5.883,14.436,12.453,20.672,19.354c12.461,13.845,22.538,28.949,31.678,44.171      c9.115,15.254,17.241,30.738,25.207,46.051c7.971,15.305,15.726,30.488,23.945,45.092c8.231,14.572,16.955,28.613,26.896,41.016      c9.917,12.382,21.152,23.025,33.789,29.904c6.311,3.445,12.955,5.945,19.881,7.435c3.461,0.747,6.991,1.247,10.576,1.505      c1.793,0.13,3.6,0.199,5.416,0.213c0.908,0.008,1.82-0.002,2.734-0.023l0.686-0.02l0.527-0.021l-0.185,0.008      c-0.005,0.001-0.009,0-0.011,0c-0.027-0.001,0.166-0.023,0.691-0.328c0.514-0.295,1.295-0.871,2.162-1.696      c1.758-1.656,3.78-4.227,5.671-7.149c3.825-5.907,7.297-13.115,10.509-20.551c3.219-7.472,6.213-15.291,9.18-23.251      c2.969-7.967,5.896-16.083,9.051-24.327c1.581-4.123,3.221-8.279,5.002-12.488c1.787-4.213,3.697-8.471,5.978-12.859      c1.146-2.196,2.388-4.428,3.83-6.727c1.454-2.301,3.08-4.67,5.238-7.176c2.192-2.475,4.83-5.229,9.3-7.744      c2.23-1.227,5.021-2.342,8.218-2.851c3.181-0.529,6.673-0.341,9.661,0.432c3.01,0.76,5.516,1.981,7.539,3.245      c2.033,1.273,3.648,2.605,5.029,3.898c2.746,2.598,4.662,5.072,6.338,7.447c3.289,4.749,5.584,9.201,7.682,13.603      c4.105,8.774,7.193,17.304,10.053,25.833c5.637,17.03,10.136,33.953,14.348,50.902c4.203,16.938,8.025,33.877,11.658,50.826      c7.252,33.898,13.707,67.843,19.988,101.792l-0.643-2.485l-0.027-0.081l0.043,0.108l0.115,0.287l0.281,0.658      c0.2,0.455,0.42,0.918,0.646,1.365c0.453,0.897,0.939,1.738,1.406,2.443c0.465,0.704,0.917,1.272,1.243,1.618      c0.321,0.349,0.519,0.454,0.333,0.318c-0.167-0.125-0.814-0.499-1.8-0.688c-0.973-0.205-2.11-0.113-2.687,0.049      c-0.605,0.158-0.707,0.273-0.512,0.133c0.194-0.131,0.654-0.483,1.198-1.013c1.108-1.062,2.52-2.769,3.88-4.735      c1.375-1.977,2.742-4.229,4.058-6.611c2.638-4.781,5.081-10.07,7.36-15.523c4.555-10.941,8.51-22.562,12.107-34.354      c3.6-11.805,6.87-23.82,9.937-35.93c6.112-24.23,11.47-48.816,16.354-73.535c2.442-12.361,4.777-24.758,7.026-37.18l3.312-18.65      l0.81-4.668c0.269-1.566,0.579-3.309,0.902-4.998c0.652-3.415,1.402-6.875,2.261-10.318c3.422-13.793,8.568-27.33,15.395-39.942      c6.808-12.628,15.251-24.344,24.864-34.826c9.612-10.493,20.367-19.765,31.771-27.836c11.409-8.079,23.46-14.981,35.824-20.905      c24.771-11.812,50.649-19.939,76.687-25.672c13.026-2.867,26.11-5.146,39.205-6.953c13.095-1.815,26.2-3.192,39.297-4.178      l2.727,43.916c-24.543,1.164-48.906,3.764-72.629,8.418c-11.856,2.323-23.548,5.162-34.957,8.627      c-11.41,3.457-22.535,7.559-33.184,12.43c-21.287,9.701-40.769,22.481-56.207,38.732c-7.719,8.109-14.411,17.058-19.853,26.709      c-5.445,9.652-9.644,19.975-12.506,30.811c-0.72,2.713-1.359,5.457-1.942,8.275l-0.856,4.37l-0.896,4.712l-3.657,18.836      c-2.482,12.555-5.054,25.102-7.74,37.637c-5.392,25.07-11.13,50.117-17.804,75.094c-3.342,12.49-6.912,24.964-10.894,37.424      c-4.01,12.459-8.332,24.906-13.672,37.386c-2.689,6.243-5.62,12.493-9.183,18.811c-1.791,3.16-3.741,6.339-6.027,9.559      c-2.305,3.218-4.893,6.491-8.4,9.807c-1.764,1.651-3.775,3.32-6.258,4.904c-2.478,1.569-5.475,3.087-9.156,4.056      c-3.646,0.979-8.033,1.25-12.133,0.455c-4.115-0.764-7.727-2.449-10.549-4.312c-2.844-1.88-5.02-3.928-6.832-5.93      c-1.809-2.009-3.26-3.997-4.525-5.957c-1.263-1.961-2.332-3.896-3.291-5.846c-0.479-0.977-0.93-1.954-1.359-2.958l-0.635-1.542      l-0.318-0.822l-0.395-1.092l-0.408-1.135l-0.234-1.351c-5.846-33.79-12.113-67.485-19.027-100.933      c-3.471-16.717-7.117-33.371-11.101-49.854c-4.021-16.454-8.335-32.823-13.461-48.481c-2.57-7.789-5.367-15.461-8.54-22.282      c-1.574-3.372-3.291-6.566-4.906-8.892c-0.786-1.147-1.568-2.053-1.953-2.41c-0.185-0.18-0.252-0.203-0.043-0.072      c0.203,0.121,0.734,0.43,1.657,0.662c0.905,0.24,2.203,0.316,3.261,0.133c1.07-0.172,1.818-0.518,2.166-0.711      c0.693-0.428,0.16-0.17-0.464,0.59c-0.658,0.748-1.507,1.911-2.35,3.245c-0.85,1.341-1.714,2.864-2.563,4.479      c-3.409,6.522-6.532,14.204-9.553,21.976c-3.023,7.814-5.963,15.871-9.029,24.016c-3.072,8.148-6.251,16.395-9.867,24.713      c-3.657,8.322-7.607,16.713-13.154,25.251c-2.822,4.261-6.029,8.602-10.53,12.862c-2.266,2.116-4.887,4.22-8.107,6.066      c-3.198,1.839-7.078,3.401-11.358,4.086c-0.532,0.087-1.068,0.16-1.608,0.219l-0.811,0.077l-0.981,0.065l-1.084,0.039l-0.926,0.021      c-1.236,0.025-2.477,0.031-3.719,0.018c-2.483-0.029-4.977-0.137-7.474-0.328c-4.992-0.382-9.997-1.109-14.94-2.198      c-9.891-2.165-19.492-5.845-28.254-10.688c-8.78-4.838-16.727-10.771-23.824-17.269c-7.108-6.502-13.42-13.541-19.165-20.806      c-11.476-14.562-20.797-29.966-29.374-45.39c-8.565-15.438-16.312-30.985-24.035-46.298c-7.73-15.303-15.441-30.389-23.813-44.775      c-8.366-14.367-17.432-28.064-27.83-39.98c-10.372-11.906-22.222-21.871-35.601-28.08c-6.68-3.116-13.719-5.312-21.02-6.553      c-7.299-1.246-14.852-1.543-22.496-1.025c-15.305,1.055-30.871,5.254-46.013,11.133c-1.894,0.738-3.784,1.5-5.667,2.291      l-2.803,1.195l-2.899,1.273l-11.935,5.208c-7.975,3.435-15.982,6.8-24.026,10.081c-32.177,13.119-64.931,24.987-98.358,34.914      c-33.444,9.832-67.579,17.749-102.329,22.449c-17.37,2.34-34.891,3.855-52.485,4.279c-17.59,0.414-35.26-0.325-52.807-2.476      c-17.541-2.155-34.967-5.769-51.879-11.167c-16.9-5.4-33.298-12.572-48.549-21.702c-15.256-9.108-29.367-20.097-41.887-32.598      c-12.536-12.491-23.48-26.462-32.792-41.349c-9.292-14.909-16.961-30.719-23.229-46.984c-6.255-16.276-11.168-33.004-14.819-49.959      c-3.665-16.953-6.174-34.113-7.646-51.332c-0.712-8.611-1.162-17.238-1.339-25.867c-0.087-4.313-0.105-8.628-0.045-12.94      c0.031-2.155,0.082-4.312,0.156-6.467l0.131-3.231l0.082-1.615l0.043-0.807l0.022-0.402c0.37,0.042-0.799-0.659,0.833,0.007      L1465.455,187.134z",
        color: "#2797D4",
        techs: [{
            title: gettext("SVG"),
            info: gettext("Family of specifications of an\nXML-based file format for\ntwo-dimensional vector graphics,\nboth static and dynamic."),
            url: "http://en.wikipedia.org/wiki/Scalable_Vector_Graphics",
            position: {x: 1470.777, y: 166}
        }],
        adaps: [{x: 2050, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 2423,
            y: 547.485,
            b: "Safari"
        }, {x: 2423, y: 622.443, b: "Firefox"}, {x: 2496, y: 697.193, b: "Chrome"}]
    }, {
        name: "Canvas",
        path: "M1820.038,263.429l20.651,52.458l20.814,52.316      c13.986,34.802,28.17,69.498,43.229,103.65c7.568,17.047,15.299,33.998,23.625,50.469c4.147,8.232,8.447,16.352,13.013,24.133      c2.242,3.807,4.764,7.866,7.184,11.807c2.444,3.957,4.901,7.889,7.384,11.777c4.979,7.758,10.004,15.43,15.281,22.515      c2.631,3.53,5.342,6.912,8.061,9.885c1.354,1.482,2.717,2.854,4.023,4.01c1.295,1.152,2.566,2.089,3.479,2.592      c0.448,0.249,0.799,0.39,0.93,0.417c0.136,0.033,0.026-0.048-0.356-0.092c-0.369-0.049-1.005-0.006-1.506,0.146      c-0.509,0.146-0.83,0.34-0.893,0.373c-0.126,0.097,0.533-0.559,1.18-1.68c0.672-1.117,1.399-2.642,2.068-4.322      c1.354-3.391,2.509-7.394,3.502-11.523c1.008-4.143,1.861-8.464,2.615-12.853l0.545-3.3l0.535-3.41l1.029-6.865l1.99-13.868      c1.301-9.289,2.668-18.624,4.104-27.977c2.876-18.709,6.053-37.488,10.09-56.272c2.023-9.393,4.261-18.789,6.857-28.183      c2.604-9.393,5.547-18.785,9.167-28.159c3.646-9.371,7.899-18.732,13.813-27.969c2.98-4.604,6.42-9.184,10.75-13.505      c4.315-4.29,9.639-8.396,16.221-11.198c3.269-1.398,6.826-2.421,10.453-2.963c3.63-0.55,7.312-0.594,10.826-0.235      c7.068,0.728,13.316,3.003,18.75,5.696c5.441,2.732,10.164,5.96,14.482,9.357c4.312,3.405,8.219,7.004,11.885,10.697      c7.314,7.396,13.702,15.161,19.67,23.076c5.822,7.723,11.395,15.367,16.928,23.113c22.037,30.929,42.836,62.233,64.094,92.971      c21.238,30.717,42.785,61.016,65.889,89.43c11.556,14.18,23.511,27.876,36.066,40.537c12.543,12.626,25.742,24.295,39.551,33.496      c6.893,4.584,13.928,8.516,20.926,11.44c6.996,2.929,13.928,4.82,20.508,5.446c6.592,0.638,12.811,0.032,18.846-1.804      c6.033-1.825,11.951-4.904,17.701-9.103c5.745-4.188,11.276-9.455,16.479-15.418c2.603-2.98,5.125-6.138,7.568-9.426l1.818-2.492      l1.834-2.6l3.961-5.674c10.52-15.151,20.776-30.562,30.916-46.149c20.299-31.167,40.055-63.06,60.971-94.902      c10.468-15.917,21.244-31.817,32.66-47.532c11.414-15.713,23.438-31.275,36.568-46.322c13.125-15.037,27.355-29.59,43.141-42.992      c15.766-13.394,33.136-25.614,52.031-35.676c18.865-10.09,39.236-17.893,60.151-23.06c20.921-5.191,42.321-7.717,63.403-8.101v70      c-16.456-0.395-32.652,0.864-48.345,4.052c-15.7,3.164-30.876,8.328-45.429,15.358c-14.555,7.025-28.479,15.943-41.745,26.344      c-13.271,10.396-25.883,22.251-37.951,35.041c-24.165,25.61-46.108,54.818-67.52,84.965c-21.411,30.191-42.341,61.431-64.146,92.449      c-10.896,15.514-22.005,30.984-33.455,46.285l-4.306,5.725l-2.343,3.066l-2.453,3.105c-3.316,4.123-6.813,8.179-10.541,12.129      c-7.453,7.891-15.828,15.416-25.528,21.922c-9.665,6.49-20.789,11.915-32.894,15.021c-12.076,3.146-24.942,3.783-36.981,2.137      c-12.081-1.618-23.292-5.317-33.442-9.989c-10.172-4.689-19.373-10.354-27.908-16.455c-17.039-12.262-31.562-26.213-44.996-40.655      c-13.402-14.478-25.647-29.551-37.299-44.882c-23.254-30.689-44.178-62.404-64.582-94.164      c-20.392-31.748-40.093-63.698-60.603-94.656c-5.123-7.711-10.343-15.431-15.591-22.87c-5.145-7.21-10.564-14.1-16.305-20.204      c-2.867-3.045-5.817-5.885-8.81-8.377c-2.987-2.488-6.028-4.625-8.942-6.186c-2.908-1.568-5.66-2.483-7.946-2.755      c-2.308-0.27-4.172-0.039-6.29,0.79c-2.1,0.826-4.461,2.407-6.825,4.686c-2.365,2.268-4.692,5.166-6.856,8.405      c-4.355,6.503-8.009,14.287-11.229,22.37c-3.211,8.116-5.973,16.636-8.451,25.312c-2.476,8.683-4.664,17.54-6.666,26.484      c-3.992,17.898-7.253,36.13-10.248,54.504l-4.391,27.701l-2.234,13.975l-1.172,7.042l-0.612,3.535l-0.661,3.637      c-0.912,4.849-1.949,9.729-3.238,14.688c-1.318,4.963-2.844,9.984-5.086,15.271c-1.141,2.647-2.455,5.366-4.273,8.231      c-1.847,2.838-4.131,5.947-8.016,8.88c-1.938,1.44-4.342,2.784-7.088,3.646c-2.735,0.874-5.742,1.194-8.453,0.991      c-2.728-0.19-5.143-0.831-7.205-1.61c-2.072-0.785-3.823-1.713-5.388-2.667c-3.11-1.924-5.506-3.957-7.665-5.976      c-2.146-2.024-4.025-4.057-5.779-6.09c-3.493-4.067-6.488-8.156-9.334-12.247c-5.648-8.187-10.652-16.402-15.461-24.662      c-2.403-4.127-4.756-8.257-7.078-12.387c-2.324-4.158-4.598-8.171-6.951-12.55c-4.598-8.606-8.742-17.267-12.701-25.966      c-7.846-17.419-14.938-34.984-21.633-52.667c-13.38-35.356-25.342-71.081-36.542-107.022c-5.612-17.965-10.948-36.012-16.112-54.103      c-2.613-9.034-5.102-18.108-7.57-27.185c-2.482-9.072-4.859-18.176-7.146-27.304L1820.038,263.429z",
        color: "#32B1BA",
        offset: {x: 0, y: -25},
        techs: [{
            title: gettext("Canvas"),
            info: gettext("HTML5 element that allows\nfor dynamic, scriptable rendering\nof 2D shapes and bitmap images"),
            url: "http://caniuse.com/#search=canvas",
            position: {x: 1819.131, y: 241}
        }],
        adaps: [{x: 2050, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 1904,
            y: 547.485,
            b: "Safari"
        }, {x: 1977, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
    }, {
        name: "XML",
        path: "M859.871,698.202c4.295-12.428,10.073-24.275,16.357-35.842      c6.301-11.565,13.358-22.736,20.959-33.545c15.224-21.605,32.755-41.675,52.064-59.946c19.344-18.238,40.446-34.71,62.927-49.096      c11.223-7.221,22.794-13.913,34.633-20.101c11.824-6.214,23.944-11.87,36.262-17.049c12.313-5.192,24.848-9.854,37.531-14.052      c6.346-2.1,12.71-4.078,19.144-5.951c6.646-1.895,12.984-3.477,19.37-5.1c12.724-3.209,25.313-6.377,37.768-9.833      c12.446-3.452,24.759-7.153,36.724-11.384c11.925-4.238,23.639-8.986,33.987-14.816c5.132-2.904,9.922-6.137,13.565-9.562      c0.9-0.854,1.732-1.711,2.453-2.558l0.521-0.632l0.628-0.793l1.334-1.741c1.81-2.399,3.62-4.945,5.419-7.539      c7.199-10.429,14.291-21.48,21.64-32.412c7.351-10.957,14.934-21.911,23.135-32.626c8.227-10.701,16.988-21.225,27.335-30.998      c5.197-4.867,10.801-9.557,17.24-13.726c6.432-4.124,13.774-7.863,22.532-9.718c2.18-0.455,4.437-0.783,6.749-0.936l1.651-0.086      l1.564-0.044c1.039-0.016,2.087-0.005,3.142,0.03c4.216,0.145,8.563,0.731,12.829,1.883c4.265,1.139,8.424,2.839,12.234,4.957      c3.821,2.115,7.287,4.629,10.392,7.316c6.209,5.403,11.017,11.396,15.185,17.352c4.159,5.977,7.696,11.988,11.006,17.953      c6.577,11.936,12.306,23.703,18.213,35.201c5.88,11.498,11.864,22.734,18.287,33.615c12.801,21.768,27.445,42.091,44.4,60.312      c16.918,18.237,36.042,34.357,56.779,48.275l32.759,21.428l40.836,17.746c46.666,11.479,133.705,32.808,177.252,61.324      c43.55,28.466,110.496,127.487,147.09,141.134c23.451,9.004,47.339,16.217,71.449,20.68c24.099,4.476,48.402,6.139,72.359,4.381      c23.959-1.721,47.53-6.885,70.212-15.077c22.699-8.157,44.501-19.306,65.244-32.534c20.751-13.234,40.459-28.52,59.231-45.104      c18.776-16.592,36.624-34.486,53.726-53.204c8.552-9.36,16.909-18.937,25.112-28.675c4.104-4.867,8.166-9.776,12.188-14.727      l1.507-1.857l1.349-1.686l3.144-3.941l6.328-7.819c16.978-20.762,34.728-40.875,53.289-60.311      c18.566-19.428,37.945-38.17,58.264-56.025c20.312-17.861,41.608-34.791,64.002-50.486c22.397-15.681,45.925-30.111,70.754-42.636      c24.815-12.521,50.992-23.079,78.408-30.674c27.39-7.593,56.073-12.145,85.139-12.526l0.527,59.963      c-23.352,0.06-46.893,3.469-70.028,9.618c-23.148,6.139-45.874,15.003-67.937,25.745c-22.063,10.765-43.449,23.461-64.091,37.515      c-20.649,14.054-40.546,29.487-59.772,45.845c-38.419,32.773-74.106,69.337-106.94,108.201l-6.111,7.319l-3.021,3.673l-1.746,2.112      l-1.61,1.922c-4.299,5.122-8.646,10.21-13.045,15.263c-8.802,10.102-17.823,20.047-27.077,29.819      c-18.511,19.534-37.97,38.372-58.71,56.042c-20.738,17.655-42.772,34.162-66.421,48.648c-23.63,14.472-48.933,26.904-75.712,35.982      c-26.748,9.086-54.962,14.656-83.314,16.103c-28.361,1.5-56.713-1.095-83.994-6.747c-27.314-5.644-53.596-14.232-78.811-24.508      c-53.969-21.939-130.772-134.818-152.445-149.716c-43.334-29.817-125.863-45.558-175.497-64.474l-40.148-18.364l-16.104-11.088      l-16.339-11.168c-22.464-15.583-43.293-33.752-61.555-54.186c-18.312-20.389-33.95-43.008-47.188-66.484      c-6.643-11.727-12.717-23.659-18.51-35.507c-5.805-11.829-11.311-23.634-17.145-34.671c-2.921-5.502-5.938-10.802-9.158-15.604      c-3.213-4.799-6.648-9.077-10.263-12.327c-3.631-3.263-7.316-5.423-11.398-6.604c-2.046-0.598-4.224-0.95-6.549-1.078      c-0.582-0.029-1.171-0.049-1.77-0.051c-0.3,0.004-0.4-0.007-0.89,0.008l-0.803,0.029c-0.956,0.045-1.95,0.173-2.979,0.373      c-4.11,0.779-8.752,2.855-13.325,5.739c-4.591,2.881-9.133,6.528-13.516,10.542c-8.78,8.074-16.963,17.563-24.76,27.474      c-7.802,9.938-15.23,20.376-22.559,31.017c-7.356,10.652-14.498,21.503-22.269,32.479c-1.958,2.746-3.963,5.502-6.12,8.291      l-1.672,2.125l-0.913,1.113c-0.351,0.426-0.708,0.828-1.067,1.232c-1.435,1.607-2.919,3.062-4.422,4.422      c-6.037,5.387-12.334,9.278-18.635,12.703c-12.629,6.744-25.417,11.527-38.233,15.805c-25.619,8.427-51.503,14.381-77.016,20.248      c-6.339,1.47-12.74,2.936-18.723,4.509c-6.175,1.658-12.357,3.436-18.483,5.319c-12.262,3.771-24.374,8.006-36.321,12.656      c-47.757,18.64-92.723,44.605-132.118,77.742c-19.713,16.531-38.034,34.815-54.603,54.676c-8.289,9.926-16.107,20.266-23.445,30.969      c-3.665,5.355-7.165,10.826-10.512,16.397c-3.359,5.562-6.557,11.245-9.401,17.087L859.871,698.202z",
        color: "#A7CF38",
        techs: [{
            title: gettext("XML"),
            info: gettext("A set of rules for encoding\ndocuments in machine-\nreadable form"),
            url: "http://en.wikipedia.org/wiki/XML",
            position: {x: 860.747, y: 705.668}
        }],
        adaps: [{x: 1355, y: 322.621, b: "Netscape"}, {x: 1303, y: 397.621, b: "Opera"}, {
            x: 1147,
            y: 472.621,
            b: "Internet Explorer"
        }, {x: 1853, y: 622.443, b: "Firefox"}, {x: 1676, y: 547.485, b: "Safari"}, {x: 2361, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS2",
        path: "M2868.351,773.327l-4.314-0.238l-4.431-0.299c-2.969-0.211-5.972-0.475-8.995-0.806      c-6.035-0.617-12.2-1.576-17.925-2.661c-5.749-1.079-10.879-2.281-15.658-3.243c-2.399-0.489-4.738-0.942-7.077-1.359      c-2.369-0.422-4.582-0.791-7.201-1.127c-9.739-1.288-19.722-2.256-29.671-2.82c-9.971-0.541-19.999-0.787-30.059-0.633      c-10.058,0.159-20.151,0.622-30.26,1.4c-10.104,0.811-20.225,1.904-30.354,3.245c-10.128,1.343-20.248,3.007-30.381,4.822      c-5.066,0.912-10.134,1.873-15.203,2.875c-5.063,1.025-10.13,2.093-15.199,3.192c-10.138,2.201-20.291,4.525-30.472,6.928      l-30.643,7.398c-20.553,4.852-41.286,9.893-62.747,13.321c-10.73,1.688-21.629,3.081-32.758,3.614      c-11.115,0.544-22.482,0.314-33.888-1.395c-11.386-1.676-22.819-4.891-33.459-9.994c-10.659-5.051-20.401-11.959-28.745-19.978      l-0.582-0.56l-0.35-0.426c-11.869-14.49-24.151-28.629-36.902-42.309c-12.753-13.676-25.959-26.916-39.748-39.492      c-27.533-25.173-57.199-48.028-89.272-66.743c-31.997-18.776-66.474-33.267-102.421-41.726      c-35.935-8.443-73.248-10.671-109.971-6.564c-18.361,2.023-36.59,5.482-54.49,10.288c-17.908,4.786-35.508,10.824-52.748,17.831      c-34.516,14.014-67.463,31.914-99.608,51.443c-8.049,4.875-16.062,9.844-24.091,14.85l-3.012,1.879      c-1.016,0.633-2.146,1.324-3.209,1.955c-2.162,1.285-4.371,2.532-6.639,3.724c-4.539,2.378-9.306,4.564-14.52,6.276      c-5.205,1.681-10.928,2.963-17.296,2.773c-3.167-0.102-6.483-0.619-9.703-1.68c-3.221-1.049-6.304-2.651-8.986-4.602      c-2.692-1.948-4.991-4.212-6.942-6.561c-1.952-2.354-3.574-4.795-4.981-7.242c-2.805-4.904-4.796-9.829-6.479-14.693      c-3.314-9.736-5.438-19.299-7.396-28.758c-1.93-9.457-3.604-18.813-5.347-28.082c-1.737-9.268-3.528-18.447-5.562-27.51      c-1.018-4.537-2.088-9.02-3.248-13.51l-3.572-13.65c-9.758-36.305-20.809-72.247-34.611-106.932      c-6.926-17.318-14.479-34.344-23.102-50.696c-8.62-16.334-18.276-32.054-29.508-46.259c-11.195-14.173-24.071-26.895-38.902-35.845      c-7.398-4.466-15.264-7.94-23.438-10.147c-8.17-2.218-16.638-3.154-25.156-2.855c-17.074,0.58-34.141,6.201-50.069,14.414      c-15.983,8.232-30.943,18.99-45.146,30.762c-14.209,11.807-27.586,24.806-40.572,38.27c-12.988,13.478-25.432,27.572-37.93,41.775      c-6.25,7.107-12.485,14.265-18.924,21.379c-1.611,1.779-3.238,3.555-4.89,5.323l-1.29,1.372l-1.345,1.373      c-0.972,0.967-1.921,1.861-2.919,2.753c-3.973,3.54-8.309,6.612-12.838,9.21c-9.077,5.201-18.801,8.552-28.473,10.845      c-9.691,2.291-19.379,3.599-28.938,4.612c-9.556,1.027-19.02,1.658-28.246,2.691c-4.607,0.518-9.158,1.131-13.561,1.994      c-2.199,0.434-4.364,0.919-6.462,1.504c-1.052,0.293-2.072,0.605-3.098,0.953l-3.317,1.145c-17.42,6.139-34.204,14.334-49.22,25.105      c-7.51,5.375-14.571,11.395-20.984,18.07c-6.416,6.671-12.167,13.997-17.169,21.836c-4.988,7.849-9.151,16.257-12.361,25.049      c-1.617,4.393-2.994,8.883-4.088,13.449c-1.068,4.561-1.947,9.223-2.28,13.879h-1.002c-0.071-4.818,0.437-9.566,1.185-14.297      c0.76-4.727,1.815-9.408,3.129-14.026c2.661-9.226,6.386-18.169,11.01-26.648c9.242-16.993,22.32-31.864,37.452-44.035      c15.192-12.167,32.39-21.628,50.396-28.866l3.345-1.325c1.199-0.468,2.426-0.907,3.639-1.306c2.434-0.797,4.866-1.471,7.294-2.05      c4.854-1.158,9.676-2.002,14.456-2.737c9.562-1.447,18.977-2.512,28.225-3.818c9.24-1.311,18.322-2.889,27.003-5.273      c8.667-2.379,16.947-5.553,24.194-10.025c3.623-2.229,6.977-4.775,9.994-7.635c0.747-0.709,1.498-1.464,2.184-2.189l1.105-1.201      l1.112-1.244l4.607-5.25c6.118-7.076,12.169-14.347,18.269-21.609c24.395-29.068,49.658-58.127,79.198-83.412      c14.767-12.609,30.674-24.25,48.317-33.57c8.822-4.637,18.096-8.658,27.838-11.662c9.73-3.004,19.951-4.972,30.373-5.428      c10.414-0.479,21.001,0.629,31.134,3.328c10.144,2.682,19.792,6.912,28.636,12.189c8.857,5.275,16.937,11.566,24.318,18.416      c7.384,6.857,14.084,14.279,20.261,22.014c12.314,15.518,22.577,32.234,31.674,49.377c9.073,17.166,16.984,34.8,24.083,52.682      c14.169,35.781,25.456,72.414,35.148,109.345l3.562,13.862c1.186,4.688,2.291,9.429,3.322,14.143      c2.063,9.438,3.85,18.869,5.555,28.234c1.708,9.362,3.324,18.669,5.136,27.787c1.823,9.098,3.815,18.08,6.578,26.305      c1.386,4.09,2.981,7.982,4.86,11.322c1.875,3.345,4.05,6.043,6.328,7.707c2.277,1.67,4.689,2.496,7.84,2.643      c3.125,0.141,6.829-0.525,10.622-1.737c3.804-1.211,7.706-2.933,11.568-4.924c1.933-0.997,3.86-2.063,5.778-3.185l2.873-1.72      l3.031-1.858c8.088-4.96,16.215-9.916,24.411-14.797c32.763-19.531,66.714-37.797,102.558-52.102      c35.783-14.325,73.493-24.678,112.148-28.842c19.312-2.072,38.818-2.593,58.24-1.473c19.423,1.122,38.746,3.943,57.688,8.316      c37.941,8.68,74.146,23.784,107.721,42.93c16.807,9.578,32.945,20.236,48.521,31.602c15.573,11.376,30.529,23.542,44.925,36.3      c28.786,25.532,55.456,53.272,80.334,82.433l-0.932-0.985c6.961,6.358,14.717,11.548,23.145,15.292      c8.432,3.734,17.506,6.051,26.93,7.143c9.426,1.08,19.17,1.01,29,0.15c9.832-0.875,19.764-2.443,29.693-4.512      c9.936-2.058,19.891-4.53,29.862-7.203c9.978-2.658,19.96-5.577,29.973-8.578l30.179-9.073c10.101-3.06,20.254-6.103,30.486-9.021      c40.884-11.754,83.113-21.727,126.757-26.495c10.902-1.181,21.879-2.097,32.912-2.593c11.054-0.514,22.074-0.717,33.284-0.477      c2.618,0.046,5.64,0.093,8.496,0.194c2.886,0.101,5.765,0.245,8.574,0.414c5.642,0.346,10.898,0.711,15.578,0.874      c4.701,0.171,9.013,0.073,13.474-0.191c2.226-0.146,4.474-0.341,6.756-0.576c1.142-0.117,2.289-0.258,3.445-0.4l3.559-0.464      L2868.351,773.327z",
        color: "#EE8B22",
        techs: [{
            title: gettext("CSS2"),
            info: gettext("A stylesheet language used\nto describe the presentation\nsemantics of a document"),
            url: "http://en.wikipedia.org/wiki/Cascading_Style_Sheets#CSS_2",
            position: {x: 1047.83, y: 604}
        }],
        adaps: [{x: 1355, y: 322.621, b: "Netscape"}, {x: 1303, y: 397.621, b: "Opera"}, {
            x: 1147,
            y: 472.621,
            b: "Internet Explorer"
        }, {x: 1676, y: 547.485, b: "Safari"}, {x: 1853, y: 622.443, b: "Firefox"}, {x: 2361, y: 697.193, b: "Chrome"}]
    }, {
        name: "AJAX",
        path: "M1146.496,548.555c-2.312-6.375-3.709-13.005-4.746-19.693      c-1.02-6.695-1.479-13.482-1.512-20.281c-0.073-13.603,1.807-27.264,5.439-40.482c1.811-6.611,4.055-13.115,6.691-19.465      c2.656-6.341,5.711-12.521,9.105-18.51c6.797-11.98,14.996-23.152,24.131-33.448c18.328-20.598,40.266-37.644,63.586-51.923      c11.671-7.156,23.721-13.645,36.018-19.564c12.295-5.928,24.826-11.317,37.527-16.219c12.695-4.912,25.54-9.4,38.504-13.459      c6.48-2.035,12.984-3.982,19.512-5.84c6.555-1.857,13.006-3.645,19.723-5.312c26.603-6.629,53.72-10.787,80.971-12.814      c13.627-1.021,27.294-1.473,40.966-1.377c13.672,0.082,27.351,0.703,41.003,1.941c13.652,1.236,27.281,3.07,40.83,5.711      c13.541,2.654,27.036,6.004,40.278,10.734c6.615,2.376,13.187,5.04,19.615,8.238c6.421,3.203,12.743,6.867,18.714,11.37      c1.493,1.122,2.964,2.298,4.402,3.536l1.973,1.707l1.979,1.75c2.598,2.314,5.148,4.691,7.656,7.121      c5.011,4.866,9.83,9.971,14.393,15.334c9.105,10.729,17.264,22.479,23.734,35.215c6.484,12.717,11.344,26.324,14.414,40.207      c3.109,13.885,4.517,27.965,5.033,41.782c0.526,13.831,0.186,27.431,0.08,40.681c-0.139,13.242-0.02,26.182,1.59,38.471      c1.553,12.291,4.777,23.85,10.352,34.113c5.49,10.303,13.357,19.32,22.781,27.036c9.75,7.931,20.293,15.201,31.143,20.521      c5.436,2.631,10.961,4.807,16.432,6.117c5.464,1.308,10.83,1.795,15.764,1.112c4.934-0.681,9.456-2.438,13.559-5.415      c4.104-2.956,7.758-7.098,10.865-11.934c3.123-4.831,5.721-10.318,7.896-16.09c2.174-5.779,3.942-11.852,5.397-18.062      c2.891-12.436,4.679-25.372,5.746-38.42c2.112-26.139,1.604-52.723-0.158-79.203c-0.428-6.625-0.978-13.248-1.586-19.867      l-0.956-9.928c-0.171-1.662-0.349-3.527-0.459-5.318c-0.112-1.802-0.183-3.612-0.204-5.43c-0.086-7.268,0.631-14.67,2.434-21.967      c1.8-7.287,4.797-14.451,9.082-20.914c4.265-6.471,9.873-12.148,16.339-16.529c6.458-4.406,13.747-7.488,21.265-9.247      c15.08-3.536,30.965-1.826,45.095,3.933c7.081,2.874,13.747,6.781,19.745,11.534c6.002,4.751,11.33,10.345,15.852,16.497      c4.522,6.154,8.216,12.875,11.083,19.871c1.436,3.498,2.665,7.065,3.706,10.672c0.519,1.805,0.991,3.617,1.419,5.438l1.185,4.675      c3.263,12.431,7.371,24.618,12.2,36.501c4.854,11.876,10.438,23.445,16.646,34.672c12.423,22.453,27.463,43.478,44.531,62.699      c17.048,19.24,36.018,36.778,56.305,52.427c10.107,7.869,20.6,15.198,31.31,22.06c10.724,6.832,21.704,13.17,32.88,18.734      c5.585,2.78,11.207,5.388,16.85,7.7c5.629,2.331,11.276,4.401,16.812,6.041c5.502,1.652,10.979,2.895,15.672,3.364l0.86,0.078      l1.045,0.077l2.236,0.148c1.497,0.089,2.996,0.157,4.496,0.212c3.001,0.104,6.009,0.136,9.021,0.095      c24.113-0.313,48.43-5.271,71.973-13.44c23.561-8.197,46.378-19.51,68.247-32.718c21.888-13.212,42.858-28.336,62.964-44.675      c20.164-16.283,39.443-33.828,57.996-52.204c4.651-4.584,9.255-9.224,13.824-13.921l6.842-7.095      c1.363-1.423,2.238-2.341,3.714-3.818l1.997-1.987l1.972-1.919c10.578-10.167,21.933-19.405,33.889-27.585      c11.945-8.196,24.398-15.471,37.212-21.806c12.802-6.357,25.913-11.884,39.233-16.599c13.312-4.737,26.799-8.764,40.408-12.07      c13.604-3.324,27.301-6.055,41.07-8.115c13.768-2.065,27.58-3.643,41.45-4.523c6.935-0.451,13.879-0.764,20.843-0.918      c3.481-0.077,6.968-0.115,10.462-0.109l5.248,0.042l1.314,0.021c0.219,0.014,0.438-0.033,0.658,0.119      c0.221,0.184,0.441,0.4,0.664,0.94c0.223,0.441,0.444,1.049,0.667,1.902c0.223,1.023,0.442,1.666,0.664,3.003      c0.221,1.236,0.439,2.476,0.656,4.681l0.64,5.84v1.002l-0.616,5.843c-0.201,2.205-0.401,3.445-0.599,4.684      c-0.197,1.336-0.396,1.983-0.592,3.009c-0.196,0.856-0.393,1.466-0.589,1.909c-0.196,0.543-0.394,0.762-0.591,0.951      c-0.198,0.157-0.398,0.114-0.598,0.132l-1.196,0.053l-4.795,0.251c-3.2,0.188-6.405,0.416-9.61,0.68      c-6.412,0.531-12.826,1.207-19.226,2.012c-12.796,1.641-25.548,3.67-38.154,6.278c-12.604,2.614-25.093,5.639-37.367,9.229      c-12.268,3.607-24.347,7.676-36.116,12.344c-11.757,4.69-23.238,9.891-34.273,15.752c-11.021,5.884-21.646,12.327-31.648,19.491      c-9.986,7.179-19.431,14.955-28.048,23.474l-1.608,1.603l-1.545,1.573l-3.262,3.409l-7.068,7.399      c-4.745,4.926-9.552,9.816-14.416,14.656c-19.51,19.317-39.986,37.784-61.543,55.11c-21.618,17.245-44.339,33.349-68.455,47.606      c-24.117,14.219-49.662,26.633-76.818,35.773c-13.569,4.566-27.532,8.313-41.828,10.932c-14.291,2.62-28.916,4.111-43.654,4.195      c-3.684,0.022-7.373-0.045-11.064-0.201c-1.845-0.08-3.689-0.18-5.535-0.303l-2.772-0.205l-1.458-0.121l-1.64-0.161      c-8.632-0.964-16.237-2.873-23.542-5.11c-14.521-4.563-27.695-10.574-40.35-17.282c-25.219-13.487-48.086-29.955-69.264-48.233      c-21.098-18.362-40.424-38.623-57.679-60.535c-17.206-21.934-32.431-45.488-44.698-70.593      c-6.131-12.547-11.484-25.484-15.945-38.723c-4.482-13.229-8.077-26.759-10.7-40.46l-0.488-2.597l-0.456-2.546      c-0.256-1.457-0.546-2.904-0.871-4.342c-0.652-2.871-1.45-5.695-2.402-8.454c-1.9-5.518-4.416-10.775-7.557-15.608      c-6.244-9.678-15.145-17.578-25.588-22.461c-10.406-4.889-22.383-6.643-33.532-4.461c-5.565,1.078-10.883,3.156-15.603,6.141      c-4.721,2.986-8.804,6.92-12.044,11.543c-3.249,4.623-5.608,9.951-7.138,15.627c-1.544,5.68-2.199,11.713-2.211,17.83      c-0.001,1.531,0.039,3.067,0.115,4.607c0.08,1.553,0.193,3.024,0.353,4.694l0.909,10.074c0.57,6.721,1.086,13.45,1.567,20.187      c1.829,26.949,2.921,54.035,1.656,81.384c-0.683,13.67-1.913,27.421-4.558,41.202c-1.325,6.889-2.989,13.791-5.241,20.654      c-2.263,6.855-5.081,13.702-8.959,20.299c-3.877,6.563-8.875,12.95-15.452,18.121c-6.523,5.184-14.688,8.865-23.002,10.207      c-8.324,1.406-16.552,0.812-24.127-0.826c-7.603-1.647-14.68-4.248-21.334-7.355c-6.652-3.117-12.932-6.688-18.904-10.594      c-2.986-1.949-5.903-3.975-8.759-6.059c-1.427-1.041-2.839-2.098-4.236-3.167c-1.393-1.066-2.774-2.142-4.206-3.312      c-5.659-4.616-11.035-9.742-15.898-15.427c-4.863-5.676-9.197-11.92-12.782-18.571c-3.591-6.65-6.378-13.705-8.452-20.843      c-2.078-7.144-3.441-14.371-4.315-21.515c-1.71-14.315-1.544-28.247-1.241-41.767c0.367-13.527,0.936-26.714,0.693-39.665      c-0.223-12.943-1.266-25.653-3.764-37.978c-2.49-12.315-6.413-24.244-11.961-35.465c-5.527-11.222-12.508-21.797-20.686-31.521      c-4.077-4.871-8.424-9.552-12.985-14.052c-2.284-2.248-4.616-4.455-7.001-6.614l-1.771-1.592l-1.812-1.592      c-1.099-0.947-2.246-1.863-3.428-2.753c-9.494-7.142-21.065-12.454-33.053-16.612c-12.049-4.118-24.646-7.172-37.43-9.414      c-12.793-2.236-25.776-3.73-38.82-4.655c-26.102-1.829-52.426-1.44-78.582,0.577c-26.158,2.043-52.199,5.732-77.746,11.385      c-6.318,1.413-12.828,3.004-19.207,4.62c-6.405,1.626-12.785,3.341-19.137,5.138c-12.699,3.611-25.306,7.518-37.743,11.865      c-12.435,4.355-24.719,9.1-36.769,14.346c-12.039,5.266-23.855,11.008-35.314,17.363c-22.876,12.725-44.473,27.877-62.812,46.424      c-9.167,9.254-17.473,19.359-24.578,30.282c-7.094,10.923-12.975,22.67-17.284,35.034c-4.296,12.363-7.001,25.334-7.979,38.504      c-0.485,6.586-0.491,13.219-0.077,19.84c0.449,6.607,1.306,13.25,2.965,19.674L1146.496,548.555z",
        color: "#5FBB4C",
        techs: [{
            title: gettext("AJAX"),
            info: gettext("A group of interrelated web\ndevelopment methods\nused to create interactives\nweb applications"),
            url: "http://en.wikipedia.org/wiki/Ajax_(programming)",
            position: {x: 1151.058, y: 553}
        }],
        adaps: [{x: 1676, y: 322.621, b: "Netscape"}, {x: 1147, y: 472.621, b: "Internet Explorer"}, {
            x: 1853,
            y: 622.443,
            b: "Firefox"
        }, {x: 2361, y: 697.193, b: "Chrome"}]
    }, {
        name: "Web Fonts",
        path: "M1208.807,800.334c1.567-5.715,3.647-11.248,5.896-16.72      c2.265-5.464,4.736-10.854,7.448-16.127c5.396-10.562,11.603-20.735,18.473-30.472c13.756-19.463,30.281-37.107,48.929-52.283      c18.641-15.19,39.396-27.881,61.393-37.838c10.985-5.014,22.305-9.284,33.803-12.97c11.499-3.687,23.205-6.712,35.023-9.126      c23.636-4.893,47.702-7.318,71.729-7.945c12.017-0.293,24.03-0.088,36.011,0.489c11.98,0.581,23.931,1.564,35.818,2.958      c11.894,1.349,23.753,3.146,35.396,5.029c11.681,1.9,23.324,3.975,34.942,6.146c23.232,4.366,46.361,9.136,69.373,14.325      c92.083,20.656,182.522,46.568,273.035,70.618c22.634,5.987,45.282,11.823,67.974,17.336c22.69,5.513,45.409,10.779,68.202,15.427      c22.79,4.65,45.65,8.732,68.56,11.787c22.899,3.037,45.872,5.084,68.681,5.204c22.768,0.089,45.483-1.714,66.898-7.28      c10.682-2.806,20.994-6.591,30.553-11.58c9.559-4.981,18.338-11.191,25.949-18.609c7.625-7.404,14.064-16.008,19.246-25.446      c5.189-9.438,9.137-19.683,12.049-30.327c2.902-10.655,4.765-21.707,5.884-32.905c0.558-5.601,0.925-11.242,1.134-16.906      c0.217-5.667,0.221-11.312,0.201-17.188c-0.086-23.305-0.783-46.709-1.24-70.244c-0.4-23.549-0.888-47.195,0.596-71.283      c0.803-12.056,2.033-24.215,5.033-36.707c1.555-6.241,3.553-12.602,6.939-18.992c1.706-3.183,3.795-6.381,6.514-9.377      c2.704-2.986,6.118-5.754,10.072-7.726c3.943-1.987,8.32-3.094,12.465-3.392c0.52-0.039,1.037-0.068,1.549-0.084l0.768-0.02      l0.67-0.006c0.75-0.002,1.58-0.004,2.496,0.018c1.824,0.047,4.029,0.179,6.502,0.738c2.462,0.543,5.159,1.601,7.479,3.096      c2.335,1.484,4.253,3.305,5.762,5.106c3.013,3.645,4.699,7.181,6.09,10.515c1.361,3.348,2.341,6.561,3.178,9.723      c0.836,3.158,1.51,6.26,2.102,9.336c1.172,6.148,2.014,12.197,2.717,18.215c1.385,12.029,2.207,23.932,2.83,35.807      c0.613,11.871,0.996,23.705,1.258,35.523l0.308,17.715l0.103,8.85l0.04,3.857l0.253,4.35c0.696,11.648,1.477,23.318,2.325,34.969      c1.708,23.297,3.653,46.584,6.271,69.645c1.317,11.512,2.776,23.008,4.67,34.16c0.954,5.537,2.025,11.086,3.354,15.967      c0.331,1.205,0.681,2.355,1.03,3.349c0.331,0.966,0.734,1.868,0.842,2.016c0.01,0.017,0.012,0.015,0-0.008      c0.023,0.032-0.107-0.178-0.002-0.015l0.52,0.769l1.055,1.495c0.715,0.98,1.453,1.93,2.206,2.841      c2.999,3.642,6.343,6.659,9.438,8.376c1.544,0.865,2.988,1.402,4.293,1.662c1.312,0.261,2.498,0.27,3.783,0.059      c2.525-0.398,5.725-1.973,9.021-4.691c3.293-2.691,6.564-6.332,9.601-10.383c6.104-8.156,11.346-17.863,16.038-27.901      c4.693-10.077,8.847-20.616,12.672-31.334c7.644-21.465,13.916-43.685,19.591-66.097c5.67-22.426,10.591-45.125,15.131-67.928      l-0.22,1.237l0.48-3.27l0.492-2.997c0.338-1.979,0.695-3.932,1.069-5.875c0.748-3.885,1.564-7.728,2.436-11.553      c1.737-7.648,3.706-15.216,5.893-22.727c4.377-15.014,9.618-29.797,15.807-44.266c12.335-28.91,28.477-56.767,49.705-81.303      c10.601-12.246,22.479-23.596,35.533-33.635c13.052-10.034,27.324-18.682,42.426-25.577c15.1-6.897,30.986-12.063,47.137-15.524      c16.16-3.463,32.571-5.188,48.866-5.569v47.35c-27.161-0.75-54.051,3.385-78.656,13.532c-24.626,10.047-46.891,25.965-65.466,46.1      c-18.644,20.089-33.804,44.016-45.766,69.658c-5.959,12.842-11.137,26.132-15.537,39.688c-2.197,6.776-4.201,13.623-5.983,20.498      c-0.887,3.438-1.717,6.885-2.477,10.318c-0.38,1.717-0.742,3.43-1.081,5.126l-0.486,2.521l-0.403,2.265l-0.221,1.243l0.001-0.006      c-5.365,23.078-11.183,46.09-17.656,69.007c-6.502,22.913-13.709,45.712-22.366,68.274c-4.358,11.274-9.1,22.484-14.604,33.549      c-5.545,11.055-11.724,22.006-19.903,32.503c-4.133,5.224-8.789,10.358-14.691,14.979c-2.955,2.299-6.246,4.459-9.991,6.254      c-3.733,1.789-7.964,3.195-12.498,3.807c-4.523,0.625-9.297,0.393-13.706-0.654c-4.424-1.033-8.45-2.803-11.966-4.9      c-7.046-4.245-12.23-9.582-16.583-15.051c-1.085-1.375-2.113-2.771-3.096-4.182c-0.491-0.706-0.971-1.416-1.439-2.13l-0.691-1.069      c-0.094-0.145-0.422-0.664-0.584-0.948c-0.198-0.338-0.376-0.66-0.537-0.966c-1.272-2.446-1.911-4.297-2.523-6.107      c-0.586-1.788-1.049-3.458-1.465-5.09c-1.62-6.48-2.626-12.498-3.56-18.539c-1.808-12.027-3.071-23.852-4.202-35.68      c-2.199-23.633-3.8-47.16-5.163-70.701c-0.673-11.77-1.274-23.53-1.794-35.319l-0.189-4.44c0.004,0.32-0.031-1.054-0.024-1.113      l0.005-0.547l0.008-1.096l0.014-2.188l0.035-8.754c0.016-5.833-0.011-11.663-0.066-17.488c-0.113-11.647-0.347-23.277-0.801-34.852      c-0.463-11.567-1.124-23.102-2.285-34.406c-0.587-5.645-1.302-11.236-2.263-16.627c-0.957-5.354-2.188-10.646-3.868-14.881      c-0.816-2.086-1.801-3.861-2.543-4.744c-0.367-0.449-0.621-0.653-0.762-0.75c-0.148-0.096-0.215-0.148-0.613-0.254      c-0.389-0.1-1.123-0.197-2.229-0.23l-1.904-0.027l-0.763,0.004l-0.648,0.028c-1.705,0.112-3.121,0.485-4.434,1.119      c-1.309,0.638-2.569,1.579-3.817,2.923c-1.243,1.336-2.438,3.056-3.518,5.033c-2.168,3.966-3.851,8.85-5.156,13.974      c-1.313,5.142-2.261,10.57-2.992,16.095c-0.733,5.529-1.253,11.166-1.643,16.85c-0.772,11.372-1.039,22.924-1.11,34.523      c-0.068,11.605,0.074,23.27,0.306,34.965c0.456,23.395,1.112,46.915,1.241,70.551c0.039,5.857,0.057,11.951-0.156,18.012      c-0.203,6.064-0.578,12.14-1.163,18.219c-1.171,12.153-3.18,24.332-6.383,36.346c-3.187,12.008-7.614,23.863-13.651,35.049      c-6.02,11.18-13.701,21.646-22.854,30.666c-9.133,9.043-19.673,16.594-30.878,22.537c-11.211,5.965-23.052,10.371-35.032,13.629      c-11.988,3.27-24.137,5.406-36.269,6.771c-12.136,1.365-24.265,1.959-36.333,2.039c-24.145,0.135-48.049-1.747-71.701-4.621      c-23.656-2.896-47.075-6.824-70.324-11.309c-46.504-8.975-92.319-20.223-137.889-31.938c-22.781-5.873-45.51-11.846-68.191-17.91      l-67.985-18.165c-22.645-6.037-45.293-11.979-67.972-17.72c-22.67-5.777-45.365-11.369-68.115-16.632      c-22.752-5.251-45.533-10.29-68.393-14.804c-11.428-2.27-22.876-4.4-34.334-6.43c-11.494-2.051-22.816-3.954-34.225-5.438      c-11.402-1.493-22.834-2.689-34.279-3.533c-11.447-0.834-22.909-1.267-34.361-1.305c-22.9-0.114-45.774,1.543-68.295,5.244      c-11.256,1.874-22.414,4.286-33.424,7.242c-11.01,2.968-21.84,6.572-32.462,10.721c-21.224,8.342-41.507,19.188-60.181,32.489      c-18.677,13.288-35.731,29.019-50.602,46.759c-7.44,8.865-14.326,18.236-20.586,28.047c-6.226,9.818-11.962,20.053-16.439,30.844      L1208.807,800.334z",
        color: "#9253A1",
        techs: [{
            title: gettext("Web Fonts"),
            info: gettext("Method of displaying fonts\ndownloaded from websites"),
            url: "http://www.w3.org/TR/css3-webfonts/",
            position: {x: 1213.268, y: 806}
        }],
        adaps: [{x: 2454, y: 398, b: "Opera"}, {x: 2641, y: 473, b: "Internet Explorer"}, {
            x: 2423,
            y: 547,
            b: "Safari"
        }, {x: 2423, y: 622, b: "Firefox"}, {x: 2496, y: 697, b: "Chrome"}]
    }, {
        name: "XMLHTTPRequest2",
        path: "M2866.373,345.848c-2.823,0.14-5.462,0.311-8.211,0.518      c-2.723,0.176-5.438,0.373-8.143,0.619c-5.41,0.49-10.781,1.147-16.077,2.02c-5.301,0.824-10.54,1.825-15.642,3.131      c-5.099,1.305-10.095,2.799-14.824,4.717c-4.725,1.916-9.2,4.187-13.233,6.854c-4.021,2.683-7.552,5.821-10.333,9.392      c-2.782,3.564-4.893,7.516-6.139,11.845c-0.634,2.159-1.06,4.401-1.304,6.718c-0.122,1.159-0.198,2.335-0.234,3.551      c-0.039,1.234-0.029,2.422-0.029,3.969l-0.062-1.023c0.905,8.438,1.649,16.911,2.097,25.432c0.35,8.525,0.502,17.092,0.112,25.689      c-0.413,8.594-1.236,17.221-2.773,25.812c-1.554,8.577-3.798,17.16-7.403,25.369c-3.58,8.176-8.713,16.008-15.628,22.043      c-3.433,3.017-7.207,5.633-11.222,7.691c-4.005,2.078-8.208,3.627-12.435,4.83c-4.223,1.234-8.491,2.094-12.742,2.744      c-2.127,0.322-4.251,0.594-6.369,0.826l-3.173,0.324l-1.583,0.145l-1.502,0.164c-7.802,0.914-15.415,3.426-21.937,7.672      c-6.55,4.222-11.975,10.12-16.163,16.871c-4.208,6.757-7.254,14.305-9.504,22.105c-2.261,7.819-3.686,15.883-4.771,24.1      l-0.389,2.904l-0.225,3.129l-0.462,6.262l-0.98,12.521c-1.363,16.697-2.974,33.389-5.307,50.072      c-1.2,8.339-2.604,16.678-4.712,24.969c-1.065,4.143-2.31,8.276-3.986,12.35c-1.713,4.044-3.77,8.149-7.256,11.655      c-1.741,1.726-3.938,3.251-6.464,4.098c-1.256,0.427-2.569,0.685-3.87,0.778c-1.285,0.082-2.521,0.037-3.764-0.116      c-2.494-0.304-4.967-1.155-7.109-2.401c-2.155-1.238-4-2.815-5.603-4.502c-3.196-3.4-5.531-7.213-7.561-11.073      c-2.014-3.874-3.686-7.842-5.192-11.843c-2.992-8.008-5.334-16.15-7.421-24.326c-2.072-8.18-3.878-16.401-5.522-24.643l-1.203-6.187      l-0.58-3.095l-0.285-1.549l-0.143-0.774l-0.135-0.917c-0.576-4.125-1.178-8.24-1.824-12.344c-1.293-8.205-2.764-16.363-4.588-24.41      c-1.826-8.044-4.008-15.982-6.793-23.652c-2.795-7.656-6.193-15.063-10.551-21.771c-0.547-0.841-1.099-1.658-1.68-2.486      l-1.785-2.498c-1.204-1.653-2.437-3.286-3.699-4.896c-2.525-3.22-5.162-6.354-7.906-9.394c-5.488-6.078-11.35-11.831-17.565-17.193      c-12.424-10.738-26.144-19.992-40.594-27.921c-14.46-7.927-29.655-14.548-45.257-20.001c-7.803-2.724-15.711-5.154-23.695-7.277      c-3.993-1.061-8.005-2.043-12.031-2.936c-4.003-0.882-8.116-1.714-12.037-2.324l-0.28-0.044l-0.211-0.062      c-34.804-10.119-69.013-22.378-102.134-37.14c-16.559-7.378-32.842-15.382-48.768-24.048c-15.937-8.646-31.48-18.018-46.549-28.098      c-30.137-20.143-58.48-43.047-83.867-68.914c-12.643-12.977-24.543-26.677-35.429-41.145c-5.438-7.234-10.624-14.66-15.472-22.303      c-4.821-7.66-9.412-15.459-13.221-23.715l0.914-0.406c4.17,7.938,9.145,15.482,14.309,22.818c5.158,7.354,10.621,14.484,16.332,21.4      c11.418,13.836,23.672,26.948,36.678,39.247c12.947,12.356,26.561,23.993,40.736,34.877c14.179,10.88,28.79,21.184,43.9,30.708      c7.547,4.772,15.201,9.371,22.954,13.799c7.743,4.441,15.552,8.77,23.466,12.9c15.819,8.279,31.98,15.9,48.406,22.904      c32.81,14.107,66.619,25.908,101.058,35.512l-1.105-0.236c1.261,0.188,2.264,0.361,3.37,0.556l3.213,0.597      c2.129,0.412,4.24,0.852,6.344,1.314c4.207,0.924,8.378,1.939,12.525,3.034c8.295,2.19,16.493,4.697,24.592,7.51      c16.185,5.646,32.02,12.448,47.117,20.778c15.09,8.318,29.502,18.065,42.639,29.461c6.558,5.703,12.82,11.787,18.6,18.332      c2.891,3.27,5.672,6.643,8.334,10.108c1.332,1.733,2.631,3.491,3.901,5.271l1.876,2.684c0.633,0.921,1.28,1.898,1.891,2.857      c4.912,7.738,8.552,15.957,11.485,24.242c2.919,8.299,5.126,16.698,6.943,25.096c1.815,8.4,3.238,16.807,4.472,25.188      c0.615,4.189,1.184,8.375,1.723,12.551l0.051,0.389l0.025,0.193c0.05,0.334-0.041-0.235-0.02-0.106l0.132,0.765l0.265,1.529      l0.54,3.057l1.119,6.1c1.529,8.121,3.224,16.189,5.117,24.162c1.915,7.959,4.073,15.835,6.763,23.347      c1.351,3.746,2.84,7.401,4.548,10.804c1.704,3.388,3.655,6.56,5.842,8.945c1.09,1.188,2.223,2.155,3.352,2.831      c1.134,0.681,2.244,1.083,3.495,1.271c0.632,0.092,1.314,0.127,1.884,0.104c0.539-0.027,1.028-0.113,1.506-0.261      c0.944-0.29,1.907-0.868,2.908-1.817c2.015-1.896,3.852-5.076,5.32-8.495c1.482-3.451,2.689-7.216,3.734-11.069      c2.082-7.728,3.569-15.815,4.851-23.949c2.521-16.301,4.201-32.881,5.72-49.473l1.083-12.459l0.514-6.236l0.252-3.121      c-0.021,0.207,0.045-0.502,0.05-0.499l0.027-0.191l0.056-0.384l0.11-0.771l0.223-1.557c1.177-8.371,2.741-16.891,5.215-25.192      c2.471-8.3,5.815-16.472,10.559-23.965c4.714-7.477,10.972-14.23,18.594-19.06c3.798-2.416,7.892-4.354,12.129-5.775      c4.249-1.424,8.586-2.34,13.013-2.833l6.223-0.595c2.039-0.215,4.067-0.463,6.08-0.759c4.024-0.594,7.992-1.376,11.84-2.478      c7.696-2.166,14.895-5.756,20.752-11.056c5.914-5.234,10.391-12.095,13.586-19.558c3.222-7.475,5.257-15.522,6.604-23.678      c1.345-8.166,2.024-16.47,2.304-24.792c0.261-8.326,0.016-16.673-0.437-25.005c-0.521-8.33-1.331-16.645-2.304-24.939l-0.004-0.027      v-0.033c-0.039-2.775-0.039-5.605,0.242-8.406c0.271-2.803,0.771-5.59,1.542-8.307c1.514-5.445,4.17-10.554,7.627-15.023      c3.453-4.484,7.733-8.293,12.408-11.453c4.691-3.148,9.745-5.723,14.959-7.864c5.221-2.142,10.623-3.786,16.073-5.204      c5.454-1.416,10.988-2.494,16.549-3.381c5.556-0.929,11.149-1.627,16.757-2.151c2.805-0.265,5.612-0.476,8.423-0.665      c2.795-0.218,5.654-0.398,8.425-0.545L2866.373,345.848z",
        color: "#DCE11F",
        offset: {x: 0, y: -35},
        techs: [{
            title: gettext("XMLHTTPRequest2"),
            info: gettext("Introduces new capabilities\nto a specification used to send\nHTTP or HTTPS requests directly\nto a web server and load the\nserver response data directly\nback into the script."),
            url: "http://www.html5rocks.com/en/tutorials/file/xhr2/",
            position: {x: 2032.542, y: 205}
        }],
        adaps: [{x: 2796, y: 397.621, b: "Opera"}, {x: 2547, y: 547.485, b: "Safari"}, {
            x: 2641,
            y: 622.443,
            b: "Firefox"
        }, {x: 2589, y: 697.193, b: "Chrome"}]
    }, {
        name: "HTML5",
        path: "M2248.5,816.16c-0.248-12.192,0.785-24.374,2.453-36.492      c1.696-12.119,4.265-24.147,7.615-36.018c3.424-11.846,7.732-23.504,13.049-34.791c5.326-11.279,11.748-22.151,19.354-32.278      c7.6-10.125,16.412-19.488,26.354-27.626c9.915-8.168,20.972-15.045,32.691-20.477c11.725-5.438,24.123-9.347,36.71-11.953      c6.3-1.288,12.651-2.232,19.017-2.896c3.183-0.327,6.369-0.583,9.555-0.771c1.593-0.095,3.186-0.17,4.778-0.23l4.549-0.142      l0.702-0.05l0.76-0.075c0.5-0.058,0.987-0.13,1.461-0.217c0.947-0.175,1.837-0.411,2.672-0.702c1.671-0.582,3.113-1.382,4.438-2.432      c2.634-2.067,4.911-5.37,6.646-9.605c1.735-4.22,2.902-9.198,3.61-14.419c0.712-5.231,0.99-10.725,0.973-16.3      c-0.019-5.58-0.334-11.252-0.855-16.95c-0.262-2.85-0.575-5.708-0.935-8.569l-1.159-8.986c-1.528-12.167-2.863-24.391-3.893-36.705      c-1.023-12.319-1.759-24.723-1.922-37.323c-0.076-6.302-0.006-12.655,0.309-19.102c0.322-6.45,0.869-12.986,1.928-19.747      c0.533-3.382,1.199-6.824,2.105-10.375c0.92-3.555,2.053-7.215,3.757-11.1c1.741-3.865,3.948-8.054,7.984-12.342      c2.024-2.118,4.582-4.241,7.746-5.933c3.142-1.698,6.881-2.859,10.516-3.212c3.644-0.372,7.09-0.013,10.056,0.684      c2.981,0.698,5.543,1.703,7.811,2.795c4.523,2.207,7.98,4.736,11.07,7.279c6.104,5.119,10.735,10.436,15.009,15.812l0.381,0.479      l0.495,0.781l1.072,1.694l0.945,1.531l1.811,3.014c1.183,2.001,2.328,3.997,3.449,5.999c2.242,4.004,4.389,8.029,6.46,12.088      c4.14,8.115,7.98,16.361,11.536,24.746c7.106,16.768,13.085,34.092,17.627,51.968c2.267,8.937,4.166,18.011,5.633,27.208      c0.366,2.299,0.705,4.606,1.017,6.92l0.444,3.477l0.395,3.339c0.496,4.181,1.026,8.411,1.585,12.603      c2.233,16.795,4.975,33.475,8.29,49.902c3.34,16.396,7.295,32.638,12.304,47.901c2.501,7.571,5.317,15.01,8.409,21.227      c0.768,1.536,1.548,2.979,2.299,4.228c0.742,1.238,1.484,2.305,1.969,2.877c0.234,0.281,0.401,0.43,0.344,0.344      c-0.074-0.087-0.334-0.434-1.381-1.156c-0.537-0.357-1.279-0.808-2.421-1.289c-1.126-0.468-2.669-0.961-4.638-1.188      c-1.947-0.231-4.301-0.119-6.454,0.426c-2.163,0.527-4.04,1.43-5.4,2.305c-1.365,0.869-2.296,1.725-2.933,2.371      c-0.645,0.665-1.029,1.172-1.294,1.531c-0.519,0.736-0.59,0.93-0.603,0.898c0.021-0.107,0.348-1.12,0.602-2.342      c0.27-1.244,0.525-2.766,0.738-4.393l0.314-2.666l0.344-3.139c0.904-8.42,1.736-17.035,2.609-25.705      c1.726-17.357,3.664-34.953,6.151-52.594c4.97-35.278,12.008-70.875,23.509-105.9c5.753-17.5,12.666-34.84,21.13-51.701      c8.45-16.855,18.462-33.248,30.342-48.564c11.867-15.307,25.636-29.52,41.153-41.773c15.503-12.258,32.691-22.527,50.764-30.432      c18.072-7.928,36.971-13.531,55.968-17.073c19.008-3.565,38.104-5.167,56.972-5.341v60c-15.814-0.164-31.442,0.877-46.593,3.414      c-15.146,2.543-29.811,6.551-43.657,12.232c-13.848,5.676-26.859,13.042-38.792,22.018c-11.938,8.967-22.821,19.516-32.523,31.368      c-9.71,11.847-18.262,24.956-25.729,38.913c-7.469,13.959-13.876,28.751-19.432,44.037c-11.092,30.621-18.646,63.146-24.331,96.383      c-2.851,16.64-5.215,33.473-7.513,50.57c-1.15,8.555-2.271,17.175-3.512,25.967l-0.475,3.313l-0.266,1.804l-0.314,1.973      c-0.449,2.658-0.989,5.403-1.754,8.371c-0.787,2.984-1.715,6.142-3.444,10.004c-0.896,1.948-1.972,4.074-3.725,6.594      c-0.879,1.253-1.938,2.611-3.334,4.061c-1.381,1.434-3.143,2.997-5.415,4.459c-2.271,1.463-5.146,2.82-8.361,3.613      c-3.205,0.81-6.657,0.989-9.682,0.64c-3.049-0.34-5.646-1.13-7.774-2.01c-2.145-0.89-3.841-1.866-5.285-2.817      c-2.861-1.912-4.752-3.707-6.338-5.347c-1.565-1.644-2.791-3.163-3.868-4.607c-2.135-2.884-3.704-5.499-5.108-8.026      c-1.391-2.523-2.578-4.946-3.668-7.328c-2.167-4.758-3.944-9.353-5.557-13.906c-1.606-4.551-3.031-9.049-4.346-13.529      c-5.207-17.896-8.843-35.568-11.852-53.268c-2.99-17.686-5.179-35.363-6.885-53.033c-0.424-4.424-0.812-8.818-1.176-13.267      l-0.254-3.134l-0.27-2.988c-0.193-1.992-0.412-3.986-0.655-5.98c-0.972-7.976-2.333-15.955-4.041-23.9      c-3.418-15.893-8.198-31.652-14.069-47.053c-2.936-7.699-6.146-15.311-9.617-22.781c-1.736-3.733-3.537-7.432-5.4-11.068      c-0.932-1.816-1.881-3.617-2.84-5.388l-1.443-2.618l-1.342-2.344l0.876,1.26c-3.076-4.225-6.384-8.139-9.47-10.918      c-1.514-1.376-2.988-2.435-3.888-2.931c-0.442-0.253-0.716-0.357-0.677-0.373c0.028-0.021,0.422,0.036,1.049-0.054      c0.62-0.078,1.407-0.351,1.87-0.643c0.479-0.287,0.634-0.51,0.546-0.465c-0.189,0.066-1.09,1.182-1.873,2.801      c-0.813,1.621-1.604,3.721-2.291,5.998c-0.688,2.287-1.287,4.77-1.801,7.348c-1.029,5.165-1.738,10.686-2.243,16.309      c-0.503,5.629-0.804,11.381-0.966,17.182c-0.32,11.609-0.105,23.41,0.402,35.249c0.512,11.843,1.326,23.737,2.338,35.645      l0.801,9.063c0.268,3.157,0.488,6.328,0.65,9.516c0.324,6.375,0.43,12.812,0.188,19.336c-0.246,6.522-0.826,13.133-2.019,19.857      c-1.211,6.716-3,13.583-6.151,20.451c-1.586,3.426-3.535,6.85-6.017,10.107c-2.47,3.252-5.507,6.332-9.062,8.869      c-3.544,2.546-7.588,4.496-11.699,5.698c-2.057,0.606-4.127,1.04-6.17,1.32c-1.023,0.14-2.039,0.242-3.046,0.312l-1.505,0.081      l-1.565,0.034l-4.528-0.058c-1.434-0.009-2.865-0.005-4.296,0.017c-2.862,0.041-5.718,0.144-8.567,0.309      c-5.699,0.334-11.365,0.934-16.976,1.807c-11.227,1.715-22.22,4.625-32.727,8.78c-10.517,4.137-20.499,9.612-29.753,16.229      c-9.238,6.641-17.727,14.447-25.324,23.16c-7.609,8.708-14.331,18.304-20.253,28.455c-5.935,10.15-10.999,20.894-15.333,31.976      c-4.401,11.063-7.981,22.503-10.973,34.133c-1.498,5.815-2.811,11.688-3.943,17.606c-1.158,5.912-2.131,11.879-2.816,17.873  L2248.5,816.16z",
        color: "#32B1BA",
        techs: [{
            title: gettext("HTML5"),
            info: gettext("The fifth revision of the\nHyperText Markup Language"),
            url: "http://en.wikipedia.org/wiki/Html5",
            position: {x: 2251.746, y: 823}
        }],
        adaps: [{x: 2454, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 2547,
            y: 547.485,
            b: "Safari"
        }, {x: 2423, y: 622.443, b: "Firefox"}, {x: 2579, y: 697.193, b: "Chrome"}]
    }, {
        name: "RegisterProtocalHandler",
        path: "M2300.531,897.604      c-1.689-11.967-2.993-23.979-4.129-36.016c-1.118-12.035-2.088-24.096-2.744-36.181c-1.336-24.167-1.896-107.797-1.119-132.114      c0.875-24.305,2.9-48.697,7.715-72.97c2.453-12.121,5.58-24.237,10.197-36.098c2.312-5.927,4.99-11.792,8.223-17.493      c3.234-5.693,7.032-11.237,11.65-16.334c4.607-5.085,10.09-9.718,16.42-13.256c6.309-3.553,13.43-5.909,20.611-6.879      c7.193-0.989,14.381-0.672,21.199,0.473c6.834,1.146,13.339,3.085,19.532,5.46c6.196,2.381,12.095,5.204,17.765,8.29      c2.834,1.543,5.612,3.154,8.342,4.82c2.732,1.658,5.438,3.432,7.91,5.023c10.112,6.518,20.25,12.998,30.41,19.424      c20.32,12.848,40.739,25.493,61.317,37.733c20.578,12.226,41.32,24.087,62.299,35.001c10.487,5.445,21.038,10.648,31.624,15.381      c10.572,4.715,21.231,9.01,31.636,12.189c5.185,1.58,10.312,2.863,15.075,3.621c4.718,0.77,9.198,0.918,11.959,0.398      c1.374-0.237,2.212-0.617,2.436-0.822c0.242-0.23-0.062-0.137-0.126-0.157c-0.085-0.021,0.099-0.368,0.326-1.354      c0.228-0.962,0.438-2.475,0.496-4.283c0.029-0.906,0.025-1.887-0.014-2.918l-0.155-4.184c-0.125-2.848-0.282-5.771-0.452-8.721      l-1.101-17.959c-0.751-12.094-1.446-24.326-1.938-36.616c-0.987-24.588-1.204-49.44,0.062-74.512      c1.299-25.065,3.968-50.396,9.438-75.819c2.741-12.706,6.181-25.438,10.624-38.091c4.448-12.646,9.905-25.228,16.791-37.437      c6.876-12.195,15.233-24.024,25.319-34.758c10.066-10.727,21.902-20.289,34.96-27.826c13.042-7.571,27.196-13.089,41.479-16.62      c14.302-3.556,28.707-5.179,42.779-5.487v64c-10.038-0.295-19.799,0.352-29.029,2.144c-9.237,1.784-17.939,4.694-26.008,8.813      c-8.072,4.109-15.522,9.456-22.323,15.967c-6.795,6.51-12.927,14.182-18.339,22.731c-10.853,17.117-18.786,37.509-24.551,58.971      c-5.758,21.513-9.517,44.153-11.91,67.17c-2.4,23.037-3.466,46.471-3.773,70.113c-0.156,11.829-0.115,23.709-0.01,35.72      l0.146,18.201c0.013,3.077,0.016,6.182-0.015,9.363l-0.08,4.862c-0.042,1.983-0.15,4.019-0.352,6.118      c-0.416,4.199-1.177,8.678-2.768,13.471c-1.58,4.758-4.095,9.923-7.989,14.591c-3.847,4.683-9.063,8.532-14.274,10.868      c-5.233,2.381-10.331,3.457-14.937,3.93c-4.63,0.467-8.852,0.344-12.812-0.018c-3.959-0.371-7.657-1.002-11.204-1.765      c-7.08-1.54-13.57-3.597-19.812-5.862c-12.45-4.562-23.926-9.971-35.101-15.674c-11.153-5.719-21.943-11.781-32.553-18.027      c-21.2-12.507-41.69-25.729-61.91-39.242c-20.208-13.525-40.112-27.37-59.864-41.381c-9.875-7.008-19.707-14.056-29.514-21.142      c-2.506-1.812-4.764-3.464-7.109-5.059c-2.34-1.601-4.705-3.141-7.095-4.608c-4.778-2.934-9.661-5.577-14.62-7.785      c-9.895-4.414-20.209-7.065-29.82-6.252c-4.801,0.396-9.41,1.646-13.742,3.777c-4.332,2.123-8.385,5.13-12.07,8.788      c-7.391,7.343-13.225,17.069-17.9,27.435c-4.671,10.413-8.324,21.54-11.283,32.912c-5.895,22.795-9.266,46.51-11.475,70.32      c-2.222,23.836-3.261,107.238-3.454,131.295c-0.199,24.059,0.29,48.17,1.726,72.24L2300.531,897.604z",
        color: "#32B1BA",
        techs: [{
            title: gettext("RegisterProtocalHandler"),
            info: gettext("Method that allows web sites\nto register themselves as possible\nhandlers for particular protocols."),
            url: "https://developer.mozilla.org/en/DOM/navigator.registerProtocolHandler",
            position: {x: 2302.008, y: 905},
            background: !0
        }],
        adaps: [{x: 2734, y: 397.621, b: "Opera"}, {x: 2299, y: 622.443, b: "Firefox"}, {
            x: 2692,
            y: 697.193,
            b: "Chrome"
        }]
    }, {
        name: "Geolocation",
        path: "M2362.855,873.505c-0.217-10.991-0.206-21.983-0.018-32.976      c0.176-10.992,0.484-21.986,0.934-32.982c0.424-10.996,1.117-21.984,1.93-32.971c0.824-10.986,1.819-21.971,3.045-32.945      c2.477-21.944,5.72-43.887,11.274-65.608c2.814-10.853,6.141-21.677,10.976-32.261c2.455-5.275,5.281-10.504,8.969-15.488      c1.852-2.486,3.922-4.912,6.344-7.164c2.42-2.246,5.207-4.328,8.429-5.954c3.208-1.624,6.87-2.745,10.606-3.085      c3.738-0.357,7.47,0.047,10.883,0.936c6.863,1.822,12.476,5.264,17.399,8.973c8.848,6.766,17.481,13.771,25.954,20.928      c8.474,7.148,16.775,14.463,25.003,21.681c4.114,3.604,8.212,7.183,12.311,10.618c4.091,3.422,8.213,6.752,12.24,9.501      c1.999,1.36,3.997,2.572,5.726,3.372c0.856,0.397,1.641,0.684,2.194,0.816c0.555,0.143,0.849,0.108,0.681,0.086      c-0.143-0.033-0.752,0.105-1.032,0.289c-0.298,0.169-0.239,0.184-0.022-0.173c0.462-0.7,1.215-2.501,1.74-4.53      c1.104-4.153,1.737-9.241,2.154-14.344c0.414-5.141,0.615-10.436,0.715-15.768c0.189-10.674-0.012-21.523-0.329-32.382      c-0.325-10.86-0.805-21.752-1.349-32.665c-1.09-21.83-2.453-43.737-3.5-65.8c-1.011-22.087-1.861-44.247-0.838-67.087      c0.277-5.72,0.691-11.492,1.385-17.381c0.709-5.896,1.648-11.889,3.332-18.205c0.853-3.162,1.896-6.413,3.387-9.822      c1.514-3.399,3.432-7.021,6.604-10.701c1.59-1.826,3.533-3.654,5.899-5.252c2.354-1.596,5.145-2.925,8.057-3.714      c2.911-0.802,5.875-1.071,8.575-0.961c2.711,0.108,5.17,0.562,7.389,1.163c4.431,1.227,7.968,2.975,11.125,4.789      c3.152,1.831,5.903,3.783,8.483,5.778c2.57,1.998,4.95,4.046,7.222,6.124c1.136,1.038,2.241,2.084,3.324,3.138l2.982,2.904      l23.529,23.024c7.81,7.6,15.596,15.102,23.454,22.145c7.86,7.035,15.792,13.585,23.936,19.008      c8.145,5.449,16.483,9.71,25.411,12.721c8.911,3.033,18.466,4.876,28.468,5.965c9.999,1.086,20.392,1.436,30.929,1.422l8.041-0.071      l8.219-0.101l16.438-0.217l65.743-0.971l0.289,37.748c-22.011-0.07-43.966-0.146-65.951-0.369l-16.485-0.164l-8.243-0.09      l-8.421-0.121c-11.405-0.254-22.976-0.881-34.772-2.436c-11.771-1.561-23.862-4.109-35.65-8.432      c-11.791-4.273-23.017-10.381-32.919-17.412c-9.939-7.037-18.733-14.795-27.016-22.615c-8.278-7.84-16.082-15.795-23.792-23.716      l-22.901-23.668l-2.836-2.917c-0.86-0.885-1.724-1.748-2.591-2.586c-1.731-1.675-3.476-3.254-5.199-4.673      c-1.719-1.412-3.43-2.677-4.998-3.647c-1.558-0.979-3.002-1.646-3.857-1.918c-0.422-0.138-0.678-0.182-0.709-0.199      c-0.04-0.019,0.16-0.033,0.419-0.125c0.259-0.086,0.529-0.242,0.601-0.318c0.08-0.078-0.025-0.047-0.252,0.182      c-0.461,0.447-1.293,1.648-2.04,3.238c-0.762,1.597-1.485,3.557-2.117,5.676c-1.272,4.258-2.216,9.107-2.946,14.087      c-0.729,4.993-1.249,10.163-1.645,15.396c-0.784,10.477-1.084,21.209-1.189,31.996c-0.109,10.793-0.035,21.664,0.136,32.568      c0.341,21.814,1.009,43.762,1.407,65.805c0.2,11.023,0.336,22.074,0.316,33.16c-0.029,11.088-0.17,22.195-0.727,33.459      c-0.287,5.635-0.676,11.305-1.326,17.088c-0.688,5.805-1.499,11.648-3.401,18.062c-0.491,1.611-1.069,3.27-1.825,5.004      c-0.758,1.732-1.689,3.559-3.039,5.469c-1.346,1.893-3.198,3.949-5.809,5.606c-2.588,1.673-5.901,2.663-8.783,2.771      c-2.912,0.143-5.366-0.353-7.443-0.964c-2.085-0.627-3.841-1.404-5.447-2.213c-3.195-1.631-5.82-3.408-8.305-5.205      c-4.923-3.609-9.217-7.348-13.43-11.096c-4.195-3.752-8.246-7.525-12.272-11.283c-8.039-7.518-15.978-14.971-24.057-22.238      c-8.071-7.269-16.268-14.361-24.646-21.199c-3.678-3.047-7.6-5.49-11.348-6.635c-3.766-1.148-7.127-1.008-10.576,0.529      c-3.452,1.529-6.867,4.578-9.857,8.291c-3.007,3.723-5.64,8.082-7.993,12.662c-4.71,9.199-8.384,19.276-11.537,29.529      c-3.151,10.274-5.741,20.801-8.073,31.408c-2.338,10.609-4.356,21.322-6.155,32.087c-3.612,21.532-6.267,43.27-8.578,65.058      c-2.317,21.791-4.058,43.665-5.358,65.573L2362.855,873.505z",
        color: "#32B1BA",
        techs: [{
            title: gettext("Geolocation"),
            info: gettext("Method of informing a\nwebsite of the user's\ngeographical location with\nthe user's consent"),
            url: "http://www.html5rocks.com/en/tutorials/geolocation/trip_meter/",
            position: {x: 2366.442, y: 872}
        }],
        adaps: [{x: 2558, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 2547,
            y: 547.485,
            b: "Safari"
        }, {x: 2423, y: 622.443, b: "Firefox"}, {x: 2537, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS3 Transitions",
        path: "M2393.495,812.235c-18.162-20.358-35.588-41.388-52.273-63.038  c-16.697-21.645-32.665-43.912-47.27-67.234c-7.291-11.668-14.24-23.604-20.549-35.997c-3.143-6.202-6.111-12.525-8.83-19.015  c-2.713-6.49-5.196-13.141-7.196-20.062c-1.997-6.919-3.587-14.096-4.228-21.689c-0.309-3.795-0.344-7.701,0.012-11.701  c0.368-3.996,1.152-8.104,2.59-12.167c1.428-4.055,3.548-8.055,6.346-11.575c2.795-3.521,6.216-6.531,9.877-8.867  c3.662-2.357,7.537-4.075,11.398-5.37c3.867-1.285,7.736-2.142,11.556-2.73l0.323-0.05l0.578-0.033  c4.059-0.229,8.039,0.156,11.781,0.936c3.748,0.781,7.275,1.943,10.604,3.312c6.65,2.763,12.542,6.305,18.027,10.113  c10.939,7.67,20.376,16.408,29.357,25.363c8.952,8.98,17.364,18.266,25.583,27.608c8.21,9.349,16.231,18.753,24.171,28.116  c7.955,9.348,15.893,18.615,23.998,27.527c4.055,4.453,8.15,8.816,12.316,13.008c2.082,2.098,4.184,4.147,6.303,6.142  c1.069,1.003,2.112,1.968,3.178,2.921c1.012,0.902,2.084,1.832,3.141,2.709c4.244,3.529,8.672,6.691,13.115,9.143  c4.403,2.453,8.949,4.149,12.462,4.518c1.749,0.197,3.137,0.06,4.102-0.229c0.974-0.305,1.61-0.669,2.387-1.387  c0.761-0.713,1.626-1.873,2.417-3.494c0.795-1.61,1.494-3.635,2.037-5.868c1.094-4.495,1.575-9.769,1.635-15.195l0.002-2.051  l-0.02-2.269l-0.047-4.602l-0.104-9.209l-0.56-36.846c-0.439-24.569-0.992-49.148-1.613-73.73l-2.05-73.763l-1.099-36.932  l-0.247-9.326l-0.046-2.437l-0.008-0.66l0.025-1.226c0.03-0.769,0.069-1.358,0.129-2.03c0.234-2.604,0.711-5.052,1.34-7.359  c1.269-4.614,3.123-8.68,5.287-12.391c2.174-3.706,4.678-7.057,7.455-10.128c5.566-6.113,12.217-11.222,20.19-14.841  c3.984-1.793,8.317-3.18,12.939-3.928c4.612-0.75,9.521-0.839,14.371-0.088c4.851,0.736,9.597,2.316,13.839,4.505  c4.255,2.185,8.007,4.936,11.23,7.913c6.459,5.995,10.921,12.738,14.424,19.393c3.486,6.686,6.012,13.396,8.052,20.05  c1.015,3.329,1.902,6.647,2.688,9.954c0.394,1.653,0.763,3.305,1.108,4.953l0.954,4.746c2.393,12.115,4.736,24.127,7.214,36.049  c2.476,11.919,5.073,23.745,7.938,35.408c2.867,11.658,5.992,23.168,9.594,34.296c3.604,11.096,7.693,21.92,12.608,31.416  c2.447,4.717,5.132,9.086,7.904,12.555c1.38,1.729,2.776,3.215,4.073,4.352c1.297,1.138,2.479,1.9,3.379,2.316  c0.915,0.416,1.496,0.528,2.073,0.559c0.576,0.019,1.265-0.037,2.341-0.359c2.13-0.604,5.544-2.531,8.978-5.436  c3.465-2.892,7.014-6.602,10.416-10.687c1.721-2.063,3.351-4.147,5.063-6.444c1.791-2.388,3.55-4.773,5.296-7.182  c6.979-9.623,13.615-19.44,19.878-29.478c6.272-10.041,12.141-20.289,17.809-30.851c2.841-5.284,5.638-10.647,8.517-16.144  c2.888-5.494,5.841-11.124,9.219-16.968c3.39-5.827,7.213-11.942,12.236-18.056c2.509-3.043,5.329-6.062,8.468-8.889  c3.134-2.828,6.583-5.445,10.191-7.713c7.243-4.568,14.941-7.639,22.24-9.738c7.333-2.105,14.389-3.358,21.231-4.257  c13.679-1.745,26.641-2.155,39.433-2.292v43c-11.815-0.096-23.515,0.137-34.29,1.332c-5.369,0.602-10.478,1.465-15.002,2.682  c-4.543,1.217-8.391,2.766-11.611,4.707c-3.23,1.945-6.021,4.351-8.913,7.719c-2.874,3.344-5.749,7.609-8.617,12.371  c-2.871,4.763-5.741,9.982-8.671,15.334c-2.928,5.357-5.918,10.859-9.003,16.363c-6.166,11.025-12.728,22.042-19.69,32.761  c-6.958,10.729-14.304,21.193-21.958,31.367c-1.911,2.541-3.85,5.076-5.797,7.58c-2.012,2.601-4.224,5.328-6.493,7.951  c-4.58,5.275-9.601,10.476-15.677,15.373c-3.05,2.439-6.375,4.805-10.163,6.951c-3.78,2.139-8.048,4.078-12.922,5.404  c-4.85,1.328-10.377,1.963-15.936,1.422c-5.561-0.514-10.971-2.22-15.556-4.559c-4.609-2.34-8.453-5.227-11.72-8.211  c-3.266-2.997-5.989-6.114-8.393-9.238c-4.784-6.26-8.365-12.555-11.487-18.805c-6.164-12.508-10.493-24.912-14.292-37.279  c-3.76-12.366-6.859-24.691-9.657-36.99c-2.789-12.297-5.255-24.567-7.57-36.796c-2.315-12.226-4.471-24.419-6.636-36.495  l-0.79-4.32c-0.264-1.367-0.544-2.725-0.84-4.07c-0.593-2.691-1.256-5.332-1.992-7.904c-1.475-5.137-3.269-10.011-5.408-14.28  c-2.127-4.265-4.641-7.892-7.191-10.324c-1.271-1.222-2.529-2.144-3.738-2.8c-1.213-0.658-2.377-1.066-3.607-1.288  c-2.418-0.446-5.4-0.111-8.719,1.294c-3.285,1.384-6.698,3.804-9.457,6.742c-2.766,2.893-4.884,6.444-5.658,9.118  c-0.198,0.656-0.316,1.239-0.374,1.7l-0.03,0.271c-0.001,0.023-0.002-0.104-0.006,0.047c0-0.086-0.012,0.599-0.004-0.119  l-0.004,0.494l0.001,2.18l0.073,9.135l0.421,36.908l0.696,73.922c0.17,24.648,0.271,49.302,0.26,73.968l-0.119,37.008l-0.064,9.256  l-0.038,4.629l-0.022,2.349l-0.05,2.564c-0.22,6.866-0.873,13.935-2.81,21.384c-0.988,3.723-2.311,7.553-4.312,11.43  c-1.998,3.854-4.732,7.815-8.561,11.222c-3.787,3.414-8.721,6.058-13.715,7.272c-5.005,1.254-9.885,1.254-14.229,0.651  c-4.367-0.608-8.293-1.789-11.916-3.206c-3.619-1.428-6.943-3.109-10.074-4.93c-6.253-3.651-11.765-7.844-16.887-12.292  c-1.287-1.118-2.516-2.231-3.773-3.406c-1.205-1.126-2.396-2.278-3.546-3.407c-2.313-2.275-4.566-4.576-6.77-6.896  c-4.409-4.64-8.634-9.352-12.763-14.094c-8.25-9.488-16.115-19.105-23.904-28.682c-15.576-19.119-30.655-38.377-47.018-55.822  c-8.176-8.67-16.686-16.941-25.735-23.683c-4.515-3.35-9.179-6.285-13.849-8.386c-4.665-2.1-9.293-3.285-13.471-3.178l0.901-0.083  c-5.847,0.683-11.304,2.174-15.54,4.69c-4.248,2.512-7.234,5.965-9.128,10.626c-1.897,4.647-2.545,10.409-2.321,16.401  c0.199,6.011,1.223,12.272,2.701,18.514c2.99,12.512,7.643,24.996,12.973,37.213c5.328,12.242,11.387,24.273,17.835,36.125  c6.456,11.852,13.321,23.524,20.448,35.055c7.125,11.533,14.479,22.951,22.056,34.23c7.565,11.289,15.368,22.429,23.269,33.51  c7.925,11.062,15.994,22.037,24.332,32.802L2393.495,812.235z",
        color: "#9253A1",
        techs: [{
            title: gettext("CSS3\nTransitions"),
            info: gettext("Allow property changes in CSS\nvalues to occur smoothly over\na specified duration"),
            url: "http://www.w3.org/TR/css3-transitions/",
            position: {x: 2400, y: 827},
            background: !0
        }],
        adaps: [{x: 2516, y: 397.621, b: "Opera"}, {x: 2267, y: 547.485, b: "Safari"}, {
            x: 2641,
            y: 622.443,
            b: "Firefox"
        }, {x: 2496, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS3 Flexbox",
        path: "M2435.079,885.279c4.832-9.129,10.522-17.736,16.604-26.068      c6.05-8.357,12.53-16.416,19.376-24.168c13.692-15.499,28.644-29.964,44.642-43.258c31.946-26.688,68.059-48.598,106.318-65.852      c38.297-17.227,78.662-30.08,119.882-38.977c10.306-2.234,20.668-4.219,31.067-5.993c10.397-1.795,20.837-3.357,31.306-4.712      c20.938-2.707,41.987-4.559,63.076-5.738v48c-19.959-1.181-39.962-1.578-59.956-1.177c-19.995,0.386-39.982,1.612-59.875,3.824      c-39.768,4.401-79.287,12.421-117.38,25.346c-38.075,12.864-74.82,30.417-108.374,53.292c-16.728,11.477-32.653,24.27-47.21,38.56      c-7.271,7.146-14.251,14.614-20.793,22.466c-3.247,3.945-6.389,7.979-9.393,12.117c-2.999,4.135-5.889,8.379-8.406,12.807      L2435.079,885.279z",
        color: "#9253A1",
        techs: [{
            title: gettext("CSS3 Flexbox"),
            info: gettext("A layout mode which is designed\nfor laying out more complex\napplications and webpages"),
            info: gettext("A flexible layout mode which\nallows for designing and laying\nout more complex applications\nand webpages."),
            url: gettext("http://dev.w3.org/csswg/css3-flexbox/"),
            position: {x: 2436, y: 887}
        }],
        adaps: [{x: 2755, y: 697.193, b: "Chrome"}]
    }, {
        name: "IndexedDB",
        path: "M2456.172,953.301c4.076-9.141,8.514-18.102,13.108-26.992      c4.605-8.883,9.413-17.666,14.415-26.346c10.011-17.355,20.791-34.307,32.526-50.649c11.743-16.331,24.438-32.076,38.508-46.717      c14.077-14.605,29.541-28.181,47.074-39.296l-0.614,0.41c7.84-6.231,15.652-12.389,22.266-18.992      c3.296-3.303,6.245-6.725,8.669-10.33c2.432-3.605,4.336-7.401,5.756-11.451c2.851-8.083,3.795-17.221,3.888-26.643      c0.04-4.715-0.132-9.504-0.443-14.327c-0.155-2.433-0.346-4.786-0.562-7.306l-0.617-7.596c-1.605-20.406-2.067-41.327-0.121-62.299      c1.935-20.957,6.221-42.087,14.062-62.393c3.914-10.141,8.724-20.047,14.483-29.476c5.752-9.43,12.468-18.366,20.024-26.565      c15.104-16.447,33.598-29.692,53.377-39.432c19.807-9.791,40.807-16.272,61.892-20.51c21.116-4.232,42.378-6.252,63.486-6.879v44      c-19.108-0.608-38.133,0.057-56.687,2.604c-18.537,2.549-36.617,6.996-53.387,14.037c-16.765,7.018-32.158,16.699-45.108,29.141      c-12.978,12.404-23.444,27.545-31.144,44.375c-7.73,16.828-12.751,35.236-15.675,54.182c-2.945,18.984-3.756,38.442-3.413,58.199      l0.148,7.471c0.061,2.502,0.115,5.172,0.121,7.766c0.017,5.229-0.11,10.504-0.483,15.84c-0.379,5.334-1.003,10.734-2.079,16.18      c-1.076,5.437-2.628,10.935-4.882,16.256c-2.239,5.318-5.215,10.41-8.704,14.936c-3.482,4.543-7.412,8.522-11.444,12.1      c-8.104,7.133-16.538,12.918-24.803,18.719l-0.464,0.326l-0.151,0.084c-16.789,9.354-32.305,21.433-46.687,34.779      c-14.389,13.378-27.687,28.076-40.139,43.49c-12.449,15.428-24.06,31.594-34.956,48.25c-5.446,8.331-10.713,16.787-15.789,25.363      c-5.063,8.579-9.988,17.261-14.551,26.117L2456.172,953.301z",
        color: "#32B1BA",
        techs: [{
            title: gettext("IndexedDB"),
            info: gettext("Method of storing data\nclient-side inside the user's\nbrowser, and allows indexed\ndatabase queries. "),
            url: "https://developer.mozilla.org/en/IndexedDB/IndexedDB_primer",
            position: {x: 2457.754, y: 953}
        }],
        adaps: [{x: 2641, y: 622.443, b: "Firefox"}, {x: 2651, y: 697.193, b: "Chrome"}]
    }, {
        name: "File System API",
        path: "M2584.525,827.604c3.82-7.793,8.056-15.104,12.431-22.261      c4.388-7.138,8.97-14.048,13.704-20.751c9.472-13.4,19.556-25.979,30.127-37.732c21.146-23.506,44.254-43.706,68.703-60.275      c24.449-16.578,50.243-29.507,76.754-38.733c26.514-9.242,53.731-14.794,81.105-17.004v54.565      c-25.238-2.215-50.669-1.36-75.916,3.043c-25.242,4.394-50.298,12.354-74.639,24.091c-24.335,11.729-47.956,27.224-70.211,46.45      c-11.123,9.615-21.906,20.158-32.215,31.667c-5.151,5.758-10.186,11.757-15.062,18.028c-4.858,6.287-9.626,12.795-13.991,19.794      L2584.525,827.604z",
        color: "#32B1BA",
        techs: [{
            title: gettext("File\nSystem API"),
            info: gettext("Provides an API that allows\nweb apps to create, read, navigate,\nand write to a sandboxed section\nof the user's local file system."),
            url: "http://www.html5rocks.com/en/tutorials/file/filesystem/",
            position: {x: 2586.053, y: 852.188},
            background: !0
        }],
        adaps: [{x: 2692, y: 697.193, b: "Chrome"}]
    }, {
        name: "WebGL",
        path: "M2631.021,898.993c-4.353-13.188-7.874-26.624-11.008-40.163      c-3.106-13.546-5.719-27.221-7.811-40.998c-4.167-27.548-6.304-55.531-5.495-83.663c0.835-28.099,4.634-56.435,13.114-83.876      c2.122-6.852,4.54-13.639,7.279-20.32c1.371-3.341,2.817-6.658,4.353-9.94c1.51-3.272,3.22-6.593,4.701-9.603      c6.117-12.342,12.044-24.746,17.957-37.26c5.913-12.506,11.906-25.157,18.265-37.701c6.344-12.547,12.996-24.944,19.817-37.179      c13.658-24.47,27.909-48.417,42.308-72.229c7.204-11.901,14.459-23.759,21.745-35.589l5.471-8.868l2.74-4.43l1.37-2.214l0.686-1.106      l0.344-0.554l0.171-0.276l0.086-0.139c-0.686,0.939,1.028-1.436,0.888-1.238l1.846-2.479l1.743-2.275      c1.161-1.497,2.327-2.968,3.506-4.425c2.357-2.912,4.763-5.769,7.229-8.586c4.935-5.633,10.108-11.112,15.638-16.423      c5.535-5.306,11.416-10.445,17.904-15.299c6.502-4.838,13.586-9.434,21.892-13.293c4.161-1.916,8.635-3.645,13.552-4.97      c4.907-1.32,10.273-2.245,16.039-2.384v50c-2.302-0.304-6.198,0.229-10.616,1.846c-4.429,1.59-9.308,4.105-14.165,7.161      c-9.764,6.147-19.489,14.31-28.593,23.169c-2.277,2.221-4.521,4.494-6.711,6.8c-1.094,1.152-2.175,2.313-3.23,3.474l-1.558,1.729      l-1.394,1.579l-11.446,15.613c-8.143,11.156-16.248,22.33-24.295,33.533c-16.079,22.41-31.979,44.91-47.162,67.707      c-7.588,11.402-14.961,22.881-22.055,34.537c-7.104,11.648-13.929,23.539-20.823,35.575c-6.888,12.032-13.875,24.116-21.021,36.074      c-1.839,3.062-3.475,5.802-5.07,8.716c-1.598,2.889-3.122,5.826-4.584,8.799c-2.922,5.949-5.577,12.056-7.978,18.285      c-9.605,24.943-15.128,51.707-17.762,78.819c-2.621,27.146-2.403,54.704-0.128,82.131c1.145,13.718,2.813,27.413,4.985,41.043      c2.198,13.62,4.798,27.218,8.234,40.598L2631.021,898.993z",
        color: "#32B1BA",
        techs: [{
            title: gettext("WebGL"),
            info: gettext("A JavaScript API for\nrendering interactive 3D graphics\nin the browser, without\nthe need for additional\nsoftware or plugins."),
            url: "http://www.html5rocks.com/en/tutorials/webgl/webgl_fundamentals/",
            position: {x: 2637.843, y: 912.962},
            background: !0
        }],
        adaps: [{x: 2641, y: 622.443, b: "Firefox"}, {x: 2610, y: 697.193, b: "Chrome"}]
    }, {
        name: "requestAnimationFrame",
        path: "M2671.024,952.668      c-4.766-12.268-9.022-24.74-13.07-37.3c-4.03-12.565-7.782-25.241-11.263-38.017c-6.954-25.553-12.84-51.5-17.38-77.846      c-4.526-26.345-7.72-53.098-8.933-80.257c-1.188-27.148-0.429-54.739,3.592-82.518c4.041-27.724,11.401-55.786,24.142-82.532      c6.359-13.346,14.082-26.305,23.219-38.411c9.125-12.11,19.676-23.337,31.341-33.261c11.659-9.938,24.411-18.553,37.753-25.765      c13.348-7.218,27.27-13.048,41.381-17.675c28.27-9.252,57.149-13.787,85.544-15.574v43.585c-25.636,0.007-51.374,2.519-76.224,9.048      c-12.411,3.264-24.575,7.547-36.228,12.996c-11.65,5.447-22.781,12.07-33.075,19.869c-10.299,7.787-19.752,16.742-28.148,26.637      c-8.402,9.893-15.756,20.705-22.048,32.125c-12.608,22.861-20.976,47.985-26.341,73.623c-5.36,25.68-7.79,51.943-8.312,78.189      c-0.505,26.263,0.909,52.546,3.67,78.662c2.772,26.119,6.896,52.085,12.116,77.811c2.613,12.863,5.505,25.668,8.681,38.396      c3.193,12.722,6.606,25.4,10.534,37.896L2671.024,952.668z",
        color: "#32B1BA",
        techs: [{
            title: gettext("requestAnimationFrame"),
            info: gettext("Tells the browser to perform an\nanimation, so that the browser can\nreschedule a repaint of the\nwindow for the next animation frame."),
            url: "http://www.html5rocks.com/en/tutorials/speed/animations/",
            position: {x: 2679, y: 964}
        }],
        adaps: [{x: 2641, y: 622.443, b: "Firefox"}, {x: 2640, y: 697.193, b: "Chrome"}]
    }, {
        name: "WebRTC",
        path: "M2675.028,846.391c3.259-10.212,7.173-20.261,11.408-30.231      c4.257-9.964,8.914-19.825,14.001-29.558c10.191-19.452,22.036-38.444,36.468-56.373c7.228-8.952,15.116-17.631,23.895-25.829      c8.774-8.191,18.447-15.913,29.247-22.759c10.791-6.835,22.753-12.786,35.806-17.18c13.026-4.406,27.142-7.178,41.497-7.947v38.353      c-9.832-0.783-19.88-0.225-29.912,1.713c-10.031,1.925-20.023,5.219-29.695,9.6c-9.676,4.38-19.028,9.823-27.94,15.997      c-8.918,6.175-17.4,13.076-25.461,20.449c-16.12,14.776-30.554,31.391-43.596,48.893c-6.52,8.76-12.69,17.761-18.513,26.957      c-5.803,9.202-11.339,18.578-16.261,28.204L2675.028,846.391z",
        color: "#32B1BA",
        techs: [{
            title: gettext("WebRTC"),
            info: gettext("Allows web browsers to conduct\nreal-time communication"),
            url: "http://www.webrtc.org",
            position: {x: 2671, y: 859.717},
            background: !0
        }],
        adaps: [{x: 2796, y: 697.193, b: "Chrome"}]
    }, {
        name: "Web Audio API",
        path: "M2738.03,868.574c-8.778-6.813-17.118-14.168-25.241-21.788      c-8.107-7.636-15.938-15.599-23.45-23.897c-15.002-16.607-28.811-34.545-40.375-54.257c-5.771-9.856-10.954-20.169-15.285-30.979      c-4.329-10.805-7.796-22.126-9.987-33.893c-2.192-11.754-3.084-23.967-2.296-36.256c0.771-12.283,3.252-24.609,7.35-36.393      c1.021-2.947,2.143-5.858,3.353-8.732c0.608-1.435,1.231-2.864,1.886-4.277l1.877-3.979c3.182-6.441,6.694-11.717,10.394-16.815      c7.417-10.082,15.617-18.972,24.346-27.279c17.476-16.542,37.098-30.511,58.153-42.077c21.06-11.552,43.591-20.606,66.925-27.01      c23.333-6.422,47.452-10.172,71.672-11.428v62c-19.996-1.252-40.125-0.461-59.987,2.623c-19.858,3.068-39.454,8.425-58.229,16.085      c-18.753,7.655-36.76,17.604-52.948,29.758c-8.062,6.066-15.714,12.721-22.275,19.782c-3.242,3.495-6.268,7.195-8.398,10.459      l-2.07,3.312c-0.636,1.031-1.246,2.076-1.848,3.125c-1.196,2.104-2.328,4.242-3.384,6.418c-4.234,8.698-7.306,17.982-9.082,27.664      c-1.784,9.68-2.277,19.742-1.597,29.905c1.35,20.36,7.333,40.937,15.961,60.54c8.649,19.644,19.879,38.441,32.592,56.266      c6.367,8.914,13.121,17.592,20.215,26.014c7.106,8.404,14.5,16.623,22.383,24.35L2738.03,868.574z",
        color: "#32B1BA",
        offset: {x: -30, y: 0},
        techs: [{
            title: gettext("Web Audio\nAPI"),
            info: gettext("A high-level JavaScript API\nfor processing and synthesizing\naudio in web applications"),
            url: "http://www.html5rocks.com/en/tutorials/webaudio/intro/",
            position: {x: 2761, y: 882.004},
            background: !0
        }],
        adaps: [{x: 2641, y: 622.443, b: "Firefox"}, {x: 2640, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS3 Filters",
        path: "M2735.699,821.42c0.818-8.912,2.268-17.764,4.042-26.588      c1.795-8.819,3.99-17.598,6.633-26.303c5.304-17.395,12.326-34.574,22.171-50.818c4.931-8.107,10.59-15.965,17.168-23.311      c6.57-7.339,14.08-14.164,22.558-20.029c8.462-5.87,17.898-10.75,27.923-14.268c10.02-3.537,20.584-5.697,31.156-6.59v44      c-14.27-1.821-28.739-0.145-42.6,5.736c-13.864,5.81-26.872,15.715-38.167,27.912c-11.331,12.207-21.061,26.568-29.356,41.871      c-4.149,7.661-7.946,15.579-11.396,23.685c-3.429,8.109-6.587,16.397-9.147,24.882L2735.699,821.42z",
        color: "#9253A1",
        offset: {x: -40, y: 0},
        techs: [{
            title: gettext("CSS3 Filters"),
            info: gettext("A way of processing an element's\nrendering before it is displayed\nin the document. Filters can\napply effects such as blurring and\nwarping before the compositing stage."),
            url: "http://www.html5rocks.com/en/tutorials/filters/understanding-css/",
            position: {x: 2737, y: 837.883},
            background: !0
        }],
        adaps: [{x: 2786, y: 697.193, b: "Chrome"}]
    }, {
        name: "DOM Mutation Observers",
        path: "M2716.291,901.761c-1.095-12.948-1.46-25.931-1.455-38.936  c0.029-13.004,0.521-26.028,1.528-39.062c2.056-26.062,6.021-52.195,13.651-78.141c3.849-12.964,8.642-25.883,14.981-38.59  c6.357-12.69,14.25-25.226,24.833-36.951c5.295-5.852,11.282-11.482,18.1-16.669c6.807-5.187,14.468-9.913,22.889-13.872  c8.408-3.969,17.58-7.126,27.088-9.32c9.511-2.199,19.33-3.424,29.047-3.811v38c-12.768-0.779-25.186,0.665-36.91,4.723  c-11.729,4.016-22.719,10.674-32.401,19.062c-9.705,8.383-18.13,18.365-25.427,29.066c-7.307,10.716-13.52,22.171-18.931,33.962  c-10.79,23.625-18.459,48.543-24.247,73.779c-2.881,12.63-5.27,25.367-7.206,38.168c-1.915,12.801-3.47,25.67-4.294,38.576  L2716.291,901.761z",
        color: "#32B1BA",
        techs: [{
            title: gettext("DOM Mutation\nobservers"),
            info: gettext("Provides an easy way for\ndevelopers to react to changes\nin a DOM."),
            url: "http://updates.html5rocks.com/2012/02/Detect-DOM-changes-with-Mutation-Observers",
            position: {x: 2723.031, y: 927.164},
            background: !0
        }],
        adaps: [{x: 2765, y: 697.193, b: "Chrome"}]
    }, {
        name: "Drag & Drop",
        path: "M2256.99,265.604c-2.788,23.271-4.605,46.623-5.67,69.946      c-0.477,11.666-0.852,23.319-0.871,34.963c-0.019,5.82,0.036,11.637,0.17,17.446c0.112,5.808,0.286,11.61,0.56,17.399      c0.543,11.58,1.438,23.119,2.796,34.556c1.318,11.438,3.067,22.786,5.482,33.911c2.4,11.121,5.506,22.015,9.443,32.41      c3.938,10.381,8.838,20.262,15.018,28.871c3.086,4.301,6.49,8.271,10.213,11.775c1.861,1.753,3.797,3.396,5.812,4.902      c1.023,0.769,1.996,1.443,3.111,2.199l3.55,2.399c9.493,6.327,19.194,12.253,29.143,17.747c9.944,5.519,20.154,10.521,30.644,15.521      c10.469,5.017,21.396,9.919,32.18,16.284c5.381,3.17,10.691,6.703,15.719,10.65c5.031,3.939,9.769,8.275,14.129,12.879      c8.729,9.23,16.033,19.357,22.434,29.751c6.439,10.384,12.111,21.027,17.349,31.793c2.652,5.366,5.191,10.768,7.66,16.187      c2.488,5.41,4.894,10.844,7.241,16.294l0.153,0.355l0.196,0.607c2.88,8.933,8.953,16.507,17.04,21.986      c8.079,5.507,17.953,8.948,28.255,10.573c10.328,1.637,21.117,1.511,31.773,0.025c10.67-1.492,21.233-4.338,31.424-8.258      c20.422-7.834,39.245-19.988,55.771-34.708c16.551-14.749,30.839-32.12,42.891-50.984c12.08-18.869,21.875-39.28,29.799-60.443      c7.92-21.178,13.96-43.134,18.474-65.454c4.489-22.332,7.438-45.032,9.178-67.866c0.869-11.419,1.437-22.873,1.729-34.347      c0.268-11.475,0.258-22.967,0.007-34.463l0.146,2.398l-0.138-1.207l-0.083-0.867l-0.126-1.596c-0.069-1.032-0.118-2.027-0.15-3.014      c-0.064-1.969-0.065-3.893-0.014-5.808c0.104-3.827,0.42-7.614,0.943-11.396c1.048-7.555,2.939-15.093,5.809-22.426      c2.863-7.324,6.731-14.427,11.546-20.896c4.803-6.476,10.537-12.282,16.811-17.179c6.275-4.906,13.061-8.913,19.99-12.109      c6.938-3.195,14.015-5.617,21.064-7.471c14.124-3.682,28.118-5.115,41.759-5.432v46c-10.933-0.296-21.619,0.366-31.434,2.416      c-9.82,2.025-18.649,5.553-25.717,10.566c-7.077,5.009-12.482,11.569-16.102,19.687c-1.805,4.044-3.153,8.456-4.003,13.05      c-0.426,2.293-0.727,4.633-0.896,6.947c-0.084,1.156-0.135,2.308-0.149,3.413c-0.008,0.552-0.006,1.093,0.003,1.595l0.02,0.705      l0.011,0.283c0,0.062,0.014,0.199-0.021-0.061l0.171,1.246l-0.024,1.152c-0.253,12.057-0.761,24.117-1.557,36.17      c-0.769,12.055-1.826,24.104-3.204,36.131c-2.751,24.051-6.816,48.018-12.483,71.688c-5.649,23.666-12.946,47.041-22.324,69.687      c-9.376,22.633-20.861,44.535-34.803,64.949c-13.943,20.388-30.438,39.261-49.588,55.28c-19.126,15.998-40.94,29.137-64.775,37.576      c-11.909,4.203-24.32,7.199-37.029,8.617c-12.7,1.404-25.724,1.246-38.616-1.162c-12.846-2.416-25.695-7.11-36.916-15.207      c-5.585-4.041-10.707-8.955-14.911-14.668c-4.21-5.699-7.454-12.197-9.452-18.998l0.35,0.961c-2.185-5.355-4.42-10.683-6.727-15.965      c-2.324-5.273-4.727-10.5-7.211-15.666c-5.045-10.29-10.404-20.363-16.405-29.848c-6.048-9.443-12.65-18.346-20.241-25.963      c-7.567-7.663-16.077-13.941-25.633-19.271c-9.545-5.329-20.062-9.98-30.784-14.951c-10.737-4.929-21.563-10.297-32.061-16.249      c-10.508-5.945-20.695-12.466-30.498-19.438l-3.66-2.626c-1.28-0.931-2.665-1.996-3.94-3.044c-2.59-2.117-5.033-4.381-7.338-6.748      c-4.611-4.736-8.639-9.896-12.157-15.271c-7.04-10.771-12.088-22.335-15.971-34.022c-3.874-11.708-6.47-23.622-8.413-35.522      c-1.919-11.91-3.13-23.84-3.828-35.75c-0.648-11.914-0.807-23.803-0.605-35.656c0.103-5.928,0.289-11.846,0.572-17.754      c0.303-5.908,0.686-11.807,1.141-17.693c0.928-11.774,2.068-23.514,3.596-35.198c1.514-11.685,3.206-23.333,5.265-34.916      c2.019-11.587,4.31-23.119,7.011-34.561L2256.99,265.604z",
        color: "#32B1BA",
        offset: {x: 0, y: -55},
        techs: [{
            title: gettext("Drag & Drop"),
            info: gettext("Method of easily dragging\nand dropping elements on\na page, requiring minimal\nJavaScript"),
            url: "http://www.html5rocks.com/en/tutorials/dnd/basics/",
            position: {x: 2259.017, y: 247.583}
        }],
        adaps: [{x: 2796, y: 397.621, b: "Opera"}, {x: 2267, y: 547.485, b: "Safari"}, {
            x: 2423,
            y: 622.443,
            b: "Firefox"
        }, {x: 2454, y: 697.193, b: "Chrome"}]
    }, {
        name: "Offline Web Apps: AppCache",
        path: "M2291.135,217.555      c-0.256,10.701,0.252,21.432,1.127,32.092c0.898,10.664,2.258,21.279,4.096,31.793c3.687,21.014,9.27,41.682,17.385,61.197      c8.105,19.484,18.846,37.83,32.671,53.271c6.898,7.717,14.552,14.684,22.854,20.686c2.075,1.5,4.188,2.943,6.341,4.322l1.621,1.023      l0.815,0.502l0.737,0.439l3.555,2.148c4.719,2.911,9.398,6.038,13.92,9.524c4.518,3.483,8.873,7.339,12.871,11.634      c4,4.287,7.624,9.021,10.716,14.086c6.225,10.143,10.157,21.485,12.39,32.803c1.125,5.67,1.856,11.362,2.3,17.029      c0.221,2.834,0.372,5.664,0.459,8.484l0.103,4.172l0.062,4.117c0.113,10.938-0.055,21.676-0.005,32.301      c0.067,21.218,0.983,42.088,4.903,61.986c1.949,9.934,4.641,19.592,8.237,28.768c3.591,9.177,8.094,17.861,13.513,25.871      c5.422,8.027,11.716,15.32,18.852,21.961c3.468,3.217,7.139,6.256,10.79,8.762c3.655,2.516,7.364,4.541,10.808,5.787      c3.451,1.258,6.524,1.665,8.951,1.379c2.44-0.291,4.447-1.123,6.707-2.794c2.232-1.663,4.564-4.255,6.679-7.501      c2.122-3.243,4.026-7.088,5.665-11.223c3.286-8.306,5.549-17.699,7.087-27.336c1.536-9.662,2.357-19.639,2.657-29.694      c0.148-5.03,0.165-10.085,0.062-15.151l-0.1-3.809l-0.148-3.757c-0.115-2.535-0.259-5.096-0.422-7.671      c-0.663-10.311-1.629-20.834-2.658-31.421c-2.074-21.195-4.438-42.663-6.25-64.459c-0.904-10.905-1.679-21.899-2.158-33.062      c-0.47-11.168-0.675-22.485-0.188-34.21c0.252-5.868,0.682-11.841,1.457-18.028c0.793-6.193,1.885-12.584,3.852-19.471      c0.992-3.443,2.214-7.023,3.889-10.791c1.686-3.76,3.814-7.741,6.904-11.84c3.068-4.064,7.236-8.314,12.689-11.695      c2.705-1.685,5.701-3.111,8.785-4.174c3.088-1.064,6.246-1.754,9.295-2.115c6.122-0.713,11.63-0.152,16.377,0.824      c4.752,0.998,8.844,2.423,12.54,3.969c7.359,3.129,13.28,6.744,18.745,10.438c10.817,7.432,19.748,15.331,28.244,23.375l1.076,1.019      l1.271,1.653l-0.44-0.572c-0.024-0.035-0.02-0.036-0.007-0.028c0.029,0.021,0.096,0.083,0.18,0.161l0.656,0.607      c0.515,0.469,1.132,1.006,1.794,1.555c1.33,1.104,2.845,2.262,4.447,3.402c3.214,2.287,6.791,4.518,10.548,6.617      c7.531,4.21,15.795,7.926,24.391,11.172c17.232,6.495,35.8,11.16,54.791,14.527c19.016,3.363,38.519,5.428,58.202,6.553      c19.691,1.119,39.576,1.293,59.525,0.75v68c-21.6-0.549-43.276-1.868-64.991-4.252c-21.712-2.394-43.468-5.836-65.154-10.859      c-21.677-5.051-43.308-11.616-64.53-20.914c-10.605-4.671-21.101-10.023-31.383-16.516c-5.143-3.256-10.226-6.791-15.265-10.812      c-2.522-2.018-5.029-4.151-7.563-6.52c-1.27-1.188-2.544-2.43-3.862-3.801c-0.66-0.688-1.331-1.405-2.043-2.201l-1.122-1.287      l-0.642-0.768l-0.38-0.467l-0.677-0.859l2.347,2.672c-6.712-7.104-13.668-13.773-20.315-18.871      c-3.281-2.521-6.523-4.617-8.989-5.851c-1.215-0.617-2.207-0.997-2.696-1.178c-0.489-0.183-0.396-0.146,0.378-0.291      c0.744-0.121,2.108-0.614,2.926-1.226c0.851-0.6,1.075-1.072,0.854-0.902c-0.211,0.143-0.765,0.853-1.35,1.953      c-0.593,1.102-1.23,2.573-1.822,4.26c-1.196,3.381-2.21,7.553-3.009,11.976c-0.803,4.437-1.41,9.161-1.875,14.008      c-0.924,9.71-1.299,19.892-1.403,30.194c-0.1,10.313,0.082,20.78,0.401,31.318c0.641,21.093,1.859,42.438,2.838,64.089      c0.48,10.837,0.914,21.75,1.045,32.904c0.03,2.79,0.041,5.598,0.02,8.431l-0.057,4.298l-0.113,4.246      c-0.184,5.673-0.5,11.354-0.969,17.046c-0.944,11.382-2.474,22.801-4.917,34.25c-2.475,11.443-5.776,22.938-11.005,34.371      c-2.639,5.708-5.775,11.412-9.852,16.947c-4.076,5.504-9.148,10.938-15.835,15.299c-3.33,2.166-7.062,4.02-11.05,5.328      c-3.982,1.315-8.203,2.06-12.338,2.209c-4.139,0.156-8.172-0.266-11.934-1.076c-3.767-0.813-7.272-2.002-10.528-3.4      c-6.51-2.814-12.054-6.406-17.047-10.238c-5.002-3.859-9.403-7.947-13.587-12.262c-8.159-8.435-15.511-17.908-21.581-28.029      c-6.097-10.126-10.96-20.915-14.617-31.953c-3.667-11.042-6.151-22.32-7.749-33.563c-3.201-22.522-2.91-44.827-1.854-66.509      c0.521-10.849,1.249-21.573,1.692-32.112l0.146-3.937l0.06-1.979l0.037-1.904c0.038-2.547,0.016-5.086-0.065-7.613      c-0.166-5.054-0.585-10.059-1.329-14.964c-1.481-9.81-4.317-19.212-8.966-27.632c-4.612-8.443-11.084-15.845-18.787-22.333      c-3.843-3.253-7.969-6.299-12.264-9.223l-3.244-2.169l-0.422-0.275l-0.541-0.364l-0.867-0.603l-1.721-1.226      c-2.283-1.647-4.518-3.36-6.701-5.13c-8.734-7.081-16.624-15.119-23.574-23.815c-13.932-17.417-24.068-37.312-31.33-57.888      c-7.266-20.616-11.764-41.977-14.324-63.441c-1.272-10.739-2.051-21.518-2.363-32.297c-0.287-10.781-0.205-21.56,0.646-32.311      L2291.135,217.555z",
        color: "#32B1BA",
        techs: [{
            title: gettext("Offline Web\nApps:AppCache"),
            info: gettext("Method of defining web\npage files to be cached,\nallowing them to work\noffline"),
            url: "http://caniuse.com/#search=offline",
            position: {x: 2291.768, y: 199.302}
        }],
        adaps: [{x: 2558, y: 397.621, b: "Opera"}, {x: 2423, y: 547.485, b: "Safari"}, {
            x: 2423,
            y: 622.443,
            b: "Firefox"
        }, {x: 2454, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS3 2D Transforms",
        path: "M2393.801,178.914      c-8.811,6.977-17.051,14.69-24.99,22.648c-7.924,7.984-15.488,16.318-22.682,24.95c-14.385,17.265-27.303,35.727-38.412,55.186      c-11.106,19.456-20.385,39.924-27.421,61.104c-7.042,21.176-11.822,43.059-14.111,65.172c-2.303,22.111-2.112,44.434,0.425,66.463      c2.529,22.037,7.387,43.771,14.158,64.883c13.556,42.271,34.607,81.895,59.739,118.538l0.168,0.245l0.285,0.522      c4.095,7.501,9.454,14.44,15.585,20.683c6.135,6.247,13.043,11.815,20.431,16.643c14.773,9.623,31.537,16.434,48.536,19.029      c8.484,1.283,17.018,1.463,25.129,0.246c8.107-1.21,15.755-3.846,22.365-7.952c6.625-4.087,12.199-9.638,16.569-16.255      c4.382-6.613,7.575-14.25,9.763-22.367c2.196-8.121,3.406-16.713,3.919-25.454c0.255-4.374,0.331-8.79,0.263-13.229      c-0.08-4.608-0.211-9.288-0.371-13.95c-0.645-18.675-1.754-37.49-2.759-56.425c-1.003-18.94-1.94-38.005-2.208-57.295      c-0.226-19.299,0.078-38.808,2.529-58.837c1.264-10.016,3.071-20.179,6.179-30.522c3.159-10.401,7.699-21.12,15.473-31.002      c3.894-4.909,8.667-9.589,14.491-13.396c5.795-3.808,12.68-6.659,19.895-7.856c7.211-1.239,14.59-0.828,21.301,0.767      c6.737,1.587,12.842,4.278,18.273,7.498c10.874,6.501,19.217,14.948,26.107,23.829c3.438,4.461,6.506,9.074,9.275,13.777      l7.141,12.309c4.699,7.996,9.465,15.875,14.369,23.437c4.904,7.55,9.956,14.809,15.216,21.241      c5.258,6.437,10.713,11.946,16.26,15.844c5.563,3.924,11.21,6.349,18.11,7.92c6.864,1.562,14.918,2.17,23.5,2.279      c8.588,0.107,17.661-0.246,26.881-0.713c18.479-0.975,37.533-2.32,56.625-3.295c19.112-1.002,38.326-1.719,57.543-2.064v50      c-18.613-0.353-37.227-0.35-55.922-0.062c-18.717,0.261-37.442,0.895-56.772,1.2c-9.682,0.127-19.531,0.172-29.851-0.336      c-10.299-0.545-21.209-1.576-32.712-4.636c-5.726-1.532-11.558-3.622-17.157-6.345c-5.604-2.711-10.93-6.048-15.729-9.74      c-4.811-3.691-9.107-7.712-12.979-11.822c-3.873-4.117-7.34-8.331-10.545-12.561c-6.397-8.469-11.82-16.996-16.914-25.496      c-5.077-8.505-9.788-17.001-14.364-25.488l-6.637-12.494c-1.883-3.527-3.933-6.891-6.141-10.019      c-4.396-6.243-9.523-11.571-14.79-15.017c-2.621-1.725-5.242-2.963-7.688-3.668c-2.455-0.709-4.703-0.916-6.843-0.678      c-2.142,0.234-4.243,0.924-6.426,2.184c-2.173,1.258-4.39,3.131-6.478,5.535c-4.207,4.822-7.732,11.599-10.323,19.166      c-2.638,7.688-4.528,16.145-5.944,24.843c-2.81,17.453-3.842,35.849-4.295,54.358c-0.428,18.541-0.203,37.297,0.102,56.162      c0.303,18.869,0.726,37.856,0.682,57.007c-0.014,4.794-0.057,9.571-0.148,14.421c-0.092,5.019-0.35,10.061-0.817,15.116      c-0.942,10.107-2.694,20.302-5.78,30.353c-3.08,10.027-7.541,19.959-13.932,28.922c-6.35,8.955-14.75,16.802-24.447,22.305      c-9.68,5.555-20.436,8.745-31.069,9.953c-10.661,1.219-21.235,0.566-31.385-1.319c-10.159-1.896-19.929-5.025-29.224-9.071      c-9.295-4.053-18.125-9.028-26.382-14.828c-8.251-5.805-15.941-12.436-22.814-19.924c-6.862-7.488-12.922-15.856-17.586-25.134      l0.453,0.768c-12.382-19.235-23.688-39.202-33.515-59.909c-9.823-20.699-18.16-42.146-24.522-64.195      c-6.365-22.039-10.734-44.684-12.683-67.545c-1.958-22.854-1.475-45.91,1.561-68.598c3.021-22.689,8.59-44.988,16.414-66.402      c7.818-21.422,17.871-41.957,29.701-61.342c11.833-19.387,25.426-37.641,40.42-54.605c7.5-8.48,15.352-16.641,23.551-24.432      c8.219-7.768,16.699-15.259,25.779-22.027L2393.801,178.914z",
        color: "#9253A1",
        techs: [{
            title: gettext("CSS3 2D\nTransforms"),
            info: gettext("Method of transforming any\nelement on a web page, such as\nscaling, rotating, and translating,\nwithout changing its effect on\nthe page layout."),
            url: "http://caniuse.com/#feat=transforms2d",
            position: {x: 2396, y: 161.766}
        }],
        adaps: [{x: 2516, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 2267,
            y: 547.485,
            b: "Safari"
        }, {x: 2496, y: 697.193, b: "Chrome"}]
    }, {
        name: "CSS3 3D Transforms",
        path: "M2394.805,249.91c-4.146,3.789-7.922,8-11.438,12.365      c-3.514,4.373-6.787,8.92-9.762,13.639c-5.928,9.449-10.877,19.439-14.521,29.846c-3.628,10.403-6.188,21.116-7.4,31.967      c-0.619,5.422-0.928,10.868-0.946,16.309c-0.055,5.439,0.19,10.877,0.704,16.287c1.025,10.824,3.145,21.531,6.132,31.998      c2.915,10.486,6.703,20.746,11.149,30.732c8.938,19.967,20.346,38.873,33.162,56.819c3.202,4.491,6.505,8.917,9.888,13.288      c1.69,2.186,3.404,4.355,5.138,6.51l2.568,3.173l2.611,3.122c7.068,8.309,14.672,16.42,22.451,24.354      c15.6,15.861,32.016,31.06,48.932,45.591c16.929,14.519,34.4,28.375,52.434,41.231c18.009,12.855,36.591,24.814,55.796,34.707      c9.595,4.928,19.349,9.322,29.146,12.785c9.776,3.448,19.659,5.971,28.98,6.76c4.649,0.394,9.131,0.334,13.255-0.246      c4.129-0.581,7.868-1.68,11.176-3.278c3.311-1.604,6.217-3.72,8.835-6.415c0.343-0.349,0.616-0.649,0.999-1.068l1.431-1.57      l2.607-2.937c1.755-1.998,3.473-4.022,5.156-6.068c13.491-16.353,24.689-34.224,32.738-53.321      c8.075-19.099,13.009-39.34,15.173-60.278c1.103-10.472,1.542-21.118,1.557-31.946c0.021-10.834-0.398-21.84-0.837-33.191      c-0.21-5.678-0.407-11.449-0.507-17.365c-0.049-2.958-0.07-5.954-0.044-8.998l0.081-4.604l0.007-0.29      c-0.025,1.338-0.008,0.219-0.015,0.448l-0.004-0.526l-0.01-1.043l-0.02-2.159c-0.05-5.856,0.014-12.029,0.354-18.226      c0.337-6.209,0.938-12.502,1.897-18.84c1.933-12.654,5.268-25.604,11.161-38.125c2.938-6.248,6.514-12.368,10.795-18.116      c4.273-5.747,9.26-11.106,14.812-15.808c5.548-4.707,11.646-8.74,18.001-12.025c6.364-3.274,12.969-5.808,19.592-7.705      c13.275-3.797,26.534-5.129,39.329-5.176v42c-9.841-0.028-19.342,0.99-27.887,3.396c-8.556,2.405-16.064,6.15-22.309,11.31      c-6.248,5.157-11.301,11.84-15.158,19.816c-3.855,7.963-6.512,17.115-8.138,26.812c-0.812,4.854-1.378,9.844-1.734,14.941      c-0.36,5.113-0.503,10.273-0.542,15.746l-0.048,4.926l-0.129,3.891c-0.063,2.62-0.087,5.289-0.085,7.996      c0.004,5.413,0.116,10.968,0.222,16.615c0.207,11.297,0.425,22.947,0.163,34.771c-0.256,11.826-0.98,23.841-2.495,35.879      c-1.505,12.037-3.803,24.096-7.029,35.951c-3.212,11.86-7.421,23.488-12.486,34.694c-10.129,22.442-23.837,43.005-39.64,61.2      c-1.974,2.279-3.979,4.525-6.02,6.732l-3.121,3.34l-1.469,1.535c-0.588,0.613-1.291,1.336-1.959,1.98      c-5.413,5.295-11.929,9.777-18.919,12.898c-6.987,3.152-14.347,4.943-21.461,5.701c-7.131,0.766-14.048,0.566-20.663-0.195      c-13.244-1.563-25.359-5.216-36.809-9.619c-11.443-4.441-22.232-9.732-32.626-15.466c-20.758-11.513-39.997-24.747-58.433-38.798      c-18.393-14.109-35.951-29.075-52.892-44.661c-16.927-15.604-33.246-31.806-48.846-48.813c-7.792-8.525-15.404-17.226-22.706-26.438      l-2.719-3.494l-1.36-1.792l-1.292-1.74c-1.721-2.334-3.424-4.684-5.102-7.053c-3.359-4.734-6.638-9.533-9.814-14.406      c-12.686-19.484-23.83-40.178-32.101-62.162c-4.141-10.979-7.579-22.261-10.068-33.782c-2.419-11.534-3.889-23.296-4.163-35.1      c-0.138-5.899,0.018-11.807,0.496-17.685c0.51-5.877,1.341-11.719,2.496-17.488c2.329-11.528,5.889-22.789,10.841-33.357      c4.931-10.57,11.001-20.551,18.209-29.562c3.595-4.512,7.419-8.82,11.517-12.84c4.121-3.994,8.397-7.811,13.123-11.076      L2394.805,249.91z",
        color: "#9253A1",
        techs: [{
            title: gettext("CSS3 3D\nTransforms"),
            info: gettext("Method of positioning and\ntransforming elements in\nthree-dimensional space."),
            url: "http://www.html5rocks.com/en/tutorials/3d/css/",
            position: {x: 2395.632, y: 231.324}
        }],
        adaps: [{x: 2423, y: 547.485, b: "Safari"}, {x: 2745, y: 622.443, b: "Firefox"}, {
            x: 2672,
            y: 697.193,
            b: "Chrome"
        }]
    }, {
        name: "CSS3 Animation",
        path: "M2394.443,352.812c-0.395,8.562-0.275,17.166,0.014,25.74      c0.307,8.578,0.854,17.145,1.604,25.689c1.502,17.089,3.809,34.092,6.838,50.945c6.065,33.707,15.033,66.829,26.812,98.832      c11.778,32,26.402,62.873,43.749,92.035c17.338,29.168,37.41,56.605,59.848,81.85l-0.574-0.623c4.662,4.412,9.78,8.596,15.05,12.342      c5.282,3.748,10.782,7.092,16.411,9.81c5.623,2.716,11.387,4.802,17.064,5.947c5.679,1.151,11.237,1.333,16.404,0.403      c5.173-0.923,9.979-2.943,14.413-5.973c4.436-3.02,8.488-7.039,12.107-11.703c7.254-9.366,12.752-21.042,17.105-33.271      c4.353-12.278,7.602-25.236,10.193-38.411c2.587-13.186,4.501-26.621,5.982-40.154c0.369-3.384,0.711-6.775,1.026-10.172l0.454-5.1      l0.055-0.638l0.027-0.319l0.014-0.159c-0.027,0.339,0.081-0.983-0.059,0.72l0.07-1.621c0.061-1.112,0.145-2.203,0.246-3.283      c0.846-8.594,2.751-16.673,5.697-24.668c2.965-7.955,7.037-15.777,12.68-22.97c5.606-7.173,12.94-13.647,21.502-18.187      c8.537-4.584,18.057-7.083,27.178-7.805c1.141-0.09,2.281-0.165,3.413-0.205l1.695-0.051c-0.061-0.014,0.966-0.026,0.901-0.048      l1.228-0.142c0.432-0.062,0.836-0.141,1.22-0.223c1.53-0.349,2.572-0.844,3.428-1.428c0.85-0.598,1.609-1.325,2.465-2.503      c0.846-1.161,1.736-2.772,2.541-4.771c1.63-4.002,2.831-9.379,3.546-15.176c0.727-5.82,1.032-12.102,1.104-18.572      c0.072-6.479-0.091-13.161-0.316-20.023l-0.693-20.525c-0.351-6.115-1.066-13.154-1.601-20.422      c-1.053-14.594-1.677-30.55,1.521-47.635c1.616-8.514,4.282-17.328,8.508-25.839c4.194-8.501,10.018-16.599,16.981-23.342      c6.949-6.774,14.894-12.173,22.981-16.29c8.107-4.133,16.366-7.063,24.504-9.236c16.311-4.305,32.165-5.763,47.569-6.127v52      c-12.519-0.326-24.747,0.374-35.625,2.709c-5.428,1.162-10.484,2.736-14.947,4.732c-4.471,1.998-8.319,4.396-11.551,7.213      c-3.236,2.82-5.899,6.079-8.118,9.994c-2.213,3.908-3.952,8.496-5.2,13.652c-1.251,5.152-2.008,10.84-2.38,16.857      c-0.376,6.026-0.37,12.371-0.188,19.031c0.167,6.691,0.566,13.59,0.655,21.447v3.029l-0.053,2.773l-0.088,5.1l-0.135,10.5      c-0.102,7.113-0.259,14.412-0.695,21.902c-0.444,7.494-1.143,15.178-2.53,23.178c-1.429,7.992-3.434,16.357-7.513,25.141      c-2.057,4.371-4.697,8.861-8.269,13.123c-3.539,4.252-8.11,8.221-13.312,11.125c-5.193,2.928-10.869,4.729-16.226,5.547      c-1.34,0.204-2.668,0.361-3.976,0.467c-0.649,0.048-1.304,0.097-1.944,0.122l-0.962,0.039l-1.096,0.022      c-0.938,0.016-0.785-0.007-1.719-0.006l-0.925-0.019c-0.616-0.012-1.221,0-1.823,0.015c-4.817,0.145-9.145,1.102-13.053,2.919      c-3.908,1.812-7.489,4.54-10.691,8.206c-3.196,3.651-5.959,8.212-8.117,13.249c-2.154,5.015-3.74,10.591-4.515,15.882      c-0.094,0.655-0.178,1.304-0.243,1.934c-0.036,0.359-0.054,0.463-0.093,0.996c-0.147,1.811-0.053,0.598-0.092,1.045l-0.022,0.166      l-0.044,0.332l-0.089,0.664l-0.727,5.316c-0.499,3.545-1.024,7.088-1.581,10.631c-2.23,14.171-4.925,28.334-8.388,42.441      c-3.477,14.103-7.682,28.168-13.328,42.006c-2.832,6.914-6.037,13.768-9.813,20.471c-3.781,6.694-8.13,13.256-13.387,19.395      c-5.247,6.121-11.457,11.848-18.821,16.352c-7.325,4.518-15.853,7.637-24.524,8.713c-8.68,1.115-17.308,0.277-25.227-1.734      c-7.947-2.017-15.271-5.143-22.062-8.824c-6.795-3.693-13.08-7.958-18.985-12.58c-5.907-4.643-11.418-9.591-16.661-15.041      l-0.438-0.454l-0.137-0.169c-22.035-27.278-41.42-56.605-57.822-87.42c-16.415-30.812-29.864-63.09-40.314-96.217      c-10.45-33.131-17.937-67.104-22.453-101.397c-2.254-17.147-3.769-34.377-4.469-51.628c-0.348-8.625-0.492-17.256-0.395-25.882      c0.116-8.626,0.402-17.244,1.206-25.847L2394.443,352.812z",
        color: "#9253A1",
        offset: {x: 0, y: -40},
        techs: [{
            title: gettext("CSS3\nAnimation"),
            info: gettext("Describes a way to animate the\nvalues of CSS properties over\ntime, using keyframes."),
            url: "http://www.w3.org/TR/css3-animations/",
            position: {x: 2392, y: 330.583},
            background: !0
        }],
        adaps: [{x: 2796, y: 397.621, b: "Opera"}, {x: 2423, y: 547.485, b: "Safari"}, {
            x: 2672,
            y: 622.443,
            b: "Firefox"
        }, {x: 2496, y: 697.193, b: "Chrome"}]
    }, {
        name: "Web Workers",
        path: "M2403,311.52c0.316,22.211,1.17,44.416,2.322,66.59      c1.17,22.174,2.701,44.322,4.678,66.416c1.982,22.092,4.403,44.133,7.488,66.046c3.098,21.905,6.825,43.708,11.767,65.129      c2.478,10.704,5.269,21.31,8.55,31.688c3.291,10.363,7.061,20.536,11.702,30.054c2.323,4.75,4.874,9.327,7.724,13.544      c1.426,2.104,2.926,4.118,4.507,5.993c0.79,0.938,1.601,1.839,2.431,2.698l0.626,0.636l0.315,0.312l0.158,0.155      c-0.475-0.46-0.021-0.028-0.076-0.085l1.525,1.354c8.137,7.16,16.523,13.957,25.27,19.305c4.354,2.646,8.824,4.913,13.113,6.299      c4.283,1.412,8.291,1.738,10.982,0.889c1.371-0.413,2.515-1.057,3.651-2.041c1.129-0.981,2.229-2.342,3.228-4.02      c2.01-3.364,3.519-7.842,4.57-12.583c1.057-4.765,1.703-9.845,2.096-15.017c0.371-5.086,0.535-10.717,0.713-16.153      c0.321-10.952,0.411-21.948,0.375-32.971c-0.075-22.05-0.662-44.196-1.099-66.478c-0.409-22.293-0.79-44.691,0.167-67.523      c0.516-11.428,1.345-22.959,3.215-34.818c0.953-5.934,2.167-11.955,3.998-18.148c1.869-6.184,4.242-12.602,8.475-19.179      c2.131-3.267,4.791-6.584,8.267-9.577c3.445-2.989,7.789-5.568,12.467-7.102c4.677-1.555,9.511-2.056,13.88-1.859      c4.394,0.189,8.378,1,12.02,2.054c3.643,1.063,6.959,2.388,10.078,3.827l4.066,1.945l3.877,1.904c5.14,2.553,10.2,5.17,15.197,7.809      c19.981,10.589,39.014,21.316,58.411,30.339c19.363,9.075,39.097,16.509,59.433,21.989c40.643,11.043,83.389,14.449,126.334,13.574      v44c-22.955-0.441-46.019-2.023-69.008-5.248c-22.978-3.223-45.896-8.137-68.229-15.154c-22.339-6.972-44.006-16.159-64.481-26.77      c-20.519-10.562-39.78-22.473-58.658-33.436c-4.726-2.74-9.436-5.416-14.15-7.994L2591.44,418l-3.382-1.789      c-1.886-0.971-3.72-1.771-5.389-2.34c-1.666-0.57-3.162-0.901-4.32-1.016c-1.173-0.118-1.956-0.045-2.578,0.09      c-0.621,0.152-1.196,0.375-1.995,0.967c-0.786,0.581-1.74,1.555-2.702,2.896c-1.949,2.683-3.803,6.672-5.29,11.059      c-1.504,4.406-2.714,9.255-3.718,14.254c-2,10.031-3.223,20.666-4.126,31.407c-1.763,21.538-2.28,43.612-2.743,65.755      c-0.441,22.162-0.729,44.463-1.537,66.853c-0.404,11.196-0.938,22.417-1.713,33.659c-0.412,5.657-0.773,11.13-1.443,17.107      c-0.686,5.883-1.657,11.825-3.248,17.855c-1.628,6.015-3.774,12.194-7.7,18.256c-1.975,3.008-4.464,5.984-7.658,8.504      c-3.171,2.523-7.085,4.475-11.104,5.425c-4.024,0.976-8.023,1.019-11.655,0.56c-3.648-0.464-6.986-1.4-10.092-2.541      c-6.203-2.31-11.558-5.399-16.568-8.707c-9.971-6.672-18.588-14.329-26.827-22.161l-1.534-1.474l-0.454-0.444l-0.204-0.219      l-0.408-0.438l-0.797-0.883c-1.051-1.186-2.047-2.396-2.997-3.624c-1.898-2.457-3.613-4.983-5.196-7.548      c-3.16-5.132-5.799-10.41-8.139-15.743c-4.657-10.676-8.156-21.569-11.137-32.515c-2.963-10.95-5.371-21.969-7.444-33.014      c-4.129-22.094-6.966-44.291-9.165-66.508c-2.184-22.218-3.686-44.462-4.745-66.709c-1.054-22.247-1.657-44.498-1.897-66.746      c-0.224-22.246-0.146-44.487,0.467-66.721L2403,311.52z",
        color: "#32B1BA",
        offset: {x: 0, y: -30},
        techs: [{
            title: gettext("Web\nWorkers"),
            info: gettext("Allow scripts to run in the\nbackground to handle computationally\nintensive tasks, without blocking\nthe UI or other scripts\nthat handle user interactions."),
            url: "http://www.html5rocks.com/en/tutorials/workers/basics/",
            position: {x: 2405.988, y: 287}
        }],
        adaps: [{x: 2558, y: 397.621, b: "Opera"}, {x: 2423, y: 547.485, b: "Safari"}, {
            x: 2423,
            y: 622.443,
            b: "Firefox"
        }, {x: 2454, y: 697.193, b: "Chrome"}]
    }, {
        name: "Date/time input types",
        path: "M2518.271,314.66      c-0.816,4.071-0.824,8.309-0.442,12.413c0.402,4.118,1.284,8.157,2.562,12.035c2.554,7.769,6.701,14.853,11.795,21.079      c5.1,6.24,11.139,11.651,17.663,16.384c6.534,4.731,13.565,8.791,20.855,12.348c14.607,7.099,30.209,12.231,46.101,16.251      c15.911,4,32.163,6.857,48.535,8.988c32.769,4.223,66.005,5.614,99.261,5.563c33.271-0.079,66.604-1.677,99.899-4.208v62      c-34.512-2.553-69.01-6.072-103.369-11.172c-34.344-5.129-68.598-11.756-102.239-21.352c-16.807-4.819-33.456-10.4-49.694-17.191      c-16.213-6.81-32.078-14.802-46.734-24.876c-7.312-5.044-14.307-10.622-20.682-16.888c-6.364-6.264-12.116-13.23-16.684-20.934      c-4.564-7.686-7.908-16.129-9.38-24.848c-0.739-4.354-1.021-8.764-0.792-13.121c0.252-4.354,0.908-8.668,2.393-12.766      L2518.271,314.66z",
        color: "#32B1BA",
        techs: [{
            title: gettext("Date/time\ninput types"),
            info: gettext("Allows the user to select\na date and time with time zone."),
            url: "http://www.html5rocks.com/en/tutorials/forms/html5forms/",
            position: {x: 2517, y: 297.322}
        }],
        adaps: [{x: 2558, y: 397.621, b: "Opera"}]
    }, {
        name: "Touch Events",
        path: "M2663.997,279.571c-0.844,11.763-1.282,23.557-1.562,35.339      c-0.267,11.785-0.321,23.568-0.178,35.342c0.292,23.545,1.366,47.051,3.326,70.436c1.966,23.38,4.817,46.643,8.805,69.623      c3.994,22.971,9.119,45.674,15.8,67.735c6.688,22.042,14.938,43.477,25.354,63.417c10.404,19.91,23.049,38.328,38.245,53.475      c7.589,7.568,15.797,14.299,24.544,19.988c8.745,5.693,18.027,10.34,27.698,13.875c19.343,7.104,40.21,9.67,61.321,8.713v46      c-13.041-0.468-26.175-1.998-39.12-4.854c-12.94-2.845-25.684-7.035-37.789-12.614c-12.108-5.569-23.554-12.524-33.989-20.587      c-10.444-8.06-19.879-17.198-28.254-27.012c-16.775-19.668-29.319-41.828-39.007-64.578c-9.679-22.801-16.581-46.296-21.751-69.928      c-5.152-23.646-8.555-47.465-10.771-71.283c-2.207-23.822-3.216-47.656-3.322-71.436c-0.101-23.779,0.702-47.51,2.289-71.154      c0.796-11.822,1.789-23.623,2.995-35.396c1.219-11.771,2.595-23.52,4.373-35.216L2663.997,279.571z",
        color: "#32B1BA",
        techs: [{
            title: gettext("Touch Events"),
            info: gettext("An HTML5 specification that allows\ndevelopers to easily build\ntouch-enabled web apps for\ntouch-sensitive surfaces."),
            url: "http://www.w3.org/TR/touch-events/",
            position: {x: 2665.006, y: 267.164},
            background: !0
        }],
        adaps: [{x: 2693, y: 622.443, b: "Firefox"}]
    }, {
        name: "Content Security Policy",
        path: "M2726.486,199.75      c-8.436,17.513-16.207,35.348-23.655,53.295c-7.427,17.958-14.449,36.076-21.038,54.338c-13.158,36.523-24.66,73.636-33.521,111.287      c-4.417,18.822-8.156,37.781-10.942,56.829c-2.78,19.044-4.617,38.189-5.023,57.274c-0.396,19.07,0.629,38.111,3.897,56.582      c3.277,18.436,8.862,36.336,17.66,52.221c4.388,7.936,9.563,15.344,15.508,22.011c2.972,3.333,6.123,6.491,9.46,9.437      c0.829,0.741,1.676,1.463,2.529,2.176l3.058,2.513c1.848,1.646,3.52,3.111,5.289,4.589c3.501,2.925,7.084,5.672,10.727,8.123      c3.634,2.441,7.348,4.598,10.935,6.153c3.552,1.565,7.072,2.438,9.351,2.334c1.143-0.038,1.891-0.261,2.435-0.54      c0.545-0.285,1.016-0.655,1.635-1.385c1.239-1.422,2.654-4.449,3.546-8.066c0.925-3.627,1.469-7.793,1.745-12.094      c0.138-2.154,0.21-4.354,0.229-6.578c0.021-2.248-0.02-4.418-0.086-6.816c-0.13-4.703-0.344-9.474-0.586-14.278      c-0.995-19.241-2.291-38.935-2.466-58.89c-0.171-19.961,0.619-40.267,3.995-60.791c1.702-10.254,4.074-20.561,7.474-30.771      c3.397-10.199,7.854-20.32,13.729-29.9c5.861-9.57,13.202-18.563,21.865-26.217c8.641-7.674,18.538-13.943,28.917-18.625      c10.387-4.703,21.211-7.881,31.995-9.924c10.798-2.041,21.575-2.978,32.203-3.186v38.666c-17.624-0.41-34.86,1.672-49.844,7.707      c-7.488,3.004-14.383,6.986-20.523,11.975c-6.146,4.979-11.538,10.973-16.138,17.799c-9.227,13.664-15.156,30.495-18.851,48.207      c-3.704,17.764-5.288,36.451-5.905,55.374c-0.629,18.96-0.181,38.157,0.02,57.804c0.042,4.918,0.058,9.873-0.013,14.897      c-0.034,2.466-0.095,5.159-0.23,7.772c-0.134,2.637-0.331,5.296-0.617,7.986c-0.587,5.383-1.476,10.884-3.197,16.624      c-0.872,2.87-1.96,5.805-3.469,8.79c-1.512,2.976-3.457,6.036-6.162,8.886c-2.678,2.841-6.226,5.409-10.187,6.972      c-3.954,1.592-8.109,2.147-11.824,2.037c-3.739-0.105-7.105-0.797-10.175-1.711c-3.07-0.923-5.862-2.084-8.485-3.355      c-5.234-2.559-9.822-5.55-14.134-8.709c-4.303-3.166-8.307-6.525-12.13-10.001c-1.896-1.72-3.808-3.544-5.523-5.208      c0.876,0.758,0.136,0.117,0.282,0.244l-0.188-0.162l-0.374-0.324l-0.747-0.648l-1.479-1.318c-0.979-0.885-1.948-1.781-2.897-2.698      c-3.815-3.648-7.398-7.534-10.743-11.597c-6.692-8.131-12.372-17.013-17.035-26.295c-9.353-18.602-14.635-38.623-17.387-58.572      c-2.73-19.996-2.987-40.034-1.803-59.822c1.201-19.799,3.868-39.379,7.468-58.711c3.606-19.335,8.161-38.43,13.378-57.303      c10.461-37.744,23.503-74.619,38.148-110.766c7.333-18.072,15.087-35.961,23.232-53.66c8.168-17.689,16.644-35.229,25.777-52.436      L2726.486,199.75z",
        color: "#E66E6E",
        techs: [{
            title: gettext("Content Security\nPolicy"),
            info: gettext("A mechanism to prevent\nsome of the more severe\nweb-based attacks against\nusers and websites."),
            url: "http://www.html5rocks.com/en/tutorials/security/content-security-policy/",
            position: {x: 2727.172, y: 186.998},
            background: !0
        }],
        adaps: [{x: 2641, y: 622.443, b: "Firefox"}, {x: 2692, y: 697.193, b: "Chrome"}]
    }, {
        name: "Full Screen API",
        path: "M2780.375,303.287c-8.124,13.172-15.545,26.777-22.622,40.522      c-7.055,13.761-13.681,27.728-19.858,41.868c-12.339,28.281-22.932,57.281-31.003,86.84c-8.043,29.538-13.587,59.697-15.042,89.81      c-1.452,30.056,1.33,60.145,10.216,87.962c4.426,13.893,10.355,27.168,17.765,39.475c1.846,3.08,3.797,6.092,5.818,9.049      l0.767,1.104l0.384,0.552c-0.923-1.332-0.191-0.288-0.368-0.548l0.105,0.133c0.023,0.021,0.027,0.023,0.064,0.063      c0.316,0.36,0.703,0.771,1.12,1.179c0.836,0.82,1.797,1.635,2.746,2.321c0.948,0.688,1.899,1.253,2.688,1.612      c0.778,0.361,1.406,0.499,1.488,0.441c0.115-0.043-0.505-0.265-1.567-0.061c-0.51,0.096-1.063,0.295-1.49,0.518      c-0.433,0.223-0.731,0.441-0.892,0.559c-0.321,0.252-0.146,0.02,0.084-0.619c0.238-0.646,0.545-1.635,0.801-2.812      c0.524-2.373,0.868-5.402,1.015-8.586c0.078-1.596,0.104-3.252,0.1-4.932l-0.038-2.547l-0.086-2.655l-0.503-11.427      c-0.743-15.544-1.324-31.727-0.484-48.23c0.851-16.504,3-33.476,8.142-50.51c2.58-8.5,5.939-17.002,10.336-25.23      c4.39-8.22,9.84-16.158,16.356-23.318c6.501-7.166,14.05-13.512,22.2-18.727c8.15-5.227,16.861-9.33,25.688-12.438      c17.711-6.214,35.694-8.607,53.046-9.14v50c-13.598-0.515-26.811,0.525-38.658,3.806c-11.866,3.271-22.2,8.776-30.617,16.841      c-8.443,8.026-15.013,18.766-19.688,31.168c-4.696,12.396-7.545,26.256-9.227,40.613c-1.699,14.4-2.19,29.26-2.468,44.697      l-0.263,11.82l-0.109,3.156l-0.17,3.262c-0.143,2.192-0.326,4.406-0.591,6.671c-0.537,4.53-1.3,9.204-2.823,14.31      c-0.776,2.556-1.757,5.237-3.192,8.088c-1.46,2.842-3.379,5.932-6.429,8.944c-1.522,1.493-3.338,2.942-5.438,4.155      c-2.089,1.217-4.446,2.175-6.833,2.752c-2.389,0.583-4.779,0.791-6.985,0.726c-2.212-0.065-4.246-0.39-6.093-0.845      c-3.699-0.925-6.671-2.323-9.285-3.823c-2.604-1.514-4.849-3.167-6.911-4.916c-2.059-1.755-3.93-3.602-5.71-5.638      c-0.89-1.021-1.757-2.091-2.621-3.268l-0.374-0.516l-0.69-1.002l-0.403-0.67l-0.807-1.34c-2.121-3.59-4.15-7.231-6.051-10.936      c-7.631-14.803-13.39-30.459-17.334-46.407c-3.95-15.956-6.107-32.188-6.815-48.336c-0.706-16.155,0.022-32.229,1.825-48.075      c3.64-31.709,11.47-62.465,21.675-92.133c10.242-29.679,22.909-58.32,37.214-86c7.161-13.838,14.745-27.436,22.731-40.777      c8.009-13.326,16.331-26.453,25.338-39.115L2780.375,303.287z",
        color: "#32B1BA",
        offset: {x: -20, y: 0},
        techs: [{
            title: gettext("Full Screen API"),
            info: gettext("Allows web content to be\npresented using the\nuser's entire screen"),
            url: "https://developer.mozilla.org/en/DOM/Using_full-screen_mode",
            position: {x: 2780, y: 294.13},
            background: !0
        }],
        adaps: [{x: 2682, y: 547.485, b: "Safari"}, {x: 2745, y: 622.443, b: "Firefox"}, {
            x: 2713,
            y: 697.193,
            b: "Chrome"
        }]
    }, {
        name: "CSS3 Gradients",
        path: "M2437.562,765.39c3.062-18.466,7.296-36.696,12.059-54.846      c2.467-9.049,5.098-18.07,7.967-27.054c2.919-8.965,6.117-17.869,9.678-26.718c3.562-8.855,7.562-17.606,12.449-26.21      c2.449-4.307,5.168-8.547,8.36-12.713c3.233-4.139,6.863-8.28,11.979-11.913c2.57-1.788,5.566-3.456,9.167-4.545      c3.567-1.098,7.81-1.47,11.833-0.739c4.037,0.701,7.645,2.373,10.569,4.304c2.952,1.944,5.302,4.157,7.357,6.386      c4.067,4.484,6.978,9.105,9.536,13.705c0.639,1.152,1.239,2.305,1.826,3.457l0.858,1.73l0.106,0.217      c0.119,0.272-0.117-0.305,0.294,0.666l0.172,0.397l0.34,0.782l2.763,6.242c7.483,16.552,15.726,32.801,25.197,47.644      c4.737,7.375,9.829,14.43,15.276,20.308c2.711,2.918,5.526,5.527,8.221,7.451c2.671,1.947,5.247,3.064,6.683,3.232      c0.73,0.102,1.14,0.027,1.48-0.074c0.338-0.113,0.689-0.271,1.278-0.652c1.159-0.721,3.096-2.576,4.922-5.225      c1.849-2.635,3.639-5.93,5.271-9.479c1.635-3.562,3.115-7.409,4.465-11.389c2.701-7.972,4.899-16.456,6.796-25.093l5.929-27.234      c3.962-18.197,7.944-36.413,12.015-54.636c4.101-18.218,8.328-36.431,12.722-54.659c4.407-18.228,8.984-36.459,14.008-54.736      c2.506-9.145,5.177-18.283,8.056-27.475c2.897-9.197,5.973-18.411,9.686-27.866c1.877-4.739,3.895-9.526,6.414-14.584      c1.272-2.536,2.662-5.138,4.405-7.942c0.875-1.404,1.841-2.861,2.998-4.421c1.161-1.558,2.499-3.222,4.312-5.071      c1.864-1.844,4.098-3.949,8.007-6.152c1.979-1.082,4.386-2.17,7.478-2.909c1.518-0.366,3.231-0.626,4.987-0.727      c1.788-0.094,3.638-0.023,5.474,0.241c3.666,0.516,7.117,1.821,9.739,3.307c2.666,1.494,4.676,3.14,6.226,4.625      c3.092,3.018,4.738,5.555,6.08,7.75c1.303,2.196,2.212,4.106,2.985,5.883c0.766,1.771,1.377,3.405,1.921,4.974      c1.072,3.125,1.854,5.978,2.544,8.743c0.681,2.756,1.248,5.41,1.755,8.016l0.714,3.871l0.166,0.957l0.082,0.478      c-0.146-1.191,0.244,1.894,0.211,1.653c0.024,0.232-0.021-0.254-0.014-0.174c0.007-0.014,0.059,0.312,0.111,0.584      c0.229,1.217,0.608,2.787,1.057,4.305c0.452,1.537,0.985,3.101,1.587,4.647c2.415,6.213,5.867,12.081,10.12,17.197      c4.261,5.128,9.335,9.573,15.115,13.312c5.781,3.738,12.298,6.739,19.333,9.042c14.09,4.598,30.136,6.449,46.662,6.254v52      c-10.335-0.098-20.823-0.791-31.412-2.369c-10.582-1.575-21.282-4.047-31.839-7.828c-10.546-3.767-20.972-8.828-30.648-15.467      c-9.677-6.611-18.553-14.818-25.847-24.283c-7.319-9.455-13.072-20.035-17.021-31.309c-0.988-2.824-1.864-5.699-2.623-8.654      c-0.759-2.974-1.399-5.949-1.905-9.326c-0.128-0.878-0.241-1.703-0.363-2.873l-0.059-0.607c-0.042-0.385,0.315,2.557,0.151,1.222      l-0.054-0.384l-0.107-0.766l-0.456-3.009c-0.319-1.973-0.667-3.881-1.044-5.654c-0.374-1.764-0.788-3.411-1.175-4.704      c-0.189-0.639-0.374-1.192-0.508-1.566c-0.128-0.367-0.22-0.562-0.09-0.375c0.165,0.193,0.463,0.809,1.889,2.197      c0.718,0.673,1.804,1.598,3.456,2.52c1.615,0.904,3.949,1.818,6.467,2.158c1.26,0.18,2.526,0.232,3.733,0.16      c1.177-0.059,2.312-0.25,3.264-0.476c1.957-0.479,3.284-1.104,4.241-1.636c1.865-1.084,2.305-1.67,2.521-1.879      c0.17-0.202,0.007-0.081-0.237,0.213c-0.251,0.293-0.602,0.756-0.98,1.311c-0.767,1.112-1.646,2.578-2.52,4.168      c-1.76,3.206-3.522,6.931-5.211,10.783c-3.385,7.748-6.535,16.083-9.537,24.531c-3.005,8.463-5.85,17.098-8.656,25.786      c-5.587,17.395-10.834,35.063-15.933,52.816c-5.1,17.757-10.016,35.619-14.904,53.517c-4.915,17.892-9.755,35.832-14.585,53.797      l-7.26,27.008c-2.559,9.426-5.471,18.867-9.205,28.358c-1.876,4.746-3.962,9.507-6.445,14.289c-2.495,4.781-5.362,9.591-9.147,14.37      c-1.896,2.385-4.039,4.764-6.582,7.053c-2.54,2.281-5.505,4.489-9.036,6.307c-3.509,1.814-7.63,3.187-11.908,3.679      c-4.274,0.511-8.583,0.136-12.38-0.823c-3.816-0.953-7.163-2.418-10.107-4.053c-2.948-1.643-5.521-3.467-7.855-5.354      c-4.659-3.785-8.427-7.814-11.836-11.896c-6.759-8.185-12.089-16.638-16.962-25.182c-4.842-8.55-9.135-17.211-13.124-25.945      c-3.983-8.736-7.65-17.546-11.085-26.426l-2.53-6.67l-0.311-0.838l-0.152-0.411c0.358,0.835,0.057,0.128,0.117,0.267l-0.075-0.18      l-0.604-1.438c-0.41-0.948-0.827-1.888-1.261-2.8c-1.719-3.648-3.67-7.045-5.708-9.597c-1.009-1.267-2.036-2.307-2.917-3.006      c-0.891-0.715-1.58-1.076-2.119-1.264c-0.545-0.182-1.072-0.272-1.98-0.117c-0.891,0.153-2.096,0.617-3.402,1.385      c-2.646,1.535-5.578,4.141-8.289,7.134c-2.74,3.005-5.326,6.434-7.826,10.003c-4.982,7.179-9.461,15.035-13.74,23.049      c-4.26,8.036-8.197,16.328-11.99,24.717c-3.84,8.374-7.483,16.875-10.979,25.453c-7.115,17.117-13.68,34.527-20.126,52.04      L2437.562,765.39z",
        color: "#9253A1",
        techs: [{
            title: gettext("CSS3\nGradients"),
            info: gettext("A method to easily\ngenerate an image that\nsmoothly fades from one\ncolor to another."),
            url: "http://dev.w3.org/csswg/css3-images/#gradients",
            position: {x: 2440, y: 779},
            background: !0
        }],
        adaps: [{x: 2734, y: 397.621, b: "Opera"}, {x: 2682, y: 547.485, b: "Safari"}, {
            x: 2496,
            y: 622.443,
            b: "Firefox"
        }, {x: 2640, y: 697.193, b: "Chrome"}]
    }, {
        name: "Audio & Video elements",
        path: "M2517.271,755.625      c-6.279-3.057-12.161-6.799-17.868-10.807c-5.693-4.027-11.15-8.406-16.361-13.078c-10.422-9.348-19.849-19.883-28.078-31.351      c-8.23-11.466-15.25-23.87-20.935-36.9c-5.69-13.03-10.048-26.679-13.118-40.622c-6.162-27.918-7.16-56.862-4.582-85.279      c2.583-28.46,8.662-56.469,16.895-83.68l0.175-0.576l0.729-1.48c0.537-1.092,1.206-2.426,1.86-3.678c0.663-1.27,1.35-2.54,2.057-3.8      c1.415-2.521,2.911-5.006,4.493-7.448c3.163-4.883,6.666-9.603,10.555-14.095c7.758-8.967,17.16-17.085,28.228-23.126      c5.519-3.018,11.429-5.492,17.561-7.294c6.131-1.808,12.474-2.933,18.81-3.396c12.701-0.938,25.217,0.786,36.809,4.025      c11.626,3.247,22.428,7.959,32.548,13.386c10.121,5.443,19.58,11.629,28.563,18.227c17.952,13.227,34.066,28.048,49.19,43.52      l2.819,2.914l1.401,1.463l0.699,0.733l0.35,0.366c0.216,0.229-1.567-1.662-0.771-0.822l0.088,0.084l0.178,0.166l5.563,5.203      c3.624,3.342,7.263,6.57,10.973,9.722c7.414,6.298,15.075,12.255,22.962,17.842c15.773,11.169,32.445,20.841,49.748,28.638      c17.301,7.797,35.232,13.711,53.449,17.429c18.215,3.733,36.703,5.269,55.09,4.604v60c-23.128-0.659-46.145-4.111-68.272-10.164      c-22.141-6.035-43.37-14.643-63.289-25.213c-19.929-10.578-38.563-23.102-55.82-37.067c-8.628-6.987-16.92-14.339-24.856-22.012      c-3.967-3.832-7.852-7.756-11.615-11.702l-5.453-5.796l-1.188-1.265l-0.3-0.358l-0.601-0.716l-1.203-1.43l-2.418-2.843      c-12.949-15.082-26.662-29.344-41.401-41.731c-7.367-6.181-14.994-11.873-22.866-16.787c-7.867-4.904-15.99-9.032-24.209-11.915      c-8.214-2.888-16.503-4.505-24.562-4.452c-8.061,0.041-15.908,1.76-23.342,5.203c-7.432,3.427-14.428,8.568-20.668,14.898      c-3.121,3.16-6.059,6.611-8.783,10.273c-1.363,1.83-2.671,3.714-3.925,5.644c-0.628,0.966-1.24,1.941-1.844,2.936      c-0.614,1.012-1.173,1.964-1.86,3.159l0.904-2.057c-9.863,25.018-17.707,50.829-22.3,77.229      c-4.582,26.366-5.862,53.383-2.243,79.951c3.571,26.531,12.221,52.559,26.224,75.813c6.979,11.624,15.24,22.55,24.642,32.481      c4.701,4.964,9.685,9.683,14.945,14.09c5.27,4.384,10.783,8.559,16.685,12.053L2517.271,755.625z",
        color: "#32B1BA",
        techs: [{
            title: gettext("Audio & Video\nelements"),
            info: gettext("HTML5 elements which allow\nvideo and sound to be easily\nembedded and played in webpages,\nwithout requiring additional\nsoftware or plugins."),
            url: "http://www.html5rocks.com/en/tutorials/video/basics/",
            position: {x: 2521, y: 757},
            background: !0
        }],
        adaps: [{x: 2516, y: 397.621, b: "Opera"}, {x: 2641, y: 472.621, b: "Internet Explorer"}, {
            x: 2423,
            y: 547.485,
            b: "Safari"
        }, {x: 2423, y: 622.443, b: "Firefox"}, {x: 2454, y: 697.193, b: "Chrome"}]
    }];
var browsers = [{
    name: "mosaic",
    start: {y: 247.663, x: 382.602},
    end: {x: 901.095},
    image: {width: 29, height: 32},
    title: gettext("Mosaic"),
    versions: [{type: "desktop", number: "0.1", x: 401, description: gettext("Released March 1993")}, {
        type: "desktop",
        number: "1",
        x: 608,
        description: gettext("Released April 1993")
    }, {type: "desktop", number: "2", x: 722, description: gettext("Released December 1993")}, {
        type: "desktop",
        number: "2.1",
        x: 753,
        description: gettext("Released January 1996")
    }, {type: "desktop", number: "3", x: 878, description: gettext("Released January 1997")}]
},
    {
        name: "netscape",
        start: {y: 322.621, x: 579.573},
        end: {x: 2238.771},
        image: {width: 40, height: 40},
        title: gettext("NetScape"),
        versions: [{
            type: "desktop",
            number: "0.9",
            x: 598,
            description: gettext("Released October 1994")
        }, {type: "desktop", number: "1", x: 619, description: gettext("Released December 1994")}, {
            type: "desktop",
            number: "1.1",
            x: 650,
            description: gettext("Released March 1995")
        }, {type: "desktop", number: "1.22", x: 702, description: gettext("Released August 1995")}, {
            type: "desktop",
            number: "2",
            x: 774,
            description: gettext("Released March 1996")
        },
            {type: "desktop", number: "3", x: 826, description: gettext("Released August 1996")}, {
                type: "desktop",
                number: "4",
                x: 930,
                description: gettext("Released June 1997")
            }, {
                type: "desktop",
                number: "4.5",
                x: 1096,
                description: gettext("Released October 1998")
            }, {
                type: "desktop",
                number: "6",
                x: 1355,
                description: gettext("Released November 2000")
            }, {
                type: "desktop",
                number: "6.1",
                x: 1448,
                description: gettext("Released August 2001")
            }, {type: "desktop", number: "6.2", x: 1469, description: gettext("Released October 2001")}, {
                type: "desktop", number: "7",
                x: 1573, description: gettext("Released August 2002")
            }, {type: "desktop", number: "7.1", x: 1676, description: gettext("Released June 2003")}, {
                type: "desktop",
                number: "7.2",
                x: 1822,
                description: gettext("Released August 2004")
            }, {type: "desktop", number: "8", x: 1915, description: gettext("Released May 2005")}, {
                type: "desktop",
                number: "8.1",
                x: 1998,
                description: gettext("Released January 2006")
            }, {type: "desktop", number: "9", x: 2216, description: gettext("Released October 2007")}]
    }, {
        name: "opera",
        start: {y: 397.621, x: 641.799},
        end: {x: 2867},
        image: {width: 30, height: 31},
        title: gettext("Opera"),
        versions: [{
            type: "desktop",
            number: "1",
            x: 660,
            description: gettext("Released April 1995")
        }, {type: "desktop", number: "2", x: 785, description: gettext("Released April 1996")}, {
            type: "desktop",
            number: "2.1",
            x: 867,
            description: gettext("Released April 1996")
        }, {type: "desktop", number: "3", x: 992, description: gettext("Released December 1997")}, {
            type: "desktop",
            number: "3.5",
            x: 1106,
            description: gettext("Released November 1998")
        }, {type: "desktop", number: "3.6", x: 1168, description: gettext("Released May 1999")},
            {type: "desktop", number: "4", x: 1303, description: gettext("Released June 2000")}, {
                type: "desktop",
                number: "5",
                x: 1365,
                description: gettext("Released December 2000")
            }, {
                type: "desktop",
                number: "6",
                x: 1490,
                description: gettext("Released December 2001")
            }, {
                type: "desktop",
                number: "6.1",
                x: 1593,
                description: gettext("Released October 2002")
            }, {type: "desktop", number: "7", x: 1624, description: gettext("Released January 2003")}, {
                type: "desktop",
                number: "7.1",
                x: 1656,
                description: gettext("Released April 2003")
            }, {
                type: "desktop", number: "7.2",
                x: 1707, description: gettext("Released September 2003")
            }, {type: "desktop", number: "7.5", x: 1790, description: gettext("Released May 2004")}, {
                type: "desktop",
                number: "8",
                x: 1904,
                description: gettext("Released April 2005")
            }, {
                type: "desktop",
                number: "8.5",
                x: 1956,
                description: gettext("Released September 2005")
            }, {type: "desktop", number: "9", x: 2050, description: gettext("Released June 2006")}, {
                type: "desktop",
                number: "9.1",
                x: 2112,
                description: gettext("Released December 2006")
            }, {type: "desktop", number: "9.2", x: 2153, description: gettext("Released April 2007")},
            {type: "desktop", number: "9.5", x: 2299, description: gettext("Released June 2008")}, {
                type: "desktop",
                number: "9.6",
                x: 2340,
                description: gettext("Released November 2009")
            }, {
                type: "desktop",
                number: "10",
                x: 2454,
                description: gettext("Released September 2009")
            }, {
                type: "desktop",
                number: "10.1",
                x: 2475,
                description: gettext("Released November 2009"),
                up: !0
            }, {
                type: "desktop",
                number: "10.5",
                x: 2516,
                description: gettext("Released March 2010")
            }, {type: "desktop", number: "10.6", x: 2558, description: gettext("Released July 2010")}, {
                type: "desktop",
                number: "11", x: 2610, description: gettext("Released December 2010")
            }, {
                type: "desktop",
                number: "11.1",
                x: 2651,
                description: gettext("Released April 2011")
            }, {
                type: "desktop",
                number: "11.5",
                x: 2672,
                up: !0,
                description: gettext("Released June 2011")
            }, {
                type: "desktop",
                number: "11.6",
                x: 2734,
                description: gettext("Released December 2011")
            }, {type: "desktop", number: "12", x: 2796, description: gettext("Released June 2012")}, {
                type: "mobile",
                number: "1",
                x: 1944,
                description: gettext("Initial release\nof Opera Mini")
            }]
    }, {
        name: "explorer",
        start: {y: 472.621, x: 683.234},
        end: {x: 2867},
        image: {width: 32, height: 32},
        title: gettext("Internet Explorer"),
        versions: [{
            type: "desktop",
            number: "1",
            x: 701,
            description: gettext("Released August 16, 1995")
        }, {type: "desktop", number: "2", x: 733, description: gettext("Released November 1995")}, {
            type: "desktop",
            number: "3",
            x: 826,
            description: gettext("Released August 13, 1996")
        }, {type: "desktop", number: "4", x: 971, description: gettext("Released September 1997")}, {
            type: "desktop",
            number: "5",
            x: 1147,
            description: gettext("Released March 18, 1999")
        },
            {type: "desktop", number: "5.5", x: 1314, description: gettext("Released July 8, 2000")}, {
                type: "desktop",
                number: "6",
                x: 1469,
                description: gettext("Released August 27, 2001")
            }, {
                type: "desktop",
                number: "7",
                x: 2091,
                description: gettext("Released October 18, 2006")
            }, {
                type: "desktop",
                number: "8",
                x: 2392,
                description: gettext("Released March 19, 2009")
            }, {
                type: "desktop",
                number: "9",
                x: 2641,
                description: gettext("Released March 14, 2011")
            }, {
                type: "mobile",
                number: "1",
                x: 862,
                description: gettext("Pocket Internet Explorer\non Windows CE 1.0\nreleased")
            }]
    },
    {
        name: "safari",
        start: {y: 547.485, x: 1658.084},
        end: {x: 2867},
        image: {width: 36, height: 40},
        title: gettext("Safari"),
        versions: [{
            type: "desktop",
            number: "1",
            x: 1676,
            description: gettext("Released June 23, 2003")
        }, {type: "desktop", number: "2", x: 1904, description: gettext("Released April 29, 2005")}, {
            type: "desktop",
            number: "3",
            x: 2174,
            description: gettext("Released January 9, 2007")
        }, {type: "desktop", number: "3.1", x: 2267, description: gettext("Released March 2008")}, {
            type: "desktop",
            number: "4",
            x: 2423,
            description: gettext("Released June 2, 2008")
        },
            {type: "desktop", number: "5", x: 2547, description: gettext("Released June 7, 2010")}, {
                type: "desktop",
                number: "5.1",
                x: 2682,
                description: gettext("Released July 20, 2011")
            }, {
                type: "mobile",
                number: "1",
                x: 2195,
                description: gettext("First iPhone released\nwith mobile version\nof Safari 3")
            }]
    }, {
        name: "firefox",
        start: {y: 622.443, x: 1834.361},
        end: {x: 2867},
        image: {width: 37, height: 36},
        title: gettext("Firefox"),
        versions: [{type: "desktop", number: "1", x: 1853, description: gettext("Released November 9, 2004")}, {
            type: "desktop", number: "1.5",
            x: 1977, description: gettext("Released November 29, 2005")
        }, {type: "desktop", number: "2", x: 2091, description: gettext("Released October 24, 2006")}, {
            type: "desktop",
            number: "3",
            x: 2299,
            description: gettext("Released June 17, 2008")
        }, {type: "desktop", number: "3.5", x: 2423, description: gettext("Released June 30, 2009")}, {
            type: "desktop",
            number: "3.6",
            x: 2496,
            description: gettext("Released January 2010")
        }, {type: "desktop", number: "4", x: 2641, description: gettext("Released March 22, 2011")}, {
            type: "desktop", number: "5", x: 2672,
            description: gettext("Released June 21, 2011")
        }, {type: "desktop", number: "6", x: 2693, description: gettext("Released August 16, 2011")}, {
            type: "desktop",
            number: "7",
            x: 2703,
            up: !0,
            description: gettext("Released September 2011")
        }, {type: "desktop", number: "8", x: 2724, description: gettext("Released November 2011")}, {
            type: "desktop",
            number: "9",
            x: 2734,
            up: !0,
            description: gettext("Released December 2011")
        }, {type: "desktop", number: "10", x: 2745, description: gettext("Released January 2012")}, {
            type: "desktop", number: "11", x: 2765,
            description: gettext("Released March 2012")
        }, {
            type: "desktop",
            number: "12",
            x: 2776,
            up: !0,
            description: gettext("Released April 2012")
        }, {type: "desktop", number: "13", x: 2796, description: gettext("Released June 2012")}, {
            type: "mobile",
            number: "1",
            x: 2484,
            description: gettext("Firefox for mobile\nversion 1 released")
        }]
    }, {
        name: "chrome",
        start: {y: 697.193, x: 2342.521},
        end: {x: 2867},
        image: {width: 36, height: 36},
        title: gettext("Chrome"),
        versions: [{type: "desktop", number: "1", x: 2361, description: gettext("Released December 11, 2008")},
            {type: "desktop", number: "2", x: 2413, description: gettext("Released May 24, 2009")}, {
                type: "desktop",
                number: "3",
                x: 2454,
                description: gettext("Released October 12, 2009")
            }, {
                type: "desktop",
                number: "4",
                x: 2496,
                description: gettext("Released January 25, 2010")
            }, {type: "desktop", number: "5", x: 2537, description: gettext("Released May 21, 2010")}, {
                type: "desktop",
                number: "6",
                x: 2579,
                description: gettext("Released September 2, 2010")
            }, {type: "desktop", number: "7", x: 2589, up: !0, description: gettext("Released October 21, 2010")},
            {
                type: "desktop",
                number: "8",
                x: 2610,
                description: gettext("Released December 2, 2010")
            }, {
                type: "desktop",
                number: "9",
                x: 2630,
                description: gettext("Released February 3, 2011")
            }, {
                type: "desktop",
                number: "10",
                x: 2640,
                up: !0,
                description: gettext("Released March 8, 2011")
            }, {
                type: "desktop",
                number: "11",
                x: 2651,
                description: gettext("Released April 27, 2011")
            }, {
                type: "desktop",
                number: "12",
                x: 2672,
                description: gettext("Released June 7, 2011")
            }, {type: "desktop", number: "13", x: 2692, description: gettext("Released August 9, 2011")},
            {
                type: "desktop",
                number: "14",
                x: 2703,
                up: !0,
                description: gettext("Released September 2011")
            }, {
                type: "desktop",
                number: "15",
                x: 2713,
                description: gettext("Released October 2011")
            }, {
                type: "desktop",
                number: "16",
                x: 2734,
                description: gettext("Released December 2011")
            }, {
                type: "desktop",
                number: "17",
                x: 2755,
                description: gettext("Released February 2012")
            }, {
                type: "desktop",
                number: "18",
                x: 2765,
                up: !0,
                description: gettext("Released April 2012")
            }, {type: "desktop", number: "19", x: 2786, description: gettext("Released May 2012")}, {
                type: "desktop",
                number: "20", x: 2796, up: !0, description: gettext("Released June 2012")
            }, {
                type: "mobile",
                number: "1",
                x: 2745,
                description: gettext("Chrome for Android\nBETA released")
            }, {type: "os", number: "1", x: 2661, up: !0, description: gettext("Chrome OS version\n1 released")}]
    }];
var growth = {
    legend: {
        users: gettext("Global Internet Users"),
        traffic: gettext("Global Internet Traffic\n(in petabytes per month)")
    }, users: {
        points: [{y: 2.63, t: gettext("2.63 Million users")}, {y: 2.63, t: ""}, {y: 2.63, t: ""}, {
            y: 9.99,
            t: gettext("9.99 Million")
        }, {y: 20.38, t: gettext("20.38 Million")}, {y: 39.14, t: gettext("39.14 Million")}, {
            y: 73,
            t: gettext("73 Million")
        }, {y: 117.7, t: gettext("117.70 Million")}, {y: 183.91, t: gettext("183.91 Million")}, {
            y: 276.95,
            t: gettext("276.95 Million")
        }, {y: 395.09, t: gettext("395.09 Million")},
            {y: 497.58, t: gettext("497.58 Million")}, {y: 658.66, t: gettext("658.66 Million")}, {
                y: 770.74,
                t: gettext("770.74 Million")
            }, {y: 897.35, t: gettext("897.35 Million")}, {y: 1002, t: gettext("1.02 Billion")}, {
                y: 1150,
                t: gettext("1.15 Billion")
            }, {y: 1370, t: gettext("1.37 Billion")}, {y: 1570, t: gettext("1.57 Billion")}, {
                y: 1800,
                t: gettext("1.80 Billion")
            }, {y: 2010, t: gettext("2.01 Billion")}, {y: 2270, t: gettext("2.27 Billion")}],
        plain: [{x: 6, o: 18, t: gettext("100 Million")}, {x: 11, o: 35, t: gettext("500 Million")}, {
            x: 15,
            o: 40,
            t: gettext("1 Billion")
        },
            {x: 17, o: 40, t: gettext("1.5 Billion")}, {x: 20, o: 40, t: gettext("2 Billion")}, {
                x: 21,
                o: 24,
                t: gettext("2.27 Billion")
            }]
    }, traffic: {
        points: [{y: 0.0010, t: gettext("0,001 Petabytes/mo")}, {y: 0.0010, t: ""}, {y: 0.0010, t: ""}, {
            y: 0.01,
            t: gettext("0,01 PB/mo.")
        }, {y: 0.02, t: gettext("0,02 PB/mo.")}, {y: 0.18, t: gettext("0,18 PB/mo.")}, {
            y: 1.9,
            t: gettext("1,9 PB/mo.")
        }, {
            y: 5.4, t: gettext("5.4 PB/mo."), tooltip: {
                x: 801,
                w: 156,
                t: gettext("5.4PB is equivalent to\ndata that can fit into\nmore than 1.2 million\nstandard DVDs"),
                v: "top",
                a: 69,
                img: "1997",
                img_w: 120,
                img_h: 62
            }
        }, {y: 12, t: gettext("12 PB/mo.")}, {y: 28, t: gettext("28 PB/mo.")}, {
            y: 84,
            t: gettext("84 PB/mo."),
            tooltip: {
                x: 1236,
                w: 156,
                t: gettext("If standard 320GB-\nhard drives were\nstacked on top of each\nother, 100PB of data\n(that is, 100 million\nGBs) would be taller\nthan the Burj Khalifa in\nDubai, the tallest\nstructure in the world."),
                v: "top",
                a: 69,
                img: "2000",
                img_w: 124,
                img_h: 65
            }
        }, {y: 197, t: gettext("197 PB/mo.")}, {y: 405, t: gettext("405 PB/mo.")}, {y: 784, t: gettext("784 PB/mo.")}, {
            y: 1477,
            t: gettext("1,477 PB/mo.")
        }, {y: 2426, t: gettext("2,426 PB/mo.")}, {y: 3992, t: gettext("3,992 PB/mo.")}, {
            y: 6430,
            t: gettext("6,430 PB/mo."),
            tooltip: {
                x: 2144,
                w: 163,
                t: gettext("If 6430PB of data were\nstored in standard\nDVDs and laid out on\nthe ground, it would\nspan 18.5 times the\nlength of the Trans-\nSiberian Railway."),
                v: "right",
                a: 55,
                img: "2007",
                img_w: 129,
                img_h: 70
            }
        }, {y: 9927, t: gettext("9,927 PB/mo.")}, {
            y: 14414, t: gettext("14,414 PB/mo."), tooltip: {
                x: 2390,
                w: 178,
                t: gettext("If 14,414PB of data were\nstored in standard\nDVDs placed side by side,\n it would span the distance\nfrom the Earth to the\nMoon."),
                v: "right",
                a: 55,
                img: "2009",
                img_w: 141,
                img_h: 66
            }
        }, {y: 20197, t: gettext("20,197 PB/mo.")}, {y: 27483, t: gettext("27,483 PB/mo.")}],
        plain: [{x: 5, o: 8, t: gettext("1 PB/mo.")}, {x: 12, o: 10, t: gettext("500 PB/mo.")}, {
            x: 15,
            o: 40,
            t: gettext("5,000 PB/mo.")
        }, {x: 17, o: 80, t: gettext("10,000 PB/mo.")}, {x: 19, o: 100, t: gettext("20,000 PD/mo.")}, {
            x: 21,
            o: 24,
            t: gettext("27,483 PB/mo.")
        }]
    }
};
var DEBUG_PARAMS = DEBUG_PARAMS || {debugAllowed: !0}, readDebugParams = function () {
    var a = window.location.href;
    if (DEBUG_PARAMS.debugAllowed) {
        if (-1 != a.indexOf("?mamufas-debug") || -1 != a.indexOf("&mamufas-debug")) DEBUG_PARAMS.debugEnabled = !0;
        if (DEBUG_PARAMS.debugEnabled && -1 != a.indexOf("&mamufas-skip-animation")) DEBUG_PARAMS.skip_animation = !0
    }
};
readDebugParams();

function crop(b, c, a) {
    return a < b ? b : a > c ? c : a
}

function smoothstep(b, c, a) {
    a = crop(0, 1, (a - b) / (c - b));
    return a * a * (3 - 2 * a)
}

function cosInterpolation(b, c, a) {
    a = (1 - Math.cos(a * Math.PI)) / 2;
    return b * (1 - a) + c * a
}

function transform_with_vendorprefix(b, c, a) {
    b.css("-webkit-transform", c);
    b.css("-moz-transform", c);
    b.css("-ms-transform", a || c);
    b.css("-o-transform", a || c);
    b.css("transform", c)
}

function translateLayer(b, c, a, d) {
    transform_with_vendorprefix(b, "translateZ(" + (void 0 === d ? 5 : d) + "px) translateX(" + c + "px) translateY(" + a + "px)", "translate(" + (c >> 0) + "px," + (a >> 0) + "px)")
}

function translateRotate(b, c, a, d, f, e) {
    transform_with_vendorprefix(b, "perspective(600px) " + ("rotateY(" + e + "deg) ") + ("translateX(" + c + "px) "))
};
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (b) {
    setTimeout(b, 16)
};
(function (b, d, n) {
    var a, c, f, j = {
        globalEvents: [],
        scroll_time: 7,
        translation: -90,
        w: 2867,
        h: 980,
        s: 1,
        scrollDir: 0,
        scrollVel: 0,
        visualization: "evolution",
        started: !1,
        mode: "day",
        visLoaded: {evolution: !1, growth: !1},
        renderOptions: {
            animate_gradient: !1,
            animate_grid: !1,
            animate_browsers: !0,
            animate_fade: !0,
            animate_charts: !0,
            grid_on_top: !0,
            css3_animation: !0,
            animate_paths_fade: !0,
            bind_events: !0
        }
    };
    a = {
        pluginName: "evolutionOfWeb", options: null, _init: function (g) {
            a.options = b.extend(!0, j, g);
            return this.each(function () {
                var g = b(this);
                a._setOptions();
                a._drawInitial(g);
                a._bind(g)
            })
        }, _setOptions: function () {
            if (b.browser.msie) a.options.renderOptions.css3_animation = !1;
            if (b.browser.msie) a.options.renderOptions.css3_animation = !1;
            if (b.browser.safari) a.options.renderOptions.animate_paths_fade = !1;
            if (b.browser.mozilla && 13 > parseFloat(b.browser.version.slice(0, 3))) a.options.renderOptions.css3_animation = !1;
            if ("ontouchstart" in document) a.options.renderOptions.animate_gradient = !1, a.options.renderOptions.animate_browsers = !1, a.options.renderOptions.grid_on_top =
                !1, a.options.renderOptions.animate_browsers = !1, a.options.renderOptions.animate_fade = !1, a.options.renderOptions.animate_charts = !1, a.options.touch_device = !0;
            if (b("body").hasClass("io")) a.options.renderOptions.bind_events = !1
        }, _bind: function (g) {
            b("a#explore").bind({click: a._startAnimation});
            g.find("footer a.close").bind({
                click: function (a) {
                    a.preventDefault();
                    b(this).closest("div.credits").fadeOut();
                    b(this).closest("section").find("a.credits").fadeIn()
                }
            });
            g.find("footer a.credits").bind({
                click: function (a) {
                    a.preventDefault();
                    b(this).parent().find("div.credits").fadeIn();
                    b(this).fadeOut()
                }
            });
            g.find("header nav a").click(function (g) {
                g.preventDefault();
                if (!b(this).hasClass("selected") && !b(this).hasClass("disabled")) g = 0 == b(this).index() ? "evolution" : "growth", d.location.href = "#/" + g + "/" + a.options.mode
            })
        }, _trigger: function (g, c, k) {
            var q = 0 <= b.inArray(g, k.data("options").globalEvents), g = g + "." + a.pluginName;
            q ? b.event.trigger(g, c) : k.trigger(g, c)
        }, _drawInitial: function (g) {
            a.options.x = d3.scale.linear().domain([1990, 2013]).range([0, a.options.w -
            0]);
            a.options.translation = b(d).height() > a.options.h ? (b(d).height() - a.options.h) / 2 + a.options.translation : a.options.translation;
            a.options.h = Math.max(b(d).height(), a.options.h);
            g.find("div.container").height(a.options.h);
            a._startGrid();
            a._startTechs();
            a._startBrowsers();
            a._startGraphs();
            b("article.browsers").browsersGalleria()
        }, _setScale: function () {
            if (1050 >= d.screen.height - 36) a.options.s = 0.75
        }, _startGrid: function () {
            var b = d3.select("div.grid").attr("style", "width:" + a.options.w * a.options.s + "px; height:" +
                a.options.h * a.options.s + "px; overflow:hidden").append("svg").attr("width", a.options.w * a.options.s).attr("height", Math.max(a.options.h * a.options.s, d.screen.height)),
                c = b.append("g").attr("width", a.options.w * a.options.s).attr("height", Math.max(a.options.h * a.options.s, d.screen.height)).attr("transform", "translate(0," + a.options.translation * a.options.s + ") scale(" + a.options.s + ")");
            a.options.grid = b;
            b = c.selectAll("g.rule").data(a.options.x.ticks(21)).enter().append("g").attr("class", "rule");
            c = Math.max(a.options.h *
                a.options.s, d.screen.height) - a.options.translation - 1;
            a.options.renderOptions.animate_grid ? (b.append("line").attr("class", "top_line").attr("x1", a.options.x).attr("x2", a.options.x).attr("y1", 0).attr("y2", 0), b.append("line").attr("class", "bottom_line").attr("x1", a.options.x).attr("x2", a.options.x).attr("y1", c).attr("y2", c)) : b.append("line").attr("class", "top_line").attr("x1", a.options.x).attr("x2", a.options.x).attr("y1", 0).attr("y2", c);
            b.append("text").attr("y", function (b) {
                return -(a.options.x(b) + 11)
            }).attr("x",
                -a.options.translation + 45).attr("transform", "rotate(90 0 0)").attr("text-anchor", "end").text(function (a) {
                return a
            })
        }, _startTechs: function () {
            var g = d3.select("div.paths").attr("style", "width:" + a.options.w * a.options.s + "px; height:" + a.options.h * a.options.s + "px; overflow:hidden").append("svg").attr("width", a.options.w * a.options.s).attr("height", a.options.h * a.options.s).attr("class", "paths_svg"),
                c = g.append("g").attr("transform", "translate(0," + a.options.translation * a.options.s + ") scale(" + a.options.s + ")");
            a.options.techs = g;
            g = c.selectAll("g.path").data(paths).enter().append("g").attr("class", "curve");
            a.options.touch_device || (c = g.append("defs").append("linearGradient").attr("id", function (a) {
                return f._normalizeId(a.name)
            }).attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%").attr("spreadMethod", "pad"), c.append("stop").attr("offset", "0%").attr("stop-color", function (a) {
                return a.color
            }).attr("stop-opacity", 0.8).attr("class", "start"), c.append("stop").attr("offset", "95%").attr("stop-color", function (a) {
                return a.color
            }).attr("stop-opacity",
                0).attr("class", "final"));
            g.append("path").attr("class", "curve").attr("d", function (a) {
                return paths_data[a.name.replace(/&/g, "and")]
            }).attr("fill", function (b) {
                return a.options.touch_device ? b.color : "url(#" + f._normalizeId(b.name) + ")"
            }).style("fill-opacity", function () {
                return a.options.touch_device ? 0.3 : 1
            });
            g.each(function (a) {
                for (var g = d3.select(this), c = 0; c < a.techs.length; c++) {
                    var i = a.techs[c];
                    if (i.background) var l = g.append("rect").attr("x", i.position.x).attr("y", i.position.y).attr("width", 10).attr("height",
                        10).attr("class", "curve_label");
                    var e = g.append("text").attr("x", i.position.x).attr("y", i.position.y + 10).attr("text-anchor", "middle").attr("class", "title curve_label").attr("fill", a.color);
                    f._multiText(e, i.title, i.position, "middle");
                    var h = e.node().getBBox();
                    i.background && l.attr("x", h.x - 5).attr("y", h.y - 5).attr("width", h.width + 10).attr("height", h.height + 10);
                    var e = g.append("g").attr("class", "tooltip"),
                        s = e.append("rect").attr("x", h.x - 10).attr("y", h.y - 10).attr("fill", a.color),
                        m = e.append("text").attr("text-anchor",
                            "start").attr("fill", "white").attr("x", h.x).attr("y", h.y + 10).attr("class", "info_title").attr("fill", "white");
                    f._multiText(m, i.title, {x: h.x, y: h.y + 10}, "start");
                    var m = m.node().getBBox(),
                        r = e.append("text").attr("text-anchor", "start").attr("fill", "white").attr("x", h.x).attr("y", h.y).attr("class", "info_text").attr("fill", "white");
                    f._multiText(r, i.info, {x: h.x, y: h.y + m.height + 12}, "start");
                    var r = r.node().getBBox(),
                        j = e.append("text").attr("text-anchor", "start").attr("fill", "white").attr("x", h.x).attr("y", h.y +
                            m.height + r.height + 18).attr("class", "info_readme").attr("fill", "white").text(gettext("READ MORE")).on("mousedown", function () {
                            d3.event.stopPropagation();
                            d.open(i.url)
                        }).node().getBBox();
                    e.append("image").attr("class", "info_readme_icon").attr("xlink:href", "img/images/readmore.png").attr("width", 7).attr("height", 12).attr("x", h.x + j.width + 5).attr("y", h.y + m.height + r.height + 8);
                    h = r.height + m.height + 20;
                    m = Math.max(r.width, m.width);
                    s.attr("width", m + (b.browser.chrome && 19 < b.browser.version ? 27 : 20)).attr("height",
                        h + 20);
                    e.attr("style", "display:none");
                    a.offset && e.attr("transform", "translate(" + a.offset.x + "," + a.offset.y + ")")
                }
                g = g.append("g").style("opacity", 0).attr("class", "adaptations");
                if (a.adaps) for (c = 0; c < a.adaps.length; c++) l = a.adaps[c], g.append("circle").attr("fill", a.color).style("opacity", 0.4).attr("cx", l.x).attr("cy", l.y).attr("r", 25), g.append("circle").attr("fill", a.color).style("opacity", 0.8).style("stroke-width", 1).style("stroke", "black").style("stroke-opacity", 0.3).attr("cx", l.x).attr("cy", l.y).attr("r",
                    7)
            });
            b("div.paths").hide()
        }, _startBrowsers: function () {
            var b = d3.select("div.browsers").attr("style", "width:" + a.options.w * a.options.s + "px; height:" + a.options.h * a.options.s + "px; overflow:hidden").append("svg").attr("width", a.options.w * a.options.s).attr("height", a.options.h * a.options.s),
                c = b.append("g").attr("transform", "translate(0," + a.options.translation * a.options.s + ") scale(" + a.options.s + ")");
            a.options.browsers = b;
            for (b = 0; b < browsers.length; ++b) browsers[b].current_version = 0;
            c = c.selectAll("g.browser").data(browsers).enter().append("g").attr("class",
                "browser").call(function (b) {
                b.each(function (b) {
                    var g = d3.select(this);
                    f._createPattern(g, "img/images/browser_hover_bkg.png", 4, 20, b.start.x, b.start.y - 10, f._normalizeId(b.name) + "_day_bkg");
                    f._createPattern(g, "img/images/browser_hover_bkg_black.png", 4, 20, b.start.x, b.start.y - 10, f._normalizeId(b.name) + "_night_bkg");
                    g.append("rect").style("opacity", 0).attr("class", "browser_bkg").attr("x", b.start.x).attr("y", b.start.y - 10).attr("dy", -10).attr("width", b.end.x - b.start.x).attr("height", 20).attr("fill", "url(#" +
                        f._normalizeId(b.name) + "_" + a.options.mode + "_bkg)")
                })
            });
            b = c.append("g").attr("class", "browser_image").attr("transform", function (a) {
                return "translate (" + a.start.x + "," + a.start.y + ") scale(0)"
            });
            b.append("image").attr("xlink:href", "img/images/circle.png").attr("width", 74).attr("height", 74).attr("x", function () {
                return -87
            }).attr("y", function () {
                return -37
            });
            b.append("image").attr("xlink:href", function (a) {
                return "img/images/" + a.name + ".png"
            }).attr("width", function (a) {
                return a.image.width
            }).attr("height", function (a) {
                return a.image.height
            }).attr("x",
                function (a) {
                    return -50 - a.image.width / 2
                }).attr("y", function (a) {
                return -(a.image.height / 2)
            });
            b.append("text").attr("x", function () {
                return -90
            }).attr("y", function () {
                return 4
            }).attr("text-anchor", "end").attr("class", "browser_title").text(function (a) {
                return a.title
            });
            b.append("line").attr("x1", 0).attr("y1", -20).attr("x2", 0).attr("y2", 20);
            c.append("line").attr("x1", function (a) {
                return a.start.x
            }).attr("y1", function (a) {
                return a.start.y
            }).attr("x2", function (a) {
                return a.start.x
            }).attr("y2", function (a) {
                return a.start.y
            }).attr("class",
                "time-line").attr("name", function (a) {
                return a.name
            }).call(function (a) {
                a.each(function (a) {
                    for (var b = this.parentNode, g = 0; g < a.versions.length; g++) {
                        var c = a.versions[g];
                        if ("desktop" == c.type) {
                            var e = d3.select(b).append("g").attr("class", "desktop").attr("id", a.name + c.type + c.number.replace(/\./g, "_")).attr("x", c.x).attr("y", a.start.y).attr("data-type", c.type).attr("data-number", c.number).style("opacity", 0);
                            e.append("circle").attr("cx", c.x).attr("cy", a.start.y).attr("r", 3);
                            e.append("text").attr("class", "version_text").attr("x",
                                c.x).attr("y", a.start.y + (c.up ? -8 : 18)).attr("text-anchor", "middle").text(c.number)
                        } else {
                            if ("os" == c.type) {
                                e = d3.select(b).append("g").attr("id", a.name + c.type + c.number.replace(/\./g, "_")).attr("class", "other").attr("x", c.x).attr("y", a.start.y).attr("data-type", c.type).attr("data-number", c.number).style("opacity", 0).on("mousedown", function () {
                                    d3.event.stopPropagation()
                                });
                                e.append("circle").attr("cx", c.x).attr("cy", a.start.y).attr("r", 3);
                                e.append("line").attr("x1", c.x).attr("x2", c.x).attr("y1", a.start.y).attr("y2",
                                    a.start.y - 50);
                                e.append("image").attr("xlink:href", "img/images/os.png").attr("width", 47).attr("height", 48).attr("x", c.x - 24).attr("y", a.start.y - 58);
                                var e = e.append("g"),
                                    k = e.append("rect").attr("height", 20).attr("width", 20).attr("x", c.x).attr("y", a.start.y),
                                    l = e.append("text").attr("class", "version_tooltip");
                                f._multiText(l, c.description, {x: c.x, y: a.start.y}, "middle");
                                var d = l.node().getBBox();
                                e.append("path").attr("d", "M " + c.x + " " + (a.start.y - 57) + " L " + (c.x - 8) + " " + (a.start.y - 67) + " L " + (c.x + 8) + " " + (a.start.y -
                                    67) + " L " + c.x + " " + (a.start.y - 57));
                                k.attr("x", d.x - 7).attr("y", d.y - 67 - d.height).attr("width", d.width + 14).attr("height", d.height + 14);
                                l.selectAll("tspan").each(function () {
                                    d3.select(this).attr("y", d.y - 49 - d.height)
                                })
                            } else e = d3.select(b).append("g").attr("id", a.name + c.type + c.number.replace(/\./g, "_")).attr("class", "other").attr("x", c.x).attr("y", a.start.y).attr("data-type", c.type).attr("data-number", c.number).style("opacity", 0).on("mousedown", function () {
                                d3.event.stopPropagation()
                            }), e.append("image").attr("xlink:href",
                                "img/images/mobile.png").attr("width", 28).attr("height", 27).attr("x", c.x - 14).attr("y", a.start.y - 14), e = e.append("g"), k = e.append("rect").attr("height", 20).attr("width", 20).attr("x", c.x).attr("y", a.start.y), l = e.append("text").attr("class", "version_tooltip"), f._multiText(l, c.description, {
                                x: c.x,
                                y: a.start.y
                            }, "middle"), d = l.node().getBBox(), e.append("path").attr("d", "M " + c.x + " " + (a.start.y - 17) + " L " + (c.x - 8) + " " + (a.start.y - 27) + " L " + (c.x + 8) + " " + (a.start.y - 27) + " L " + c.x + " " + (a.start.y - 17)), k.attr("x", d.x -
                                7).attr("y", d.y - 27 - d.height).attr("width", d.width + 14).attr("height", d.height + 14), l.selectAll("tspan").each(function () {
                                d3.select(this).attr("y", d.y - 9 - d.height)
                            });
                            e.style("display", "none")
                        }
                    }
                })
            });
            c = c.append("g").attr("class", "end_line").style("opacity", 0).attr("y", function (a) {
                return a.start.y
            });
            c.append("line").attr("x1", function (a) {
                return a.start.x
            }).attr("y1", function (a) {
                return a.start.y
            }).attr("x2", function (b) {
                return b.end.x == a.options.w ? b.start.x - 20 : b.start.x
            }).attr("y2", function (a) {
                return a.start.y -
                    20
            });
            c.append("line").attr("x1", function (a) {
                return a.start.x
            }).attr("y1", function (a) {
                return a.start.y
            }).attr("x2", function (b) {
                return b.end.x == a.options.w ? b.start.x - 20 : b.start.x
            }).attr("y2", function (a) {
                return a.start.y + 20
            });
            c.attr("x", function (a) {
                return a.start.x - 20
            })
        }, _startGraphs: function () {
            b("footer").css({width: a.options.w * a.options.s, height: 70 * a.options.s});
            var c = d3.select("div.graphs").attr("style", "width:" + a.options.w * a.options.s + "px; height:" + a.options.h * a.options.s + "px; overflow:hidden").append("svg");
            a.options.graphs = c;
            c.append("g").attr("transform", "scale(" + a.options.s + ")");
            c = d3.select("div.graph_bar").attr("style", "width:" + a.options.w * a.options.s + "px; height:" + 70 * a.options.s + "px; overflow:hidden").append("svg").attr("width", a.options.w * a.options.s).attr("height", 70 * a.options.s);
            a.options.footer = c;
            c = c.append("g").attr("transform", "scale(" + a.options.s + ")");
            c.selectAll("g.graph_techs").data(paths).enter().append("g").attr("class", "graph_techs").call(function (a) {
                a.each(function (a) {
                    d3.select(this).selectAll("g.graph_tech").data(a.techs).enter().append("g").attr("class",
                        "graph_tech").append("rect").attr("x", function (a) {
                        return Math.floor(a.position.x - 1.5)
                    }).attr("y", 8).attr("width", 3).attr("height", 54).attr("rx", 2).attr("ry", 2).attr("fill", a.color).on("mousedown", function (a) {
                        d.open(a.url)
                    })
                })
            });
            c = c.selectAll("g.graph_browsers").data(browsers).enter().append("g").attr("class", "graph_browsers");
            c.append("image").attr("xlink:href", "img/images/circle.png").attr("width", 40).attr("height", 40).attr("x", function (a) {
                return a.start.x - 20
            }).attr("y", 15);
            c.append("image").attr("xlink:href",
                function (a) {
                    return "img/images/" + a.name + ".png"
                }).attr("width", function (a) {
                return a.image.width / 1.7
            }).attr("height", function (a) {
                return a.image.height / 1.7
            }).attr("x", function (a) {
                return a.start.x - a.image.width / 1.7 / 2
            }).attr("y", function (a) {
                return 35 - a.image.height / 1.7 / 2
            })
        }, _changeToVis1: function () {
            b(".viewport").css({"overflow-y": "auto"});
            b(".viewport div.graphs").fadeOut();
            b("section.legend").fadeOut();
            b("footer").removeClass("info2");
            b("div.paths").removeClass("disabled");
            b("div.browsers").removeClass("hide");
            if (a.options.visLoaded.evolution) b("footer").removeClass("info2"), b("article.visualization .viewport div.browsers svg").click().focus(); else {
                b("section.viewport .container").removeAttr("style");
                var c = b(".viewport").scrollLeft();
                0 < c && b(".viewport").animate({scrollLeft: 0, scrollTop: 0}, c);
                setTimeout(function () {
                    b("footer").removeClass("info2");
                    a.options.visLoaded.evolution = !0;
                    a._animateVis1();
                    b(".viewport").css({"overflow-x": "hidden"})
                }, c)
            }
        }, _changeToVis2: function () {
            b("div.paths").addClass("disabled");
            b("div.browsers").addClass("hide");
            b(".viewport").css({"overflow-y": "hidden", "overflow-x": "auto"});
            b(".viewport div.graphs").fadeIn();
            b("section.legend").fadeIn();
            b("footer").addClass("info2");
            if (a.options.visLoaded.growth) b("article.visualization .viewport div.graphs svg").click().focus(), b(".viewport").animate({scrollTop: 0}, 300); else {
                b("section.viewport .container").css({width: a.options.w * a.options.s + "px"});
                var c = b(".viewport").scrollLeft();
                0 < c && b(".viewport").animate({scrollLeft: 0, scrollTop: 0},
                    c);
                setTimeout(function () {
                    if (!a.options.visLoaded.growth) a.options.visLoaded.growth = !0, a._animateVis2()
                }, c)
            }
        }, _changeDaytime: function () {
            "day" == a.options.mode ? (b(":checkbox").removeAttr("checked"), b("body").removeClass("night"), d3.selectAll(".big_tooltip").each(function () {
                var a = b(this).find("image"), c = a.attr("href");
                a.attr("href", c.replace("black.png", ".png"))
            })) : (b(":checkbox").attr("checked", ""), b("body").addClass("night"), d3.selectAll(".big_tooltip").each(function () {
                var a = b(this).find("image"), c =
                    a.attr("href");
                a.attr("href", c.replace(".png", "black.png"))
            }));
            d3.selectAll("g.browser").each(function (c) {
                b(this).find(".browser_bkg").attr("fill", "url(#" + f._normalizeId(c.name) + "_" + a.options.mode + "_bkg)")
            })
        }, _animateVis2: function () {
            function c() {
                b("article.visualization header a").removeClass("disabled");
                if (!a.options.started) a.options.started = !0, a.options.renderOptions.bind_events && (a._bindControlEvents(), a._showGplus());
                a.options.renderOptions.bind_events && a._bindGraphEvents()
            }

            var l = d3.select("div.graphs").style("display",
                "block").select("svg").attr("width", 2867).attr("x", 0).attr("y", 0).attr("height", b(d).height()).select("g");
            l.append("line").attr("x1", 0).attr("x2", a.options.w).attr("y1", b(d).height() - 200).attr("y2", b(d).height() - 200).style("stroke", "#CBCBCB").style("stroke-with", 1).style("stroke-dasharray", "2, 5, 2, 5");
            (function (c) {
                function g(b) {
                    e.select("path.traffic").data([growth.traffic.points.slice(0, b)]).attr("d", u).transition().ease("linear").duration(200);
                    if (!growth.traffic.points[b]) return !1;
                    var c = e.append("g");
                    c.append("circle").attr("cx", function () {
                        return l(b)
                    }).attr("cy", function () {
                        return i(growth.traffic.points[b].y)
                    }).attr("r", 4).attr("class", "tick");
                    var d = c.append("g").attr("class", "graph_info").style("opacity", "0"),
                        h = d.append("rect").attr("x", function () {
                            return l(b) + 13
                        }).attr("y", function () {
                            return i(growth.traffic.points[b].y) - 43
                        }).attr("width", 9).attr("height", 9).attr("class", "tick"),
                        k = d.append("text").attr("x", function () {
                            return l(b)
                        }).attr("y", function () {
                            return i(growth.traffic.points[b].y)
                        }).attr("text-anchor",
                            "start").attr("dx", 0 != b ? 0 : 20).attr("dy", 0 != b ? 7 : -20).text(growth.traffic.points[b].t),
                        o = k.node().getBBox();
                    h.attr("width", o.width + 14).attr("height", o.height + 8);
                    0 != b && (h.attr("x", o.x - o.width - 37).attr("y", o.y - 4), k.attr("x", o.x - o.width - 30), h = o.x - 24, o = o.y + o.height / 2 - 7, d.append("path").attr("class", "tick").attr("d", "M " + h + " " + o + " L " + (h + 8) + " " + (o + 8) + " L " + h + " " + (o + 16)));
                    d.style("display", "none").style("opacity", 1);
                    if (growth.traffic.points[b].tooltip) {
                        var q = growth.traffic.points[b].tooltip, d = c.append("g").attr("class",
                            "b_tooltip").style("opacity", "0").style("display", "block"),
                            k = d.append("rect").attr("x", q.x).attr("y", function () {
                                return i(growth.traffic.points[b].y)
                            }).attr("width", 156).attr("height", 200),
                            j = d.append("image").attr("x", q.x + 10).attr("y", function () {
                                return i(growth.traffic.points[b].y) + 10
                            }).attr("width", q.img_w).attr("height", q.img_h).attr("xlink:href", "img/tooltips/" + q.img + ("day" == a.options.mode ? "" : "black") + ".png"),
                            m = d.append("text").attr("x", q.x + 10).attr("y", function () {
                                return i(growth.traffic.points[b].y) +
                                    q.img_h + 20
                            }).attr("text-anchor", "start");
                        f._multiText(m, q.t, {
                            x: q.x + 10, y: function () {
                                return i(growth.traffic.points[b].y) + q.img_h + 30
                            }
                        }, "start");
                        var o = m.node().getBBox(), n = 20 + q.img_h + 10 + o.height,
                            o = Math.max(o.width, q.img_w) + 20;
                        k.attr("width", o).attr("height", n);
                        "top" == q.v && (k.attr("y", function () {
                            return i(growth.traffic.points[b].y) - n - 30
                        }), j.attr("y", function () {
                            return i(growth.traffic.points[b].y) - n - 30 + 10
                        }), m.selectAll("tspan").each(function () {
                            d3.select(this).attr("y", function () {
                                return i(growth.traffic.points[b].y) -
                                    n - 20 + q.img_h + 20
                            })
                        }), h = q.x + 10 + q.a - 20, o = i(growth.traffic.points[b].y) - 31, d.append("path").attr("d", "M " + h + " " + o + " L " + (h + 8) + " " + (o + 8) + " L " + (h + 16) + " " + o));
                        if ("right" == q.v) k.attr("y", function () {
                            return i(growth.traffic.points[b].y) - 40
                        }), j.attr("y", function () {
                            return i(growth.traffic.points[b].y) - 30
                        }), m.selectAll("tspan").each(function () {
                            d3.select(this).attr("y", function () {
                                return i(growth.traffic.points[b].y) + q.img_h - 10
                            })
                        }), h = q.x, o = i(growth.traffic.points[b].y), d.append("path").attr("d", "M " + h + " " + (o - 6) +
                            " L " + (h - 8) + " " + (o + 2) + " L " + h + " " + (o + 10));
                        d.attr("style", "").attr("class", "big_tooltip")
                    }
                    c.transition().duration(200).style("opacity", 1)
                }

                var l = d3.scale.linear().domain([0, 23]).range([0, 2867]),
                    i = d3.scale.linear().domain([39E3, 0]).range([0, b(d).height() - 200]),
                    u = d3.svg.line().x(function (a, b) {
                        return l(b)
                    }).y(function (a) {
                        return i(a.y)
                    }), e = c.append("g").attr("class", "traffic");
                e.append("path").attr("class", "traffic").attr("d", u(growth.traffic.points.slice(0, 0)));
                for (c = 0; c < growth.traffic.plain.length; c++) {
                    var h =
                        growth.traffic.plain[c];
                    e.append("text").attr("x", l(h.x)).attr("y", i(growth.traffic.points[h.x].y) - h.o).attr("class", "static").attr("text-anchor", "middle").text(h.t)
                }
                if (a.options.renderOptions.animate_charts) var j = -1, m = setInterval(function () {
                    j++;
                    0 == j || growth.traffic.points[j - 1] ? g(j) : clearInterval(m)
                }, 125); else for (c = 0; c <= growth.traffic.points.length; c++) g(c)
            })(l);
            (function (c) {
                function g(a) {
                    e.select("path.users").data([growth.users.points.slice(0, a)]).attr("d", f).transition().ease("linear").duration(200);
                    if (!growth.users.points[a]) return !1;
                    var b = e.append("g");
                    b.append("rect").attr("x", function () {
                        return l(a) - 4.5
                    }).attr("y", function () {
                        return i(growth.users.points[a].y) - 4.5
                    }).attr("width", 9).attr("height", 9).attr("class", "tick");
                    var c = b.append("g").attr("class", "graph_info").style("opacity", 0),
                        d = c.append("rect").attr("x", function () {
                            return l(a) + 13
                        }).attr("y", function () {
                            return i(growth.users.points[a].y) - 43
                        }).attr("width", 9).attr("height", 9).attr("class", "tick"),
                        h = c.append("text").attr("x", function () {
                            return l(a)
                        }).attr("y",
                            function () {
                                return i(growth.users.points[a].y)
                            }).attr("text-anchor", "start").attr("dx", 0 != a ? 0 : 20).attr("dy", 0 != a ? 7 : -20).text(growth.users.points[a].t),
                        k = h.node().getBBox();
                    d.attr("width", k.width + 14).attr("height", k.height + 8);
                    0 != a && (d.attr("x", k.x - k.width - 37).attr("y", k.y - 4), h.attr("x", k.x - k.width - 30), d = k.x - 24, k = k.y + k.height / 2 - 7, c.append("path").attr("class", "tick").attr("d", "M " + d + " " + k + " L " + (d + 8) + " " + (k + 8) + " L " + d + " " + (k + 16)));
                    c.style("display", "none").style("opacity", 1);
                    b.transition().duration(200).style("opacity",
                        1)
                }

                var l = d3.scale.linear().domain([0, 23]).range([0, 2867]),
                    i = d3.scale.linear().domain([2700, 0]).range([0, b(d).height() - 205]),
                    f = d3.svg.line().x(function (a, b) {
                        return l(b)
                    }).y(function (a) {
                        return i(a.y)
                    }), e = c.append("g").attr("class", "users disabled");
                e.append("path").attr("class", "users").attr("d", f(growth.users.points.slice(0, 0)));
                for (c = 0; c < growth.users.plain.length; c++) {
                    var h = growth.users.plain[c];
                    e.append("text").attr("x", l(h.x)).attr("y", i(growth.users.points[h.x].y) - h.o).attr("class", "static").attr("text-anchor",
                        "middle").text(h.t)
                }
                if (a.options.renderOptions.animate_charts) var j = -1, m = setInterval(function () {
                    j++;
                    0 == j || growth.users.points[j - 1] ? g(j) : clearInterval(m)
                }, 125); else for (c = 0; c <= growth.users.points.length; c++) g(c)
            })(l);
            a.options.renderOptions.animate_charts ? b("article.visualization .viewport").animate({scrollLeft: 2E3}, 600 * a.options.scroll_time, function () {
                c()
            }) : c()
        }, _startAnimation: function (c) {
            if (c && (c.preventDefault(), !b(this).find("span.explore").is(":visible"))) return;
            var d = b(this).closest("article");
            b("article.visualization");
            c ? a._removeHome(d, "evolution" == a.options.visualization ? a._changeToVis1 : a._changeToVis2) : "evolution" == a.options.visualization ? a._changeToVis1() : a._changeToVis2()
        }, _animateVis1: function () {
            function c(b, g) {
                var e = b * f / a.options.s;
                i.filter(function (a) {
                    return g || e >= a.start.x - 100 && e <= a.end.x
                }).each(function (c) {
                    var g = d3.select(this);
                    g.select(".end_line").style("opacity", 1);
                    a._browserStep(g.select(".time-line"), g.select(".end_line"), c, a.options.w, b);
                    var d = c.start.x - e;
                    100 > d && 0 < d && g.select(".browser_image").attr("transform",
                        function () {
                            var a = (100 - d) / 100;
                            return "translate (" + c.start.x + "," + c.start.y + ") scale(" + a + "," + a + ")"
                        });
                    g.select(".browser_image").filter(function (a) {
                        return e > a.start.x
                    }).attr("transform", function (a) {
                        return "translate (" + a.start.x + "," + a.start.y + ") scale(1)"
                    })
                })
            }

            function l() {
                p.remove();
                for (var a = 0; a < j.length; ++a) j[a].remove()
            }

            function k(c, g) {
                c = c === n ? 500 : c;
                a.options.renderOptions.grid_on_top && b(".grid").prependTo(b("article.visualization .wrapper"));
                l();
                a.options.renderOptions.bind_events && (a._bindGridEvents(),
                    a._bindPathsEvents(), a._bindBrowsersEvents());
                if (b.browser.opera || b.browser.safari && 537 > parseFloat(b.browser.version.slice(0, 3))) b("article.visualization div.paths > svg").append(b("article.visualization div.browsers > svg > g")), b("article.visualization div.browsers").remove();
                if (!a.options.started) a.options.started = !0, a.options.renderOptions.bind_events && (a._bindControlEvents(), a._showGplus());
                var e = b("article.visualization .viewport"), d = b("article.visualization .container");
                setTimeout(function () {
                    b.browser.mozilla ?
                        (e.removeAttr("style").css({overflow: "auto"}), setTimeout(function () {
                            d.removeAttr("style").attr("style", "-webkit-transform: perspective(0) rotateY(0) translateX(0);                   -moz-transform: perspective(0) rotateY(0) translateX(0);                    -ms-transform: perspective(0) rotateY(0) translateX(0);                     -o-transform: translateX(0);                        transform: perspective(0) rotateY(0) translateX(0);");
                            b.browser.mozilla || e.removeAttr("style").css({overflow: "auto"});
                            e.scrollLeft(g === n ? 2E3 : 0)
                        }, 100)) : (d.removeAttr("style").attr("style", "-webkit-transform: perspective(0) rotateY(0) translateX(0);               -moz-transform: perspective(0) rotateY(0) translateX(0);                -ms-transform: perspective(0) rotateY(0) translateX(0);                 -o-transform: translateX(0);                    transform: perspective(0) rotateY(0) translateX(0);"), e.removeAttr("style").css({overflow: "auto"}), e.scrollLeft(g === n ? 2E3 : 0))
                }, c);
                b("article.visualization header a.disabled").removeClass("disabled")
            }

            var f = a.options.w * a.options.s, p = b(".path_gradient"), i = d3.selectAll("g.browser"), j = [],
                e = b("article.visualization .container"), h = f - b(d).width();
            b(d).width();
            a.options.h * a.options.s > b(d).height() && (h += 15);
            translateLayer(p, -400, 50);
            b("div.paths").fadeIn();
            a.options.renderOptions.animate_browsers || c(1, !0);
            if (DEBUG_PARAMS.skip_animation || a.options.touch_device) k(0, 0); else {
                if (a.options.renderOptions.animate_fade) for (var s = 0; 2 > s; ++s) {
                    var m = document.createElement("div");
                    m.setAttribute("class", "detail_gradient");
                    var r = 200 + 50 * (1 << s), v = r >> 1;
                    m.style.width = 2 * r + "px";
                    m.style.height = r + "px";
                    m.style.top = -v + "px";
                    m.style.left = -v + "px";
                    m = b(m);
                    m.insertAfter(p);
                    j.push(m)
                }
                for (s = 0; s < paths.length; ++s) ;
                d3.selectAll(".bottom_line");
                d3.selectAll(".top_line");
                var w = 0, x = (new Date).getTime(), t = function () {
                    var b = 0.0010 * ((new Date).getTime() - x) / a.options.scroll_time,
                        b = 1.01 - Math.cos(b * Math.PI / 2);
                    w++;
                    b = Math.min(b, 1);
                    a.options.renderOptions.css3_animation || translateLayer(e, cosInterpolation(0, -h, b), 0);
                    if (a.options.renderOptions.animate_fade) {
                        var d =
                            b;
                        translateLayer(p, d * f - 400, 0);
                        for (var i = 0; i < j.length; ++i) translateLayer(j[i], d * f + 80, a.options.h * (0.5 + 0.1 * Math.cos((1 << j.length - i) * Math.PI * d)))
                    }
                    a.options.renderOptions.animate_browsers && c(b, !1);
                    1 > b ? requestAnimationFrame(t) : (a.options.animating = !1, k())
                };
                a.options.renderOptions.animate_fade ? p.css({
                    width: a.options.w + 300,
                    height: a.options.h
                }) : p.hide();
                a.options.renderOptions.grid_on_top && b(".grid").insertAfter(b(".path_gradient"));
                a.options.renderOptions.css3_animation ? (b("article.visualization .container").attr("style",
                    '-webkit-transform-style:"linear";              transform-style:"linear";              -moz-transform-style:"linear";              -webkit-transition-property:transform;              -moz-transition-property:all;              transition-property:transform;              -webkit-transition-duration:1000ms;              -moz-transition-duration:1000ms;              transition-duration:1000ms;              -webkit-transform: perspective(900px) rotateY(10deg);               -moz-transform: perspective(900px) rotateY(10deg);                    transform: perspective(900px) rotateY(10deg);'),
                    requestAnimationFrame(t), setTimeout(function () {
                    b("article.visualization .container").attr("style", '-webkit-transform-style:"linear";              transform-style:"linear";              -moz-transform-style:"linear";              -ms-transition-timing-function:"linear";              -webkit-transition-timing-function:"linear";              -moz-transition-timing-function:"linear";              -o-transform-style:"linear";              -webkit-transition-property:transform;              -moz-transition-property:all;              -ms-transition-property:transform;              -o-transition-property:transform;              transition-property:transform;              -webkit-transition-duration:' +
                        1200 * a.options.scroll_time + "ms;              -moz-transition-duration:" + 1200 * a.options.scroll_time + "ms;              -ms-transition-duration:" + 1200 * a.options.scroll_time + "ms;              -o-transition-duration:" + 1200 * a.options.scroll_time + "ms;              transition-duration:" + 1200 * a.options.scroll_time + "ms;              -webkit-transform: perspective(600px) rotateY(10deg) translateX(-" + h + "px);               -moz-transform: perspective(600px) rotateY(0deg) translateX(-" + h + "px);                 -ms-transform: translateX(-" +
                        (h >> 0) + "px);                 -o-transform: translateX(-" + (h >> 0) + "px);                    transform: perspective(600px) rotateY(10deg) translateX(-" + h + "px);")
                }, 2200), setTimeout(function () {
                    b("article.visualization .container").removeClass("goRight");
                    b("article.visualization .container").attr("style", '-webkit-transform-style:"linear";              transform-style:"linear";              -moz-transform-style:"linear";              -ms-transition-timing-function:"linear";              -o-transform-style:"linear";              -webkit-transition-property:transform;              -moz-transition-property:all;              -ms-transition-property:transform;              -o-transition-property:transform;              transition-property:transform;              -webkit-transition-duration:1500ms;              -moz-transition-duration:1500ms;              -ms-transition-duration:1500ms;              -o-transition-duration:1500ms;              transition-duration:1500ms;              -webkit-transform: perspective(0) rotateY(0) translateX(-' +
                        h + "px);               -moz-transform: perspective(600px) rotateY(0) translateX(-" + h + "px);                 -ms-transform: translateX(-" + (h >> 0) + "px);                 -o-transform: translateX(-" + (h >> 0) + "px);                    transform: perspective(0) rotateY(0) translateX(-" + h + "px);")
                }, 1E3 * a.options.scroll_time - 1500)) : requestAnimationFrame(t)
            }
        }, _browserStep: function (a, b, c, d, f) {
            f = f * smoothstep(0, 1, f) + (1 - f) * f;
            d = d * f >> 0;
            f = d - c.start.x;
            a.attr("x2", Math.min(c.end.x, Math.max(c.start.x, d)));
            b.attr("transform",
                "translate(" + Math.max(0, Math.min(f, c.end.x - c.start.x)) + ", 0)");
            a = c.versions[c.current_version];
            for (b = c.current_version; b < c.versions.length && c.versions[b].x < d; ++b) a = c.versions[b], d3.select("g#" + (c.name + a.type + a.number.replace(/\./g, "_"))).style("opacity", 1), c.current_version++
        }, _removeHome: function (a, c) {
            a.animate({opacity: 0}, 700, function () {
                b(this).remove();
                c()
            }).find("section").animate({top: "-50%"}, 700)
        }, _bindControlEvents: function () {
            function c() {
                var b = a.options.scrollDir, d = a.options.scrollVel, e = (new Date).getTime(),
                    h = e - p;
                p = e;
                h = Math.min(0.04, h);
                a.options.scrollVel += 4 * (100 * b - a.options.scrollVel) * h;
                b = j.scrollLeft();
                j.scrollLeft(b - 3 * d * h);
                0.2 < Math.abs(a.options.scrollVel) ? requestAnimationFrame(c) : a.options.scrollVel = 0
            }

            function f() {
                var c = b("article.visualization"), g = c.find(".viewport")[0].scrollLeft,
                    d = c.find(".viewport")[0].clientWidth, h = Math.floor(a.options.w * a.options.s);
                0 == g ? c.find(".left-arrow").fadeOut() : c.find(".left-arrow").fadeIn();
                h <= g + d ? c.find(".right-arrow").fadeOut() : c.find(".right-arrow").fadeIn()
            }

            var k =
                b("article.visualization"), j = b("article.visualization .viewport");
            k.find("a.zoom_in,a.zoom_out").bind({
                click: function (c) {
                    "object" === typeof c && c.preventDefault();
                    var c = b("article.visualization"), g = b(this).attr("class") || "zoom_out", e = a.options;
                    if (-1 != g.search("zoom_in")) if (1.75 > e.s) e.s += 0.25; else return !1; else if (0.5 < e.s) e.s -= 0.25; else return !1;
                    b("article.visualization .viewport").scrollLeft();
                    c.find(".viewport > div.container").attr("style", "width:" + Math.ceil(e.s * e.w) + "px!important;");
                    c.find("div.grid, div.paths, div.browsers").removeAttr("style").css({
                        width: Math.ceil(e.s *
                            e.w) + "px", height: Math.ceil(e.s * e.h) + "px", overflow: "hidden"
                    });
                    c.find("div.graphs").removeAttr("style").css({
                        width: Math.ceil(e.s * e.w) + "px",
                        height: Math.ceil(e.s * e.h) + "px",
                        overflow: "hidden",
                        display: "growth" == a.options.visualization ? "block" : "hidden"
                    });
                    c.find("div.graph_bar, footer").css({
                        width: Math.ceil(e.s * e.w) + "px",
                        height: Math.ceil(70 * e.s) + "px"
                    });
                    e.browsers.attr("width", e.s * e.w).attr("height", e.s * e.h);
                    e.browsers.select("g").attr("transform", "translate(0," + e.translation * e.s + ") scale(" + e.s + ")");
                    e.grid.attr("width",
                        e.s * e.w).attr("height", e.s * e.h);
                    e.grid.select("g").attr("transform", "translate(0," + e.translation * e.s + ") scale(" + e.s + ")");
                    e.techs.attr("width", e.s * e.w).attr("height", e.s * e.h);
                    b.browser.opera || b.browser.safari && 537 > parseFloat(b.browser.version.slice(0, 3)) ? b(e.techs.node()).find("> g").attr("transform", "translate(0," + e.translation * e.s + ") scale(" + e.s + ")") : e.techs.select("g").attr("transform", "translate(0," + e.translation * e.s + ") scale(" + e.s + ")");
                    e.graphs.attr("width", e.s * e.w).attr("height", e.s * e.h);
                    e.graphs.select("g").attr("transform",
                        "scale(" + e.s + ")");
                    e.footer.attr("width", e.s * e.w).attr("height", 70 * e.s);
                    e.footer.select("g").attr("transform", "scale(" + e.s + ")");
                    "zoom_in" == g ? c.find(".viewport").animate({scrollLeft: "+=" + b(d).width() / 2 + "px"}, 0) : c.find(".viewport").animate({scrollLeft: "-=" + b(d).width() / 2 + "px"}, 0);
                    1.5 < e.s ? c.find("a.zoom_in").addClass("disabled") : c.find("a.zoom_in").removeClass("disabled");
                    0.75 > e.s ? c.find("a.zoom_out").addClass("disabled") : c.find("a.zoom_out").removeClass("disabled")
                }
            });
            k.find(" .viewport").bind({scroll: f});
            b(d).bind({resize: f});
            k.find("a.left-arrow, a.right-arrow").mousedown(function (d) {
                d.preventDefault();
                d.stopPropagation();
                d = b(this).hasClass("left-arrow") ? 1 : -1;
                a.options.scrollDir = d;
                requestAnimationFrame(c);
                return !1
            }).mouseup(function (b) {
                b.preventDefault();
                b.stopPropagation();
                a.options.scrollDir = 0;
                return !1
            });
            b(":checkbox").iphoneStyle({
                checkedLabel: "", uncheckedLabel: "", onChange: function (b, c) {
                    d.location.href = "#/" + a.options.visualization + "/" + (c ? "night" : "day")
                }
            });
            b("span.day,span.night").show();
            (new Date).getTime();
            j.scrollTop();
            var p = (new Date).getTime();
            b("section.controls").fadeIn();
            f()
        }, _bindGridEvents: function () {
        }, _bindBrowsersEvents: function () {
            d3.selectAll("g.desktop").on("click", function (a) {
                d3.event.stopPropagation();
                var c = d3.select(this).attr("data-type"), d = d3.select(this).attr("data-number");
                b("article.browsers").browsersGalleria("set", a, c, d)
            });
            d3.selectAll("g.other").on("mouseover", function () {
                d3.select(this).select("g").style("display", "block")
            }).on("mouseout", function () {
                d3.select(this).select("g").style("display",
                    "none")
            });
            d3.selectAll("g.browser").on("click", function (a) {
                for (var c = d3.event.offsetX, d = a.versions[0].number, f = a.versions.length - 1; 0 <= f; f--) {
                    var j = a.versions[f];
                    if (c > j.x && "desktop" == j.type) {
                        d = j.number;
                        break
                    }
                }
                b("article.browsers").browsersGalleria("set", a, "desktop", d)
            }).on("mouseover", function () {
                a.options.touch_device || d3.select(this).select("rect.browser_bkg").transition().duration(200).style("opacity", 1)
            }).on("mouseout", function () {
                a.options.touch_device || d3.select(this).select("rect.browser_bkg").transition().duration(200).style("opacity",
                    0)
            });
            b("article.visualization .viewport div.browsers svg").click().focus()
        }, _bindPathsEvents: function () {
            function c(g) {
                g ? (p ? b("svg.paths_svg g")[0].appendChild(p[0][0]) : p = d3.select("svg.paths_svg g").append("rect").attr("class", "fade_rect").attr("width", a.options.w).attr("height", Math.max(a.options.h + 90, d.screen.height)).style("fill-opacity", i).style("pointer-events", "none"), clearInterval(n), n = setInterval(function () {
                    i >= e ? clearInterval(n) : a.options.renderOptions.animate_paths_fade ? (p.style("fill-opacity",
                        i), i += 0.3 * (e - i)) : (i = e, p.style("fill-opacity", i))
                }, 20)) : p && (clearInterval(n), n = setInterval(function () {
                    a.options.renderOptions.animate_paths_fade ? (p.style("fill-opacity", i), i += 0.5 * (0 - i)) : (i = 0, p.style("fill-opacity", i));
                    0.1 >= i && (clearInterval(n), p.remove(), p = null, i = 0)
                }, 20))
            }

            function f() {
                var a = d3.select("g.curve.selected");
                delete this.hovered;
                if (a[0][0]) return !1;
                d3.select(this).selectAll("g.tooltip").style("display", "none");
                d3.select(this).select("stop.final").transition().duration(250).attr("stop-opacity",
                    0);
                d3.select(this).select("g.adaptations").transition().duration(200).style("opacity", 0);
                c(!1)
            }

            function k() {
                d3.event.stopPropagation();
                if (d3.select("g.curve.selected")[0][0] || this.hovered) return !1;
                c(!0);
                this.parentNode.appendChild(this);
                this.hovered = !0;
                d3.select(this).select("g.adaptations").transition().duration(200).style("opacity", 1);
                d3.select(this).selectAll("g.tooltip").style("display", "block")
            }

            var j = d3.selectAll("g.curve");
            j.on("mousedown", function () {
                d3.event.stopPropagation();
                var d = d3.select("g.curve.selected");
                d != d3.select(this) && d[0][0] && (a.options.touch_device ? (d.select("g.adaptations").style("opacity", 0), d.select("path").style("fill-opacity", 0.3)) : (d.select("stop.final").transition().duration(250).attr("stop-opacity", 0), d.select("g.adaptations").transition().duration(500).style("opacity", 0)), d.selectAll("g.tooltip").style("display", "none"), d.attr("class", "curve"));
                a.options.touch_device || c(!0);
                d3.select(this).moveToFront();
                d3.select(this).attr("class", "curve selected");
                a.options.touch_device ? (d3.select(this).select("path").style("fill-opacity",
                    1), d3.select(this).select("g.adaptations").style("opacity", 1)) : (d3.select(this).select("stop.final").transition().duration(250).attr("stop-opacity", 0.85), d3.select(this).select("g.adaptations").transition().duration(500).style("opacity", 1));
                d3.select(this).selectAll("g.tooltip").style("display", "block");
                d = 1.2 * Math.abs(b("article.visualization > .viewport").scrollLeft() - d3.select(this).data()[0].techs[0].position.x);
                b("article.visualization > .viewport").stop().animate({
                    scrollLeft: d3.select(this).data()[0].techs[0].position.x *
                    a.options.s - 100
                }, d)
            });
            if (!a.options.touch_device) j.on("mouseout", f).on("mouseover", k);
            d3.select("svg.paths_svg").on("mousedown", function () {
                d3.event.stopPropagation();
                var b = d3.select("g.curve.selected");
                b[0][0] && (a.options.touch_device ? (b.select("g.adaptations").style("opacity", 0), b.select("path").style("fill-opacity", 0.3)) : (b.select("stop.final").transition().duration(250).attr("stop-opacity", 0), b.select("g.adaptations").transition().duration(500).style("opacity", 0), c(!1)), b.selectAll("g.tooltip").style("display",
                    "none"), b.attr("class", "curve"))
            });
            b(document).keydown(function (a) {
                if (27 == a.which) {
                    a = d3.select("g.curve.selected");
                    if (!a[0][0]) return !1;
                    a.selectAll("g.tooltip").style("display", "none");
                    a.attr("class", "curve");
                    a.select("g.adaptations").transition().duration(200).style("opacity", 0);
                    a.select("stop.final").attr("stop-opacity", 0);
                    c(!1)
                }
            });
            var p = null, i = 0, n = null, e = 0.8
        }, _bindGraphEvents: function () {
            b(".users, .traffic").click(function (a) {
                a && (a.preventDefault(), a.stopPropagation());
                -1 < b(this).attr("class").search("disabled") &&
                (a = b(this).attr("class").replace(" disabled", ""), b(this).attr("class", a), a = b(this).attr("class"), "users" == a ? (d3.selectAll(".users").attr("class", "users"), d3.selectAll(".traffic").attr("class", "traffic disabled")) : (d3.selectAll(".users").attr("class", "users disabled"), d3.selectAll(".traffic").attr("class", "traffic")))
            });
            d3.selectAll(".tick").on("mouseover", function () {
                if (0 > b(this).closest("g").parent().closest("g").attr("class").search("disabled")) {
                    b(this).parent().find(".graph_info").show();
                    var a =
                        d3.select(this).attr("x") || d3.select(this).attr("cx"),
                        c = d3.select(this).attr("y") || d3.select(this).attr("cy");
                    d3.select(this).attr("data-x", a).attr("data-y", c).transition().ease("linear").duration(100).attr("x", a - 2).attr("y", c - 2).attr("height", 12).attr("width", 12).attr("r", 6)
                }
            }).on("mouseout", function () {
                if (0 > b(this).closest("g").parent().closest("g").attr("class").search("disabled")) {
                    b(this).parent().find(".graph_info").hide();
                    var a = Math.round(d3.select(this).attr("data-x")), c = Math.round(d3.select(this).attr("data-y"));
                    if (!a || !c) return !1;
                    d3.select(this).transition().ease("linear").duration(100).attr("x", a).attr("y", c).attr("width", 9).attr("height", 9).attr("r", 4)
                }
            });
            $tooltip = b("article.visualization").find("div.graph_bar_tooltip");
            $tooltip.hover(function (a) {
                a.preventDefault();
                a.stopPropagation();
                b(this).show()
            }, function (a) {
                a.preventDefault();
                a.stopPropagation();
                b(this).hide()
            });
            d3.selectAll("g.graph_tech").select("rect").on("mouseover", function (a) {
                f._showGraphTechTooltip(a, d3.select(this).attr("fill"))
            }).on("mouseout",
                function () {
                    f._hideGraphTechTooltip()
                });
            d3.selectAll("g.graph_browsers").on("click", function (a) {
                b("article.browsers").browsersGalleria("set", a, null, null)
            }).on("mouseover", function (c) {
                f._showGraphTechTooltip(c, "day" == a.options.mode ? "#434343" : "#CCCCCC")
            }).on("mouseout", function () {
                f._hideGraphTechTooltip()
            });
            b("article.visualization .viewport div.graphs svg").click().focus()
        }, _showGplus: function () {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = !0;
            a.src = "https://apis.google.com/js/plusone.js";
            var c = document.getElementsByTagName("script")[0];
            c.parentNode.insertBefore(a, c)
        }, _setScrollWatch: function () {
            function c() {
                var e = (new Date).getTime() - i;
                Math.min(e, 0.2);
                e = a.options.w - b(d).width() + 16;
                e = Math.min(e, f * e) - j;
                k = j;
                j += 0.01 * e;
                translateRotate(n, -j, 0, 0, 0, p, 0);
                (1 < Math.abs(e) || 0.1 < Math.abs(p)) && requestAnimationFrame(c)
            }

            var f = 0, k = a.options.w - b(d).width() + 16, j = k, p = 0, i = (new Date).getTime(), n = b(".container");
            b(".viewport").scroll(function (e) {
                e.preventDefault();
                var e = b(this).scrollLeft(), h = Math.max(1,
                    a.options.w - b(d).width());
                f = e / h;
                requestAnimationFrame(c);
                return !1
            })
        }
    };
    c = {
        change: function (c) {
            a.options.visualization = c[0];
            a.options.started ? "evolution" == a.options.visualization ? a._changeToVis1() : a._changeToVis2() : a._startAnimation();
            if (c[1] && a.options.mode != c[1]) a.options.mode = c[1], a._changeDaytime();
            b("article.visualization header nav a").removeClass("disabled selected");
            "evolution" == a.options.visualization ? (a.options.visLoaded[a.options.visualization] || b("article.visualization header nav a:eq(1)").addClass("disabled"),
                b("article.visualization header nav a:eq(0)").addClass("selected")) : (a.options.visLoaded[a.options.visualization] || b("article.visualization header nav a:eq(0)").addClass("disabled"), b("article.visualization header nav a:eq(1)").addClass("selected"))
        }
    };
    f = {
        _multiText: function (a, c, b, d) {
            if (-1 != c.search(/\n/)) for (var c = c.split(/\n/), f = 0; f < c.length; f++) {
                var i = c[f];
                a.append("tspan").text(i).attr("dy", 16 * f).attr("x", b.x).attr("y", b.y).attr("text-anchor", d)
            } else a.text(c)
        }, _normalizeId: function (a) {
            return a.toLowerCase().replace(/ /g,
                "_")
        }, _scrollBarWidth: function () {
            document.body.style.overflow = "hidden";
            var a = document.body.clientWidth;
            document.body.style.overflow = "scroll";
            (a -= document.body.clientWidth) || (a = document.body.offsetWidth - document.body.clientWidth);
            document.body.style.overflow = "";
            return a
        }, _createPattern: function (a, c, b, d, f, i, j) {
            a.append("defs").append("pattern").attr("id", j).attr("patternUnits", "userSpaceOnUse").attr("x", f).attr("y", i).attr("width", b).attr("height", d).attr("viewBox", "0 0 " + b + " " + d).append("image").attr("xlink:href",
                c).attr("x", 0).attr("y", 0).attr("width", b).attr("height", d)
        }, _showGraphTechTooltip: function (c, d) {
            var f = b("article.visualization").find("div.graph_bar_tooltip");
            f.html("").append("<h4>" + c.title + "</h4>").append('<span class="arrow" style="border-top-color:' + d + '"></span>');
            if (c.name) f.css({
                left: c.start.x * a.options.s - f.innerWidth() / 2 + "px",
                background: d
            }), f.find("h4").css({color: "#434343" == d ? "white" : "#414141"}); else {
                var j = gettext("READ MORE");
                f.append("<p>" + c.info.replace(/\n/g, "<br/>") + "</p>").append('<a target="_blank" href="' +
                    c.url + '">' + j + "</a>").css({
                    left: c.position.x * a.options.s - f.innerWidth() / 2 + "px",
                    background: d
                })
            }
            f.show()
        }, _hideGraphTechTooltip: function () {
            var a = b("article.visualization").find("div.graph_bar_tooltip");
            a.data("hover") || a.hide()
        }
    };
    b.fn.evolutionOfWeb = function (d) {
        if ("string" === b.type(d) && c[d]) return c[d].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === b.type(d) || !d) return a._init.apply(this, arguments);
        b.error("You cannot invoke evolutionOfWeb jQuery plugin with the arguments: " + d)
    }
})(jQuery,
    window);
(function (b) {
    var d, n, a = {};
    d = {
        pluginName: "browsersGalleria", options: null, _init: function (c) {
            return this.each(function () {
                var f = b(this);
                f.data("options", b.extend(!0, a, c));
                d._initialize(f);
                d._bind(f)
            })
        }, _bind: function (a) {
            var f = Galleria.get(a.data("galleria"))[0];
            a.find("a.close_galleria, a.close_hidden").on({click: d._hideGalleria});
            a.find("a.previous, a.next").on({click: d._moveTo});
            a.find("ul.dots-list li a").live({click: d._goTo});
            f.attachKeyboard({
                left: function (b) {
                    a.is(":visible") && (b.preventDefault(), b.stopPropagation(),
                        this.prev())
                }, right: function (b) {
                    a.is(":visible") && (b.preventDefault(), b.stopPropagation(), this.next())
                }, 27: function () {
                    d._hideGalleria(null, a)
                }, 13: function () {
                    this.play()
                }
            });
            b(".browser_mamufas").click(function (f) {
                b(f.target).closest("article.window").length || d._hideGalleria(null, a)
            })
        }, _initialize: function (a) {
            var b = a.find("#galleria").galleria({
                thumbnails: !1,
                showCounter: !1,
                autoplay: !1,
                carouselSpeed: 150,
                preload: 3,
                width: 580,
                height: 435,
                showInfo: !1,
                pauseOnInteraction: !1
            });
            a.data("galleria", b);
            setTimeout(function () {
                a.css({
                    opacity: "1",
                    display: "none", "z-index": "50"
                })
            }, 5E3)
        }, _moveTo: function (a) {
            a.preventDefault();
            var d = b(this).closest("article.browsers"), a = Galleria.get(d.data("galleria"))[0];
            d.data("animating") || (d.data("animating", !0), b(this).hasClass("next") ? (a.pause(), a.next()) : (a.pause(), a.prev()), setTimeout(function () {
                d.data("animating", !1)
            }, 250))
        }, _goTo: function (a) {
            a.preventDefault();
            a = b(this).closest("article.browsers");
            a = Galleria.get(a.data("galleria"))[0];
            if (!b(this).hasClass("selected")) {
                a.pause();
                var d = b(this).parent().index();
                a.show(d)
            }
        }, _addImages: function (a, b, d) {
            for (var g = Galleria.get(a.data("galleria"))[0], l = 0; l < b.versions.length; l++) {
                var k = b.versions[l];
                "desktop" == k.type && (g.push({
                    image: "img/browsers/" + b.name + "/" + k.type + "_" + k.number + ".jpg",
                    description: k.description,
                    title: b.title.toUpperCase() + " v." + k.number,
                    version: k.number
                }), a.find("ul.dots-list").append("<li><a " + (d == k.number ? 'class="selected"' : "") + ' href="#version' + k.number + '">' + k.number + "</a></li>"))
            }
            a.find(".browser_image").addClass(b.name)
        }, _positionateDots: function (a) {
            var b =
                628 - 10 * (a.find("ul.dots-list").find("li").size() - 1);
            a.find("ul.dots-list").css({"margin-left": b / 2 + "px"})
        }, _showGalleria: function (a, b, j, g) {
            d._resetGalleria(a);
            d._addImages(a, b, g);
            d._positionateDots(a, b);
            a.fadeIn(function () {
                d._animateGalleria(a, b, g)
            })
        }, _animateGalleria: function (a, b, d) {
            for (var a = Galleria.get(a.data("galleria"))[0], g, l = 0; l < b.versions.length; l++) if (d == b.versions[l].number) {
                g = l;
                break
            }
            g ? a.show(g) : a.show(0);
            a.play()
        }, _hideGalleria: function (a, f) {
            a && a.preventDefault();
            var j = null != a ? b(this).closest("article.browsers") :
                f;
            j.fadeOut(function () {
                d._resetGalleria(j)
            })
        }, _resetGalleria: function (a) {
            var b = Galleria.get(a.data("galleria"))[0], d = b.getDataLength();
            b.pause();
            b.splice(0, d);
            a.find(".info h2").text("");
            a.find(".info p").text("");
            a.find("ul.dots-list").children("li").remove();
            a.find(".browser_image").removeAttr("class").addClass("browser_image")
        }, _trigger: function (a, f, j) {
            var g = 0 <= b.inArray(a, d.options.globalEvents), a = a + "." + d.pluginName;
            g ? b.event.trigger(a, f) : j.trigger(a, f)
        }
    };
    n = {
        set: function (a, f, j) {
            d._showGalleria(b(this),
                a, f, j)
        }
    };
    b.fn.browsersGalleria = function (a) {
        if ("string" === b.type(a) && n[a]) return n[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === b.type(a) || !a) return d._init.apply(this, arguments);
        b.error("You cannot invoke browsersGalleria jQuery plugin with the arguments: " + a)
    }
})(jQuery, window);
$.extend({
    getUrlVars: function () {
        for (var b = [], d, n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), a = 0; a < n.length; a++) d = n[a].split("="), b.push(d[0]), b[d[0]] = d[1];
        return b
    }, getUrlVar: function (b) {
        return $.getUrlVars()[b]
    }
});
(function (b) {
    var d, n, a = {};
    d = {
        pluginName: "staticWidget", options: {type: !1, vis: 1, graph: 1}, _init: function (c) {
            return this.each(function () {
                var f = b(this);
                f.data("options", b.extend(!0, a, c));
                d._initialize(f);
                d._bind(f)
            })
        }, _bind: function (a) {
            a.find("header nav a").bind({click: d._goTo});
            a.find("footer a.close").bind({
                click: function (a) {
                    a.preventDefault();
                    b(this).closest("div.credits").fadeOut();
                    b(this).closest("section").find("a.credits").fadeIn()
                }
            });
            a.find("footer a.credits").bind({
                click: function (a) {
                    a.preventDefault();
                    b(this).parent().find("div.credits").fadeIn();
                    b(this).fadeOut()
                }
            });
            a.find("a.graph").bind({click: d._goToGraph})
        }, _initialize: function () {
            b(":checkbox").iphoneStyle({checkedLabel: "", uncheckedLabel: "", onChange: d._onChangeDaytime});
            b("span.day,span.night").show();
            d._showGplus()
        }, _onChangeDaytime: function (a, f) {
            (d.options.type = f) ? b("body").addClass("night") : b("body").removeClass("night");
            b("section.viewport div.vis" + d.options.vis + (f ? "" : "b") + (2 == d.options.vis ? d.options.graph : "")).addClass("hide");
            b("section.viewport div.vis" +
                d.options.vis + (f ? "b" : "") + (2 == d.options.vis ? d.options.graph : "")).removeClass("hide")
        }, _goTo: function (a) {
            a.preventDefault();
            a.stopPropagation();
            a = b(a.target);
            if (a.hasClass("selected")) return !1;
            b("article.visualization").find("header nav a").removeClass("selected");
            a.addClass("selected");
            b("section.viewport div.vis" + d.options.vis + (d.options.type ? "b" : "") + (2 == d.options.vis ? d.options.graph : "")).addClass("hide");
            d.options.vis = a.hasClass("techs") ? 1 : 2;
            b("section.viewport div.vis" + d.options.vis + (d.options.type ?
                "b" : "") + (2 == d.options.vis ? d.options.graph : "")).removeClass("hide")
        }, _goToGraph: function (a) {
            a.preventDefault();
            a.stopPropagation();
            a = b(a.target).attr("data-graph");
            b("section.viewport div.vis" + d.options.vis + (d.options.type ? "b" : "") + (2 == d.options.vis ? d.options.graph : "")).addClass("hide");
            d.options.graph = a;
            b("section.viewport div.vis" + d.options.vis + (d.options.type ? "b" : "") + (2 == d.options.vis ? d.options.graph : "")).removeClass("hide")
        }, _showGplus: function () {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = !0;
            a.src = "https://apis.google.com/js/plusone.js";
            var b = document.getElementsByTagName("script")[0];
            b.parentNode.insertBefore(a, b)
        }, _trigger: function (a, f, j) {
            var g = 0 <= b.inArray(a, d.options.globalEvents), a = a + "." + d.pluginName;
            g ? b.event.trigger(a, f) : j.trigger(a, f)
        }
    };
    n = {};
    b.fn.staticWidget = function (a) {
        if ("string" === b.type(a) && n[a]) return n[a].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === b.type(a) || !a) return d._init.apply(this, arguments);
        b.error("You cannot invoke staticWidget jQuery plugin with the arguments: " +
            a)
    }
})(jQuery, window);
$(function () {
    window.location.hash ? $("article.home").remove() : $("article.home").addClass("visible");
    var a = $.browser;
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) return a.tablet = !0, window.location.href = "/static", !1;
    if (!a.tablet && !a.mobile && !$.getUrlVar("force")) {
        var b = navigator.userAgent.toLowerCase();
        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
        if ($.browser.chrome) b = b.substring(b.indexOf("chrome/") + 7), a.version = b.substring(0, b.indexOf(".")), a.safari =
            !1;
        if (a.msie && 9 > a.version || a.mozilla && 12 > parseFloat(a.version.slice(0, 3)) || a.safari && 534 > parseFloat(a.version.slice(0, 3)) || a.opera && 11 > parseFloat(a.version.slice(0, 3)) || a.chrome && 19 > a.version) window.location.href = "/old?hl=" + current_language
    }
    $("article.visualization").evolutionOfWeb();
    var a = document.getElementById("explore"), c = (new Spinner({
        lines: 13,
        length: 0,
        width: 4,
        radius: 8,
        rotate: 0,
        color: "#333",
        speed: 1,
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        className: "spinner",
        zIndex: 2E9,
        top: -2,
        left: "auto"
    })).spin(a);
    (function () {
        $.History.bind(function (a) {
            a =
                a.slice(1).split("/");
            2 >= a.length ? ("evolution" != a[0] && "growth" != a[0] && (a[0] = "evolution"), 1 < a.length && "day" != a[1] && "night" != a[1] && (a[1] = "day"), $("article.visualization").evolutionOfWeb("change", a)) : $.History.go("/evolution")
        })
    })();
    setTimeout(function () {
        c.stop();
        $("#explore span.explore").fadeIn()
    }, 2E3)
});

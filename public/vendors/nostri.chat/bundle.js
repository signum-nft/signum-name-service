!(function () {
  "use strict";
  function e() {}
  function t(e) {
    return e();
  }
  function n() {
    return Object.create(null);
  }
  function r(e) {
    e.forEach(t);
  }
  function o(e) {
    return "function" == typeof e;
  }
  function i(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  let s;
  function a(e, t) {
    return s || (s = document.createElement("a")), (s.href = t), e === s.href;
  }
  function c(t, n, r) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const r = t.subscribe(...n);
        return r.unsubscribe ? () => r.unsubscribe() : r;
      })(n, r)
    );
  }
  function u(e, t, n) {
    return e.set(n), t;
  }
  const l = "undefined" != typeof window;
  let f = l ? () => window.performance.now() : () => Date.now(),
    h = l ? (e) => requestAnimationFrame(e) : e;
  const d = new Set();
  function p(e) {
    d.forEach((t) => {
      t.c(e) || (d.delete(t), t.f());
    }),
      0 !== d.size && h(p);
  }
  function y(e, t) {
    e.appendChild(t);
  }
  function b(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function g(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }
  function w(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function v(e) {
    return document.createElement(e);
  }
  function m(e) {
    return document.createTextNode(e);
  }
  function _() {
    return m(" ");
  }
  function x() {
    return m("");
  }
  function E(e, t, n, r) {
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
  }
  function k(e) {
    return function (t) {
      return t.preventDefault(), e.call(this, t);
    };
  }
  function S(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function A(e, t) {
    (t = "" + t), e.data !== t && (e.data = t);
  }
  function O(e, t, n, r) {
    null == n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, r ? "important" : "");
  }
  let C;
  function P(e) {
    C = e;
  }
  function I() {
    if (!C) throw new Error("Function called outside component initialization");
    return C;
  }
  function T(e) {
    I().$$.on_mount.push(e);
  }
  const L = [],
    B = [];
  let R = [];
  const $ = [],
    j = Promise.resolve();
  let U = !1;
  function N(e) {
    R.push(e);
  }
  function H(e) {
    $.push(e);
  }
  const q = new Set();
  let M = 0;
  function F() {
    if (0 !== M) return;
    const e = C;
    do {
      try {
        for (; M < L.length; ) {
          const e = L[M];
          M++, P(e), D(e.$$);
        }
      } catch (e) {
        throw ((L.length = 0), (M = 0), e);
      }
      for (P(null), L.length = 0, M = 0; B.length; ) B.pop()();
      for (let e = 0; e < R.length; e += 1) {
        const t = R[e];
        q.has(t) || (q.add(t), t());
      }
      R.length = 0;
    } while (L.length);
    for (; $.length; ) $.pop()();
    (U = !1), q.clear(), P(e);
  }
  function D(e) {
    if (null !== e.fragment) {
      e.update(), r(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(N);
    }
  }
  const z = new Set();
  let K;
  function G() {
    K = { r: 0, c: [], p: K };
  }
  function W() {
    K.r || r(K.c), (K = K.p);
  }
  function V(e, t) {
    e && e.i && (z.delete(e), e.i(t));
  }
  function Y(e, t, n, r) {
    if (e && e.o) {
      if (z.has(e)) return;
      z.add(e),
        K.c.push(() => {
          z.delete(e), r && (n && e.d(1), r());
        }),
        e.o(t);
    } else r && r();
  }
  function Z(e, t, n) {
    const r = e.$$.props[t];
    void 0 !== r && ((e.$$.bound[r] = n), n(e.$$.ctx[r]));
  }
  function J(e) {
    e && e.c();
  }
  function Q(e, n, i, s) {
    const { fragment: a, after_update: c } = e.$$;
    a && a.m(n, i),
      s ||
        N(() => {
          const n = e.$$.on_mount.map(t).filter(o);
          e.$$.on_destroy ? e.$$.on_destroy.push(...n) : r(n),
            (e.$$.on_mount = []);
        }),
      c.forEach(N);
  }
  function X(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (!(function (e) {
        const t = [],
          n = [];
        R.forEach((r) => (-1 === e.indexOf(r) ? t.push(r) : n.push(r))),
          n.forEach((e) => e()),
          (R = t);
      })(n.after_update),
      r(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function ee(e, t) {
    -1 === e.$$.dirty[0] &&
      (L.push(e), U || ((U = !0), j.then(F)), e.$$.dirty.fill(0)),
      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
  }
  function te(t, o, i, s, a, c, u, l = [-1]) {
    const f = C;
    P(t);
    const h = (t.$$ = {
      fragment: null,
      ctx: [],
      props: c,
      update: e,
      not_equal: a,
      bound: n(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(o.context || (f ? f.$$.context : [])),
      callbacks: n(),
      dirty: l,
      skip_bound: !1,
      root: o.target || f.$$.root,
    });
    u && u(h.root);
    let d = !1;
    if (
      ((h.ctx = i
        ? i(t, o.props || {}, (e, n, ...r) => {
            const o = r.length ? r[0] : n;
            return (
              h.ctx &&
                a(h.ctx[e], (h.ctx[e] = o)) &&
                (!h.skip_bound && h.bound[e] && h.bound[e](o), d && ee(t, e)),
              n
            );
          })
        : []),
      h.update(),
      (d = !0),
      r(h.before_update),
      (h.fragment = !!s && s(h.ctx)),
      o.target)
    ) {
      if (o.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(o.target);
        h.fragment && h.fragment.l(e), e.forEach(g);
      } else h.fragment && h.fragment.c();
      o.intro && V(t.$$.fragment),
        Q(t, o.target, o.anchor, o.customElement),
        F();
    }
    P(f);
  }
  class ne {
    $destroy() {
      X(this, 1), (this.$destroy = e);
    }
    $on(t, n) {
      if (!o(n)) return e;
      const r = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
      return (
        r.push(n),
        () => {
          const e = r.indexOf(n);
          -1 !== e && r.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }
  const re = [];
  function oe(t, n = e) {
    let r;
    const o = new Set();
    function s(e) {
      if (i(t, e) && ((t = e), r)) {
        const e = !re.length;
        for (const e of o) e[1](), re.push(e, t);
        if (e) {
          for (let e = 0; e < re.length; e += 2) re[e][0](re[e + 1]);
          re.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (i, a = e) {
        const c = [i, a];
        return (
          o.add(c),
          1 === o.size && (r = n(s) || e),
          i(t),
          () => {
            o.delete(c), 0 === o.size && r && (r(), (r = null));
          }
        );
      },
    };
  }
  const ie = oe(null),
    se = oe({ events: [], profiles: {} }),
    ae = oe(null),
    ce = oe(null),
    ue = oe({});
  function le(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw new Error(`Wrong positive integer: ${e}`);
  }
  function fe(e, ...t) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (t.length > 0 && !t.includes(e.length))
      throw new TypeError(
        `Expected Uint8Array of length ${t}, not of length=${e.length}`
      );
  }
  const he = {
      number: le,
      bool: function (e) {
        if ("boolean" != typeof e)
          throw new Error(`Expected boolean, not ${e}`);
      },
      bytes: fe,
      hash: function (e) {
        if ("function" != typeof e || "function" != typeof e.create)
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        le(e.outputLen), le(e.blockLen);
      },
      exists: function (e, t = !0) {
        if (e.destroyed) throw new Error("Hash instance has been destroyed");
        if (t && e.finished)
          throw new Error("Hash#digest() has already been called");
      },
      output: function (e, t) {
        fe(e);
        const n = t.outputLen;
        if (e.length < n)
          throw new Error(
            `digestInto() expects output buffer of length at least ${n}`
          );
      },
    },
    de =
      "object" == typeof globalThis && "crypto" in globalThis
        ? globalThis.crypto
        : void 0,
    pe = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength),
    ye = (e, t) => (e << (32 - t)) | (e >>> t);
  if (!(68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0]))
    throw new Error("Non little-endian hardware is not supported");
  const be = Array.from({ length: 256 }, (e, t) =>
    t.toString(16).padStart(2, "0")
  );
  function ge(e) {
    if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
    let t = "";
    for (let n = 0; n < e.length; n++) t += be[e[n]];
    return t;
  }
  function we(e) {
    if ("string" != typeof e)
      throw new TypeError("hexToBytes: expected string, got " + typeof e);
    if (e.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex");
    const t = new Uint8Array(e.length / 2);
    for (let n = 0; n < t.length; n++) {
      const r = 2 * n,
        o = e.slice(r, r + 2),
        i = Number.parseInt(o, 16);
      if (Number.isNaN(i) || i < 0) throw new Error("Invalid byte sequence");
      t[n] = i;
    }
    return t;
  }
  function ve(e) {
    if ("string" != typeof e)
      throw new TypeError("utf8ToBytes expected string, got " + typeof e);
    return new TextEncoder().encode(e);
  }
  function me(e) {
    if (("string" == typeof e && (e = ve(e)), !(e instanceof Uint8Array)))
      throw new TypeError(
        `Expected input type is Uint8Array (got ${typeof e})`
      );
    return e;
  }
  function _e(...e) {
    if (!e.every((e) => e instanceof Uint8Array))
      throw new Error("Uint8Array list expected");
    if (1 === e.length) return e[0];
    const t = e.reduce((e, t) => e + t.length, 0),
      n = new Uint8Array(t);
    for (let t = 0, r = 0; t < e.length; t++) {
      const o = e[t];
      n.set(o, r), (r += o.length);
    }
    return n;
  }
  class xe {
    clone() {
      return this._cloneInto();
    }
  }
  function Ee(e) {
    const t = (t) => e().update(me(t)).digest(),
      n = e();
    return (
      (t.outputLen = n.outputLen),
      (t.blockLen = n.blockLen),
      (t.create = () => e()),
      t
    );
  }
  function ke(e = 32) {
    if (de && "function" == typeof de.getRandomValues)
      return de.getRandomValues(new Uint8Array(e));
    throw new Error("crypto.getRandomValues must be defined");
  }
  class Se extends xe {
    constructor(e, t, n, r) {
      super(),
        (this.blockLen = e),
        (this.outputLen = t),
        (this.padOffset = n),
        (this.isLE = r),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.buffer = new Uint8Array(e)),
        (this.view = pe(this.buffer));
    }
    update(e) {
      he.exists(this);
      const { view: t, buffer: n, blockLen: r } = this,
        o = (e = me(e)).length;
      for (let i = 0; i < o; ) {
        const s = Math.min(r - this.pos, o - i);
        if (s !== r)
          n.set(e.subarray(i, i + s), this.pos),
            (this.pos += s),
            (i += s),
            this.pos === r && (this.process(t, 0), (this.pos = 0));
        else {
          const t = pe(e);
          for (; r <= o - i; i += r) this.process(t, i);
        }
      }
      return (this.length += e.length), this.roundClean(), this;
    }
    digestInto(e) {
      he.exists(this), he.output(e, this), (this.finished = !0);
      const { buffer: t, view: n, blockLen: r, isLE: o } = this;
      let { pos: i } = this;
      (t[i++] = 128),
        this.buffer.subarray(i).fill(0),
        this.padOffset > r - i && (this.process(n, 0), (i = 0));
      for (let e = i; e < r; e++) t[e] = 0;
      !(function (e, t, n, r) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, n, r);
        const o = BigInt(32),
          i = BigInt(4294967295),
          s = Number((n >> o) & i),
          a = Number(n & i),
          c = r ? 4 : 0,
          u = r ? 0 : 4;
        e.setUint32(t + c, s, r), e.setUint32(t + u, a, r);
      })(n, r - 8, BigInt(8 * this.length), o),
        this.process(n, 0);
      const s = pe(e),
        a = this.outputLen;
      if (a % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
      const c = a / 4,
        u = this.get();
      if (c > u.length) throw new Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) s.setUint32(4 * e, u[e], o);
    }
    digest() {
      const { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      const n = e.slice(0, t);
      return this.destroy(), n;
    }
    _cloneInto(e) {
      e || (e = new this.constructor()), e.set(...this.get());
      const {
        blockLen: t,
        buffer: n,
        length: r,
        finished: o,
        destroyed: i,
        pos: s,
      } = this;
      return (
        (e.length = r),
        (e.pos = s),
        (e.finished = o),
        (e.destroyed = i),
        r % t && e.buffer.set(n),
        e
      );
    }
  }
  const Ae = (e, t, n) => (e & t) ^ (e & n) ^ (t & n),
    Oe = new Uint32Array([
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
      2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
      1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
      1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
      3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
      1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
      2428436474, 2756734187, 3204031479, 3329325298,
    ]),
    Ce = new Uint32Array([
      1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
      528734635, 1541459225,
    ]),
    Pe = new Uint32Array(64);
  class Ie extends Se {
    constructor() {
      super(64, 32, 8, !1),
        (this.A = 0 | Ce[0]),
        (this.B = 0 | Ce[1]),
        (this.C = 0 | Ce[2]),
        (this.D = 0 | Ce[3]),
        (this.E = 0 | Ce[4]),
        (this.F = 0 | Ce[5]),
        (this.G = 0 | Ce[6]),
        (this.H = 0 | Ce[7]);
    }
    get() {
      const { A: e, B: t, C: n, D: r, E: o, F: i, G: s, H: a } = this;
      return [e, t, n, r, o, i, s, a];
    }
    set(e, t, n, r, o, i, s, a) {
      (this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | n),
        (this.D = 0 | r),
        (this.E = 0 | o),
        (this.F = 0 | i),
        (this.G = 0 | s),
        (this.H = 0 | a);
    }
    process(e, t) {
      for (let n = 0; n < 16; n++, t += 4) Pe[n] = e.getUint32(t, !1);
      for (let e = 16; e < 64; e++) {
        const t = Pe[e - 15],
          n = Pe[e - 2],
          r = ye(t, 7) ^ ye(t, 18) ^ (t >>> 3),
          o = ye(n, 17) ^ ye(n, 19) ^ (n >>> 10);
        Pe[e] = (o + Pe[e - 7] + r + Pe[e - 16]) | 0;
      }
      let { A: n, B: r, C: o, D: i, E: s, F: a, G: c, H: u } = this;
      for (let e = 0; e < 64; e++) {
        const t =
            (u +
              (ye(s, 6) ^ ye(s, 11) ^ ye(s, 25)) +
              (((l = s) & a) ^ (~l & c)) +
              Oe[e] +
              Pe[e]) |
            0,
          f = ((ye(n, 2) ^ ye(n, 13) ^ ye(n, 22)) + Ae(n, r, o)) | 0;
        (u = c),
          (c = a),
          (a = s),
          (s = (i + t) | 0),
          (i = o),
          (o = r),
          (r = n),
          (n = (t + f) | 0);
      }
      var l;
      (n = (n + this.A) | 0),
        (r = (r + this.B) | 0),
        (o = (o + this.C) | 0),
        (i = (i + this.D) | 0),
        (s = (s + this.E) | 0),
        (a = (a + this.F) | 0),
        (c = (c + this.G) | 0),
        (u = (u + this.H) | 0),
        this.set(n, r, o, i, s, a, c, u);
    }
    roundClean() {
      Pe.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
    }
  }
  class Te extends Ie {
    constructor() {
      super(),
        (this.A = -1056596264),
        (this.B = 914150663),
        (this.C = 812702999),
        (this.D = -150054599),
        (this.E = -4191439),
        (this.F = 1750603025),
        (this.G = 1694076839),
        (this.H = -1090891868),
        (this.outputLen = 28);
    }
  }
  const Le = Ee(() => new Ie());
  Ee(() => new Te());
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  const Be = BigInt(0),
    Re = BigInt(1),
    $e = BigInt(2),
    je = (e) => e instanceof Uint8Array,
    Ue = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
  function Ne(e) {
    if (!je(e)) throw new Error("Uint8Array expected");
    let t = "";
    for (let n = 0; n < e.length; n++) t += Ue[e[n]];
    return t;
  }
  function He(e) {
    const t = e.toString(16);
    return 1 & t.length ? `0${t}` : t;
  }
  function qe(e) {
    if ("string" != typeof e)
      throw new Error("hex string expected, got " + typeof e);
    return BigInt("" === e ? "0" : `0x${e}`);
  }
  function Me(e) {
    if ("string" != typeof e)
      throw new Error("hex string expected, got " + typeof e);
    if (e.length % 2)
      throw new Error("hex string is invalid: unpadded " + e.length);
    const t = new Uint8Array(e.length / 2);
    for (let n = 0; n < t.length; n++) {
      const r = 2 * n,
        o = e.slice(r, r + 2),
        i = Number.parseInt(o, 16);
      if (Number.isNaN(i) || i < 0) throw new Error("invalid byte sequence");
      t[n] = i;
    }
    return t;
  }
  function Fe(e) {
    return qe(Ne(e));
  }
  function De(e) {
    if (!je(e)) throw new Error("Uint8Array expected");
    return qe(Ne(Uint8Array.from(e).reverse()));
  }
  const ze = (e, t) => Me(e.toString(16).padStart(2 * t, "0")),
    Ke = (e, t) => ze(e, t).reverse();
  function Ge(e, t, n) {
    let r;
    if ("string" == typeof t)
      try {
        r = Me(t);
      } catch (n) {
        throw new Error(
          `${e} must be valid hex string, got "${t}". Cause: ${n}`
        );
      }
    else {
      if (!je(t)) throw new Error(`${e} must be hex string or Uint8Array`);
      r = Uint8Array.from(t);
    }
    const o = r.length;
    if ("number" == typeof n && o !== n)
      throw new Error(`${e} expected ${n} bytes, got ${o}`);
    return r;
  }
  function We(...e) {
    const t = new Uint8Array(e.reduce((e, t) => e + t.length, 0));
    let n = 0;
    return (
      e.forEach((e) => {
        if (!je(e)) throw new Error("Uint8Array expected");
        t.set(e, n), (n += e.length);
      }),
      t
    );
  }
  function Ve(e) {
    if ("string" != typeof e)
      throw new Error("utf8ToBytes expected string, got " + typeof e);
    return new TextEncoder().encode(e);
  }
  const Ye = (e) => ($e << BigInt(e - 1)) - Re,
    Ze = (e) => new Uint8Array(e),
    Je = (e) => Uint8Array.from(e);
  function Qe(e, t, n) {
    if ("number" != typeof e || e < 2)
      throw new Error("hashLen must be a number");
    if ("number" != typeof t || t < 2)
      throw new Error("qByteLen must be a number");
    if ("function" != typeof n) throw new Error("hmacFn must be a function");
    let r = Ze(e),
      o = Ze(e),
      i = 0;
    const s = () => {
        r.fill(1), o.fill(0), (i = 0);
      },
      a = (...e) => n(o, r, ...e),
      c = (e = Ze()) => {
        (o = a(Je([0]), e)),
          (r = a()),
          0 !== e.length && ((o = a(Je([1]), e)), (r = a()));
      },
      u = () => {
        if (i++ >= 1e3) throw new Error("drbg: tried 1000 values");
        let e = 0;
        const n = [];
        for (; e < t; ) {
          r = a();
          const t = r.slice();
          n.push(t), (e += r.length);
        }
        return We(...n);
      };
    return (e, t) => {
      let n;
      for (s(), c(e); !(n = t(u())); ) c();
      return s(), n;
    };
  }
  const Xe = {
    bigint: (e) => "bigint" == typeof e,
    function: (e) => "function" == typeof e,
    boolean: (e) => "boolean" == typeof e,
    string: (e) => "string" == typeof e,
    isSafeInteger: (e) => Number.isSafeInteger(e),
    array: (e) => Array.isArray(e),
    field: (e, t) => t.Fp.isValid(e),
    hash: (e) => "function" == typeof e && Number.isSafeInteger(e.outputLen),
  };
  function et(e, t, n = {}) {
    const r = (t, n, r) => {
      const o = Xe[n];
      if ("function" != typeof o)
        throw new Error(`Invalid validator "${n}", expected function`);
      const i = e[t];
      if (!((r && void 0 === i) || o(i, e)))
        throw new Error(
          `Invalid param ${String(t)}=${i} (${typeof i}), expected ${n}`
        );
    };
    for (const [e, n] of Object.entries(t)) r(e, n, !1);
    for (const [e, t] of Object.entries(n)) r(e, t, !0);
    return e;
  }
  var tt = Object.freeze({
    __proto__: null,
    bytesToHex: Ne,
    numberToHexUnpadded: He,
    hexToNumber: qe,
    hexToBytes: Me,
    bytesToNumberBE: Fe,
    bytesToNumberLE: De,
    numberToBytesBE: ze,
    numberToBytesLE: Ke,
    numberToVarBytesBE: (e) => Me(He(e)),
    ensureBytes: Ge,
    concatBytes: We,
    equalBytes: function (e, t) {
      if (e.length !== t.length) return !1;
      for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
      return !0;
    },
    utf8ToBytes: Ve,
    bitLen: function (e) {
      let t;
      for (t = 0; e > Be; e >>= Re, t += 1);
      return t;
    },
    bitGet: (e, t) => (e >> BigInt(t)) & Re,
    bitSet: (e, t, n) => e | ((n ? Re : Be) << BigInt(t)),
    bitMask: Ye,
    createHmacDrbg: Qe,
    validateObject: et,
  });
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const nt =
      BigInt(0),
    rt = BigInt(1),
    ot = BigInt(2),
    it = BigInt(3),
    st = BigInt(4),
    at = BigInt(5),
    ct = BigInt(8);
  function ut(e, t) {
    const n = e % t;
    return n >= nt ? n : t + n;
  }
  function lt(e, t, n) {
    if (n <= nt || t < nt) throw new Error("Expected power/modulo > 0");
    if (n === rt) return nt;
    let r = rt;
    for (; t > nt; ) t & rt && (r = (r * e) % n), (e = (e * e) % n), (t >>= rt);
    return r;
  }
  function ft(e, t, n) {
    let r = e;
    for (; t-- > nt; ) (r *= r), (r %= n);
    return r;
  }
  function ht(e, t) {
    if (e === nt || t <= nt)
      throw new Error(
        `invert: expected positive integers, got n=${e} mod=${t}`
      );
    let n = ut(e, t),
      r = t,
      o = nt,
      i = rt;
    for (; n !== nt; ) {
      const e = r % n,
        t = o - i * (r / n);
      (r = n), (n = e), (o = i), (i = t);
    }
    if (r !== rt) throw new Error("invert: does not exist");
    return ut(o, t);
  }
  function dt(e) {
    if (e % st === it) {
      const t = (e + rt) / st;
      return function (e, n) {
        const r = e.pow(n, t);
        if (!e.eql(e.sqr(r), n)) throw new Error("Cannot find square root");
        return r;
      };
    }
    if (e % ct === at) {
      const t = (e - at) / ct;
      return function (e, n) {
        const r = e.mul(n, ot),
          o = e.pow(r, t),
          i = e.mul(n, o),
          s = e.mul(e.mul(i, ot), o),
          a = e.mul(i, e.sub(s, e.ONE));
        if (!e.eql(e.sqr(a), n)) throw new Error("Cannot find square root");
        return a;
      };
    }
    return (function (e) {
      const t = (e - rt) / ot;
      let n, r, o;
      for (n = e - rt, r = 0; n % ot === nt; n /= ot, r++);
      for (o = ot; o < e && lt(o, t, e) !== e - rt; o++);
      if (1 === r) {
        const t = (e + rt) / st;
        return function (e, n) {
          const r = e.pow(n, t);
          if (!e.eql(e.sqr(r), n)) throw new Error("Cannot find square root");
          return r;
        };
      }
      const i = (n + rt) / ot;
      return function (e, s) {
        if (e.pow(s, t) === e.neg(e.ONE))
          throw new Error("Cannot find square root");
        let a = r,
          c = e.pow(e.mul(e.ONE, o), n),
          u = e.pow(s, i),
          l = e.pow(s, n);
        for (; !e.eql(l, e.ONE); ) {
          if (e.eql(l, e.ZERO)) return e.ZERO;
          let t = 1;
          for (let n = e.sqr(l); t < a && !e.eql(n, e.ONE); t++) n = e.sqr(n);
          const n = e.pow(c, rt << BigInt(a - t - 1));
          (c = e.sqr(n)), (u = e.mul(u, n)), (l = e.mul(l, c)), (a = t);
        }
        return u;
      };
    })(e);
  }
  BigInt(9), BigInt(16);
  const pt = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN",
  ];
  function yt(e) {
    return et(
      e,
      pt.reduce((e, t) => ((e[t] = "function"), e), {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger",
      })
    );
  }
  function bt(e, t) {
    const n = void 0 !== t ? t : e.toString(2).length;
    return { nBitLength: n, nByteLength: Math.ceil(n / 8) };
  }
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  const gt = BigInt(0),
    wt = BigInt(1);
  function vt(e) {
    return (
      yt(e.Fp),
      et(
        e,
        { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
        { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
      ),
      Object.freeze({ ...bt(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
    );
  }
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const {
      bytesToNumberBE: mt,
      hexToBytes: _t,
    } = tt,
    xt = {
      Err: class extends Error {
        constructor(e = "") {
          super(e);
        }
      },
      _parseInt(e) {
        const { Err: t } = xt;
        if (e.length < 2 || 2 !== e[0])
          throw new t("Invalid signature integer tag");
        const n = e[1],
          r = e.subarray(2, n + 2);
        if (!n || r.length !== n)
          throw new t("Invalid signature integer: wrong length");
        if (128 & r[0]) throw new t("Invalid signature integer: negative");
        if (0 === r[0] && !(128 & r[1]))
          throw new t("Invalid signature integer: unnecessary leading zero");
        return { d: mt(r), l: e.subarray(n + 2) };
      },
      toSig(e) {
        const { Err: t } = xt,
          n = "string" == typeof e ? _t(e) : e;
        if (!(n instanceof Uint8Array)) throw new Error("ui8a expected");
        let r = n.length;
        if (r < 2 || 48 != n[0]) throw new t("Invalid signature tag");
        if (n[1] !== r - 2) throw new t("Invalid signature: incorrect length");
        const { d: o, l: i } = xt._parseInt(n.subarray(2)),
          { d: s, l: a } = xt._parseInt(i);
        if (a.length)
          throw new t("Invalid signature: left bytes after parsing");
        return { r: o, s: s };
      },
      hexFromSig(e) {
        const t = (e) => (8 & Number.parseInt(e[0], 16) ? "00" + e : e),
          n = (e) => {
            const t = e.toString(16);
            return 1 & t.length ? `0${t}` : t;
          },
          r = t(n(e.s)),
          o = t(n(e.r)),
          i = r.length / 2,
          s = o.length / 2,
          a = n(i),
          c = n(s);
        return `30${n(s + i + 4)}02${c}${o}02${a}${r}`;
      },
    },
    Et = BigInt(0),
    kt = BigInt(1),
    St = BigInt(2),
    At = BigInt(3),
    Ot = BigInt(4);
  function Ct(e) {
    const t = (function (e) {
        const t = vt(e);
        et(
          t,
          { a: "field", b: "field" },
          {
            allowedPrivateKeyLengths: "array",
            wrapPrivateKey: "boolean",
            isTorsionFree: "function",
            clearCofactor: "function",
            allowInfinityPoint: "boolean",
            fromBytes: "function",
            toBytes: "function",
          }
        );
        const { endo: n, Fp: r, a: o } = t;
        if (n) {
          if (!r.eql(o, r.ZERO))
            throw new Error(
              "Endomorphism can only be defined for Koblitz curves that have a=0"
            );
          if (
            "object" != typeof n ||
            "bigint" != typeof n.beta ||
            "function" != typeof n.splitScalar
          )
            throw new Error(
              "Expected endomorphism with beta: bigint and splitScalar: function"
            );
        }
        return Object.freeze({ ...t });
      })(e),
      { Fp: n } = t,
      r =
        t.toBytes ||
        ((e, t, r) => {
          const o = t.toAffine();
          return We(Uint8Array.from([4]), n.toBytes(o.x), n.toBytes(o.y));
        }),
      o =
        t.fromBytes ||
        ((e) => {
          const t = e.subarray(1);
          return {
            x: n.fromBytes(t.subarray(0, n.BYTES)),
            y: n.fromBytes(t.subarray(n.BYTES, 2 * n.BYTES)),
          };
        });
    function i(e) {
      const { a: r, b: o } = t,
        i = n.sqr(e),
        s = n.mul(i, e);
      return n.add(n.add(s, n.mul(e, r)), o);
    }
    if (!n.eql(n.sqr(t.Gy), i(t.Gx)))
      throw new Error("bad generator point: equation left != right");
    function s(e) {
      return "bigint" == typeof e && Et < e && e < t.n;
    }
    function a(e) {
      if (!s(e)) throw new Error("Expected valid bigint: 0 < bigint < curve.n");
    }
    function c(e) {
      const {
        allowedPrivateKeyLengths: n,
        nByteLength: r,
        wrapPrivateKey: o,
        n: i,
      } = t;
      if (n && "bigint" != typeof e) {
        if (
          (e instanceof Uint8Array && (e = Ne(e)),
          "string" != typeof e || !n.includes(e.length))
        )
          throw new Error("Invalid key");
        e = e.padStart(2 * r, "0");
      }
      let s;
      try {
        s = "bigint" == typeof e ? e : Fe(Ge("private key", e, r));
      } catch (t) {
        throw new Error(
          `private key must be ${r} bytes, hex or bigint, not ${typeof e}`
        );
      }
      return o && (s = ut(s, i)), a(s), s;
    }
    const u = new Map();
    function l(e) {
      if (!(e instanceof f)) throw new Error("ProjectivePoint expected");
    }
    class f {
      constructor(e, t, r) {
        if (
          ((this.px = e),
          (this.py = t),
          (this.pz = r),
          null == e || !n.isValid(e))
        )
          throw new Error("x required");
        if (null == t || !n.isValid(t)) throw new Error("y required");
        if (null == r || !n.isValid(r)) throw new Error("z required");
      }
      static fromAffine(e) {
        const { x: t, y: r } = e || {};
        if (!e || !n.isValid(t) || !n.isValid(r))
          throw new Error("invalid affine point");
        if (e instanceof f) throw new Error("projective point not allowed");
        const o = (e) => n.eql(e, n.ZERO);
        return o(t) && o(r) ? f.ZERO : new f(t, r, n.ONE);
      }
      get x() {
        return this.toAffine().x;
      }
      get y() {
        return this.toAffine().y;
      }
      static normalizeZ(e) {
        const t = n.invertBatch(e.map((e) => e.pz));
        return e.map((e, n) => e.toAffine(t[n])).map(f.fromAffine);
      }
      static fromHex(e) {
        const t = f.fromAffine(o(Ge("pointHex", e)));
        return t.assertValidity(), t;
      }
      static fromPrivateKey(e) {
        return f.BASE.multiply(c(e));
      }
      _setWindowSize(e) {
        (this._WINDOW_SIZE = e), u.delete(this);
      }
      assertValidity() {
        if (this.is0()) {
          if (t.allowInfinityPoint) return;
          throw new Error("bad point: ZERO");
        }
        const { x: e, y: r } = this.toAffine();
        if (!n.isValid(e) || !n.isValid(r))
          throw new Error("bad point: x or y not FE");
        const o = n.sqr(r),
          s = i(e);
        if (!n.eql(o, s)) throw new Error("bad point: equation left != right");
        if (!this.isTorsionFree())
          throw new Error("bad point: not in prime-order subgroup");
      }
      hasEvenY() {
        const { y: e } = this.toAffine();
        if (n.isOdd) return !n.isOdd(e);
        throw new Error("Field doesn't support isOdd");
      }
      equals(e) {
        l(e);
        const { px: t, py: r, pz: o } = this,
          { px: i, py: s, pz: a } = e,
          c = n.eql(n.mul(t, a), n.mul(i, o)),
          u = n.eql(n.mul(r, a), n.mul(s, o));
        return c && u;
      }
      negate() {
        return new f(this.px, n.neg(this.py), this.pz);
      }
      double() {
        const { a: e, b: r } = t,
          o = n.mul(r, At),
          { px: i, py: s, pz: a } = this;
        let c = n.ZERO,
          u = n.ZERO,
          l = n.ZERO,
          h = n.mul(i, i),
          d = n.mul(s, s),
          p = n.mul(a, a),
          y = n.mul(i, s);
        return (
          (y = n.add(y, y)),
          (l = n.mul(i, a)),
          (l = n.add(l, l)),
          (c = n.mul(e, l)),
          (u = n.mul(o, p)),
          (u = n.add(c, u)),
          (c = n.sub(d, u)),
          (u = n.add(d, u)),
          (u = n.mul(c, u)),
          (c = n.mul(y, c)),
          (l = n.mul(o, l)),
          (p = n.mul(e, p)),
          (y = n.sub(h, p)),
          (y = n.mul(e, y)),
          (y = n.add(y, l)),
          (l = n.add(h, h)),
          (h = n.add(l, h)),
          (h = n.add(h, p)),
          (h = n.mul(h, y)),
          (u = n.add(u, h)),
          (p = n.mul(s, a)),
          (p = n.add(p, p)),
          (h = n.mul(p, y)),
          (c = n.sub(c, h)),
          (l = n.mul(p, d)),
          (l = n.add(l, l)),
          (l = n.add(l, l)),
          new f(c, u, l)
        );
      }
      add(e) {
        l(e);
        const { px: r, py: o, pz: i } = this,
          { px: s, py: a, pz: c } = e;
        let u = n.ZERO,
          h = n.ZERO,
          d = n.ZERO;
        const p = t.a,
          y = n.mul(t.b, At);
        let b = n.mul(r, s),
          g = n.mul(o, a),
          w = n.mul(i, c),
          v = n.add(r, o),
          m = n.add(s, a);
        (v = n.mul(v, m)),
          (m = n.add(b, g)),
          (v = n.sub(v, m)),
          (m = n.add(r, i));
        let _ = n.add(s, c);
        return (
          (m = n.mul(m, _)),
          (_ = n.add(b, w)),
          (m = n.sub(m, _)),
          (_ = n.add(o, i)),
          (u = n.add(a, c)),
          (_ = n.mul(_, u)),
          (u = n.add(g, w)),
          (_ = n.sub(_, u)),
          (d = n.mul(p, m)),
          (u = n.mul(y, w)),
          (d = n.add(u, d)),
          (u = n.sub(g, d)),
          (d = n.add(g, d)),
          (h = n.mul(u, d)),
          (g = n.add(b, b)),
          (g = n.add(g, b)),
          (w = n.mul(p, w)),
          (m = n.mul(y, m)),
          (g = n.add(g, w)),
          (w = n.sub(b, w)),
          (w = n.mul(p, w)),
          (m = n.add(m, w)),
          (b = n.mul(g, m)),
          (h = n.add(h, b)),
          (b = n.mul(_, m)),
          (u = n.mul(v, u)),
          (u = n.sub(u, b)),
          (b = n.mul(v, g)),
          (d = n.mul(_, d)),
          (d = n.add(d, b)),
          new f(u, h, d)
        );
      }
      subtract(e) {
        return this.add(e.negate());
      }
      is0() {
        return this.equals(f.ZERO);
      }
      wNAF(e) {
        return d.wNAFCached(this, u, e, (e) => {
          const t = n.invertBatch(e.map((e) => e.pz));
          return e.map((e, n) => e.toAffine(t[n])).map(f.fromAffine);
        });
      }
      multiplyUnsafe(e) {
        const r = f.ZERO;
        if (e === Et) return r;
        if ((a(e), e === kt)) return this;
        const { endo: o } = t;
        if (!o) return d.unsafeLadder(this, e);
        let { k1neg: i, k1: s, k2neg: c, k2: u } = o.splitScalar(e),
          l = r,
          h = r,
          p = this;
        for (; s > Et || u > Et; )
          s & kt && (l = l.add(p)),
            u & kt && (h = h.add(p)),
            (p = p.double()),
            (s >>= kt),
            (u >>= kt);
        return (
          i && (l = l.negate()),
          c && (h = h.negate()),
          (h = new f(n.mul(h.px, o.beta), h.py, h.pz)),
          l.add(h)
        );
      }
      multiply(e) {
        a(e);
        let r,
          o,
          i = e;
        const { endo: s } = t;
        if (s) {
          const { k1neg: e, k1: t, k2neg: a, k2: c } = s.splitScalar(i);
          let { p: u, f: l } = this.wNAF(t),
            { p: h, f: p } = this.wNAF(c);
          (u = d.constTimeNegate(e, u)),
            (h = d.constTimeNegate(a, h)),
            (h = new f(n.mul(h.px, s.beta), h.py, h.pz)),
            (r = u.add(h)),
            (o = l.add(p));
        } else {
          const { p: e, f: t } = this.wNAF(i);
          (r = e), (o = t);
        }
        return f.normalizeZ([r, o])[0];
      }
      multiplyAndAddUnsafe(e, t, n) {
        const r = f.BASE,
          o = (e, t) =>
            t !== Et && t !== kt && e.equals(r)
              ? e.multiply(t)
              : e.multiplyUnsafe(t),
          i = o(this, t).add(o(e, n));
        return i.is0() ? void 0 : i;
      }
      toAffine(e) {
        const { px: t, py: r, pz: o } = this,
          i = this.is0();
        null == e && (e = i ? n.ONE : n.inv(o));
        const s = n.mul(t, e),
          a = n.mul(r, e),
          c = n.mul(o, e);
        if (i) return { x: n.ZERO, y: n.ZERO };
        if (!n.eql(c, n.ONE)) throw new Error("invZ was invalid");
        return { x: s, y: a };
      }
      isTorsionFree() {
        const { h: e, isTorsionFree: n } = t;
        if (e === kt) return !0;
        if (n) return n(f, this);
        throw new Error(
          "isTorsionFree() has not been declared for the elliptic curve"
        );
      }
      clearCofactor() {
        const { h: e, clearCofactor: n } = t;
        return e === kt ? this : n ? n(f, this) : this.multiplyUnsafe(t.h);
      }
      toRawBytes(e = !0) {
        return this.assertValidity(), r(f, this, e);
      }
      toHex(e = !0) {
        return Ne(this.toRawBytes(e));
      }
    }
    (f.BASE = new f(t.Gx, t.Gy, n.ONE)),
      (f.ZERO = new f(n.ZERO, n.ONE, n.ZERO));
    const h = t.nBitLength,
      d = (function (e, t) {
        const n = (e, t) => {
            const n = t.negate();
            return e ? n : t;
          },
          r = (e) => ({
            windows: Math.ceil(t / e) + 1,
            windowSize: 2 ** (e - 1),
          });
        return {
          constTimeNegate: n,
          unsafeLadder(t, n) {
            let r = e.ZERO,
              o = t;
            for (; n > gt; )
              n & wt && (r = r.add(o)), (o = o.double()), (n >>= wt);
            return r;
          },
          precomputeWindow(e, t) {
            const { windows: n, windowSize: o } = r(t),
              i = [];
            let s = e,
              a = s;
            for (let e = 0; e < n; e++) {
              (a = s), i.push(a);
              for (let e = 1; e < o; e++) (a = a.add(s)), i.push(a);
              s = a.double();
            }
            return i;
          },
          wNAF(t, o, i) {
            const { windows: s, windowSize: a } = r(t);
            let c = e.ZERO,
              u = e.BASE;
            const l = BigInt(2 ** t - 1),
              f = 2 ** t,
              h = BigInt(t);
            for (let e = 0; e < s; e++) {
              const t = e * a;
              let r = Number(i & l);
              (i >>= h), r > a && ((r -= f), (i += wt));
              const s = t,
                d = t + Math.abs(r) - 1,
                p = e % 2 != 0,
                y = r < 0;
              0 === r ? (u = u.add(n(p, o[s]))) : (c = c.add(n(y, o[d])));
            }
            return { p: c, f: u };
          },
          wNAFCached(e, t, n, r) {
            const o = e._WINDOW_SIZE || 1;
            let i = t.get(e);
            return (
              i ||
                ((i = this.precomputeWindow(e, o)), 1 !== o && t.set(e, r(i))),
              this.wNAF(o, i, n)
            );
          },
        };
      })(f, t.endo ? Math.ceil(h / 2) : h);
    return {
      CURVE: t,
      ProjectivePoint: f,
      normPrivateKeyToScalar: c,
      weierstrassEquation: i,
      isWithinCurveOrder: s,
    };
  }
  function Pt(e) {
    const t = (function (e) {
        const t = vt(e);
        return (
          et(
            t,
            { hash: "hash", hmac: "function", randomBytes: "function" },
            { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }
          ),
          Object.freeze({ lowS: !0, ...t })
        );
      })(e),
      { Fp: n, n: r } = t,
      o = n.BYTES + 1,
      i = 2 * n.BYTES + 1;
    function s(e) {
      return ut(e, r);
    }
    function a(e) {
      return ht(e, r);
    }
    const {
        ProjectivePoint: c,
        normPrivateKeyToScalar: u,
        weierstrassEquation: l,
        isWithinCurveOrder: f,
      } = Ct({
        ...t,
        toBytes(e, t, r) {
          const o = t.toAffine(),
            i = n.toBytes(o.x),
            s = We;
          return r
            ? s(Uint8Array.from([t.hasEvenY() ? 2 : 3]), i)
            : s(Uint8Array.from([4]), i, n.toBytes(o.y));
        },
        fromBytes(e) {
          const t = e.length,
            r = e[0],
            s = e.subarray(1);
          if (t !== o || (2 !== r && 3 !== r)) {
            if (t === i && 4 === r) {
              return {
                x: n.fromBytes(s.subarray(0, n.BYTES)),
                y: n.fromBytes(s.subarray(n.BYTES, 2 * n.BYTES)),
              };
            }
            throw new Error(
              `Point of length ${t} was invalid. Expected ${o} compressed bytes or ${i} uncompressed bytes`
            );
          }
          {
            const e = Fe(s);
            if (!(Et < (a = e) && a < n.ORDER))
              throw new Error("Point is not on curve");
            const t = l(e);
            let o = n.sqrt(t);
            return (
              (1 == (1 & r)) !== ((o & kt) === kt) && (o = n.neg(o)),
              { x: e, y: o }
            );
          }
          var a;
        },
      }),
      h = (e) => Ne(ze(e, t.nByteLength));
    function d(e) {
      return e > r >> kt;
    }
    const p = (e, t, n) => Fe(e.slice(t, n));
    class y {
      constructor(e, t, n) {
        (this.r = e), (this.s = t), (this.recovery = n), this.assertValidity();
      }
      static fromCompact(e) {
        const n = t.nByteLength;
        return (
          (e = Ge("compactSignature", e, 2 * n)),
          new y(p(e, 0, n), p(e, n, 2 * n))
        );
      }
      static fromDER(e) {
        const { r: t, s: n } = xt.toSig(Ge("DER", e));
        return new y(t, n);
      }
      assertValidity() {
        if (!f(this.r)) throw new Error("r must be 0 < r < CURVE.n");
        if (!f(this.s)) throw new Error("s must be 0 < s < CURVE.n");
      }
      addRecoveryBit(e) {
        return new y(this.r, this.s, e);
      }
      recoverPublicKey(e) {
        const { r: r, s: o, recovery: i } = this,
          u = v(Ge("msgHash", e));
        if (null == i || ![0, 1, 2, 3].includes(i))
          throw new Error("recovery id invalid");
        const l = 2 === i || 3 === i ? r + t.n : r;
        if (l >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
        const f = 0 == (1 & i) ? "02" : "03",
          d = c.fromHex(f + h(l)),
          p = a(l),
          y = s(-u * p),
          b = s(o * p),
          g = c.BASE.multiplyAndAddUnsafe(d, y, b);
        if (!g) throw new Error("point at infinify");
        return g.assertValidity(), g;
      }
      hasHighS() {
        return d(this.s);
      }
      normalizeS() {
        return this.hasHighS()
          ? new y(this.r, s(-this.s), this.recovery)
          : this;
      }
      toDERRawBytes() {
        return Me(this.toDERHex());
      }
      toDERHex() {
        return xt.hexFromSig({ r: this.r, s: this.s });
      }
      toCompactRawBytes() {
        return Me(this.toCompactHex());
      }
      toCompactHex() {
        return h(this.r) + h(this.s);
      }
    }
    const b = {
      isValidPrivateKey(e) {
        try {
          return u(e), !0;
        } catch (e) {
          return !1;
        }
      },
      normPrivateKeyToScalar: u,
      randomPrivateKey: () => {
        const e = (function (e, t, n = !1) {
          const r = (e = Ge("privateHash", e)).length,
            o = bt(t).nByteLength + 8;
          if (o < 24 || r < o || r > 1024)
            throw new Error(
              `hashToPrivateScalar: expected ${o}-1024 bytes of input, got ${r}`
            );
          return ut(n ? De(e) : Fe(e), t - rt) + rt;
        })(t.randomBytes(n.BYTES + 8), r);
        return ze(e, t.nByteLength);
      },
      precompute: (e = 8, t = c.BASE) => (
        t._setWindowSize(e), t.multiply(BigInt(3)), t
      ),
    };
    function g(e) {
      const t = e instanceof Uint8Array,
        n = "string" == typeof e,
        r = (t || n) && e.length;
      return t
        ? r === o || r === i
        : n
        ? r === 2 * o || r === 2 * i
        : e instanceof c;
    }
    const w =
        t.bits2int ||
        function (e) {
          const n = Fe(e),
            r = 8 * e.length - t.nBitLength;
          return r > 0 ? n >> BigInt(r) : n;
        },
      v =
        t.bits2int_modN ||
        function (e) {
          return s(w(e));
        },
      m = Ye(t.nBitLength);
    function _(e) {
      if ("bigint" != typeof e) throw new Error("bigint expected");
      if (!(Et <= e && e < m))
        throw new Error(`bigint expected < 2^${t.nBitLength}`);
      return ze(e, t.nByteLength);
    }
    function x(e, r, o = E) {
      if (["recovered", "canonical"].some((e) => e in o))
        throw new Error("sign() legacy options not supported");
      const { hash: i, randomBytes: l } = t;
      let { lowS: h, prehash: p, extraEntropy: b } = o;
      null == h && (h = !0),
        (e = Ge("msgHash", e)),
        p && (e = Ge("prehashed msgHash", i(e)));
      const g = v(e),
        m = u(r),
        x = [_(m), _(g)];
      if (null != b) {
        const e = !0 === b ? l(n.BYTES) : b;
        x.push(Ge("extraEntropy", e, n.BYTES));
      }
      const k = We(...x),
        S = g;
      return {
        seed: k,
        k2sig: function (e) {
          const t = w(e);
          if (!f(t)) return;
          const n = a(t),
            r = c.BASE.multiply(t).toAffine(),
            o = s(r.x);
          if (o === Et) return;
          const i = s(n * s(S + o * m));
          if (i === Et) return;
          let u = (r.x === o ? 0 : 2) | Number(r.y & kt),
            l = i;
          return (
            h &&
              d(i) &&
              ((l = (function (e) {
                return d(e) ? s(-e) : e;
              })(i)),
              (u ^= 1)),
            new y(o, l, u)
          );
        },
      };
    }
    const E = { lowS: t.lowS, prehash: !1 },
      k = { lowS: t.lowS, prehash: !1 };
    return (
      c.BASE._setWindowSize(8),
      {
        CURVE: t,
        getPublicKey: function (e, t = !0) {
          return c.fromPrivateKey(e).toRawBytes(t);
        },
        getSharedSecret: function (e, t, n = !0) {
          if (g(e)) throw new Error("first arg must be private key");
          if (!g(t)) throw new Error("second arg must be public key");
          return c.fromHex(t).multiply(u(e)).toRawBytes(n);
        },
        sign: function (e, n, r = E) {
          const { seed: o, k2sig: i } = x(e, n, r);
          return Qe(t.hash.outputLen, t.nByteLength, t.hmac)(o, i);
        },
        verify: function (e, n, r, o = k) {
          const i = e;
          if (((n = Ge("msgHash", n)), (r = Ge("publicKey", r)), "strict" in o))
            throw new Error("options.strict was renamed to lowS");
          const { lowS: u, prehash: l } = o;
          let f, h;
          try {
            if ("string" == typeof i || i instanceof Uint8Array)
              try {
                f = y.fromDER(i);
              } catch (e) {
                if (!(e instanceof xt.Err)) throw e;
                f = y.fromCompact(i);
              }
            else {
              if (
                "object" != typeof i ||
                "bigint" != typeof i.r ||
                "bigint" != typeof i.s
              )
                throw new Error("PARSE");
              {
                const { r: e, s: t } = i;
                f = new y(e, t);
              }
            }
            h = c.fromHex(r);
          } catch (e) {
            if ("PARSE" === e.message)
              throw new Error(
                "signature must be Signature instance, Uint8Array or hex string"
              );
            return !1;
          }
          if (u && f.hasHighS()) return !1;
          l && (n = t.hash(n));
          const { r: d, s: p } = f,
            b = v(n),
            g = a(p),
            w = s(b * g),
            m = s(d * g),
            _ = c.BASE.multiplyAndAddUnsafe(h, w, m)?.toAffine();
          return !!_ && s(_.x) === d;
        },
        ProjectivePoint: c,
        Signature: y,
        utils: b,
      }
    );
  }
  class It extends xe {
    constructor(e, t) {
      super(), (this.finished = !1), (this.destroyed = !1), he.hash(e);
      const n = me(t);
      if (((this.iHash = e.create()), "function" != typeof this.iHash.update))
        throw new TypeError(
          "Expected instance of class which extends utils.Hash"
        );
      (this.blockLen = this.iHash.blockLen),
        (this.outputLen = this.iHash.outputLen);
      const r = this.blockLen,
        o = new Uint8Array(r);
      o.set(n.length > r ? e.create().update(n).digest() : n);
      for (let e = 0; e < o.length; e++) o[e] ^= 54;
      this.iHash.update(o), (this.oHash = e.create());
      for (let e = 0; e < o.length; e++) o[e] ^= 106;
      this.oHash.update(o), o.fill(0);
    }
    update(e) {
      return he.exists(this), this.iHash.update(e), this;
    }
    digestInto(e) {
      he.exists(this),
        he.bytes(e, this.outputLen),
        (this.finished = !0),
        this.iHash.digestInto(e),
        this.oHash.update(e),
        this.oHash.digestInto(e),
        this.destroy();
    }
    digest() {
      const e = new Uint8Array(this.oHash.outputLen);
      return this.digestInto(e), e;
    }
    _cloneInto(e) {
      e || (e = Object.create(Object.getPrototypeOf(this), {}));
      const {
        oHash: t,
        iHash: n,
        finished: r,
        destroyed: o,
        blockLen: i,
        outputLen: s,
      } = this;
      return (
        (e.finished = r),
        (e.destroyed = o),
        (e.blockLen = i),
        (e.outputLen = s),
        (e.oHash = t._cloneInto(e.oHash)),
        (e.iHash = n._cloneInto(e.iHash)),
        e
      );
    }
    destroy() {
      (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
    }
  }
  const Tt = (e, t, n) => new It(e, t).update(n).digest();
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  function Lt(e) {
    return { hash: e, hmac: (t, ...n) => Tt(e, t, _e(...n)), randomBytes: ke };
  }
  Tt.create = (e, t) => new It(e, t);
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  const Bt = BigInt(
      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
    ),
    Rt = BigInt(
      "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
    ),
    $t = BigInt(1),
    jt = BigInt(2),
    Ut = (e, t) => (e + t / jt) / t;
  function Nt(e) {
    const t = Bt,
      n = BigInt(3),
      r = BigInt(6),
      o = BigInt(11),
      i = BigInt(22),
      s = BigInt(23),
      a = BigInt(44),
      c = BigInt(88),
      u = (e * e * e) % t,
      l = (u * u * e) % t,
      f = (ft(l, n, t) * l) % t,
      h = (ft(f, n, t) * l) % t,
      d = (ft(h, jt, t) * u) % t,
      p = (ft(d, o, t) * d) % t,
      y = (ft(p, i, t) * p) % t,
      b = (ft(y, a, t) * y) % t,
      g = (ft(b, c, t) * b) % t,
      w = (ft(g, a, t) * y) % t,
      v = (ft(w, n, t) * l) % t,
      m = (ft(v, s, t) * p) % t,
      _ = (ft(m, r, t) * u) % t,
      x = ft(_, jt, t);
    if (!Ht.eql(Ht.sqr(x), e)) throw new Error("Cannot find square root");
    return x;
  }
  const Ht = (function (e, t, n = !1, r = {}) {
      if (e <= nt) throw new Error(`Expected Fp ORDER > 0, got ${e}`);
      const { nBitLength: o, nByteLength: i } = bt(e, t);
      if (i > 2048)
        throw new Error("Field lengths over 2048 bytes are not supported");
      const s = dt(e),
        a = Object.freeze({
          ORDER: e,
          BITS: o,
          BYTES: i,
          MASK: Ye(o),
          ZERO: nt,
          ONE: rt,
          create: (t) => ut(t, e),
          isValid: (t) => {
            if ("bigint" != typeof t)
              throw new Error(
                "Invalid field element: expected bigint, got " + typeof t
              );
            return nt <= t && t < e;
          },
          is0: (e) => e === nt,
          isOdd: (e) => (e & rt) === rt,
          neg: (t) => ut(-t, e),
          eql: (e, t) => e === t,
          sqr: (t) => ut(t * t, e),
          add: (t, n) => ut(t + n, e),
          sub: (t, n) => ut(t - n, e),
          mul: (t, n) => ut(t * n, e),
          pow: (e, t) =>
            (function (e, t, n) {
              if (n < nt) throw new Error("Expected power > 0");
              if (n === nt) return e.ONE;
              if (n === rt) return t;
              let r = e.ONE,
                o = t;
              for (; n > nt; )
                n & rt && (r = e.mul(r, o)), (o = e.sqr(o)), (n >>= rt);
              return r;
            })(a, e, t),
          div: (t, n) => ut(t * ht(n, e), e),
          sqrN: (e) => e * e,
          addN: (e, t) => e + t,
          subN: (e, t) => e - t,
          mulN: (e, t) => e * t,
          inv: (t) => ht(t, e),
          sqrt: r.sqrt || ((e) => s(a, e)),
          invertBatch: (e) =>
            (function (e, t) {
              const n = new Array(t.length),
                r = t.reduce(
                  (t, r, o) => (e.is0(r) ? t : ((n[o] = t), e.mul(t, r))),
                  e.ONE
                ),
                o = e.inv(r);
              return (
                t.reduceRight(
                  (t, r, o) =>
                    e.is0(r) ? t : ((n[o] = e.mul(t, n[o])), e.mul(t, r)),
                  o
                ),
                n
              );
            })(a, e),
          cmov: (e, t, n) => (n ? t : e),
          toBytes: (e) => (n ? Ke(e, i) : ze(e, i)),
          fromBytes: (e) => {
            if (e.length !== i)
              throw new Error(`Fp.fromBytes: expected ${i}, got ${e.length}`);
            return n ? De(e) : Fe(e);
          },
        });
      return Object.freeze(a);
    })(Bt, void 0, void 0, { sqrt: Nt }),
    qt = (function (e, t) {
      const n = (t) => Pt({ ...e, ...Lt(t) });
      return Object.freeze({ ...n(t), create: n });
    })(
      {
        a: BigInt(0),
        b: BigInt(7),
        Fp: Ht,
        n: Rt,
        Gx: BigInt(
          "55066263022277343669578718895168534326250603453777594175500187360389116729240"
        ),
        Gy: BigInt(
          "32670510020758816978083085130507043184471273380659243275938904335757337482424"
        ),
        h: BigInt(1),
        lowS: !0,
        endo: {
          beta: BigInt(
            "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
          ),
          splitScalar: (e) => {
            const t = Rt,
              n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
              r = -$t * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
              o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
              i = n,
              s = BigInt("0x100000000000000000000000000000000"),
              a = Ut(i * e, t),
              c = Ut(-r * e, t);
            let u = ut(e - a * n - c * o, t),
              l = ut(-a * r - c * i, t);
            const f = u > s,
              h = l > s;
            if ((f && (u = t - u), h && (l = t - l), u > s || l > s))
              throw new Error("splitScalar: Endomorphism failed, k=" + e);
            return { k1neg: f, k1: u, k2neg: h, k2: l };
          },
        },
      },
      Le
    ),
    Mt = BigInt(0),
    Ft = (e) => "bigint" == typeof e && Mt < e && e < Bt,
    Dt = (e) => "bigint" == typeof e && Mt < e && e < Rt,
    zt = {};
  function Kt(e, ...t) {
    let n = zt[e];
    if (void 0 === n) {
      const t = Le(Uint8Array.from(e, (e) => e.charCodeAt(0)));
      (n = We(t, t)), (zt[e] = n);
    }
    return Le(We(n, ...t));
  }
  const Gt = (e) => e.toRawBytes(!0).slice(1),
    Wt = (e) => ze(e, 32),
    Vt = (e) => ut(e, Bt),
    Yt = (e) => ut(e, Rt),
    Zt = qt.ProjectivePoint,
    Jt = (e, t, n) => Zt.BASE.multiplyAndAddUnsafe(e, t, n);
  function Qt(e) {
    let t = qt.utils.normPrivateKeyToScalar(e),
      n = Zt.fromPrivateKey(t);
    return { scalar: n.hasEvenY() ? t : Yt(-t), bytes: Gt(n) };
  }
  function Xt(e) {
    if (!Ft(e)) throw new Error("bad x: need 0 < x < p");
    const t = Vt(e * e);
    let n = Nt(Vt(t * e + BigInt(7)));
    n % jt !== Mt && (n = Vt(-n));
    const r = new Zt(e, n, $t);
    return r.assertValidity(), r;
  }
  function en(...e) {
    return Yt(Fe(Kt("BIP0340/challenge", ...e)));
  }
  function tn(e, t, n) {
    const r = Ge("signature", e, 64),
      o = Ge("message", t),
      i = Ge("publicKey", n, 32);
    try {
      const e = Xt(Fe(i)),
        t = Fe(r.subarray(0, 32));
      if (!Ft(t)) return !1;
      const n = Fe(r.subarray(32, 64));
      if (!Dt(n)) return !1;
      const s = en(Wt(t), Gt(e), o),
        a = Jt(e, n, Yt(-s));
      return !(!a || !a.hasEvenY() || a.toAffine().x !== t);
    } catch (e) {
      return !1;
    }
  }
  const nn = {
      getPublicKey: function (e) {
        return Qt(e).bytes;
      },
      sign: function (e, t, n = ke(32)) {
        const r = Ge("message", e),
          { bytes: o, scalar: i } = Qt(t),
          s = Ge("auxRand", n, 32),
          a = Wt(i ^ Fe(Kt("BIP0340/aux", s))),
          c = Kt("BIP0340/nonce", a, o, r),
          u = Yt(Fe(c));
        if (u === Mt) throw new Error("sign failed: k is zero");
        const { bytes: l, scalar: f } = Qt(u),
          h = en(l, o, r),
          d = new Uint8Array(64);
        if ((d.set(l, 0), d.set(Wt(Yt(f + h * i)), 32), !tn(d, r, o)))
          throw new Error("sign: Invalid signature produced");
        return d;
      },
      verify: tn,
      utils: {
        randomPrivateKey: qt.utils.randomPrivateKey,
        lift_x: Xt,
        pointToBytes: Gt,
        numberToBytesBE: ze,
        bytesToNumberBE: Fe,
        taggedHash: Kt,
        mod: ut,
      },
    },
    rn = (function (e, t) {
      const n = t.map((e) => Array.from(e).reverse());
      return (t, r) => {
        const [o, i, s, a] = n.map((n) =>
          n.reduce((n, r) => e.add(e.mul(n, t), r))
        );
        return (t = e.div(o, i)), (r = e.mul(r, e.div(s, a))), { x: t, y: r };
      };
    })(
      Ht,
      [
        [
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
          "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
          "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
          "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c",
        ],
        [
          "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
          "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
        [
          "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
          "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
          "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
          "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84",
        ],
        [
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
          "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
          "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
      ].map((e) => e.map((e) => BigInt(e)))
    ),
    on = (function (e, t) {
      if ((yt(e), !e.isValid(t.A) || !e.isValid(t.B) || !e.isValid(t.Z)))
        throw new Error("mapToCurveSimpleSWU: invalid opts");
      const n = (function (e, t) {
        const n = e.ORDER;
        let r = Et;
        for (let e = n - kt; e % St === Et; e /= St) r += kt;
        const o = r,
          i = (n - kt) / St ** o,
          s = (i - kt) / St,
          a = St ** o - kt,
          c = St ** (o - kt),
          u = e.pow(t, i),
          l = e.pow(t, (i + kt) / St);
        let f = (t, n) => {
          let r = u,
            i = e.pow(n, a),
            f = e.sqr(i);
          f = e.mul(f, n);
          let h = e.mul(t, f);
          (h = e.pow(h, s)),
            (h = e.mul(h, i)),
            (i = e.mul(h, n)),
            (f = e.mul(h, t));
          let d = e.mul(f, i);
          h = e.pow(d, c);
          let p = e.eql(h, e.ONE);
          (i = e.mul(f, l)),
            (h = e.mul(d, r)),
            (f = e.cmov(i, f, p)),
            (d = e.cmov(h, d, p));
          for (let t = o; t > kt; t--) {
            let n = St ** (t - St),
              o = e.pow(d, n);
            const s = e.eql(o, e.ONE);
            (i = e.mul(f, r)),
              (r = e.mul(r, r)),
              (o = e.mul(d, r)),
              (f = e.cmov(i, f, s)),
              (d = e.cmov(o, d, s));
          }
          return { isValid: p, value: f };
        };
        if (e.ORDER % Ot === At) {
          const n = (e.ORDER - At) / Ot,
            r = e.sqrt(e.neg(t));
          f = (t, o) => {
            let i = e.sqr(o);
            const s = e.mul(t, o);
            i = e.mul(i, s);
            let a = e.pow(i, n);
            a = e.mul(a, s);
            const c = e.mul(a, r),
              u = e.mul(e.sqr(a), o),
              l = e.eql(u, t);
            return { isValid: l, value: e.cmov(c, a, l) };
          };
        }
        return f;
      })(e, t.Z);
      if (!e.isOdd) throw new Error("Fp.isOdd is not implemented!");
      return (r) => {
        let o, i, s, a, c, u, l, f;
        (o = e.sqr(r)),
          (o = e.mul(o, t.Z)),
          (i = e.sqr(o)),
          (i = e.add(i, o)),
          (s = e.add(i, e.ONE)),
          (s = e.mul(s, t.B)),
          (a = e.cmov(t.Z, e.neg(i), !e.eql(i, e.ZERO))),
          (a = e.mul(a, t.A)),
          (i = e.sqr(s)),
          (u = e.sqr(a)),
          (c = e.mul(u, t.A)),
          (i = e.add(i, c)),
          (i = e.mul(i, s)),
          (u = e.mul(u, a)),
          (c = e.mul(u, t.B)),
          (i = e.add(i, c)),
          (l = e.mul(o, s));
        const { isValid: h, value: d } = n(i, u);
        (f = e.mul(o, r)),
          (f = e.mul(f, d)),
          (l = e.cmov(l, s, h)),
          (f = e.cmov(f, d, h));
        const p = e.isOdd(r) === e.isOdd(f);
        return (f = e.cmov(e.neg(f), f, p)), (l = e.div(l, a)), { x: l, y: f };
      };
    })(Ht, {
      A: BigInt(
        "0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"
      ),
      B: BigInt("1771"),
      Z: Ht.create(BigInt("-11")),
    });
  /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  function sn(e) {
    if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
  }
  function an(...e) {
    const t = (e, t) => (n) => e(t(n));
    return {
      encode: Array.from(e)
        .reverse()
        .reduce((e, n) => (e ? t(e, n.encode) : n.encode), void 0),
      decode: e.reduce((e, n) => (e ? t(e, n.decode) : n.decode), void 0),
    };
  }
  function cn(e) {
    return {
      encode: (t) => {
        if (!Array.isArray(t) || (t.length && "number" != typeof t[0]))
          throw new Error(
            "alphabet.encode input should be an array of numbers"
          );
        return t.map((t) => {
          if ((sn(t), t < 0 || t >= e.length))
            throw new Error(
              `Digit index outside alphabet: ${t} (alphabet: ${e.length})`
            );
          return e[t];
        });
      },
      decode: (t) => {
        if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
          throw new Error("alphabet.decode input should be array of strings");
        return t.map((t) => {
          if ("string" != typeof t)
            throw new Error(`alphabet.decode: not string element=${t}`);
          const n = e.indexOf(t);
          if (-1 === n)
            throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
          return n;
        });
      },
    };
  }
  function un(e = "") {
    if ("string" != typeof e)
      throw new Error("join separator should be string");
    return {
      encode: (t) => {
        if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
          throw new Error("join.encode input should be array of strings");
        for (let e of t)
          if ("string" != typeof e)
            throw new Error(`join.encode: non-string input=${e}`);
        return t.join(e);
      },
      decode: (t) => {
        if ("string" != typeof t)
          throw new Error("join.decode input should be string");
        return t.split(e);
      },
    };
  }
  function ln(e, t = "=") {
    if ((sn(e), "string" != typeof t))
      throw new Error("padding chr should be string");
    return {
      encode(n) {
        if (!Array.isArray(n) || (n.length && "string" != typeof n[0]))
          throw new Error("padding.encode input should be array of strings");
        for (let e of n)
          if ("string" != typeof e)
            throw new Error(`padding.encode: non-string input=${e}`);
        for (; (n.length * e) % 8; ) n.push(t);
        return n;
      },
      decode(n) {
        if (!Array.isArray(n) || (n.length && "string" != typeof n[0]))
          throw new Error("padding.encode input should be array of strings");
        for (let e of n)
          if ("string" != typeof e)
            throw new Error(`padding.decode: non-string input=${e}`);
        let r = n.length;
        if ((r * e) % 8)
          throw new Error(
            "Invalid padding: string should have whole number of bytes"
          );
        for (; r > 0 && n[r - 1] === t; r--)
          if (!(((r - 1) * e) % 8))
            throw new Error("Invalid padding: string has too much padding");
        return n.slice(0, r);
      },
    };
  }
  function fn(e) {
    if ("function" != typeof e)
      throw new Error("normalize fn should be function");
    return { encode: (e) => e, decode: (t) => e(t) };
  }
  function hn(e, t, n) {
    if (t < 2)
      throw new Error(
        `convertRadix: wrong from=${t}, base cannot be less than 2`
      );
    if (n < 2)
      throw new Error(
        `convertRadix: wrong to=${n}, base cannot be less than 2`
      );
    if (!Array.isArray(e))
      throw new Error("convertRadix: data should be array");
    if (!e.length) return [];
    let r = 0;
    const o = [],
      i = Array.from(e);
    for (
      i.forEach((e) => {
        if ((sn(e), e < 0 || e >= t)) throw new Error(`Wrong integer: ${e}`);
      });
      ;

    ) {
      let e = 0,
        s = !0;
      for (let o = r; o < i.length; o++) {
        const a = i[o],
          c = t * e + a;
        if (!Number.isSafeInteger(c) || (t * e) / t !== e || c - a != t * e)
          throw new Error("convertRadix: carry overflow");
        if (
          ((e = c % n),
          (i[o] = Math.floor(c / n)),
          !Number.isSafeInteger(i[o]) || i[o] * n + e !== c)
        )
          throw new Error("convertRadix: carry overflow");
        s && (i[o] ? (s = !1) : (r = o));
      }
      if ((o.push(e), s)) break;
    }
    for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) o.push(0);
    return o.reverse();
  }
  !(function (e, t, n) {
    if ("function" != typeof t) throw new Error("mapToCurve() must be defined");
  })(
    qt.ProjectivePoint,
    (e) => {
      const { x: t, y: n } = on(Ht.create(e[0]));
      return rn(t, n);
    },
    {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Ht.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: Le,
    }
  );
  const dn = (e, t) => (t ? dn(t, e % t) : e),
    pn = (e, t) => e + (t - dn(e, t));
  function yn(e, t, n, r) {
    if (!Array.isArray(e))
      throw new Error("convertRadix2: data should be array");
    if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
    if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
    if (pn(t, n) > 32)
      throw new Error(
        `convertRadix2: carry overflow from=${t} to=${n} carryBits=${pn(t, n)}`
      );
    let o = 0,
      i = 0;
    const s = 2 ** n - 1,
      a = [];
    for (const r of e) {
      if ((sn(r), r >= 2 ** t))
        throw new Error(`convertRadix2: invalid data word=${r} from=${t}`);
      if (((o = (o << t) | r), i + t > 32))
        throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);
      for (i += t; i >= n; i -= n) a.push(((o >> (i - n)) & s) >>> 0);
      o &= 2 ** i - 1;
    }
    if (((o = (o << (n - i)) & s), !r && i >= t))
      throw new Error("Excess padding");
    if (!r && o) throw new Error(`Non-zero padding: ${o}`);
    return r && i > 0 && a.push(o >>> 0), a;
  }
  function bn(e, t = !1) {
    if ((sn(e), e <= 0 || e > 32))
      throw new Error("radix2: bits should be in (0..32]");
    if (pn(8, e) > 32 || pn(e, 8) > 32)
      throw new Error("radix2: carry overflow");
    return {
      encode: (n) => {
        if (!(n instanceof Uint8Array))
          throw new Error("radix2.encode input should be Uint8Array");
        return yn(Array.from(n), 8, e, !t);
      },
      decode: (n) => {
        if (!Array.isArray(n) || (n.length && "number" != typeof n[0]))
          throw new Error("radix2.decode input should be array of strings");
        return Uint8Array.from(yn(n, e, 8, t));
      },
    };
  }
  function gn(e) {
    if ("function" != typeof e)
      throw new Error("unsafeWrapper fn should be function");
    return function (...t) {
      try {
        return e.apply(null, t);
      } catch (e) {}
    };
  }
  const wn = an(bn(4), cn("0123456789ABCDEF"), un("")),
    vn = an(bn(5), cn("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), ln(5), un(""));
  an(bn(5), cn("0123456789ABCDEFGHIJKLMNOPQRSTUV"), ln(5), un("")),
    an(
      bn(5),
      cn("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),
      un(""),
      fn((e) => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))
    );
  const mn = an(
      bn(6),
      cn("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
      ln(6),
      un("")
    ),
    _n = an(
      bn(6),
      cn("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),
      ln(6),
      un("")
    ),
    xn = (e) => {
      return an(
        (sn((t = 58)),
        {
          encode: (e) => {
            if (!(e instanceof Uint8Array))
              throw new Error("radix.encode input should be Uint8Array");
            return hn(Array.from(e), 256, t);
          },
          decode: (e) => {
            if (!Array.isArray(e) || (e.length && "number" != typeof e[0]))
              throw new Error("radix.decode input should be array of strings");
            return Uint8Array.from(hn(e, t, 256));
          },
        }),
        cn(e),
        un("")
      );
      var t;
    },
    En = xn("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  xn("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"),
    xn("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
  const kn = [0, 2, 3, 5, 6, 7, 9, 10, 11],
    Sn = {
      encode(e) {
        let t = "";
        for (let n = 0; n < e.length; n += 8) {
          const r = e.subarray(n, n + 8);
          t += En.encode(r).padStart(kn[r.length], "1");
        }
        return t;
      },
      decode(e) {
        let t = [];
        for (let n = 0; n < e.length; n += 11) {
          const r = e.slice(n, n + 11),
            o = kn.indexOf(r.length),
            i = En.decode(r);
          for (let e = 0; e < i.length - o; e++)
            if (0 !== i[e]) throw new Error("base58xmr: wrong padding");
          t = t.concat(Array.from(i.slice(i.length - o)));
        }
        return Uint8Array.from(t);
      },
    },
    An = an(cn("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), un("")),
    On = [996825010, 642813549, 513874426, 1027748829, 705979059];
  function Cn(e) {
    const t = e >> 25;
    let n = (33554431 & e) << 5;
    for (let e = 0; e < On.length; e++) 1 == ((t >> e) & 1) && (n ^= On[e]);
    return n;
  }
  function Pn(e, t, n = 1) {
    const r = e.length;
    let o = 1;
    for (let t = 0; t < r; t++) {
      const n = e.charCodeAt(t);
      if (n < 33 || n > 126) throw new Error(`Invalid prefix (${e})`);
      o = Cn(o) ^ (n >> 5);
    }
    o = Cn(o);
    for (let t = 0; t < r; t++) o = Cn(o) ^ (31 & e.charCodeAt(t));
    for (let e of t) o = Cn(o) ^ e;
    for (let e = 0; e < 6; e++) o = Cn(o);
    return (o ^= n), An.encode(yn([o % 2 ** 30], 30, 5, !1));
  }
  function In(e) {
    const t = "bech32" === e ? 1 : 734539939,
      n = bn(5),
      r = n.decode,
      o = n.encode,
      i = gn(r);
    function s(e, n = 90) {
      if ("string" != typeof e)
        throw new Error(
          "bech32.decode input should be string, not " + typeof e
        );
      if (e.length < 8 || (!1 !== n && e.length > n))
        throw new TypeError(
          `Wrong string length: ${e.length} (${e}). Expected (8..${n})`
        );
      const r = e.toLowerCase();
      if (e !== r && e !== e.toUpperCase())
        throw new Error("String must be lowercase or uppercase");
      const o = (e = r).lastIndexOf("1");
      if (0 === o || -1 === o)
        throw new Error(
          'Letter "1" must be present between prefix and data only'
        );
      const i = e.slice(0, o),
        s = e.slice(o + 1);
      if (s.length < 6)
        throw new Error("Data must be at least 6 characters long");
      const a = An.decode(s).slice(0, -6),
        c = Pn(i, a, t);
      if (!s.endsWith(c))
        throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
      return { prefix: i, words: a };
    }
    return {
      encode: function (e, n, r = 90) {
        if ("string" != typeof e)
          throw new Error(
            "bech32.encode prefix should be string, not " + typeof e
          );
        if (!Array.isArray(n) || (n.length && "number" != typeof n[0]))
          throw new Error(
            "bech32.encode words should be array of numbers, not " + typeof n
          );
        const o = e.length + 7 + n.length;
        if (!1 !== r && o > r)
          throw new TypeError(`Length ${o} exceeds limit ${r}`);
        return `${(e = e.toLowerCase())}1${An.encode(n)}${Pn(e, n, t)}`;
      },
      decode: s,
      decodeToBytes: function (e) {
        const { prefix: t, words: n } = s(e, !1);
        return { prefix: t, words: n, bytes: r(n) };
      },
      decodeUnsafe: gn(s),
      fromWords: r,
      fromWordsUnsafe: i,
      toWords: o,
    };
  }
  const Tn = In("bech32");
  In("bech32m");
  const Ln = {
    utf8: {
      encode: (e) => new TextDecoder().decode(e),
      decode: (e) => new TextEncoder().encode(e),
    },
    hex: an(
      bn(4),
      cn("0123456789abcdef"),
      un(""),
      fn((e) => {
        if ("string" != typeof e || e.length % 2)
          throw new TypeError(
            `hex.decode: expected string, got ${typeof e} with length ${
              e.length
            }`
          );
        return e.toLowerCase();
      })
    ),
    base16: wn,
    base32: vn,
    base64: mn,
    base64url: _n,
    base58: En,
    base58xmr: Sn,
  };
  Object.keys(Ln).join(", ");
  var Bn =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function Rn(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var $n = {};
  Object.defineProperty($n, "__esModule", { value: !0 });
  var jn = ($n.wordlist = void 0);
  jn = $n.wordlist =
    "abandon\nability\nable\nabout\nabove\nabsent\nabsorb\nabstract\nabsurd\nabuse\naccess\naccident\naccount\naccuse\nachieve\nacid\nacoustic\nacquire\nacross\nact\naction\nactor\nactress\nactual\nadapt\nadd\naddict\naddress\nadjust\nadmit\nadult\nadvance\nadvice\naerobic\naffair\nafford\nafraid\nagain\nage\nagent\nagree\nahead\naim\nair\nairport\naisle\nalarm\nalbum\nalcohol\nalert\nalien\nall\nalley\nallow\nalmost\nalone\nalpha\nalready\nalso\nalter\nalways\namateur\namazing\namong\namount\namused\nanalyst\nanchor\nancient\nanger\nangle\nangry\nanimal\nankle\nannounce\nannual\nanother\nanswer\nantenna\nantique\nanxiety\nany\napart\napology\nappear\napple\napprove\napril\narch\narctic\narea\narena\nargue\narm\narmed\narmor\narmy\naround\narrange\narrest\narrive\narrow\nart\nartefact\nartist\nartwork\nask\naspect\nassault\nasset\nassist\nassume\nasthma\nathlete\natom\nattack\nattend\nattitude\nattract\nauction\naudit\naugust\naunt\nauthor\nauto\nautumn\naverage\navocado\navoid\nawake\naware\naway\nawesome\nawful\nawkward\naxis\nbaby\nbachelor\nbacon\nbadge\nbag\nbalance\nbalcony\nball\nbamboo\nbanana\nbanner\nbar\nbarely\nbargain\nbarrel\nbase\nbasic\nbasket\nbattle\nbeach\nbean\nbeauty\nbecause\nbecome\nbeef\nbefore\nbegin\nbehave\nbehind\nbelieve\nbelow\nbelt\nbench\nbenefit\nbest\nbetray\nbetter\nbetween\nbeyond\nbicycle\nbid\nbike\nbind\nbiology\nbird\nbirth\nbitter\nblack\nblade\nblame\nblanket\nblast\nbleak\nbless\nblind\nblood\nblossom\nblouse\nblue\nblur\nblush\nboard\nboat\nbody\nboil\nbomb\nbone\nbonus\nbook\nboost\nborder\nboring\nborrow\nboss\nbottom\nbounce\nbox\nboy\nbracket\nbrain\nbrand\nbrass\nbrave\nbread\nbreeze\nbrick\nbridge\nbrief\nbright\nbring\nbrisk\nbroccoli\nbroken\nbronze\nbroom\nbrother\nbrown\nbrush\nbubble\nbuddy\nbudget\nbuffalo\nbuild\nbulb\nbulk\nbullet\nbundle\nbunker\nburden\nburger\nburst\nbus\nbusiness\nbusy\nbutter\nbuyer\nbuzz\ncabbage\ncabin\ncable\ncactus\ncage\ncake\ncall\ncalm\ncamera\ncamp\ncan\ncanal\ncancel\ncandy\ncannon\ncanoe\ncanvas\ncanyon\ncapable\ncapital\ncaptain\ncar\ncarbon\ncard\ncargo\ncarpet\ncarry\ncart\ncase\ncash\ncasino\ncastle\ncasual\ncat\ncatalog\ncatch\ncategory\ncattle\ncaught\ncause\ncaution\ncave\nceiling\ncelery\ncement\ncensus\ncentury\ncereal\ncertain\nchair\nchalk\nchampion\nchange\nchaos\nchapter\ncharge\nchase\nchat\ncheap\ncheck\ncheese\nchef\ncherry\nchest\nchicken\nchief\nchild\nchimney\nchoice\nchoose\nchronic\nchuckle\nchunk\nchurn\ncigar\ncinnamon\ncircle\ncitizen\ncity\ncivil\nclaim\nclap\nclarify\nclaw\nclay\nclean\nclerk\nclever\nclick\nclient\ncliff\nclimb\nclinic\nclip\nclock\nclog\nclose\ncloth\ncloud\nclown\nclub\nclump\ncluster\nclutch\ncoach\ncoast\ncoconut\ncode\ncoffee\ncoil\ncoin\ncollect\ncolor\ncolumn\ncombine\ncome\ncomfort\ncomic\ncommon\ncompany\nconcert\nconduct\nconfirm\ncongress\nconnect\nconsider\ncontrol\nconvince\ncook\ncool\ncopper\ncopy\ncoral\ncore\ncorn\ncorrect\ncost\ncotton\ncouch\ncountry\ncouple\ncourse\ncousin\ncover\ncoyote\ncrack\ncradle\ncraft\ncram\ncrane\ncrash\ncrater\ncrawl\ncrazy\ncream\ncredit\ncreek\ncrew\ncricket\ncrime\ncrisp\ncritic\ncrop\ncross\ncrouch\ncrowd\ncrucial\ncruel\ncruise\ncrumble\ncrunch\ncrush\ncry\ncrystal\ncube\nculture\ncup\ncupboard\ncurious\ncurrent\ncurtain\ncurve\ncushion\ncustom\ncute\ncycle\ndad\ndamage\ndamp\ndance\ndanger\ndaring\ndash\ndaughter\ndawn\nday\ndeal\ndebate\ndebris\ndecade\ndecember\ndecide\ndecline\ndecorate\ndecrease\ndeer\ndefense\ndefine\ndefy\ndegree\ndelay\ndeliver\ndemand\ndemise\ndenial\ndentist\ndeny\ndepart\ndepend\ndeposit\ndepth\ndeputy\nderive\ndescribe\ndesert\ndesign\ndesk\ndespair\ndestroy\ndetail\ndetect\ndevelop\ndevice\ndevote\ndiagram\ndial\ndiamond\ndiary\ndice\ndiesel\ndiet\ndiffer\ndigital\ndignity\ndilemma\ndinner\ndinosaur\ndirect\ndirt\ndisagree\ndiscover\ndisease\ndish\ndismiss\ndisorder\ndisplay\ndistance\ndivert\ndivide\ndivorce\ndizzy\ndoctor\ndocument\ndog\ndoll\ndolphin\ndomain\ndonate\ndonkey\ndonor\ndoor\ndose\ndouble\ndove\ndraft\ndragon\ndrama\ndrastic\ndraw\ndream\ndress\ndrift\ndrill\ndrink\ndrip\ndrive\ndrop\ndrum\ndry\nduck\ndumb\ndune\nduring\ndust\ndutch\nduty\ndwarf\ndynamic\neager\neagle\nearly\nearn\nearth\neasily\neast\neasy\necho\necology\neconomy\nedge\nedit\neducate\neffort\negg\neight\neither\nelbow\nelder\nelectric\nelegant\nelement\nelephant\nelevator\nelite\nelse\nembark\nembody\nembrace\nemerge\nemotion\nemploy\nempower\nempty\nenable\nenact\nend\nendless\nendorse\nenemy\nenergy\nenforce\nengage\nengine\nenhance\nenjoy\nenlist\nenough\nenrich\nenroll\nensure\nenter\nentire\nentry\nenvelope\nepisode\nequal\nequip\nera\nerase\nerode\nerosion\nerror\nerupt\nescape\nessay\nessence\nestate\neternal\nethics\nevidence\nevil\nevoke\nevolve\nexact\nexample\nexcess\nexchange\nexcite\nexclude\nexcuse\nexecute\nexercise\nexhaust\nexhibit\nexile\nexist\nexit\nexotic\nexpand\nexpect\nexpire\nexplain\nexpose\nexpress\nextend\nextra\neye\neyebrow\nfabric\nface\nfaculty\nfade\nfaint\nfaith\nfall\nfalse\nfame\nfamily\nfamous\nfan\nfancy\nfantasy\nfarm\nfashion\nfat\nfatal\nfather\nfatigue\nfault\nfavorite\nfeature\nfebruary\nfederal\nfee\nfeed\nfeel\nfemale\nfence\nfestival\nfetch\nfever\nfew\nfiber\nfiction\nfield\nfigure\nfile\nfilm\nfilter\nfinal\nfind\nfine\nfinger\nfinish\nfire\nfirm\nfirst\nfiscal\nfish\nfit\nfitness\nfix\nflag\nflame\nflash\nflat\nflavor\nflee\nflight\nflip\nfloat\nflock\nfloor\nflower\nfluid\nflush\nfly\nfoam\nfocus\nfog\nfoil\nfold\nfollow\nfood\nfoot\nforce\nforest\nforget\nfork\nfortune\nforum\nforward\nfossil\nfoster\nfound\nfox\nfragile\nframe\nfrequent\nfresh\nfriend\nfringe\nfrog\nfront\nfrost\nfrown\nfrozen\nfruit\nfuel\nfun\nfunny\nfurnace\nfury\nfuture\ngadget\ngain\ngalaxy\ngallery\ngame\ngap\ngarage\ngarbage\ngarden\ngarlic\ngarment\ngas\ngasp\ngate\ngather\ngauge\ngaze\ngeneral\ngenius\ngenre\ngentle\ngenuine\ngesture\nghost\ngiant\ngift\ngiggle\nginger\ngiraffe\ngirl\ngive\nglad\nglance\nglare\nglass\nglide\nglimpse\nglobe\ngloom\nglory\nglove\nglow\nglue\ngoat\ngoddess\ngold\ngood\ngoose\ngorilla\ngospel\ngossip\ngovern\ngown\ngrab\ngrace\ngrain\ngrant\ngrape\ngrass\ngravity\ngreat\ngreen\ngrid\ngrief\ngrit\ngrocery\ngroup\ngrow\ngrunt\nguard\nguess\nguide\nguilt\nguitar\ngun\ngym\nhabit\nhair\nhalf\nhammer\nhamster\nhand\nhappy\nharbor\nhard\nharsh\nharvest\nhat\nhave\nhawk\nhazard\nhead\nhealth\nheart\nheavy\nhedgehog\nheight\nhello\nhelmet\nhelp\nhen\nhero\nhidden\nhigh\nhill\nhint\nhip\nhire\nhistory\nhobby\nhockey\nhold\nhole\nholiday\nhollow\nhome\nhoney\nhood\nhope\nhorn\nhorror\nhorse\nhospital\nhost\nhotel\nhour\nhover\nhub\nhuge\nhuman\nhumble\nhumor\nhundred\nhungry\nhunt\nhurdle\nhurry\nhurt\nhusband\nhybrid\nice\nicon\nidea\nidentify\nidle\nignore\nill\nillegal\nillness\nimage\nimitate\nimmense\nimmune\nimpact\nimpose\nimprove\nimpulse\ninch\ninclude\nincome\nincrease\nindex\nindicate\nindoor\nindustry\ninfant\ninflict\ninform\ninhale\ninherit\ninitial\ninject\ninjury\ninmate\ninner\ninnocent\ninput\ninquiry\ninsane\ninsect\ninside\ninspire\ninstall\nintact\ninterest\ninto\ninvest\ninvite\ninvolve\niron\nisland\nisolate\nissue\nitem\nivory\njacket\njaguar\njar\njazz\njealous\njeans\njelly\njewel\njob\njoin\njoke\njourney\njoy\njudge\njuice\njump\njungle\njunior\njunk\njust\nkangaroo\nkeen\nkeep\nketchup\nkey\nkick\nkid\nkidney\nkind\nkingdom\nkiss\nkit\nkitchen\nkite\nkitten\nkiwi\nknee\nknife\nknock\nknow\nlab\nlabel\nlabor\nladder\nlady\nlake\nlamp\nlanguage\nlaptop\nlarge\nlater\nlatin\nlaugh\nlaundry\nlava\nlaw\nlawn\nlawsuit\nlayer\nlazy\nleader\nleaf\nlearn\nleave\nlecture\nleft\nleg\nlegal\nlegend\nleisure\nlemon\nlend\nlength\nlens\nleopard\nlesson\nletter\nlevel\nliar\nliberty\nlibrary\nlicense\nlife\nlift\nlight\nlike\nlimb\nlimit\nlink\nlion\nliquid\nlist\nlittle\nlive\nlizard\nload\nloan\nlobster\nlocal\nlock\nlogic\nlonely\nlong\nloop\nlottery\nloud\nlounge\nlove\nloyal\nlucky\nluggage\nlumber\nlunar\nlunch\nluxury\nlyrics\nmachine\nmad\nmagic\nmagnet\nmaid\nmail\nmain\nmajor\nmake\nmammal\nman\nmanage\nmandate\nmango\nmansion\nmanual\nmaple\nmarble\nmarch\nmargin\nmarine\nmarket\nmarriage\nmask\nmass\nmaster\nmatch\nmaterial\nmath\nmatrix\nmatter\nmaximum\nmaze\nmeadow\nmean\nmeasure\nmeat\nmechanic\nmedal\nmedia\nmelody\nmelt\nmember\nmemory\nmention\nmenu\nmercy\nmerge\nmerit\nmerry\nmesh\nmessage\nmetal\nmethod\nmiddle\nmidnight\nmilk\nmillion\nmimic\nmind\nminimum\nminor\nminute\nmiracle\nmirror\nmisery\nmiss\nmistake\nmix\nmixed\nmixture\nmobile\nmodel\nmodify\nmom\nmoment\nmonitor\nmonkey\nmonster\nmonth\nmoon\nmoral\nmore\nmorning\nmosquito\nmother\nmotion\nmotor\nmountain\nmouse\nmove\nmovie\nmuch\nmuffin\nmule\nmultiply\nmuscle\nmuseum\nmushroom\nmusic\nmust\nmutual\nmyself\nmystery\nmyth\nnaive\nname\nnapkin\nnarrow\nnasty\nnation\nnature\nnear\nneck\nneed\nnegative\nneglect\nneither\nnephew\nnerve\nnest\nnet\nnetwork\nneutral\nnever\nnews\nnext\nnice\nnight\nnoble\nnoise\nnominee\nnoodle\nnormal\nnorth\nnose\nnotable\nnote\nnothing\nnotice\nnovel\nnow\nnuclear\nnumber\nnurse\nnut\noak\nobey\nobject\noblige\nobscure\nobserve\nobtain\nobvious\noccur\nocean\noctober\nodor\noff\noffer\noffice\noften\noil\nokay\nold\nolive\nolympic\nomit\nonce\none\nonion\nonline\nonly\nopen\nopera\nopinion\noppose\noption\norange\norbit\norchard\norder\nordinary\norgan\norient\noriginal\norphan\nostrich\nother\noutdoor\nouter\noutput\noutside\noval\noven\nover\nown\nowner\noxygen\noyster\nozone\npact\npaddle\npage\npair\npalace\npalm\npanda\npanel\npanic\npanther\npaper\nparade\nparent\npark\nparrot\nparty\npass\npatch\npath\npatient\npatrol\npattern\npause\npave\npayment\npeace\npeanut\npear\npeasant\npelican\npen\npenalty\npencil\npeople\npepper\nperfect\npermit\nperson\npet\nphone\nphoto\nphrase\nphysical\npiano\npicnic\npicture\npiece\npig\npigeon\npill\npilot\npink\npioneer\npipe\npistol\npitch\npizza\nplace\nplanet\nplastic\nplate\nplay\nplease\npledge\npluck\nplug\nplunge\npoem\npoet\npoint\npolar\npole\npolice\npond\npony\npool\npopular\nportion\nposition\npossible\npost\npotato\npottery\npoverty\npowder\npower\npractice\npraise\npredict\nprefer\nprepare\npresent\npretty\nprevent\nprice\npride\nprimary\nprint\npriority\nprison\nprivate\nprize\nproblem\nprocess\nproduce\nprofit\nprogram\nproject\npromote\nproof\nproperty\nprosper\nprotect\nproud\nprovide\npublic\npudding\npull\npulp\npulse\npumpkin\npunch\npupil\npuppy\npurchase\npurity\npurpose\npurse\npush\nput\npuzzle\npyramid\nquality\nquantum\nquarter\nquestion\nquick\nquit\nquiz\nquote\nrabbit\nraccoon\nrace\nrack\nradar\nradio\nrail\nrain\nraise\nrally\nramp\nranch\nrandom\nrange\nrapid\nrare\nrate\nrather\nraven\nraw\nrazor\nready\nreal\nreason\nrebel\nrebuild\nrecall\nreceive\nrecipe\nrecord\nrecycle\nreduce\nreflect\nreform\nrefuse\nregion\nregret\nregular\nreject\nrelax\nrelease\nrelief\nrely\nremain\nremember\nremind\nremove\nrender\nrenew\nrent\nreopen\nrepair\nrepeat\nreplace\nreport\nrequire\nrescue\nresemble\nresist\nresource\nresponse\nresult\nretire\nretreat\nreturn\nreunion\nreveal\nreview\nreward\nrhythm\nrib\nribbon\nrice\nrich\nride\nridge\nrifle\nright\nrigid\nring\nriot\nripple\nrisk\nritual\nrival\nriver\nroad\nroast\nrobot\nrobust\nrocket\nromance\nroof\nrookie\nroom\nrose\nrotate\nrough\nround\nroute\nroyal\nrubber\nrude\nrug\nrule\nrun\nrunway\nrural\nsad\nsaddle\nsadness\nsafe\nsail\nsalad\nsalmon\nsalon\nsalt\nsalute\nsame\nsample\nsand\nsatisfy\nsatoshi\nsauce\nsausage\nsave\nsay\nscale\nscan\nscare\nscatter\nscene\nscheme\nschool\nscience\nscissors\nscorpion\nscout\nscrap\nscreen\nscript\nscrub\nsea\nsearch\nseason\nseat\nsecond\nsecret\nsection\nsecurity\nseed\nseek\nsegment\nselect\nsell\nseminar\nsenior\nsense\nsentence\nseries\nservice\nsession\nsettle\nsetup\nseven\nshadow\nshaft\nshallow\nshare\nshed\nshell\nsheriff\nshield\nshift\nshine\nship\nshiver\nshock\nshoe\nshoot\nshop\nshort\nshoulder\nshove\nshrimp\nshrug\nshuffle\nshy\nsibling\nsick\nside\nsiege\nsight\nsign\nsilent\nsilk\nsilly\nsilver\nsimilar\nsimple\nsince\nsing\nsiren\nsister\nsituate\nsix\nsize\nskate\nsketch\nski\nskill\nskin\nskirt\nskull\nslab\nslam\nsleep\nslender\nslice\nslide\nslight\nslim\nslogan\nslot\nslow\nslush\nsmall\nsmart\nsmile\nsmoke\nsmooth\nsnack\nsnake\nsnap\nsniff\nsnow\nsoap\nsoccer\nsocial\nsock\nsoda\nsoft\nsolar\nsoldier\nsolid\nsolution\nsolve\nsomeone\nsong\nsoon\nsorry\nsort\nsoul\nsound\nsoup\nsource\nsouth\nspace\nspare\nspatial\nspawn\nspeak\nspecial\nspeed\nspell\nspend\nsphere\nspice\nspider\nspike\nspin\nspirit\nsplit\nspoil\nsponsor\nspoon\nsport\nspot\nspray\nspread\nspring\nspy\nsquare\nsqueeze\nsquirrel\nstable\nstadium\nstaff\nstage\nstairs\nstamp\nstand\nstart\nstate\nstay\nsteak\nsteel\nstem\nstep\nstereo\nstick\nstill\nsting\nstock\nstomach\nstone\nstool\nstory\nstove\nstrategy\nstreet\nstrike\nstrong\nstruggle\nstudent\nstuff\nstumble\nstyle\nsubject\nsubmit\nsubway\nsuccess\nsuch\nsudden\nsuffer\nsugar\nsuggest\nsuit\nsummer\nsun\nsunny\nsunset\nsuper\nsupply\nsupreme\nsure\nsurface\nsurge\nsurprise\nsurround\nsurvey\nsuspect\nsustain\nswallow\nswamp\nswap\nswarm\nswear\nsweet\nswift\nswim\nswing\nswitch\nsword\nsymbol\nsymptom\nsyrup\nsystem\ntable\ntackle\ntag\ntail\ntalent\ntalk\ntank\ntape\ntarget\ntask\ntaste\ntattoo\ntaxi\nteach\nteam\ntell\nten\ntenant\ntennis\ntent\nterm\ntest\ntext\nthank\nthat\ntheme\nthen\ntheory\nthere\nthey\nthing\nthis\nthought\nthree\nthrive\nthrow\nthumb\nthunder\nticket\ntide\ntiger\ntilt\ntimber\ntime\ntiny\ntip\ntired\ntissue\ntitle\ntoast\ntobacco\ntoday\ntoddler\ntoe\ntogether\ntoilet\ntoken\ntomato\ntomorrow\ntone\ntongue\ntonight\ntool\ntooth\ntop\ntopic\ntopple\ntorch\ntornado\ntortoise\ntoss\ntotal\ntourist\ntoward\ntower\ntown\ntoy\ntrack\ntrade\ntraffic\ntragic\ntrain\ntransfer\ntrap\ntrash\ntravel\ntray\ntreat\ntree\ntrend\ntrial\ntribe\ntrick\ntrigger\ntrim\ntrip\ntrophy\ntrouble\ntruck\ntrue\ntruly\ntrumpet\ntrust\ntruth\ntry\ntube\ntuition\ntumble\ntuna\ntunnel\nturkey\nturn\nturtle\ntwelve\ntwenty\ntwice\ntwin\ntwist\ntwo\ntype\ntypical\nugly\numbrella\nunable\nunaware\nuncle\nuncover\nunder\nundo\nunfair\nunfold\nunhappy\nuniform\nunique\nunit\nuniverse\nunknown\nunlock\nuntil\nunusual\nunveil\nupdate\nupgrade\nuphold\nupon\nupper\nupset\nurban\nurge\nusage\nuse\nused\nuseful\nuseless\nusual\nutility\nvacant\nvacuum\nvague\nvalid\nvalley\nvalve\nvan\nvanish\nvapor\nvarious\nvast\nvault\nvehicle\nvelvet\nvendor\nventure\nvenue\nverb\nverify\nversion\nvery\nvessel\nveteran\nviable\nvibrant\nvicious\nvictory\nvideo\nview\nvillage\nvintage\nviolin\nvirtual\nvirus\nvisa\nvisit\nvisual\nvital\nvivid\nvocal\nvoice\nvoid\nvolcano\nvolume\nvote\nvoyage\nwage\nwagon\nwait\nwalk\nwall\nwalnut\nwant\nwarfare\nwarm\nwarrior\nwash\nwasp\nwaste\nwater\nwave\nway\nwealth\nweapon\nwear\nweasel\nweather\nweb\nwedding\nweekend\nweird\nwelcome\nwest\nwet\nwhale\nwhat\nwheat\nwheel\nwhen\nwhere\nwhip\nwhisper\nwide\nwidth\nwife\nwild\nwill\nwin\nwindow\nwine\nwing\nwink\nwinner\nwinter\nwire\nwisdom\nwise\nwish\nwitness\nwolf\nwoman\nwonder\nwood\nwool\nword\nwork\nworld\nworry\nworth\nwrap\nwreck\nwrestle\nwrist\nwrite\nwrong\nyard\nyear\nyellow\nyou\nyoung\nyouth\nzebra\nzero\nzone\nzoo".split(
      "\n"
    );
  var Un = {},
    Nn = {};
  function Hn(e) {
    if (!Number.isSafeInteger(e) || e < 0)
      throw new Error(`Wrong positive integer: ${e}`);
  }
  function qn(e) {
    if ("boolean" != typeof e) throw new Error(`Expected boolean, not ${e}`);
  }
  function Mn(e, ...t) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (t.length > 0 && !t.includes(e.length))
      throw new TypeError(
        `Expected Uint8Array of length ${t}, not of length=${e.length}`
      );
  }
  function Fn(e) {
    if ("function" != typeof e || "function" != typeof e.create)
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    Hn(e.outputLen), Hn(e.blockLen);
  }
  function Dn(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function zn(e, t) {
    Mn(e);
    const n = t.outputLen;
    if (e.length < n)
      throw new Error(
        `digestInto() expects output buffer of length at least ${n}`
      );
  }
  Object.defineProperty(Nn, "__esModule", { value: !0 }),
    (Nn.output = Nn.exists = Nn.hash = Nn.bytes = Nn.bool = Nn.number = void 0),
    (Nn.number = Hn),
    (Nn.bool = qn),
    (Nn.bytes = Mn),
    (Nn.hash = Fn),
    (Nn.exists = Dn),
    (Nn.output = zn);
  const Kn = {
    number: Hn,
    bool: qn,
    bytes: Mn,
    hash: Fn,
    exists: Dn,
    output: zn,
  };
  Nn.default = Kn;
  var Gn = {},
    Wn = {},
    Vn = {},
    Yn = {};
  Object.defineProperty(Yn, "__esModule", { value: !0 }),
    (Yn.crypto = void 0),
    (Yn.crypto =
      "object" == typeof globalThis && "crypto" in globalThis
        ? globalThis.crypto
        : void 0),
    (function (e) {
      /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.randomBytes =
          e.wrapConstructorWithOpts =
          e.wrapConstructor =
          e.checkOpts =
          e.Hash =
          e.concatBytes =
          e.toBytes =
          e.utf8ToBytes =
          e.asyncLoop =
          e.nextTick =
          e.hexToBytes =
          e.bytesToHex =
          e.isLE =
          e.rotr =
          e.createView =
          e.u32 =
          e.u8 =
            void 0);
      const t = Yn;
      e.u8 = (e) => new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      e.u32 = (e) =>
        new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
      e.createView = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength);
      if (
        ((e.rotr = (e, t) => (e << (32 - t)) | (e >>> t)),
        (e.isLE =
          68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0]),
        !e.isLE)
      )
        throw new Error("Non little-endian hardware is not supported");
      const n = Array.from({ length: 256 }, (e, t) =>
        t.toString(16).padStart(2, "0")
      );
      (e.bytesToHex = function (e) {
        if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
        let t = "";
        for (let r = 0; r < e.length; r++) t += n[e[r]];
        return t;
      }),
        (e.hexToBytes = function (e) {
          if ("string" != typeof e)
            throw new TypeError("hexToBytes: expected string, got " + typeof e);
          if (e.length % 2)
            throw new Error("hexToBytes: received invalid unpadded hex");
          const t = new Uint8Array(e.length / 2);
          for (let n = 0; n < t.length; n++) {
            const r = 2 * n,
              o = e.slice(r, r + 2),
              i = Number.parseInt(o, 16);
            if (Number.isNaN(i) || i < 0)
              throw new Error("Invalid byte sequence");
            t[n] = i;
          }
          return t;
        });
      function r(e) {
        if ("string" != typeof e)
          throw new TypeError("utf8ToBytes expected string, got " + typeof e);
        return new TextEncoder().encode(e);
      }
      function o(e) {
        if (("string" == typeof e && (e = r(e)), !(e instanceof Uint8Array)))
          throw new TypeError(
            `Expected input type is Uint8Array (got ${typeof e})`
          );
        return e;
      }
      (e.nextTick = async () => {}),
        (e.asyncLoop = async function (t, n, r) {
          let o = Date.now();
          for (let i = 0; i < t; i++) {
            r(i);
            const t = Date.now() - o;
            (t >= 0 && t < n) || (await (0, e.nextTick)(), (o += t));
          }
        }),
        (e.utf8ToBytes = r),
        (e.toBytes = o),
        (e.concatBytes = function (...e) {
          if (!e.every((e) => e instanceof Uint8Array))
            throw new Error("Uint8Array list expected");
          if (1 === e.length) return e[0];
          const t = e.reduce((e, t) => e + t.length, 0),
            n = new Uint8Array(t);
          for (let t = 0, r = 0; t < e.length; t++) {
            const o = e[t];
            n.set(o, r), (r += o.length);
          }
          return n;
        });
      e.Hash = class {
        clone() {
          return this._cloneInto();
        }
      };
      (e.checkOpts = function (e, t) {
        if (
          void 0 !== t &&
          ("object" != typeof t ||
            ((n = t),
            "[object Object]" !== Object.prototype.toString.call(n) ||
              n.constructor !== Object))
        )
          throw new TypeError("Options should be object or undefined");
        var n;
        return Object.assign(e, t);
      }),
        (e.wrapConstructor = function (e) {
          const t = (t) => e().update(o(t)).digest(),
            n = e();
          return (
            (t.outputLen = n.outputLen),
            (t.blockLen = n.blockLen),
            (t.create = () => e()),
            t
          );
        }),
        (e.wrapConstructorWithOpts = function (e) {
          const t = (t, n) => e(n).update(o(t)).digest(),
            n = e({});
          return (
            (t.outputLen = n.outputLen),
            (t.blockLen = n.blockLen),
            (t.create = (t) => e(t)),
            t
          );
        }),
        (e.randomBytes = function (e = 32) {
          if (t.crypto && "function" == typeof t.crypto.getRandomValues)
            return t.crypto.getRandomValues(new Uint8Array(e));
          throw new Error("crypto.getRandomValues must be defined");
        });
    })(Vn),
    (function (e) {
      Object.defineProperty(e, "__esModule", { value: !0 }), (e.hmac = void 0);
      const t = Nn,
        n = Vn;
      class r extends n.Hash {
        constructor(e, r) {
          super(),
            (this.finished = !1),
            (this.destroyed = !1),
            t.default.hash(e);
          const o = (0, n.toBytes)(r);
          if (
            ((this.iHash = e.create()), "function" != typeof this.iHash.update)
          )
            throw new TypeError(
              "Expected instance of class which extends utils.Hash"
            );
          (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
          const i = this.blockLen,
            s = new Uint8Array(i);
          s.set(o.length > i ? e.create().update(o).digest() : o);
          for (let e = 0; e < s.length; e++) s[e] ^= 54;
          this.iHash.update(s), (this.oHash = e.create());
          for (let e = 0; e < s.length; e++) s[e] ^= 106;
          this.oHash.update(s), s.fill(0);
        }
        update(e) {
          return t.default.exists(this), this.iHash.update(e), this;
        }
        digestInto(e) {
          t.default.exists(this),
            t.default.bytes(e, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(e),
            this.oHash.update(e),
            this.oHash.digestInto(e),
            this.destroy();
        }
        digest() {
          const e = new Uint8Array(this.oHash.outputLen);
          return this.digestInto(e), e;
        }
        _cloneInto(e) {
          e || (e = Object.create(Object.getPrototypeOf(this), {}));
          const {
            oHash: t,
            iHash: n,
            finished: r,
            destroyed: o,
            blockLen: i,
            outputLen: s,
          } = this;
          return (
            (e.finished = r),
            (e.destroyed = o),
            (e.blockLen = i),
            (e.outputLen = s),
            (e.oHash = t._cloneInto(e.oHash)),
            (e.iHash = n._cloneInto(e.iHash)),
            e
          );
        }
        destroy() {
          (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
        }
      }
      (e.hmac = (e, t, n) => new r(e, t).update(n).digest()),
        (e.hmac.create = (e, t) => new r(e, t));
    })(Wn),
    Object.defineProperty(Gn, "__esModule", { value: !0 }),
    (Gn.pbkdf2Async = Gn.pbkdf2 = void 0);
  const Zn = Nn,
    Jn = Wn,
    Qn = Vn;
  function Xn(e, t, n, r) {
    Zn.default.hash(e);
    const o = (0, Qn.checkOpts)({ dkLen: 32, asyncTick: 10 }, r),
      { c: i, dkLen: s, asyncTick: a } = o;
    if (
      (Zn.default.number(i), Zn.default.number(s), Zn.default.number(a), i < 1)
    )
      throw new Error("PBKDF2: iterations (c) should be >= 1");
    const c = (0, Qn.toBytes)(t),
      u = (0, Qn.toBytes)(n),
      l = new Uint8Array(s),
      f = Jn.hmac.create(e, c),
      h = f._cloneInto().update(u);
    return { c: i, dkLen: s, asyncTick: a, DK: l, PRF: f, PRFSalt: h };
  }
  function er(e, t, n, r, o) {
    return e.destroy(), t.destroy(), r && r.destroy(), o.fill(0), n;
  }
  (Gn.pbkdf2 = function (e, t, n, r) {
    const { c: o, dkLen: i, DK: s, PRF: a, PRFSalt: c } = Xn(e, t, n, r);
    let u;
    const l = new Uint8Array(4),
      f = (0, Qn.createView)(l),
      h = new Uint8Array(a.outputLen);
    for (let e = 1, t = 0; t < i; e++, t += a.outputLen) {
      const n = s.subarray(t, t + a.outputLen);
      f.setInt32(0, e, !1),
        (u = c._cloneInto(u)).update(l).digestInto(h),
        n.set(h.subarray(0, n.length));
      for (let e = 1; e < o; e++) {
        a._cloneInto(u).update(h).digestInto(h);
        for (let e = 0; e < n.length; e++) n[e] ^= h[e];
      }
    }
    return er(a, c, s, u, h);
  }),
    (Gn.pbkdf2Async = async function (e, t, n, r) {
      const {
        c: o,
        dkLen: i,
        asyncTick: s,
        DK: a,
        PRF: c,
        PRFSalt: u,
      } = Xn(e, t, n, r);
      let l;
      const f = new Uint8Array(4),
        h = (0, Qn.createView)(f),
        d = new Uint8Array(c.outputLen);
      for (let e = 1, t = 0; t < i; e++, t += c.outputLen) {
        const n = a.subarray(t, t + c.outputLen);
        h.setInt32(0, e, !1),
          (l = u._cloneInto(l)).update(f).digestInto(d),
          n.set(d.subarray(0, n.length)),
          await (0, Qn.asyncLoop)(o - 1, s, (e) => {
            c._cloneInto(l).update(d).digestInto(d);
            for (let e = 0; e < n.length; e++) n[e] ^= d[e];
          });
      }
      return er(c, u, a, l, d);
    });
  var tr = {},
    nr = {};
  Object.defineProperty(nr, "__esModule", { value: !0 }), (nr.SHA2 = void 0);
  const rr = Nn,
    or = Vn;
  (nr.SHA2 = class extends or.Hash {
    constructor(e, t, n, r) {
      super(),
        (this.blockLen = e),
        (this.outputLen = t),
        (this.padOffset = n),
        (this.isLE = r),
        (this.finished = !1),
        (this.length = 0),
        (this.pos = 0),
        (this.destroyed = !1),
        (this.buffer = new Uint8Array(e)),
        (this.view = (0, or.createView)(this.buffer));
    }
    update(e) {
      rr.default.exists(this);
      const { view: t, buffer: n, blockLen: r } = this,
        o = (e = (0, or.toBytes)(e)).length;
      for (let i = 0; i < o; ) {
        const s = Math.min(r - this.pos, o - i);
        if (s !== r)
          n.set(e.subarray(i, i + s), this.pos),
            (this.pos += s),
            (i += s),
            this.pos === r && (this.process(t, 0), (this.pos = 0));
        else {
          const t = (0, or.createView)(e);
          for (; r <= o - i; i += r) this.process(t, i);
        }
      }
      return (this.length += e.length), this.roundClean(), this;
    }
    digestInto(e) {
      rr.default.exists(this), rr.default.output(e, this), (this.finished = !0);
      const { buffer: t, view: n, blockLen: r, isLE: o } = this;
      let { pos: i } = this;
      (t[i++] = 128),
        this.buffer.subarray(i).fill(0),
        this.padOffset > r - i && (this.process(n, 0), (i = 0));
      for (let e = i; e < r; e++) t[e] = 0;
      !(function (e, t, n, r) {
        if ("function" == typeof e.setBigUint64) return e.setBigUint64(t, n, r);
        const o = BigInt(32),
          i = BigInt(4294967295),
          s = Number((n >> o) & i),
          a = Number(n & i),
          c = r ? 4 : 0,
          u = r ? 0 : 4;
        e.setUint32(t + c, s, r), e.setUint32(t + u, a, r);
      })(n, r - 8, BigInt(8 * this.length), o),
        this.process(n, 0);
      const s = (0, or.createView)(e),
        a = this.outputLen;
      if (a % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
      const c = a / 4,
        u = this.get();
      if (c > u.length) throw new Error("_sha2: outputLen bigger than state");
      for (let e = 0; e < c; e++) s.setUint32(4 * e, u[e], o);
    }
    digest() {
      const { buffer: e, outputLen: t } = this;
      this.digestInto(e);
      const n = e.slice(0, t);
      return this.destroy(), n;
    }
    _cloneInto(e) {
      e || (e = new this.constructor()), e.set(...this.get());
      const {
        blockLen: t,
        buffer: n,
        length: r,
        finished: o,
        destroyed: i,
        pos: s,
      } = this;
      return (
        (e.length = r),
        (e.pos = s),
        (e.finished = o),
        (e.destroyed = i),
        r % t && e.buffer.set(n),
        e
      );
    }
  }),
    Object.defineProperty(tr, "__esModule", { value: !0 }),
    (tr.sha224 = tr.sha256 = void 0);
  const ir = nr,
    sr = Vn,
    ar = (e, t, n) => (e & t) ^ (e & n) ^ (t & n),
    cr = new Uint32Array([
      1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
      2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
      1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
      2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
      1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
      3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
      1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
      2428436474, 2756734187, 3204031479, 3329325298,
    ]),
    ur = new Uint32Array([
      1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
      528734635, 1541459225,
    ]),
    lr = new Uint32Array(64);
  class fr extends ir.SHA2 {
    constructor() {
      super(64, 32, 8, !1),
        (this.A = 0 | ur[0]),
        (this.B = 0 | ur[1]),
        (this.C = 0 | ur[2]),
        (this.D = 0 | ur[3]),
        (this.E = 0 | ur[4]),
        (this.F = 0 | ur[5]),
        (this.G = 0 | ur[6]),
        (this.H = 0 | ur[7]);
    }
    get() {
      const { A: e, B: t, C: n, D: r, E: o, F: i, G: s, H: a } = this;
      return [e, t, n, r, o, i, s, a];
    }
    set(e, t, n, r, o, i, s, a) {
      (this.A = 0 | e),
        (this.B = 0 | t),
        (this.C = 0 | n),
        (this.D = 0 | r),
        (this.E = 0 | o),
        (this.F = 0 | i),
        (this.G = 0 | s),
        (this.H = 0 | a);
    }
    process(e, t) {
      for (let n = 0; n < 16; n++, t += 4) lr[n] = e.getUint32(t, !1);
      for (let e = 16; e < 64; e++) {
        const t = lr[e - 15],
          n = lr[e - 2],
          r = (0, sr.rotr)(t, 7) ^ (0, sr.rotr)(t, 18) ^ (t >>> 3),
          o = (0, sr.rotr)(n, 17) ^ (0, sr.rotr)(n, 19) ^ (n >>> 10);
        lr[e] = (o + lr[e - 7] + r + lr[e - 16]) | 0;
      }
      let { A: n, B: r, C: o, D: i, E: s, F: a, G: c, H: u } = this;
      for (let e = 0; e < 64; e++) {
        const t =
            (u +
              ((0, sr.rotr)(s, 6) ^ (0, sr.rotr)(s, 11) ^ (0, sr.rotr)(s, 25)) +
              (((l = s) & a) ^ (~l & c)) +
              cr[e] +
              lr[e]) |
            0,
          f =
            (((0, sr.rotr)(n, 2) ^ (0, sr.rotr)(n, 13) ^ (0, sr.rotr)(n, 22)) +
              ar(n, r, o)) |
            0;
        (u = c),
          (c = a),
          (a = s),
          (s = (i + t) | 0),
          (i = o),
          (o = r),
          (r = n),
          (n = (t + f) | 0);
      }
      var l;
      (n = (n + this.A) | 0),
        (r = (r + this.B) | 0),
        (o = (o + this.C) | 0),
        (i = (i + this.D) | 0),
        (s = (s + this.E) | 0),
        (a = (a + this.F) | 0),
        (c = (c + this.G) | 0),
        (u = (u + this.H) | 0),
        this.set(n, r, o, i, s, a, c, u);
    }
    roundClean() {
      lr.fill(0);
    }
    destroy() {
      this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
    }
  }
  class hr extends fr {
    constructor() {
      super(),
        (this.A = -1056596264),
        (this.B = 914150663),
        (this.C = 812702999),
        (this.D = -150054599),
        (this.E = -4191439),
        (this.F = 1750603025),
        (this.G = 1694076839),
        (this.H = -1090891868),
        (this.outputLen = 28);
    }
  }
  (tr.sha256 = (0, sr.wrapConstructor)(() => new fr())),
    (tr.sha224 = (0, sr.wrapConstructor)(() => new hr()));
  var dr = {},
    pr = {};
  !(function (e) {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.add = e.toBig = e.split = e.fromBig = void 0);
    const t = BigInt(2 ** 32 - 1),
      n = BigInt(32);
    function r(e, r = !1) {
      return r
        ? { h: Number(e & t), l: Number((e >> n) & t) }
        : { h: 0 | Number((e >> n) & t), l: 0 | Number(e & t) };
    }
    function o(e, t = !1) {
      let n = new Uint32Array(e.length),
        o = new Uint32Array(e.length);
      for (let i = 0; i < e.length; i++) {
        const { h: s, l: a } = r(e[i], t);
        [n[i], o[i]] = [s, a];
      }
      return [n, o];
    }
    (e.fromBig = r), (e.split = o);
    e.toBig = (e, t) => (BigInt(e >>> 0) << n) | BigInt(t >>> 0);
    function i(e, t, n, r) {
      const o = (t >>> 0) + (r >>> 0);
      return { h: (e + n + ((o / 2 ** 32) | 0)) | 0, l: 0 | o };
    }
    e.add = i;
    const s = {
      fromBig: r,
      split: o,
      toBig: e.toBig,
      shrSH: (e, t, n) => e >>> n,
      shrSL: (e, t, n) => (e << (32 - n)) | (t >>> n),
      rotrSH: (e, t, n) => (e >>> n) | (t << (32 - n)),
      rotrSL: (e, t, n) => (e << (32 - n)) | (t >>> n),
      rotrBH: (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
      rotrBL: (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
      rotr32H: (e, t) => t,
      rotr32L: (e, t) => e,
      rotlSH: (e, t, n) => (e << n) | (t >>> (32 - n)),
      rotlSL: (e, t, n) => (t << n) | (e >>> (32 - n)),
      rotlBH: (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
      rotlBL: (e, t, n) => (e << (n - 32)) | (t >>> (64 - n)),
      add: i,
      add3L: (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
      add3H: (e, t, n, r) => (t + n + r + ((e / 2 ** 32) | 0)) | 0,
      add4L: (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
      add4H: (e, t, n, r, o) => (t + n + r + o + ((e / 2 ** 32) | 0)) | 0,
      add5H: (e, t, n, r, o, i) =>
        (t + n + r + o + i + ((e / 2 ** 32) | 0)) | 0,
      add5L: (e, t, n, r, o) =>
        (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0),
    };
    e.default = s;
  })(pr),
    Object.defineProperty(dr, "__esModule", { value: !0 }),
    (dr.sha384 =
      dr.sha512_256 =
      dr.sha512_224 =
      dr.sha512 =
      dr.SHA512 =
        void 0);
  const yr = nr,
    br = pr,
    gr = Vn,
    [wr, vr] = br.default.split(
      [
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817",
      ].map((e) => BigInt(e))
    ),
    mr = new Uint32Array(80),
    _r = new Uint32Array(80);
  class xr extends yr.SHA2 {
    constructor() {
      super(128, 64, 16, !1),
        (this.Ah = 1779033703),
        (this.Al = -205731576),
        (this.Bh = -1150833019),
        (this.Bl = -2067093701),
        (this.Ch = 1013904242),
        (this.Cl = -23791573),
        (this.Dh = -1521486534),
        (this.Dl = 1595750129),
        (this.Eh = 1359893119),
        (this.El = -1377402159),
        (this.Fh = -1694144372),
        (this.Fl = 725511199),
        (this.Gh = 528734635),
        (this.Gl = -79577749),
        (this.Hh = 1541459225),
        (this.Hl = 327033209);
    }
    get() {
      const {
        Ah: e,
        Al: t,
        Bh: n,
        Bl: r,
        Ch: o,
        Cl: i,
        Dh: s,
        Dl: a,
        Eh: c,
        El: u,
        Fh: l,
        Fl: f,
        Gh: h,
        Gl: d,
        Hh: p,
        Hl: y,
      } = this;
      return [e, t, n, r, o, i, s, a, c, u, l, f, h, d, p, y];
    }
    set(e, t, n, r, o, i, s, a, c, u, l, f, h, d, p, y) {
      (this.Ah = 0 | e),
        (this.Al = 0 | t),
        (this.Bh = 0 | n),
        (this.Bl = 0 | r),
        (this.Ch = 0 | o),
        (this.Cl = 0 | i),
        (this.Dh = 0 | s),
        (this.Dl = 0 | a),
        (this.Eh = 0 | c),
        (this.El = 0 | u),
        (this.Fh = 0 | l),
        (this.Fl = 0 | f),
        (this.Gh = 0 | h),
        (this.Gl = 0 | d),
        (this.Hh = 0 | p),
        (this.Hl = 0 | y);
    }
    process(e, t) {
      for (let n = 0; n < 16; n++, t += 4)
        (mr[n] = e.getUint32(t)), (_r[n] = e.getUint32((t += 4)));
      for (let e = 16; e < 80; e++) {
        const t = 0 | mr[e - 15],
          n = 0 | _r[e - 15],
          r =
            br.default.rotrSH(t, n, 1) ^
            br.default.rotrSH(t, n, 8) ^
            br.default.shrSH(t, n, 7),
          o =
            br.default.rotrSL(t, n, 1) ^
            br.default.rotrSL(t, n, 8) ^
            br.default.shrSL(t, n, 7),
          i = 0 | mr[e - 2],
          s = 0 | _r[e - 2],
          a =
            br.default.rotrSH(i, s, 19) ^
            br.default.rotrBH(i, s, 61) ^
            br.default.shrSH(i, s, 6),
          c =
            br.default.rotrSL(i, s, 19) ^
            br.default.rotrBL(i, s, 61) ^
            br.default.shrSL(i, s, 6),
          u = br.default.add4L(o, c, _r[e - 7], _r[e - 16]),
          l = br.default.add4H(u, r, a, mr[e - 7], mr[e - 16]);
        (mr[e] = 0 | l), (_r[e] = 0 | u);
      }
      let {
        Ah: n,
        Al: r,
        Bh: o,
        Bl: i,
        Ch: s,
        Cl: a,
        Dh: c,
        Dl: u,
        Eh: l,
        El: f,
        Fh: h,
        Fl: d,
        Gh: p,
        Gl: y,
        Hh: b,
        Hl: g,
      } = this;
      for (let e = 0; e < 80; e++) {
        const t =
            br.default.rotrSH(l, f, 14) ^
            br.default.rotrSH(l, f, 18) ^
            br.default.rotrBH(l, f, 41),
          w =
            br.default.rotrSL(l, f, 14) ^
            br.default.rotrSL(l, f, 18) ^
            br.default.rotrBL(l, f, 41),
          v = (l & h) ^ (~l & p),
          m = (f & d) ^ (~f & y),
          _ = br.default.add5L(g, w, m, vr[e], _r[e]),
          x = br.default.add5H(_, b, t, v, wr[e], mr[e]),
          E = 0 | _,
          k =
            br.default.rotrSH(n, r, 28) ^
            br.default.rotrBH(n, r, 34) ^
            br.default.rotrBH(n, r, 39),
          S =
            br.default.rotrSL(n, r, 28) ^
            br.default.rotrBL(n, r, 34) ^
            br.default.rotrBL(n, r, 39),
          A = (n & o) ^ (n & s) ^ (o & s),
          O = (r & i) ^ (r & a) ^ (i & a);
        (b = 0 | p),
          (g = 0 | y),
          (p = 0 | h),
          (y = 0 | d),
          (h = 0 | l),
          (d = 0 | f),
          ({ h: l, l: f } = br.default.add(0 | c, 0 | u, 0 | x, 0 | E)),
          (c = 0 | s),
          (u = 0 | a),
          (s = 0 | o),
          (a = 0 | i),
          (o = 0 | n),
          (i = 0 | r);
        const C = br.default.add3L(E, S, O);
        (n = br.default.add3H(C, x, k, A)), (r = 0 | C);
      }
      ({ h: n, l: r } = br.default.add(0 | this.Ah, 0 | this.Al, 0 | n, 0 | r)),
        ({ h: o, l: i } = br.default.add(
          0 | this.Bh,
          0 | this.Bl,
          0 | o,
          0 | i
        )),
        ({ h: s, l: a } = br.default.add(
          0 | this.Ch,
          0 | this.Cl,
          0 | s,
          0 | a
        )),
        ({ h: c, l: u } = br.default.add(
          0 | this.Dh,
          0 | this.Dl,
          0 | c,
          0 | u
        )),
        ({ h: l, l: f } = br.default.add(
          0 | this.Eh,
          0 | this.El,
          0 | l,
          0 | f
        )),
        ({ h: h, l: d } = br.default.add(
          0 | this.Fh,
          0 | this.Fl,
          0 | h,
          0 | d
        )),
        ({ h: p, l: y } = br.default.add(
          0 | this.Gh,
          0 | this.Gl,
          0 | p,
          0 | y
        )),
        ({ h: b, l: g } = br.default.add(
          0 | this.Hh,
          0 | this.Hl,
          0 | b,
          0 | g
        )),
        this.set(n, r, o, i, s, a, c, u, l, f, h, d, p, y, b, g);
    }
    roundClean() {
      mr.fill(0), _r.fill(0);
    }
    destroy() {
      this.buffer.fill(0),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  dr.SHA512 = xr;
  class Er extends xr {
    constructor() {
      super(),
        (this.Ah = -1942145080),
        (this.Al = 424955298),
        (this.Bh = 1944164710),
        (this.Bl = -1982016298),
        (this.Ch = 502970286),
        (this.Cl = 855612546),
        (this.Dh = 1738396948),
        (this.Dl = 1479516111),
        (this.Eh = 258812777),
        (this.El = 2077511080),
        (this.Fh = 2011393907),
        (this.Fl = 79989058),
        (this.Gh = 1067287976),
        (this.Gl = 1780299464),
        (this.Hh = 286451373),
        (this.Hl = -1848208735),
        (this.outputLen = 28);
    }
  }
  class kr extends xr {
    constructor() {
      super(),
        (this.Ah = 573645204),
        (this.Al = -64227540),
        (this.Bh = -1621794909),
        (this.Bl = -934517566),
        (this.Ch = 596883563),
        (this.Cl = 1867755857),
        (this.Dh = -1774684391),
        (this.Dl = 1497426621),
        (this.Eh = -1775747358),
        (this.El = -1467023389),
        (this.Fh = -1101128155),
        (this.Fl = 1401305490),
        (this.Gh = 721525244),
        (this.Gl = 746961066),
        (this.Hh = 246885852),
        (this.Hl = -2117784414),
        (this.outputLen = 32);
    }
  }
  class Sr extends xr {
    constructor() {
      super(),
        (this.Ah = -876896931),
        (this.Al = -1056596264),
        (this.Bh = 1654270250),
        (this.Bl = 914150663),
        (this.Ch = -1856437926),
        (this.Cl = 812702999),
        (this.Dh = 355462360),
        (this.Dl = -150054599),
        (this.Eh = 1731405415),
        (this.El = -4191439),
        (this.Fh = -1900787065),
        (this.Fl = 1750603025),
        (this.Gh = -619958771),
        (this.Gl = 1694076839),
        (this.Hh = 1203062813),
        (this.Hl = -1090891868),
        (this.outputLen = 48);
    }
  }
  (dr.sha512 = (0, gr.wrapConstructor)(() => new xr())),
    (dr.sha512_224 = (0, gr.wrapConstructor)(() => new Er())),
    (dr.sha512_256 = (0, gr.wrapConstructor)(() => new kr())),
    (dr.sha384 = (0, gr.wrapConstructor)(() => new Sr()));
  var Ar = {};
  !(function (e) {
    function t(e) {
      if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`);
    }
    function n(...e) {
      const t = (e, t) => (n) => e(t(n));
      return {
        encode: Array.from(e)
          .reverse()
          .reduce((e, n) => (e ? t(e, n.encode) : n.encode), void 0),
        decode: e.reduce((e, n) => (e ? t(e, n.decode) : n.decode), void 0),
      };
    }
    function r(e) {
      return {
        encode: (n) => {
          if (!Array.isArray(n) || (n.length && "number" != typeof n[0]))
            throw new Error(
              "alphabet.encode input should be an array of numbers"
            );
          return n.map((n) => {
            if ((t(n), n < 0 || n >= e.length))
              throw new Error(
                `Digit index outside alphabet: ${n} (alphabet: ${e.length})`
              );
            return e[n];
          });
        },
        decode: (t) => {
          if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
            throw new Error("alphabet.decode input should be array of strings");
          return t.map((t) => {
            if ("string" != typeof t)
              throw new Error(`alphabet.decode: not string element=${t}`);
            const n = e.indexOf(t);
            if (-1 === n)
              throw new Error(`Unknown letter: "${t}". Allowed: ${e}`);
            return n;
          });
        },
      };
    }
    function o(e = "") {
      if ("string" != typeof e)
        throw new Error("join separator should be string");
      return {
        encode: (t) => {
          if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
            throw new Error("join.encode input should be array of strings");
          for (let e of t)
            if ("string" != typeof e)
              throw new Error(`join.encode: non-string input=${e}`);
          return t.join(e);
        },
        decode: (t) => {
          if ("string" != typeof t)
            throw new Error("join.decode input should be string");
          return t.split(e);
        },
      };
    }
    function i(e, n = "=") {
      if ((t(e), "string" != typeof n))
        throw new Error("padding chr should be string");
      return {
        encode(t) {
          if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
            throw new Error("padding.encode input should be array of strings");
          for (let e of t)
            if ("string" != typeof e)
              throw new Error(`padding.encode: non-string input=${e}`);
          for (; (t.length * e) % 8; ) t.push(n);
          return t;
        },
        decode(t) {
          if (!Array.isArray(t) || (t.length && "string" != typeof t[0]))
            throw new Error("padding.encode input should be array of strings");
          for (let e of t)
            if ("string" != typeof e)
              throw new Error(`padding.decode: non-string input=${e}`);
          let r = t.length;
          if ((r * e) % 8)
            throw new Error(
              "Invalid padding: string should have whole number of bytes"
            );
          for (; r > 0 && t[r - 1] === n; r--)
            if (!(((r - 1) * e) % 8))
              throw new Error("Invalid padding: string has too much padding");
          return t.slice(0, r);
        },
      };
    }
    function s(e) {
      if ("function" != typeof e)
        throw new Error("normalize fn should be function");
      return { encode: (e) => e, decode: (t) => e(t) };
    }
    function a(e, n, r) {
      if (n < 2)
        throw new Error(
          `convertRadix: wrong from=${n}, base cannot be less than 2`
        );
      if (r < 2)
        throw new Error(
          `convertRadix: wrong to=${r}, base cannot be less than 2`
        );
      if (!Array.isArray(e))
        throw new Error("convertRadix: data should be array");
      if (!e.length) return [];
      let o = 0;
      const i = [],
        s = Array.from(e);
      for (
        s.forEach((e) => {
          if ((t(e), e < 0 || e >= n)) throw new Error(`Wrong integer: ${e}`);
        });
        ;

      ) {
        let e = 0,
          t = !0;
        for (let i = o; i < s.length; i++) {
          const a = s[i],
            c = n * e + a;
          if (!Number.isSafeInteger(c) || (n * e) / n !== e || c - a != n * e)
            throw new Error("convertRadix: carry overflow");
          if (
            ((e = c % r),
            (s[i] = Math.floor(c / r)),
            !Number.isSafeInteger(s[i]) || s[i] * r + e !== c)
          )
            throw new Error("convertRadix: carry overflow");
          t && (s[i] ? (t = !1) : (o = i));
        }
        if ((i.push(e), t)) break;
      }
      for (let t = 0; t < e.length - 1 && 0 === e[t]; t++) i.push(0);
      return i.reverse();
    }
    /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bytes =
        e.stringToBytes =
        e.str =
        e.bytesToString =
        e.hex =
        e.utf8 =
        e.bech32m =
        e.bech32 =
        e.base58check =
        e.base58xmr =
        e.base58xrp =
        e.base58flickr =
        e.base58 =
        e.base64url =
        e.base64 =
        e.base32crockford =
        e.base32hex =
        e.base32 =
        e.base16 =
        e.utils =
        e.assertNumber =
          void 0),
      (e.assertNumber = t);
    const c = (e, t) => (t ? c(t, e % t) : e),
      u = (e, t) => e + (t - c(e, t));
    function l(e, n, r, o) {
      if (!Array.isArray(e))
        throw new Error("convertRadix2: data should be array");
      if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong from=${n}`);
      if (r <= 0 || r > 32) throw new Error(`convertRadix2: wrong to=${r}`);
      if (u(n, r) > 32)
        throw new Error(
          `convertRadix2: carry overflow from=${n} to=${r} carryBits=${u(n, r)}`
        );
      let i = 0,
        s = 0;
      const a = 2 ** r - 1,
        c = [];
      for (const o of e) {
        if ((t(o), o >= 2 ** n))
          throw new Error(`convertRadix2: invalid data word=${o} from=${n}`);
        if (((i = (i << n) | o), s + n > 32))
          throw new Error(`convertRadix2: carry overflow pos=${s} from=${n}`);
        for (s += n; s >= r; s -= r) c.push(((i >> (s - r)) & a) >>> 0);
        i &= 2 ** s - 1;
      }
      if (((i = (i << (r - s)) & a), !o && s >= n))
        throw new Error("Excess padding");
      if (!o && i) throw new Error(`Non-zero padding: ${i}`);
      return o && s > 0 && c.push(i >>> 0), c;
    }
    function f(e) {
      return (
        t(e),
        {
          encode: (t) => {
            if (!(t instanceof Uint8Array))
              throw new Error("radix.encode input should be Uint8Array");
            return a(Array.from(t), 256, e);
          },
          decode: (t) => {
            if (!Array.isArray(t) || (t.length && "number" != typeof t[0]))
              throw new Error("radix.decode input should be array of strings");
            return Uint8Array.from(a(t, e, 256));
          },
        }
      );
    }
    function h(e, n = !1) {
      if ((t(e), e <= 0 || e > 32))
        throw new Error("radix2: bits should be in (0..32]");
      if (u(8, e) > 32 || u(e, 8) > 32)
        throw new Error("radix2: carry overflow");
      return {
        encode: (t) => {
          if (!(t instanceof Uint8Array))
            throw new Error("radix2.encode input should be Uint8Array");
          return l(Array.from(t), 8, e, !n);
        },
        decode: (t) => {
          if (!Array.isArray(t) || (t.length && "number" != typeof t[0]))
            throw new Error("radix2.decode input should be array of strings");
          return Uint8Array.from(l(t, e, 8, n));
        },
      };
    }
    function d(e) {
      if ("function" != typeof e)
        throw new Error("unsafeWrapper fn should be function");
      return function (...t) {
        try {
          return e.apply(null, t);
        } catch (e) {}
      };
    }
    function p(e, n) {
      if ((t(e), "function" != typeof n))
        throw new Error("checksum fn should be function");
      return {
        encode(t) {
          if (!(t instanceof Uint8Array))
            throw new Error("checksum.encode: input should be Uint8Array");
          const r = n(t).slice(0, e),
            o = new Uint8Array(t.length + e);
          return o.set(t), o.set(r, t.length), o;
        },
        decode(t) {
          if (!(t instanceof Uint8Array))
            throw new Error("checksum.decode: input should be Uint8Array");
          const r = t.slice(0, -e),
            o = n(r).slice(0, e),
            i = t.slice(-e);
          for (let t = 0; t < e; t++)
            if (o[t] !== i[t]) throw new Error("Invalid checksum");
          return r;
        },
      };
    }
    (e.utils = {
      alphabet: r,
      chain: n,
      checksum: p,
      radix: f,
      radix2: h,
      join: o,
      padding: i,
    }),
      (e.base16 = n(h(4), r("0123456789ABCDEF"), o(""))),
      (e.base32 = n(h(5), r("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), i(5), o(""))),
      (e.base32hex = n(
        h(5),
        r("0123456789ABCDEFGHIJKLMNOPQRSTUV"),
        i(5),
        o("")
      )),
      (e.base32crockford = n(
        h(5),
        r("0123456789ABCDEFGHJKMNPQRSTVWXYZ"),
        o(""),
        s((e) => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1"))
      )),
      (e.base64 = n(
        h(6),
        r("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
        i(6),
        o("")
      )),
      (e.base64url = n(
        h(6),
        r("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"),
        i(6),
        o("")
      ));
    const y = (e) => n(f(58), r(e), o(""));
    (e.base58 = y(
      "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    )),
      (e.base58flickr = y(
        "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
      )),
      (e.base58xrp = y(
        "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"
      ));
    const b = [0, 2, 3, 5, 6, 7, 9, 10, 11];
    e.base58xmr = {
      encode(t) {
        let n = "";
        for (let r = 0; r < t.length; r += 8) {
          const o = t.subarray(r, r + 8);
          n += e.base58.encode(o).padStart(b[o.length], "1");
        }
        return n;
      },
      decode(t) {
        let n = [];
        for (let r = 0; r < t.length; r += 11) {
          const o = t.slice(r, r + 11),
            i = b.indexOf(o.length),
            s = e.base58.decode(o);
          for (let e = 0; e < s.length - i; e++)
            if (0 !== s[e]) throw new Error("base58xmr: wrong padding");
          n = n.concat(Array.from(s.slice(s.length - i)));
        }
        return Uint8Array.from(n);
      },
    };
    e.base58check = (t) =>
      n(
        p(4, (e) => t(t(e))),
        e.base58
      );
    const g = n(r("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), o("")),
      w = [996825010, 642813549, 513874426, 1027748829, 705979059];
    function v(e) {
      const t = e >> 25;
      let n = (33554431 & e) << 5;
      for (let e = 0; e < w.length; e++) 1 == ((t >> e) & 1) && (n ^= w[e]);
      return n;
    }
    function m(e, t, n = 1) {
      const r = e.length;
      let o = 1;
      for (let t = 0; t < r; t++) {
        const n = e.charCodeAt(t);
        if (n < 33 || n > 126) throw new Error(`Invalid prefix (${e})`);
        o = v(o) ^ (n >> 5);
      }
      o = v(o);
      for (let t = 0; t < r; t++) o = v(o) ^ (31 & e.charCodeAt(t));
      for (let e of t) o = v(o) ^ e;
      for (let e = 0; e < 6; e++) o = v(o);
      return (o ^= n), g.encode(l([o % 2 ** 30], 30, 5, !1));
    }
    function _(e) {
      const t = "bech32" === e ? 1 : 734539939,
        n = h(5),
        r = n.decode,
        o = n.encode,
        i = d(r);
      function s(e, n = 90) {
        if ("string" != typeof e)
          throw new Error(
            "bech32.decode input should be string, not " + typeof e
          );
        if (e.length < 8 || (!1 !== n && e.length > n))
          throw new TypeError(
            `Wrong string length: ${e.length} (${e}). Expected (8..${n})`
          );
        const r = e.toLowerCase();
        if (e !== r && e !== e.toUpperCase())
          throw new Error("String must be lowercase or uppercase");
        const o = (e = r).lastIndexOf("1");
        if (0 === o || -1 === o)
          throw new Error(
            'Letter "1" must be present between prefix and data only'
          );
        const i = e.slice(0, o),
          s = e.slice(o + 1);
        if (s.length < 6)
          throw new Error("Data must be at least 6 characters long");
        const a = g.decode(s).slice(0, -6),
          c = m(i, a, t);
        if (!s.endsWith(c))
          throw new Error(`Invalid checksum in ${e}: expected "${c}"`);
        return { prefix: i, words: a };
      }
      return {
        encode: function (e, n, r = 90) {
          if ("string" != typeof e)
            throw new Error(
              "bech32.encode prefix should be string, not " + typeof e
            );
          if (!Array.isArray(n) || (n.length && "number" != typeof n[0]))
            throw new Error(
              "bech32.encode words should be array of numbers, not " + typeof n
            );
          const o = e.length + 7 + n.length;
          if (!1 !== r && o > r)
            throw new TypeError(`Length ${o} exceeds limit ${r}`);
          return `${(e = e.toLowerCase())}1${g.encode(n)}${m(e, n, t)}`;
        },
        decode: s,
        decodeToBytes: function (e) {
          const { prefix: t, words: n } = s(e, !1);
          return { prefix: t, words: n, bytes: r(n) };
        },
        decodeUnsafe: d(s),
        fromWords: r,
        fromWordsUnsafe: i,
        toWords: o,
      };
    }
    (e.bech32 = _("bech32")),
      (e.bech32m = _("bech32m")),
      (e.utf8 = {
        encode: (e) => new TextDecoder().decode(e),
        decode: (e) => new TextEncoder().encode(e),
      }),
      (e.hex = n(
        h(4),
        r("0123456789abcdef"),
        o(""),
        s((e) => {
          if ("string" != typeof e || e.length % 2)
            throw new TypeError(
              `hex.decode: expected string, got ${typeof e} with length ${
                e.length
              }`
            );
          return e.toLowerCase();
        })
      ));
    const x = {
        utf8: e.utf8,
        hex: e.hex,
        base16: e.base16,
        base32: e.base32,
        base64: e.base64,
        base64url: e.base64url,
        base58: e.base58,
        base58xmr: e.base58xmr,
      },
      E = `Invalid encoding type. Available types: ${Object.keys(x).join(
        ", "
      )}`;
    (e.bytesToString = (e, t) => {
      if ("string" != typeof e || !x.hasOwnProperty(e)) throw new TypeError(E);
      if (!(t instanceof Uint8Array))
        throw new TypeError("bytesToString() expects Uint8Array");
      return x[e].encode(t);
    }),
      (e.str = e.bytesToString);
    (e.stringToBytes = (e, t) => {
      if (!x.hasOwnProperty(e)) throw new TypeError(E);
      if ("string" != typeof t)
        throw new TypeError("stringToBytes() expects string");
      return x[e].decode(t);
    }),
      (e.bytes = e.stringToBytes);
  })(Ar),
    Object.defineProperty(Un, "__esModule", { value: !0 });
  var Or =
    (Un.mnemonicToSeedSync =
    Un.mnemonicToSeed =
    Dr =
    Un.validateMnemonic =
    Un.entropyToMnemonic =
    Un.mnemonicToEntropy =
    Nr =
    Un.generateMnemonic =
      void 0);
  /*! scure-bip39 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */ const Cr =
      Nn,
    Pr = Gn,
    Ir = tr,
    Tr = dr,
    Lr = Vn,
    Br = Ar,
    Rr = (e) => "あいこくしん" === e[0];
  function $r(e) {
    if ("string" != typeof e)
      throw new TypeError("Invalid mnemonic type: " + typeof e);
    return e.normalize("NFKD");
  }
  function jr(e) {
    const t = $r(e),
      n = t.split(" ");
    if (![12, 15, 18, 21, 24].includes(n.length))
      throw new Error("Invalid mnemonic");
    return { nfkd: t, words: n };
  }
  function Ur(e) {
    Cr.default.bytes(e, 16, 20, 24, 28, 32);
  }
  var Nr = (Un.generateMnemonic = function (e, t = 128) {
    if ((Cr.default.number(t), t % 32 != 0 || t > 256))
      throw new TypeError("Invalid entropy");
    return Fr((0, Lr.randomBytes)(t / 8), e);
  });
  const Hr = (e) => {
    const t = 8 - e.length / 4;
    return new Uint8Array([((0, Ir.sha256)(e)[0] >> t) << t]);
  };
  function qr(e) {
    if (!Array.isArray(e) || 2048 !== e.length || "string" != typeof e[0])
      throw new Error("Worlist: expected array of 2048 strings");
    return (
      e.forEach((e) => {
        if ("string" != typeof e)
          throw new Error(`Wordlist: non-string element: ${e}`);
      }),
      Br.utils.chain(
        Br.utils.checksum(1, Hr),
        Br.utils.radix2(11, !0),
        Br.utils.alphabet(e)
      )
    );
  }
  function Mr(e, t) {
    const { words: n } = jr(e),
      r = qr(t).decode(n);
    return Ur(r), r;
  }
  function Fr(e, t) {
    Ur(e);
    return qr(t)
      .encode(e)
      .join(Rr(t) ? "　" : " ");
  }
  (Un.mnemonicToEntropy = Mr), (Un.entropyToMnemonic = Fr);
  var Dr = (Un.validateMnemonic = function (e, t) {
    try {
      Mr(e, t);
    } catch (e) {
      return !1;
    }
    return !0;
  });
  const zr = (e) => $r(`mnemonic${e}`);
  (Un.mnemonicToSeed = function (e, t = "") {
    return (0, Pr.pbkdf2Async)(Tr.sha512, jr(e).nfkd, zr(t), {
      c: 2048,
      dkLen: 64,
    });
  }),
    (Or = Un.mnemonicToSeedSync =
      function (e, t = "") {
        return (0, Pr.pbkdf2)(Tr.sha512, jr(e).nfkd, zr(t), {
          c: 2048,
          dkLen: 64,
        });
      });
  const Kr = new Uint8Array([
      7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    ]),
    Gr = Uint8Array.from({ length: 16 }, (e, t) => t),
    Wr = Gr.map((e) => (9 * e + 5) % 16);
  let Vr = [Gr],
    Yr = [Wr];
  for (let e = 0; e < 4; e++)
    for (let t of [Vr, Yr]) t.push(t[e].map((e) => Kr[e]));
  const Zr = [
      [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
      [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
      [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
      [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
      [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5],
    ].map((e) => new Uint8Array(e)),
    Jr = Vr.map((e, t) => e.map((e) => Zr[t][e])),
    Qr = Yr.map((e, t) => e.map((e) => Zr[t][e])),
    Xr = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
    eo = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]),
    to = (e, t) => (e << t) | (e >>> (32 - t));
  function no(e, t, n, r) {
    return 0 === e
      ? t ^ n ^ r
      : 1 === e
      ? (t & n) | (~t & r)
      : 2 === e
      ? (t | ~n) ^ r
      : 3 === e
      ? (t & r) | (n & ~r)
      : t ^ (n | ~r);
  }
  const ro = new Uint32Array(16);
  class oo extends Se {
    constructor() {
      super(64, 20, 8, !0),
        (this.h0 = 1732584193),
        (this.h1 = -271733879),
        (this.h2 = -1732584194),
        (this.h3 = 271733878),
        (this.h4 = -1009589776);
    }
    get() {
      const { h0: e, h1: t, h2: n, h3: r, h4: o } = this;
      return [e, t, n, r, o];
    }
    set(e, t, n, r, o) {
      (this.h0 = 0 | e),
        (this.h1 = 0 | t),
        (this.h2 = 0 | n),
        (this.h3 = 0 | r),
        (this.h4 = 0 | o);
    }
    process(e, t) {
      for (let n = 0; n < 16; n++, t += 4) ro[n] = e.getUint32(t, !0);
      let n = 0 | this.h0,
        r = n,
        o = 0 | this.h1,
        i = o,
        s = 0 | this.h2,
        a = s,
        c = 0 | this.h3,
        u = c,
        l = 0 | this.h4,
        f = l;
      for (let e = 0; e < 5; e++) {
        const t = 4 - e,
          h = Xr[e],
          d = eo[e],
          p = Vr[e],
          y = Yr[e],
          b = Jr[e],
          g = Qr[e];
        for (let t = 0; t < 16; t++) {
          const r = (to(n + no(e, o, s, c) + ro[p[t]] + h, b[t]) + l) | 0;
          (n = l), (l = c), (c = 0 | to(s, 10)), (s = o), (o = r);
        }
        for (let e = 0; e < 16; e++) {
          const n = (to(r + no(t, i, a, u) + ro[y[e]] + d, g[e]) + f) | 0;
          (r = f), (f = u), (u = 0 | to(a, 10)), (a = i), (i = n);
        }
      }
      this.set(
        (this.h1 + s + u) | 0,
        (this.h2 + c + f) | 0,
        (this.h3 + l + r) | 0,
        (this.h4 + n + i) | 0,
        (this.h0 + o + a) | 0
      );
    }
    roundClean() {
      ro.fill(0);
    }
    destroy() {
      (this.destroyed = !0), this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
    }
  }
  const io = Ee(() => new oo()),
    so = BigInt(2 ** 32 - 1),
    ao = BigInt(32);
  function co(e, t = !1) {
    return t
      ? { h: Number(e & so), l: Number((e >> ao) & so) }
      : { h: 0 | Number((e >> ao) & so), l: 0 | Number(e & so) };
  }
  const uo = {
      fromBig: co,
      split: function (e, t = !1) {
        let n = new Uint32Array(e.length),
          r = new Uint32Array(e.length);
        for (let o = 0; o < e.length; o++) {
          const { h: i, l: s } = co(e[o], t);
          [n[o], r[o]] = [i, s];
        }
        return [n, r];
      },
      toBig: (e, t) => (BigInt(e >>> 0) << ao) | BigInt(t >>> 0),
      shrSH: (e, t, n) => e >>> n,
      shrSL: (e, t, n) => (e << (32 - n)) | (t >>> n),
      rotrSH: (e, t, n) => (e >>> n) | (t << (32 - n)),
      rotrSL: (e, t, n) => (e << (32 - n)) | (t >>> n),
      rotrBH: (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
      rotrBL: (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
      rotr32H: (e, t) => t,
      rotr32L: (e, t) => e,
      rotlSH: (e, t, n) => (e << n) | (t >>> (32 - n)),
      rotlSL: (e, t, n) => (t << n) | (e >>> (32 - n)),
      rotlBH: (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
      rotlBL: (e, t, n) => (e << (n - 32)) | (t >>> (64 - n)),
      add: function (e, t, n, r) {
        const o = (t >>> 0) + (r >>> 0);
        return { h: (e + n + ((o / 2 ** 32) | 0)) | 0, l: 0 | o };
      },
      add3L: (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
      add3H: (e, t, n, r) => (t + n + r + ((e / 2 ** 32) | 0)) | 0,
      add4L: (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
      add4H: (e, t, n, r, o) => (t + n + r + o + ((e / 2 ** 32) | 0)) | 0,
      add5H: (e, t, n, r, o, i) =>
        (t + n + r + o + i + ((e / 2 ** 32) | 0)) | 0,
      add5L: (e, t, n, r, o) =>
        (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0),
    },
    [lo, fo] = uo.split(
      [
        "0x428a2f98d728ae22",
        "0x7137449123ef65cd",
        "0xb5c0fbcfec4d3b2f",
        "0xe9b5dba58189dbbc",
        "0x3956c25bf348b538",
        "0x59f111f1b605d019",
        "0x923f82a4af194f9b",
        "0xab1c5ed5da6d8118",
        "0xd807aa98a3030242",
        "0x12835b0145706fbe",
        "0x243185be4ee4b28c",
        "0x550c7dc3d5ffb4e2",
        "0x72be5d74f27b896f",
        "0x80deb1fe3b1696b1",
        "0x9bdc06a725c71235",
        "0xc19bf174cf692694",
        "0xe49b69c19ef14ad2",
        "0xefbe4786384f25e3",
        "0x0fc19dc68b8cd5b5",
        "0x240ca1cc77ac9c65",
        "0x2de92c6f592b0275",
        "0x4a7484aa6ea6e483",
        "0x5cb0a9dcbd41fbd4",
        "0x76f988da831153b5",
        "0x983e5152ee66dfab",
        "0xa831c66d2db43210",
        "0xb00327c898fb213f",
        "0xbf597fc7beef0ee4",
        "0xc6e00bf33da88fc2",
        "0xd5a79147930aa725",
        "0x06ca6351e003826f",
        "0x142929670a0e6e70",
        "0x27b70a8546d22ffc",
        "0x2e1b21385c26c926",
        "0x4d2c6dfc5ac42aed",
        "0x53380d139d95b3df",
        "0x650a73548baf63de",
        "0x766a0abb3c77b2a8",
        "0x81c2c92e47edaee6",
        "0x92722c851482353b",
        "0xa2bfe8a14cf10364",
        "0xa81a664bbc423001",
        "0xc24b8b70d0f89791",
        "0xc76c51a30654be30",
        "0xd192e819d6ef5218",
        "0xd69906245565a910",
        "0xf40e35855771202a",
        "0x106aa07032bbd1b8",
        "0x19a4c116b8d2d0c8",
        "0x1e376c085141ab53",
        "0x2748774cdf8eeb99",
        "0x34b0bcb5e19b48a8",
        "0x391c0cb3c5c95a63",
        "0x4ed8aa4ae3418acb",
        "0x5b9cca4f7763e373",
        "0x682e6ff3d6b2b8a3",
        "0x748f82ee5defb2fc",
        "0x78a5636f43172f60",
        "0x84c87814a1f0ab72",
        "0x8cc702081a6439ec",
        "0x90befffa23631e28",
        "0xa4506cebde82bde9",
        "0xbef9a3f7b2c67915",
        "0xc67178f2e372532b",
        "0xca273eceea26619c",
        "0xd186b8c721c0c207",
        "0xeada7dd6cde0eb1e",
        "0xf57d4f7fee6ed178",
        "0x06f067aa72176fba",
        "0x0a637dc5a2c898a6",
        "0x113f9804bef90dae",
        "0x1b710b35131c471b",
        "0x28db77f523047d84",
        "0x32caab7b40c72493",
        "0x3c9ebe0a15c9bebc",
        "0x431d67c49c100d4c",
        "0x4cc5d4becb3e42b6",
        "0x597f299cfc657e2a",
        "0x5fcb6fab3ad6faec",
        "0x6c44198c4a475817",
      ].map((e) => BigInt(e))
    ),
    ho = new Uint32Array(80),
    po = new Uint32Array(80);
  class yo extends Se {
    constructor() {
      super(128, 64, 16, !1),
        (this.Ah = 1779033703),
        (this.Al = -205731576),
        (this.Bh = -1150833019),
        (this.Bl = -2067093701),
        (this.Ch = 1013904242),
        (this.Cl = -23791573),
        (this.Dh = -1521486534),
        (this.Dl = 1595750129),
        (this.Eh = 1359893119),
        (this.El = -1377402159),
        (this.Fh = -1694144372),
        (this.Fl = 725511199),
        (this.Gh = 528734635),
        (this.Gl = -79577749),
        (this.Hh = 1541459225),
        (this.Hl = 327033209);
    }
    get() {
      const {
        Ah: e,
        Al: t,
        Bh: n,
        Bl: r,
        Ch: o,
        Cl: i,
        Dh: s,
        Dl: a,
        Eh: c,
        El: u,
        Fh: l,
        Fl: f,
        Gh: h,
        Gl: d,
        Hh: p,
        Hl: y,
      } = this;
      return [e, t, n, r, o, i, s, a, c, u, l, f, h, d, p, y];
    }
    set(e, t, n, r, o, i, s, a, c, u, l, f, h, d, p, y) {
      (this.Ah = 0 | e),
        (this.Al = 0 | t),
        (this.Bh = 0 | n),
        (this.Bl = 0 | r),
        (this.Ch = 0 | o),
        (this.Cl = 0 | i),
        (this.Dh = 0 | s),
        (this.Dl = 0 | a),
        (this.Eh = 0 | c),
        (this.El = 0 | u),
        (this.Fh = 0 | l),
        (this.Fl = 0 | f),
        (this.Gh = 0 | h),
        (this.Gl = 0 | d),
        (this.Hh = 0 | p),
        (this.Hl = 0 | y);
    }
    process(e, t) {
      for (let n = 0; n < 16; n++, t += 4)
        (ho[n] = e.getUint32(t)), (po[n] = e.getUint32((t += 4)));
      for (let e = 16; e < 80; e++) {
        const t = 0 | ho[e - 15],
          n = 0 | po[e - 15],
          r = uo.rotrSH(t, n, 1) ^ uo.rotrSH(t, n, 8) ^ uo.shrSH(t, n, 7),
          o = uo.rotrSL(t, n, 1) ^ uo.rotrSL(t, n, 8) ^ uo.shrSL(t, n, 7),
          i = 0 | ho[e - 2],
          s = 0 | po[e - 2],
          a = uo.rotrSH(i, s, 19) ^ uo.rotrBH(i, s, 61) ^ uo.shrSH(i, s, 6),
          c = uo.rotrSL(i, s, 19) ^ uo.rotrBL(i, s, 61) ^ uo.shrSL(i, s, 6),
          u = uo.add4L(o, c, po[e - 7], po[e - 16]),
          l = uo.add4H(u, r, a, ho[e - 7], ho[e - 16]);
        (ho[e] = 0 | l), (po[e] = 0 | u);
      }
      let {
        Ah: n,
        Al: r,
        Bh: o,
        Bl: i,
        Ch: s,
        Cl: a,
        Dh: c,
        Dl: u,
        Eh: l,
        El: f,
        Fh: h,
        Fl: d,
        Gh: p,
        Gl: y,
        Hh: b,
        Hl: g,
      } = this;
      for (let e = 0; e < 80; e++) {
        const t =
            uo.rotrSH(l, f, 14) ^ uo.rotrSH(l, f, 18) ^ uo.rotrBH(l, f, 41),
          w = uo.rotrSL(l, f, 14) ^ uo.rotrSL(l, f, 18) ^ uo.rotrBL(l, f, 41),
          v = (l & h) ^ (~l & p),
          m = (f & d) ^ (~f & y),
          _ = uo.add5L(g, w, m, fo[e], po[e]),
          x = uo.add5H(_, b, t, v, lo[e], ho[e]),
          E = 0 | _,
          k = uo.rotrSH(n, r, 28) ^ uo.rotrBH(n, r, 34) ^ uo.rotrBH(n, r, 39),
          S = uo.rotrSL(n, r, 28) ^ uo.rotrBL(n, r, 34) ^ uo.rotrBL(n, r, 39),
          A = (n & o) ^ (n & s) ^ (o & s),
          O = (r & i) ^ (r & a) ^ (i & a);
        (b = 0 | p),
          (g = 0 | y),
          (p = 0 | h),
          (y = 0 | d),
          (h = 0 | l),
          (d = 0 | f),
          ({ h: l, l: f } = uo.add(0 | c, 0 | u, 0 | x, 0 | E)),
          (c = 0 | s),
          (u = 0 | a),
          (s = 0 | o),
          (a = 0 | i),
          (o = 0 | n),
          (i = 0 | r);
        const C = uo.add3L(E, S, O);
        (n = uo.add3H(C, x, k, A)), (r = 0 | C);
      }
      ({ h: n, l: r } = uo.add(0 | this.Ah, 0 | this.Al, 0 | n, 0 | r)),
        ({ h: o, l: i } = uo.add(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | i)),
        ({ h: s, l: a } = uo.add(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | a)),
        ({ h: c, l: u } = uo.add(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | u)),
        ({ h: l, l: f } = uo.add(0 | this.Eh, 0 | this.El, 0 | l, 0 | f)),
        ({ h: h, l: d } = uo.add(0 | this.Fh, 0 | this.Fl, 0 | h, 0 | d)),
        ({ h: p, l: y } = uo.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | y)),
        ({ h: b, l: g } = uo.add(0 | this.Hh, 0 | this.Hl, 0 | b, 0 | g)),
        this.set(n, r, o, i, s, a, c, u, l, f, h, d, p, y, b, g);
    }
    roundClean() {
      ho.fill(0), po.fill(0);
    }
    destroy() {
      this.buffer.fill(0),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  class bo extends yo {
    constructor() {
      super(),
        (this.Ah = -1942145080),
        (this.Al = 424955298),
        (this.Bh = 1944164710),
        (this.Bl = -1982016298),
        (this.Ch = 502970286),
        (this.Cl = 855612546),
        (this.Dh = 1738396948),
        (this.Dl = 1479516111),
        (this.Eh = 258812777),
        (this.El = 2077511080),
        (this.Fh = 2011393907),
        (this.Fl = 79989058),
        (this.Gh = 1067287976),
        (this.Gl = 1780299464),
        (this.Hh = 286451373),
        (this.Hl = -1848208735),
        (this.outputLen = 28);
    }
  }
  class go extends yo {
    constructor() {
      super(),
        (this.Ah = 573645204),
        (this.Al = -64227540),
        (this.Bh = -1621794909),
        (this.Bl = -934517566),
        (this.Ch = 596883563),
        (this.Cl = 1867755857),
        (this.Dh = -1774684391),
        (this.Dl = 1497426621),
        (this.Eh = -1775747358),
        (this.El = -1467023389),
        (this.Fh = -1101128155),
        (this.Fl = 1401305490),
        (this.Gh = 721525244),
        (this.Gl = 746961066),
        (this.Hh = 246885852),
        (this.Hl = -2117784414),
        (this.outputLen = 32);
    }
  }
  class wo extends yo {
    constructor() {
      super(),
        (this.Ah = -876896931),
        (this.Al = -1056596264),
        (this.Bh = 1654270250),
        (this.Bl = 914150663),
        (this.Ch = -1856437926),
        (this.Cl = 812702999),
        (this.Dh = 355462360),
        (this.Dl = -150054599),
        (this.Eh = 1731405415),
        (this.El = -4191439),
        (this.Fh = -1900787065),
        (this.Fl = 1750603025),
        (this.Gh = -619958771),
        (this.Gl = 1694076839),
        (this.Hh = 1203062813),
        (this.Hl = -1090891868),
        (this.outputLen = 48);
    }
  }
  const vo = Ee(() => new yo());
  Ee(() => new bo()), Ee(() => new go()), Ee(() => new wo());
  const mo = qt.ProjectivePoint,
    _o = ((e) =>
      an(
        (function (e, t) {
          if ((sn(e), "function" != typeof t))
            throw new Error("checksum fn should be function");
          return {
            encode(n) {
              if (!(n instanceof Uint8Array))
                throw new Error("checksum.encode: input should be Uint8Array");
              const r = t(n).slice(0, e),
                o = new Uint8Array(n.length + e);
              return o.set(n), o.set(r, n.length), o;
            },
            decode(n) {
              if (!(n instanceof Uint8Array))
                throw new Error("checksum.decode: input should be Uint8Array");
              const r = n.slice(0, -e),
                o = t(r).slice(0, e),
                i = n.slice(-e);
              for (let t = 0; t < e; t++)
                if (o[t] !== i[t]) throw new Error("Invalid checksum");
              return r;
            },
          };
        })(4, (t) => e(e(t))),
        En
      ))(Le);
  function xo(e) {
    return BigInt(`0x${ge(e)}`);
  }
  const Eo = ve("Bitcoin seed"),
    ko = { private: 76066276, public: 76067358 },
    So = 2147483648,
    Ao = (e) => {
      if (!Number.isSafeInteger(e) || e < 0 || e > 2 ** 32 - 1)
        throw new Error(`Invalid number=${e}. Should be from 0 to 2 ** 32 - 1`);
      const t = new Uint8Array(4);
      return pe(t).setUint32(0, e, !1), t;
    };
  class Oo {
    get fingerprint() {
      if (!this.pubHash) throw new Error("No publicKey set!");
      return (e = this.pubHash), pe(e).getUint32(0, !1);
      var e;
    }
    get identifier() {
      return this.pubHash;
    }
    get pubKeyHash() {
      return this.pubHash;
    }
    get privateKey() {
      return this.privKeyBytes || null;
    }
    get publicKey() {
      return this.pubKey || null;
    }
    get privateExtendedKey() {
      const e = this.privateKey;
      if (!e) throw new Error("No private key");
      return _o.encode(
        this.serialize(this.versions.private, _e(new Uint8Array([0]), e))
      );
    }
    get publicExtendedKey() {
      if (!this.pubKey) throw new Error("No public key");
      return _o.encode(this.serialize(this.versions.public, this.pubKey));
    }
    static fromMasterSeed(e, t = ko) {
      if ((fe(e), 8 * e.length < 128 || 8 * e.length > 512))
        throw new Error(
          `HDKey: wrong seed length=${e.length}. Should be between 128 and 512 bits; 256 bits is advised)`
        );
      const n = Tt(vo, Eo, e);
      return new Oo({
        versions: t,
        chainCode: n.slice(32),
        privateKey: n.slice(0, 32),
      });
    }
    static fromExtendedKey(e, t = ko) {
      const n = _o.decode(e),
        r = pe(n),
        o = r.getUint32(0, !1),
        i = {
          versions: t,
          depth: n[4],
          parentFingerprint: r.getUint32(5, !1),
          index: r.getUint32(9, !1),
          chainCode: n.slice(13, 45),
        },
        s = n.slice(45),
        a = 0 === s[0];
      if (o !== t[a ? "private" : "public"])
        throw new Error("Version mismatch");
      return new Oo(
        a ? { ...i, privateKey: s.slice(1) } : { ...i, publicKey: s }
      );
    }
    static fromJSON(e) {
      return Oo.fromExtendedKey(e.xpriv);
    }
    constructor(e) {
      if (
        ((this.depth = 0),
        (this.index = 0),
        (this.chainCode = null),
        (this.parentFingerprint = 0),
        !e || "object" != typeof e)
      )
        throw new Error("HDKey.constructor must not be called directly");
      if (
        ((this.versions = e.versions || ko),
        (this.depth = e.depth || 0),
        (this.chainCode = e.chainCode),
        (this.index = e.index || 0),
        (this.parentFingerprint = e.parentFingerprint || 0),
        !this.depth && (this.parentFingerprint || this.index))
      )
        throw new Error(
          "HDKey: zero depth with non-zero index/parent fingerprint"
        );
      if (e.publicKey && e.privateKey)
        throw new Error("HDKey: publicKey and privateKey at same time.");
      if (e.privateKey) {
        if (!qt.utils.isValidPrivateKey(e.privateKey))
          throw new Error("Invalid private key");
        (this.privKey =
          "bigint" == typeof e.privateKey ? e.privateKey : xo(e.privateKey)),
          (this.privKeyBytes = we(this.privKey.toString(16).padStart(64, "0"))),
          (this.pubKey = qt.getPublicKey(e.privateKey, !0));
      } else {
        if (!e.publicKey)
          throw new Error("HDKey: no public or private key provided");
        this.pubKey = mo.fromHex(e.publicKey).toRawBytes(!0);
      }
      var t;
      this.pubHash = ((t = this.pubKey), io(Le(t)));
    }
    derive(e) {
      if (!/^[mM]'?/.test(e))
        throw new Error('Path must start with "m" or "M"');
      if (/^[mM]'?$/.test(e)) return this;
      const t = e.replace(/^[mM]'?\//, "").split("/");
      let n = this;
      for (const e of t) {
        const t = /^(\d+)('?)$/.exec(e);
        if (!t || 3 !== t.length) throw new Error(`Invalid child index: ${e}`);
        let r = +t[1];
        if (!Number.isSafeInteger(r) || r >= So)
          throw new Error("Invalid index");
        "'" === t[2] && (r += So), (n = n.deriveChild(r));
      }
      return n;
    }
    deriveChild(e) {
      if (!this.pubKey || !this.chainCode)
        throw new Error("No publicKey or chainCode set");
      let t = Ao(e);
      if (e >= So) {
        const e = this.privateKey;
        if (!e) throw new Error("Could not derive hardened child key");
        t = _e(new Uint8Array([0]), e, t);
      } else t = _e(this.pubKey, t);
      const n = Tt(vo, this.chainCode, t),
        r = xo(n.slice(0, 32)),
        o = n.slice(32);
      if (!qt.utils.isValidPrivateKey(r))
        throw new Error("Tweak bigger than curve order");
      const i = {
        versions: this.versions,
        chainCode: o,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint,
        index: e,
      };
      try {
        if (this.privateKey) {
          const e = ut(this.privKey + r, qt.CURVE.n);
          if (!qt.utils.isValidPrivateKey(e))
            throw new Error(
              "The tweak was out of range or the resulted private key is invalid"
            );
          i.privateKey = e;
        } else {
          const e = mo.fromHex(this.pubKey).add(mo.fromPrivateKey(r));
          if (e.equals(mo.ZERO))
            throw new Error(
              "The tweak was equal to negative P, which made the result key invalid"
            );
          i.publicKey = e.toRawBytes(!0);
        }
        return new Oo(i);
      } catch (t) {
        return this.deriveChild(e + 1);
      }
    }
    sign(e) {
      if (!this.privateKey) throw new Error("No privateKey set!");
      return fe(e, 32), qt.sign(e, this.privKey).toCompactRawBytes();
    }
    verify(e, t) {
      if ((fe(e, 32), fe(t, 64), !this.publicKey))
        throw new Error("No publicKey set!");
      let n;
      try {
        n = qt.Signature.fromCompact(t);
      } catch (e) {
        return !1;
      }
      return qt.verify(n, e, this.publicKey);
    }
    wipePrivateData() {
      return (
        (this.privKey = void 0),
        this.privKeyBytes &&
          (this.privKeyBytes.fill(0), (this.privKeyBytes = void 0)),
        this
      );
    }
    toJSON() {
      return { xpriv: this.privateExtendedKey, xpub: this.publicExtendedKey };
    }
    serialize(e, t) {
      if (!this.chainCode) throw new Error("No chainCode set");
      return (
        fe(t, 33),
        _e(
          Ao(e),
          new Uint8Array([this.depth]),
          Ao(this.parentFingerprint),
          Ao(this.index),
          this.chainCode,
          t
        )
      );
    }
  }
  var Co = Object.defineProperty,
    Po = (e, t) => {
      for (var n in t) Co(e, n, { get: t[n], enumerable: !0 });
    };
  function Io() {
    return ge(nn.utils.randomPrivateKey());
  }
  function To(e) {
    return ge(nn.getPublicKey(e));
  }
  Po(
    {},
    {
      MessageNode: () => Uo,
      MessageQueue: () => No,
      insertEventIntoAscendingList: () => jo,
      insertEventIntoDescendingList: () => $o,
      normalizeURL: () => Ro,
      utf8Decoder: () => Lo,
      utf8Encoder: () => Bo,
    }
  );
  var Lo = new TextDecoder("utf-8"),
    Bo = new TextEncoder();
  function Ro(e) {
    let t = new URL(e);
    return (
      (t.pathname = t.pathname.replace(/\/+/g, "/")),
      t.pathname.endsWith("/") && (t.pathname = t.pathname.slice(0, -1)),
      (("80" === t.port && "ws:" === t.protocol) ||
        ("443" === t.port && "wss:" === t.protocol)) &&
        (t.port = ""),
      t.searchParams.sort(),
      (t.hash = ""),
      t.toString()
    );
  }
  function $o(e, t) {
    let n,
      r = 0,
      o = e.length - 1,
      i = r;
    if (o < 0) i = 0;
    else if (t.created_at < e[o].created_at) i = o + 1;
    else if (t.created_at >= e[r].created_at) i = r;
    else
      for (;;) {
        if (o <= r + 1) {
          i = o;
          break;
        }
        if (((n = Math.floor(r + (o - r) / 2)), e[n].created_at > t.created_at))
          r = n;
        else {
          if (!(e[n].created_at < t.created_at)) {
            i = n;
            break;
          }
          o = n;
        }
      }
    return e[i]?.id !== t.id ? [...e.slice(0, i), t, ...e.slice(i)] : e;
  }
  function jo(e, t) {
    let n,
      r = 0,
      o = e.length - 1,
      i = r;
    if (o < 0) i = 0;
    else if (t.created_at > e[o].created_at) i = o + 1;
    else if (t.created_at <= e[r].created_at) i = r;
    else
      for (;;) {
        if (o <= r + 1) {
          i = o;
          break;
        }
        if (((n = Math.floor(r + (o - r) / 2)), e[n].created_at < t.created_at))
          r = n;
        else {
          if (!(e[n].created_at > t.created_at)) {
            i = n;
            break;
          }
          o = n;
        }
      }
    return e[i]?.id !== t.id ? [...e.slice(0, i), t, ...e.slice(i)] : e;
  }
  var Uo = class {
      _value;
      _next;
      get value() {
        return this._value;
      }
      set value(e) {
        this._value = e;
      }
      get next() {
        return this._next;
      }
      set next(e) {
        this._next = e;
      }
      constructor(e) {
        (this._value = e), (this._next = null);
      }
    },
    No = class {
      _first;
      _last;
      get first() {
        return this._first;
      }
      set first(e) {
        this._first = e;
      }
      get last() {
        return this._last;
      }
      set last(e) {
        this._last = e;
      }
      _size;
      get size() {
        return this._size;
      }
      set size(e) {
        this._size = e;
      }
      constructor() {
        (this._first = null), (this._last = null), (this._size = 0);
      }
      enqueue(e) {
        const t = new Uo(e);
        return (
          0 !== this._size && this._last
            ? ((this._last.next = t), (this._last = t))
            : ((this._first = t), (this._last = t)),
          this._size++,
          !0
        );
      }
      dequeue() {
        if (0 === this._size || !this._first) return null;
        let e = this._first;
        return (this._first = e.next), (e.next = null), this._size--, e.value;
      }
    };
  function Ho(e, t) {
    let n = e;
    return (n.pubkey = To(t)), (n.id = qo(n)), (n.sig = Ko(n, t)), n;
  }
  function qo(e) {
    return ge(
      Le(
        Bo.encode(
          (function (e) {
            if (!Fo(e))
              throw new Error(
                "can't serialize event with wrong or missing properties"
              );
            return JSON.stringify([
              0,
              e.pubkey,
              e.created_at,
              e.kind,
              e.tags,
              e.content,
            ]);
          })(e)
        )
      )
    );
  }
  var Mo = (e) => e instanceof Object;
  function Fo(e) {
    if (!Mo(e)) return !1;
    if ("number" != typeof e.kind) return !1;
    if ("string" != typeof e.content) return !1;
    if ("number" != typeof e.created_at) return !1;
    if ("string" != typeof e.pubkey) return !1;
    if (!e.pubkey.match(/^[a-f0-9]{64}$/)) return !1;
    if (!Array.isArray(e.tags)) return !1;
    for (let t = 0; t < e.tags.length; t++) {
      let n = e.tags[t];
      if (!Array.isArray(n)) return !1;
      for (let e = 0; e < n.length; e++) if ("object" == typeof n[e]) return !1;
    }
    return !0;
  }
  function Do(e) {
    try {
      return nn.verify(e.sig, qo(e), e.pubkey);
    } catch (e) {
      return !1;
    }
  }
  function zo(e, t) {
    return (
      console.warn(
        "nostr-tools: `signEvent` is deprecated and will be removed or changed in the future. Please use `getSignature` instead."
      ),
      Ko(e, t)
    );
  }
  function Ko(e, t) {
    return ge(nn.sign(qo(e), t));
  }
  function Go(e, t) {
    if (
      e.ids &&
      -1 === e.ids.indexOf(t.id) &&
      !e.ids.some((e) => t.id.startsWith(e))
    )
      return !1;
    if (e.kinds && -1 === e.kinds.indexOf(t.kind)) return !1;
    if (
      e.authors &&
      -1 === e.authors.indexOf(t.pubkey) &&
      !e.authors.some((e) => t.pubkey.startsWith(e))
    )
      return !1;
    for (let n in e)
      if ("#" === n[0]) {
        let r = e[`#${n.slice(1)}`];
        if (
          r &&
          !t.tags.find(([e, t]) => e === n.slice(1) && -1 !== r.indexOf(t))
        )
          return !1;
      }
    return (
      !(e.since && t.created_at < e.since) &&
      !(e.until && t.created_at >= e.until)
    );
  }
  function Wo(e, t) {
    let n = t.length + 3,
      r = e.indexOf(`"${t}":`) + n,
      o = e.slice(r).indexOf('"') + r + 1;
    return e.slice(o, o + 64);
  }
  function Vo(e, t) {
    let n = t.length,
      r = e.indexOf(`"${t}":`) + n + 3,
      o = e.slice(r),
      i = Math.min(o.indexOf(","), o.indexOf("}"));
    return parseInt(o.slice(0, i), 10);
  }
  function Yo(e) {
    let t = e.slice(0, 22).indexOf('"EVENT"');
    if (-1 === t) return null;
    let n = e.slice(t + 7 + 1).indexOf('"');
    if (-1 === n) return null;
    let r = t + 7 + 1 + n,
      o = e.slice(r + 1, 80).indexOf('"');
    if (-1 === o) return null;
    let i = r + 1 + o;
    return e.slice(r + 1, i);
  }
  function Zo(e, t) {
    return t === Wo(e, "id");
  }
  function Jo(e, t) {
    return t === Wo(e, "pubkey");
  }
  function Qo(e, t) {
    return t === Vo(e, "kind");
  }
  Po(
    {},
    {
      getHex64: () => Wo,
      getInt: () => Vo,
      getSubscriptionId: () => Yo,
      matchEventId: () => Zo,
      matchEventKind: () => Qo,
      matchEventPubkey: () => Jo,
    }
  );
  var Xo = () => ({
    connect: [],
    disconnect: [],
    error: [],
    notice: [],
    auth: [],
  });
  function ei(e, t = {}) {
    let {
      listTimeout: n = 3e3,
      getTimeout: r = 3e3,
      countTimeout: o = 3e3,
    } = t;
    var i,
      s,
      a = {},
      c = Xo(),
      u = {},
      l = {};
    async function f() {
      return (
        s ||
        ((s = new Promise((t, n) => {
          try {
            i = new WebSocket(e);
          } catch (e) {
            n(e);
          }
          (i.onopen = () => {
            c.connect.forEach((e) => e()), t();
          }),
            (i.onerror = () => {
              (s = void 0), c.error.forEach((e) => e()), n();
            }),
            (i.onclose = async () => {
              (s = void 0), c.disconnect.forEach((e) => e());
            });
          let r,
            o = new No();
          function f() {
            if (0 === o.size) return clearInterval(r), void (r = null);
            var t = o.dequeue();
            if (!t) return;
            let n = Yo(t);
            if (n) {
              let r = a[n];
              if (r && r.alreadyHaveEvent && r.alreadyHaveEvent(Wo(t, "id"), e))
                return;
            }
            try {
              let e = JSON.parse(t);
              switch (e[0]) {
                case "EVENT": {
                  let t = e[1],
                    n = e[2];
                  return void (
                    Fo(n) &&
                    a[t] &&
                    (a[t].skipVerification || Do(n)) &&
                    (function (e, t) {
                      for (let n = 0; n < e.length; n++)
                        if (Go(e[n], t)) return !0;
                      return !1;
                    })(a[t].filters, n) &&
                    (a[t], (u[t]?.event || []).forEach((e) => e(n)))
                  );
                }
                case "COUNT":
                  let t = e[1],
                    n = e[2];
                  return void (
                    a[t] && (u[t]?.count || []).forEach((e) => e(n))
                  );
                case "EOSE": {
                  let t = e[1];
                  return void (
                    t in u && (u[t].eose.forEach((e) => e()), (u[t].eose = []))
                  );
                }
                case "OK": {
                  let t = e[1],
                    n = e[2],
                    r = e[3] || "";
                  return void (
                    t in l &&
                    (n
                      ? l[t].ok.forEach((e) => e())
                      : l[t].failed.forEach((e) => e(r)),
                    (l[t].ok = []),
                    (l[t].failed = []))
                  );
                }
                case "NOTICE":
                  let r = e[1];
                  return void c.notice.forEach((e) => e(r));
                case "AUTH": {
                  let t = e[1];
                  return void c.auth?.forEach((e) => e(t));
                }
              }
            } catch (e) {
              return;
            }
          }
          i.onmessage = (e) => {
            o.enqueue(e.data), r || (r = setInterval(f, 0));
          };
        })),
        s)
      );
    }
    function h() {
      return 1 === i?.readyState;
    }
    async function d(e) {
      let t = JSON.stringify(e);
      if (h() || (await new Promise((e) => setTimeout(e, 1e3)), h()))
        try {
          i.send(t);
        } catch (e) {
          console.log(e);
        }
    }
    const p = (
      e,
      {
        verb: t = "REQ",
        skipVerification: n = !1,
        alreadyHaveEvent: r = null,
        id: o = Math.random().toString().slice(2),
      } = {}
    ) => {
      let i = o;
      return (
        (a[i] = {
          id: i,
          filters: e,
          skipVerification: n,
          alreadyHaveEvent: r,
        }),
        d([t, i, ...e]),
        {
          sub: (t, o = {}) =>
            p(t || e, {
              skipVerification: o.skipVerification || n,
              alreadyHaveEvent: o.alreadyHaveEvent || r,
              id: i,
            }),
          unsub: () => {
            delete a[i], delete u[i], d(["CLOSE", i]);
          },
          on: (e, t) => {
            (u[i] = u[i] || { event: [], count: [], eose: [] }),
              u[i][e].push(t);
          },
          off: (e, t) => {
            let n = u[i],
              r = n[e].indexOf(t);
            r >= 0 && n[e].splice(r, 1);
          },
        }
      );
    };
    function y(e, t) {
      if (!e.id) throw new Error(`event ${e} has no id`);
      let n = e.id;
      return (
        d([t, e]),
        {
          on: (e, t) => {
            (l[n] = l[n] || { ok: [], failed: [] }), l[n][e].push(t);
          },
          off: (e, t) => {
            let r = l[n];
            if (!r) return;
            let o = r[e].indexOf(t);
            o >= 0 && r[e].splice(o, 1);
          },
        }
      );
    }
    return {
      url: e,
      sub: p,
      on: (e, t) => {
        c[e].push(t), "connect" === e && 1 === i?.readyState && t();
      },
      off: (e, t) => {
        let n = c[e].indexOf(t);
        -1 !== n && c[e].splice(n, 1);
      },
      list: (e, t) =>
        new Promise((r) => {
          let o = p(e, t),
            i = [],
            s = setTimeout(() => {
              o.unsub(), r(i);
            }, n);
          o.on("eose", () => {
            o.unsub(), clearTimeout(s), r(i);
          }),
            o.on("event", (e) => {
              i.push(e);
            });
        }),
      get: (e, t) =>
        new Promise((n) => {
          let o = p([e], t),
            i = setTimeout(() => {
              o.unsub(), n(null);
            }, r);
          o.on("event", (e) => {
            o.unsub(), clearTimeout(i), n(e);
          });
        }),
      count: (e) =>
        new Promise((t) => {
          let n = p(e, { ...p, verb: "COUNT" }),
            r = setTimeout(() => {
              n.unsub(), t(null);
            }, o);
          n.on("count", (e) => {
            n.unsub(), clearTimeout(r), t(e);
          });
        }),
      publish: (e) => y(e, "EVENT"),
      auth: (e) => y(e, "AUTH"),
      connect: async function () {
        h() || (await f());
      },
      close() {
        (c = Xo()),
          (u = {}),
          (l = {}),
          i.readyState === WebSocket.OPEN && i?.close();
      },
      get status() {
        return i?.readyState ?? 3;
      },
    };
  }
  var ti = {};
  Po(ti, {
    BECH32_REGEX: () => ri,
    decode: () => oi,
    naddrEncode: () => hi,
    neventEncode: () => fi,
    noteEncode: () => ci,
    nprofileEncode: () => li,
    npubEncode: () => ai,
    nrelayEncode: () => di,
    nsecEncode: () => si,
  });
  var ni = 5e3,
    ri = /[\x21-\x7E]{1,83}1[023456789acdefghjklmnpqrstuvwxyz]{6,}/;
  function oi(e) {
    let { prefix: t, words: n } = Tn.decode(e, ni),
      r = new Uint8Array(Tn.fromWords(n));
    switch (t) {
      case "nprofile": {
        let e = ii(r);
        if (!e[0]?.[0]) throw new Error("missing TLV 0 for nprofile");
        if (32 !== e[0][0].length) throw new Error("TLV 0 should be 32 bytes");
        return {
          type: "nprofile",
          data: {
            pubkey: ge(e[0][0]),
            relays: e[1] ? e[1].map((e) => Lo.decode(e)) : [],
          },
        };
      }
      case "nevent": {
        let e = ii(r);
        if (!e[0]?.[0]) throw new Error("missing TLV 0 for nevent");
        if (32 !== e[0][0].length) throw new Error("TLV 0 should be 32 bytes");
        if (e[2] && 32 !== e[2][0].length)
          throw new Error("TLV 2 should be 32 bytes");
        return {
          type: "nevent",
          data: {
            id: ge(e[0][0]),
            relays: e[1] ? e[1].map((e) => Lo.decode(e)) : [],
            author: e[2]?.[0] ? ge(e[2][0]) : void 0,
          },
        };
      }
      case "naddr": {
        let e = ii(r);
        if (!e[0]?.[0]) throw new Error("missing TLV 0 for naddr");
        if (!e[2]?.[0]) throw new Error("missing TLV 2 for naddr");
        if (32 !== e[2][0].length) throw new Error("TLV 2 should be 32 bytes");
        if (!e[3]?.[0]) throw new Error("missing TLV 3 for naddr");
        if (4 !== e[3][0].length) throw new Error("TLV 3 should be 4 bytes");
        return {
          type: "naddr",
          data: {
            identifier: Lo.decode(e[0][0]),
            pubkey: ge(e[2][0]),
            kind: parseInt(ge(e[3][0]), 16),
            relays: e[1] ? e[1].map((e) => Lo.decode(e)) : [],
          },
        };
      }
      case "nrelay": {
        let e = ii(r);
        if (!e[0]?.[0]) throw new Error("missing TLV 0 for nrelay");
        return { type: "nrelay", data: Lo.decode(e[0][0]) };
      }
      case "nsec":
      case "npub":
      case "note":
        return { type: t, data: ge(r) };
      default:
        throw new Error(`unknown prefix ${t}`);
    }
  }
  function ii(e) {
    let t = {},
      n = e;
    for (; n.length > 0; ) {
      let e = n[0],
        r = n[1];
      if (!r) throw new Error(`malformed TLV ${e}`);
      let o = n.slice(2, 2 + r);
      if (((n = n.slice(2 + r)), o.length < r))
        throw new Error(`not enough data to read on TLV ${e}`);
      (t[e] = t[e] || []), t[e].push(o);
    }
    return t;
  }
  function si(e) {
    return ui("nsec", e);
  }
  function ai(e) {
    return ui("npub", e);
  }
  function ci(e) {
    return ui("note", e);
  }
  function ui(e, t) {
    let n = we(t),
      r = Tn.toWords(n);
    return Tn.encode(e, r, ni);
  }
  function li(e) {
    let t = pi({
        0: [we(e.pubkey)],
        1: (e.relays || []).map((e) => Bo.encode(e)),
      }),
      n = Tn.toWords(t);
    return Tn.encode("nprofile", n, ni);
  }
  function fi(e) {
    let t = pi({
        0: [we(e.id)],
        1: (e.relays || []).map((e) => Bo.encode(e)),
        2: e.author ? [we(e.author)] : [],
      }),
      n = Tn.toWords(t);
    return Tn.encode("nevent", n, ni);
  }
  function hi(e) {
    let t = new ArrayBuffer(4);
    new DataView(t).setUint32(0, e.kind, !1);
    let n = pi({
        0: [Bo.encode(e.identifier)],
        1: (e.relays || []).map((e) => Bo.encode(e)),
        2: [we(e.pubkey)],
        3: [new Uint8Array(t)],
      }),
      r = Tn.toWords(n);
    return Tn.encode("naddr", r, ni);
  }
  function di(e) {
    let t = pi({ 0: [Bo.encode(e)] }),
      n = Tn.toWords(t);
    return Tn.encode("nrelay", n, ni);
  }
  function pi(e) {
    let t = [];
    return (
      Object.entries(e).forEach(([e, n]) => {
        n.forEach((n) => {
          let r = new Uint8Array(n.length + 2);
          r.set([parseInt(e)], 0), r.set([n.length], 1), r.set(n, 2), t.push(r);
        });
      }),
      _e(...t)
    );
  }
  var yi = {};
  async function bi(e, t, n) {
    const r = wi(qt.getSharedSecret(e, "02" + t));
    let o = Uint8Array.from(ke(16)),
      i = Bo.encode(n),
      s = await crypto.subtle.importKey("raw", r, { name: "AES-CBC" }, !1, [
        "encrypt",
      ]),
      a = await crypto.subtle.encrypt({ name: "AES-CBC", iv: o }, s, i);
    return `${mn.encode(new Uint8Array(a))}?iv=${mn.encode(
      new Uint8Array(o.buffer)
    )}`;
  }
  async function gi(e, t, n) {
    let [r, o] = n.split("?iv="),
      i = wi(qt.getSharedSecret(e, "02" + t)),
      s = await crypto.subtle.importKey("raw", i, { name: "AES-CBC" }, !1, [
        "decrypt",
      ]),
      a = mn.decode(r),
      c = mn.decode(o),
      u = await crypto.subtle.decrypt({ name: "AES-CBC", iv: c }, s, a);
    return Lo.decode(u);
  }
  function wi(e) {
    return e.slice(1, 33);
  }
  Po(yi, { decrypt: () => gi, encrypt: () => bi }),
    "undefined" != typeof crypto &&
      !crypto.subtle &&
      crypto.webcrypto &&
      (crypto.subtle = crypto.webcrypto.subtle);
  var vi = {};
  Po(vi, {
    NIP05_REGEX: () => _i,
    queryProfile: () => ki,
    searchDomain: () => Ei,
    useFetchImplementation: () => xi,
  });
  var mi,
    _i = /^(?:([\w.+-]+)@)?([\w.-]+)$/;
  try {
    mi = fetch;
  } catch {}
  function xi(e) {
    mi = e;
  }
  async function Ei(e, t = "") {
    try {
      return (
        await (await mi(`https://${e}/.well-known/nostr.json?name=${t}`)).json()
      ).names;
    } catch (e) {
      return {};
    }
  }
  async function ki(e) {
    const t = e.match(_i);
    if (!t) return null;
    const [n, r = "_", o] = t;
    try {
      const e = await mi(`https://${o}/.well-known/nostr.json?name=${r}`),
        { names: t, relays: n } = (function (e) {
          const t = { names: {} };
          for (const [n, r] of Object.entries(e.names))
            "string" == typeof n && "string" == typeof r && (t.names[n] = r);
          if (e.relays) {
            t.relays = {};
            for (const [n, r] of Object.entries(e.relays))
              "string" == typeof n &&
                Array.isArray(r) &&
                (t.relays[n] = r.filter((e) => "string" == typeof e));
          }
          return t;
        })(await e.json()),
        i = t[r];
      return i ? { pubkey: i, relays: n?.[i] } : null;
    } catch (e) {
      return null;
    }
  }
  function Si(e, t) {
    let n = Oo.fromMasterSeed(Or(e, t)).derive("m/44'/1237'/0'/0/0").privateKey;
    if (!n) throw new Error("could not derive private key");
    return ge(n);
  }
  function Ai() {
    return Nr(jn);
  }
  function Oi(e) {
    return Dr(e, jn);
  }
  Po(
    {},
    {
      generateSeedWords: () => Ai,
      privateKeyFromSeedWords: () => Si,
      validateWords: () => Oi,
    }
  );
  function Ci(e) {
    const t = { reply: void 0, root: void 0, mentions: [], profiles: [] },
      n = [];
    for (const r of e.tags)
      "e" === r[0] && r[1] && n.push(r),
        "p" === r[0] &&
          r[1] &&
          t.profiles.push({ pubkey: r[1], relays: r[2] ? [r[2]] : [] });
    for (let e = 0; e < n.length; e++) {
      const r = n[e],
        [o, i, s, a] = r,
        c = { id: i, relays: s ? [s] : [] },
        u = 0 === e,
        l = e === n.length - 1;
      "root" !== a
        ? "reply" !== a
          ? "mention" !== a
            ? u
              ? (t.root = c)
              : l
              ? (t.reply = c)
              : t.mentions.push(c)
            : t.mentions.push(c)
          : (t.reply = c)
        : (t.root = c);
    }
    return t;
  }
  Po({}, { parse: () => Ci });
  function Pi(e) {
    return (function (e) {
      let t, n, r;
      for (
        n = 0, t = 0;
        n < e.length && ((r = Ii(e[n])), (t += r), 8 === r);
        n++
      );
      return t;
    })(we(e));
  }
  function Ii(e) {
    let t = 0;
    if (0 === e) return 8;
    for (; (e >>= 1); ) t++;
    return 7 - t;
  }
  Po({}, { getPow: () => Pi });
  function Ti(e, t, n, r) {
    return Ho(
      {
        kind: 6,
        tags: [...(e.tags ?? []), ["e", t.id, n], ["p", t.pubkey]],
        content: "" === e.content ? "" : JSON.stringify(t),
        created_at: e.created_at,
      },
      r
    );
  }
  function Li(e) {
    if (6 !== e.kind) return;
    let t, n;
    for (
      let r = e.tags.length - 1;
      r >= 0 && (void 0 === t || void 0 === n);
      r--
    ) {
      const o = e.tags[r];
      o.length >= 2 &&
        ("e" === o[0] && void 0 === t
          ? (t = o)
          : "p" === o[0] && void 0 === n && (n = o));
    }
    return void 0 !== t
      ? {
          id: t[1],
          relays: [t[2], n?.[2]].filter((e) => "string" == typeof e),
          author: n?.[1],
        }
      : void 0;
  }
  function Bi(e, { skipVerification: t } = {}) {
    const n = Li(e);
    if (void 0 === n || "" === e.content) return;
    let r;
    try {
      r = JSON.parse(e.content);
    } catch (e) {
      return;
    }
    return r.id === n.id && (t || Do(r)) ? r : void 0;
  }
  Po(
    {},
    {
      finishRepostEvent: () => Ti,
      getRepostedEvent: () => Bi,
      getRepostedEventPointer: () => Li,
    }
  );
  Po({}, { NOSTR_URI_REGEX: () => Ri, parse: () => ji, test: () => $i });
  var Ri = new RegExp(`nostr:(${ri.source})`);
  function $i(e) {
    return "string" == typeof e && new RegExp(`^${Ri.source}$`).test(e);
  }
  function ji(e) {
    const t = e.match(new RegExp(`^${Ri.source}$`));
    if (!t) throw new Error(`Invalid Nostr URI: ${e}`);
    return { uri: t[0], value: t[1], decoded: oi(t[1]) };
  }
  function Ui(e, t, n) {
    const r = t.tags.filter(
      (e) => e.length >= 2 && ("e" === e[0] || "p" === e[0])
    );
    return Ho(
      {
        ...e,
        kind: 7,
        tags: [...(e.tags ?? []), ...r, ["e", t.id], ["p", t.pubkey]],
        content: e.content ?? "+",
      },
      n
    );
  }
  function Ni(e) {
    if (7 !== e.kind) return;
    let t, n;
    for (
      let r = e.tags.length - 1;
      r >= 0 && (void 0 === t || void 0 === n);
      r--
    ) {
      const o = e.tags[r];
      o.length >= 2 &&
        ("e" === o[0] && void 0 === t
          ? (t = o)
          : "p" === o[0] && void 0 === n && (n = o));
    }
    return void 0 !== t && void 0 !== n
      ? {
          id: t[1],
          relays: [t[2], n[2]].filter((e) => void 0 !== e),
          author: n[1],
        }
      : void 0;
  }
  Po({}, { finishReactionEvent: () => Ui, getReactedEventPointer: () => Ni });
  function Hi(e, t) {
    let n = [];
    (t.kind || -1) >= 0 && n.push(`kind=${t.kind}`),
      t.until && n.push(`created_at<${t.until}`),
      t.since && n.push(`created_at>${t.since}`);
    let r = n.join("&");
    if ("" === r)
      throw new Error("refusing to create a delegation without any conditions");
    let o = Le(Bo.encode(`nostr:delegation:${t.pubkey}:${r}`)),
      i = ge(nn.sign(o, e));
    return { from: To(e), to: t.pubkey, cond: r, sig: i };
  }
  function qi(e) {
    let t = e.tags.find((e) => "delegation" === e[0] && e.length >= 4);
    if (!t) return null;
    let n = t[1],
      r = t[2],
      o = t[3],
      i = r.split("&");
    for (let t = 0; t < i.length; t++) {
      let [n, r, o] = i[t].split(/\b/);
      if (
        ("kind" !== n || "=" !== r || e.kind !== parseInt(o)) &&
        !(
          ("created_at" === n && "<" === r && e.created_at < parseInt(o)) ||
          ("created_at" === n && ">" === r && e.created_at > parseInt(o))
        )
      )
        return null;
    }
    let s = Le(Bo.encode(`nostr:delegation:${e.pubkey}:${r}`));
    return nn.verify(o, s, n) ? n : null;
  }
  Po({}, { createDelegation: () => Hi, getDelegator: () => qi });
  Po({}, { matchAll: () => Fi, regex: () => Mi, replaceAll: () => Di });
  var Mi = () => new RegExp(`\\b${Ri.source}\\b`, "g");
  function* Fi(e) {
    const t = e.matchAll(Mi());
    for (const e of t) {
      const [t, n] = e;
      yield {
        uri: t,
        value: n,
        decoded: oi(n),
        start: e.index,
        end: e.index + t.length,
      };
    }
  }
  function Di(e, t) {
    return e.replaceAll(Mi(), (e, n) =>
      t({ uri: e, value: n, decoded: oi(n) })
    );
  }
  var zi;
  Po({}, { useFetchImplementation: () => Ki, validateGithub: () => Gi });
  try {
    zi = fetch;
  } catch {}
  function Ki(e) {
    zi = e;
  }
  async function Gi(e, t, n) {
    try {
      return (
        (await (await zi(`https://gist.github.com/${t}/${n}/raw`)).text()) ===
        `Verifying that I control the following Nostr public key: ${e}`
      );
    } catch (e) {
      return !1;
    }
  }
  Po({}, { authenticate: () => Zi });
  var Wi,
    Vi,
    Yi,
    Zi = async ({ challenge: e, relay: t, sign: n }) => {
      const r = {
          kind: 22242,
          created_at: Math.floor(Date.now() / 1e3),
          tags: [
            ["relay", t.url],
            ["challenge", e],
          ],
          content: "",
        },
        o = t.auth(await n(r));
      return new Promise((e, t) => {
        o.on("ok", function t() {
          o.off("ok", t), e();
        }),
          o.on("failed", function e(n) {
            o.off("failed", e), t(n);
          });
      });
    },
    Ji = {};
  Po(Ji, {
    getZapEndpoint: () => Xi,
    makeZapReceipt: () => ns,
    makeZapRequest: () => es,
    useFetchImplementation: () => Qi,
    validateZapRequest: () => ts,
  });
  try {
    Wi = fetch;
  } catch {}
  function Qi(e) {
    Wi = e;
  }
  async function Xi(e) {
    try {
      let t = "",
        { lud06: n, lud16: r } = JSON.parse(e.content);
      if (n) {
        let { words: e } = Tn.decode(n, 1e3),
          r = Tn.fromWords(e);
        t = Lo.decode(r);
      } else {
        if (!r) return null;
        {
          let [e, n] = r.split("@");
          t = `https://${n}/.well-known/lnurlp/${e}`;
        }
      }
      let o = await Wi(t),
        i = await o.json();
      if (i.allowsNostr && i.nostrPubkey) return i.callback;
    } catch (e) {}
    return null;
  }
  function es({ profile: e, event: t, amount: n, relays: r, comment: o = "" }) {
    if (!n) throw new Error("amount not given");
    if (!e) throw new Error("profile not given");
    let i = {
      kind: 9734,
      created_at: Math.round(Date.now() / 1e3),
      content: o,
      tags: [
        ["p", e],
        ["amount", n.toString()],
        ["relays", ...r],
      ],
    };
    return t && i.tags.push(["e", t]), i;
  }
  function ts(e) {
    let t;
    try {
      t = JSON.parse(e);
    } catch (e) {
      return "Invalid zap request JSON.";
    }
    if (!Fo(t)) return "Zap request is not a valid Nostr event.";
    if (!Do(t)) return "Invalid signature on zap request.";
    let n = t.tags.find(([e, t]) => "p" === e && t);
    if (!n) return "Zap request doesn't have a 'p' tag.";
    if (!n[1].match(/^[a-f0-9]{64}$/))
      return "Zap request 'p' tag is not valid hex.";
    let r = t.tags.find(([e, t]) => "e" === e && t);
    return r && !r[1].match(/^[a-f0-9]{64}$/)
      ? "Zap request 'e' tag is not valid hex."
      : t.tags.find(([e, t]) => "relays" === e && t)
      ? null
      : "Zap request doesn't have a 'relays' tag.";
  }
  function ns({ zapRequest: e, preimage: t, bolt11: n, paidAt: r }) {
    let o = JSON.parse(e).tags.filter(
        ([e]) => "e" === e || "p" === e || "a" === e
      ),
      i = {
        kind: 9735,
        created_at: Math.round(r.getTime() / 1e3),
        content: "",
        tags: [...o, ["bolt11", n], ["description", e]],
      };
    return t && i.tags.push(["preimage", t]), i;
  }
  const rs =
    "undefined" != typeof WebSocket
      ? WebSocket
      : Yi
      ? Vi
      : ((Yi = 1),
        (Vi = function () {
          throw new Error(
            "ws does not work in the browser. Browser clients must use the native WebSocket object"
          );
        }));
  function os(e, t = {}) {
    if (!(this instanceof os)) return new os(e, t);
    (this.url = e), (this.opts = t), null == t.reconnect && (t.reconnect = !0);
    const n = this;
    return (
      (n.onfn = {}),
      is(n).catch((e) => {
        n.onfn.error && n.onfn.error(e);
      }),
      this
    );
  }
  function is(e) {
    return new Promise((t, n) => {
      const r = (e.ws = new rs(e.url));
      let o = !1;
      (r.onmessage = (t) => {
        !(function (e, t) {
          let n;
          try {
            n = JSON.parse(t.data);
          } catch (e) {
            return void console.error("handle_nostr_message", e);
          }
          if (n.length >= 2)
            switch (n[0]) {
              case "EVENT":
                if (n.length < 3) return;
                return e.onfn.event && e.onfn.event(n[1], n[2]);
              case "EOSE":
                return e.onfn.eose && e.onfn.eose(n[1]);
              case "NOTICE":
                return e.onfn.notice && e.onfn.notice(...n.slice(1));
              case "OK":
                e.onfn.ok && e.onfn.ok(...n.slice(1));
            }
        })(e, t),
          e.onfn.message && e.onfn.message(t);
      }),
        (r.onclose = (t) => {
          if ((e.onfn.close && e.onfn.close(t), e.reconnecting))
            return n(new Error("close during reconnect"));
          !e.manualClose && e.opts.reconnect && as(e);
        }),
        (r.onerror = (t) => {
          if ((e.onfn.error && e.onfn.error(t), e.reconnecting))
            return n(new Error("error during reconnect"));
          e.opts.reconnect && as(e);
        }),
        (r.onopen = (n) => {
          e.onfn.open && e.onfn.open(n), o || ((o = !0), t(e));
        });
    });
  }
  function ss(e) {
    return new Promise((t) => setTimeout(t, e));
  }
  async function as(e) {
    let t = 100;
    try {
      (e.reconnecting = !0), await is(e), (e.reconnecting = !1);
    } catch {
      await ss(t), (t *= 1.5);
    }
  }
  (os.prototype.wait_connected = async function (e) {
    let t = 1e3;
    for (;;) {
      if (1 === this.ws.readyState) return;
      await ss(t), (t *= 1.5);
    }
  }),
    (os.prototype.on = function (e, t) {
      return (this.onfn[e] = t), this;
    }),
    (os.prototype.close = function () {
      this.ws && ((this.manualClose = !0), this.ws.close());
    }),
    (os.prototype.subscribe = function (e, t) {
      Array.isArray(t) ? this.send(["REQ", e, ...t]) : this.send(["REQ", e, t]);
    }),
    (os.prototype.unsubscribe = function (e) {
      this.send(["CLOSE", e]);
    }),
    (os.prototype.send = async function (e) {
      await this.wait_connected(), this.ws.send(JSON.stringify(e));
    });
  const cs = os;
  function us(e, t) {
    if (!(this instanceof us)) return new us(e, t);
    (this.onfn = {}), (this.relays = []), (this.opts = t);
    for (const t of e) this.add(t);
    return this;
  }
  (us.prototype.close = function () {
    for (const e of this.relays) e.close();
  }),
    (us.prototype.on = function (e, t) {
      for (const n of this.relays)
        (this.onfn[e] = t), (n.onfn[e] = t.bind(null, n));
      return this;
    }),
    (us.prototype.has = function (e) {
      for (const t of this.relays) if (t.url === e) return !0;
      return !1;
    }),
    (us.prototype.send = function (e, t) {
      const n = t ? this.find_relays(t) : this.relays;
      for (const t of n) t.send(e);
    }),
    (us.prototype.setupHandlers = function () {
      const e = Object.keys(this.onfn);
      for (const t of e)
        for (const e of this.relays) e.onfn[t] = this.onfn[t].bind(null, e);
    }),
    (us.prototype.remove = function (e) {
      let t = 0;
      for (const n of this.relays) {
        if (n.url === e)
          return (
            n.ws && n.ws.close(), (this.relays = this.replays.splice(t, 1)), !0
          );
        t += 1;
      }
      return !1;
    }),
    (us.prototype.subscribe = function (e, t, n) {
      const r = n ? this.find_relays(n) : this.relays;
      for (const n of r) n.subscribe(e, t);
    }),
    (us.prototype.unsubscribe = function (e, t) {
      const n = t ? this.find_relays(t) : this.relays;
      for (const t of n) t.unsubscribe(e);
    }),
    (us.prototype.add = function (e) {
      if (e instanceof cs)
        return (
          !this.has(e.url) && (this.relays.push(e), this.setupHandlers(), !0)
        );
      if (this.has(e)) return !1;
      const t = cs(e, this.opts);
      return this.relays.push(t), this.setupHandlers(), !0;
    }),
    (us.prototype.find_relays = function (e) {
      if (e instanceof cs) return [e];
      if (0 === e.length) return [];
      if (!e[0]) throw new Error("what!?");
      return e[0] instanceof cs
        ? e
        : this.relays.reduce(
            (t, n) => (e.some((e) => n.url === e) && t.push(n), t),
            []
          );
    });
  var ls = Rn(us);
  function fs() {}
  function hs() {
    hs.init.call(this);
  }
  function ds(e) {
    return void 0 === e._maxListeners
      ? hs.defaultMaxListeners
      : e._maxListeners;
  }
  function ps(e, t, n, r) {
    var o, i, s, a;
    if ("function" != typeof n)
      throw new TypeError('"listener" argument must be a function');
    if (
      ((i = e._events)
        ? (i.newListener &&
            (e.emit("newListener", t, n.listener ? n.listener : n),
            (i = e._events)),
          (s = i[t]))
        : ((i = e._events = new fs()), (e._eventsCount = 0)),
      s)
    ) {
      if (
        ("function" == typeof s
          ? (s = i[t] = r ? [n, s] : [s, n])
          : r
          ? s.unshift(n)
          : s.push(n),
        !s.warned && (o = ds(e)) && o > 0 && s.length > o)
      ) {
        s.warned = !0;
        var c = new Error(
          "Possible EventEmitter memory leak detected. " +
            s.length +
            " " +
            t +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (c.name = "MaxListenersExceededWarning"),
          (c.emitter = e),
          (c.type = t),
          (c.count = s.length),
          (a = c),
          "function" == typeof console.warn ? console.warn(a) : console.log(a);
      }
    } else (s = i[t] = n), ++e._eventsCount;
    return e;
  }
  function ys(e, t, n) {
    var r = !1;
    function o() {
      e.removeListener(t, o), r || ((r = !0), n.apply(e, arguments));
    }
    return (o.listener = n), o;
  }
  function bs(e) {
    var t = this._events;
    if (t) {
      var n = t[e];
      if ("function" == typeof n) return 1;
      if (n) return n.length;
    }
    return 0;
  }
  function gs(e, t) {
    for (var n = new Array(t); t--; ) n[t] = e[t];
    return n;
  }
  let ws;
  (fs.prototype = Object.create(null)),
    (hs.EventEmitter = hs),
    (hs.usingDomains = !1),
    (hs.prototype.domain = void 0),
    (hs.prototype._events = void 0),
    (hs.prototype._maxListeners = void 0),
    (hs.defaultMaxListeners = 10),
    (hs.init = function () {
      (this.domain = null),
        hs.usingDomains && undefined.active,
        (this._events &&
          this._events !== Object.getPrototypeOf(this)._events) ||
          ((this._events = new fs()), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    }),
    (hs.prototype.setMaxListeners = function (e) {
      if ("number" != typeof e || e < 0 || isNaN(e))
        throw new TypeError('"n" argument must be a positive number');
      return (this._maxListeners = e), this;
    }),
    (hs.prototype.getMaxListeners = function () {
      return ds(this);
    }),
    (hs.prototype.emit = function (e) {
      var t,
        n,
        r,
        o,
        i,
        s,
        a,
        c = "error" === e;
      if ((s = this._events)) c = c && null == s.error;
      else if (!c) return !1;
      if (((a = this.domain), c)) {
        if (((t = arguments[1]), !a)) {
          if (t instanceof Error) throw t;
          var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");
          throw ((u.context = t), u);
        }
        return (
          t || (t = new Error('Uncaught, unspecified "error" event')),
          (t.domainEmitter = this),
          (t.domain = a),
          (t.domainThrown = !1),
          a.emit("error", t),
          !1
        );
      }
      if (!(n = s[e])) return !1;
      var l = "function" == typeof n;
      switch ((r = arguments.length)) {
        case 1:
          !(function (e, t, n) {
            if (t) e.call(n);
            else
              for (var r = e.length, o = gs(e, r), i = 0; i < r; ++i)
                o[i].call(n);
          })(n, l, this);
          break;
        case 2:
          !(function (e, t, n, r) {
            if (t) e.call(n, r);
            else
              for (var o = e.length, i = gs(e, o), s = 0; s < o; ++s)
                i[s].call(n, r);
          })(n, l, this, arguments[1]);
          break;
        case 3:
          !(function (e, t, n, r, o) {
            if (t) e.call(n, r, o);
            else
              for (var i = e.length, s = gs(e, i), a = 0; a < i; ++a)
                s[a].call(n, r, o);
          })(n, l, this, arguments[1], arguments[2]);
          break;
        case 4:
          !(function (e, t, n, r, o, i) {
            if (t) e.call(n, r, o, i);
            else
              for (var s = e.length, a = gs(e, s), c = 0; c < s; ++c)
                a[c].call(n, r, o, i);
          })(n, l, this, arguments[1], arguments[2], arguments[3]);
          break;
        default:
          for (o = new Array(r - 1), i = 1; i < r; i++) o[i - 1] = arguments[i];
          !(function (e, t, n, r) {
            if (t) e.apply(n, r);
            else
              for (var o = e.length, i = gs(e, o), s = 0; s < o; ++s)
                i[s].apply(n, r);
          })(n, l, this, o);
      }
      return !0;
    }),
    (hs.prototype.addListener = function (e, t) {
      return ps(this, e, t, !1);
    }),
    (hs.prototype.on = hs.prototype.addListener),
    (hs.prototype.prependListener = function (e, t) {
      return ps(this, e, t, !0);
    }),
    (hs.prototype.once = function (e, t) {
      if ("function" != typeof t)
        throw new TypeError('"listener" argument must be a function');
      return this.on(e, ys(this, e, t)), this;
    }),
    (hs.prototype.prependOnceListener = function (e, t) {
      if ("function" != typeof t)
        throw new TypeError('"listener" argument must be a function');
      return this.prependListener(e, ys(this, e, t)), this;
    }),
    (hs.prototype.removeListener = function (e, t) {
      var n, r, o, i, s;
      if ("function" != typeof t)
        throw new TypeError('"listener" argument must be a function');
      if (!(r = this._events)) return this;
      if (!(n = r[e])) return this;
      if (n === t || (n.listener && n.listener === t))
        0 == --this._eventsCount
          ? (this._events = new fs())
          : (delete r[e],
            r.removeListener &&
              this.emit("removeListener", e, n.listener || t));
      else if ("function" != typeof n) {
        for (o = -1, i = n.length; i-- > 0; )
          if (n[i] === t || (n[i].listener && n[i].listener === t)) {
            (s = n[i].listener), (o = i);
            break;
          }
        if (o < 0) return this;
        if (1 === n.length) {
          if (((n[0] = void 0), 0 == --this._eventsCount))
            return (this._events = new fs()), this;
          delete r[e];
        } else
          !(function (e, t) {
            for (var n = t, r = n + 1, o = e.length; r < o; n += 1, r += 1)
              e[n] = e[r];
            e.pop();
          })(n, o);
        r.removeListener && this.emit("removeListener", e, s || t);
      }
      return this;
    }),
    (hs.prototype.off = function (e, t) {
      return this.removeListener(e, t);
    }),
    (hs.prototype.removeAllListeners = function (e) {
      var t, n;
      if (!(n = this._events)) return this;
      if (!n.removeListener)
        return (
          0 === arguments.length
            ? ((this._events = new fs()), (this._eventsCount = 0))
            : n[e] &&
              (0 == --this._eventsCount
                ? (this._events = new fs())
                : delete n[e]),
          this
        );
      if (0 === arguments.length) {
        for (var r, o = Object.keys(n), i = 0; i < o.length; ++i)
          "removeListener" !== (r = o[i]) && this.removeAllListeners(r);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = new fs()),
          (this._eventsCount = 0),
          this
        );
      }
      if ("function" == typeof (t = n[e])) this.removeListener(e, t);
      else if (t)
        do {
          this.removeListener(e, t[t.length - 1]);
        } while (t[0]);
      return this;
    }),
    (hs.prototype.listeners = function (e) {
      var t,
        n = this._events;
      return n && (t = n[e])
        ? "function" == typeof t
          ? [t.listener || t]
          : (function (e) {
              for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
              return t;
            })(t)
        : [];
    }),
    (hs.listenerCount = function (e, t) {
      return "function" == typeof e.listenerCount
        ? e.listenerCount(t)
        : bs.call(e, t);
    }),
    (hs.prototype.listenerCount = bs),
    (hs.prototype.eventNames = function () {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    });
  const vs = new Uint8Array(16);
  function ms() {
    if (
      !ws &&
      ((ws =
        "undefined" != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)),
      !ws)
    )
      throw new Error(
        "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
      );
    return ws(vs);
  }
  const _s = [];
  for (let e = 0; e < 256; ++e) _s.push((e + 256).toString(16).slice(1));
  var xs = {
    randomUUID:
      "undefined" != typeof crypto &&
      crypto.randomUUID &&
      crypto.randomUUID.bind(crypto),
  };
  function Es(e, t, n) {
    if (xs.randomUUID && !t && !e) return xs.randomUUID();
    const r = (e = e || {}).random || (e.rng || ms)();
    if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
      n = n || 0;
      for (let e = 0; e < 16; ++e) t[n + e] = r[e];
      return t;
    }
    return (function (e, t = 0) {
      return (
        _s[e[t + 0]] +
        _s[e[t + 1]] +
        _s[e[t + 2]] +
        _s[e[t + 3]] +
        "-" +
        _s[e[t + 4]] +
        _s[e[t + 5]] +
        "-" +
        _s[e[t + 6]] +
        _s[e[t + 7]] +
        "-" +
        _s[e[t + 8]] +
        _s[e[t + 9]] +
        "-" +
        _s[e[t + 10]] +
        _s[e[t + 11]] +
        _s[e[t + 12]] +
        _s[e[t + 13]] +
        _s[e[t + 14]] +
        _s[e[t + 15]]
      ).toLowerCase();
    })(r);
  }
  var ks =
    "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : {};
  function Ss() {
    throw new Error("setTimeout has not been defined");
  }
  function As() {
    throw new Error("clearTimeout has not been defined");
  }
  var Os = Ss,
    Cs = As;
  function Ps(e) {
    if (Os === setTimeout) return setTimeout(e, 0);
    if ((Os === Ss || !Os) && setTimeout)
      return (Os = setTimeout), setTimeout(e, 0);
    try {
      return Os(e, 0);
    } catch (t) {
      try {
        return Os.call(null, e, 0);
      } catch (t) {
        return Os.call(this, e, 0);
      }
    }
  }
  "function" == typeof ks.setTimeout && (Os = setTimeout),
    "function" == typeof ks.clearTimeout && (Cs = clearTimeout);
  var Is,
    Ts = [],
    Ls = !1,
    Bs = -1;
  function Rs() {
    Ls &&
      Is &&
      ((Ls = !1),
      Is.length ? (Ts = Is.concat(Ts)) : (Bs = -1),
      Ts.length && $s());
  }
  function $s() {
    if (!Ls) {
      var e = Ps(Rs);
      Ls = !0;
      for (var t = Ts.length; t; ) {
        for (Is = Ts, Ts = []; ++Bs < t; ) Is && Is[Bs].run();
        (Bs = -1), (t = Ts.length);
      }
      (Is = null),
        (Ls = !1),
        (function (e) {
          if (Cs === clearTimeout) return clearTimeout(e);
          if ((Cs === As || !Cs) && clearTimeout)
            return (Cs = clearTimeout), clearTimeout(e);
          try {
            return Cs(e);
          } catch (t) {
            try {
              return Cs.call(null, e);
            } catch (t) {
              return Cs.call(this, e);
            }
          }
        })(e);
    }
  }
  function js(e, t) {
    (this.fun = e), (this.array = t);
  }
  js.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  function Us() {}
  var Ns = Us,
    Hs = Us,
    qs = Us,
    Ms = Us,
    Fs = Us,
    Ds = Us,
    zs = Us;
  var Ks = ks.performance || {},
    Gs =
      Ks.now ||
      Ks.mozNow ||
      Ks.msNow ||
      Ks.oNow ||
      Ks.webkitNow ||
      function () {
        return new Date().getTime();
      };
  var Ws = new Date();
  var Vs,
    Ys,
    Zs = {
      nextTick: function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        Ts.push(new js(e, t)), 1 !== Ts.length || Ls || Ps($s);
      },
      title: "browser",
      browser: !0,
      env: {},
      argv: [],
      version: "",
      versions: {},
      on: Ns,
      addListener: Hs,
      once: qs,
      off: Ms,
      removeListener: Fs,
      removeAllListeners: Ds,
      emit: zs,
      binding: function (e) {
        throw new Error("process.binding is not supported");
      },
      cwd: function () {
        return "/";
      },
      chdir: function (e) {
        throw new Error("process.chdir is not supported");
      },
      umask: function () {
        return 0;
      },
      hrtime: function (e) {
        var t = 0.001 * Gs.call(Ks),
          n = Math.floor(t),
          r = Math.floor((t % 1) * 1e9);
        return e && ((n -= e[0]), (r -= e[1]) < 0 && (n--, (r += 1e9))), [n, r];
      },
      platform: "browser",
      release: {},
      config: {},
      uptime: function () {
        return (new Date() - Ws) / 1e3;
      },
    },
    Js = { exports: {} };
  function Qs() {
    if (Ys) return Vs;
    Ys = 1;
    var e = 1e3,
      t = 60 * e,
      n = 60 * t,
      r = 24 * n,
      o = 7 * r,
      i = 365.25 * r;
    function s(e, t, n, r) {
      var o = t >= 1.5 * n;
      return Math.round(e / n) + " " + r + (o ? "s" : "");
    }
    return (Vs = function (a, c) {
      c = c || {};
      var u = typeof a;
      if ("string" === u && a.length > 0)
        return (function (s) {
          if ((s = String(s)).length > 100) return;
          var a =
            /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
              s
            );
          if (!a) return;
          var c = parseFloat(a[1]);
          switch ((a[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return c * i;
            case "weeks":
            case "week":
            case "w":
              return c * o;
            case "days":
            case "day":
            case "d":
              return c * r;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return c * n;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return c * t;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return c * e;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return c;
            default:
              return;
          }
        })(a);
      if ("number" === u && isFinite(a))
        return c.long
          ? (function (o) {
              var i = Math.abs(o);
              if (i >= r) return s(o, i, r, "day");
              if (i >= n) return s(o, i, n, "hour");
              if (i >= t) return s(o, i, t, "minute");
              if (i >= e) return s(o, i, e, "second");
              return o + " ms";
            })(a)
          : (function (o) {
              var i = Math.abs(o);
              if (i >= r) return Math.round(o / r) + "d";
              if (i >= n) return Math.round(o / n) + "h";
              if (i >= t) return Math.round(o / t) + "m";
              if (i >= e) return Math.round(o / e) + "s";
              return o + "ms";
            })(a);
      throw new Error(
        "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(a)
      );
    });
  }
  var Xs = function (e) {
    function t(e) {
      let r,
        o,
        i,
        s = null;
      function a(...e) {
        if (!a.enabled) return;
        const n = a,
          o = Number(new Date()),
          i = o - (r || o);
        (n.diff = i),
          (n.prev = r),
          (n.curr = o),
          (r = o),
          (e[0] = t.coerce(e[0])),
          "string" != typeof e[0] && e.unshift("%O");
        let s = 0;
        (e[0] = e[0].replace(/%([a-zA-Z%])/g, (r, o) => {
          if ("%%" === r) return "%";
          s++;
          const i = t.formatters[o];
          if ("function" == typeof i) {
            const t = e[s];
            (r = i.call(n, t)), e.splice(s, 1), s--;
          }
          return r;
        })),
          t.formatArgs.call(n, e);
        (n.log || t.log).apply(n, e);
      }
      return (
        (a.namespace = e),
        (a.useColors = t.useColors()),
        (a.color = t.selectColor(e)),
        (a.extend = n),
        (a.destroy = t.destroy),
        Object.defineProperty(a, "enabled", {
          enumerable: !0,
          configurable: !1,
          get: () =>
            null !== s
              ? s
              : (o !== t.namespaces && ((o = t.namespaces), (i = t.enabled(e))),
                i),
          set: (e) => {
            s = e;
          },
        }),
        "function" == typeof t.init && t.init(a),
        a
      );
    }
    function n(e, n) {
      const r = t(this.namespace + (void 0 === n ? ":" : n) + e);
      return (r.log = this.log), r;
    }
    function r(e) {
      return e
        .toString()
        .substring(2, e.toString().length - 2)
        .replace(/\.\*\?$/, "*");
    }
    return (
      (t.debug = t),
      (t.default = t),
      (t.coerce = function (e) {
        if (e instanceof Error) return e.stack || e.message;
        return e;
      }),
      (t.disable = function () {
        const e = [
          ...t.names.map(r),
          ...t.skips.map(r).map((e) => "-" + e),
        ].join(",");
        return t.enable(""), e;
      }),
      (t.enable = function (e) {
        let n;
        t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []);
        const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
          o = r.length;
        for (n = 0; n < o; n++)
          r[n] &&
            ("-" === (e = r[n].replace(/\*/g, ".*?"))[0]
              ? t.skips.push(new RegExp("^" + e.slice(1) + "$"))
              : t.names.push(new RegExp("^" + e + "$")));
      }),
      (t.enabled = function (e) {
        if ("*" === e[e.length - 1]) return !0;
        let n, r;
        for (n = 0, r = t.skips.length; n < r; n++)
          if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++)
          if (t.names[n].test(e)) return !0;
        return !1;
      }),
      (t.humanize = Qs()),
      (t.destroy = function () {
        console.warn(
          "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
        );
      }),
      Object.keys(e).forEach((n) => {
        t[n] = e[n];
      }),
      (t.names = []),
      (t.skips = []),
      (t.formatters = {}),
      (t.selectColor = function (e) {
        let n = 0;
        for (let t = 0; t < e.length; t++)
          (n = (n << 5) - n + e.charCodeAt(t)), (n |= 0);
        return t.colors[Math.abs(n) % t.colors.length];
      }),
      t.enable(t.load()),
      t
    );
  };
  !(function (e, t) {
    (t.formatArgs = function (t) {
      if (
        ((t[0] =
          (this.useColors ? "%c" : "") +
          this.namespace +
          (this.useColors ? " %c" : " ") +
          t[0] +
          (this.useColors ? "%c " : " ") +
          "+" +
          e.exports.humanize(this.diff)),
        !this.useColors)
      )
        return;
      const n = "color: " + this.color;
      t.splice(1, 0, n, "color: inherit");
      let r = 0,
        o = 0;
      t[0].replace(/%[a-zA-Z%]/g, (e) => {
        "%%" !== e && (r++, "%c" === e && (o = r));
      }),
        t.splice(o, 0, n);
    }),
      (t.save = function (e) {
        try {
          e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
        } catch (e) {}
      }),
      (t.load = function () {
        let e;
        try {
          e = t.storage.getItem("debug");
        } catch (e) {}
        !e && void 0 !== Zs && "env" in Zs && (e = Zs.env.DEBUG);
        return e;
      }),
      (t.useColors = function () {
        if (
          "undefined" != typeof window &&
          window.process &&
          ("renderer" === window.process.type || window.process.__nwjs)
        )
          return !0;
        if (
          "undefined" != typeof navigator &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
        )
          return !1;
        return (
          ("undefined" != typeof document &&
            document.documentElement &&
            document.documentElement.style &&
            document.documentElement.style.WebkitAppearance) ||
          ("undefined" != typeof window &&
            window.console &&
            (window.console.firebug ||
              (window.console.exception && window.console.table))) ||
          ("undefined" != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
            parseInt(RegExp.$1, 10) >= 31) ||
          ("undefined" != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
        );
      }),
      (t.storage = (function () {
        try {
          return localStorage;
        } catch (e) {}
      })()),
      (t.destroy = (() => {
        let e = !1;
        return () => {
          e ||
            ((e = !0),
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            ));
        };
      })()),
      (t.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33",
      ]),
      (t.log = console.debug || console.log || (() => {})),
      (e.exports = Xs(t));
    const { formatters: n } = e.exports;
    n.j = function (e) {
      try {
        return JSON.stringify(e);
      } catch (e) {
        return "[UnexpectedJSONParseError]: " + e.message;
      }
    };
  })(Js, Js.exports);
  var ea = Rn(Js.exports),
    ta = { exports: {} };
  !(function (e) {
    var t = Object.prototype.hasOwnProperty,
      n = "~";
    function r() {}
    function o(e, t, n) {
      (this.fn = e), (this.context = t), (this.once = n || !1);
    }
    function i(e, t, r, i, s) {
      if ("function" != typeof r)
        throw new TypeError("The listener must be a function");
      var a = new o(r, i || e, s),
        c = n ? n + t : t;
      return (
        e._events[c]
          ? e._events[c].fn
            ? (e._events[c] = [e._events[c], a])
            : e._events[c].push(a)
          : ((e._events[c] = a), e._eventsCount++),
        e
      );
    }
    function s(e, t) {
      0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t];
    }
    function a() {
      (this._events = new r()), (this._eventsCount = 0);
    }
    Object.create &&
      ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
      (a.prototype.eventNames = function () {
        var e,
          r,
          o = [];
        if (0 === this._eventsCount) return o;
        for (r in (e = this._events))
          t.call(e, r) && o.push(n ? r.slice(1) : r);
        return Object.getOwnPropertySymbols
          ? o.concat(Object.getOwnPropertySymbols(e))
          : o;
      }),
      (a.prototype.listeners = function (e) {
        var t = n ? n + e : e,
          r = this._events[t];
        if (!r) return [];
        if (r.fn) return [r.fn];
        for (var o = 0, i = r.length, s = new Array(i); o < i; o++)
          s[o] = r[o].fn;
        return s;
      }),
      (a.prototype.listenerCount = function (e) {
        var t = n ? n + e : e,
          r = this._events[t];
        return r ? (r.fn ? 1 : r.length) : 0;
      }),
      (a.prototype.emit = function (e, t, r, o, i, s) {
        var a = n ? n + e : e;
        if (!this._events[a]) return !1;
        var c,
          u,
          l = this._events[a],
          f = arguments.length;
        if (l.fn) {
          switch ((l.once && this.removeListener(e, l.fn, void 0, !0), f)) {
            case 1:
              return l.fn.call(l.context), !0;
            case 2:
              return l.fn.call(l.context, t), !0;
            case 3:
              return l.fn.call(l.context, t, r), !0;
            case 4:
              return l.fn.call(l.context, t, r, o), !0;
            case 5:
              return l.fn.call(l.context, t, r, o, i), !0;
            case 6:
              return l.fn.call(l.context, t, r, o, i, s), !0;
          }
          for (u = 1, c = new Array(f - 1); u < f; u++) c[u - 1] = arguments[u];
          l.fn.apply(l.context, c);
        } else {
          var h,
            d = l.length;
          for (u = 0; u < d; u++)
            switch (
              (l[u].once && this.removeListener(e, l[u].fn, void 0, !0), f)
            ) {
              case 1:
                l[u].fn.call(l[u].context);
                break;
              case 2:
                l[u].fn.call(l[u].context, t);
                break;
              case 3:
                l[u].fn.call(l[u].context, t, r);
                break;
              case 4:
                l[u].fn.call(l[u].context, t, r, o);
                break;
              default:
                if (!c)
                  for (h = 1, c = new Array(f - 1); h < f; h++)
                    c[h - 1] = arguments[h];
                l[u].fn.apply(l[u].context, c);
            }
        }
        return !0;
      }),
      (a.prototype.on = function (e, t, n) {
        return i(this, e, t, n, !1);
      }),
      (a.prototype.once = function (e, t, n) {
        return i(this, e, t, n, !0);
      }),
      (a.prototype.removeListener = function (e, t, r, o) {
        var i = n ? n + e : e;
        if (!this._events[i]) return this;
        if (!t) return s(this, i), this;
        var a = this._events[i];
        if (a.fn)
          a.fn !== t || (o && !a.once) || (r && a.context !== r) || s(this, i);
        else {
          for (var c = 0, u = [], l = a.length; c < l; c++)
            (a[c].fn !== t || (o && !a[c].once) || (r && a[c].context !== r)) &&
              u.push(a[c]);
          u.length ? (this._events[i] = 1 === u.length ? u[0] : u) : s(this, i);
        }
        return this;
      }),
      (a.prototype.removeAllListeners = function (e) {
        var t;
        return (
          e
            ? ((t = n ? n + e : e), this._events[t] && s(this, t))
            : ((this._events = new r()), (this._eventsCount = 0)),
          this
        );
      }),
      (a.prototype.off = a.prototype.removeListener),
      (a.prototype.addListener = a.prototype.on),
      (a.prefixed = n),
      (a.EventEmitter = a),
      (e.exports = a);
  })(ta);
  var na = Rn(ta.exports),
    ra = {};
  Object.defineProperty(ra, "__esModule", { value: !0 }), (ra.is_node = void 0);
  var oa = null;
  ra.is_node = function () {
    return (
      null === oa &&
        (oa =
          "object" == typeof Bn &&
          "object" == typeof Bn.process &&
          "object" == typeof Bn.process.versions &&
          void 0 !== Bn.process.versions.node),
      oa
    );
  };
  var ia = [],
    sa = [],
    aa = "undefined" != typeof Uint8Array ? Uint8Array : Array,
    ca = !1;
  function ua() {
    ca = !0;
    for (
      var e =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        t = 0;
      t < 64;
      ++t
    )
      (ia[t] = e[t]), (sa[e.charCodeAt(t)] = t);
    (sa["-".charCodeAt(0)] = 62), (sa["_".charCodeAt(0)] = 63);
  }
  function la(e, t, n) {
    for (var r, o, i = [], s = t; s < n; s += 3)
      (r = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2]),
        i.push(
          ia[((o = r) >> 18) & 63] +
            ia[(o >> 12) & 63] +
            ia[(o >> 6) & 63] +
            ia[63 & o]
        );
    return i.join("");
  }
  function fa(e) {
    var t;
    ca || ua();
    for (
      var n = e.length, r = n % 3, o = "", i = [], s = 16383, a = 0, c = n - r;
      a < c;
      a += s
    )
      i.push(la(e, a, a + s > c ? c : a + s));
    return (
      1 === r
        ? ((t = e[n - 1]),
          (o += ia[t >> 2]),
          (o += ia[(t << 4) & 63]),
          (o += "=="))
        : 2 === r &&
          ((t = (e[n - 2] << 8) + e[n - 1]),
          (o += ia[t >> 10]),
          (o += ia[(t >> 4) & 63]),
          (o += ia[(t << 2) & 63]),
          (o += "=")),
      i.push(o),
      i.join("")
    );
  }
  function ha(e, t, n, r, o) {
    var i,
      s,
      a = 8 * o - r - 1,
      c = (1 << a) - 1,
      u = c >> 1,
      l = -7,
      f = n ? o - 1 : 0,
      h = n ? -1 : 1,
      d = e[t + f];
    for (
      f += h, i = d & ((1 << -l) - 1), d >>= -l, l += a;
      l > 0;
      i = 256 * i + e[t + f], f += h, l -= 8
    );
    for (
      s = i & ((1 << -l) - 1), i >>= -l, l += r;
      l > 0;
      s = 256 * s + e[t + f], f += h, l -= 8
    );
    if (0 === i) i = 1 - u;
    else {
      if (i === c) return s ? NaN : (1 / 0) * (d ? -1 : 1);
      (s += Math.pow(2, r)), (i -= u);
    }
    return (d ? -1 : 1) * s * Math.pow(2, i - r);
  }
  function da(e, t, n, r, o, i) {
    var s,
      a,
      c,
      u = 8 * i - o - 1,
      l = (1 << u) - 1,
      f = l >> 1,
      h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      d = r ? 0 : i - 1,
      p = r ? 1 : -1,
      y = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
    for (
      t = Math.abs(t),
        isNaN(t) || t === 1 / 0
          ? ((a = isNaN(t) ? 1 : 0), (s = l))
          : ((s = Math.floor(Math.log(t) / Math.LN2)),
            t * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
            (t += s + f >= 1 ? h / c : h * Math.pow(2, 1 - f)) * c >= 2 &&
              (s++, (c /= 2)),
            s + f >= l
              ? ((a = 0), (s = l))
              : s + f >= 1
              ? ((a = (t * c - 1) * Math.pow(2, o)), (s += f))
              : ((a = t * Math.pow(2, f - 1) * Math.pow(2, o)), (s = 0)));
      o >= 8;
      e[n + d] = 255 & a, d += p, a /= 256, o -= 8
    );
    for (
      s = (s << o) | a, u += o;
      u > 0;
      e[n + d] = 255 & s, d += p, s /= 256, u -= 8
    );
    e[n + d - p] |= 128 * y;
  }
  var pa = {}.toString,
    ya =
      Array.isArray ||
      function (e) {
        return "[object Array]" == pa.call(e);
      };
  function ba() {
    return wa.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function ga(e, t) {
    if (ba() < t) throw new RangeError("Invalid typed array length");
    return (
      wa.TYPED_ARRAY_SUPPORT
        ? ((e = new Uint8Array(t)).__proto__ = wa.prototype)
        : (null === e && (e = new wa(t)), (e.length = t)),
      e
    );
  }
  function wa(e, t, n) {
    if (!(wa.TYPED_ARRAY_SUPPORT || this instanceof wa)) return new wa(e, t, n);
    if ("number" == typeof e) {
      if ("string" == typeof t)
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      return _a(this, e);
    }
    return va(this, e, t, n);
  }
  function va(e, t, n, r) {
    if ("number" == typeof t)
      throw new TypeError('"value" argument must not be a number');
    return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
      ? (function (e, t, n, r) {
          if ((t.byteLength, n < 0 || t.byteLength < n))
            throw new RangeError("'offset' is out of bounds");
          if (t.byteLength < n + (r || 0))
            throw new RangeError("'length' is out of bounds");
          t =
            void 0 === n && void 0 === r
              ? new Uint8Array(t)
              : void 0 === r
              ? new Uint8Array(t, n)
              : new Uint8Array(t, n, r);
          wa.TYPED_ARRAY_SUPPORT
            ? ((e = t).__proto__ = wa.prototype)
            : (e = xa(e, t));
          return e;
        })(e, t, n, r)
      : "string" == typeof t
      ? (function (e, t, n) {
          ("string" == typeof n && "" !== n) || (n = "utf8");
          if (!wa.isEncoding(n))
            throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | Sa(t, n);
          e = ga(e, r);
          var o = e.write(t, n);
          o !== r && (e = e.slice(0, o));
          return e;
        })(e, t, n)
      : (function (e, t) {
          if (ka(t)) {
            var n = 0 | Ea(t.length);
            return 0 === (e = ga(e, n)).length || t.copy(e, 0, 0, n), e;
          }
          if (t) {
            if (
              ("undefined" != typeof ArrayBuffer &&
                t.buffer instanceof ArrayBuffer) ||
              "length" in t
            )
              return "number" != typeof t.length || (r = t.length) != r
                ? ga(e, 0)
                : xa(e, t);
            if ("Buffer" === t.type && ya(t.data)) return xa(e, t.data);
          }
          var r;
          throw new TypeError(
            "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
          );
        })(e, t);
  }
  function ma(e) {
    if ("number" != typeof e)
      throw new TypeError('"size" argument must be a number');
    if (e < 0) throw new RangeError('"size" argument must not be negative');
  }
  function _a(e, t) {
    if ((ma(t), (e = ga(e, t < 0 ? 0 : 0 | Ea(t))), !wa.TYPED_ARRAY_SUPPORT))
      for (var n = 0; n < t; ++n) e[n] = 0;
    return e;
  }
  function xa(e, t) {
    var n = t.length < 0 ? 0 : 0 | Ea(t.length);
    e = ga(e, n);
    for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
    return e;
  }
  function Ea(e) {
    if (e >= ba())
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          ba().toString(16) +
          " bytes"
      );
    return 0 | e;
  }
  function ka(e) {
    return !(null == e || !e._isBuffer);
  }
  function Sa(e, t) {
    if (ka(e)) return e.length;
    if (
      "undefined" != typeof ArrayBuffer &&
      "function" == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
    )
      return e.byteLength;
    "string" != typeof e && (e = "" + e);
    var n = e.length;
    if (0 === n) return 0;
    for (var r = !1; ; )
      switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return n;
        case "utf8":
        case "utf-8":
        case void 0:
          return Qa(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * n;
        case "hex":
          return n >>> 1;
        case "base64":
          return Xa(e).length;
        default:
          if (r) return Qa(e).length;
          (t = ("" + t).toLowerCase()), (r = !0);
      }
  }
  function Aa(e, t, n) {
    var r = !1;
    if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
    if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
      return "";
    if ((n >>>= 0) <= (t >>>= 0)) return "";
    for (e || (e = "utf8"); ; )
      switch (e) {
        case "hex":
          return Ma(this, t, n);
        case "utf8":
        case "utf-8":
          return Ua(this, t, n);
        case "ascii":
          return Ha(this, t, n);
        case "latin1":
        case "binary":
          return qa(this, t, n);
        case "base64":
          return ja(this, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Fa(this, t, n);
        default:
          if (r) throw new TypeError("Unknown encoding: " + e);
          (e = (e + "").toLowerCase()), (r = !0);
      }
  }
  function Oa(e, t, n) {
    var r = e[t];
    (e[t] = e[n]), (e[n] = r);
  }
  function Ca(e, t, n, r, o) {
    if (0 === e.length) return -1;
    if (
      ("string" == typeof n
        ? ((r = n), (n = 0))
        : n > 2147483647
        ? (n = 2147483647)
        : n < -2147483648 && (n = -2147483648),
      (n = +n),
      isNaN(n) && (n = o ? 0 : e.length - 1),
      n < 0 && (n = e.length + n),
      n >= e.length)
    ) {
      if (o) return -1;
      n = e.length - 1;
    } else if (n < 0) {
      if (!o) return -1;
      n = 0;
    }
    if (("string" == typeof t && (t = wa.from(t, r)), ka(t)))
      return 0 === t.length ? -1 : Pa(e, t, n, r, o);
    if ("number" == typeof t)
      return (
        (t &= 255),
        wa.TYPED_ARRAY_SUPPORT &&
        "function" == typeof Uint8Array.prototype.indexOf
          ? o
            ? Uint8Array.prototype.indexOf.call(e, t, n)
            : Uint8Array.prototype.lastIndexOf.call(e, t, n)
          : Pa(e, [t], n, r, o)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function Pa(e, t, n, r, o) {
    var i,
      s = 1,
      a = e.length,
      c = t.length;
    if (
      void 0 !== r &&
      ("ucs2" === (r = String(r).toLowerCase()) ||
        "ucs-2" === r ||
        "utf16le" === r ||
        "utf-16le" === r)
    ) {
      if (e.length < 2 || t.length < 2) return -1;
      (s = 2), (a /= 2), (c /= 2), (n /= 2);
    }
    function u(e, t) {
      return 1 === s ? e[t] : e.readUInt16BE(t * s);
    }
    if (o) {
      var l = -1;
      for (i = n; i < a; i++)
        if (u(e, i) === u(t, -1 === l ? 0 : i - l)) {
          if ((-1 === l && (l = i), i - l + 1 === c)) return l * s;
        } else -1 !== l && (i -= i - l), (l = -1);
    } else
      for (n + c > a && (n = a - c), i = n; i >= 0; i--) {
        for (var f = !0, h = 0; h < c; h++)
          if (u(e, i + h) !== u(t, h)) {
            f = !1;
            break;
          }
        if (f) return i;
      }
    return -1;
  }
  function Ia(e, t, n, r) {
    n = Number(n) || 0;
    var o = e.length - n;
    r ? (r = Number(r)) > o && (r = o) : (r = o);
    var i = t.length;
    if (i % 2 != 0) throw new TypeError("Invalid hex string");
    r > i / 2 && (r = i / 2);
    for (var s = 0; s < r; ++s) {
      var a = parseInt(t.substr(2 * s, 2), 16);
      if (isNaN(a)) return s;
      e[n + s] = a;
    }
    return s;
  }
  function Ta(e, t, n, r) {
    return ec(Qa(t, e.length - n), e, n, r);
  }
  function La(e, t, n, r) {
    return ec(
      (function (e) {
        for (var t = [], n = 0; n < e.length; ++n)
          t.push(255 & e.charCodeAt(n));
        return t;
      })(t),
      e,
      n,
      r
    );
  }
  function Ba(e, t, n, r) {
    return La(e, t, n, r);
  }
  function Ra(e, t, n, r) {
    return ec(Xa(t), e, n, r);
  }
  function $a(e, t, n, r) {
    return ec(
      (function (e, t) {
        for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s)
          (r = (n = e.charCodeAt(s)) >> 8), (o = n % 256), i.push(o), i.push(r);
        return i;
      })(t, e.length - n),
      e,
      n,
      r
    );
  }
  function ja(e, t, n) {
    return 0 === t && n === e.length ? fa(e) : fa(e.slice(t, n));
  }
  function Ua(e, t, n) {
    n = Math.min(e.length, n);
    for (var r = [], o = t; o < n; ) {
      var i,
        s,
        a,
        c,
        u = e[o],
        l = null,
        f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
      if (o + f <= n)
        switch (f) {
          case 1:
            u < 128 && (l = u);
            break;
          case 2:
            128 == (192 & (i = e[o + 1])) &&
              (c = ((31 & u) << 6) | (63 & i)) > 127 &&
              (l = c);
            break;
          case 3:
            (i = e[o + 1]),
              (s = e[o + 2]),
              128 == (192 & i) &&
                128 == (192 & s) &&
                (c = ((15 & u) << 12) | ((63 & i) << 6) | (63 & s)) > 2047 &&
                (c < 55296 || c > 57343) &&
                (l = c);
            break;
          case 4:
            (i = e[o + 1]),
              (s = e[o + 2]),
              (a = e[o + 3]),
              128 == (192 & i) &&
                128 == (192 & s) &&
                128 == (192 & a) &&
                (c =
                  ((15 & u) << 18) |
                  ((63 & i) << 12) |
                  ((63 & s) << 6) |
                  (63 & a)) > 65535 &&
                c < 1114112 &&
                (l = c);
        }
      null === l
        ? ((l = 65533), (f = 1))
        : l > 65535 &&
          ((l -= 65536),
          r.push(((l >>> 10) & 1023) | 55296),
          (l = 56320 | (1023 & l))),
        r.push(l),
        (o += f);
    }
    return (function (e) {
      var t = e.length;
      if (t <= Na) return String.fromCharCode.apply(String, e);
      var n = "",
        r = 0;
      for (; r < t; )
        n += String.fromCharCode.apply(String, e.slice(r, (r += Na)));
      return n;
    })(r);
  }
  (wa.TYPED_ARRAY_SUPPORT =
    void 0 === ks.TYPED_ARRAY_SUPPORT || ks.TYPED_ARRAY_SUPPORT),
    ba(),
    (wa.poolSize = 8192),
    (wa._augment = function (e) {
      return (e.__proto__ = wa.prototype), e;
    }),
    (wa.from = function (e, t, n) {
      return va(null, e, t, n);
    }),
    wa.TYPED_ARRAY_SUPPORT &&
      ((wa.prototype.__proto__ = Uint8Array.prototype),
      (wa.__proto__ = Uint8Array),
      "undefined" != typeof Symbol && Symbol.species && wa[Symbol.species]),
    (wa.alloc = function (e, t, n) {
      return (function (e, t, n, r) {
        return (
          ma(t),
          t <= 0
            ? ga(e, t)
            : void 0 !== n
            ? "string" == typeof r
              ? ga(e, t).fill(n, r)
              : ga(e, t).fill(n)
            : ga(e, t)
        );
      })(null, e, t, n);
    }),
    (wa.allocUnsafe = function (e) {
      return _a(null, e);
    }),
    (wa.allocUnsafeSlow = function (e) {
      return _a(null, e);
    }),
    (wa.isBuffer = function (e) {
      return (
        null != e &&
        (!!e._isBuffer ||
          tc(e) ||
          (function (e) {
            return (
              "function" == typeof e.readFloatLE &&
              "function" == typeof e.slice &&
              tc(e.slice(0, 0))
            );
          })(e))
      );
    }),
    (wa.compare = function (e, t) {
      if (!ka(e) || !ka(t)) throw new TypeError("Arguments must be Buffers");
      if (e === t) return 0;
      for (
        var n = e.length, r = t.length, o = 0, i = Math.min(n, r);
        o < i;
        ++o
      )
        if (e[o] !== t[o]) {
          (n = e[o]), (r = t[o]);
          break;
        }
      return n < r ? -1 : r < n ? 1 : 0;
    }),
    (wa.isEncoding = function (e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (wa.concat = function (e, t) {
      if (!ya(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return wa.alloc(0);
      var n;
      if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
      var r = wa.allocUnsafe(t),
        o = 0;
      for (n = 0; n < e.length; ++n) {
        var i = e[n];
        if (!ka(i))
          throw new TypeError('"list" argument must be an Array of Buffers');
        i.copy(r, o), (o += i.length);
      }
      return r;
    }),
    (wa.byteLength = Sa),
    (wa.prototype._isBuffer = !0),
    (wa.prototype.swap16 = function () {
      var e = this.length;
      if (e % 2 != 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var t = 0; t < e; t += 2) Oa(this, t, t + 1);
      return this;
    }),
    (wa.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 != 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var t = 0; t < e; t += 4) Oa(this, t, t + 3), Oa(this, t + 1, t + 2);
      return this;
    }),
    (wa.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 != 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var t = 0; t < e; t += 8)
        Oa(this, t, t + 7),
          Oa(this, t + 1, t + 6),
          Oa(this, t + 2, t + 5),
          Oa(this, t + 3, t + 4);
      return this;
    }),
    (wa.prototype.toString = function () {
      var e = 0 | this.length;
      return 0 === e
        ? ""
        : 0 === arguments.length
        ? Ua(this, 0, e)
        : Aa.apply(this, arguments);
    }),
    (wa.prototype.equals = function (e) {
      if (!ka(e)) throw new TypeError("Argument must be a Buffer");
      return this === e || 0 === wa.compare(this, e);
    }),
    (wa.prototype.inspect = function () {
      var e = "";
      return (
        this.length > 0 &&
          ((e = this.toString("hex", 0, 50).match(/.{2}/g).join(" ")),
          this.length > 50 && (e += " ... ")),
        "<Buffer " + e + ">"
      );
    }),
    (wa.prototype.compare = function (e, t, n, r, o) {
      if (!ka(e)) throw new TypeError("Argument must be a Buffer");
      if (
        (void 0 === t && (t = 0),
        void 0 === n && (n = e ? e.length : 0),
        void 0 === r && (r = 0),
        void 0 === o && (o = this.length),
        t < 0 || n > e.length || r < 0 || o > this.length)
      )
        throw new RangeError("out of range index");
      if (r >= o && t >= n) return 0;
      if (r >= o) return -1;
      if (t >= n) return 1;
      if (this === e) return 0;
      for (
        var i = (o >>>= 0) - (r >>>= 0),
          s = (n >>>= 0) - (t >>>= 0),
          a = Math.min(i, s),
          c = this.slice(r, o),
          u = e.slice(t, n),
          l = 0;
        l < a;
        ++l
      )
        if (c[l] !== u[l]) {
          (i = c[l]), (s = u[l]);
          break;
        }
      return i < s ? -1 : s < i ? 1 : 0;
    }),
    (wa.prototype.includes = function (e, t, n) {
      return -1 !== this.indexOf(e, t, n);
    }),
    (wa.prototype.indexOf = function (e, t, n) {
      return Ca(this, e, t, n, !0);
    }),
    (wa.prototype.lastIndexOf = function (e, t, n) {
      return Ca(this, e, t, n, !1);
    }),
    (wa.prototype.write = function (e, t, n, r) {
      if (void 0 === t) (r = "utf8"), (n = this.length), (t = 0);
      else if (void 0 === n && "string" == typeof t)
        (r = t), (n = this.length), (t = 0);
      else {
        if (!isFinite(t))
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        (t |= 0),
          isFinite(n)
            ? ((n |= 0), void 0 === r && (r = "utf8"))
            : ((r = n), (n = void 0));
      }
      var o = this.length - t;
      if (
        ((void 0 === n || n > o) && (n = o),
        (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      r || (r = "utf8");
      for (var i = !1; ; )
        switch (r) {
          case "hex":
            return Ia(this, e, t, n);
          case "utf8":
          case "utf-8":
            return Ta(this, e, t, n);
          case "ascii":
            return La(this, e, t, n);
          case "latin1":
          case "binary":
            return Ba(this, e, t, n);
          case "base64":
            return Ra(this, e, t, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return $a(this, e, t, n);
          default:
            if (i) throw new TypeError("Unknown encoding: " + r);
            (r = ("" + r).toLowerCase()), (i = !0);
        }
    }),
    (wa.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    });
  var Na = 4096;
  function Ha(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
    return r;
  }
  function qa(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
    return r;
  }
  function Ma(e, t, n) {
    var r = e.length;
    (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
    for (var o = "", i = t; i < n; ++i) o += Ja(e[i]);
    return o;
  }
  function Fa(e, t, n) {
    for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2)
      o += String.fromCharCode(r[i] + 256 * r[i + 1]);
    return o;
  }
  function Da(e, t, n) {
    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
    if (e + t > n)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function za(e, t, n, r, o, i) {
    if (!ka(e))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > o || t < i)
      throw new RangeError('"value" argument is out of bounds');
    if (n + r > e.length) throw new RangeError("Index out of range");
  }
  function Ka(e, t, n, r) {
    t < 0 && (t = 65535 + t + 1);
    for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o)
      e[n + o] = (t & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o));
  }
  function Ga(e, t, n, r) {
    t < 0 && (t = 4294967295 + t + 1);
    for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o)
      e[n + o] = (t >>> (8 * (r ? o : 3 - o))) & 255;
  }
  function Wa(e, t, n, r, o, i) {
    if (n + r > e.length) throw new RangeError("Index out of range");
    if (n < 0) throw new RangeError("Index out of range");
  }
  function Va(e, t, n, r, o) {
    return o || Wa(e, 0, n, 4), da(e, t, n, r, 23, 4), n + 4;
  }
  function Ya(e, t, n, r, o) {
    return o || Wa(e, 0, n, 8), da(e, t, n, r, 52, 8), n + 8;
  }
  (wa.prototype.slice = function (e, t) {
    var n,
      r = this.length;
    if (
      ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
      (t = void 0 === t ? r : ~~t) < 0
        ? (t += r) < 0 && (t = 0)
        : t > r && (t = r),
      t < e && (t = e),
      wa.TYPED_ARRAY_SUPPORT)
    )
      (n = this.subarray(e, t)).__proto__ = wa.prototype;
    else {
      var o = t - e;
      n = new wa(o, void 0);
      for (var i = 0; i < o; ++i) n[i] = this[i + e];
    }
    return n;
  }),
    (wa.prototype.readUIntLE = function (e, t, n) {
      (e |= 0), (t |= 0), n || Da(e, t, this.length);
      for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
        r += this[e + i] * o;
      return r;
    }),
    (wa.prototype.readUIntBE = function (e, t, n) {
      (e |= 0), (t |= 0), n || Da(e, t, this.length);
      for (var r = this[e + --t], o = 1; t > 0 && (o *= 256); )
        r += this[e + --t] * o;
      return r;
    }),
    (wa.prototype.readUInt8 = function (e, t) {
      return t || Da(e, 1, this.length), this[e];
    }),
    (wa.prototype.readUInt16LE = function (e, t) {
      return t || Da(e, 2, this.length), this[e] | (this[e + 1] << 8);
    }),
    (wa.prototype.readUInt16BE = function (e, t) {
      return t || Da(e, 2, this.length), (this[e] << 8) | this[e + 1];
    }),
    (wa.prototype.readUInt32LE = function (e, t) {
      return (
        t || Da(e, 4, this.length),
        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
          16777216 * this[e + 3]
      );
    }),
    (wa.prototype.readUInt32BE = function (e, t) {
      return (
        t || Da(e, 4, this.length),
        16777216 * this[e] +
          ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
      );
    }),
    (wa.prototype.readIntLE = function (e, t, n) {
      (e |= 0), (t |= 0), n || Da(e, t, this.length);
      for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
        r += this[e + i] * o;
      return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;
    }),
    (wa.prototype.readIntBE = function (e, t, n) {
      (e |= 0), (t |= 0), n || Da(e, t, this.length);
      for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256); )
        i += this[e + --r] * o;
      return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
    }),
    (wa.prototype.readInt8 = function (e, t) {
      return (
        t || Da(e, 1, this.length),
        128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
      );
    }),
    (wa.prototype.readInt16LE = function (e, t) {
      t || Da(e, 2, this.length);
      var n = this[e] | (this[e + 1] << 8);
      return 32768 & n ? 4294901760 | n : n;
    }),
    (wa.prototype.readInt16BE = function (e, t) {
      t || Da(e, 2, this.length);
      var n = this[e + 1] | (this[e] << 8);
      return 32768 & n ? 4294901760 | n : n;
    }),
    (wa.prototype.readInt32LE = function (e, t) {
      return (
        t || Da(e, 4, this.length),
        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
      );
    }),
    (wa.prototype.readInt32BE = function (e, t) {
      return (
        t || Da(e, 4, this.length),
        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
      );
    }),
    (wa.prototype.readFloatLE = function (e, t) {
      return t || Da(e, 4, this.length), ha(this, e, !0, 23, 4);
    }),
    (wa.prototype.readFloatBE = function (e, t) {
      return t || Da(e, 4, this.length), ha(this, e, !1, 23, 4);
    }),
    (wa.prototype.readDoubleLE = function (e, t) {
      return t || Da(e, 8, this.length), ha(this, e, !0, 52, 8);
    }),
    (wa.prototype.readDoubleBE = function (e, t) {
      return t || Da(e, 8, this.length), ha(this, e, !1, 52, 8);
    }),
    (wa.prototype.writeUIntLE = function (e, t, n, r) {
      ((e = +e), (t |= 0), (n |= 0), r) ||
        za(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
      var o = 1,
        i = 0;
      for (this[t] = 255 & e; ++i < n && (o *= 256); )
        this[t + i] = (e / o) & 255;
      return t + n;
    }),
    (wa.prototype.writeUIntBE = function (e, t, n, r) {
      ((e = +e), (t |= 0), (n |= 0), r) ||
        za(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
      var o = n - 1,
        i = 1;
      for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); )
        this[t + o] = (e / i) & 255;
      return t + n;
    }),
    (wa.prototype.writeUInt8 = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 1, 255, 0),
        wa.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        (this[t] = 255 & e),
        t + 1
      );
    }),
    (wa.prototype.writeUInt16LE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 2, 65535, 0),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
          : Ka(this, e, t, !0),
        t + 2
      );
    }),
    (wa.prototype.writeUInt16BE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 2, 65535, 0),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
          : Ka(this, e, t, !1),
        t + 2
      );
    }),
    (wa.prototype.writeUInt32LE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 4, 4294967295, 0),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t + 3] = e >>> 24),
            (this[t + 2] = e >>> 16),
            (this[t + 1] = e >>> 8),
            (this[t] = 255 & e))
          : Ga(this, e, t, !0),
        t + 4
      );
    }),
    (wa.prototype.writeUInt32BE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 4, 4294967295, 0),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e))
          : Ga(this, e, t, !1),
        t + 4
      );
    }),
    (wa.prototype.writeIntLE = function (e, t, n, r) {
      if (((e = +e), (t |= 0), !r)) {
        var o = Math.pow(2, 8 * n - 1);
        za(this, e, t, n, o - 1, -o);
      }
      var i = 0,
        s = 1,
        a = 0;
      for (this[t] = 255 & e; ++i < n && (s *= 256); )
        e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1),
          (this[t + i] = (((e / s) >> 0) - a) & 255);
      return t + n;
    }),
    (wa.prototype.writeIntBE = function (e, t, n, r) {
      if (((e = +e), (t |= 0), !r)) {
        var o = Math.pow(2, 8 * n - 1);
        za(this, e, t, n, o - 1, -o);
      }
      var i = n - 1,
        s = 1,
        a = 0;
      for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); )
        e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
          (this[t + i] = (((e / s) >> 0) - a) & 255);
      return t + n;
    }),
    (wa.prototype.writeInt8 = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 1, 127, -128),
        wa.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
        e < 0 && (e = 255 + e + 1),
        (this[t] = 255 & e),
        t + 1
      );
    }),
    (wa.prototype.writeInt16LE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 2, 32767, -32768),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
          : Ka(this, e, t, !0),
        t + 2
      );
    }),
    (wa.prototype.writeInt16BE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 2, 32767, -32768),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
          : Ka(this, e, t, !1),
        t + 2
      );
    }),
    (wa.prototype.writeInt32LE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 4, 2147483647, -2147483648),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            (this[t + 2] = e >>> 16),
            (this[t + 3] = e >>> 24))
          : Ga(this, e, t, !0),
        t + 4
      );
    }),
    (wa.prototype.writeInt32BE = function (e, t, n) {
      return (
        (e = +e),
        (t |= 0),
        n || za(this, e, t, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        wa.TYPED_ARRAY_SUPPORT
          ? ((this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e))
          : Ga(this, e, t, !1),
        t + 4
      );
    }),
    (wa.prototype.writeFloatLE = function (e, t, n) {
      return Va(this, e, t, !0, n);
    }),
    (wa.prototype.writeFloatBE = function (e, t, n) {
      return Va(this, e, t, !1, n);
    }),
    (wa.prototype.writeDoubleLE = function (e, t, n) {
      return Ya(this, e, t, !0, n);
    }),
    (wa.prototype.writeDoubleBE = function (e, t, n) {
      return Ya(this, e, t, !1, n);
    }),
    (wa.prototype.copy = function (e, t, n, r) {
      if (
        (n || (n = 0),
        r || 0 === r || (r = this.length),
        t >= e.length && (t = e.length),
        t || (t = 0),
        r > 0 && r < n && (r = n),
        r === n)
      )
        return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (r < 0) throw new RangeError("sourceEnd out of bounds");
      r > this.length && (r = this.length),
        e.length - t < r - n && (r = e.length - t + n);
      var o,
        i = r - n;
      if (this === e && n < t && t < r)
        for (o = i - 1; o >= 0; --o) e[o + t] = this[o + n];
      else if (i < 1e3 || !wa.TYPED_ARRAY_SUPPORT)
        for (o = 0; o < i; ++o) e[o + t] = this[o + n];
      else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
      return i;
    }),
    (wa.prototype.fill = function (e, t, n, r) {
      if ("string" == typeof e) {
        if (
          ("string" == typeof t
            ? ((r = t), (t = 0), (n = this.length))
            : "string" == typeof n && ((r = n), (n = this.length)),
          1 === e.length)
        ) {
          var o = e.charCodeAt(0);
          o < 256 && (e = o);
        }
        if (void 0 !== r && "string" != typeof r)
          throw new TypeError("encoding must be a string");
        if ("string" == typeof r && !wa.isEncoding(r))
          throw new TypeError("Unknown encoding: " + r);
      } else "number" == typeof e && (e &= 255);
      if (t < 0 || this.length < t || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= t) return this;
      var i;
      if (
        ((t >>>= 0),
        (n = void 0 === n ? this.length : n >>> 0),
        e || (e = 0),
        "number" == typeof e)
      )
        for (i = t; i < n; ++i) this[i] = e;
      else {
        var s = ka(e) ? e : Qa(new wa(e, r).toString()),
          a = s.length;
        for (i = 0; i < n - t; ++i) this[i + t] = s[i % a];
      }
      return this;
    });
  var Za = /[^+\/0-9A-Za-z-_]/g;
  function Ja(e) {
    return e < 16 ? "0" + e.toString(16) : e.toString(16);
  }
  function Qa(e, t) {
    var n;
    t = t || 1 / 0;
    for (var r = e.length, o = null, i = [], s = 0; s < r; ++s) {
      if ((n = e.charCodeAt(s)) > 55295 && n < 57344) {
        if (!o) {
          if (n > 56319) {
            (t -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          if (s + 1 === r) {
            (t -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = n;
          continue;
        }
        if (n < 56320) {
          (t -= 3) > -1 && i.push(239, 191, 189), (o = n);
          continue;
        }
        n = 65536 + (((o - 55296) << 10) | (n - 56320));
      } else o && (t -= 3) > -1 && i.push(239, 191, 189);
      if (((o = null), n < 128)) {
        if ((t -= 1) < 0) break;
        i.push(n);
      } else if (n < 2048) {
        if ((t -= 2) < 0) break;
        i.push((n >> 6) | 192, (63 & n) | 128);
      } else if (n < 65536) {
        if ((t -= 3) < 0) break;
        i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
      } else {
        if (!(n < 1114112)) throw new Error("Invalid code point");
        if ((t -= 4) < 0) break;
        i.push(
          (n >> 18) | 240,
          ((n >> 12) & 63) | 128,
          ((n >> 6) & 63) | 128,
          (63 & n) | 128
        );
      }
    }
    return i;
  }
  function Xa(e) {
    return (function (e) {
      var t, n, r, o, i, s;
      ca || ua();
      var a = e.length;
      if (a % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      (i = "=" === e[a - 2] ? 2 : "=" === e[a - 1] ? 1 : 0),
        (s = new aa((3 * a) / 4 - i)),
        (r = i > 0 ? a - 4 : a);
      var c = 0;
      for (t = 0, n = 0; t < r; t += 4, n += 3)
        (o =
          (sa[e.charCodeAt(t)] << 18) |
          (sa[e.charCodeAt(t + 1)] << 12) |
          (sa[e.charCodeAt(t + 2)] << 6) |
          sa[e.charCodeAt(t + 3)]),
          (s[c++] = (o >> 16) & 255),
          (s[c++] = (o >> 8) & 255),
          (s[c++] = 255 & o);
      return (
        2 === i
          ? ((o = (sa[e.charCodeAt(t)] << 2) | (sa[e.charCodeAt(t + 1)] >> 4)),
            (s[c++] = 255 & o))
          : 1 === i &&
            ((o =
              (sa[e.charCodeAt(t)] << 10) |
              (sa[e.charCodeAt(t + 1)] << 4) |
              (sa[e.charCodeAt(t + 2)] >> 2)),
            (s[c++] = (o >> 8) & 255),
            (s[c++] = 255 & o)),
        s
      );
    })(
      (function (e) {
        if (
          (e = (function (e) {
            return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
          })(e).replace(Za, "")).length < 2
        )
          return "";
        for (; e.length % 4 != 0; ) e += "=";
        return e;
      })(e)
    );
  }
  function ec(e, t, n, r) {
    for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o)
      t[o + n] = e[o];
    return o;
  }
  function tc(e) {
    return (
      !!e.constructor &&
      "function" == typeof e.constructor.isBuffer &&
      e.constructor.isBuffer(e)
    );
  }
  var nc,
    rc,
    oc = {};
  var ic,
    sc,
    ac,
    cc,
    uc = {
      name: "websocket",
      description:
        "Websocket Client & Server Library implementing the WebSocket protocol as specified in RFC 6455.",
      keywords: [
        "websocket",
        "websockets",
        "socket",
        "networking",
        "comet",
        "push",
        "RFC-6455",
        "realtime",
        "server",
        "client",
      ],
      author:
        "Brian McKelvey <theturtle32@gmail.com> (https://github.com/theturtle32)",
      contributors: [
        "Iñaki Baz Castillo <ibc@aliax.net> (http://dev.sipdoc.net)",
      ],
      version: "1.0.34",
      repository: {
        type: "git",
        url: "https://github.com/theturtle32/WebSocket-Node.git",
      },
      homepage: "https://github.com/theturtle32/WebSocket-Node",
      engines: { node: ">=4.0.0" },
      dependencies: {
        bufferutil: "^4.0.1",
        debug: "^2.2.0",
        "es5-ext": "^0.10.50",
        "typedarray-to-buffer": "^3.1.5",
        "utf-8-validate": "^5.0.2",
        yaeti: "^0.0.6",
      },
      devDependencies: {
        "buffer-equal": "^1.0.0",
        gulp: "^4.0.2",
        "gulp-jshint": "^2.0.4",
        "jshint-stylish": "^2.2.1",
        jshint: "^2.0.0",
        tape: "^4.9.1",
      },
      config: { verbose: !1 },
      scripts: { test: "tape test/unit/*.js", gulp: "gulp" },
      main: "index",
      directories: { lib: "./lib" },
      browser: "lib/browser.js",
      license: "Apache-2.0",
    };
  function lc() {
    if (cc) return ac;
    var e;
    if (((cc = 1), "object" == typeof globalThis)) e = globalThis;
    else
      try {
        e = (function () {
          if (rc) return nc;
          rc = 1;
          var e = function () {
            if ("object" == typeof self && self) return self;
            if ("object" == typeof window && window) return window;
            throw new Error("Unable to resolve global `this`");
          };
          return (nc = (function () {
            if (this) return this;
            if ("object" == typeof globalThis && globalThis) return globalThis;
            try {
              Object.defineProperty(Object.prototype, "__global__", {
                get: function () {
                  return this;
                },
                configurable: !0,
              });
            } catch (t) {
              return e();
            }
            try {
              return __global__ || e();
            } finally {
              delete Object.prototype.__global__;
            }
          })());
        })();
      } catch (e) {
      } finally {
        if ((e || "undefined" == typeof window || (e = window), !e))
          throw new Error("Could not determine global this");
      }
    var t = e.WebSocket || e.MozWebSocket,
      n = sc ? ic : ((sc = 1), (ic = uc.version));
    function r(e, n) {
      return n ? new t(e, n) : new t(e);
    }
    return (
      t &&
        ["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function (e) {
          Object.defineProperty(r, e, {
            get: function () {
              return t[e];
            },
          });
        }),
      (ac = { w3cwebsocket: t ? r : null, version: n })
    );
  }
  var fc,
    hc,
    dc = {},
    pc = {},
    yc = {},
    bc = {},
    gc = {},
    wc = {};
  function vc() {
    if (hc) return gc;
    hc = 1;
    var e =
      (Bn && Bn.__values) ||
      function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function () {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            },
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(gc, "__esModule", { value: !0 }),
      (gc.Container = void 0);
    var t = (function () {
        if (fc) return wc;
        (fc = 1),
          Object.defineProperty(wc, "__esModule", { value: !0 }),
          (wc.ForOfAdaptor = void 0);
        var e = (function () {
          function e(e, t) {
            (this.it_ = e), (this.last_ = t);
          }
          return (
            (e.prototype.next = function () {
              if (this.it_.equals(this.last_))
                return { done: !0, value: void 0 };
              var e = this.it_;
              return (this.it_ = this.it_.next()), { done: !1, value: e.value };
            }),
            (e.prototype[Symbol.iterator] = function () {
              return this;
            }),
            e
          );
        })();
        return (wc.ForOfAdaptor = e), wc;
      })(),
      n = (function () {
        function n() {}
        return (
          (n.prototype.empty = function () {
            return 0 === this.size();
          }),
          (n.prototype.rbegin = function () {
            return this.end().reverse();
          }),
          (n.prototype.rend = function () {
            return this.begin().reverse();
          }),
          (n.prototype[Symbol.iterator] = function () {
            return new t.ForOfAdaptor(this.begin(), this.end());
          }),
          (n.prototype.toJSON = function () {
            var t,
              n,
              r = [];
            try {
              for (var o = e(this), i = o.next(); !i.done; i = o.next()) {
                var s = i.value;
                r.push(s);
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                i && !i.done && (n = o.return) && n.call(o);
              } finally {
                if (t) throw t.error;
              }
            }
            return r;
          }),
          n
        );
      })();
    return (gc.Container = n), gc;
  }
  var mc,
    _c,
    xc = {};
  function Ec() {
    if (mc) return xc;
    mc = 1;
    var e =
      (Bn && Bn.__read) ||
      function (e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r,
          o,
          i = n.call(e),
          s = [];
        try {
          for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
            s.push(r.value);
        } catch (e) {
          o = { error: e };
        } finally {
          try {
            r && !r.done && (n = i.return) && n.call(i);
          } finally {
            if (o) throw o.error;
          }
        }
        return s;
      };
    Object.defineProperty(xc, "__esModule", { value: !0 }),
      (xc.NativeArrayIterator = void 0);
    var t = (function () {
      function t(e, t) {
        (this.data_ = e), (this.index_ = t);
      }
      return (
        (t.prototype.index = function () {
          return this.index_;
        }),
        Object.defineProperty(t.prototype, "value", {
          get: function () {
            return this.data_[this.index_];
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.prev = function () {
          return --this.index_, this;
        }),
        (t.prototype.next = function () {
          return ++this.index_, this;
        }),
        (t.prototype.advance = function (e) {
          return (this.index_ += e), this;
        }),
        (t.prototype.equals = function (e) {
          return this.data_ === e.data_ && this.index_ === e.index_;
        }),
        (t.prototype.swap = function (t) {
          var n, r;
          (n = e([t.data_, this.data_], 2)),
            (this.data_ = n[0]),
            (t.data_ = n[1]),
            (r = e([t.index_, this.index_], 2)),
            (this.index_ = r[0]),
            (t.index_ = r[1]);
        }),
        t
      );
    })();
    return (xc.NativeArrayIterator = t), xc;
  }
  var kc,
    Sc,
    Ac,
    Oc = {},
    Cc = {},
    Pc = {},
    Ic = {};
  function Tc() {
    if (Sc) return Pc;
    Sc = 1;
    var e,
      t =
        (Bn && Bn.__extends) ||
        ((e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        });
    Object.defineProperty(Pc, "__esModule", { value: !0 }),
      (Pc.LogicError = void 0);
    var n = (function () {
        if (kc) return Ic;
        kc = 1;
        var e,
          t =
            (Bn && Bn.__extends) ||
            ((e = function (t, n) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  }),
                e(t, n)
              );
            }),
            function (t, n) {
              if ("function" != typeof n && null !== n)
                throw new TypeError(
                  "Class extends value " +
                    String(n) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              e(t, n),
                (t.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            });
        Object.defineProperty(Ic, "__esModule", { value: !0 }),
          (Ic.Exception = void 0);
        var n = (function (e) {
          function n(t) {
            var n = this.constructor,
              r = e.call(this, t) || this,
              o = n.prototype;
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(r, o)
                : (r.__proto__ = o),
              r
            );
          }
          return (
            t(n, e),
            Object.defineProperty(n.prototype, "name", {
              get: function () {
                return this.constructor.name;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (n.prototype.what = function () {
              return this.message;
            }),
            (n.prototype.toJSON = function () {
              return {
                name: this.name,
                message: this.message,
                stack: this.stack,
              };
            }),
            n
          );
        })(Error);
        return (Ic.Exception = n), Ic;
      })(),
      r = (function (e) {
        function n(t) {
          return e.call(this, t) || this;
        }
        return t(n, e), n;
      })(n.Exception);
    return (Pc.LogicError = r), Pc;
  }
  function Lc() {
    if (Ac) return Cc;
    Ac = 1;
    var e,
      t =
        (Bn && Bn.__extends) ||
        ((e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        });
    Object.defineProperty(Cc, "__esModule", { value: !0 }),
      (Cc.InvalidArgument = void 0);
    var n = (function (e) {
      function n(t) {
        return e.call(this, t) || this;
      }
      return t(n, e), n;
    })(Tc().LogicError);
    return (Cc.InvalidArgument = n), Cc;
  }
  var Bc,
    Rc,
    $c,
    jc = {};
  function Uc() {
    return (
      Rc ||
        ((Rc = 1),
        (function (e) {
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.ErrorGenerator = void 0);
          var t = Lc(),
            n = (function () {
              if (Bc) return jc;
              Bc = 1;
              var e,
                t =
                  (Bn && Bn.__extends) ||
                  ((e = function (t, n) {
                    return (
                      (e =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) &&
                              (e[n] = t[n]);
                        }),
                      e(t, n)
                    );
                  }),
                  function (t, n) {
                    if ("function" != typeof n && null !== n)
                      throw new TypeError(
                        "Class extends value " +
                          String(n) +
                          " is not a constructor or null"
                      );
                    function r() {
                      this.constructor = t;
                    }
                    e(t, n),
                      (t.prototype =
                        null === n
                          ? Object.create(n)
                          : ((r.prototype = n.prototype), new r()));
                  });
              Object.defineProperty(jc, "__esModule", { value: !0 }),
                (jc.OutOfRange = void 0);
              var n = (function (e) {
                function n(t) {
                  return e.call(this, t) || this;
                }
                return t(n, e), n;
              })(Tc().LogicError);
              return (jc.OutOfRange = n), jc;
            })();
          !(function (e) {
            function r(e) {
              if ("string" == typeof e) return e;
              var t = e.constructor.name;
              return (
                e.constructor.__MODULE &&
                  (t = "".concat(e.constructor.__MODULE, ".").concat(t)),
                "std.".concat(t)
              );
            }
            (e.get_class_name = r),
              (e.empty = function (e, t) {
                return new n.OutOfRange(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(t, "(): it's empty container.")
                );
              }),
              (e.negative_index = function (e, t, o) {
                return new n.OutOfRange(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(t, "(): parametric index is negative -> (index = ")
                    .concat(o, ").")
                );
              }),
              (e.excessive_index = function (e, t, o, i) {
                return new n.OutOfRange(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(
                      t,
                      "(): parametric index is equal or greater than size -> (index = "
                    )
                    .concat(o, ", size: ")
                    .concat(i, ").")
                );
              }),
              (e.not_my_iterator = function (e, n) {
                return new t.InvalidArgument(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(
                      n,
                      "(): parametric iterator is not this container's own."
                    )
                );
              }),
              (e.erased_iterator = function (e, n) {
                return new t.InvalidArgument(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(
                      n,
                      "(): parametric iterator, it already has been erased."
                    )
                );
              }),
              (e.negative_iterator = function (e, t, o) {
                return new n.OutOfRange(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(
                      t,
                      "(): parametric iterator is directing negative position -> (index = "
                    )
                    .concat(o, ").")
                );
              }),
              (e.iterator_end_value = function (e, t) {
                void 0 === t && (t = "end");
                var o = r(e);
                return new n.OutOfRange(
                  "Error on "
                    .concat(o, ".Iterator.value: cannot access to the ")
                    .concat(o, ".")
                    .concat(t, "().value.")
                );
              }),
              (e.key_nout_found = function (e, t, o) {
                throw new n.OutOfRange(
                  "Error on "
                    .concat(r(e), ".")
                    .concat(t, "(): unable to find the matched key -> ")
                    .concat(o)
                );
              });
          })(e.ErrorGenerator || (e.ErrorGenerator = {}));
        })(Oc)),
      Oc
    );
  }
  function Nc() {
    if ($c) return yc;
    $c = 1;
    var e,
      t =
        (Bn && Bn.__extends) ||
        ((e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        }),
      n =
        (Bn && Bn.__read) ||
        function (e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            o,
            i = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
              s.push(r.value);
          } catch (e) {
            o = { error: e };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (o) throw o.error;
            }
          }
          return s;
        },
      r =
        (Bn && Bn.__spreadArray) ||
        function (e, t, n) {
          if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
              (!r && o in t) ||
                (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
          return e.concat(r || Array.prototype.slice.call(t));
        };
    Object.defineProperty(yc, "__esModule", { value: !0 }),
      (yc.UniqueSet = void 0);
    var o = (function () {
        if (_c) return bc;
        _c = 1;
        var e,
          t =
            (Bn && Bn.__extends) ||
            ((e = function (t, n) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  }),
                e(t, n)
              );
            }),
            function (t, n) {
              if ("function" != typeof n && null !== n)
                throw new TypeError(
                  "Class extends value " +
                    String(n) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              e(t, n),
                (t.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            });
        Object.defineProperty(bc, "__esModule", { value: !0 }),
          (bc.SetContainer = void 0);
        var n = vc(),
          r = Ec(),
          o = (function (e) {
            function n(t) {
              var n = e.call(this) || this;
              return (n.data_ = t(n)), n;
            }
            return (
              t(n, e),
              (n.prototype.assign = function (e, t) {
                this.clear(), this.insert(e, t);
              }),
              (n.prototype.clear = function () {
                this.data_.clear();
              }),
              (n.prototype.begin = function () {
                return this.data_.begin();
              }),
              (n.prototype.end = function () {
                return this.data_.end();
              }),
              (n.prototype.has = function (e) {
                return !this.find(e).equals(this.end());
              }),
              (n.prototype.size = function () {
                return this.data_.size();
              }),
              (n.prototype.push = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                if (0 === e.length) return this.size();
                var n = new r.NativeArrayIterator(e, 0),
                  o = new r.NativeArrayIterator(e, e.length);
                return this._Insert_by_range(n, o), this.size();
              }),
              (n.prototype.insert = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                return 1 === e.length
                  ? this._Insert_by_key(e[0])
                  : e[0].next instanceof Function &&
                    e[1].next instanceof Function
                  ? this._Insert_by_range(e[0], e[1])
                  : this._Insert_by_hint(e[0], e[1]);
              }),
              (n.prototype.erase = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                return 1 !== e.length ||
                  (e[0] instanceof this.end().constructor &&
                    e[0].source() === this)
                  ? 1 === e.length
                    ? this._Erase_by_range(e[0])
                    : this._Erase_by_range(e[0], e[1])
                  : this._Erase_by_val(e[0]);
              }),
              (n.prototype._Erase_by_range = function (e, t) {
                void 0 === t && (t = e.next());
                var n = this.data_.erase(e, t);
                return this._Handle_erase(e, t), n;
              }),
              n
            );
          })(n.Container);
        return (bc.SetContainer = o), bc;
      })(),
      i = Uc(),
      s = (function (e) {
        function o() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          t(o, e),
          (o.prototype.count = function (e) {
            return this.find(e).equals(this.end()) ? 0 : 1;
          }),
          (o.prototype.insert = function () {
            for (var t = [], o = 0; o < arguments.length; o++)
              t[o] = arguments[o];
            return e.prototype.insert.apply(this, r([], n(t), !1));
          }),
          (o.prototype._Insert_by_range = function (e, t) {
            for (; !e.equals(t); e = e.next()) this._Insert_by_key(e.value);
          }),
          (o.prototype.extract = function (e) {
            return e instanceof this.end().constructor
              ? this._Extract_by_iterator(e)
              : this._Extract_by_val(e);
          }),
          (o.prototype._Extract_by_val = function (e) {
            var t = this.find(e);
            if (!0 === t.equals(this.end()))
              throw i.ErrorGenerator.key_nout_found(this, "extract", e);
            return this._Erase_by_range(t), e;
          }),
          (o.prototype._Extract_by_iterator = function (e) {
            return !0 === e.equals(this.end()) || !1 === this.has(e.value)
              ? this.end()
              : (this._Erase_by_range(e), e);
          }),
          (o.prototype._Erase_by_val = function (e) {
            var t = this.find(e);
            return !0 === t.equals(this.end())
              ? 0
              : (this._Erase_by_range(t), 1);
          }),
          (o.prototype.merge = function (e) {
            for (var t = e.begin(); !t.equals(e.end()); )
              !1 === this.has(t.value)
                ? (this.insert(t.value), (t = e.erase(t)))
                : (t = t.next());
          }),
          o
        );
      })(o.SetContainer);
    return (yc.UniqueSet = s), yc;
  }
  var Hc,
    qc = {},
    Mc = {};
  var Fc,
    Dc,
    zc,
    Kc = {},
    Gc = {},
    Wc = {};
  function Vc() {
    if (Dc) return Gc;
    (Dc = 1),
      Object.defineProperty(Gc, "__esModule", { value: !0 }),
      (Gc.get_uid = void 0);
    var e = (function () {
      if (Fc) return Wc;
      (Fc = 1),
        Object.defineProperty(Wc, "__esModule", { value: !0 }),
        (Wc._Get_root = void 0);
      var e = ra;
      Wc._Get_root = function () {
        return (
          null === t &&
            void 0 === (t = (0, e.is_node)() ? Bn : self).__s_iUID &&
            (t.__s_iUID = 0),
          t
        );
      };
      var t = null;
      return Wc;
    })();
    return (
      (Gc.get_uid = function (t) {
        if (t instanceof Object) {
          if (!1 === t.hasOwnProperty("__get_m_iUID")) {
            var n = ++(0, e._Get_root)().__s_iUID;
            Object.defineProperty(t, "__get_m_iUID", {
              value: function () {
                return n;
              },
            });
          }
          return t.__get_m_iUID();
        }
        return void 0 === t ? -1 : 0;
      }),
      Gc
    );
  }
  function Yc() {
    if (zc) return Kc;
    zc = 1;
    var e =
      (Bn && Bn.__values) ||
      function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function () {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            },
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(Kc, "__esModule", { value: !0 }), (Kc.hash = void 0);
    var t = Vc();
    function n(e, t) {
      return (t ^= e ? 1 : 0), (t *= s);
    }
    function r(e, t) {
      return o(e.toString(), t);
    }
    function o(e, t) {
      for (var n = 0; n < e.length; ++n) (t ^= e.charCodeAt(n)), (t *= s);
      return Math.abs(t);
    }
    Kc.hash = function () {
      for (var a, c, u = [], l = 0; l < arguments.length; l++)
        u[l] = arguments[l];
      var f = i;
      try {
        for (var h = e(u), d = h.next(); !d.done; d = h.next()) {
          var p = d.value,
            y = typeof (p = p ? p.valueOf() : p);
          if ("boolean" === y) f = n(p, f);
          else if ("number" === y || "bigint" === y) f = r(p, f);
          else if ("string" === y) f = o(p, f);
          else if (p instanceof Object && p.hashCode instanceof Function) {
            var b = p.hashCode();
            if (1 === u.length) return b;
            (f ^= b), (f *= s);
          } else f = r((0, t.get_uid)(p), f);
        }
      } catch (e) {
        a = { error: e };
      } finally {
        try {
          d && !d.done && (c = h.return) && c.call(h);
        } finally {
          if (a) throw a.error;
        }
      }
      return Math.abs(f);
    };
    var i = 2166136261,
      s = 16777619;
    return Kc;
  }
  var Zc,
    Jc,
    Qc = {};
  function Xc() {
    if (Zc) return Qc;
    (Zc = 1),
      Object.defineProperty(Qc, "__esModule", { value: !0 }),
      (Qc.greater_equal =
        Qc.greater =
        Qc.less_equal =
        Qc.less =
        Qc.not_equal_to =
        Qc.equal_to =
          void 0);
    var e = Vc();
    function t(e, t) {
      return (
        (e = e ? e.valueOf() : e),
        (t = t ? t.valueOf() : t),
        e instanceof Object && e.equals instanceof Function
          ? e.equals(t)
          : e === t
      );
    }
    function n(t, n) {
      return (
        (t = t.valueOf()),
        (n = n.valueOf()),
        t instanceof Object
          ? t.less instanceof Function
            ? t.less(n)
            : (0, e.get_uid)(t) < (0, e.get_uid)(n)
          : t < n
      );
    }
    function r(e, r) {
      return n(e, r) || t(e, r);
    }
    return (
      (Qc.equal_to = t),
      (Qc.not_equal_to = function (e, n) {
        return !t(e, n);
      }),
      (Qc.less = n),
      (Qc.less_equal = r),
      (Qc.greater = function (e, t) {
        return !r(e, t);
      }),
      (Qc.greater_equal = function (e, t) {
        return !n(e, t);
      }),
      Qc
    );
  }
  function eu() {
    return (
      Jc ||
        ((Jc = 1),
        (function (e) {
          var t =
              (Bn && Bn.__read) ||
              function (e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r,
                  o,
                  i = n.call(e),
                  s = [];
                try {
                  for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
                    s.push(r.value);
                } catch (e) {
                  o = { error: e };
                } finally {
                  try {
                    r && !r.done && (n = i.return) && n.call(i);
                  } finally {
                    if (o) throw o.error;
                  }
                }
                return s;
              },
            n =
              (Bn && Bn.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var r, o = 0, i = t.length; o < i; o++)
                    (!r && o in t) ||
                      (r || (r = Array.prototype.slice.call(t, 0, o)),
                      (r[o] = t[o]));
                return e.concat(r || Array.prototype.slice.call(t));
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.IHashContainer = void 0);
          var r = (function () {
              return (
                Hc ||
                  ((Hc = 1),
                  (e = Mc),
                  (t =
                    (Bn && Bn.__read) ||
                    function (e, t) {
                      var n = "function" == typeof Symbol && e[Symbol.iterator];
                      if (!n) return e;
                      var r,
                        o,
                        i = n.call(e),
                        s = [];
                      try {
                        for (
                          ;
                          (void 0 === t || t-- > 0) && !(r = i.next()).done;

                        )
                          s.push(r.value);
                      } catch (e) {
                        o = { error: e };
                      } finally {
                        try {
                          r && !r.done && (n = i.return) && n.call(i);
                        } finally {
                          if (o) throw o.error;
                        }
                      }
                      return s;
                    }),
                  (n =
                    (Bn && Bn.__spreadArray) ||
                    function (e, t, n) {
                      if (n || 2 === arguments.length)
                        for (var r, o = 0, i = t.length; o < i; o++)
                          (!r && o in t) ||
                            (r || (r = Array.prototype.slice.call(t, 0, o)),
                            (r[o] = t[o]));
                      return e.concat(r || Array.prototype.slice.call(t));
                    }),
                  Object.defineProperty(e, "__esModule", { value: !0 }),
                  (e.IAssociativeContainer = void 0),
                  (function (e) {
                    e.construct = function (e) {
                      for (var r, o, i = [], s = 1; s < arguments.length; s++)
                        i[s - 1] = arguments[s];
                      return (
                        i.length >= 1 && i[0] instanceof Array
                          ? ((r = function () {
                              var r = i[0];
                              e.push.apply(e, n([], t(r), !1));
                            }),
                            (o = i.slice(1)))
                          : i.length >= 2 &&
                            i[0].next instanceof Function &&
                            i[1].next instanceof Function
                          ? ((r = function () {
                              var t = i[0],
                                n = i[1];
                              e.assign(t, n);
                            }),
                            (o = i.slice(2)))
                          : ((r = null), (o = i)),
                        { ramda: r, tail: o }
                      );
                    };
                  })(
                    e.IAssociativeContainer || (e.IAssociativeContainer = {})
                  )),
                Mc
              );
              var e, t, n;
            })(),
            o = Yc(),
            i = Xc();
          !(function (e) {
            e.construct = function (e, s, a) {
              for (var c = [], u = 3; u < arguments.length; u++)
                c[u - 3] = arguments[u];
              var l = null,
                f = o.hash,
                h = i.equal_to;
              if (1 === c.length && c[0] instanceof s) {
                var d = c[0];
                (f = d.hash_function()),
                  (h = d.key_eq()),
                  (l = function () {
                    var t = d.begin(),
                      n = d.end();
                    e.assign(t, n);
                  });
              } else {
                var p = r.IAssociativeContainer.construct.apply(
                  r.IAssociativeContainer,
                  n([e], t(c), !1)
                );
                (l = p.ramda),
                  p.tail.length >= 1 && (f = p.tail[0]),
                  p.tail.length >= 2 && (h = p.tail[1]);
              }
              a(f, h), null !== l && l();
            };
          })(e.IHashContainer || (e.IHashContainer = {}));
        })(qc)),
      qc
    );
  }
  var tu,
    nu = {},
    ru = {},
    ou = {};
  function iu() {
    if (tu) return ou;
    (tu = 1),
      Object.defineProperty(ou, "__esModule", { value: !0 }),
      (ou.ListIterator = void 0);
    var e = Uc(),
      t = (function () {
        function t(e, t, n) {
          (this.prev_ = e), (this.next_ = t), (this.value_ = n);
        }
        return (
          (t._Set_prev = function (e, t) {
            e.prev_ = t;
          }),
          (t._Set_next = function (e, t) {
            e.next_ = t;
          }),
          (t.prototype.prev = function () {
            return this.prev_;
          }),
          (t.prototype.next = function () {
            return this.next_;
          }),
          Object.defineProperty(t.prototype, "value", {
            get: function () {
              return this._Try_value(), this.value_;
            },
            enumerable: !1,
            configurable: !0,
          }),
          (t.prototype._Try_value = function () {
            if (
              void 0 === this.value_ &&
              !0 === this.equals(this.source().end())
            )
              throw e.ErrorGenerator.iterator_end_value(this.source());
          }),
          (t.prototype.equals = function (e) {
            return this === e;
          }),
          t
        );
      })();
    return (ou.ListIterator = t), ou;
  }
  var su,
    au = {};
  var cu,
    uu,
    lu = {};
  function fu() {
    if (cu) return lu;
    (cu = 1),
      Object.defineProperty(lu, "__esModule", { value: !0 }),
      (lu.next =
        lu.prev =
        lu.advance =
        lu.distance =
        lu.size =
        lu.empty =
          void 0);
    var e = Lc();
    function t(t, n) {
      if (0 === n) return t;
      if (t.advance instanceof Function) return t.advance(n);
      var r;
      if (n < 0) {
        if (!(t.prev instanceof Function))
          throw new e.InvalidArgument(
            "Error on std.advance(): parametric iterator is not a bi-directional iterator, thus advancing to negative direction is not possible."
          );
        (r = function (e) {
          return e.prev();
        }),
          (n = -n);
      } else
        r = function (e) {
          return e.next();
        };
      for (; n-- > 0; ) t = r(t);
      return t;
    }
    return (
      (lu.empty = function (e) {
        return e instanceof Array ? 0 !== e.length : e.empty();
      }),
      (lu.size = function (e) {
        return e instanceof Array ? e.length : e.size();
      }),
      (lu.distance = function (e, t) {
        if (e.index instanceof Function)
          return (function (e, t) {
            var n = e.index(),
              r = t.index();
            return e.base instanceof Function ? n - r : r - n;
          })(e, t);
        for (var n = 0; !e.equals(t); e = e.next()) ++n;
        return n;
      }),
      (lu.advance = t),
      (lu.prev = function (e, n) {
        return void 0 === n && (n = 1), 1 === n ? e.prev() : t(e, -n);
      }),
      (lu.next = function (e, n) {
        return void 0 === n && (n = 1), 1 === n ? e.next() : t(e, n);
      }),
      lu
    );
  }
  function hu() {
    if (uu) return ru;
    uu = 1;
    var e,
      t =
        (Bn && Bn.__extends) ||
        ((e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        }),
      n =
        (Bn && Bn.__read) ||
        function (e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            o,
            i = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
              s.push(r.value);
          } catch (e) {
            o = { error: e };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (o) throw o.error;
            }
          }
          return s;
        };
    Object.defineProperty(ru, "__esModule", { value: !0 }),
      (ru.ListContainer = void 0);
    var r = vc(),
      o = iu(),
      i = (function () {
        if (su) return au;
        (su = 1),
          Object.defineProperty(au, "__esModule", { value: !0 }),
          (au.Repeater = void 0);
        var e = (function () {
          function e(e, t) {
            (this.index_ = e), (this.value_ = t);
          }
          return (
            (e.prototype.index = function () {
              return this.index_;
            }),
            Object.defineProperty(e.prototype, "value", {
              get: function () {
                return this.value_;
              },
              enumerable: !1,
              configurable: !0,
            }),
            (e.prototype.next = function () {
              return ++this.index_, this;
            }),
            (e.prototype.equals = function (e) {
              return this.index_ === e.index_;
            }),
            e
          );
        })();
        return (au.Repeater = e), au;
      })(),
      s = Ec(),
      a = fu(),
      c = Uc(),
      u = (function (e) {
        function r() {
          var t = e.call(this) || this;
          return (t.end_ = t._Create_iterator(null, null)), t.clear(), t;
        }
        return (
          t(r, e),
          (r.prototype.assign = function (e, t) {
            this.clear(), this.insert(this.end(), e, t);
          }),
          (r.prototype.clear = function () {
            o.ListIterator._Set_prev(this.end_, this.end_),
              o.ListIterator._Set_next(this.end_, this.end_),
              (this.begin_ = this.end_),
              (this.size_ = 0);
          }),
          (r.prototype.resize = function (e) {
            var t = e - this.size();
            t > 0
              ? this.insert(this.end(), t, void 0)
              : t < 0 && this.erase((0, a.advance)(this.end(), -t), this.end());
          }),
          (r.prototype.begin = function () {
            return this.begin_;
          }),
          (r.prototype.end = function () {
            return this.end_;
          }),
          (r.prototype.size = function () {
            return this.size_;
          }),
          (r.prototype.push_front = function (e) {
            this.insert(this.begin_, e);
          }),
          (r.prototype.push_back = function (e) {
            this.insert(this.end_, e);
          }),
          (r.prototype.pop_front = function () {
            if (!0 === this.empty())
              throw c.ErrorGenerator.empty(
                this.end_.source().constructor.name,
                "pop_front"
              );
            this.erase(this.begin_);
          }),
          (r.prototype.pop_back = function () {
            if (!0 === this.empty())
              throw c.ErrorGenerator.empty(
                this.end_.source().constructor.name,
                "pop_back"
              );
            this.erase(this.end_.prev());
          }),
          (r.prototype.push = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            if (0 === e.length) return this.size();
            var n = new s.NativeArrayIterator(e, 0),
              r = new s.NativeArrayIterator(e, e.length);
            return this._Insert_by_range(this.end(), n, r), this.size();
          }),
          (r.prototype.insert = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)
              t[n - 1] = arguments[n];
            if (e.source() !== this.end_.source())
              throw c.ErrorGenerator.not_my_iterator(
                this.end_.source(),
                "insert"
              );
            if (!0 === e.erased_)
              throw c.ErrorGenerator.erased_iterator(
                this.end_.source(),
                "insert"
              );
            return 1 === t.length
              ? this._Insert_by_repeating_val(e, 1, t[0])
              : 2 === t.length && "number" == typeof t[0]
              ? this._Insert_by_repeating_val(e, t[0], t[1])
              : this._Insert_by_range(e, t[0], t[1]);
          }),
          (r.prototype._Insert_by_repeating_val = function (e, t, n) {
            var r = new i.Repeater(0, n),
              o = new i.Repeater(t);
            return this._Insert_by_range(e, r, o);
          }),
          (r.prototype._Insert_by_range = function (e, t, n) {
            for (
              var r = e.prev(), i = null, s = 0, a = t;
              !1 === a.equals(n);
              a = a.next()
            ) {
              var c = this._Create_iterator(r, null, a.value);
              0 === s && (i = c), o.ListIterator._Set_next(r, c), (r = c), ++s;
            }
            return (
              !0 === e.equals(this.begin()) && (this.begin_ = i),
              o.ListIterator._Set_next(r, e),
              o.ListIterator._Set_prev(e, r),
              (this.size_ += s),
              i
            );
          }),
          (r.prototype.erase = function (e, t) {
            return void 0 === t && (t = e.next()), this._Erase_by_range(e, t);
          }),
          (r.prototype._Erase_by_range = function (e, t) {
            if (e.source() !== this.end_.source())
              throw c.ErrorGenerator.not_my_iterator(
                this.end_.source(),
                "insert"
              );
            if (!0 === e.erased_)
              throw c.ErrorGenerator.erased_iterator(
                this.end_.source(),
                "insert"
              );
            if (e.equals(this.end_)) return this.end_;
            var n = e.prev();
            o.ListIterator._Set_next(n, t), o.ListIterator._Set_prev(t, n);
            for (var r = e; !r.equals(t); r = r.next())
              (r.erased_ = !0), --this.size_;
            return e.equals(this.begin_) && (this.begin_ = t), t;
          }),
          (r.prototype.swap = function (e) {
            var t, r, o;
            (t = n([e.begin_, this.begin_], 2)),
              (this.begin_ = t[0]),
              (e.begin_ = t[1]),
              (r = n([e.end_, this.end_], 2)),
              (this.end_ = r[0]),
              (e.end_ = r[1]),
              (o = n([e.size_, this.size_], 2)),
              (this.size_ = o[0]),
              (e.size_ = o[1]);
          }),
          r
        );
      })(r.Container);
    return (ru.ListContainer = u), ru;
  }
  var du,
    pu,
    yu = {};
  function bu() {
    if (du) return yu;
    (du = 1),
      Object.defineProperty(yu, "__esModule", { value: !0 }),
      (yu.ReverseIterator = void 0);
    var e = (function () {
      function e(e) {
        this.base_ = e.prev();
      }
      return (
        (e.prototype.source = function () {
          return this.base_.source();
        }),
        (e.prototype.base = function () {
          return this.base_.next();
        }),
        Object.defineProperty(e.prototype, "value", {
          get: function () {
            return this.base_.value;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (e.prototype.prev = function () {
          return this._Create_neighbor(this.base().next());
        }),
        (e.prototype.next = function () {
          return this._Create_neighbor(this.base_);
        }),
        (e.prototype.equals = function (e) {
          return this.base_.equals(e.base_);
        }),
        e
      );
    })();
    return (yu.ReverseIterator = e), yu;
  }
  var gu,
    wu,
    vu = {},
    mu = {};
  function _u() {
    if (gu) return mu;
    gu = 1;
    var e =
      (Bn && Bn.__values) ||
      function (e) {
        var t = "function" == typeof Symbol && Symbol.iterator,
          n = t && e[t],
          r = 0;
        if (n) return n.call(e);
        if (e && "number" == typeof e.length)
          return {
            next: function () {
              return (
                e && r >= e.length && (e = void 0),
                { value: e && e[r++], done: !e }
              );
            },
          };
        throw new TypeError(
          t ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(mu, "__esModule", { value: !0 }),
      (mu.HashBuckets = void 0);
    var t = (function () {
      function t(e, t) {
        (this.fetcher_ = e),
          (this.hasher_ = t),
          (this.max_load_factor_ = r),
          (this.data_ = []),
          (this.size_ = 0),
          this.initialize();
      }
      return (
        (t.prototype.clear = function () {
          (this.data_ = []), (this.size_ = 0), this.initialize();
        }),
        (t.prototype.rehash = function (t) {
          var r, o, i, s;
          t = Math.max(t, n);
          for (var a = [], c = 0; c < t; ++c) a.push([]);
          try {
            for (var u = e(this.data_), l = u.next(); !l.done; l = u.next()) {
              var f = l.value;
              try {
                for (
                  var h = ((i = void 0), e(f)), d = h.next();
                  !d.done;
                  d = h.next()
                ) {
                  var p = d.value;
                  a[this.hasher_(this.fetcher_(p)) % a.length].push(p);
                }
              } catch (e) {
                i = { error: e };
              } finally {
                try {
                  d && !d.done && (s = h.return) && s.call(h);
                } finally {
                  if (i) throw i.error;
                }
              }
            }
          } catch (e) {
            r = { error: e };
          } finally {
            try {
              l && !l.done && (o = u.return) && o.call(u);
            } finally {
              if (r) throw r.error;
            }
          }
          this.data_ = a;
        }),
        (t.prototype.reserve = function (e) {
          e > this.capacity() &&
            ((e = Math.floor(e / this.max_load_factor_)), this.rehash(e));
        }),
        (t.prototype.initialize = function () {
          for (var e = 0; e < n; ++e) this.data_.push([]);
        }),
        (t.prototype.length = function () {
          return this.data_.length;
        }),
        (t.prototype.capacity = function () {
          return this.data_.length * this.max_load_factor_;
        }),
        (t.prototype.at = function (e) {
          return this.data_[e];
        }),
        (t.prototype.load_factor = function () {
          return this.size_ / this.length();
        }),
        (t.prototype.max_load_factor = function (e) {
          if ((void 0 === e && (e = null), null === e))
            return this.max_load_factor_;
          this.max_load_factor_ = e;
        }),
        (t.prototype.hash_function = function () {
          return this.hasher_;
        }),
        (t.prototype.index = function (e) {
          return this.hasher_(this.fetcher_(e)) % this.length();
        }),
        (t.prototype.insert = function (e) {
          var t = this.capacity();
          ++this.size_ > t && this.reserve(2 * t);
          var n = this.index(e);
          this.data_[n].push(e);
        }),
        (t.prototype.erase = function (e) {
          for (
            var t = this.index(e), n = this.data_[t], r = 0;
            r < n.length;
            ++r
          )
            if (n[r] === e) {
              n.splice(r, 1), --this.size_;
              break;
            }
        }),
        t
      );
    })();
    mu.HashBuckets = t;
    var n = 10,
      r = 1;
    return mu;
  }
  var xu,
    Eu,
    ku = {};
  function Su() {
    if (xu) return ku;
    (xu = 1),
      Object.defineProperty(ku, "__esModule", { value: !0 }),
      (ku.make_pair = ku.Pair = void 0);
    var e = Yc(),
      t = Xc(),
      n = (function () {
        function n(e, t) {
          (this.first = e), (this.second = t);
        }
        return (
          (n.prototype.equals = function (e) {
            return (
              (0, t.equal_to)(this.first, e.first) &&
              (0, t.equal_to)(this.second, e.second)
            );
          }),
          (n.prototype.less = function (e) {
            return !1 === (0, t.equal_to)(this.first, e.first)
              ? (0, t.less)(this.first, e.first)
              : (0, t.less)(this.second, e.second);
          }),
          (n.prototype.hashCode = function () {
            return (0, e.hash)(this.first, this.second);
          }),
          n
        );
      })();
    return (
      (ku.Pair = n),
      (ku.make_pair = function (e, t) {
        return new n(e, t);
      }),
      ku
    );
  }
  function Au() {
    return (
      Eu ||
        ((Eu = 1),
        (function (e) {
          var t,
            n =
              (Bn && Bn.__extends) ||
              ((t = function (e, n) {
                return (
                  (t =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    }),
                  t(e, n)
                );
              }),
              function (e, n) {
                if ("function" != typeof n && null !== n)
                  throw new TypeError(
                    "Class extends value " +
                      String(n) +
                      " is not a constructor or null"
                  );
                function r() {
                  this.constructor = e;
                }
                t(e, n),
                  (e.prototype =
                    null === n
                      ? Object.create(n)
                      : ((r.prototype = n.prototype), new r()));
              }),
            r =
              (Bn && Bn.__read) ||
              function (e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r,
                  o,
                  i = n.call(e),
                  s = [];
                try {
                  for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
                    s.push(r.value);
                } catch (e) {
                  o = { error: e };
                } finally {
                  try {
                    r && !r.done && (n = i.return) && n.call(i);
                  } finally {
                    if (o) throw o.error;
                  }
                }
                return s;
              },
            o =
              (Bn && Bn.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var r, o = 0, i = t.length; o < i; o++)
                    (!r && o in t) ||
                      (r || (r = Array.prototype.slice.call(t, 0, o)),
                      (r[o] = t[o]));
                return e.concat(r || Array.prototype.slice.call(t));
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.HashSet = void 0);
          var i = Nc(),
            s = eu(),
            a =
              (pu ||
                ((pu = 1),
                (function (e) {
                  var t,
                    n =
                      (Bn && Bn.__extends) ||
                      ((t = function (e, n) {
                        return (
                          (t =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                              function (e, t) {
                                e.__proto__ = t;
                              }) ||
                            function (e, t) {
                              for (var n in t)
                                Object.prototype.hasOwnProperty.call(t, n) &&
                                  (e[n] = t[n]);
                            }),
                          t(e, n)
                        );
                      }),
                      function (e, n) {
                        if ("function" != typeof n && null !== n)
                          throw new TypeError(
                            "Class extends value " +
                              String(n) +
                              " is not a constructor or null"
                          );
                        function r() {
                          this.constructor = e;
                        }
                        t(e, n),
                          (e.prototype =
                            null === n
                              ? Object.create(n)
                              : ((r.prototype = n.prototype), new r()));
                      }),
                    r =
                      (Bn && Bn.__read) ||
                      function (e, t) {
                        var n =
                          "function" == typeof Symbol && e[Symbol.iterator];
                        if (!n) return e;
                        var r,
                          o,
                          i = n.call(e),
                          s = [];
                        try {
                          for (
                            ;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;

                          )
                            s.push(r.value);
                        } catch (e) {
                          o = { error: e };
                        } finally {
                          try {
                            r && !r.done && (n = i.return) && n.call(i);
                          } finally {
                            if (o) throw o.error;
                          }
                        }
                        return s;
                      };
                  Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.SetElementList = void 0);
                  var o = hu(),
                    i = iu(),
                    s = bu(),
                    a = (function (e) {
                      function t(t) {
                        var n = e.call(this) || this;
                        return (n.associative_ = t), n;
                      }
                      return (
                        n(t, e),
                        (t.prototype._Create_iterator = function (e, n, r) {
                          return t.Iterator.create(this, e, n, r);
                        }),
                        (t._Swap_associative = function (e, t) {
                          var n;
                          (n = r([t.associative_, e.associative_], 2)),
                            (e.associative_ = n[0]),
                            (t.associative_ = n[1]);
                        }),
                        (t.prototype.associative = function () {
                          return this.associative_;
                        }),
                        t
                      );
                    })(o.ListContainer);
                  (e.SetElementList = a),
                    (function (e) {
                      var t = (function (e) {
                        function t(t, n, r, o) {
                          var i = e.call(this, n, r, o) || this;
                          return (i.source_ = t), i;
                        }
                        return (
                          n(t, e),
                          (t.create = function (e, n, r, o) {
                            return new t(e, n, r, o);
                          }),
                          (t.prototype.reverse = function () {
                            return new r(this);
                          }),
                          (t.prototype.source = function () {
                            return this.source_.associative();
                          }),
                          t
                        );
                      })(i.ListIterator);
                      e.Iterator = t;
                      var r = (function (e) {
                        function t() {
                          return (
                            (null !== e && e.apply(this, arguments)) || this
                          );
                        }
                        return (
                          n(t, e),
                          (t.prototype._Create_neighbor = function (e) {
                            return new t(e);
                          }),
                          t
                        );
                      })(s.ReverseIterator);
                      e.ReverseIterator = r;
                    })((a = e.SetElementList || (e.SetElementList = {}))),
                    (e.SetElementList = a);
                })(nu)),
              nu),
            c = (function () {
              if (wu) return vu;
              wu = 1;
              var e,
                t =
                  (Bn && Bn.__extends) ||
                  ((e = function (t, n) {
                    return (
                      (e =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) &&
                              (e[n] = t[n]);
                        }),
                      e(t, n)
                    );
                  }),
                  function (t, n) {
                    if ("function" != typeof n && null !== n)
                      throw new TypeError(
                        "Class extends value " +
                          String(n) +
                          " is not a constructor or null"
                      );
                    function r() {
                      this.constructor = t;
                    }
                    e(t, n),
                      (t.prototype =
                        null === n
                          ? Object.create(n)
                          : ((r.prototype = n.prototype), new r()));
                  }),
                n =
                  (Bn && Bn.__read) ||
                  function (e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r,
                      o,
                      i = n.call(e),
                      s = [];
                    try {
                      for (
                        ;
                        (void 0 === t || t-- > 0) && !(r = i.next()).done;

                      )
                        s.push(r.value);
                    } catch (e) {
                      o = { error: e };
                    } finally {
                      try {
                        r && !r.done && (n = i.return) && n.call(i);
                      } finally {
                        if (o) throw o.error;
                      }
                    }
                    return s;
                  },
                r =
                  (Bn && Bn.__values) ||
                  function (e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                      n = t && e[t],
                      r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length)
                      return {
                        next: function () {
                          return (
                            e && r >= e.length && (e = void 0),
                            { value: e && e[r++], done: !e }
                          );
                        },
                      };
                    throw new TypeError(
                      t
                        ? "Object is not iterable."
                        : "Symbol.iterator is not defined."
                    );
                  };
              Object.defineProperty(vu, "__esModule", { value: !0 }),
                (vu.SetHashBuckets = void 0);
              var o = (function (e) {
                function o(t, n, r) {
                  var o = e.call(this, i, n) || this;
                  return (o.source_ = t), (o.key_eq_ = r), o;
                }
                return (
                  t(o, e),
                  (o._Swap_source = function (e, t) {
                    var r;
                    (r = n([t.source_, e.source_], 2)),
                      (e.source_ = r[0]),
                      (t.source_ = r[1]);
                  }),
                  (o.prototype.key_eq = function () {
                    return this.key_eq_;
                  }),
                  (o.prototype.find = function (e) {
                    var t,
                      n,
                      o = this.hash_function()(e) % this.length(),
                      i = this.at(o);
                    try {
                      for (var s = r(i), a = s.next(); !a.done; a = s.next()) {
                        var c = a.value;
                        if (this.key_eq_(c.value, e)) return c;
                      }
                    } catch (e) {
                      t = { error: e };
                    } finally {
                      try {
                        a && !a.done && (n = s.return) && n.call(s);
                      } finally {
                        if (t) throw t.error;
                      }
                    }
                    return this.source_.end();
                  }),
                  o
                );
              })(_u().HashBuckets);
              function i(e) {
                return e.value;
              }
              return (vu.SetHashBuckets = o), vu;
            })(),
            u = Su(),
            l = (function (e) {
              function t() {
                for (var n = [], i = 0; i < arguments.length; i++)
                  n[i] = arguments[i];
                var u =
                  e.call(this, function (e) {
                    return new a.SetElementList(e);
                  }) || this;
                return (
                  s.IHashContainer.construct.apply(
                    s.IHashContainer,
                    o(
                      [
                        u,
                        t,
                        function (e, t) {
                          u.buckets_ = new c.SetHashBuckets(u, e, t);
                        },
                      ],
                      r(n),
                      !1
                    )
                  ),
                  u
                );
              }
              return (
                n(t, e),
                (t.prototype.clear = function () {
                  this.buckets_.clear(), e.prototype.clear.call(this);
                }),
                (t.prototype.swap = function (e) {
                  var t, n;
                  (t = r([e.data_, this.data_], 2)),
                    (this.data_ = t[0]),
                    (e.data_ = t[1]),
                    a.SetElementList._Swap_associative(this.data_, e.data_),
                    c.SetHashBuckets._Swap_source(this.buckets_, e.buckets_),
                    (n = r([e.buckets_, this.buckets_], 2)),
                    (this.buckets_ = n[0]),
                    (e.buckets_ = n[1]);
                }),
                (t.prototype.find = function (e) {
                  return this.buckets_.find(e);
                }),
                (t.prototype.begin = function (t) {
                  return (
                    void 0 === t && (t = null),
                    null === t
                      ? e.prototype.begin.call(this)
                      : this.buckets_.at(t)[0]
                  );
                }),
                (t.prototype.end = function (t) {
                  if ((void 0 === t && (t = null), null === t))
                    return e.prototype.end.call(this);
                  var n = this.buckets_.at(t);
                  return n[n.length - 1].next();
                }),
                (t.prototype.rbegin = function (e) {
                  return void 0 === e && (e = null), this.end(e).reverse();
                }),
                (t.prototype.rend = function (e) {
                  return void 0 === e && (e = null), this.begin(e).reverse();
                }),
                (t.prototype.bucket_count = function () {
                  return this.buckets_.length();
                }),
                (t.prototype.bucket_size = function (e) {
                  return this.buckets_.at(e).length;
                }),
                (t.prototype.load_factor = function () {
                  return this.buckets_.load_factor();
                }),
                (t.prototype.hash_function = function () {
                  return this.buckets_.hash_function();
                }),
                (t.prototype.key_eq = function () {
                  return this.buckets_.key_eq();
                }),
                (t.prototype.bucket = function (e) {
                  return this.hash_function()(e) % this.buckets_.length();
                }),
                (t.prototype.max_load_factor = function (e) {
                  return (
                    void 0 === e && (e = null), this.buckets_.max_load_factor(e)
                  );
                }),
                (t.prototype.reserve = function (e) {
                  this.buckets_.reserve(e);
                }),
                (t.prototype.rehash = function (e) {
                  this.buckets_.rehash(e);
                }),
                (t.prototype._Insert_by_key = function (e) {
                  var t = this.find(e);
                  return !1 === t.equals(this.end())
                    ? new u.Pair(t, !1)
                    : (this.data_.push(e),
                      (t = t.prev()),
                      this._Handle_insert(t, t.next()),
                      new u.Pair(t, !0));
                }),
                (t.prototype._Insert_by_hint = function (e, t) {
                  var n = this.find(t);
                  return (
                    !0 === n.equals(this.end()) &&
                      ((n = this.data_.insert(e, t)),
                      this._Handle_insert(n, n.next())),
                    n
                  );
                }),
                (t.prototype._Handle_insert = function (e, t) {
                  for (; !e.equals(t); e = e.next()) this.buckets_.insert(e);
                }),
                (t.prototype._Handle_erase = function (e, t) {
                  for (; !e.equals(t); e = e.next()) this.buckets_.erase(e);
                }),
                t
              );
            })(i.UniqueSet);
          (e.HashSet = l),
            (function (e) {
              (e.Iterator = a.SetElementList.Iterator),
                (e.ReverseIterator = a.SetElementList.ReverseIterator);
            })((l = e.HashSet || (e.HashSet = {}))),
            (e.HashSet = l);
        })(pc)),
      pc
    );
  }
  var Ou,
    Cu,
    Pu = {},
    Iu = {},
    Tu = {};
  function Lu() {
    if (Cu) return Iu;
    Cu = 1;
    var e,
      t =
        (Bn && Bn.__extends) ||
        ((e = function (t, n) {
          return (
            (e =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t)
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }),
            e(t, n)
          );
        }),
        function (t, n) {
          if ("function" != typeof n && null !== n)
            throw new TypeError(
              "Class extends value " +
                String(n) +
                " is not a constructor or null"
            );
          function r() {
            this.constructor = t;
          }
          e(t, n),
            (t.prototype =
              null === n
                ? Object.create(n)
                : ((r.prototype = n.prototype), new r()));
        }),
      n =
        (Bn && Bn.__read) ||
        function (e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var r,
            o,
            i = n.call(e),
            s = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
              s.push(r.value);
          } catch (e) {
            o = { error: e };
          } finally {
            try {
              r && !r.done && (n = i.return) && n.call(i);
            } finally {
              if (o) throw o.error;
            }
          }
          return s;
        },
      r =
        (Bn && Bn.__spreadArray) ||
        function (e, t, n) {
          if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
              (!r && o in t) ||
                (r || (r = Array.prototype.slice.call(t, 0, o)), (r[o] = t[o]));
          return e.concat(r || Array.prototype.slice.call(t));
        };
    Object.defineProperty(Iu, "__esModule", { value: !0 }),
      (Iu.UniqueMap = void 0);
    var o = (function () {
        if (Ou) return Tu;
        Ou = 1;
        var e,
          t =
            (Bn && Bn.__extends) ||
            ((e = function (t, n) {
              return (
                (e =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var n in t)
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  }),
                e(t, n)
              );
            }),
            function (t, n) {
              if ("function" != typeof n && null !== n)
                throw new TypeError(
                  "Class extends value " +
                    String(n) +
                    " is not a constructor or null"
                );
              function r() {
                this.constructor = t;
              }
              e(t, n),
                (t.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            });
        Object.defineProperty(Tu, "__esModule", { value: !0 }),
          (Tu.MapContainer = void 0);
        var n = vc(),
          r = Ec(),
          o = (function (e) {
            function n(t) {
              var n = e.call(this) || this;
              return (n.data_ = t(n)), n;
            }
            return (
              t(n, e),
              (n.prototype.assign = function (e, t) {
                this.clear(), this.insert(e, t);
              }),
              (n.prototype.clear = function () {
                this.data_.clear();
              }),
              (n.prototype.begin = function () {
                return this.data_.begin();
              }),
              (n.prototype.end = function () {
                return this.data_.end();
              }),
              (n.prototype.has = function (e) {
                return !this.find(e).equals(this.end());
              }),
              (n.prototype.size = function () {
                return this.data_.size();
              }),
              (n.prototype.push = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                var n = new r.NativeArrayIterator(e, 0),
                  o = new r.NativeArrayIterator(e, e.length);
                return this.insert(n, o), this.size();
              }),
              (n.prototype.insert = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                return 1 === e.length
                  ? this.emplace(e[0].first, e[0].second)
                  : e[0].next instanceof Function &&
                    e[1].next instanceof Function
                  ? this._Insert_by_range(e[0], e[1])
                  : this.emplace_hint(e[0], e[1].first, e[1].second);
              }),
              (n.prototype.erase = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                return 1 !== e.length ||
                  (e[0] instanceof this.end().constructor != 0 &&
                    e[0].source() === this)
                  ? 1 === e.length
                    ? this._Erase_by_range(e[0])
                    : this._Erase_by_range(e[0], e[1])
                  : this._Erase_by_key(e[0]);
              }),
              (n.prototype._Erase_by_range = function (e, t) {
                void 0 === t && (t = e.next());
                var n = this.data_.erase(e, t);
                return this._Handle_erase(e, t), n;
              }),
              n
            );
          })(n.Container);
        return (Tu.MapContainer = o), Tu;
      })(),
      i = Uc(),
      s = (function (e) {
        function o() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          t(o, e),
          (o.prototype.count = function (e) {
            return this.find(e).equals(this.end()) ? 0 : 1;
          }),
          (o.prototype.get = function (e) {
            var t = this.find(e);
            if (!0 === t.equals(this.end()))
              throw i.ErrorGenerator.key_nout_found(this, "get", e);
            return t.second;
          }),
          (o.prototype.take = function (e, t) {
            var n = this.find(e);
            return n.equals(this.end())
              ? this.emplace(e, t()).first.second
              : n.second;
          }),
          (o.prototype.set = function (e, t) {
            this.insert_or_assign(e, t);
          }),
          (o.prototype.insert = function () {
            for (var t = [], o = 0; o < arguments.length; o++)
              t[o] = arguments[o];
            return e.prototype.insert.apply(this, r([], n(t), !1));
          }),
          (o.prototype._Insert_by_range = function (e, t) {
            for (var n = e; !n.equals(t); n = n.next())
              this.emplace(n.value.first, n.value.second);
          }),
          (o.prototype.insert_or_assign = function () {
            for (var e = [], t = 0; t < arguments.length; t++)
              e[t] = arguments[t];
            return 2 === e.length
              ? this._Insert_or_assign_with_key_value(e[0], e[1])
              : 3 === e.length
              ? this._Insert_or_assign_with_hint(e[0], e[1], e[2])
              : void 0;
          }),
          (o.prototype._Insert_or_assign_with_key_value = function (e, t) {
            var n = this.emplace(e, t);
            return !1 === n.second && (n.first.second = t), n;
          }),
          (o.prototype._Insert_or_assign_with_hint = function (e, t, n) {
            var r = this.emplace_hint(e, t, n);
            return r.second !== n && (r.second = n), r;
          }),
          (o.prototype.extract = function (e) {
            return e instanceof this.end().constructor
              ? this._Extract_by_iterator(e)
              : this._Extract_by_key(e);
          }),
          (o.prototype._Extract_by_key = function (e) {
            var t = this.find(e);
            if (!0 === t.equals(this.end()))
              throw i.ErrorGenerator.key_nout_found(this, "extract", e);
            var n = t.value;
            return this._Erase_by_range(t), n;
          }),
          (o.prototype._Extract_by_iterator = function (e) {
            return !0 === e.equals(this.end())
              ? this.end()
              : (this._Erase_by_range(e), e);
          }),
          (o.prototype._Erase_by_key = function (e) {
            var t = this.find(e);
            return !0 === t.equals(this.end())
              ? 0
              : (this._Erase_by_range(t), 1);
          }),
          (o.prototype.merge = function (e) {
            for (var t = e.begin(); !t.equals(e.end()); )
              !1 === this.has(t.first)
                ? (this.insert(t.value), (t = e.erase(t)))
                : (t = t.next());
          }),
          o
        );
      })(o.MapContainer);
    return (Iu.UniqueMap = s), Iu;
  }
  var Bu,
    Ru = {};
  var $u,
    ju = {};
  var Uu,
    Nu,
    Hu,
    qu = {};
  function Mu() {
    return (
      Nu ||
        ((Nu = 1),
        (function (e) {
          var t,
            n =
              (Bn && Bn.__extends) ||
              ((t = function (e, n) {
                return (
                  (t =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (e, t) {
                        e.__proto__ = t;
                      }) ||
                    function (e, t) {
                      for (var n in t)
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    }),
                  t(e, n)
                );
              }),
              function (e, n) {
                if ("function" != typeof n && null !== n)
                  throw new TypeError(
                    "Class extends value " +
                      String(n) +
                      " is not a constructor or null"
                  );
                function r() {
                  this.constructor = e;
                }
                t(e, n),
                  (e.prototype =
                    null === n
                      ? Object.create(n)
                      : ((r.prototype = n.prototype), new r()));
              }),
            r =
              (Bn && Bn.__read) ||
              function (e, t) {
                var n = "function" == typeof Symbol && e[Symbol.iterator];
                if (!n) return e;
                var r,
                  o,
                  i = n.call(e),
                  s = [];
                try {
                  for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
                    s.push(r.value);
                } catch (e) {
                  o = { error: e };
                } finally {
                  try {
                    r && !r.done && (n = i.return) && n.call(i);
                  } finally {
                    if (o) throw o.error;
                  }
                }
                return s;
              },
            o =
              (Bn && Bn.__spreadArray) ||
              function (e, t, n) {
                if (n || 2 === arguments.length)
                  for (var r, o = 0, i = t.length; o < i; o++)
                    (!r && o in t) ||
                      (r || (r = Array.prototype.slice.call(t, 0, o)),
                      (r[o] = t[o]));
                return e.concat(r || Array.prototype.slice.call(t));
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.HashMap = void 0);
          var i = Lu(),
            s = eu(),
            a =
              (Bu ||
                ((Bu = 1),
                (function (e) {
                  var t,
                    n =
                      (Bn && Bn.__extends) ||
                      ((t = function (e, n) {
                        return (
                          (t =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                              function (e, t) {
                                e.__proto__ = t;
                              }) ||
                            function (e, t) {
                              for (var n in t)
                                Object.prototype.hasOwnProperty.call(t, n) &&
                                  (e[n] = t[n]);
                            }),
                          t(e, n)
                        );
                      }),
                      function (e, n) {
                        if ("function" != typeof n && null !== n)
                          throw new TypeError(
                            "Class extends value " +
                              String(n) +
                              " is not a constructor or null"
                          );
                        function r() {
                          this.constructor = e;
                        }
                        t(e, n),
                          (e.prototype =
                            null === n
                              ? Object.create(n)
                              : ((r.prototype = n.prototype), new r()));
                      }),
                    r =
                      (Bn && Bn.__read) ||
                      function (e, t) {
                        var n =
                          "function" == typeof Symbol && e[Symbol.iterator];
                        if (!n) return e;
                        var r,
                          o,
                          i = n.call(e),
                          s = [];
                        try {
                          for (
                            ;
                            (void 0 === t || t-- > 0) && !(r = i.next()).done;

                          )
                            s.push(r.value);
                        } catch (e) {
                          o = { error: e };
                        } finally {
                          try {
                            r && !r.done && (n = i.return) && n.call(i);
                          } finally {
                            if (o) throw o.error;
                          }
                        }
                        return s;
                      };
                  Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.MapElementList = void 0);
                  var o = hu(),
                    i = iu(),
                    s = bu(),
                    a = (function (e) {
                      function t(t) {
                        var n = e.call(this) || this;
                        return (n.associative_ = t), n;
                      }
                      return (
                        n(t, e),
                        (t.prototype._Create_iterator = function (e, n, r) {
                          return t.Iterator.create(this, e, n, r);
                        }),
                        (t._Swap_associative = function (e, t) {
                          var n;
                          (n = r([t.associative_, e.associative_], 2)),
                            (e.associative_ = n[0]),
                            (t.associative_ = n[1]);
                        }),
                        (t.prototype.associative = function () {
                          return this.associative_;
                        }),
                        t
                      );
                    })(o.ListContainer);
                  (e.MapElementList = a),
                    (function (e) {
                      var t = (function (e) {
                        function t(t, n, r, o) {
                          var i = e.call(this, n, r, o) || this;
                          return (i.list_ = t), i;
                        }
                        return (
                          n(t, e),
                          (t.create = function (e, n, r, o) {
                            return new t(e, n, r, o);
                          }),
                          (t.prototype.reverse = function () {
                            return new r(this);
                          }),
                          (t.prototype.source = function () {
                            return this.list_.associative();
                          }),
                          Object.defineProperty(t.prototype, "first", {
                            get: function () {
                              return this.value.first;
                            },
                            enumerable: !1,
                            configurable: !0,
                          }),
                          Object.defineProperty(t.prototype, "second", {
                            get: function () {
                              return this.value.second;
                            },
                            set: function (e) {
                              this.value.second = e;
                            },
                            enumerable: !1,
                            configurable: !0,
                          }),
                          t
                        );
                      })(i.ListIterator);
                      e.Iterator = t;
                      var r = (function (e) {
                        function t() {
                          return (
                            (null !== e && e.apply(this, arguments)) || this
                          );
                        }
                        return (
                          n(t, e),
                          (t.prototype._Create_neighbor = function (e) {
                            return new t(e);
                          }),
                          Object.defineProperty(t.prototype, "first", {
                            get: function () {
                              return this.base_.first;
                            },
                            enumerable: !1,
                            configurable: !0,
                          }),
                          Object.defineProperty(t.prototype, "second", {
                            get: function () {
                              return this.base_.second;
                            },
                            set: function (e) {
                              this.base_.second = e;
                            },
                            enumerable: !1,
                            configurable: !0,
                          }),
                          t
                        );
                      })(s.ReverseIterator);
                      e.ReverseIterator = r;
                    })((a = e.MapElementList || (e.MapElementList = {}))),
                    (e.MapElementList = a);
                })(Ru)),
              Ru),
            c = (function () {
              if ($u) return ju;
              $u = 1;
              var e,
                t =
                  (Bn && Bn.__extends) ||
                  ((e = function (t, n) {
                    return (
                      (e =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) &&
                              (e[n] = t[n]);
                        }),
                      e(t, n)
                    );
                  }),
                  function (t, n) {
                    if ("function" != typeof n && null !== n)
                      throw new TypeError(
                        "Class extends value " +
                          String(n) +
                          " is not a constructor or null"
                      );
                    function r() {
                      this.constructor = t;
                    }
                    e(t, n),
                      (t.prototype =
                        null === n
                          ? Object.create(n)
                          : ((r.prototype = n.prototype), new r()));
                  }),
                n =
                  (Bn && Bn.__read) ||
                  function (e, t) {
                    var n = "function" == typeof Symbol && e[Symbol.iterator];
                    if (!n) return e;
                    var r,
                      o,
                      i = n.call(e),
                      s = [];
                    try {
                      for (
                        ;
                        (void 0 === t || t-- > 0) && !(r = i.next()).done;

                      )
                        s.push(r.value);
                    } catch (e) {
                      o = { error: e };
                    } finally {
                      try {
                        r && !r.done && (n = i.return) && n.call(i);
                      } finally {
                        if (o) throw o.error;
                      }
                    }
                    return s;
                  },
                r =
                  (Bn && Bn.__values) ||
                  function (e) {
                    var t = "function" == typeof Symbol && Symbol.iterator,
                      n = t && e[t],
                      r = 0;
                    if (n) return n.call(e);
                    if (e && "number" == typeof e.length)
                      return {
                        next: function () {
                          return (
                            e && r >= e.length && (e = void 0),
                            { value: e && e[r++], done: !e }
                          );
                        },
                      };
                    throw new TypeError(
                      t
                        ? "Object is not iterable."
                        : "Symbol.iterator is not defined."
                    );
                  };
              Object.defineProperty(ju, "__esModule", { value: !0 }),
                (ju.MapHashBuckets = void 0);
              var o = (function (e) {
                function o(t, n, r) {
                  var o = e.call(this, i, n) || this;
                  return (o.source_ = t), (o.key_eq_ = r), o;
                }
                return (
                  t(o, e),
                  (o._Swap_source = function (e, t) {
                    var r;
                    (r = n([t.source_, e.source_], 2)),
                      (e.source_ = r[0]),
                      (t.source_ = r[1]);
                  }),
                  (o.prototype.key_eq = function () {
                    return this.key_eq_;
                  }),
                  (o.prototype.find = function (e) {
                    var t,
                      n,
                      o = this.hash_function()(e) % this.length(),
                      i = this.at(o);
                    try {
                      for (var s = r(i), a = s.next(); !a.done; a = s.next()) {
                        var c = a.value;
                        if (this.key_eq_(c.first, e)) return c;
                      }
                    } catch (e) {
                      t = { error: e };
                    } finally {
                      try {
                        a && !a.done && (n = s.return) && n.call(s);
                      } finally {
                        if (t) throw t.error;
                      }
                    }
                    return this.source_.end();
                  }),
                  o
                );
              })(_u().HashBuckets);
              function i(e) {
                return e.first;
              }
              return (ju.MapHashBuckets = o), ju;
            })(),
            u = (function () {
              if (Uu) return qu;
              (Uu = 1),
                Object.defineProperty(qu, "__esModule", { value: !0 }),
                (qu.Entry = void 0);
              var e = Yc(),
                t = Xc(),
                n = (function () {
                  function n(e, t) {
                    (this.first = e), (this.second = t);
                  }
                  return (
                    (n.prototype.equals = function (e) {
                      return (0, t.equal_to)(this.first, e.first);
                    }),
                    (n.prototype.less = function (e) {
                      return (0, t.less)(this.first, e.first);
                    }),
                    (n.prototype.hashCode = function () {
                      return (0, e.hash)(this.first);
                    }),
                    n
                  );
                })();
              return (qu.Entry = n), qu;
            })(),
            l = Su(),
            f = (function (e) {
              function t() {
                for (var n = [], i = 0; i < arguments.length; i++)
                  n[i] = arguments[i];
                var u =
                  e.call(this, function (e) {
                    return new a.MapElementList(e);
                  }) || this;
                return (
                  s.IHashContainer.construct.apply(
                    s.IHashContainer,
                    o(
                      [
                        u,
                        t,
                        function (e, t) {
                          u.buckets_ = new c.MapHashBuckets(u, e, t);
                        },
                      ],
                      r(n),
                      !1
                    )
                  ),
                  u
                );
              }
              return (
                n(t, e),
                (t.prototype.clear = function () {
                  this.buckets_.clear(), e.prototype.clear.call(this);
                }),
                (t.prototype.swap = function (e) {
                  var t, n;
                  (t = r([e.data_, this.data_], 2)),
                    (this.data_ = t[0]),
                    (e.data_ = t[1]),
                    a.MapElementList._Swap_associative(this.data_, e.data_),
                    c.MapHashBuckets._Swap_source(this.buckets_, e.buckets_),
                    (n = r([e.buckets_, this.buckets_], 2)),
                    (this.buckets_ = n[0]),
                    (e.buckets_ = n[1]);
                }),
                (t.prototype.find = function (e) {
                  return this.buckets_.find(e);
                }),
                (t.prototype.begin = function (t) {
                  return (
                    void 0 === t && (t = null),
                    null === t
                      ? e.prototype.begin.call(this)
                      : this.buckets_.at(t)[0]
                  );
                }),
                (t.prototype.end = function (t) {
                  if ((void 0 === t && (t = null), null === t))
                    return e.prototype.end.call(this);
                  var n = this.buckets_.at(t);
                  return n[n.length - 1].next();
                }),
                (t.prototype.rbegin = function (e) {
                  return void 0 === e && (e = null), this.end(e).reverse();
                }),
                (t.prototype.rend = function (e) {
                  return void 0 === e && (e = null), this.begin(e).reverse();
                }),
                (t.prototype.bucket_count = function () {
                  return this.buckets_.length();
                }),
                (t.prototype.bucket_size = function (e) {
                  return this.buckets_.at(e).length;
                }),
                (t.prototype.load_factor = function () {
                  return this.buckets_.load_factor();
                }),
                (t.prototype.hash_function = function () {
                  return this.buckets_.hash_function();
                }),
                (t.prototype.key_eq = function () {
                  return this.buckets_.key_eq();
                }),
                (t.prototype.bucket = function (e) {
                  return this.hash_function()(e) % this.buckets_.length();
                }),
                (t.prototype.max_load_factor = function (e) {
                  return (
                    void 0 === e && (e = null), this.buckets_.max_load_factor(e)
                  );
                }),
                (t.prototype.reserve = function (e) {
                  this.buckets_.reserve(e);
                }),
                (t.prototype.rehash = function (e) {
                  this.buckets_.rehash(e);
                }),
                (t.prototype.emplace = function (e, t) {
                  var n = this.find(e);
                  return !1 === n.equals(this.end())
                    ? new l.Pair(n, !1)
                    : (this.data_.push(new u.Entry(e, t)),
                      (n = n.prev()),
                      this._Handle_insert(n, n.next()),
                      new l.Pair(n, !0));
                }),
                (t.prototype.emplace_hint = function (e, t, n) {
                  var r = this.find(t);
                  return (
                    !0 === r.equals(this.end()) &&
                      ((r = this.data_.insert(e, new u.Entry(t, n))),
                      this._Handle_insert(r, r.next())),
                    r
                  );
                }),
                (t.prototype._Handle_insert = function (e, t) {
                  for (; !e.equals(t); e = e.next()) this.buckets_.insert(e);
                }),
                (t.prototype._Handle_erase = function (e, t) {
                  for (; !e.equals(t); e = e.next()) this.buckets_.erase(e);
                }),
                t
              );
            })(i.UniqueMap);
          (e.HashMap = f),
            (function (e) {
              (e.Iterator = a.MapElementList.Iterator),
                (e.ReverseIterator = a.MapElementList.ReverseIterator);
            })((f = e.HashMap || (e.HashMap = {}))),
            (e.HashMap = f);
        })(Pu)),
      Pu
    );
  }
  var Fu,
    Du = {};
  function zu() {
    if (Fu) return Du;
    (Fu = 1), Object.defineProperty(Du, "__esModule", { value: !0 });
    var e = function (e, t) {
      (this.type = e), t && Object.assign(this, t);
    };
    return (Du.Event = e), Du;
  }
  var Ku,
    Gu = {};
  var Wu,
    Vu = {};
  var Yu,
    Zu,
    Ju = {};
  ra.is_node() &&
    (Bn.WebSocket = (Zu ||
      ((Zu = 1),
      (function (e) {
        var t,
          n =
            (Bn && Bn.__extends) ||
            ((t = function (e, n) {
              return (
                (t =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (e, t) {
                      e.__proto__ = t;
                    }) ||
                  function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                  }),
                t(e, n)
              );
            }),
            function (e, n) {
              function r() {
                this.constructor = e;
              }
              t(e, n),
                (e.prototype =
                  null === n
                    ? Object.create(n)
                    : ((r.prototype = n.prototype), new r()));
            }),
          r =
            (Bn && Bn.__assign) ||
            function () {
              return (
                (r =
                  Object.assign ||
                  function (e) {
                    for (var t, n = 1, r = arguments.length; n < r; n++)
                      for (var o in (t = arguments[n]))
                        Object.prototype.hasOwnProperty.call(t, o) &&
                          (e[o] = t[o]);
                    return e;
                  }),
                r.apply(this, arguments)
              );
            };
        Object.defineProperty(e, "__esModule", { value: !0 });
        var o = lc(),
          i = (function () {
            if (Hu) return dc;
            Hu = 1;
            var e =
              (Bn && Bn.__values) ||
              function (e) {
                var t = "function" == typeof Symbol && e[Symbol.iterator],
                  n = 0;
                return t
                  ? t.call(e)
                  : {
                      next: function () {
                        return (
                          e && n >= e.length && (e = void 0),
                          { value: e && e[n++], done: !e }
                        );
                      },
                    };
              };
            Object.defineProperty(dc, "__esModule", { value: !0 });
            var t = Au(),
              n = Mu(),
              r = (function () {
                function r() {
                  (this.listeners_ = new n.HashMap()),
                    (this.created_at_ = new Date());
                }
                return (
                  (r.prototype.dispatchEvent = function (t) {
                    var n,
                      r,
                      o = this.listeners_.find(t.type);
                    if (!o.equals(this.listeners_.end())) {
                      (t.target = this),
                        (t.timeStamp =
                          new Date().getTime() - this.created_at_.getTime());
                      try {
                        for (
                          var i = e(o.second), s = i.next();
                          !s.done;
                          s = i.next()
                        )
                          (0, s.value)(t);
                      } catch (e) {
                        n = { error: e };
                      } finally {
                        try {
                          s && !s.done && (r = i.return) && r.call(i);
                        } finally {
                          if (n) throw n.error;
                        }
                      }
                    }
                  }),
                  (r.prototype.addEventListener = function (e, n) {
                    var r = this.listeners_.find(e);
                    r.equals(this.listeners_.end()) &&
                      (r = this.listeners_.emplace(e, new t.HashSet()).first),
                      r.second.insert(n);
                  }),
                  (r.prototype.removeEventListener = function (e, t) {
                    var n = this.listeners_.find(e);
                    n.equals(this.listeners_.end()) ||
                      (n.second.erase(t),
                      n.second.empty() && this.listeners_.erase(n));
                  }),
                  r
                );
              })();
            return (dc.EventTarget = r), dc;
          })(),
          s = zu(),
          a = (function () {
            if (Ku) return Gu;
            Ku = 1;
            var e,
              t =
                (Bn && Bn.__extends) ||
                ((e = function (t, n) {
                  return (
                    (e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      }),
                    e(t, n)
                  );
                }),
                function (t, n) {
                  function r() {
                    this.constructor = t;
                  }
                  e(t, n),
                    (t.prototype =
                      null === n
                        ? Object.create(n)
                        : ((r.prototype = n.prototype), new r()));
                });
            Object.defineProperty(Gu, "__esModule", { value: !0 });
            var n = (function (e) {
              function n(t, n) {
                return e.call(this, t, n) || this;
              }
              return t(n, e), n;
            })(zu().Event);
            return (Gu.CloseEvent = n), Gu;
          })(),
          c = (function () {
            if (Wu) return Vu;
            Wu = 1;
            var e,
              t =
                (Bn && Bn.__extends) ||
                ((e = function (t, n) {
                  return (
                    (e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      }),
                    e(t, n)
                  );
                }),
                function (t, n) {
                  function r() {
                    this.constructor = t;
                  }
                  e(t, n),
                    (t.prototype =
                      null === n
                        ? Object.create(n)
                        : ((r.prototype = n.prototype), new r()));
                });
            Object.defineProperty(Vu, "__esModule", { value: !0 });
            var n = (function (e) {
              function n(t, n) {
                return e.call(this, t, n) || this;
              }
              return t(n, e), n;
            })(zu().Event);
            return (Vu.MessageEvent = n), Vu;
          })(),
          u = (function () {
            if (Yu) return Ju;
            Yu = 1;
            var e,
              t =
                (Bn && Bn.__extends) ||
                ((e = function (t, n) {
                  return (
                    (e =
                      Object.setPrototypeOf ||
                      ({ __proto__: [] } instanceof Array &&
                        function (e, t) {
                          e.__proto__ = t;
                        }) ||
                      function (e, t) {
                        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                      }),
                    e(t, n)
                  );
                }),
                function (t, n) {
                  function r() {
                    this.constructor = t;
                  }
                  e(t, n),
                    (t.prototype =
                      null === n
                        ? Object.create(n)
                        : ((r.prototype = n.prototype), new r()));
                });
            Object.defineProperty(Ju, "__esModule", { value: !0 });
            var n = (function (e) {
              function n(t, n) {
                return e.call(this, t, n) || this;
              }
              return t(n, e), n;
            })(zu().Event);
            return (Ju.ErrorEvent = n), Ju;
          })(),
          l = (function (e) {
            function t(n, r) {
              var i = e.call(this) || this;
              return (
                (i.on_ = {}),
                (i.state_ = t.CONNECTING),
                (i.client_ = new o.client()),
                i.client_.on("connect", i._Handle_connect.bind(i)),
                i.client_.on("connectFailed", i._Handle_error.bind(i)),
                "string" == typeof r && (r = [r]),
                i.client_.connect(n, r),
                i
              );
            }
            return (
              n(t, e),
              (t.prototype.close = function (e, n) {
                (this.state_ = t.CLOSING),
                  void 0 === e
                    ? this.connection_.sendCloseFrame()
                    : this.connection_.sendCloseFrame(e, n, !0);
              }),
              (t.prototype.send = function (e) {
                if ("string" == typeof e.valueOf()) this.connection_.sendUTF(e);
                else {
                  var t = void 0;
                  (t =
                    e instanceof wa
                      ? e
                      : e instanceof Blob
                      ? new wa(e, "blob")
                      : e.buffer
                      ? new wa(e.buffer)
                      : new wa(e)),
                    this.connection_.sendBytes(t);
                }
              }),
              Object.defineProperty(t.prototype, "url", {
                get: function () {
                  return this.client_.url.href;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "protocol", {
                get: function () {
                  return this.client_.protocols
                    ? this.client_.protocols[0]
                    : "";
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "extensions", {
                get: function () {
                  return this.connection_ && this.connection_.extensions
                    ? this.connection_.extensions[0].name
                    : "";
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "readyState", {
                get: function () {
                  return this.state_;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "bufferedAmount", {
                get: function () {
                  return this.connection_.bytesWaitingToFlush;
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "binaryType", {
                get: function () {
                  return "arraybuffer";
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "onopen", {
                get: function () {
                  return this.on_.open;
                },
                set: function (e) {
                  this._Set_on("open", e);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "onclose", {
                get: function () {
                  return this.on_.close;
                },
                set: function (e) {
                  this._Set_on("close", e);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "onmessage", {
                get: function () {
                  return this.on_.message;
                },
                set: function (e) {
                  this._Set_on("message", e);
                },
                enumerable: !0,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "onerror", {
                get: function () {
                  return this.on_.error;
                },
                set: function (e) {
                  this._Set_on("error", e);
                },
                enumerable: !0,
                configurable: !0,
              }),
              (t.prototype._Set_on = function (e, t) {
                this.on_[e] && this.removeEventListener(e, this.on_[e]),
                  this.addEventListener(e, t),
                  (this.on_[e] = t);
              }),
              (t.prototype._Handle_connect = function (e) {
                (this.connection_ = e),
                  (this.state_ = t.OPEN),
                  this.connection_.on(
                    "message",
                    this._Handle_message.bind(this)
                  ),
                  this.connection_.on("error", this._Handle_error.bind(this)),
                  this.connection_.on("close", this._Handle_close.bind(this));
                var n = new s.Event("open", f);
                this.dispatchEvent(n);
              }),
              (t.prototype._Handle_close = function (e, n) {
                var o = new a.CloseEvent(
                  "close",
                  r({}, f, { code: e, reason: n })
                );
                (this.state_ = t.CLOSED), this.dispatchEvent(o);
              }),
              (t.prototype._Handle_message = function (e) {
                var t = new c.MessageEvent(
                  "message",
                  r({}, f, { data: e.binaryData ? e.binaryData : e.utf8Data })
                );
                this.dispatchEvent(t);
              }),
              (t.prototype._Handle_error = function (e) {
                var n = new u.ErrorEvent(
                  "error",
                  r({}, f, { error: e, message: e.message })
                );
                this.state_ === t.CONNECTING && (this.state_ = t.CLOSED),
                  this.dispatchEvent(n);
              }),
              t
            );
          })(i.EventTarget);
        (e.WebSocket = l),
          (function (e) {
            (e.CONNECTING = 0), (e.OPEN = 1), (e.CLOSING = 2), (e.CLOSED = 3);
          })((l = e.WebSocket || (e.WebSocket = {}))),
          (e.WebSocket = l);
        var f = { bubbles: !1, cancelable: !1 };
      })(oc)),
    oc).WebSocket);
  const { bech32: Qu, hex: Xu, utf8: el } = Ar,
    tl = {
      bech32: "bc",
      pubKeyHash: 0,
      scriptHash: 5,
      validWitnessVersions: [0],
    },
    nl = {
      bech32: "tb",
      pubKeyHash: 111,
      scriptHash: 196,
      validWitnessVersions: [0],
    },
    rl = {
      bech32: "bcrt",
      pubKeyHash: 111,
      scriptHash: 196,
      validWitnessVersions: [0],
    },
    ol = {
      bech32: "sb",
      pubKeyHash: 63,
      scriptHash: 123,
      validWitnessVersions: [0],
    },
    il = [
      "option_data_loss_protect",
      "initial_routing_sync",
      "option_upfront_shutdown_script",
      "gossip_queries",
      "var_onion_optin",
      "gossip_queries_ex",
      "option_static_remotekey",
      "payment_secret",
      "basic_mpp",
      "option_support_large_channel",
    ],
    sl = { m: BigInt(1e3), u: BigInt(1e6), n: BigInt(1e9), p: BigInt(1e12) },
    al = BigInt("2100000000000000000"),
    cl = BigInt(1e11),
    ul = {
      payment_hash: 1,
      payment_secret: 16,
      description: 13,
      payee: 19,
      description_hash: 23,
      expiry: 6,
      min_final_cltv_expiry: 24,
      fallback_address: 9,
      route_hint: 3,
      feature_bits: 5,
      metadata: 27,
    },
    ll = {};
  for (let e = 0, t = Object.keys(ul); e < t.length; e++) {
    const n = t[e],
      r = ul[t[e]].toString();
    ll[r] = n;
  }
  const fl = {
    1: (e) => Xu.encode(Qu.fromWordsUnsafe(e)),
    16: (e) => Xu.encode(Qu.fromWordsUnsafe(e)),
    13: (e) => el.encode(Qu.fromWordsUnsafe(e)),
    19: (e) => Xu.encode(Qu.fromWordsUnsafe(e)),
    23: (e) => Xu.encode(Qu.fromWordsUnsafe(e)),
    27: (e) => Xu.encode(Qu.fromWordsUnsafe(e)),
    6: dl,
    24: dl,
    3: function (e) {
      const t = [];
      let n,
        r,
        o,
        i,
        s,
        a = Qu.fromWordsUnsafe(e);
      for (; a.length > 0; )
        (n = Xu.encode(a.slice(0, 33))),
          (r = Xu.encode(a.slice(33, 41))),
          (o = parseInt(Xu.encode(a.slice(41, 45)), 16)),
          (i = parseInt(Xu.encode(a.slice(45, 49)), 16)),
          (s = parseInt(Xu.encode(a.slice(49, 51)), 16)),
          (a = a.slice(51)),
          t.push({
            pubkey: n,
            short_channel_id: r,
            fee_base_msat: o,
            fee_proportional_millionths: i,
            cltv_expiry_delta: s,
          });
      return t;
    },
    5: function (e) {
      const t = e
        .slice()
        .reverse()
        .map((e) => [!!(1 & e), !!(2 & e), !!(4 & e), !!(8 & e), !!(16 & e)])
        .reduce((e, t) => e.concat(t), []);
      for (; t.length < 2 * il.length; ) t.push(!1);
      const n = {};
      il.forEach((e, r) => {
        let o;
        (o = t[2 * r]
          ? "required"
          : t[2 * r + 1]
          ? "supported"
          : "unsupported"),
          (n[e] = o);
      });
      const r = t.slice(2 * il.length);
      return (
        (n.extra_bits = {
          start_bit: 2 * il.length,
          bits: r,
          has_required: r.reduce(
            (e, t, n) => (n % 2 != 0 ? e || !1 : e || t),
            !1
          ),
        }),
        n
      );
    },
  };
  function hl(e) {
    return (t) => ({
      tagCode: parseInt(e),
      words: Qu.encode("unknown", t, Number.MAX_SAFE_INTEGER),
    });
  }
  function dl(e) {
    return e.reverse().reduce((e, t, n) => e + t * Math.pow(32, n), 0);
  }
  function pl(e, t) {
    let n, r;
    if (e.slice(-1).match(/^[munp]$/)) (n = e.slice(-1)), (r = e.slice(0, -1));
    else {
      if (e.slice(-1).match(/^[^munp0-9]$/))
        throw new Error("Not a valid multiplier for the amount");
      r = e;
    }
    if (!r.match(/^\d+$/)) throw new Error("Not a valid human readable amount");
    const o = BigInt(r),
      i = n ? (o * cl) / sl[n] : o * cl;
    if (("p" === n && o % BigInt(10) !== BigInt(0)) || i > al)
      throw new Error("Amount is outside of valid range");
    return t ? i.toString() : i;
  }
  var yl = {
    decode: function (e, t) {
      if ("string" != typeof e)
        throw new Error("Lightning Payment Request must be string");
      if ("ln" !== e.slice(0, 2).toLowerCase())
        throw new Error("Not a proper lightning payment request");
      const n = [],
        r = Qu.decode(e, Number.MAX_SAFE_INTEGER);
      e = e.toLowerCase();
      const o = r.prefix;
      let i = r.words,
        s = e.slice(o.length + 1),
        a = i.slice(-104);
      i = i.slice(0, -104);
      let c = o.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
      if ((c && !c[2] && (c = o.match(/^ln(\S+)$/)), !c))
        throw new Error("Not a proper lightning payment request");
      n.push({ name: "lightning_network", letters: "ln" });
      const u = c[1];
      let l;
      if (t) {
        if (
          void 0 === t.bech32 ||
          void 0 === t.pubKeyHash ||
          void 0 === t.scriptHash ||
          !Array.isArray(t.validWitnessVersions)
        )
          throw new Error("Invalid network");
        l = t;
      } else
        switch (u) {
          case tl.bech32:
            l = tl;
            break;
          case nl.bech32:
            l = nl;
            break;
          case rl.bech32:
            l = rl;
            break;
          case ol.bech32:
            l = ol;
        }
      if (!l || l.bech32 !== u) throw new Error("Unknown coin bech32 prefix");
      n.push({ name: "coin_network", letters: u, value: l });
      const f = c[2];
      let h;
      if (f) {
        (h = pl(f + c[3], !0)),
          n.push({ name: "amount", letters: c[2] + c[3], value: h });
      } else h = null;
      n.push({ name: "separator", letters: "1" });
      const d = dl(i.slice(0, 7));
      let p, y, b, g;
      for (
        i = i.slice(7),
          n.push({ name: "timestamp", letters: s.slice(0, 7), value: d }),
          s = s.slice(7);
        i.length > 0;

      ) {
        const e = i[0].toString();
        (p = ll[e] || "unknown_tag"),
          (y = fl[e] || hl(e)),
          (i = i.slice(1)),
          (b = dl(i.slice(0, 2))),
          (i = i.slice(2)),
          (g = i.slice(0, b)),
          (i = i.slice(b)),
          n.push({
            name: p,
            tag: s[0],
            letters: s.slice(0, 3 + b),
            value: y(g),
          }),
          (s = s.slice(3 + b));
      }
      n.push({
        name: "signature",
        letters: s.slice(0, 104),
        value: Xu.encode(Qu.fromWordsUnsafe(a)),
      }),
        (s = s.slice(104)),
        n.push({ name: "checksum", letters: s });
      let w = {
        paymentRequest: e,
        sections: n,
        get expiry() {
          let e = n.find((e) => "expiry" === e.name);
          if (e) return v("timestamp") + e.value;
        },
        get route_hints() {
          return n.filter((e) => "route_hint" === e.name).map((e) => e.value);
        },
      };
      for (let e in ul)
        "route_hint" !== e && Object.defineProperty(w, e, { get: () => v(e) });
      return w;
      function v(e) {
        let t = n.find((t) => t.name === e);
        return t ? t.value : void 0;
      }
    },
    hrpToMillisat: pl,
  };
  var bl = class extends na {
    ndk;
    zappedEvent;
    zappedUser;
    constructor(e) {
      super(),
        (this.ndk = e.ndk),
        (this.zappedEvent = e.zappedEvent),
        (this.zappedUser =
          e.zappedUser ||
          this.ndk.getUser({ hexpubkey: this.zappedEvent.pubkey }));
    }
    async getZapEndpoint() {
      let e, t, n, r;
      if (this.zappedEvent) {
        const n = (await this.zappedEvent.getMatchingTags("zap"))[0];
        if (n)
          switch (n[2]) {
            case "lud06":
              e = n[1];
              break;
            case "lud16":
              t = n[1];
              break;
            default:
              throw new Error(`Unknown zap tag ${n}`);
          }
      }
      if (
        (!this.zappedUser ||
          e ||
          t ||
          (this.zappedUser.profile || (await this.zappedUser.fetchProfile()),
          (e = (this.zappedUser.profile || {}).lud06),
          (t = (this.zappedUser.profile || {}).lud16)),
        t)
      ) {
        const [e, r] = t.split("@");
        n = `https://${r}/.well-known/lnurlp/${e}`;
      } else if (e) {
        const { words: t } = Tn.decode(e, 1e3),
          r = Tn.fromWords(t);
        n = new TextDecoder("utf-8").decode(r);
      }
      if (!n) throw new Error("No zap endpoint found");
      const o = await fetch(n),
        i = await o.json();
      return (
        i?.allowsNostr &&
          (i?.nostrPubkey || i?.nostrPubKey) &&
          (r = i.callback),
        r
      );
    }
    async createZapRequest(e, t, n) {
      const r = await this.getZapEndpoint();
      if (!r) throw new Error("No zap endpoint found");
      if (!this.zappedEvent) throw new Error("No zapped event found");
      const o = Ji.makeZapRequest({
        profile: this.zappedUser.hexpubkey(),
        event: null,
        amount: e,
        comment: t || "",
        relays: [
          "wss://nos.lol",
          "wss://relay.nostr.band",
          "wss://relay.f7z.io",
          "wss://relay.damus.io",
          "wss://nostr.mom",
          "wss://no.str.cr",
        ],
      });
      if (this.zappedEvent) {
        const e = this.zappedEvent.tagReference();
        e && o.tags.push(e);
      }
      o.tags.push(["lnurl", r]);
      const i = new kl(this.ndk, o);
      n && (i.tags = i.tags.concat(n)), await i.sign();
      const s = await i.toNostrEvent(),
        a = await fetch(
          `${r}?` +
            new URLSearchParams({
              amount: e.toString(),
              nostr: JSON.stringify(s),
            })
        );
      return (await a.json()).pr;
    }
  };
  function gl() {
    if (void 0 === this.kind) throw new Error("Kind not set");
    return this.kind >= 1e4 && this.kind < 2e4;
  }
  function wl() {
    if (void 0 === this.kind) throw new Error("Kind not set");
    return this.kind >= 3e4 && this.kind < 4e4;
  }
  async function vl() {
    if (!this.ndk) throw new Error("NDK not set");
    const e = await this.ndk.fetchEvents({
      kinds: [3],
      authors: [this.hexpubkey()],
    });
    if (e) {
      const t = new Set();
      return (
        e.forEach((e) => {
          e.tags.forEach((e) => {
            if ("p" === e[0])
              try {
                const n = ti.npubEncode(e[1]);
                t.add(n);
              } catch (e) {}
          });
        }),
        [...t].reduce((e, t) => {
          const n = new ml({ npub: t });
          return (n.ndk = this.ndk), e.add(n), e;
        }, new Set())
      );
    }
    return new Set();
  }
  var ml = class {
    ndk;
    profile;
    npub = "";
    relayUrls = [];
    constructor(e) {
      e.npub && (this.npub = e.npub),
        e.hexpubkey && (this.npub = ti.npubEncode(e.hexpubkey)),
        e.relayUrls && (this.relayUrls = e.relayUrls);
    }
    static async fromNip05(e) {
      const t = await vi.queryProfile(e);
      if (t) return new ml({ hexpubkey: t.pubkey, relayUrls: t.relays });
    }
    hexpubkey() {
      return ti.decode(this.npub).data;
    }
    async fetchProfile(e) {
      if (!this.ndk) throw new Error("NDK not set");
      this.profile || (this.profile = {});
      const t = await this.ndk.fetchEvents(
        { kinds: [0], authors: [this.hexpubkey()] },
        e
      );
      if (t) {
        Array.from(t)
          .sort((e, t) => e.created_at - t.created_at)
          .forEach((e) => {
            try {
              this.profile = (function (e, t) {
                const n = JSON.parse(e.content);
                return (
                  n.name && (t.name = n.name),
                  n.display_name && (t.displayName = n.display_name),
                  n.displayName && (t.displayName = n.displayName),
                  n.image && (t.image = n.image),
                  n.picture && (t.image = n.picture),
                  n.banner && (t.banner = n.banner),
                  n.bio && (t.bio = n.bio),
                  n.nip05 && (t.nip05 = n.nip05),
                  n.lud06 && (t.lud06 = n.lud06),
                  n.lud16 && (t.lud16 = n.lud16),
                  n.about && (t.about = n.about),
                  n.zapService && (t.zapService = n.zapService),
                  t
                );
              })(e, this.profile);
            } catch (e) {}
          });
      }
      return t;
    }
    follows = vl.bind(this);
    async relayList() {
      if (!this.ndk) throw new Error("NDK not set");
      const e = await this.ndk.fetchEvents({
        kinds: [10002],
        authors: [this.hexpubkey()],
      });
      return e || new Set();
    }
    tagReference() {
      return ["p", this.hexpubkey()];
    }
  };
  async function _l(e, t) {
    if (!t) {
      if (!this.ndk) throw new Error("No signer available");
      await this.ndk.assertSigner(), (t = this.ndk.signer);
    }
    if (!e) {
      const t = this.getMatchingTags("p");
      if (1 !== t.length)
        throw new Error(
          "No recipient could be determined and no explicit recipient was provided"
        );
      (e = new ml({ hexpubkey: t[0][1] })).ndk = this.ndk;
    }
    this.content = await t.encrypt(e, this.content);
  }
  async function xl(e, t) {
    if (!t) {
      if (!this.ndk) throw new Error("No signer available");
      await this.ndk.assertSigner(), (t = this.ndk.signer);
    }
    e || (e = this.author), (this.content = await t.decrypt(e, this.content));
  }
  function El() {
    return this.isParamReplaceable()
      ? ti.naddrEncode({
          kind: this.kind,
          pubkey: this.pubkey,
          identifier: this.replaceableDTag(),
        })
      : ti.noteEncode(this.tagId());
  }
  var kl = class extends na {
      ndk;
      created_at;
      content = "";
      tags = [];
      kind;
      id = "";
      sig;
      pubkey = "";
      relay;
      constructor(e, t) {
        super(),
          (this.ndk = e),
          (this.created_at = t?.created_at),
          (this.content = t?.content || ""),
          (this.tags = t?.tags || []),
          (this.id = t?.id || ""),
          (this.sig = t?.sig),
          (this.pubkey = t?.pubkey || ""),
          (this.kind = t?.kind);
      }
      rawEvent() {
        return {
          created_at: this.created_at,
          content: this.content,
          tags: this.tags,
          kind: this.kind,
          pubkey: this.pubkey,
          id: this.id,
          sig: this.sig,
        };
      }
      set author(e) {
        this.pubkey = e.hexpubkey();
      }
      get author() {
        const e = new ml({ hexpubkey: this.pubkey });
        return (e.ndk = this.ndk), e;
      }
      tag(e, t) {
        const n = e.tagReference();
        if ((t && n.push(t), this.tags.push(n), e instanceof kl)) {
          const t = e.author;
          t && this.pubkey !== t.hexpubkey() && this.tag(t);
        }
      }
      async toNostrEvent(e) {
        if (!e && "" === this.pubkey) {
          const e = await this.ndk?.signer?.user();
          this.pubkey = e?.hexpubkey() || "";
        }
        this.created_at || (this.created_at = Math.floor(Date.now() / 1e3));
        const t = this.rawEvent(),
          { content: n, tags: r } = this.generateTags();
        (t.content = n || ""), (t.tags = r);
        try {
          this.id = qo(t);
        } catch (e) {}
        return this.id && (t.id = this.id), this.sig && (t.sig = this.sig), t;
      }
      isReplaceable = gl.bind(this);
      isParamReplaceable = wl.bind(this);
      encode = El.bind(this);
      encrypt = _l.bind(this);
      decrypt = xl.bind(this);
      getMatchingTags(e) {
        return this.tags.filter((t) => t[0] === e);
      }
      tagValue(e) {
        const t = this.getMatchingTags(e);
        if (0 !== t.length) return t[0][1];
      }
      removeTag(e) {
        this.tags = this.tags.filter((t) => t[0] !== e);
      }
      async toString() {
        return await this.toNostrEvent();
      }
      async sign(e) {
        e || this.ndk?.assertSigner(),
          await this.generateTags(),
          this.isReplaceable() &&
            (this.created_at = Math.floor(Date.now() / 1e3));
        const t = await this.toNostrEvent(),
          n = e || this.ndk?.signer;
        this.sig = await n.sign(t);
      }
      async publish(e) {
        return this.sig || (await this.sign()), this.ndk?.publish(this, e);
      }
      generateTags() {
        let e = [];
        const t = (function (e, t = []) {
            return {
              content: (e = e.replace(
                /(@|nostr:)(npub|nprofile|note|nevent)[a-zA-Z0-9]+/g,
                (e) => {
                  try {
                    const n = e.split(/(@|nostr:)/)[2],
                      { type: r, data: o } = ti.decode(n);
                    let i;
                    switch (r) {
                      case "npub":
                        i = ["p", o];
                        break;
                      case "nprofile":
                        i = ["p", o.pubkey];
                        break;
                      case "nevent":
                        i = ["e", o.id];
                        break;
                      case "note":
                        i = ["e", o];
                        break;
                      default:
                        return e;
                    }
                    return (
                      t.find((e) => e[0] == e[0] && e[1] == e[1]) || t.push(i),
                      `nostr:${n}`
                    );
                  } catch (t) {
                    return e;
                  }
                }
              )),
              tags: t,
            };
          })(this.content, this.tags),
          n = t.content;
        if (((e = t.tags), this.kind && this.kind >= 3e4 && this.kind <= 4e4)) {
          if (!this.getMatchingTags("d")[0]) {
            const t = [...Array(16)]
              .map(() => Math.random().toString(36)[2])
              .join("");
            e.push(["d", t]);
          }
        }
        return { content: n || "", tags: e };
      }
      replaceableDTag() {
        if (this.kind && this.kind >= 3e4 && this.kind <= 4e4) {
          const e = this.getMatchingTags("d")[0];
          return e ? e[1] : "";
        }
        throw new Error("Event is not a parameterized replaceable event");
      }
      tagId() {
        if (this.kind && this.kind >= 3e4 && this.kind <= 4e4) {
          const e = this.replaceableDTag();
          return `${this.kind}:${this.pubkey}:${e}`;
        }
        return this.id;
      }
      tagReference() {
        return this.kind && this.kind >= 3e4 && this.kind <= 4e4
          ? ["a", this.tagId()]
          : ["e", this.tagId()];
      }
      async zap(e, t, n) {
        if (!this.ndk) throw new Error("No NDK instance found");
        this.ndk.assertSigner();
        const r = new bl({ ndk: this.ndk, zappedEvent: this });
        return await r.createZapRequest(e, t, n);
      }
      async delete(e) {
        if (!this.ndk) throw new Error("No NDK instance found");
        this.ndk.assertSigner();
        const t = new kl(this.ndk, { kind: 5, content: e || "" });
        return t.tag(this), await t.publish(), t;
      }
    },
    Sl = class extends na {
      url;
      scores;
      relay;
      _status;
      connectedAt;
      _connectionStats = { attempts: 0, success: 0, durations: [] };
      complaining = !1;
      debug;
      activeSubscriptions = new Set();
      constructor(e) {
        super(),
          (this.url = e),
          (this.relay = ei(e)),
          (this.scores = new Map()),
          (this._status = 3),
          (this.debug = ea(`ndk:relay:${e}`)),
          this.relay.on("connect", () => {
            this.updateConnectionStats.connected(),
              this.emit("connect"),
              (this._status = 1);
          }),
          this.relay.on("disconnect", () => {
            this.updateConnectionStats.disconnected(),
              this.emit("disconnect"),
              1 === this._status &&
                ((this._status = 3), this.handleReconnection());
          }),
          this.relay.on("notice", (e) => this.handleNotice(e));
      }
      isFlapping() {
        const e = this._connectionStats.durations;
        if (e.length < 10) return !1;
        const t = e.reduce((e, t) => e + t, 0) / e.length,
          n =
            e.map((e) => Math.pow(e - t, 2)).reduce((e, t) => e + t, 0) /
            e.length;
        return Math.sqrt(n) < 1e3;
      }
      handleReconnection() {
        this.isFlapping() &&
          (this.emit("flapping", this, this._connectionStats),
          (this._status = 5)),
          this.connectedAt && Date.now() - this.connectedAt < 5e3
            ? setTimeout(() => this.connect(), 6e4)
            : this.connect();
      }
      get status() {
        return this._status;
      }
      async connect() {
        try {
          this.updateConnectionStats.attempt(),
            (this._status = 0),
            await this.relay.connect();
        } catch (e) {
          throw (this.debug("Failed to connect", e), (this._status = 3), e);
        }
      }
      disconnect() {
        (this._status = 2), this.relay.close();
      }
      async handleNotice(e) {
        (e.includes("oo many") || e.includes("aximum")) &&
          (this.disconnect(),
          setTimeout(() => this.connect(), 2e3),
          console.log(this.relay.url, "Relay complaining?", e)),
          this.emit("notice", this, e);
      }
      subscribe(e) {
        const { filter: t } = e,
          n = this.relay.sub([t], { id: e.subId });
        this.debug(`Subscribed to ${JSON.stringify(t)}`),
          n.on("event", (t) => {
            const n = new kl(void 0, t);
            (n.relay = this), e.eventReceived(n, this);
          }),
          n.on("eose", () => {
            e.eoseReceived(this);
          });
        const r = n.unsub;
        return (
          (n.unsub = () => {
            this.debug(`Unsubscribing from ${JSON.stringify(t)}`),
              this.activeSubscriptions.delete(e),
              r();
          }),
          this.activeSubscriptions.add(e),
          e.on("close", () => {
            this.activeSubscriptions.delete(e);
          }),
          n
        );
      }
      async publish(e) {
        const t = await e.toNostrEvent(),
          n = this.relay.publish(t);
        n.on("failed", (t) => {
          this.debug("Publish failed", t, e.rawEvent());
        }),
          n.on("ok", () => {
            this.debug("Publish ok", e.rawEvent());
          }),
          this.debug(`Published event ${e.id}`, e.rawEvent());
      }
      scoreSlowerEvent(e) {}
      updateConnectionStats = {
        connected: () => {
          this._connectionStats.success++,
            (this._connectionStats.connectedAt = Date.now());
        },
        disconnected: () => {
          this._connectionStats.connectedAt &&
            (this._connectionStats.durations.push(
              Date.now() - this._connectionStats.connectedAt
            ),
            this._connectionStats.durations.length > 100 &&
              this._connectionStats.durations.shift()),
            (this._connectionStats.connectedAt = void 0);
        },
        attempt: () => {
          this._connectionStats.attempts++;
        },
      };
      get connectionStats() {
        return this._connectionStats;
      }
    },
    Al = class extends na {
      relays = new Map();
      debug;
      constructor(e = [], t) {
        super(), (this.debug = t.debug.extend("pool"));
        for (const t of e) {
          const e = new Sl(t);
          e.on("notice", (e, t) => this.emit("notice", e, t)),
            e.on("connect", () => this.handleRelayConnect(t)),
            e.on("disconnect", () => this.emit("relay:disconnect", e)),
            e.on("flapping", () => this.handleFlapping(e)),
            this.relays.set(t, e);
        }
      }
      handleRelayConnect(e) {
        this.debug(`Relay ${e} connected`),
          this.emit("relay:connect", this.relays.get(e)),
          this.stats().connected === this.relays.size && this.emit("connect");
      }
      async connect(e) {
        const t = [];
        this.debug(
          `Connecting to ${this.relays.size} relays${
            e ? `, timeout ${e}...` : ""
          }`
        );
        for (const n of this.relays.values())
          if (e) {
            const r = new Promise((t, n) => {
              setTimeout(() => n(`Timed out after ${e}ms`), e);
            });
            t.push(
              Promise.race([n.connect(), r]).catch((e) => {
                this.debug(`Failed to connect to relay ${n.url}: ${e}`);
              })
            );
          } else t.push(n.connect());
        await Promise.all(t);
      }
      handleFlapping(e) {
        this.debug(`Relay ${e.url} is flapping`),
          this.relays.delete(e.url),
          this.emit("flapping", e);
      }
      size() {
        return this.relays.size;
      }
      stats() {
        const e = { total: 0, connected: 0, disconnected: 0, connecting: 0 };
        for (const t of this.relays.values())
          e.total++,
            1 === t.status
              ? e.connected++
              : 3 === t.status
              ? e.disconnected++
              : 0 === t.status && e.connecting++;
        return e;
      }
    },
    Ol = {
      closeOnEose: !0,
      cacheUsage: "CACHE_FIRST",
      groupable: !0,
      groupableDelay: 100,
    },
    Cl = class extends na {
      subId;
      filter;
      opts;
      relaySet;
      ndk;
      relaySubscriptions;
      debug;
      eventFirstSeen = new Map();
      eosesSeen = new Set();
      eventsPerRelay = new Map();
      constructor(e, t, n, r, o) {
        if (
          (super(),
          (this.ndk = e),
          (this.subId = o || Math.floor(9999991e3 * Math.random()).toString()),
          (this.filter = t),
          (this.relaySet = r),
          (this.opts = { ...Ol, ...(n || {}) }),
          (this.relaySubscriptions = new Map()),
          (this.debug = e.debug.extend("subscription")),
          "ONLY_CACHE" === this.opts.cacheUsage && !this.opts.closeOnEose)
        )
          throw new Error(
            "Cannot use cache-only options with a persistent subscription"
          );
      }
      groupableId() {
        if (!this.opts?.groupable) return null;
        const e = (this.filter.kinds?.length || 0) > 0,
          t = !this.filter.since && !this.filter.until,
          n = !this.filter.limit;
        if (e && t && n) {
          let e = this.filter.kinds.join(",");
          return (
            (e += `-${Object.keys(this.filter || {})
              .sort()
              .join("-")}`),
            e
          );
        }
        return null;
      }
      shouldQueryCache() {
        return "ONLY_RELAY" !== this.opts?.cacheUsage;
      }
      shouldQueryRelays() {
        return "ONLY_CACHE" !== this.opts?.cacheUsage;
      }
      async start() {
        let e;
        if (this.shouldQueryCache()) {
          e = this.startWithCache();
          if (
            this.ndk.cacheAdapter?.locking &&
            this.shouldQueryRelays() &&
            "PARALLEL" !== this.opts?.cacheUsage &&
            (this.debug("waiting for cache to finish"),
            await e,
            this.eventFirstSeen.size > 0)
          )
            return (
              this.debug("cache hit, skipping relay query"),
              void this.emit("eose", this)
            );
        }
        this.shouldQueryRelays() && this.startWithRelaySet();
      }
      stop() {
        this.relaySubscriptions.forEach((e) => e.unsub()),
          this.relaySubscriptions.clear(),
          this.emit("close", this);
      }
      async startWithCache() {
        if (this.ndk.cacheAdapter?.query) {
          this.debug("querying cache");
          const e = this.ndk.cacheAdapter.query(this);
          this.ndk.cacheAdapter.locking && (await e);
        }
      }
      startWithRelaySet() {
        this.relaySet ||
          (this.relaySet = (function (e, t) {
            const n = new Set();
            return (
              e.pool?.relays.forEach((t) => {
                t.complaining
                  ? e.debug(`Relay ${t.url} is complaining, not adding to set`)
                  : n.add(t);
              }),
              new Il(n, e)
            );
          })(this.ndk, this.filter)),
          this.relaySet &&
            (this.debug("querying relays"), this.relaySet.subscribe(this));
      }
      eventReceived(e, t, n = !1) {
        if (!n && t) {
          let n = this.eventsPerRelay.get(t);
          n || ((n = new Set()), this.eventsPerRelay.set(t, n)), n.add(e.id);
          if (this.eventFirstSeen.has(e.id)) {
            const n = Date.now() - (this.eventFirstSeen.get(e.id) || 0);
            return (
              t.scoreSlowerEvent(n), void this.emit("event:dup", e, t, n, this)
            );
          }
          this.ndk.cacheAdapter &&
            this.ndk.cacheAdapter.setEvent(e, this.filter),
            this.eventFirstSeen.set(`${e.id}`, Date.now());
        } else this.eventFirstSeen.set(`${e.id}`, 0);
        this.emit("event", e, t, this);
      }
      eoseTimeout;
      eoseReceived(e) {
        this.opts?.closeOnEose &&
          (this.relaySubscriptions.get(e)?.unsub(),
          this.relaySubscriptions.delete(e),
          0 === this.relaySubscriptions.size && this.emit("close", this)),
          this.eosesSeen.add(e);
        this.eosesSeen.size === this.relaySet?.size()
          ? this.emit("eose")
          : (this.eoseTimeout && clearTimeout(this.eoseTimeout),
            (this.eoseTimeout = setTimeout(() => {
              this.emit("eose");
            }, 500)));
      }
    },
    Pl = class extends Cl {
      subscriptions;
      constructor(e, t) {
        const n = e.debug.extend("subscription-group");
        super(
          e,
          (function (e) {
            const t = {};
            return (
              e.forEach((e) => {
                Object.entries(e).forEach(([e, n]) => {
                  Array.isArray(n)
                    ? void 0 === t[e]
                      ? (t[e] = [...n])
                      : (t[e] = Array.from(new Set([...t[e], ...n])))
                    : (t[e] = n);
                });
              }),
              t
            );
          })(t.map((e) => e.filter)),
          t[0].opts,
          t[0].relaySet
        ),
          (this.subscriptions = t),
          n("merged filters", { count: t.length, mergedFilters: this.filter }),
          this.on("event", this.forwardEvent),
          this.on("event:dup", this.forwardEventDup),
          this.on("eose", this.forwardEose),
          this.on("close", this.forwardClose);
      }
      isEventForSubscription(e, t) {
        const { filter: n } = t;
        return !!n && Go(n, e.rawEvent());
      }
      forwardEvent(e, t) {
        for (const n of this.subscriptions)
          this.isEventForSubscription(e, n) && n.emit("event", e, t, n);
      }
      forwardEventDup(e, t, n) {
        for (const r of this.subscriptions)
          this.isEventForSubscription(e, r) && r.emit("event:dup", e, t, n, r);
      }
      forwardEose() {
        for (const e of this.subscriptions) e.emit("eose", e);
      }
      forwardClose() {
        for (const e of this.subscriptions) e.emit("close", e);
      }
    };
  var Il = class {
    relays;
    debug;
    ndk;
    constructor(e, t) {
      (this.relays = e),
        (this.ndk = t),
        (this.debug = t.debug.extend("relayset"));
    }
    static fromRelayUrls(e, t) {
      const n = new Set();
      for (const r of e) {
        const e = t.pool.relays.get(r);
        e && n.add(e);
      }
      return new Il(new Set(n), t);
    }
    subscribeOnRelay(e, t) {
      const n = e.subscribe(t);
      t.relaySubscriptions.set(e, n);
    }
    getId() {
      const e = Array.from(this.relays)
        .map((e) => e.url)
        .sort()
        .join(",");
      return ge(Le(e));
    }
    subscribe(e) {
      const t = e.groupableId(),
        n = `${this.getId()}:${t}`;
      if (!n) return this.executeSubscription(e), e;
      const r = this.ndk.delayedSubscriptions.get(n);
      return (
        r
          ? r.push(e)
          : (setTimeout(() => {
              this.executeDelayedSubscription(n);
            }, e.opts.groupableDelay),
            this.ndk.delayedSubscriptions.set(n, [e])),
        e
      );
    }
    executeDelayedSubscription(e) {
      const t = this.ndk.delayedSubscriptions.get(e);
      this.ndk.delayedSubscriptions.delete(e),
        t &&
          (t.length > 1
            ? this.executeSubscriptions(t)
            : this.executeSubscription(t[0]));
    }
    executeSubscriptions(e) {
      const t = e[0].ndk,
        n = new Pl(t, e);
      this.executeSubscription(n);
    }
    executeSubscription(e) {
      this.debug("subscribing", { filter: e.filter });
      for (const t of this.relays)
        if (1 === t.status) this.subscribeOnRelay(t, e);
        else {
          const n = () => {
            this.debug("new relay coming online for active subscription", {
              relay: t.url,
              filter: e.filter,
            }),
              this.subscribeOnRelay(t, e);
          };
          t.once("connect", n),
            e.once("close", () => {
              t.removeListener("connect", n);
            });
        }
      return e;
    }
    async publish(e) {
      this.relays.forEach(async (t) => {
        try {
          await t.publish(e);
        } catch (e) {}
      });
    }
    size() {
      return this.relays.size;
    }
  };
  var Tl = class extends na {
    pool;
    signer;
    cacheAdapter;
    debug;
    devWriteRelaySet;
    delayedSubscriptions;
    constructor(e = {}) {
      super(),
        (this.debug = e.debug || ea("ndk")),
        (this.pool = new Al(e.explicitRelayUrls || [], this)),
        (this.signer = e.signer),
        (this.cacheAdapter = e.cacheAdapter),
        (this.delayedSubscriptions = new Map()),
        e.devWriteRelayUrls &&
          (this.devWriteRelaySet = Il.fromRelayUrls(e.devWriteRelayUrls, this));
    }
    async connect(e) {
      return (
        this.debug("Connecting to relays", { timeoutMs: e }),
        this.pool.connect(e)
      );
    }
    getUser(e) {
      const t = new ml(e);
      return (t.ndk = this), t;
    }
    subscribe(e, t, n) {
      const r = new Cl(this, e, t, n);
      return r.start(), r;
    }
    async publish(e, t) {
      return (
        t ||
          (t =
            this.devWriteRelaySet ||
            (function (e, t) {
              const n = new Set();
              return e.pool?.relays.forEach((e) => n.add(e)), new Il(n, e);
            })(this)),
        t.publish(e)
      );
    }
    async fetchEvent(e, t = {}) {
      let n;
      if (
        ((n =
          "string" == typeof e
            ? (function (e) {
                let t;
                try {
                  switch (((t = ti.decode(e)), t.type)) {
                    case "nevent":
                      return { ids: [t.data.id] };
                    case "note":
                      return { ids: [t.data] };
                    case "naddr":
                      return {
                        authors: [t.data.pubkey],
                        "#d": [t.data.identifier],
                        kinds: [t.data.kind],
                      };
                  }
                } catch (e) {}
                return { ids: [e] };
              })(e)
            : e),
        !n)
      )
        throw new Error(`Invalid filter: ${JSON.stringify(e)}`);
      return new Promise((e) => {
        const r = this.subscribe(n, { ...t, closeOnEose: !0 });
        r.on("event", (t) => {
          (t.ndk = this), e(t);
        }),
          r.on("eose", () => {
            e(null);
          });
      });
    }
    async fetchEvents(e, t = {}) {
      return new Promise((n) => {
        const r = new Map(),
          o = this.subscribe(e, { ...t, closeOnEose: !0 });
        o.on("event", (e) => {
          const t = r.get(e.tagId());
          var n, o;
          t && ((o = e), (e = (n = t).created_at > o.created_at ? n : o)),
            (e.ndk = this),
            r.set(e.tagId(), e);
        }),
          o.on("eose", () => {
            n(new Set(r.values()));
          });
      });
    }
    async assertSigner() {
      if (!this.signer)
        throw (this.emit("signerRequired"), new Error("Signer required"));
    }
  };
  new ea("nostr:adapter");
  const Ll = new ea("nostr:adapter:profiles"),
    Bl = new ea("nostr:adapter:write");
  class Rl {
    relayStatus = {};
    #e = null;
    #t = {};
    #n = new hs();
    #r = {};
    tags;
    referenceTags;
    type;
    #o;
    chatId;
    relayUrls = [];
    #i = [];
    #s = [];
    #a;
    #c = {};
    #u = {};
    constructor(
      e,
      {
        tags: t,
        referenceTags: n,
        type: r = "DM",
        chatId: o,
        websiteOwnerPubkey: i,
        relays: s,
      } = {}
    ) {
      (this.pubkey = e),
        (this.#o = i),
        (this.relayUrls = s),
        r && this.setChatConfiguration(r, t, n, o);
    }
    setChatConfiguration(e, t, n, r) {
      (this.type = e),
        (this.tags = t),
        (this.chatId = r),
        (this.referenceTags = n),
        this.#e && this.#l();
      let o = [];
      switch (this.type) {
        case "DM":
          o.push({
            kinds: [4],
            "#p": [this.pubkey, this.#o],
            authors: [this.pubkey, this.#o],
          });
          break;
        case "GROUP":
          this.chatId &&
            o.push({ kinds: [41, 42], "#e": [this.chatId], limit: 200 });
        case "GLOBAL":
          this.tags &&
            this.tags.length > 0 &&
            o.push({ kinds: [1], "#t": this.tags, limit: 20 }),
            this.referenceTags &&
              this.referenceTags.length > 0 &&
              o.push({ kinds: [1], "#r": this.referenceTags, limit: 20 });
      }
      o &&
        o.length > 0 &&
        (this.#f(),
        this.subscribe(o, (e) => {
          this.#h(e);
        }));
    }
    async getPubKey() {
      return this.pubkey;
    }
    on(e, t) {
      this.#n.on(e, t);
    }
    async send(e, { tagPubKeys: t, tags: n } = {}) {
      let r;
      n || (n = []),
        (r =
          "DM" === this.type
            ? await this.sendKind4(e, { tagPubKeys: t, tags: n })
            : "GROUP" === this.type
            ? await this.sendKind42(e, {
                tagPubKeys: t,
                tags: n,
                chatId: this.chatId,
              })
            : await this.sendKind1(e, { tagPubKeys: t, tags: n })),
        (r.id = qo(r));
      const o = await this.signEvent(r);
      return this.#d(o), r.id;
    }
    async sendKind4(e, { tagPubKeys: t, tags: n } = {}) {
      let r = await this.encrypt(this.#o, e);
      return {
        kind: 4,
        pubkey: this.pubkey,
        created_at: Math.floor(Date.now() / 1e3),
        content: r,
        tags: [["p", this.#o], ...n],
      };
    }
    async sendKind42(e, { tagPubKeys: t, tags: n, chatId: r } = {}) {
      n || (n = []), this.tags && this.tags.forEach((e) => n.push(["t", e]));
      const o = !!n.find((e) => "e" === e[0]);
      o || n.push(["e", r, "wss://nos.lol", o ? "reply" : "root"]),
        this.referenceTags &&
          this.referenceTags.forEach((e) => n.push(["r", e]));
      let i = {
        kind: 42,
        created_at: Math.floor(Date.now() / 1e3),
        tags: n,
        content: e,
        pubkey: this.pubkey,
      };
      if (t) for (let e of t) e && i.tags.push(["p", e]);
      return (i.id = qo(i)), this.subscribeToEventAndResponses(i.id), i;
    }
    async sendKind1(e, { tagPubKeys: t, tags: n } = {}) {
      n || (n = []),
        this.tags && this.tags.forEach((e) => n.push(["t", e])),
        this.referenceTags &&
          this.referenceTags.forEach((e) => n.push(["r", e]));
      let r = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1e3),
        tags: n,
        content: e,
        pubkey: this.pubkey,
      };
      if (t) for (let e of t) e && r.tags.push(["p", e]);
      return (r.id = qo(r)), this.subscribeToEventAndResponses(r.id), r;
    }
    async #d(e) {
      Bl("publish", e), this.#e.send(["EVENT", e]);
    }
    async onEvent(e, t) {
      this.#p(e.pubkey), t(e);
    }
    async delayedSubscribe(e, t, n) {
      (this.#c[t] = this.#c[t] || []),
        this.#c[t].push(e),
        this.#u[t] ||
          (this.#u[t] = setTimeout(() => {
            delete this.#u[t];
            let e = this.#c[t];
            delete this.#c[t];
            let n = [];
            (n = e.reduce(
              (e, t, n) => (
                n % 10 == 0 && e.push([]), e[e.length - 1].push(t), e
              ),
              n
            )),
              n.forEach((e) => {
                this.subscribe(e, (e) => {
                  this.#h(e);
                });
              });
          }, n));
    }
    async subscribe(e, t = null) {
      return (
        t ||
          (t = (e) => {
            this.#h(e);
          }),
        this.#y(e, t)
      );
    }
    async #y(e, t) {
      const n = Es();
      return (
        (this.#r[n] = t),
        Array.isArray(e) || (e = [e]),
        this.#e.subscribe(n, e),
        this.#e.on("event", (e, t, n) => {
          this.onEvent(n, this.#r[t]);
        }),
        n
      );
    }
    async #h(e) {
      if (this.#t[e.id]) return;
      (this.#t[e.id] = !0),
        4 === e.kind && (e.content = await this.decrypt(this.#o, e.content));
      let t,
        n = [];
      if (
        (5 === e.kind &&
          (n = e.tags.filter((e) => "e" === e[0]).map((e) => e[1])),
        9735 === e.kind)
      ) {
        (t = (function (e) {
          const t = e.getMatchingTags("description")[0],
            n = e.getMatchingTags("bolt11")[0];
          let r, o;
          if (!t || !n || !n[1]) return null;
          try {
            let e = t[1];
            if ((e.startsWith("%") && (e = decodeURIComponent(e)), "" === e))
              return null;
            (o = JSON.parse(e)), (r = yl.decode(n[1]));
          } catch (e) {
            return null;
          }
          const i = r.sections.find((e) => "amount" === e.name);
          if (!i) return null;
          const s = parseInt(i.value);
          if (!s) return null;
          const a = o.content,
            c = o.pubkey,
            u = e.getMatchingTags("p")[0][1];
          let l = e.getMatchingTags("e")[0];
          l || (l = e.getMatchingTags("a")[0]);
          const f = l ? l[1] : void 0;
          return {
            id: e.id,
            zapper: e.pubkey,
            zappee: c,
            zapped: u,
            zappedEvent: f,
            amount: s,
            comment: a,
          };
        })(new kl(null, e))),
          console.log(`received a zap invoice: ${t}`, e);
      }
      switch (e.kind) {
        case 1:
        case 42:
        case 4:
          this.#n.emit("message", e);
          break;
        case 41:
          this.#n.emit("channelMetadata", e);
          break;
        case 5:
          this.#n.emit("deleted", n);
          break;
        case 7:
          this.#n.emit("reaction", e);
          break;
        case 9735:
          this.#n.emit("zap", t);
          break;
        default:
          console.log("unknown event kind", e.kind, e);
      }
    }
    subscribeToEventAndResponses(e) {
      this.subscribe([{ ids: [e] }, { "#e": [e] }], (e) => {
        this.#h(e);
      });
    }
    subscribeToResponses(e) {
      this.subscribe([{ "#e": [e.id] }], (e) => {
        this.#h(e), this.subscribeToResponses(e);
      });
    }
    #f() {
      this.relayUrls.forEach((e) => {
        this.relayStatus[e] = "disconnected";
      }),
        this.#n.emit("connectivity", this.relayStatus),
        (this.#e = new ls(this.relayUrls)),
        this.#e.on("open", (e) => {
          (this.relayStatus[e.url] = "connected"),
            this.#n.emit("connectivity", this.relayStatus);
        }),
        this.#e.on("error", (e, t, n) => {
          (this.relayStatus[e.url] = "error"),
            this.#n.emit("connectivity", this.relayStatus),
            console.log("error from relay", e.url, t, n);
        }),
        this.#e.on("close", (e, t) => {
          (this.relayStatus[e.url] = "closed"),
            this.#n.emit("connectivity", this.relayStatus),
            console.log("error from relay", e.url, t);
        }),
        this.#e.on("notice", (e, t) => {
          console.log("notice", e.url, t);
        });
    }
    #l() {
      this.relayUrls.forEach((e) => {
        this.relayStatus[e] = "disconnected";
      }),
        this.#n.emit("connectivity", this.relayStatus),
        this.#e.close(),
        (this.#e = null);
    }
    reqProfile(e) {
      this.#p(e);
    }
    #p(e, t = null) {
      this.#i.includes(e) ||
        this.#s.includes(e) ||
        (this.#i.push(e),
        this.#s.push(e),
        this.#a ||
          (this.#a = setTimeout(() => {
            (this.#a = null), this.#b();
          }, 500)));
    }
    async #b() {
      if (this.#i.length > 0) {
        Ll("requesting profiles", this.#i);
        const e = await this.subscribe(
          { kinds: [0], authors: this.#i },
          (e) => {
            this.#g(e);
          }
        );
        Ll("subscribed to request", { subId: e }),
          (this.#i = []),
          setTimeout(() => {
            Ll("unsubscribing from request", { subId: e }),
              this.#e.unsubscribe(e);
          }, 5e3);
      }
    }
    #g(e) {
      let t;
      Ll("received profile", e);
      try {
        t = JSON.parse(e.content);
      } catch (t) {
        return void Ll("failed to parse profile", e);
      }
      this.#n.emit("profile", { pubkey: e.pubkey, profile: t });
    }
  }
  class $l extends Rl {
    constructor(e, t = {}) {
      super(e, t);
    }
    async signEvent(e) {
      return await window.nostr.signEvent(e);
    }
    async encrypt(e, t) {
      return await window.nostr.nip04.encrypt(e, t);
    }
    async decrypt(e, t) {
      return await window.nostr.nip04.decrypt(e, t);
    }
  }
  function jl() {
    jl = function () {
      return e;
    };
    var e = {},
      t = Object.prototype,
      n = t.hasOwnProperty,
      r =
        Object.defineProperty ||
        function (e, t, n) {
          e[t] = n.value;
        },
      o = "function" == typeof Symbol ? Symbol : {},
      i = o.iterator || "@@iterator",
      s = o.asyncIterator || "@@asyncIterator",
      a = o.toStringTag || "@@toStringTag";
    function c(e, t, n) {
      return (
        Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        e[t]
      );
    }
    try {
      c({}, "");
    } catch (e) {
      c = function (e, t, n) {
        return (e[t] = n);
      };
    }
    function u(e, t, n, o) {
      var i = t && t.prototype instanceof h ? t : h,
        s = Object.create(i.prototype),
        a = new S(o || []);
      return r(s, "_invoke", { value: _(e, n, a) }), s;
    }
    function l(e, t, n) {
      try {
        return { type: "normal", arg: e.call(t, n) };
      } catch (e) {
        return { type: "throw", arg: e };
      }
    }
    e.wrap = u;
    var f = {};
    function h() {}
    function d() {}
    function p() {}
    var y = {};
    c(y, i, function () {
      return this;
    });
    var b = Object.getPrototypeOf,
      g = b && b(b(A([])));
    g && g !== t && n.call(g, i) && (y = g);
    var w = (p.prototype = h.prototype = Object.create(y));
    function v(e) {
      ["next", "throw", "return"].forEach(function (t) {
        c(e, t, function (e) {
          return this._invoke(t, e);
        });
      });
    }
    function m(e, t) {
      function o(r, i, s, a) {
        var c = l(e[r], e, i);
        if ("throw" !== c.type) {
          var u = c.arg,
            f = u.value;
          return f && "object" == typeof f && n.call(f, "__await")
            ? t.resolve(f.__await).then(
                function (e) {
                  o("next", e, s, a);
                },
                function (e) {
                  o("throw", e, s, a);
                }
              )
            : t.resolve(f).then(
                function (e) {
                  (u.value = e), s(u);
                },
                function (e) {
                  return o("throw", e, s, a);
                }
              );
        }
        a(c.arg);
      }
      var i;
      r(this, "_invoke", {
        value: function (e, n) {
          function r() {
            return new t(function (t, r) {
              o(e, n, t, r);
            });
          }
          return (i = i ? i.then(r, r) : r());
        },
      });
    }
    function _(e, t, n) {
      var r = "suspendedStart";
      return function (o, i) {
        if ("executing" === r) throw new Error("Generator is already running");
        if ("completed" === r) {
          if ("throw" === o) throw i;
          return O();
        }
        for (n.method = o, n.arg = i; ; ) {
          var s = n.delegate;
          if (s) {
            var a = x(s, n);
            if (a) {
              if (a === f) continue;
              return a;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;
          else if ("throw" === n.method) {
            if ("suspendedStart" === r) throw ((r = "completed"), n.arg);
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          r = "executing";
          var c = l(e, t, n);
          if ("normal" === c.type) {
            if (((r = n.done ? "completed" : "suspendedYield"), c.arg === f))
              continue;
            return { value: c.arg, done: n.done };
          }
          "throw" === c.type &&
            ((r = "completed"), (n.method = "throw"), (n.arg = c.arg));
        }
      };
    }
    function x(e, t) {
      var n = t.method,
        r = e.iterator[n];
      if (void 0 === r)
        return (
          (t.delegate = null),
          ("throw" === n &&
            e.iterator.return &&
            ((t.method = "return"),
            (t.arg = void 0),
            x(e, t),
            "throw" === t.method)) ||
            ("return" !== n &&
              ((t.method = "throw"),
              (t.arg = new TypeError(
                "The iterator does not provide a '" + n + "' method"
              )))),
          f
        );
      var o = l(r, e.iterator, t.arg);
      if ("throw" === o.type)
        return (t.method = "throw"), (t.arg = o.arg), (t.delegate = null), f;
      var i = o.arg;
      return i
        ? i.done
          ? ((t[e.resultName] = i.value),
            (t.next = e.nextLoc),
            "return" !== t.method && ((t.method = "next"), (t.arg = void 0)),
            (t.delegate = null),
            f)
          : i
        : ((t.method = "throw"),
          (t.arg = new TypeError("iterator result is not an object")),
          (t.delegate = null),
          f);
    }
    function E(e) {
      var t = { tryLoc: e[0] };
      1 in e && (t.catchLoc = e[1]),
        2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
        this.tryEntries.push(t);
    }
    function k(e) {
      var t = e.completion || {};
      (t.type = "normal"), delete t.arg, (e.completion = t);
    }
    function S(e) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        e.forEach(E, this),
        this.reset(!0);
    }
    function A(e) {
      if (e) {
        var t = e[i];
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var r = -1,
            o = function t() {
              for (; ++r < e.length; )
                if (n.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
              return (t.value = void 0), (t.done = !0), t;
            };
          return (o.next = o);
        }
      }
      return { next: O };
    }
    function O() {
      return { value: void 0, done: !0 };
    }
    return (
      (d.prototype = p),
      r(w, "constructor", { value: p, configurable: !0 }),
      r(p, "constructor", { value: d, configurable: !0 }),
      (d.displayName = c(p, a, "GeneratorFunction")),
      (e.isGeneratorFunction = function (e) {
        var t = "function" == typeof e && e.constructor;
        return (
          !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name))
        );
      }),
      (e.mark = function (e) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(e, p)
            : ((e.__proto__ = p), c(e, a, "GeneratorFunction")),
          (e.prototype = Object.create(w)),
          e
        );
      }),
      (e.awrap = function (e) {
        return { __await: e };
      }),
      v(m.prototype),
      c(m.prototype, s, function () {
        return this;
      }),
      (e.AsyncIterator = m),
      (e.async = function (t, n, r, o, i) {
        void 0 === i && (i = Promise);
        var s = new m(u(t, n, r, o), i);
        return e.isGeneratorFunction(n)
          ? s
          : s.next().then(function (e) {
              return e.done ? e.value : s.next();
            });
      }),
      v(w),
      c(w, a, "Generator"),
      c(w, i, function () {
        return this;
      }),
      c(w, "toString", function () {
        return "[object Generator]";
      }),
      (e.keys = function (e) {
        var t = Object(e),
          n = [];
        for (var r in t) n.push(r);
        return (
          n.reverse(),
          function e() {
            for (; n.length; ) {
              var r = n.pop();
              if (r in t) return (e.value = r), (e.done = !1), e;
            }
            return (e.done = !0), e;
          }
        );
      }),
      (e.values = A),
      (S.prototype = {
        constructor: S,
        reset: function (e) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = void 0),
            this.tryEntries.forEach(k),
            !e)
          )
            for (var t in this)
              "t" === t.charAt(0) &&
                n.call(this, t) &&
                !isNaN(+t.slice(1)) &&
                (this[t] = void 0);
        },
        stop: function () {
          this.done = !0;
          var e = this.tryEntries[0].completion;
          if ("throw" === e.type) throw e.arg;
          return this.rval;
        },
        dispatchException: function (e) {
          if (this.done) throw e;
          var t = this;
          function r(n, r) {
            return (
              (s.type = "throw"),
              (s.arg = e),
              (t.next = n),
              r && ((t.method = "next"), (t.arg = void 0)),
              !!r
            );
          }
          for (var o = this.tryEntries.length - 1; o >= 0; --o) {
            var i = this.tryEntries[o],
              s = i.completion;
            if ("root" === i.tryLoc) return r("end");
            if (i.tryLoc <= this.prev) {
              var a = n.call(i, "catchLoc"),
                c = n.call(i, "finallyLoc");
              if (a && c) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              } else if (a) {
                if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
              } else {
                if (!c)
                  throw new Error("try statement without catch or finally");
                if (this.prev < i.finallyLoc) return r(i.finallyLoc);
              }
            }
          }
        },
        abrupt: function (e, t) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var o = this.tryEntries[r];
            if (
              o.tryLoc <= this.prev &&
              n.call(o, "finallyLoc") &&
              this.prev < o.finallyLoc
            ) {
              var i = o;
              break;
            }
          }
          i &&
            ("break" === e || "continue" === e) &&
            i.tryLoc <= t &&
            t <= i.finallyLoc &&
            (i = null);
          var s = i ? i.completion : {};
          return (
            (s.type = e),
            (s.arg = t),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), f)
              : this.complete(s)
          );
        },
        complete: function (e, t) {
          if ("throw" === e.type) throw e.arg;
          return (
            "break" === e.type || "continue" === e.type
              ? (this.next = e.arg)
              : "return" === e.type
              ? ((this.rval = this.arg = e.arg),
                (this.method = "return"),
                (this.next = "end"))
              : "normal" === e.type && t && (this.next = t),
            f
          );
        },
        finish: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.finallyLoc === e)
              return this.complete(n.completion, n.afterLoc), k(n), f;
          }
        },
        catch: function (e) {
          for (var t = this.tryEntries.length - 1; t >= 0; --t) {
            var n = this.tryEntries[t];
            if (n.tryLoc === e) {
              var r = n.completion;
              if ("throw" === r.type) {
                var o = r.arg;
                k(n);
              }
              return o;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function (e, t, n) {
          return (
            (this.delegate = { iterator: A(e), resultName: t, nextLoc: n }),
            "next" === this.method && (this.arg = void 0),
            f
          );
        },
      }),
      e
    );
  }
  function Ul(e, t, n, r, o, i, s) {
    try {
      var a = e[i](s),
        c = a.value;
    } catch (e) {
      return void n(e);
    }
    a.done ? t(c) : Promise.resolve(c).then(r, o);
  }
  function Nl(e) {
    return function () {
      var t = this,
        n = arguments;
      return new Promise(function (r, o) {
        var i = e.apply(t, n);
        function s(e) {
          Ul(i, r, o, s, a, "next", e);
        }
        function a(e) {
          Ul(i, r, o, s, a, "throw", e);
        }
        s(void 0);
      });
    };
  }
  function Hl() {
    return (
      (Hl = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }),
      Hl.apply(this, arguments)
    );
  }
  var ql = (function () {
    function e(e) {
      (this.events = new hs()),
        (this.relay = e.relay || "wss://nostr.vulpem.com"),
        (this.self = { pubkey: To(e.secretKey), secret: e.secretKey });
    }
    var t = e.prototype;
    return (
      (t.call = (function () {
        var e = Nl(
          jl().mark(function e(t, n) {
            var r,
              o,
              i,
              s,
              a,
              c,
              u,
              l,
              f,
              h,
              d = this;
            return jl().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.target),
                        (o = t.request),
                        (i = o.id),
                        (s = void 0 === i ? Fl() : i),
                        (a = o.method),
                        (c = o.params),
                        (u = void 0 === c ? [] : c),
                        (e.next = 3),
                        Vl(this.relay)
                      );
                    case 3:
                      return (
                        (l = e.sent),
                        (f = Dl(s, a, u)),
                        (e.next = 7),
                        zl(this.self.secret, r, f)
                      );
                    case 7:
                      return (
                        (h = e.sent),
                        e.abrupt(
                          "return",
                          new Promise(
                            (function () {
                              var e = Nl(
                                jl().mark(function e(t, o) {
                                  var i;
                                  return jl().wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (
                                            (i = l.sub([
                                              {
                                                kinds: [24133],
                                                authors: [r],
                                                "#p": [d.self.pubkey],
                                                limit: 1,
                                              },
                                            ])),
                                            (e.next = 3),
                                            Zl(l, h, !0)
                                          );
                                        case 3:
                                          n && !0 === n.skipResponse && t(),
                                            i.on(
                                              "event",
                                              (function () {
                                                var e = Nl(
                                                  jl().mark(function e(n) {
                                                    var r, i;
                                                    return jl().wrap(
                                                      function (e) {
                                                        for (;;)
                                                          switch (
                                                            (e.prev = e.next)
                                                          ) {
                                                            case 0:
                                                              return (
                                                                (e.prev = 0),
                                                                (e.next = 3),
                                                                yi.decrypt(
                                                                  d.self.secret,
                                                                  n.pubkey,
                                                                  n.content
                                                                )
                                                              );
                                                            case 3:
                                                              if (
                                                                (i = e.sent)
                                                              ) {
                                                                e.next = 6;
                                                                break;
                                                              }
                                                              throw new Error(
                                                                "failed to decrypt event"
                                                              );
                                                            case 6:
                                                              (r =
                                                                JSON.parse(i)),
                                                                (e.next = 12);
                                                              break;
                                                            case 9:
                                                              return (
                                                                (e.prev = 9),
                                                                (e.t0 =
                                                                  e.catch(0)),
                                                                e.abrupt(
                                                                  "return"
                                                                )
                                                              );
                                                            case 12:
                                                              if (Wl(r)) {
                                                                e.next = 14;
                                                                break;
                                                              }
                                                              return e.abrupt(
                                                                "return"
                                                              );
                                                            case 14:
                                                              if (r.id === s) {
                                                                e.next = 16;
                                                                break;
                                                              }
                                                              return e.abrupt(
                                                                "return"
                                                              );
                                                            case 16:
                                                              r.error &&
                                                                o(r.error),
                                                                r.result &&
                                                                  t(r.result);
                                                            case 18:
                                                            case "end":
                                                              return e.stop();
                                                          }
                                                      },
                                                      e,
                                                      null,
                                                      [[0, 9]]
                                                    );
                                                  })
                                                );
                                                return function (t) {
                                                  return e.apply(
                                                    this,
                                                    arguments
                                                  );
                                                };
                                              })()
                                            );
                                        case 5:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, e);
                                })
                              );
                              return function (t, n) {
                                return e.apply(this, arguments);
                              };
                            })()
                          )
                        )
                      );
                    case 9:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function (t, n) {
          return e.apply(this, arguments);
        };
      })()),
      (t.listen = (function () {
        var e = Nl(
          jl().mark(function e() {
            var t,
              n,
              r = this;
            return jl().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (e.next = 2), Vl(this.relay);
                    case 2:
                      return (
                        (t = e.sent),
                        (n = t.sub([
                          {
                            kinds: [24133],
                            "#p": [this.self.pubkey],
                            since: Ml(),
                          },
                        ])).on(
                          "event",
                          (function () {
                            var e = Nl(
                              jl().mark(function e(n) {
                                var o, i, s, a, c;
                                return jl().wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (
                                            (e.prev = 0),
                                            (e.next = 3),
                                            yi.decrypt(
                                              r.self.secret,
                                              n.pubkey,
                                              n.content
                                            )
                                          );
                                        case 3:
                                          if ((i = e.sent)) {
                                            e.next = 6;
                                            break;
                                          }
                                          throw new Error(
                                            "failed to decrypt event"
                                          );
                                        case 6:
                                          (o = JSON.parse(i)), (e.next = 12);
                                          break;
                                        case 9:
                                          return (
                                            (e.prev = 9),
                                            (e.t0 = e.catch(0)),
                                            e.abrupt("return")
                                          );
                                        case 12:
                                          if (Gl(o)) {
                                            e.next = 14;
                                            break;
                                          }
                                          return e.abrupt("return");
                                        case 14:
                                          return (
                                            (e.next = 17), r.handleRequest(o, n)
                                          );
                                        case 17:
                                          return (
                                            (s = e.sent),
                                            (u = s.id),
                                            (l = s.result),
                                            (f = s.error),
                                            (a = JSON.stringify({
                                              id: u,
                                              result: l,
                                              error: f,
                                            })),
                                            (e.next = 21),
                                            zl(r.self.secret, n.pubkey, a)
                                          );
                                        case 21:
                                          (c = e.sent), t.publish(c);
                                        case 23:
                                        case "end":
                                          return e.stop();
                                      }
                                    var u, l, f;
                                  },
                                  e,
                                  null,
                                  [[0, 9]]
                                );
                              })
                            );
                            return function (t) {
                              return e.apply(this, arguments);
                            };
                          })()
                        ),
                        e.abrupt("return", n)
                      );
                    case 6:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              this
            );
          })
        );
        return function () {
          return e.apply(this, arguments);
        };
      })()),
      (t.handleRequest = (function () {
        var e = Nl(
          jl().mark(function e(t, n) {
            var r, o, i, s, a;
            return jl().wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (r = t.id),
                        (o = t.method),
                        (i = t.params),
                        (s = null),
                        (a = null),
                        (e.prev = 3),
                        (this.event = n),
                        (e.next = 7),
                        this[o].apply(this, i)
                      );
                    case 7:
                      (s = e.sent), (this.event = void 0), (e.next = 14);
                      break;
                    case 11:
                      (e.prev = 11),
                        (e.t0 = e.catch(3)),
                        (a =
                          e.t0 instanceof Error
                            ? e.t0.message
                            : "unknown error");
                    case 14:
                      return e.abrupt("return", { id: r, result: s, error: a });
                    case 15:
                    case "end":
                      return e.stop();
                  }
              },
              e,
              this,
              [[3, 11]]
            );
          })
        );
        return function (t, n) {
          return e.apply(this, arguments);
        };
      })()),
      e
    );
  })();
  function Ml() {
    return Math.floor(Date.now() / 1e3);
  }
  function Fl() {
    return Math.random().toString().slice(2);
  }
  function Dl(e, t, n) {
    return JSON.stringify({ id: e, method: t, params: n });
  }
  function zl(e, t, n) {
    return Kl.apply(this, arguments);
  }
  function Kl() {
    return (Kl = Nl(
      jl().mark(function e(t, n, r) {
        var o, i, s, a, c, u, l;
        return jl().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (e.next = 2), yi.encrypt(t, n, r);
              case 2:
                if (
                  ((o = e.sent),
                  (i = {
                    kind: 24133,
                    created_at: Ml(),
                    pubkey: To(t),
                    tags: [["p", n]],
                    content: o,
                  }),
                  (s = qo(i)),
                  (a = zo(i, t)),
                  (c = Hl({}, i, { id: s, sig: a })),
                  (u = Fo(c)),
                  (l = Do(c)),
                  u && l)
                ) {
                  e.next = 11;
                  break;
                }
                throw new Error("Event is not valid");
              case 11:
                return e.abrupt("return", c);
              case 12:
              case "end":
                return e.stop();
            }
        }, e);
      })
    )).apply(this, arguments);
  }
  function Gl(e) {
    if (!e) return !1;
    var t = Object.keys(e);
    return !!(t.includes("id") && t.includes("method") && t.includes("params"));
  }
  function Wl(e) {
    if (!e) return !1;
    var t = Object.keys(e);
    return !!(t.includes("id") && t.includes("result") && t.includes("error"));
  }
  function Vl(e) {
    return Yl.apply(this, arguments);
  }
  function Yl() {
    return (
      (Yl = Nl(
        jl().mark(function e(t) {
          var n;
          return jl().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (n = ei(t)), (e.next = 3), n.connect();
                case 3:
                  return (
                    (e.next = 5),
                    new Promise(function (e, t) {
                      n.on("connect", function () {
                        e();
                      }),
                        n.on("error", function () {
                          t(new Error("not possible to connect to " + n.url));
                        });
                    })
                  );
                case 5:
                  return e.abrupt("return", n);
                case 6:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      )),
      Yl.apply(this, arguments)
    );
  }
  function Zl(e, t, n) {
    return Jl.apply(this, arguments);
  }
  function Jl() {
    return (
      (Jl = Nl(
        jl().mark(function e(t, n, r) {
          return jl().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    void 0 === r && (r = !1),
                    (e.next = 3),
                    new Promise(function (e, o) {
                      t.on("error", function () {
                        o(new Error("failed to connect to " + t.url));
                      });
                      var i = t.publish(n);
                      r && e(),
                        i.on("failed", function (e) {
                          o(e);
                        }),
                        i.on("seen", function () {
                          e();
                        });
                    })
                  );
                case 3:
                  return e.abrupt("return", e.sent);
                case 4:
                case "end":
                  return e.stop();
              }
          }, e);
        })
      )),
      Jl.apply(this, arguments)
    );
  }
  var Ql = (function () {
      function e(e) {
        var t = e.target,
          n = e.metadata,
          r = e.relay;
        (this.target = t), (this.metadata = n), (this.relay = r);
      }
      e.fromURI = function (t) {
        var n = new URL(t),
          r = n.hostname || n.pathname.substring(2);
        if (!r) throw new Error("Invalid connect URI: missing target");
        var o = n.searchParams.get("relay");
        if (!o) throw new Error("Invalid connect URI: missing relay");
        var i = n.searchParams.get("metadata");
        if (!i) throw new Error("Invalid connect URI: missing metadata");
        try {
          return new e({ target: r, metadata: JSON.parse(i), relay: o });
        } catch (e) {
          throw new Error("Invalid connect URI: metadata is not valid JSON");
        }
      };
      var t = e.prototype;
      return (
        (t.toString = function () {
          return (
            "nostrconnect://" +
            this.target +
            "?metadata=" +
            encodeURIComponent(JSON.stringify(this.metadata)) +
            "&relay=" +
            encodeURIComponent(this.relay)
          );
        }),
        (t.approve = (function () {
          var e = Nl(
            jl().mark(function e(t) {
              var n;
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = new ql({ relay: this.relay, secretKey: t })),
                          (e.next = 3),
                          n.call(
                            {
                              target: this.target,
                              request: { method: "connect", params: [To(t)] },
                            },
                            { skipResponse: !0 }
                          )
                        );
                      case 3:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })()),
        (t.reject = (function () {
          var e = Nl(
            jl().mark(function e(t) {
              var n;
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = new ql({ relay: this.relay, secretKey: t })),
                          (e.next = 3),
                          n.call(
                            {
                              target: this.target,
                              request: { method: "disconnect", params: [] },
                            },
                            { skipResponse: !0 }
                          )
                        );
                      case 3:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })()),
        e
      );
    })(),
    Xl = (function () {
      function e(e) {
        var t,
          n,
          r = e.target,
          o = e.relay,
          i = e.secretKey;
        (this.events = new hs()),
          (this.nip04 = {
            encrypt:
              ((n = Nl(
                jl().mark(function e(t, n) {
                  return jl().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          throw new Error("Not implemented");
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              function (e, t) {
                return n.apply(this, arguments);
              }),
            decrypt:
              ((t = Nl(
                jl().mark(function e(t, n) {
                  return jl().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          throw new Error("Not implemented");
                        case 1:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              function (e, n) {
                return t.apply(this, arguments);
              }),
          }),
          (this.rpc = new ql({ relay: o, secretKey: i })),
          r && (this.target = r);
      }
      var t = e.prototype;
      return (
        (t.init = (function () {
          var e = Nl(
            jl().mark(function e() {
              var t = this;
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), this.rpc.listen();
                      case 2:
                        e.sent.on(
                          "event",
                          (function () {
                            var e = Nl(
                              jl().mark(function e(n) {
                                var r, o, i, s;
                                return jl().wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (
                                            (e.prev = 0),
                                            (e.next = 3),
                                            yi.decrypt(
                                              t.rpc.self.secret,
                                              n.pubkey,
                                              n.content
                                            )
                                          );
                                        case 3:
                                          if ((o = e.sent)) {
                                            e.next = 6;
                                            break;
                                          }
                                          throw new Error(
                                            "failed to decrypt event"
                                          );
                                        case 6:
                                          (r = JSON.parse(o)), (e.next = 12);
                                          break;
                                        case 9:
                                          return (
                                            (e.prev = 9),
                                            (e.t0 = e.catch(0)),
                                            e.abrupt("return")
                                          );
                                        case 12:
                                          if (Gl(r)) {
                                            e.next = 14;
                                            break;
                                          }
                                          return e.abrupt("return");
                                        case 14:
                                          (e.t1 = r.method),
                                            (e.next =
                                              "connect" === e.t1
                                                ? 17
                                                : "disconnect" === e.t1
                                                ? 23
                                                : 26);
                                          break;
                                        case 17:
                                          if (
                                            r.params &&
                                            1 === r.params.length
                                          ) {
                                            e.next = 19;
                                            break;
                                          }
                                          throw new Error(
                                            "connect: missing pubkey"
                                          );
                                        case 19:
                                          return (
                                            (i = r.params),
                                            (s = i[0]),
                                            (t.target = s),
                                            t.events.emit("connect", s),
                                            e.abrupt("break", 26)
                                          );
                                        case 23:
                                          return (
                                            (t.target = void 0),
                                            t.events.emit("disconnect"),
                                            e.abrupt("break", 26)
                                          );
                                        case 26:
                                        case "end":
                                          return e.stop();
                                      }
                                  },
                                  e,
                                  null,
                                  [[0, 9]]
                                );
                              })
                            );
                            return function (t) {
                              return e.apply(this, arguments);
                            };
                          })()
                        );
                      case 4:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })()),
        (t.on = function (e, t) {
          this.events.on(e, t);
        }),
        (t.off = function (e, t) {
          this.events.off(e, t);
        }),
        (t.disconnect = (function () {
          var e = Nl(
            jl().mark(function e() {
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (this.target) {
                          e.next = 2;
                          break;
                        }
                        throw new Error("Not connected");
                      case 2:
                        return (
                          this.events.emit("disconnect"),
                          (e.prev = 3),
                          (e.next = 6),
                          this.rpc.call(
                            {
                              target: this.target,
                              request: { method: "disconnect", params: [] },
                            },
                            { skipResponse: !0 }
                          )
                        );
                      case 6:
                        e.next = 11;
                        break;
                      case 8:
                        throw (
                          ((e.prev = 8),
                          (e.t0 = e.catch(3)),
                          new Error("Failed to disconnect"))
                        );
                      case 11:
                        this.target = void 0;
                      case 12:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this,
                [[3, 8]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })()),
        (t.getPublicKey = (function () {
          var e = Nl(
            jl().mark(function e() {
              var t;
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (this.target) {
                          e.next = 2;
                          break;
                        }
                        throw new Error("Not connected");
                      case 2:
                        return (
                          (e.next = 4),
                          this.rpc.call({
                            target: this.target,
                            request: { method: "get_public_key", params: [] },
                          })
                        );
                      case 4:
                        return (t = e.sent), e.abrupt("return", t);
                      case 6:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })()),
        (t.signEvent = (function () {
          var e = Nl(
            jl().mark(function e(t) {
              var n;
              return jl().wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (this.target) {
                          e.next = 2;
                          break;
                        }
                        throw new Error("Not connected");
                      case 2:
                        return (
                          (e.next = 4),
                          this.rpc.call({
                            target: this.target,
                            request: { method: "sign_event", params: [t] },
                          })
                        );
                      case 4:
                        return (n = e.sent), e.abrupt("return", n);
                      case 6:
                      case "end":
                        return e.stop();
                    }
                },
                e,
                this
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })()),
        (t.getRelays = (function () {
          var e = Nl(
            jl().mark(function e() {
              return jl().wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      throw new Error("Not implemented");
                    case 1:
                    case "end":
                      return e.stop();
                  }
              }, e);
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })()),
        e
      );
    })();
  class ef extends Rl {
    #w = null;
    constructor(e, t, n = {}) {
      super(e, n), (this.#w = t);
    }
    async signEvent(e) {
      const t = new Xl({ secretKey: this.#w, target: this.pubkey });
      return await t.init(), (e.sig = await t.signEvent("12323423434")), e;
    }
  }
  class tf extends Rl {
    #v;
    constructor(e = {}) {
      let t = localStorage.getItem("nostrichat-discardable-key"),
        n = localStorage.getItem("nostrichat-discardable-public-key");
      t || ((t = Io()), console.log("generated key", t), (n = To(t))),
        localStorage.setItem("nostrichat-discardable-key", t),
        localStorage.setItem("nostrichat-discardable-public-key", n),
        super(n, e),
        (this.#v = t),
        console.log(t);
    }
    async signEvent(e) {
      return (e.sig = await zo(e, this.#v)), e;
    }
    async encrypt(e, t) {
      return console.log(this.#v), await yi.encrypt(this.#v, e, t);
    }
    async decrypt(e, t) {
      return await yi.decrypt(this.#v, e, t);
    }
  }
  function nf(t) {
    let n,
      o,
      i,
      s,
      a,
      c,
      u,
      l = (function (t) {
        let n, r, o;
        return {
          c() {
            (n = v("button")),
              (n.textContent = "Browser Extension (NIP-07)"),
              S(
                n,
                "class",
                "bg-purple-900 hover:bg-purple-700 w-full p-4 rounded-xl text-center font-regular text-gray-200  svelte-1byyxb6"
              );
          },
          m(e, i) {
            b(e, n, i), r || ((o = E(n, "click", k(t[1]))), (r = !0));
          },
          p: e,
          d(e) {
            e && g(n), (r = !1), o();
          },
        };
      })(t);
    return {
      c() {
        (n = v("div")),
          l && l.c(),
          (o = _()),
          (i = v("button")),
          (i.textContent = "Nostr Connect (NIP-46)"),
          (s = _()),
          (a = v("button")),
          (a.innerHTML =
            'Anonymous\n            <span class="text-xs text-gray-300 svelte-1byyxb6">(Ephemeral Keys)</span>'),
          S(
            i,
            "class",
            "bg-purple-900 hover:bg-purple-700 w-full p-4 rounded-xl text-center font-regular text-gray-200  svelte-1byyxb6"
          ),
          S(
            a,
            "class",
            "bg-purple-900 hover:bg-purple-700 w-full p-4 rounded-xl text-center font-regular text-gray-200  svelte-1byyxb6"
          ),
          S(n, "class", "flex flex-col gap-1 svelte-1byyxb6");
      },
      m(e, r) {
        b(e, n, r),
          l && l.m(n, null),
          y(n, o),
          y(n, i),
          y(n, s),
          y(n, a),
          c ||
            ((u = [E(i, "click", k(t[3])), E(a, "click", k(t[2]))]), (c = !0));
      },
      p(e, t) {},
      d(e) {
        e && g(n), l && l.d(), (c = !1), r(u);
      },
    };
  }
  function rf(t) {
    let n, o, i, s, a, c, u;
    return {
      c() {
        (n = v("p")),
          (n.textContent =
            "Scan this with your Nostr Connect (click to copy to clipboard)"),
          (o = _()),
          (i = v("div")),
          (s = _()),
          (a = v("button")),
          (a.textContent = "Cancel"),
          S(n, "class", "text-gray-600 mb-3 svelte-1byyxb6"),
          S(i, "class", "bg-white w-full p-3 svelte-1byyxb6"),
          S(
            a,
            "class",
            "bg-purple-900 hover:bg-purple-700 w-full p-2 rounded-xl text-center font-regular text-white  svelte-1byyxb6"
          );
      },
      m(e, r) {
        b(e, n, r),
          b(e, o, r),
          b(e, i, r),
          b(e, s, r),
          b(e, a, r),
          c ||
            ((u = [E(i, "click", k(t[4])), E(a, "click", k(t[8]))]), (c = !0));
      },
      p: e,
      d(e) {
        e && g(n), e && g(o), e && g(i), e && g(s), e && g(a), (c = !1), r(u);
      },
    };
  }
  function of(t) {
    let n, r, o, i;
    function s(e, t) {
      return e[0] ? rf : nf;
    }
    let a = s(t),
      c = a && a(t);
    return {
      c() {
        (n = v("h1")),
          (n.textContent = "How would you like to connect?"),
          (r = _()),
          (o = _()),
          c && c.c(),
          (i = x()),
          S(n, "class", "font-bold text-xl mb-3 svelte-1byyxb6");
      },
      m(e, t) {
        b(e, n, t), b(e, r, t), b(e, o, t), c && c.m(e, t), b(e, i, t);
      },
      p(e, [t]) {
        a === (a = s(e)) && c
          ? c.p(e, t)
          : (c && c.d(1), (c = a && a(e)), c && (c.c(), c.m(i.parentNode, i)));
      },
      i: e,
      o: e,
      d(e) {
        e && g(n), e && g(r), e && g(o), c && c.d(e), e && g(i);
      },
    };
  }
  function sf(e, t, n) {
    let r,
      o,
      { websiteOwnerPubkey: i } = t,
      { chatConfiguration: s } = t,
      { relays: a } = t;
    function c() {
      window.nostr.getPublicKey().then((e) => {
        localStorage.setItem("nostrichat-type", "nip07"), ie.set(new $l(e, o));
      });
    }
    async function u() {
      let e = localStorage.getItem("nostrichat-nostr-connect-key"),
        t = localStorage.getItem("nostrichat-nostr-connect-public-key");
      if (e) return void ie.set(new ef(t, e, o));
      e = Io();
      const i = new Xl({ secretKey: e, relay: "wss://nostr.vulpem.com" });
      let s, a, c;
      i.events.on("connect", (o) => {
        localStorage.setItem("nostrichat-nostr-connect-key", e),
          localStorage.setItem("nostrichat-nostr-connect-public-key", o),
          localStorage.setItem("nostrichat-type", "nip-46"),
          console.log("connected to nostr connect relay"),
          (t = o),
          ie.set(new ef(t, e)),
          n(0, (r = null));
      }),
        i.events.on("disconnect", () => {
          console.log("disconnected from nostr connect relay");
        }),
        await i.init();
      try {
        (s = window.document.title || "Nostrichat"),
          (a = new URL(window.location.href)),
          (c = a.hostname);
      } catch (e) {
        (a = window.location.href), (c = a);
      }
      const u = new Ql({
        target: To(e),
        relay: "wss://nostr.vulpem.com",
        metadata: { name: s, description: "🔉🔉🔉", url: a },
      });
      n(0, (r = u.toString()));
    }
    T(() => {
      const e = localStorage.getItem("nostrichat-type");
      "nip07" === e ? c() : "nip-46" === e && u(),
        (o = {
          type: s.chatType,
          tags: s.chatTags,
          referenceTags: s.chatReferenceTags,
          websiteOwnerPubkey: i,
          relays: a,
        });
    });
    return (
      (e.$$set = (e) => {
        "websiteOwnerPubkey" in e && n(5, (i = e.websiteOwnerPubkey)),
          "chatConfiguration" in e && n(6, (s = e.chatConfiguration)),
          "relays" in e && n(7, (a = e.relays));
      }),
      [
        r,
        c,
        async function () {
          ie.set(new tf(o));
        },
        u,
        function () {
          navigator.clipboard.writeText(r);
        },
        i,
        s,
        a,
        () => {
          n(0, (r = null));
        },
      ]
    );
  }
  class af extends ne {
    constructor(e) {
      super(),
        te(this, e, sf, of, i, {
          websiteOwnerPubkey: 5,
          chatConfiguration: 6,
          relays: 7,
        });
    }
  }
  var cf,
    uf = {},
    lf = {},
    ff = {},
    hf =
      (Bn && Bn.__extends) ||
      ((cf = function (e, t) {
        return (
          (cf =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (e, t) {
                e.__proto__ = t;
              }) ||
            function (e, t) {
              for (var n in t)
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }),
          cf(e, t)
        );
      }),
      function (e, t) {
        if ("function" != typeof t && null !== t)
          throw new TypeError(
            "Class extends value " + String(t) + " is not a constructor or null"
          );
        function n() {
          this.constructor = e;
        }
        cf(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((n.prototype = t.prototype), new n()));
      });
  function df(e, t, n) {
    if ((Object.setPrototypeOf(e, n.prototype), t === n))
      if (((e.name = t.name), Error.captureStackTrace))
        Error.captureStackTrace(e, n);
      else {
        var r = new Error(e.message).stack;
        r &&
          (e.stack = (function (e, t) {
            if (!e) return e;
            if (!t) return e;
            var n = new RegExp("\\s+at\\s".concat(t, "\\s")),
              r = e.split("\n");
            return r
              .filter(function (e) {
                return !e.match(n);
              })
              .join("\n");
          })(r, "new ".concat(t.name)));
      }
  }
  Object.defineProperty(ff, "__esModule", { value: !0 }),
    (ff.InternalError =
      ff.InvalidDataError =
      ff.RoutingError =
      ff.UnsupportedMethodError =
      ff.ConnectionError =
      ff.RejectionError =
      ff.MissingProviderError =
        void 0);
  var pf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.MissingProviderError = pf;
  var yf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.RejectionError = yf;
  var bf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.ConnectionError = bf;
  var gf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.UnsupportedMethodError = gf;
  var wf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.RoutingError = wf;
  var vf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  ff.InvalidDataError = vf;
  var mf = (function (e) {
    function t(n) {
      var r = this.constructor,
        o = e.call(this, n) || this;
      return df(o, r, t), o;
    }
    return hf(t, e), t;
  })(Error);
  (ff.InternalError = mf),
    Object.defineProperty(lf, "__esModule", { value: !0 }),
    (lf.requestProvider = void 0);
  var _f = ff;
  lf.requestProvider = function (e) {
    return new Promise(function (e, t) {
      if ("undefined" == typeof window)
        return t(new Error("Must be called in a browser context"));
      var n = window.webln;
      if (!n)
        return t(
          new _f.MissingProviderError("Your browser has no WebLN provider")
        );
      n.enable()
        .then(function () {
          return e(n);
        })
        .catch(function (e) {
          return t(e);
        });
    });
  };
  var xf,
    Ef,
    kf,
    Sf = {};
  function Af(e) {
    let t,
      n,
      r = (e[2] || e[1]) + "";
    return {
      c() {
        (t = v("span")),
          (n = m(r)),
          S(t, "class", "text-base text-white flex flex-col items-center");
      },
      m(e, r) {
        b(e, t, r), y(t, n);
      },
      p(e, t) {
        6 & t && r !== (r = (e[2] || e[1]) + "") && A(n, r);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Of(e) {
    let t, n;
    return {
      c() {
        (t = v("span")), (n = m(e[0])), S(t, "class", "text-xl");
      },
      m(e, r) {
        b(e, t, r), y(t, n);
      },
      p(e, t) {
        1 & t && A(n, e[0]);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Cf(t) {
    let n, o, i;
    function s(e, t) {
      return e[3] ? Af : Of;
    }
    let a = s(t),
      c = a(t);
    return {
      c() {
        (n = v("div")), c.c();
      },
      m(e, r) {
        b(e, n, r),
          c.m(n, null),
          o ||
            ((i = [
              E(n, "mouseenter", t[7]),
              E(n, "mouseleave", t[8]),
              E(n, "click", k(t[4])),
            ]),
            (o = !0));
      },
      p(e, [t]) {
        a === (a = s(e)) && c
          ? c.p(e, t)
          : (c.d(1), (c = a(e)), c && (c.c(), c.m(n, null)));
      },
      i: e,
      o: e,
      d(e) {
        e && g(n), c.d(), (o = !1), r(i);
      },
    };
  }
  function Pf(e, t, n) {
    let r;
    c(e, ce, (e) => n(9, (r = e)));
    let { icon: o, amount: i, amountDisplay: s, event: a, mobilePR: l } = t,
      f = !1;
    return (
      (e.$$set = (e) => {
        "icon" in e && n(0, (o = e.icon)),
          "amount" in e && n(1, (i = e.amount)),
          "amountDisplay" in e && n(2, (s = e.amountDisplay)),
          "event" in e && n(6, (a = e.event)),
          "mobilePR" in e && n(5, (l = e.mobilePR));
      }),
      [
        o,
        i,
        s,
        f,
        async function () {
          const e = new (class {
              _userPromise;
              constructor() {
                if (!window.nostr)
                  throw new Error("NIP-07 extension not available");
              }
              async blockUntilReady() {
                const e = await window.nostr?.getPublicKey();
                if (!e) throw new Error("User rejected access");
                return new ml({ hexpubkey: e });
              }
              async user() {
                return (
                  this._userPromise ||
                    (this._userPromise = this.blockUntilReady()),
                  this._userPromise
                );
              }
              async sign(e) {
                if (!window.nostr)
                  throw new Error("NIP-07 extension not available");
                return (await window.nostr.signEvent(e)).sig;
              }
              async encrypt(e, t) {
                if (!window.nostr)
                  throw new Error("NIP-07 extension not available");
                const n = e.hexpubkey();
                return window.nostr.nip04.encrypt(n, t);
              }
              async decrypt(e, t) {
                if (!window.nostr)
                  throw new Error("NIP-07 extension not available");
                const n = e.hexpubkey();
                return window.nostr.nip04.decrypt(n, t);
              }
            })(),
            t = new Tl({
              explicitRelayUrls: [
                "wss://nos.lol",
                "wss://relay.nostr.band",
                "wss://relay.damus.io",
                "wss://nostr.mom",
                "wss://no.str.cr",
              ],
            });
          let o, s;
          (t.signer = e), await t.connect();
          try {
            const e = new kl(t, a);
            o = await e.zap(1e3 * i);
          } catch (e) {
            return void alert(e);
          }
          try {
            s = await uf.requestProvider();
          } catch (e) {
            return void n(5, (l = o));
          }
          try {
            await s.sendPayment(o), u(ce, (r = null), r);
          } catch (e) {
            n(5, (l = o));
          }
        },
        l,
        a,
        () => n(3, (f = !0)),
        () => n(3, (f = !1)),
      ]
    );
  }
  Object.defineProperty(Sf, "__esModule", { value: !0 }),
    (xf = uf),
    (Ef =
      (Bn && Bn.__createBinding) ||
      (Object.create
        ? function (e, t, n, r) {
            void 0 === r && (r = n);
            var o = Object.getOwnPropertyDescriptor(t, n);
            (o &&
              !("get" in o ? !t.__esModule : o.writable || o.configurable)) ||
              (o = {
                enumerable: !0,
                get: function () {
                  return t[n];
                },
              }),
              Object.defineProperty(e, r, o);
          }
        : function (e, t, n, r) {
            void 0 === r && (r = n), (e[r] = t[n]);
          })),
    (kf =
      (Bn && Bn.__exportStar) ||
      function (e, t) {
        for (var n in e)
          "default" === n ||
            Object.prototype.hasOwnProperty.call(t, n) ||
            Ef(t, e, n);
      }),
    Object.defineProperty(xf, "__esModule", { value: !0 }),
    kf(lf, xf),
    kf(Sf, xf),
    kf(ff, xf);
  class If extends ne {
    constructor(e) {
      super(),
        te(this, e, Pf, Cf, i, {
          icon: 0,
          amount: 1,
          amountDisplay: 2,
          event: 6,
          mobilePR: 5,
        });
    }
  }
  function Tf(e, t, n) {
    const r = e.slice();
    return (r[32] = t[n]), r;
  }
  function Lf(t) {
    let n;
    return {
      c() {
        n = m("⚡️");
      },
      m(e, t) {
        b(e, n, t);
      },
      p: e,
      d(e) {
        e && g(n);
      },
    };
  }
  function Bf(e) {
    let t,
      n,
      r,
      o,
      i = e[9] / 1e3 + "";
    return {
      c() {
        (t = v("p")),
          (n = m("⚡️\n                        ")),
          (r = v("span")),
          (o = m(i)),
          S(r, "class", "text-orange-500 font-semibold svelte-1byyxb6"),
          S(t, "class", "flex flex-col items-center my-4 svelte-1byyxb6");
      },
      m(e, i) {
        b(e, t, i), y(t, n), y(t, r), y(r, o);
      },
      p(e, t) {
        512 & t[0] && i !== (i = e[9] / 1e3 + "") && A(o, i);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Rf(e) {
    let t, n, r, o;
    const i = [jf, $f],
      s = [];
    function a(e, t) {
      return e[8] ? 0 : 1;
    }
    return (
      (t = a(e)),
      (n = s[t] = i[t](e)),
      {
        c() {
          n.c(), (r = x());
        },
        m(e, n) {
          s[t].m(e, n), b(e, r, n), (o = !0);
        },
        p(e, o) {
          let c = t;
          (t = a(e)),
            t === c
              ? s[t].p(e, o)
              : (G(),
                Y(s[c], 1, 1, () => {
                  s[c] = null;
                }),
                W(),
                (n = s[t]),
                n ? n.p(e, o) : ((n = s[t] = i[t](e)), n.c()),
                V(n, 1),
                n.m(r.parentNode, r));
        },
        i(e) {
          o || (V(n), (o = !0));
        },
        o(e) {
          Y(n), (o = !1);
        },
        d(e) {
          s[t].d(e), e && g(r);
        },
      }
    );
  }
  function $f(e) {
    let t,
      n,
      r,
      o,
      i,
      s,
      a,
      c,
      u,
      l,
      f,
      h,
      d,
      p,
      w,
      m,
      x,
      E,
      k,
      A,
      O,
      C,
      P,
      I,
      T;
    function L(t) {
      e[20](t);
    }
    let R = { icon: "👍", amount: 500, event: e[0] };
    function $(t) {
      e[21](t);
    }
    void 0 !== e[8] && (R.mobilePR = e[8]),
      (r = new If({ props: R })),
      B.push(() => Z(r, "mobilePR", L));
    let j = { icon: "🤙", amount: 2500, amountDisplay: "2.5k", event: e[0] };
    function U(t) {
      e[22](t);
    }
    void 0 !== e[8] && (j.mobilePR = e[8]),
      (a = new If({ props: j })),
      B.push(() => Z(a, "mobilePR", $));
    let N = { icon: "🙌", amount: 5e3, amountDisplay: "5k", event: e[0] };
    function q(t) {
      e[23](t);
    }
    void 0 !== e[8] && (N.mobilePR = e[8]),
      (f = new If({ props: N })),
      B.push(() => Z(f, "mobilePR", U));
    let M = { icon: "🧡", amount: 1e4, amountDisplay: "10k", event: e[0] };
    function F(t) {
      e[24](t);
    }
    void 0 !== e[8] && (M.mobilePR = e[8]),
      (w = new If({ props: M })),
      B.push(() => Z(w, "mobilePR", q));
    let D = { icon: "🤯", amount: 1e5, amountDisplay: "100k", event: e[0] };
    function z(t) {
      e[25](t);
    }
    void 0 !== e[8] && (D.mobilePR = e[8]),
      (k = new If({ props: D })),
      B.push(() => Z(k, "mobilePR", F));
    let K = { icon: "😎", amount: 1e6, amountDisplay: "1M", event: e[0] };
    return (
      void 0 !== e[8] && (K.mobilePR = e[8]),
      (P = new If({ props: K })),
      B.push(() => Z(P, "mobilePR", z)),
      {
        c() {
          (t = v("div")),
            (n = v("div")),
            J(r.$$.fragment),
            (i = _()),
            (s = v("div")),
            J(a.$$.fragment),
            (u = _()),
            (l = v("div")),
            J(f.$$.fragment),
            (d = _()),
            (p = v("div")),
            J(w.$$.fragment),
            (x = _()),
            (E = v("div")),
            J(k.$$.fragment),
            (O = _()),
            (C = v("div")),
            J(P.$$.fragment),
            S(
              n,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              s,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              l,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              p,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              E,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              C,
              "class",
              "flex flex-col hover:bg-orange-500 text-white rounded-full w-12 h-12 items-center justify-center cursor-pointer svelte-1byyxb6"
            ),
            S(
              t,
              "class",
              "flex flex-row items-stretch justify-between w-full svelte-1byyxb6"
            );
        },
        m(e, o) {
          b(e, t, o),
            y(t, n),
            Q(r, n, null),
            y(t, i),
            y(t, s),
            Q(a, s, null),
            y(t, u),
            y(t, l),
            Q(f, l, null),
            y(t, d),
            y(t, p),
            Q(w, p, null),
            y(t, x),
            y(t, E),
            Q(k, E, null),
            y(t, O),
            y(t, C),
            Q(P, C, null),
            (T = !0);
        },
        p(e, t) {
          const n = {};
          1 & t[0] && (n.event = e[0]),
            !o &&
              256 & t[0] &&
              ((o = !0), (n.mobilePR = e[8]), H(() => (o = !1))),
            r.$set(n);
          const i = {};
          1 & t[0] && (i.event = e[0]),
            !c &&
              256 & t[0] &&
              ((c = !0), (i.mobilePR = e[8]), H(() => (c = !1))),
            a.$set(i);
          const s = {};
          1 & t[0] && (s.event = e[0]),
            !h &&
              256 & t[0] &&
              ((h = !0), (s.mobilePR = e[8]), H(() => (h = !1))),
            f.$set(s);
          const u = {};
          1 & t[0] && (u.event = e[0]),
            !m &&
              256 & t[0] &&
              ((m = !0), (u.mobilePR = e[8]), H(() => (m = !1))),
            w.$set(u);
          const l = {};
          1 & t[0] && (l.event = e[0]),
            !A &&
              256 & t[0] &&
              ((A = !0), (l.mobilePR = e[8]), H(() => (A = !1))),
            k.$set(l);
          const d = {};
          1 & t[0] && (d.event = e[0]),
            !I &&
              256 & t[0] &&
              ((I = !0), (d.mobilePR = e[8]), H(() => (I = !1))),
            P.$set(d);
        },
        i(e) {
          T ||
            (V(r.$$.fragment, e),
            V(a.$$.fragment, e),
            V(f.$$.fragment, e),
            V(w.$$.fragment, e),
            V(k.$$.fragment, e),
            V(P.$$.fragment, e),
            (T = !0));
        },
        o(e) {
          Y(r.$$.fragment, e),
            Y(a.$$.fragment, e),
            Y(f.$$.fragment, e),
            Y(w.$$.fragment, e),
            Y(k.$$.fragment, e),
            Y(P.$$.fragment, e),
            (T = !1);
        },
        d(e) {
          e && g(t), X(r), X(a), X(f), X(w), X(k), X(P);
        },
      }
    );
  }
  function jf(t) {
    let n, r, o, i, s, a, c, u;
    return {
      c() {
        (n = v("div")),
          (r = v("a")),
          (o = m("Open in wallet")),
          (s = _()),
          (a = v("button")),
          (a.textContent = "Cancel"),
          S(r, "href", (i = `lightning:${t[8]}`)),
          S(
            r,
            "class",
            "text-center w-full p-3 bg-black text-white rounded-t-xl svelte-1byyxb6"
          ),
          S(a, "class", "bg-white rounder-b-xl p-3 svelte-1byyxb6"),
          S(n, "class", "flex flex-col gap-3 w-full svelte-1byyxb6");
      },
      m(e, i) {
        b(e, n, i),
          y(n, r),
          y(r, o),
          y(n, s),
          y(n, a),
          c || ((u = E(a, "click", t[19])), (c = !0));
      },
      p(e, t) {
        256 & t[0] && i !== (i = `lightning:${e[8]}`) && S(r, "href", i);
      },
      i: e,
      o: e,
      d(e) {
        e && g(n), (c = !1), u();
      },
    };
  }
  function Uf(e) {
    let t, n;
    return {
      c() {
        (t = v("div")),
          (n = m(e[10])),
          S(t, "class", "text-xs text-gray-400 svelte-1byyxb6");
      },
      m(e, r) {
        b(e, t, r), y(t, n);
      },
      p(e, t) {
        1024 & t[0] && A(n, e[10]);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Nf(t) {
    let n;
    return {
      c() {
        (n = v("div")),
          (n.textContent = "Website owner"),
          S(n, "class", "text-purple-500 text-xs svelte-1byyxb6");
      },
      m(e, t) {
        b(e, n, t);
      },
      p: e,
      d(e) {
        e && g(n);
      },
    };
  }
  function Hf(e) {
    let t,
      n,
      r = e[1][e[0].id],
      o = [];
    for (let t = 0; t < r.length; t += 1) o[t] = qf(Tf(e, r, t));
    const i = (e) =>
      Y(o[e], 1, 1, () => {
        o[e] = null;
      });
    return {
      c() {
        t = v("div");
        for (let e = 0; e < o.length; e += 1) o[e].c();
        S(
          t,
          "class",
          "pl-5 border-l border-l-gray-400 flex flex-col gap-4 svelte-1byyxb6"
        );
      },
      m(e, r) {
        b(e, t, r);
        for (let e = 0; e < o.length; e += 1) o[e] && o[e].m(t, null);
        n = !0;
      },
      p(e, n) {
        if (7 & n[0]) {
          let s;
          for (r = e[1][e[0].id], s = 0; s < r.length; s += 1) {
            const i = Tf(e, r, s);
            o[s]
              ? (o[s].p(i, n), V(o[s], 1))
              : ((o[s] = qf(i)), o[s].c(), V(o[s], 1), o[s].m(t, null));
          }
          for (G(), s = r.length; s < o.length; s += 1) i(s);
          W();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < r.length; e += 1) V(o[e]);
          n = !0;
        }
      },
      o(e) {
        o = o.filter(Boolean);
        for (let e = 0; e < o.length; e += 1) Y(o[e]);
        n = !1;
      },
      d(e) {
        e && g(t), w(o, e);
      },
    };
  }
  function qf(e) {
    let t, n;
    return (
      (t = new Df({
        props: { websiteOwnerPubkey: e[2], event: e[32], responses: e[1] },
      })),
      {
        c() {
          J(t.$$.fragment);
        },
        m(e, r) {
          Q(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          4 & n[0] && (r.websiteOwnerPubkey = e[2]),
            3 & n[0] && (r.event = e[32]),
            2 & n[0] && (r.responses = e[1]),
            t.$set(r);
        },
        i(e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Y(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          X(t, e);
        },
      }
    );
  }
  function Mf(e) {
    let t,
      n,
      o,
      i,
      s,
      c,
      u,
      l,
      f,
      h,
      d,
      p,
      w,
      O,
      C,
      P,
      I,
      T,
      L,
      B,
      R,
      $,
      j,
      U,
      N,
      H,
      q,
      M,
      F,
      D,
      z = e[0].content + "";
    function K(e, t) {
      return e[9] > 0 ? Bf : Lf;
    }
    let Z = K(e),
      J = Z(e),
      Q = e[6] && Rf(e);
    let X = (function (e, t) {
        return e[13] ? Nf : Uf;
      })(e),
      ee = X(e),
      te = e[1][e[0].id].length > 0 && Hf(e);
    return {
      c() {
        (t = v("div")),
          (n = v("div")),
          (o = v("div")),
          (i = v("a")),
          (s = v("img")),
          (l = _()),
          (f = v("button")),
          J.c(),
          (d = _()),
          (p = v("div")),
          Q && Q.c(),
          (O = _()),
          (C = v("div")),
          (P = v("div")),
          (I = _()),
          (T = v("div")),
          (L = m(z)),
          (R = _()),
          ($ = v("div")),
          (j = v("div")),
          (U = v("span")),
          (U.textContent = `${e[14].toLocaleString()}`),
          (N = _()),
          ee.c(),
          (H = _()),
          te && te.c(),
          (q = x()),
          a(s.src, (c = e[4])) || S(s, "src", c),
          S(
            s,
            "class",
            "block w-8 h-8 rounded-full " +
              (e[13] ? "ring-purple-700 ring-4" : "") +
              " svelte-1byyxb6"
          ),
          S(s, "alt", ""),
          S(i, "href", (u = `nostr:${e[5]}`)),
          S(i, "class", "svelte-1byyxb6"),
          S(
            f,
            "class",
            (h =
              "rounded-full " +
              (e[9] > 0
                ? "opacity-100 text-base"
                : "bg-orange-500 opacity-10 text-xl") +
              " w-8 h-8 flex items-center justify-center hover:opacity-100 svelte-1byyxb6")
          ),
          S(
            p,
            "class",
            (w =
              (e[6]
                ? "w-full rounded-full bg-white  drop-shadow-xl justify-between border-2 border-gray-200"
                : " rounded-full w-8 h-8 justify-center") +
              " flex items-center absolute ml-5 mt-10 z-10 svelte-1byyxb6")
          ),
          S(o, "class", "min-w-fit flex flex-col gap-2 svelte-1byyxb6"),
          S(
            P,
            "class",
            "flex flex-row justify-between text-center overflow-clip text-clip w-full svelte-1byyxb6"
          ),
          S(
            T,
            "class",
            (B =
              "max-h-64 text-base cursor-pointer border border-slate-200 " +
              (e[11] === e[0].id
                ? "bg-purple-700 text-white"
                : "bg-white text-gray-900 hover:bg-slate-100") +
              " p-4 py-2 overflow-auto rounded-2xl shadow-sm svelte-1byyxb6")
          ),
          S(U, "class", "py-2 svelte-1byyxb6"),
          S(
            j,
            "class",
            "text-xs text-gray-400 text-ellipsis overflow-clip whitespace-nowrap svelte-1byyxb6"
          ),
          S(
            $,
            "class",
            "flex flex-row-reverse justify-between mt-1 overflow-clip items-center relative svelte-1byyxb6"
          ),
          S(C, "class", "w-full overflow-hidden svelte-1byyxb6"),
          S(n, "class", "flex flex-row gap-3 svelte-1byyxb6"),
          S(
            t,
            "class",
            "flex flex-col gap-4 p-2-lg mb-3 text-wrap relative  svelte-1byyxb6"
          );
      },
      m(r, a) {
        b(r, t, a),
          y(t, n),
          y(n, o),
          y(o, i),
          y(i, s),
          y(o, l),
          y(o, f),
          J.m(f, null),
          y(o, d),
          y(o, p),
          Q && Q.m(p, null),
          y(n, O),
          y(n, C),
          y(C, P),
          y(C, I),
          y(C, T),
          y(T, L),
          y(C, R),
          y(C, $),
          y($, j),
          y(j, U),
          y($, N),
          ee.m($, null),
          b(r, H, a),
          te && te.m(r, a),
          b(r, q, a),
          (M = !0),
          F ||
            ((D = [
              E(f, "click", k(e[18])),
              E(T, "click", k(e[26])),
              E(T, "keydown", k(e[27])),
              E(T, "keyup", k(e[28])),
              E(t, "mouseenter", e[29]),
              E(t, "mouseleave", e[30]),
            ]),
            (F = !0));
      },
      p(e, t) {
        (!M || (16 & t[0] && !a(s.src, (c = e[4])))) && S(s, "src", c),
          (!M || (32 & t[0] && u !== (u = `nostr:${e[5]}`))) && S(i, "href", u),
          Z === (Z = K(e)) && J
            ? J.p(e, t)
            : (J.d(1), (J = Z(e)), J && (J.c(), J.m(f, null))),
          (!M ||
            (512 & t[0] &&
              h !==
                (h =
                  "rounded-full " +
                  (e[9] > 0
                    ? "opacity-100 text-base"
                    : "bg-orange-500 opacity-10 text-xl") +
                  " w-8 h-8 flex items-center justify-center hover:opacity-100 svelte-1byyxb6"))) &&
            S(f, "class", h),
          e[6]
            ? Q
              ? (Q.p(e, t), 64 & t[0] && V(Q, 1))
              : ((Q = Rf(e)), Q.c(), V(Q, 1), Q.m(p, null))
            : Q &&
              (G(),
              Y(Q, 1, 1, () => {
                Q = null;
              }),
              W()),
          (!M ||
            (64 & t[0] &&
              w !==
                (w =
                  (e[6]
                    ? "w-full rounded-full bg-white  drop-shadow-xl justify-between border-2 border-gray-200"
                    : " rounded-full w-8 h-8 justify-center") +
                  " flex items-center absolute ml-5 mt-10 z-10 svelte-1byyxb6"))) &&
            S(p, "class", w),
          (!M || 1 & t[0]) && z !== (z = e[0].content + "") && A(L, z),
          (!M ||
            (2049 & t[0] &&
              B !==
                (B =
                  "max-h-64 text-base cursor-pointer border border-slate-200 " +
                  (e[11] === e[0].id
                    ? "bg-purple-700 text-white"
                    : "bg-white text-gray-900 hover:bg-slate-100") +
                  " p-4 py-2 overflow-auto rounded-2xl shadow-sm svelte-1byyxb6"))) &&
            S(T, "class", B),
          ee.p(e, t),
          e[1][e[0].id].length > 0
            ? te
              ? (te.p(e, t), 3 & t[0] && V(te, 1))
              : ((te = Hf(e)), te.c(), V(te, 1), te.m(q.parentNode, q))
            : te &&
              (G(),
              Y(te, 1, 1, () => {
                te = null;
              }),
              W());
      },
      i(e) {
        M || (V(Q), V(te), (M = !0));
      },
      o(e) {
        Y(Q), Y(te), (M = !1);
      },
      d(e) {
        e && g(t),
          J.d(),
          Q && Q.d(),
          ee.d(),
          e && g(H),
          te && te.d(e),
          e && g(q),
          (F = !1),
          r(D);
      },
    };
  }
  function Ff(e, t, n) {
    let r, o, i, s, a, l;
    c(e, ue, (e) => n(16, (o = e))),
      c(e, ie, (e) => n(31, (i = e))),
      c(e, ce, (e) => n(3, (s = e))),
      c(e, se, (e) => n(17, (a = e))),
      c(e, ae, (e) => n(11, (l = e)));
    let f,
      h,
      d,
      p,
      y,
      { event: b } = t,
      { responses: g } = t,
      { websiteOwnerPubkey: w } = t,
      v = {},
      m = 0;
    function _() {
      l === b.id ? u(ae, (l = null), l) : u(ae, (l = b.id), l);
    }
    T(() => {
      i.delayedSubscribe(
        { kinds: [1, 42, 9735], "#e": [b.id] },
        "responses",
        500
      );
    });
    const x = !!w === b.pubkey;
    var E;
    i.on("zap", () => {
      n(9, (m = o[b.id]?.reduce((e, t) => e + t.amount, 0) || 0));
    }),
      (E = () => {
        n(9, (m = o[b.id]?.reduce((e, t) => e + t.amount, 0) || 0));
      }),
      I().$$.after_update.push(E);
    let k = new Date(1e3 * b.created_at);
    return (
      (e.$$set = (e) => {
        "event" in e && n(0, (b = e.event)),
          "responses" in e && n(1, (g = e.responses)),
          "websiteOwnerPubkey" in e && n(2, (w = e.websiteOwnerPubkey));
      }),
      (e.$$.update = () => {
        if (
          (131072 & e.$$.dirty[0] && n(15, (v = a.profiles)),
          32769 & e.$$.dirty[0] &&
            n(
              10,
              (r =
                (v[b.pubkey] && v[b.pubkey].display_name) ||
                `[${b.pubkey.slice(0, 6)}]`)
            ),
          9 & e.$$.dirty[0] && n(6, (d = s === b.id)),
          1 & e.$$.dirty[0])
        )
          try {
            n(5, (h = ti.npubEncode(b.pubkey)));
          } catch (e) {
            n(5, (h = b.pubkey));
          }
        65537 & e.$$.dirty[0] &&
          n(9, (m = o[b.id]?.reduce((e, t) => e + t.amount, 0) || 0)),
          32769 & e.$$.dirty[0] &&
            n(
              4,
              (f =
                (v[b.pubkey] && v[b.pubkey].picture) ||
                `https://robohash.org/${b.pubkey.slice(0, 1)}.png?set=set1`)
            );
      }),
      [
        b,
        g,
        w,
        s,
        f,
        h,
        d,
        p,
        y,
        m,
        r,
        l,
        _,
        x,
        k,
        v,
        o,
        a,
        () => u(ce, (s = s === b.id ? null : b.id), s),
        () => {
          u(ce, (s = null), s);
        },
        function (e) {
          (y = e), n(8, y);
        },
        function (e) {
          (y = e), n(8, y);
        },
        function (e) {
          (y = e), n(8, y);
        },
        function (e) {
          (y = e), n(8, y);
        },
        function (e) {
          (y = e), n(8, y);
        },
        function (e) {
          (y = e), n(8, y);
        },
        () => {
          _(b.id);
        },
        () => {
          _(b.id);
        },
        () => {
          _(b.id);
        },
        () => n(7, (p = !0)),
        () => n(7, (p = !1)),
      ]
    );
  }
  class Df extends ne {
    constructor(e) {
      super(),
        te(
          this,
          e,
          Ff,
          Mf,
          i,
          { event: 0, responses: 1, websiteOwnerPubkey: 2 },
          null,
          [-1, -1]
        );
    }
  }
  var zf = {
    $: (e) => ("string" == typeof e ? document.querySelector(e) : e),
    extend: (...e) => Object.assign(...e),
    cumulativeOffset(e) {
      let t = 0,
        n = 0;
      do {
        (t += e.offsetTop || 0), (n += e.offsetLeft || 0), (e = e.offsetParent);
      } while (e);
      return { top: t, left: n };
    },
    directScroll: (e) => e && e !== document && e !== document.body,
    scrollTop(e, t) {
      let n = void 0 !== t;
      return this.directScroll(e)
        ? n
          ? (e.scrollTop = t)
          : e.scrollTop
        : n
        ? (document.documentElement.scrollTop = document.body.scrollTop = t)
        : window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
    },
    scrollLeft(e, t) {
      let n = void 0 !== t;
      return this.directScroll(e)
        ? n
          ? (e.scrollLeft = t)
          : e.scrollLeft
        : n
        ? (document.documentElement.scrollLeft = document.body.scrollLeft = t)
        : window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0;
    },
  };
  const Kf = {
      container: "body",
      duration: 500,
      delay: 0,
      offset: 0,
      easing: function (e) {
        return e < 0.5 ? 4 * e * e * e : 0.5 * Math.pow(2 * e - 2, 3) + 1;
      },
      onStart: e,
      onDone: e,
      onAborting: e,
      scrollX: !1,
      scrollY: !0,
    },
    Gf = (e) => {
      let {
        offset: t,
        duration: n,
        delay: r,
        easing: o,
        x: i = 0,
        y: s = 0,
        scrollX: a,
        scrollY: c,
        onStart: u,
        onDone: l,
        container: y,
        onAborting: b,
        element: g,
      } = e;
      "function" == typeof t && (t = t());
      var w = zf.cumulativeOffset(y),
        v = g ? zf.cumulativeOffset(g) : { top: s, left: i },
        m = zf.scrollLeft(y),
        _ = zf.scrollTop(y),
        x = v.left - w.left + t,
        E = v.top - w.top + t,
        k = x - m,
        S = E - _;
      let A = !0,
        O = !1,
        C = f() + r,
        P = C + n;
      function I(e) {
        e || ((O = !0), u(g, { x: i, y: s }));
      }
      function T(e) {
        !(function (e, t, n) {
          a && zf.scrollLeft(e, n), c && zf.scrollTop(e, t);
        })(y, _ + S * e, m + k * e);
      }
      function L() {
        A = !1;
      }
      return (
        (function (e) {
          let t;
          0 === d.size && h(p),
            new Promise((n) => {
              d.add((t = { c: e, f: n }));
            });
        })((e) => {
          if (
            (!O && e >= C && I(!1),
            O && e >= P && (T(1), L(), l(g, { x: i, y: s })),
            !A)
          )
            return b(g, { x: i, y: s }), !1;
          if (O) {
            T(0 + 1 * o((e - C) / n));
          }
          return !0;
        }),
        I(r),
        T(0),
        L
      );
    },
    Wf = (e) => {
      if (e && e !== document && e !== document.body)
        return e.scrollHeight - e.offsetHeight;
      {
        let e = document.body,
          t = document.documentElement;
        return Math.max(
          e.scrollHeight,
          e.offsetHeight,
          t.clientHeight,
          t.scrollHeight,
          t.offsetHeight
        );
      }
    },
    Vf = (e) => (
      (e = ((e) => {
        let t = zf.extend({}, Kf, e);
        return (
          (t.container = zf.$(t.container)), (t.element = zf.$(t.element)), t
        );
      })(e)),
      Gf(zf.extend(e, { element: null, y: Wf(e.container) }))
    );
  function Yf(e, t, n) {
    const r = e.slice();
    return (r[27] = t[n]), r;
  }
  function Zf(e, t, n) {
    const r = e.slice();
    return (r[30] = t[n]), (r[32] = n), r;
  }
  function Jf(e) {
    let t;
    return {
      c() {
        t = m(e[8]);
      },
      m(e, n) {
        b(e, t, n);
      },
      p(e, n) {
        256 & n[0] && A(t, e[8]);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Qf(e) {
    let t, n;
    return {
      c() {
        (t = v("span")),
          S(
            t,
            "class",
            (n =
              "inline-block rounded-full " +
              (e[6] > e[32] ? "bg-green-500" : "bg-gray-300") +
              " w-2 h-2 svelte-1byyxb6")
          );
      },
      m(e, n) {
        b(e, t, n);
      },
      p(e, r) {
        64 & r[0] &&
          n !==
            (n =
              "inline-block rounded-full " +
              (e[6] > e[32] ? "bg-green-500" : "bg-gray-300") +
              " w-2 h-2 svelte-1byyxb6") &&
          S(t, "class", n);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function Xf(e) {
    let t,
      n,
      r,
      o,
      i,
      s,
      a = e[5].name + "",
      c = e[5].picture && eh(e),
      u = e[5].about && th(e);
    return {
      c() {
        (t = v("div")),
          c && c.c(),
          (n = _()),
          (r = v("div")),
          (o = v("div")),
          (i = m(a)),
          (s = _()),
          u && u.c(),
          S(o, "class", "font-extrabold text-xl svelte-1byyxb6"),
          S(r, "class", "flex flex-col svelte-1byyxb6"),
          S(
            t,
            "class",
            "flex flex-row gap-2 mb-3 bg-zinc-300 text-zinc-800 px-4 py-2 -mx-5 -mt-3 svelte-1byyxb6"
          );
      },
      m(e, a) {
        b(e, t, a),
          c && c.m(t, null),
          y(t, n),
          y(t, r),
          y(r, o),
          y(o, i),
          y(r, s),
          u && u.m(r, null);
      },
      p(e, o) {
        e[5].picture
          ? c
            ? c.p(e, o)
            : ((c = eh(e)), c.c(), c.m(t, n))
          : c && (c.d(1), (c = null)),
          32 & o[0] && a !== (a = e[5].name + "") && A(i, a),
          e[5].about
            ? u
              ? u.p(e, o)
              : ((u = th(e)), u.c(), u.m(r, null))
            : u && (u.d(1), (u = null));
      },
      d(e) {
        e && g(t), c && c.d(), u && u.d();
      },
    };
  }
  function eh(e) {
    let t, n;
    return {
      c() {
        (t = v("img")),
          a(t.src, (n = e[5].picture)) || S(t, "src", n),
          S(t, "class", "w-12 h-12 rounded-full svelte-1byyxb6"),
          S(t, "alt", "Channel Picture");
      },
      m(e, n) {
        b(e, t, n);
      },
      p(e, r) {
        32 & r[0] && !a(t.src, (n = e[5].picture)) && S(t, "src", n);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function th(e) {
    let t,
      n,
      r = e[5].about + "";
    return {
      c() {
        (t = v("div")),
          (n = m(r)),
          S(t, "class", "text-sm truncate font-regular svelte-1byyxb6");
      },
      m(e, r) {
        b(e, t, r), y(t, n);
      },
      p(e, t) {
        32 & t[0] && r !== (r = e[5].about + "") && A(n, r);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function nh(e) {
    let t, n;
    function r(e, n) {
      return (
        512 & n[0] && (t = null), null == t && (t = !e[10](e[9])), t ? oh : rh
      );
    }
    let o = r(e, [-1, -1]),
      i = o(e);
    return {
      c() {
        i.c(), (n = x());
      },
      m(e, t) {
        i.m(e, t), b(e, n, t);
      },
      p(e, t) {
        o === (o = r(e, t)) && i
          ? i.p(e, t)
          : (i.d(1), (i = o(e)), i && (i.c(), i.m(n.parentNode, n)));
      },
      d(e) {
        i.d(e), e && g(n);
      },
    };
  }
  function rh(e) {
    let t,
      n,
      r,
      o,
      i,
      s,
      a,
      c,
      u = e[10](e[9]).content + "";
    return {
      c() {
        (t = v("div")),
          (n = v("a")),
          (n.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 svelte-1byyxb6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" class="svelte-1byyxb6"></path></svg>'),
          (r = _()),
          (o = v("div")),
          (i = v("span")),
          (s = m(u)),
          S(n, "href", "#"),
          S(n, "class", "svelte-1byyxb6"),
          S(
            i,
            "class",
            "text-lg text-black overflow-hidden whitespace-nowrap text-ellipsis svelte-1byyxb6"
          ),
          S(o, "class", "flex flex-col ml-2 svelte-1byyxb6"),
          S(t, "class", "flex flex-row mb-3 svelte-1byyxb6");
      },
      m(u, l) {
        b(u, t, l),
          y(t, n),
          y(t, r),
          y(t, o),
          y(o, i),
          y(i, s),
          a || ((c = E(n, "click", k(e[13]))), (a = !0));
      },
      p(e, t) {
        512 & t[0] && u !== (u = e[10](e[9]).content + "") && A(s, u);
      },
      d(e) {
        e && g(t), (a = !1), c();
      },
    };
  }
  function oh(e) {
    let t, n, r;
    return {
      c() {
        (t = v("h1")),
          (n = m("Couldn't find event with ID ")),
          (r = m(e[9])),
          S(t, "class", "svelte-1byyxb6");
      },
      m(e, o) {
        b(e, t, o), y(t, n), y(t, r);
      },
      p(e, t) {
        512 & t[0] && A(r, e[9]);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function ih(e) {
    let t,
      n,
      r = e[3],
      o = [];
    for (let t = 0; t < r.length; t += 1) o[t] = ch(Yf(e, r, t));
    const i = (e) =>
      Y(o[e], 1, 1, () => {
        o[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < o.length; e += 1) o[e].c();
        t = x();
      },
      m(e, r) {
        for (let t = 0; t < o.length; t += 1) o[t] && o[t].m(e, r);
        b(e, t, r), (n = !0);
      },
      p(e, n) {
        if (25 & n[0]) {
          let s;
          for (r = e[3], s = 0; s < r.length; s += 1) {
            const i = Yf(e, r, s);
            o[s]
              ? (o[s].p(i, n), V(o[s], 1))
              : ((o[s] = ch(i)), o[s].c(), V(o[s], 1), o[s].m(t.parentNode, t));
          }
          for (G(), s = r.length; s < o.length; s += 1) i(s);
          W();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < r.length; e += 1) V(o[e]);
          n = !0;
        }
      },
      o(e) {
        o = o.filter(Boolean);
        for (let e = 0; e < o.length; e += 1) Y(o[e]);
        n = !1;
      },
      d(e) {
        w(o, e), e && g(t);
      },
    };
  }
  function sh(e) {
    let t, n;
    return (
      (t = new Df({
        props: {
          event: e[10](e[9]),
          responses: e[4],
          websiteOwnerPubkey: e[0],
        },
      })),
      {
        c() {
          J(t.$$.fragment);
        },
        m(e, r) {
          Q(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          512 & n[0] && (r.event = e[10](e[9])),
            16 & n[0] && (r.responses = e[4]),
            1 & n[0] && (r.websiteOwnerPubkey = e[0]),
            t.$set(r);
        },
        i(e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Y(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          X(t, e);
        },
      }
    );
  }
  function ah(e) {
    let t;
    return {
      c() {
        t = m("👆 deleted");
      },
      m(e, n) {
        b(e, t, n);
      },
      d(e) {
        e && g(t);
      },
    };
  }
  function ch(e) {
    let t, n, r, o;
    t = new Df({
      props: { event: e[27], responses: e[4], websiteOwnerPubkey: e[0] },
    });
    let i = e[27].deleted && ah();
    return {
      c() {
        J(t.$$.fragment), (n = _()), i && i.c(), (r = x());
      },
      m(e, s) {
        Q(t, e, s), b(e, n, s), i && i.m(e, s), b(e, r, s), (o = !0);
      },
      p(e, n) {
        const o = {};
        8 & n[0] && (o.event = e[27]),
          16 & n[0] && (o.responses = e[4]),
          1 & n[0] && (o.websiteOwnerPubkey = e[0]),
          t.$set(o),
          e[27].deleted
            ? i || ((i = ah()), i.c(), i.m(r.parentNode, r))
            : i && (i.d(1), (i = null));
      },
      i(e) {
        o || (V(t.$$.fragment, e), (o = !0));
      },
      o(e) {
        Y(t.$$.fragment, e), (o = !1);
      },
      d(e) {
        X(t, e), e && g(n), i && i.d(e), e && g(r);
      },
    };
  }
  function uh(e) {
    let t, n;
    return {
      c() {
        (t = v("b")),
          (t.textContent = "Public notes:"),
          (n = m(
            "\n            your followers see your messages on their timeline"
          )),
          S(t, "class", "svelte-1byyxb6");
      },
      m(e, r) {
        b(e, t, r), b(e, n, r);
      },
      d(e) {
        e && g(t), e && g(n);
      },
    };
  }
  function lh(e) {
    let t, n;
    return {
      c() {
        (t = v("b")),
          (t.textContent = "Public chat:"),
          (n = m("\n            anyone can see these messages.")),
          S(t, "class", "svelte-1byyxb6");
      },
      m(e, r) {
        b(e, t, r), b(e, n, r);
      },
      d(e) {
        e && g(t), e && g(n);
      },
    };
  }
  function fh(e) {
    let t, n;
    return {
      c() {
        (t = v("b")),
          (t.textContent = "Encrypted chat:"),
          (n = m(
            "\n            only your chat partner can see these messages."
          )),
          S(t, "class", "svelte-1byyxb6");
      },
      m(e, r) {
        b(e, t, r), b(e, n, r);
      },
      d(e) {
        e && g(t), e && g(n);
      },
    };
  }
  function hh(e) {
    let t,
      n,
      o,
      i,
      s,
      a,
      c,
      u,
      l,
      f,
      h,
      d,
      p,
      x,
      C,
      P,
      I,
      T,
      L,
      B,
      R,
      $,
      j,
      U,
      N,
      H,
      q,
      M,
      F = e[2]?.pubkey && Jf(e),
      D = Array(e[7]),
      z = [];
    for (let t = 0; t < D.length; t += 1) z[t] = Qf(Zf(e, D, t));
    let K = e[5].name && Xf(e),
      Z = e[9] && nh(e);
    const J = [sh, ih],
      Q = [];
    function X(e, t) {
      return e[9] ? 0 : 1;
    }
    function ee(e, t) {
      return "DM" === e[1].chatType ? fh : "GROUP" === e[1].chatType ? lh : uh;
    }
    (P = X(e)), (I = Q[P] = J[P](e));
    let te = ee(e),
      ne = te(e);
    return {
      c() {
        (t = v("div")),
          (n = v("div")),
          F && F.c(),
          (o = _()),
          (i = v("span")),
          (s = v("div"));
        for (let e = 0; e < z.length; e += 1) z[e].c();
        (a = _()),
          (c = m(e[6])),
          (u = m("/")),
          (l = m(e[7])),
          (f = m(" relays")),
          (h = _()),
          K && K.c(),
          (d = _()),
          Z && Z.c(),
          (p = _()),
          (x = v("div")),
          (C = v("div")),
          I.c(),
          (T = _()),
          (L = v("div")),
          (B = v("div")),
          ne.c(),
          (R = _()),
          ($ = v("div")),
          (j = v("textarea")),
          (U = _()),
          (N = v("button")),
          (N.innerHTML =
            '<svg aria-hidden="true" class="w-6 h-6 rotate-90 svelte-1byyxb6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" class="svelte-1byyxb6"></path></svg>'),
          S(n, "class", "text-lg font-semibold svelte-1byyxb6"),
          S(s, "class", "flex flex-row gap-1 overflow-clip svelte-1byyxb6"),
          S(
            i,
            "class",
            "text-xs flex flex-col items-end mt-2 text-gray-200 gap-1 svelte-1byyxb6"
          ),
          S(
            t,
            "class",
            "bg-purple-700 text-white -mx-5 -mt-5 mb-3 px-4 py-3 overflow-clip flex flex-row justify-between items-center  svelte-1byyxb6"
          ),
          S(C, "id", "messages-container-inner"),
          S(C, "class", "flex flex-col gap-4 svelte-1byyxb6"),
          S(x, "id", "messages-container"),
          S(
            x,
            "class",
            "overflow-auto -mx-4 px-4 relative top-[-12px] mb-[-20px] svelte-1byyxb6"
          ),
          O(x, "height", "calc(50vh + 12px)"),
          O(x, "min-height", "300px"),
          S(
            B,
            "class",
            "border-y border-y-slate-200 -mx-4 my-2 bg-slate-100 text-black text-sm px-4 py-2  svelte-1byyxb6"
          ),
          S(j, "type", "text"),
          S(j, "id", "message-input"),
          S(
            j,
            "class",
            "-mb-2 p-2 w-full resize-none rounded-xl text-gray-600 border  svelte-1byyxb6"
          ),
          S(j, "placeholder", "Say hello!"),
          S(j, "rows", "1"),
          S(N, "type", "button"),
          S(
            N,
            "class",
            "inline-flex items-center rounded-full border border-transparent bg-purple-700 p-3 text-white shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 svelte-1byyxb6"
          ),
          S($, "class", "flex flex-row gap-2 -mx-1 svelte-1byyxb6"),
          S(L, "class", "flex flex-col svelte-1byyxb6");
      },
      m(r, g) {
        b(r, t, g), y(t, n), F && F.m(n, null), y(t, o), y(t, i), y(i, s);
        for (let e = 0; e < z.length; e += 1) z[e] && z[e].m(s, null);
        y(i, a),
          y(i, c),
          y(i, u),
          y(i, l),
          y(i, f),
          b(r, h, g),
          K && K.m(r, g),
          b(r, d, g),
          Z && Z.m(r, g),
          b(r, p, g),
          b(r, x, g),
          y(x, C),
          Q[P].m(C, null),
          b(r, T, g),
          b(r, L, g),
          y(L, B),
          ne.m(B, null),
          y(L, R),
          y(L, $),
          y($, j),
          y($, U),
          y($, N),
          (H = !0),
          q ||
            ((M = [E(j, "keydown", e[12]), E(N, "click", k(e[11]))]), (q = !0));
      },
      p(e, t) {
        if (
          (e[2]?.pubkey
            ? F
              ? F.p(e, t)
              : ((F = Jf(e)), F.c(), F.m(n, null))
            : F && (F.d(1), (F = null)),
          192 & t[0])
        ) {
          let n;
          for (D = Array(e[7]), n = 0; n < D.length; n += 1) {
            const r = Zf(e, D, n);
            z[n] ? z[n].p(r, t) : ((z[n] = Qf(r)), z[n].c(), z[n].m(s, null));
          }
          for (; n < z.length; n += 1) z[n].d(1);
          z.length = D.length;
        }
        (!H || 64 & t[0]) && A(c, e[6]),
          (!H || 128 & t[0]) && A(l, e[7]),
          e[5].name
            ? K
              ? K.p(e, t)
              : ((K = Xf(e)), K.c(), K.m(d.parentNode, d))
            : K && (K.d(1), (K = null)),
          e[9]
            ? Z
              ? Z.p(e, t)
              : ((Z = nh(e)), Z.c(), Z.m(p.parentNode, p))
            : Z && (Z.d(1), (Z = null));
        let r = P;
        (P = X(e)),
          P === r
            ? Q[P].p(e, t)
            : (G(),
              Y(Q[r], 1, 1, () => {
                Q[r] = null;
              }),
              W(),
              (I = Q[P]),
              I ? I.p(e, t) : ((I = Q[P] = J[P](e)), I.c()),
              V(I, 1),
              I.m(C, null)),
          te !== (te = ee(e)) &&
            (ne.d(1), (ne = te(e)), ne && (ne.c(), ne.m(B, null)));
      },
      i(e) {
        H || (V(I), (H = !0));
      },
      o(e) {
        Y(I), (H = !1);
      },
      d(e) {
        e && g(t),
          F && F.d(),
          w(z, e),
          e && g(h),
          K && K.d(e),
          e && g(d),
          Z && Z.d(e),
          e && g(p),
          e && g(x),
          Q[P].d(),
          e && g(T),
          e && g(L),
          ne.d(),
          (q = !1),
          r(M);
      },
    };
  }
  function dh(e, t, n) {
    let r, o, i, s;
    c(e, ie, (e) => n(2, (r = e))),
      c(e, ae, (e) => n(9, (o = e))),
      c(e, se, (e) => n(18, (i = e))),
      c(e, ue, (e) => n(21, (s = e)));
    let a,
      l,
      f = [],
      h = [],
      d = {},
      p = {},
      { websiteOwnerPubkey: y } = t,
      { chatConfiguration: b } = t;
    function g(e) {
      let t = f.find((t) => t.id === e);
      return (t = t || h.find((t) => t.id === e)), t;
    }
    async function w() {
      const e = document.getElementById("message-input"),
        t = e.value;
      e.value = "";
      let n = { tags: [], tagPubKeys: [] };
      !l && y && (n.tagPubKeys = [y]),
        o &&
          (n.tags.push(["e", o, "wss://nos.lol", "root"]),
          n.tagPubKeys.push(g(o).pubkey));
      const i = await r.send(t, n);
      l || ((l = i), localStorage.setItem("rootNoteId", l));
    }
    function v(e) {
      let t;
      if ((e.tags.filter((e) => "e" === e[0]).pop(), "GLOBAL" === b.chatType))
        t = e.tags.filter((e) => "e" === e[0]).length >= 1;
      else if ("GROUP" === b.chatType)
        t = e.tags.filter((e) => "e" === e[0] && e[1] !== b.chatId).length >= 1;
      else {
        const n = e.tags.filter((e) => "p" === e[0]).map((e) => e[1]);
        t = new Set(n).size >= 2;
      }
      if ((d[e.id] || n(4, (d[e.id] = []), d), t)) {
        const t = e.tags.filter((e) => "e" === e[0]).pop();
        t && t[1] && (d[t[1]] || n(4, (d[t[1]] = []), d), d[t[1]].push(e)),
          h.push(e);
      } else {
        let t = 0;
        for (; t < f.length && f[t].created_at < e.created_at; ) t++;
        f.splice(t, 0, e), n(3, f), n(1, b), n(15, a), n(2, r);
      }
      n(4, d), n(1, b), n(15, a), n(2, r), m();
    }
    function m() {
      Vf({
        container: document.getElementById("messages-container"),
        offset: 999999,
        duration: 50,
      });
    }
    function _(e) {
      const t = f.find((t) => t.id === e.zappedEvent);
      t && (s[t.id] || u(ue, (s[t.id] = []), s), s[t.id].push(e));
    }
    function x(e) {
      const t = f.find((t) => t.id === e.id);
      t &&
        ((t.reactions = t.reactions || []),
        t.reactions.push(e),
        n(3, f),
        n(1, b),
        n(15, a),
        n(2, r));
    }
    let E = {};
    T(() => {
      r.on("message", v),
        r.on("connectivity", (e) => {
          n(16, (A = e));
        }),
        r.on("reaction", x),
        r.on("zap", _),
        r.on("deleted", (e) => {
          e.forEach((e) => {
            const t = f.findIndex((t) => t.id === e);
            -1 !== t &&
              (n(3, (f[t].deleted = !0), f),
              n(3, f),
              n(1, b),
              n(15, a),
              n(2, r));
          });
        }),
        r.on("profile", ({ pubkey: e, profile: t }) => {
          let n = i.profiles;
          (n[e] = t), se.set({ profiles: n, ...i });
        }),
        r.on("channelMetadata", (e) => {
          n(5, (E = JSON.parse(e.content)));
        });
    });
    let k,
      S,
      A = {},
      O = 0,
      C = 0;
    return (
      (e.$$set = (e) => {
        "websiteOwnerPubkey" in e && n(0, (y = e.websiteOwnerPubkey)),
          "chatConfiguration" in e && n(1, (b = e.chatConfiguration));
      }),
      (e.$$.update = () => {
        32774 & e.$$.dirty[0] &&
          (b !== a &&
            r &&
            (r.setChatConfiguration(
              b.chatType,
              b.chatTags,
              b.chatReferenceTags,
              b.chatId
            ),
            n(3, (f = [])),
            n(4, (d = {})),
            (l = null),
            localStorage.removeItem("rootNoteId")),
          n(15, (a = b))),
          262144 & e.$$.dirty[0] && n(14, (p = i.profiles)),
          81924 & e.$$.dirty[0] &&
            (n(
              6,
              (O = Object.values(A).filter((e) => "connected" === e).length)
            ),
            n(7, (C = Object.values(A).length)),
            r?.pubkey && !p[r.pubkey] && r.reqProfile(r.pubkey)),
          131076 & e.$$.dirty[0] &&
            k !== r?.chatId &&
            (n(17, (k = r?.chatId)), n(5, (E = {}))),
          4 & e.$$.dirty[0] &&
            n(
              8,
              (S = r?.pubkey
                ? (function (e) {
                    let t;
                    if (p[r.pubkey]) {
                      let e = p[r.pubkey];
                      t = e.display_name || e.displayName || e.name || e.nip05;
                    }
                    return t || (t = `[${e.slice(0, 6)}]`), t;
                  })(r.pubkey)
                : "")
            );
      }),
      [
        y,
        b,
        r,
        f,
        d,
        E,
        O,
        C,
        S,
        o,
        g,
        w,
        async function (e) {
          "Enter" === e.key && (w(), e.preventDefault());
        },
        function () {
          if ("GROUP" === b.chatType) u(ae, (o = null), o);
          else {
            const e = g(o)
                .tags.filter((e) => "e" === e[0])
                .pop(),
              t = e && e[1];
            u(ae, (o = t), o);
          }
          m();
        },
        p,
        a,
        A,
        k,
        i,
      ]
    );
  }
  class ph extends ne {
    constructor(e) {
      super(),
        te(
          this,
          e,
          dh,
          hh,
          i,
          { websiteOwnerPubkey: 0, chatConfiguration: 1 },
          null,
          [-1, -1]
        );
    }
  }
  function yh(e) {
    let t, n;
    return (
      (t = new ph({
        props: {
          websiteOwnerPubkey: e[1],
          chatConfiguration: e[2],
          relays: e[3],
        },
      })),
      {
        c() {
          J(t.$$.fragment);
        },
        m(e, r) {
          Q(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          2 & n && (r.websiteOwnerPubkey = e[1]),
            4 & n && (r.chatConfiguration = e[2]),
            8 & n && (r.relays = e[3]),
            t.$set(r);
        },
        i(e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Y(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          X(t, e);
        },
      }
    );
  }
  function bh(e) {
    let t, n;
    return (
      (t = new af({
        props: {
          websiteOwnerPubkey: e[1],
          chatConfiguration: e[2],
          relays: e[3],
        },
      })),
      {
        c() {
          J(t.$$.fragment);
        },
        m(e, r) {
          Q(t, e, r), (n = !0);
        },
        p(e, n) {
          const r = {};
          2 & n && (r.websiteOwnerPubkey = e[1]),
            4 & n && (r.chatConfiguration = e[2]),
            8 & n && (r.relays = e[3]),
            t.$set(r);
        },
        i(e) {
          n || (V(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          Y(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          X(t, e);
        },
      }
    );
  }
  function gh(e) {
    let t, n, r, o;
    const i = [bh, yh],
      s = [];
    function a(e, t) {
      return e[0] ? 1 : 0;
    }
    return (
      (t = a(e)),
      (n = s[t] = i[t](e)),
      {
        c() {
          n.c(), (r = x());
        },
        m(e, n) {
          s[t].m(e, n), b(e, r, n), (o = !0);
        },
        p(e, [o]) {
          let c = t;
          (t = a(e)),
            t === c
              ? s[t].p(e, o)
              : (G(),
                Y(s[c], 1, 1, () => {
                  s[c] = null;
                }),
                W(),
                (n = s[t]),
                n ? n.p(e, o) : ((n = s[t] = i[t](e)), n.c()),
                V(n, 1),
                n.m(r.parentNode, r));
        },
        i(e) {
          o || (V(n), (o = !0));
        },
        o(e) {
          Y(n), (o = !1);
        },
        d(e) {
          s[t].d(e), e && g(r);
        },
      }
    );
  }
  function wh(e, t, n) {
    let r;
    c(e, ie, (e) => n(4, (r = e)));
    let { websiteOwnerPubkey: o } = t,
      { chatStarted: i } = t,
      { chatConfiguration: s } = t,
      { relays: a } = t;
    return (
      (e.$$set = (e) => {
        "websiteOwnerPubkey" in e && n(1, (o = e.websiteOwnerPubkey)),
          "chatStarted" in e && n(0, (i = e.chatStarted)),
          "chatConfiguration" in e && n(2, (s = e.chatConfiguration)),
          "relays" in e && n(3, (a = e.relays));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && n(0, (i = !!r));
      }),
      [i, o, s, a, r]
    );
  }
  class vh extends ne {
    constructor(e) {
      super(),
        te(this, e, wh, gh, i, {
          websiteOwnerPubkey: 1,
          chatStarted: 0,
          chatConfiguration: 2,
          relays: 3,
        });
    }
  }
  function mh(e) {
    let t, n, r, o;
    return (
      (n = new vh({
        props: {
          websiteOwnerPubkey: e[0],
          chatConfiguration: {
            chatType: e[1],
            chatTags: e[2],
            chatId: e[5],
            chatReferenceTags: e[3],
          },
          relays: e[4],
        },
      })),
      {
        c() {
          (t = v("div")),
            J(n.$$.fragment),
            S(
              t,
              "class",
              (r =
                "shadow-2xl bg-white/90 backdrop-brightness-150 backdrop-blur-md mb-5 w-96 max-w-screen-sm text-black rounded-3xl p-5 overflow-auto overflow-hidden flex flex-col justify-end " +
                (e[7] ? "hidden" : "") +
                " svelte-1byyxb6")
            ),
            O(t, "max-height", "80vh");
        },
        m(e, r) {
          b(e, t, r), Q(n, t, null), (o = !0);
        },
        p(e, i) {
          const s = {};
          1 & i && (s.websiteOwnerPubkey = e[0]),
            46 & i &&
              (s.chatConfiguration = {
                chatType: e[1],
                chatTags: e[2],
                chatId: e[5],
                chatReferenceTags: e[3],
              }),
            16 & i && (s.relays = e[4]),
            n.$set(s),
            (!o ||
              (128 & i &&
                r !==
                  (r =
                    "shadow-2xl bg-white/90 backdrop-brightness-150 backdrop-blur-md mb-5 w-96 max-w-screen-sm text-black rounded-3xl p-5 overflow-auto overflow-hidden flex flex-col justify-end " +
                    (e[7] ? "hidden" : "") +
                    " svelte-1byyxb6"))) &&
              S(t, "class", r);
        },
        i(e) {
          o || (V(n.$$.fragment, e), (o = !0));
        },
        o(e) {
          Y(n.$$.fragment, e), (o = !1);
        },
        d(e) {
          e && g(t), X(n);
        },
      }
    );
  }
  function _h(e) {
    let t,
      n,
      r,
      o,
      i,
      s,
      a,
      c = e[6] && mh(e);
    return {
      c() {
        (t = v("div")),
          c && c.c(),
          (n = _()),
          (r = v("div")),
          (o = v("a")),
          (o.innerHTML =
            '<span class="tracking-wider flex svelte-1byyxb6"><span class="text-white  svelte-1byyxb6">Nostri</span><span class="text-purple-300 svelte-1byyxb6">Chat</span></span> \n            <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 571.004 571.004" xml:space="preserve" class="svelte-1byyxb6"><g class="svelte-1byyxb6"><g class="svelte-1byyxb6"><path d="M533.187,269.019c-1.432-1.746-2.219-3.876-1.252-5.993c1.868-4.08,0.611-7.658-0.931-11.465\n                            c-0.877-2.167-0.796-4.716-1.15-7.095c-0.221-1.493-0.057-3.199-0.742-4.435c-1.775-3.199-3.812-6.275-5.949-9.245\n                            c-2.681-3.717-5.564-7.291-8.38-10.914c-3.325-4.284-6.581-8.633-10.09-12.766c-0.706-0.833-2.604-1.42-3.607-1.085\n                            c-2.411,0.808-4.732,2.052-6.874,3.452c-2.771,1.812-5.435,3.317-8.928,3.713c-3.953,0.453-8.062,1.403-11.604,3.154\n                            c-5.189,2.562-9.747,6.401-14.924,9c-4.913,2.464-8.328,6.112-11.184,10.567c-0.783,1.22-1.705,2.371-2.685,3.444\n                            c-3.252,3.574-5.549,7.629-7.051,12.248c-1.154,3.554-2.378,7.226-4.373,10.322c-1.963,3.044-3.256,6.194-4.162,9.601\n                            c-0.285,1.065-0.44,2.167-0.656,3.251c-2.212-0.539-4.19-0.873-6.06-1.518c-1.709-0.592-3.684-1.15-4.879-2.375\n                            c-2.979-3.052-6.528-5.059-10.388-6.577c-3.448-1.354-6.581-3.06-9.441-5.496c-1.514-1.29-3.771-1.738-5.721-2.489\n                            c-1.419-0.547-3.043-0.714-4.3-1.501c-3.439-2.146-6.639-4.68-10.11-6.765c-2.256-1.359-4.737-2.542-7.271-3.166\n                            c-1.722-0.424-2.293-0.865-2.216-2.599c0.241-5.227-0.832-10.175-3.235-14.872c-2.855-5.582-8.723-8.625-14.777-7.589\n                            c-2.697,0.461-5.573,1.347-8.128,0.833c-3.329-0.669-6.516-2-10.028-1.861c-0.612,0.025-1.31-0.437-1.864-0.82\n                            c-4.076-2.832-8.152-5.663-12.163-8.584c-1.489-1.085-2.782-1.154-4.442-0.322c-1.221,0.612-2.705,0.955-4.08,0.967\n                            c-6.047,0.062-12.098-0.082-18.148-0.077c-5.173,0.004-10.498,1.815-15.377-1.399c-0.241-0.159-0.588-0.216-0.886-0.221\n                            c-3.023-0.028-4.488-1.632-5.096-4.524c-0.171-0.82-1.436-1.971-2.236-2c-3.986-0.143-7.984-0.041-11.971,0.139\n                            c-2.187,0.102-4.619,0.004-6.483,0.922c-3.941,1.942-7.556,4.533-11.355,6.773c-1.505,0.889-3.023,1.085-3.872-0.763\n                            c0.979-1.261,2.337-2.272,2.627-3.525c0.771-3.37-3.705-7.181-6.969-6.059c-1.498,0.514-3.003,1.208-4.272,2.138\n                            c-2.464,1.807-4.725,3.896-7.144,5.769c-3.011,2.33-6.055,4.655-10.449,4.737c0.983-3.753-1.718-5.104-4.108-6.597\n                            c-1.094-0.686-2.293-1.281-3.525-1.652c-3.276-1-6.348-0.763-8.956,1.828c-2.158,2.142-3.488,2.179-6.014,0.367\n                            c-3.081-2.208-3.986-2.175-7.128,0c-1.122,0.775-2.346,1.832-3.586,1.926c-4.268,0.318-6.646,3.052-8.931,6.132\n                            c-1.632,2.203-3.244,4.472-5.173,6.405c-4.378,4.39-8.911,8.629-13.48,12.815c-0.608,0.559-1.95,0.873-2.709,0.608\n                            c-3.378-1.191-5.582-3.823-6.899-7.001c-2.521-6.075-4.957-12.203-7.07-18.429c-0.816-2.399-1.11-5.165-0.865-7.687\n                            c0.559-5.786,1.771-11.51,2.411-17.291c1.196-10.796,3.583-21.343,7.405-31.445c6.773-17.891,13.934-35.643,21.2-53.342\n                            c4.619-11.249,7.817-22.852,10.167-34.75c1.644-8.319,2.477-16.63,1.901-25.137c-0.286-4.227,0.232-8.56,0.808-12.787\n                            c1.669-12.232-2.46-19.547-13.843-24.068c-1.403-0.559-2.766-1.228-4.149-1.844c-2.15,0-4.3,0-6.455,0\n                            c-2.909,0.91-5.871,1.681-8.715,2.762c-3.827,1.457-7.989,2.484-10.51,6.145c-1.701,2.472-4.088,3.5-6.916,4.06\n                            c-3.9,0.771-7.797,1.62-11.62,2.705c-3.378,0.959-6.369,2.709-9.135,5.872c6.863,1.652,13.211,3.305,19.617,4.692\n                            c7.629,1.652,14.558,4.729,20.518,9.763c2.954,2.493,5.667,5.447,6.165,9.425c0.51,4.084,0.608,8.271,0.392,12.383\n                            c-0.563,10.694-4.137,20.661-7.976,30.515c-2.358,6.059-5.406,11.876-7.36,18.054c-4.321,13.656-8.486,27.348-14.19,40.522\n                            c-3.309,7.646-6.83,15.251-8.307,23.534c-1.722,9.657-3.264,19.343-4.917,29.013c-0.845,4.958-0.877,10.049-2.864,14.819\n                            c-0.873,2.093-1.269,4.406-1.693,6.654c-0.975,5.182-1.832,10.379-2.733,15.573c0,7.838,0,15.675,0,23.513\n                            c0.632,3.905,1.363,7.801,1.877,11.722c1.481,11.232,4.773,21.955,8.825,32.489c0.816,2.121,1.322,4.378,1.783,6.613\n                            c0.718,3.473,1.069,7.365,4.309,9.303c2.427,1.452,2.982,3.402,3.603,5.671c1.828,6.684,1.318,13.428,0.147,20.086\n                            c-1.114,6.341-0.845,12.525,0.861,18.65c2.313,8.318,4.72,16.613,7.291,24.859c0.461,1.48,1.71,2.896,2.946,3.916\n                            c5.3,4.382,10.735,8.605,16.108,12.897c0.355,0.281,0.645,0.656,0.914,1.028c2.652,3.672,6.373,5.879,10.677,6.638\n                            c8.262,1.457,16.275,4.117,24.664,4.929c1.363,0.131,2.742,0.453,4.035,0.906c2.362,0.828,4.696,1.733,7.038,2.623\n                            c1.257,0.824,2.391,1.832,3.415,3.064c-0.698,2.239-1.901,4.234-3.199,6.164c-3.529,5.239-8.344,8.948-14.007,11.633\n                            c-5.818,2.754-11.975,4.442-18.242,5.744c-8.115,1.686-16.259,3.231-24.378,4.88c-6.789,1.379-13.248,3.79-19.633,6.414\n                            c-8.25,3.39-16.463,6.879-24.77,10.13c-6.447,2.525-13.158,4.149-20.086,4.68c-2.077,0.159-4.178,0.017-6.267,0.065\n                            c-0.604,0.017-1.326,0.045-1.783,0.367c-3.46,2.437-7.446,3.407-11.481,4.272c-1.607,0.347-3.203,0.742-4.802,1.117\n                            c-4.423,1.049-7.703,3.672-10.237,7.36c-2.481,3.619-3.827,7.691-4.762,11.914c-1.26,5.708-1.685,11.521-1.921,17.344\n                            c-0.306,7.405-0.526,14.814-0.828,22.22c-0.082,2.023-0.367,4.035-0.486,6.059c-0.033,0.592,0.012,1.302,0.314,1.779\n                            c3.525,5.654,7.299,11.126,12.276,15.643c4.251,3.859,8.993,6.769,14.819,7.557c0.171,0.024,0.326,0.175,0.485,0.265\n                            c1.775,0,3.55,0,5.32,0c1.032-0.253,2.085-0.444,3.097-0.767c2.216-0.702,4.415-1.461,6.663-2.212\n                            c-0.196-1.881-0.971-3.166-2.317-3.962c-1.236-0.734-2.595-1.301-3.958-1.771c-1.73-0.596-3.55-0.942-5.275-1.554\n                            c-1.114-0.396-2.208-0.968-3.174-1.648c-1.367-0.968-1.979-2.424-2.052-4.097c0.069-0.102,0.118-0.257,0.212-0.298\n                            c4.643-1.885,7.16-5.879,9.694-9.837c0.298-0.461,0.294-1.195,0.241-1.787c-0.445-4.696-1.775-9.184-3.354-13.599\n                            c-1.75-4.884-3.595-9.73-5.333-14.614c-0.551-1.547-0.836-3.183-1.326-4.749c-0.318-1.017,0.11-1.543,0.938-1.971\n                            c1.64-0.841,3.423-0.832,5.189-0.886c2.464-0.073,4.945,0.041,7.393-0.188c1.408-0.131,2.925-0.515,4.121-1.236\n                            c13.692-8.303,28.474-14.003,43.791-18.413c13.876-3.998,27.997-6.915,42.244-9.229c6.247-1.012,12.501-1.967,18.76-2.897\n                            c0.918-0.134,1.665-0.428,2.371-1.027c4.227-3.595,9.217-5.586,14.635-6.259c5.773-0.715,11.608-0.951,17.393-1.563\n                            c3.578-0.379,7.161-0.905,10.678-1.656c4.308-0.918,8.045-3.129,11.146-6.205c2.688-2.669,5.132-5.59,7.593-8.482\n                            c3.28-3.855,6.414-7.834,9.727-11.661c1.02-1.179,2.432-2.012,3.631-3.039c0.792-0.674,1.501-0.653,2.391-0.11\n                            c4.125,2.529,8.576,4.32,13.199,5.712c5.716,1.722,11.566,2.75,17.495,3.374c10.983,1.159,22,1.204,33.023,0.906\n                            c3.166-0.086,6.333-0.09,9.503-0.184c0.93-0.029,1.718,0.171,2.473,0.729c3.309,2.444,6.646,4.852,9.963,7.291\n                            c3.117,2.293,6.345,4.402,9.927,5.92c0.641,0.273,1.277,0.612,1.95,0.735c2.758,0.497,4.741,2.235,6.744,4.002\n                            c5.908,5.214,11.343,10.894,16.161,17.111c6.324,8.156,12.468,16.455,18.617,24.745c6.152,8.295,12.342,16.557,19.396,24.125\n                            c6.863,7.36,14.423,13.868,23.122,18.984c0.775,0.457,1.432,0.955,1.844,1.815c3.187,6.655,8.475,11.09,15.076,14.093\n                            c6.81,3.097,14.006,4.256,21.444,4.142c10.33-0.159,20.062-2.53,28.906-8.014c5.264-3.264,9.572-7.471,12.347-13.097\n                            c1.15-2.338,2.109-4.737,2.269-7.385c0.016-0.29,0.212-0.571,0.326-0.853c0-0.633,0-1.27,0-1.901\n                            c-3.488-0.6-6.802,0.208-10.045,1.362c-3.101,1.102-6.124,2.416-9.25,3.443c-2.692,0.886-5.442,1.673-8.225,2.195\n                            c-4.554,0.853-8.042-1.113-10.037-5.41c0.804-1.049,1.995-1.195,3.194-1.253c2.338-0.113,4.685-0.143,7.022-0.302\n                            c0.799-0.053,1.664-0.249,2.338-0.648c0.6-0.359,1.121-1.024,1.411-1.673c0.498-1.126,0.311-1.44-0.869-2.085\n                            c-3.402-1.856-6.993-3.264-10.714-4.324c-8.421-2.399-17.055-3.028-25.757-3.061c-1.836-0.008-3.677-0.004-5.513,0.082\n                            c-0.963,0.045-1.66-0.249-2.366-0.906c-4.843-4.5-9.094-9.53-13.166-14.721c-6.613-8.429-12.48-17.389-18.47-26.259\n                            c-2.836-4.198-5.786-8.319-8.769-12.411c-0.999-1.375-2.244-2.574-3.419-3.811c-0.384-0.404-0.885-0.727-1.383-0.991\n                            c-1.358-0.727-2.269-0.408-2.905,1.003c-0.229,0.511-0.379,1.062-0.648,1.828c-0.633-0.465-1.179-0.841-1.697-1.253\n                            c-5.03-4.019-8.866-9.058-11.905-14.655c-2.954-5.446-5.627-11.048-8.344-16.626c-2.607-5.353-5.092-10.767-8.438-15.712\n                            c-1.521-2.248-3.317-4.312-4.9-6.523c-0.783-1.094-1.709-1.229-2.949-1.094c-5.324,0.579-10.625,0.494-15.843-0.894\n                            c-2.591-0.689-5.035-1.718-7.1-3.488c-1.473-1.269-2.562-2.746-3.211-4.513c1.95-0.433,3.893-0.897,5.818-1.424\n                            c6.459-1.767,12.926-2.469,19.552-2.081c7.964,0.466,15.92,1.159,23.892,1.437c2.853,0.098,5.966-0.172,8.557-1.244\n                            c3.859-1.596,7.544-3.799,10.971-6.206c5.075-3.566,9.702-7.78,14.847-11.232c2.379-1.595,3.203-3.292,3.306-5.92\n                            c0.134-3.509,1.9-4.781,5.3-4.149c0.6,0.114,1.203,0.253,1.787,0.44c3.852,1.229,7.633,1.028,11.489-0.163\n                            c2.962-0.914,6.066-1.354,9.053-2.195c0.547-0.154,1.024-1.199,1.163-1.909c0.094-0.481-0.616-1.068-0.693-1.648\n                            c-0.127-0.922-0.384-2.402,0.057-2.705c0.854-0.575,2.154-0.656,3.265-0.636c0.881,0.016,1.733,0.62,2.627,0.729\n                            c2.064,0.258,3.995,0.021,5.247-1.986c1.232-1.971,1.277-3.864-0.163-5.757c-0.465-0.608-1.069-1.249-1.191-1.946\n                            c-0.163-0.938-0.273-2.199,0.212-2.881c1.779-2.488,3.771-4.83,5.77-7.152c1.828-2.121,4.251-3.354,6.997-3.541\n                            c0.967-0.065,2.158,0.742,2.966,1.465c0.633,0.562,0.686,1.729,1.261,2.407c0.674,0.795,1.628,1.347,2.465,2.007\n                            c0.571-0.877,1.358-1.688,1.656-2.651c0.311-0.992-0.028-2.175,0.236-3.187c0.213-0.812,0.743-1.738,1.416-2.195\n                            c3.591-2.439,7.442-4.524,10.861-7.177c2.574-1.991,4.508-4.786,6.944-6.98c4.182-3.771,9.526-5.097,14.789-6.472\n                            c3.452-0.901,4.194-1.921,3.134-5.365c-0.514-1.673-1.228-3.309-2.052-4.854c-1.062-1.987-0.531-3.362,1.297-4.402\n                            c0.727-0.412,1.498-0.751,2.252-1.114c2.387-1.139,4.08-2.701,4.688-5.521c0.612-2.827,1.75-5.549,2.741-8.286\n                            c1.339-3.692,2.432-7.65,7.34-8.144c0.147-0.017,0.294-0.061,0.441-0.094c0-1.077,0-2.15,0-3.228\n                            c-1.135-1.775-2.15-3.639-3.432-5.3C536.084,271.981,534.492,270.614,533.187,269.019z" class="svelte-1byyxb6"></path></g></g></svg>'),
          S(o, "href", "#"),
          S(
            o,
            "class",
            "text-white bg-purple-900 hover:bg-purple-700 w-full p-5 rounded-full flex-shrink-1 text-center font-semibold flex flex-row items-center gap-4 svelte-1byyxb6"
          ),
          S(r, "class", "self-end svelte-1byyxb6"),
          S(t, "id", "nostri-chat"),
          S(
            t,
            "class",
            "fixed bottom-5 right-5 mb-5 flex flex-col item-end font-sans svelte-1byyxb6"
          );
      },
      m(u, l) {
        b(u, t, l),
          c && c.m(t, null),
          y(t, n),
          y(t, r),
          y(r, o),
          (i = !0),
          s || ((a = E(o, "click", k(e[8]))), (s = !0));
      },
      p(e, [r]) {
        e[6]
          ? c
            ? (c.p(e, r), 64 & r && V(c, 1))
            : ((c = mh(e)), c.c(), V(c, 1), c.m(t, n))
          : c &&
            (G(),
            Y(c, 1, 1, () => {
              c = null;
            }),
            W());
      },
      i(e) {
        i || (V(c), (i = !0));
      },
      o(e) {
        Y(c), (i = !1);
      },
      d(e) {
        e && g(t), c && c.d(), (s = !1), a();
      },
    };
  }
  function xh(e, t, n) {
    let { websiteOwnerPubkey: r } = t,
      { chatType: o } = t,
      { chatTags: i } = t,
      { chatReferenceTags: s } = t,
      { relays: a } = t,
      { chatId: c } = t,
      u = !1,
      l = !1;
    return (
      (e.$$set = (e) => {
        "websiteOwnerPubkey" in e && n(0, (r = e.websiteOwnerPubkey)),
          "chatType" in e && n(1, (o = e.chatType)),
          "chatTags" in e && n(2, (i = e.chatTags)),
          "chatReferenceTags" in e && n(3, (s = e.chatReferenceTags)),
          "relays" in e && n(4, (a = e.relays)),
          "chatId" in e && n(5, (c = e.chatId));
      }),
      [
        r,
        o,
        i,
        s,
        a,
        c,
        u,
        l,
        function () {
          u ? n(7, (l = !l)) : n(6, (u = !u));
        },
      ]
    );
  }
  var Eh = document.createElement("DIV"),
    kh = document.currentScript;
  const Sh = kh.getAttribute("data-website-owner-pubkey"),
    Ah = kh.getAttribute("data-chat-type");
  let Oh = kh.getAttribute("data-chat-tags"),
    Ch = kh.getAttribute("data-chat-id"),
    Ph = kh.getAttribute("data-chat-reference-tags"),
    Ih = kh.getAttribute("data-relays");
  kh.parentNode.insertBefore(Eh, kh),
    Ih ||
      (Ih =
        "wss://relay.f7z.io,wss://nos.lol,wss://relay.nostr.info,wss://nostr-pub.wellorder.net,wss://relay.current.fyi,wss://relay.nostr.band"),
    (Ih = Ih.split(",")),
    (Oh = Oh ? Oh.split(",") : []),
    (Ph = Ph ? Ph.split(",") : []),
    new (class extends ne {
      constructor(e) {
        super(),
          te(this, e, xh, _h, i, {
            websiteOwnerPubkey: 0,
            chatType: 1,
            chatTags: 2,
            chatReferenceTags: 3,
            relays: 4,
            chatId: 5,
          });
      }
    })({
      target: Eh,
      props: {
        websiteOwnerPubkey: Sh,
        chatType: Ah,
        chatTags: Oh,
        chatId: Ch,
        chatReferenceTags: Ph,
        relays: Ih,
      },
    });
})();
//# sourceMappingURL=bundle.js.map

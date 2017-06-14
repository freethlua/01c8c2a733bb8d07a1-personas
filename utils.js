import h from 'preact-hyperscript-h';
import linkstate from 'linkstate';
import uniq from 'array-uniq';
import Case from 'case';

export const input = (ctx, p, count = 0, {
  name = p.name || p,
  label = p.label || Case.upper(name),
} = {}) => h.div('.input', {
  class: [count && 'multi-line'].filter(Boolean)
}, [
  h.label({ for: count ? `${name}[0]` : name }, label + ':'),
  count ? h.ol(Array(count).fill(0).map((c, i) => h.li([h.input({
    id: `${name}[${i}]`,
    name: `${name}[${i}]`,
    onchange: e => {
      const state = {};
      state[name] = ctx.state[name] || [];
      state[name][i] = e.target.value
      ctx.setState(state);
    },
  })])))
  : h.input({
    id: name,
    name: name,
    onchange: linkstate(ctx, name),
  }),
]);

export const text = (ctx, p, {
  name = p.name || p,
  label = p.label || Case.upper(name),
} = {}) => h.div('.input', {
  // class: [count && 'multi-line'].filter(Boolean)
}, [
  h.label({ for: name }, label + ':'),
  h.textarea({
    id: name,
    name: name,
    onchange: linkstate(ctx, name),
  }),
]);

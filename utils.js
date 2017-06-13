import h from 'preact-hyperscript-h';
import linkstate from 'linkstate';
import uniq from 'array-uniq';
import Case from 'case';

export const input = (ctx, p, count = 0, {
  name = p.name || p,
  label = p.label || Case.upper(name),
} = {}) => h.div('.input', [
  h.label(label + ':'),
  count ? h.ol(Array(count).fill(0).map((c, i) => h.li([h.input({
    name: `name[${i}]`,
    onchange: e => {
      const state = {};
      state[name] = ctx.state[name] || [];
      state[name][i] = e.target.value
      ctx.setState(state);
    },
  })])))
  : h.input({
    name: p.name || p,
    onchange: linkstate(ctx, p.name || p),
  }),
]);

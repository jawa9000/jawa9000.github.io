export default {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
      },
      modules: 'auto',
      useBuiltIns: 'usage',
      corejs: 3,
      shippedProposals: true,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-runtime',
  ],
  sourceType: 'module',
};

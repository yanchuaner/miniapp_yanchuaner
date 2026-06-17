module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
    }],
  ],
  plugins: [
    '@babel/plugin-transform-class-properties',
  ],
}

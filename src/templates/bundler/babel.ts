import { stringify } from '../../utils'

export default stringify({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 1%, last 2 versions, not ie <= 8, android >= 4, ios >= 8, not dead'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        proposals: true
      }
    ]
  ]
})

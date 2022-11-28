import { stringify } from '../../utils'

export default stringify({
  presets: ['@babel/preset-env'],
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

import { stringify } from '../../utils'

export default function (type?: 'vueCli') {
  if (type === 'vueCli') {
    return stringify({
      presets: ['@vue/cli-plugin-babel/preset']
    })
  } else {
    return stringify({
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
  }
}

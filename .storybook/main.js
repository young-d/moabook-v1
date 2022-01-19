module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  webpackFinal: async config => {
    config.resolve.alias['@components'] = path.resolve(
      __dirname,
      '../src/components',
    )
    config.resolve.alias['@hooks'] = path.resolve(__dirname, '../src/hooks')
    config.resolve.alias['@utils'] = path.resolve(__dirname, '../src/utils')
    config.resolve.alias['@contexts'] = path.resolve(
      __dirname,
      '../src/contexts',
    )
    config.resolve.alias['@pages'] = path.resolve(__dirname, '../pages')
    return config
  },
}
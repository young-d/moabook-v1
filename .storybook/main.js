const path = require('path');
const fs = require("fs");

function getPackageDir(filepath) {
  let currDir = path.dirname(require.resolve(filepath));
  while (true) {
    if (fs.existsSync(path.join(currDir, "package.json"))) {
      return currDir;
    }
    const { dir, root } = path.parse(currDir);
    if (dir === root) {
      throw new Error(
        `Could not find package.json in the parent directories starting from ${filepath}.`
      );
    }
    currDir = dir;
  }
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
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
    config.resolve.alias["@emotion/core"] = getPackageDir("@emotion/react")
    config.resolve.alias["@emotion/styled"] = getPackageDir("@emotion/styled")
    config.resolve.alias["emotion-theming"] = getPackageDir("@emotion/react")
    
    return config;
  },
}

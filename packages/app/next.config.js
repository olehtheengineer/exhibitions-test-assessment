/* eslint-disable @typescript-eslint/no-var-requires */
const { PHASE_PRODUCTION_SERVER } = require('next/constants');

module.exports = (phase, options) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {};
  }

  const withPlugins = require('next-compose-plugins');
  const withTM = require('next-transpile-modules')([
    '@exhibition/design-system',
  ]);

  const plugins = [[withTM]];

  const config = {
    webpack: (webpackConfig) => {
      webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
        if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') {
          return false;
        }

        return true;
      });

      return webpackConfig;
    },
  };

  return withPlugins(plugins, config)(phase, options);
};

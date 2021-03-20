/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
    exclude: [
      '**/.*',
      '**/package.json',
      '**/LICENSE',
      '**/README.md',
      '**/tsconfig.json',
      '**/yarn.lock',
      '**/yarn-error.log',
    ],
    mount: {
      public: {
        url: '/',
      },
      src: {
        url: '/dist',
      },
    },
    plugins: [
      '@snowpack/plugin-dotenv',
      '@snowpack/plugin-typescript',
      '@hisystems/snowpack-plugin-postcss',
      '@snowpack/plugin-react-refresh',
      [
        '@snowpack/plugin-webpack',
        {
          sourceMap: false,
          outputPattern: {
            css: '[name].[contenthash:4].css',
            js: '[name].[contenthash:4].js',
            assets: '[name].[contenthash:4].[ext]',
          },
          manifest: true,
          htmlMinifierOptions: {
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          },
          failonWarnings: true,
        },
      ],
    ],
    packageOptions: {
      knownEntrypoints: ['react/jsx-runtime'],
    },
    devOptions: {
      open: 'none',
      port: 3000,
    },
    buildOptions: {
      sourcemap: false,
      baseUrl: '/',
      clean: true,
    },
    routes: [
        {
            match: 'routes',
            src: '.*',
            dest: '/index.html',
        },
    ],
    alias: {
      '@app': './src',
    },
  };
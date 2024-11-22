const CracoEsbuildPlugin = require('craco-esbuild');
const { ProvidePlugin } = require('webpack');

const cracoModuleFederation = require('@iobroker/adapter-react-v5/craco-module-federation');

module.exports = {
    plugins: [{ plugin: CracoEsbuildPlugin }, { plugin: cracoModuleFederation, options: { useNamedChunkIds: true } }],
    devServer: {
        proxy: {
            '/files': 'http://localhost:8081',
            '/adapterxxx': 'http://localhost:8081',
            '/adapter': 'http://localhost:4173',
            '/session': 'http://localhost:8081',
            '/log': 'http://localhost:8081',
            '/lib': 'http://localhost:8081',
        },
    },
    webpack: {
        output: {
            publicPath: './',
        },
        plugins: [
            new ProvidePlugin({
                React: 'react',
            }),
        ],
        configure: webpackConfig => {
            webpackConfig.output.publicPath = './';
            return webpackConfig;
        },
    },
};

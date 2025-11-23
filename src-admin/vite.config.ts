import react from '@vitejs/plugin-react';
//import commonjs from 'vite-plugin-commonjs';
import vitetsConfigPaths from 'vite-tsconfig-paths';
import { federation } from '@module-federation/vite';
import { moduleFederationShared } from '@iobroker/adapter-react-v5/modulefederation.admin.config';
import { readFileSync } from 'node:fs';
const pack = JSON.parse(readFileSync('./package.json').toString());

import path from 'path';

const config = {
    plugins: [
        react({ jsxRuntime: 'automatic' }),
        vitetsConfigPaths(),
        federation({
            manifest: true,
            name: 'ConfigCustomMytimeSet',
            filename: 'customComponents.js',
            exposes: {
                './Components': './src/Components.jsx',
            },
            remotes: {},
            shared: moduleFederationShared(pack),
        }),

        //commonjs(),
    ],
    server: {
        port: 3000,
        proxy: {
            '/files': 'http://localhost:8081',
            '/adapter': 'http://localhost:8081',
            '/session': 'http://localhost:8081',
            '/log': 'http://localhost:8081',
            '/lib': 'http://localhost:8081',
        },
    },
    base: './',
    resolve: {
        alias: {
            fs: path.resolve(__dirname, 'src/empty.js'),
            path: path.resolve(__dirname, 'src/empty.js'),
        },
    },

    build: {
        target: 'chrome89',
        outDir: './build',
        rollupOptions: {
            onwarn(warning: { code: string }, warn: (warning: { code: string }) => void): void {
                // Suppress "Module level directives cause errors when bundled" warnings
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return;
                }
                warn(warning);
            },
        },
    },
};

export default config;

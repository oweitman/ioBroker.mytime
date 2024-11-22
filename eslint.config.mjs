// ioBroker eslint template configuration file for js and ts files
// Please note that esm or react based modules need additional modules loaded.
import config, { reactConfig } from '@iobroker/eslint-config';

export default [
    ...config,
    ...reactConfig,
    {
        // specify files to exclude from linting here
        ignores: [
            'lib/tools.js',
            'lib/rrule.js',
            'widgets/mytime/js/mytime-dist.js',
            'widgets/mytime/js/flipclock.js',
            'widgets/mytime/js/bundle.js',
            'widgets/mytime/js/timezones.js',
            '.dev-server/**',
            'backup/**',
            '*.test.js',
            'test/**/*.js',
            '*.config.mjs',
            'build',
            'admin/build',
            'admin/words.js',
            'admin/admin.d.ts',
            '**/adapter-config.d.ts'
        ]
    },

    {
        // you may disable some 'jsdoc' warnings - but using jsdoc is highly recommended
        // as this improves maintainability. jsdoc warnings will not block buiuld process.
        rules: {
            // 'jsdoc/require-jsdoc': 'off',
        },
    },

];
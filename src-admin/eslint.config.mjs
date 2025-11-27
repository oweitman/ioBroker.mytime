import config, { reactConfig } from '@iobroker/eslint-config';
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    ...config,
    ...reactConfig,
    ...reactRefresh.configs.vite,
    {
        rules: {
            'no-new-func': 'warn',
            'no-extend-native': 'warn',
            'no-eval': 'warn',
        },
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.mjs'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // disable temporary the rule 'jsdoc/require-param' and enable 'jsdoc/require-jsdoc'
        rules: {
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-param': 'off',
            '@/no-duplicate-imports': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        ignores: ['build/**/*', 'dist/**/*', 'node_modules/**/*', '.__mf__temp/**/*'],
    },
];

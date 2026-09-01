// iobroker prettier configuration file
import prettierConfig from '@iobroker/eslint-config/prettier.config.mjs';

export default {
    ...prettierConfig,
    // uncomment next line if you prefer double quotes
    // singleQuote: false,
    overrides: [
        ...(prettierConfig.overrides || []),
        {
            files: 'admin/jsonConfig.json5',
            options: {
                parser: 'jsonc',
            },
        },
    ],
}

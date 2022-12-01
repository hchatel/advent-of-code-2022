module.exports = {
    extends: [
        '@thetribe/eslint-config',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:json/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        // Typescript
        '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': ['warning'],
        '@typescript-eslint/no-use-before-define': [1],
        // Global
        'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never', tsx: 'never' }],
        'import/no-cycle': 0,
        'import/prefer-default-export': 0,
        'no-shadow': 'off', // replaced by ts-eslint rule below
        // bug described here : https://github.com/typescript-eslint/typescript-eslint/issues/2502
        'no-use-before-define': [0],
        'no-console': 0,
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.test.ts'],
        },
        'import/resolver': {
            typescript: {},
        },
    },
};

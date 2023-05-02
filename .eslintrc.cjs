module.exports = {
    env: {
        es2022: true,
        node: true,
    },
    extends: [
        'eslint-config-shaunburdick/typescript'
        // 'eslint:recommended',
        // 'plugin:@typescript-eslint/recommended',
        // 'plugin:security/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['error', { tabWidth: 4 }],
    },
};

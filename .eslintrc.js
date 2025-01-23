module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowTaggedTemplates: true, // Allow tagged templates as standalone expressions
      },
    ],
  },
}

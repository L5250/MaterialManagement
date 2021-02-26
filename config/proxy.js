export default {
  dev: {
    '/api/': {
      target: 'http://140.249.217.89:63577',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    },
  },
  test: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'http://140.249.217.89:63577',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': '',
      },
    },
  },
};

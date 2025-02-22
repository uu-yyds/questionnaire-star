const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  devServer: {
    port: 8000,
    // proxy: {
    //   '/api': 'http://localhost:3005',
    // },
  },
};

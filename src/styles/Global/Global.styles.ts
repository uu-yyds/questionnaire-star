import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    line-height: 1.15; /* 使所有元素的默认行高一致 */
    -webkit-text-size-adjust: 100%; /* 防止 iOS 文本缩放 */
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.5;
    background-color: #f0f0f0; /* 示例背景色 */
    color: #333; /* 示例文本颜色 */
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit; /* 继承字体大小 */
    font-weight: inherit; /* 继承字体粗细 */
  }

  p {
    margin: 0; /* 去掉段落的默认外边距 */
  }

  a {
    text-decoration: none; /* 去掉链接的下划线 */
  }

  img {
    max-width: 100%; /* 使图片在小屏幕上自适应 */
    height: auto; /* 保持图像比例 */
  }

  button {
    font-family: inherit; /* 继承字体 */
    font-size: inherit; /* 继承字体大小 */
    line-height: inherit; /* 继承行高 */
    background: none; /* 去掉默认背景 */
    border: none; /* 去掉默认边框 */
    cursor: pointer; /* 鼠标指针变为手型 */
  }

  /* 其他元素的重置 */
  ul, ol {
    list-style: none; /* 去掉列表的默认样式 */
  }

  table {
    border-collapse: collapse; /* 合并表格边框 */
    border-spacing: 0; /* 去掉表格单元格的间距 */
  }

  div[role='button'] {
    outline: none;
  }
`;

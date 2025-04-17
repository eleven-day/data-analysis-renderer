# React 前端项目说明

本前端项目基于 [Create React App](https://github.com/facebook/create-react-app) 初始化，主要用于对接后端 API，实现 Markdown 内容的自动获取和展示。

## 快速开始

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm start
   ```

   启动后自动打开浏览器，访问 [http://localhost:3000](http://localhost:3000)。

## 功能说明

- 支持用户输入 API 地址，通过按钮一键获取后端分析结果/Markdown 内容。
- 适配 FastAPI 等后端，要求后端返回格式为：
  
  ```json
  {
    "text": "这里是 Markdown 正文内容"
  }
  ```

- 获取的内容会自动填写到编辑器或展示区域。

## 常见用法

1. 启动后端（如 FastAPI），确保接口可用，参考后端目录的 README。
2. 在页面“API 地址”输入框中输入后端接口地址（如 `http://localhost:8000/api/test-md`）。
3. 点击“Fetch Analysis”按钮，页面会自动展示获取到的 Markdown 内容。

## 跨域（CORS）提醒

如遇到 `Failed to fetch data from API` 或浏览器 CORS 报错，请确保后端已正确开启跨域支持。

## 其他命令

- `npm test`：启动测试
- `npm run build`：构建生产版本
- `npm run eject`：弹出配置（不推荐日常使用）

## 相关文档

- [Create React App 官方文档](https://facebook.github.io/create-react-app/docs/getting-started)
- [React 官方文档](https://reactjs.org/)

---

如需修改 API 对接、样式或功能，请参考 `src/components/ApiIntegration.tsx` 和 `src/services/api.ts` 文件。  

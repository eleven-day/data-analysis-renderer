# 数据分析前后端测试项目说明

本项目包含：
- 基于 FastAPI 的后端接口（测试用例：读取本地 `test.md` 文件并返回内容，生产可使用AI生成）
- 基于 React 的前端界面（支持 Markdown 渲染和可视化）

## 目录结构

```
.
├── tests/              # 后端目录
│   ├── main.py           # FastAPI 主程序
│   └── test.md           # 测试用 Markdown 文件
```

---

## 后端（FastAPI）启动说明

1. **安装依赖**

   ```bash
   pip install fastapi uvicorn
   ```

2. **准备测试 Markdown 文件**

   在 `backend` 目录下新建 `test.md`，内容示例：

   ```markdown
   # 这是测试 Markdown

   - 项目1
   - 项目2
   ```

3. **运行 FastAPI 服务**

   ```bash
   uvicorn main:app --reload
   ```

   默认监听在 `http://localhost:8000`

4. **测试接口**

   可以用浏览器或 curl 测试：

   ```
   http://localhost:8000/api/test-md
   ```

   返回格式为：

   ```json
   {
     "text": "# 这是测试 Markdown\n\n- 项目1\n- 项目2"
   }
   ```

---

## 前端（React）启动说明

1. **安装依赖**

   ```bash
   npm install
   ```

2. **启动开发服务器**

   ```bash
   npm start
   ```

   默认监听在 `http://localhost:3000`

3. **API 地址填写**

   在页面的“API 地址”输入框中，填写：

   ```
   http://localhost:8000/api/test-md
   ```

   点击“Fetch Analysis”按钮，编辑器会自动填入 `test.md` 的内容。

---

## 常见问题

### 1. 前端报 “Failed to fetch data from API”？

- 请确认 FastAPI 后端已启动，端口正确。
- 接口地址必须带上完整端口（如 `http://localhost:8000/api/test-md`）。
- 如有跨域（CORS）报错，请确保 `main.py` 中已添加如下 CORS 配置：

  ```python
  from fastapi.middleware.cors import CORSMiddleware

  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```

### 2. Markdown 渲染正常但 HTML 图表不显示？

- 请确保你在 Markdown 编辑器里插入的 `<script>` 用的是 `window.d3`，且只写 HTML 片段，不要有 `<html>`、`<body>` 标签。

---

## 其他说明

- 如需对接其他 API，只需更换 API 地址即可。
- 你也可以自行扩展后端逻辑，实现更智能的数据分析。

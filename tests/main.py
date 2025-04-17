from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # 测试可用，生产请指定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/test-md")
async def get_markdown():
    try:
        with open("test.md", "r", encoding="utf-8") as f:
            content = f.read()
        return {"text": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
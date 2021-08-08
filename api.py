#!/usr/bin/env python3
import uvicorn
from fastapi import FastAPI

from api.routers.github import github_router

app = FastAPI()

app.include_router(github_router)

@app.get('/')
async def root():
    return 'You have made it!'

if __name__== '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
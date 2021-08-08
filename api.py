#!/usr/bin/env python3
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.github import github_router

app = FastAPI()
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(github_router)

@app.get('/')
async def root():
    return 'You have made it!'

if __name__== '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
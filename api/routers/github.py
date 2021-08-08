#!/usr/bin/env python3
from fastapi import APIRouter

from api.services import github

github_router = APIRouter(prefix="/api/github")

@github_router.get('/{user_name}')
async def get_size_of_repos(user_name:str):
    return await github.get_size_of_repos(user_name)
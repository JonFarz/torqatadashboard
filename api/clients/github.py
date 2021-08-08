#!/usr/bin/env python3
import requests

_api_root = 'https://api.github.com'
_api_root_users = f'{_api_root}/users'

async def get_user_orgs(userName:str):
    return requests.get(f'{_api_root_users}/{userName}/orgs').json()

async def get_user_repos(userName:str):
    return requests.get(f'{_api_root_users}/{userName}/repos').json()
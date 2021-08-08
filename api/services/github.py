#!/usr/bin/env python3
from typing import List

from api.clients import github
from api.models.github import UserRepoSize


async def get_size_of_repos(user_name: str) -> List[UserRepoSize]:
    data = await github.get_user_repos(user_name)
    return list(map(lambda x: UserRepoSize(user_name=user_name, repo_name=x['name'], size=x['size']), data))

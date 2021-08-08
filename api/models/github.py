#!/usr/bin/env python3
from pydantic import BaseModel


class UserRepoSize(BaseModel):
    user_name:str
    repo_name:str
    size:int
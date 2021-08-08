import { Component, OnInit } from '@angular/core';
import {GithubService} from "../github.service";

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  githubUserName = null;

  constructor(private gitHubService: GithubService) { }

  ngOnInit(): void {
  }

  submit(){
    this.gitHubService.getRepoInformationForUser(this.githubUserName);
  }

}

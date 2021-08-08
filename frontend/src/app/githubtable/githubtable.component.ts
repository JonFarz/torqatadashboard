import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GithubService} from "../github.service";
import {Githubrepo} from "../interfaces/githubrepo";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-githubtable',
  templateUrl: './githubtable.component.html',
  styleUrls: ['./githubtable.component.scss']
})
export class GithubtableComponent{
  dataSource: MatTableDataSource<Githubrepo>;
  displayedColumns: string[] = ['user_name', 'repo_name', 'size'];

  constructor(private githubService: GithubService) {
    this.githubService.getData().subscribe(d => {
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
}

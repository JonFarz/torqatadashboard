import {Component, ViewChild} from '@angular/core';
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
export class GithubtableComponent {
  dataSourceFull: MatTableDataSource<Githubrepo>;
  dataSource: MatTableDataSource<Githubrepo>;
  displayedColumns: string[] = ['user_name', 'repo_name', 'size'];
  searchCriteria: string

  constructor(private githubService: GithubService) {
    this.githubService.getData().subscribe(d => {
      this.dataSourceFull = new MatTableDataSource(d);
      this.dataSourceFull.sort = this.sort;
      this.dataSourceFull.paginator = this.paginator;
      this.dataSource = this.dataSourceFull;
    });
  }

  filter(evnt: any) {
    if (evnt == '') {
      this.dataSource = this.dataSourceFull;
    } else {
      this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => filterFunc(x, evnt)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
}

function filterFunc(ghr: Githubrepo, text: string) {
  let lowerText = text.toLowerCase();
  return ghr.repo_name.toLowerCase().includes(lowerText) || ghr.user_name.toLowerCase().includes(lowerText) || ghr.size.toString().toLowerCase().includes(lowerText)
}

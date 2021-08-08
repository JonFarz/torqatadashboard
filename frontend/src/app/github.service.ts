import {Injectable} from '@angular/core';
import {Githubrepo} from "./interfaces/githubrepo";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, EMPTY, from, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private data = new BehaviorSubject<Githubrepo[]>([]);

  constructor(private http: HttpClient) {
  }

  getRepoInformationForUser(userName?: string | undefined | null): void {
    this.http.get<Githubrepo[]>(`http://localhost:8000/api/github/${userName}`).subscribe(d => this.data.next(d));
  }

  getData(){
    return this.data.asObservable();
  }
}

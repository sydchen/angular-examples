import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Commit, Repo } from './commit';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  commits: Commit[];
  repos$: Observable<Repo[]>;
  private searchTerms = new Subject<string>();

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.repos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.githubService.searchRepos(term)),
    ).subscribe();    
    this.getCommits();
  }
  
  search(term: string): void {
    console.log("search: " + term);
    this.searchTerms.next(term);
  }

  getCommits(): void {
    this.githubService.getCommits()
    .subscribe(commits => this.commits = commits)
  }
}

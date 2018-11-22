import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Repo } from './models/github';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-search-repo',
  templateUrl: './search-repo.component.html',
  styleUrls: ['./search-repo.component.css']
})
export class SearchRepoComponent implements OnInit {
  repos$: Observable<Repo[]>;
  private searchTerms = new Subject<string>();

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.repos$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.githubService.searchRepos(term))
    );
  }

  search(term: string): void {
    console.log("search: " + term);
    this.searchTerms.next(term);
  }

}

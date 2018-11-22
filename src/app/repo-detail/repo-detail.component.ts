import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Commit } from '../models/github';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.css']
})
export class RepoDetailComponent implements OnInit {
  commits: Observable<Commit[]>;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) { }

  ngOnInit() {
    this.getCommits();
  }

  getCommits(): void {
    const owner = this.route.snapshot.paramMap.get('owner');
    const repo = this.route.snapshot.paramMap.get('repo');
    this.githubService.getCommits(owner, repo)
      .subscribe(commits => this.commits = commits)
  }
}

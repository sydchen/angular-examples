import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Commit, Repo } from './commit';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubApiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  searchRepos(term: string): Observable<Repo[]> {
    const resource = '/search/repositories';
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Repo[]>(`${this.githubApiUrl}${resource}?q=${term}`).pipe(
      tap(_ => console.log(`found repos matching "${term}"`)),
      catchError(this.handleError<Repo[]>('searchRepos', []))
    );
  }

  getCommits(): Observable<Commit[]> {
    const resource = '/repos/sydchen/todolist/commits';
    return this.http.get<Commit[]>(`${this.githubApiUrl}${resource}`)
      .pipe(
        map(resp =>
          return <Commit[]>resp.map(json => 
            return { 
              sha: json['sha'],
              author: json['commit']['author']['name'],
              date: json['commit']['author']['date'],          
              message: json['commit']['message']              
            } 
          )
        ),
        tap(json => console.log(json)),
        catchError(this.handleError('getCommits', []))
      );    
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

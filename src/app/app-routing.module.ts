import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchRepoComponent } from './search-repo/search-repo.component';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/repos', pathMatch: 'full' },
  { path: 'repos', component: SearchRepoComponent },
  { path: 'repo/:owner/:repo', component: RepoDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

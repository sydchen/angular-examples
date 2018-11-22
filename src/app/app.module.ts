import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';
import { SearchRepoComponent } from './search-repo/search-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    RepoDetailComponent,
    SearchRepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

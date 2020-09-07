import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'posts', loadChildren: () => import('../../src/app/submodules/posts/posts.module').then(m => m.PostsModule) },
  { path: 'users', loadChildren: () => import('../../src/app/submodules/users/users.module').then(m => m.UsersModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

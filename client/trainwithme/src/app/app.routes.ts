import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { BlogsComponent } from './features/blogs/blogs.component';
import { ErrorComponent } from './shared/error/error.component';
import { ArticleCreateComponent } from './features/dashboard/article-create/article-create.component';
import { AuthGuard } from './guards/auth.guard';
import { ArticleEditComponent } from './features/dashboard/article-edit/article-edit.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-article/:articleId',
    component: ArticleEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create-articles', component: ArticleCreateComponent },

  { path: 'about', component: AboutComponent },
  {
    path: 'trainer',
    loadComponent: () =>
      import('./features/trainer/trainer.component').then(
        (c) => c.TrainerComponent
      ),
  },
  {
    path: 'blogs',
    children: [
      { path: '', component: BlogsComponent },
      {
        path: ':themeId',
        loadComponent: () =>
          import('./features/blogs/blog-item/blog-item.component').then(
            (c) => c.BlogItemComponent
          ),
      },
    ],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

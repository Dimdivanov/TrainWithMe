import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { TrainerComponent } from './features/trainer/trainer.component';
import { BlogsComponent } from './features/blogs/blogs.component';
import { ErrorComponent } from './shared/error/error.component';
import { BlogItemComponent } from './features/blogs/blog-item/blog-item.component';
import { ArticleCreateComponent } from './features/dashboard/article-create/article-create.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  { path: 'create-articles', component: ArticleCreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'trainer', component: TrainerComponent },
  {
    path: 'blogs',
    children: [
      { path: '', component: BlogsComponent },
      {
        path: ':themeId',
        component: BlogItemComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

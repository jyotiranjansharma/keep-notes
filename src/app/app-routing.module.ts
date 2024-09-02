import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { EditNotesComponent } from './notes/edit-notes/edit-notes.component';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { CandeactivateGuard } from './auth/candeactivate.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'notes', component: NotesListComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'add', component: AddNotesComponent },
            { path: 'edit/:id', component: EditNotesComponent, canDeactivate: [CandeactivateGuard] }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

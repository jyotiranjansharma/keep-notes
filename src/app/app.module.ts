import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AddNotesComponent } from './notes/add-notes/add-notes.component';
import { EditNotesComponent } from './notes/edit-notes/edit-notes.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/shared/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/shared/login/login.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppState } from './shared/state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffect } from './shared/state/notes/notes.effects';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { ReusableButtonComponent } from './components/reusableComponent/reusable-button/reusable-button.component';
import { SafeHtmlComponent } from './dom-sanitizer/safe-html/safe-html.component';

@NgModule({
    declarations: [
        AppComponent,
        NotesListComponent,
        AddNotesComponent,
        EditNotesComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        HighlightDirective,
        FilterPipe,
        ReusableButtonComponent,
        SafeHtmlComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(AppState),
        StoreDevtoolsModule.instrument({ maxAge: false, logOnly: !isDevMode() }),
        EffectsModule.forRoot([NotesEffect])
    ],
    providers: [ 
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

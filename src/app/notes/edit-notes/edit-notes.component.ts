import { AfterViewChecked, Component, DoCheck, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CanComponentDeactivate, CandeactivateGuard } from 'src/app/auth/candeactivate.guard';
import { DataSourceService } from 'src/app/shared/data-source.service';
import { AppStateModel } from 'src/app/shared/state/appstate.model';
import { updateNote } from 'src/app/shared/state/notes/notes.actions';

@Component({
    selector: 'app-edit-notes',
    templateUrl: './edit-notes.component.html',
    styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit, DoCheck, CandeactivateGuard {

    authService = inject(AuthService)
    editNotesForm!: FormGroup
    dataSource = inject(DataSourceService)
    router = inject(Router)
    route = inject(ActivatedRoute)
    fb = inject(FormBuilder)
    note: any
    store = inject(Store<AppStateModel>)
    hasUnsavedChanges: boolean = false;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.dataSource.getNoteById(id).subscribe(note => {
                this.note = note.data;
                localStorage.setItem('noteId', this.note._id)
                this.createEditForm()
            })
        })
    }

    ngDoCheck() {
        console.log('changes detcted');
        this.hasUnsavedChanges = true
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.hasUnsavedChanges) {
            return confirm('You have unsaved changes! Do you really want to leave?');
        }
        return true;
    }

    createEditForm() {
        this.editNotesForm = this.fb.group({
            title: new FormControl(this.note.title),
            details: new FormControl(this.note.details),
            createdBy: new FormControl(this.note.createdBy),
            noteType: new FormControl(this.note.noteType)
        })
    }

    editNote() {
        const title = this.editNotesForm.value.title;
        const createdBy = this.editNotesForm.value.createdBy;
        const noteType = this.editNotesForm.value.noteType;
        const details = this.editNotesForm.value.details;

        const note = {
            _id: localStorage.getItem('noteId'),
            title,
            createdBy,
            noteType,
            details
        }

        this.store.dispatch(updateNote({noteInput: note}))
        alert("Note updated. Thank you.");
        this.editNotesForm.reset();
        // this.dataSource.getallnotes()
        this.router.navigate(['notes'])
        
        // this.dataSource.updateNote({note}).subscribe({
        //     next:(res) => {
        //         alert("Note updated. Thank you.");
        //         this.editNotesForm.reset();
        //         this.router.navigate(['notes'])
        //         this.dataSource.getAllNotes()
        //     },
        //     error: (err) => {
        //         console.log(err);
        //     }
        // })
    }

}

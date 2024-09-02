import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataSourceService } from 'src/app/shared/data-source.service';
import { AppStateModel } from 'src/app/shared/state/appstate.model';
import { addNote } from 'src/app/shared/state/notes/notes.actions';

@Component({
    selector: 'app-add-notes',
    templateUrl: './add-notes.component.html',
    styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
    fb = inject(FormBuilder)
    router = inject(Router)
    notesForm!: FormGroup
    dataSource = inject(DataSourceService)
    store = inject(Store<AppStateModel>)

    ngOnInit() {
        this.notesForm = this.fb.group({
            title: ['', Validators.required],
            createdBy: [''],
            noteType: [''],
            details: [''],
        })

        this.notesForm.patchValue({ //you have to pass any value (one or all) it will set the values
            createdBy: localStorage.getItem('username') || ''
        })

        // this.notesForm.setValue({ //you have pass all the values(strictly all values) for setValue to set the values
        //     noteType: 'General'
        // })
    }

    addNote() {
        if(this.notesForm.valid) {
            this.store.dispatch(addNote({noteInput: this.notesForm.value}))
            alert("A new note has been added. Thank you.");
            this.notesForm.reset();
            // this.dataSource.getAllNotes()
            this.router.navigate(['notes'])
            // this.dataSource.getallnotes()
            // this.dataSource.createANote(this.notesForm.value).subscribe({
            //     next:(res) => {
            //         alert("A new note has been added. Thank you.");
            //         this.notesForm.reset();
            //         this.router.navigate(['notes'])
            //         this.dataSource.getAllNotes()
            //     },
            //     error: (err) => {
            //         console.log(err);
            //     }
            // })
        }
    }

}

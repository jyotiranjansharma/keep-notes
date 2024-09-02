import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataSourceService } from 'src/app/shared/data-source.service';
import { AppStateModel } from 'src/app/shared/state/appstate.model';
import { deleteNote, loadNotes } from 'src/app/shared/state/notes/notes.actions';
import { INotes } from 'src/app/shared/state/notes/notes.model';
import { getNotes } from 'src/app/shared/state/notes/notes.selector';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    notesList: any;
    notes!: INotes[]
    router = inject(Router)
    store = inject(Store<AppStateModel>)
    searchTerm: string = ''
    filteredNotes: any;
    ngZone = inject(NgZone)
    title = 'default title'

    constructor() {
        // Run code inside Angular's zone
        this.ngZone.run(() => {
            this.title = 'Running inside Angular Zone';
        });
    }
    

    ngOnInit() {
        // this.subscription = this.dataSource.dataSource$.subscribe({
        //     next:(notes) => this.notesList = notes
        // });

        this.store.dispatch(loadNotes())
        this.subscription = this.store.select(getNotes).subscribe(notes => {
            this.notesList = notes
            this.filteredNotes = notes

        })

        // Run code outside Angular's zone
        this.ngZone.runOutsideAngular(() => {
            this.title = 'Running outside Angular Zone';
            // Changes to `title` here won't trigger change detection
        });
    }

    updateNote(note: any) {
        scrollTo(0, 0);
        const noteId = note._id
        this.router.navigate([`notes/edit/${noteId}`])
    }

    deleteNote(note: any) {
        if(confirm("Are you sure to delete ?")) {
            // this.dataSource.deleteNote(note._id).subscribe({
            //     next: (res) => {
            //         this.dataSource.getAllNotes()
            //     },
            //     error: (err) => {
            //         console.log(err);
            //     }
            // })
            this.store.dispatch(deleteNote({id: note._id}))
        }
    }

    filterNotes() {
        if (this.searchTerm) {
            this.filteredNotes = this.notesList.filter((note: any) =>
                note.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                note.createdBy.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                note.noteType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                note.details.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        } else {
            this.filteredNotes = this.notesList;
        }
    }



    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
    
}

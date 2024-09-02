import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DataSourceService } from "../../data-source.service";
import { Injectable } from "@angular/core";
import { ADD_NOTE, addNote, addnotesuccess, deleteNote, deletenotesuccess, LOAD_NOTES, loadnotesfail, loadnotessuccess, updateNote, updatenotesuccess } from "./notes.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";

// Effects: Effects handle side effects, like fetching data from a server. 
// They listen for actions dispatched from the store, perform some work (e.g., asynchronous tasks), and then dispatch a new action.

@Injectable()
export class NotesEffect {
    constructor(private action$: Actions, private dataService: DataSourceService) {}    

    _notes = createEffect(() => 
        this.action$.pipe(
            ofType(LOAD_NOTES),
            switchMap((action) => {
                return this.dataService.getallnotes().pipe(
                    map((data) => {
                        data.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                        return loadnotessuccess({notes: data})
                    }),
                    catchError((_error) => of(loadnotesfail({errortext: _error.message})))
                )
            })
        )
    )

    _addNote = createEffect(() => 
        this.action$.pipe(
            ofType(addNote),
            switchMap(action => {
                return this.dataService.createANote(action.noteInput).pipe(
                    map((data) => {
                        return addnotesuccess({noteInput: action.noteInput})
                    }),
                    catchError((_error) => of(loadnotesfail({errortext: _error.message})))
                )
            })
        )
    )

    _updateNote = createEffect(() => 
        this.action$.pipe(
            ofType(updateNote),
            switchMap(action => {
                return this.dataService.updateNote(action.noteInput).pipe(
                    map((data) => {
                        return updatenotesuccess({noteInput: action.noteInput})
                    }),
                    catchError((_error) => of(loadnotesfail({errortext: _error.message})))
                )
            })
        )
    )

    _deleteNote = createEffect(() => 
        this.action$.pipe(
            ofType(deleteNote),
            switchMap(action => {
                return this.dataService.deleteNote(action.id).pipe(
                    map((data) => {
                        return deletenotesuccess({id: action.id})
                    })
                )
            })
        )
    )
}
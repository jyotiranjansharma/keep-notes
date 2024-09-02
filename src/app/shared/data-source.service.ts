import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { apiUrls } from '../api.urls';
import { INotes } from './state/notes/notes.model';

@Injectable({
    providedIn: 'root'
})
export class DataSourceService {

    private dataSource = new BehaviorSubject<any>([])
    dataSource$ = this.dataSource.asObservable()
    noteslist !: any
    private apiUrl = 'https://fakestoreapi.com/products';
    constructor(private http: HttpClient) { 
        // this.getAllNotes()
    }

    // getAllNotes() {
    //     this.http.get<any>(`${apiUrls.notes}`).subscribe(notes => {
    //         notes.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    //         this.dataSource.next(notes)
    //     })
    // }
    fetchFirstTenResults(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            take(10), // Take only the first 10 results
            map(products => products.slice(0, 10))
        );
    }

    getallnotes(): Observable<INotes[]> {
        return this.http.get<INotes[]>(`${apiUrls.notes}`)
    }

    createANote(noteObj: any) {
        return this.http.post<any>(`${apiUrls.note}create`, noteObj).pipe(
            tap(() => {
                this.http.get<INotes>("");
                // this.getAllNotes()
            })
        )
    }

    getNoteById(noteId: any) {
        return this.http.get<any>(`${apiUrls.note}getNoteById/${noteId}`)
    }

    updateNote(noteObj: any) {
        return this.http.put<any>(`${apiUrls.note}updateNote/${noteObj._id}`, noteObj);
    }

    deleteNote(notrId: any) {
        return this.http.delete<any>(`${apiUrls.note}deleteNote/${notrId}`)
    }
}

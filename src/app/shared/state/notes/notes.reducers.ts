import { createReducer, on } from "@ngrx/store";
import { initialState } from "./notes.state";
import { addNote, addnotesuccess, deleteNote, loadNotes, loadnotesfail, loadnotessuccess, updatenotesuccess } from "./notes.actions";
import { INotes } from "./notes.model";

// Reducers: Reducers are pure functions that take the current state and an action, and return a new state. 
// They specify how the application's state changes in response to actions sent to the store.

const _notesReducer = createReducer(initialState,
    on(loadNotes, (state) => {
        return {
            ...state
        }
    }),
    on(loadnotessuccess, (state, action) => {
        return {
            ...state,
            notes: [...action.notes],
            Errormessage: ''
        }
    }),
    on(loadnotesfail, (state, action) => {
        return {
            ...state,
            notes: [],
            Errormessage: action.errortext
        }
    }),
    // on(addNote, (state, action) => {
    //     const _note = {...action.noteInput}
    //     return {
    //         ...state,
    //         notes: [...state.notes, _note]
    //     }
    // }),
    on(addnotesuccess, (state, action) => { 
        const _note = {...action.noteInput}
        return {
            ...state,
            notes: [...state.notes, _note]
        }
    }),
    on(updatenotesuccess, (state, action) =>{
        const _note = {...action.noteInput}
        const updatedNote = state.notes.map(note => {
            return _note._id === note._id ? _note : note
        })
        return {
            ...state,
            notes: updatedNote
        }
    }),
    on(deleteNote, (state, action) => {
        const updatedNote = state.notes.filter((data: INotes) => {
            console.log('data in delete reducer', data, action);
            return data._id !== action.id
        });

        return{
            ...state,
            notes: updatedNote
        // IsLoaded:false
        }
    })
)

export function notesReducer(state: any, action: any) {
    return _notesReducer(state, action)
}
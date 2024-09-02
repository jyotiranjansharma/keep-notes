import { createFeatureSelector, createSelector } from "@ngrx/store";
import { INotes, Notes } from "./notes.model";

// Selectors: Selectors are pure functions used to obtain slices of store state.

const getNotesState = createFeatureSelector<Notes>('notes')

export const getNotes = createSelector(getNotesState, (state) => {
    return state.notes
})

export const getNotebyId = (noteId: any) => createSelector(getNotesState, (state) => {
    return state.notes.find((note:INotes)=> note._id===noteId) as INotes;
})
import { createAction, props } from "@ngrx/store";
import { INotes } from "./notes.model";

// Actions: Actions are payloads of information that send data from your application to your store. 
// They are the only source of information for the store. Actions are plain JavaScript objects with a type property.

export const LOAD_NOTES = '[notes page] load notes';
export const LOAD_NOTES_SUCCESS = '[notes page] load notes success';
export const LOAD_NOTES_FAIL = '[notes page] load notes fail';

export const ADD_NOTE = '[notes page] add note';
export const ADD_NOTE_SUCCESS = '[notes page] add note success';

export const UPDATE_NOTE = '[notes page] update note';
export const UPDATE_NOTE_SUCCESS = '[notes page] update note success';

export const DELETE_NOTE = '[notes page] delete note';
export const DELETE_NOTE_SUCCESS = '[notes page] delete note success';

export const loadNotes = createAction(LOAD_NOTES);
export const loadnotessuccess = createAction(LOAD_NOTES_SUCCESS, props<{notes: INotes[]}>());
export const loadnotesfail = createAction(LOAD_NOTES_FAIL, props<{errortext: string}>());

export const addNote = createAction(ADD_NOTE, props<{noteInput: INotes}>());
export const addnotesuccess = createAction(ADD_NOTE_SUCCESS, props<{noteInput: INotes}>());

export const updateNote = createAction(UPDATE_NOTE, props<{noteInput: INotes}>());
export const updatenotesuccess = createAction(UPDATE_NOTE_SUCCESS, props<{noteInput: INotes}>());

export const deleteNote = createAction(DELETE_NOTE, props<{id: any}>());
export const deletenotesuccess = createAction(DELETE_NOTE_SUCCESS, props<{id: any}>());
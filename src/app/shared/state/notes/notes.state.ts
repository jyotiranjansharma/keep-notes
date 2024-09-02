import { INotes, Notes } from "./notes.model";

// State: The single source of truth for your application's state. 
// It is an immutable data structure representing the current state of the application.

export const initialState: Notes = {
    notes: [
        
    ],
    Errormessage: ''
}
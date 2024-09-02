export interface INotes {
    _id: any,
    title: string,
    createdBy: string,
    noteType: string,
    details: string,
}

export interface Notes {
    notes: INotes[],
    Errormessage: string
}
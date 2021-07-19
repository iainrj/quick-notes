export interface Note {
  id: number,
  title: string,
  content: string,
  status: "New" | "Completed" | "Not completed",
}

export interface Store {
  notes: Note[]
}

export type NoteKey = 'id' | 'title' | 'content' | 'status';
export interface SortOrder {
  id: "asc" | "desc",
  title: "asc" | "desc",
  content: "asc" | "desc",
  status: "asc" | "desc" ,
}
import { Note } from "./appTypes";

export const defaultData: Note[] = [
    {
        "id": 2,
        "title": "delectus aut autem",
        "content": "Lorem ipsum",
        "status": "Not completed"
    },
    {
        "id": 1,
        "title": "quis ut nam facilis et officia qui",
        "content": "Lorem ipsum",
        "status": "Completed"
    },
    {
        "id": 3,
        "title": "fugiat veniam minus",
        "content": "Lorem ipsum",
        "status": "Not completed"
    }
];

// Mock an api with a promise returning the fake data
export const fetchData = (): Promise<Note[]> => {
    return new Promise((resolve) => {
        resolve(defaultData);
    });
};

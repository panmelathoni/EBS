import { Person } from './person.model';
export interface Family {
    id?: number,
    name: string,
    max_persons: number,
    persons: Person[]
}
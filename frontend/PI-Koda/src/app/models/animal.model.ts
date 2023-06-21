import { Shelter } from "./shelter.model";

export class Animal {
    id!: string;
    name!: string;
    animal_type!: string;
    breed!: string;
    gender!: string;
    date_birth!: Date;
    description!: string;
    photo!: string;
    shelter!: Shelter;
}
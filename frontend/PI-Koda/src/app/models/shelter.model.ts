import { Animal } from "./animal.model";
import { City } from "./city.model";
import { User } from "./user.model";

export class Shelter {
    id!: string;
    name!: string;
    email!: string;
    photo!: string;
    description!: string;
    animals!: Animal[];
    user!: User;
    city!: City;
}
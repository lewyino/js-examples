import { Person } from './person.js'

export class Employee extends Person {
    constructor(firstname, lastname, company) {
        super(firstname, lastname);
        this.company = company;
    }
}

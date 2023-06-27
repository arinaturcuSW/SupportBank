import Person from "./person";
import { Transaction } from "./types";
export default class Commander {
    persons: Person[];
    transactions: Transaction[];

    constructor() {
        this.persons = [];
        this.transactions = [];
    }

    public processTransaction(transaction: Transaction) {
        this.transactions.push(transaction);

        const from: Person | undefined = this.persons.find(p => p.getName() === transaction.From);
        const to: Person | undefined = this.persons.find(p => p.getName() === transaction.To);

        this.updateAccount(from, transaction, false);
        this.updateAccount(to, transaction, true);
    }

    public updateAccount(person: Person | undefined, transaction: Transaction, receives: boolean): void {
        if (!person) {
            person = new Person(receives ? transaction.To : transaction.From);
            this.persons.push(person);
        }

        receives ?
            person.addValue(Number(transaction.Amount)) :
            person.subtractValue(Number(transaction.Amount));

        person.addTransaction(transaction);
    }

    public listAll() {
        console.log(this.persons.map((p: Person) => {
            return {
                name: p.getName(),
                balance: p.getAccountValue(),
            }
        }));
    }

    public listAccount(name:string) {
        const person = this.persons.find((p: Person) => p.getName() === name);

        if (!person) {
            console.log('Invalid name!');
            return;
        }

        console.log(person.getTransactions());
    }
}

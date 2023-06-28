import Person from './person';
import { Transaction } from './types';

const log4js = require('log4js');
const logger = log4js.getLogger('manager.ts');

export default class Manager {
    private persons: Person[];

    constructor() {
        this.persons = [];
    }

    public processTransaction(transaction: Transaction) {
        const from: Person | undefined = this.persons.find(p => p.getName() === transaction.From);
        const to: Person | undefined = this.persons.find(p => p.getName() === transaction.To);

        this.updateAccount(from, transaction, false);
        this.updateAccount(to, transaction, true);
    }

    public updateAccount(person: Person | undefined, transaction: Transaction, receives: boolean): void {
        const amount: number = Number(transaction.Amount);

        if (!person) {
            const name = receives ? transaction.To : transaction.From;
            person = new Person(name);
            this.persons.push(person);

            logger.debug('New person with the name of ' + name + ' added.');
        }

        if (Number.isNaN(amount)) {
            logger.debug('This amount is not a number: ' + transaction.Amount);
            return;
        }

        logger.debug('Process amount ' + amount + ' on ' + person.getName());

        receives ?
            person.addValue(amount) :
            person.subtractValue(amount);

        person.addTransaction(transaction);
    }

    public getPersons(): Person[] {
        return this.persons;
    }

    public listAll(): void {
        logger.debug('Listing all persons.');
        console.log(this.persons.map((p: Person) => {
            return {
                name: p.getName(),
                balance: p.getAccountValue(),
            }
        }));
    }

    public listAccount(name: string): void {
        logger.debug('Listing transactions for ' + name);
        const person = this.persons.find((p: Person) => p.getName() === name);

        if (!person) {
            console.log('Invalid name!');
            return;
        }

        console.log(person.getTransactions());
    }

    public reset() {
        this.persons = [];
    }
}

import {Transaction} from "./types";

export default class Person {
    name: string;
    accountValue: number;
    transactions: Transaction[];

    constructor(name: string, amount: number = 0) {
        this.name = name;
        this.accountValue = amount;
        this.transactions = [];
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }

    addValue(amount: number) {
        this.accountValue += amount;
    }

    subtractValue(amount: number) {
        this.accountValue -= amount;
    }

    getName(): string {
        return this.name;
    }

    getAccountValue(): number {
        return this.accountValue;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }
}
import { Transaction } from './types';

export default class Person {
    private readonly name: string;
    private readonly transactions: Transaction[];
    private accountValue: number;

    constructor(name: string, amount: number = 0) {
        this.name = name;
        this.accountValue = amount;
        this.transactions = [];
    }

    public addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }

    public addValue(amount: number) {
        this.accountValue += amount;
    }

    public subtractValue(amount: number) {
        this.accountValue -= amount;
    }

    public getName(): string {
        return this.name;
    }

    public getAccountValue(): number {
        return this.accountValue;
    }

    public getTransactions(): Transaction[] {
        return this.transactions;
    }
}
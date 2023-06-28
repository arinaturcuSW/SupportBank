import { parse } from 'csv-parse/sync';
import { XMLParser } from 'fast-xml-parser';
import { Transaction, TransactionJSON, TransactionXML } from './types';
import { json2Transaction, xml2Transaction } from '../utils/utils';
import Manager from './manager';

const fs = require('fs');

export default class Handler {
    private filePath: string;
    private readonly manager: Manager;

    constructor() {
        this.filePath = '';
        this.manager = new Manager();
    }

    public handleCSVFile(): void {
        const input = fs.readFileSync(this.filePath);
        const data = parse(input, {
            columns: true,
            skip_empty_lines: true
        });

        data.map((transaction: Transaction) => {
            this.manager.processTransaction(transaction);
        });
    }

    public handleJSONFile(): void {
        const jsonRaw = fs.readFileSync(this.filePath);

        const data: TransactionJSON[] = JSON.parse(jsonRaw);
        data.map((transaction: TransactionJSON) => {
            this.manager.processTransaction(json2Transaction(transaction));
        });
    }

    public handleXMLFile(): void {
        const xmlRaw = fs.readFileSync(this.filePath);
        const parser = new XMLParser({ignoreAttributes: false});
        const json = parser.parse(xmlRaw);

        const data: TransactionXML[] = json?.TransactionList?.SupportTransaction;
        data.map((transaction: TransactionXML) => {
            this.manager.processTransaction(xml2Transaction(transaction));
        });
    }

    public loadFile() {
        this.manager.reset();

        console.log('Reading file...');
        const [extension] = this.filePath.split('.').splice(-1);
        switch (extension) {
            case 'csv':
                this.handleCSVFile();
                break;
            case 'json':
                this.handleJSONFile();
                break;
            case 'xml':
                this.handleXMLFile();
                break;
            default:
                console.log('Unsupported file type! Enter a CSV or a JSON file.');
                return;
        }

        console.log('File ' + this.filePath + ' loaded. Ready to receive commands!');
    }

    public getManager(): Manager {
        return this.manager;
    }

    public setFilePath(filePath: string): void {
        this.filePath = filePath;
    }
}
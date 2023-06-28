import Manager from "./src/manager";
import {Transaction, TransactionJSON} from "./src/types";
import { parse } from 'csv-parse/sync';

const readlineSync = require('readline-sync');
const fs = require('fs');
const log4js = require('log4js');

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

const logger = log4js.getLogger('index.ts');
const manager: Manager = new Manager();

function json2Transaction(transaction: TransactionJSON): Transaction {
    return {
        Date: transaction.Date,
        From: transaction.FromAccount,
        To: transaction.ToAccount,
        Narrative: transaction.Narrative,
        Amount: transaction.Amount
    }
}

function handleCSVFile(path: string): void {
    console.log('Reading file...');

    const input = fs.readFileSync(path);
    const data = parse(input, {
        columns: true,
        skip_empty_lines: true
    });

    data.map((transaction: Transaction) => {
        manager.processTransaction(transaction);
    });

    console.log("Done. Ready to receive commands!");
}

function handleJSONFile(path: string): void {
    console.log('Reading file...');
    const jsonRaw = fs.readFileSync(path);
    const data: TransactionJSON[] = JSON.parse(jsonRaw);

    data.map((transaction: TransactionJSON) => {
        manager.processTransaction(json2Transaction(transaction));
    });

    console.log("Done. Ready to receive commands!");
}

function processCommands(): void {
    while (true) {
        const command = readlineSync.question('> ');
        logger.debug('Processing command "' + command + '"');

        if (command === 'exit') {
            break;
        }

        const commandSplit = command.split(' ');

        if (commandSplit.length < 2 || !['list', 'import'].includes(commandSplit[0].toLowerCase())) {
            logger.debug('Command does not start with "list" or "import"');
            console.log('Invalid command!');
            continue;
        }

        if (command.toLowerCase().startsWith("import file") && commandSplit[2]?.length > 0) {
            loadFile(commandSplit[2]);
            continue;
        }

        if (commandSplit[1].toLowerCase() === 'all') {
            if (manager.getPersons().length === 0) {
                console.log('No data. Maybe try to import the file?');
                continue;
            }

            manager.listAll();
            continue;
        }

        manager.listAccount([...commandSplit].splice(1).join(' '));
    }
}

function loadFile(filePath: string) {
    manager.reset();

    const [extension] = filePath.split('.').splice(-1);
    switch (extension) {
        case 'csv':
            handleCSVFile(filePath);
            break;
        case 'json':
            handleJSONFile(filePath);
            break;
        default:
            console.log('Unsupported file type! Enter a CSV or a JSON file.');
            return;
    }

    console.log("File " + filePath + " loaded.");
}

function run() {
    processCommands();
}

run();

import Commander from "./src/commander";
import { Transaction } from "./src/types";

const readlineSync = require('readline-sync');
const fs = require('fs');
const csv = require('csv-parser')
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

const commander: Commander = new Commander();

function processCommands(): void {
    while (true) {
        const command = readlineSync.question('> ');
        logger.debug('Processing command "' + command + '"');

        if (command === 'exit') {
            break;
        }

        const commandSplit = command.split(' ');

        if (commandSplit[0].toLowerCase() !== 'list') {
            logger.debug('Command does not start with "list"');
            console.log('Invalid command!');
            continue;
        }

        if (commandSplit[1].toLowerCase() === 'all') {
            commander.listAll();
            continue;
        }

        commander.listAccount([...commandSplit].splice(1).join(' '));
    }
}

function run() {
    console.log('Reading file...');

    // fs.createReadStream("./resources/Transactions2014.csv")
    fs.createReadStream("./resources/DodgyTransactions2015.csv")
        .pipe(csv())
        .on("data", function (row: Transaction) {
            commander.processTransaction(row);
        })
        .on("end", () => {
            console.log("Done. Ready to receive commands!")
            processCommands();
        });
}

run();

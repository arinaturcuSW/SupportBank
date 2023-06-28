import Handler from './src/handler';

const readlineSync = require('readline-sync');
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
const handler = new Handler();
const manager = handler.getManager();

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

        if (command.toLowerCase().startsWith('import file') && commandSplit[2]?.length > 0) {
            handler.setFilePath(commandSplit[2]);
            handler.loadFile();
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

function run() {
    processCommands();
}

run();

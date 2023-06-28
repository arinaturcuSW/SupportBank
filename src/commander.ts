import Manager from "./manager";

const log4js = require('log4js');
const readlineSync = require('readline-sync');
const logger = log4js.getLogger('commander.ts');

export default class Commander {
    private manager: Manager;

    constructor() {
        this.manager = new Manager();
    }

    public processCommands(): void {
        // while (true) {
        //     const command = readlineSync.question('> ');
        //     logger.debug('Processing command "' + command + '"');
        //
        //     if (command === 'exit') {
        //         break;
        //     }
        //
        //     const commandSplit = command.split(' ');
        //
        //     if (commandSplit[0].toLowerCase() !== 'list') {
        //         logger.debug('Command does not start with "list"');
        //         console.log('Invalid command!');
        //         continue;
        //     }
        //
        //     if (commandSplit[1].toLowerCase() === 'all') {
        //         manager.listAll();
        //         continue;
        //     }
        //
        //     manager.listAccount([...commandSplit].splice(1).join(' '));
        // }
    }
}
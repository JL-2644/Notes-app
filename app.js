// npm init in cmd
// npm i chalk
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');
// Customize yargs version
yargs.version('1.1.0');

// Create add command

yargs.command({
    command: "add",
    describe: "add a new note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "The note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

// Create remove command

yargs.command({
    command: "remove",
    describe: "Note removed",
    builder: {
        title: {
            describe: "Note title to be removed",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title);
    }
})
// Create a read command
yargs.command({
    command: "read",
    describe: "Read a note",
    builder: {
        title: {
            describe: "Note title to be read",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title);
    }
})
// Create a list command
yargs.command({
    command: "list",
    describe: "listing the notes",
    handler() {
        notes.listNotes();
    }
})

yargs.parse();
//console.log(yargs.argv);
// debugging chrome://inspect
// node --inspect-brk app.js ... in terminal

const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    // Array
    //const duplicateNotes = notes.filter(note => note.title === title);
    // finds one match is so stops and continues on with line 12
    const duplicateNote = notes.find((note) => notes.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.bgGreen("New note added"));
    }
    else {
        console.log(chalk.bgRed("Note title taken"));
    }
    
}

const removeNotes = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(notes => notes.title !== title);
    if(notes.length === notesToKeep.length) {
        console.log(chalk.bgRed("No note found!"));
    }
    else {
        console.log(chalk.bgGreen("Note removed"));
        saveNotes(notesToKeep);
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgBlue("Your Notes"));
    notes.forEach((note) => console.log(note.title));
}

const readNotes = (title) => {
    const notes = loadNotes();

    const findNote = notes.find((note) => note.title === title);

    if(findNote) {
        console.log(chalk.bold(findNote.title));
        console.log(findNote.body);
    }
    else {
        console.log(chalk.bgRed("No note found"));
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};
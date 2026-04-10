const fs = require('fs');

const fileName = 'notes.json';

function readNotes() {
    if (!fs.existsSync(fileName)) {
        return [];
    }
    const data = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(data);
}

function saveNotes(notes) {
    fs.writeFileSync(fileName, JSON.stringify(notes, null, 2));
}

function createNote(title, content) {
    const notes = readNotes();
    const existingNote = notes.find(note => note.title === title);
    
    if (existingNote) {
        console.log('Error: A note with this title already exists.');
        return;
    }
    
    notes.push({ title, content });
    saveNotes(notes);
    console.log(`Note "${title}" created successfully.`);
}

function listNotes() {
    const notes = readNotes();
    
    if (notes.length === 0) {
        console.log('No notes found.');
        return;
    }
    
    console.log('\n=== All Notes ===');
    notes.forEach((note, index) => {
        console.log(`${index + 1}. Title: ${note.title}`);
        console.log(`   Content: ${note.content}`);
        console.log('---');
    });
}

function deleteNote(title) {
    const notes = readNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    
    if (notes.length === filteredNotes.length) {
        console.log(`Error: Note with title "${title}" not found.`);
        return;
    }
    
    saveNotes(filteredNotes);
    console.log(`Note "${title}" deleted successfully.`);
}

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

if (command === 'create' && title && content) {
    createNote(title, content);
} else if (command === 'list') {
    listNotes();
} else if (command === 'delete' && title) {
    deleteNote(title);
} else {
    console.log('Usage:');
    console.log('  node gestorNotas.js create "Note Title" "Note Content"');
    console.log('  node gestorNotas.js list');
    console.log('  node gestorNotas.js delete "Note Title"');
}
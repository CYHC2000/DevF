/**
 * GESTOR DE NOTAS PERSONALES
 * A Node.js application to manage notes using file system operations
 * 
 * This project demonstrates:
 * - Reading and writing files with fs module
 * - Working with JSON data
 * - CRUD operations (Create, Read, Delete)
 * - Command-line argument handling
 */

const fs = require('fs');
const path = require('path');

// File path for storing notes
// __dirname ensures the file is created in the same directory as this script
const filePath = path.join(__dirname, 'notes.json');

/**
 * Helper function to read notes from the JSON file
 * @returns {Array} Array of note objects
 */
function leerNotasArchivo() {
    try {
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            console.log('📝 Archivo de notas no encontrado. Se creará uno nuevo.');
            return []; // Return empty array if file doesn't exist
        }
        
        // Read the file content synchronously
        const data = fs.readFileSync(filePath, 'utf8');
        
        // If file is empty, return empty array
        if (!data.trim()) {
            return [];
        }
        
        // Parse JSON content into JavaScript array
        const notas = JSON.parse(data);
        return notas;
        
    } catch (error) {
        console.error('❌ Error al leer el archivo:', error.message);
        return [];
    }
}

/**
 * Helper function to save notes to the JSON file
 * @param {Array} notas - Array of note objects to save
 */
function guardarNotasArchivo(notas) {
    try {
        // Convert array to JSON format with pretty indentation (2 spaces)
        const data = JSON.stringify(notas, null, 2);
        
        // Write to file
        fs.writeFileSync(filePath, data, 'utf8');
        return true;
        
    } catch (error) {
        console.error('❌ Error al guardar las notas:', error.message);
        return false;
    }
}

/**
 * Agrega una nueva nota al archivo
 * @param {string} titulo - El título de la nota
 * @param {string} contenido - El contenido de la nota
 */
function agregarNota(titulo, contenido) {
    console.log('\n📌 AGREGANDO NUEVA NOTA...');
    
    // Validate input
    if (!titulo || !contenido) {
        console.log('❌ Error: Debes proporcionar un título y contenido para la nota.');
        console.log('   Ejemplo: node gestorNotas.js agregar "Compras" "Comprar leche y pan"');
        return;
    }
    
    // Step 1: Read existing notes
    let notas = leerNotasArchivo();
    
    // Step 2: Check if a note with the same title already exists
    const notaExistente = notas.find(nota => nota.titulo === titulo);
    if (notaExistente) {
        console.log(`⚠️  Ya existe una nota con el título "${titulo}".`);
        console.log('   Usa un título diferente o elimina la nota existente.');
        return;
    }
    
    // Step 3: Create new note object
    const nuevaNota = { 
        titulo: titulo, 
        contenido: contenido,
        fecha: new Date().toLocaleString() // Add timestamp
    };
    
    // Step 4: Add to array
    notas.push(nuevaNota);
    
    // Step 5: Save to file
    const exito = guardarNotasArchivo(notas);
    
    if (exito) {
        console.log(`✅ Nota "${titulo}" agregada con éxito!`);
        console.log(`   📅 Creada: ${nuevaNota.fecha}`);
    }
}

/**
 * Lista todas las notas guardadas
 */
function listarNotas() {
    console.log('\n📋 LISTA DE NOTAS:');
    console.log('=' .repeat(50));
    
    // Read notes from file
    const notas = leerNotasArchivo();
    
    // Check if there are notes
    if (notas.length === 0) {
        console.log('📭 No hay notas guardadas.');
        console.log('   Crea una nota con: node gestorNotas.js agregar "Título" "Contenido"');
        return;
    }
    
    // Display all notes
    notas.forEach((nota, index) => {
        console.log(`\n${index + 1}. 📝 ${nota.titulo}`);
        console.log(`   📄 Contenido: ${nota.contenido}`);
        if (nota.fecha) {
            console.log(`   🕒 Fecha: ${nota.fecha}`);
        }
        console.log('-'.repeat(40));
    });
    
    console.log(`\n📊 Total de notas: ${notas.length}`);
}

/**
 * Elimina una nota por su título
 * @param {string} titulo - El título de la nota a eliminar
 */
function eliminarNota(titulo) {
    console.log('\n🗑️  ELIMINANDO NOTA...');
    
    if (!titulo) {
        console.log('❌ Error: Debes proporcionar el título de la nota a eliminar.');
        console.log('   Ejemplo: node gestorNotas.js eliminar "Compras"');
        return;
    }
    
    // Step 1: Read existing notes
    let notas = leerNotasArchivo();
    
    if (notas.length === 0) {
        console.log('📭 No hay notas para eliminar.');
        return;
    }
    
    // Step 2: Find the note before filtering
    const notaAEliminar = notas.find(nota => nota.titulo === titulo);
    
    if (!notaAEliminar) {
        console.log(`⚠️  No se encontró una nota con el título "${titulo}".`);
        console.log('   Usa "listar" para ver las notas disponibles.');
        return;
    }
    
    // Step 3: Filter out the note to delete (Sliding Window approach)
    const notasRestantes = notas.filter(nota => nota.titulo !== titulo);
    
    // Step 4: Save updated notes
    const exito = guardarNotasArchivo(notasRestantes);
    
    if (exito) {
        console.log(`✅ Nota "${titulo}" eliminada con éxito!`);
        console.log(`   Notas restantes: ${notasRestantes.length}`);
    }
}

/**
 * Muestra información de ayuda
 */
function mostrarAyuda() {
    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║              GESTOR DE NOTAS PERSONALES - AYUDA                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  COMANDOS DISPONIBLES:                                           ║
║                                                                  ║
║  1. Agregar nota:                                                ║
║     node gestorNotas.js agregar "Título" "Contenido"            ║
║                                                                  ║
║  2. Listar notas:                                                ║
║     node gestorNotas.js listar                                   ║
║                                                                  ║
║  3. Eliminar nota:                                               ║
║     node gestorNotas.js eliminar "Título"                       ║
║                                                                  ║
║  4. Mostrar ayuda:                                               ║
║     node gestorNotas.js ayuda                                    ║
║     node gestorNotas.js --help                                   ║
║                                                                  ║
║  EJEMPLOS:                                                       ║
║  $ node gestorNotas.js agregar "Compras" "Leche, pan, huevos"   ║
║  $ node gestorNotas.js listar                                    ║
║  $ node gestorNotas.js eliminar "Compras"                       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
    `);
}

/**
 * Muestra estadísticas de las notas
 */
function mostrarEstadisticas() {
    console.log('\n📊 ESTADÍSTICAS DE NOTAS:');
    console.log('=' .repeat(40));
    
    const notas = leerNotasArchivo();
    
    if (notas.length === 0) {
        console.log('No hay notas para mostrar estadísticas.');
        return;
    }
    
    // Calculate statistics
    const totalNotas = notas.length;
    const caracteresTotales = notas.reduce((sum, nota) => 
        sum + (nota.titulo.length + nota.contenido.length), 0);
    const promedioCaracteres = Math.round(caracteresTotales / totalNotas);
    
    // Find longest title
    const notaMasLarga = notas.reduce((max, nota) => 
        nota.titulo.length > max.titulo.length ? nota : max, notas[0]);
    
    console.log(`📝 Total de notas: ${totalNotas}`);
    console.log(`📏 Total de caracteres: ${caracteresTotales}`);
    console.log(`📊 Promedio de caracteres por nota: ${promedioCaracteres}`);
    console.log(`🏆 Título más largo: "${notaMasLarga.titulo}" (${notaMasLarga.titulo.length} caracteres)`);
}

// ==============================================
// MAIN PROGRAM - Entry Point
// ==============================================

// Get command line arguments
// process.argv[0] = node path
// process.argv[1] = script path
// process.argv[2] = command
// process.argv[3] = first argument (title)
// process.argv[4] = second argument (content)
const args = process.argv.slice(2);
const command = args[0];

console.log('\n🎯 GESTOR DE NOTAS PERSONALES');
console.log('=' .repeat(40));

// Execute the appropriate function based on the command
switch (command) {
    case 'agregar':
    case 'add':
        const titulo = args[1];
        const contenido = args[2];
        agregarNota(titulo, contenido);
        break;
        
    case 'listar':
    case 'list':
    case 'ls':
        listarNotas();
        break;
        
    case 'eliminar':
    case 'delete':
    case 'rm':
        const tituloEliminar = args[1];
        eliminarNota(tituloEliminar);
        break;
        
    case 'estadisticas':
    case 'stats':
        mostrarEstadisticas();
        break;
        
    case 'ayuda':
    case 'help':
    case '--help':
    case '-h':
        mostrarAyuda();
        break;
        
    default:
        if (!command) {
            console.log('\n⚠️  No se proporcionó ningún comando.');
        } else {
            console.log(`\n❌ Comando desconocido: "${command}"`);
        }
        mostrarAyuda();
        break;
}

console.log('\n'); // Add empty line at the end
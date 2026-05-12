// Lista de ejemplo
const ejemplo = [
    "Sara Sánchez", "Manuel Martínez", "Carmen Cruz", "Fernando Fernández",
    "Noel Iglesias", "Javier Jiménez", "Patricia Pérez", "Nicolás Navarro",
    "Laura López", "Óscar Ortega", "David Díaz", "Gabriel García",
    "Tomás Torres", "Verónica Vázquez", "Beatriz Blanco", "Elena Escobar",
    "Roberto Ramírez", "Xavier Ximénez", "Diana Álvarez", "Andrés Aranda"
];

// Función que usa dos punteros para generar pares
function two_pointers(arr) {
    let left = 0;
    let right = 1;
    let pairs = [];
    
    while (right < arr.length && pairs.length === 0) {
        let initialLeft = arr[left][0];
        let initialRight = arr[right][0];
        
        if (initialLeft === initialRight) {
            let pair = [arr[left], arr[right]];
            pairs.push(pair);
        }
        left++;
        right++;
    }
    
    return pairs;
}

// Función para buscar pares
function buscarPares() {
    const textarea = document.getElementById('nombres');
    const texto = textarea.value;
    const label = document.getElementById('resultadoLabel');
    
    // Validar que no esté vacío
    if (!texto.trim()) {
        label.innerHTML = 'Por favor, ingresa algunos nombres';
        label.className = 'resultado error';
        return;
    }
    
    // Convertir texto a arreglo
    let guests = texto.split('\n')
        .map(linea => linea.trim())
        .filter(linea => linea !== '');
    
    if (guests.length === 0) {
        label.innerHTML = 'No se encontraron parejas';
        label.className = 'resultado error';
        return;
    }
    
    // Ordenar alfabéticamente
    let arr = [...guests].sort();
    
    // Buscar pares
    let resultado = two_pointers(arr);
    
    // Mostrar resultado
    if (resultado.length > 0) {
        const par = resultado[0];
        const inicial = par[0][0];
        label.innerHTML = `¡PAR ENCONTRADO!<br>
                          <strong>${par[0]}</strong> y <strong>${par[1]}</strong><br>
                          Ambos empiezan con la letra "${inicial}"`;
        label.className = 'resultado exito';
    } else {
        label.innerHTML = 'No se encontraron pares con la misma inicial<br>💡 Intenta con más nombres';
        label.className = 'resultado error';
    }
}

// Función para limpiar todo
function limpiarTodo() {
    document.getElementById('nombres').value = '';
    const label = document.getElementById('resultadoLabel');
    label.innerHTML = 'Esperando lista de invitados...';
    label.className = 'resultado info';
}

// Cargar ejemplo automáticamente al iniciar
document.getElementById('nombres').value = ejemplo.join('\n');

// Event listeners
document.getElementById('btnBuscar').addEventListener('click', buscarPares);
document.getElementById('btnLimpiar').addEventListener('click', limpiarTodo);
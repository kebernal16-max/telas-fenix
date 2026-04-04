let carrito = [];
let productoActual = {};

function abrirAyuda() {
    document.getElementById('bienvenida').classList.add('hidden');
    document.getElementById('seccion-ayuda').classList.remove('hidden');
}

function cerrarAyuda() {
    document.getElementById('seccion-ayuda').classList.add('hidden');
    mostrarCatalogo();
}

function mostrarCatalogo() {
    document.getElementById('bienvenida').classList.add('hidden');
    document.getElementById('seccion-ayuda').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
    window.scrollTo(0,0);
}

// ... (Resto de funciones de verDetalle y enviarWhatsApp que ya tenías)

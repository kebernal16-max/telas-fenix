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

function volverAlCatalogo() {
    document.getElementById('detalle-tecnico').classList.add('hidden');
    document.getElementById('carrito-seccion').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    const select = document.getElementById('opcion-producto');
    const infoContenedor = document.getElementById('contenedor-info-tecnica');
    select.innerHTML = "";
    
    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000, tipo: 'prenda' };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `<div class="cuadro-info"><p>3 costuras y 4 broches. Bordado incluido.</p></div>`;
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000, tipo: 'prenda' };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `<div class="cuadro-info"><p>2 costuras y 1 broche. Bordado incluido.</p></div>`;
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón Industrial", precio: 12000, tipo: 'capuchon' };
        select.innerHTML = `
            <option value="Dacron" data-p="12000">Dacrón ($12.000)</option>
            <option value="Mixto" data-p="14000">Mixto ($14.000)</option>
            <option value="Drill" data-p="16000">Drill ($16.000)</option>`;
    }
    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    let precio = productoActual.precio;
    if(productoActual.tipo === 'capuchon') {
        const sel = document.getElementById('opcion-producto');
        precio = parseInt(sel.options[sel.selectedIndex].getAttribute('data-p'));
    }
    let desc = (productoActual.tipo === 'prenda' && cant >= 6) ? 0.10 : 0;
    let total = (precio * (1 - desc)) * cant;
    document.getElementById('subtotal-valor').innerText = "$" + Math.round(total).toLocaleString('es-CO');
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
}

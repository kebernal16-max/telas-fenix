let carrito = [];
let productoActual = {};

function mostrarCatalogo() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('catalogo').classList.remove('hidden');
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    
    const select = document.getElementById('opcion-producto');
    const miniaturas = document.getElementById('miniaturas');
    const lista = document.getElementById('lista-especificaciones');
    const bloqueBordados = document.getElementById('bloque-bordados');
    const tablaAhorro = document.getElementById('tabla-ahorro');
    
    select.innerHTML = ""; miniaturas.innerHTML = "";

    if (tipo === 'fenix') {
        productoActual = { tipo: 'prenda', nombre: "Línea Fénix Premium", precio: 95000, fotos: ['fenix1.jpg', 'fenix2.jpg'] };
        lista.innerHTML = `<li>Drill Vulcano</li><li>Triple costura</li><li>4 broches</li>`;
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        bloqueBordados.classList.remove('hidden');
        tablaAhorro.classList.remove('hidden');
    } else if (tipo === 'capuchon') {
        productoActual = { tipo: 'capuchon', nombre: "Capuchón Industrial", precio: 12000, fotos: ['cap-mixto.jpg', 'cap-dacron.jpg'] };
        lista.innerHTML = `<li>Protección térmica</li><li>Resistente</li>`;
        select.innerHTML = `<option value="Dacron" data-p="12000">Dacrón ($12.000)</option><option value="Mixto" data-p="14000">Mixto ($14.000)</option><option value="Drill" data-p="16000">Drill ($16.000)</option>`;
        bloqueBordados.classList.add('hidden');
        tablaAhorro.classList.add('hidden');
    }
    // (Añadir Línea Estándar similar si deseas)

    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    document.getElementById('imagen-principal').src = productoActual.fotos[0];
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    const select = document.getElementById('opcion-producto');
    let precioBase = productoActual.tipo === 'capuchon' ? 
        parseInt(select.options[select.selectedIndex].getAttribute('data-p')) : productoActual.precio;

    let desc = 0;
    if (productoActual.tipo === 'prenda') {
        if (cant >= 6 && cant < 12) desc = 0.05;
        else if (cant >= 12) desc = 0.10;
    }

    const total = (precioBase * (1 - desc)) * cant;
    document.getElementById('subtotal-valor').innerText = `$${total.toLocaleString()}`;
    productoActual.precioFinal = total;
}

function agregarAlCarrito() {
    carrito.push({ nombre: productoActual.nombre, cant: document.getElementById('cantidad-input').value, total: productoActual.precioFinal });
    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Agregado!");
    volverAlCatalogo();
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if(!nombre) return alert("Pon tu nombre");
    let msg = `Hola Andrea Villalba, soy ${nombre}. Mi pedido: `;
    carrito.forEach(i => msg += `- ${i.nombre} x${i.cant}. `);
    window.open(`https://api.whatsapp.com/send?phone=573184250115&text=${msg}`);
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
}
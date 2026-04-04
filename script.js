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
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    const select = document.getElementById('opcion-producto');
    const img = document.getElementById('imagen-principal');
    select.innerHTML = "";

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000 };
        img.src = "fenix1.jpg";
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000 };
        img.src = "estandar1.jpg";
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón", precio: 12000 };
        img.src = "cap-mixto.jpg";
        select.innerHTML = '<option value="Dacron" data-p="12000">Dacrón</option><option value="Mixto" data-p="14000">Mixto</option>';
    }
    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    let precio = productoActual.precio;
    const sel = document.getElementById('opcion-producto');
    if(sel.selectedOptions[0].dataset.p) precio = parseInt(sel.selectedOptions[0].dataset.p);
    
    document.getElementById('precio-unitario').innerText = "$" + precio.toLocaleString();
    document.getElementById('subtotal-valor').innerText = "$" + (precio * cant).toLocaleString();
}

function agregarAlCarrito() {
    const cant = parseInt(document.getElementById('cantidad-input').value);
    const opcion = document.getElementById('opcion-producto').value;
    const precio = parseInt(document.getElementById('precio-unitario').innerText.replace('$','').replace('.',''));
    
    carrito.push({ nombre: productoActual.nombre, opcion, cant, subtotal: precio * cant });
    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Añadido!");
    volverAlCatalogo();
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(i => {
        total += i.subtotal;
        lista.innerHTML += `<p>${i.cant}x ${i.nombre} (${i.opcion}) - $${i.subtotal.toLocaleString()}</p>`;
    });
    document.getElementById('total-precio').innerText = "$" + total.toLocaleString();
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if(!nombre) return alert("Pon tu nombre");
    let msj = `Hola Andrea, soy ${nombre}. Pedido:\n`;
    carrito.forEach(i => msj += `- ${i.cant} ${i.nombre} (${i.opcion})\n`);
    window.open(`https://wa.me/573214828114?text=${encodeURIComponent(msj)}`);
}

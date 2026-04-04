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
    window.scrollTo(0,0);
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    const select = document.getElementById('opcion-producto');
    const infoContenedor = document.getElementById('contenedor-info-tecnica');
    const imgPrincipal = document.getElementById('imagen-principal');
    
    select.innerHTML = "";
    
    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000, tipo: 'prenda' };
        imgPrincipal.src = "fenix1.jpg";
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `<p>3 costuras y 4 broches. Bordado incluido.</p>`;
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000, tipo: 'prenda' };
        imgPrincipal.src = "estandar1.jpg";
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `<p>2 costuras y 1 broche. Bordado incluido.</p>`;
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón Industrial", precio: 12000, tipo: 'capuchon' };
        imgPrincipal.src = "cap-mixto.jpg";
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
    let total = precio * cant;
    document.getElementById('precio-unitario').innerText = "$" + precio.toLocaleString('es-CO');
    document.getElementById('subtotal-valor').innerText = "$" + total.toLocaleString('es-CO');
}

function agregarAlCarrito() {
    const cant = parseInt(document.getElementById('cantidad-input').value);
    const opcion = document.getElementById('opcion-producto').value;
    
    let precioFinal = productoActual.precio;
    if(productoActual.tipo === 'capuchon') {
        const sel = document.getElementById('opcion-producto');
        precioFinal = parseInt(sel.options[sel.selectedIndex].getAttribute('data-p'));
    }

    carrito.push({
        nombre: productoActual.nombre,
        opcion: opcion,
        cantidad: cant,
        precio: precioFinal,
        subtotal: precioFinal * cant
    });

    actualizarBadge();
    alert("¡Producto añadido! Tienes " + carrito.length + " items.");
    volverAlCatalogo();
}

function actualizarBadge() {
    document.getElementById('cart-count').innerText = carrito.length;
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    renderizarCarrito();
}

function renderizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let totalPedido = 0;

    carrito.forEach((item, index) => {
        totalPedido += item.subtotal;
        lista.innerHTML += `
            <div style="border-bottom:1px solid #333; padding:10px;">
                <p><strong>${item.nombre}</strong> (Talla/Mat: ${item.opcion})</p>
                <p>${item.cantidad} x $${item.precio.toLocaleString()} = $${item.subtotal.toLocaleString()}</p>
            </div>`;
    });
    document.getElementById('total-precio').innerText = "$" + totalPedido.toLocaleString('es-CO');
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if(!nombre) return alert("Por favor pon tu nombre");
    
    let mensaje = `Hola Andrea, soy ${nombre}. Mi pedido es:\n\n`;
    carrito.forEach(item => {
        mensaje += `- ${item.cantidad} ${item.nombre} [${item.opcion}]: $${item.subtotal.toLocaleString()}\n`;
    });
    mensaje += `\n*TOTAL: ${document.getElementById('total-precio').innerText}*`;
    
    const url = `https://wa.me/573214828114?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

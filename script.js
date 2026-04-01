let carrito = [];
let productoActual = {};

function mostrarCatalogo() {
    document.getElementById('bienvenida').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
    window.scrollTo(0,0);
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    const select = document.getElementById('opcion-producto');
    select.innerHTML = "";

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000, tipo: 'prenda', foto: 'fenix1.jpg' };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000, tipo: 'prenda', foto: 'estandar1.jpg' };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón Industrial", precio: 12000, tipo: 'capuchon', foto: 'cap-mixto.jpg' };
        select.innerHTML = `
            <option value="Dacron" data-p="12000">Dacrón ($12.000)</option>
            <option value="Mixto" data-p="14000">Mixto ($14.000)</option>
            <option value="Drill" data-p="16000">Drill ($16.000)</option>`;
    }

    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    document.getElementById('imagen-principal').src = productoActual.foto;
    document.getElementById('precio-unitario').innerText = "$" + productoActual.precio.toLocaleString('es-CO');
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    const select = document.getElementById('opcion-producto');
    let precioBase = productoActual.precio;

    if(productoActual.tipo === 'capuchon') {
        precioBase = parseInt(select.options[select.selectedIndex].getAttribute('data-p'));
    }

    let desc = 0;
    if (productoActual.tipo === 'prenda') {
        if (cant >= 6 && cant < 12) desc = 0.05;
        else if (cant >= 12) desc = 0.10;
    }

    const total = (precioBase * (1 - desc)) * cant;
    document.getElementById('subtotal-valor').innerText = "$" + Math.round(total).toLocaleString('es-CO');
    productoActual.totalF = Math.round(total);
}

function agregarAlCarrito() {
    const cant = document.getElementById('cantidad-input').value;
    const opcion = document.getElementById('opcion-producto').value;
    
    carrito.push({
        nombre: productoActual.nombre,
        opcion: opcion,
        cant: cant,
        total: productoActual.totalF
    });

    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Producto añadido al pedido!");
    volverAlCatalogo();
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let granTotal = 0;

    carrito.forEach((item, index) => {
        lista.innerHTML += `
            <div style="border-bottom:1px solid #333; padding:10px 0;">
                <p><strong>${item.nombre}</strong></p>
                <p>Talla/Mat: ${item.opcion} | Cant: ${item.cant}</p>
                <p>Subtotal: $${item.total.toLocaleString('es-CO')}</p>
            </div>`;
        granTotal += item.total;
    });

    document.getElementById('total-precio').innerText = "$" + granTotal.toLocaleString('es-CO');
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    const ciudad = document.getElementById('ciudad-cliente').value;

    if(!nombre || !ciudad) return alert("Por favor, ingresa tu nombre y ciudad.");
    if(carrito.length === 0) return alert("Tu carrito está vacío.");

    let mensaje = `*NUEVO PEDIDO - TELAS FÉNIX*%0A`;
    mensaje += `*Cliente:* ${nombre}%0A`;
    mensaje += `*Ciudad:* ${ciudad}%0A%0A`;
    mensaje += `*DETALLE DEL PEDIDO:*%0A`;

    let totalFinal = 0;
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (${item.opcion}) x${item.cant}: $${item.total.toLocaleString('es-CO')}%0A`;
        totalFinal += item.total;
    });

    mensaje += `%0A*TOTAL A PAGAR: $${totalFinal.toLocaleString('es-CO')}*`;

    const url = `https://api.whatsapp.com/send?phone=573184250115&text=${mensaje}`;
    window.open(url, '_blank');
}

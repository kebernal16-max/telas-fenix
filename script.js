let carrito = [];
let productoActual = {};

const fotosProductos = {
    'fenix': ['fenix1.jpg'], 
    'estandar': ['estandar1.jpg'],
    'capuchon': ['cap-mixto.jpg']
};

function mostrarCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function verDetalle(tipo) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    
    const select = document.getElementById('opcion-producto');
    select.innerHTML = "";
    document.getElementById('personalizacion-texto').value = ""; // Limpiar texto

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000 };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000 };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón", precio: 12000 };
        select.innerHTML = '<option value="Dacron" data-p="12000">Dacrón ($12.000)</option><option value="Mixto" data-p="14000">Mixto ($14.000)</option><option value="Drill" data-p="16000">Drill ($16.000)</option>';
    }

    document.getElementById('imagen-principal').src = fotosProductos[tipo][0];
    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    let precio = productoActual.precio;
    const sel = document.getElementById('opcion-producto');
    if(sel.selectedOptions[0]?.dataset.p) precio = parseInt(sel.selectedOptions[0].dataset.p);
    document.getElementById('subtotal-valor').innerText = "$" + (precio * cant).toLocaleString();
    document.getElementById('precio-unitario').innerText = "$" + precio.toLocaleString();
}

function agregarAlCarrito() {
    const cant = parseInt(document.getElementById('cantidad-input').value);
    const opcion = document.getElementById('opcion-producto').value;
    const color = document.getElementById('color-prenda').value;
    const detalle = document.getElementById('personalizacion-texto').value;
    const precio = parseInt(document.getElementById('precio-unitario').innerText.replace('$','').replace('.',''));
    
    carrito.push({ 
        nombre: productoActual.nombre, 
        opcion, 
        color,
        detalle: detalle || "Sin detalles adicionales",
        cant, 
        subtotal: precio * cant 
    });
    
    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Añadido! Puedes seguir comprando o confirmar tu pedido arriba.");
    volverAlCatalogo();
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function irAlCarrito() {
    if(carrito.length === 0) return alert("El carrito está vacío.");
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(i => {
        total += i.subtotal;
        lista.innerHTML += `<div class="item-carrito">
            <p><strong>${i.cant}x ${i.nombre}</strong> (${i.opcion})</p>
            <p>Color: ${i.color} | Detalle: ${i.detalle}</p>
            <p>Subtotal: $${i.subtotal.toLocaleString()}</p>
            <hr>
        </div>`;
    });
    document.getElementById('total-precio').innerText = "$" + total.toLocaleString();
}

function vaciarCarrito() {
    if(confirm("¿Seguro que quieres borrar todo tu pedido?")) {
        carrito = [];
        document.getElementById('cart-count').innerText = "0";
        volverAlCatalogo();
    }
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if(!nombre) return alert("Por favor, ingresa tu nombre.");
    
    let msj = `Hola Andrea, soy ${nombre}. Mi pedido de Telas Fénix es:\n\n`;
    carrito.forEach(i => {
        msj += `✅ *${i.cant}x ${i.nombre}*\n`;
        msj += `   - Talla/Mat: ${i.opcion}\n`;
        msj += `   - Color: ${i.color}\n`;
        msj += `   - Detalle: ${i.detalle}\n`;
        msj += `   - Valor: $${i.subtotal.toLocaleString()}\n\n`;
    });
    msj += `*TOTAL A PAGAR: ${document.getElementById('total-precio').innerText}*`;
    window.open(`https://wa.me/573184250115?text=${encodeURIComponent(msj)}`);
}
// ... (Las demás funciones de ayuda se mantienen igual) ...

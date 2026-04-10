let carrito = [];
let productoActual = {};

// Generación automática de listas de imágenes
const fotosFenix = [];
for (let i = 1; i <= 62; i++) { fotosFenix.push(`fenix${i}.jpg`); }

const fotosEstandar = [];
for (let i = 1; i <= 20; i++) { fotosEstandar.push(`estandar${i}.jpg`); }

const fotosProductos = {
    'fenix': fotosFenix,
    'estandar': fotosEstandar,
    'capuchon': ['cap-mixto.jpg', 'cap-drill.jpg', 'cap-dacron.jpg'],
    'personalizado': ['personalizados1.jpg', 'personalizados2.jpg', 'personalizados3.jpg']
};

window.onload = function() {
    const guardado = localStorage.getItem('carritoReyand');
    if (guardado) {
        carrito = JSON.parse(guardado);
        document.getElementById('cart-count').innerText = carrito.length;
    }
};

function abrirAyuda() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('seccion-ayuda').classList.remove('hidden');
}

function cerrarAyuda() { mostrarCatalogo(); }

function mostrarCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

function volverAlCatalogo() { mostrarCatalogo(); }

function verDetalle(tipo) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    
    const select = document.getElementById('opcion-producto');
    const minCont = document.getElementById('miniaturas-contenedor');
    select.innerHTML = ""; minCont.innerHTML = "";
    document.getElementById('personalizacion-texto').value = "";

    const fotos = fotosProductos[tipo] || [];
    if (fotos.length > 0) {
        document.getElementById('imagen-principal').src = fotos[0];
        fotos.forEach((f, idx) => {
            const img = document.createElement('img');
            img.src = f; img.className = 'miniatura' + (idx === 0 ? ' active' : '');
            img.onclick = () => {
                document.getElementById('imagen-principal').src = f;
                document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('active'));
                img.classList.add('active');
            };
            minCont.appendChild(img);
        });
    }

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000 };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000 };
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón", precio: 12000 };
        select.innerHTML = `<option value="Dacron" data-p="12000">Dacrón ($12.000)</option>
                            <option value="Mixto" data-p="14000">Mixto ($14.000)</option>
                            <option value="Drill" data-p="16000">Drill ($16.000)</option>`;
    } else if (tipo === 'personalizado') {
        productoActual = { nombre: "Personalizado", precio: 0 };
        select.innerHTML = `<option value="Diseño Especial" data-p="0">Cotizar por WhatsApp</option>`;
    }
    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    let precio = productoActual.precio;
    const sel = document.getElementById('opcion-producto');
    if(sel.selectedOptions[0]?.dataset.p) precio = parseInt(sel.selectedOptions[0].dataset.p);
    document.getElementById('precio-unitario').innerText = precio === 0 ? "A convenir" : "$" + precio.toLocaleString();
    document.getElementById('subtotal-valor').innerText = "$" + (precio * cant).toLocaleString();
}

function agregarAlCarrito() {
    const cant = parseInt(document.getElementById('cantidad-input').value);
    const opcion = document.getElementById('opcion-producto').value;
    const color = document.getElementById('color-prenda').value;
    const detalle = document.getElementById('personalizacion-texto').value;
    const subtotalText = document.getElementById('subtotal-valor').innerText.replace('$','').split('.').join('');
    
    carrito.push({ nombre: productoActual.nombre, opcion, color, detalle: detalle || "Sin detalles", cant, subtotal: parseInt(subtotalText) });
    document.getElementById('cart-count').innerText = carrito.length;
    localStorage.setItem('carritoReyand', JSON.stringify(carrito));
    
    const toast = document.createElement('div');
    toast.innerText = "✅ Añadido";
    toast.className = "toast-notificacion";
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); volverAlCatalogo(); }, 1200);
}

function irAlCarrito() {
    if(carrito.length === 0) return alert("Carrito vacío");
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = ""; let total = 0;
    carrito.forEach((i, idx) => {
        total += i.subtotal;
        lista.innerHTML += `<div class="carrito-item">
            <button onclick="eliminarDelCarrito(${idx})" class="btn-borrar">🗑️</button>
            <p><strong>${i.cant}x ${i.nombre}</strong></p>
            <p>${i.opcion} | ${i.color}</p>
            <p style="color:#ffcc00">$${i.subtotal.toLocaleString()}</p>
        </div>`;
    });
    document.getElementById('total-precio').innerText = "$" + total.toLocaleString();
}

function eliminarDelCarrito(idx) {
    carrito.splice(idx, 1);
    document.getElementById('cart-count').innerText = carrito.length;
    localStorage.setItem('carritoReyand', JSON.stringify(carrito));
    if(carrito.length === 0) volverAlCatalogo(); else irAlCarrito();
}

function vaciarCarrito() {
    carrito = []; localStorage.removeItem('carritoReyand');
    document.getElementById('cart-count').innerText = "0";
    volverAlCatalogo();
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    if(!nombre) return alert("Ingresa tu nombre");
    let msj = `Hola Andrea, soy ${nombre}. Pedido Reyand:\n\n`;
    carrito.forEach(i => {
        msj += `✅ *${i.cant}x ${i.nombre}*\n- Talla/Mat: ${i.opcion}\n- Color: ${i.color}\n- Detalle: ${i.detalle}\n- Valor: $${i.subtotal.toLocaleString()}\n\n`;
    });
    msj += `*TOTAL: ${document.getElementById('total-precio').innerText}*`;
    window.open(`https://wa.me/573184250115?text=${encodeURIComponent(msj)}`);
}

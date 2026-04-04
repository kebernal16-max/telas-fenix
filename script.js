let carrito = [];
let productoActual = {};

function mostrarCatalogo() {
    document.getElementById('bienvenida').classList.add('hidden');
    document.getElementById('catalogo').classList.remove('hidden');
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    
    const select = document.getElementById('opcion-producto');
    const miniaturas = document.getElementById('miniaturas-contenedor');
    miniaturas.innerHTML = "";
    select.innerHTML = "";

    // Eliminar info extra previa si existe
    let infoPrevia = document.getElementById('info-extra-auto');
    if(infoPrevia) infoPrevia.remove();

    let fotos = [];
    let htmlInfo = "";

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000, tipo: 'prenda' };
        fotos = ['fenix1.jpg', 'fenix2.jpg', 'fenix3.jpg'];
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        htmlInfo = `
            <div id="info-extra-auto">
                <div class="cuadro-info">
                    <p>✨ PERSONALIZACIÓN INCLUIDA:</p>
                    <small>Bordados: RH, Nombre/Apellido y Bandera.</small>
                </div>
                <div class="cuadro-info">
                    <p>🛠 ESPECIFICACIONES:</p>
                    <small>Drill Vulcano, Triple costura, 4 broches.</small>
                </div>
                <div class="cuadro-descuento">🎁 6-11 un: 5% DESC | 12+ un: 10% DESC</div>
            </div>`;
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000, tipo: 'prenda' };
        fotos = ['estandar1.jpg', 'estandar2.jpg'];
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        htmlInfo = `
            <div id="info-extra-auto">
                <div class="cuadro-info">
                    <p>✨ PERSONALIZACIÓN INCLUIDA:</p>
                    <small>Bordados: RH, Nombre/Apellido y Bandera.</small>
                </div>
                <div class="cuadro-info">
                    <p>🛠 ESPECIFICACIONES:</p>
                    <small>Drill grueso o Jean, Doble costura, 1 broche.</small>
                </div>
                <div class="cuadro-descuento">🎁 6-11 un: 5% DESC | 12+ un: 10% DESC</div>
            </div>`;
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón Industrial", precio: 12000, tipo: 'capuchon' };
        fotos = ['cap-mixto.jpg', 'cap-drill.jpg', 'cap-dacron.jpg'];
        select.innerHTML = `
            <option value="Dacron" data-p="12000">Dacrón ($12.000)</option>
            <option value="Mixto" data-p="14000">Mixto ($14.000)</option>
            <option value="Drill" data-p="16000">Drill ($16.000)</option>`;
    }

    document.querySelector('.info-precios').insertAdjacentHTML('afterend', htmlInfo);
    document.getElementById('imagen-principal').src = fotos[0];

    // Crear miniaturas clicables
    fotos.forEach((foto, i) => {
        const img = document.createElement('img');
        img.src = foto;
        img.className = 'miniatura-foto' + (i===0 ? ' activa' : '');
        img.onclick = () => {
            document.getElementById('imagen-principal').src = foto;
            document.querySelectorAll('.miniatura-foto').forEach(f => f.classList.remove('activa'));
            img.classList.add('activa');
        };
        miniaturas.appendChild(img);
    });

    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    document.getElementById('precio-unitario').innerText = "$" + productoActual.precio.toLocaleString('es-CO');
    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    let precioBase = productoActual.precio;
    if(productoActual.tipo === 'capuchon') {
        const sel = document.getElementById('opcion-producto');
        precioBase = parseInt(sel.options[sel.selectedIndex].getAttribute('data-p'));
    }
    let desc = 0;
    if (productoActual.tipo === 'prenda') {
        if (cant >= 6 && cant < 12) desc = 0.05;
        else if (cant >= 12) desc = 0.10;
    }
    const total = (precioBase * (1 - desc)) * cant;
    document.getElementById('subtotal-valor').innerText = "$" + Math.round(total).toLocaleString('es-CO');
    productoActual.totalFinal = Math.round(total);
}

function agregarAlCarrito() {
    const cant = document.getElementById('cantidad-input').value;
    const op = document.getElementById('opcion-producto').value;
    carrito.push({ n: productoActual.nombre, o: op, c: cant, t: productoActual.totalFinal });
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
    let granTotal = 0;
    carrito.forEach(i => {
        lista.innerHTML += `<div style="border-bottom:1px solid #333; padding:10px 0;"><p><strong>${i.n}</strong></p><p>${i.o} x${i.c}: $${i.t.toLocaleString('es-CO')}</p></div>`;
        granTotal += i.t;
    });
    document.getElementById('total-precio').innerText = "$" + granTotal.toLocaleString('es-CO');
}

function enviarWhatsApp() {
    const nom = document.getElementById('nombre-cliente').value;
    const ciu = document.getElementById('ciudad-cliente').value;
    if(!nom || !ciu) return alert("Completa tus datos");
    let msg = `*PEDIDO TELAS FÉNIX*%0A*Cliente:* ${nom}%0A*Ciudad:* ${ciu}%0A%0A`;
    let totalP = 0;
    carrito.forEach(i => {
        msg += `- ${i.n} (${i.o}) x${i.c}: $${i.t.toLocaleString('es-CO')}%0A`;
        totalP += i.t;
    });
    msg += `%0A*TOTAL: $${totalP.toLocaleString('es-CO')}*`;
    window.open(`https://api.whatsapp.com/send?phone=573184250115&text=${msg}`);
}

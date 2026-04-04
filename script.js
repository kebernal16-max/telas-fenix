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
    const miniaturas = document.getElementById('miniaturas-contenedor');
    const infoContenedor = document.getElementById('contenedor-info-tecnica');
    
    miniaturas.innerHTML = "";
    select.innerHTML = "";
    infoContenedor.innerHTML = "";
    document.getElementById('mensaje-descuento').classList.add('hidden');

    let fotos = [];

    if (tipo === 'fenix') {
        productoActual = { nombre: "Línea Fénix Premium", precio: 95000, tipo: 'prenda' };
        fotos = ['fenix1.jpg', 'fenix2.jpg', 'fenix3.jpg'];
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `
            <div class="cuadro-info"><p>✨ PERSONALIZACIÓN INCLUIDA:</p><small>Todo va BORDADO: RH, Nombre y Bandera.</small></div>
            <div class="cuadro-info"><p>🛠 ESPECIFICACIONES:</p><small>Drill Vulcano, Triple costura, 4 broches.</small></div>`;
    } else if (tipo === 'estandar') {
        productoActual = { nombre: "Línea Estándar", precio: 85000, tipo: 'prenda' };
        fotos = ['estandar1.jpg', 'estandar2.jpg'];
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        infoContenedor.innerHTML = `
            <div class="cuadro-info"><p>✨ PERSONALIZACIÓN INCLUIDA:</p><small>Bordados: RH, Nombre y Bandera.</small></div>
            <div class="cuadro-info"><p>🛠 ESPECIFICACIONES:</p><small>Drill grueso o Jean, Doble costura, 1 broche.</small></div>`;
    } else if (tipo === 'capuchon') {
        productoActual = { nombre: "Capuchón Industrial", precio: 12000, tipo: 'capuchon' };
        fotos = ['cap-mixto.jpg', 'cap-drill.jpg', 'cap-dacron.jpg'];
        select.innerHTML = `
            <option value="Dacron" data-p="12000">Dacrón ($12.000)</option>
            <option value="Mixto" data-p="14000">Mixto ($14.000)</option>
            <option value="Drill" data-p="16000">Drill ($16.000)</option>`;
    }

    document.getElementById('imagen-principal').src = fotos[0];
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
    const cantInput = document.getElementById('cantidad-input');
    const cant = parseInt(cantInput.value) || 1;
    let precioBase = productoActual.precio;
    
    if(productoActual.tipo === 'capuchon') {
        const sel = document.getElementById('opcion-producto');
        precioBase = parseInt(sel.options[sel.selectedIndex].getAttribute('data-p') || 12000);
    }

    let desc = 0;
    const msgBox = document.getElementById('mensaje-descuento');

    if (productoActual.tipo === 'prenda') {
        if (cant >= 6 && cant < 12) {
            desc = 0.05;
            msgBox.innerText = "¡Felicidades! Se aplicó un 5% de descuento por cantidad.";
            msgBox.classList.remove('hidden');
        } else if (cant >= 12) {
            desc = 0.10;
            msgBox.innerText = "¡Excelente! Se aplicó un 10% de descuento por cantidad.";
            msgBox.classList.remove('hidden');
        } else {
            msgBox.classList.add('hidden');
        }
    }

    const total = (precioBase * (1 - desc)) * cant;
    document.getElementById('subtotal-valor').innerText = "$" + Math.round(total).toLocaleString('es-CO');
    productoActual.totalF = Math.round(total);
    productoActual.descLog = desc > 0 ? (desc * 100) + "%" : null;
}

function agregarAlCarrito() {
    const cant = document.getElementById('cantidad-input').value;
    const op = document.getElementById('opcion-producto').value;
    carrito.push({ n: productoActual.nombre, o: op, c: cant, t: productoActual.totalF, d: productoActual.descLog });
    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Añadido al pedido!");
    volverAlCatalogo();
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
    window.scrollTo(0,0);
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('carrito-seccion').classList.remove('hidden');
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = "";
    let granTotal = 0;
    carrito.forEach(i => {
        lista.innerHTML += `
            <div style="border-bottom:1px solid #333; padding:10px 0;">
                <p><strong>${i.n}</strong></p>
                <p>${i.o} x${i.c}: $${i.t.toLocaleString('es-CO')} ${i.d ? '(Incluye desc. '+i.d+')' : ''}</p>
            </div>`;
        granTotal += i.t;
    });
    document.getElementById('total-precio').innerText = "$" + granTotal.toLocaleString('es-CO');
}

function enviarWhatsApp() {
    const nom = document.getElementById('nombre-cliente').value;
    const ciu = document.getElementById('ciudad-cliente').value;
    if(!nom || !ciu) return alert("Por favor ingresa tu nombre y ciudad.");
    
    let msg = `*PEDIDO - TELAS FÉNIX*%0A*Cliente:* ${nom}%0A*Ciudad:* ${ciu}%0A%0A*DETALLES:*%0A`;
    let totalP = 0;
    carrito.forEach(i => {
        msg += `- ${i.n} (${i.o}) x${i.c}: $${i.t.toLocaleString('es-CO')}${i.d ? ' (Con desc. '+i.d+')' : ''}%0A`;
        totalP += i.t;
    });
    msg += `%0A*TOTAL A PAGAR: $${totalP.toLocaleString('es-CO')}*`;
    window.open(`https://api.whatsapp.com/send?phone=573184250115&text=${msg}`);
}

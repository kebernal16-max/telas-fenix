let carrito = [];
let productoActual = {};

function mostrarCatalogo() {
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('catalogo').classList.remove('hidden');
    window.scrollTo(0,0);
}

function verDetalle(tipo) {
    document.getElementById('catalogo').classList.add('hidden');
    document.getElementById('detalle-tecnico').classList.remove('hidden');
    window.scrollTo(0,0);
    
    const select = document.getElementById('opcion-producto');
    const miniaturas = document.getElementById('miniaturas');
    const lista = document.getElementById('lista-especificaciones');
    const bloqueBordados = document.getElementById('bloque-bordados');
    const tablaAhorro = document.getElementById('tabla-ahorro');
    
    select.innerHTML = ""; miniaturas.innerHTML = "";
    document.getElementById('cantidad-input').value = 1;

    if (tipo === 'fenix') {
        productoActual = { tipo: 'prenda', nombre: "Línea Fénix Premium", precio: 95000, fotos: ['fenix1.jpg', 'fenix2.jpg', 'fenix3.jpg'] };
        lista.innerHTML = `<li>Drill Vulcano / Jean Premium</li><li>Triple costura de seguridad</li><li><b>4 broches en el puño</b></li><li>Acabado de alta resistencia</li>`;
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        bloqueBordados.classList.remove('hidden');
        tablaAhorro.classList.remove('hidden');
    } 
    else if (tipo === 'estandar') {
        productoActual = { tipo: 'prenda', nombre: "Línea Estándar", precio: 85000, fotos: ['estandar1.jpg', 'estandar2.jpg'] };
        lista.innerHTML = `<li>Drill grueso / Jean de alta calidad</li><li>Doble costura reforzada</li><li><b>1 broche en el puño</b></li>`;
        ['S', 'M', 'L', 'XL'].forEach(t => select.innerHTML += `<option value="${t}">${t}</option>`);
        bloqueBordados.classList.remove('hidden');
        tablaAhorro.classList.remove('hidden');
    } 
    else if (tipo === 'capuchon') {
        productoActual = { tipo: 'capuchon', nombre: "Capuchón Industrial", precio: 12000, fotos: ['cap-mixto.jpg', 'cap-dacron.jpg', 'cap-drill.jpg'] };
        lista.innerHTML = `<li>Protección térmica y física</li><li>Material 100% grueso y resistente</li><li>No incluye bordados</li>`;
        select.innerHTML = `
            <option value="Dacron" data-p="12000">Tela Dacrón ($12.000)</option>
            <option value="Mixto" data-p="14000">Tela Mixta ($14.000)</option>
            <option value="Drill" data-p="16000">Tela Drill ($16.000)</option>`;
        bloqueBordados.classList.add('hidden');
        tablaAhorro.classList.add('hidden');
    }

    document.getElementById('detalle-titulo').innerText = productoActual.nombre;
    document.getElementById('imagen-principal').src = productoActual.fotos[0];
    
    productoActual.fotos.forEach(f => {
        const img = document.createElement('img');
        img.src = f;
        img.onclick = () => document.getElementById('imagen-principal').src = f;
        miniaturas.appendChild(img);
    });

    actualizarCalculos();
}

function actualizarCalculos() {
    const cant = parseInt(document.getElementById('cantidad-input').value) || 1;
    const select = document.getElementById('opcion-producto');
    let precioBase = productoActual.precio;

    if(productoActual.tipo === 'capuchon') {
        precioBase = parseInt(select.options[select.selectedIndex].getAttribute('data-p'));
    }

    let descuento = 0;
    let aviso = "";
    if (productoActual.tipo === 'prenda') {
        if (cant >= 6 && cant < 12) { descuento = 0.05; aviso = "✅ 5% de descuento aplicado"; }
        else if (cant >= 12) { descuento = 0.10; aviso = "🚀 10% de descuento aplicado"; }
    }

    const unitarioConDesc = precioBase * (1 - descuento);
    const subtotal = unitarioConDesc * cant;
    document.getElementById('detalle-precio').innerText = `$${precioBase.toLocaleString()}`;
    document.getElementById('subtotal-valor').innerText = `$${subtotal.toLocaleString()}`;
    document.getElementById('aviso-descuento').innerText = aviso;
    productoActual.precioFinalCarrito = unitarioConDesc;
}

function agregarAlCarrito() {
    carrito.push({
        nombre: productoActual.nombre,
        opcion: document.getElementById('opcion-producto').value,
        cantidad: document.getElementById('cantidad-input').value,
        subtotal: productoActual.precioFinalCarrito * document.getElementById('cantidad-input').value
    });
    document.getElementById('cart-count').innerText = carrito.length;
    alert("¡Añadido al pedido!");
    volverAlCatalogo();
}

function irAlCarrito() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('bienvenida').style.display = 'none';
    document.getElementById('carrito-seccion').classList.remove('hidden');
    window.scrollTo(0,0);

    const listaHtml = document.getElementById('lista-carrito');
    listaHtml.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        total += item.subtotal;
        listaHtml.innerHTML += `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333;"><span>${item.nombre} (${item.opcion}) x${item.cantidad}</span><span style="color:#ff3300">$${item.subtotal.toLocaleString()}</span></div>`;
    });
    document.getElementById('total-precio').innerText = `$${total.toLocaleString()}`;
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre-cliente').value;
    const ciudad = document.getElementById('ubicacion-cliente').value;
    if(!nombre || !ciudad) return alert("Por favor completa tus datos de envío");

    let total = 0;
    let msg = `Hola Andrea Villalba, soy *${nombre}* de *${ciudad}*. Quisiera realizar este pedido en *Telas Fénix*:%0A%0A`;
    carrito.forEach(i => {
        msg += `- ${i.nombre} (${i.opcion}) x${i.cantidad}: $${i.subtotal.toLocaleString()}%0A`;
        total += i.subtotal;
    });
    msg += `%0A*TOTAL: $${total.toLocaleString()}*%0A%0A_Nota: Material 100% grueso._`;
    window.open(`https://api.whatsapp.com/send?phone=573184250115&text=${msg}`);
}

function volverAlCatalogo() {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById('catalogo').classList.remove('hidden');
}

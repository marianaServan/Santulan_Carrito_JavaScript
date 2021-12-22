// Funciones
function subtotal(productoEnCarrito) {
    let subT = productoEnCarrito[0].precio * productoEnCarrito[1]
    return subT
}

function costoFinal(carrito) {
    let costoF = 0
    carrito.forEach(productoEnCarrito => {
        costoF += subtotal(productoEnCarrito)
    })
    return costoF
}

function detalleCostoFinal(costo) {
    if (costo < 2000) {
        return (`El costo final es $${costo}, no se aplican descuentos.`)
    } else if (costo < 4000) {
        return (`Con el %15 de descuento, el costo final es $${costo * 0.85}.`)
    } else {
        return (`Con el %20 de descuento, el costo final es $${costo * 0.8}, además tiene envío gratis.`)
    }
}

function detalleCarrito(carrito) {
    if (carrito.length == 0) {
        return (`
            <div class="centradoHoriz"> 
                <p class="textGenParrafoCarrito"> No hay productos en el carrito.</p>
                <button class="botonesCarrito textGenParrafoCarrito" type="button" id="botonFinalizarCompra" name="botonFinalizarCompra"> Finalizar compra</button>
            </div>
        `
        )
    } else {
        return (`
            <div class="centradoHoriz"> 
                <p class="textGenParrafoCarrito"> ${detalleCostoFinal(costoFinal(carrito))} </p>
                <button class="textGenParrafo botonesCarrito" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight-Form" aria-controls="offcanvasRight-Form"> 
                                finalizar compra </button>
            </div>
        `
        )
    }
}

function eliminarProducto(indice, carrito) {
    $('#divCarrito').empty()
    carrito.splice(indice, 1)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    $(`#productoCarrito${indice}`).remove()
    $('#divCarrito').append(detalleCarrito(carrito))
}

function actualizoCostos(productoEnCarrito, carritoUsuario) {
    $(`#subtotal${productoEnCarrito[0].id}`).empty()
    $(`#subtotal${productoEnCarrito[0].id}`).append(`${subtotal(productoEnCarrito)}`)
    $('#divCarrito').empty()
    $('#divCarrito').append(detalleCarrito(carritoUsuario))
}

// Variables
let carritoUsuario
let valor

$(() => {
    // Consulto si tengo algo guardado en el localStorage
    carritoUsuario = JSON.parse(localStorage.getItem('carrito'))
    if (carritoUsuario == null) {
        carritoUsuario = []
    }

    // armo el carrito
    carritoUsuario.forEach((productoEnCarrito, indice) => {
        $('#tablaCarrito').append(`
            <tr id="productoCarrito${indice}">
                <th scope="row" class="textGenParrafoCarrito">
                    ${productoEnCarrito[0].nombre} ${productoEnCarrito[0].color}, ${productoEnCarrito[0].detalle}
                    </br>
                    <button class="botonesDelCarrito" type="button" id="botonMenos${productoEnCarrito[0].id}" name="botonMenos${productoEnCarrito[0].id}"><i class="bi bi-dash"></i></button>
                    <input class="botonesDelCarrito" type="button" id="cantidad${productoEnCarrito[0].id}" name="cantidad${productoEnCarrito[0].id}" value="${productoEnCarrito[1]}">                        
                    <button class="botonesDelCarrito" type="button" id="botonMas${productoEnCarrito[0].id}" name="botonMas${productoEnCarrito[0].id}"><i class="bi bi-plus"></i></button>
                    <button class="botonesDelCarrito" type="button" id="botonEliminar${productoEnCarrito[0].id}" name="botonEliminar${productoEnCarrito[0].id}"><i class="bi bi-trash"></i></button>
                </th>
                <th scope="row" class="textGenParrafoCarrito" id="subtotal${productoEnCarrito[0].id}"> ${subtotal(productoEnCarrito)} </th>                    
            </tr>
        `
        )

        // Click en el boton ELIMINAR - saco el producto del carrito
        $(`#botonEliminar${productoEnCarrito[0].id}`).click(() => {
            eliminarProducto(indice, carritoUsuario)
        })

        // Click en el boton MAS - modifico la cantidad sumando
        $(`#botonMas${productoEnCarrito[0].id}`).click(() => {
            productoEnCarrito[1] += 1
            localStorage.setItem('carrito', JSON.stringify(carritoUsuario))
            valor = document.getElementById(`cantidad${productoEnCarrito[0].id}`)
            valor.value = `${productoEnCarrito[1]}`
            actualizoCostos(productoEnCarrito, carritoUsuario)
        })

        // Click en el boton MENOS - modifico la cantidad restando
        $(`#botonMenos${productoEnCarrito[0].id}`).click(() => {
            valor = document.getElementById(`cantidad${productoEnCarrito[0].id}`)
            if (parseInt(valor.value) == 1) {
                eliminarProducto(indice, carritoUsuario)
            } else {
                productoEnCarrito[1] -= 1
                localStorage.setItem('carrito', JSON.stringify(carritoUsuario))
                valor.value = `${productoEnCarrito[1]}`
                actualizoCostos(productoEnCarrito, carritoUsuario)
            }
        })
    })

    $('#divCarrito').empty()
    $('#divCarrito').append(detalleCarrito(carritoUsuario))

    // Finalizo la compra

})









// Funciones
function costoFinal(carrito) {
    let costoF = 0
    carrito.forEach(producto => {
        costoF += producto.precio
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

// Variables
let carritoUsuario
let contador
let cantidad
let costo


$(() => {
    carritoUsuario = JSON.parse(localStorage.getItem('carrito'))
    if (carritoUsuario == null) {
        carritoUsuario = []
    }

    carritoUsuario.forEach((producto, indice) => {
        $('#tablaCarrito').append(`
            <tr id="productoCarrito${indice}">
                <th scope="row" class="textGenParrafo">
                    ${producto.nombre} ${producto.color}, ${producto.detalle}
                    </br>
                    <input class="btn btn-outline-secondary" type="button" id="cantidad${producto.id}" name="cantidad${producto.id}" value="1">                        
                    <button class="btn btn-outline-secondary" type="button" id="botonEliminar${producto.id}" name="botonMas${producto.id}"><i class="bi bi-trash"></i></button>
                </th>
                <th scope="row" class="textGenParrafo"> ${producto.precio} </th>                    
            </tr>
        `
        )

        $(`#botonEliminar${producto.id}`).click(() => {
            $('#divCarrito').empty()
            carritoUsuario.splice(indice, 1)
            localStorage.setItem('carrito', JSON.stringify(carritoUsuario))            
            $(`#productoCarrito${indice}`).remove()

            
            if (carritoUsuario.length == 0) {
                $('#divCarrito').append(`
                    <p class="textGenParrafo"> No hay productos en el carrito.</p>
                `
                )
            } else {
                costo = costoFinal(carritoUsuario)
                $('#divCarrito').append(`
                    <p class="textGenParrafo"> ${detalleCostoFinal(costo)} </p>
                `
                )
            }
        })

    })


    $('#divCarrito').empty()
    if (carritoUsuario.length == 0) {
        $('#divCarrito').append(`
            <p class="textGenParrafo"> No hay productos en el carrito.</p>
        `
        )
    } else {
        costo = costoFinal(carritoUsuario)
        $('#divCarrito').append(`
            <p class="textGenParrafo"> ${detalleCostoFinal(costo)} </p>
        `
        )
    }


})




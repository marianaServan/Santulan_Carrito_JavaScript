// Funciones
function costoTotal(costoProd, cantidad) {
    let costoParticular = costoProd * cantidad
    return costoParticular
}

function costoFinal(costo) {
    if (costo < 2000) {
        return (`El costo final es $${costo}, no se aplican descuentos.`)
    } else if (costo < 4000) {
        return (`Con el %15 de descuento, el costo final es $${costo * 0.85}.`)
    } else {
        return (`Con el %20 de descuento, el costo final es $${costo * 0.8}, además tiene envío gratis.`)
    }
}

// Variables
let cantidad
let costo = 0
let contador = 1
let carritoAlmacenado
let carritoGuardado
let costoAlmacenado
let costoGuardado

// Objetos
class Producto {
    constructor(nombre, precio, color, tela) {
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tela = tela;
    }

    cardProducto() {
        return `
            <div class="col-3"> 
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title"> ${this.nombre.toUpperCase()}</h5>
                        <p class="card-text">
                            Disponible: ${this.nombre} color ${this.color}, de ${this.tela}. <br> Precio: $${this.precio}
                        </p>
                        <div class="input-group">
                            <input type="number" class="form-control" placeholder="1" id="cantidad${this.nombre}" name="cantidad${this.nombre}" value="1">
                            <button class="btn btn-outline-secondary" type="button" id="botonMas${this.nombre}" name="botonMas${this.nombre}">+</button>
                            <button class="btn btn-outline-secondary" type="button" id="botonAgrega${this.nombre}" name="botonAgrega${this.nombre}">Agregar al
                            carrito</button>
                        </div>                    
                    </div>
                </div>
            </div>
        `
    }
}

const remeraBlanca = new Producto("remera", 1800, "blanca", "jersey")
const sweaterGris = new Producto("sweater", 2500, "gris", "lanilla")
const camperaAzul = new Producto("campera", 3500, "azul francia", "frisa de algodón")

// Arrays
const productos = [remeraBlanca, sweaterGris, camperaAzul]
const carritoUsuario = []

$(() => {
    // Agrego los productos disponibles al HTML
    productos.forEach(producto => {
        $('#divProductos').append(producto.cardProducto());
    })

    // Veo si dejó el carrito cargado de otra sesión
    carritoAlmacenado = JSON.parse(localStorage.getItem('Carrito'))
    if (carritoAlmacenado != null) {
        carritoAlmacenado.forEach(compra => {
            carritoUsuario.push({ productoComprado: compra.productoComprado, cantidadComprada: compra.cantidadComprada })
        })
    }

    costoAlmacenado = JSON.parse(localStorage.getItem('Costo'))
    if (costoAlmacenado != null) {
        costo = costoAlmacenado
    }

    // Agrego al carrito
    productos.forEach(producto => {
        let cantidadProd = $(`#cantidad${producto.nombre}`)

        $(`#botonMas${producto.nombre}`).click(() => {
            contador = parseInt(cantidadProd.val()) + 1
            cantidadProd.val(`${contador}`)
        })

        $(`#botonAgrega${producto.nombre}`).click(() => {
            cantidad = parseInt(cantidadProd.val())
            carritoUsuario.push({ productoComprado: producto, cantidadComprada: cantidad })
            carritoGuardado = localStorage.setItem('Carrito', JSON.stringify(carritoUsuario))

            costo += costoTotal(producto.precio, cantidad)
            costoGuardado = localStorage.setItem('Costo', JSON.stringify(costo))

            $('#divAgregadoCorrecto').empty()
            $('#divAgregadoCorrecto').append(`
                <p> Se ha agregado correctamente ${cantidad} ${producto.nombre} al carrito. </p>
            `
            )
            $('#divCarrito').empty()
        })
    })

    // Muestro el carrito
    $('#verCarrito').click(() => {
        $('#divCarrito').empty()
        carritoAlmacenado = JSON.parse(localStorage.getItem('Carrito'))
        costoAlmacenado = JSON.parse(localStorage.getItem('Costo'))

        if (carritoAlmacenado.length == 0) {
            $('#divCarrito').append(`
                <p> No hay productos en el carrito.</p>
            `
            )
        } else {
            $('#divCarrito').append(`
                <p> En el carrito:</p>
            `
            )

            carritoAlmacenado.forEach(compra => {
                $('#divCarrito').append(`
                <p> ${compra.productoComprado.nombre} ----- ${compra.cantidadComprada} x $${compra.productoComprado.precio} </p>
                `
                )
            })

            $('#divCarrito').append(`
                <p> ${costoFinal(costoAlmacenado)} </p>
            `
            )
        }
    })
})


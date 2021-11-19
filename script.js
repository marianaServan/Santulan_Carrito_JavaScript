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

// Objetos
class Producto {
    constructor(nombre, precio, color, tela) {
        this.nombre = nombre;
        this.precio = precio;
        this.color = color;
        this.tela = tela;
    }

    descripcion() {
        return (`Disponible: ${this.nombre} color ${this.color}, de ${this.tela}. <br> Precio: $${this.precio}`)
    }
}

const remeraBlanca = new Producto("remera", 1800, "blanca", "jersey")
const sweaterGris = new Producto("sweater", 2500, "gris", "lanilla")
const camperaAzul = new Producto("campera", 3500, "azul francia", "frisa de algodón")

// Arrays
const productos = [remeraBlanca, sweaterGris, camperaAzul]
const carritoUsuario = []

// Agrego los productos disponibles al HTML
productos.forEach(producto => {
    let cardProducto = document.createElement("div")
    cardProducto.className = "col-3"
    cardProducto.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"> ${producto.nombre.toUpperCase()}</h5>
                <p class="card-text"> ${producto.descripcion()}</p>
                <div class="input-group">
                    <input type="number" class="form-control" placeholder="1" id="cantidad${producto.nombre}" name="cantidad${producto.nombre}" value="1">
                    <button class="btn btn-outline-secondary" type="button" id="mas${producto.nombre}" name="mas${producto.nombre}">+</button>
                    <button class="btn btn-outline-secondary" type="button" id="agrega${producto.nombre}" name="agrega${producto.nombre}">Agregar al
                    carrito</button>
                </div>                    
            </div>
        </div>
    `
    divProductos.appendChild(cardProducto) //agrega el elemento al DOM
})

// Agrego al carrito
let divAgregadoCorrecto = document.getElementById("divAgregadoCorrecto")
let divCarrito = document.getElementById("divCarrito")

let carritoGuardado = localStorage.setItem('Carrito', JSON.stringify(carritoUsuario))
productos.forEach(producto => {
    let cantidadProd = document.getElementById(`cantidad${producto.nombre}`)
    let mas = document.getElementById(`mas${producto.nombre}`)
    let agrega = document.getElementById(`agrega${producto.nombre}`)
    
    mas.addEventListener("click", () => {
        contador = parseInt(cantidadProd.value) + 1
        cantidadProd.value= `${contador}`
    })

    agrega.addEventListener("click", () => {
        cantidad = parseInt(cantidadProd.value)
        carritoUsuario.push({productoComprado: producto, cantidadComprada: cantidad})
        carritoGuardado = localStorage.setItem('Carrito', JSON.stringify(carritoUsuario))
        costo += costoTotal(producto.precio, cantidad)
    
        divAgregadoCorrecto.innerHTML = `
            <p> Se ha agregado correctamente ${cantidad} ${producto.nombre} al carrito. </p>
        `    
        divCarrito.innerHTML = ``
    })
})



// Muestro el carrito
let verCarrito = document.getElementById("verCarrito")
verCarrito.addEventListener("click", () => {
    divCarrito.innerHTML = ``    
    carritoAlmacenado = JSON.parse(localStorage.getItem('Carrito'))
    if (carritoAlmacenado.length == 0) {
        let carritoVacio = document.createElement("p")
        carritoVacio.innerText = "No hay productos en el carrito"
        divCarrito.appendChild(carritoVacio) 
    } else {
        let contenidoCarrito = document.createElement("p")
        contenidoCarrito.innerText = "En el carrito:" 
        divCarrito.appendChild(contenidoCarrito) 

        carritoAlmacenado.forEach(compra => {
            let productoEnCarrito = document.createElement("p")
            productoEnCarrito.innerText = `${compra.productoComprado.nombre} ----- ${compra.cantidadComprada} x $${compra.productoComprado.precio}`
            divCarrito.appendChild(productoEnCarrito) 
        })
        let detalleCosto = document.createElement("p") 
        detalleCosto.innerText = `${costoFinal(costo)}` 
        divCarrito.appendChild(detalleCosto) 
    }
})

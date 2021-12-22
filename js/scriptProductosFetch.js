// Con este script agrego los productos a las páginas remeras, sweaters y camperas, mediante fetch


// Variables
let remerasDisponibles = document.getElementById("remerasDisponibles")
let sweatersDisponibles = document.getElementById("sweatersDisponibles")
let camperasDisponibles = document.getElementById("camperasDisponibles")

let enCarrito
let posicionEnCarrito

//  Funciones
function cardProducto(producto) {
    return (`
    <div class="col-6 col-md-4 col-lg-3" id="producto${producto.id}">                    
        <div class="centradoHoriz cardAlto">
            <div class="cardEstilo" style="position: relative;">   
                <div class="container mensaje" id="divAgregadoCorrecto${producto.id}" style="position: absolute;"></div>                         
                <img src="${producto.imagen}" class="img-fluid bordeImagen" alt="${producto.nombre} ${producto.color}">
                <div class="cardBody">
                    <p class="card-text"> ${producto.nombre} ${producto.color}, ${producto.detalle} </p>
                    <div class="centradoHoriz"> 
                        <p class="card-text" style="margin-bottom : 0px"> $${producto.precio} </p>
                        <button id="botonCarrito${producto.id}" class="textGenParrafo botonesCarrito"> <i class="bi bi-cart-fill"></i> </button>
                    </div>                                 
                </div>
            </div> 
        </div>                               
    </div>
    `)
}

function guardarCarrito(producto) {
    $(`#divAgregadoCorrecto${producto.id}`).empty()
    $(`#divAgregadoCorrecto${producto.id}`).append(`
        <p> Se ha agregado correctamente 1 ${producto.nombre} al carrito. </p>
        `
    )
    $(`#divAgregadoCorrecto${producto.id}`).slideDown(1000).delay(1000).fadeOut(1000)
}

function agregarEventListener(producto) {
    enCarrito = false
    document.getElementById(`botonCarrito${producto.id}`).addEventListener("click", () => {
        $(`#divAgregadoCorrecto${producto.id}`).hide()

        carritoUsuario = JSON.parse(localStorage.getItem('carrito'))
        if (carritoUsuario == null) {
            carritoUsuario = []
        }
        
        // miro si ya está en el carrito
        carritoUsuario.forEach(productoEnCarrito => {
            if (producto.id == productoEnCarrito[0].id) {
                enCarrito = true
                posicionEnCarrito = carritoUsuario.indexOf(productoEnCarrito)
            }
        })

        // si no está en el carrito lo agrego
        if (!enCarrito) {
            carritoUsuario.push([producto, 1])
            localStorage.setItem('carrito', JSON.stringify(carritoUsuario))
            guardarCarrito(producto)

        } else { // si está en el carrito, aviso que ya está y sumo
            carritoUsuario[posicionEnCarrito][1] += 1
            localStorage.setItem('carrito', JSON.stringify(carritoUsuario))
            guardarCarrito(producto)
        }
    })
}

// agrego los productos a la página correspondiente
fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(producto => {
            if (remerasDisponibles != null && producto.nombre == "Remera") {
                remerasDisponibles.innerHTML += cardProducto(producto)
            } else if (sweatersDisponibles != null && producto.nombre == "Sweater") {
                sweatersDisponibles.innerHTML += cardProducto(producto)
            } else if (camperasDisponibles != null && producto.nombre == "Campera") {
                camperasDisponibles.innerHTML += cardProducto(producto)
            }
        })

        data.forEach(producto => {
            if (remerasDisponibles != null && producto.nombre == "Remera") {
                agregarEventListener(producto)
            } else if (sweatersDisponibles != null && producto.nombre == "Sweater") {
                agregarEventListener(producto)
            } else if (camperasDisponibles != null && producto.nombre == "Campera") {
                agregarEventListener(producto)
            }
        })
    });


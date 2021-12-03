let camperasDisponibles = document.getElementById("camperasDisponibles")

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        data.forEach((producto, indice) => {
            if (producto.nombre == "Campera") {
                camperasDisponibles.innerHTML += `
                <div class="col-6 col-md-4 col-lg-3" id="producto${indice}">                    
                    <div class="centradoHoriz cardAlto">
                        <div class="cardEstilo" style="position: relative;">   
                            <div class="container mensaje" id="divAgregadoCorrecto${indice}" style="position: absolute;"></div>                         
                            <img src="${producto.imagen}" class="img-fluid bordeImagen" alt="${producto.nombre} ${producto.color}">
                            <div class="cardBody">
                                <p class="card-text"> ${producto.nombre} ${producto.color}, ${producto.detalle} </p>
                                <div class="centradoHoriz"> 
                                    <p class="card-text" style="margin-bottom : 0px"> $${producto.precio} </p>
                                    <button id="botonCarrito${indice}" class="textGenParrafo botonesCarrito"> <i class="bi bi-cart-fill"></i></button>
                                </div>                                 
                            </div>
                        </div> 
                    </div>                               
                </div>
                `
            } 

        });

        data.forEach((producto,indice) =>{
            if(producto.nombre == "Campera") {
                document.getElementById(`botonCarrito${indice}`).addEventListener("click", () => {
                    $(`#divAgregadoCorrecto${indice}`).hide()

                    carritoUsuario.push(producto)
                    localStorage.setItem('carrito', JSON.stringify(carritoUsuario))

                    $(`#divAgregadoCorrecto${indice}`).empty()
                    $(`#divAgregadoCorrecto${indice}`).append(`
                        <p> Se ha agregado correctamente 1 ${producto.nombre} al carrito. </p>
                        `
                    )

                    $(`#divAgregadoCorrecto${indice}`).slideDown(1000).delay(1000).fadeOut(1000)
                })
            }
        })
    })


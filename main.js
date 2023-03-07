// variables que mantiene el estado visible del carrito

let carritoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){

    let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
    for(let i=0;i<botonesEliminarItem.length; i++){
        let button = botonesEliminarItem[i];
        button.addEventListener("click",eliminarItemCarrito);
    }

    let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad")
    for(let i=0;i<botonesSumarCantidad.length; i++){
        let button = botonesSumarCantidad [i]
        button.addEventListener("click",sumarCantidad)
    }

    let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
    for(let i=0;i<botonesRestarCantidad.length; i++){
        let button = botonesRestarCantidad[i];
        button.addEventListener("click", restarCantidad);
    }

}

function eliminarItemCarrito(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    actualizarTotalCarrito();

    ocultarCarrito()
    }

function actualizarTotalCarrito(){
    let carritoContenedor = document.getElementsByClassName("carrito")[0]
    let carritoItems = carritoContenedor.getElementsByClassName("carrito-item")
    let total = 0;
    
    for(let i=0; i < carritoItems.length;i++){
        let item =carritoItems[i];
        let precioElemento = item.getElementsByClassName("carrito-item-precio") [0]
        console.log(precioElemento);

        let precio = parseFloat(precioElemento.innerText.replace("S/", "").replace(",",""))
        console.log(precio);
        let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0]
        let cantidad = cantidadItem.value
        console.log(cantidad);
        total = total + (precio * cantidad)
        
    }
    total = Math.round(total*100)/10000
    document.getElementsByClassName("carrito-precio-total")[0].innerText = "S/" + total.toLocaleString("es") 
}

function ocultarCarrito(){
    let carritoItems = document.getElementsByClassName("carrito-items")[0]
    if(carritoItems.childElementCount==0){
        let carrito =document.getElementsByClassName("carrito")[0]
        carrito.style.marginRight="-34%"
        carrito.style.opacity="0"
        carritoVisible = false

        let items = document.getElementsByClassName("contenedor-items") [0]
        items.style.width = "34%"
        
    }
}

function sumarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement
    console.log(selector.getElementsByClassName("carrito-item-cantidad")[0].value);
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    cantidadActual++;
    selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName("carrito-item-cantidad")[0].value);
    let cantidadActual = selector.getElementsByClassName("carrito-item-cantidad")[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName("carrito-item-cantidad")[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}


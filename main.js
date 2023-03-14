// variables que mantiene el estado visible del carrito

let carritoVisible = false;

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

const productos = {
    "cervezaSaison": [
        {
            "id": "1",
            "name": "Saison" ,
            "alcohol": "5%",
            "precio": "13 Soles",
            "cantidad": "350 mililitros"
        }
        
    ],

    "cervezaMaracuya": [
        {
            "id": "2",
            "name": "Maracuyá" ,
            "alcohol": "8%",
            "precio": "15 Soles",
            "cantidad": "350 mililitros"
        }
        
    ],

    "cervezaGoldenAle": [
        {
            "id": "3",
            "name": "Golden Ale" ,
            "alcohol": "10%",
            "precio": "17 Soles",
            "cantidad": "350 mililitros"
        }
        
    ]
}

const guardarLocal = (clave, valor) => { localStorage.detItem(clave, valor)};
for (const producto of productos) {
    guardarLocal(producto.id, JSON.stringify(producto))
}

guardarLocal("listaProductos", JSON.stringify(productos));
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


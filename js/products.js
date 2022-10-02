const CONTAINER_PRODUCTOS =  document.getElementById("container-products");
const BTN_FILTRAR = document.getElementById('filtrar');
const BTN_PRECIO_ASCENDENTE = document.getElementById('precio-ascendente');
const BTN_PRECIO_DESCENDENTE = document.getElementById('precio-descendente');
const BTN_MAS_VENDIDOS = document.getElementById('mas-vendidos');
let inputPrecioMin = document.getElementById('precio-min');
let inputPrecioMax = document.getElementById('precio-max');
let productsArray = [];
let htmlContentToAppend = '';
 
 fetch(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE) 
.then(response => response.json())
.then(data => {
    productsArray = data.products;
    console.log(productsArray)
    mostrarProductos(productsArray);

});


function mostrarProductos(productsArray){
    let preciosFiltrados = filtrarPorPrecio(productsArray)
    for(let producto of preciosFiltrados){
         htmlContentToAppend += `
        <div onclick="setProductID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${producto.name}</h4>
                        <small class="text-muted">${producto.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${producto.description}</p>
                    <h3 class="mb-1">${producto.currency} ${producto.cost}</h3>
                </div>
            </div>
        </div>
        `
         }
    //   CONTAINER_PRODUCTOS.addEventListener('click', (e)=> {
    //     localStorage.setItem('productID', ``);
    //     window.location.href = 'product-info.html';
     //  })
     CONTAINER_PRODUCTOS.innerHTML = htmlContentToAppend;
    }
   
   


function filtrarPorPrecio(array){
    return array.filter(producto => {
        if(inputPrecioMin.value === '' && inputPrecioMax.value === ''){
            return true;
        }
        else if(inputPrecioMin.value === ''){
            return producto.cost <= inputPrecioMax.value;
        }
        else if(inputPrecioMax.value === ''){
            return producto.cost >= inputPrecioMin.value;
        }
        return producto.cost >= inputPrecioMin.value && producto.cost <= inputPrecioMax.value;
    })
};

BTN_FILTRAR.addEventListener('click', ()=>{
    htmlContentToAppend = '';
    mostrarProductos(filtrarPorPrecio(productsArray))
});


BTN_MAS_VENDIDOS.addEventListener('click', ()=> {
    htmlContentToAppend = '';
    productsArray.sort((producto1, producto2)=> {
        if(producto1.soldCount > producto2.soldCount){
            return -1;
        }
        
    })
    mostrarProductos(filtrarPorPrecio(productsArray));
});

BTN_PRECIO_ASCENDENTE.addEventListener('click', ()=> {
    htmlContentToAppend = "";
    productsArray.sort((producto1, producto2)=> {
        if(producto1.cost < producto2.cost){
            return -1;
        }else if(producto1.cost > producto2.cost){
            return 1;
        }else {
            return 0;
        }
    })
    mostrarProductos(filtrarPorPrecio(productsArray))
});


BTN_PRECIO_DESCENDENTE.addEventListener('click', ()=> {
    htmlContentToAppend = "";
    productsArray.sort((producto1, producto2)=> {
        if(producto1.cost > producto2.cost){
            return -1;
        }else if(producto1.cost < producto2.cost){
            return 1;
        }else {
            return 0;
        }
    })
    mostrarProductos(filtrarPorPrecio(productsArray))
});

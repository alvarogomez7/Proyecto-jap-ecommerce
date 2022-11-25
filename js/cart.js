const TABLE_CART = document.getElementById('table-cart');
let imgTable = document.getElementById('table-img');
let nameTable = document.getElementById('table-name');
let costTable = document.getElementById('table-cost');
let inputNumberTable = document.getElementById('table-input');
let subTTable = document.getElementById('table-subtotal');
let radioPremium = document.getElementById('radio-1');
let radioExpress = document.getElementById('radio-2');
let radioStandard = document.getElementById('radio-3');
let costoSubtotal = document.getElementById('costo-subtotal');
let costoEnvio = document.getElementById('costo-envío');
let costoTotal = document.getElementById('costo-total');
let form = document.getElementById('formulario-radio');
let formDireccion = document.getElementById('form-direccion')
let carrito = [];
const ID_USER = 25801;



fetch(CART_INFO_URL + ID_USER  + EXT_TYPE)
.then(response => response.json())
.then(data => {
    console.log(data.articles);
        carrito = data.articles;
    for(let articulo of carrito){
         let tipoMoneda = document.querySelectorAll(".tipo-de-moneda");
        tipoMoneda.forEach(item =>item.innerHTML = articulo.currency + " ")
        console.log(articulo);
        imgTable.innerHTML = `<img class="col-9 col-md-6 col-lg-3" src="${articulo.image}" alt="${articulo.name}">`;
        nameTable.innerHTML = articulo.name;
        costTable.innerHTML = `${articulo.currency} ${articulo.unitCost}`;
        inputNumberTable.value = articulo.count;
       
        inputNumberTable.addEventListener('input',()=>{
            calculoDeSubTotal(carrito);
            costoSubtotal.innerHTML = calculoDeSubTotal(carrito)
            radioPremium.addEventListener('input', calculoDeEnvio);
            radioExpress.addEventListener('input', calculoDeEnvio);
            radioStandard.addEventListener('input', calculoDeEnvio);
            calculoTotal();
        });     

        
       
    }

})
       

      
 function calculoDeSubTotal(arr){
    for(let articulo of arr){

        subTTable.innerHTML = inputNumberTable.value * articulo.unitCost;
    }

    return subTTable.innerHTML;
} 

function calculoDeEnvio(){
    return  costoEnvio.innerHTML = parseInt(calculoDeSubTotal(carrito) * form.envio.value);
    
}

function calculoTotal(){
     costoTotal.innerHTML = parseInt(calculoDeEnvio()) + parseInt(calculoDeSubTotal(carrito));
}








formDireccion.addEventListener('submit', (e)=>{
    if(!formDireccion.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
        
    }else {
        formDireccion.innerHTML = `<div class="alert alert-success compra-realizada" role="alert">
    compra realizada con éxito
  </div>`;
    }
    formDireccion.classList.add('was-validated');
    

      
      
})

document.getElementById('tarjeta-credito').addEventListener('input', ()=> {
    document.getElementById('cuenta-bancaria').disabled = true;
    document.getElementById('numero-tarjeta').disabled = false;
    document.getElementById('codigo-seg').disabled = false;
    document.getElementById('vencimiento').disabled = false
})

document.getElementById('transferencia-bancaria').addEventListener('input', ()=> {
    document.getElementById('numero-tarjeta').disabled = true;
    document.getElementById('codigo-seg').disabled =true;
    document.getElementById('vencimiento').disabled =true
    document.getElementById('cuenta-bancaria').disabled = false;

})
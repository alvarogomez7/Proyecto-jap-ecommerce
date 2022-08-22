    let carsArray = [];
    let htmlContentToAppend = "";
 
 fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
.then(response => response.json())
.then(data => {
    carsArray = data.products;
    for(let auto of carsArray){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${auto.image}" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${auto.name}</h4>
                        <small class="text-muted">${auto.soldCount} vendidos</small>
                    </div>
                    <p class="mb-1">${auto.description}</p>
                    <h3 class="mb-1">${auto.currency} ${auto.cost}</h3>
                </div>
            </div>
        </div>
        `
        document.getElementById("container-products").innerHTML = htmlContentToAppend;  
    }

}) 
 
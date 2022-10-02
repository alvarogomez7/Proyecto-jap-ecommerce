const CONTAINER_PRODUCT = document.getElementById('container-product');
let infoProduct = [];

fetch(PRODUCT_INFO_URL + localStorage.getItem("productID") + EXT_TYPE)
.then(response => response.json())
.then(data => {
    console.log(data)
    let htmlContentToAppend = '';
    let divContainer = document.createElement('div');
    htmlContentToAppend = `
        <h1>${data.name}</h1>
        <h3>${data.currency} ${data.cost}</h3>
    `
    for(let imagen of data.images){
      htmlContentToAppend += `
            <img src="${imagen}" alt="${data.name}" class="img-producto">
        `
    }

    htmlContentToAppend += `
        <p><b><i>Categoría</i></b>: ${data.category}</p>
        <hr>
        <p><b><i>Descripción</i></b>: ${data.description}</p>
        <hr>
        <p><b><i>Total de vendidos</i></b>: ${data.soldCount}</p>
        <hr>
    `
    htmlContentToAppend += `<p><b><i>Productos Relacionados: </i></b></p>`
    for(let productoRelacionado of data.relatedProducts){
            htmlContentToAppend += `<div onclick="setProductID(${productoRelacionado.id})" class="list-group-item-action cursor-active">
            <img src="${productoRelacionado.image}" alt="${productoRelacionado.name}" class="img-producto">
            <p>${productoRelacionado.name}</p>
        </div>
        `;
    
    }
    divContainer.innerHTML = htmlContentToAppend;
    CONTAINER_PRODUCT.appendChild(divContainer);

    fetch(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('productID') + EXT_TYPE)
    .then(res => res.json())
    .then(comentarios => {
        let titleComment = document.createElement('h3');
        titleComment.textContent = 'Comentarios';
        CONTAINER_PRODUCT.appendChild(titleComment);
        for(let comentario of comentarios){
            console.log(comentario)
             CONTAINER_PRODUCT.innerHTML += `<h5><b><i>${comentario.user} - </i></b>puntuación: <b style="color: #33f">${comentario.score}</b></h5>
             <p>${comentario.description}</p>
             <span><b>Fecha de publicación: </b>${comentario.dateTime}</span>
             <hr>
             <br>
             `
        }
    })
})



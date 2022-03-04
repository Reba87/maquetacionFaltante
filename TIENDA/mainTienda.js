3; //creando base de productos //

let productos = [
  {
    nombre: "Vintage Blazer",
    tag: "Blazer",
    precio: 150,
    img: `https://i.etsystatic.com/8003013/r/il/d3b4c1/2099228934/il_794xN.2099228934_q82x.jpg`,
    inCart: 0,
  },
  {
    nombre: "Chaleco Harley Davidson",
    tag: "Harley",
    precio: 200,
    img: `https://i.etsystatic.com/8003013/r/il/d61270/2126131849/il_794xN.2126131849_mpz4.jpg`,
    inCart: 0,
  },
  {
    nombre: "Sombrero Vintage",
    tag: "Sombrero",
    precio: 50,
    img: `https://i.etsystatic.com/12795398/r/il/3916fa/1947245555/il_794xN.1947245555_6zey.jpg`,
    inCart: 0,
  },
  {
    nombre: "Vintage Jacket",
    tag: "Jacket",
    precio: 80,
    img: `https://i.etsystatic.com/25806042/r/il/b6f8bd/3320065074/il_794xN.3320065074_kirz.jpg`,
    inCart: 0,
  },
  {
    nombre: "Chaleco 1940s",
    tag: "Chaleco",
    precio: 50,
    img: `https://i.etsystatic.com/20150533/r/il/0c090c/3529652179/il_794xN.3529652179_8q29.jpg`,
    inCart: 0,
  },
  {
    nombre: "Mickey Mouse Chaqueta",
    tag: "Mickey",
    precio: 400,
    img: `https://i.etsystatic.com/5236127/r/il/71f652/3643940487/il_794xN.3643940487_dvy2.jpg`,
    inCart: 0,
  },
];

let carts = document.querySelectorAll(`.btn`);

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(productos[i]);
    costeTotal(productos[i]);
  });
}

function cargarNumeros() {
  let numeroProductos = localStorage.getItem("cartNumbers");

  if (numeroProductos) {
    document.querySelector(`.span`).textContent = numeroProductos;
  }
}

function cartNumbers(producto) {
  let numeroProductos = localStorage.getItem("cartNumbers");
  numeroProductos = parseInt(numeroProductos);

  if (numeroProductos) {
    localStorage.setItem("cartNumbers", numeroProductos + 1);
    document.querySelector(`.span`).textContent = numeroProductos + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(`.span`).textContent = 1;
  }

  setItem(producto);
}

function setItem(producto) {
  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[producto.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [producto.tag]: producto,
      };
    }
    cartItems[producto.tag].inCart += 1;
  } else {
    producto.inCart = 1;
    cartItems = {
      [producto.tag]: producto,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function costeTotal(producto) {
  let cartCost = localStorage.getItem(`costoTotal`);
  cartCost = JSON.parse(cartCost);

  if (cartCost != null) {
    localStorage.setItem("costoTotal", cartCost + producto.precio);
  } else {
    localStorage.setItem("costoTotal", producto.precio);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let ProductosContain = document.querySelector(`.productos`);
  let cartCost = localStorage.getItem(`costoTotal`);

  if (cartItems && ProductosContain) {
    ProductosContain.innerHTML = ``;
    Object.values(cartItems).map((item) => {
      ProductosContain.innerHTML += `
    <div class = "producto"> 
    <table class="tabla">  
    <tr>
              
   <a type = "button" class="delet">Quitar</a>

    </tr>

    <tr>

   
    <img class ="imgCart" src ="./img/${item.tag}.jpg">
    <span class="nombre">${item.nombre}</span>
    

    </tr>
    
    <tr>
    <div class="price">${item.precio}€</div>
    </tr>
    
    <tr> <div class="cantidad">${item.inCart}</div></tr>
    <tr><div class="total">${item.inCart * item.precio}€</div></tr>
  </table>      
  </div>
    
    
      `;
    });

    ProductosContain.innerHTML += `
    <div class="totalCart">
    <h4 class="titleTotal">
      Total compra:  
    </h4>
    
    <h4 class ="totalCompra">
      ${cartCost}€
    </h4>
    </div>
    `
  }
}

cargarNumeros();
displayCart();

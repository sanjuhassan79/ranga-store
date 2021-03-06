  const loadProducts = () => {
      const url = `https://fakestoreapi.com/products`;
      fetch(url)
          .then((response) => response.json())
          .then((data) => showProducts(data));
  };
  loadProducts();

  // show all product in UI 
  const showProducts = (products) => {


      const allProducts = products.map((pd) => pd);
      for (const product of allProducts) {
          const image = product.image;
          const div = document.createElement("div");
          div.classList.add("product");
          div.innerHTML = `<div class="single-product my-5">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h4><span class="text-warning">Rate: ${product.rating.rate}</span> <span class="text-muted"> Review: ${product.rating.count}</span></h4>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-secondary">add to cart</button>
      <button onclick="displayDetail(${product?.id})" id="details-btn" class="btn btn-outline-info">Details</button></div>
      `;
          document.getElementById("all-products").appendChild(div);
      }
  };
  let count = 0;
  const addToCart = (id, price) => {
      count = count + 1;
      updatePrice("price", price);

      updateTaxAndCharge();
      document.getElementById("total-Products").innerText = count;
      updateTotal()
  };

  const getInputValue = (id) => {
      const element = document.getElementById(id).innerText;
      const converted = parseFloat(element);
      return converted;
  };

  // main price update function
  const updatePrice = (id, value) => {
      const convertedOldPrice = getInputValue(id);
      const convertPrice = parseFloat(value);
      const total = convertedOldPrice + convertPrice;


      console.log(total);
      document.getElementById(id).innerText = total.toFixed(2);
  };

  // set innerText function
  const setInnerText = (id, value) => {
      document.getElementById(id).innerText = Math.round(value);
  };

  // update delivery charge and total Tax
  const updateTaxAndCharge = () => {
      const priceConverted = getInputValue("price");
      if (priceConverted > 200) {
          setInnerText("delivery-charge", 30);
          setInnerText("total-tax", priceConverted * 0.2);
      }
      if (priceConverted > 400) {
          setInnerText("delivery-charge", 50);
          setInnerText("total-tax", priceConverted * 0.3);
      }
      if (priceConverted > 500) {
          setInnerText("delivery-charge", 60);
          setInnerText("total-tax", priceConverted * 0.4);
      }



  };

  //grandTotal update function
  const updateTotal = () => {
      const grandTotal =
          getInputValue("price") + getInputValue("delivery-charge") +
          getInputValue("total-tax");
      document.getElementById("total").innerText = grandTotal.toFixed(2);
  };
  // displayDetail
  const displayDetail = (item) => {



      const url = `https://fakestoreapi.com/products/${item}`
      fetch(url)
          .then(res => res.json())
          .then(data => itemDeatil(data))


  }

  const itemDeatil = (item) => {

      let showDeatilItem = document.getElementById('showDeatilItem');
      showDeatilItem.textContent = '';

      const div = document.createElement('div')
      div.innerHTML = `

<div class="detail-product">
      <div>
    <img class="product-image" src=${item.image}></img>
      </div>
      <h3>${item.title}</h3>
      <p>Category: ${item.category}</p>
      <h2>Price: $ ${item.price}</h2>
      <h4><span class="text-warning">Rate: ${item.rating.rate}</span> <span class="text-muted"> Review: ${item.rating.count}</span></h4>

`;

      showDeatilItem.appendChild(div)

  }
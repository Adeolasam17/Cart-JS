(function () {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.querySelector('.cart');
  cartInfo.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  })
})();

(function () {
  const cartBtn = document.querySelectorAll('.store-item-icon');
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (event.target.parentElement.classList.contains("store-item-icon")) {
        let fullPath = event.target.parentElement.previousElementSibling.src;
        let Position = fullPath.indexOf('img') + 3;
        let parPath = fullPath.slice(Position);
        
        const item = {};

        item.img = `img-cart/${parPath}`;

        let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
        item.name = name;

        let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice;
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
        cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">
              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>`;
        const cart = document.getElementById("cart");
        const Total = document.querySelector(".cart-total-container");
        cart.insertBefore(cartItem, Total);
        alert('Item Has Been Added To The Cart.');
        showTotal();
      };
    });
  });

  function showTotal() {
    const Total = [];
    const Items = document.querySelectorAll(".cart-item-price");

    Items.forEach((item) => {
      Total.push(parseFloat(item.textContent));
    });

    const totalMoney = Total.reduce((total, item) => {
      total += item;
      return total;
    }, 0);

    const finalMoney = totalMoney.toFixed(2);

    document.getElementById('cart-total').textContent = finalMoney;
    document.querySelector('.item-total').textContent = finalMoney;
    document.getElementById('item-count').textContent = Total.length;
  };

  const cart = document.querySelector('.cart');

  cart.addEventListener('click', (event) => {
    if (event.target.parentElement.classList.contains('cart-item-remove')) {
      deleteItem(event.target.parentElement.parentElement);
    }
  });

  function deleteItem(item) {
    const cart = document.getElementById("cart");
    cart.removeChild(item);
    showTotal();
  };

  const clearCart = document.getElementById('clear-cart');

  clearCart.addEventListener('click', clearItems)

  function clearItems() {
    const cart = document.getElementById("cart");
    const cartItem = document.querySelectorAll(".cart-item");
    if (cartItem.length > 0) {
      cartItem.forEach((item) => {
        cart.removeChild(item);
      });
    }
    showTotal();
    cart.classList.remove("show-cart");
  }
  
 
})();

(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const storeItem = document.querySelectorAll('.store-item');

  filterBtns.forEach((Btn) => {
    Btn.addEventListener('click', (event) => {
      event.preventDefault();
      const filter = event.target.dataset.filter

      storeItem.forEach((item) => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else if (item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      })
    })
  })
})();


(function () {
  const search = document.querySelector('#search-item');
  const storeItem = document.querySelectorAll('.store-item');

  search.addEventListener('keyup', (event) => {
    const searchFilter = event.target.value.toLowerCase().trim();
    
    storeItem.forEach((item) => {
      if (item.textContent.includes(searchFilter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    })
  })
})();

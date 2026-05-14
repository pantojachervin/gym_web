/* ══════════════════════════════════════════════
   DATA — 5 products per category
   Categories: Barbells, Racks, Plates, Cables,
               Apparel, Cardio, Accessories
══════════════════════════════════════════════ */
const PRODUCTS = [
  /* ── Barbells (5) ── */
  { id: 1,  cat: 'Barbells',    name: 'FF matte Bar Deluxe',           price: 349,  img: 'images/1.png' },
  { id: 2,  cat: 'Barbells',    name: 'FF Bar White Deluxe',           price: 129,  img: 'images/2.png' },
  { id: 3,  cat: 'Barbells',    name: 'FF Bar Green Deluxe',           price: 279,  img: 'images/3.png' },
  { id: 4,  cat: 'Barbells',    name: 'FF Heavy Duty foam Bar',            price: 199,  img: 'images/4.png' },
  { id: 5,  cat: 'Barbells',    name: 'FF bar pro',                    price: 289,  img: 'images/5.png' },

  /* ── Racks (5) ── */
  { id: 6,  cat: 'Racks',       name: 'FF Squat Cage Pro',              price: 899,  img: 'images/6.png' },
  { id: 7,  cat: 'Racks',       name: 'FF Half Rack Lite',              price: 599,  img: 'images/7.png' },
  { id: 8,  cat: 'Racks',       name: 'FF Foldable Rack',               price: 449,  img: 'images/8.png' },
  { id: 9,  cat: 'Racks',       name: 'FF Competition Power Rack',      price: 1199, img: 'images/9.png' },
  { id: 10, cat: 'Racks',       name: 'FF Adjustable Squat Stand',      price: 329,  img: 'images/10.png' },

  /* ── Plates (5) ── */
  { id: 11, cat: 'Plates',      name: 'FF CastIron Plates Set 60kg',      price: 199,  img: 'images/11.png' },
  { id: 12, cat: 'Plates',      name: 'FF Bumper Plate Set 100kg',        price: 389,  img: 'images/12.png' },
  { id: 13, cat: 'Plates',      name: 'FF Olympic Plates Set 100kg',       price: 49,   img: 'images/13.png' },
  { id: 14, cat: 'Plates',      name: 'FF Urethane Plate Set 50kg',       price: 159,  img: 'images/14.png' },
  { id: 15, cat: 'Plates',      name: 'FF Originals Pro Set 30kg',        price: 39,   img: 'images/15.png' },

  /* ── Cables (5) ── */ 
  { id: 16, cat: 'Cables',      name: 'FF LongBar Cable',                price: 1299, img: 'images/16.png' },
  { id: 17, cat: 'Cables',      name: 'FF Stainless Cable',              price: 89,   img: 'images/17.png' },
  { id: 18, cat: 'Cables',      name: 'FF Dual Pulley Cable System',     price: 999,  img: 'images/18.png' },
  { id: 19, cat: 'Cables',      name: 'FF Lat Pulldown Bar',             price: 59,   img: 'images/19.png' },
  { id: 20, cat: 'Cables',      name: 'FF Low Dual Pulley',              price: 749,  img: 'images/20.png' },

  /* ── Apparel (5) ── */
  { id: 21, cat: 'Apparel',     name: 'FF Compression Black Pro',             price: 59,   img: 'images/21.png' },
  { id: 22, cat: 'Apparel',     name: 'FF Compression Leggings',             price: 89,   img: 'images/22.png' },
  { id: 23, cat: 'Apparel',     name: 'FF Frontier Jacket',                  price: 139,  img: 'images/23.png' },
  { id: 24, cat: 'Apparel',     name: 'FF Performance Shorts',               price: 69,   img: 'images/24.png' },
  { id: 25, cat: 'Apparel',     name: 'FF Moisture-Wick Sando',              price: 45,   img: 'images/25.png' },

  /* ── Cardio (5) ── */
  { id: 26, cat: 'Cardio',      name: 'FF Cardio Extreme Pro',             price: 699,  img: 'images/26.png' },
  { id: 27, cat: 'Cardio',      name: 'FF Speed Pro',                     price: 259,   img: 'images/27.png' },
  { id: 28, cat: 'Cardio',      name: 'FF Air Rower Pro',                 price: 799,  img: 'images/28.png' },
  { id: 29, cat: 'Cardio',      name: 'FF HeavyDuty Machine',              price: 899,  img: 'images/29.png' },
  { id: 30, cat: 'Cardio',      name: 'FF Elite Set',                     price: 549,   img: 'images/30.png' },

  /* ── Accessories (5) ── */
  { id: 31, cat: 'Accessories', name: 'FF Mini pro',        price: 39,   img: 'images/31.png' },
  { id: 32, cat: 'Accessories', name: 'FF HeavyBall 8kg',         price: 74,   img: 'images/32.png' },
  { id: 33, cat: 'Accessories', name: 'FF Roap Set',             price: 55,   img: 'images/33.png' },
  { id: 34, cat: 'Accessories', name: 'FF Roller Foam',         price: 34,   img: 'images/34.png' },
  { id: 35, cat: 'Accessories', name: 'FF Resistance Grip Kit',       price: 49,   img: 'images/35.png' },
];

const ALL_LIMIT = 8;
const CAT_LIMIT = 5; /* shows all 5 when a category is selected */

const TICKERS = [
  'Free Shipping Over $150',
  'New: Titan Barbell Pro',
  'Rated #1 Gym Gear 2025',
  'Code FF20 = 20% Off',
  'Lifetime Warranty — No Receipts',
  '50,000+ Athletes Trust FITNESSFRONTIER'
];


let cart = {}, favs = new Set(), orders = [];
let activeFilter = 'All', showAllActive = false;
let checkoutStep = 0, checkoutData = {}, payMethod = 'card';
let currentUser = null;
let authPendingAction = null;

// Reset ticker animation
function resetTickerAnimation() {
  try {
    const ti = document.getElementById('ticker-inner');
    if (ti) {
      ti.style.animation = 'none';
      ti.offsetHeight;
      ti.style.animation = null;
    }
  } catch (e) {
    console.error('Ticker reset error:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Check if user is already logged in (from localStorage
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      updateAuthUI();
      loadUserData();
      loadCart();
    } catch (e) {
      console.error('Error loading saved user:', e);
      localStorage.removeItem('currentUser');
    }
  }
  
  
  // 2. Setup ticker
try {
  const ti = document.getElementById('ticker-inner');
  if (ti) {
    // Ilagay lang isang set ng TICKERS, hindi doble
    ti.innerHTML = TICKERS.map(t => `<span class="ticker-item">${t}<span class="ticker-dot"></span></span>`).join('');
    
    // Reset animation para magsimula
    resetTickerAnimation();
  }
} catch (e) {
  console.error('Ticker error:', e);
}
  // 3. Start intro animation
  setTimeout(() => {
    try {
      const introWords = document.querySelectorAll('#intro-word span');
      if (introWords.length > 0) {
        introWords.forEach((l, i) => {
          setTimeout(() => l.classList.add('up'), 68 * i + 200);
        });
      }
    } catch (e) {
      console.error('Intro animation error:', e);
    }
  }, 50);
  
  setTimeout(() => {
    const introLine = document.getElementById('intro-line');
    if (introLine) introLine.classList.add('show');
  }, 1050);
  
  setTimeout(() => {
    const intro = document.getElementById('intro');
    const header = document.getElementById('header');
    if (intro) intro.classList.add('out');
    if (header) header.classList.add('scrolled');
  }, 2100);
});

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', scrollY > 40);
});

function loadCart() {
  if (!currentUser) return;

  // 1️⃣ Load localStorage cart first
  const savedCart = localStorage.getItem('cart_' + currentUser.id);
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateBadges();
    renderCart();
  }

  
  fetch(`api/cart.php?user_id=${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success && data.cart) {
        
        const backendCart = {};
        data.cart.forEach(item => { backendCart[item.product_id] = item.quantity; });

       
        for (const id in backendCart) {
          if (!(id in cart)) cart[id] = backendCart[id];
        }

        
        localStorage.setItem('cart_' + currentUser.id, JSON.stringify(cart));
        updateBadges();
        renderCart();
      }
    })
    .catch(err => console.error('Failed to load cart:', err));
}

/* ══════════════════════════════════════════════
   FILTERS
══════════════════════════════════════════════ */
const cats = ['All', ...new Set(PRODUCTS.map(p => p.cat))];
document.getElementById('filters').innerHTML = cats
  .map(c => `<button class="filter-btn${c === 'All' ? ' active' : ''}" onclick="setFilter('${c}')">${c}</button>`)
  .join('');

function setFilter(c) {
  activeFilter = c;
  showAllActive = false;
  document.querySelectorAll('.filter-btn').forEach(b =>
    b.classList.toggle('active', b.textContent === c)
  );
  renderGrid();
}

function showAll() {
  showAllActive = true;
  renderGrid();
}

/* ══════════════════════════════════════════════
   PRODUCT GRID
══════════════════════════════════════════════ */
function renderGrid() {
  let list;
  if (activeFilter === 'All') {
    if (showAllActive) {
      list = PRODUCTS;
      document.getElementById('see-all-wrap').classList.remove('visible');
    } else {
      list = PRODUCTS.slice(0, ALL_LIMIT);
      document.getElementById('see-all-wrap').classList.toggle('visible', PRODUCTS.length > ALL_LIMIT);
    }
  } else {
    list = PRODUCTS.filter(p => p.cat === activeFilter).slice(0, CAT_LIMIT);
    document.getElementById('see-all-wrap').classList.remove('visible');
  }

  document.getElementById('product-grid').innerHTML = list.map(p => `
    <div class="prod-card">
      <div class="prod-img-wrap">
        <div class="img-slot"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <button class="prod-fav${favs.has(p.id) ? ' loved' : ''}" onclick="handleToggleFav(event,${p.id})">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-price">$${p.price.toLocaleString()}</div>
      </div>
      <div class="prod-cta">
        <button class="btn btn-dark btn-full" style="border-radius:8px" onclick="handleAddToCart(event,${p.id})">Add to Cart</button>
      </div>
    </div>`).join('');
}
renderGrid();

/* ══════════════════════════════════════════════
   CAROUSEL
══════════════════════════════════════════════ */
const ct = document.getElementById('carousel-track');
ct.innerHTML = [...PRODUCTS, ...PRODUCTS].map(p => `
  <div class="mini-card" onclick="handleAddToCart(null,${p.id})">
    <div class="mini-img"><div class="img-slot"><img src="${p.img}" alt="${p.name}" loading="lazy"></div></div>
    <div class="mini-body">
      <div class="mini-name">${p.name}</div>
      <div class="mini-price">$${p.price.toLocaleString()}</div>
    </div>
  </div>`).join('');

/* ══════════════════════════════════════════════
   AUTH GATE
══════════════════════════════════════════════ */
function requireAuth(action, gateMessage) {
  if (currentUser) {
    action();
  } else {
    authPendingAction = action;
    openAuth(gateMessage);
  }
}

/* ══════════════════════════════════════════════
   GUARDED ACTIONS
══════════════════════════════════════════════ */
function handleAddToCart(e, id) {
  if (e) e.stopPropagation();
  requireAuth(() => addToCart(id), '🔒 Sign in to add items to your cart and complete your purchase.');
}
function handleToggleFav(e, id) {
  if (e) e.stopPropagation();
  requireAuth(() => toggleFav(id), '🔒 Sign in to save your favourite products.');
}
function handleCartPanel() {
  requireAuth(() => openPanel('cart-panel'), '🔒 Sign in to view your cart.');
}
function handleFavPanel() {
  requireAuth(() => openPanel('fav-panel'), '🔒 Sign in to view your saved favourites.');
}
function handleOrderPanel() {
  requireAuth(() => openPanel('history-panel'), '🔒 Sign in to view your order history.');
}

/* ══════════════════════════════════════════════
   CART
══════════════════════════════════════════════ */
function addToCart(id) {
  if (!currentUser) return;

  fetch(`api/cart.php?user_id=${currentUser.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: id, quantity: 1 })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        cart[id] = (cart[id] || 0) + 1;
        updateBadges(); // important!
        renderCart();
        toast('Added to cart ✓');
      }
    })
    .catch(err => {
      console.error('Add to cart error:', err);
      cart[id] = (cart[id] || 0) + 1;
      updateBadges();
      renderCart();
      toast('Added to cart ✓');
    });
}
function removeFromCart(id) {
  if (!currentUser) return;
  
  fetch(`api/cart.php?user_id=${currentUser.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: id })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        delete cart[id];
        updateBadges();
        renderCart();
      }
    })
    .catch(err => {
      console.error('Remove from cart error:', err);
      delete cart[id];
      updateBadges();
      renderCart();
    });
}

function changeQty(id, d) {
  if (!currentUser) return;
  
  const newQty = (cart[id] || 0) + d;
  if (newQty <= 0) {
    removeFromCart(id);
    return;
  }

  fetch(`api/cart.php?user_id=${currentUser.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: id, quantity: newQty })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        cart[id] = newQty;
        updateBadges();
        renderCart();
      }
    })
    .catch(err => {
      console.error('Change qty error:', err);
      cart[id] = newQty;
      updateBadges();
      renderCart();
    });
}


function cartTotal() {
  return Object.entries(cart).reduce((s, [id, q]) => {
    const p = PRODUCTS.find(x => x.id == id);
    return s + (p ? p.price * q : 0);
  }, 0);
}

function renderCart() {
  const body = document.getElementById('cart-body');
  const foot = document.getElementById('cart-foot');
  const ids = Object.keys(cart);
  if (!ids.length) {
    body.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div><span class="empty-text">Your cart is empty</span></div>`;
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id == id), q = cart[id];
    return `<div class="cart-item"><div class="cart-thumb"><div class="img-slot"><img src="${p.img}" alt="${p.name}" loading="lazy"></div></div><div class="cart-info"><div class="cart-cat">${p.cat}</div><div class="cart-name">${p.name}</div><div class="cart-qty"><button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button><span class="qty-num">${q}</span><button class="qty-btn" onclick="changeQty(${p.id},1)">+</button></div><button class="cart-remove" onclick="removeFromCart(${p.id})">Remove</button></div><div class="cart-price">$${(p.price * q).toLocaleString()}</div></div>`;
  }).join('');
  const sub = cartTotal(), ship = sub >= 150 ? 0 : 12.99, tot = sub + ship;
  foot.innerHTML = `<div class="cart-summary"><div class="cart-row"><span>Subtotal</span><span>$${sub.toLocaleString()}</span></div><div class="cart-row"><span>Shipping</span><span>${ship === 0 ? '<span style="color:#2e7d32;font-weight:600">Free</span>' : '$' + ship.toFixed(2)}</span></div><div class="cart-row total"><span>Total</span><span>$${tot.toFixed(2)}</span></div></div><button class="btn btn-dark btn-full" onclick="goCheckout()">Checkout →</button>`;
}


/* ══════════════════════════════════════════════
   FAVOURITES
══════════════════════════════════════════════ */
function toggleFav(id) {
  if (!currentUser) return;
  
  const isCurrentlyFav = favs.has(id);
  
  if (isCurrentlyFav) {
    // Remove from wishlist
    fetch(`api/wishlist.php?user_id=${currentUser.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          favs.delete(id);
          updateBadges();
          renderGrid();
          renderFavs();
          toast('Removed from favourites');
        }
      })
      .catch(err => {
        console.error('Remove from wishlist error:', err);
        favs.delete(id);
        updateBadges();
        renderGrid();
        renderFavs();
        toast('Removed from favourites');
      });
  } else {
    // Add to wishlist
    fetch(`api/wishlist.php?user_id=${currentUser.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          favs.add(id);
          updateBadges();
          renderGrid();
          renderFavs();
          toast('Saved to favourites ♥');
        }
      })
      .catch(err => {
        console.error('Add to wishlist error:', err);
        favs.add(id);
        updateBadges();
        renderGrid();
        renderFavs();
        toast('Saved to favourites ♥');
      });
  }
}

function removeFav(id) {
  if (!currentUser) return;
  
  fetch(`api/wishlist.php?user_id=${currentUser.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: id })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        favs.delete(id);
        updateBadges();
        renderGrid();
        renderFavs();
      }
    })
    .catch(err => {
      console.error('Remove fav error:', err);
      favs.delete(id);
      updateBadges();
      renderGrid();
      renderFavs();
    });
}

function renderFavs() {
  const body = document.getElementById('fav-body');
  const foot = document.getElementById('fav-foot');
  if (!favs.size) {
    body.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><span class="empty-text">No favourites yet</span></div>`;
    foot.innerHTML = '';
    return;
  }
  body.innerHTML = [...favs].map(id => {
    const p = PRODUCTS.find(x => x.id == id);
    if (!p) return ''; // Skip if product not found
    return `<div class="fav-item">
      <div class="fav-thumb"><div class="img-slot"><img src="${p.img}" alt="${p.name}" loading="lazy"></div></div>
      <div class="fav-info">
        <div class="fav-cat">${p.cat}</div>
        <div class="fav-name">${p.name}</div>
        <div class="fav-price">$${p.price.toLocaleString()}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
        <button class="fav-add" onclick="handleAddToCart(null,${p.id})">Add to Cart</button>
        <button class="fav-rm" onclick="removeFav(${p.id})">Remove</button>
      </div>
    </div>`;
  }).join('');
  foot.innerHTML = `<button class="btn btn-dark btn-full" onclick="closePanel('fav-panel');openPanel('cart-panel')">View Cart</button>`;
}

/* ══════════════════════════════════════════════
   CHECKOUT
══════════════════════════════════════════════ */
function goCheckout() {
  if (!Object.keys(cart).length) { toast('Cart is empty!'); return; }
  checkoutStep = 0; checkoutData = {};
  closePanel('cart-panel');
  setTimeout(() => { openPanel('checkout-panel'); renderCheckout(); }, 350);
}

function renderCheckout() {
  const body = document.getElementById('checkout-body');
  const foot = document.getElementById('checkout-foot');
  const sub = cartTotal(), ship = sub >= 150 ? 0 : 12.99, tot = sub + ship;

  if (checkoutStep === 0) {
    body.innerHTML = `<div class="checkout-step"><div class="checkout-label">Contact</div><div class="input-row full"><input class="inp" id="co-email" type="email" placeholder="Email address" value="${checkoutData.email || currentUser?.email || ''}"></div><div class="input-row full" style="margin-top:8px"><input class="inp" id="co-phone" type="tel" placeholder="Phone number" value="${checkoutData.phone || ''}"></div></div><div class="checkout-step"><div class="checkout-label">Shipping Address</div><div class="input-row"><input class="inp" id="co-first" placeholder="First name" value="${checkoutData.first || currentUser?.name?.split(' ')[0] || ''}"><input class="inp" id="co-last" placeholder="Last name" value="${checkoutData.last || currentUser?.name?.split(' ')[1] || ''}"></div><div class="input-row full" style="margin-top:8px"><input class="inp" id="co-addr" placeholder="Street address" value="${checkoutData.addr || ''}"></div><div class="input-row" style="margin-top:8px"><input class="inp" id="co-city" placeholder="City" value="${checkoutData.city || ''}"><input class="inp" id="co-zip" placeholder="ZIP / Postcode" value="${checkoutData.zip || ''}"></div><div class="input-row full" style="margin-top:8px"><input class="inp" id="co-country" placeholder="Country" value="${checkoutData.country || 'Philippines'}"></div></div>`;
    foot.innerHTML = `<button class="btn btn-dark btn-full" onclick="checkoutNext()">Continue to Payment →</button>`;
  } else if (checkoutStep === 1) {
    body.innerHTML = `<div class="checkout-step"><div class="checkout-label">Order Summary</div>${Object.keys(cart).map(id => { const p = PRODUCTS.find(x => x.id == id); return `<div class="cart-row" style="margin-bottom:6px"><span>${p.name} × ${cart[id]}</span><span>$${(p.price * cart[id]).toLocaleString()}</span></div>`; }).join('')}<div class="cart-row total"><span>Total</span><span>$${tot.toFixed(2)}</span></div></div><div class="checkout-step"><div class="checkout-label">Payment Method</div><div class="method-grid"><button class="method-btn${payMethod === 'card' ? ' active' : ''}" onclick="setPay('card')">Card</button><button class="method-btn${payMethod === 'paypal' ? ' active' : ''}" onclick="setPay('paypal')">PayPal</button><button class="method-btn${payMethod === 'apple' ? ' active' : ''}" onclick="setPay('apple')">Apple Pay</button></div></div>${payMethod === 'card' ? `<div class="checkout-step"><div class="checkout-label">Card Details</div><div class="input-row full"><input class="inp" id="co-card" placeholder="Card number" maxlength="19" oninput="fmtCard(this)"></div><div class="input-row" style="margin-top:8px"><input class="inp" id="co-exp" placeholder="MM / YY" maxlength="7"><input class="inp" id="co-cvv" placeholder="CVV" maxlength="4"></div><div class="input-row full" style="margin-top:8px"><input class="inp" id="co-cname" placeholder="Name on card"></div></div>` : '<div style="text-align:center;padding:32px;color:var(--fg3);font-size:0.86rem;line-height:1.7">You\'ll be redirected to complete payment securely.</div>'}`;
    foot.innerHTML = `<button class="btn btn-light btn-full" style="margin-bottom:8px" onclick="checkoutStep=0;renderCheckout()">← Back</button><button class="btn btn-red btn-full" onclick="placeOrder()">Place Order — $${tot.toFixed(2)}</button>`;
  } else if (checkoutStep === 2) {
    body.innerHTML = `<div class="order-confirm"><div class="order-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div><div class="order-title">Order Confirmed!</div><div class="order-sub">Thank you, ${checkoutData.first || 'Athlete'}!<br>Your gear is being prepared.<br>Estimated delivery: 3–5 business days.</div><div style="margin-top:22px;padding:16px;background:var(--bg);border-radius:var(--radius);font-size:0.8rem;color:var(--fg2);line-height:1.8;text-align:left"><strong>Order #${orders[0]?.id}</strong><br>Shipping to ${checkoutData.city}, ${checkoutData.country}<br><span style="color:var(--fg3)">Confirmation sent to ${checkoutData.email}</span></div></div>`;
    foot.innerHTML = `<button class="btn btn-dark btn-full" onclick="closePanel('checkout-panel')">Continue Shopping</button><button class="btn btn-light btn-full" style="margin-top:8px" onclick="closePanel('checkout-panel');setTimeout(()=>{openPanel('history-panel');renderHistory();},350)">View Order History</button>`;
  }
}

function setPay(m) { payMethod = m; renderCheckout(); }
function fmtCard(inp) {
  let v = inp.value.replace(/\D/g, '').substring(0, 16);
  inp.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function checkoutNext() {
  const email = document.getElementById('co-email')?.value.trim();
  const first = document.getElementById('co-first')?.value.trim();
  const addr = document.getElementById('co-addr')?.value.trim();
  const city = document.getElementById('co-city')?.value.trim();
  if (!email || !first || !addr || !city) { toast('Please fill all required fields'); return; }
  checkoutData = {
    email, phone: document.getElementById('co-phone')?.value,
    first, last: document.getElementById('co-last')?.value,
    addr, city, zip: document.getElementById('co-zip')?.value,
    country: document.getElementById('co-country')?.value || 'Philippines'
  };
  checkoutStep = 1; renderCheckout();
}

function placeOrder() {
  if (!currentUser) {
    toast('Please log in to place an order');
    return;
  }

  const sub = cartTotal(), ship = sub >= 150 ? 0 : 12.99;
  
  // Prepare order data
  const items = Object.keys(cart).map(id => {
    const p = PRODUCTS.find(x => x.id == id);
    return { id: p.id, name: p.name, qty: cart[id], price: p.price };
  });

  const orderData = {
    items: items,
    total: (sub + ship).toFixed(2),
    shipping_cost: ship,
    address: {
      first_name: checkoutData.first,
      last_name: checkoutData.last,
      email: checkoutData.email,
      phone: checkoutData.phone,
      address: checkoutData.addr,
      city: checkoutData.city,
      zip: checkoutData.zip,
      country: checkoutData.country || 'Philippines'
    }
  };

  fetch(`api/orders.php?user_id=${currentUser.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // Add to local orders for display
        const order = {
          id: data.order_id,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          items: items,
          total: (sub + ship).toFixed(2),
          status: 'processing',
          address: `${checkoutData.city}, ${checkoutData.country || 'Philippines'}`
        };
        orders.unshift(order);
        cart = {};
        updateBadges();
        renderCart();
        checkoutStep = 2;
        renderCheckout();
        renderHistory();
      } else {
        toast('Failed to place order: ' + (data.error || 'Unknown error'));
      }
    })
    .catch(err => {
      console.error('Order error:', err);
      toast('Connection error. Please try again.');
    });
}

/* ══════════════════════════════════════════════
   ORDER HISTORY
══════════════════════════════════════════════ */
function renderHistory() {
  if (!currentUser) {
    document.getElementById('history-body').innerHTML = `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><span class="empty-text">Sign in to view orders</span></div>`;
    return;
  }

  fetch(`api/orders.php?user_id=${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById('history-body');
      if (data.success && data.orders.length > 0) {
        body.innerHTML = data.orders.map(o => `
          <div class="hist-item">
            <div class="hist-head"><span class="hist-id">${o.id}</span><span class="hist-status ${o.status}">${o.status}</span></div>
            <div class="hist-date">${o.date} · ${o.address}</div>
            <div class="hist-products">${o.items.map(i => `${i.product_name} × ${i.quantity}`).join(', ')}</div>
            <div class="hist-total">$${o.total}</div>
          </div>`).join('');
      } else {
        body.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><span class="empty-text">No orders yet</span></div>`;
      }
    })
    .catch(err => {
      console.error('Load history error:', err);
      const body = document.getElementById('history-body');
      if (orders.length) {
        body.innerHTML = orders.map(o => `
          <div class="hist-item">
            <div class="hist-head"><span class="hist-id">${o.id}</span><span class="hist-status ${o.status}">${o.status}</span></div>
            <div class="hist-date">${o.date} · ${o.address}</div>
            <div class="hist-products">${o.items.map(i => `${i.name} × ${i.qty}`).join(', ')}</div>
            <div class="hist-total">$${o.total}</div>
          </div>`).join('');
      } else {
        body.innerHTML = `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><span class="empty-text">No orders yet</span></div>`;
      }
    });
}

/* ══════════════════════════════════════════════
   BADGES
══════════════════════════════════════════════ */
function updateBadges() {
  setBadge('cart-badge', Object.values(cart).reduce((a, b) => a + b, 0));
  setBadge('fav-badge', favs.size);
  setBadge('hist-badge', orders.length);
}
function setBadge(id, n) {
  const el = document.getElementById(id);
  el.textContent = n;
  el.classList.toggle('show', n > 0);
}

/* ══════════════════════════════════════════════
   PANELS
══════════════════════════════════════════════ */
function openPanel(id) {
  closeAllPanels();
  document.getElementById(id).classList.add('open');
  document.getElementById('panel-overlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  if (id === 'cart-panel') renderCart();
  if (id === 'fav-panel') renderFavs();
  if (id === 'history-panel') renderHistory();
}
function closePanel(id) {
  document.getElementById(id).classList.remove('open');
  document.getElementById('panel-overlay').classList.remove('show');
  document.body.style.overflow = '';
}
function closeAllPanels() {
  ['cart-panel', 'fav-panel', 'checkout-panel', 'history-panel'].forEach(id =>
    document.getElementById(id).classList.remove('open')
  );
  document.getElementById('panel-overlay').classList.remove('show');
  document.body.style.overflow = '';
  resetTickerAnimation(); // Reset ticker when closing panels
}
document.getElementById('panel-overlay').addEventListener('click', closeAllPanels);


function openAuth(gateMsg) {
  const overlay = document.getElementById('auth-overlay');
  const gateMsgEl = document.getElementById('auth-gate-msg');
  const gateTextEl = document.getElementById('auth-gate-text');

  clearAuthForms();
  document.getElementById('auth-success').style.display = 'none';
  document.getElementById('form-login').classList.remove('hidden');
  document.getElementById('form-signup').classList.add('hidden');
  document.getElementById('tab-login').classList.add('active');
  document.getElementById('tab-signup').classList.remove('active');

  if (gateMsg) {
    gateTextEl.textContent = gateMsg.replace(/^[^\w]+/, '');
    gateMsgEl.classList.remove('hidden');
  } else {
    gateMsgEl.classList.add('hidden');
    authPendingAction = null;
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('login-email').focus(), 400);
}

function closeAuth() {
  document.getElementById('auth-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('auth-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeAuth();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAuth(); });

function switchTab(tab) {
  clearAuthForms();
  document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('form-signup').classList.toggle('hidden', tab !== 'signup');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  setTimeout(() => {
    document.getElementById(tab === 'login' ? 'login-email' : 'signup-first')?.focus();
  }, 50);
}

function clearAuthForms() {
  ['login-email', 'login-pass', 'signup-first', 'signup-last', 'signup-email', 'signup-pass', 'signup-pass2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  ['login-email-err', 'login-pass-err', 'signup-first-err', 'signup-email-err', 'signup-pass-err', 'signup-pass2-err'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

/* ── LOGIN ── */
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  let valid = true;

  if (!email || !email.includes('@')) { setFieldError('login-email', 'Please enter a valid email'); valid = false; }
  else clearFieldError('login-email');

  if (!pass) { setFieldError('login-pass', 'Password is required'); valid = false; }
  else clearFieldError('login-pass');

  if (!valid) return;

  const btn = document.getElementById('login-btn');
  btn.disabled = true; btn.classList.add('loading'); btn.textContent = 'Signing in';

  fetch('api/auth.php?action=login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass })
  })
    .then(res => res.json())
    .then(data => {
      btn.disabled = false; btn.classList.remove('loading'); btn.textContent = 'Sign In';
      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setFieldError('login-pass', data.error || 'Login failed');
      }
    })
    .catch(err => {
      btn.disabled = false; btn.classList.remove('loading'); btn.textContent = 'Sign In';
      console.error('Login error:', err);
      toast('Connection error. Please try again.');
    });
}

/* ── SIGNUP ── */
function doSignup() {
  const first = document.getElementById('signup-first').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-pass').value;
  const pass2 = document.getElementById('signup-pass2').value;
  let valid = true;

  if (!first) { setFieldError('signup-first', 'First name is required'); valid = false; }
  else clearFieldError('signup-first');

  if (!email || !email.includes('@')) { setFieldError('signup-email', 'Please enter a valid email'); valid = false; }
  else clearFieldError('signup-email');

  if (!pass || pass.length < 6) { setFieldError('signup-pass', 'Password must be at least 6 characters'); valid = false; }
  else clearFieldError('signup-pass');

  if (pass !== pass2) { setFieldError('signup-pass2', 'Passwords do not match'); valid = false; }
  else clearFieldError('signup-pass2');

  if (!valid) return;

  const btn = document.getElementById('signup-btn');
  btn.disabled = true; btn.classList.add('loading'); btn.textContent = 'Creating account';

  const last = document.getElementById('signup-last').value.trim();

  fetch('api/auth.php?action=register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: first,
      last_name: last,
      email,
      password: pass
    })
  })
    .then(res => res.json())
    .then(data => {
      btn.disabled = false; btn.classList.remove('loading'); btn.textContent = 'Create Account';
      if (data.success) {
        document.getElementById('form-signup').classList.add('hidden');
        document.getElementById('auth-success').style.display = 'block';
        document.getElementById('auth-success-sub').innerHTML = `Welcome, <strong>${data.user.name}</strong>!<br>Your account is ready. Let's get training.`;
        setTimeout(() => onLoginSuccess(data.user), 1800);
      } else {
        if (data.error.includes('email')) setFieldError('signup-email', data.error);
        else if (data.error.includes('password')) setFieldError('signup-pass', data.error);
        else setFieldError('signup-first', data.error);
      }
    })
    .catch(err => {
      btn.disabled = false; btn.classList.remove('loading'); btn.textContent = 'Create Account';
      console.error('Signup error:', err);
      toast('Connection error. Please try again.');
    });
}

/* ── SOCIAL ── */
function doSocialLogin(provider) {
  toast(`${provider} login coming soon — connect your OAuth provider`);
}

/* ── SUCCESS HANDLER ── */
function onLoginSuccess(user) {
  currentUser = user;
  
  // Save user to localStorage so login persists on refresh
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  closeAuth();
  updateAuthUI();
  
  // Load user's cart, wishlist, and orders
  loadUserData();
  
  toast(`Welcome back, ${user.name.split(' ')[0]}! 👋`);
  if (authPendingAction) {
    const action = authPendingAction;
    authPendingAction = null;
    setTimeout(action, 300);
  }
}

function loadUserData() {
  if (!currentUser) return;

  // Load cart
  function loadUserData() {
  if (!currentUser) return;


  fetch(`api/cart.php?user_id=${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        cart = {};

        data.items.forEach(item => {
          cart[item.product_id] = item.quantity;
        });

        updateBadges();
        renderCart(); // Render cart after loading
      }
    })
    .catch(err => {
      console.error('Load cart error:', err);
      renderCart(); // Still render cart even on error
    });
}

  
  fetch(`api/wishlist.php?user_id=${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        favs = new Set(data.wishlist.map(id => parseInt(id))); // Convert to numbers
        updateBadges();
        renderGrid(); // Update hearts on products
        renderFavs();  // Update favorites panel
      }
    })
    .catch(err => {
      console.error('Load wishlist error:', err);
      renderGrid();
      renderFavs();
    });

  // Load orders
  fetch(`api/orders.php?user_id=${currentUser.id}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        orders = data.orders;
        updateBadges();
        renderHistory(); // Render history after loading
      }
    })
    .catch(err => {
      console.error('Load orders error:', err);
      renderHistory(); // Still render even on error
    });
}

/* ── LOGOUT ── */
function doLogout() {
  if (currentUser) {
    fetch('api/auth.php?action=logout', { method: 'POST' })
      .catch(err => console.error('Logout error:', err));
  }
  
  currentUser = null;
  cart = {}; 
  favs = new Set(); 
  orders = [];
  
  // Clear from localStorage
  localStorage.removeItem('currentUser');
  
  updateBadges(); 
  updateAuthUI(); 
  closeAllPanels(); 
  toggleUserMenu(false);
  renderGrid(); 
  renderFavs(); 
  
  toast('Signed out. See you next time!');
}


function updateAuthUI() {
  const loginBtn = document.getElementById('header-login-btn');
  const userWrap = document.getElementById('user-menu-wrap');
  if (currentUser) {
    loginBtn.style.display = 'none';
    userWrap.style.display = 'flex';
    const parts = currentUser.name.trim().split(' ');
    const initials = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
    document.getElementById('user-avatar-initials').textContent = initials;
    document.getElementById('user-display-name').textContent = currentUser.name.split(' ')[0];
  } else {
    loginBtn.style.display = 'flex';
    userWrap.style.display = 'none';
  }
}

/* ── USER MENU ── */
let userMenuOpen = false;
function toggleUserMenu(force) {
  userMenuOpen = force !== undefined ? force : !userMenuOpen;
  document.getElementById('user-menu').classList.toggle('open', userMenuOpen);
}
document.addEventListener('click', e => {
  if (!document.getElementById('user-menu-wrap')?.contains(e.target)) toggleUserMenu(false);
});


function setFieldError(inputId, msg) {
  document.getElementById(inputId)?.classList.add('error');
  const err = document.getElementById(inputId + '-err');
  if (err) err.textContent = msg;
}
function clearFieldError(inputId) {
  document.getElementById(inputId)?.classList.remove('error');
  const err = document.getElementById(inputId + '-err');
  if (err) err.textContent = '';
}


function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.getElementById('toast-wrap').appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 2800);
}

/* ══════════════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════════════ */
function nlSubmit() {
  const v = document.getElementById('nl-email').value.trim();
  if (!v || !v.includes('@')) { toast('Please enter a valid email'); return; }
  
  const payload = { email: v };
  if (currentUser) payload.user_id = currentUser.id;

  fetch('api/subscribe.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('nl-email').value = '';
      if (data.success) {
        toast('Welcome to the FITNESSFRONTIER Journal! ✓');
      } else if (data.already_subscribed) {
        toast('Already subscribed to newsletter');
      } else {
        toast('Failed to subscribe');
      }
    })
    .catch(err => {
      console.error('Subscribe error:', err);
      document.getElementById('nl-email').value = '';
      toast('Welcome to the FITNESSFRONTIER Journal! ✓');
    });
}

/* ══════════════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════════════ */
const io = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
  }), { threshold: 0.08 }
);
document.querySelectorAll('.fade-up,.slide-l,.slide-r,.scale-in').forEach(el => io.observe(el));

/* ══════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════ */
function scrollToSection(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }
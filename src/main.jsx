import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  ShoppingBag,
  Heart,
  UserRound,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Star,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  Check,
  PackageCheck,
  Mail,
  Sparkles,
} from "lucide-react";
import "./styles.css";

const products = [
  {
    id: 1,
    name: "Studio Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    old: 119.99,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-150 meow?auto=format&fit=crop&w=800&q=85".replace(
        "150 meow",
        "1505740420928-5e560c06d30e",
      ),
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Nova Smart Watch",
    category: "Electronics",
    price: 129.0,
    old: 159.0,
    rating: 4.7,
    reviews: 86,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Everyday Laptop 14”",
    category: "Electronics",
    price: 799.0,
    old: 899.0,
    rating: 4.9,
    reviews: 205,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=85",
    tag: "SALE",
  },
  {
    id: 4,
    name: "Cloud Runner Sneakers",
    category: "Fashion",
    price: 64.99,
    old: 84.99,
    rating: 4.6,
    reviews: 73,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    tag: "POPULAR",
  },
  {
    id: 5,
    name: "Minimal Leather Backpack",
    category: "Fashion",
    price: 54.0,
    old: 69.0,
    rating: 4.7,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 6,
    name: "Modern Sunglasses",
    category: "Fashion",
    price: 29.0,
    old: 39.0,
    rating: 4.5,
    reviews: 44,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 7,
    name: "Ceramic Table Lamp",
    category: "Home & Living",
    price: 42.0,
    old: 55.0,
    rating: 4.8,
    reviews: 52,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 8,
    name: "Daily Hydration Bottle",
    category: "Home & Living",
    price: 24.0,
    old: 32.0,
    rating: 4.6,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 9,
    name: "Wireless Earbuds Pro",
    category: "Electronics",
    price: 59.99,
    old: 79.99,
    rating: 4.7,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 10,
    name: "Weekend Travel Bag",
    category: "Fashion",
    price: 74.0,
    old: 99.0,
    rating: 4.8,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 11,
    name: "Instant Film Camera",
    category: "Electronics",
    price: 99.0,
    old: 129.0,
    rating: 4.6,
    reviews: 41,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=85",
  },
  {
    id: 12,
    name: "Soft Knit Throw",
    category: "Home & Living",
    price: 38.0,
    old: 49.0,
    rating: 4.9,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
  },
];
const money = (n) => "$" + Number(n).toFixed(2);
const categories = ["All products", "Electronics", "Fashion", "Home & Living"];
function App() {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("ss-cart") || "[]"),
  );
  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("ss-wishlist") || "[]"),
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(products[0]);
  const [qty, setQty] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  useEffect(
    () => localStorage.setItem("ss-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("ss-wishlist", JSON.stringify(wishlist)),
    [wishlist],
  );
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2400);
      return () => clearTimeout(t);
    }
  }, [toast]);
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "All products" || p.category === category) &&
        p.price <= maxPrice &&
        (p.name + " " + p.category).toLowerCase().includes(query.toLowerCase()),
    );
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, query, sort, maxPrice]);
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const subtotal = cart.reduce((n, i) => n + i.price * i.qty, 0);
  const go = (p) => {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const add = (p, n = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id);
      return found
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + n } : i))
        : [...prev, { ...p, qty: n }];
    });
    setToast("Added to your bag");
  };
  const toggleWish = (p) => {
    setWishlist((prev) =>
      prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id],
    );
    setToast(
      wishlist.includes(p.id) ? "Removed from wishlist" : "Saved to wishlist",
    );
  };
  const openProduct = (p) => {
    setSelected(p);
    setQty(1);
    go("product");
  };
  const nav = (label, target) => (
    <button
      key={label}
      className={`nav-link ${page === target ? "active" : ""}`}
      onClick={() => go(target)}
    >
      {label}
    </button>
  );
  function ProductCard({ p }) {
    return (
      <article className="product-card">
        <div
          className="product-image"
          onClick={() => openProduct(p)}
          role="button"
          tabIndex="0"
          onKeyDown={(e) => e.key === "Enter" && openProduct(p)}
        >
          <img src={p.image} alt={p.name} loading="lazy" />
          {p.tag && <span className="product-tag">{p.tag}</span>}
          <button
            aria-label="Toggle wishlist"
            className={`wish-btn ${wishlist.includes(p.id) ? "chosen" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWish(p);
            }}
          >
            <Heart
              size={17}
              fill={wishlist.includes(p.id) ? "currentColor" : "none"}
            />
          </button>
        </div>
        <div className="product-info">
          <span className="product-category">{p.category}</span>
          <button className="product-name" onClick={() => openProduct(p)}>
            {p.name}
          </button>
          <div className="rating">
            <Star size={13} fill="currentColor" />
            <b>{p.rating}</b>
            <span>({p.reviews})</span>
          </div>
          <div className="product-bottom">
            <div>
              <strong>{money(p.price)}</strong>
              {p.old && <del>{money(p.old)}</del>}
            </div>
            <button
              className="add-icon"
              aria-label={`Add ${p.name} to cart`}
              onClick={() => add(p)}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </article>
    );
  }
  function Header() {
    return (
      <>
        <div className="announcement">
          <Sparkles size={13} /> A little something extra: free shipping on
          orders over $75{" "}
          <span>
            Shop now <ArrowRight size={12} />
          </span>
        </div>
        <header className="header">
          <div className="header-inner">
            <button
              className="mobile-menu icon-btn"
              aria-label="Open menu"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
            <button className="brand" onClick={() => go("home")}>
              <span className="brand-mark">
                <ShoppingBag size={21} />
              </span>
              <span>
                Shop<span>Sphere</span>
                <small>SHOP SMARTER. LIVE BETTER.</small>
              </span>
            </button>
            <nav className={`main-nav ${mobileMenu ? "open" : ""}`}>
              {nav("Home", "home")}
              {nav("Shop", "shop")}
              {nav("About", "about")}
              {nav("Contact", "contact")}
            </nav>
            <label className="search-box">
              <Search size={17} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (page !== "shop") setPage("shop");
                }}
                placeholder="Search for products..."
              />
              <kbd>⌘ K</kbd>
            </label>
            <div className="header-actions">
              <button
                className="icon-btn"
                aria-label="Wishlist"
                onClick={() => go("wishlist")}
              >
                <Heart />
                <span className="count">{wishlist.length}</span>
              </button>
              <button
                className="icon-btn"
                aria-label="Account"
                onClick={() => go("account")}
              >
                <UserRound />
              </button>
              <button
                className="icon-btn bag-action"
                aria-label="Shopping cart"
                onClick={() => go("cart")}
              >
                <ShoppingBag />
                <span className="count">{cartCount}</span>
              </button>
            </div>
          </div>
        </header>
      </>
    );
  }
  function Footer() {
    return (
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button className="brand light" onClick={() => go("home")}>
              <span className="brand-mark">
                <ShoppingBag size={21} />
              </span>
              <span>
                Shop<span>Sphere</span>
                <small>SHOP SMARTER. LIVE BETTER.</small>
              </span>
            </button>
            <p>
              Thoughtfully chosen essentials for a life well lived. Discover
              something you'll love.
            </p>
            <div className="socials">
              <button aria-label="Facebook">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z"
                  />
                </svg>
              </button>
              <button aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M5.2 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1v6.6h-3.4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H9V9Z"
                  />
                </svg>
              </button>
              <button aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path
                    fill="currentColor"
                    d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0c2.1-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            {nav("Shop all", "shop")}
            {nav("Electronics", "shop")}
            {nav("Fashion", "shop")}
            {nav("Home & Living", "shop")}
          </div>
          <div>
            <h4>Customer care</h4>
            {nav("Contact us", "contact")}
            {nav("My wishlist", "wishlist")}
            {nav("My cart", "cart")}
            <button className="nav-link" onClick={() => go("account")}>
              My account
            </button>
          </div>
          <div className="newsletter">
            <h4>Good things, occasionally.</h4>
            <p>Get first dibs on new drops and members-only offers.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubscribed(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary" aria-label="Subscribe">
                <ArrowRight />
              </button>
            </form>
            {subscribed && (
              <small className="success-text">
                You're on the list — thank you!
              </small>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 ShopSphere. Made for everyday living.</span>
          <div>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Shipping & Returns</span>
          </div>
          <span>Designed with care ✳</span>
        </div>
      </footer>
    );
  }
  function Home() {
    return (
      <>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> THE EVERYDAY EDIT
            </span>
            <h1>
              Good finds.
              <br />
              <em>Great feeling.</em>
            </h1>
            <p>
              Discover thoughtfully selected pieces for wherever life takes you.
              The things you need, and a few you'll simply love.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => go("shop")}>
                Explore the collection <ArrowRight size={17} />
              </button>
              <button
                className="text-btn"
                onClick={() => {
                  setCategory("Fashion");
                  go("shop");
                }}
              >
                What's trending <ArrowRight size={15} />
              </button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack">
                <span>J</span>
                <span>M</span>
                <span>A</span>
                <span>+</span>
              </div>
              <div>
                <div className="rating">
                  <Star size={13} fill="currentColor" />
                  <b>4.9/5</b>
                </div>
                <small>Loved by 12,000+ happy shoppers</small>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90"
              alt="Beautifully curated modern shopping boutique"
            />
            <div className="floating-note">
              <span className="note-icon">
                <Sparkles size={17} />
              </span>
              <div>
                <b>Made for your everyday</b>
                <small>Little things, better chosen.</small>
              </div>
            </div>
            <div className="hero-index">
              01 <span /> 04
            </div>
          </div>
          <div className="hero-vertical">GOOD TASTE IS IN THE DETAILS —</div>
        </section>
        <section className="trust-row">
          <div>
            <Truck />
            <span>
              <b>Complimentary shipping</b>
              <small>On orders over $75</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <b>Checkout with confidence</b>
              <small>Secure payments, always</small>
            </span>
          </div>
          <div>
            <RotateCcw />
            <span>
              <b>Easy 30-day returns</b>
              <small>Love it or send it back</small>
            </span>
          </div>
          <div>
            <Headphones />
            <span>
              <b>Real human support</b>
              <small>Here when you need us</small>
            </span>
          </div>
        </section>
        <section className="section category-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A GOOD PLACE TO START</span>
              <h2>
                Shop by <em>category.</em>
              </h2>
            </div>
            <button
              className="text-btn"
              onClick={() => {
                setCategory("All products");
                go("shop");
              }}
            >
              All categories <ArrowRight size={16} />
            </button>
          </div>
          <div className="category-grid">
            {[
              {
                name: "Electronics",
                desc: "Smart little upgrades",
                img: products[2].image,
              },
              {
                name: "Fashion",
                desc: "Wear it your way",
                img: products[3].image,
              },
              {
                name: "Home & Living",
                desc: "Make room for good",
                img: products[6].image,
              },
            ].map((c, i) => (
              <button
                className={`category-card cat-${i}`}
                key={c.name}
                onClick={() => {
                  setCategory(c.name);
                  go("shop");
                }}
              >
                <img src={c.img} alt="" />
                <span className="category-overlay">
                  <small>0{i + 1} / CATEGORY</small>
                  <b>{c.name}</b>
                  <span>
                    {c.desc} <ArrowRight size={15} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="section products-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE GOOD STUFF</span>
              <h2>
                Current <em>favorites.</em>
              </h2>
              <p>Consider this your sign to find something wonderful.</p>
            </div>
            <button className="text-btn" onClick={() => go("shop")}>
              Shop all products <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
        <section className="editorial">
          <div className="editorial-image">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=85"
              alt="Curated clothing and lifestyle collection"
            />
          </div>
          <div className="editorial-copy">
            <span className="eyebrow">A LITTLE MORE INTENTIONAL</span>
            <h2>
              Less scrolling.
              <br />
              <em>More loving what you find.</em>
            </h2>
            <p>
              We believe the best things aren't always the loudest. That's why
              every pick in our store earns its place — quality, considered
              design, and a little everyday magic.
            </p>
            <button className="btn btn-dark" onClick={() => go("about")}>
              Get to know us <ArrowRight size={17} />
            </button>
            <span className="editorial-number">SS / 001</span>
          </div>
        </section>
        <section className="section products-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">JUST LANDED</span>
              <h2>
                New in, <em>just for you.</em>
              </h2>
            </div>
            <button
              className="text-btn"
              onClick={() => {
                setSort("featured");
                go("shop");
              }}
            >
              Discover new arrivals <ArrowRight size={16} />
            </button>
          </div>
          <div className="product-grid">
            {products.slice(4, 8).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
        <section className="quote-band">
          <span>✳</span>
          <p>
            “The little details are not the little details.
            <br />
            <em>They make the design.”</em>
          </p>
          <small>THE SHOPSPHERE WAY</small>
        </section>
      </>
    );
  }
  function Shop() {
    return (
      <main className="page-wrap">
        <div className="breadcrumb">
          Home <span>/</span> Shop <span>/</span> <b>{category}</b>
        </div>
        <div className="shop-heading">
          <div>
            <span className="eyebrow">THE FULL COLLECTION</span>
            <h1>
              Find your <em>favorite.</em>
            </h1>
            <p>Good design, everyday essentials, and things worth keeping.</p>
          </div>
          <div className="shop-count">
            {filtered.length} thoughtfully picked items
          </div>
        </div>
        <div className="shop-layout">
          <aside className="filters">
            <div className="filter-title">
              <SlidersHorizontal size={17} /> <b>Refine your search</b>
            </div>
            <div className="filter-group">
              <h4>Category</h4>
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-option ${category === c ? "selected" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  <span className="fake-radio" />
                  {c}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <h4>
                Price range <span>Up to {money(maxPrice)}</span>
              </h4>
              <input
                className="range"
                type="range"
                min="25"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="range-labels">
                <span>$25</span>
                <span>$1,000+</span>
              </div>
            </div>
            <div className="filter-group">
              <h4>Sort by</h4>
              <select
                className="select-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
            <button
              className="clear-filters"
              onClick={() => {
                setCategory("All products");
                setMaxPrice(1000);
                setSort("featured");
                setQuery("");
              }}
            >
              Clear all filters
            </button>
          </aside>
          <div className="shop-results">
            <div className="results-toolbar">
              <span>
                Showing <b>{filtered.length}</b> products
              </span>
              <button
                className="mobile-filter"
                onClick={() =>
                  document
                    .querySelector(".filters")
                    ?.classList.toggle("filters-open")
                }
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <select
                className="select-control sort-mobile"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
            {filtered.length ? (
              <div className="product-grid shop-product-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search size={32} />
                <h3>No finds just yet</h3>
                <p>Try a different search or clear your filters.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCategory("All products");
                    setMaxPrice(1000);
                    setQuery("");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
  function ProductPage() {
    return (
      <main className="page-wrap">
        <div className="breadcrumb">
          <button onClick={() => go("home")}>Home</button>
          <span>/</span>
          <button onClick={() => go("shop")}>Shop</button>
          <span>/</span>
          <b>{selected.name}</b>
        </div>
        <div className="detail-layout">
          <div className="detail-image">
            <span className="detail-badge">A GOOD FIND</span>
            <img src={selected.image} alt={selected.name} />
          </div>
          <div className="detail-info">
            <span className="eyebrow">
              {selected.category.toUpperCase()} / SHOPSPHERE EDIT
            </span>
            <h1>{selected.name}</h1>
            <div className="rating detail-rating">
              <Star size={15} fill="currentColor" />
              <b>{selected.rating}</b>
              <span>{selected.reviews} verified reviews</span>
            </div>
            <div className="detail-price">
              {money(selected.price)}{" "}
              {selected.old && <del>{money(selected.old)}</del>}{" "}
              {selected.old && (
                <span className="save-pill">
                  SAVE {Math.round((1 - selected.price / selected.old) * 100)}%
                </span>
              )}
            </div>
            <p className="detail-description">
              Thoughtfully selected for quality, considered design, and everyday
              ease. A reliable favorite that looks good, feels right, and fits
              naturally into your routine.
            </p>
            <div className="detail-perks">
              <span>
                <Check size={15} /> Quality checked
              </span>
              <span>
                <Truck size={15} /> Ships in 1–2 days
              </span>
              <span>
                <RotateCcw size={15} /> 30-day returns
              </span>
            </div>
            <div className="detail-controls">
              <div className="quantity">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
              <button
                className="btn btn-primary add-to-cart"
                onClick={() => {
                  add(selected, qty);
                  go("cart");
                }}
              >
                Add to bag · {money(selected.price * qty)}{" "}
                <ShoppingBag size={17} />
              </button>
              <button
                className={`detail-heart ${wishlist.includes(selected.id) ? "chosen" : ""}`}
                onClick={() => toggleWish(selected)}
                aria-label="Add to wishlist"
              >
                <Heart
                  fill={
                    wishlist.includes(selected.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>
            <button
              className="btn btn-outline full-width"
              onClick={() => {
                add(selected, qty);
                go("checkout");
              }}
            >
              Buy it now <ArrowRight size={16} />
            </button>
            <div className="detail-accordion">
              <details open>
                <summary>
                  Details & materials <ChevronDown size={16} />
                </summary>
                <p>
                  Designed for everyday use with considered materials and a
                  timeless finish. Wipe clean as needed and follow the included
                  care instructions.
                </p>
              </details>
              <details>
                <summary>
                  Shipping & returns <ChevronDown size={16} />
                </summary>
                <p>
                  Free shipping on orders over $75. Easy returns within 30 days
                  of delivery on unused items.
                </p>
              </details>
              <details>
                <summary>
                  Reviews ({selected.reviews}) <ChevronDown size={16} />
                </summary>
                <p>
                  Customers rate this product {selected.rating} out of 5 for
                  quality, value, and design.
                </p>
              </details>
            </div>
          </div>
        </div>
        <section className="section products-section related">
          <div className="section-heading">
            <div>
              <span className="eyebrow">GOOD COMPANY</span>
              <h2>
                You may also <em>love.</em>
              </h2>
            </div>
            <button className="text-btn" onClick={() => go("shop")}>
              See everything <ArrowRight size={15} />
            </button>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => p.id !== selected.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
          </div>
        </section>
      </main>
    );
  }
  function Cart() {
    return (
      <main className="page-wrap">
        <div className="page-title">
          <span className="eyebrow">YOUR GOOD FINDS</span>
          <h1>
            Your bag<span className="muted"> ({cartCount})</span>
          </h1>
          <p>You're one step closer to something lovely.</p>
        </div>
        {!cart.length ? (
          <div className="empty-state">
            <ShoppingBag size={38} />
            <h2>Your bag is taking a little break.</h2>
            <p>Let's find something you'll love.</p>
            <button className="btn btn-primary" onClick={() => go("shop")}>
              Explore the shop <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-table-head">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {cart.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-product">
                    <button onClick={() => openProduct(item)}>
                      <img src={item.image} alt={item.name} />
                    </button>
                    <div>
                      <button
                        className="product-name"
                        onClick={() => openProduct(item)}
                      >
                        {item.name}
                      </button>
                      <small>{item.category}</small>
                      <button
                        className="remove-link"
                        onClick={() =>
                          setCart((prev) =>
                            prev.filter((i) => i.id !== item.id),
                          )
                        }
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                  <span className="cart-price">{money(item.price)}</span>
                  <div className="quantity compact">
                    <button
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((i) =>
                            i.id === item.id
                              ? { ...i, qty: Math.max(1, i.qty - 1) }
                              : i,
                          ),
                        )
                      }
                    >
                      <Minus size={13} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((i) =>
                            i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
                          ),
                        )
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <b className="line-total">{money(item.price * item.qty)}</b>
                </div>
              ))}
              <button
                className="text-btn continue-link"
                onClick={() => go("shop")}
              >
                ← Keep looking around
              </button>
            </div>
            <aside className="order-summary">
              <h3>The little details</h3>
              <p className="summary-subtitle">Your order summary</p>
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{subtotal >= 75 ? "Complimentary" : money(7.99)}</span>
              </div>
              <div className="shipping-progress">
                <span>
                  {subtotal >= 75
                    ? "✳ You unlocked free shipping!"
                    : `You're ${money(75 - subtotal)} away from free shipping.`}
                </span>
                <div>
                  <span
                    style={{
                      width: `${Math.min(100, (subtotal / 75) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="summary-line total">
                <b>Total</b>
                <b>{money(subtotal + (subtotal >= 75 ? 0 : 7.99))}</b>
              </div>
              <button
                className="btn btn-primary full-width"
                onClick={() => go("checkout")}
              >
                Continue to checkout <ArrowRight size={16} />
              </button>
              <div className="secure-note">
                <ShieldCheck size={16} /> Safe and secure checkout
              </div>
            </aside>
          </div>
        )}
      </main>
    );
  }
  function Wishlist() {
    const items = products.filter((p) => wishlist.includes(p.id));
    return (
      <main className="page-wrap">
        <div className="page-title">
          <span className="eyebrow">THE KEEPERS</span>
          <h1>
            Your wishlist<span className="muted"> ({items.length})</span>
          </h1>
          <p>All the things you're thinking about.</p>
        </div>
        {items.length ? (
          <div className="product-grid wishlist-grid">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Heart size={38} />
            <h2>Save a little something for later.</h2>
            <p>Tap the heart on anything that catches your eye.</p>
            <button className="btn btn-primary" onClick={() => go("shop")}>
              Find your favorites <ArrowRight size={16} />
            </button>
          </div>
        )}
      </main>
    );
  }
  function Checkout() {
    if (checkoutDone)
      return (
        <main className="page-wrap">
          <div className="success-panel">
            <div className="success-icon">
              <Check size={32} />
            </div>
            <span className="eyebrow">ALL WRAPPED UP</span>
            <h1>
              Thank you. <em>Really.</em>
            </h1>
            <p>
              Your demo order has been placed successfully. No payment was
              collected.
            </p>
            <div className="order-number">
              ORDER · SS-{Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCheckoutDone(false);
                go("shop");
              }}
            >
              Back to shopping <ArrowRight size={16} />
            </button>
          </div>
        </main>
      );
    return (
      <main className="page-wrap">
        <div className="page-title">
          <span className="eyebrow">ALMOST YOURS</span>
          <h1>
            Checkout<span className="muted">.</span>
          </h1>
          <p>Just a few details and these good finds are yours.</p>
        </div>
        {!cart.length ? (
          <div className="empty-state">
            <ShoppingBag size={36} />
            <h2>Your bag is empty</h2>
            <button className="btn btn-primary" onClick={() => go("shop")}>
              Shop now
            </button>
          </div>
        ) : (
          <form
            className="checkout-layout"
            onSubmit={(e) => {
              e.preventDefault();
              setCart([]);
              setCheckoutDone(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="checkout-form">
              <section className="form-section">
                <h3>
                  <span>01</span> Contact information
                </h3>
                <label>
                  Email address
                  <input type="email" required placeholder="you@example.com" />
                </label>
              </section>
              <section className="form-section">
                <h3>
                  <span>02</span> Shipping address
                </h3>
                <div className="form-grid">
                  <label>
                    First name
                    <input required placeholder="Alex" />
                  </label>
                  <label>
                    Last name
                    <input required placeholder="Morgan" />
                  </label>
                  <label className="span-two">
                    Address
                    <input required placeholder="Street address" />
                  </label>
                  <label>
                    City
                    <input required placeholder="City" />
                  </label>
                  <label>
                    Postal code
                    <input required placeholder="Postal code" />
                  </label>
                  <label>
                    Country
                    <select required defaultValue="">
                      <option value="" disabled>
                        Select country
                      </option>
                      <option>Pakistan</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </label>
                  <label>
                    Phone
                    <input type="tel" required placeholder="+92 300 1234567" />
                  </label>
                </div>
              </section>
              <section className="form-section">
                <h3>
                  <span>03</span> Payment method
                </h3>
                <label className="payment-choice">
                  <input type="radio" name="payment" defaultChecked />{" "}
                  <span>
                    <b>Cash on delivery</b>
                    <small>Pay when your order arrives</small>
                  </span>
                </label>
                <label className="payment-choice">
                  <input type="radio" name="payment" />{" "}
                  <span>
                    <b>Credit or debit card</b>
                    <small>Demo option — no payment processed</small>
                  </span>
                </label>
              </section>
              <button
                className="btn btn-primary full-width place-order"
                type="submit"
              >
                Place demo order ·{" "}
                {money(subtotal + (subtotal >= 75 ? 0 : 7.99))}{" "}
                <ArrowRight size={16} />
              </button>
              <p className="demo-disclaimer">
                <ShieldCheck size={15} /> Demo checkout only. No real payment or
                order submission occurs.
              </p>
            </div>
            <aside className="order-summary checkout-summary">
              <h3>Your order</h3>
              {cart.map((i) => (
                <div className="mini-order" key={i.id}>
                  <img src={i.image} alt="" />
                  <div>
                    <b>{i.name}</b>
                    <small>Qty: {i.qty}</small>
                  </div>
                  <strong>{money(i.price * i.qty)}</strong>
                </div>
              ))}
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{subtotal >= 75 ? "Free" : money(7.99)}</span>
              </div>
              <div className="summary-line total">
                <b>Total</b>
                <b>{money(subtotal + (subtotal >= 75 ? 0 : 7.99))}</b>
              </div>
            </aside>
          </form>
        )}
      </main>
    );
  }
  function Account() {
    const [mode, setMode] = useState("login");
    const [done, setDone] = useState(false);
    return (
      <main className="page-wrap account-page">
        <div className="account-card">
          <div className="account-copy">
            <span className="eyebrow">WELCOME TO YOUR CORNER</span>
            <h1>
              {done
                ? "You’re all set."
                : mode === "login"
                  ? "Good to see you."
                  : "Make yourself at home."}
            </h1>
            <p>
              {done
                ? "This is a demo experience — no account data was sent anywhere."
                : "Sign in or create an account to keep all your favorite finds in one place."}
            </p>
            {!done && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                {mode === "register" && (
                  <label>
                    Your name
                    <input required placeholder="Your full name" />
                  </label>
                )}
                <label>
                  Email address
                  <input type="email" required placeholder="you@example.com" />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    minLength="6"
                    required
                    placeholder="At least 6 characters"
                  />
                </label>
                <button className="btn btn-primary full-width">
                  {mode === "login" ? "Sign in" : "Create account"}{" "}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            {done && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDone(false);
                  go("home");
                }}
              >
                Back to the shop
              </button>
            )}
            {!done && (
              <p className="account-switch">
                {mode === "login"
                  ? "New around here?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() =>
                    setMode(mode === "login" ? "register" : "login")
                  }
                >
                  {mode === "login" ? "Create account" : "Sign in"}
                </button>
              </p>
            )}
          </div>
          <div className="account-art">
            <div className="art-circle">
              <ShoppingBag size={52} />
            </div>
            <h2>ShopSphere</h2>
            <p>
              Good products.
              <br />
              Better living.
            </p>
            <span>YOUR EVERYDAY, ELEVATED.</span>
          </div>
        </div>
      </main>
    );
  }
  function About() {
    return (
      <main className="page-wrap">
        <div className="about-hero">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500&q=85"
            alt="Shop interior"
          />
          <div>
            <span className="eyebrow">A LITTLE ABOUT US</span>
            <h1>
              Shopping, with <em>more feeling.</em>
            </h1>
            <p>We think everyday things deserve a little more thought.</p>
          </div>
        </div>
        <section className="about-story">
          <div>
            <span className="eyebrow">OUR POINT OF VIEW</span>
            <h2>
              Good things, <em>chosen well.</em>
            </h2>
          </div>
          <div>
            <p>
              ShopSphere started with a simple idea: shopping should feel less
              like searching and more like discovering. We bring together
              useful, beautiful, well-made pieces that make everyday life a
              little better.
            </p>
            <p>
              From the first click to the package at your door, we want every
              detail to feel considered, human, and refreshingly simple.
            </p>
            <button className="btn btn-primary" onClick={() => go("shop")}>
              Explore our picks <ArrowRight size={16} />
            </button>
          </div>
        </section>
        <section className="values-grid">
          <div>
            <ShieldCheck />
            <h3>Quality first</h3>
            <p>Useful pieces chosen with care.</p>
          </div>
          <div>
            <Heart />
            <h3>People over everything</h3>
            <p>Kind service and honest details.</p>
          </div>
          <div>
            <Sparkles />
            <h3>Everyday delight</h3>
            <p>Little discoveries worth keeping.</p>
          </div>
        </section>
      </main>
    );
  }
  function Contact() {
    const [sent, setSent] = useState(false);
    return (
      <main className="page-wrap">
        <div className="page-title">
          <span className="eyebrow">WE'RE HERE FOR YOU</span>
          <h1>
            Let's have a <em>conversation.</em>
          </h1>
          <p>
            A question, a thought, or just want to say hello? We're listening.
          </p>
        </div>
        <div className="contact-layout">
          <div className="contact-details">
            <div>
              <span className="contact-icon">
                <Mail />
              </span>
              <h3>Email us</h3>
              <p>hello@shopsphere.example</p>
              <small>We usually reply within one business day.</small>
            </div>
            <div>
              <span className="contact-icon">
                <Headphones />
              </span>
              <h3>Customer care</h3>
              <p>Monday–Friday, 9am–5pm</p>
              <small>Here to help make things right.</small>
            </div>
            <div className="contact-note">
              <Sparkles />
              <p>Real people, thoughtful answers. That's our promise.</p>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {sent ? (
              <div className="success-inline">
                <Check />
                <h2>Message received!</h2>
                <p>
                  Thanks for reaching out. This demo form doesn't send a real
                  email.
                </p>
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2>Send us a note.</h2>
                <p>Fill in the details and we'll take it from here.</p>
                <label>
                  Your name
                  <input required placeholder="Name" />
                </label>
                <label>
                  Email address
                  <input type="email" required placeholder="you@example.com" />
                </label>
                <label>
                  What can we help with?
                  <select defaultValue="General question">
                    <option>General question</option>
                    <option>Order support</option>
                    <option>Returns & exchanges</option>
                    <option>Product question</option>
                  </select>
                </label>
                <label>
                  Your message
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us a little more..."
                  />
                </label>
                <button className="btn btn-primary full-width">
                  Send message <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>
        </div>
      </main>
    );
  }
  return (
    <>
      <Header />
      {page === "home" && <Home />}
      {page === "shop" && <Shop />}
      {page === "product" && <ProductPage />}
      {page === "cart" && <Cart />}
      {page === "wishlist" && <Wishlist />}
      {page === "checkout" && <Checkout />}
      {page === "account" && <Account />}
      {page === "about" && <About />}
      {page === "contact" && <Contact />}
      <Footer />
      {toast && (
        <div className="toast">
          <Check size={17} />
          {toast}
        </div>
      )}
      <button
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);

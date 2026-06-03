import LeftNavBar from "./LeftNavBar.jsx";
import { useState, useEffect } from "react";

export const ShowProducts = () => {
  const [catalog, setCatalog] = useState([]);
  const [filteredCatalog, setFilteredCatalog] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseCategories = await fetch("/categories.json");
      const dataCategories = await responseCategories.json();
      setCategories(dataCategories);

      const response = await fetch("/products.json");
      const data = await response.json();
      setFilteredCatalog(data);
      setCatalog(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <LeftNavBar
        catalog={catalog}
        setFilteredCatalog={setFilteredCatalog}
        categories={categories}
      />

      <main className="app-main">
        <header className="page-header">
          <div>
            <h1>
              <i className="bi bi-bag-heart-fill me-2"></i>
              Welcome to the Shop
            </h1>
            <p className="subtitle">
              Fresh picks, handpicked deals — browse our latest products.
            </p>
          </div>
          <span className="results-pill">
            {filteredCatalog.length}{" "}
            {filteredCatalog.length === 1 ? "product" : "products"}
          </span>
        </header>

        {filteredCatalog.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-search"></i>
            <h5>No products found</h5>
            <p>Try a different category or search term.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredCatalog.map((product) => (
              <div
                key={product.id}
                className="col-12 col-sm-6 col-lg-4 col-xl-3"
              >
                <article className="product-card">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-body">
                    <span className="product-category">{product.category}</span>
                    <h5 className="product-title">{product.title}</h5>
                    <div className="product-footer">
                      <span className="product-price">${product.price}</span>
                      <button className="add-to-cart-btn">
                        <i className="bi bi-cart-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

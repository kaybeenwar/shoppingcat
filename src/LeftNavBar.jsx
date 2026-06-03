import { useState } from "react";
import Logo from "./assets/UWPlatteville.png";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const LeftNavBar = ({ catalog, setFilteredCatalog, categories }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filterCategory = (tag) => {
    setActiveCategory(tag);
    if (tag === "All") {
      setFilteredCatalog(catalog);
      return;
    }
    const results = catalog.filter((p) => p.category === tag);
    setFilteredCatalog(results);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === "") {
      setFilteredCatalog(catalog);
      return;
    }
    const results = catalog.filter((p) =>
      p.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCatalog(results);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredCatalog(catalog);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={Logo} alt="UW-Platteville Logo" />
      </div>

      <div className="sidebar-title">
        <small>Shop</small>
        <h4 className="m-0">Product Catalog</h4>
      </div>

      <div className="mb-4">
        <div className="section-label">
          <i className="bi bi-search me-1"></i> Search
        </div>
        <InputGroup>
          <FormControl
            className="search-input"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button
            className="search-clear"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        </InputGroup>
      </div>

      <div className="mb-4">
        <div className="section-label">
          <i className="bi bi-tags-fill me-1"></i> Categories
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button
            className={`category-btn ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => filterCategory("All")}
          >
            All
          </button>
          {categories.map((tag) => (
            <button
              key={tag}
              className={`category-btn ${activeCategory === tag ? "active" : ""}`}
              onClick={() => filterCategory(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <footer className="sidebar-footer">
        <div className="fw-semibold">Brayan Kabore</div>
        <a href="mailto:kaborebr@uwplatt.edu">kaborebr@uwplatt.edu</a>
      </footer>
    </aside>
  );
};

export default LeftNavBar;

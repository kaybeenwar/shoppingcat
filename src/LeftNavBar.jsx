import { useState } from "react";
import Logo from "./assets/UWPlatteville.png";
import { Button, InputGroup, FormControl } from "react-bootstrap";


const LeftNavBar = ({
catalog,
setFilteredCatalog,
categories
}) => {
    const filterCategory = (tag)=>{
        const results = catalog.filter((eachProduct) => eachProduct.category === tag);
        setFilteredCatalog(results);
    }
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
const value = e.target.value;
setSearchTerm(value);
if (value === "") {
    setFilteredCatalog(catalog);
    return;
}
const results = catalog.filter(eachProduct =>
    eachProduct.title.toLowerCase().includes(value.toLowerCase())
);
setFilteredCatalog(results);
}
const clearSearch = () => {
setSearchTerm("");
setFilteredCatalog(catalog);
};
    return (
<div className="d-flex flex-column bg-dark text-white vh-100 p-3" style={{ width: "350px" }} >
{/* Logo Section */}
<div className="text-center mb-4">
<img src={Logo} alt="Logo" className="img-fluid" />
</div>
{/* Title Section */}
<div className="text-center mb-4">
<h4>Product Catalog App</h4>
</div>
{/* Tag Buttons Section */}
<div className="mb-4">
<p>Categories :</p>
<div className="d-flex flex-wrap">
{categories.map((tag)=>(
<Button key={tag} variant="warning" className="mb-2 me-2 btn-sm" onClick={()=>{filterCategory(tag)}}>{tag}</Button>
))}

</div>
</div>
{/* Search Input Section */}
<div className="mb-4">
<InputGroup>
<FormControl
placeholder="Search products..."
aria-label="Search products"
value={searchTerm}
onChange={handleChange}
/>
<Button variant="outline-secondary" onClick={clearSearch}>
<i className="bi bi-x"></i> {/* Bootstrap icon for clear */}
</Button>
</InputGroup>
</div>
{/* Spacer to push footer to bottom */}
<div className="flex-grow-1"></div>
{/* Footer */}
<footer className="text-center mt-auto pt-3 border-top border-secondary">
<small>
<div>Brayan Kabore</div>
<div><a href="mailto:kaborebr@uwplatt.edu"
className="text-white text-decoration-none">kaborebr@uwplatt.edu</a></div>
</small>
</footer>
</div>
);
};
export default LeftNavBar;

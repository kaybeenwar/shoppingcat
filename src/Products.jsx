import LeftNavBar from "./LeftNavBar.jsx";
import {useState, useEffect} from 'react';

export const ShowProducts = () => {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseCategories = await fetch("/categories.json");
            const dataCategories = await responseCategories.json();
            setCategories(dataCategories);
            console.log(dataCategories);

            const response = await fetch("/products.json");
            const data = await response.json();
            setFilteredCatalog(data);
            setCatalog(data);
            console.log(data);
        };
        fetchData();
    }, []);
    
    return (
        <div className="d-flex">
            {/* Left Navigation Bar */}
            <div style={{ width: '350px' }}>
<LeftNavBar
catalog={catalog}
setFilteredCatalog={setFilteredCatalog}
categories={categories}
/>
</div>
            {/* One row */}
            <div className="row g-4">
                {/* Map only columns */}
                {filteredCatalog.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4">
                        <div className="card h-100">
                            <img
                                src={product.image}
                                className="card-img-top p-3"
                                alt={product.title}
                                style={{ objectFit: "contain", height: 180 }}
                                />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text mb-2">
                                    <strong>Price:</strong> ${product.price}
                                </p>
                                <p className="card-text small text-muted">{product.category}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
        
    );
};
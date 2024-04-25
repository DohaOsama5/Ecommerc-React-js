import React, { useState } from "react";
import { products } from '../data/Data';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {addToWishlist} from '../redux/WishlistSlice'
export default function Product() {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuItems, setMenuItems] = useState(products);
    const navigate = useNavigate();
    const [priceFilter, setPriceFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
  const iconStyle = {
      color: 'green',
      
  };
    const handleAddToCart = (product) => {
        const totalPrice = qty * product.price;
        const tempProduct = {
            ...product,
            quantity: qty,
            totalPrice,
        };
        dispatch(addToCart(tempProduct));
        navigate("/cart");
    };

    const filterProductsByName = () => {
        if (!searchQuery) {
            return menuItems; 
        }
        return menuItems.filter(product =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filterItem = (category) => {
        const newItems = products.filter((item) => item.category === category);
        setMenuItems(newItems);

        if (category === "all") {
            setMenuItems(products);
        }
    };

    const filterProducts = () => {
        let filteredProducts = [...menuItems];

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (priceFilter) {
            const [minPrice, maxPrice] = priceFilter.split('-');
            filteredProducts = filteredProducts.filter(product =>
                product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
            );
        }

        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product =>
                product.category === categoryFilter
            );
        }

        return filteredProducts;
    };

    return (
        <>
            <div className='container-fluid fruite py-5'>
                <div className='container py-5'>
                    <div className='text-center'>
                        <div className='row g-4'>
                            <div className="col-lg-4 text-start">
                                <h1>Our Products</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className='nav nav-pills d-inline-flex text-center mb-5'>
                                    <li className='nav-item'><a href='#' className="d-flex m-2 py-2 bg-light rounded-pill active" onClick={() => filterItem("all")}><span className="text-dark" style={{ width: "130px" }}>All Products</span></a></li>
                                    <li className='nav-item'><a href='#' className="d-flex m-2 py-2 bg-light rounded-pill " onClick={() => filterItem("Vegetables")}><span className="text-dark" style={{ width: "130px" }}>Vegetables</span></a></li>
                                    <li className='nav-item'><a href='#' className="d-flex m-2 py-2 bg-light rounded-pill " onClick={() => filterItem("Fruits")}><span className="text-dark" style={{ width: "130px" }}> Fruits</span></a></li>
                                    <li className='nav-item'><a href='#' className="d-flex m-2 py-2 bg-light rounded-pill " onClick={() => filterItem("Bread")}><span className="text-dark" style={{ width: "130px" }}>Bread</span></a></li>
                                    <li className='nav-item'><a href='#' className="d-flex m-2 py-2 bg-light rounded-pill " onClick={() => filterItem("Meat")}><span className="text-dark" style={{ width: "130px" }}>Meat</span></a></li>
                                </ul>
                                <div className="mt-4">
                                    <label className="me-2">Price:</label>
                                    <select
                                        value={priceFilter}
                                        onChange={(e) => setPriceFilter(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="0-2">$0 - $2</option>
                                        <option value="3-4">$3 - $4</option>
                                        <option value="5-6">$5 - $6</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <label className="me-2">Category:</label>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Bread">Bread</option>
                                        <option value="Meat">Meat</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="position-relative mx-auto my-5">
                        <input
                            className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                            style={{ top: "0", right: "25%" }}
                        >
                            Submit Now
                        </button>
                    </div>
                    <div className='tab-pane fade show p-0 active'>
                        <div className='row g-4'>
                            <div className='col-lg-12'>
                                <div className='row g-4'>
                                    {filterProducts().map((val, index) => (
                                        <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                                            <div className='rounded position-relative fruite-item'>
                                                <div className='fruite-img'>
                                                    <img src={val.product_img} className="img-fluid w-100 rounded-top" alt="" />
                                                </div>
                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{val.category} </div>
                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{val.product_name}</h4>
                                                    <p>{val.description}</p>
                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                        <p className="text-dark fs-5 fw-bold mb-0">
                                                            $ {val.price}
                                                        </p>
                                                            <button onClick={() => dispatch(addToWishlist(val))}>
    <FontAwesomeIcon icon={faHeart} style={iconStyle}/>
</button>
                                                        <button
                                                            onClick={() => handleAddToCart(val)}
                                                            className="btn border border-secondary rounded-pill px-3 text-primary">
                                                            <i className="fa fa-shopping-bag me-2 text-primary"></i>
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// import React, { useState } from "react";
// import { products } from '../data/Data';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addToCart } from "../redux/CartSlice";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';

// export default function Product() {
//     const dispatch = useDispatch();
//     const [qty, setQty] = useState(1);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [menuItems, setMenuItems] = useState(products);
//     const navigate = useNavigate();
//     const [priceFilter, setPriceFilter] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [wishlist, setWishlist] = useState([]); // State to store wishlist items

//     const handleAddToCart = (product) => {
//         const totalPrice = qty * product.price;
//         const tempProduct = {
//             ...product,
//             quantity: qty,
//             totalPrice,
//         };
//         dispatch(addToCart(tempProduct));
//         navigate("/cart");
//     };

//     const addToWishlist = (product) => {
//         setWishlist([...wishlist, product]); // Append product to the wishlist
//         // Navigate to wishlist page
//         navigate("/wishlist");
//     };

//     const filterProductsByName = () => {
//         if (!searchQuery) {
//             return menuItems; 
//         }
//         return menuItems.filter(product =>
//             product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     };

//     const filterItem = (category) => {
//         const newItems = products.filter((item) => item.category === category);
//         setMenuItems(newItems);

//         if (category === "all") {
//             setMenuItems(products);
//         }
//     };

//     const filterProducts = () => {
//         let filteredProducts = [...menuItems];

//         if (searchQuery) {
//             filteredProducts = filteredProducts.filter(product =>
//                 product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         if (priceFilter) {
//             const [minPrice, maxPrice] = priceFilter.split('-');
//             filteredProducts = filteredProducts.filter(product =>
//                 product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
//             );
//         }

//         if (categoryFilter) {
//             filteredProducts = filteredProducts.filter(product =>
//                 product.category === categoryFilter
//             );
//         }

//         return filteredProducts;
//     };

//     return (
//         <>
//             <div className='container-fluid fruite py-5'>
//                 <div className='container py-5'>
//                     <div className='text-center'>
//                         <div className='row g-4'>
//                             <div className="col-lg-4 text-start">
//                                 <h1>Our Products</h1>
//                             </div>
//                             <div className="col-lg-8 text-end">
//                                 <ul className='nav nav-pills d-inline-flex text-center mb-5'>
//                                     {/* Filter options */}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="position-relative mx-auto my-5">
//                         <input
//                             className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
//                             type="text"
//                             placeholder="Search"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <button
//                             type="submit"
//                             className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
//                             style={{ top: "0", right: "25%" }}
//                         >
//                             Submit Now
//                         </button>
//                     </div>
//                     <div className='tab-pane fade show p-0 active'>
//                         <div className='row g-4'>
//                             <div className='col-lg-12'>
//                                 <div className='row g-4'>
//                                     {filterProducts().map((val, index) => (
//                                         <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
//                                             <div className='rounded position-relative fruite-item'>
//                                                 <div className='fruite-img'>
//                                                     <img src={val.product_img} className="img-fluid w-100 rounded-top" alt="" />
//                                                 </div>
//                                                 <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}>{val.category} </div>
//                                                 <div className="p-4 border border-secondary border-top-0 rounded-bottom">
//                                                     <h4>{val.product_name}</h4>
//                                                     <p>{val.description}</p>
//                                                     <div className="d-flex justify-content-between flex-lg-wrap">
//                                                         <p className="text-dark fs-5 fw-bold mb-0">
//                                                             $ {val.price}
//                                                         </p>
//                                                         {/* Heart icon to add to wishlist */}
//                                                         <button onClick={() => addToWishlist(val)}>
//                                                             <FontAwesomeIcon icon={faHeart} />
//                                                         </button>

//                                                         <button
//                                                             onClick={() => handleAddToCart(val)}
//                                                             className="btn border border-secondary rounded-pill px-3 text-primary">
//                                                             <i className="fa fa-shopping-bag me-2 text-primary"></i>
//                                                             Add to cart
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


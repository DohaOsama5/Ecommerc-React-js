import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {removeFromWishlist} from '../../redux/WishlistSlice'
const WhisList = () => {
    const wishlist = useSelector((state) => state.wishlist); 
    const dispatch = useDispatch();
     const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };
  const iconStyle = {
    color: 'green' 
  };
    return (
        <div style={{ padding: '150px' }}>
           
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Image</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Product Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist.map((item, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <img src={item.product_img} alt={item.product_name} style={{ width: '80px' }} />
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.product_name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>${item.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <button onClick={() => handleRemoveFromWishlist(item.id)}>
                                          <FontAwesomeIcon icon={faTimesCircle} style={iconStyle}/>

                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WhisList;

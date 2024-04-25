import React from 'react'

const ShopDet = () => {
  const containerStyle = {
        marginTop: '150px',
    };

    const headingStyle = {
        color: '#333',
        textAlign: 'center',
    };

    const columnStyle = {
        padding: '0 15px',
    };

    const heading2Style = {
        color: '#ffb524',
        marginBottom: '20px',
    };

    const paragraphStyle = {
        color: '#777',
        lineHeight: '1.6',
    };

    return (
        <div style={containerStyle} className="container">
            <h1 style={headingStyle} className="mt-5 mb-4">Shop Details</h1>
            <div className="row">
                <div style={columnStyle} className="col-md-6">
                    <h2 style={heading2Style}>About Us</h2>
                    <p style={paragraphStyle}>I Say Organic is a social enterprise which believes in giving people the option of eating safe food (grown without toxic chemicals and pesticides), while recognizing and supporting farmers who grow this food.

We partner with producer companies and connect farmers who want to grow organic or sustainable with customers who want to buy organic or sustainable.</p>
                </div>
                <div style={columnStyle} className="col-md-6">
                    <h2 style={heading2Style}>Our Mission</h2>
                    <p style={paragraphStyle}>Our mission is to provide fresh and high-quality products to our customers. We source our products from local farmers and ensure that they meet the highest standards of quality and freshness. We strive to create a positive impact on the community by promoting healthy eating habits and supporting local agriculture.</p>
                </div>
            </div>
        </div>
    );
}

export default ShopDet

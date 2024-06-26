import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
      
function TopBar() {
  return (
    <>
      <div className="container topbar bg-primary d-none d-lg-block">
        <div className='d-flex justify-content-between'>
          <div className='top-info ps-2'>
            <small className='me-3'>
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
              <Link className="text-white">123 Street, Assuit</Link>
            </small>

            <small className='me-3'>
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <Link className="text-white" href="mailto:Doha@gmail.com">Doha@gmail.com</Link>
            </small>
          </div>
          <div className="top-link pe-2">
            <Link className="text-white"><small className="text-white mx-2">Privacy Policy</small></Link>
            <Link className="text-white"><small className="text-white mx-2">Terms of Use</small></Link>
            <Link className="text-white"><small className="text-white ms-2">Sales and Refunds</small></Link>
          </div>
        </div>
          </div>
          
        
    </>
  );
}

export default TopBar;
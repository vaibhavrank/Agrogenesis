import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 My App. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-gray-300 hover:text-white mx-2">Privacy Policy</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Terms of Service</a>
          <a href="#" className="text-gray-300 hover:text-white mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-600 p-8 text-white">
      <div className="container mx-auto text-center">
        <p className="font-bold text-2xl underline underline-offset-2">Examify.com</p>
        <p className="mt-2">Providing innovative solutions for your needs.</p>

        <div className="flex justify-center mt-4">
          <a href="#" className="mx-2 hover:underline underline-offset-2">Home</a>
          <a href="#" className="mx-2 hover:underline underline-offset-2">About</a>
          <a href="#" className="mx-2 hover:underline underline-offset-2">Services</a>
          <a href="#" className="mx-2 hover:underline underline-offset-2">Contact</a>
        </div>

        <div className="mt-4">
          <p>&copy; {new Date().getFullYear()} Examify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

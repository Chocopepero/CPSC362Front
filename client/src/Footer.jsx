import React from 'react';
import facebookLogo from './images/facebookLogo.png';
import instagramLogo from './images/instalogo.png';
import twitterLogo from './images/twitterlogo.png'; // Add the Twitter logo

export default function Footer() {
  return (
    <div>
      <footer className="p-4 bg-blue-500 text-white flex justify-between">
        <div className="flex items-center space-x-4">
          <p className="font-bold">Follow us on Socials:</p>
          <img src={facebookLogo} alt="Facebook logo" className="w-10 h-10" />
          <img src={instagramLogo} alt="Instagram logo" className="w-10 h-10" />
          <img src={twitterLogo} alt="Twitter logo" className="w-10 h-10" />
        </div>

        <div className="subscription-form">
          <h2 className="font-bold mb-2">Subscribe for Promotions & News</h2>
          <form action="your-server-endpoint" method="POST" className="flex flex-col items-center">
            <input type="email" id="email" name="email" required placeholder="Enter your email" className="p-2 mb-2 rounded" />
            <button type="submit" className="bg-white text-blue-500 p-2 rounded hover:bg-gray-200">Subscribe</button>
          </form>
        </div>

        <div className="flex flex-col space-y-2">
          <a href="/about-us" className="hover:underline">About Us</a>
          <a href="/payment-policy" className="hover:underline">Payment Policy</a>
        </div>
      </footer>
    </div>
  );
}

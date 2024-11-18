import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>Phone: 9954898352</p>
              <p>Phone: 7002435921</p>
              <p>Phone: 7002366304</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <p>Simen Chapori Mini Stadium</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-400">
                Facebook
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Instagram
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2024 E-8 YUVA&apos;S TROPHY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

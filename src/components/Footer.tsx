import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm">
              © {new Date().getFullYear()} Do-it english. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

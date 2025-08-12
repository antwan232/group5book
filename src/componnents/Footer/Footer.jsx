import React from "react";

const Footer = () => {
  return (
    <footer className=" relative overflow-hidden pt-16 pb-10 px-6 md:px-14 font-sans">
      {/*  circles */}
      <div
        className="hidden md:block absolute top-0 right-0 w-[300px] h-[300px] border-32 border-white rounded-full -translate-x-1/3 -translate-y-1/3 pointer-events-none"
        style={{ borderWidth: "80px" }}
        aria-hidden="true"
        >
      </div>
 
      <div
        className=" hidden md:block absolute bottom-0 left-0 w-[300px] h-[300px] border-32 border-gray-600 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"
        style={{ borderWidth: "70px" }}
        aria-hidden="true"
          >
      </div>

      {/* Logo  */}
      <div className="flex justify-center mb-12">
        <h2 className="text-5xl font-bold text-white drop-shadow-[0_0_10px_#00f]">
          GROUP5BOOK
        </h2>
      </div>

      {/* Top 2 columns */}
      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-6xl mx-auto mb-12">
        <div className="flex flex-col space-y-3 min-w-[150px] md:min-w-[180px]">
          <h4 className="text-white font-semibold text-sm mb-2">LEGAL</h4>
          <a href="#" className="hover:text-white text-sm">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white text-sm">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white text-sm">
            Cookie Policy
          </a>
        </div>

        <div className="flex flex-col space-y-3 min-w-[150px] md:min-w-[180px]">
          <h4 className="text-white font-semibold text-sm mb-2">CONTACT</h4>
          <a
            href="tel:123456789"
            className="flex items-center gap-2 hover:text-white text-sm"
          >
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.21.4 2.39.78 3.5a2 2 0 0 1-.45 2.11L9 10.91a16 16 0 0 0 6 6l1.58-1.58a2 2 0 0 1 2.11-.45c1.1.38 2.28.65 3.5.78A2 2 0 0 1 22 16.92z" />
            </svg>
            123 456 789
          </a>
          <a
            href="mailto:hola@liftmedia.com"
            className="flex items-center gap-2 hover:text-white text-sm"
          >
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            group5book@gmail.com
          </a>
        </div>
      </div>

      <hr className="border-gray-700 mb-8 mx-auto max-w-6xl" />

      {/* Social icons and copyright */}
      <div className="z-[4] max-w-6xl mx-auto flex flex-col md:flex-row md:justify-end items-right text-white-400 space-y-4 md:space-y-0 mb-8">
        <p className="text-xs text-center md:text-left max-w-md">
          © 2025 GROUP 5<br />
          EGYPT
          <br />
          Project by Nourhan Saleh, Antwan Nabil & Adel Muhammad
        </p>
      </div>
    </footer>
  );
};

export default Footer;

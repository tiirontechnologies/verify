import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../../../assets/Tiiron_Erp_log-Photoroom.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">


{/* Logo */}
<div className="flex items-center gap-3">

  <img
    src={logo}
    alt="Tiiron"
    className="h-12 md:h-14 w-auto object-contain"
  />

  <div>
    <h1 className="text-xl md:text-2xl font-bold text-gray-900">
      Tiiron
    </h1>

    <p className="text-xs text-gray-500 hidden sm:block">
      AI Powered ERP
    </p>
  </div>

</div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">

          <a href="#" className="hover:text-red-600">
            Verify
          </a>

          <a href="#" className="hover:text-red-600">
            Solutions
          </a>

          <a href="#" className="hover:text-red-600">
            Enterprise
          </a>

          <a href="#" className="hover:text-red-600">
            Developers
          </a>

        </nav>

        {/* Desktop Buttons */}
<div className="hidden lg:flex items-center gap-3">

  <Link
    to="/login"
    className="text-gray-700 hover:text-red-600 transition"
  >
    Login
  </Link>



  <Link
    to="/verify"
    className="border border-gray-300 px-5 py-2 rounded-xl hover:bg-gray-100 transition"
  >
    Verify Credential
  </Link>

  <Link
    to="/signup"
    className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition"
  >
    Get Started
  </Link>

</div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t bg-white px-6 py-6">

          <div className="flex flex-col gap-6 text-gray-700">

            <a href="#">Verify</a>
            <a href="#">Solutions</a>
            <a href="#">Enterprise</a>
            <a href="#">Developers</a>

            <hr />

            <button className="text-left">
              Student Login
            </button>

            <button className="border rounded-xl py-3">
              Client Login
            </button>

            <button className="bg-red-600 text-white rounded-xl py-3">
              Get Started
            </button>

          </div>

        </div>
      )}

    </header>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import logo from "../../../assets/Tiiron_Technologies_Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

      <div className="max-w-[1800px] mx-auto h-[72px] px-3 lg:px-4 flex items-center justify-between">

        {/* Logo */}

<Link to="/" className="flex items-center flex-shrink-0">

  <img
    src={logo}
    alt="Tiiron Technologies"
    className="h-16 w-auto object-contain"
  />

</Link>

        {/* Center Navigation */}

<nav className="hidden lg:flex items-center gap-12 text-lg font-semibold leading-none text-gray-700">
          <Link
            to="/"
            className="hover:text-red-600 transition duration-200"
          >
            Home
          </Link>

          <Link
            to="/features"
            className="hover:text-red-600 transition"
          >
            Features
          </Link>

          <Link
            to="/solutions"
            className="hover:text-red-600 transition"
          >
            Solutions
          </Link>

          <Link
            to="/pricing"
            className="hover:text-red-600 transition"
          >
            Pricing
          </Link>

          <Link
            to="/contact"
            className="hover:text-red-600 transition"
          >
            Contact
          </Link>

        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-5 flex-shrink-0">

          <Link
            to="/login"
            className="
px-7
py-3
rounded-xl
border
border-gray-300
text-[17px]
font-semibold
text-gray-700
hover:bg-gray-50
transition
"
          >
            Login
          </Link>

          <Link
            to="/verify"
            className="
flex
items-center
gap-2
bg-red-600
hover:bg-red-700
text-white
px-7
py-3
rounded-xl
text-[17px]
font-semibold
transition
shadow-sm
"
          >
            <ShieldCheck size={18} />
            Verify Credential
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="lg:hidden border-t bg-white px-6 py-6">

          <div className="flex flex-col gap-5">

            <Link to="/">Home</Link>

            <Link to="/features">Features</Link>

            <Link to="/solutions">Solutions</Link>

            <Link to="/pricing">Pricing</Link>

            <Link to="/contact">Contact</Link>

            <hr />

            <Link
              to="/login"
              className="border rounded-xl py-3 text-center"
            >
              Login
            </Link>

            <Link
              to="/verify"
              className="bg-red-600 text-white rounded-xl py-3 text-center"
            >
              Verify Credential
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}
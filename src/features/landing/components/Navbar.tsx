import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import logo from "../../../assets/Tiiron_Technologies_Logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

      <div className="max-w-[1800px] mx-auto h-[86px] px-5 lg:px-6 flex items-center justify-between">

        {/* Logo */}

<Link to="/" className="flex items-center flex-shrink-0">

  <img
    src={logo}
    alt="Tiiron Technologies"
    className="h-14 w-auto object-contain"
  />

</Link>

        {/* Center Navigation */}

<nav className="hidden lg:flex items-center gap-12 relative">

  <Link
    to="/"
    className="text-[18px] font-medium text-gray-800 hover:text-red-600 transition"
  >
    Home
  </Link>

<a
  href="https://tiirontechnologies.com/services"
  target="_self"
  rel="noopener noreferrer"
  className="text-[18px] font-medium text-gray-800 hover:text-red-600 transition"
>
  Services
</a>

<a
  href="https://tiirontechnologies.com/products"
  target="_self"
  rel="noopener noreferrer"
  className="text-[18px] font-medium text-gray-800 hover:text-red-600 transition"
>
  Products
</a>

  <a
  href="https://tiirontechnologies.com/about"
  target="_self"
  rel="noopener noreferrer"
  className="text-[18px] font-medium text-gray-800 hover:text-red-600 transition"
>
  About
</a>

  <div
    className="relative"
    onMouseEnter={() => setExploreOpen(true)}
    onMouseLeave={() => setExploreOpen(false)}
  >
<button
  className="
    flex
    items-center
    gap-2
    text-[18px]
    font-medium
    text-gray-800
    hover:text-red-600
    transition-all
    duration-200
  "
>
  Explore
  <ChevronDown
    size={18}
    strokeWidth={2.3}
    className={`transition-transform duration-300 ${
      exploreOpen ? "rotate-180" : ""
    }`}
  />
</button>

{exploreOpen && (
  <div
    className="
      absolute
      left-1/2
      -translate-x-1/2
      top-full
      mt-3
      w-[340px]
      bg-white
      rounded-3xl
      border
      border-gray-200
      shadow-2xl
      overflow-hidden
      z-50
      py-3
    "
  >
    <a
      href="https://tiirontechnologies.com/pricing"
      target="_self"
      className="
        flex
        items-center
        justify-between
        px-7
        py-4
        text-[18px]
        font-medium
        text-gray-800
        hover:bg-gray-50
        hover:text-red-600
        transition
      "
    >
      Pricing
    </a>

    <a
      href="https://tiirontechnologies.com/comingsoon"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        items-center
        justify-between
        px-7
        py-4
        text-[18px]
        font-medium
        text-gray-800
        hover:bg-gray-50
        hover:text-red-600
        transition
      "
    >
      Testimonials
    </a>

    <a
      href="https://tiirontechnologies.com/help"
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        items-center
        justify-between
        px-7
        py-4
        text-[18px]
        font-medium
        text-gray-800
        hover:bg-gray-50
        hover:text-red-600
        transition
      "
    >
      Help & Support
    </a>

    <Link
      to="/"
      className="
        flex
        items-center
        justify-between
        px-7
        py-4
        text-[18px]
        font-medium
        text-gray-800
        hover:bg-gray-50
        hover:text-red-600
        transition
      "
    >
      Verify Credentials
      <ExternalLink size={18} strokeWidth={2.2} />
    </Link>
  </div>
)}
  </div>

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
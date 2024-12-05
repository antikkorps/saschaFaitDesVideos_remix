import { Link, useLocation } from "@remix-run/react"
import { Play } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const activeItem = location.pathname

  const menuItems = [
    { title: "Portfolio", href: "/portfolio" },
    { title: "Services", href: "/services" },
    { title: "À propos", href: "/a-propos" },
    { title: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed w-full z-40 bg-neutral-900">
        <div className="h-20 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 text-white">
              <Play className="w-6 h-6" fill="currentColor" />
              <span className="text-lg font-medium tracking-wider">
                Sascha Fait des vidéos
              </span>
            </Link>

            {/* Burger parfaitement centré */}
            <div className="h-20 flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 flex flex-col justify-center items-center w-12 h-12"
                aria-label="Menu"
              >
                <div className="w-8 h-5 flex flex-col justify-center">
                  <span
                    className={`absolute h-0.5 w-8 bg-white transform transition-all duration-300 ease-in-out ${
                      isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-8 bg-white transform transition-all duration-300 ease-in-out ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute h-0.5 w-8 bg-white transform transition-all duration-300 ease-in-out ${
                      isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-700 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background layers */}
        <div
          className={`absolute inset-0 bg-neutral-900 transition-transform duration-700 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        />

        {/* Menu content */}
        <div
          className={`relative h-full flex flex-col justify-center items-center transition-all delay-300 duration-500 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <nav className="flex flex-col items-center justify-center space-y-8">
            {menuItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`group relative text-3xl md:text-4xl text-white/90 hover:text-white transition-colors duration-300 ${
                  activeItem === item.href ? "text-white" : ""
                }`}
              >
                {item.title}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="absolute bottom-16 text-center">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 text-sm text-white border border-white/20 hover:bg-white hover:text-neutral-900 transition-colors duration-300"
            >
              Discutons de votre projet
            </Link>
            <div className="mt-8 text-white/50 text-sm">
              <p>alexandre.pierron@gmail.com</p>
              <p>+33 6 13 80 65 54</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

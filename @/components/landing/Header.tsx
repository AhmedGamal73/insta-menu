// components/Header.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "الرئيسية", href: "/" },
    { label: "من نحن", href: "/about" },
    {
      label: "المميزات",
      href: "/features",
      hasDropdown: true,
      dropdownItems: [
        { label: "معالجة المدفوعات", href: "/features/payment" },
        { label: "التحليلات", href: "/features/analytics" },
        { label: "الأمان", href: "/features/security" },
        { label: "التكامل", href: "/features/integration" },
      ],
    },
    {
      label: "المدونة",
      href: "/blog",
      hasDropdown: true,
      dropdownItems: [
        { label: "آخر المقالات", href: "/blog/latest" },
        { label: "دروس تعليمية", href: "/blog/tutorials" },
        { label: "الأخبار", href: "/blog/news" },
      ],
    },
    { label: "اتصل بنا", href: "/contact" },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a1f2e] shadow-lg backdrop-blur-md bg-opacity-95"
          : "bg-[#1a1f2e]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo - Center on mobile, End on desktop */}
          <Link href="/" className="flex items-center gap-2 lg:order-1">
            <div className="text-3xl font-bold">
              <span className="text-green-400">D</span>
              <span className="text-white">igipay</span>
            </div>
          </Link>
          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors py-2"
                  >
                    <span className="text-[18px]">{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#242938] rounded-lg shadow-xl py-2">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2d3343] transition-colors text-right"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Login Button - End on mobile, Start on desktop */}
          <div>
            <Link
              href="/login"
              className="hidden lg:block px-6 py-2 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-[#1a1f2e] transition-all duration-300"
            >
              جرب الأن
            </Link>
            {/* Empty div for mobile spacing */}

            <div className="lg:hidden w-6"></div>
          </div>
          {/* Mobile Menu Button - Start */}{" "}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-[#1a1f2e] border-t border-gray-700 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="mb-2">
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full text-right px-4 py-3 text-gray-300 hover:text-white hover:bg-[#242938] rounded-lg transition-colors"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform order-1 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                    <span className="order-2">{item.label}</span>
                  </button>
                  {openDropdown === item.label && (
                    <div className="mr-4 mt-2 space-y-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-[#2d3343] rounded-lg transition-colors text-right"
                          onClick={() => {
                            setOpenDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-[#242938] rounded-lg transition-colors text-right"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Login Button */}
          <div className="mt-4 px-4">
            <Link
              href="/login"
              className="block w-full text-center px-6 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-green-400 hover:text-[#1a1f2e] transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

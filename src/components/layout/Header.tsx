import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">V</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">Verde</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`link-underline font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* ... actually, let's just do the whole block replacement properly */}
             <div className={`transition-all duration-300 ${isSearchOpen ? 'w-full sm:w-64 absolute top-16 left-0 px-4 bg-background sm:static sm:bg-transparent sm:p-0' : 'w-auto'}`}>
                {isSearchOpen ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const input = form.elements.namedItem('search') as HTMLInputElement;
                      if (input.value.trim()) {
                         window.location.href = `/products?search=${encodeURIComponent(input.value)}`;
                         setIsSearchOpen(false);
                      }
                    }}
                    className="flex items-center gap-2 w-full pb-4 sm:pb-0"
                  >
                    <input
                      name="search"
                      autoFocus
                      placeholder="Search..."
                      className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsSearchOpen(false)}
                    >
                       <X className="w-4 h-4" />
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                     <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hidden sm:flex"
                      onClick={() => setIsSearchOpen(true)}
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Link to="/cart">
                      <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="w-5 h-5" />
                        {itemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-semibold"
                          >
                            {itemCount}
                          </motion.span>
                        )}
                      </Button>
                    </Link>
                    <Link to="/auth/login" className="hidden sm:block">
                      <Button variant="outline" size="sm">
                        <User className="w-4 h-4 mr-1" />
                        Login
                      </Button>
                    </Link>
                    
                    {/* Mobile Menu Toggle */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                  </div>
                )}
            </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t mt-2">
                <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full" variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
}

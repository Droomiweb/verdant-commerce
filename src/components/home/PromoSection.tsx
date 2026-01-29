import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Percent } from "lucide-react";

export function PromoSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--accent)) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 30%)`
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Percent className="w-4 h-4" />
              Limited Time Offer
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Summer Sale
              <br />
              <span className="text-accent">Up to 50% Off</span>
            </h2>
            
            <p className="text-lg opacity-90 mb-8 max-w-md">
              Don't miss out on our biggest sale of the season. Premium products at unbeatable prices.
            </p>
            
            <Link to="/products?filter=sale">
              <Button variant="gold" size="xl">
                Shop the Sale
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto bg-primary-foreground/10 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60"
                alt="Summer Sale"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            
            {/* Floating Price Tag */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm font-medium">Save up to</p>
              <p className="text-4xl font-bold">₹200</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

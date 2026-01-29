import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Sparkles, Shield, Truck, Users, Award, Leaf } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container-custom py-12 md:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Crafting the Future of <span className="text-gradient-primary">Commerce</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded with a vision to revolutionize online shopping, Verde brings you a curated collection of premium products that blend style, sustainability, and functionality. We believe in quality over quantity and experiences over transactions.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { label: "Happy Customers", value: "50K+" },
            { label: "Products Sold", value: "120K+" },
            { label: "Years Active", value: "5+" },
            { label: "Team Members", value: "40+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-secondary/50 rounded-2xl"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Verde, our mission is simple: to make premium, sustainable products accessible to everyone. We work directly with artisans and manufacturers who share our values of quality, ethical production, and environmental responsibility.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every product in our catalog is hand-picked and rigorously tested to ensure it meets our high standards. We're not just selling products; we're building a community of conscious consumers who care about what they buy and where it comes from.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Shield, text: "Quality Guarantee" },
                { icon: Truck, text: "Sustainable Shipping" },
                { icon: Users, text: "Community First" },
                { icon: Leaf, text: "Eco-Friendly" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-xl">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
              alt="Team working together" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide every decision we make, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Excellence",
                desc: "We never settle for good enough. We strive for excellence in every aspect of our business.",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                desc: "We are committed to reducing our environmental footprint and promoting sustainable practices.",
              },
              {
                icon: Users,
                title: "Integrity",
                desc: "We build trust through honesty, transparency, and ethical business conduct.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-border rounded-2xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

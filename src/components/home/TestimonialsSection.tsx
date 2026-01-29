import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    content: "Absolutely love the quality! The products exceeded my expectations. Will definitely be ordering again.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    content: "Fast shipping and excellent customer service. The packaging was beautiful and the product was perfect.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    content: "Great value for money. The attention to detail is impressive. Highly recommend Verde to everyone!",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who trust Verde for quality products
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "10K+", label: "Products Sold" },
            { value: "4.9", label: "Average Rating" },
            { value: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

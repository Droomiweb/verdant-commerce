import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, MapPin, Package } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { toast } from "@/hooks/use-toast";

type Step = "shipping" | "payment" | "confirmation";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = total > 50 ? 0 : 9.99;
  const grandTotal = total + shipping;

  const steps = [
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "confirmation", label: "Confirmation", icon: Package },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearCart();
    setCurrentStep("confirmation");
    setIsProcessing(false);
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : steps.findIndex((s) => s.id === currentStep) > index
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {steps.findIndex((s) => s.id === currentStep) > index ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`ml-2 hidden sm:block ${
                    currentStep === step.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                      steps.findIndex((s) => s.id === currentStep) > index
                        ? "bg-success"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="San Francisco" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="94102" className="mt-1" />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => setCurrentStep("payment")}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === "payment" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
              >
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Pay $${grandTotal.toFixed(2)}`}
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === "confirmation" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card rounded-xl border border-border p-8 text-center"
              >
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order number is{" "}
                  <strong>#VRD{Date.now().toString().slice(-6)}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  We've sent a confirmation email with your order details.
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </Button>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep !== "confirmation" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortfolioLayout } from "@/components/layouts";

export default function App(): JSX.Element {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription
    console.log("Subscribe:", email);
  };

  return (
    <PortfolioLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative from-primary/10 mt-8 to-background pb-16">
          <div className="container bg-orange-500 px-4 mx-auto rounded-3xl">
            <div className="flex flex-col lg:flex-row items-center pt-24 pb-12 gap-8">
              {/* Left Content */}

              {/* Right Content - Hero Image */}
              <div className="w-1/3 flex justify-end relative right-0">
                <img
                  src="/img/portfolio/landing/mobile.png"
                  alt="Delicious Food"
                  className="w-[200px] h-auto object-conver"
                />
              </div>

              <div className="w-2/3 flex flex-col flex-1 text-center lg:text-right space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  اكتشف أشهى المأكولات
                  <br />
                  <span className="text-primary">في مكان واحد</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  اطلب من أفضل المطاعم في منطقتك. تصفح القوائم، اختر وجباتك
                  المفضلة، واستمتع بتجربة طعام لا تُنسى
                </p>

                {/* Email Subscription */}
                <form
                  onSubmit={handleSubscribe}
                  className="flex gap-2 max-w-md mx-auto lg:mx-0"
                >
                  <Input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="default">
                    اشترك الآن
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortfolioLayout>
  );
}

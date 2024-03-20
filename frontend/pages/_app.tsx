import { DirectionProvider } from "@radix-ui/react-direction";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import "../@/styles/global.css";

import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <DirectionProvider dir="rtl">
          <Component {...pageProps} />
          <Toaster />
        </DirectionProvider>
      </QueryClientProvider>
    </CartProvider>
  );
}

export default MyApp;

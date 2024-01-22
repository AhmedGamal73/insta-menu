import "../@/styles/global.css";
import { DirectionProvider } from "@radix-ui/react-direction";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider dir="rtl">
        <Component {...pageProps} />
      </DirectionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

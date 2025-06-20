/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./@/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    backgroundImage: (theme) => ({
      "menu-hero": "url('/img/menu-hero.jpg')",
      "items-loading": "url('/img/loading.webp')",
      "restaurant-hero":
        "url('https://lifehacker.com/imagery/articles/01HF2H25FNY97E7KS82J8RFSXD/hero-image.fill.size_1248x702.v1699834114.jpg')",
      success: "url('/img/success.png')",
    }),
    animation: {
      vibrate: "vibrate 0.2s linear",
      fade: "fadeOut 3s ease-in-out",
    },
    fontFamily: {
      rubik: ["rubik", "sans-serif"],
      rubikBold: ["rubikBold", "sans-serif"],
      rubikLight: ["rubikLight", "sans-serif"],
    },
    boxShadow: {
      "3xl": "0 5px 40px 10px rgb(0 0 0 / 0.1)",
      "top-heavy": "0px -4px 10px -13px rgba(0,0,0,0.75)",
      blur: "1px -1px 22px -12px rgba(247,69,69,0.75)",
      basic: "0px 0px 20px -12px rgba(0,0,0,1)",
    },
    colors: {
      bgc: "hsl(var(--bgc))",

      warning: "var(--warning)",
      "warning-foreground": "var(--warning-foreground)",

      text: "hsl(var(--text))",
      "text-foreground": "hsl(var(--text-foreground))",

      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      keyframes: (theme) => ({
        vibrate: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-1px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(1px)",
          },
        },
        fadeOut: {
          "0%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      }),
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    transition: ["checked"],
    transform: ["checked"],
    scale: ["checked"],
  },
};
export const plugins = [require("tailwindcss-animate")];

/** @type {import('tailwindcss').Config} */
export default {
  // 1. Tell Tailwind where to scan for utility classes
  content: [
    "./index.html",
    // Ensure all JS/TS/JSX/TSX files in src are scanned
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  
  // 2. Configure dark mode to switch based on the parent class (`.dark`) defined in your CSS
  darkMode: ["class"],

  theme: {
    // Standard container settings for centering and padding
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // 3. Map your CSS variables to Tailwind utility classes
      colors: {
        // Base colors (used directly in utility classes like `border-border`, `bg-background`)
        border: "var(--border)",
        input: "var(--input)",
        // 🚨 FIX: Change `ring` to use a function so it supports opacity like `outline-ring/50`
        ring: ({ opacityValue }) => {
          // If opacity is present (e.g., ring/50), use it
          if (opacityValue) {
            return `oklch(0.708 0 0 / ${opacityValue})`;
          }
          // Otherwise, return the default CSS variable (which contains the full color value)
          return "var(--ring)";
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Complex colors (with default and foreground variants)
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
      },
      // 4. Map your CSS radius variables to the Tailwind utilities (rounded-lg, rounded-md, etc.)
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      // 5. Map custom font weights
      fontWeight: {
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
      },
    },
  },
  plugins: [
    // Add other Tailwind plugins here if needed
  ],
}

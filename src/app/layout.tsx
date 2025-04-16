import type { Metadata, Viewport } from "next";
import { Inter, Lora, Merriweather } from "next/font/google";
import "./globals.css";
import "./style.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { META_THEME_COLORS } from "@/hooks/use-meta-color";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ActiveThemeProvider } from "@/context/active-theme";

const inter = Inter({ subsets: ["latin"] });

const lora = Lora({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title:
    "Mun Bangladesh - Shop for Handmade, Vintage, Custom, and Unique Gifts for Everyone",
  description:
    "Discover a world of creativity at Mun Bangladesh! Explore our curated collection of handmade, vintage, and custom gifts perfect for every occasion. Find unique treasures and support talented artisans with every purchase.",

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "antialiased bg-background overscroll-none font-sans",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          inter.className,
          lora.variable,
          merriweather.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            <TooltipProvider>{children}</TooltipProvider>
          </ActiveThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

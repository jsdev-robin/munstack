import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({
        "input[type='number']::-webkit-inner-spin-button": {
          appearance: "none",
        },
        "input[type='number']::-webkit-outer-spin-button": {
          appearance: "none",
        },
      });
      addComponents({
        ".scrollbar-none": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".reserve-scrollbar-space": {
          "overflow-y": "auto",
          "scrollbar-gutter": "stable",
          "padding-right": "16px",
          "margin-right": "-16px",
        },
        ".scrollbar": {
          height: "80vh",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          borderLeftWidth: "1px",
          borderRightWidth: "1px",
          borderBottomWidth: "1px",
          borderColor: "var(--border)",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "color-mix(in srgb, var(--muted) 50%, transparent)",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              "color-mix(in srgb, var(--muted-foreground) 30%, transparent)",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor:
              "color-mix(in srgb, var(--muted) 50%, transparent)",
          },
        },
        ".whisper-scroll": {
          scrollBehavior: "smooth",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "color-mix(in srgb, var(--muted) 50%, transparent)",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              "color-mix(in srgb, var(--muted-foreground) 30%, transparent)",
            borderRadius: "9999px",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor:
              "color-mix(in srgb, var(--muted) 50%, transparent)",
          },
        },
        ".poem": {
          height: "80vh",
          scrollBehavior: "smooth",
          whiteSpace: "nowrap",
          borderLeftWidth: "1px",
          borderBottomWidth: "1px",
          borderColor: "var(--border)",
          scrollbarColor:
            "color-mix(in srgb, var(--muted-foreground) 30%, transparent) color-mix(in srgb, var(--muted) 50%, transparent)",
        },
        ".poem-thin": {
          scrollbarWidth: "thin",
        },
        ".whisper-poem": {
          scrollBehavior: "smooth",
          scrollbarColor:
            "color-mix(in srgb, var(--muted-foreground) 30%, transparent) color-mix(in srgb, var(--muted) 50%, transparent)",
        },
        ".sticky-top": {
          position: "sticky",
          top: "0",
          backgroundColor: "var(--muted)",
          zIndex: "50",
          border: "none",

          "&::after": {
            content: '""',
            position: "absolute",
            borderBottomWidth: "1px",
            borderColor: "var(--border)",
            height: "100%",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            zIndex: "-10",
          },
        },
        ".sticky-left": {
          position: "sticky",
          left: "0",
          backgroundColor: "var(--muted)",
          zIndex: "10",
          border: "none",

          "&::after": {
            content: '""',
            position: "absolute",
            borderRightWidth: "1px",
            borderColor: "var(--border)",
            height: "100%",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            zIndex: "-10",
          },
        },
      });
      addUtilities({
        ".writing-mode-vertical-lr": {
          writingMode: "vertical-lr",
        },
        ".writing-mode-vertical-rl": {
          writingMode: "vertical-rl",
        },
      });
    }),
  ],
} satisfies Config;

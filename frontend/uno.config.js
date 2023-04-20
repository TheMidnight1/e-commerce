import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import { presetIcons } from "unocss/preset-icons";
import presetWebFonts from "unocss/preset-web-fonts";
import { presetForms } from "@julr/unocss-preset-forms";
import { colors, presetWind } from "unocss/preset-wind";

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      }
    }),
    presetForms(),
    presetWebFonts({
      provider: "google",
      fonts: {
        dancingScript: ["Dancing Script:400"]
      }
    })
  ],
  theme: {
    colors: {
      primary: colors.blue
    }
  },
  shortcuts: [[/^hw-(.*)$/, ([, c]) => `h-${c} w-${c}`]],
  safelist: ["bg-white", "bg-gray-800"]
});

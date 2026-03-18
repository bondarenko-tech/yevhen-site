import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

export default defineConfig({
  // Твой основной домен
  site: "https://yevhenbondarenko.com",

  // ЖЕЛЕЗНОЕ ПРАВИЛО ДЛЯ СЛЕШЕЙ (Исправляет дубли в Google Search Console)
  // Это заставит Astro всегда генерировать ссылки со слешем в конце
  trailingSlash: 'always',

  integrations: [
    tailwind(), 
    mdx()
  ],

  build: {
    // Формат "directory" создает структуру /page/index.html вместо /page.html
    // В паре с trailingSlash: 'always' это убивает дубликаты
    format: "directory"
  },

  // Оптимизация для скорости загрузки
  compressHTML: true,

  // Включаем поддержку новых функций (опционально, но полезно)
  experimental: {
    // Если используешь картинки через тег <Image />
  }
});
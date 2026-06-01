// Минимальная эмуляция window.navigator.userAgent для node-окружения.
// Требуется из-за того, что @infomaximum/utility инициализирует userAgent
// на module-level и падает без глобального window в node-среде.
if (typeof window === "undefined") {
  global.window = {
    navigator: {
      userAgent: "node.js",
    },
  };
}

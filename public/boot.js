// Runs before first paint so the saved language and theme never flash.
(function () {
  var root = document.documentElement
  function read(key) {
    try { return localStorage.getItem(key) } catch (e) { return null }
  }
  var query = new URLSearchParams(location.search)
  var lang = query.get('lang') === 'ar' || query.get('lang') === 'en' ? query.get('lang') : read('lang') || 'en'
  var theme = read('theme') || 'dark'
  root.dataset.lang = lang
  root.lang = lang === 'ar' ? 'ar-SA' : 'en'
  root.dir = lang === 'ar' ? 'rtl' : 'ltr'
  root.dataset.theme = theme
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('js')
    setTimeout(function () { root.classList.add('ready') }, 2500)
  }
})()

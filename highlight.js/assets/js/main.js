(function() {
  let hasLoaded = false;
  const elements = [];
  // функция highlight
  const highlight = () => {
    const items = elements.slice();
    elements.length = 0;
    items.forEach(item => {
      let lang = false;
      item.className.split(' ').forEach(item => {
        if (item.indexOf('lang-') === 0) {
          lang = item.replace('lang-', '');
        }
      })
      const result = lang ? hljs.highlight(item.textContent, { language: lang }) : hljs.highlightAuto(item.textContent);
      item.innerHTML = result.value;
    });
  }

  const loadCSSandJS = () => {
    // вставляем скрипт
    const script = document.createElement('script');
    script.src = '/assets/js/highlight.min.js';
    script.async = 1;
    document.head.appendChild(script);
    script.onload = () => {
      hasLoaded = true;
      highlight();
    }
    // вставляем стили
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/assets/css/highlight.min.css';
    document.head.appendChild(style);
  }

  const cb = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        elements.push(target);
        if (hasLoaded) {
          highlight();
        } else {
          loadCSSandJS();
        }
        observer.unobserve(target);
      }
    });
  }

  const params = {
    root: null,
    rootMargin: '0px 0px 200px 0px'
  }
  // создаем observer
  const observer = new IntersectionObserver(cb, params);
  document.querySelectorAll('.hljs').forEach(item => {
    observer.observe(item);
  });
})();

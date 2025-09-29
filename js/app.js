
(async function(){
  try {
    const res = await fetch('./config.json');
    const conf = await res.json();
    const cta = document.getElementById('assistant-cta');
    if (cta && conf.assistant_link){
      cta.href = conf.assistant_link;
      cta.textContent = conf.cta_text || cta.textContent;
    }
    const footer = document.querySelector('.credit');
    if (footer && conf.footer_signature){
      footer.textContent = conf.footer_signature;
    }
    document.title = `المنصة الإلكترونية — ${conf.brand || 'شركة التأمين العراقية العامة'}`;
  } catch(e){
    console.warn('Config load failed', e);
  }
})();

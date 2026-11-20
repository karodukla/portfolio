(function(){
  const previousFilter=window.filt;
  const grid=document.querySelector('#p-portfolio .port-grid');
  if(!grid||typeof previousFilter!=='function')return;
  const cards=[...grid.querySelectorAll(':scope > .pi')];
  function rebalance(category){
    for(const card of cards){
      card.removeAttribute('data-wide');
      card.removeAttribute('data-sole');
      card.removeAttribute('data-mobile-wide');
    }
    const shown=cards.filter(card=>category==='all'||card.dataset.cat===category);
    const count=shown.length;
    if(count===1)shown[0].dataset.sole='true';
    else if(count%3!==0){
      const tail=count%3===1?4:2;
      for(const card of shown.slice(-tail))card.dataset.wide='true';
    }
    if(count%2===1)shown[count-1].dataset.mobileWide='true';
    for(const b of document.querySelectorAll('#p-portfolio .fbtn'))b.setAttribute('aria-pressed',b.classList.contains('on')?'true':'false');
  }
  window.filt=function(category,button){
    previousFilter(category,button);
    rebalance(category);
  };
  rebalance('all');
})();

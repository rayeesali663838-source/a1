(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Weekly tip
  var TIPS=['Change into a dry pair at lunch on long hikes: dry socks are one of the simplest ways to reduce friction.',
    'Break in new shoes with the socks you plan to wear on the trail, not thin everyday ones.',
    'After river crossings, wring out socks firmly and switch to a spare pair as soon as you can.',
    'Wash performance socks inside out at a cool temperature to keep their wicking yarns working.',
    'Smooth out wrinkles under the heel and toes before lacing up; small folds can become hot spots.',
    'Keep a spare pair in a zip bag in your pack so they stay dry no matter the weather.',
    'Skip fabric softener for technical socks: it coats fibres and slows drying.',
    'Match cushion to the job: light for racing, medium for training, heavier for long days on rough ground.'];
  var d=new Date(),t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())),dn=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-dn);
  var wk=Math.ceil(((t-new Date(Date.UTC(t.getUTCFullYear(),0,1)))/864e5+1)/7),wt=document.getElementById('wtip');
  if(wt){wt.querySelector('.w b').textContent=wk;wt.querySelector('p').textContent=TIPS[wk%TIPS.length];}
  // Foot zone map
  var Z={toe:['Toe box','Seamless or hand-linked toe',['A flat seam stops rubbing across the tops of the toes','Reinforced yarns resist holes from long nails or tight shoes','Some designs add a light toe cushion for downhill trails']],
    ball:['Ball of the foot','Targeted forefoot cushioning',['Extra loops absorb impact where most runners land','Denser knit reduces friction during push-off','Moisture-moving yarns help keep this busy area drier']],
    arch:['Arch','Compression arch band',['A snug band keeps the sock from slipping or bunching','Mesh panels over the top of the foot release heat','Left/right-specific socks can follow the arch more closely']],
    heel:['Heel','Deep, cushioned heel pocket',['A Y-shaped or deep heel holds the sock in place','Padding protects against impact on descents','Reinforced yarns handle the most abrasion']],
    ankle:['Ankle &amp; Achilles','Raised heel tab or cuff',['A raised tab stops shoe collars rubbing the Achilles','Ribbed cuffs keep grit and trail debris out','Higher cuffs add protection from brush and scratches']]};
  var zb=document.querySelectorAll('[data-zone]');
  function zone(k){var z=Z[k];document.getElementById('z-name').innerHTML=z[0];document.getElementById('z-feat').textContent=z[1];document.getElementById('z-list').innerHTML=z[2].map(function(x){return '<li>'+x+'</li>';}).join('');
    zb.forEach(function(x){var on=x.dataset.zone===k;if(x.tagName==='BUTTON')x.setAttribute('aria-pressed',on?'true':'false');else x.classList.toggle('on',on);});}
  zb.forEach(function(x){x.addEventListener('click',function(){zone(x.dataset.zone);});x.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();zone(x.dataset.zone);}});});
  if(zb.length)zone('heel');
  // Terrain matcher
  var T={road:['Road &amp; track','Light to medium','Ankle or no-show','Moisture-wicking polyester blend','Look for a snug arch band and a seamless toe for smooth, fast miles.'],
    trail:['Trail','Medium','Quarter or crew','Synthetic or merino blend','A higher cuff keeps grit out; reinforced heel and toe handle rough ground.'],
    river:['River &amp; wet ground','Light','Crew','Quick-drying synthetic','Thin, fast-drying socks shed water quickly. Carry a dry spare for after crossings.'],
    snow:['Snow &amp; cold','Medium to heavy','Crew or over-calf','Merino or merino blend','Warmth when damp matters most; leave a little room in boots so circulation isn&#8217;t restricted.']};
  var tf=document.getElementById('terrain');
  function terr(){if(!tf)return;var k=tf.querySelector('[name=ter]:checked').value,tmp=tf.querySelector('[name=tmp]:checked').value,dur=tf.querySelector('[name=dur]:checked').value,x=T[k],c=x[1];
    if(dur==='long'&&k!=='river')c=c.indexOf('heavy')>-1?c:c.replace('Light to medium','Medium').replace(/^Medium$/,'Medium to heavy').replace(/^Light$/,'Light to medium');
    var fib=x[3];if(tmp==='hot'&&k!=='snow')fib='Lightweight synthetic with mesh venting';if(tmp==='cold'&&k!=='snow')fib='Merino blend for warmth';
    document.getElementById('t-name').innerHTML=x[0];document.getElementById('t-cush').textContent=c;document.getElementById('t-h').textContent=x[2];document.getElementById('t-f').textContent=fib;document.getElementById('t-tip').innerHTML=x[4]+(dur==='long'?' On long days, pack a spare pair.':'');
    document.querySelectorAll('[data-ter]').forEach(function(i){i.hidden=i.dataset.ter!==k;});}
  if(tf){tf.addEventListener('change',terr);terr();}
  // Pairs planner
  var ps=document.getElementById('ps'),pw=document.getElementById('pw');
  function plan(){if(!ps)return;var s=parseInt(ps.value,10),w=parseInt(pw.value,10);
    document.getElementById('ps-v').textContent=s+(s===1?' session':' sessions');document.getElementById('pw-v').textContent='every '+w+' days';
    var perf=Math.max(1,Math.ceil(s*w/7)+1),every=Math.ceil(w)+1,tot=perf+every;
    document.getElementById('p-n').textContent=tot;document.getElementById('p-txt').textContent='About '+every+' everyday pairs plus '+perf+' performance pairs, so you always have a clean, dry pair between washes.';
    var h='';for(var i=0;i<Math.min(tot,30);i++)h+='<i></i>';document.getElementById('p-row').innerHTML=h;}
  if(ps){ps.addEventListener('input',plan);pw.addEventListener('input',plan);plan();}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('cmr_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('cmr_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();

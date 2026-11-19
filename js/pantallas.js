/* Funciones que devuelven el HTML de cada pantalla, más draw(). */
/* ---------- Intro ---------- */
function splashHTML(){
 var name='CochaSabe'.split('').map(function(c,i){return '<span style="animation-delay:'+(1.5+i*.07)+'s">'+c+'</span>'}).join('');
 var sp='';for(var i=0;i<14;i++){sp+='<i class="spk" style="left:'+(6+i*7)+'%;bottom:'+(4+(i*37)%30)+'%;width:'+(3+i%4)+'px;height:'+(3+i%4)+'px;animation-delay:'+(1+i*.2)+'s,'+(i*.3)+'s;opacity:.5"></i>'}
 return '<div class="splash" data-a="go" data-v="login">'+sp+LOGOBIG+'<h1 class="sg">'+name+'</h1><div class="mas">'+mascotSVG(2,'saludo')+'</div><p>Lo que pasa hoy en tu barrio, lo sabemos entre todos.</p><span class="skip">Toca para saltar</span><span class="ld"></span></div>'}
/* ---------- Login / registro ---------- */
function pwTxt(){var a=S.f.pass||'',b=S.f.pass2||'';if(!b)return '';if(a.length<6)return 'La contraseña necesita al menos 6 caracteres.';return a===b?'✓ Las contraseñas coinciden.':'✗ Las contraseñas no coinciden.'}
function pwCls(){var a=S.f.pass||'',b=S.f.pass2||'';if(!b)return '';return a.length>=6&&a===b?'ok':'bad'}
function authHTML(){
 var reg=S.mode==='reg',f=S.f;
 function inp(n,ph,type){return '<input type="'+(type==='password'&&S.showPw?'text':(type||'text'))+'" data-f="'+n+'" value="'+esc(f[n]||'')+'" placeholder="'+ph+'" style="margin-bottom:8px">'}
 var h='<div class="auth"><div class="hero">'+mascotSVG(2,'saludo').replace('<svg','<svg class="m"')+'<h2 class="sg" style="margin:0">Hola, soy '+MASCOT_NAME+'</h2><p>Te ayudo a enterarte de lo que pasa hoy en Cochabamba.</p></div><div class="frm"><div class="row">'+LOGO+'<b class="sg" style="font-size:20px;flex:1">CochaSabe</b><button class="chip" data-a="theme">'+(curTheme()==='dark'?'☀️ Claro':'🌙 Oscuro')+'</button></div>';
 if(!reg){
  h+='<h2 class="sg">Iniciar sesión</h2><div class="mut" style="margin-bottom:12px">Entra con tu correo o celular.</div>'+inp('email','Correo o celular')+inp('pass','Contraseña','password')+'<a href="#" class="lnk" data-a="showpw" style="display:block;margin:-2px 0 10px">'+(S.showPw?'🙈 Ocultar':'👁 Mostrar')+' contraseña</a><button class="btn full" data-a="login"'+(S.busy?' disabled':'')+'>'+(S.busy?'Entrando…':'Entrar')+'</button><button class="btn ghost full" style="margin-top:8px" data-a="guest">Entrar como invitado</button><div class="mut" style="margin-top:12px;text-align:center">¿Primera vez? <a href="#" class="lnk" data-a="mode" data-v="reg">Crear mi perfil</a></div>'
 }else{
  h+='<h2 class="sg">Crea tu perfil</h2><div class="mut" style="margin-bottom:12px">Solo lo básico. No pedimos carnet.</div>'+inp('rname','¿Cómo te decimos?')+inp('email','Correo o celular')+inp('pass','Crea una contraseña (mínimo 6 caracteres)','password')+inp('pass2','Repite la contraseña','password')+'<div class="pwm '+pwCls()+'" id="pwm">'+pwTxt()+'</div><a href="#" class="lnk" data-a="showpw" style="display:block;margin:-4px 0 6px">'+(S.showPw?'🙈 Ocultar':'👁 Mostrar')+' contraseñas</a>'+
  '<label class="lbl">Tu zona</label><div class="opts">'+ZONAS.map(function(z){return '<button class="f '+(S.prof.zona===z?'on':'')+'" data-a="pzona" data-v="'+z+'">'+z+'</button>'}).join('')+'</div>'+
  '<label class="lbl">Qué te interesa (elige las que quieras)</label><div class="opts">'+TAGS.slice(0,12).map(function(t){return '<button class="f '+(S.prof.ints.indexOf(t)>-1?'on':'')+'" data-a="pint" data-v="'+t+'">'+t+'</button>'}).join('')+'</div>'+
  '<button class="btn full" style="margin-top:14px" data-a="regdone"'+(S.busy?' disabled':'')+'>'+(S.busy?'Creando tu perfil…':'Crear perfil y ver cómo funciona')+'</button><div class="mut" style="margin-top:12px;text-align:center">¿Ya tienes cuenta? <a href="#" class="lnk" data-a="mode" data-v="login">Iniciar sesión</a></div>'}
 return h+'</div></div>'}
/* ---------- Tutorial ---------- */
function tourHTML(){
 var s=TOUR[S.tour],last=S.tour===TOUR.length-1;
 return '<div class="tour">'+mascotSVG(S.tour<2?2:3,s.p).replace('<svg','<svg class="m"')+'<h2 class="sg">'+s.h+'</h2><p>'+s.t+'</p><div class="dots">'+TOUR.map(function(x,i){return '<i class="'+(i===S.tour?'on':'')+'"></i>'}).join('')+'</div><div class="row">'+(S.tour>0?'<button class="btn ghost" data-a="tprev">Atrás</button>':'')+'<button class="btn" data-a="tnext">'+(last?(S.fromApp?'Listo':'Empezar'):'Siguiente')+'</button></div>'+(last?'':'<button class="back" data-a="tdone">Saltar</button>')+'</div>'}
/* ---------- App ---------- */
function head(){var ttl={hoy:'Hoy',ayu:S.mod,yo:'Yo'}[S.tab],n=nUn();return '<div class="top">'+LOGO+'<b class="nm">CochaSabe</b><b class="ttl" style="flex:1">'+ttl+'</b><button class="chip bell" data-a="sheet" data-v="avis" aria-label="Avisos">🔔'+(n?'<b>'+n+'</b>':'')+'</button><button class="chip lim" data-a="sheet" data-v="mov">★ '+fmt(S.pts)+'</button></div>'}
function filtered(){var q=S.q.toLowerCase();return LETS.filter(function(l){
 var okt=!S.tags.length||l.tags.some(function(t){return S.tags.indexOf(t)>-1});
 var okq=!q||(l.t+' '+l.z+' '+l.tags.join(' ')).toLowerCase().indexOf(q)>-1;return okt&&okq})}
function cardsHTML(){var L=filtered();
 if(!L.length)return '<div class="card empty"><div style="font-size:30px">🔎</div><b>No encontramos letreros con eso</b><div class="mut" style="margin:4px 0 10px">Prueba con otra etiqueta o sube tú el primero.</div><button class="btn sec" data-a="tagclear">Quitar filtros</button></div>';
 return '<div class="grid">'+L.map(function(l){
  return '<div class="card lcard"><div class="thumb">'+(l.photo?'<img alt="Foto del letrero" src="'+l.photo+'">':l.e)+'</div><div class="bd"><div style="font-weight:600">'+esc(l.t)+'</div>'+(l.p?'<div class="price">'+esc(l.p)+'</div>':'')+'<div class="row wrapr" style="margin:4px 0">'+l.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div><div class="mut">📍 '+esc(l.z)+' · '+l.h+' · '+l.c+' confirman</div><div class="row wrapr" style="margin-top:8px"><button class="btn sec" data-a="like" data-v="'+l.id+'">👍 Me sirvió · '+(l.lk||0)+'</button><button class="btn sec" data-a="conf" data-v="'+l.id+'">Sigue vigente</button><a class="lnk" href="'+esc(mapsLink(l))+'" target="_blank" rel="noopener">Ver en Google Maps ↗</a></div></div></div>'}).join('')+'</div>'}
function tagBar(){var list=S.showAll?TAGS:TAGS.slice(0,8);
 return '<div class="filters"><button class="f '+(S.tags.length?'':'on')+'" data-a="tagclear">Todo</button>'+list.map(function(f){return '<button class="f '+(S.tags.indexOf(f)>-1?'on':'')+'" data-a="filt" data-v="'+f+'">'+f+'</button>'}).join('')+'<button class="f" data-a="tagmore">'+(S.showAll?'Menos −':'Más etiquetas +')+'</button></div>'}
function hoy(){
 return '<input type="text" class="srch" data-f="q" value="'+esc(S.q)+'" placeholder="Buscar: almuerzo, repuestos, clases..." aria-label="Buscar letreros">'+tagBar()+
 (S.tags.length?'<div class="mut" style="margin-bottom:8px">Mostrando letreros con: '+S.tags.join(' o ')+'</div>':'')+'<div id="lets">'+cardsHTML()+'</div>'+
 '<button class="btn full" style="margin-top:12px" data-a="sheet" data-v="subir">📸 Subir un letrero</button>'}
function left(q){return q.dl?q.dl-Date.now():0}
function mmss(ms){var t=Math.ceil(ms/1000);if(t>=86400)return Math.floor(t/86400)+' d '+Math.floor(t%86400/3600)+' h';var h=Math.floor(t/3600),m=Math.floor(t%3600/60),x=t%60;return (h?h+' h ':'')+(h&&m<10?'0':'')+m+':'+(x<10?'0':'')+x}
function tchip(q){if(!q.dl)return '';var l=left(q);return l>0?'<span class="tag t" data-dl="'+q.dl+'">⏱ '+mmss(l)+'</span>':'<span class="tag v">Venció</span>'}
function sortQ(a){return a.slice().sort(function(x,y){var ax=left(x)>0?1:0,ay=left(y)>0?1:0;if(ax!==ay)return ay-ax;return ax?x.dl-y.dl:0})}
setInterval(function(){var els=document.querySelectorAll('[data-dl]'),re=false;for(var i=0;i<els.length;i++){var l=+els[i].dataset.dl-Date.now();if(l<=0)re=true;else els[i].textContent='⏱ '+mmss(l)}if(re)draw()},1000);
function ayuList(){
 return '<div class="row" style="margin-bottom:10px"><button class="f '+(S.scope==='Para ti'?'on':'')+'" data-a="scope" data-v="Para ti">Para ti</button><button class="f '+(S.scope==='Global'?'on':'')+'" data-a="scope" data-v="Global">Global</button><span class="mut" style="margin-left:auto">según tus intereses</span></div>'+
 sortQ(QS.filter(function(q){return S.scope==='Global'||q.id!==4})).map(function(q){return '<div class="card" data-a="open" data-v="'+q.id+'" style="cursor:pointer;'+(S.open===q.id?'border-color:var(--lila)':'')+'"><div class="row wrapr" style="margin-bottom:6px">'+tchip(q)+((q.imp!=='Normal'&&q.imp!=='No es necesario')?'<span class="tag u">'+q.imp+'</span>':'')+q.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div><div style="font-weight:600">'+esc(q.q)+'</div><div class="mut" style="margin-top:6px">'+(q.mine?'Tu pregunta · ':'')+q.ans.length+' respuestas</div></div>'}).join('')+
 '<button class="btn full" data-a="sheet" data-v="preg">+ Preguntar</button>'}
function ayu(){
 return '<div class="split '+(S.open?'has-open':'')+'"><div class="listp">'+ayuList()+'</div><div class="detp">'+(S.open?detail(S.open):'<div class="card empty mut" style="display:none">Elige una pregunta para ver las respuestas.</div>')+'</div></div>'}
function detail(id){
 var q=QS.filter(function(x){return x.id===id})[0];
 var h='<button class="back backb" data-a="close">← Volver</button><div class="card"><div class="row wrapr" style="margin-bottom:6px">'+tchip(q)+((q.imp!=='Normal'&&q.imp!=='No es necesario')?'<span class="tag u">'+q.imp+'</span>':'')+q.tags.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div><div style="font-weight:600;font-size:16px">'+esc(q.q)+'</div></div>';
 h+=q.ans.map(function(a,i){var k=q.id+'-'+i,r=S.rated[k],c=S.ctc[k],me=a.n==='Tú',nm=a.n.split(' ')[0],act='';
  if(q.mine&&!me){
   if(r)act='<div class="mut">'+(r==='si'?'✅ Marcaste «Me sirvió». Le diste cochapuntos y fiabilidad.':'Marcaste «No me sirvió».')+'</div>';
   else{
    var ch='';
    if(!S.skip[k]){
     if(c==='ok')ch='<div class="okbox">✅ '+esc(nm)+' aceptó. Comparte su <b>celular</b>: <b>700 12 345</b> <span class="mut">(ejemplo)</span></div>';
     else if(c==='pend')ch='<div class="okbox">⏳ Solicitud enviada. Esperando que '+esc(nm)+' acepte. No verás su número hasta entonces.</div>';
     else ch='<div class="row wrapr"><button class="btn sec" data-a="ctcreq" data-k="'+k+'">🤝 Pedir contacto</button><button class="btn ghost" data-a="skip" data-k="'+k+'">Solo calificar</button></div><div class="mut" style="margin-top:6px">Nadie recibe tu número sin aceptar antes. '+esc(nm)+' decide si te escribe.</div>'}
    var rt=(c==='ok'||S.skip[k])?'<div class="row" style="margin-top:8px"><button class="btn" data-a="rate" data-k="'+k+'" data-v="si">Me sirvió</button><button class="btn ghost" data-a="rate" data-k="'+k+'" data-v="no">No me sirvió</button></div><div class="mut" style="margin-top:6px">Calificar es obligatorio: así se premia a quien ayuda de verdad.</div>':'';
    act=ch+rt}}
  return '<div class="card"><div class="row wrapr"><b>'+esc(a.n)+'</b><span class="tag">'+a.v+'</span><span class="star" style="margin-left:auto">★ '+a.star+'</span></div><div style="margin:6px 0 '+(act?'10':'0')+'px">'+esc(a.t)+'</div>'+act+'</div>'}).join('');
 if(!q.ans.length)h+='<div class="card mut">Aún nadie responde. ¡Sé el primero!</div>';
 h+='<div class="card"><label class="lbl" style="margin-top:0">Tu respuesta</label><textarea rows="3" data-f="ans" placeholder="Cuéntale lo que sabes: dónde, a qué hora, cuánto cuesta...">'+esc(S.f.ans||'')+'</textarea><button class="btn full" style="margin-top:8px" data-a="resp" data-v="'+q.id+'">Enviar respuesta</button><div class="mut" style="margin-top:6px">Solo respuestas: así quien pregunta encuentra rápido lo que sirve.</div></div>';
 return h}
function petHTML(){var n=nUn();
 return mascotSVG(2,S.pose)+'<div class="sg" style="font-size:19px"><b>'+MASCOT_NAME+'</b> · tu guía del barrio</div><div class="say">'+(n?'Tienes '+n+' aviso'+(n>1?'s':'')+' nuevo'+(n>1?'s':'')+'. ¡Míralos!':'Todo al día. ¿Subimos un letrero hoy?')+'</div>'}
function mine(){var q=QS.filter(function(x){return x.mine}),a=[];QS.forEach(function(x){x.ans.forEach(function(y){if(y.n==='Tú')a.push({q:x,a:y})})});return {q:q,a:a,l:LETS.filter(function(x){return x.mine})}}
function yo(){
 var p=S.prof,m=mine(),n=nUn();
 return '<div class="pcols"><div><div class="pet" id="pet">'+petHTML()+'</div></div><div>'+
 '<div class="card"><div class="row"><div class="thumb" style="width:52px;height:52px;font-size:24px">🙂</div><div style="flex:1;min-width:0"><b class="sg" style="font-size:17px">'+esc(p.name)+'</b><div class="mut">📍 '+esc(p.zona)+' · Perfil básico</div></div><button class="btn sec" data-a="sheet" data-v="perfil">Editar</button></div><div class="row wrapr" style="margin-top:8px">'+p.ints.map(function(t){return '<span class="tag">'+t+'</span>'}).join('')+'</div></div>'+
 '<div class="card"><div class="row"><b class="sg">Fiabilidad</b><span class="star" style="margin-left:auto">★★★★☆</span></div><div class="mut">4,3 · 12 calificaciones. Sube cuando te marcan «Me sirvió» y cuando otros confirman tus letreros. No hace falta carnet.</div></div>'+
 '<div class="hub">'+
 '<button class="h1" data-a="sheet" data-v="act"><span class="e">📒</span>Mi actividad<small>'+m.q.length+' preguntas · '+m.a.length+' respuestas · '+m.l.length+' letreros</small></button>'+
 '<button class="h2" data-a="sheet" data-v="avis"><span class="e">🔔</span>Avisos<small>Respuestas, calificaciones y contactos</small>'+(n?'<span class="nb">'+n+'</span>':'')+'</button>'+
 '<button class="h3" data-a="sheet" data-v="mov"><span class="e">🧾</span>Movimientos<small>★ '+fmt(S.pts)+' cochapuntos</small></button>'+
 '<button class="h5" data-a="sheet" data-v="set"><span class="e">⚙️</span>Ajustes<small>Tema, contacto y avisos</small></button>'+
 '<button class="h4" data-a="tut"><span class="e">📖</span>Tutorial<small>Cómo se usa</small></button>'+
 '<button class="h6" data-a="sheet" data-v="about"><span class="e">ℹ️</span>Acerca de<small>Qué es CochaSabe</small></button></div>'+
 '</div></div>'}
function shell(){
 var body=S.tab==='hoy'?hoy():S.tab==='ayu'?ayu():yo();
 var tabs=[['hoy','Hoy'],['ayu',S.mod],['yo','Yo']];
 var nav=tabs.map(function(t){return '<button class="'+(S.tab===t[0]?'on':'')+'" data-a="tab" data-v="'+t[0]+'">'+IC[t[0]]+t[1]+'</button>'}).join('');
 var side='<aside class="side"><div class="brand">'+LOGO+'<b>CochaSabe</b></div>'+tabs.map(function(t){return '<button class="nv '+(S.tab===t[0]?'on':'')+'" data-a="tab" data-v="'+t[0]+'">'+IC[t[0]]+t[1]+'</button>'}).join('')+'<div class="pm">'+mascotSVG(2,'saludo')+'<div class="sg"><b>'+MASCOT_NAME+'</b></div><div class="mut">Tu guía del barrio</div></div></aside>';
 return '<div class="shell">'+side+'<div class="col">'+head()+'<div class="main">'+body+'</div><nav class="nav">'+nav+'</nav></div></div>'}
function sheetHTML(){
 function wrap(t,inner){return '<div class="sheet" data-a="shx"><div><div class="shh"><b class="sg">'+t+'</b><button class="x" data-a="shclose" aria-label="Cerrar">✕</button></div>'+inner+'</div></div>'}
 var s=S.sheet;if(!s)return '';
 if(s==='subir'){var u=S.upl,ok=u.t.trim().length>2&&(u.photo||u.demo);
  return wrap('Subir un letrero','<div class="uplbox">'+(u.photo?'<img alt="Vista previa" src="'+u.photo+'">':u.demo?'<div style="font-size:42px">🍲</div><div class="mut">Foto de ejemplo</div>':'<div style="font-size:30px">📷</div><div class="mut">Toma o elige la foto del letrero</div>')+'<div class="row" style="justify-content:center;margin-top:8px"><label class="btn sec" style="cursor:pointer">Elegir foto<input type="file" accept="image/*" data-a="photo" hidden></label><button class="btn ghost" data-a="photodemo">Usar foto de ejemplo</button></div></div>'+
  '<label class="lbl">Título</label><input type="text" data-f="ut" value="'+esc(u.t)+'" placeholder="Ej. Almuerzo del día">'+
  '<label class="lbl">Precio (opcional)</label><input type="text" data-f="up" value="'+esc(u.p)+'" placeholder="Ej. Bs 25">'+
  '<label class="lbl">Zona</label><div class="opts">'+ZONAS.map(function(z){return '<button class="f '+(u.zona===z?'on':'')+'" data-a="zona" data-v="'+z+'">'+z+'</button>'}).join('')+'</div>'+
  '<label class="lbl">Etiquetas (hasta 3)</label><div class="opts">'+TAGS.map(function(t){return '<button class="f '+(u.tags.indexOf(t)>-1?'on':'')+'" data-a="utag" data-v="'+t+'">'+t+'</button>'}).join('')+'</div>'+
  '<label class="lbl">Ubicación: enlace de Google Maps (opcional)</label><input type="url" data-f="ul" value="'+esc(u.link)+'" placeholder="Pega aquí el enlace que compartes desde Google Maps"><div class="mut" style="margin-top:6px">En Google Maps toca «Compartir», copia el enlace y pégalo aquí. <a class="lnk" href="https://www.google.com/maps" target="_blank" rel="noopener">Abrir Google Maps ↗</a></div>'+
  '<button class="btn full" style="margin-top:12px" data-a="pub" '+(ok?'':'disabled')+'>Publicar letrero</button><div class="mut" style="margin-top:6px;text-align:center">'+(ok?'Listo para publicar':'Falta la foto y un título')+'</div>')}
 if(s==='preg'){var n=S.nQ,imps=[['No es necesario',0],['Importante',1],['Urgente',5],['Indispensable',15]];
  return wrap('Preguntar en '+S.mod,'<label class="lbl">¿Qué necesitas?</label><input type="text" data-f="nq" value="'+esc(n.que)+'" placeholder="Ej. un electricista, pan de batalla...">'+
  '<label class="lbl">Tipo</label><div class="opts">'+['Dato','Servicio','Producto'].map(function(t){return '<button class="f '+(n.tipo===t?'on':'')+'" data-a="ntipo" data-v="'+t+'">'+t+'</button>'}).join('')+'</div>'+
  '<label class="lbl">¿Para cuándo lo necesitas?</label><div class="mut" style="margin:-2px 0 6px">Es gratis: tu pregunta sale primero con un temporizador hasta que vence. Solo puedes tener una pregunta con temporizador a la vez.</div><div class="opts">'+['1 hora','1 día','1 semana','Sin apuro'].map(function(t){return '<button class="f '+(n.cuando===t?'on':'')+'" data-a="ncuando" data-v="'+t+'">'+t+'</button>'}).join('')+'</div>'+
  '<label class="lbl">Destacar la pregunta (cuesta cochapuntos)</label><div class="opts">'+imps.map(function(t){return '<button class="f '+(n.imp===t[1]?'on':'')+'" data-a="nimp" data-v="'+t[1]+'">'+t[0]+' · '+t[1]+'</button>'}).join('')+'</div>'+
  '<button class="btn full" style="margin-top:14px" data-a="npub">Publicar pregunta</button>')}
 if(s==='mov')return wrap('Movimientos','<div class="row" style="margin-bottom:8px"><span class="mut" style="flex:1">Tus cochapuntos</span><span class="chip lim">★ '+fmt(S.pts)+'</span></div><div class="mut" style="margin-bottom:6px">Sirven para destacar tus preguntas. Sin dinero real.</div><div class="card" style="margin:8px 0"><b>Canje</b><div class="bar" style="margin:8px 0"><i style="width:'+Math.min(100,S.pts)+'%"></i></div><div class="mut">'+(S.pts>=100?'Ya puedes canjear. ':'Te faltan '+fmt(100-S.pts)+' cochapuntos. ')+'Desde 100 podrás canjearlos con Stellar (en desarrollo).</div></div>'+S.mov.map(function(m){return '<div class="row" style="padding:8px 0;border-top:1px solid var(--line)"><span style="flex:1">'+esc(m[0])+'</span><b style="color:'+(m[1]<0?'var(--warn)':'var(--ok)')+'">'+(m[1]>0?'+':'')+fmt(m[1])+'</b></div>'}).join(''));
 if(s==='avis'){var un=nUn();
  return wrap('Avisos'+(un?' · '+un+' nuevos':''),(NT.length?NT.map(function(x){
   var ic={resp:'💬',cal:'👍',ctc:'🤝',conf:'📍'}[x.k],ex='';
   if(x.k==='ctc'){ex=x.st==='ok'?'<div class="mut" style="margin-top:4px">✅ Aceptaste. Andrea verá tu '+S.set.share.toLowerCase()+'.</div>':x.st==='no'?'<div class="mut" style="margin-top:4px">Dijiste «Ahora no». No se compartió nada.</div>':'<div class="row" style="margin-top:6px"><button class="btn" data-a="ctcok" data-v="'+x.id+'">Aceptar</button><button class="btn ghost" data-a="ctcno" data-v="'+x.id+'">Ahora no</button></div><div class="mut" style="margin-top:4px">Si aceptas, solo verá tu '+S.set.share.toLowerCase()+'. Puedes cambiarlo en Ajustes.</div>'}
   return '<div class="nt '+(x.r?'':'un')+'" data-a="ntgo" data-v="'+x.id+'"><span class="e">'+ic+'</span><div style="flex:1;min-width:0"><div>'+esc(x.t)+'</div><div class="mut">'+x.w+'</div>'+ex+'</div></div>'}).join(''):'<div class="empty mut">Sin avisos por ahora.</div>')+'<button class="btn sec full" style="margin-top:10px" data-a="allread">Marcar todo como leído</button>')}
 if(s==='act'){var m=mine(),T=S.actTab,list='';
  if(T==='preg')list=m.q.length?m.q.map(function(x){return '<div class="srow" data-a="actopen" data-v="'+x.id+'" style="cursor:pointer"><span style="font-size:20px">❓</span><div style="flex:1;min-width:0"><div>'+esc(x.q)+'</div><div class="mut">'+x.ans.length+' respuestas · toca para verlas</div></div></div>'}).join(''):'<div class="empty mut">Aún no preguntas nada.</div>';
  if(T==='resp')list=m.a.length?m.a.map(function(x){return '<div class="srow" data-a="actopen" data-v="'+x.q.id+'" style="cursor:pointer"><span style="font-size:20px">💬</span><div style="flex:1;min-width:0"><div class="mut">En «'+esc(x.q.q)+'»</div><div>'+esc(x.a.t)+'</div></div></div>'}).join(''):'<div class="empty mut">Aún no respondes nada.</div>';
  if(T==='let')list=m.l.length?m.l.map(function(x){return '<div class="srow"><span style="font-size:20px">'+x.e+'</span><div style="flex:1;min-width:0"><div>'+esc(x.t)+'</div><div class="mut">📍 '+esc(x.z)+' · '+x.h+' · '+x.c+' confirman</div></div></div>'}).join(''):'<div class="empty mut">Aún no subes letreros.</div>';
  return wrap('Mi actividad','<div class="stats"><div><b>'+m.q.length+'</b><span>Preguntas</span></div><div><b>'+m.a.length+'</b><span>Respuestas</span></div><div><b>'+m.l.length+'</b><span>Letreros</span></div><div><b>3</b><span>Me sirvió</span></div></div><div class="seg">'+[['preg','Mis preguntas'],['resp','Mis respuestas'],['let','Mis letreros']].map(function(t){return '<button class="f '+(T===t[0]?'on':'')+'" data-a="actab" data-v="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div>'+list)}
 if(s==='set'){var dk=curTheme()==='dark';
  function sw(k,tx){return '<div class="srow"><span style="flex:1">'+tx+'</span><button class="sw '+(S.set[k]?'on':'')+'" data-a="tgl" data-v="'+k+'" aria-label="'+tx+'"></button></div>'}
  return wrap('Ajustes','<label class="lbl" style="margin-top:0">Apariencia</label><div class="opts"><button class="f '+(dk?'':'on')+'" data-a="setheme" data-v="light">☀️ Claro</button><button class="f '+(dk?'on':'')+'" data-a="setheme" data-v="dark">🌙 Oscuro</button></div>'+
   '<label class="lbl">Si acepto un contacto, comparto mi…</label><div class="opts"><button class="f '+(S.set.share==='Celular'?'on':'')+'" data-a="share" data-v="Celular">📱 Celular</button><button class="f '+(S.set.share==='Correo'?'on':'')+'" data-a="share" data-v="Correo">✉️ Correo</button></div><div class="mut" style="margin-top:6px">Nunca se muestra solo. Siempre te preguntamos antes.</div>'+
   '<label class="lbl">Avisarme cuando…</label>'+sw('nResp','Me responden')+sw('nCal','Me califican')+sw('nCtc','Piden contactarme')+
   '<label class="lbl">Cuenta</label><div class="row wrapr"><button class="btn sec" data-a="sheet" data-v="perfil">Editar perfil</button><button class="btn ghost" data-a="intro">Ver intro</button><button class="btn ghost" data-a="logout">Cerrar sesión</button></div>')}
 if(s==='perfil'){var p=S.prof;return wrap('Editar perfil','<label class="lbl">Nombre</label><input type="text" data-f="pn" value="'+esc(p.name)+'"><label class="lbl">Zona</label><div class="opts">'+ZONAS.map(function(z){return '<button class="f '+(p.zona===z?'on':'')+'" data-a="pzona" data-v="'+z+'">'+z+'</button>'}).join('')+'</div><label class="lbl">Intereses</label><div class="opts">'+TAGS.map(function(t){return '<button class="f '+(p.ints.indexOf(t)>-1?'on':'')+'" data-a="pint" data-v="'+t+'">'+t+'</button>'}).join('')+'</div><button class="btn full" style="margin-top:14px" data-a="shclose">Guardar</button>')}
 if(s==='about')return wrap('Acerca de CochaSabe','<p style="margin:0 0 8px"><b>CochaSabe</b> es el lugar donde Cochabamba se cuenta lo que pasa hoy: letreros con precios y ofertas, y preguntas que los vecinos responden.</p><p class="mut" style="margin:0 0 8px">Los cochapuntos se ganan ayudando y se usan dentro de la app. No son dinero.</p><p class="mut" style="margin:0 0 12px">Prototipo del equipo CodeBambinos para la hackathon de Stellar. Todo lo que ves es simulado.</p><div class="row wrapr"><button class="btn sec" data-a="tut">Ver tutorial</button><button class="btn ghost" data-a="intro">Ver animación de inicio</button></div>');
 return ''}
function draw(){
 var app=document.getElementById('app');app.className='app '+S.view;
 var sc=app.querySelector('.main'),y=sc?sc.scrollTop:0,sh=app.querySelector('.sheet>div'),y2=sh?sh.scrollTop:0;
 var inner=S.stage==='splash'?splashHTML():S.stage==='login'?authHTML():S.stage==='tour'?tourHTML():shell()+sheetHTML();
 app.innerHTML=(S.toast?'<div class="toast">'+S.toast+'</div>':'')+inner;
 var m=app.querySelector('.main');if(m)m.scrollTop=y;var s2=app.querySelector('.sheet>div');if(s2)s2.scrollTop=y2}
function drawDemo(){document.getElementById('demo').innerHTML='<span>Vista:</span><button class="f '+(S.view==='web'?'on':'')+'" data-a="view" data-v="web">💻 Computador</button><button class="f '+(S.view==='phone'?'on':'')+'" data-a="view" data-v="phone">📱 Celular</button><span style="margin-left:10px">Nombre del módulo:</span><select data-a="mod" aria-label="Nombre del módulo">'+MODS.map(function(m){return '<option'+(m===S.mod?' selected':'')+'>'+m+'</option>'}).join('')+'</select><button class="f" data-a="intro">↻ Ver intro</button>'}
var introT;
/* Después de la intro: si ya hay sesión, directo a la app; si no, al inicio de sesión. */
function afterSplash(v){return v==='login'&&S.user?'app':v}
function startIntro(){S.stage='splash';draw();clearTimeout(introT);introT=setTimeout(function(){if(S.stage==='splash'){S.stage=afterSplash('login');draw()}},6200)}
function toggle(arr,v,max){var i=arr.indexOf(v);if(i>-1)arr.splice(i,1);else if(!max||arr.length<max)arr.push(v)}

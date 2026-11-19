/* Delegación de eventos: data-a (acción), data-v (valor), data-f (campo). */
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-a]');if(!t)return;var a=t.dataset.a,v=t.dataset.v;
 if(t.tagName==='A'&&t.hasAttribute('href')&&t.getAttribute('href')!=='#')return;
 if(t.tagName==='A')e.preventDefault();
 if(t.tagName==='SELECT'||a==='photo')return;
 if(a==='shx'){if(e.target!==t)return;S.sheet=null;return draw()}
 if(a==='shclose'){S.sheet=null;return draw()}
 if(a==='go'){clearTimeout(introT);S.stage=afterSplash(v);return draw()}
 if(a==='intro'){S.sheet=null;return startIntro()}
 if(a==='view'){S.view=v;drawDemo();return draw()}
 if(a==='theme')return toggleTheme();
 if(a==='mode'){S.mode=v;return draw()}
 if(a==='login'){
   var em=(S.f.email||'').trim();if(!em)return toast('Escribe tu correo o celular.');
   if(!authOn()){S.stage='app';return draw()} /* modo demo, sin Supabase */
   /* Pendiente (PO): entrar con celular. Supabase lo permite, pero necesita un proveedor de SMS. */
   if(!isEmail(em))return toast('Por ahora solo se entra con correo. El celular llega pronto.');
   if(!S.f.pass)return toast('Escribe tu contraseña.');
   if(S.busy)return;S.busy=true;draw();
   authLogin(em,S.f.pass).then(function(){S.busy=false;S.f={};S.stage='app';draw()},function(err){S.busy=false;toast(authMsg(err))});
   return}
 if(a==='guest'){S.stage='app';return draw()}
 if(a==='showpw'){S.showPw=!S.showPw;return draw()}
 if(a==='regdone'){if(!(S.f.rname||'').trim())return toast('Dinos cómo te llamamos.');if(!(S.f.email||'').trim())return toast('Escribe tu correo o celular.');if((S.f.pass||'').length<6)return toast('La contraseña necesita al menos 6 caracteres.');if(S.f.pass!==S.f.pass2)return toast('Las contraseñas no coinciden. Revísalas.');
   S.prof.name=S.f.rname.trim();
   var goTour=function(){S.tour=0;S.fromApp=false;S.stage='tour';draw()};
   if(!authOn())return goTour(); /* modo demo, sin Supabase */
   var rem=S.f.email.trim();
   if(!isEmail(rem))return toast('Por ahora el perfil se crea con correo. El celular llega pronto.');
   if(S.busy)return;S.busy=true;draw();
   authRegister(rem,S.f.pass,S.prof).then(function(d){
     S.busy=false;
     if(!d.session){S.f={email:rem};S.mode='login';S.stage='login';return toast('Te enviamos un correo para confirmar tu perfil. Después, inicia sesión.')}
     S.f={};
     /* Pendiente (tarea D4, nivel 1): crear y fondear aquí la cuenta Stellar de prueba. */
     goTour()},function(err){S.busy=false;toast(authMsg(err))});
   return}
 if(a==='tnext'){if(S.tour<TOUR.length-1){S.tour++;return draw()}S.stage='app';return draw()}
 if(a==='tprev'){S.tour--;return draw()}
 if(a==='tdone'){S.stage='app';return draw()}
 if(a==='tut'){S.sheet=null;S.tour=0;S.fromApp=true;S.stage='tour';return draw()}
 if(a==='logout'){S.sheet=null;authLogout();S.stage='login';S.mode='login';S.f={};return draw()}
 if(a==='tab'){S.tab=v;S.open=null;return draw()}
 if(a==='pose'){S.pose=v;return draw()}
 if(a==='filt'){toggle(S.tags,v);return draw()}
 if(a==='tagclear'){S.tags=[];S.q='';return draw()}
 if(a==='tagmore'){S.showAll=!S.showAll;return draw()}
 if(a==='scope'){S.scope=v;return draw()}
 if(a==='like'){var L=LETS.filter(function(x){return x.id==v})[0];if(S.liked[v])return toast('Ya marcaste este letrero.');S.liked[v]=1;L.lk=(L.lk||0)+1;return toast(L.mine?'Te gusta tu propio letrero: no suma puntos.':'Gracias. Quien lo subió gana 1 cochapunto.')}
 if(a==='conf'){return actionDone('Gracias por confirmar',1)}
 if(a==='sheet'){S.sheet=v;if(v==='subir')S.upl={t:'',p:'',link:'',tags:[],zona:S.prof.zona,photo:null,demo:false};return draw()}
 if(a==='zona'){S.upl.zona=v;return draw()}
 if(a==='pzona'){S.prof.zona=v;return draw()}
 if(a==='pint'){toggle(S.prof.ints,v);return draw()}
 if(a==='utag'){toggle(S.upl.tags,v,3);return draw()}
 if(a==='photodemo'){S.upl.demo=true;S.upl.photo=null;return draw()}
 if(a==='pub'){var u=S.upl;var link=okLink((u.link||'').trim())?u.link.trim():'';LETS.unshift({id:Date.now(),t:u.t.trim(),p:u.p.trim(),z:u.zona,h:'ahora',c:1,tags:u.tags.length?u.tags.slice():['Servicios'],e:'🪧',photo:u.photo,link:link,mine:true});S.sheet=null;S.tags=[];S.q='';S.tab='hoy';return actionDone('Letrero publicado en '+u.zona,1)}
 if(a==='open'){S.open=parseInt(v);return draw()}
 if(a==='close'){S.open=null;return draw()}
 if(a==='ctcreq'){var kk=t.dataset.k;S.ctc[kk]='pend';toast('Solicitud enviada. Esperamos a que la otra persona acepte.');setTimeout(function(){S.ctc[kk]='ok';toast('🤝 Aceptó tu solicitud de contacto')},3800);return}
 if(a==='skip'){S.skip[t.dataset.k]=true;return draw()}
 if(a==='ntgo'){var nt=NT.filter(function(x){return x.id==v})[0];if(!nt)return;nt.r=1;if(nt.k==='resp'||nt.k==='cal'){S.sheet=null;S.tab='ayu';S.open=nt.q}return draw()}
 if(a==='ctcok'){var n1=NT.filter(function(x){return x.id==v})[0];n1.st='ok';n1.r=1;return toast('Aceptaste. Solo verán tu '+S.set.share.toLowerCase()+'.')}
 if(a==='ctcno'){var n2=NT.filter(function(x){return x.id==v})[0];n2.st='no';n2.r=1;return toast('Listo, no se comparte nada.')}
 if(a==='allread'){NT.forEach(function(x){x.r=1});return draw()}
 if(a==='actab'){S.actTab=v;return draw()}
 if(a==='actopen'){S.sheet=null;S.tab='ayu';S.open=parseInt(v);return draw()}
 if(a==='tgl'){S.set[v]=!S.set[v];return draw()}
 if(a==='share'){S.set.share=v;return draw()}
 if(a==='setheme'){document.documentElement.setAttribute('data-theme',v);draw();return drawDemo()}
 if(a==='rate'){S.rated[t.dataset.k]=v;var rq=QS.filter(function(x){return x.id===parseInt(t.dataset.k)})[0];if(rq&&v==='si')rq.dl=0;if(v==='si'){addPts(1,'Calificaste una respuesta');S.pose='pulgar';setTimeout(function(){S.pose='saludo';draw()},2500)}return toast(v==='si'?'Gracias. Quien te ayudó gana cochapuntos y fiabilidad.':'Calificación enviada.')}
 if(a==='resp'){var tx=(S.f.ans||'').trim();if(!tx)return toast('Escribe algo primero.');var q=QS.filter(function(x){return x.id===parseInt(v)})[0];q.ans.push({n:'Tú',v:'Buen vecino',k:'Respuesta',t:tx,star:4.3});S.f.ans='';
   if(!q.mine){actionDone('Respuesta enviada',0);setTimeout(function(){addPts(5,'Te marcaron «Me sirvió»');if(S.set.nCal)NT.unshift({id:Date.now(),k:'cal',t:'Alguien marcó «Me sirvió» en tu respuesta. +5 cochapuntos',w:'ahora',r:0,q:q.id});toast('🔔 ¡Te marcaron «Me sirvió»! +5 cochapuntos')},3600);return}
   return toast('Respuesta enviada.')}
 if(a==='ntipo'){S.nQ.tipo=v;return draw()}
 if(a==='ncuando'){S.nQ.cuando=v;return draw()}
 if(a==='nimp'){S.nQ.imp=parseInt(v);return draw()}
 if(a==='npub'){var n=S.nQ;var DL={'1 hora':3600000,'1 día':86400000,'1 semana':604800000}[n.cuando]||0;if(DL&&QS.some(function(x){return x.mine&&left(x)>0}))return toast('Ya tienes una pregunta con temporizador activo. Cuando venza o te ayuden, puedes hacer otra.');if(!n.que.trim())return toast('Cuéntanos qué necesitas.');if(n.imp>S.pts)return toast('No te alcanzan los cochapuntos para esa importancia.');
   var nm=['No es necesario','Importante','Urgente','Indispensable'][[0,1,5,15].indexOf(n.imp)];if(n.imp)addPts(-n.imp,'Pregunta '+nm);var nid=Date.now();QS.unshift({id:nid,mine:true,dl:DL?Date.now()+DL:0,q:'¿'+n.que.trim().replace(/^¿|\?$/g,'')+'?',tags:[n.tipo,n.cuando],imp:nm,cost:n.imp,ans:[]});S.nQ={que:'',tipo:'Dato',cuando:'Sin apuro',imp:0};S.sheet=null;S.tab='ayu';setTimeout(function(){var qq=QS.filter(function(x){return x.id===nid})[0];if(!qq)return;qq.ans.push({n:'Marcela V.',v:'De confianza',k:'Respuesta',t:'Yo te puedo ayudar. Pídeme contacto y coordinamos.',star:4.7});if(S.set.nResp)NT.unshift({id:Date.now(),k:'resp',t:'Marcela V. respondió tu pregunta «'+qq.q+'»',w:'ahora',r:0,q:nid});toast('🔔 Marcela V. respondió tu pregunta')},5000);return toast('Pregunta publicada'+(n.imp?' · -'+n.imp+' cochapuntos':''))}
});
document.addEventListener('input',function(e){
 var t=e.target;
  var f=t.dataset.f;if(!f)return;
 if(f==='q'){S.q=t.value;var el=document.getElementById('lets');if(el)el.innerHTML=cardsHTML();return}
 if(f==='ut')S.upl.t=t.value;else if(f==='up')S.upl.p=t.value;else if(f==='ul')S.upl.link=t.value;
 else if(f==='nq')S.nQ.que=t.value;else if(f==='pn'){S.prof.name=t.value||'Vecino'}
 else S.f[f]=t.value;
 if(f==='pass'||f==='pass2'){var pw=document.getElementById('pwm');if(pw){pw.textContent=pwTxt();pw.className='pwm '+pwCls()}}
 if(f==='ut'){var b=document.querySelector('[data-a=pub]');if(b){var ok=S.upl.t.trim().length>2&&(S.upl.photo||S.upl.demo);b.disabled=!ok}}
});
document.addEventListener('change',function(e){
 var t=e.target;
 if(t.dataset.a==='mod'){S.mod=t.value;return draw()}
 if(t.dataset.a==='photo'&&t.files&&t.files[0]){var r=new FileReader();r.onload=function(){S.upl.photo=r.result;S.upl.demo=false;draw()};r.readAsDataURL(t.files[0])}
});

/* Arranque: recupera la sesión de Supabase mientras corre la intro. */
authRestore();drawDemo();startIntro();

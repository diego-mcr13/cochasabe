/* Estado global S y utilidades que lo modifican. */
var S={stage:'splash',mode:'login',view:'web',tab:'hoy',tags:[],q:'',showAll:false,scope:'Para ti',pts:12,open:null,sheet:null,toast:null,pose:'saludo',showPw:false,
 upl:{t:'',p:'',link:'',tags:[],zona:'Cala Cala',photo:null,demo:false},nQ:{que:'',tipo:'Dato',cuando:'Sin apuro',imp:0},ctc:{},skip:{},rated:{},liked:{},tour:0,fromApp:false,f:{},actTab:'preg',
 set:{share:'Celular',nResp:true,nCal:true,nCtc:true},
 prof:{name:'Vecino',zona:'Cala Cala',ints:['Comida','Servicios']},mod:'¿Alguien sabe?',
 mov:[['Bienvenida',5],['Letrero confirmado',1]],
 user:null,busy:false /* user: sesión de Supabase ({id,email}); busy: hay una petición en curso */};
function nUn(){return NT.filter(function(x){return !x.r}).length}
function fmt(n){return (Math.round(n*10)/10).toString().replace('.',',')}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function curTheme(){var a=document.documentElement.getAttribute('data-theme');return a||(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function toggleTheme(){document.documentElement.setAttribute('data-theme',curTheme()==='dark'?'light':'dark');draw();drawDemo()}
function toast(m){S.toast=m;draw();clearTimeout(toast.t);toast.t=setTimeout(function(){S.toast=null;draw()},2800)}
function addPts(n,why){S.pts+=n;S.mov.unshift([why,n])}
function mapsLink(l){if(l.link)return l.link;return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(l.t+' '+l.z+' Cochabamba')}
function okLink(u){return /^https:\/\/\S+$/.test(u)}
function actionDone(msg,pts){if(pts)addPts(pts,msg);toast(msg+(pts?' · +'+pts+' cochapuntos.':'.'))}

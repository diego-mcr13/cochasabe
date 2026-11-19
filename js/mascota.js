/* Tilcho, la mascota: mascotSVG(etapa 0-6, pose). Sale del prototipo v9 sin cambios. */
/* Mascota de CochaSabe: gato Tilcayo (nombre de trabajo: Tilcho). Basada en la imagen de inspiración: pelaje dorado con manchas negras. Uso: mascotSVG(etapa 0-6, pose 'saludo'|'celebra'|'dormido') */
var MASCOT_NAME = 'Tilcho';
var MASCOT_STAGES = [
  { d: 1,   t: 'Cachorro',        n: 'Parado y sin ropa, con un bigotito apenas dibujado' },
  { d: 3,   t: 'Bigote en camino', n: 'Le crece el bigote' },
  { d: 7,   t: 'Chaleco cochabambino', n: 'Estrena su chaleco negro' },
  { d: 30,  t: 'Bigote de cantante', n: 'Bigote completo estilo Freddie Mercury' },
  { d: 90,  t: 'Sombrerito cochabambino', n: 'Sombrero blanco de la chola cochabambina' },
  { d: 180, t: 'Con el Cristo',   n: 'Aparece el Cristo de la Concordia de fondo y estrena zapatillas lila' },
  { d: 365, t: 'Racha de oro',    n: 'Capa dorada con la estrella limón' }
];
/* Poses y cuándo usarlas en la app */
var MASCOT_POSES = [
  { id: 'saludo',    t: 'Saludo',        uso: 'Al abrir la app y en el perfil' },
  { id: 'celebra',   t: 'Celebra',       uso: 'Ganaste cochapuntos o completaste las misiones' },
  { id: 'dormido',   t: 'Dormido',       uso: 'Fuera de horario o sin novedades' },
  { id: 'pensando',  t: 'Pensando',      uso: 'Mientras escribes una pregunta' },
  { id: 'buscando',  t: 'Buscando',      uso: 'Cargando resultados o sin respuestas todavía' },
  { id: 'pulgar',    t: 'Pulgar arriba', uso: 'Marcaste «Me sirvió» o confirmaste un letrero' },
  { id: 'triste',    t: 'Te extraño',    uso: 'Estás por perder la racha: «¡Tilcho te extraña!»' },
  { id: 'sorpresa',  t: 'Sorpresa',      uso: 'Subiste de nivel o hay algo nuevo cerca' },
  { id: 'senalando', t: 'Señalando',     uso: 'Marca un lugar en el mapa o explica un paso' }
];
var MASCOT_CSS = '' +
  '.mc-bob{animation:mcbob 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}' +
  '.mc-tail{animation:mctail 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:0% 100%}' +
  '.mc-blink{animation:mcblink 4.2s infinite;transform-box:fill-box;transform-origin:50% 50%}' +
  '.mc-must{animation:mcmust 3s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0%}' +
  '.mc-wave{animation:mcwave 1s ease-in-out infinite;transform-box:fill-box;transform-origin:0% 100%}' +
  '.mc-jump{animation:mcjump .8s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}' +
  '.mc-z{animation:mcz 2.4s ease-in infinite;opacity:0}' +
  '.mc-sp{animation:mcsp 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}' +
  '.mc-glow{animation:mcglow 4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}' +
  '@keyframes mcbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}' +
  '@keyframes mctail{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(8deg)}}' +
  '@keyframes mcblink{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}' +
  '@keyframes mcmust{0%,100%{transform:rotate(0)}50%{transform:rotate(-1.5deg)}}' +
  '@keyframes mcwave{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(10deg)}}' +
  '@keyframes mcjump{0%,100%{transform:translateY(0)}45%{transform:translateY(-14px)}}' +
  '@keyframes mcz{0%{opacity:0;transform:translate(0,0)}30%{opacity:1}100%{opacity:0;transform:translate(10px,-22px)}}' +
  '@keyframes mcsp{0%,100%{transform:scale(.6);opacity:.5}50%{transform:scale(1.15);opacity:1}}' +
  '@keyframes mcglow{0%,100%{transform:scale(.96);opacity:.7}50%{transform:scale(1.05);opacity:1}}' +
  '@media (prefers-reduced-motion:reduce){.mc-bob,.mc-tail,.mc-blink,.mc-must,.mc-wave,.mc-jump,.mc-z,.mc-sp,.mc-glow{animation:none}}';

function mascotSVG(stage, pose, label) {
  stage = Math.max(0, Math.min(6, stage | 0));
  pose = pose || 'saludo';
  var FUR = '#E9A93F', FURD = '#C98A2B', CREAM = '#F6E3B8', BROWN = '#B5714A', BLK = '#1B1A20', INK = '#16151A', MUST = '#2B1B10', NOSE = '#C9707A';
  var s = '';
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" role="img" aria-label="' + (label || ('Mascota ' + MASCOT_NAME)) + '">';

  /* fondo del Cristo de la Concordia (etapa 5 en adelante) */
  if (stage >= 5) {
    s += '<g class="mc-glow"><circle cx="120" cy="150" r="104" fill="#8B5CFF" opacity=".16"/></g>';
    s += '<path d="M0 300 L0 262 Q60 232 120 246 Q180 232 240 258 L240 300 Z" fill="#6D3BEA" opacity=".35"/>';
    s += '<g transform="translate(68 104) scale(.86)" fill="#FFFFFF" stroke="#A58BFF" stroke-width="2" stroke-linejoin="round">' +
         '<path d="M-24 160 L-16 128 H16 L24 160 Z"/>' +
         '<path d="M-11 128 L-8 46 H8 L11 128 Z"/>' +
         '<path d="M-50 58 L-8 44 V58 L-46 68 Z"/><path d="M50 58 L8 44 V58 L46 68 Z"/>' +
         '<circle cx="0" cy="33" r="10"/></g>';
  }

  var jump = pose === 'celebra' ? ' mc-jump' : '';
  s += '<ellipse cx="120" cy="288" rx="52" ry="7" fill="#16151A" opacity=".14"/>';
  s += '<g class="mc-bob' + jump + '">';
  /* capa */
  if (stage >= 6) s += '<path d="M86 152 Q46 210 56 266 Q120 284 184 266 Q194 210 154 152 Z" fill="#F2B705"/><path d="M86 152 Q60 200 66 250" stroke="#D99A00" stroke-width="3" fill="none"/>';
  /* cola con anillos negros y punta negra */
  s += '<g class="mc-tail"><path d="M158 240 Q216 244 206 178 Q202 152 182 150" stroke="' + FUR + '" stroke-width="17" stroke-linecap="round" fill="none"/>' +
       '<path d="M158 240 Q216 244 206 178 Q202 152 182 150" stroke="' + BLK + '" stroke-width="17" stroke-linecap="butt" stroke-dasharray="7 13" fill="none"/>' +
       '<circle cx="182" cy="150" r="8.5" fill="' + BLK + '"/></g>';
  /* piernas con manchas */
  s += '<rect x="88" y="238" width="22" height="38" rx="11" fill="' + FUR + '"/><rect x="130" y="238" width="22" height="38" rx="11" fill="' + FUR + '"/>';
  s += '<ellipse cx="96" cy="250" rx="3.6" ry="5" fill="' + BLK + '"/><ellipse cx="104" cy="262" rx="3" ry="4" fill="' + BLK + '"/><ellipse cx="144" cy="250" rx="3.6" ry="5" fill="' + BLK + '"/><ellipse cx="136" cy="262" rx="3" ry="4" fill="' + BLK + '"/>';
  s += '<ellipse cx="98" cy="276" rx="19" ry="10" fill="' + CREAM + '"/><ellipse cx="142" cy="276" rx="19" ry="10" fill="' + CREAM + '"/>';
  s += '<path d="M90 278 v4 M98 279 v4 M106 278 v4 M134 278 v4 M142 279 v4 M150 278 v4" stroke="' + FURD + '" stroke-width="1.6" stroke-linecap="round"/>';
  if (stage >= 5) {
    s += '<path d="M78 276 Q78 262 98 262 Q120 262 120 276 Q120 286 98 286 Q78 286 78 276Z" fill="#8B5CFF"/><path d="M78 280 H120" stroke="#fff" stroke-width="3"/><path d="M92 266 H106" stroke="#C6F432" stroke-width="3" stroke-linecap="round"/>';
    s += '<path d="M120 276 Q120 262 142 262 Q162 262 162 276 Q162 286 142 286 Q120 286 120 276Z" fill="#8B5CFF"/><path d="M120 280 H162" stroke="#fff" stroke-width="3"/><path d="M134 266 H148" stroke="#C6F432" stroke-width="3" stroke-linecap="round"/>';
  }
  /* brazos */
  var A = {
    saludo:   { L: 'M82 182 Q68 206 76 230', R: 'M158 180 Q192 164 194 128', H: [76, 232, 194, 126] },
    celebra:  { L: 'M82 180 Q50 166 46 128', R: 'M158 180 Q190 166 194 128', H: [46, 126, 194, 126] },
    dormido:  { L: 'M82 182 Q70 206 80 230', R: 'M158 182 Q170 206 160 230', H: [80, 230, 160, 230] },
    pensando: { L: 'M82 182 Q68 206 76 230', R: 'M158 182 Q184 170 148 140', H: [76, 232, 146, 138] },
    buscando: { L: 'M82 182 Q68 206 76 230', R: 'M158 182 Q190 176 192 146', H: [76, 232, 192, 144] },
    pulgar:   { L: 'M82 182 Q68 206 76 230', R: 'M158 182 Q188 180 190 152', H: [76, 232, 190, 150] },
    triste:   { L: 'M82 182 Q70 208 80 232', R: 'M158 182 Q170 208 160 232', H: [80, 232, 160, 232] },
    sorpresa: { L: 'M82 182 Q58 172 54 142', R: 'M158 182 Q182 172 186 142', H: [54, 140, 186, 140] },
    senalando:{ L: 'M82 182 Q68 206 76 230', R: 'M158 184 Q190 188 208 176', H: [76, 232, 210, 176] }
  };
  var P = A[pose] || A.saludo, L = P.L, R = P.R, H = P.H;
  s += '<path d="' + L + '" stroke="' + FUR + '" stroke-width="17" stroke-linecap="round" fill="none"/>';
  var rcls = pose === 'saludo' ? ' class="mc-wave"' : '';
  s += '<g' + rcls + '><path d="' + R + '" stroke="' + FUR + '" stroke-width="17" stroke-linecap="round" fill="none"/></g>';
  /* cuerpo */
  s += '<ellipse cx="120" cy="204" rx="46" ry="58" fill="' + FUR + '"/><ellipse cx="120" cy="214" rx="26" ry="40" fill="' + CREAM + '"/>';
  s += '<ellipse cx="84" cy="198" rx="5" ry="7.5" fill="' + BLK + '" transform="rotate(-15 84 198)"/><ellipse cx="80" cy="222" rx="6" ry="5" fill="' + BLK + '"/><ellipse cx="90" cy="236" rx="4.5" ry="5" fill="' + BLK + '"/><ellipse cx="156" cy="198" rx="5" ry="7.5" fill="' + BLK + '" transform="rotate(15 156 198)"/><ellipse cx="160" cy="222" rx="6" ry="5" fill="' + BLK + '"/><ellipse cx="150" cy="236" rx="4.5" ry="5" fill="' + BLK + '"/>';
  s += '<path d="M104 176 q16 6 32 0" stroke="' + BLK + '" stroke-width="5" fill="none" stroke-linecap="round"/>';
  /* chaleco negro */
  if (stage >= 2) {
    s += '<path d="M76 174 Q92 162 110 168 L121 214 L115 242 Q92 248 72 238 Z" fill="#1B1A20"/>';
    s += '<path d="M164 174 Q148 162 130 168 L119 214 L125 242 Q148 248 168 238 Z" fill="#1B1A20"/>';
    s += '<path d="M110 168 L121 214 L115 242 M130 168 L119 214 L125 242" stroke="#8B5CFF" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>';
    s += '<circle cx="118" cy="226" r="2.6" fill="#C6F432"/><circle cx="122" cy="238" r="2.6" fill="#C6F432"/>';
    s += '<path d="M72 238 Q94 250 116 243 M168 238 Q146 250 124 243" stroke="#8B5CFF" stroke-width="2" fill="none" stroke-linecap="round"/>';
  }
  if (stage >= 6) s += '<path d="M120 156 L123 164 L131 166 L123 169 L120 177 L117 169 L109 166 L117 164 Z" fill="#C6F432" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>';
  /* manos (patitas cremas) */
  s += '<circle cx="' + H[0] + '" cy="' + H[1] + '" r="10" fill="' + CREAM + '"/>';
  s += '<g' + rcls + '><circle cx="' + H[2] + '" cy="' + H[3] + '" r="10" fill="' + CREAM + '"/></g>';
  /* objetos de cada pose */
  if (pose === 'pulgar') s += '<ellipse cx="190" cy="137" rx="5.5" ry="9.5" fill="' + CREAM + '" transform="rotate(8 190 137)"/>';
  if (pose === 'buscando') s += '<path d="M192 146 L206 124" stroke="#6D3BEA" stroke-width="5" stroke-linecap="round"/><circle cx="214" cy="108" r="21" fill="#22D3EE" fill-opacity=".28" stroke="#8B5CFF" stroke-width="5"/><path d="M203 100 q4 -9 13 -9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>';
  if (pose === 'senalando') s += '<g class="mc-sp" style="transform-origin:50% 100%"><g transform="translate(222 152)"><path d="M0 0C-9-12-12-18-12-24a12 12 0 0 1 24 0c0 6-3 12-12 24z" fill="#8B5CFF" stroke="#fff" stroke-width="2"/><circle cy="-24" r="5" fill="#C6F432"/></g></g>';
  /* salteña en celebración */
  if (pose === 'celebra') s += '<g transform="translate(200 108)"><path d="M-17 14 Q0 -16 17 14 Z" fill="#E9A04B" stroke="#B86F1E" stroke-width="2" stroke-linejoin="round"/><path d="M-15 12 H15" stroke="#B86F1E" stroke-width="2" stroke-dasharray="3 3"/></g>';

  /* cabeza */
  s += '<g>';
  s += '<path d="M68 80 Q58 38 82 32 Q106 34 112 62 Z" fill="' + BROWN + '" stroke="#5C3A22" stroke-width="2" stroke-linejoin="round"/><path d="M77 70 Q72 46 85 43 Q99 46 102 62 Z" fill="' + CREAM + '"/>';
  s += '<path d="M172 80 Q182 38 158 32 Q134 34 128 62 Z" fill="' + BROWN + '" stroke="#5C3A22" stroke-width="2" stroke-linejoin="round"/><path d="M163 70 Q168 46 155 43 Q141 46 138 62 Z" fill="' + CREAM + '"/>';
  s += '<ellipse cx="120" cy="100" rx="54" ry="46" fill="' + FUR + '"/>';
  /* rayas de la frente y manchas */
  s += '<path d="M120 54 v18 M108 58 l3 15 M132 58 l-3 15 M97 64 l6 12 M143 64 l-6 12" stroke="' + BLK + '" stroke-width="3.6" stroke-linecap="round"/>';
  s += '<circle cx="86" cy="70" r="2.6" fill="' + BLK + '"/><circle cx="154" cy="70" r="2.6" fill="' + BLK + '"/><circle cx="78" cy="84" r="2.2" fill="' + BLK + '"/><circle cx="162" cy="84" r="2.2" fill="' + BLK + '"/>';
  s += '<path d="M68 98 l13 4 M67 108 l14 3 M172 98 l-13 4 M173 108 l-14 3" stroke="' + BLK + '" stroke-width="3.4" stroke-linecap="round"/>';
  /* contorno claro de los ojos y hocico */
  s += '<ellipse cx="101" cy="98" rx="16" ry="13" fill="' + CREAM + '"/><ellipse cx="139" cy="98" rx="16" ry="13" fill="' + CREAM + '"/>';
  s += '<ellipse cx="120" cy="114" rx="27" ry="19" fill="' + CREAM + '"/>';
  /* ojos */
  if (pose === 'dormido') s += '<path d="M90 100 q11 9 22 0 M128 100 q11 9 22 0" stroke="' + BLK + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  else if (pose === 'celebra') s += '<path d="M90 103 q11 -11 22 0 M128 103 q11 -11 22 0" stroke="' + BLK + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  else {
    var ex = 0, ey = 0;
    if (pose === 'pensando') { ex = 3; ey = -3; } else if (pose === 'buscando') { ex = 4; ey = -1; } else if (pose === 'senalando') { ex = 4; }
    var big = pose === 'sorpresa', rI = big ? 12.5 : 11, rP = big ? 8 : 6.5;
    var brow = pose === 'triste' ? 'M90 98 L113 88 M150 98 L127 88' : (big ? 'M90 87 Q102 77 114 85 M126 85 Q138 77 150 87' : 'M89 94 Q102 84 114 92 M126 92 Q138 84 151 94');
    s += '<g class="mc-blink"><circle cx="102" cy="99" r="' + rI + '" fill="#6B3E1F"/><circle cx="138" cy="99" r="' + rI + '" fill="#6B3E1F"/><circle cx="' + (103 + ex) + '" cy="' + (100 + ey) + '" r="' + rP + '" fill="' + BLK + '"/><circle cx="' + (137 + ex) + '" cy="' + (100 + ey) + '" r="' + rP + '" fill="' + BLK + '"/><circle cx="' + (106 + ex) + '" cy="' + (96 + ey) + '" r="2.6" fill="#fff"/><circle cx="' + (140 + ex) + '" cy="' + (96 + ey) + '" r="2.6" fill="#fff"/><path d="' + brow + '" stroke="' + BLK + '" stroke-width="3" fill="none" stroke-linecap="round"/></g>';
  }
  /* rayas lagrimales */
  s += '<path d="M112 104 q-2 10 3 18 M128 104 q2 10 -3 18" stroke="' + BLK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
  /* nariz y boca */
  s += '<path d="M113 108 h14 l-7 9 Z" fill="' + NOSE + '" stroke="#A8545F" stroke-width="1.5" stroke-linejoin="round"/>';
  var my = 124;
  if (pose === 'celebra') s += '<path d="M107 ' + my + ' Q120 146 133 ' + my + ' Z" fill="#7A2E3E"/><path d="M114 134 Q120 142 126 134 Z" fill="#F2A7B3"/>';
  else if (pose === 'sorpresa') s += '<ellipse cx="120" cy="130" rx="6" ry="8" fill="#7A2E3E"/>';
  else if (pose === 'triste') s += '<path d="M120 121 v6 M120 128 q-7 -5 -13 0 M120 128 q7 -5 13 0" stroke="' + BLK + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  else s += '<path d="M120 117 v5 M120 122 q-7 6 -13 1 M120 122 q7 6 13 1" stroke="' + BLK + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
  s += '<circle cx="108" cy="119" r="1.4" fill="' + BLK + '"/><circle cx="102" cy="123" r="1.4" fill="' + BLK + '"/><circle cx="132" cy="119" r="1.4" fill="' + BLK + '"/><circle cx="138" cy="123" r="1.4" fill="' + BLK + '"/>';
  /* bigote */
  if (stage === 0) s += '<g class="mc-must"><path d="M107 121 q13 5 26 0" stroke="' + MUST + '" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>';
  else if (stage === 1) s += '<g class="mc-must"><path d="M120 119 Q104 114 92 122" stroke="' + MUST + '" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M120 119 Q136 114 148 122" stroke="' + MUST + '" stroke-width="5" fill="none" stroke-linecap="round"/></g>';
  else s += '<g class="mc-must"><path d="M120 117 Q92 108 72 120 Q62 130 70 140 Q84 124 120 124 Z" fill="' + MUST + '"/><path d="M120 117 Q148 108 168 120 Q178 130 170 140 Q156 124 120 124 Z" fill="' + MUST + '"/></g>';
  if (stage < 3) s += '<path d="M98 112 L64 106 M98 118 L66 122 M142 112 L176 106 M142 118 L174 122" stroke="#fff" stroke-width="1.6" opacity=".85" stroke-linecap="round"/>';
  s += '</g>';
  /* sombrerito */
  if (stage >= 4) s += '<g transform="rotate(-8 120 56)"><ellipse cx="120" cy="58" rx="38" ry="8" fill="#fff" stroke="#CFCADF" stroke-width="2"/><path d="M103 57 Q103 34 120 34 Q137 34 137 57 Z" fill="#fff" stroke="#CFCADF" stroke-width="2"/><path d="M103 52 H137 V57 H103 Z" fill="' + INK + '"/></g>';
  /* extras de pose */
  if (pose === 'dormido') s += '<g fill="#8B5CFF" font-family="Space Grotesk,Arial" font-weight="700"><text class="mc-z" x="170" y="60" font-size="22">z</text><text class="mc-z" style="animation-delay:.8s" x="184" y="44" font-size="16">z</text></g>';
  if (pose === 'celebra') {
    var sp = [[30, 70, 0], [214, 70, .3], [20, 170, .6], [222, 176, .9], [120, 14, .45]];
    for (var i = 0; i < sp.length; i++) s += '<path class="mc-sp" style="animation-delay:' + sp[i][2] + 's" d="M' + sp[i][0] + ' ' + (sp[i][1] - 9) + ' L' + (sp[i][0] + 3) + ' ' + (sp[i][1] - 3) + ' L' + (sp[i][0] + 9) + ' ' + sp[i][1] + ' L' + (sp[i][0] + 3) + ' ' + (sp[i][1] + 3) + ' L' + sp[i][0] + ' ' + (sp[i][1] + 9) + ' L' + (sp[i][0] - 3) + ' ' + (sp[i][1] + 3) + ' L' + (sp[i][0] - 9) + ' ' + sp[i][1] + ' L' + (sp[i][0] - 3) + ' ' + (sp[i][1] - 3) + ' Z" fill="#C6F432" stroke="#16151A" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  if (pose === 'pensando') s += '<g class="mc-sp"><circle cx="196" cy="56" r="17" fill="#8B5CFF"/><path d="M186 106 L180 120 L192 110 Z" fill="#8B5CFF" transform="translate(0 -34)"/><text x="196" y="64" text-anchor="middle" font-family="Space Grotesk,Arial" font-weight="700" font-size="24" fill="#fff">?</text></g>';
  if (pose === 'sorpresa') s += '<path d="M120 12 v14 M92 22 l7 12 M148 22 l-7 12" stroke="#C6F432" stroke-width="4.5" stroke-linecap="round"/>';
  if (pose === 'triste') s += '<path d="M82 112 q-6 10 0 15 q6 -5 0 -15z" fill="#22D3EE"/><path d="M60 40 q8 -8 16 0 M52 52 q14 -12 30 0" stroke="#A58BFF" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>';
  if (pose === 'pulgar') s += '<path class="mc-sp" d="M214 100 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3Z" fill="#C6F432" stroke="#16151A" stroke-width="1.5" stroke-linejoin="round"/>';
  s += '</g></svg>';
  return s;
}

(function(){var s=document.createElement('style');s.textContent=MASCOT_CSS;document.head.appendChild(s)})();

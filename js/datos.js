/* Datos de ejemplo y constantes de la interfaz (prototipo v9). */
var LOGO='<svg class="lg" viewBox="0 0 256 256" aria-label="CochaSabe"><path d="M203.65 179.11A96 96 0 1 1 203.65 60.89L172.13 85.52A56 56 0 1 0 172.13 154.48Z" fill="#8B5CFF"/><path d="M105.22 205L40 238L55.91 170.47Z" fill="#8B5CFF"/><path d="M204 90Q212 112 234 120Q212 128 204 150Q196 128 174 120Q196 112 204 90Z" fill="#C6F432" stroke="#16151A" stroke-width="7" stroke-linejoin="round"/></svg>';
var LOGOBIG='<svg class="lgb" viewBox="0 0 256 256" aria-label="CochaSabe"><path d="M203.65 179.11A96 96 0 1 1 203.65 60.89L172.13 85.52A56 56 0 1 0 172.13 154.48Z" fill="#8B5CFF"/><path d="M105.22 205L40 238L55.91 170.47Z" fill="#8B5CFF"/><path class="s" d="M204 90Q212 112 234 120Q212 128 204 150Q196 128 174 120Q196 112 204 90Z" fill="#C6F432" stroke="#16151A" stroke-width="7" stroke-linejoin="round"/></svg>';
var IC={hoy:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
ayu:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 10.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 17h.01"/></svg>',
yo:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'};
var MODS=['¿Alguien sabe?','Ayudarime','¿Tú sabes?','Ayuditas','¿Quiencito sabe?','Pásame el dato','Dime pues','Vecino sabe','Alguiencito','Cuéntame pues','Ayni','Chasqui','Yachay','Tinkuy','Ayuda pues','Pregúntale al barrio','De vecino a vecino','Dato Cocha','Manita','Dímelo pues','Cocha responde','Mano amiga'];
var TAGS=['Comida','Almuerzos','Ofertas','Precios','Servicios','Salud','Educación','Transporte','Hogar','Tecnología','Mascotas','Ropa','Eventos','Trabajo','Alquileres','Trámites','Belleza','Mercado'];
var ZONAS=['Cala Cala','Sarco','Centro','Queru Queru','Quillacollo','Sacaba'];
var LETS=[
 {id:1,t:'Almuerzo: pique macho',p:'Bs 38',z:'Centro',h:'hace 25 min',c:6,tags:['Comida','Almuerzos','Precios'],e:'🍲'},
 {id:2,mine:true,t:'Salteñas 2x1 hasta las 11',p:'Bs 7 c/u',z:'Cala Cala',h:'hace 1 h',c:11,tags:['Comida','Ofertas'],e:'🥟'},
 {id:3,t:'Pollo broaster, cuarto',p:'Bs 52',z:'Sarco',h:'hace 3 h',c:2,tags:['Comida','Precios'],e:'🍗'},
 {id:4,t:'Taller de motos: cambio de aceite',p:'Bs 60',z:'Queru Queru',h:'hace 5 h',c:4,tags:['Servicios','Transporte'],e:'🏍️'},
 {id:5,t:'Charque en el mercado',p:'Bs 95 el kilo',z:'Quillacollo',h:'hace 6 h',c:3,tags:['Mercado','Precios'],e:'🥩'},
 {id:6,t:'Alquilo cuarto amoblado',p:'Bs 700',z:'Sacaba',h:'ayer',c:2,tags:['Alquileres','Hogar'],e:'🏠'},
 {id:7,t:'Clases de inglés, grupos de 4',p:'Bs 150 al mes',z:'Cala Cala',h:'ayer',c:5,tags:['Educación','Servicios'],e:'📚'},
 {id:8,t:'Vacunación de mascotas, sábado',p:'Gratis',z:'Centro',h:'hace 2 h',c:9,tags:['Mascotas','Salud','Eventos'],e:'🐶'},
 {id:9,t:'Liquidación de ropa de temporada',p:'Desde Bs 30',z:'Centro',h:'hace 4 h',c:3,tags:['Ropa','Ofertas'],e:'👕'},
 {id:10,t:'Se necesita ayudante de cocina',p:'',z:'Queru Queru',h:'hace 1 día',c:1,tags:['Trabajo','Comida'],e:'🧑‍🍳'},
 {id:11,t:'Reparación de celulares y laptops',p:'Desde Bs 50',z:'Sarco',h:'hace 2 días',c:7,tags:['Tecnología','Servicios'],e:'💻'}];
var QS=[
 {id:5,q:'¿Dónde consigo un repuesto de frenos para moto? Lo necesito ya',tags:['Producto','Repuestos','Sarco'],imp:'Indispensable',cost:15,dl:Date.now()+14*60000+12000,ans:[]},
 {id:1,mine:true,q:'¿Dónde reparan una laptop hoy?',tags:['Servicio','Laptop','Cala Cala'],imp:'Urgente',cost:5,ans:[
   {n:'Lucía M.',v:'De confianza',k:'Respuesta',t:'En Av. Heroínas hay un técnico serio, atiende hasta las 20:00.',star:4.8},
   {n:'Carlos R.',v:'Buen vecino',k:'Respuesta',t:'Te lo hago yo en 2 horas, Bs 80. Escríbeme.',star:4.1}]},
 {id:2,q:'¿Dónde venden pan de batalla hoy a la tarde?',tags:['Dato','Panadería','Centro'],imp:'Normal',cost:0,ans:[{n:'Rosa T.',v:'De confianza',k:'Respuesta',t:'En la panadería de la Esteban Arze sale a las 16:00.',star:4.9},{n:'Tú',v:'Buen vecino',k:'Respuesta',t:'En la Sarco también, sale a las 17:00.',star:4.3}]},
 {id:3,q:'¿Alguien me ayuda con una maqueta de arquitectura para el sábado?',tags:['Servicio','Maqueta','Sarco'],imp:'Importante',cost:1,ans:[]},
 {id:4,q:'¿Hay agua en Queru Queru hoy?',tags:['Dato','Agua','Queru Queru'],imp:'Indispensable',cost:15,ans:[{n:'Mario P.',v:'Buen vecino',k:'Respuesta',t:'Hasta las 14:00 sí, después cortan por mantenimiento.',star:4.6}]}];
var NT=[
 {id:1,k:'resp',t:'Lucía M. respondió tu pregunta «¿Dónde reparan una laptop hoy?»',w:'hace 10 min',r:0,q:1},
 {id:2,k:'cal',t:'Rosa T. marcó «Me sirvió» en tu respuesta. +5 cochapuntos',w:'hace 1 h',r:0,q:2},
 {id:3,k:'ctc',t:'Andrea quiere contactarte por tu respuesta en «¿Dónde venden pan de batalla hoy a la tarde?»',w:'hace 2 h',r:0,q:2},
 {id:4,k:'conf',t:'3 vecinos confirmaron tu letrero «Salteñas 2x1 hasta las 11»',w:'ayer',r:1}];
var TOUR=[
 {p:'buscando',h:'Mira qué pasa hoy',t:'Letreros reales de tu zona: precios, ofertas, servicios. Busca o filtra por etiquetas.'},
 {p:'senalando',h:'Sube un letrero',t:'Toma la foto, ponle título y comparte el enlace de ubicación de Google Maps. Ganas cochapuntos.'},
 {p:'pensando',h:'Pregunta y ayuda',t:'Pregunta lo que necesites. Quien sabe, responde. Tú calificas si te sirvió.'},
 {p:'celebra',h:'Tus avisos y tu historial',t:'Mira quién te respondió o te calificó. Tu número solo se comparte si tú aceptas.'},
 {p:'pulgar',h:'Tu perfil gana confianza',t:'No se pide carnet: la confianza se gana con calificaciones y letreros que otros confirman.'}];

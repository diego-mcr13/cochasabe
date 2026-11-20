# CochaSabe

Página web (celular y computador) para la hackathon National Startups by Stellar
(**entrega: domingo 22 nov 2026**). Los vecinos de Cochabamba suben letreros con precios y
ofertas y responden preguntas urgentes. Quien ayuda gana cochapuntos, registrados en Stellar
testnet.

**Antes de programar o responder sobre el producto, lee `wiki/index.md`.** Si algo no está en la
wiki, búscalo en `references/` y después agrégalo a la wiki.

## Reglas que no se rompen
- En la interfaz se dice siempre «cochapuntos». Nunca «XLM», «estelares», «tokens», «cripto» ni
  «blockchain».
- Solo **testnet**. Las claves secretas viven en `.env` o en las variables de entorno de
  Vercel, **nunca** en el repo ni en el frontend.
- Stack: React + TS (Vite), Supabase + funciones de Vercel (`/api`) y deploy en Vercel. El
  prototipo v9 (`references/Prototipo CochaSabe.html`) es la **especificación** de las
  pantallas.
- Los cochapuntos son el activo **COCHA** en Stellar. Los premios los paga la distribuidora de
  CochaSabe, con un memo (`ayuda:q123`), y el saldo se lee de la cadena. Las funciones
  compartidas están en `lib/stellar/cocha.ts`.
- Todo acceso a datos pasa por una sola capa (`src/data/`), para poder cambiar de Supabase a
  otro Postgres sin tocar las pantallas.
- El **Mapa** (`wiki/producto/pantallas-y-flujos.md`) es la lista de chequeo de las pantallas.
- Los colores salen de variables CSS; nunca se escriben a mano. Claro y oscuro siempre.
- Si un pago en Stellar falla, se avisa y **no se bloquea la calificación**.

## LLM-wiki: esquema y operaciones
- `references/`: **fuentes crudas e inmutables**. No se editan.
- `wiki/`: conocimiento procesado. La mantiene Claude. Está en español, con frontmatter
  (`titulo`, `fuentes`, `actualizado`) y enlaces `[[nombre-de-pagina]]`.
- `wiki/index.md`: catálogo de páginas. `wiki/log.md`: registro que solo crece.
- `wiki/preguntas-abiertas.md`: huecos y contradicciones. Cuando una se cierra, se mueve a
  `producto/historia-de-decisiones.md` con su fecha y quién decidió.

**Ingesta** (llega una fuente nueva o cambia una): se pone en `references/`, se actualizan las
páginas afectadas (no se duplican), se marcan las contradicciones con ⚠️ y se anotan en
preguntas abiertas, se actualiza el índice y se agrega una entrada al log.
**Consulta:** se responde citando la página de la wiki; si la respuesta es nueva y durable, se
archiva en la wiki.
**Lint:** hay que buscar páginas que se contradicen, datos superados por decisiones nuevas,
enlaces rotos y conceptos sin página.

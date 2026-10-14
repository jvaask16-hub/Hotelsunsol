# 🌴 Sunsol Hoteles - Plataforma Web de Turismo & Reservas

Base arquitectónica y diseño frontend moderno para la cadena hotelera **Sunsol Hoteles** (Isla de Margarita e Isla de Coche, Venezuela).

---

## 🌟 Características Principales

1. **Diseño Visual de Lujo Tropical:**
   - Paleta corporativa inspirada en los tonos solares (`#F59E0B`), ámbar y el azul profundo del mar Caribe (`#0B253A`, `#0891B2`).
   - Tipografía refinada: *Playfair Display* para títulos de hospitalidad y *Outfit* para lectura ágil.
   - 100% responsivo para móviles, tablets y monitores ultrawide.

2. **Motor de Reservas & Cotizador en Tiempo Real:**
   - Selector interactivo de hotel (Sunsol Ecoland, Punta Blanca, Isla Caribe, Unik).
   - Control dinámico de fechas de Check-in / Check-out con validación de noches.
   - Cálculo instantáneo del presupuesto según tipo de habitación y días de estadía.
   - Integración directa con **WhatsApp API** para enviar el formulario formateado listo para atención al cliente y confirmación de pago.

3. **Catálogo Dinámico de Hoteles y Filtros:**
   - Filtrado instantáneo por categorías: *Todo Incluido*, *Isla de Margarita*, *Isla de Coche*, *Boutique & Lujo*.
   - Ficha de detalles emergente (Modal) con descripción, amenidades y desglose de tarifas por habitación.

4. **Secciones de Experiencias y Promociones:**
   - Cupones de descuento interactivos con funcionalidad de copia al portapapeles en un clic.
   - Módulos para bodas en la playa, gastronomía caribeña, deportes náuticos (kitesurf) y club infantil *SunKids*.

5. **Optimización y Cero Dependencias Pesadas:**
   - Funciona de inmediato sin necesidad de instalar Node.js ni compiladores.
   - Basta con abrir `index.html` en cualquier navegador web.

---

## 📂 Estructura del Proyecto

```text
Hotel Sunsol/
│
├── index.html            # Maquetación semántica, SEO y componentes UI
│
├── css/
│   └── styles.css        # Variables CSS, diseño responsivo, animaciones y glassmorphism
│
├── js/
│   ├── data.js           # Base de datos estructurada (hoteles, tarifas, amenidades, promociones)
│   └── main.js           # Lógica interactiva (filtro, cálculo de cotización, modales, menú móvil)
│
├── assets/
│   └── images/           # Espacio reservado para activos gráficos y logos locales
│
└── README.md             # Documentación del proyecto
```

---

## 🚀 Cómo Visualizar la Página

- Haz doble clic en el archivo [index.html](file:///c:/Users/maste/OneDrive/Documents/Hotel%20Sunsol/index.html).
- Se abrirá automáticamente en tu navegador predeterminado (Google Chrome, Microsoft Edge, Firefox, Safari).

---

## 🛠️ Escalabilidad Futura (Roadmap)

- [ ] Conexión a pasarela de pagos internacional (Stripe, Paypal) o nacional (BNC, Mercantil, Banesco Pago Móvil).
- [ ] Panel administrativo (CMS tipo Strapi o base de datos Supabase/PostgreSQL) para gestionar disponibilidad de habitaciones y precios en temporada alta/baja.
- [ ] Migración a Next.js / Astro en caso de requerir renderizado en servidor (SSR) y autenticación de usuarios.

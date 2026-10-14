// Base de datos oficial y estructurada para SUNSOL HOTELES (Margarita & Isla de Coche)
const SUNSOL_DATA = {
  brand: {
    name: "Sunsol Hoteles",
    motto: "ELEVA TUS EMOCIONES",
    tagline: "El Arte de Vivir el Caribe",
    subtagline: "Cadena hotelera líder en turismo vacacional Todo Incluido en Isla de Margarita e Isla de Coche, Venezuela",
    callCenter1: "+58 (295) 400.1100",
    callCenter2: "+58 (295) 400.1000",
    whatsappVentasOficial: "+58 414 795 4081",
    whatsappVentas1: "+58 414 795 4081",
    whatsappVentas2: "+58 412 319 4094",
    whatsappVentas3: "+58 412 300 7867",
    emailReservas: "reservaciones4@sunsolhoteles.com",
    emailCentral: "reservaciones@sunsolhoteles.com",
    addressCaracas: "Av. Francisco de Miranda, Centro Lido, Torre B, Piso 7, Caracas, Venezuela",
    addressMargarita: "Carretera Costanera, Sector Playa El Tirano, Isla de Margarita",
    yearsExperience: "19+ Años de Liderazgo Turístico",
    // Políticas oficiales exactas de reserva
    policies: {
      checkinTime: "3:00 PM",
      checkoutTime: "12:00 PM",
      anticipoReservaPorcentaje: 40, // 40% para reservar
      plazoPagoTotal: "El saldo restante se cancela en cuotas, debiendo estar pagado el 100% 5 días antes de la llegada",
      earlyCheckoutLateCost: 25, // $25 por persona para early check-in o late check-out
      suplementoUnaNoche: 50, // $50 suplemento en estadías de 1 noche en Coche
      vigenciaCotizacionHoras: 72, // 72 horas de vigencia para congelar tarifa
      edades: {
        adultos: "Mayores de 11 años",
        ninos: "4 a 10 años",
        infantes: "0 a 3 años (Gratis)"
      }
    }
  },

  // Slides del Hero Principal
  heroSlides: [
    {
      id: "vive-coche",
      tag: "¡VIVE COCHE!",
      title: "Sunsol Punta Blanca en Isla de Coche",
      subtitle: "Traslado Marítimo en Lanchas Yaque-Coche Incluido | Alimentos Buffet | Bebidas Ilimitadas | Piscina Borde Infinito",
      discountBadge: "RESERVA CON 40% & PAGA EN CUOTAS",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85",
      hotelId: "punta-blanca"
    },
    {
      id: "day-pass",
      tag: "SUNSOL DAY PASS",
      title: "Disfruta un Día Diferente en el Paraíso",
      subtitle: "Pasadía Todo Incluido en Isla de Coche o Margarita: Piscinas, playa privada, almuerzo buffet, snacks y bebidas ilimitadas",
      discountBadge: "DAY PASS DISPONIBLE TODOS LOS DÍAS",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85",
      hotelId: "punta-blanca"
    },
    {
      id: "ecoland-nature",
      tag: "COMPLEJO ECOLÓGICO",
      title: "Sunsol Ecoland & Playa Puerto Cruz",
      subtitle: "El resort más completo de Margarita: Laguna natural con botes, 4 piscinas temáticas y acceso a las mejores aguas del Caribe",
      discountBadge: "TARIFA ESPECIAL TODO INCLUIDO",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=85",
      hotelId: "ecoland"
    },
    {
      id: "isla-caribe-fun",
      tag: "TODO INCLUIDO FAMILIAR",
      title: "Sunsol Isla Caribe en Playa El Tirano",
      subtitle: "Check-in 3:00 PM | Comidas Buffet & Snacks | 3 Piscinas | Bebidas Nacionales Ilimitadas | Club de Playa y Animación",
      discountBadge: "DESDE $90 USD POR PERSONA / NOCHE",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85",
      hotelId: "isla-caribe"
    },
    {
      id: "cuotas-facil",
      tag: "FACILIDADES DE PAGO",
      title: "Reserva con el 40% de la Cotización",
      subtitle: "Asegura tus fechas congelando tarifa por 72h y paga el resto en cómodas cuotas hasta 5 días antes de tu viaje",
      discountBadge: "RESERVA CON EL 40%",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85",
      hotelId: "all"
    }
  ],

  // Información exacta de los 4 Hoteles de la cadena según Vouchers Oficiales
  hotels: [
    {
      id: "isla-caribe",
      name: "Sunsol Isla Caribe",
      region: "ISLA DE MARGARITA",
      location: "Carretera Costanera, Sector Playa El Tirano",
      tripAdvisor: true,
      pricePerson: 90.00,
      priceRoom: null,
      planType: "PLAN TODO INCLUIDO",
      rating: 4.8,
      reviewsCount: 1650,
      checkinTime: "3:00 PM",
      checkoutTime: "12:00 PM",
      imageMain: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      imageAerial: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Ubicado frente a las costas de Playa El Tirano en la Isla de Margarita. Disfruta de un auténtico resort Todo Incluido con 3 piscinas, club de playa privado, variada gastronomía buffet, teatro nocturno y actividades para toda la familia.",
      // Inclusiones exactas del Voucher Oficial #55314
      tarifaIncluye: [
        "Alojamiento con PLAN TODO INCLUIDO",
        "Check-in: 3:00 PM | Check-out: 12:00 PM",
        "Comidas tipo buffet (desayuno, almuerzo, cena)",
        "Snacks a media mañana y tarde",
        "3 piscinas temáticas para adultos y niños",
        "Bebidas alcohólicas y no alcohólicas nacionales ilimitadas",
        "Club de Playa con toldos y sillas",
        "Parque Infantil y recreación para niños",
        "Discoteca y shows nocturnos en el teatro",
        "Cancha de voleibol de playa",
        "Wifi en áreas comunes",
        "Gimnasio completamente equipado",
        "Actividades recreativas diarias en piscina y playa"
      ],
      features: [
        "Plan Todo Incluido continuo (comidas, snacks y bebidas)",
        "3 Piscinas integradas y bar mojado",
        "Comidas buffet y cenas temáticas",
        "Club de Playa privado en Playa El Tirano",
        "Cancha de voleibol de playa y gimnasio",
        "Discoteca, teatro y entretenimiento diario"
      ],
      rooms: [
        { name: "Habitación Estándar", capacity: "2 Adultos", price: 90 },
        { name: "Habitación Vista al Mar", capacity: "2 Adultos + 2 Niños", price: 110 },
        { name: "Suite Familiar Caribe", capacity: "4 Adultos", price: 160 }
      ],
      emailEventos: "eventos.islacaribe@sunsolhoteles.com",
      mapUrl: "https://maps.google.com/maps?q=Sunsol+Isla+Caribe+Margarita&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "punta-blanca",
      name: "Sunsol Punta Blanca",
      region: "ISLA DE COCHE",
      location: "Playa La Punta, Isla de Coche",
      tripAdvisor: true,
      pricePerson: 110.00,
      priceRoom: null,
      planType: "PLAN TODO INCLUIDO",
      rating: 4.9,
      reviewsCount: 1120,
      checkinTime: "3:00 PM",
      checkoutTime: "12:00 PM",
      suplementoUnaNoche: 50.00,
      zarpes: {
        ida: "Yaque — Coche: 14:30 (2:30 PM)",
        retorno: "Coche — Yaque: 13:00 (1:00 PM - coordinar con recepción)"
      },
      imageMain: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      imageAerial: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Ubicado en las arenas blancas y aguas cristalinas de Playa La Punta en la paradisíaca Isla de Coche. Ofrece traslado marítimo en lanchas incluido, piscina panorámica de borde infinito con cascada, discoteca y relajación total.",
      // Inclusiones exactas del Voucher Oficial #55315
      tarifaIncluye: [
        "Horario de zarpes coordinados: Yaque-Coche 14:30 | Coche-Yaque 13:00",
        "Traslado marítimo en lanchas ida y vuelta (Yaque-Coche-Yaque) INCLUIDO",
        "Alojamiento con PLAN TODO INCLUIDO",
        "Check-in: 3:00 PM | Check-out: 12:00 PM",
        "Todas las comidas tipo buffet (desayuno, almuerzo, cena)",
        "Snacks a orilla de playa y piscina",
        "Club de Playa con camastros y toldos",
        "Parque Infantil para niños",
        "Discoteca y ambiente nocturno",
        "Wifi en áreas comunes",
        "Actividades recreativas diarias en piscina y playa",
        "1 piscina con borde infinito y vista panorámica",
        "Bebidas alcohólicas y no alcohólicas nacionales ilimitadas"
      ],
      features: [
        "Traslado marítimo en lanchas ida y vuelta incluido",
        "Piscina con borde infinito y vista al mar",
        "Plan Todo Incluido (comidas buffet, snacks y bar abierto)",
        "Club de playa privado en las mejores arenas de Coche",
        "Discoteca y parque infantil",
        "Horario de zarpes: Yaque-Coche 14:30 | Coche-Yaque 13:00"
      ],
      rooms: [
        { name: "Habitación Estándar", capacity: "2 Adultos", price: 110 },
        { name: "Bungalow Familiar Coche", capacity: "3 Adultos o 2+2", price: 145 },
        { name: "Suite Frente al Mar 'Starfish'", capacity: "2 Adultos (Especial Parejas)", price: 185 }
      ],
      emailEventos: "eventos.puntablanca@sunsolhoteles.com",
      mapUrl: "https://maps.google.com/maps?q=Sunsol+Punta+Blanca+Isla+de+Coche&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "ecoland",
      name: "Sunsol Ecoland",
      region: "ISLA DE MARGARITA",
      location: "Playa Puerto Cruz, Pedro González",
      tripAdvisor: true,
      pricePerson: 110.00,
      priceRoom: null,
      planType: "PLAN TODO INCLUIDO",
      rating: 4.8,
      reviewsCount: 1890,
      imageMain: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      imageAerial: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "El complejo vacacional más extenso e impresionante de la región. Cuenta con una laguna natural navegable en botes de pedal, 4 piscinas temáticas, dunas de arena y acceso a Playa Puerto Cruz y Playa Zaragoza.",
      features: [
        "Plan Todo Incluido 24 Horas",
        "Laguna natural navegable con muelles fotográficos",
        "4 Complejos de piscinas (infantiles, familiares y relax)",
        "5 Restaurantes de especialidades y bares de playa",
        "Club de niños 'SunKids' con recreación dirigida",
        "Canchas de tenis, voleibol de playa y gimnasio"
      ],
      rooms: [
        { name: "Habitación Estándar Colina", capacity: "2 Adultos", price: 110 },
        { name: "Habitación Premium Laguna", capacity: "2 Adultos + 2 Niños", price: 135 },
        { name: "Master Suite Vista Mar Puerto Cruz", capacity: "4 Adultos", price: 190 }
      ],
      emailEventos: "eventos.ecoland@sunsolhoteles.com",
      mapUrl: "https://maps.google.com/maps?q=Sunsol+Ecoland+Playa+Puerto+Cruz&t=&z=14&ie=UTF8&iwloc=&output=embed"
    },
    {
      id: "unik",
      name: "Sunsol Unik",
      region: "ISLA DE MARGARITA",
      location: "Parque Costazul / Costa Azul, Pampatar",
      tripAdvisor: true,
      pricePerson: 110.00,
      priceRoom: 130.00,
      planType: "TODO INCLUIDO O SOLO DESAYUNO",
      rating: 4.9,
      reviewsCount: 950,
      imageMain: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      imageAerial: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
      ],
      description: "Hotel Boutique de arquitectura vanguardista y confort prémium en la zona más exclusiva de Pampatar, contiguo al CC Parque Costazul. Ofrece piscina infinita en la azotea, gastronomía de autor y salones corporativos.",
      features: [
        "Opción Plan Todo Incluido ($110/p) o Solo Desayuno Buffet ($130/hab)",
        "Piscina 'Infinity' en Rooftop con vista a la bahía",
        "Restaurante de autor y Lounge de cócteles exclusivos",
        "Salones ejecutivos y centros de reuniones de alta tecnología",
        "Acceso directo y preferencial al CC Parque Costazul",
        "Conexión con el Sunsol Pádel Club"
      ],
      rooms: [
        { name: "Habitación Deluxe King (Plan Desayuno)", capacity: "2 Adultos", price: 130 },
        { name: "Deluxe Queen Doble (Plan Desayuno)", capacity: "2 Adultos + 2 Niños", price: 150 },
        { name: "Habitación Ejecutiva Todo Incluido", capacity: "2 Adultos", price: 220 }
      ],
      emailEventos: "eventos.unik@sunsolhoteles.com",
      mapUrl: "https://maps.google.com/maps?q=Sunsol+Unik+Hotel+Pampatar&t=&z=14&ie=UTF8&iwloc=&output=embed"
    }
  ],

  // Eventos & Banquetes (De las capturas promocion.sunsolhoteles.com/eventos)
  events: [
    {
      id: "quinceaneras",
      title: "Plan Quinceañeras",
      badge: "CELEBRACIÓN JUVENIL",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      description: "Hacemos que sus 15 años sean inolvidables frente al mar Caribe con glamour, sesión fotográfica y diversión para sus amigos.",
      includes: [
        "Cóctel de bienvenida temático",
        "Cena especial en área reservada con menú juvenil",
        "Torta de cumpleaños con diseño personalizado",
        "Asesoría directa de la organizadora de eventos Sunsol",
        "Sesión de fotos en los jardines y dunas"
      ]
    },
    {
      id: "romantico",
      title: "Plan Romántico & Lunas de Miel",
      badge: "MOMENTO ÍNTIMO",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      description: "Diseñado para aniversarios, propuestas de matrimonio o parejas que buscan renovar su amor frente a los más hermosos atardeceres.",
      includes: [
        "Decoración romántica especial en la habitación con pétalos",
        "Cena romántica privada a la luz de las velas a la orilla del mar",
        "Descorche de botella de espumante o champaña premium",
        "Fresas con chocolate y desayuno en la cama al día siguiente",
        "Late check-out garantizado según disponibilidad"
      ]
    },
    {
      id: "bodas",
      title: "Plan de Bodas en la Playa",
      badge: "EL SÍ, ACEPTO SOÑADO",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "Casarse descalzos sobre la arena blanca de Isla de Coche o frente al mar de Playa Puerto Cruz con montaje nupcial de ensueño.",
      includes: [
        "Ceremonia privada en playa o jardín con arco nupcial floral",
        "Mobiliario elegante con sillas Tiffany y pasarela",
        "Brindis con espumante para todos los invitados",
        "Banquete gourmet de boda y barra de coctelería caribeña",
        "Habitación de cortesía para los novios durante la noche de bodas"
      ]
    },
    {
      id: "corporativo",
      title: "Eventos Corporativos & Convenciones",
      badge: "NEGOCIOS & CONGRESOS",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      description: "Espacios modernos y salones de conferencias en Sunsol Unik y Sunsol Ecoland equipados con tecnología audiovisual de última generación.",
      includes: [
        "Salones climatizados con aforos desde 20 hasta 500 personas",
        "Estación de Coffee Break continuo y almuerzos ejecutivos",
        "Equipos audiovisuales, pantallas LED y sonido envolvente",
        "Actividades de Team Building en la playa y en Sunsol Pádel Club"
      ]
    }
  ],

  // Espacios y Servicios Exclusivos (Captura real de la web oficial)
  exclusiveVenues: [
    {
      id: "the-essential",
      name: "The Essential",
      subtitle: "SPA · BOUTIQUE · SALÓN DE BELLEZA",
      hotel: "Sunsol Isla Caribe",
      tag: "Relajación Total",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      description: "Masajes con piedras calientes, faciales hidratantes, aromaterapia caribeña y tratamientos de belleza para consentirte durante tus vacaciones."
    },
    {
      id: "puff",
      name: "Puff Confitería",
      subtitle: "CONFITERÍA & DULCES",
      hotel: "Sunsol Isla Caribe",
      tag: "Para los Peques",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
      description: "Estación dulce con algodones de azúcar artesanales, golosinas tropicales, palomitas de maíz y confitería frente a la piscina."
    },
    {
      id: "gelatiglu",
      name: "Gelatiglú",
      subtitle: "HELADERÍA ARTESANAL",
      hotel: "Sunsol Isla Caribe",
      tag: "Sabor Tropical",
      image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
      description: "Divertida heladería ambientada en un iglú polar donde disfrutar helados cremosos, merengadas y sabores de frutas venezolanas."
    },
    {
      id: "padel-club",
      name: "Sunsol Pádel Club",
      subtitle: "PISTAS DE PÁDEL · GASTRONOMÍA",
      hotel: "CC Parque Costazul",
      tag: "Deporte & Lifestyle",
      image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
      description: "Modernas pistas panorámicas de pádel profesional con iluminación nocturna, área social lounge y opciones gastronómicas gourmet."
    }
  ],

  // Galería de Imágenes Enriquecida con vistas aéreas y drones
  galleryPhotos: [
    {
      id: 1,
      category: "playas",
      title: "Playa La Punta - Isla de Coche",
      hotel: "Sunsol Punta Blanca",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 2,
      category: "piscinas",
      title: "Piscina Principal y Palmeras",
      hotel: "Sunsol Ecoland",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 3,
      category: "playas",
      title: "Embarcación Sunsol Festival Cruise",
      hotel: "Traslado a Coche",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 4,
      category: "habitaciones",
      title: "Suite Frente al Mar",
      hotel: "Sunsol Punta Blanca",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 5,
      category: "gastronomia",
      title: "Buffet Caribeño & Coctelería",
      hotel: "Sunsol Isla Caribe",
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 6,
      category: "piscinas",
      title: "Rooftop Pool & Sunset Lounge",
      hotel: "Sunsol Unik",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 7,
      category: "spa",
      title: "Masaje Relajante en The Essential",
      hotel: "Sunsol Isla Caribe",
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 8,
      category: "piscinas",
      title: "Laguna Natural Navegable",
      hotel: "Sunsol Ecoland",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 9,
      category: "playas",
      title: "Vista Aérea Playa Puerto Cruz",
      hotel: "Sunsol Ecoland",
      url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 10,
      category: "habitaciones",
      title: "Habitación Premium Contemporánea",
      hotel: "Sunsol Unik",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 11,
      category: "gastronomia",
      title: "Cena Romántica en la Playa",
      hotel: "Sunsol Punta Blanca",
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
    },
    {
      id: 12,
      category: "deportes",
      title: "Sunsol Pádel Club Nocturno",
      hotel: "Parque Costazul",
      url: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=85"
    }
  ],

  // Directorio de Contacto Oficial por Hotel (De captura contacto.php y Vouchers)
  contactDirectory: [
    {
      hotel: "Sunsol Isla Caribe",
      callCenter: "+58 (295) 400.1100 / (295) 400.1000",
      whatsapp: "+58 414 795 4081 / +58 412 319 4094",
      emailReservas: "reservaciones4@sunsolhoteles.com",
      emailEventos: "eventos.islacaribe@sunsolhoteles.com",
      locationText: "Carretera Costanera, Sector Playa El Tirano, Isla de Margarita"
    },
    {
      hotel: "Sunsol Punta Blanca",
      callCenter: "+58 (295) 400.1100 / (295) 400.1000",
      whatsapp: "+58 414 795 4081 / +58 412 319 4094",
      emailReservas: "reservaciones4@sunsolhoteles.com",
      emailEventos: "eventos.puntablanca@sunsolhoteles.com",
      locationText: "Playa La Punta, Isla de Coche (Zarpes desde El Yaque)"
    },
    {
      hotel: "Sunsol Ecoland",
      callCenter: "+58 (295) 400.1100 / (295) 400.1000",
      whatsapp: "0412 3194094 / 0412 3843057",
      emailReservas: "reservaciones@sunsolhoteles.com",
      emailEventos: "eventos.ecoland@sunsolhoteles.com",
      locationText: "Playa Puerto Cruz, Pedro González"
    },
    {
      hotel: "Sunsol Unik Luxury Hotel",
      callCenter: "+58 (295) 400.1100 / (295) 400.1000",
      whatsapp: "0412 3194094 / 0412 3843057",
      emailReservas: "reservaciones@sunsolhoteles.com",
      emailEventos: "eventos.unik@sunsolhoteles.com",
      locationText: "CC Parque Costazul, Pampatar"
    }
  ],

  // Quiénes Somos
  about: {
    history: "Sunsol Hoteles es una distinguida cadena hotelera venezolana líder en el desarrollo turístico de la región desde hace más de 19 años, habiendo posicionado a la Isla de Margarita y a la Isla de Coche como los destinos vacacionales preferidos del mar Caribe.",
    mission: "Comprometidos con la excelencia y el desarrollo sustentable brindando el más cálido servicio a nuestros huéspedes. Con el talento de un equipo humano motivado, creativo y orientado a resultados, generamos bienestar a la gran familia Sunsol Hoteles.",
    vision: "Ser líderes en calidad de servicio garantizando la satisfacción, felicidad y fidelidad de nuestros huéspedes y aliados.",
    values: [
      { name: "Compromiso", desc: "Dedicación absoluta con cada huésped y su disfrute." },
      { name: "Disciplina", desc: "Rigurosos estándares de calidad, limpieza y servicio." },
      { name: "Honestidad", desc: "Transparencia y claridad en cada tarifa y promesa." },
      { name: "Integridad", desc: "Ética y congruencia en todas nuestras acciones." },
      { name: "Pasión por el Servicio", desc: "La genuina calidez margariteña y venezolana." },
      { name: "Respeto", desc: "Valoración de nuestro entorno natural y nuestros clientes." },
      { name: "Trabajo en Equipo", desc: "Cohesión para crear experiencias inolvidables." }
    ]
  },

  // Ubicaciones
  locations: [
    {
      hotel: "Sunsol Isla Caribe",
      address: "Playa El Tirano, Carretera Costanera, Municipio Antolín del Campo, Isla de Margarita, Venezuela.",
      phone: "+58 (295) 400.1100 / 400.1000",
      mapEmbed: "https://maps.google.com/maps?q=Sunsol+Isla+Caribe&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      hotel: "Sunsol Punta Blanca",
      address: "Playa La Punta, Isla de Coche, Estado Nueva Esparta, Venezuela (Acceso marítimo coordinado).",
      phone: "+58 (295) 400.1100 / 400.1000",
      mapEmbed: "https://maps.google.com/maps?q=Sunsol+Punta+Blanca+Coche&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      hotel: "Sunsol Ecoland",
      address: "Playa Puerto Cruz, Valle de Pedro González, Municipio Gómez, Isla de Margarita, Venezuela.",
      phone: "+58 (295) 400.1100 / 400.1000",
      mapEmbed: "https://maps.google.com/maps?q=Sunsol+Ecoland&t=&z=13&ie=UTF8&iwloc=&output=embed"
    },
    {
      hotel: "Sunsol Unik Luxury Hotel",
      address: "Centro Comercial Parque Costazul, Av. Jóvito Villalba, Pampatar, Isla de Margarita, Venezuela.",
      phone: "+58 (295) 400.1100 / 400.1000",
      mapEmbed: "https://maps.google.com/maps?q=Sunsol+Unik+Hotel&t=&z=13&ie=UTF8&iwloc=&output=embed"
    }
  ]
};

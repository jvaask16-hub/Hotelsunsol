// ==========================================================
// SUNSOL HOTELES - LÓGICA MINIMALISTA & ELEGANTE
// ==========================================================

// Configuración de Supabase Oficial
const SUPABASE_CONFIG = {
  url: "https://vxeafvxigtpuzewkfotc.supabase.co",
  anonKey: "sb_publishable_RuIMl_9AowE9k7NGl_Umjg_IkLunOSY"
};

let supabaseClient = null;
if (window.supabase && SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
  try {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log("Supabase conectado exitosamente.");
  } catch (err) {
    console.warn("Aviso Supabase:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initBookingDates();
  renderHotels();
  renderGallery('all');
  initGalleryFilters();
  initLightbox();
  initModalListeners();
});

/* ==========================================================
   NAVBAR & MENÚ MÓVIL
   ========================================================== */
function initNavbar() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const menu = document.querySelector(".nav-links-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      document.body.style.overflow = isOpen ? "hidden" : "";
      const icon = toggle.querySelector("i");
      if (icon) {
        if (isOpen) {
          icon.className = "fas fa-times";
        } else {
          icon.className = "fas fa-bars";
        }
      }
    });

    // Abrir/cerrar la pestaña de Hoteles al tocarla en móvil o desktop
    const dropdownToggles = document.querySelectorAll(".nav-item-dropdown > a, .dropdown-toggle");
    dropdownToggles.forEach(toggleLink => {
      toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = toggleLink.closest(".nav-item-dropdown");
        if (parent) {
          parent.classList.toggle("dropdown-open");
        }
      });
    });

    // Cerrar el menú al hacer clic en enlaces normales (excluyendo el botón de Hoteles)
    document.querySelectorAll(".nav-menu-item > a, .dropdown-link-item").forEach(link => {
      if (link.classList.contains("dropdown-toggle") || link.closest(".nav-item-dropdown > a")) {
        return; // No cerrar al tocar el botón de Hoteles
      }
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }
}

function closeMobileMenu() {
  const menu = document.querySelector(".nav-links-menu");
  const toggle = document.querySelector(".mobile-nav-toggle");
  if (menu && menu.classList.contains("open")) {
    menu.classList.remove("open");
  }
  if (toggle) {
    const icon = toggle.querySelector("i");
    if (icon) icon.className = "fas fa-bars";
  }
  document.querySelectorAll(".nav-item-dropdown").forEach(d => d.classList.remove("dropdown-open"));
  document.body.style.overflow = "";
}
window.closeMobileMenu = closeMobileMenu;

/* ==========================================================
   FECHAS DEL MOTOR DE RESERVAS
   ========================================================== */
function initBookingDates() {
  const checkin = document.getElementById("clean-checkin");
  const checkout = document.getElementById("clean-checkout");
  if (!checkin || !checkout) return;

  const today = new Date();
  const next = new Date();
  next.setDate(today.getDate() + 4);

  const fmt = d => d.toISOString().split("T")[0];
  checkin.min = fmt(today);
  checkin.value = fmt(today);
  checkout.min = fmt(today);
  checkout.value = fmt(next);

  checkin.addEventListener("change", () => {
    if (new Date(checkout.value) <= new Date(checkin.value)) {
      const n = new Date(checkin.value);
      n.setDate(n.getDate() + 2);
      checkout.value = fmt(n);
    }
    checkout.min = checkin.value;
  });
}

/* ==========================================================
   HOTELES: RENDERIZADO LIMPIO Y ELEGANTE
   ========================================================== */
function renderHotels() {
  const container = document.getElementById("hotels-clean-grid");
  if (!container) return;

  container.innerHTML = SUNSOL_DATA.hotels.map(h => {
    const pageUrl = `${h.id}.html`;
    return `
    <article class="hotel-luxury-card">
      <div class="hotel-card-image-wrap">
        <a href="${pageUrl}"><img src="${h.imageMain}" alt="${h.name}" loading="lazy"></a>
        <span class="hotel-location-tag">${h.region}</span>
      </div>
      <div class="hotel-card-details-box">
        <h3 class="hotel-title-text"><a href="${pageUrl}" style="color: inherit;">${h.name}</a></h3>
        <span class="hotel-plan-label">${h.planType}</span>
        <p class="hotel-card-summary">${h.description.slice(0, 115)}...</p>
        
        <div class="hotel-price-row" style="flex-direction: column; align-items: flex-start; gap: 0.25rem;">
          <div style="display: flex; align-items: baseline; gap: 0.4rem;">
            <span class="hotel-price-figure" style="font-size: 1.85rem; font-weight: 800; color: var(--sunsol-blue);">$${h.pricePerson.toFixed(0)}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--sunsol-blue-dark);">USD</span>
          </div>
          <div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; color: var(--sunsol-blue); letter-spacing: 0.5px; background: var(--sunsol-wave-light); padding: 0.25rem 0.6rem; border-radius: 4px;">
            POR PERSONA / POR NOCHE
          </div>
          <span style="font-size: 0.72rem; color: #00AA6C; font-weight: 700; margin-top: 0.2rem;">
            <i class="fas fa-certificate"></i> TripAdvisor Travelers' Choice
          </span>
        </div>

        <div class="hotel-btn-row">
          <a href="${pageUrl}" class="btn-sunsol-secondary" style="text-align: center; justify-content: center;">
            Ver Hotel
          </a>
          <button class="btn-sunsol-primary" onclick="openBookingModal('${h.id}')">
            Reservar
          </button>
        </div>
      </div>
    </article>
  `;
  }).join('');
}

/* ==========================================================
   GALERÍA FOTOGRÁFICA
   ========================================================== */
function renderGallery(category = 'all') {
  const container = document.getElementById("gallery-clean-grid");
  if (!container) return;

  const filtered = category === 'all'
    ? SUNSOL_DATA.galleryPhotos
    : SUNSOL_DATA.galleryPhotos.filter(p => p.category === category);

  container.innerHTML = filtered.map(item => `
    <div class="gallery-photo-thumb" onclick="openLightbox('${item.url}', '${item.title} &bull; ${item.hotel}')">
      <img src="${item.url}" alt="${item.title}" loading="lazy">
      <div class="gallery-photo-overlay">
        <div class="gallery-overlay-title">${item.title}</div>
        <div class="gallery-overlay-hotel">${item.hotel}</div>
      </div>
    </div>
  `).join('');
}

function initGalleryFilters() {
  const pills = document.querySelectorAll(".gallery-filter-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      renderGallery(pill.dataset.cat);
    });
  });
}

/* ==========================================================
   LIGHTBOX FULLSCREEN
   ========================================================== */
function initLightbox() {
  const closeBtn = document.getElementById("lightbox-close-btn");
  const modal = document.getElementById("lightbox-modal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
}

window.openLightbox = function(url, caption) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");

  if (!modal || !img) return;
  img.src = url;
  if (cap) cap.innerHTML = caption || "";
  modal.classList.add("open");
};

/* ==========================================================
   MODALES (COTIZADOR, WEB CHECK-IN, DAY PASS)
   ========================================================== */
function initModalListeners() {
  const backdrop = document.getElementById("app-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      const lb = document.getElementById("lightbox-modal");
      if (lb) lb.classList.remove("open");
    }
  });
}

function openModal(title, bodyHtml) {
  const backdrop = document.getElementById("app-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body-content");

  if (!backdrop || !modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHtml;
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

window.closeModal = function() {
  const backdrop = document.getElementById("app-modal");
  if (backdrop) {
    backdrop.classList.remove("open");
    document.body.style.overflow = "auto";
  }
};

/* ==========================================================
   COTIZADOR DE RESERVAS ELEGANTE (VOUCHER OFICIAL SUNSOL)
   ========================================================== */
window.openBookingModal = function(preselectedHotelId = '') {
  const topHotel = document.getElementById("clean-hotel")?.value || "";
  const topCheckin = document.getElementById("clean-checkin")?.value || "";
  const topCheckout = document.getElementById("clean-checkout")?.value || "";
  const topGuests = document.getElementById("clean-guests")?.value || "2";

  const selectedHotelId = preselectedHotelId || topHotel || SUNSOL_DATA.hotels[0].id;
  const hotel = SUNSOL_DATA.hotels.find(h => h.id === selectedHotelId) || SUNSOL_DATA.hotels[0];

  const content = `
    <form id="reservation-clean-form" onsubmit="handleReservationSubmit(event)" style="display: flex; flex-direction: column; gap: 1.25rem;">
      <div style="background: var(--sunsol-wave-light); padding: 0.9rem 1.25rem; border-radius: var(--radius-sm); border-left: 4px solid var(--sunsol-blue); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span style="font-size: 0.82rem; font-weight: 800; color: var(--sunsol-blue-dark); text-transform: uppercase;">
            <i class="fas fa-file-invoice-dollar" style="color: var(--sunsol-blue);"></i> Cotización Oficial Sunsol Hoteles
          </span>
          <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
            Reserva con solo el <strong>40% inicial</strong> y paga en cuotas hasta 5 días antes de la llegada.
          </div>
        </div>
        <span style="background: #FFFFFF; font-size: 0.72rem; font-weight: 700; color: #00875A; padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid #B3DFD1;">
          <i class="fas fa-clock"></i> Vigencia 72 Horas Garantizada
        </span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-field-group">
          <label><i class="fas fa-hotel"></i> Hotel Seleccionado</label>
          <select id="modal-hotel-select" class="input-clean" onchange="updateModalRooms(this.value)">
            ${SUNSOL_DATA.hotels.map(h => `
              <option value="${h.id}" ${h.id === hotel.id ? 'selected' : ''}>${h.name} (${h.region})</option>
            `).join('')}
          </select>
        </div>

        <div class="form-field-group">
          <label><i class="fas fa-bed"></i> Habitación & Tarifa (Por Persona / Noche)</label>
          <select id="modal-room-select" class="input-clean" onchange="calculateQuote()">
            ${hotel.rooms.map(r => `
              <option value="${r.price}" data-name="${r.name}">${r.name} - $${r.price} USD por pers./noche</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-field-group">
          <label><i class="fas fa-calendar-alt"></i> Fecha Llegada (Check-in 3:00 PM)</label>
          <input type="date" id="modal-checkin" class="input-clean" value="${topCheckin}" required onchange="calculateQuote()">
        </div>
        <div class="form-field-group">
          <label><i class="fas fa-calendar-alt"></i> Fecha Salida (Check-out 12:00 PM)</label>
          <input type="date" id="modal-checkout" class="input-clean" value="${topCheckout}" required onchange="calculateQuote()">
        </div>
      </div>

      <!-- DISTRIBUCIÓN DE HUÉSPEDES EXACTA DEL VOUCHER -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
        <div class="form-field-group">
          <label><i class="fas fa-user"></i> Adultos (+11 años)</label>
          <select id="modal-adults" class="input-clean" onchange="calculateQuote()">
            <option value="1" ${topGuests == "1" ? 'selected' : ''}>1 Adulto</option>
            <option value="2" ${topGuests == "2" || !topGuests ? 'selected' : ''}>2 Adultos</option>
            <option value="3" ${topGuests == "3" ? 'selected' : ''}>3 Adultos</option>
            <option value="4" ${topGuests == "4" ? 'selected' : ''}>4 Adultos</option>
            <option value="5">5+ Adultos</option>
          </select>
        </div>
        <div class="form-field-group">
          <label><i class="fas fa-child"></i> Niños (4-10 años)</label>
          <select id="modal-children" class="input-clean" onchange="calculateQuote()">
            <option value="0" selected>0 Niños</option>
            <option value="1">1 Niño</option>
            <option value="2">2 Niños</option>
            <option value="3">3 Niños</option>
          </select>
        </div>
        <div class="form-field-group">
          <label><i class="fas fa-baby"></i> Infantes (0-3 años)</label>
          <select id="modal-infants" class="input-clean">
            <option value="0" selected>0 Infantes (Gratis)</option>
            <option value="1">1 Infante (Gratis)</option>
            <option value="2">2 Infantes (Gratis)</option>
          </select>
        </div>
      </div>

      <!-- SERVICIOS ADICIONALES (VOUCHER Y POLÍTICAS) -->
      <div style="background: #FAFCFE; border: 1px dashed var(--border-color); padding: 0.85rem 1rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
        <span style="font-weight: 700; color: var(--sunsol-blue-dark); text-transform: uppercase; font-size: 0.75rem; display: block; margin-bottom: 0.4rem;">
          <i class="fas fa-plus-circle" style="color: var(--sunsol-blue);"></i> Servicios Opcionales ($25/persona)
        </span>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-main);">
            <input type="checkbox" id="add-early" onchange="calculateQuote()"> Early Check-in ($25 USD c/u)
          </label>
          <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-main);">
            <input type="checkbox" id="add-late" onchange="calculateQuote()"> Late Check-out ($25 USD c/u)
          </label>
        </div>
        <div id="coche-zarpe-note" style="display: none; margin-top: 0.5rem; color: var(--sunsol-blue); font-size: 0.78rem;">
          <i class="fas fa-ship"></i> <strong>Sunsol Punta Blanca Coche:</strong> Traslado marítimo en lanchas ida y vuelta incluido (Zarpes Yaque 14:30 | Coche 13:00).
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="form-field-group">
          <label><i class="fas fa-user-edit"></i> Estimado(a) / Nombre Titular</label>
          <input type="text" id="modal-name" class="input-clean" placeholder="Ej. Daymaris Rodríguez" required>
        </div>
        <div class="form-field-group">
          <label><i class="fab fa-whatsapp"></i> WhatsApp / Teléfono</label>
          <input type="tel" id="modal-phone" class="input-clean" placeholder="+58 414 000 0000" required>
        </div>
      </div>

      <!-- DESGLOSE OFICIAL IDÉNTICO AL VOUCHER -->
      <div style="background: var(--bg-soft); border: 1.5px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-sm);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.76rem; font-weight: 800; color: var(--sunsol-blue); text-transform: uppercase; letter-spacing: 0.5px;">Resumen de Cotización</span>
            <div id="quote-nights-text" style="font-size: 0.95rem; font-weight: 600; color: var(--sunsol-blue-dark); margin-top: 2px;">Calculando...</div>
            <div id="quote-suplemento-text" style="font-size: 0.78rem; color: #D9381E; font-weight: 600; display: none; margin-top: 3px;">
              <i class="fas fa-info-circle"></i> Suplemento 1 noche Coche: +$50.00 USD
            </div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.74rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total a Pagar</span>
            <div id="quote-total-price" style="font-size: 1.85rem; font-weight: 800; color: var(--sunsol-blue); line-height: 1.1;">$0 USD</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: #FFFFFF; padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid var(--border-light);">
          <div>
            <span style="font-size: 0.74rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Para Reservar Hoy (40%)</span>
            <div id="quote-downpayment" style="font-size: 1.25rem; font-weight: 800; color: #00875A; line-height: 1.1;">$0 USD</div>
          </div>
          <div style="text-align: right; font-size: 0.78rem; color: var(--text-muted);">
            Saldo restante en cuotas hasta <strong>5 días antes</strong> de la llegada.
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 0.5rem;">
        <button type="button" class="btn-sunsol-secondary" onclick="closeModal()">Cerrar</button>
        <button type="submit" class="btn-sunsol-primary">
          <i class="fab fa-whatsapp"></i> Enviar a Asesor de Ventas Oficial
        </button>
      </div>
    </form>
  `;

  openModal("Cotización & Reserva Oficial - Sunsol Hoteles", content);

  const mCheckin = document.getElementById("modal-checkin");
  const mCheckout = document.getElementById("modal-checkout");
  if (!mCheckin.value) {
    const d = new Date();
    mCheckin.value = d.toISOString().split("T")[0];
  }
  if (!mCheckout.value) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    mCheckout.value = d.toISOString().split("T")[0];
  }

  calculateQuote();
};

window.updateModalRooms = function(hotelId) {
  const hotel = SUNSOL_DATA.hotels.find(h => h.id === hotelId);
  const roomSelect = document.getElementById("modal-room-select");
  if (!hotel || !roomSelect) return;

  roomSelect.innerHTML = hotel.rooms.map(r => `
    <option value="${r.price}" data-name="${r.name}">${r.name} - $${r.price} USD por pers./noche</option>
  `).join('');

  calculateQuote();
};

window.calculateQuote = function() {
  const hotelSelect = document.getElementById("modal-hotel-select");
  const cin = document.getElementById("modal-checkin")?.value;
  const cout = document.getElementById("modal-checkout")?.value;
  const adults = parseInt(document.getElementById("modal-adults")?.value) || 2;
  const children = parseInt(document.getElementById("modal-children")?.value) || 0;
  const roomSelect = document.getElementById("modal-room-select");
  const nightsText = document.getElementById("quote-nights-text");
  const totalPriceText = document.getElementById("quote-total-price");
  const downpaymentText = document.getElementById("quote-downpayment");
  const suplementoNotice = document.getElementById("quote-suplemento-text");
  const zarpeNote = document.getElementById("coche-zarpe-note");

  if (!cin || !cout || !roomSelect || !nightsText || !totalPriceText) return;

  const hotelId = hotelSelect?.value || "isla-caribe";
  const d1 = new Date(cin);
  const d2 = new Date(cout);
  const diffDays = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
  const pricePerAdult = parseFloat(roomSelect.value) || 90;
  const pricePerChild = pricePerAdult * 0.5; // Niños 4-10 pagan 50%

  let subtotal = (diffDays * pricePerAdult * adults) + (diffDays * pricePerChild * children);

  // SUPLEMENTO 1 NOCHE (Según Voucher Oficial Punta Blanca #55315: $50 USD si es 1 sola noche)
  let suplemento = 0;
  if (hotelId === "punta-blanca" && diffDays === 1) {
    suplemento = 50.00;
    if (suplementoNotice) suplementoNotice.style.display = "block";
  } else {
    if (suplementoNotice) suplementoNotice.style.display = "none";
  }

  if (zarpeNote) {
    zarpeNote.style.display = hotelId === "punta-blanca" ? "block" : "none";
  }

  // Servicios Adicionales (Early/Late check-out: $25 USD por persona)
  const addEarly = document.getElementById("add-early")?.checked;
  const addLate = document.getElementById("add-late")?.checked;
  let addOns = 0;
  if (addEarly) addOns += 25 * (adults + children);
  if (addLate) addOns += 25 * (adults + children);

  const total = subtotal + suplemento + addOns;
  const anticipo40 = Math.round(total * 0.40);

  nightsText.innerHTML = `<strong>${diffDays} noche(s)</strong> &bull; <strong>${adults} adulto(s)</strong>${children > 0 ? ` + <strong>${children} niño(s)</strong>` : ''} &bull; ($${pricePerAdult} USD/pers./noche)`;
  totalPriceText.textContent = `$${total.toFixed(2)} USD`;
  if (downpaymentText) downpaymentText.textContent = `$${anticipo40} USD`;
};

window.handleReservationSubmit = function(e) {
  e.preventDefault();

  const hotelSelect = document.getElementById("modal-hotel-select");
  const hotelId = hotelSelect?.value || "isla-caribe";
  const hotelName = hotelSelect?.selectedOptions[0]?.text || "Sunsol Hoteles";
  const roomSelect = document.getElementById("modal-room-select");
  const roomName = roomSelect?.selectedOptions[0]?.getAttribute("data-name") || "Habitación Estándar";
  const pricePerPerson = roomSelect?.value || "90";
  const checkin = document.getElementById("modal-checkin").value;
  const checkout = document.getElementById("modal-checkout").value;
  const adults = document.getElementById("modal-adults")?.value || "2";
  const children = document.getElementById("modal-children")?.value || "0";
  const infants = document.getElementById("modal-infants")?.value || "0";
  const name = document.getElementById("modal-name").value;
  const phone = document.getElementById("modal-phone").value;
  const total = document.getElementById("quote-total-price").textContent;
  const downpayment = document.getElementById("quote-downpayment")?.textContent || "$0 USD";

  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  const diffDays = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

  // Guardar en Supabase si está disponible
  if (supabaseClient) {
    supabaseClient.from('reservas').insert([{
      hotel_nombre: hotelName,
      habitacion: roomName,
      checkin: checkin,
      checkout: checkout,
      huespedes: parseInt(adults) + parseInt(children),
      nombre_titular: name,
      telefono_whatsapp: phone,
      total_estimado: parseFloat(total.replace(/[^0-9.]/g, '')) || 0
    }]).then(({ error }) => {
      if (error) console.error("Error al registrar en Supabase:", error);
    });
  }

  // MENSAJE OFICIAL FORMATEADO CON FORMATO EXACTO DE VOUCHER SUNSOL
  const msg = `*SUNSOL HOTELES - PROPUESTA DE COTIZACIÓN*%0A%0A` +
              `Estimado(a) *${name}*, esta propuesta corresponde a su solicitud:%0A%0A` +
              `🏨 *Hotel:* ${hotelName}%0A` +
              `🛏️ *Habitación:* ${roomName}%0A` +
              `🍽️ *Plan:* Alojamiento con PLAN TODO INCLUIDO%0A` +
              `📅 *Check-in:* ${checkin} (3:00 PM)%0A` +
              `📅 *Check-out:* ${checkout} (12:00 PM)%0A` +
              `🌙 *Noches:* ${diffDays}%0A` +
              `👥 *Huéspedes:* ${adults} Adulto(s) | ${children} Niño(s) (4-10) | ${infants} Infante(s)%0A` +
              `💵 *Tarifa:* $${pricePerPerson} USD por persona / por noche%0A` +
              (hotelId === 'punta-blanca' && diffDays === 1 ? `➕ *Suplemento 1 noche:* $50.00 USD%0A` : ``) +
              `💰 *TOTAL A PAGAR:* ${total}%0A` +
              `💳 *Reserva con el 40%:* ${downpayment}%0A` +
              `🗓️ *Saldo:* En cuotas (100% cancelado 5 días antes de la llegada)%0A` +
              `👤 *Titular:* ${name} (Tlf: ${phone})%0A` +
              `⏳ *Vigencia garantizada:* 72 horas para mantener congelada tarifa y disponibilidad.%0A%0A` +
              `¿Podrían confirmarme la disponibilidad para formalizar mi reserva? ¡Muchas gracias!`;

  // Número oficial de la asesora Luisa Franco / Reservaciones Sunsol: +58 414 7954081
  window.open(`https://wa.me/584147954081?text=${msg}`, "_blank");
  closeModal();
};

/* ==========================================================
   DETALLES DE HOTEL (INCLUSIONES OFICIALES DEL VOUCHER)
   ========================================================== */
window.openHotelDetails = function(hotelId) {
  const hotel = SUNSOL_DATA.hotels.find(h => h.id === hotelId);
  if (!hotel) return;

  const content = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="height: 280px; border-radius: var(--radius-sm); overflow: hidden;">
        <img src="${hotel.imageMain}" alt="${hotel.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span style="color: var(--sunsol-wave); font-weight: 700; font-size: 0.82rem; text-transform: uppercase;">
          <i class="fas fa-map-marker-alt"></i> ${hotel.location}
        </span>
        <h3 style="font-family: var(--font-serif); color: var(--sunsol-blue-dark); font-size: 1.8rem; margin: 0.3rem 0 0.6rem;">
          ${hotel.name}
        </h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          ${hotel.description}
        </p>
      </div>

      <!-- LA TARIFA INCLUYE (TAL COMO EN EL VOUCHER OFICIAL #55314 Y #55315) -->
      <div style="background: var(--bg-soft); padding: 1.25rem; border-radius: var(--radius-sm); border-left: 4px solid #00AA6C;">
        <h4 style="color: #0F5132; font-size: 1rem; margin-bottom: 0.75rem; text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px;">
          <i class="fas fa-check-circle" style="color: #00AA6C;"></i> La Tarifa Incluye:
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; font-size: 0.84rem; color: var(--text-main);">
          ${(hotel.tarifaIncluye || hotel.features).map(f => `
            <div style="display: flex; align-items: flex-start; gap: 0.4rem;">
              <span style="color: #D97706; font-size: 0.9rem;">&diams;</span>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- POLÍTICAS DE PAGO Y RESERVA -->
      <div style="background: #FAFCFE; border: 1px solid var(--border-color); padding: 1rem 1.25rem; border-radius: var(--radius-sm); font-size: 0.83rem;">
        <h5 style="color: var(--sunsol-blue-dark); font-weight: 700; margin-bottom: 0.4rem; text-transform: uppercase; font-size: 0.78rem;">
          <i class="fas fa-info-circle" style="color: var(--sunsol-blue);"></i> Condiciones de Pago & Reserva Sunsol
        </h5>
        <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-muted); line-height: 1.6;">
          <li><strong>Reserva con el 40%</strong> de la cotización y el saldo restante en cuotas.</li>
          <li>El 100% de la estadía debe estar cancelado <strong>5 días antes de la llegada</strong>.</li>
          <li>Early Check-in y Late Check-out disponibles por <strong>$25 USD por persona</strong>.</li>
          <li><strong>Vigencia garantizada de 72 horas</strong> para congelar tarifa y disponibilidad.</li>
        </ul>
      </div>

      <div style="background: #FFFFFF; border: 1px solid var(--border-color); padding: 1.25rem; border-radius: var(--radius-sm);">
        <h4 style="color: var(--sunsol-blue-dark); font-size: 0.95rem; margin-bottom: 0.75rem;">
          <i class="fas fa-bed" style="color: var(--sunsol-blue);"></i> Opciones de Habitación (Tarifas Por Persona / Por Noche)
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          ${hotel.rooms.map(r => `
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-soft); padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid var(--border-light);">
              <div>
                <strong style="color: var(--sunsol-blue-dark); font-size: 0.92rem;">${r.name}</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted);"><i class="fas fa-user-friends"></i> Capacidad: ${r.capacity}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.25rem; font-weight: 800; color: var(--sunsol-blue); line-height: 1.1;">$${r.price} USD</div>
                <div style="font-size: 0.72rem; font-weight: 700; color: var(--sunsol-wave); text-transform: uppercase;">Por persona / noche</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 1rem;">
        <button class="btn-sunsol-secondary" onclick="closeModal()">Cerrar</button>
        <button class="btn-sunsol-primary" onclick="openBookingModal('${hotel.id}')">
          Cotizar Estadía
        </button>
      </div>
    </div>
  `;

  openModal(hotel.name, content);
};

/* ==========================================================
   WEB CHECK-IN
   ========================================================== */
window.openWebCheckInModal = function() {
  const content = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.5;">
        Agiliza tu llegada al resort registrando tus datos de reserva previamente:
      </p>

      <form onsubmit="handleWebCheckInSubmit(event)" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-field-group">
            <label>Código de Reserva</label>
            <input type="text" id="checkin-code" class="input-clean" placeholder="Ej. SUN-12345" required>
          </div>
          <div class="form-field-group">
            <label>Documento de Identidad</label>
            <input type="text" id="checkin-doc" class="input-clean" placeholder="Cédula o Pasaporte" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-field-group">
            <label>Hotel</label>
            <select id="checkin-hotel" class="input-clean" required>
              <option value="Sunsol Isla Caribe">Sunsol Isla Caribe</option>
              <option value="Sunsol Punta Blanca">Sunsol Punta Blanca (Coche)</option>
              <option value="Sunsol Ecoland">Sunsol Ecoland</option>
              <option value="Sunsol Unik">Sunsol Unik</option>
            </select>
          </div>
          <div class="form-field-group">
            <label>Fecha de Llegada</label>
            <input type="date" id="checkin-date" class="input-clean" required>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
          <button type="button" class="btn-sunsol-secondary" onclick="closeModal()">Cancelar</button>
          <button type="submit" class="btn-sunsol-primary">Completar Check-In</button>
        </div>
      </form>
    </div>
  `;

  openModal("Web Check-In Digital - Sunsol Hoteles", content);
};

window.handleWebCheckInSubmit = function(e) {
  e.preventDefault();
  const codigo = document.getElementById("checkin-code")?.value || "";
  const doc = document.getElementById("checkin-doc")?.value || "";
  const hotel = document.getElementById("checkin-hotel")?.value || "";
  const fecha = document.getElementById("checkin-date")?.value || "";

  if (supabaseClient) {
    supabaseClient.from('web_checkin').insert([{
      codigo_reserva: codigo,
      documento_titular: doc,
      hotel_destino: hotel,
      fecha_llegada: fecha
    }]).then(({ error }) => {
      if (error) console.error("Error al registrar web check-in:", error);
      else console.log("¡Web Check-in guardado en Supabase!");
    });
  }

  alert(`¡Web Check-in registrado exitosamente para el código ${codigo}! Nos vemos pronto en Sunsol.`);
  closeModal();
};

/* ==========================================================
   DAY PASS
   ========================================================== */
window.openDayPassModal = function() {
  const content = `
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6;">
        Disfruta de un día de sol, piscinas, playa, buffet y barra abierta en nuestros hoteles (9:00 AM a 5:00 PM).
      </p>

      <form onsubmit="handleDayPassSubmit(event)" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-field-group">
            <label>Destino Day Pass</label>
            <select id="dp-destination" class="input-clean">
              <option>Isla de Coche (Sunsol Punta Blanca con lancha)</option>
              <option>Sunsol Ecoland (Playa Puerto Cruz)</option>
              <option>Sunsol Isla Caribe (Playa El Tirano)</option>
            </select>
          </div>
          <div class="form-field-group">
            <label>Fecha Deseada</label>
            <input type="date" id="dp-date" class="input-clean" required>
          </div>
        </div>

        <div class="form-field-group">
          <label>Personas</label>
          <select id="dp-guests" class="input-clean">
            <option>2 Personas</option>
            <option>3 Personas</option>
            <option>4 Personas</option>
            <option>5 o más personas</option>
          </select>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem;">
          <button type="button" class="btn-sunsol-secondary" onclick="closeModal()">Cancelar</button>
          <button type="submit" class="btn-sunsol-primary">
            <i class="fab fa-whatsapp"></i> Consultar Disponibilidad
          </button>
        </div>
      </form>
    </div>
  `;

  openModal("Sunsol Day Pass", content);
};

window.handleDayPassSubmit = function(e) {
  e.preventDefault();
  const dest = document.getElementById("dp-destination")?.value;
  const date = document.getElementById("dp-date")?.value;
  const guests = document.getElementById("dp-guests")?.value;

  const msg = `¡Hola Sunsol Hoteles! 👋 Deseo solicitar información para un *DAY PASS*:%0A%0A` +
              `📍 *Destino:* ${dest}%0A` +
              `📅 *Fecha:* ${date}%0A` +
              `👥 *Personas:* ${guests}%0A%0A` +
              `¿Tienen cupos disponibles? ¡Gracias!`;

  window.open(`https://wa.me/584123007867?text=${msg}`, "_blank");
  closeModal();
};

window.handleCleanSearch = function(e) {
  e.preventDefault();
  const hotel = document.getElementById("clean-hotel")?.value;
  openBookingModal(hotel);
};

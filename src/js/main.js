// ==========================================================
// SUNSOL HOTELES - LÓGICA MINIMALISTA & ELEGANTE
// ==========================================================

// Protección de código e inspección de página
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
    (e.ctrlKey && (e.key === "U" || e.key === "u"))
  ) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroSlider();
  initBookingDates();
  renderHotels();
  renderGallery('all');
  initGalleryFilters();
  initLightbox();
  initModalListeners();
  initResortMap();
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
    <article class="hotel-luxury-card" onclick="window.location.href='${pageUrl}'" style="cursor: pointer;">
      <div class="hotel-card-image-wrap">
        <a href="${pageUrl}"><img src="${h.imageMain}" alt="${h.name}" loading="lazy"></a>
      </div>
      <div class="hotel-card-details-box">
        <div class="hotel-card-meta-row">
          <span class="hotel-location-badge"><i class="fas fa-map-marker-alt"></i> ${h.region}</span>
          <span class="hotel-plan-badge">${h.planType}</span>
        </div>
        <h3 class="hotel-title-text"><a href="${pageUrl}" style="color: inherit;">${h.name}</a></h3>
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
          <i class="fas fa-plus-circle" style="color: var(--sunsol-blue);"></i> Servicios Opcionales ($25 Adulto / $15 Niño &bull; Infantes Gratis)
        </span>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-main);">
            <input type="checkbox" id="add-early" onchange="calculateQuote()"> Early Check-in ($25 Ad. / $15 Niño)
          </label>
          <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-main);">
            <input type="checkbox" id="add-late" onchange="calculateQuote()"> Late Check-out ($25 Ad. / $15 Niño)
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

      <div class="modal-footer-harmonized">
        <button type="button" class="btn-modal-close" onclick="closeModal()">
          <i class="fas fa-times"></i> Cerrar
        </button>
        <div class="modal-actions-right">
          <button type="button" id="btn-download-pdf" class="btn-modal-pdf" onclick="downloadVoucherPDF(event)">
            <i class="fas fa-file-pdf" style="color: #E11D48; font-size: 1.05rem;"></i> Descargar Voucher PDF
          </button>
          <button type="submit" class="btn-modal-submit">
            <i class="fab fa-whatsapp" style="color: #25D366; font-size: 1.15rem;"></i> Enviar a Asesor de Ventas Oficial
          </button>
        </div>
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

  // Servicios Adicionales (Early/Late check-out: $25 USD Adulto, $15 USD Niño de 4 a 10 años, Infantes gratis)
  const addEarly = document.getElementById("add-early")?.checked;
  const addLate = document.getElementById("add-late")?.checked;
  let addOns = 0;
  if (addEarly) addOns += (25 * adults) + (15 * children);
  if (addLate) addOns += (25 * adults) + (15 * children);

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

  // Servicios Adicionales en el mensaje
  const addEarly = document.getElementById("add-early")?.checked;
  const addLate = document.getElementById("add-late")?.checked;
  let addOnsMsg = '';
  const numAdults = parseInt(adults) || 2;
  const numChildren = parseInt(children) || 0;
  if (addEarly) {
    const earlyCost = (25 * numAdults) + (15 * numChildren);
    addOnsMsg += `➕ *Early Check-in:* $${earlyCost} USD ($25 Ad. / $15 Niño)%0A`;
  }
  if (addLate) {
    const lateCost = (25 * numAdults) + (15 * numChildren);
    addOnsMsg += `➕ *Late Check-out:* $${lateCost} USD ($25 Ad. / $15 Niño)%0A`;
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
              addOnsMsg +
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
   EXPORTACIÓN OFICIAL DE VOUCHER DE COTIZACIÓN EN PDF
   (Basado en vouchers oficiales Sunsol #55314 y #55315)
   ========================================================== */
window.downloadVoucherPDF = function(event) {
  if (event) event.preventDefault();

  const hotelSelect = document.getElementById("modal-hotel-select");
  if (!hotelSelect) return;

  const hotelId = hotelSelect.value;
  const hotel = SUNSOL_DATA.hotels.find(h => h.id === hotelId) || SUNSOL_DATA.hotels[0];
  const roomSelect = document.getElementById("modal-room-select");
  const roomName = roomSelect?.selectedOptions[0]?.getAttribute("data-name") || "Habitación Estándar";
  const pricePerPerson = parseFloat(roomSelect?.value) || 90;

  const cin = document.getElementById("modal-checkin")?.value || new Date().toISOString().split("T")[0];
  const cout = document.getElementById("modal-checkout")?.value || new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const adults = parseInt(document.getElementById("modal-adults")?.value) || 2;
  const children = parseInt(document.getElementById("modal-children")?.value) || 0;
  const infants = parseInt(document.getElementById("modal-infants")?.value) || 0;

  let name = document.getElementById("modal-name")?.value.trim();
  if (!name) name = "DAYMARIS RODRÍGUEZ";
  let phone = document.getElementById("modal-phone")?.value.trim();
  if (!phone) phone = "+58 414 000 0000";

  const d1 = new Date(cin);
  const d2 = new Date(cout);
  const diffDays = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));

  const subtotalRoom = (diffDays * pricePerPerson * adults) + (diffDays * (pricePerPerson * 0.5) * children);

  let suplemento = 0;
  if (hotelId === "punta-blanca" && diffDays === 1) {
    suplemento = 50.00;
  }

  const addEarly = document.getElementById("add-early")?.checked;
  const addLate = document.getElementById("add-late")?.checked;
  let addOns = 0;
  let addOnsArr = [];
  if (addEarly) {
    const earlyCost = (25 * adults) + (15 * children);
    addOns += earlyCost;
    const desc = children > 0 
      ? `Early Check-in ($${earlyCost} USD - ${adults} ad. x $25 + ${children} niñ. x $15)` 
      : `Early Check-in ($${earlyCost} USD - ${adults} ad. x $25)`;
    addOnsArr.push(desc);
  }
  if (addLate) {
    const lateCost = (25 * adults) + (15 * children);
    addOns += lateCost;
    const desc = children > 0 
      ? `Late Check-out ($${lateCost} USD - ${adults} ad. x $25 + ${children} niñ. x $15)` 
      : `Late Check-out ($${lateCost} USD - ${adults} ad. x $25)`;
    addOnsArr.push(desc);
  }

  const total = subtotalRoom + suplemento + addOns;
  const anticipo40 = Math.round(total * 0.40);
  const saldo60 = total - anticipo40;

  const quoteCode = `5531${Math.floor(4 + Math.random() * 5)}`;
  const now = new Date();
  const fechaEmision = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const limitDate = new Date(now.getTime() + (72 * 60 * 60 * 1000));
  const fechaLimite = `${String(limitDate.getDate()).padStart(2, '0')}/${String(limitDate.getMonth() + 1).padStart(2, '0')}/${limitDate.getFullYear()}`;

  const formatD = (str) => {
    if (!str) return '';
    const parts = str.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return str;
  };

  let inclusionsHTML = '';
  if (hotelId === 'punta-blanca') {
    inclusionsHTML = `
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-ship" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Horario de zarpes:</strong> Yaque-Coche 14:30 | Coche-Yaque 13:00</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-water" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Traslado marítimo:</strong> Lanchas ida y vuelta incluidas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-utensils" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Alojamiento:</strong> PLAN TODO INCLUIDO</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-clock" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Horarios:</strong> Check-in: 3:00 PM | Check-out: 12:00 PM</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-hamburger" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Comidas:</strong> Desayuno, almuerzo, cena buffet y snacks</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-cocktail" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Bar abierto:</strong> Bebidas alcohólicas y no alcohólicas ilimitadas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-swimming-pool" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Piscina:</strong> 1 piscina con borde infinito</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-umbrella-beach" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Playa La Punta:</strong> Club de playa con toldos y tumbonas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-volleyball-ball" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Actividades recreativas:</strong> Diarias en piscina y playa</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-child" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Entretenimiento:</strong> Parque infantil & Discoteca</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-wifi" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Conectividad:</strong> Wifi en áreas comunes</span></div>
    `;
  } else if (hotelId === 'isla-caribe') {
    inclusionsHTML = `
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-utensils" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Alojamiento:</strong> PLAN TODO INCLUIDO</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-clock" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Horarios:</strong> Check-in: 3:00 PM | Check-out: 12:00 PM</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-concierge-bell" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Comidas:</strong> Tipo buffet (desayuno, almuerzo, cena)</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-pizza-slice" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Snacks:</strong> Meriendas caribeñas continuas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-cocktail" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Bebidas nacionales:</strong> Ilimitadas con y sin alcohol</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-swimming-pool" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>3 Piscinas:</strong> Temáticas con bar mojado</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-umbrella-beach" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Club de Playa:</strong> Privado en Playa El Tirano</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-child" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Familia:</strong> Parque infantil & Discoteca / Teatro</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-volleyball-ball" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Deportes:</strong> Cancha de voleibol & Gimnasio</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-wifi" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Conectividad:</strong> Wifi en áreas comunes</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-calendar-check" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Animación:</strong> Actividades recreativas diarias</span></div>
    `;
  } else if (hotelId === 'ecoland') {
    inclusionsHTML = `
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-utensils" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Alojamiento:</strong> PLAN TODO INCLUIDO</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-clock" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Horarios:</strong> Check-in: 3:00 PM | Check-out: 12:00 PM</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-water" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Laguna Natural:</strong> Navegable con botes de pedal</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-swimming-pool" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>4 Piscinas:</strong> Temáticas familiares y aqua bar</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-umbrella-beach" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Playa Puerto Cruz:</strong> Salida directa y club de playa</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-concierge-bell" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Gastronomía:</strong> Buffet internacional y snacks continuos</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-cocktail" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Bebidas:</strong> Licores y cócteles nacionales ilimitados</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-table-tennis" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Deportes:</strong> Canchas de tenis, golfito y básquet</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-hiking" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Entorno:</strong> Dunas, senderos ecológicos y miradores</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-wifi" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Conectividad:</strong> Wifi en lobby y áreas comunes</span></div>
    `;
  } else {
    inclusionsHTML = `
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-concierge-bell" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Plan Elegido:</strong> Desayuno Buffet o Todo Incluido</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-clock" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Horarios:</strong> Check-in: 3:00 PM | Check-out: 12:00 PM</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-swimming-pool" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Rooftop Pool:</strong> Piscina infinita con vista a la bahía</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-glass-martini-alt" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Rooftop Lounge:</strong> Coctelería de autor y tapas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-shopping-bag" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Parque Costazul:</strong> Acceso peatonal directo al mall</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-dumbbell" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Fitness Center:</strong> Gimnasio equipado de última generación</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-briefcase" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Business Center:</strong> Salas de conferencias ejecutivas</span></div>
      <div style="display: flex; align-items: baseline; gap: 7px;"><i class="fas fa-wifi" style="color: #22417C; width: 13px; text-align: center; font-size: 10px;"></i> <span><strong>Fibra Óptica:</strong> Internet Wi-Fi de alta velocidad</span></div>
    `;
  }

  let hotelAddress = "Carretera Costanera, Sector Playa El Tirano, Isla de Margarita, Venezuela.";
  if (hotelId === 'punta-blanca') hotelAddress = "Playa La Punta, Isla de Coche, Estado Nueva Esparta, Venezuela.";
  if (hotelId === 'ecoland') hotelAddress = "Bahía de Puerto Cruz, Vía Pedro González, Isla de Margarita, Venezuela.";
  if (hotelId === 'unik') hotelAddress = "Av. Jóvito Villalba, CC Parque Costazul, Pampatar, Isla de Margarita, Venezuela.";

  let hotelImage = "assets/images/isla-caribe-hero.jpg";
  if (hotelId === 'punta-blanca') hotelImage = "assets/images/punta-blanca-hero.jpg";
  if (hotelId === 'ecoland') hotelImage = "assets/images/ecoland-hero.jpg";
  if (hotelId === 'unik') hotelImage = "assets/images/unik-hero.jpg";

  const voucherData = {
    code: quoteCode,
    fechaEmision: fechaEmision,
    fechaLimite: fechaLimite,
    hotelName: hotel.name.toUpperCase(),
    hotelRegion: hotel.region,
    hotelLocation: hotel.location,
    hotelDescription: hotel.description,
    hotelAddress: hotelAddress,
    hotelImage: hotelImage,
    roomName: roomName.toUpperCase(),
    pricePerPerson: pricePerPerson,
    checkin: formatD(cin),
    checkout: formatD(cout),
    diffDays: diffDays,
    adults: adults,
    children: children,
    infants: infants,
    subtotalRoom: subtotalRoom,
    suplemento: suplemento,
    addOns: addOns,
    addOnsText: addOnsArr.join(' & '),
    total: total,
    anticipo40: anticipo40,
    saldo60: saldo60,
    guestName: name.toUpperCase(),
    guestPhone: phone,
    advisorName: "LUISA FRANCO",
    advisorEmail: "reservaciones4@sunsolhoteles.com",
    advisorPhone: "+58 414-7954081",
    inclusionsHTML: inclusionsHTML
  };

  const container = document.createElement("div");
  container.id = "temp-voucher-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "800px";
  container.style.zIndex = "-99999";
  container.style.opacity = "1";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";
  container.innerHTML = generateVoucherDocumentHTML(voucherData);
  document.body.appendChild(container);

  const btn = document.getElementById("btn-download-pdf");
  const originalText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Generando PDF...`;
    btn.disabled = true;
  }

  const elementToPrint = container.firstElementChild;

  const cleanup = () => {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    if (btn) {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  };

  // Pre-cargar imágenes para asegurar que no se renderice en blanco
  const images = Array.from(elementToPrint.querySelectorAll("img"));
  const imgPromises = images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
    });
  });

  Promise.all(imgPromises).then(() => {
    setTimeout(() => {
      if (window.html2pdf) {
        const opt = {
          margin:       [4, 4, 4, 4],
          filename:     `Voucher-Cotizacion-Sunsol-${hotelId}-${quoteCode}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  {
            scale: 2,
            useCORS: true,
            logging: false,
            scrollX: 0,
            scrollY: 0,
            x: 0,
            y: 0,
            width: 800,
            windowWidth: 800
          },
          jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' },
          pagebreak:    { mode: 'avoid-all' }
        };

        window.html2pdf().set(opt).from(elementToPrint).save().then(() => {
          cleanup();
        }).catch(err => {
          console.warn("Fallo html2pdf, usando fallback de impresión:", err);
          printVoucherFallback(elementToPrint.innerHTML);
          cleanup();
        });
      } else {
        printVoucherFallback(elementToPrint.innerHTML);
        cleanup();
      }
    }, 150);
  });
};

function generateVoucherDocumentHTML(data) {
  return `
    <div style="width: 800px; height: 1010px; min-height: 1010px; max-height: 1010px; box-sizing: border-box; background: #FFFFFF; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; padding: 20px 24px; position: relative; border: 1px solid #CBD5E1; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden;">
      
      <!-- TOP LUXURY BRAND BAR -->
      <div style="height: 5px; background: linear-gradient(90deg, #152A50 0%, #22417C 35%, #0284C7 70%, #D97706 100%); margin: -20px -24px 0 -24px;"></div>

      <!-- HEADER BRAND & VOUCHER TITLE -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <img src="assets/images/logo-sunsol-clean.png" alt="Sunsol Hoteles" style="height: 48px; width: auto; object-fit: contain;">
          <div>
            <div style="font-size: 10.5px; font-weight: 800; letter-spacing: 1.5px; color: #152A50; text-transform: uppercase;">SUNSOL HOTELES &bull; CADENA HOTELERA OFICIAL</div>
            <div style="font-size: 11px; color: #64748B; font-weight: 500; margin-top: 2px;">Isla de Margarita &bull; Isla de Coche &bull; Venezuela</div>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="background: #152A50; color: #FFFFFF; font-size: 9.5px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.5px; display: inline-block;">
            DOCUMENTO OFICIAL DE VIAJE
          </span>
          <div style="font-size: 18px; font-weight: 800; color: #152A50; margin-top: 3px; letter-spacing: -0.3px;">
            Cotización #${data.code}
          </div>
          <div style="font-size: 10.5px; color: #64748B; margin-top: 1px;">
            Emisión: <strong>${data.fechaEmision}</strong> &bull; Válido por 72 Horas
          </div>
        </div>
      </div>

      <!-- GUEST & ADVISOR BAR -->
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 11px 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <span style="font-size: 9px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.6px; display: block;">Huésped Titular</span>
          <div style="display: flex; align-items: baseline; gap: 8px; margin-top: 2px;">
            <strong style="color: #0F172A; font-size: 13.5px; font-weight: 800;">${data.guestName}</strong>
            <span style="font-size: 10.5px; color: #64748B;">${data.guestPhone}</span>
          </div>
        </div>
        <div style="text-align: center; border-left: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; padding: 0 16px;">
          <span style="font-size: 9px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.6px; display: block;">Asesor Oficial Sunsol</span>
          <strong style="color: #1E40AF; font-size: 12.5px; font-weight: 700; display: block; margin-top: 2px;">${data.advisorName}</strong>
          <span style="font-size: 10px; color: #64748B;">${data.advisorPhone}</span>
        </div>
        <div style="text-align: right;">
          <div style="background: #ECFDF5; border: 1px solid #A7F3D0; color: #047857; font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fas fa-shield-alt" style="color: #10B981;"></i> Tarifa Congelada (72h)
          </div>
          <div style="font-size: 9.5px; color: #059669; font-weight: 700; margin-top: 3px;">
            Vigente hasta: ${data.fechaLimite}
          </div>
        </div>
      </div>

      <!-- HOTEL SHOWCASE ROW -->
      <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 13px 16px; align-items: center;">
        <div>
          <div style="display: inline-block; background: #EFF6FF; color: #1D4ED8; font-size: 9.5px; font-weight: 800; padding: 3px 9px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">
            ${data.hotelRegion} &bull; PLAN TODO INCLUIDO
          </div>
          <h2 style="font-size: 20px; font-weight: 800; color: #0F224A; margin: 0 0 3px 0; letter-spacing: -0.3px;">
            ${data.hotelName}
          </h2>
          <div style="font-size: 11px; color: #0284C7; font-weight: 600; margin-bottom: 6px;">
            <i class="fas fa-map-marker-alt"></i> ${data.hotelLocation} &bull; Acceso y Servicios Exclusivos
          </div>
          <p style="font-size: 10.5px; color: #475569; line-height: 1.45; margin: 0;">
            ${data.hotelDescription}
          </p>
        </div>

        <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1.5px solid #CBD5E1; height: 135px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <img src="${data.hotelImage}" alt="${data.hotelName}" style="width: 100%; height: 100%; object-fit: cover;">
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(15,23,42,0.88)); padding: 6px 10px; color: #FFFFFF; font-size: 9.5px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
            <span><i class="fas fa-check-circle" style="color: #34D399; margin-right: 4px;"></i> Instalaciones Oficiales</span>
            <span style="color: #FBBF24; letter-spacing: 1px;">★★★★★</span>
          </div>
        </div>
      </div>

      <!-- LA TARIFA INCLUYE (2 COLUMNS CHECKLIST) -->
      <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <div style="background: #152A50; color: #FFFFFF; padding: 7px 14px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center;">
          <span><i class="fas fa-concierge-bell" style="color: #FBBF24; margin-right: 6px;"></i> LA TARIFA INCLUYE &bull; SERVICIOS & BENEFICIOS</span>
          <span style="background: rgba(255,255,255,0.18); color: #E0F2FE; font-size: 9px; font-weight: 700; padding: 2px 9px; border-radius: 12px;">TODO INCLUIDO ILIMITADO</span>
        </div>
        <div style="padding: 10px 14px; background: #FAFCFE;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; font-size: 10px; line-height: 1.42; color: #334155;">
            ${data.inclusionsHTML}
          </div>
        </div>
      </div>

      <!-- DETALLE DE HABITACIÓN & LIQUIDACIÓN -->
      <div style="border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">
          <thead>
            <tr style="background: #F1F5F9; color: #334155; font-weight: 800; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #CBD5E1;">
              <th style="padding: 8px 14px;">Habitación & Régimen</th>
              <th style="padding: 8px 14px;">Fechas / Horarios</th>
              <th style="padding: 8px 14px; text-align: center;">Huéspedes & Noches</th>
              <th style="padding: 8px 14px; text-align: right;">Total USD</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #F1F5F9;">
              <td style="padding: 9px 14px;">
                <strong style="color: #0F224A; display: block; font-size: 12px; font-weight: 800;">${data.hotelName}</strong>
                <span style="color: #64748B; font-size: 10.5px;">${data.roomName} &bull; $${data.pricePerPerson} USD/pers./noche</span>
              </td>
              <td style="padding: 9px 14px;">
                <div style="font-size: 10.5px;"><strong>In:</strong> ${data.checkin} (3:00 PM)</div>
                <div style="font-size: 10.5px;"><strong>Out:</strong> ${data.checkout} (12:00 PM)</div>
              </td>
              <td style="padding: 9px 14px; text-align: center;">
                <strong style="font-size: 11.5px; color: #0F172A;">${data.diffDays} Noche(s)</strong><br>
                <span style="color: #64748B; font-size: 10px;">${data.adults} Adulto(s)${data.children > 0 ? ` + ${data.children} Niño(s)` : ''}</span>
              </td>
              <td style="padding: 9px 14px; text-align: right; font-weight: 800; font-size: 13px; color: #0F224A;">
                $${data.subtotalRoom.toFixed(2)} USD
              </td>
            </tr>
            ${data.suplemento > 0 ? `
            <tr style="border-bottom: 1px solid #F1F5F9; background: #FFFBEB;">
              <td style="padding: 7px 14px; color: #B45309;" colspan="3">
                <strong><i class="fas fa-info-circle"></i> Suplemento 1 Noche Coche:</strong> Cargo operacional estadía de 1 sola noche
              </td>
              <td style="padding: 7px 14px; text-align: right; font-weight: 800; color: #B45309;">
                +$${data.suplemento.toFixed(2)} USD
              </td>
            </tr>` : ''}
            ${data.addOns > 0 ? `
            <tr style="border-bottom: 1px solid #F1F5F9; background: #F8FAFC;">
              <td style="padding: 7px 14px; color: #334155;" colspan="3">
                <strong>Servicios Adicionales:</strong> ${data.addOnsText}
              </td>
              <td style="padding: 7px 14px; text-align: right; font-weight: 800; color: #334155;">
                +$${data.addOns.toFixed(2)} USD
              </td>
            </tr>` : ''}
          </tbody>
        </table>
      </div>

      <!-- TOTAL A PAGAR & PLAN EN CUOTAS 40% -->
      <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 14px;">
        <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: 8px; padding: 11px 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px dashed #CBD5E1; padding-bottom: 4px;">
            <span style="font-size: 10px; color: #64748B; font-weight: 600;">Subtotal de la Estadía:</span>
            <strong style="font-size: 11px; color: #1E293B;">$${data.total.toFixed(2)} USD</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 5px;">
            <span style="font-size: 11px; color: #0F224A; font-weight: 800; text-transform: uppercase;">TOTAL GENERAL:</span>
            <strong style="font-size: 21px; color: #152A50; font-weight: 800; letter-spacing: -0.5px;">$${data.total.toFixed(2)} USD</strong>
          </div>
        </div>

        <div style="background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 8px; padding: 11px 16px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 9px; font-weight: 800; color: #15803D; text-transform: uppercase; letter-spacing: 0.6px; display: block;">INICIAL PARA RESERVAR (40%)</span>
            <div style="font-size: 21px; font-weight: 800; color: #16A34A; line-height: 1.1; letter-spacing: -0.5px;">
              $${data.anticipo40.toFixed(2)} USD
            </div>
            <span style="font-size: 9.5px; font-weight: 700; color: #15803D;">Congela tu tarifa hoy mismo</span>
          </div>
          <div style="text-align: right; max-width: 185px;">
            <div style="font-size: 10px; color: #166534; font-weight: 800;">SALDO 60%: $${data.saldo60.toFixed(2)} USD</div>
            <div style="font-size: 9.5px; color: #15803D; line-height: 1.35; margin-top: 2px;">
              Cancela en cuotas sin intereses hasta <strong>5 días antes</strong> de tu llegada.
            </div>
          </div>
        </div>
      </div>

      <!-- CLAUSULA DE VIGENCIA 72 HORAS -->
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-left: 4px solid #1D4ED8; border-radius: 8px; padding: 9px 14px; font-size: 10px; line-height: 1.45; color: #1E3A8A;">
        <strong><i class="fas fa-shield-alt" style="color: #1D4ED8; margin-right: 5px;"></i> Garantía de Tarifa Congelada por 72 Horas:</strong> Con el fin de brindarle total tranquilidad en la planificación de su viaje, esta propuesta cuenta con una vigencia garantizada de 72 horas a partir de su emisión. Durante este lapso, el sistema mantendrá congelada tanto la tarifa como la disponibilidad. Para validar, abone el 40% antes del <strong>${data.fechaLimite}</strong>.
      </div>

      <!-- FOOTER & OFFICIAL ADVISOR CONTACT -->
      <div style="border-top: 1.5px solid #E2E8F0; padding-top: 9px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #475569;">
        <div>
          <div style="color: #0F172A; font-weight: 700;">
            <i class="fab fa-whatsapp" style="color: #16A34A; margin-right: 3px;"></i> WhatsApp: <strong>${data.advisorPhone}</strong> &bull; <i class="fas fa-envelope" style="color: #22417C; margin-left: 6px; margin-right: 3px;"></i> Email: <strong>${data.advisorEmail}</strong>
          </div>
          <div style="color: #64748B; font-size: 9.5px; margin-top: 2px;">
            <strong>Ubicación:</strong> ${data.hotelAddress}
          </div>
        </div>
        <div style="text-align: right;">
          <span style="background: #E2E8F0; color: #334155; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px;">DOCUMENTO OFICIAL VALIDADOR</span>
          <div style="font-style: italic; color: #152A50; font-weight: 600; font-size: 9.5px; margin-top: 2px;">
            "Creando momentos inolvidables en Venezuela"
          </div>
        </div>
      </div>
    </div>
  `;
}

function printVoucherFallback(htmlContent) {
  const printWin = window.open('', '_blank', 'width=900,height=800');
  if (!printWin) {
    alert("Por favor habilita las ventanas emergentes (popups) en tu navegador para imprimir el voucher.");
    return;
  }
  printWin.document.open();
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Voucher Oficial de Cotización - Sunsol Hoteles</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          @page { size: letter portrait; margin: 6mm; }
          body { margin: 0; padding: 0; background: #FFFFFF; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        </style>
      </head>
      <body>
        ${htmlContent}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          };
        </script>
      </body>
    </html>
  `);
  printWin.document.close();
}

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
          <li>Early Check-in y Late Check-out disponibles por <strong>$25 USD Adultos / $15 USD Niños</strong> (Infantes gratis).</li>
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

/* ==========================================================
   COMPONENTE: MAPA INTERACTIVO DE ZONAS RESORT (UNIFICADO)
   ========================================================== */
function initResortMap() {
  const tabs = document.querySelectorAll(".map-tab-btn");
  const canvas = document.getElementById("mapCanvas");
  const viewport = document.getElementById("mapViewport");
  const popup = document.getElementById("mapInfoPopup");
  const zoomInBtn = document.getElementById("mapZoomIn");
  const zoomOutBtn = document.getElementById("mapZoomOut");
  const zoomResetBtn = document.getElementById("mapZoomReset");
  const hotspots = document.querySelectorAll(".map-hotspot");

  if (!canvas || !hotspots.length) return;

  // Coordenadas óptimas de Pan & Zoom para cada zona
  const zoneTransforms = {
    general: { scale: 1, x: 0, y: 0 },
    oasis:   { scale: 2.05, x: 8, y: 4 },    // Sport Club, Tenis, Pádel, Piscina Oasis, Bar Uvas
    dunas:   { scale: 1.95, x: 25, y: -6 },  // Villas Dunas, Lobby, Eco Espejo, Teatro
    laguna:  { scale: 1.95, x: -19, y: -15 } // Manglar, Botes de pedal, Torres Laguna, Tilapia
  };

  let currentScale = 1;
  let currentX = 0;
  let currentY = 0;
  let currentZone = "general";

  function applyTransform(scale, x, y, smooth = true) {
    currentScale = Math.max(1, Math.min(3.2, scale));
    currentX = currentScale === 1 ? 0 : x;
    currentY = currentScale === 1 ? 0 : y;

    canvas.style.transition = smooth ? "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)" : "none";
    canvas.style.transform = `scale(${currentScale}) translate(${currentX}%, ${currentY}%)`;
  }

  function filterHotspots(targetZone) {
    hotspots.forEach(hotspot => {
      const pinZone = hotspot.getAttribute("data-zone");
      if (targetZone === "general" || pinZone === targetZone) {
        hotspot.classList.remove("is-dimmed");
        if (targetZone !== "general") {
          hotspot.classList.add("is-focused");
        } else {
          hotspot.classList.remove("is-focused");
        }
      } else {
        hotspot.classList.add("is-dimmed");
        hotspot.classList.remove("is-focused");
      }
    });
  }

  // 1. Alternancia de Áreas con Transición y Zoom Suave
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetZone = tab.getAttribute("data-zone") || "general";
      currentZone = targetZone;

      tabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const cfg = zoneTransforms[targetZone] || zoneTransforms.general;
      applyTransform(cfg.scale, cfg.x, cfg.y, true);
      filterHotspots(targetZone);

      // Cerrar tarjeta al cambiar de zona principal
      if (popup) popup.classList.remove("active");
      hotspots.forEach(h => h.classList.remove("active"));
    });
  });

  // 2. Controles de Zoom Manual (+ / - / Reset)
  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      applyTransform(currentScale + 0.35, currentX, currentY, true);
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      const newScale = currentScale - 0.35;
      if (newScale <= 1.05) {
        // Volver a vista general
        const generalTab = document.querySelector('.map-tab-btn[data-zone="general"]');
        if (generalTab) generalTab.click();
        else {
          applyTransform(1, 0, 0, true);
          filterHotspots("general");
        }
      } else {
        applyTransform(newScale, currentX, currentY, true);
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener("click", () => {
      const generalTab = document.querySelector('.map-tab-btn[data-zone="general"]');
      if (generalTab) {
        generalTab.click();
      } else {
        applyTransform(1, 0, 0, true);
        filterHotspots("general");
      }
    });
  }

  // 3. Arrastre Suave del Mapa (Drag & Pan cuando el mapa está con zoom)
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startTransX = 0;
  let startTransY = 0;

  if (viewport) {
    viewport.addEventListener("mousedown", (e) => {
      if (currentScale <= 1 || e.target.closest(".map-hotspot") || e.target.closest(".map-info-popup") || e.target.closest(".map-zoom-controls")) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startTransX = currentX;
      startTransY = currentY;
      canvas.style.transition = "none";
      viewport.style.cursor = "grabbing";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = (e.clientX - startX) / (viewport.offsetWidth * currentScale) * 100;
      const dy = (e.clientY - startY) / (viewport.offsetHeight * currentScale) * 100;
      const limit = 40;
      currentX = Math.max(-limit, Math.min(limit, startTransX + dx));
      currentY = Math.max(-limit, Math.min(limit, startTransY + dy));
      canvas.style.transform = `scale(${currentScale}) translate(${currentX}%, ${currentY}%)`;
    });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      viewport.style.cursor = "";
      canvas.style.transition = "transform 0.4s ease-out";
    });

    // Soporte táctil en móviles
    viewport.addEventListener("touchstart", (e) => {
      if (currentScale <= 1 || e.touches.length !== 1 || e.target.closest(".map-hotspot") || e.target.closest(".map-info-popup")) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startTransX = currentX;
      startTransY = currentY;
      canvas.style.transition = "none";
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - startX) / (viewport.offsetWidth * currentScale) * 100;
      const dy = (e.touches[0].clientY - startY) / (viewport.offsetHeight * currentScale) * 100;
      const limit = 40;
      currentX = Math.max(-limit, Math.min(limit, startTransX + dx));
      currentY = Math.max(-limit, Math.min(limit, startTransY + dy));
      canvas.style.transform = `scale(${currentScale}) translate(${currentX}%, ${currentY}%)`;
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      canvas.style.transition = "transform 0.4s ease-out";
    });
  }

  // 4. Interacción con Marcadores (Hotspots) y Tarjeta Informativa Flotante
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = hotspot.getAttribute("data-title") || "Punto de Interés";
      const desc = hotspot.getAttribute("data-desc") || "Instalación oficial de Sunsol Ecoland.";
      const category = hotspot.getAttribute("data-category") || "Amenidad";
      const badge = hotspot.getAttribute("data-badge") || category;
      const icon = hotspot.getAttribute("data-icon") || "fa-map-pin";
      const img = hotspot.getAttribute("data-img") || "assets/images/ecoland-main.jpg";
      const hotelId = hotspot.getAttribute("data-hotel") || "ecoland";

      // Resaltar marcador activo
      hotspots.forEach(h => h.classList.remove("active"));
      hotspot.classList.add("active");

      // Rellenar y desplegar la tarjeta flotante
      if (popup) {
        const imgElem = document.getElementById("popupImg");
        const badgeElem = document.getElementById("popupBadge");
        const badgeText = document.getElementById("popupBadgeText");
        const titleElem = document.getElementById("popupTitle");
        const descElem = document.getElementById("popupDesc");
        const ctaBtn = popup.querySelector(".popup-cta-btn");

        if (imgElem) {
          imgElem.src = img;
          imgElem.alt = title;
        }
        if (badgeElem && badgeText) {
          badgeElem.innerHTML = `<i class="fas ${icon}"></i> <span>${badge}</span>`;
        }
        if (titleElem) titleElem.textContent = title;
        if (descElem) descElem.textContent = desc;
        if (ctaBtn) {
          ctaBtn.onclick = () => openBookingModal(hotelId);
        }

        popup.classList.add("active");
      }
    });
  });

  // 5. Botón de Cierre de la Tarjeta Flotante
  const closeBtn = document.getElementById("mapPopupClose");
  if (closeBtn && popup) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.remove("active");
      hotspots.forEach(h => h.classList.remove("active"));
    });
  }

  // Cerrar al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (popup && popup.classList.contains("active") && !popup.contains(e.target) && !e.target.closest(".map-hotspot")) {
      popup.classList.remove("active");
      hotspots.forEach(h => h.classList.remove("active"));
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup && popup.classList.contains("active")) {
      popup.classList.remove("active");
      hotspots.forEach(h => h.classList.remove("active"));
    }
  });
}
window.initResortMap = initResortMap;

/* ==========================================================
   HERO BANNER PROMOS OFICIALES (SLIDER DE TEMPORADA)
   ========================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function showSlide(idx) {
    current = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === current));
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(() => showSlide(current + 1), 5000);
  }

  function stopAutoPlay() {
    if (timer) clearInterval(timer);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(current - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(current + 1);
      startAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(idx);
      startAutoPlay();
    });
  });

  const wrapper = document.getElementById("heroSlider");
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopAutoPlay);
    wrapper.addEventListener("mouseleave", startAutoPlay);

    // Gestos táctiles en teléfonos
    let touchStartX = 0;
    wrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    wrapper.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) showSlide(current + 1);
      if (touchEndX > touchStartX + 40) showSlide(current - 1);
      startAutoPlay();
    }, { passive: true });
  }

  startAutoPlay();
}
window.initHeroSlider = initHeroSlider;

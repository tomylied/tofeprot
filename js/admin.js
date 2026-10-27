// ========================================== */
// TOFEPROT HQ - LÓGICA DEL PANEL DE ADMIN    */
// ========================================== */

const DEFAULT_PIN = "1234";

// Productos iniciales por defecto
const DEFAULT_PRODUCTS = [
    { 
        id: 101, 
        name: "Proteína Whey 1kg - Vainilla Oscura", 
        emoji: "🥛", 
        tubType: "vanilla",
        tubLabel: "WHEY 1KG",
        tubSub: "VANILLA",
        description: "Proteína de suero concentrada de disolución instantánea y pureza clínica.", 
        price: 45000, 
        badge: "Fórmula Pura",
        rating: "4.9",
        reviews: 142,
        specs: ["⚡ 25g Proteína", "💪 5.5g BCAAs", "🚫 0% Azúcar"],
        nutrition: {
            serving: "30g (1 scoop colmado)",
            servingsPerTub: "33 tomas",
            cals: "118 kcal",
            protein: "25g (83.3%)",
            carbs: "1.8g (Sin azúcar añadida)",
            fats: "1.2g",
            sodium: "55mg"
        },
        aminos: [
            { name: "L-Leucina (BCAA)", amount: "2.8g", pct: 95 },
            { name: "L-Isoleucina (BCAA)", amount: "1.4g", pct: 75 },
            { name: "L-Valina (BCAA)", amount: "1.3g", pct: 70 },
            { name: "L-Glutamina", amount: "4.2g", pct: 90 },
            { name: "L-Arginina", amount: "0.8g", pct: 50 }
        ],
        timing: {
            best: "Post-Entreno Inmediato",
            instructions: "Diluir 1 scoop (30g) en 200-250ml de agua o leche descremada fría.",
            goal: "Estimula la síntesis de mTor, combate el catabolismo y acelera la recuperación."
        },
        coa: {
            batch: "#TF-8829",
            purity: "99.8% WPC Instant",
            lab: "Laboratorio Eurofins Bioanalytics",
            date: "Agosto 2026",
            status: "APROBADO - Libre de metales y gluten"
        }
    },
    { 
        id: 102, 
        name: "Proteína Whey 1kg - Chocolate Berserk", 
        emoji: "🍫", 
        tubType: "chocolate",
        tubLabel: "WHEY 1KG",
        tubSub: "BERSERK",
        description: "Sabor cacao belga intenso y perfil aminoacídico completo para hipertrofia.", 
        price: 45000, 
        badge: "Top Sabor",
        rating: "5.0",
        reviews: 198,
        specs: ["⚡ 25g Proteína", "💪 5.5g BCAAs", "🍫 Cacao Berserk"],
        nutrition: {
            serving: "30g (1 scoop colmado)",
            servingsPerTub: "33 tomas",
            cals: "120 kcal",
            protein: "25g (83.3%)",
            carbs: "2.0g (Cacao alcalino puro)",
            fats: "1.4g",
            sodium: "60mg"
        },
        aminos: [
            { name: "L-Leucina (BCAA)", amount: "2.8g", pct: 95 },
            { name: "L-Isoleucina (BCAA)", amount: "1.4g", pct: 75 },
            { name: "L-Valina (BCAA)", amount: "1.3g", pct: 70 },
            { name: "L-Glutamina", amount: "4.1g", pct: 90 },
            { name: "L-Lisina", amount: "2.1g", pct: 80 }
        ],
        timing: {
            best: "Post-Entreno o Desayuno",
            instructions: "Batir enérgicamente durante 15 segundos con agua bien fría para textura cremosa.",
            goal: "Aporte de nitrógeno constante a los músculos durante la fase de reparación."
        },
        coa: {
            batch: "#TF-8830",
            purity: "99.7% WPC Ultrafiltrada",
            lab: "Laboratorio Eurofins Bioanalytics",
            date: "Agosto 2026",
            status: "APROBADO - Grado Farmacéutico"
        }
    },
    { 
        id: 103, 
        name: "Proteína Whey 1kg - Frutilla Sagrada", 
        emoji: "🍓", 
        tubType: "strawberry",
        tubLabel: "WHEY 1KG",
        tubSub: "BERRY",
        description: "Frescura frutal, digestión ultra liviana y síntesis muscular limpia.", 
        price: 45000, 
        badge: "Proteína",
        rating: "4.8",
        reviews: 86,
        specs: ["⚡ 25g Proteína", "🍓 Sabor Natural", "🚫 Sin TACC"],
        nutrition: {
            serving: "30g (1 scoop colmado)",
            servingsPerTub: "33 tomas",
            cals: "117 kcal",
            protein: "25g (83.3%)",
            carbs: "1.7g",
            fats: "1.1g",
            sodium: "50mg"
        },
        aminos: [
            { name: "L-Leucina (BCAA)", amount: "2.8g", pct: 95 },
            { name: "L-Isoleucina (BCAA)", amount: "1.4g", pct: 75 },
            { name: "L-Valina (BCAA)", amount: "1.3g", pct: 70 },
            { name: "L-Glutamina", amount: "4.2g", pct: 90 },
            { name: "Treonina", amount: "1.8g", pct: 65 }
        ],
        timing: {
            best: "Post-Entreno o Merienda",
            instructions: "Mezclar 1 scoop en 250ml de agua helada para una bebida hiper refrescante.",
            goal: "Digestión ultra liviana sin pesadez estomacal ni inflamación."
        },
        coa: {
            batch: "#TF-8831",
            purity: "99.8% WPC Instant",
            lab: "Laboratorio Eurofins Bioanalytics",
            date: "Agosto 2026",
            status: "APROBADO - Sin TACC"
        }
    },
    { 
        id: 104, 
        name: "Creatina Monohidrato 300g", 
        emoji: "💪", 
        tubType: "creatine",
        tubLabel: "CREATINE",
        tubSub: "200 MESH",
        description: "100% pura micronizada malla 200 mesh. Saturación celular y fuerza ATP.", 
        price: 28000, 
        badge: "Más Vendido",
        rating: "5.0",
        reviews: 312,
        specs: ["🧪 100% Pura Micronizada", "⚡ Energía ATP", "🚫 0% Relleno"],
        nutrition: {
            serving: "5g (1 scoop raso)",
            servingsPerTub: "60 tomas (2 meses)",
            cals: "0 kcal",
            protein: "0g",
            carbs: "0g",
            fats: "0g",
            sodium: "0mg"
        },
        aminos: [
            { name: "Creatina Monohidrato Pura", amount: "5.0g (100%)", pct: 100 },
            { name: "Malla de Filtrado", amount: "200 Mesh", pct: 100 }
        ],
        timing: {
            best: "Consumo Diario Continuo",
            instructions: "Tomar 5g diarios con agua o junto a un carbohidrato simple para máxima absorción.",
            goal: "Recarga de fosfocreatina muscular, fuerza explosiva y volumen hídrico celular."
        },
        coa: {
            batch: "#TF-CR440",
            purity: "100.0% Micronizada 200 Mesh",
            lab: "HPLC Certified Analysis",
            date: "Septiembre 2026",
            status: "APROBADO - Cero impurezas / Dicyandiamide free"
        }
    },
    { 
        id: 105, 
        name: "Creatina Citrus Energy 300g", 
        emoji: "🍋", 
        tubType: "citrus",
        tubLabel: "CREATINE",
        tubSub: "ELECTRO",
        description: "Con electrolitos y sales minerales para hidratación intra-entreno.", 
        price: 30000, 
        badge: "Creatina",
        rating: "4.9",
        reviews: 94,
        specs: ["🧪 Creatina + Sales", "🍋 Sabor Cítrico", "💧 Hidratación"],
        nutrition: {
            serving: "6g (1 scoop)",
            servingsPerTub: "50 tomas",
            cals: "5 kcal",
            protein: "0g",
            carbs: "1g (Sales minerales)",
            fats: "0g",
            sodium: "120mg (Electrolitos)"
        },
        aminos: [
            { name: "Creatina Micronizada", amount: "5.0g", pct: 100 },
            { name: "Magnesio + Potasio", amount: "350mg", pct: 85 },
            { name: "Sodio Cloruro", amount: "120mg", pct: 60 }
        ],
        timing: {
            best: "Intra o Post-Entreno",
            instructions: "Disolver en 400ml de agua bien fría durante sesiones de alta sudoración.",
            goal: "Fuerza sostenida, prevención de calambres musculares y osmolaridad perfecta."
        },
        coa: {
            batch: "#TF-CR441",
            purity: "99.6% Grado Deportivo",
            lab: "HPLC Certified Analysis",
            date: "Septiembre 2026",
            status: "APROBADO - Libre de dopaje"
        }
    },
    { 
        id: 106, 
        name: "Pre-entreno Berserk 300g", 
        emoji: "🚀", 
        tubType: "preworkout",
        tubLabel: "BERSERK",
        tubSub: "PRE-WORK",
        description: "Bombeo vascular explosivo, foco mental láser y vasodilatación al fallo.", 
        price: 35000, 
        badge: "Poder Extremo",
        rating: "4.9",
        reviews: 215,
        specs: ["🔥 300mg Cafeína", "💥 6g Citrulina", "⚡ 3.2g Beta-Alanina"],
        nutrition: {
            serving: "10g (1 scoop)",
            servingsPerTub: "30 servicios brutales",
            cals: "10 kcal",
            protein: "0g",
            carbs: "1.5g",
            fats: "0g",
            sodium: "80mg"
        },
        aminos: [
            { name: "L-Citrulina Malato 2:1", amount: "6.000mg", pct: 100 },
            { name: "Beta-Alanina", amount: "3.200mg", pct: 90 },
            { name: "Cafeína Anhidra", amount: "300mg", pct: 95 },
            { name: "Taurina Pura", amount: "1.000mg", pct: 80 },
            { name: "L-Tirosina (Foco mental)", amount: "800mg", pct: 75 }
        ],
        timing: {
            best: "20 a 30 min Pre-Entreno",
            instructions: "Tomar 1 scoop con 250ml de agua helada. No consumir dentro de las 5hs previas a dormir.",
            goal: "Vasodilatación extrema, retraso del fallo muscular y enfoque mental túnel."
        },
        coa: {
            batch: "#TF-BZ901",
            purity: "Grado Competición WADA Compliant",
            lab: "BioTech Analytics USA / AR",
            date: "Septiembre 2026",
            status: "APROBADO - Sin sustancias prohibidas"
        }
    }
];

// Generador de potes vectoriales SVG para admin
function getProductSVG(type, label, sublabel) {
    const tubClass = {
        'vanilla': 'tub-vanilla',
        'chocolate': 'tub-chocolate',
        'strawberry': 'tub-strawberry',
        'creatine': 'tub-creatine',
        'citrus': 'tub-citrus',
        'preworkout': 'tub-preworkout'
    }[type] || 'tub-vanilla';

    return `
        <div class="vector-tub-wrapper ${tubClass}">
            <svg class="vector-tub-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-height:90px; width:auto;">
                <rect x="25" y="10" width="50" height="14" rx="3" fill="#20202c" stroke="#484858" stroke-width="2"/>
                <line x1="35" y1="12" x2="35" y2="22" stroke="#333344" stroke-width="1.5"/>
                <line x1="45" y1="12" x2="45" y2="22" stroke="#333344" stroke-width="1.5"/>
                <line x1="55" y1="12" x2="55" y2="22" stroke="#333344" stroke-width="1.5"/>
                <line x1="65" y1="12" x2="65" y2="22" stroke="#333344" stroke-width="1.5"/>
                <path d="M15 28C15 25.5 17 24 19.5 24H80.5C83 24 85 25.5 85 28V106C85 110.5 81.5 114 77 114H23C18.5 114 15 110.5 15 106V28Z" fill="#0c0c14" stroke="#323242" stroke-width="2.5"/>
                <rect x="18" y="44" width="64" height="48" rx="2" fill="#06060a" stroke="currentColor" stroke-width="1.5"/>
                <text x="50" y="52" font-family="'Russo One', sans-serif" font-size="6" fill="currentColor" text-anchor="middle" font-weight="900" letter-spacing="0.5">TOFEPROT</text>
                <text x="50" y="68" font-family="'Russo One', sans-serif" font-size="7.5" fill="#ffffff" text-anchor="middle" font-weight="bold">${label || 'WHEY'}</text>
                <text x="50" y="78" font-family="'Orbitron', sans-serif" font-size="5" fill="currentColor" text-anchor="middle" font-weight="bold" letter-spacing="0.5">${sublabel || 'CLINICAL'}</text>
            </svg>
        </div>
    `;
}

// Catálogo dinámico para la pestaña de stock
function getAdminCatalog() {
    const samples = [
        { id: 1, name: "Whey Vainilla (30g)", type: "Muestra Loot Box", emoji: "🥛" },
        { id: 2, name: "Whey Chocolate (30g)", type: "Muestra Loot Box", emoji: "🍫" },
        { id: 3, name: "Whey Frutilla (30g)", type: "Muestra Loot Box", emoji: "🍓" },
        { id: 4, name: "Creatina Pura (30g)", type: "Muestra Loot Box", emoji: "💪" },
        { id: 5, name: "Creatina Citrus (30g)", type: "Muestra Loot Box", emoji: "🍋" }
    ];
    const ind = getStoredProducts();
    const indMapped = ind.map(p => ({
        id: p.id,
        name: p.name,
        type: p.tubLabel || "Pote Individual",
        emoji: p.emoji || "⚡"
    }));
    return [...samples, ...indMapped];
}

let currentFilter = 'all';
let currentAdminTab = 'orders';

// ========================================== */
// NAVEGACIÓN POR PESTAÑAS                    */
// ========================================== */
function switchAdminTab(tabName) {
    currentAdminTab = tabName;
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-view').forEach(view => view.classList.remove('active'));

    const btn = document.getElementById('tabBtn' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    const view = document.getElementById('view' + tabName.charAt(0).toUpperCase() + tabName.slice(1));

    if (btn) btn.classList.add('active');
    if (view) view.classList.add('active');

    if (tabName === 'products') {
        renderAdminProducts();
        updateTubPreview();
    } else if (tabName === 'stock') {
        renderStockGrid();
    } else if (tabName === 'orders') {
        renderOrders();
        renderKPIs();
    }
}

// ========================================== */
// AUTENTICACIÓN Y SEGURIDAD                  */
// ========================================== */
function getAdminPin() {
    return localStorage.getItem('tofeprot_admin_pin') || DEFAULT_PIN;
}

function checkAdminPin() {
    const input = document.getElementById('adminPinInput');
    const entered = input.value.trim();
    const correctPin = getAdminPin();

    if (entered === correctPin) {
        sessionStorage.setItem('tofeprot_admin_session', 'authenticated');
        document.getElementById('adminLockScreen').style.display = 'none';
        showToast('🔓 Acceso concedido al panel HQ');
        initDashboard();
    } else {
        input.value = '';
        input.focus();
        showToast('❌ PIN Incorrecto. Inténtalo de nuevo.');
    }
}

function checkSession() {
    const session = sessionStorage.getItem('tofeprot_admin_session');
    const lockScreen = document.getElementById('adminLockScreen');
    if (session === 'authenticated') {
        lockScreen.style.display = 'none';
        initDashboard();
    } else {
        lockScreen.style.display = 'flex';
        document.getElementById('adminPinInput')?.focus();
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('tofeprot_admin_session');
    location.reload();
}

function changeAdminPin() {
    const newPin = document.getElementById('newPinInput').value.trim();
    if (newPin.length < 4) {
        alert('⚠️ El PIN debe contener al menos 4 dígitos.');
        return;
    }
    localStorage.setItem('tofeprot_admin_pin', newPin);
    document.getElementById('newPinInput').value = '';
    showToast('🔑 Nuevo PIN guardado correctamente');
}

// ========================================== */
// INICIALIZACIÓN DEL DASHBOARD               */
// ========================================== */
function initDashboard() {
    renderKPIs();
    renderOrders();
    renderStockGrid();
    renderAdminProducts();
    updateTubPreview();
}

// ========================================== */
// GESTIÓN DE PEDIDOS Y KPIS                  */
// ========================================== */
function getOrders() {
    try {
        const saved = localStorage.getItem('tofeprot_orders');
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
}

function saveOrders(orders) {
    localStorage.setItem('tofeprot_orders', JSON.stringify(orders));
    renderKPIs();
    renderOrders();
}

function formatPrice(amount) {
    return '$' + Number(amount).toLocaleString('es-AR');
}

function renderKPIs() {
    const orders = getOrders();
    const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending' || !o.status).length;
    const lootBoxesSold = orders.reduce((sum, o) => sum + (o.lootBoxes ? o.lootBoxes.length : 0), 0);

    const revEl = document.getElementById('kpiRevenue');
    const countEl = document.getElementById('kpiOrdersCount');
    const pendingEl = document.getElementById('kpiPendingCount');
    const lootEl = document.getElementById('kpiLootBoxesCount');
    const topSampleEl = document.getElementById('kpiTopSample');
    const tabCounterEl = document.getElementById('tabOrdersCounter');

    if (revEl) revEl.textContent = formatPrice(totalRev);
    if (countEl) countEl.textContent = orders.length;
    if (pendingEl) pendingEl.textContent = `${pendingOrders} pendientes de entrega`;
    if (lootEl) lootEl.textContent = lootBoxesSold;
    if (tabCounterEl) tabCounterEl.textContent = orders.length;

    // Calcular muestra más pedida
    const sampleCounts = {};
    orders.forEach(o => {
        if (o.lootBoxes) {
            o.lootBoxes.forEach(b => {
                b.items.forEach(it => {
                    sampleCounts[it] = (sampleCounts[it] || 0) + 1;
                });
            });
        }
    });

    let topSample = "-";
    let maxCount = 0;
    for (const [name, count] of Object.entries(sampleCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topSample = name.split('-')[0].replace('Proteína Whey', 'Whey').trim();
        }
    }
    if (topSampleEl) topSampleEl.textContent = topSample !== '-' ? `${topSample} (${maxCount})` : 'Sin datos';
}

function filterOrders(status, btnElement) {
    currentFilter = status;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    renderOrders();
}

function renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    let orders = getOrders();
    if (currentFilter !== 'all') {
        orders = orders.filter(o => (o.status || 'pending') === currentFilter);
    }

    if (orders.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 2.5rem; color: #888899;">
                    No hay pedidos con el filtro actual (${currentFilter.toUpperCase()}).
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = orders.map(order => {
        let itemsHTML = '';
        if (order.lootBoxes && order.lootBoxes.length > 0) {
            itemsHTML += `<div style="color:var(--admin-blue); font-weight:700; margin-bottom:2px;">🎁 ${order.lootBoxes.length}x Loot Box (${order.membership || 'Drop Único'})</div>`;
            order.lootBoxes.forEach((b, idx) => {
                itemsHTML += `<div style="font-size:0.75rem; color:var(--admin-text-muted); padding-left:8px;">#${idx+1}: ${b.items.join(', ')}</div>`;
            });
        }
        if (order.individuals && order.individuals.length > 0) {
            order.individuals.forEach(ind => {
                itemsHTML += `<div style="color:var(--admin-text-main); font-weight:600;">• ${ind.name} <span style="color:var(--admin-text-muted);">(x${ind.qty})</span></div>`;
            });
        }
        if (order.hasGiftSample) {
            itemsHTML += `<div style="color:#b45309; font-weight:600; font-size:0.75rem;">+ 🎁 1 Doypack Muestra Bonificada</div>`;
        }

        const statusClass = `status-${order.status || 'pending'}`;

        return `
            <tr>
                <td>
                    <strong style="color:var(--admin-blue); font-weight:700;">${order.id || '#ORD-0000'}</strong><br>
                    <small style="color:var(--admin-text-muted);">${order.date || 'Reciente'}</small><br>
                    <small style="font-size:0.72rem; color:#15803d; font-weight:600;">💳 ${order.paymentMethod || 'Transferencia'}</small>
                </td>
                <td>
                    <strong style="color:var(--admin-text-main);">${order.buyerName || 'Cliente'}</strong><br>
                    <small style="color:var(--admin-text-muted);">${order.buyerEmail || 'Sin email'}</small><br>
                    <small style="color:#4338ca; font-weight:600;">⚖️ ${order.side || 'Bando no elegido'}</small>
                </td>
                <td style="max-width: 320px; font-size: 0.82rem; line-height: 1.4;">
                    ${itemsHTML}
                </td>
                <td>
                    <strong style="font-size: 1.05rem; color:var(--admin-text-main);">${formatPrice(order.total)}</strong><br>
                    <small style="color:${order.shipping === 0 ? '#15803d' : 'var(--admin-text-muted)'}; font-weight:${order.shipping === 0 ? '600' : 'normal'};">
                        ${order.shipping === 0 ? 'Envío Gratis' : `Envío: ${formatPrice(order.shipping)}`}
                    </small>
                </td>
                <td>
                    <select class="status-select ${statusClass}" onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
                        <option value="packing" ${order.status === 'packing' ? 'selected' : ''}>📦 Empaquetando</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>🚚 Enviado</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>✅ Entregado</option>
                    </select>
                </td>
                <td>
                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                        <button class="admin-btn" style="padding:4px 8px; font-size:0.75rem;" title="Copiar datos para etiqueta de despacho" onclick="copyShippingLabel('${order.id}')">📋 Etiqueta</button>
                        <button class="admin-btn admin-btn-danger" style="padding:4px 8px; font-size:0.75rem;" title="Eliminar pedido" onclick="deleteOrder('${order.id}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        saveOrders(orders);
        showToast(`Estado actualizado: ${orderId} -> ${newStatus.toUpperCase()}`);
    }
}

function deleteOrder(orderId) {
    if (!confirm(`¿Estás seguro de eliminar el pedido ${orderId}?`)) return;
    let orders = getOrders();
    orders = orders.filter(o => o.id !== orderId);
    saveOrders(orders);
    showToast(`🗑️ Pedido ${orderId} eliminado.`);
}

function copyShippingLabel(orderId) {
    const order = getOrders().find(o => o.id === orderId);
    if (!order) return;

    let itemsText = "";
    if (order.lootBoxes) {
        order.lootBoxes.forEach((b, i) => {
            itemsText += `  • 1x Loot Box #${i+1} [${b.items.join(', ')}]
`;
        });
    }
    if (order.individuals) {
        order.individuals.forEach(ind => {
            itemsText += `  • ${ind.name} (x${ind.qty})
`;
        });
    }
    if (order.hasGiftSample) {
        itemsText += `  • 🎁 1x Doypack de Muestra (Regalo)
`;
    }
    itemsText += `  • 💳 Forma de Pago: ${order.paymentMethod || 'Transferencia (15% OFF)'}
`;

    const label = `=============================
` +
                  `📦 ETIQUETA DE DESPACHO TOFEPROT
` +
                  `=============================
` +
                  `PEDIDO: ${order.id}
` +
                  `FECHA: ${order.date}
` +
                  `DESTINATARIO: ${order.buyerName}
` +
                  `EMAIL: ${order.buyerEmail}
` +
                  `CONTENIDO:
${itemsText}` +
                  `TOTAL COBRADO: ${formatPrice(order.total)}
` +
                  `ENVÍO: ${order.shipping === 0 ? 'BONIFICADO (GRATIS)' : formatPrice(order.shipping)}
` +
                  `=============================`;

    navigator.clipboard.writeText(label).then(() => {
        showToast('📋 ¡Datos de envío copiados al portapapeles!');
    }).catch(() => {
        prompt('Copia los datos de despacho manualmente:', label);
    });
}

// ========================================== */
// GESTIÓN DE PRODUCTOS (CARGA Y EDICIÓN)     */
// ========================================== */
function getStoredProducts() {
    try {
        const saved = localStorage.getItem('tofeprot_individual_products');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (e) {}
    try {
        localStorage.setItem('tofeprot_individual_products', JSON.stringify(DEFAULT_PRODUCTS));
    } catch (e) {}
    return DEFAULT_PRODUCTS;
}

function saveStoredProducts(products) {
    localStorage.setItem('tofeprot_individual_products', JSON.stringify(products));
    renderAdminProducts();
    renderStockGrid();
}

function renderAdminProducts(filterTerm = '') {
    const listEl = document.getElementById('adminProductsList');
    const countEl = document.getElementById('adminProductsCount');
    if (!listEl) return;

    let products = getStoredProducts();
    const stockMap = getStockMap();

    if (filterTerm) {
        const t = filterTerm.toLowerCase();
        products = products.filter(p => 
            p.name.toLowerCase().includes(t) || 
            (p.badge && p.badge.toLowerCase().includes(t)) ||
            (p.tubLabel && p.tubLabel.toLowerCase().includes(t))
        );
    }

    if (countEl) countEl.textContent = products.length;

    if (products.length === 0) {
        listEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 3rem; color: #888899;">[ No se encontraron suplementos con ese término ]</div>';
        return;
    }

    listEl.innerHTML = products.map(product => {
        const stock = stockMap[product.id] !== undefined ? stockMap[product.id] : 20;
        const isSoldOut = stock <= 0;
        const transferPrice = Math.round(product.price * 0.85);

        const visual = product.customImage 
            ? `<img src="${product.customImage}" alt="${product.name}" style="max-height: 75px; max-width: 65px; object-fit: contain;">`
            : getProductSVG(product.tubType, product.tubLabel, product.tubSub);

        return `
            <div class="admin-product-card" id="adminProdCard_${product.id}">
                <div class="admin-prod-top">
                    <div class="admin-prod-thumb">${visual}</div>
                    <div class="admin-prod-details">
                        ${product.badge ? `<span class="admin-prod-badge">${product.badge}</span>` : ''}
                        <div class="admin-prod-name">${product.emoji || '⚡'} ${product.name}</div>
                        <div class="admin-prod-price">${formatPrice(product.price)}</div>
                        <div class="admin-prod-transfer">🏷️ ${formatPrice(transferPrice)} con Transferencia</div>
                        <div class="admin-prod-stock">
                            Stock: <strong>${stock} un.</strong> 
                            ${isSoldOut ? '<span class="status-badge" style="background:#fee2e2; color:#b91c1c; border:1px solid #fca5a5;">AGOTADO</span>' : '<span class="status-badge" style="background:#dcfce7; color:#15803d; border:1px solid #86efac;">DISPONIBLE</span>'}
                        </div>
                    </div>
                </div>
                <div class="admin-prod-desc-text">
                    ${product.description.length > 90 ? product.description.substring(0, 90) + '...' : product.description}
                </div>
                <div class="admin-prod-actions">
                    <button class="admin-btn admin-btn-edit" onclick="editProduct(${product.id})">✏️ Editar</button>
                    <button class="admin-btn admin-btn-danger" onclick="deleteProduct(${product.id})">🗑️ Eliminar</button>
                    <a href="index.html#productsSection" target="_blank" class="admin-btn" title="Ver en tienda">🏪 Ver</a>
                </div>
            </div>
        `;
    }).join('');
}

function filterAdminProductsList() {
    const input = document.getElementById('adminProdSearchInput');
    renderAdminProducts(input ? input.value.trim() : '');
}

function startNewProductForm() {
    resetProductForm();
    const formCard = document.getElementById('productFormCard');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('formName')?.focus();
}

function editProduct(productId) {
    const products = getStoredProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const stockMap = getStockMap();
    const currentStock = stockMap[productId] !== undefined ? stockMap[productId] : 20;

    document.getElementById('formEditId').value = prod.id;
    document.getElementById('formHeaderTitle').textContent = `✏️ Editando: ${prod.name}`;
    const modeBadge = document.getElementById('formModeBadge');
    if (modeBadge) {
        modeBadge.textContent = `MODO: EDITANDO #${prod.id}`;
        modeBadge.className = "form-mode-badge edit";
    }

    document.getElementById('formName').value = prod.name || '';
    document.getElementById('formPrice').value = prod.price || 0;
    updatePricePreview(prod.price);

    document.getElementById('formBadge').value = prod.badge || '';
    document.getElementById('formStock').value = currentStock;
    document.getElementById('formEmoji').value = prod.emoji || '🥛';

    document.getElementById('formTubType').value = prod.tubType || 'vanilla';
    document.getElementById('formTubLabel').value = prod.tubLabel || 'WHEY 1KG';
    document.getElementById('formTubSub').value = prod.tubSub || 'PURE';

    document.getElementById('formCustomImageData').value = prod.customImage || '';
    document.getElementById('formImageUrl').value = prod.customImage && prod.customImage.startsWith('http') ? prod.customImage : '';

    document.getElementById('formDesc').value = prod.description || '';
    document.getElementById('formSpecs').value = (prod.specs || []).join(', ');

    const nut = prod.nutrition || {};
    document.getElementById('formNutServing').value = nut.serving || '30g (1 scoop)';
    document.getElementById('formNutServingsPerTub').value = nut.servingsPerTub || '33 tomas';
    document.getElementById('formNutCals').value = nut.cals || '118 kcal';
    document.getElementById('formNutProtein').value = nut.protein || '25g';
    document.getElementById('formNutCarbs').value = nut.carbs || '1.8g';
    document.getElementById('formNutFats').value = nut.fats || '1.2g';

    const timing = prod.timing || {};
    document.getElementById('formTimingBest').value = timing.best || 'Post-entreno con 250ml de agua fría';

    const coa = prod.coa || {};
    document.getElementById('formCoa').value = `${coa.batch || '#TF-8835'} - ${coa.purity || 'Pureza 99.8% testada'}`;

    updateTubPreview();

    const formCard = document.getElementById('productFormCard');
    if (formCard) formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetProductForm() {
    document.getElementById('adminProductForm')?.reset();
    document.getElementById('formEditId').value = '';
    document.getElementById('formCustomImageData').value = '';
    document.getElementById('formHeaderTitle').textContent = '⚡ Cargar Nuevo Suplemento';
    const modeBadge = document.getElementById('formModeBadge');
    if (modeBadge) {
        modeBadge.textContent = 'MODO: CREACIÓN';
        modeBadge.className = 'form-mode-badge create';
    }
    updatePricePreview(0);
    updateTubPreview();
}

function updatePricePreview(val) {
    const num = parseInt(val) || 0;
    const transfer = Math.round(num * 0.85);
    const prevEl = document.getElementById('formPricePreview');
    if (prevEl) prevEl.textContent = `Con 15% OFF Transferencia: ${formatPrice(transfer)}`;
}

function updateTubPreview() {
    const previewBox = document.getElementById('formVisualPreview');
    if (!previewBox) return;

    const customImg = document.getElementById('formCustomImageData')?.value;
    if (customImg) {
        previewBox.innerHTML = `<img src="${customImg}" alt="Preview" style="max-height: 120px; max-width: 120px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 6px 15px rgba(0,0,0,0.7));">`;
        return;
    }

    const type = document.getElementById('formTubType')?.value || 'vanilla';
    const label = document.getElementById('formTubLabel')?.value || 'WHEY 1KG';
    const sublabel = document.getElementById('formTubSub')?.value || 'PURE';
    previewBox.innerHTML = getProductSVG(type, label, sublabel);
}

function handleAdminImageUpload(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        document.getElementById('formCustomImageData').value = base64;
        updateTubPreview();
        showToast('📷 Imagen cargada en la vista previa');
    };
    reader.readAsDataURL(file);
}

function handleImageUrlInput(url) {
    if (url.trim()) {
        document.getElementById('formCustomImageData').value = url.trim();
    } else {
        document.getElementById('formCustomImageData').value = '';
    }
    updateTubPreview();
}

function clearCustomImage() {
    document.getElementById('formCustomImageData').value = '';
    document.getElementById('formImageFile').value = '';
    document.getElementById('formImageUrl').value = '';
    updateTubPreview();
    showToast('↺ Imagen removida. Se usará el Pote 3D');
}

function autoFillFormDefaults(cat) {
    if (cat === 'whey') {
        document.getElementById('formTubType').value = 'vanilla';
        document.getElementById('formTubLabel').value = 'WHEY 1KG';
        document.getElementById('formTubSub').value = 'CLINICAL';
        document.getElementById('formEmoji').value = '🥛';
        document.getElementById('formBadge').value = 'Fórmula Pura';
        document.getElementById('formNutServing').value = '30g (1 scoop)';
        document.getElementById('formNutProtein').value = '25g';
        document.getElementById('formNutCarbs').value = '1.8g';
        document.getElementById('formNutFats').value = '1.2g';
    } else if (cat === 'creatine') {
        document.getElementById('formTubType').value = 'creatine';
        document.getElementById('formTubLabel').value = 'CREATINE';
        document.getElementById('formTubSub').value = '200 MESH';
        document.getElementById('formEmoji').value = '💪';
        document.getElementById('formBadge').value = 'Más Vendido';
        document.getElementById('formNutServing').value = '5g (1 scoop)';
        document.getElementById('formNutServingsPerTub').value = '60 tomas';
        document.getElementById('formNutProtein').value = '0g';
        document.getElementById('formNutCarbs').value = '0g';
        document.getElementById('formNutFats').value = '0g';
        document.getElementById('formTimingBest').value = 'Consumo diario constante para saturación';
    } else if (cat === 'preworkout') {
        document.getElementById('formTubType').value = 'preworkout';
        document.getElementById('formTubLabel').value = 'BERSERK';
        document.getElementById('formTubSub').value = 'PRE-WORK';
        document.getElementById('formEmoji').value = '🚀';
        document.getElementById('formBadge').value = 'Poder Extremo';
        document.getElementById('formNutServing').value = '10g (1 scoop)';
        document.getElementById('formNutServingsPerTub').value = '30 servicios';
        document.getElementById('formTimingBest').value = '20 a 30 min antes de entrenar';
    }
    updateTubPreview();
}

function saveProductFromForm() {
    const name = document.getElementById('formName').value.trim();
    const price = parseInt(document.getElementById('formPrice').value) || 0;
    const stock = parseInt(document.getElementById('formStock').value) || 0;
    const desc = document.getElementById('formDesc').value.trim();

    if (!name || price <= 0 || !desc) {
        alert('⚠️ Por favor completa los campos obligatorios: Nombre, Precio y Descripción.');
        return;
    }

    const editIdStr = document.getElementById('formEditId').value;
    let products = getStoredProducts();

    const specsRaw = document.getElementById('formSpecs').value;
    const specs = specsRaw.split(',').map(s => s.trim()).filter(Boolean);

    const productData = {
        name,
        price,
        description: desc,
        badge: document.getElementById('formBadge').value.trim(),
        emoji: document.getElementById('formEmoji').value,
        tubType: document.getElementById('formTubType').value,
        tubLabel: document.getElementById('formTubLabel').value.trim().toUpperCase(),
        tubSub: document.getElementById('formTubSub').value.trim().toUpperCase(),
        customImage: document.getElementById('formCustomImageData').value.trim() || null,
        specs: specs.length > 0 ? specs : ["⚡ Máxima Pureza", "💪 Grado Clínico"],
        rating: "5.0",
        reviews: Math.floor(40 + Math.random() * 80),
        nutrition: {
            serving: document.getElementById('formNutServing').value.trim() || '30g',
            servingsPerTub: document.getElementById('formNutServingsPerTub').value.trim() || '30 tomas',
            cals: document.getElementById('formNutCals').value.trim() || '118 kcal',
            protein: document.getElementById('formNutProtein').value.trim() || '25g',
            carbs: document.getElementById('formNutCarbs').value.trim() || '1g',
            fats: document.getElementById('formNutFats').value.trim() || '1g',
            sodium: '50mg'
        },
        aminos: [
            { name: "L-Leucina / Aminoácidos Activos", amount: "3.0g", pct: 90 },
            { name: "L-Glutamina / Recuperación", amount: "4.0g", pct: 85 }
        ],
        timing: {
            best: document.getElementById('formTimingBest').value.trim() || 'Post-Entreno',
            instructions: 'Disolver 1 scoop en 250ml de agua bien fría.',
            goal: 'Rendimiento, hipertrofia y recuperación celular acelerada.'
        },
        coa: {
            batch: document.getElementById('formCoa').value.trim() || '#TF-LOTE-2026',
            purity: '99.8% Testado',
            lab: 'Eurofins Bioanalytics',
            date: '2026',
            status: 'APROBADO - Certificado Oficial'
        }
    };

    let targetId;
    if (editIdStr) {
        targetId = parseInt(editIdStr);
        const idx = products.findIndex(p => p.id === targetId);
        if (idx !== -1) {
            productData.id = targetId;
            products[idx] = { ...products[idx], ...productData };
            showToast(`✅ Suplemento #${targetId} actualizado`);
        }
    } else {
        const existingIds = products.map(p => p.id);
        targetId = Math.max(100, ...existingIds) + 1;
        productData.id = targetId;
        products.push(productData);
        showToast(`🎉 ¡Nuevo suplemento #${targetId} creado y publicado!`);
    }

    // Guardar productos en localStorage
    saveStoredProducts(products);

    // Guardar stock específico
    const stockMap = getStockMap();
    stockMap[targetId] = stock;
    saveStockMap(stockMap);

    resetProductForm();
}

function deleteProduct(productId) {
    const products = getStoredProducts();
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    if (!confirm(`⚠️ ¿Estás seguro de eliminar "${prod.name}" del catálogo oficial de la tienda?`)) {
        return;
    }

    const filtered = products.filter(p => p.id !== productId);
    saveStoredProducts(filtered);

    // Limpiar stock
    const stockMap = getStockMap();
    delete stockMap[productId];
    saveStockMap(stockMap);

    showToast(`🗑️ "${prod.name}" eliminado del catálogo`);
}

// ========================================== */
// GESTIÓN DE STOCK E INVENTARIO              */
// ========================================== */
function getStockMap() {
    try {
        const saved = localStorage.getItem('tofeprot_stock');
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
        1: 40, 2: 35, 3: 25, 4: 50, 5: 30,
        101: 20, 102: 18, 103: 15, 104: 30, 105: 22, 106: 12
    };
}

function saveStockMap(stockMap) {
    localStorage.setItem('tofeprot_stock', JSON.stringify(stockMap));
    renderStockGrid();
}

function renderStockGrid() {
    const container = document.getElementById('stockGridContainer');
    if (!container) return;

    const stockMap = getStockMap();
    const catalog = getAdminCatalog();

    container.innerHTML = catalog.map(item => {
        const currentQty = stockMap[item.id] !== undefined ? stockMap[item.id] : 20;
        const isZero = currentQty <= 0;

        return `
            <div class="stock-card ${isZero ? 'zero-stock' : ''}">
                <div>
                    <div class="stock-info-name">${item.emoji} ${item.name}</div>
                    <div class="stock-info-type">${item.type} ${isZero ? '<span style="color:#b91c1c; font-weight:bold;">[AGOTADO]</span>' : ''}</div>
                </div>
                <div class="stock-control">
                    <input type="number" min="0" max="999" id="stock_${item.id}" class="stock-qty-input" value="${currentQty}">
                    <button class="admin-btn" style="padding:4px 8px;" onclick="saveSingleStock(${item.id})">OK</button>
                </div>
            </div>
        `;
    }).join('');
}

function saveSingleStock(productId) {
    const input = document.getElementById(`stock_${productId}`);
    if (!input) return;
    const newQty = Math.max(0, parseInt(input.value) || 0);

    const stockMap = getStockMap();
    stockMap[productId] = newQty;
    saveStockMap(stockMap);

    showToast(`Stock actualizado para ID #${productId}: ${newQty} un.`);
    renderAdminProducts();
}

// ========================================== */
// GENERADOR DE PEDIDO DE PRUEBA              */
// ========================================== */
function generateTestOrder() {
    const dummyNames = [
        { name: "Lucas Fernández", email: "lucas.f@gmail.com", side: "Luz (Celestial)" },
        { name: "Gonzalo Benítez", email: "gonza.berserk@outlook.com", side: "Oscuridad (Berserk)" },
        { name: "Martina Rossi", email: "marti.rossi@yahoo.com.ar", side: "Luz (Celestial)" },
        { name: "Federico Silva", email: "fede.power@gmail.com", side: "Oscuridad (Berserk)" }
    ];

    const samplePool = [
        "Proteína Whey - Vainilla Oscura (30g)",
        "Proteína Whey - Chocolate Berserk (30g)",
        "Creatina - Monohidrato Pura (30g)",
        "Creatina - Citrus Energy (30g)",
        "Proteína Whey - Frutilla Sagrada (30g)"
    ];

    const prods = getStoredProducts();
    const indPool = prods.length > 0 ? prods : [
        { id: 104, name: "Creatina Monohidrato 300g", price: 28000 },
        { id: 101, name: "Proteína Whey 1kg - Vainilla Oscura", price: 45000 },
        { id: 106, name: "Pre-entreno Berserk 300g", price: 35000 }
    ];

    const dummyUser = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    const shuff = [...samplePool].sort(() => 0.5 - Math.random());
    const chosenSamples = [shuff[0], shuff[1], shuff[2]];

    const hasInd = Math.random() > 0.4;
    const randomProd = indPool[Math.floor(Math.random() * indPool.length)];
    const chosenInd = hasInd ? [{ productId: randomProd.id, name: randomProd.name, qty: 1, price: randomProd.price }] : [];

    const boxSubtotal = 15000;
    const indSubtotal = chosenInd.reduce((s, i) => s + (i.price * i.qty), 0);
    const rawTotal = boxSubtotal + indSubtotal;
    const shipping = rawTotal >= 65000 ? 0 : 5000;

    const testOrder = {
        id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' }),
        timestamp: Date.now(),
        buyerName: dummyUser.name,
        buyerEmail: dummyUser.email,
        side: dummyUser.side,
        membership: 'Drop Único',
        lootBoxes: [{ items: chosenSamples }],
        individuals: chosenInd,
        subtotalBoxes: boxSubtotal,
        subtotalInd: indSubtotal,
        shipping: shipping,
        total: rawTotal + shipping,
        status: 'pending'
    };

    const orders = getOrders();
    orders.unshift(testOrder);
    saveOrders(orders);

    showToast(`✅ Pedido de prueba generado: ${testOrder.id}`);
}

function resetAdminData() {
    if (!confirm('⚠️ ¿Estás seguro de reiniciar los pedidos, restablecer el catálogo de fábrica y reiniciar stock?')) return;
    localStorage.removeItem('tofeprot_orders');
    localStorage.removeItem('tofeprot_stock');
    localStorage.removeItem('tofeprot_individual_products');
    initDashboard();
    showToast('🔄 Sistema restablecido al estado original de fábrica.');
}

function showToast(msg) {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// Inicializar verificación de sesión
document.addEventListener('DOMContentLoaded', checkSession);

// ========================================== */
// CONFIGURACIÓN Y ESTADO GLOBAL              */
// ========================================== */
// 👉 Cambia este número por tu número de WhatsApp real con código de país (ej: 54911XXXXXXXX para Argentina)
const WHATSAPP_PHONE = "5491100000000";

// ========================================== */
// MOTOR DE AUDIO SFX (WEB AUDIO API SINTÉTICO)*/
// ========================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function initSoundState() {
    try {
        const saved = localStorage.getItem('tofeprot_sound');
        if (saved !== null) {
            soundEnabled = saved === 'true';
        }
    } catch (e) {}
    updateSoundUI();
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    try {
        localStorage.setItem('tofeprot_sound', soundEnabled.toString());
    } catch (e) {}
    updateSoundUI();
    if (soundEnabled) {
        playSFX('equip');
    }
}

function updateSoundUI() {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;
    if (soundEnabled) {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>';
        btn.classList.remove('muted');
        btn.title = 'Efectos de sonido: Activados (Click para silenciar)';
    } else {
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>';
        btn.classList.add('muted');
        btn.title = 'Efectos de sonido: Silenciados (Click para activar)';
    }
}

function playSFX(type) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;

        if (type === 'sideDark') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);
            osc.frequency.exponentialRampToValueAtTime(45, now + 0.6);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.6);
        } else if (type === 'sideLight') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(640, now + 0.5);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.5);
        } else if (type === 'equip') {
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc1.type = 'sine';
            osc2.type = 'triangle';
            osc1.frequency.setValueAtTime(523.25, now);
            osc1.frequency.setValueAtTime(659.25, now + 0.08);
            osc2.frequency.setValueAtTime(783.99, now + 0.12);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(audioCtx.destination);
            osc1.start(now);
            osc2.start(now + 0.08);
            osc1.stop(now + 0.35);
            osc2.stop(now + 0.35);
        } else if (type === 'click') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
        }
    } catch (e) {}
}

// Muestras de 30g para el Configurador de Loot Box (Prueba de Poder)
const products = [
    { id: 1, name: "Proteína Whey - Vainilla Oscura (30g)", emoji: "🥛", description: "Muestra de 30g. Pureza clínica y digestión liviana.", badge: "Proteína" },
    { id: 2, name: "Proteína Whey - Chocolate Berserk (30g)", emoji: "🍫", description: "Muestra de 30g. Sabor cacao intenso sin azúcar.", badge: "Proteína" },
    { id: 3, name: "Proteína Whey - Frutilla Sagrada (30g)", emoji: "🍓", description: "Muestra de 30g. Rápida absorción post-entreno.", badge: "Proteína" },
    { id: 4, name: "Creatina - Monohidrato Pura (30g)", emoji: "💪", description: "Muestra de 30g. 100% micronizada para recarga ATP.", badge: "Creatina" },
    { id: 5, name: "Creatina - Citrus Energy (30g)", emoji: "🍋", description: "Muestra de 30g. Con electrolitos y toque cítrico.", badge: "Creatina" }
];

// Función generadora de potes vectoriales SVG (Adaptable a Berserker / Iluminado)
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
            <svg class="vector-tub-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Tapa con texturas de agarre -->
                <rect x="25" y="10" width="50" height="14" rx="3" fill="var(--tub-cap-fill, #20202c)" stroke="var(--tub-cap-stroke, #484858)" stroke-width="2"/>
                <line x1="35" y1="12" x2="35" y2="22" stroke="var(--tub-cap-rib, #333344)" stroke-width="1.5"/>
                <line x1="45" y1="12" x2="45" y2="22" stroke="var(--tub-cap-rib, #333344)" stroke-width="1.5"/>
                <line x1="55" y1="12" x2="55" y2="22" stroke="var(--tub-cap-rib, #333344)" stroke-width="1.5"/>
                <line x1="65" y1="12" x2="65" y2="22" stroke="var(--tub-cap-rib, #333344)" stroke-width="1.5"/>
                
                <!-- Cuerpo del pote -->
                <path d="M15 28C15 25.5 17 24 19.5 24H80.5C83 24 85 25.5 85 28V106C85 110.5 81.5 114 77 114H23C18.5 114 15 110.5 15 106V28Z" fill="var(--tub-body-fill, #0c0c14)" stroke="var(--tub-body-stroke, #323242)" stroke-width="2.5"/>
                
                <!-- Reflejo de luz lateral -->
                <path d="M18 32V104C18 107 19.5 110 22 111" stroke="var(--tub-highlight, rgba(255,255,255,0.15))" stroke-width="2" stroke-linecap="round"/>
                
                <!-- Etiqueta central técnica -->
                <rect x="18" y="44" width="64" height="48" rx="2" fill="var(--tub-label-fill, #06060a)" stroke="currentColor" stroke-width="1.5"/>
                <rect x="20" y="46" width="60" height="7" fill="currentColor" opacity="0.22"/>
                <text x="50" y="52" font-family="'Russo One', sans-serif" font-size="6" fill="currentColor" text-anchor="middle" font-weight="900" letter-spacing="0.5">TOFEPROT</text>
                <text x="50" y="68" font-family="'Russo One', sans-serif" font-size="7.5" fill="var(--tub-title-fill, #ffffff)" text-anchor="middle" font-weight="bold">${label || 'WHEY'}</text>
                <text x="50" y="78" font-family="'Orbitron', sans-serif" font-size="5" fill="currentColor" text-anchor="middle" font-weight="bold" letter-spacing="0.5">${sublabel || 'CLINICAL'}</text>
                <circle cx="50" cy="85" r="2" fill="currentColor"/>
            </svg>
        </div>
    `;
}

// Productos para la Tienda Individual (en Pesos Argentinos - ARS)
const DEFAULT_INDIVIDUAL_PRODUCTS = [
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
        specs: ["25g Proteína", "5.5g BCAAs", "0% Azúcar"],
        flavors: [
            { id: 101, name: "Vainilla Oscura", short: "Vainilla", icon: "🥛", color: "#f5d061", tubType: "vanilla", tubSub: "VANILLA" },
            { id: 102, name: "Chocolate Berserk", short: "Chocolate", icon: "🍫", color: "#6b4226", tubType: "chocolate", tubSub: "BERSERK" },
            { id: 103, name: "Frutilla Sagrada", short: "Frutilla", icon: "🍓", color: "#e91e63", tubType: "strawberry", tubSub: "BERRY" }
        ],
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
        isVariantOnly: true,
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
        specs: ["25g Proteína", "5.5g BCAAs", "Cacao Alcalino"],
        flavors: [
            { id: 102, name: "Chocolate Berserk", short: "Chocolate", icon: "🍫", color: "#6b4226", tubType: "chocolate", tubSub: "BERSERK" },
            { id: 101, name: "Vainilla Oscura", short: "Vainilla", icon: "🥛", color: "#f5d061", tubType: "vanilla", tubSub: "VANILLA" },
            { id: 103, name: "Frutilla Sagrada", short: "Frutilla", icon: "🍓", color: "#e91e63", tubType: "strawberry", tubSub: "BERRY" }
        ],
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
        isVariantOnly: true,
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
        specs: ["25g Proteína", "Sabor Natural", "Sin TACC"],
        flavors: [
            { id: 103, name: "Frutilla Sagrada", short: "Frutilla", icon: "🍓", color: "#e91e63", tubType: "strawberry", tubSub: "BERRY" },
            { id: 102, name: "Chocolate Berserk", short: "Chocolate", icon: "🍫", color: "#6b4226", tubType: "chocolate", tubSub: "BERSERK" },
            { id: 101, name: "Vainilla Oscura", short: "Vainilla", icon: "🥛", color: "#f5d061", tubType: "vanilla", tubSub: "VANILLA" }
        ],
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
        specs: ["100% Micronizada", "200 Mesh", "0% Relleno"],
        flavors: [
            { id: 104, name: "Pura Micronizada (200 Mesh)", short: "Neutra", icon: "🧪", color: "#00e5ff", tubType: "creatine", tubSub: "200 MESH" },
            { id: 105, name: "Citrus Energy (Electrolitos)", short: "Citrus", icon: "🍋", color: "#ccff00", tubType: "citrus", tubSub: "ELECTRO" }
        ],
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
        isVariantOnly: true,
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
        specs: ["Creatina + Sales", "Electrolitos", "Hidratación"],
        flavors: [
            { id: 105, name: "Citrus Energy (Electrolitos)", short: "Citrus", icon: "🍋", color: "#ccff00", tubType: "citrus", tubSub: "ELECTRO" },
            { id: 104, name: "Pura Micronizada (200 Mesh)", short: "Neutra", icon: "🧪", color: "#00e5ff", tubType: "creatine", tubSub: "200 MESH" }
        ],
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
        specs: ["300mg Cafeína", "6g Citrulina", "3.2g Beta-Alanina"],
        flavors: [
            { id: 106, name: "Wild Blood Berserk", short: "Wild Blood", icon: "🩸", color: "#ff1744", tubType: "preworkout", tubSub: "BERSERK" },
            { id: 106, name: "Electric Blue Punch", short: "Blue Punch", icon: "⚡", color: "#00e5ff", tubType: "preworkout", tubSub: "PUMP" }
        ],
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

function getIndividualProducts() {
    try {
        const saved = localStorage.getItem('tofeprot_individual_products');
        if (saved) {
            let parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Sincronizar variantes, specs limpios y sabores con los valores por defecto
                parsed = parsed.map(p => {
                    const def = DEFAULT_INDIVIDUAL_PRODUCTS.find(d => d.id === p.id);
                    if (def) {
                        if (!p.flavors || p.flavors.length === 0) p.flavors = def.flavors;
                        if (!p.badge) p.badge = def.badge;
                        p.specs = def.specs;
                        p.isVariantOnly = def.isVariantOnly || false;
                    }
                    return p;
                });
                return parsed;
            }
        }
    } catch (e) {}
    try {
        localStorage.setItem('tofeprot_individual_products', JSON.stringify(DEFAULT_INDIVIDUAL_PRODUCTS));
    } catch (e) {}
    return DEFAULT_INDIVIDUAL_PRODUCTS;
}

let individualProducts = getIndividualProducts();

// Precios de Planes Prueba de Poder (Loot Box mensual o único en ARS)
const membershipPrices = {
    'drop-unico': 15000,
    'drop-mensual': 12000,
    'drop-vip': 20000
};

const membershipNames = {
    'drop-unico': 'Drop Único',
    'drop-mensual': 'Drop Mensual',
    'drop-vip': 'Drop VIP'
};

// Formateador de moneda en Pesos Argentinos
function formatPrice(amount) {
    return '$' + Number(amount).toLocaleString('es-AR');
}

// ========================================== */
// SISTEMA DE STOCK EN TIEMPO REAL            */
// ========================================== */
const DEFAULT_STOCK = {
    // Muestras de 30g (Loot Box)
    1: 40, // Vainilla
    2: 35, // Chocolate
    3: 25, // Frutilla
    4: 50, // Creatina Pura
    5: 30, // Creatina Citrus
    // Potes y suplementos individuales
    101: 20, // Whey Vainilla 1kg
    102: 18, // Whey Chocolate 1kg
    103: 15, // Whey Frutilla 1kg
    104: 30, // Creatina Monohidrato 300g
    105: 22, // Creatina Citrus 300g
    106: 12  // Pre-entreno Berserk 300g
};

function getStockMap() {
    try {
        const saved = localStorage.getItem('tofeprot_stock');
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    localStorage.setItem('tofeprot_stock', JSON.stringify(DEFAULT_STOCK));
    return { ...DEFAULT_STOCK };
}

function getStock(id) {
    const stockMap = getStockMap();
    return stockMap[id] !== undefined ? Number(stockMap[id]) : 20;
}

function updateItemStock(id, newQty) {
    const stockMap = getStockMap();
    stockMap[id] = Math.max(0, Number(newQty));
    localStorage.setItem('tofeprot_stock', JSON.stringify(stockMap));
    renderProducts(products);
    renderTienda(individualProducts);
}

let currentUser = null;
let currentMembership = 'drop-unico';
let cart = []; // Almacena ítems { type: 'lootbox', ... } y { type: 'product', ... }
let currentLootBox = [null, null, null]; // Slots para armar la caja actual

// ========================================== */
// PERSISTENCIA CON LOCALSTORAGE              */
// ========================================== */
function saveState() {
    try {
        localStorage.setItem('tofeprot_cart', JSON.stringify(cart));
        localStorage.setItem('tofeprot_membership', currentMembership);
        if (currentUser) {
            localStorage.setItem('tofeprot_user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('tofeprot_user');
        }
    } catch (e) {
        console.warn("No se pudo guardar en localStorage", e);
    }
}

function loadState() {
    try {
        const savedSide = localStorage.getItem('tofeprot_side');
        const savedUnlocked = localStorage.getItem('tofeprot_unlocked');
        const savedUser = localStorage.getItem('tofeprot_user');
        const savedCart = localStorage.getItem('tofeprot_cart');
        const savedMembership = localStorage.getItem('tofeprot_membership');

        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            if (currentUser && currentUser.membership) {
                currentMembership = currentUser.membership;
            }
        } else if (savedMembership) {
            currentMembership = savedMembership;
        }

        if (savedCart) {
            cart = JSON.parse(savedCart);
        }

        // Si ya hay bando registrado previamente, aplicar tema e ingresar directamente sin pasar por el Gateway
        if (savedSide === 'light' || savedSide === 'dark') {
            applySideTheme(savedSide);
            const gateway = document.getElementById('gatewayScreen');
            if (gateway) {
                gateway.style.display = 'none';
                gateway.style.visibility = 'hidden';
                gateway.style.opacity = '0';
                gateway.setAttribute('aria-hidden', 'true');
            }
        } else {
            // Primer ingreso del usuario: mostrar el Gateway para que elija su bando
            applySideTheme('dark');
            const gateway = document.getElementById('gatewayScreen');
            if (gateway) {
                gateway.style.display = 'flex';
                gateway.style.visibility = 'visible';
                gateway.style.opacity = '1';
                gateway.removeAttribute('aria-hidden');
            }
        }

        if (savedUnlocked === 'true') {
            const unlockModal = document.getElementById('unlockModal');
            if (unlockModal) {
                unlockModal.style.display = 'none';
                unlockModal.classList.remove('active');
            }
        }
    } catch (e) {
        console.warn("Error cargando estado desde localStorage", e);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initSoundState();
    loadState();
    renderProducts(products);
    renderTienda(individualProducts);
    updateCartUI();
    updateAuthUI();
    startSocialProofEngine();
    initGatewayParticles();
    initHeroParticles();
    initHeroLogoLightning();
    initCard3DTilt();
    initScrollReveal();
    initSmartHeader();
    updateLiveBiometrics();
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeNavDrawer();
            if (document.getElementById('productModal')?.classList.contains('active')) closeProductModal();
            if (document.getElementById('transferModal')?.classList.contains('active')) closeTransferModal();
            if (document.getElementById('cartModal')?.classList.contains('active')) toggleCart();
            if (document.getElementById('authModal')?.classList.contains('active')) toggleAuthModal();
        }
    });
});

function initSmartHeader() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Sincronización en tiempo real si se actualizan productos o stock desde el Panel Admin en otra pestaña
window.addEventListener('storage', function(e) {
    if (e.key === 'tofeprot_individual_products') {
        individualProducts = getIndividualProducts();
        renderTienda(individualProducts);
    }
    if (e.key === 'tofeprot_stock') {
        renderTienda(individualProducts);
    }
});

// ========================================== */
// SELECCIÓN DE BANDO Y TEMAS                 */
// ========================================== */
function applySideTheme(side) {
    const body = document.body;
    const logoImg = document.getElementById('heroLogoImg');
    const logoGhost = document.getElementById('heroLogoGhost');
    const logoHintText = document.getElementById('heroLogoHintText');
    const headerLogoTp = document.getElementById('headerLogoTp');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDescription');
    const heroBgImg = document.getElementById('heroBgImg');
    const heroVideoBg = document.querySelector('.hero-video-bg');

    body.className = side === 'light' ? 'theme-light' : 'theme-dark';
    
    if (side === 'light') {
        if (logoImg) logoImg.src = 'assets/images/logo-wordmark-luz.png';
        if (logoGhost) logoGhost.src = 'assets/images/logo-wordmark-oscuridad.png?v=3.0';
        if (logoHintText) logoHintText.textContent = 'TOCÁ EL LOGO · DESATAR MODO BERSERKER';
        if (headerLogoTp) headerLogoTp.src = 'assets/images/logo-tp-luz.png';
        if (heroTitle) heroTitle.innerHTML = 'ASCENDÉ A LA <span class="glory-highlight">GLORIA</span>';
        if (heroDesc) heroDesc.textContent = "Disciplina, devoción y pureza absoluta. Hacé de cada gota de sudor tu ofrenda más sagrada.";
        if (heroBgImg) {
            heroBgImg.src = 'assets/images/hero-bg-iluminado.jpg?v=2.8';
            heroBgImg.alt = 'Santuario Iluminado Tofeprot';
        }
        if (heroVideoBg) {
            heroVideoBg.poster = 'assets/images/hero-bg-iluminado.jpg?v=2.8';
        }
    } else {
        if (logoImg) logoImg.src = 'assets/images/logo-wordmark-oscuridad.png?v=3.0';
        if (logoGhost) logoGhost.src = 'assets/images/logo-wordmark-luz.png';
        if (logoHintText) logoHintText.textContent = 'TOCÁ EL LOGO · TRANSMUTAR A ILUMINADO';
        if (headerLogoTp) headerLogoTp.src = 'assets/images/logo-tp-oscuridad.png';
        if (heroTitle) heroTitle.innerHTML = 'DESATÁ EL <span class="glory-highlight">CAOS</span>';
        if (heroDesc) heroDesc.textContent = "El dolor no se esquiva, se conquista. Suplementación clínica sin piedad para doblegar el hierro.";
        if (heroBgImg) {
            heroBgImg.src = 'assets/images/hero-bg.jpg?v=2.8';
            heroBgImg.alt = 'Fondo Hero Tofeprot Berserker';
        }
        if (heroVideoBg) {
            heroVideoBg.poster = 'assets/images/hero-bg.jpg?v=2.8';
        }
    }
    const dualityBtn = document.getElementById('dualityBandoBtn');
    if (dualityBtn) {
        dualityBtn.title = side === 'light' ? 'Cambiar a bando Berserker (Oscuridad)' : 'Cambiar a bando Iluminado (Luz)';
    }
    try {
        localStorage.setItem('tofeprot_side', side);
    } catch (e) {}
    if (typeof updateLiveBiometrics === 'function') {
        updateLiveBiometrics();
    }
}

function selectSide(side) {
    playSFX(side === 'light' ? 'sideLight' : 'sideDark');
    const gateway = document.getElementById('gatewayScreen');
    applySideTheme(side);

    if (side === 'light') {
        gateway.classList.add('transition-light');
    } else {
        gateway.classList.add('transition-dark');
    }

    setTimeout(() => {
        gateway.style.display = 'none';
        gateway.style.visibility = 'hidden';
        gateway.style.opacity = '0';
        gateway.setAttribute('aria-hidden', 'true');
        gateway.classList.remove('transition-light', 'transition-dark');

        if (!document.getElementById('gatewayPreHide')) {
            const style = document.createElement('style');
            style.id = 'gatewayPreHide';
            style.textContent = '#gatewayScreen { display: none !important; visibility: hidden !important; opacity: 0 !important; }';
            document.head.appendChild(style);
        }

        const isUnlocked = localStorage.getItem('tofeprot_unlocked') === 'true';
        if (!isUnlocked) {
            document.getElementById('unlockModal').classList.add('active');
        }
    }, 650);
}

let isSwitchingSide = false;

function triggerLogoSideSwitch(event) {
    if (event) event.stopPropagation();
    if (isSwitchingSide) return;

    const stage = document.getElementById('heroLogoStage');
    if (stage) {
        stage.classList.remove('is-discharging');
        void stage.offsetWidth;
        stage.classList.add('is-discharging');
        setTimeout(() => {
            stage.classList.remove('is-discharging');
        }, 700);
    }

    if (typeof pulseLogoLightningDischarge === 'function') {
        pulseLogoLightningDischarge();
    }

    switchSide();
}

// ========================================== */
// MOTOR PROCEDURAL DE RAYOS FRACTALES (VFX)  */
// ========================================== */
let logoLightningBurstUntil = 0;

function pulseLogoLightningDischarge() {
    logoLightningBurstUntil = performance.now() + 680;
}

function initHeroLogoLightning() {
    const canvas = document.getElementById('heroLogoLightningCanvas');
    const stage = document.getElementById('heroLogoStage');
    if (!canvas || !stage) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cssW = 0;
    let cssH = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let isHovered = false;
    let isVisible = true;
    let activeBolts = [];
    let lastGenTime = 0;
    const cycleStart = performance.now();

    function resizeLightningCanvas() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            cssW = rect.width;
            cssH = rect.height;
            canvas.width = Math.round(cssW * dpr);
            canvas.height = Math.round(cssH * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }

    resizeLightningCanvas();
    window.addEventListener('resize', resizeLightningCanvas);
    const logoImg = document.getElementById('heroLogoImg');
    if (logoImg) {
        logoImg.addEventListener('load', resizeLightningCanvas);
    }

    stage.addEventListener('pointerenter', () => {
        isHovered = true;
        lastGenTime = 0;
    });
    stage.addEventListener('pointerleave', () => {
        isHovered = false;
    });

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.05 });
        obs.observe(stage);
    }

    // Subdivisión recursiva por desplazamiento de punto medio (Midpoint Displacement Fractal)
    function buildFractalPoints(x1, y1, x2, y2, displace, depth) {
        if (depth <= 0 || displace < 1.2) {
            return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        }
        const midX = (x1 + x2) * 0.5;
        const midY = (y1 + y2) * 0.5;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const jitter = (Math.random() - 0.5) * displace;
        const mx = midX + nx * jitter + (Math.random() - 0.5) * (displace * 0.18);
        const my = midY + ny * jitter + (Math.random() - 0.5) * (displace * 0.18);

        const left = buildFractalPoints(x1, y1, mx, my, displace * 0.54, depth - 1);
        const right = buildFractalPoints(mx, my, x2, y2, displace * 0.54, depth - 1);
        return left.slice(0, -1).concat(right);
    }

    // Genera un filamento eléctrico fino y localizado con a lo sumo 1 dendrita sutil
    function createHighVoltageBolt(x1, y1, x2, y2, palette, intensityScale) {
        const dist = Math.hypot(x2 - x1, y2 - y1);
        const initialDisplace = Math.min(14, Math.max(5, dist * 0.14)) * intensityScale;
        const trunk = buildFractalPoints(x1, y1, x2, y2, initialDisplace, 4);
        const branches = [];

        const mainAngle = Math.atan2(y2 - y1, x2 - x1);
        const numBranches = Math.random() < 0.7 ? 1 : 0;

        for (let b = 0; b < numBranches; b++) {
            const idx = Math.floor(trunk.length * (0.3 + Math.random() * 0.4));
            const origin = trunk[idx];
            if (!origin) continue;

            const sideSign = Math.random() < 0.5 ? -1 : 1;
            const branchAngle = mainAngle + sideSign * (0.32 + Math.random() * 0.35);
            const branchLen = dist * (0.24 + Math.random() * 0.18);
            const bx2 = origin.x + Math.cos(branchAngle) * branchLen;
            const by2 = origin.y + Math.sin(branchAngle) * branchLen;

            const branchPts = buildFractalPoints(origin.x, origin.y, bx2, by2, initialDisplace * 0.4, 3);
            branches.push({ points: branchPts, weight: 0.48 });
        }

        return {
            trunk,
            branches,
            palette,
            alpha: 0.55 + Math.random() * 0.15
        };
    }

    // Rutas cortas y periféricas que bordean el contorno del logotipo sin saturarlo
    function spawnBoltSet(count, intensityScale) {
        if (cssW === 0 || cssH === 0) resizeLightningCanvas();
        if (cssW === 0 || cssH === 0) return [];

        const isLightMode = document.body.classList.contains('theme-light');

        const berserkCrimson = {
            outer: 'rgba(255, 24, 76, 0.14)',
            mid: 'rgba(255, 42, 95, 0.65)',
            core: 'rgba(255, 255, 255, 0.82)',
            flare: '#ff4d79'
        };
        const berserkViolet = {
            outer: 'rgba(168, 85, 247, 0.15)',
            mid: 'rgba(192, 132, 252, 0.65)',
            core: 'rgba(255, 255, 255, 0.82)',
            flare: '#e879f9'
        };
        const iluminadoGold = {
            outer: 'rgba(245, 158, 11, 0.14)',
            mid: 'rgba(251, 191, 36, 0.62)',
            core: 'rgba(255, 255, 255, 0.80)',
            flare: '#fef08a'
        };

        const anchors = [
            // 1. Filamento corto en el borde superior izquierdo
            {
                x1: cssW * (0.14 + Math.random() * 0.04),
                y1: cssH * (0.36 + Math.random() * 0.06),
                x2: cssW * (0.31 + Math.random() * 0.05),
                y2: cssH * (0.26 + Math.random() * 0.06),
                pal: isLightMode ? berserkCrimson : berserkViolet
            },
            // 2. Filamento corto en la corona superior derecha
            {
                x1: cssW * (0.84 - Math.random() * 0.04),
                y1: cssH * (0.35 + Math.random() * 0.06),
                x2: cssW * (0.67 - Math.random() * 0.05),
                y2: cssH * (0.26 + Math.random() * 0.06),
                pal: isLightMode ? berserkViolet : iluminadoGold
            },
            // 3. Micro-arco en el flanco inferior izquierdo
            {
                x1: cssW * (0.18 + Math.random() * 0.05),
                y1: cssH * (0.64 + Math.random() * 0.05),
                x2: cssW * (0.36 + Math.random() * 0.05),
                y2: cssH * (0.71 + Math.random() * 0.05),
                pal: isLightMode ? berserkCrimson : iluminadoGold
            },
            // 4. Micro-arco en el flanco inferior derecho
            {
                x1: cssW * (0.82 - Math.random() * 0.05),
                y1: cssH * (0.63 + Math.random() * 0.05),
                x2: cssW * (0.64 - Math.random() * 0.05),
                y2: cssH * (0.70 + Math.random() * 0.05),
                pal: berserkViolet
            }
        ];

        const shuffled = anchors.sort(() => Math.random() - 0.5).slice(0, count);
        return shuffled.map(a => createHighVoltageBolt(a.x1, a.y1, a.x2, a.y2, a.pal, intensityScale));
    }

    function strokePolylineTapering(points, baseWidth, color, shadowColor, shadowBlur, alpha) {
        if (!points || points.length < 2) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (shadowBlur > 0 && shadowColor) {
            ctx.shadowColor = shadowColor;
            ctx.shadowBlur = shadowBlur;
        }

        // Trazado segmentado en 3 tramos (inicio ahusado -> cuerpo central potente -> punta afilada)
        const n = points.length;
        const p1 = Math.max(1, Math.floor(n * 0.18));
        const p2 = Math.max(p1 + 1, Math.floor(n * 0.82));

        const sections = [
            { start: 0, end: p1, w: baseWidth * 0.68 },
            { start: p1, end: p2, w: baseWidth },
            { start: p2, end: n - 1, w: baseWidth * 0.55 }
        ];

        for (const sec of sections) {
            if (sec.end <= sec.start) continue;
            ctx.beginPath();
            ctx.lineWidth = sec.w;
            ctx.moveTo(points[sec.start].x, points[sec.start].y);
            for (let i = sec.start + 1; i <= sec.end; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawContactFlare(pt, color, radius, alpha) {
        if (!pt) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0.5, pt.x, pt.y, radius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function renderBolt(bolt, masterAlpha) {
        const a = bolt.alpha * masterAlpha;
        if (a <= 0.02) return;
        const pal = bolt.palette;

        // 1. Halo exterior muy tenue y fino
        strokePolylineTapering(bolt.trunk, 4.2, pal.outer, pal.mid, 8, a * 0.55);
        // 2. Canal medio delicado
        strokePolylineTapering(bolt.trunk, 1.45, pal.mid, pal.mid, 5, a * 0.72);
        // 3. Hilo central ultrafino
        strokePolylineTapering(bolt.trunk, 0.65, pal.core, '#ffffff', 2, a * 0.85);

        // Ramificación sutil
        for (const br of bolt.branches) {
            const w = br.weight;
            strokePolylineTapering(br.points, 2.4 * w, pal.outer, pal.mid, 4, a * 0.45);
            strokePolylineTapering(br.points, 0.95 * w, pal.mid, null, 0, a * 0.6);
            strokePolylineTapering(br.points, 0.45 * w, pal.core, null, 0, a * 0.7);
        }

        // Micro-destello discreto en el punto de contacto
        drawContactFlare(bolt.trunk[0], pal.flare, 4.5, a * 0.42);
    }

    function animateLightningLoop(now) {
        requestAnimationFrame(animateLightningLoop);
        if (!isVisible) return;

        ctx.clearRect(0, 0, cssW, cssH);

        const isBursting = now < logoLightningBurstUntil;
        const cycleDuration = isHovered ? 2400 : 4200;
        const phase = ((now - cycleStart) % cycleDuration) / cycleDuration;

        // Descargas sutiles únicamente en el pico del latido (10%-20% y un susurro en 60%-66%)
        let dischargeIntensity = 0;
        let desiredBolts = 0;

        if (isBursting) {
            dischargeIntensity = 0.85;
            desiredBolts = 3;
        } else if (phase >= 0.10 && phase <= 0.21) {
            const localT = (phase - 0.10) / 0.11;
            dischargeIntensity = Math.sin(localT * Math.PI) * (isHovered ? 0.72 : 0.52);
            desiredBolts = isHovered ? 2 : 1;
        } else if (phase >= 0.60 && phase <= 0.67) {
            const localT = (phase - 0.60) / 0.07;
            dischargeIntensity = Math.sin(localT * Math.PI) * (isHovered ? 0.55 : 0.36);
            desiredBolts = 1;
        } else if (isHovered && phase >= 0.36 && phase <= 0.42) {
            const localT = (phase - 0.36) / 0.06;
            dischargeIntensity = Math.sin(localT * Math.PI) * 0.4;
            desiredBolts = 1;
        }

        if (dischargeIntensity <= 0.02 || desiredBolts === 0) {
            activeBolts = [];
            return;
        }

        const refreshInterval = isBursting ? 45 : 70;
        if (now - lastGenTime > refreshInterval || activeBolts.length !== desiredBolts) {
            activeBolts = spawnBoltSet(desiredBolts, isBursting ? 1.1 : 0.9);
            lastGenTime = now;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (const bolt of activeBolts) {
            renderBolt(bolt, dischargeIntensity);
        }
        ctx.restore();
    }

    requestAnimationFrame(animateLightningLoop);
}

function switchSide() {
    if (isSwitchingSide) return;
    isSwitchingSide = true;

    const currentSide = document.body.classList.contains('theme-light') ? 'light' : 'dark';
    const targetSide = currentSide === 'light' ? 'dark' : 'light';

    // Efecto de sonido temático al transmutar
    playSFX(targetSide === 'light' ? 'sideLight' : 'sideDark');

    const overlay = document.getElementById('sideTransitionOverlay');
    const runeName = document.getElementById('portalRuneName');

    if (overlay) {
        if (targetSide === 'light') {
            overlay.classList.remove('to-dark');
            overlay.classList.add('to-light');
            if (runeName) runeName.textContent = 'MODO ILUMINADO';
        } else {
            overlay.classList.remove('to-light');
            overlay.classList.add('to-dark');
            if (runeName) runeName.textContent = 'MODO BERSERKER';
        }

        // 1. Despliegue suave y lento del velo cinematográfico
        overlay.classList.add('active');

        // 2. En el cenit de la transición (pantalla velada), aplicar el cambio de bando
        setTimeout(() => {
            applySideTheme(targetSide);
            try {
                localStorage.setItem('tofeprot_side', targetSide);
            } catch (e) {}

            // Pausa cinematográfica para asimilar la atmósfera antes de desvanecer
            setTimeout(() => {
                overlay.classList.remove('active');

                // 3. Finalización y liberación de interacción
                setTimeout(() => {
                    overlay.classList.remove('to-light', 'to-dark');
                    isSwitchingSide = false;
                }, 850);
            }, 300);
        }, 650);
    } else {
        // Fallback directo
        applySideTheme(targetSide);
        isSwitchingSide = false;
    }
}

function reopenGateway() {
    const preHide = document.getElementById('gatewayPreHide');
    if (preHide) preHide.remove();
    const gateway = document.getElementById('gatewayScreen');
    if (gateway) {
        gateway.style.display = 'flex';
        gateway.style.opacity = '1';
        gateway.style.visibility = 'visible';
        gateway.removeAttribute('aria-hidden');
        initGatewayParticles();
    }
}

function setGatewayHover(side) {
    const stage = document.getElementById('gatewayStage');
    if (!stage) return;
    if (side === 'dark') {
        stage.classList.add('hover-dark');
        stage.classList.remove('hover-light');
    } else if (side === 'light') {
        stage.classList.add('hover-light');
        stage.classList.remove('hover-dark');
    }
}

function clearGatewayHover() {
    const stage = document.getElementById('gatewayStage');
    if (stage) {
        stage.classList.remove('hover-dark', 'hover-light');
    }
}

// ========================================== */
// MOTOR DE PARTÍCULAS DEL GATEWAY (DESACTIVADO PARA MINIMALISMO) */
// ========================================== */
function initGatewayParticles() {
    // Partículas voladoras desactivadas para un diseño limpio y minimalista
}


// ========================================== */
// MOTOR DE PARTÍCULAS DEL HERO (KI ENERGY)   */
// ========================================== */
let heroAnimFrame = null;

function initHeroParticles() {
    const canvas = document.getElementById('heroParticlesCanvas');
    const hero = document.querySelector('.hero');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resizeCanvas() {
        const rect = hero.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            canvas.width = rect.width;
            canvas.height = rect.height;
            width = rect.width;
            height = rect.height;
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const COUNT = 35;
    const particles = [];

    const darkPalette = ['#ff4655', '#ff0055', '#8a2be2', '#ff80bf', '#ffffff'];
    const lightPalette = ['#ffd700', '#d4af37', '#ffea75', '#ffffff', '#ffaa00'];

    for (let i = 0; i < COUNT; i++) {
        particles.push({
            x: Math.random() * (width || 1200),
            y: Math.random() * (height || 600),
            size: Math.random() * 2.4 + 1.0,
            speedY: -(Math.random() * 0.7 + 0.3),
            speedX: (Math.random() - 0.5) * 0.45,
            alpha: Math.random() * 0.55 + 0.15,
            maxAlpha: Math.random() * 0.5 + 0.25,
            pulse: Math.random() * 0.03 + 0.015,
            colorIndex: Math.floor(Math.random() * 5)
        });
    }

    function renderHeroLoop() {
        if (!ctx || width === 0 || height === 0) {
            heroAnimFrame = requestAnimationFrame(renderHeroLoop);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const isLight = document.body.classList.contains('theme-light');
        const activePalette = isLight ? lightPalette : darkPalette;

        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX;
            p.alpha += Math.sin(Date.now() * p.pulse) * 0.012;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            const a = Math.max(0.08, Math.min(p.maxAlpha, p.alpha));
            const color = activePalette[p.colorIndex % activePalette.length];

            ctx.save();
            ctx.fillStyle = color;
            ctx.globalAlpha = a;
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        heroAnimFrame = requestAnimationFrame(renderHeroLoop);
    }

    if (!heroAnimFrame) {
        heroAnimFrame = requestAnimationFrame(renderHeroLoop);
    }
}

// ========================================== */
// FÍSICAS DE TARJETAS (SIN TILT 3D ARTIFICIAL)*/
// ========================================== */
function initCard3DTilt() {
    // Desactivado: sin inclinación 3D artificial ni spotlight de cursor
}

// ========================================== */
// SCROLL REVEAL CINEMÁTICO                   */
// ========================================== */
function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(target => observer.observe(target));
}

// ========================================== */
// POP-UP DESBLOQUEO DE PODER (EMAIL LEADS)   */
// ========================================== */
function submitUnlockEmail() {
    const emailInput = document.getElementById('userUnlockEmail').value.trim();
    const lockIcon = document.getElementById('lockIconElement');

    if (!emailInput || !emailInput.includes('@')) {
        alert('Por favor, ingresa un email válido para desbloquear tu descuento.');
        return;
    }

    try {
        localStorage.setItem('tofeprot_unlocked', 'true');
        localStorage.setItem('tofeprot_lead_email', emailInput);
    } catch (e) {}

    lockIcon.textContent = "🔓";
    
    setTimeout(() => {
        const modalOverlay = document.getElementById('unlockModal');
        modalOverlay.classList.add('unlock-success');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            modalOverlay.classList.remove('active', 'unlock-success');
        }, 600);
    }, 400);
}

function closeUnlockModal() {
    try {
        localStorage.setItem('tofeprot_unlocked', 'true');
    } catch (e) {}
    const modalOverlay = document.getElementById('unlockModal');
    modalOverlay.classList.add('unlock-success');
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        modalOverlay.classList.remove('active', 'unlock-success');
    }, 600);
}

// ========================================== */
// TAB SWITCHER (LOOT BOX / TIENDA)           */
// ========================================== */
function switchTab(tab) {
    const panelLootBox = document.getElementById('panelLootBox');
    const panelTienda = document.getElementById('panelTienda');
    const tabLB = document.getElementById('tabLootBox');
    const tabT = document.getElementById('tabTienda');

    if (tab === 'lootbox') {
        panelLootBox.style.display = 'block';
        panelTienda.style.display = 'none';
        tabLB.classList.add('active');
        tabT.classList.remove('active');
    } else {
        panelLootBox.style.display = 'none';
        panelTienda.style.display = 'block';
        tabLB.classList.remove('active');
        tabT.classList.add('active');
    }
}

// ========================================== */
// BUSCADOR UNIFICADO                         */
// ========================================== */
function filterProducts() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    // 1. Filtrar muestras de Loot Box
    const filteredSamples = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.badge && p.badge.toLowerCase().includes(query))
    );
    renderProducts(filteredSamples);

    // 2. Filtrar productos de la Tienda Individual
    const filteredIndividuals = individualProducts.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.badge && p.badge.toLowerCase().includes(query))
    );
    renderTienda(filteredIndividuals);
}

// ========================================== */
// INSPECTOR INTERACTIVO DE PUREZA CLÍNICA    */
// ========================================== */
const PURITY_PILLAR_DATA = {
    mesh: {
        tag: 'MOLIENDA FÍSICA 200 MESH',
        caption: 'Partícula micronizada 20 veces más fina que el polvo estándar para disolución total en agua fría y absorción celular sin pesadez.'
    },
    hplc: {
        tag: 'AUDITORÍA CROMATOGRÁFICA HPLC 99.8%',
        caption: 'Cada lote se analiza en laboratorio independiente para certificar su aminograma real. Cero glicina ni taurina barata para inflar nitrógeno.'
    },
    zero: {
        tag: 'FÓRMULA ABIERTA · 0% MALTODEXTRINA',
        caption: 'Materia prima importada pura sin maltodextrina oculta, espesantes gomosos ni azúcares añadidos que rebajen la concentración por servicio.'
    }
};

function selectPurityPillar(pillarKey, btnEl) {
    const data = PURITY_PILLAR_DATA[pillarKey];
    if (!data) return;

    document.querySelectorAll('.purity-pillar-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    if (btnEl) {
        btnEl.classList.add('active');
        btnEl.setAttribute('aria-selected', 'true');
    }

    const tagEl = document.getElementById('purityOverlayTag');
    const capEl = document.getElementById('purityOverlayCaption');
    const overlayBox = document.querySelector('.purity-visual-overlay');
    if (overlayBox) {
        overlayBox.classList.remove('pillar-fade');
        void overlayBox.offsetWidth;
        overlayBox.classList.add('pillar-fade');
    }
    if (tagEl) tagEl.textContent = data.tag;
    if (capEl) capEl.textContent = data.caption;

    playSFX('click');
}

function setPurityComparison(mode) {
    const isTofeprot = mode === 'tofeprot';
    const btnTofe = document.getElementById('btnCompareTofeprot');
    const btnGen = document.getElementById('btnCompareGeneric');
    if (btnTofe && btnGen) {
        btnTofe.classList.toggle('active', isTofeprot);
        btnGen.classList.toggle('active', !isTofeprot);
    }

    const auditBadge = document.getElementById('scoopAuditBadge');
    const specMain = document.getElementById('spectrumLabelMain');
    const specSec = document.getElementById('spectrumLabelSecondary');
    const specFill = document.getElementById('spectrumLabelFiller');
    const segProt = document.getElementById('segProtein');
    const segBcaa = document.getElementById('segBcaa');
    const segFill = document.getElementById('segFiller');

    const valProt = document.getElementById('valBioProtein');
    const valBcaa = document.getElementById('valBcaa');
    const valFill = document.getElementById('valFillers');

    const barProt = document.getElementById('barBioProtein');
    const barBcaa = document.getElementById('barBcaa');
    const barFill = document.getElementById('barFillers');

    const verdictBox = document.getElementById('scoopVerdictBox');
    const verdictDot = document.getElementById('verdictDot');
    const verdictText = document.getElementById('scoopVerdictText');

    if (isTofeprot) {
        if (auditBadge) {
            auditBadge.textContent = 'Lote Auditado CoA';
            auditBadge.classList.remove('is-warning');
        }
        if (specMain) specMain.textContent = '80% Proteína Pura (24g)';
        if (specSec) specSec.textContent = '18% BCAA (5.5g)';
        if (specFill) specFill.textContent = '0% Maltodextrina';
        if (segProt) segProt.style.width = '80%';
        if (segBcaa) segBcaa.style.width = '18%';
        if (segFill) segFill.style.width = '2%';

        if (valProt) {
            valProt.textContent = '24.0 g / scoop (80%)';
            valProt.className = 'scoop-metric-val highlight-good';
        }
        if (valBcaa) {
            valBcaa.textContent = '5.5 g naturales (Sin Amino-Spiking)';
            valBcaa.className = 'scoop-metric-val';
        }
        if (valFill) {
            valFill.textContent = '0.0 g (Libre de rellenos)';
            valFill.className = 'scoop-metric-val';
        }

        if (barProt) barProt.style.transform = 'scaleX(0.92)';
        if (barBcaa) barBcaa.style.transform = 'scaleX(0.88)';
        if (barFill) barFill.style.transform = 'scaleX(0.03)';

        if (verdictBox) verdictBox.classList.remove('is-generic');
        if (verdictDot) {
            verdictDot.classList.add('status-pure');
            verdictDot.classList.remove('status-diluted');
        }
        if (verdictText) {
            verdictText.innerHTML = '<strong>Fórmula 100% transparente:</strong> Cada servicio entrega proteína concentrada e isolada real verificada por cromatografía líquida (HPLC), sin carbohidratos baratos escondidos.';
        }
    } else {
        if (auditBadge) {
            auditBadge.textContent = 'Rebajado Comercial';
            auditBadge.classList.add('is-warning');
        }
        if (specMain) specMain.textContent = '46% Proteína (14g)';
        if (specSec) specSec.textContent = '10% Relleno Nitrógeno';
        if (specFill) specFill.textContent = '44% Maltodextrina (13g)';
        if (segProt) segProt.style.width = '46%';
        if (segBcaa) segBcaa.style.width = '10%';
        if (segFill) segFill.style.width = '44%';

        if (valProt) {
            valProt.textContent = '14.0 g reales / scoop (46%)';
            valProt.className = 'scoop-metric-val highlight-warn';
        }
        if (valBcaa) {
            valBcaa.textContent = '2.8 g (Inflado con glicina barata)';
            valBcaa.className = 'scoop-metric-val highlight-warn';
        }
        if (valFill) {
            valFill.textContent = '13.2 g Maltodextrina + Espesantes';
            valFill.className = 'scoop-metric-val highlight-danger';
        }

        if (barProt) barProt.style.transform = 'scaleX(0.46)';
        if (barBcaa) barBcaa.style.transform = 'scaleX(0.32)';
        if (barFill) barFill.style.transform = 'scaleX(0.85)';

        if (verdictBox) verdictBox.classList.add('is-generic');
        if (verdictDot) {
            verdictDot.classList.remove('status-pure');
            verdictDot.classList.add('status-diluted');
        }
        if (verdictText) {
            verdictText.innerHTML = '<strong>Alerta de dilución:</strong> Muchas marcas económicas declaran proteína en etiqueta pero rellenan casi la mitad del envase con maltodextrina (azúcar rápida) y aminoácidos de bajo costo.';
        }
    }

    playSFX('click');
}

// ========================================== */
// CONFIGURADOR BIOMÉTRICO EN VIVO            */
// ========================================== */
let biometricTrainingDays = 5;
let biometricGoal = 'volumen';

function stepBiometricWeight(delta) {
    const slider = document.getElementById('calcWeight');
    if (!slider) return;
    const current = parseInt(slider.value, 10) || 78;
    const min = parseInt(slider.min, 10) || 45;
    const max = parseInt(slider.max, 10) || 130;
    slider.value = Math.max(min, Math.min(max, current + delta));
    updateLiveBiometrics();
    playSFX('click');
}

function setBiometricDays(days, btnEl) {
    biometricTrainingDays = Number(days) || 5;
    document.querySelectorAll('.bio-seg-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    updateLiveBiometrics();
    playSFX('click');
}

function setBiometricGoal(goal, btnEl) {
    biometricGoal = goal || 'volumen';
    const hiddenInput = document.getElementById('calcGoal');
    if (hiddenInput) hiddenInput.value = biometricGoal;
    document.querySelectorAll('.bio-goal-btn').forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    updateLiveBiometrics();
    playSFX('click');
}

function calculateMacros() {
    updateLiveBiometrics();
}

function updateLiveBiometrics() {
    const slider = document.getElementById('calcWeight');
    const resultContainer = document.getElementById('calcResult');
    if (!slider || !resultContainer) return;

    const weight = Math.max(45, Math.min(130, parseFloat(slider.value) || 78));
    const min = parseFloat(slider.min) || 45;
    const max = parseFloat(slider.max) || 130;
    const sliderPct = Math.round(((weight - min) / (max - min)) * 100);
    slider.style.setProperty('--slider-pct', `${sliderPct}%`);

    const readout = document.getElementById('calcWeightDisplay');
    if (readout) readout.textContent = `${weight} kg`;

    // Factor proteico según objetivo + ajuste por frecuencia semanal
    let baseFactor = 2.2;
    if (biometricGoal === 'definicion') baseFactor = 2.5;
    if (biometricGoal === 'rendimiento') baseFactor = 2.3;

    const freqBonus = biometricTrainingDays >= 6 ? 0.15 : (biometricTrainingDays >= 5 ? 0.05 : -0.1);
    const proteinFactor = +(baseFactor + freqBonus).toFixed(2);

    const totalProtein = Math.round(weight * proteinFactor);
    const totalCreatine = +(weight * 0.08).toFixed(1); // ~0.08g/kg clínico (ej. 6.2g para 78kg)
    const recommendedScoopsWhey = (totalProtein >= 145 || biometricTrainingDays >= 5) ? 2 : 1;
    const wheyGramsProvided = recommendedScoopsWhey * 24; // 24g proteína pura por scoop
    const wheyCoveragePct = Math.min(60, Math.round((wheyGramsProvided / totalProtein) * 100));

    // Escalas para medidor circular SVG (radio 44 -> circunferencia ~276.46)
    const circumference = 276.46;
    const ringProgress = Math.min(1, totalProtein / 260);
    const dashOffset = (circumference * (1 - ringProgress)).toFixed(1);

    const proteinScale = Math.min(1, +(totalProtein / 260).toFixed(2));
    const creatineScale = Math.min(1, +(totalCreatine / 10).toFixed(2));

    // Selección inteligente del Stack Tofeprot según perfil
    const isLight = document.body.classList.contains('theme-light');
    const preferredWheyId = isLight ? 101 : 102; // Vainilla (Luz) o Chocolate Berserk (Oscuridad)
    const wheyProd = individualProducts.find(p => p.id === preferredWheyId) || individualProducts[0];
    const creaProd = individualProducts.find(p => p.id === 104) || individualProducts[1];
    const preProd = individualProducts.find(p => p.id === 106);

    const includePreworkout = (biometricGoal === 'rendimiento' || biometricTrainingDays >= 6) && preProd;
    const stackItems = includePreworkout ? [wheyProd, creaProd, preProd] : [wheyProd, creaProd];
    const stackIds = stackItems.filter(Boolean).map(p => p.id);

    const rawStackTotal = stackItems.reduce((sum, p) => sum + (p ? p.price : 0), 0);
    const transferStackTotal = Math.round(rawStackTotal * 0.85);

    const stackBadgeLabel = includePreworkout
        ? 'TRÍADA DE ALTO RENDIMIENTO'
        : (biometricGoal === 'definicion' ? 'PROTOCOLO DEFINICIÓN MAGRA' : 'PROTOCOLO HIPERTROFIA CLÍNICA');

    resultContainer.innerHTML = `
        <div class="bio-dashboard-inner">
            <!-- CABECERA: ANILLO BIOMÉTRICO + LECTURAS CLAVE -->
            <div class="bio-metrics-hero">
                <div class="bio-ring-box">
                    <svg class="bio-ring-svg" viewBox="0 0 104 104" aria-hidden="true">
                        <circle class="bio-ring-track" cx="52" cy="52" r="44"></circle>
                        <circle class="bio-ring-fill" cx="52" cy="52" r="44" style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${dashOffset};"></circle>
                    </svg>
                    <div class="bio-ring-center">
                        <span class="bio-ring-val">${totalProtein}<small>g</small></span>
                        <span class="bio-ring-sub">PROT / DÍA</span>
                    </div>
                </div>

                <div class="bio-kpis-col">
                    <div class="bio-kpi-item">
                        <span class="bio-kpi-label">Suplementación Whey Tofeprot</span>
                        <span class="bio-kpi-value">${recommendedScoopsWhey} ${recommendedScoopsWhey === 1 ? 'scoop' : 'scoops'} / día (${wheyGramsProvided}g puros)</span>
                        <span class="bio-kpi-note">Cubrís el ${wheyCoveragePct}% de tu meta diaria sin grasas ni azúcar</span>
                    </div>
                    <div class="bio-kpi-item">
                        <span class="bio-kpi-label">Saturación Creatina 200 Mesh</span>
                        <span class="bio-kpi-value">${totalCreatine} g / día (1 scoop)</span>
                        <span class="bio-kpi-note">Reposición de ATP para ${biometricTrainingDays} días/sem de exigencia</span>
                    </div>
                </div>
            </div>

            <!-- BARRAS GPU DE REQUERIMIENTO -->
            <div class="bio-bars-section">
                <div class="bio-bar-row">
                    <div class="bio-bar-labels">
                        <span>Síntesis Proteica (${proteinFactor} g/kg)</span>
                        <strong>${wheyGramsProvided}g Tofeprot + ${totalProtein - wheyGramsProvided}g dieta</strong>
                    </div>
                    <div class="bio-bar-track">
                        <div class="bio-bar-fill" style="transform: scaleX(${proteinScale});"></div>
                    </div>
                </div>

                <div class="bio-bar-row">
                    <div class="bio-bar-labels">
                        <span>Reserva Muscular de Fosfocreatina</span>
                        <strong>${totalCreatine} g / día · Malla 200</strong>
                    </div>
                    <div class="bio-bar-track">
                        <div class="bio-bar-fill" style="transform: scaleX(${creatineScale});"></div>
                    </div>
                </div>
            </div>

            <!-- PROTOCOLO / STACK RECOMENDADO CON 1-CLICK -->
            <div class="bio-stack-card">
                <div class="bio-stack-top">
                    <span class="bio-stack-tag">${stackBadgeLabel}</span>
                    <span class="bio-stack-Gift">+1 Doypack Gratis Incluido</span>
                </div>

                <div class="bio-stack-items">
                    ${stackItems.map(item => `
                        <div class="bio-stack-pill">
                            <span class="bio-stack-dot"></span>
                            <span class="bio-stack-name">${item.name}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="bio-stack-footer">
                    <div class="bio-stack-pricing">
                        <span class="bio-stack-transfer">${formatPrice(transferStackTotal)} <small>Transferencia (15% OFF)</small></span>
                        <span class="bio-stack-list-price">Precio de lista: ${formatPrice(rawStackTotal)} · Envío Gratis Incluido</span>
                    </div>
                    <button type="button" class="bio-equip-stack-btn" onclick="equipRecommendedStack([${stackIds.join(',')}], this)">
                        EQUIPAR PROTOCOLO
                    </button>
                </div>
            </div>
        </div>
    `;
}

function equipRecommendedStack(productIds, btnEl) {
    if (!Array.isArray(productIds) || productIds.length === 0) return;
    playSFX('equip');

    productIds.forEach(prodId => {
        const product = individualProducts.find(p => p.id === prodId);
        if (!product || getStock(prodId) <= 0) return;

        const existing = cart.find(i => i.type === 'product' && i.productId === prodId);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                type: 'product',
                id: Date.now() + Math.floor(Math.random() * 1000),
                productId: product.id,
                name: product.name,
                emoji: product.emoji,
                price: product.price,
                qty: 1
            });
        }
    });

    updateCartUI();
    saveState();

    if (btnEl) {
        const origText = btnEl.textContent;
        btnEl.textContent = '✓ PROTOCOLO EQUIPADO';
        btnEl.classList.add('ki-charge');
        setTimeout(() => {
            btnEl.classList.remove('ki-charge');
            btnEl.textContent = origText;
        }, 900);
    }

    setTimeout(() => {
        const cartModal = document.getElementById('cartModal');
        if (cartModal && !cartModal.classList.contains('active')) {
            toggleCart();
        }
    }, 240);
}

function verCertificado(nombre) {
    const prod = individualProducts.find(p => p.name === nombre) || individualProducts[0];
    openProductModal(prod.id);
    setModalTab('coa');
}

// ========================================== */
// TIENDA INDIVIDUAL (ARMERÍA EDITORIAL)      */
// ========================================== */
function getProductYieldLabel(product) {
    const servingsStr = (product.nutrition && product.nutrition.servingsPerTub) || '30 tomas';
    const numMatch = servingsStr.match(/\d+/);
    const numServings = numMatch ? parseInt(numMatch[0], 10) : 30;
    const perServing = Math.round(product.price / numServings);
    return {
        servingsTag: `${numServings} TOMAS`,
        perServingText: `${formatPrice(perServing)} / toma`
    };
}

function getProductCoaSummary(product) {
    const coa = product.coa || {};
    const batch = coa.batch || '#TF-8829';
    const purity = coa.purity || '99.8% Pureza';
    return `<span class="coa-meta-batch">Lote ${batch}</span><span class="coa-meta-dot">·</span><span class="coa-meta-purity">${purity}</span>`;
}

function renderTienda(items) {
    const grid = document.getElementById('tiendaGrid');
    if (!grid) return;

    const searchEl = document.getElementById('searchInput');
    const isSearching = searchEl && searchEl.value.trim().length > 0;
    const displayItems = isSearching ? items : items.filter(p => !p.isVariantOnly);

    if (displayItems.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 3rem;">No se encontraron suplementos con ese término.</div>';
        return;
    }
    grid.innerHTML = displayItems.map(product => {
        const stock = getStock(product.id);
        const isSoldOut = stock <= 0;
        const badgeHTML = product.badge ? `<div class="product-badge holographic-badge" id="prodBadge_${product.id}" data-badge="${product.badge}">${product.badge}</div>` : '';
        const soldOutBadge = isSoldOut ? `<div class="out-of-stock-badge">AGOTADO</div>` : '';
        const transferPrice = Math.round(product.price * 0.85);
        const installmentPrice = Math.round(product.price / 3);
        const yieldInfo = getProductYieldLabel(product);

        const specsHTML = product.specs ? `
            <div class="product-specs-list" id="prodSpecs_${product.id}">
                ${product.specs.map((s, i) => `<span class="product-spec-pill ${i === 0 ? 'highlight' : ''}">${s}</span>`).join('')}
            </div>
        ` : '';

        const coaMetaHTML = `
            <div class="product-rating" id="prodRating_${product.id}">
                ${getProductCoaSummary(product)}
            </div>
        `;

        const flavors = product.flavors && product.flavors.length > 0 ? product.flavors : null;
        const currentFlavorName = flavors ? flavors[0].name : '';

        const flavorSelectorHTML = (flavors && flavors.length > 1) ? `
            <div class="product-flavor-section" id="flavorSec_${product.id}">
                <div class="flavor-label-header">
                    <span class="flavor-label-caption">Variante / Sabor</span>
                    <span class="flavor-active-name" id="flavorActiveName_${product.id}">${currentFlavorName}</span>
                </div>
                <div class="flavor-pills-container" id="flavorPills_${product.id}" role="radiogroup" aria-label="Seleccionar variante de ${product.name}">
                    ${flavors.map((flv, idx) => `
                        <button type="button" 
                                class="flavor-pill-btn ${idx === 0 ? 'active' : ''}" 
                                style="--flavor-color: ${flv.color};" 
                                onclick="selectQuickFlavor(${product.id}, ${idx}, event)"
                                aria-pressed="${idx === 0 ? 'true' : 'false'}"
                                title="${flv.name}">
                            <span class="flavor-pill-dot" style="background: ${flv.color};"></span>
                            <span class="flavor-pill-text">${flv.short}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const actionsHTML = isSoldOut
            ? `<div class="product-card-actions"><button type="button" class="add-to-cart-btn" disabled style="opacity:0.5; cursor:not-allowed; border-color:#555; color:#888;">SIN STOCK</button></div>`
            : `
            <div class="product-card-actions">
                <div class="card-qty-stepper" aria-label="Cantidad">
                    <button type="button" class="card-qty-btn" onclick="changeCardQty(${product.id}, -1, event)" aria-label="Disminuir cantidad">−</button>
                    <span class="card-qty-val" id="cardQty_${product.id}">1</span>
                    <button type="button" class="card-qty-btn" onclick="changeCardQty(${product.id}, 1, event)" aria-label="Aumentar cantidad">+</button>
                </div>
                <button type="button" class="add-to-cart-btn" id="addBtn_${product.id}" data-current-id="${product.id}" data-base-id="${product.id}" onclick="addIndividualToCart(parseInt(this.dataset.currentId || ${product.id}), this, ${product.id})">EQUIPAR AL ARSENAL</button>
            </div>`;

        return `
            <article class="product-card ${isSoldOut ? 'is-sold-out' : ''}" id="prodCard_${product.id}">
                ${soldOutBadge}
                <div class="product-stage-top">
                    <span class="product-yield-pill" id="prodYield_${product.id}">${yieldInfo.servingsTag}</span>
                    ${badgeHTML}
                </div>
                <div class="product-image" id="prodImg_${product.id}" role="button" tabindex="0" aria-label="Ver ficha técnica de ${product.name}" onclick="openProductModal(parseInt(document.getElementById('addBtn_${product.id}')?.dataset?.currentId || ${product.id}))" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}" style="cursor: pointer;" title="Click para inspeccionar ficha técnica y certificado CoA">
                    <div class="product-tub-stage" id="prodTubStage_${product.id}">
                        ${product.customImage 
                            ? `<img src="${product.customImage}" alt="${product.name}" class="product-custom-img" style="max-height: 140px; max-width: 140px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 6px 15px rgba(0,0,0,0.7)); display:block;">` 
                            : getProductSVG(product.tubType, product.tubLabel, product.tubSub)}
                    </div>
                    <span class="product-stage-hint" aria-hidden="true">INSPECCIONAR FICHA & CoA ↗</span>
                </div>
                <div class="product-info">
                    <div class="product-meta-top">
                        ${coaMetaHTML}
                        <button type="button" class="product-modal-trigger" onclick="openProductModal(parseInt(document.getElementById('addBtn_${product.id}')?.dataset?.currentId || ${product.id}))">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 2v7.31a2 2 0 0 0 .69 1.51l5.62 4.9A2 2 0 0 1 17 17.24V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-2.76a2 2 0 0 1 .69-1.51l5.62-4.9A2 2 0 0 0 14 9.31V2"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line></svg>
                            <span>Ficha & CoA →</span>
                        </button>
                    </div>
                    <h3 class="product-name" id="prodName_${product.id}" role="button" tabindex="0" onclick="openProductModal(parseInt(document.getElementById('addBtn_${product.id}')?.dataset?.currentId || ${product.id}))" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}" style="cursor: pointer;" title="Ver Ficha Técnica">${product.name}</h3>
                    <p class="product-desc" id="prodDesc_${product.id}">${product.description}</p>
                    ${specsHTML}
                    ${flavorSelectorHTML}
                    <div class="product-price" id="prodPrice_${product.id}">
                        <div class="price-container">
                            <div class="price-main-row">
                                <span class="price">${formatPrice(product.price)}</span>
                                <span class="price-per-serving">${yieldInfo.perServingText}</span>
                            </div>
                            <div class="price-sub-row">
                                <span class="transfer-discount-badge">${formatPrice(transferPrice)} Transferencia (15% OFF)</span>
                                <span class="installments-caption">3 cuotas sin interés de ${formatPrice(installmentPrice)}</span>
                            </div>
                        </div>
                    </div>
                    ${actionsHTML}
                </div>
            </article>
        `;
    }).join('');
}

function changeCardQty(baseProductId, delta, event) {
    if (event) event.stopPropagation();
    playSFX('click');
    const qtyEl = document.getElementById(`cardQty_${baseProductId}`);
    if (!qtyEl) return;
    let current = parseInt(qtyEl.textContent, 10) || 1;
    current = Math.max(1, Math.min(10, current + delta));
    qtyEl.textContent = current;
}

function selectQuickFlavor(baseProductId, flavorIdx, event) {
    if (event) event.stopPropagation();
    playSFX('click');

    const baseProduct = individualProducts.find(p => p.id === baseProductId);
    if (!baseProduct || !baseProduct.flavors || !baseProduct.flavors[flavorIdx]) return;

    const selectedFlavor = baseProduct.flavors[flavorIdx];
    const targetVariantId = selectedFlavor.id;
    const targetProduct = individualProducts.find(p => p.id === targetVariantId) || baseProduct;

    // 1. Actualizar botones de pastillas activas
    const pillsContainer = document.getElementById(`flavorPills_${baseProductId}`);
    if (pillsContainer) {
        const buttons = pillsContainer.querySelectorAll('.flavor-pill-btn');
        buttons.forEach((btn, i) => {
            const isSelected = i === flavorIdx;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
        });
    }

    // 2. Actualizar nombre del sabor activo en el label
    const labelEl = document.getElementById(`flavorActiveName_${baseProductId}`);
    if (labelEl) {
        labelEl.textContent = selectedFlavor.name;
    }

    // 3. Actualizar nombre del producto (incluyendo sub-variante si comparte ID como Pre-entreno)
    const nameEl = document.getElementById(`prodName_${baseProductId}`);
    if (nameEl) {
        if (targetVariantId === baseProductId && baseProduct.flavors.length > 1) {
            nameEl.textContent = `${baseProduct.name} - ${selectedFlavor.short}`;
        } else {
            nameEl.textContent = targetProduct.name;
        }
    }

    // 4. Actualizar descripción si la variante tiene una propia
    const descEl = document.getElementById(`prodDesc_${baseProductId}`);
    if (descEl && targetProduct.description) {
        descEl.textContent = targetProduct.description;
    }

    // 5. Actualizar specs, badge, lote CoA y rendimiento
    const specsEl = document.getElementById(`prodSpecs_${baseProductId}`);
    if (specsEl && targetProduct.specs) {
        specsEl.innerHTML = targetProduct.specs.map((s, i) => `<span class="product-spec-pill ${i === 0 ? 'highlight' : ''}">${s}</span>`).join('');
    }

    const badgeEl = document.getElementById(`prodBadge_${baseProductId}`);
    if (badgeEl && targetProduct.badge) {
        badgeEl.textContent = targetProduct.badge;
        badgeEl.setAttribute('data-badge', targetProduct.badge);
    }

    const ratingEl = document.getElementById(`prodRating_${baseProductId}`);
    if (ratingEl) {
        ratingEl.innerHTML = getProductCoaSummary(targetProduct);
    }

    const yieldInfo = getProductYieldLabel(targetProduct);
    const yieldEl = document.getElementById(`prodYield_${baseProductId}`);
    if (yieldEl) {
        yieldEl.textContent = yieldInfo.servingsTag;
    }

    // 6. Actualizar imagen o SVG del pote
    const tubStageEl = document.getElementById(`prodTubStage_${baseProductId}`);
    if (tubStageEl) {
        if (targetProduct.customImage) {
            tubStageEl.innerHTML = `<img src="${targetProduct.customImage}" alt="${targetProduct.name}" class="product-custom-img" style="max-height: 140px; max-width: 140px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 6px 15px rgba(0,0,0,0.7)); display:block;">`;
        } else {
            const tubType = selectedFlavor.tubType || targetProduct.tubType || baseProduct.tubType;
            const tubLabel = targetProduct.tubLabel || baseProduct.tubLabel;
            const tubSub = selectedFlavor.tubSub || targetProduct.tubSub || baseProduct.tubSub;
            tubStageEl.innerHTML = getProductSVG(tubType, tubLabel, tubSub);
        }
    }

    // 7. Actualizar precio, transferencia y cuotas
    const priceEl = document.getElementById(`prodPrice_${baseProductId}`);
    if (priceEl) {
        const transferPrice = Math.round(targetProduct.price * 0.85);
        const installmentPrice = Math.round(targetProduct.price / 3);
        priceEl.innerHTML = `
            <div class="price-container">
                <div class="price-main-row">
                    <span class="price">${formatPrice(targetProduct.price)}</span>
                    <span class="price-per-serving">${yieldInfo.perServingText}</span>
                </div>
                <div class="price-sub-row">
                    <span class="transfer-discount-badge">${formatPrice(transferPrice)} Transferencia (15% OFF)</span>
                    <span class="installments-caption">3 cuotas sin interés de ${formatPrice(installmentPrice)}</span>
                </div>
            </div>
        `;
    }

    // 8. Actualizar botón de agregar al carrito con el ID de la variante
    const btn = document.getElementById(`addBtn_${baseProductId}`);
    if (btn) {
        btn.dataset.currentId = targetVariantId;
        const stock = getStock(targetVariantId);
        if (stock <= 0) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.textContent = 'SIN STOCK';
        } else {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.textContent = 'EQUIPAR AL ARSENAL';
        }
    }

    // 9. Feedback visual animado en la tarjeta
    const card = document.getElementById(`prodCard_${baseProductId}`);
    if (card) {
        card.classList.remove('flavor-swap-active');
        void card.offsetWidth; // trigger reflow
        card.classList.add('flavor-swap-active');
    }
}

function addIndividualToCart(productId, btnElement, baseCardId) {
    playSFX('equip');
    if (getStock(productId) <= 0) {
        alert('⚠️ Este producto se encuentra actualmente agotado.');
        return;
    }
    if (typeof trackEvent === 'function') {
        trackEvent('add_to_cart', { productId: productId });
    }

    const product = individualProducts.find(p => p.id === productId);
    if (!product) return;

    let qtyToAdd = 1;
    if (baseCardId) {
        const qtyEl = document.getElementById(`cardQty_${baseCardId}`);
        if (qtyEl) {
            qtyToAdd = Math.max(1, parseInt(qtyEl.textContent, 10) || 1);
            qtyEl.textContent = '1';
        }
    }

    if (btnElement) {
        btnElement.classList.add('ki-charge');
        btnElement.textContent = `✓ EQUIPADO (${qtyToAdd})`;
        setTimeout(() => {
            btnElement.classList.remove('ki-charge');
            btnElement.textContent = btnElement.classList.contains('side-prod-btn') ? '+ EQUIPAR' : 'EQUIPAR AL ARSENAL';
        }, 650);
    }

    const existing = cart.find(i => i.type === 'product' && i.productId === productId);
    if (existing) {
        existing.qty += qtyToAdd;
    } else {
        cart.push({
            type: 'product',
            id: Date.now(),
            productId: product.id,
            name: product.name,
            emoji: product.emoji,
            price: product.price,
            qty: qtyToAdd
        });
    }
    updateCartUI();
    saveState();
}

function removeIndividualFromCart(cartItemId) {
    cart = cart.filter(i => i.id !== cartItemId);
    updateCartUI();
    saveState();
}

function changeIndividualQty(cartItemId, delta) {
    const item = cart.find(i => i.id === cartItemId && i.type === 'product');
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        removeIndividualFromCart(cartItemId);
    } else {
        updateCartUI();
        saveState();
    }
}

// ========================================== */
// CONFIGURADOR DE LOOT BOX (PRUEBA DE PODER) */
// ========================================== */
function renderProducts(itemsToRender) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    if (itemsToRender.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; color: var(--text-muted); padding: 3rem;">[ No se encontraron muestras de Loot Box con ese término ]</div>';
        return;
    }

    grid.innerHTML = itemsToRender.map(product => {
        const stock = getStock(product.id);
        const isSoldOut = stock <= 0;
        const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
        const soldOutBadge = isSoldOut ? `<div class="out-of-stock-badge">AGOTADO</div>` : '';
        const btnHTML = isSoldOut
            ? `<button class="add-to-cart-btn" disabled style="opacity:0.5; cursor:not-allowed; border-color:#555; color:#888;">SIN STOCK</button>`
            : `<button class="add-to-cart-btn btn-shimmer" onclick="addToLootBox(${product.id}, this)">AGREGAR A LA CAJA</button>`;

        return `
            <div class="product-card card-3d-tilt ${isSoldOut ? 'is-sold-out' : ''}">
                ${soldOutBadge}
                ${badgeHTML}
                <div class="product-image"><span>${product.emoji}</span></div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-desc">${product.description}</div>
                    ${btnHTML}
                </div>
            </div>
        `;
    }).join('');
    initCard3DTilt();
}

function addToLootBox(productId, btnElement) {
    if (getStock(productId) <= 0) {
        alert('⚠️ Esta muestra de 30g se encuentra temporalmente agotada.');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const emptySlotIndex = currentLootBox.findIndex(slot => slot === null);
    if (emptySlotIndex === -1) {
        alert('⚠️ Tu caja ya está completa (3 muestras). Tocá un sabor de los slots para quitarlo o sellá tu Loot Box.');
        return;
    }

    currentLootBox[emptySlotIndex] = product;
    updateLootBoxUI();
    
    if (btnElement) {
        btnElement.classList.add('ki-charge');
        btnElement.textContent = "CARGADO!";
        setTimeout(() => {
            btnElement.classList.remove('ki-charge');
            btnElement.textContent = "AGREGAR A LA CAJA";
        }, 500);
    }
}

function clearSlot(index) {
    currentLootBox[index - 1] = null;
    updateLootBoxUI();
}

function updateLootBoxUI() {
    let filledSlots = 0;
    for (let i = 0; i < 3; i++) {
        const slotEl = document.getElementById(`slot${i+1}`);
        if (!slotEl) continue;
        const item = currentLootBox[i];
        if (item) {
            slotEl.classList.add('filled');
            slotEl.innerHTML = `
                <span style="font-size: 1.8rem;">${item.emoji}</span>
                <b style="color:var(--text-main); font-size: 0.72rem; line-height:1.2;">${item.name}</b>
                <span class="slot-weight-tag">30g</span>
            `;
            slotEl.style.borderColor = "var(--accent-purple)";
            slotEl.style.background = "rgba(157, 0, 255, 0.12)";
            filledSlots++;
        } else {
            slotEl.classList.remove('filled');
            slotEl.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">Slot #${i+1}</span><small style="color:var(--text-muted); font-size:0.65rem;">(Vacío)</small>`;
            slotEl.style.borderColor = "var(--border-color)";
            slotEl.style.background = "transparent";
        }
    }

    const btn = document.getElementById('addLootBoxBtn');
    if (btn) {
        if (filledSlots === 3) {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.textContent = "Sellar Caja y Agregar";
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.textContent = `Faltan ${3 - filledSlots} muestras`;
        }
    }
}

// ========================================== */
// FUNCIÓN DROP ALEATORIO / SORPRÉNDEME       */
// ========================================== */
function randomDrop() {
    const available = products.filter(p => getStock(p.id) > 0);
    if (available.length < 3) {
        alert('⚠️ No hay suficientes muestras disponibles en stock para armar un drop aleatorio.');
        return;
    }

    // Priorizar combinación balanceada: 2 proteínas + 1 creatina si hay stock
    const proteins = available.filter(p => p.badge === 'Proteína');
    const creatines = available.filter(p => p.badge === 'Creatina');

    let chosen = [];
    if (proteins.length >= 2 && creatines.length >= 1) {
        const shuffProt = [...proteins].sort(() => 0.5 - Math.random());
        const shuffCrea = [...creatines].sort(() => 0.5 - Math.random());
        chosen = [shuffProt[0], shuffProt[1] || shuffProt[0], shuffCrea[0]];
    } else {
        const shuffled = [...available].sort(() => 0.5 - Math.random());
        chosen = [shuffled[0], shuffled[1], shuffled[2]];
    }

    currentLootBox = chosen;
    updateLootBoxUI();

    const btn = document.getElementById('randomDropBtn');
    if (btn) {
        btn.classList.add('ki-charge');
        const origHTML = btn.innerHTML;
        btn.innerHTML = '⚡ ¡DROP SELLADO!';
        setTimeout(() => {
            btn.classList.remove('ki-charge');
            btn.innerHTML = origHTML;
        }, 700);
    }
}

function addLootBoxToCart() {
    if (currentLootBox.includes(null)) return;
    cart.push({
        type: 'lootbox',
        id: Date.now(),
        items: [...currentLootBox],
        cartQuantity: 1
    });
    currentLootBox = [null, null, null];
    updateLootBoxUI();
    updateCartUI();
    saveState();
    toggleCart();
}

function removeFromCart(boxId) {
    cart = cart.filter(item => item.id !== boxId);
    updateCartUI();
    saveState();
}

let selectedPaymentMethod = 'transfer'; // 'transfer' | 'card'

function setPaymentMethod(method) {
    selectedPaymentMethod = method;
    const btnTransfer = document.getElementById('payTransferBtn');
    const btnCard = document.getElementById('payCardBtn');
    if (btnTransfer && btnCard) {
        if (method === 'transfer') {
            btnTransfer.classList.add('active');
            btnCard.classList.remove('active');
        } else {
            btnCard.classList.add('active');
            btnTransfer.classList.remove('active');
        }
    }
    updateCartUI();
}

// ========================================== */
// MOTOR DE BUNDLES DINÁMICOS EN EL CARRITO   */
// ========================================== */
function evaluateCartBundle() {
    if (!cart || cart.length === 0) return null;

    // Verificar categorías presentes en el carrito actual
    const hasProtein = cart.some(i => {
        const n = (i.name || '').toLowerCase();
        return n.includes('proteína') || n.includes('whey') || [101, 102, 103].includes(i.productId);
    });

    const hasCreatine = cart.some(i => {
        const n = (i.name || '').toLowerCase();
        return n.includes('creatina') || [104, 105].includes(i.productId);
    });

    const hasPreworkout = cart.some(i => {
        const n = (i.name || '').toLowerCase();
        return n.includes('pre-entreno') || n.includes('berserk') || [106].includes(i.productId);
    });

    const isProductInCart = (prodId) => cart.some(i => i.productId === prodId);

    // Regla 1: Tiene Proteína pero NO Creatina -> Sinergia Hipertrofia & ATP (15% OFF)
    if (hasProtein && !hasCreatine) {
        const target = individualProducts.find(p => p.id === 104) || individualProducts.find(p => (p.name || '').toLowerCase().includes('creatina') && !isProductInCart(p.id));
        if (target && getStock(target.id) > 0) {
            return {
                type: 'offer',
                product: target,
                discountPct: 15,
                bundlePrice: Math.round(target.price * 0.85),
                title: 'COMBO HIPERTROFIA & FUERZA',
                synergy: 'La sinergia perfecta: combiná Whey con Creatina Micronizada para acelerar la síntesis celular y duplicar tu fuerza.'
            };
        }
    }

    // Regla 2: Tiene Creatina pero NO Proteína -> Sinergia Recuperación Total (15% OFF)
    if (hasCreatine && !hasProtein) {
        const isLight = document.body.classList.contains('theme-light');
        const targetId = isLight ? 101 : 102; // Vainilla (Luz) o Chocolate (Berserk)
        const target = individualProducts.find(p => p.id === targetId) || individualProducts.find(p => (p.name || '').toLowerCase().includes('proteína') && !isProductInCart(p.id));
        if (target && getStock(target.id) > 0) {
            return {
                type: 'offer',
                product: target,
                discountPct: 15,
                bundlePrice: Math.round(target.price * 0.85),
                title: 'COMBO RECUPERACIÓN TOTAL',
                synergy: 'Asegurá 25g de proteína pura y 5.5g de BCAAs post-entreno para capitalizar el empuje y volumen de la creatina.'
            };
        }
    }

    // Regla 3: Tiene Proteína Y Creatina pero NO Pre-entreno -> Tríada de Poder Berserk (20% OFF)
    if (hasProtein && hasCreatine && !hasPreworkout) {
        const target = individualProducts.find(p => p.id === 106) || individualProducts.find(p => (p.name || '').toLowerCase().includes('pre-entreno') && !isProductInCart(p.id));
        if (target && getStock(target.id) > 0) {
            return {
                type: 'offer',
                product: target,
                discountPct: 20,
                bundlePrice: Math.round(target.price * 0.80),
                title: 'TRÍADA DE PODER LEGENDARIA',
                synergy: 'Desbloqueá el combo definitivo: 300mg de cafeína y 6g de citrulina pura para vasodilatación extrema y foco al fallo.'
            };
        }
    }

    // Regla 4: Tiene Pre-entreno pero le falta Creatina o Proteína
    if (hasPreworkout) {
        if (!hasCreatine) {
            const target = individualProducts.find(p => p.id === 104 && !isProductInCart(p.id));
            if (target && getStock(target.id) > 0) {
                return {
                    type: 'offer',
                    product: target,
                    discountPct: 15,
                    bundlePrice: Math.round(target.price * 0.85),
                    title: 'COMBO ENERGÍA & FUERZA ATP',
                    synergy: 'Combiná el bombeo del pre-entreno con la fuerza sostenida de la creatina micronizada pura.'
                };
            }
        }
        if (!hasProtein) {
            const target = individualProducts.find(p => [101, 102].includes(p.id) && !isProductInCart(p.id));
            if (target && getStock(target.id) > 0) {
                return {
                    type: 'offer',
                    product: target,
                    discountPct: 15,
                    bundlePrice: Math.round(target.price * 0.85),
                    title: 'COMBO RESISTENCIA & REPARACIÓN',
                    synergy: 'Reparación inmediata de fibras musculares al terminar la intensidad del pre-entreno.'
                };
            }
        }
    }

    // Regla 5: Cualquier otro producto o Loot Box -> Ofrecer el mejor suplemento no presente en el carrito
    const unownedProduct = individualProducts.find(p => !isProductInCart(p.id) && getStock(p.id) > 0);
    if (unownedProduct) {
        return {
            type: 'offer',
            product: unownedProduct,
            discountPct: 15,
            bundlePrice: Math.round(unownedProduct.price * 0.85),
            title: 'BUNDLE COMPLEMENTARIO',
            synergy: 'Sumá este suplemento a tu orden con un 15% OFF exclusivo de combo y maximizá tus resultados.'
        };
    }

    // Regla 6: Ya tiene todos los suplementos en el carrito
    return {
        type: 'completed',
        title: '¡ARSENAL COMPLETO ACTIVADO!',
        description: 'Tenés la combinación definitiva de suplementación. Tu rendimiento alcanzará el rango legendario.'
    };
}

function renderCartBundleOffer() {
    const container = document.getElementById('cartBundleContainer');
    if (!container) return;

    if (!cart || cart.length === 0) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    const offer = evaluateCartBundle();
    if (!offer) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }

    container.style.display = 'block';

    if (offer.type === 'completed') {
        container.innerHTML = `
            <div class="cart-bundle-completed">
                <div class="cart-bundle-completed-icon" style="font-family:var(--font-display, 'Russo One', sans-serif); font-size:0.75rem; color:var(--accent-purple); border:1px solid var(--accent-purple); padding:4px 8px; border-radius:4px;">MAX</div>
                <div>
                    <div class="cart-bundle-completed-title">${offer.title}</div>
                    <div class="cart-bundle-completed-desc">${offer.description}</div>
                </div>
            </div>
        `;
        return;
    }

    const prod = offer.product;
    const savingsAmount = prod.price - offer.bundlePrice;

    let thumbHtml = '';
    if (prod.customImage) {
        thumbHtml = `<img src="${prod.customImage}" alt="${prod.name}">`;
    } else if (typeof getProductSVG === 'function') {
        thumbHtml = getProductSVG(prod.tubType || 'creatine', prod.tubLabel || 'SUPP', prod.tubSub || 'CLINICAL');
    }

    container.innerHTML = `
        <div class="cart-bundle-card">
            <div class="cart-bundle-header">
                <span class="cart-bundle-tag">${offer.title}</span>
                <span class="cart-bundle-discount-badge">-${offer.discountPct}% OFF</span>
            </div>
            <div class="cart-bundle-body">
                <div class="cart-bundle-thumb">
                    ${thumbHtml}
                </div>
                <div class="cart-bundle-details">
                    <div class="cart-bundle-name">${prod.name}</div>
                    <div class="cart-bundle-synergy">${offer.synergy}</div>
                    <div class="cart-bundle-pricing">
                        <span class="cart-bundle-price-orig">${formatPrice(prod.price)}</span>
                        <span class="cart-bundle-price-promo">${formatPrice(offer.bundlePrice)}</span>
                        <span style="font-size:0.7rem; color:#00ff88; font-weight:bold;">(Ahorrás ${formatPrice(savingsAmount)})</span>
                    </div>
                </div>
            </div>
            <div class="cart-bundle-action">
                <button type="button" class="cart-bundle-btn" onclick="addBundleToCart(${prod.id}, ${offer.discountPct}, ${offer.bundlePrice})">
                    <span>SUMAR AL ARSENAL (+${formatPrice(offer.bundlePrice)})</span>
                </button>
            </div>
        </div>
    `;
}

function addBundleToCart(productId, discountPct, bundlePrice) {
    playSFX('equip');
    if (getStock(productId) <= 0) {
        alert('⚠️ Este suplemento se encuentra agotado.');
        return;
    }
    const product = individualProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(i => i.type === 'product' && i.productId === productId);
    if (existing) {
        existing.qty++;
        if (!existing.isBundle) {
            existing.isBundle = true;
            existing.bundleDiscountPct = discountPct;
            existing.price = bundlePrice;
            existing.originalPrice = product.price;
        }
    } else {
        cart.push({
            type: 'product',
            id: Date.now(),
            productId: product.id,
            name: product.name,
            emoji: product.emoji,
            price: bundlePrice,
            originalPrice: product.price,
            isBundle: true,
            bundleDiscountPct: discountPct,
            qty: 1
        });
    }

    updateCartUI();
    saveState();
}

// ========================================== */
// CARRITO DE COMPRAS                         */
// ========================================== */
function updateCartUI() {
    // Si solo queda 1 ítem en el carrito y era bundle, restablecer a precio individual
    if (cart.length === 1 && cart[0].isBundle) {
        cart[0].isBundle = false;
        if (cart[0].originalPrice) cart[0].price = cart[0].originalPrice;
        saveState();
    }

    const count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = count;
        cartCountEl.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    const cartHeaderSub = document.getElementById('cartHeaderCountSub');
    if (cartHeaderSub) {
        cartHeaderSub.textContent = `${count} ${count === 1 ? 'producto' : 'productos'}`;
    }

    const floatingCartBadge = document.getElementById('floatingCartBadge');
    if (floatingCartBadge) {
        floatingCartBadge.textContent = count;
        floatingCartBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    const cartItems = document.getElementById('cartItems');
    const giftNoticeEl = document.getElementById('cartGiftNotice');
    const savingsRowEl = document.getElementById('cartSavingsRow');
    const savingsAmountEl = document.getElementById('cartSavingsAmount');
    const bundleContainer = document.getElementById('cartBundleContainer');
    const shippingTextEl = document.getElementById('cartShippingText');
    const shippingFillEl = document.getElementById('cartShippingFill');

    if (!cartItems) return;

    const rawSubtotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const FREE_SHIPPING_THRESHOLD = 65000;
    if (shippingTextEl && shippingFillEl) {
        const pct = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
        shippingFillEl.style.width = `${pct}%`;
        if (rawSubtotal === 0) {
            shippingTextEl.innerHTML = `Sumá <strong>$65.000</strong> para desbloquear <strong>ENVÍO GRATIS</strong>`;
            shippingFillEl.classList.remove('unlocked');
        } else if (rawSubtotal >= FREE_SHIPPING_THRESHOLD) {
            shippingTextEl.innerHTML = `<span style="color:#00ff88; font-weight:700;">✓ ¡ENVÍO GRATIS DESBLOQUEADO EN TU ORDEN!</span>`;
            shippingFillEl.classList.add('unlocked');
        } else {
            const missing = FREE_SHIPPING_THRESHOLD - rawSubtotal;
            shippingTextEl.innerHTML = `Te faltan <strong>${formatPrice(missing)}</strong> para <strong>ENVÍO GRATIS</strong>`;
            shippingFillEl.classList.remove('unlocked');
        }
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-title">TU ARSENAL ESTÁ VACÍO</div>
                <p class="empty-cart-sub">Seleccioná tus suplementos clínicos en la tienda para armar tu orden.</p>
            </div>
        `;
        if (giftNoticeEl) giftNoticeEl.style.display = 'none';
        if (savingsRowEl) savingsRowEl.style.display = 'none';
        if (bundleContainer) {
            bundleContainer.style.display = 'none';
            bundleContainer.innerHTML = '';
        }
        const totalEl = document.getElementById('cartTotal');
        if (totalEl) totalEl.textContent = "$0";
        return;
    }

    if (giftNoticeEl) giftNoticeEl.style.display = 'flex';
    cartItems.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        const bundleBadge = item.isBundle 
            ? `<span class="bundle-item-badge">COMBO -${item.bundleDiscountPct || 15}%</span>` 
            : '';
        return `
            <div class="cart-item">
                <div class="cart-item-top">
                    <div class="cart-item-name">${item.name} ${bundleBadge}</div>
                    <div class="cart-item-price">${formatPrice(itemTotal)}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-qty-stepper">
                        <button type="button" class="cart-qty-btn" onclick="changeIndividualQty(${item.id}, -1)" aria-label="Restar unidad">−</button>
                        <span class="cart-qty-val">${item.qty}</span>
                        <button type="button" class="cart-qty-btn" onclick="changeIndividualQty(${item.id}, 1)" aria-label="Sumar unidad">+</button>
                    </div>
                    <button type="button" class="cart-remove-link" onclick="removeIndividualFromCart(${item.id})">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');

    // Actualizar oferta interactiva de Bundle Dinámico
    renderCartBundleOffer();

    const discountAmount = selectedPaymentMethod === 'transfer' ? Math.round(rawSubtotal * 0.15) : 0;
    const subtotalAfterDiscount = rawSubtotal - discountAmount;

    const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
    const shipping = (rawSubtotal > 0 && !isFreeShipping) ? 5000 : 0;
    const finalTotal = subtotalAfterDiscount + shipping;

    if (savingsRowEl && savingsAmountEl) {
        if (selectedPaymentMethod === 'transfer' && discountAmount > 0) {
            savingsRowEl.style.display = 'flex';
            savingsAmountEl.textContent = `-${formatPrice(discountAmount)}`;
        } else {
            savingsRowEl.style.display = 'none';
        }
    }

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) totalEl.textContent = formatPrice(finalTotal);
}

// ========================================== */
// ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)     */
// ========================================== */
function toggleFaq(headerEl) {
    const item = headerEl.closest('.faq-item');
    if (!item) return;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) {
        item.classList.add('active');
    }
}

// ========================================== */
// MOTOR DE SOCIAL PROOF (VENTAS EN VIVO)     */
// ========================================== */
const SOCIAL_PROOF_EVENTS = [
    { name: "Lucas", city: "Córdoba Capital", product: "Creatina Monohidrato 300g", time: "hace 3 minutos", icon: "⚡" },
    { name: "Micaela", city: "Palermo, CABA", product: "Proteína Whey Frutilla + Muestra Gratis", time: "hace 7 minutos", icon: "🎁" },
    { name: "Facundo", city: "Rosario", product: "Pre-entreno Berserk 300g", time: "hace 12 minutos", icon: "🚀" },
    { name: "Gonzalo", city: "Mendoza", product: "Proteína Whey 1kg Chocolate", time: "hace 18 minutos", icon: "🍫" },
    { name: "Agustina", city: "La Plata", product: "Creatina Citrus + Muestra Gratis", time: "hace 24 minutos", icon: "🍋" },
    { name: "Joaquín", city: "Mar del Plata", product: "Proteína Whey Vainilla + Creatina 300g", time: "hace 31 minutos", icon: "🥛" }
];

let socialProofIndex = 0;
let socialProofInterval = null;

function startSocialProofEngine() {
    // Desactivado: sin notificaciones falsas de ventas en vivo
}

function showNextSocialProof() {
    const toast = document.getElementById('liveSalesToast');
    const toastText = document.getElementById('toastText');
    const toastTime = document.getElementById('toastTime');
    const toastIcon = document.getElementById('toastIcon');
    if (!toast || !toastText) return;

    const ev = SOCIAL_PROOF_EVENTS[socialProofIndex];
    socialProofIndex = (socialProofIndex + 1) % SOCIAL_PROOF_EVENTS.length;

    if (toastIcon) toastIcon.textContent = ev.icon;
    toastText.innerHTML = `<strong>${ev.name} de ${ev.city}</strong> compró ${ev.product}`;
    if (toastTime) toastTime.textContent = `${ev.time} • Compra Verificada ✓`;

    toast.style.display = 'flex';
    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { if (!toast.classList.contains('show')) toast.style.display = 'none'; }, 400);
    }, 6000);
}

function closeSalesToast(e) {
    if (e) e.stopPropagation();
    const toast = document.getElementById('liveSalesToast');
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.style.display = 'none', 400);
    }
}

// ========================================== */
// MODALES Y MENÚS                            */
// ========================================== */
function toggleMobileMenu() {
    toggleNavDrawer();
}

function toggleNavDrawer() {
    const drawer = document.getElementById('navDrawerPanel');
    if (!drawer) return;
    if (drawer.classList.contains('active')) {
        closeNavDrawer();
    } else {
        openNavDrawer();
    }
}

function openNavDrawer() {
    const drawer = document.getElementById('navDrawerPanel');
    const backdrop = document.getElementById('navDrawerBackdrop');
    const floatingBtn = document.getElementById('floatingNavBtn');
    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    if (floatingBtn) floatingBtn.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
}

function closeNavDrawer() {
    const drawer = document.getElementById('navDrawerPanel');
    const backdrop = document.getElementById('navDrawerBackdrop');
    const floatingBtn = document.getElementById('floatingNavBtn');
    const cartModal = document.getElementById('cartModal');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    if (floatingBtn && !cartModal?.classList.contains('active')) {
        floatingBtn.classList.remove('drawer-open');
    }
    if (!cartModal?.classList.contains('active') &&
        !document.getElementById('authModal')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.toggle('active');
    if (modal && modal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else if (!document.getElementById('cartModal')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function toggleLoginRegister() {
    const login = document.getElementById('loginForm');
    const reg = document.getElementById('registerForm');
    if (login && reg) {
        login.style.display = login.style.display === 'none' ? 'block' : 'none';
        reg.style.display = reg.style.display === 'none' ? 'block' : 'none';
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    const backdrop = document.getElementById('cartBackdrop');
    const floatingBtn = document.getElementById('floatingNavBtn');
    const navDrawer = document.getElementById('navDrawerPanel');
    if (modal) modal.classList.toggle('active');
    if (backdrop) backdrop.classList.toggle('active');
    const isCartOpen = modal && modal.classList.contains('active');
    if (floatingBtn) {
        if (isCartOpen || navDrawer?.classList.contains('active')) {
            floatingBtn.classList.add('drawer-open');
        } else {
            floatingBtn.classList.remove('drawer-open');
        }
    }
    if (isCartOpen) {
        document.body.style.overflow = 'hidden';
        if (typeof startCartTimer === 'function' && cart.length > 0) startCartTimer();
    } else if (!document.getElementById('authModal')?.classList.contains('active') && !navDrawer?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function toggleUserProfile() { 
    const up = document.getElementById('userProfile');
    if (up) up.classList.toggle('active'); 
}

// ========================================== */
// GESTIÓN DE USUARIOS                        */
// ========================================== */
function login() {
    const email = document.getElementById('loginEmail').value.trim();
    if (!email) return alert('Por favor, ingresa tu email.');
    currentUser = { email };
    saveState();
    updateAuthUI();
    toggleAuthModal();
}

function register() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    if (!name || !email) return alert('Por favor, completa los campos requeridos.');
    
    currentUser = { name, email };
    saveState();
    updateAuthUI();
    updateCartUI();
    toggleAuthModal();
}

function logout() {
    currentUser = null;
    saveState();
    updateAuthUI();
    toggleUserProfile();
    updateCartUI();
}

function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const mobileAuthBtn = document.querySelector('.mobile-auth-btn');

    if (currentUser) {
        if (authBtn) authBtn.style.display = 'none';
        if (mobileAuthBtn) mobileAuthBtn.style.display = 'none';
        if (userProfileBtn) userProfileBtn.style.display = 'block';
        const profileEmail = document.getElementById('profileEmail');
        if (profileEmail) profileEmail.textContent = currentUser.name ? `${currentUser.name} (${currentUser.email})` : currentUser.email;
    } else {
        if (authBtn) authBtn.style.display = 'block';
        if (mobileAuthBtn) mobileAuthBtn.style.display = 'block';
        if (userProfileBtn) userProfileBtn.style.display = 'none';
    }
}

// ========================================== */
// CHECKOUT CON WHATSAPP (PESOS ARS)          */
// ========================================== */
function checkout() {
    if (cart.length === 0) {
        alert('⚔️ Tu arsenal está vacío. Agregá suplementos a tu carrito antes de iniciar la transacción.');
        return;
    }

    let buyerName = currentUser ? (currentUser.name || currentUser.email) : "";
    let buyerEmail = currentUser ? currentUser.email : "";

    if (!buyerName) {
        const guestName = prompt("⚡ Ingresa tu nombre o apodo de guerrero para preparar tu orden:");
        if (!guestName || guestName.trim() === "") return;
        buyerName = guestName.trim();
    }

    let msg = `⚡ *NUEVO PEDIDO - TOFEPROT* ⚡\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Guerrero:* ${buyerName}\n`;
    if (buyerEmail) msg += `📧 *Email:* ${buyerEmail}\n`;
    msg += `💳 *Método de Pago:* ${selectedPaymentMethod === 'transfer' ? '🏦 Transferencia Bancaria (15% OFF Extra)' : '💳 Tarjeta / Mercado Pago (3 Cuotas)'}\n`;
    msg += `⚖️ *Bando:* ${document.body.classList.contains('theme-light') ? 'Iluminado (Luz/Oro)' : 'Berserker (Oscuridad)'}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;

    msg += `🛒 *PRODUCTOS SOLICITADOS:*\n`;
    let rawSubtotal = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        rawSubtotal += itemTotal;
        const bundleTag = item.isBundle ? ` ⚡ [COMBO BUNDLE -${item.bundleDiscountPct || 15}% OFF]` : '';
        msg += `${index + 1}. ${item.emoji} *${item.name}*${bundleTag} x${item.qty} -> ${formatPrice(itemTotal)}\n`;
    });

    const totalBundleSavings = cart.reduce((sum, item) => item.isBundle ? sum + (((item.originalPrice || item.price) - item.price) * item.qty) : sum, 0);

    msg += `\n🎁 *REGALO EXCLUSIVO INCLUIDO:*\n`;
    msg += `• 1x Doypack de Muestra (Proteína / Pre-entreno Importado) BONIFICADO $0\n`;

    const discountAmount = selectedPaymentMethod === 'transfer' ? Math.round(rawSubtotal * 0.15) : 0;
    const subtotalAfterDiscount = rawSubtotal - discountAmount;
    const isFreeShipping = rawSubtotal >= 65000;
    const shipping = (rawSubtotal > 0 && !isFreeShipping) ? 5000 : 0;
    const finalTotal = subtotalAfterDiscount + shipping;

    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *Subtotal Carrito:* ${formatPrice(rawSubtotal)}\n`;
    if (totalBundleSavings > 0) {
        msg += `🔥 *Ahorro Combo Bundle:* -${formatPrice(totalBundleSavings)}\n`;
    }
    if (discountAmount > 0) {
        msg += `🏷️ *Descuento Transferencia (15% OFF):* -${formatPrice(discountAmount)}\n`;
    }
    msg += `🚚 *Envío:* ${shipping === 0 ? 'GRATIS (Supera $65.000)' : formatPrice(shipping)}\n`;
    msg += `🔥 *TOTAL A PAGAR:* ${formatPrice(finalTotal)}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `¡Hola Tofeprot! Deseo confirmar este pedido y coordinar el pago / envío.`;

    // ========================================== */
    // GUARDADO AUTOMÁTICO EN EL PANEL ADMIN      */
    // ========================================== */
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const orderDate = new Date().toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
    const orderData = {
        id: orderId,
        date: orderDate,
        timestamp: Date.now(),
        buyerName: buyerName,
        buyerEmail: buyerEmail || 'No informado',
        paymentMethod: selectedPaymentMethod === 'transfer' ? 'Transferencia (15% OFF)' : 'Tarjeta / Cuotas',
        side: document.body.classList.contains('theme-light') ? 'Iluminado (Luz)' : 'Berserker (Oscuridad)',
        individuals: cart.map(item => ({
            productId: item.productId,
            name: item.isBundle ? `${item.name} [Combo Bundle -${item.bundleDiscountPct || 15}%]` : item.name,
            qty: item.qty,
            price: item.price,
            isBundle: !!item.isBundle
        })),
        hasGiftSample: true,
        subtotalInd: subtotalAfterDiscount,
        shipping: shipping,
        total: finalTotal,
        status: 'pending'
    };

    saveOrderToAdmin(orderData);
    deductOrderStock(orderData);

    // TRACKING ANALYTICS: begin_checkout
    if (typeof trackEvent === 'function') {
        trackEvent('begin_checkout', { orderId: orderId, total: finalTotal, method: selectedPaymentMethod });
    }

    if (selectedPaymentMethod === 'card') {
        // Lógica de MercadoPago Frontend
        const mpPayload = {
            orderId: orderId,
            items: cart.map(i => ({ title: i.name, unit_price: i.price, quantity: i.qty })),
            payer: { email: buyerEmail, name: buyerName }
        };
        console.log("🚀 [MercadoPago] Payload generado listo para enviar al servidor:", mpPayload);
        
        // Simulación visual para el usuario (hasta que haya Backend)
        const btn = document.querySelector('.checkout-btn');
        const oldText = btn.textContent;
        btn.innerHTML = '🔄 Generando link de pago...';
        
        setTimeout(() => {
            alert(`💳 Redireccionando a MercadoPago Checkout Pro.\n\n[Nota de Sistema]: Se ha generado el Payload correctamente. El servidor debe tomar estos datos en /api/create_preference para devolver el link real.`);
            btn.innerHTML = oldText;
            
            // Simular vaciado del carrito tras pago (solo mock frontend)
            cart = [];
            saveState();
            updateCartUI();
            toggleCart();
        }, 1500);

    } else {
        // Flujo tradicional Transferencia (WhatsApp)
        const waLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(waLink, '_blank');
        cart = [];
        saveState();
        updateCartUI();
        toggleCart();
    }
}

function saveOrderToAdmin(orderData) {
    try {
        let orders = JSON.parse(localStorage.getItem('tofeprot_orders')) || [];
        orders.unshift(orderData);
        localStorage.setItem('tofeprot_orders', JSON.stringify(orders));
    } catch (e) {
        console.warn("Error guardando pedido para admin", e);
    }
}

function deductOrderStock(order) {
    try {
        const stockMap = getStockMap();
        if (order.individuals) {
            order.individuals.forEach(item => {
                const prod = individualProducts.find(p => p.id === item.productId || p.name === item.name);
                if (prod && stockMap[prod.id] !== undefined) {
                    stockMap[prod.id] = Math.max(0, stockMap[prod.id] - item.qty);
                }
            });
        }
        if (order.lootBoxes) {
            order.lootBoxes.forEach(box => {
                box.items.forEach(sampleName => {
                    const sample = products.find(s => s.name === sampleName);
                    if (sample && stockMap[sample.id] !== undefined) {
                        stockMap[sample.id] = Math.max(0, stockMap[sample.id] - 1);
                    }
                });
            });
        }
        localStorage.setItem('tofeprot_stock', JSON.stringify(stockMap));
        renderProducts(products);
        renderTienda(individualProducts);
    } catch (e) {
        console.warn("Error descontando stock", e);
    }
}

function scrollToProducts() { document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' }); }
function scrollToMembership() { document.getElementById('membershipSection').scrollIntoView({ behavior: 'smooth' }); }



// ========================================== */
// CONTROLADOR DEL MODAL DE PRODUCTO (FICHA)  */
// ========================================== */
let currentModalProductId = null;
let currentModalQty = 1;
let currentModalTab = 'nutrition';

function openProductModal(productId) {
    const product = individualProducts.find(p => p.id === productId);
    if (!product) return;
    currentModalProductId = productId;
    currentModalQty = 1;
    currentModalTab = 'nutrition';

    const backdrop = document.getElementById('productBackdrop');
    const modal = document.getElementById('productModal');
    const badge = document.getElementById('pmBadge');
    const title = document.getElementById('pmTitle');
    const floatingBtn = document.getElementById('floatingNavBtn');

    if (!backdrop || !modal) return;

    if (badge) badge.textContent = product.badge || 'SUPLEMENTACIÓN TÁCTICA';
    if (title) title.textContent = product.name;

    renderProductModalContent(product);

    backdrop.classList.add('active');
    modal.classList.add('active');
    if (floatingBtn) floatingBtn.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    playSFX('click');
}

function closeProductModal() {
    const backdrop = document.getElementById('productBackdrop');
    const modal = document.getElementById('productModal');
    const floatingBtn = document.getElementById('floatingNavBtn');
    const cartOpen = document.getElementById('cartModal')?.classList.contains('active');
    const navOpen = document.getElementById('navDrawerPanel')?.classList.contains('active');
    if (backdrop) backdrop.classList.remove('active');
    if (modal) modal.classList.remove('active');
    if (floatingBtn && !cartOpen && !navOpen) {
        floatingBtn.classList.remove('drawer-open');
    }
    if (!cartOpen && !navOpen) {
        document.body.style.overflow = '';
    }
}

function selectModalFlavor(variantId) {
    const targetProduct = individualProducts.find(p => p.id === variantId);
    if (!targetProduct) return;
    currentModalProductId = variantId;
    const badge = document.getElementById('pmBadge');
    const title = document.getElementById('pmTitle');
    if (badge) badge.textContent = targetProduct.badge || 'SUPLEMENTACIÓN TÁCTICA';
    if (title) title.textContent = targetProduct.name;
    renderProductModalContent(targetProduct);
    playSFX('click');
}

function setModalTab(tab) {
    currentModalTab = tab;
    document.querySelectorAll('.pm-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pm-tab-pane').forEach(p => p.classList.remove('active'));

    const activeBtn = document.getElementById('tabBtn_' + tab);
    const activePane = document.getElementById('tabPane_' + tab);
    if (activeBtn) activeBtn.classList.add('active');
    if (activePane) activePane.classList.add('active');
    playSFX('click');
}

function changeModalQty(delta) {
    currentModalQty = Math.max(1, Math.min(10, currentModalQty + delta));
    const qtyEl = document.getElementById('modalQtyVal');
    if (qtyEl) qtyEl.textContent = currentModalQty;
    const equipBtn = document.getElementById('pmEquipBtn');
    const product = individualProducts.find(p => p.id === currentModalProductId);
    if (equipBtn && product) {
        equipBtn.textContent = `+ EQUIPAR AL ARSENAL (${formatPrice(product.price * currentModalQty)})`;
    }
    playSFX('click');
}

function addModalProductToCart() {
    if (!currentModalProductId) return;
    const stock = getStock(currentModalProductId);
    if (stock <= 0) {
        alert('⚠️ Este producto se encuentra actualmente agotado.');
        return;
    }

    const product = individualProducts.find(p => p.id === currentModalProductId);
    if (!product) return;

    const existing = cart.find(i => i.type === 'product' && i.productId === currentModalProductId);
    if (existing) {
        existing.qty += currentModalQty;
    } else {
        cart.push({
            type: 'product',
            id: Date.now(),
            productId: product.id,
            name: product.name,
            emoji: product.emoji,
            price: product.price,
            qty: currentModalQty
        });
    }

    saveState();
    updateCartUI();
    playSFX('equip');
    closeProductModal();
    setTimeout(toggleCart, 180);
}

function renderProductModalContent(product) {
    const body = document.getElementById('pmBody');
    if (!body) return;

    const transferPrice = Math.round(product.price * 0.85);
    const installmentPrice = Math.round(product.price / 3);
    const nut = product.nutrition || {};
    const aminos = product.aminos || [];
    const timing = product.timing || {};
    const coa = product.coa || {};

    const modalFlavorsHTML = (product.flavors && product.flavors.length > 1) ? `
        <div class="pm-flavor-switcher">
            <span class="flavor-label-caption">Cambiar Variante:</span>
            <div class="flavor-pills-container" style="margin-top:6px;">
                ${product.flavors.map(flv => `
                    <button type="button"
                            class="flavor-pill-btn ${flv.id === product.id ? 'active' : ''}"
                            style="--flavor-color: ${flv.color};"
                            onclick="selectModalFlavor(${flv.id})">
                        <span class="flavor-pill-dot" style="background: ${flv.color};"></span>
                        <span class="flavor-pill-text">${flv.name}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    ` : '';

    body.innerHTML = `
        <div class="pm-hero-grid">
            <div class="pm-visual-card">
                ${product.customImage 
                    ? `<img src="${product.customImage}" alt="${product.name}" style="max-height: 160px; max-width: 160px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 8px 20px rgba(0,0,0,0.8)); display:block;">` 
                    : getProductSVG(product.tubType, product.tubLabel, product.tubSub)}
            </div>
            <div class="pm-quick-info">
                <div class="product-rating" style="margin-bottom: 0.6rem;">
                    ${getProductCoaSummary(product)}
                </div>
                <div class="pm-desc">${product.description}</div>
                <div class="pm-highlights">
                    ${(product.specs || []).map((s, i) => `<span class="pm-highlight-pill ${i === 0 ? 'highlight' : ''}">${s}</span>`).join('')}
                    <span class="pm-highlight-pill" style="color: #4ade80;">✓ 1 Doypack Gratis Incluido</span>
                </div>
                ${modalFlavorsHTML}
                <div class="pm-price-box">
                    <div class="pm-price-main">${formatPrice(product.price)}</div>
                    <div class="pm-price-transfer">✓ ${formatPrice(transferPrice)} con Transferencia Bancaria (15% OFF)</div>
                    <div style="font-size:0.76rem; color:var(--text-muted); margin-top:3px;">Hasta 3 cuotas sin interés de ${formatPrice(installmentPrice)}</div>
                </div>
            </div>
        </div>

        <!-- TABS DE DETALLE TÉCNICO -->
        <div class="pm-tabs" role="tablist">
            <button type="button" class="pm-tab-btn ${currentModalTab === 'nutrition' ? 'active' : ''}" id="tabBtn_nutrition" onclick="setModalTab('nutrition')">Nutrición y Aminograma</button>
            <button type="button" class="pm-tab-btn ${currentModalTab === 'timing' ? 'active' : ''}" id="tabBtn_timing" onclick="setModalTab('timing')">Modo de Uso</button>
            <button type="button" class="pm-tab-btn ${currentModalTab === 'coa' ? 'active' : ''}" id="tabBtn_coa" onclick="setModalTab('coa')">Certificado CoA</button>
        </div>

        <!-- TAB 1: TABLA NUTRICIONAL -->
        <div class="pm-tab-pane ${currentModalTab === 'nutrition' ? 'active' : ''}" id="tabPane_nutrition">
            <table class="nutrition-table">
                <thead>
                    <tr><th>Componente</th><th class="num">Por Porción (${nut.serving || '30g'})</th></tr>
                </thead>
                <tbody>
                    <tr><td>Valor Energético</td><td class="num">${nut.cals || '118 kcal'}</td></tr>
                    <tr><td>Proteínas Totales</td><td class="num">${nut.protein || '25g'}</td></tr>
                    <tr><td>Carbohidratos</td><td class="num">${nut.carbs || '1.8g'}</td></tr>
                    <tr><td>Grasas Totales</td><td class="num">${nut.fats || '1.2g'}</td></tr>
                    <tr><td>Sodio</td><td class="num">${nut.sodium || '55mg'}</td></tr>
                    <tr><td>Rendimiento del Envase</td><td class="num">${nut.servingsPerTub || '33 servicios'}</td></tr>
                </tbody>
            </table>

            ${aminos.length > 0 ? `
                <div style="margin-top: 1rem;">
                    <div style="font-weight: 800; font-size: 0.88rem; margin-bottom: 0.6rem; color: var(--text-main);">Perfil de Activos por Scoop:</div>
                    <div class="aminos-grid">
                        ${aminos.map(a => `
                            <div class="amino-bar-item">
                                <div class="amino-label"><span>${a.name}</span> <span style="color:var(--text-muted);">${a.amount}</span></div>
                                <div class="amino-meter"><div class="amino-meter-fill" style="width: ${a.pct}%;"></div></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>

        <!-- TAB 2: MODO DE USO -->
        <div class="pm-tab-pane ${currentModalTab === 'timing' ? 'active' : ''}" id="tabPane_timing">
            <div class="timing-cards-grid">
                <div class="timing-card">
                    <div class="timing-card-title">Momento Óptimo</div>
                    <div class="timing-card-desc">${timing.best || 'Consumir inmediatamente post-entrenamiento o entre comidas principales.'}</div>
                </div>
                <div class="timing-card">
                    <div class="timing-card-title">Preparación</div>
                    <div class="timing-card-desc">${timing.instructions || 'Disolver 1 scoop en 200-250ml de agua o bebida favorita fría.'}</div>
                </div>
                <div class="timing-card">
                    <div class="timing-card-title">Impacto Fisiológico</div>
                    <div class="timing-card-desc">${timing.goal || 'Máximo rendimiento, hipertrofia muscular y recuperación sin fatiga residual.'}</div>
                </div>
            </div>
        </div>

        <!-- TAB 3: CERTIFICADO DE ANÁLISIS (COA) -->
        <div class="pm-tab-pane ${currentModalTab === 'coa' ? 'active' : ''}" id="tabPane_coa">
            <div class="coa-seal-box">
                <div class="coa-seal-title">CERTIFICADO OFICIAL DE ANÁLISIS (CoA)</div>
                <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 500px; margin: 0 auto 0.8rem auto;">
                    Cada lote de Tofeprot es sometido a espectrometría HPLC y microfiltración estricta para garantizar 100% de pureza sin adulterantes ni rellenos de amino spiking.
                </p>
                <div class="coa-badge-list">
                    <span class="coa-badge-pill">✓ Pureza: ${coa.purity || '99.8%'}</span>
                    <span class="coa-badge-pill">✓ Lote: ${coa.batch || '#TF-8829'}</span>
                    <span class="coa-badge-pill">✓ ${coa.lab || 'Eurofins Lab'}</span>
                </div>
                <div style="font-size: 0.8rem; color: #4ade80; font-weight: bold; margin-top: 0.5rem;">
                    ● ${coa.status || 'ESTADO: APROBADO PARA ALTO RENDIMIENTO'}
                </div>
            </div>
        </div>

        <!-- ACTIONS FOOTER -->
        <div class="pm-actions-footer">
            <div class="qty-selector">
                <button type="button" class="qty-btn" onclick="changeModalQty(-1)" aria-label="Disminuir cantidad">−</button>
                <span class="qty-value" id="modalQtyVal">${currentModalQty}</span>
                <button type="button" class="qty-btn" onclick="changeModalQty(1)" aria-label="Aumentar cantidad">+</button>
            </div>
            <button type="button" class="pm-equip-btn" id="pmEquipBtn" onclick="addModalProductToCart()">
                + EQUIPAR AL ARSENAL (${formatPrice(product.price * currentModalQty)})
            </button>
        </div>
    `;
}

// ========================================== */
// DATOS DE TRANSFERENCIA BANCARIA (ALIAS/CBU)*/
// ========================================== */
function openTransferModal() {
    document.getElementById('transferBackdrop')?.classList.add('active');
    document.getElementById('transferModal')?.classList.add('active');
    document.getElementById('floatingNavBtn')?.classList.add('drawer-open');
    playSFX('click');
}

function closeTransferModal() {
    document.getElementById('transferBackdrop')?.classList.remove('active');
    document.getElementById('transferModal')?.classList.remove('active');
    const cartOpen = document.getElementById('cartModal')?.classList.contains('active');
    const navOpen = document.getElementById('navDrawerPanel')?.classList.contains('active');
    if (!cartOpen && !navOpen) {
        document.getElementById('floatingNavBtn')?.classList.remove('drawer-open');
    }
}

function copyAlias() {
    const alias = "TOFEPROT.ARS";
    navigator.clipboard.writeText(alias).then(() => {
        const btn = document.getElementById('copyAliasBtn');
        if (btn) {
            const original = btn.textContent;
            btn.textContent = "✓ ¡Copiado!";
            btn.style.background = "#4ade80";
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = "";
            }, 2000);
        }
    }).catch(() => {
        prompt("Copia el alias bancario:", "TOFEPROT.ARS");
    });
}

// ========================================== */
// MÓDULOS SENIOR: ESCALABILIDAD Y MARKETING  */
// ========================================== */

// 1. TRACKING (GOOGLE ANALYTICS / META PIXEL)
function trackEvent(eventName, payload) {
    console.log(`[Analytics] 📊 Evento disparado: ${eventName}`, payload);
    // Aquí irá gtag('event', ...) y fbq('track', ...)
}

// 2. SEO (JSON-LD RICH SNIPPETS)
function generateStructuredData() {
    console.log("🔍 Generando JSON-LD estático para indexación SEO...");
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schema = {
        "@context": "https://schema.org",
        "@type": "SportsStore",
        "name": "Tofeprot",
        "description": "Suplementación Deportiva Premium en Argentina",
        "url": window.location.href,
        "offers": [] // Esto se poblaría dinámicamente con los productos
    };
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}
setTimeout(generateStructuredData, 1500);

// 3. CART URGENCY TIMER (FOMO)
let cartTimerInterval = null;
let timerHasStarted = false;

function startCartTimer() {
    if (timerHasStarted) return;
    timerHasStarted = true;
    
    const timerContainer = document.getElementById('cartUrgencyTimer');
    const display = document.getElementById('cartTimerDisplay');
    if (!timerContainer || !display) return;
    
    timerContainer.style.display = 'flex';
    let timeLeft = 15 * 60; // 15 minutos
    
    cartTimerInterval = setInterval(() => {
        if(timeLeft <= 0) {
            clearInterval(cartTimerInterval);
            display.textContent = "00:00 - Stock Liberado";
            timerContainer.style.background = "rgba(255, 68, 68, 0.3)";
            return;
        }
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        timeLeft--;
    }, 1000);
}

// ===== CopilotCal – Hlavní aplikační logika =====

// ===== Konstanty =====
const STORAGE_KEYS = {
    events: 'copilotcal_events',
    settings: 'copilotcal_settings'
};

const SEED_DATA_URL = '../data/demo-events.json';
const HOUR_HEIGHT = 60;

const DAY_NAMES = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DEFAULT_CATEGORIES = [
    { id: 'work', name: 'Práce', icon: '💼', color: '#FFF59D' },
    { id: 'personal', name: 'Osobní', icon: '🏠', color: '#FFF59D' },
    { id: 'health', name: 'Zdraví & Sport', icon: '💪', color: '#FFF59D' },
    { id: 'family', name: 'Rodina', icon: '👨‍👩‍👧‍👦', color: '#FFF59D' },
    { id: 'education', name: 'Vzdělávání', icon: '📚', color: '#FFF59D' }
];

const DEFAULT_SETTINGS = {
    weekStartsOn: 'monday',
    workingHours: { start: '08:00', end: '18:00' },
    defaultView: 'week',
    defaultReminderMinutes: 15,
    timeFormat: '24h',
    locale: 'cs-CZ',
    activeCategories: ['work', 'personal', 'health', 'family', 'education']
};

// ===== Stav aplikace =====
const state = {
    currentWeekStart: null,
    events: [],
    settings: { ...DEFAULT_SETTINGS },
    editingEventId: null
};

// ===== Cache DOM referencí =====
const dom = {};

// ===== Inicializace =====
document.addEventListener('DOMContentLoaded', init);

async function init() {
    cacheDomReferences();
    await loadData();
    state.currentWeekStart = getMonday(new Date());
    renderCategories();
    renderCalendar();
    setupEventListeners();
    scrollToWorkingHours();
}

/** Uložení referencí na klíčové DOM elementy */
function cacheDomReferences() {
    dom.weekNumber = document.getElementById('weekNumber');
    dom.weekRange = document.getElementById('weekRange');
    dom.calendarHeader = document.getElementById('calendarHeader');
    dom.calendarBody = document.getElementById('calendarBody');
    dom.timeColumn = document.getElementById('timeColumn');
    dom.categoryList = document.getElementById('categoryList');
    dom.eventDetailModal = document.getElementById('eventDetailModal');
    dom.eventFormModal = document.getElementById('eventFormModal');
    dom.eventForm = document.getElementById('eventForm');
}

// ===== Datová vrstva =====

/** Načtení dat z localStorage nebo seed souboru */
async function loadData() {
    // Načtení nastavení
    const savedSettings = localStorage.getItem(STORAGE_KEYS.settings);
    if (savedSettings) {
        state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    }

    // Načtení událostí
    const savedEvents = localStorage.getItem(STORAGE_KEYS.events);
    if (savedEvents) {
        state.events = JSON.parse(savedEvents);
    } else {
        await loadSeedData();
    }
}

/** Načtení ukázkových dat z JSON souboru */
async function loadSeedData() {
    try {
        const response = await fetch(SEED_DATA_URL);
        const data = await response.json();
        state.events = data.events || [];
        saveEvents();
    } catch (error) {
        console.warn('Nepodařilo se načíst ukázková data:', error);
        state.events = [];
    }
}

/** Uložení událostí do localStorage */
function saveEvents() {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(state.events));
}

/** Uložení nastavení do localStorage */
function saveSettings() {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

// ===== Pomocné funkce pro datum =====

/** Vrátí pondělí daného týdne */
function getMonday(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/** Vrátí ISO číslo týdne */
function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const yearStart = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - yearStart) / 86400000 - 3 + ((yearStart.getDay() + 6) % 7)) / 7);
}

/** Formátování data v českém formátu (den. měsíce) */
function formatDate(date) {
    return date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' });
}

/** Formátování data v českém formátu s dnem v týdnu */
function formatDateFull(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('cs-CZ', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

/** Vrátí datum jako řetězec YYYY-MM-DD */
function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/** Převod časového řetězce HH:MM na minuty */
function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

/** Generování unikátního ID pro novou událost */
function generateId() {
    return 'e' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

// ===== Renderování kalendáře =====

/** Překreslení celého kalendáře */
function renderCalendar() {
    renderWeekInfo();
    renderCalendarHeader();
    renderTimeColumn();
    renderDayColumns();
}

/** Zobrazení informací o aktuálním týdnu v hlavičce */
function renderWeekInfo() {
    const weekNum = getWeekNumber(state.currentWeekStart);
    const weekEnd = new Date(state.currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    dom.weekNumber.textContent = `Týden ${weekNum}`;
    dom.weekRange.textContent = `${formatDate(state.currentWeekStart)} – ${formatDate(weekEnd)} ${weekEnd.getFullYear()}`;
}

/** Vykreslení hlavičky kalendáře (dny a data) */
function renderCalendarHeader() {
    dom.calendarHeader.innerHTML = '';
    const today = getDateString(new Date());

    // Prázdný slot nad časovou osou
    const spacer = document.createElement('div');
    spacer.className = 'calendar-header-spacer';
    dom.calendarHeader.appendChild(spacer);

    for (let i = 0; i < 7; i++) {
        const date = new Date(state.currentWeekStart);
        date.setDate(date.getDate() + i);

        const cell = document.createElement('div');
        cell.className = 'calendar-header-cell';
        if (getDateString(date) === today) {
            cell.classList.add('is-today');
        }

        const dayName = document.createElement('span');
        dayName.className = 'day-name';
        dayName.textContent = DAY_NAMES[i];

        const dayDate = document.createElement('span');
        dayDate.className = 'day-date';
        dayDate.textContent = date.getDate();

        cell.appendChild(dayName);
        cell.appendChild(dayDate);
        dom.calendarHeader.appendChild(cell);
    }
}

/** Vykreslení časových popisků (00:00 – 23:00) */
function renderTimeColumn() {
    dom.timeColumn.innerHTML = '';
    for (let h = 0; h < 24; h++) {
        const label = document.createElement('div');
        label.className = 'time-label';
        label.textContent = `${String(h).padStart(2, '0')}:00`;
        dom.timeColumn.appendChild(label);
    }
}

/** Vykreslení sloupců jednotlivých dnů s hodinovými sloty a událostmi */
function renderDayColumns() {
    // Odstranění existujících sloupců (ponechání time-column)
    const existingColumns = dom.calendarBody.querySelectorAll('.day-column');
    existingColumns.forEach(col => col.remove());

    const today = getDateString(new Date());
    const workStart = parseInt(state.settings.workingHours.start);
    const workEnd = parseInt(state.settings.workingHours.end);

    for (let i = 0; i < 7; i++) {
        const date = new Date(state.currentWeekStart);
        date.setDate(date.getDate() + i);
        const dateStr = getDateString(date);

        const column = document.createElement('div');
        column.className = 'day-column';
        if (dateStr === today) column.classList.add('is-today');
        column.dataset.date = dateStr;

        // Hodinové sloty
        for (let h = 0; h < 24; h++) {
            const slot = document.createElement('div');
            slot.className = 'hour-slot';
            if (h >= workStart && h < workEnd) slot.classList.add('working-hour');
            slot.dataset.hour = h;
            slot.dataset.date = dateStr;
            slot.addEventListener('click', handleSlotClick);
            column.appendChild(slot);
        }

        // Události pro tento den
        const dayEvents = getEventsForDate(date);
        dayEvents.forEach(event => {
            if (!state.settings.activeCategories.includes(event.category)) return;
            const block = createEventBlock(event);
            column.appendChild(block);
        });

        dom.calendarBody.appendChild(column);
    }
}

/** Vrátí události pro dané datum (včetně opakujících se) */
function getEventsForDate(date) {
    const dateStr = getDateString(date);
    const dayIndex = (date.getDay() + 6) % 7; // 0=pondělí, 6=neděle
    const dayKey = DAY_KEYS[dayIndex];

    return state.events.filter(event => {
        // Přímá shoda data
        if (event.date === dateStr) return true;
        // Opakující se událost – shoda dne v týdnu
        if (event.recurring && event.recurring.type === 'weekly') {
            return event.recurring.days.includes(dayKey);
        }
        return false;
    });
}

/** Vytvoření DOM elementu pro blok události v kalendáři */
function createEventBlock(event) {
    const startMinutes = timeToMinutes(event.startTime);
    const endMinutes = timeToMinutes(event.endTime);
    const duration = endMinutes - startMinutes;
    const top = (startMinutes / 60) * HOUR_HEIGHT;
    const height = (duration / 60) * HOUR_HEIGHT;

    const block = document.createElement('div');
    block.className = 'event-block';
    block.style.top = `${top}px`;
    block.style.height = `${Math.max(height, 22)}px`;
    block.style.backgroundColor = event.color;
    block.dataset.eventId = event.id;
    
    // Add priority class
    if (event.priority) {
        block.classList.add('priority-' + event.priority);
    }

    const title = document.createElement('span');
    title.className = 'event-title';
    title.textContent = event.title;

    const time = document.createElement('span');
    time.className = 'event-time';
    time.textContent = `${event.startTime} – ${event.endTime}`;

    block.appendChild(title);
    block.appendChild(time);

    // Lokace se zobrazí jen pokud je dostatek místa
    if (event.location && height > 40) {
        const location = document.createElement('span');
        location.className = 'event-location';
        location.textContent = event.location.length > 25
            ? event.location.substring(0, 25) + '…'
            : event.location;
        block.appendChild(location);
    }

    block.addEventListener('click', (e) => {
        e.stopPropagation();
        showEventDetail(event.id);
    });

    return block;
}

// ===== Navigace =====

/** Posun o daný počet týdnů */
function navigateWeek(offset) {
    state.currentWeekStart.setDate(state.currentWeekStart.getDate() + offset * 7);
    renderCalendar();
}

/** Návrat na aktuální týden */
function navigateToday() {
    state.currentWeekStart = getMonday(new Date());
    renderCalendar();
    scrollToWorkingHours();
}

/** Posun scrollu na začátek pracovních hodin */
function scrollToWorkingHours() {
    const startHour = parseInt(state.settings.workingHours.start);
    dom.calendarBody.scrollTop = (startHour - 1) * HOUR_HEIGHT;
}

// ===== Kategorie =====

/** Vykreslení seznamu kategorií v sidebaru */
function renderCategories() {
    dom.categoryList.innerHTML = '';

    DEFAULT_CATEGORIES.forEach(category => {
        const item = document.createElement('label');
        item.className = 'category-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'category-checkbox';
        checkbox.checked = state.settings.activeCategories.includes(category.id);
        checkbox.dataset.category = category.id;
        checkbox.addEventListener('change', handleCategoryToggle);

        const indicator = document.createElement('span');
        indicator.className = 'category-indicator';
        indicator.style.backgroundColor = category.color;

        const name = document.createElement('span');
        name.className = 'category-name';
        name.textContent = `${category.icon} ${category.name}`;

        item.appendChild(checkbox);
        item.appendChild(indicator);
        item.appendChild(name);
        dom.categoryList.appendChild(item);
    });
}

/** Přepnutí viditelnosti kategorie */
function handleCategoryToggle(e) {
    const categoryId = e.target.dataset.category;
    if (e.target.checked) {
        if (!state.settings.activeCategories.includes(categoryId)) {
            state.settings.activeCategories.push(categoryId);
        }
    } else {
        state.settings.activeCategories = state.settings.activeCategories.filter(c => c !== categoryId);
    }
    saveSettings();
    renderCalendar();
}

// ===== Detail události =====

/** Zobrazení modalu s detailem události */
function showEventDetail(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event) return;

    document.getElementById('detailTitle').textContent = event.title;
    document.getElementById('detailDescription').textContent = event.description || '—';
    document.getElementById('detailDateTime').textContent =
        `${formatDateFull(event.date)}, ${event.startTime} – ${event.endTime}`;
    document.getElementById('detailCategory').textContent = getCategoryLabel(event.category);
    document.getElementById('detailLocation').textContent = event.location || '—';
    document.getElementById('detailPriority').textContent = getPriorityLabel(event.priority);
    document.getElementById('detailReminder').textContent =
        event.reminder ? `${event.reminder} min před začátkem` : '—';
    document.getElementById('detailRecurring').textContent =
        event.recurring ? formatRecurring(event.recurring) : 'Ne';

    state.editingEventId = eventId;
    dom.eventDetailModal.classList.add('is-visible');
}

/** Skrytí modalu s detailem */
function hideEventDetail() {
    dom.eventDetailModal.classList.remove('is-visible');
    state.editingEventId = null;
}

/** Vrátí čitelný název kategorie s ikonou */
function getCategoryLabel(id) {
    const cat = DEFAULT_CATEGORIES.find(c => c.id === id);
    return cat ? `${cat.icon} ${cat.name}` : id;
}

/** Vrátí český popis priority */
function getPriorityLabel(priority) {
    const labels = { low: 'Nízká', medium: 'Střední', high: 'Vysoká' };
    return labels[priority] || priority;
}

/** Formátování informací o opakování */
function formatRecurring(recurring) {
    if (!recurring || recurring.type !== 'weekly') return 'Ne';
    const dayLabels = { mon: 'Po', tue: 'Út', wed: 'St', thu: 'Čt', fri: 'Pá', sat: 'So', sun: 'Ne' };
    const days = recurring.days.map(d => dayLabels[d] || d).join(', ');
    return `Týdně (${days})`;
}

// ===== Formulář události =====

/** Zobrazení formuláře pro novou nebo editovanou událost */
function showEventForm(prefill = {}) {
    const form = dom.eventForm;
    form.reset();

    // Resetování zobrazení opakování
    document.getElementById('recurringDays').classList.remove('is-visible');

    if (state.editingEventId) {
        // Režim editace – předvyplnění formuláře
        const event = state.events.find(e => e.id === state.editingEventId);
        if (event) {
            document.getElementById('formTitle').textContent = 'Upravit událost';
            form.elements.title.value = event.title;
            form.elements.description.value = event.description || '';
            form.elements.date.value = event.date;
            form.elements.startTime.value = event.startTime;
            form.elements.endTime.value = event.endTime;
            form.elements.category.value = event.category;
            form.elements.location.value = event.location || '';
            form.elements.priority.value = event.priority;
            form.elements.reminder.value = event.reminder || '';

            if (event.recurring) {
                form.elements.recurring.checked = true;
                document.getElementById('recurringDays').classList.add('is-visible');
                DAY_KEYS.forEach(day => {
                    const cb = form.querySelector(`[data-day="${day}"]`);
                    if (cb) cb.checked = event.recurring.days.includes(day);
                });
            }
        }
    } else {
        // Režim vytvoření – předvyplnění z kliknutého slotu
        document.getElementById('formTitle').textContent = 'Nová událost';
        if (prefill.date) form.elements.date.value = prefill.date;
        if (prefill.startTime) form.elements.startTime.value = prefill.startTime;
        if (prefill.endTime) form.elements.endTime.value = prefill.endTime;
    }

    dom.eventFormModal.classList.add('is-visible');
}

/** Skrytí formuláře */
function hideEventForm() {
    dom.eventFormModal.classList.remove('is-visible');
    state.editingEventId = null;
}

/** Zpracování odeslání formuláře – vytvoření nebo aktualizace události */
function handleFormSubmit(e) {
    e.preventDefault();
    const form = dom.eventForm;

    // Validace názvu
    const title = form.elements.title.value.trim();
    if (!title) {
        alert('Název události je povinný.');
        return;
    }

    // Validace času
    const startTime = form.elements.startTime.value;
    const endTime = form.elements.endTime.value;
    if (endTime <= startTime) {
        alert('Čas konce musí být po čase začátku.');
        return;
    }

    // Barva podle kategorie
    const category = form.elements.category.value;
    const categoryObj = DEFAULT_CATEGORIES.find(c => c.id === category);
    const color = categoryObj ? categoryObj.color : '#999999';

    // Opakování
    let recurring = null;
    if (form.elements.recurring.checked) {
        const selectedDays = DAY_KEYS.filter(day => {
            const cb = form.querySelector(`[data-day="${day}"]`);
            return cb && cb.checked;
        });
        if (selectedDays.length > 0) {
            recurring = { type: 'weekly', days: selectedDays };
        }
    }

    // Sestavení dat události
    const eventData = {
        id: state.editingEventId || generateId(),
        title,
        description: form.elements.description.value.trim(),
        date: form.elements.date.value,
        startTime,
        endTime,
        category,
        location: form.elements.location.value.trim(),
        priority: form.elements.priority.value,
        reminder: form.elements.reminder.value ? parseInt(form.elements.reminder.value) : null,
        recurring,
        color
    };

    // Uložení – aktualizace nebo přidání
    if (state.editingEventId) {
        const index = state.events.findIndex(e => e.id === state.editingEventId);
        if (index !== -1) {
            state.events[index] = eventData;
        }
    } else {
        state.events.push(eventData);
    }

    saveEvents();
    hideEventForm();
    renderCalendar();
}

// ===== Obsluha událostí (event handlers) =====

/** Klik na prázdný hodinový slot – otevření formuláře pro novou událost */
function handleSlotClick(e) {
    const date = e.currentTarget.dataset.date;
    const hour = parseInt(e.currentTarget.dataset.hour);
    const endHour = hour < 23 ? hour + 1 : 23;
    const endMinutes = hour < 23 ? '00' : '59';

    state.editingEventId = null;
    showEventForm({
        date,
        startTime: `${String(hour).padStart(2, '0')}:00`,
        endTime: `${String(endHour).padStart(2, '0')}:${endMinutes}`
    });
}

/** Smazání události po potvrzení */
function handleDeleteEvent() {
    if (!state.editingEventId) return;
    if (!confirm('Opravdu chcete smazat tuto událost?')) return;

    state.events = state.events.filter(e => e.id !== state.editingEventId);
    saveEvents();
    hideEventDetail();
    renderCalendar();
}

/** Přepnutí z detailu do editačního formuláře */
function handleEditEvent() {
    const eventId = state.editingEventId;
    hideEventDetail();
    state.editingEventId = eventId;
    showEventForm();
}

/** Přepnutí viditelnosti výběru dnů opakování */
function toggleRecurringDays(show) {
    const container = document.getElementById('recurringDays');
    if (show) {
        container.classList.add('is-visible');
    } else {
        container.classList.remove('is-visible');
    }
}

// ===== Registrace event listenerů =====

function setupEventListeners() {
    // Statistiky
    document.getElementById('btnStats').addEventListener('click', openStats);
    document.getElementById('statsClose').addEventListener('click', closeStats);
    document.getElementById('statsModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('statsModal')) closeStats();
    });
    document.querySelectorAll('.btn-stats-period').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-stats-period').forEach(b => b.classList.remove('is-active'));
            e.currentTarget.classList.add('is-active');
            renderStats();
        });
    });

    // Navigační tlačítka
    document.getElementById('btnPrev').addEventListener('click', () => navigateWeek(-1));
    document.getElementById('btnNext').addEventListener('click', () => navigateWeek(1));
    document.getElementById('btnToday').addEventListener('click', navigateToday);

    // Tisk týdenního rozvrhu
    document.getElementById('btnPrint').addEventListener('click', () => {
        const weekEnd = new Date(state.currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        document.getElementById('printWeekRange').textContent =
            `${formatDate(state.currentWeekStart)} – ${formatDate(weekEnd)} ${weekEnd.getFullYear()}`;
        window.print();
    });

    // Detail události – tlačítka
    document.getElementById('detailClose').addEventListener('click', hideEventDetail);
    document.getElementById('detailEdit').addEventListener('click', handleEditEvent);
    document.getElementById('detailDelete').addEventListener('click', handleDeleteEvent);

    // Formulář události
    document.getElementById('formClose').addEventListener('click', hideEventForm);
    document.getElementById('formCancel').addEventListener('click', hideEventForm);
    dom.eventForm.addEventListener('submit', handleFormSubmit);

    // Přepínání opakování
    document.getElementById('recurringCheckbox').addEventListener('change', (e) => {
        toggleRecurringDays(e.target.checked);
    });

    // Zavření modálů klikem na overlay
    dom.eventDetailModal.addEventListener('click', (e) => {
        if (e.target === dom.eventDetailModal) hideEventDetail();
    });
    dom.eventFormModal.addEventListener('click', (e) => {
        if (e.target === dom.eventFormModal) hideEventForm();
    });

    // Klávesa Escape pro zavření modálů
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideEventDetail();
            hideEventForm();
            closeStats();
        }
    });
}

// ===== Statistiky =====

// Barvy kategorií pro grafy
const CATEGORY_CHART_COLORS = {
    work: '#4A90D9',
    personal: '#F48FB1',
    health: '#66BB6A',
    family: '#E8913A',
    education: '#AB47BC',
    entertainment: '#26C6DA'
};

/** Otevření panelu statistik */
function openStats() {
    renderStats();
    document.getElementById('statsModal').classList.add('is-visible');
}

/** Zavření panelu statistik */
function closeStats() {
    document.getElementById('statsModal').classList.remove('is-visible');
}

/** Vrátí pole Date objektů pro každý den zvoleného období */
function getStatsPeriodDays(period) {
    const days = [];
    let start, end;

    if (period === 'week') {
        start = new Date(state.currentWeekStart);
        end = new Date(start);
        end.setDate(end.getDate() + 6);
    } else {
        const now = new Date();
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    const current = new Date(start);
    while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return days;
}

/** Vypočítá délku události v hodinách */
function getEventDurationHours(event) {
    const startMin = timeToMinutes(event.startTime);
    const endMin = timeToMinutes(event.endTime);
    return Math.max(0, (endMin - startMin) / 60);
}

/** Agreguje statistická data pro zvolené období */
function computeStatsData(period) {
    const days = getStatsPeriodDays(period);

    let totalEvents = 0;
    let totalHours = 0;
    const hoursByCategory = {};

    DEFAULT_CATEGORIES.forEach(c => { hoursByCategory[c.id] = 0; });

    const dayData = days.map(date => {
        const events = getEventsForDate(date);
        const activeEvents = events.filter(e => state.settings.activeCategories.includes(e.category));

        const entry = {
            date,
            dateStr: getDateString(date),
            eventCount: activeEvents.length,
            hoursByCategory: {}
        };
        DEFAULT_CATEGORIES.forEach(c => { entry.hoursByCategory[c.id] = 0; });

        activeEvents.forEach(event => {
            const h = getEventDurationHours(event);
            totalHours += h;
            totalEvents++;
            if (hoursByCategory[event.category] !== undefined) {
                hoursByCategory[event.category] += h;
            }
            if (entry.hoursByCategory[event.category] !== undefined) {
                entry.hoursByCategory[event.category] += h;
            }
        });

        return entry;
    });

    // Výpočet volného pracovního času
    const workStart = timeToMinutes(state.settings.workingHours.start);
    const workEnd = timeToMinutes(state.settings.workingHours.end);
    const workingHoursPerDay = Math.max(0, (workEnd - workStart) / 60);
    const workingDaysCount = days.filter(d => d.getDay() !== 0 && d.getDay() !== 6).length;
    const freeTime = Math.max(0, workingHoursPerDay * workingDaysCount - (hoursByCategory['work'] || 0));

    // Nejzaneprázdněnější den
    const busiestDay = dayData.reduce((best, day) =>
        !best || day.eventCount > best.eventCount ? day : best, null);

    // Nejčastější kategorie podle hodin
    const topCategoryEntry = Object.entries(hoursByCategory)
        .filter(([, h]) => h > 0)
        .sort((a, b) => b[1] - a[1])[0];
    const topCategory = topCategoryEntry
        ? DEFAULT_CATEGORIES.find(c => c.id === topCategoryEntry[0])
        : null;

    const avgEventsPerDay = days.length > 0
        ? (totalEvents / days.length).toFixed(1)
        : '0.0';

    return {
        totalEvents,
        totalHours: totalHours.toFixed(1),
        freeTime: freeTime.toFixed(1),
        busiestDay: busiestDay && busiestDay.eventCount > 0 ? busiestDay : null,
        topCategory,
        avgEventsPerDay,
        hoursByCategory,
        dayData
    };
}

/** Hlavní renderování statistik – čte aktivní periodu a překreslí vše */
function renderStats() {
    const activeBtn = document.querySelector('.btn-stats-period.is-active');
    const period = activeBtn ? activeBtn.dataset.period : 'week';
    const data = computeStatsData(period);

    renderStatCards(data);
    renderDonutChart(data);
    renderBarChart(data);
}

/** Vykreslení karet s číselnými statistikami */
function renderStatCards(data) {
    const container = document.getElementById('statsCards');

    const busiestDayLabel = data.busiestDay
        ? data.busiestDay.date.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'short' })
        : '—';

    const topCategoryLabel = data.topCategory
        ? `${data.topCategory.icon} ${data.topCategory.name}`
        : '—';

    const cards = [
        { label: 'Celkem událostí', value: data.totalEvents, icon: '📅' },
        { label: 'Celkem hodin', value: `${data.totalHours} h`, icon: '⏱️' },
        { label: 'Volný čas (prac. doba)', value: `${data.freeTime} h`, icon: '🌿' },
        { label: 'Nejzaneprázdněnější den', value: busiestDayLabel, icon: '🔥', small: true },
        { label: 'Nejčastější kategorie', value: topCategoryLabel, icon: '🏆', small: true },
        { label: 'Průměr událostí / den', value: data.avgEventsPerDay, icon: '📈' }
    ];

    container.innerHTML = cards.map(card => `
        <div class="stat-card">
            <span class="stat-card-icon">${card.icon}</span>
            <span class="stat-card-value${card.small ? ' stat-card-value--small' : ''}">${card.value}</span>
            <span class="stat-card-label">${card.label}</span>
        </div>
    `).join('');
}

/** Vykreslení donut grafu kategorie vs. hodiny pomocí inline SVG */
function renderDonutChart(data) {
    const container = document.getElementById('donutChart');
    const { hoursByCategory } = data;
    const total = Object.values(hoursByCategory).reduce((s, h) => s + h, 0);

    if (total === 0) {
        container.innerHTML = '<p class="stats-no-data">Žádné události v tomto období.</p>';
        return;
    }

    const size = 180;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = 72;
    const innerR = 42;

    const segments = DEFAULT_CATEGORIES
        .filter(cat => hoursByCategory[cat.id] > 0)
        .map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            hours: hoursByCategory[cat.id],
            color: CATEGORY_CHART_COLORS[cat.id] || '#999999',
            pct: hoursByCategory[cat.id] / total
        }));

    let angle = -Math.PI / 2;
    const paths = segments.map(seg => {
        const sweep = seg.pct * 2 * Math.PI;
        const endAngle = angle + sweep;
        const x1 = cx + outerR * Math.cos(angle);
        const y1 = cy + outerR * Math.sin(angle);
        const x2 = cx + outerR * Math.cos(endAngle);
        const y2 = cy + outerR * Math.sin(endAngle);
        const xi1 = cx + innerR * Math.cos(angle);
        const yi1 = cy + innerR * Math.sin(angle);
        const xi2 = cx + innerR * Math.cos(endAngle);
        const yi2 = cy + innerR * Math.sin(endAngle);
        const largeArc = sweep > Math.PI ? 1 : 0;
        const d = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${xi2.toFixed(2)} ${yi2.toFixed(2)} A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1.toFixed(2)} ${yi1.toFixed(2)} Z`;
        angle = endAngle;
        return `<path d="${d}" fill="${seg.color}" class="donut-segment">
            <title>${seg.icon} ${seg.name}: ${seg.hours.toFixed(1)} h (${Math.round(seg.pct * 100)} %)</title>
        </path>`;
    });

    const legendItems = segments.map(seg =>
        `<div class="donut-legend-item">
            <span class="donut-legend-dot" style="background:${seg.color}"></span>
            <span class="donut-legend-name">${seg.icon} ${seg.name}</span>
            <span class="donut-legend-hours">${seg.hours.toFixed(1)} h</span>
        </div>`
    ).join('');

    container.innerHTML = `
        <div class="donut-wrapper">
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="donut-svg">
                ${paths.join('')}
                <text x="${cx}" y="${cy - 5}" text-anchor="middle" class="donut-center-value">${total.toFixed(1)}</text>
                <text x="${cx}" y="${cy + 13}" text-anchor="middle" class="donut-center-unit">hodin</text>
            </svg>
            <div class="donut-legend">${legendItems}</div>
        </div>
    `;
}

/** Vykreslení stacked sloupcového grafu hodin po dnech pomocí inline SVG */
function renderBarChart(data) {
    const container = document.getElementById('barChart');
    const { dayData } = data;

    if (dayData.length === 0) {
        container.innerHTML = '<p class="stats-no-data">Žádné události v tomto období.</p>';
        return;
    }

    const paddingLeft = 36;
    const paddingRight = 8;
    const paddingTop = 10;
    const paddingBottom = 36;
    const svgHeight = 200;
    const minSvgWidth = 420;
    const barGap = dayData.length > 14 ? 2 : 4;
    const barWidth = Math.min(30, Math.max(8, Math.floor((minSvgWidth - paddingLeft - paddingRight) / dayData.length) - barGap));
    const totalBarsWidth = dayData.length * (barWidth + barGap);
    const svgWidth = Math.max(minSvgWidth, paddingLeft + totalBarsWidth + paddingRight);
    const chartW = svgWidth - paddingLeft - paddingRight;
    const chartH = svgHeight - paddingTop - paddingBottom;

    // Maximální výška sloupce v hodinách
    const maxH = dayData.reduce((m, day) => {
        const s = Object.values(day.hoursByCategory).reduce((a, b) => a + b, 0);
        return Math.max(m, s);
    }, 0);
    const yMax = Math.max(1, Math.ceil(maxH));

    // Osa Y – mřížka a popisky
    const ySteps = Math.min(yMax, 5);
    const yLines = Array.from({ length: ySteps + 1 }, (_, i) => {
        const val = Math.round((yMax / ySteps) * i * 10) / 10;
        const y = paddingTop + chartH - (val / yMax) * chartH;
        return `<line x1="${paddingLeft}" y1="${y.toFixed(1)}" x2="${svgWidth - paddingRight}" y2="${y.toFixed(1)}" stroke="#e0e0e0" stroke-width="1"/>
                <text x="${(paddingLeft - 4).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="bar-axis-label">${val}</text>`;
    });

    // Sloupce
    const slotW = chartW / dayData.length;
    const bars = dayData.map((day, i) => {
        const x = paddingLeft + i * slotW + (slotW - barWidth) / 2;
        let yOff = paddingTop + chartH;

        const rects = DEFAULT_CATEGORIES
            .filter(cat => day.hoursByCategory[cat.id] > 0)
            .map(cat => {
                const h = day.hoursByCategory[cat.id];
                const bH = (h / yMax) * chartH;
                yOff -= bH;
                const color = CATEGORY_CHART_COLORS[cat.id] || '#999999';
                return `<rect x="${x.toFixed(1)}" y="${yOff.toFixed(1)}" width="${barWidth}" height="${bH.toFixed(1)}" fill="${color}" rx="2">
                    <title>${cat.icon} ${cat.name}: ${h.toFixed(1)} h</title>
                </rect>`;
            });

        const useShortLabel = dayData.length > 14;
        const label = day.date.toLocaleDateString('cs-CZ', useShortLabel
            ? { day: 'numeric', month: 'numeric' }
            : { day: 'numeric', month: 'short' });

        return `${rects.join('')}
            <text x="${(x + barWidth / 2).toFixed(1)}" y="${(svgHeight - paddingBottom + 14).toFixed(1)}" text-anchor="middle" class="bar-day-label">${label}</text>`;
    });

    container.innerHTML = `
        <div class="bar-chart-scroll">
            <svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" class="bar-svg">
                ${yLines.join('')}
                <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${paddingTop + chartH}" stroke="#cccccc" stroke-width="1"/>
                ${bars.join('')}
            </svg>
        </div>
    `;
}

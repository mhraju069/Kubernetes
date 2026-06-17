// Global State
let currentDate = new Date();
let events = [];
let holidays = [];
let selectedEvent = null;

// Helper for Ingress path-based routing
function getApiUrl(endpoint) {
    const match = window.location.pathname.match(/^\/(calendar|calender)/);
    const prefix = match ? match[0] : '';
    return `${prefix}/api/${endpoint}`;
}


// DOM Elements
const currentMonthYearText = document.getElementById("currentMonthYear");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const todayBtn = document.getElementById("todayBtn");
const addEventBtn = document.getElementById("addEventBtn");
const searchInput = document.getElementById("searchEvents");
const countrySelect = document.getElementById("countrySelect");
const upcomingEventsList = document.getElementById("upcomingEventsList");

// Modal Elements
const eventModal = document.getElementById("eventModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const deleteEventBtn = document.getElementById("deleteEventBtn");
const eventForm = document.getElementById("eventForm");
const modalTitle = document.getElementById("modalTitle");

const eventIdInput = document.getElementById("eventId");
const eventTitleInput = document.getElementById("eventTitle");
const eventDateInput = document.getElementById("eventDate");
const eventCategorySelect = document.getElementById("eventCategory");
const eventStartTimeInput = document.getElementById("eventStartTime");
const eventEndTimeInput = document.getElementById("eventEndTime");
const eventLocationInput = document.getElementById("eventLocation");
const eventDescriptionInput = document.getElementById("eventDescription");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    loadCalendarData();
});

function setupEventListeners() {
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        loadCalendarData();
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        loadCalendarData();
    });

    todayBtn.addEventListener("click", () => {
        currentDate = new Date();
        loadCalendarData();
    });

    addEventBtn.addEventListener("click", () => {
        openModalForCreate();
    });

    closeModalBtn.addEventListener("click", closeModal);
    cancelModalBtn.addEventListener("click", closeModal);

    countrySelect.addEventListener("change", () => {
        loadHolidays().then(renderCalendar);
    });

    searchInput.addEventListener("input", () => {
        renderCalendar();
    });

    eventForm.addEventListener("submit", handleFormSubmit);
    deleteEventBtn.addEventListener("click", handleDeleteEvent);

    // Close modal when clicking outside
    eventModal.addEventListener("click", (e) => {
        if (e.target === eventModal) closeModal();
    });
}

// Helper to format date object to YYYY-MM-DD
function formatDateISO(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

async function loadCalendarData() {
    // Determine range of dates displayed in current month view
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of current month
    const firstDayOfMonth = new Date(year, month, 1);
    // Day of the week of first day (0 = Sunday, 6 = Saturday)
    const startOfWeekDay = firstDayOfMonth.getDay();

    // Start date of calendar grid (which might be in previous month)
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startOfWeekDay);

    // End date of calendar grid (42 days total)
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 41);

    const startStr = formatDateISO(startDate);
    const endStr = formatDateISO(endDate);

    // Show Month Year header
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    currentMonthYearText.textContent = `${monthNames[month]} ${year}`;

    // Load Events and Holidays in parallel
    await Promise.all([
        loadEvents(startStr, endStr),
        loadHolidays(year)
    ]);

    renderCalendar();
}

async function loadEvents(startDate, endDate) {
    try {
        let url = getApiUrl('events');
        if (startDate && endDate) {
            url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        const response = await fetch(url);
        if (response.ok) {
            events = await response.json();
        } else {
            console.error("Failed to load events");
        }
    } catch (error) {
        console.error("Error fetching events:", error);
    }
}

async function loadHolidays(year = currentDate.getFullYear()) {
    const country = countrySelect.value;
    try {
        const response = await fetch(getApiUrl(`holidays?year=${year}&country=${country}`));
        if (response.ok) {
            holidays = await response.json();
        } else {
            holidays = [];
        }
    } catch (error) {
        console.error("Error fetching holidays:", error);
        holidays = [];
    }
}

function renderCalendar() {
    calendarGrid.innerHTML = "";
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startOfWeekDay = firstDayOfMonth.getDay();

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startOfWeekDay);

    const today = new Date();
    const todayStr = formatDateISO(today);
    const searchTerm = searchInput.value.toLowerCase();

    // Map holidays into event structure
    const holidayEvents = holidays.map(h => ({
        id: `holiday-${h.date}-${h.name}`,
        title: h.name || h.localName,
        date: h.date,
        category: "holiday",
        isHoliday: true,
        description: h.localName || h.name,
        location: countrySelect.value
    }));

    // Combine user events and holidays
    const allEvents = [...events, ...holidayEvents];

    // Filter events if search query exists
    const filteredEvents = allEvents.filter(e => {
        if (!searchTerm) return true;
        return (
            e.title.toLowerCase().includes(searchTerm) ||
            (e.description && e.description.toLowerCase().includes(searchTerm)) ||
            (e.location && e.location.toLowerCase().includes(searchTerm))
        );
    });

    // Generate 42 cells (7 days * 6 rows)
    const runningDate = new Date(startDate);
    for (let i = 0; i < 42; i++) {
        const dateStr = formatDateISO(runningDate);
        const dayCell = document.createElement("div");
        dayCell.className = "day-cell";
        
        // Month checking
        if (runningDate.getMonth() !== month) {
            dayCell.classList.add("other-month");
        }
        
        // Today check
        if (dateStr === todayStr) {
            dayCell.classList.add("today");
        }

        // Add Date Number
        const numberContainer = document.createElement("div");
        numberContainer.className = "day-number-container";
        
        const numSpan = document.createElement("span");
        numSpan.className = "day-number";
        numSpan.textContent = runningDate.getDate();
        numberContainer.appendChild(numSpan);
        dayCell.appendChild(numberContainer);

        // Add Events Container
        const eventsContainer = document.createElement("div");
        eventsContainer.className = "day-events";
        
        // Find events on this day
        const dayEvents = filteredEvents.filter(e => e.date === dateStr);
        
        dayEvents.forEach(event => {
            const badge = document.createElement("div");
            badge.className = `event-badge event-${event.category || 'personal'}`;
            badge.textContent = event.title;
            badge.title = `${event.title}${event.start_time ? ' (' + event.start_time + ')' : ''}`;
            
            badge.addEventListener("click", (e) => {
                e.stopPropagation(); // Avoid triggering day-cell click
                openModalForEdit(event);
            });
            
            eventsContainer.appendChild(badge);
        });

        dayCell.appendChild(eventsContainer);

        // Click on day cell (blank space) opens create modal for that date
        const targetDate = dateStr;
        dayCell.addEventListener("click", () => {
            openModalForCreate(targetDate);
        });

        calendarGrid.appendChild(dayCell);
        runningDate.setDate(runningDate.getDate() + 1);
    }

    renderUpcomingEvents(allEvents);
}

function renderUpcomingEvents(allEvents) {
    upcomingEventsList.innerHTML = "";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter events occurring today or later in the active month
    const futureEvents = allEvents.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= today && eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear();
    });

    // Sort chronologically
    futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (futureEvents.length === 0) {
        upcomingEventsList.innerHTML = '<div class="no-events">No upcoming events this month</div>';
        return;
    }

    futureEvents.slice(0, 8).forEach(event => {
        const item = document.createElement("div");
        item.className = `upcoming-item cat-${event.category}`;
        
        const title = document.createElement("div");
        title.className = "upcoming-title";
        title.textContent = event.title;
        
        const details = document.createElement("div");
        details.className = "upcoming-time-date";
        
        const dateObj = new Date(event.date);
        const dateFmt = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const timeFmt = event.start_time ? event.start_time : "All-day";
        
        details.innerHTML = `<span>${dateFmt}</span><span>${timeFmt}</span>`;
        
        item.appendChild(title);
        item.appendChild(details);
        
        item.addEventListener("click", () => {
            openModalForEdit(event);
        });

        upcomingEventsList.appendChild(item);
    });
}

function openModal() {
    eventModal.classList.add("open");
}

function closeModal() {
    eventModal.classList.remove("open");
    eventForm.reset();
    selectedEvent = null;
}

function openModalForCreate(dateStr = null) {
    modalTitle.textContent = "New Event";
    eventIdInput.value = "";
    deleteEventBtn.classList.add("hidden");
    
    // Enable form fields (in case they were disabled from a Holiday view)
    toggleFormFields(false);
    
    const todayStr = dateStr || formatDateISO(new Date());
    eventDateInput.value = todayStr;
    
    openModal();
}

function openModalForEdit(event) {
    selectedEvent = event;
    eventIdInput.value = event.id;
    eventTitleInput.value = event.title;
    eventDateInput.value = event.date;
    eventCategorySelect.value = event.category || "personal";
    eventStartTimeInput.value = event.start_time || "";
    eventEndTimeInput.value = event.end_time || "";
    eventLocationInput.value = event.location || "";
    eventDescriptionInput.value = event.description || "";

    if (event.isHoliday) {
        modalTitle.textContent = "Public Holiday Info";
        deleteEventBtn.classList.add("hidden");
        toggleFormFields(true); // Disable editing holidays since they come from the external API
    } else {
        modalTitle.textContent = "Edit Event";
        deleteEventBtn.classList.remove("hidden");
        toggleFormFields(false);
    }
    
    openModal();
}

function toggleFormFields(disabled) {
    eventTitleInput.disabled = disabled;
    eventDateInput.disabled = disabled;
    eventCategorySelect.disabled = disabled;
    eventStartTimeInput.disabled = disabled;
    eventEndTimeInput.disabled = disabled;
    eventLocationInput.disabled = disabled;
    eventDescriptionInput.disabled = disabled;
    
    // Hide or show the save button
    const saveBtn = eventForm.querySelector('button[type="submit"]');
    if (disabled) {
        saveBtn.classList.add("hidden");
    } else {
        saveBtn.classList.remove("hidden");
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const eventId = eventIdInput.value;
    const eventData = {
        title: eventTitleInput.value,
        date: eventDateInput.value,
        category: eventCategorySelect.value,
        start_time: eventStartTimeInput.value || null,
        end_time: eventEndTimeInput.value || null,
        location: eventLocationInput.value || null,
        description: eventDescriptionInput.value || null
    };

    try {
        let response;
        if (eventId) {
            // Edit mode
            response = await fetch(getApiUrl(`events/${eventId}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            });
        } else {
            // Create mode
            response = await fetch(getApiUrl("events"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            });
        }

        if (response.ok) {
            closeModal();
            loadCalendarData();
        } else {
            alert("Error saving event. Please verify inputs.");
        }
    } catch (error) {
        console.error("Error saving event:", error);
    }
}

async function handleDeleteEvent() {
    const eventId = eventIdInput.value;
    if (!eventId) return;

    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
        const response = await fetch(getApiUrl(`events/${eventId}`), {
            method: "DELETE"
        });

        if (response.status === 204 || response.ok) {
            closeModal();
            loadCalendarData();
        } else {
            alert("Error deleting event.");
        }
    } catch (error) {
        console.error("Error deleting event:", error);
    }
}

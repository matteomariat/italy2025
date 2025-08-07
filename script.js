// Global variables
let itineraryData = null;
let currentDay = 0;
let map = null;
let markers = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadItineraryData();
    setupEventListeners();
});

// Load itinerary data from JSON file
async function loadItineraryData() {
    try {
        const response = await fetch('/italy.json');
        itineraryData = await response.json();
        displayDay(currentDay);
    } catch (error) {
        console.error('Error loading itinerary data:', error);
        document.querySelector('.day-container').innerHTML = 
            '<div class="loading">Erreur de chargement des données</div>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dayIndex = parseInt(this.dataset.day);
            currentDay = dayIndex;
            updateNavigation();
            displayDay(dayIndex);
        });
    });

    // Modal close buttons
    document.getElementById('closeMap').addEventListener('click', closeMapModal);
    document.getElementById('closeActivity').addEventListener('click', closeActivityModal);

    // Close modals when clicking outside
    document.getElementById('mapModal').addEventListener('click', function(e) {
        if (e.target === this) closeMapModal();
    });

    document.getElementById('activityModal').addEventListener('click', function(e) {
        if (e.target === this) closeActivityModal();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMapModal();
            closeActivityModal();
        }
    });
}

// Update navigation active state
function updateNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-day="${currentDay}"]`).classList.add('active');
}

// Display day content
function displayDay(dayIndex) {
    if (!itineraryData || !itineraryData.itinerary[dayIndex]) {
        document.querySelector('.day-container').innerHTML = 
            '<div class="loading">Journée non trouvée</div>';
        return;
    }

    const day = itineraryData.itinerary[dayIndex];
    const dayContainer = document.querySelector('.day-container');
    
    dayContainer.innerHTML = `
        <div class="day-header">
            <div class="day-date">${day.date}</div>
            <div class="day-route">${day.route}</div>
        </div>
        
        <div class="section">
            <div class="section-header">Matin</div>
            <div class="section-content">
                ${renderMorningActivities(day.morning)}
            </div>
        </div>
        
        <div class="section">
            <div class="section-header">Après-midi / Soir</div>
            <div class="section-content">
                ${renderAfternoonActivities(day.afternoon_evening)}
            </div>
        </div>
    `;

    // Add event listeners to new elements
    setupDayEventListeners();
}

// Render morning activities
function renderMorningActivities(morningActivities) {
    if (!morningActivities) return '<p>Aucune activité prévue le matin</p>';
    
    return morningActivities.map(activity => {
        if (typeof activity === 'string') {
            return `
                <div class="checkbox-item">
                    <input type="checkbox" id="morning-${Math.random().toString(36).substr(2, 9)}">
                    <label class="checkbox-text" for="morning-${Math.random().toString(36).substr(2, 9)}">${activity}</label>
                </div>
            `;
        } else if (activity.name) {
            return `
                <div class="activity-item">
                    <div class="activity-name">${activity.name}</div>
                    <div class="activity-description">${activity.description}</div>
                    ${activity.details ? renderActivityDetails(activity.details) : ''}
                    <div class="activity-actions">
                        <button class="btn btn-primary" onclick="showActivityDetails('${activity.name}', ${JSON.stringify(activity).replace(/"/g, '&quot;')})">
                            📋 Détails
                        </button>
                        <button class="btn btn-secondary" onclick="showOnMap('${activity.name}', ${JSON.stringify(activity).replace(/"/g, '&quot;')})">
                            🗺️ Carte
                        </button>
                    </div>
                </div>
            `;
        }
        return '';
    }).join('');
}

// Render afternoon activities
function renderAfternoonActivities(afternoonData) {
    if (!afternoonData) return '<p>Aucune activité prévue l\'après-midi</p>';
    
    let html = '';
    
    // Activities
    if (afternoonData.activities) {
        html += afternoonData.activities.map(activity => {
            if (typeof activity === 'string') {
                return `<p>${activity}</p>`;
            } else if (activity.name) {
                return `
                    <div class="activity-item">
                        <div class="activity-name">${activity.name}</div>
                        <div class="activity-description">${activity.description}</div>
                        ${activity.details ? renderActivityDetails(activity.details) : ''}
                        <div class="activity-actions">
                            <button class="btn btn-primary" onclick="showActivityDetails('${activity.name}', ${JSON.stringify(activity).replace(/"/g, '&quot;')})">
                                📋 Détails
                            </button>
                            <button class="btn btn-secondary" onclick="showOnMap('${activity.name}', ${JSON.stringify(activity).replace(/"/g, '&quot;')})">
                                🗺️ Carte
                            </button>
                        </div>
                    </div>
                `;
            }
            return '';
        }).join('');
    }
    
    // Dinner recommendations
    if (afternoonData.dinner_recommendations && afternoonData.dinner_recommendations.length > 0) {
        html += `
            <div class="section">
                <div class="section-header">Dîner</div>
                <div class="section-content">
                    ${afternoonData.dinner_recommendations.map(restaurant => `
                        <div class="restaurant-item">
                            <div class="restaurant-name">${restaurant.name}</div>
                            ${restaurant.location ? `<div class="restaurant-location">📍 ${restaurant.location}</div>` : ''}
                            ${restaurant.specialty ? `<div class="restaurant-specialty">🍽️ ${restaurant.specialty}</div>` : ''}
                            ${restaurant.note ? `<div class="restaurant-note">💡 ${restaurant.note}</div>` : ''}
                            <div class="activity-actions">
                                <button class="btn btn-secondary" onclick="showOnMap('${restaurant.name}', ${JSON.stringify(restaurant).replace(/"/g, '&quot;')})">
                                    🗺️ Carte
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // Accommodation
    if (afternoonData.accommodation) {
        html += `
            <div class="section">
                <div class="section-header">Hébergement</div>
                <div class="section-content">
                    <div class="accommodation-item">
                        <div class="accommodation-name">🏨 ${afternoonData.accommodation}</div>
                        <div class="activity-actions">
                            <button class="btn btn-secondary" onclick="showOnMap('Hébergement', ${JSON.stringify({name: afternoonData.accommodation}).replace(/"/g, '&quot;')})">
                                🗺️ Carte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return html;
}

// Render activity details
function renderActivityDetails(details) {
    if (!details) return '';
    
    const detailTags = [];
    Object.entries(details).forEach(([key, value]) => {
        const label = getDetailLabel(key);
        detailTags.push(`<span class="detail-tag">${label}: ${value}</span>`);
    });
    
    return `<div class="activity-details">${detailTags.join('')}</div>`;
}

// Get detail label
function getDetailLabel(key) {
    const labels = {
        'entry_fee': '💰 Tarif',
        'hours': '🕐 Horaires',
        'tour_duration': '⏱️ Durée',
        'ferry_company': '🚢 Compagnie',
        'ferry_schedule': '📅 Horaires ferry',
        'ticket_price': '🎫 Prix',
        'audio_guide': '🎧 Audio-guide',
        'price_round_trip': '🎫 Aller-retour',
        'palazzo_ducale_entry_fee': '💰 Palais Ducal',
        'palazzo_ducale_hours': '🕐 Palais Ducal',
        'musee_entry_fee': '💰 Musée',
        'combined_ticket': '🎫 Pass combiné',
        'duration': '⏱️ Durée',
        'price': '💰 Prix',
        'location': '📍 Lieu'
    };
    return labels[key] || key;
}

// Setup day event listeners
function setupDayEventListeners() {
    // Checkbox functionality
    document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.checkbox-item');
            if (this.checked) {
                item.classList.add('checked');
            } else {
                item.classList.remove('checked');
            }
        });
    });
}

// Show activity details modal
function showActivityDetails(title, activity) {
    const modal = document.getElementById('activityModal');
    const modalTitle = document.getElementById('activityTitle');
    const modalContent = document.getElementById('activityDetails');
    
    modalTitle.textContent = title;
    
    let content = `
        <div class="activity-item">
            <div class="activity-name">${activity.name}</div>
            <div class="activity-description">${activity.description}</div>
            ${activity.details ? renderActivityDetails(activity.details) : ''}
        </div>
    `;
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

// Show location on map
function showOnMap(title, location) {
    const modal = document.getElementById('mapModal');
    const modalTitle = document.getElementById('mapTitle');
    
    modalTitle.textContent = `Carte - ${title}`;
    modal.style.display = 'block';
    
    // Initialize map if not already done
    if (!map) {
        setTimeout(() => {
            initMap();
            // Add a sample marker (in a real app, you'd use actual coordinates)
            addMapMarker(title, 42.8333, 12.8333); // Approximate coordinates for Umbria
        }, 100);
    } else {
        // Clear existing markers and add new one
        clearMapMarkers();
        addMapMarker(title, 42.8333, 12.8333);
    }
}

// Initialize map
function initMap() {
    const mapContainer = document.getElementById('map');
    map = L.map(mapContainer).setView([42.8333, 12.8333], 8);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Add marker to map
function addMapMarker(title, lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${title}</b>`).openPopup();
    markers.push(marker);
}

// Clear map markers
function clearMapMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Close map modal
function closeMapModal() {
    document.getElementById('mapModal').style.display = 'none';
}

// Close activity modal
function closeActivityModal() {
    document.getElementById('activityModal').style.display = 'none';
}

// Save progress to localStorage
function saveProgress() {
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    const progress = {};
    
    checkboxes.forEach((checkbox, index) => {
        progress[index] = checkbox.checked;
    });
    
    localStorage.setItem('italy2025-progress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('italy2025-progress') || '{}');
    
    Object.entries(progress).forEach(([index, checked]) => {
        const checkbox = document.querySelector(`.checkbox-item input[type="checkbox"]:nth-child(${parseInt(index) + 1})`);
        if (checkbox) {
            checkbox.checked = checked;
            if (checked) {
                checkbox.closest('.checkbox-item').classList.add('checked');
            }
        }
    });
}

// Auto-save progress
setInterval(saveProgress, 5000);

// Load progress on page load
document.addEventListener('DOMContentLoaded', loadProgress); 
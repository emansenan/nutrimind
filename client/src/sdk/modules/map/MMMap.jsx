import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MMMap.css';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * MMMap - Advanced Map Module
 * 
 * @param {Array} markers - [{ lat, lon, title, color, content }]
 * @param {Array} center - [lat, lon]
 * @param {number} zoom - default 13
 * @param {string} height - container height
 */
const MMMap = ({
    markers = [],
    center = [33.3152, 44.3661], // Baghdad Default
    zoom = 12,
    height = '400px',
    className = ''
}) => {
    // Theme detection for Tiles
    const [theme, setTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    });

    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    // Custom SVG Marker Generator
    const createCustomIcon = (color = '#3b82f6', label = '') => {
        const svgIcon = `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 8.75 12.5 28.5 12.5 28.5s12.5-19.75 12.5-28.5C25 5.6 19.4 0 12.5 0z" 
                      fill="${color}" stroke="white" stroke-width="2"/>
                <circle cx="12.5" cy="12.5" r="6" fill="white"/>
                ${label ? `<text x="12.5" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="${color}">${label}</text>` : ''}
            </svg>
        `;
        return L.divIcon({
            html: svgIcon,
            className: 'mm-map-marker',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });
    };

    const tileUrl = theme === 'light'
        ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    return (
        <div className={`mm-map-container ${className}`} style={{ height }}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                key={theme} // Force re-render on theme change
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url={tileUrl}
                />
                {markers.map((marker, idx) => (
                    <Marker
                        key={idx}
                        position={[marker.lat, marker.lon]}
                        icon={createCustomIcon(marker.color, marker.label)}
                    >
                        <Popup className="mm-map-popup">
                            <div className="mm-map-popup-content">
                                {marker.title && <h4>{marker.title}</h4>}
                                {marker.content}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MMMap;

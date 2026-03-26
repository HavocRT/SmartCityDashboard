import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { FIELD_FORMATTERS } from "./FieldFormatters";

// ─── Icon imports ─────────────────────────────────────────────────────────────
// Mobility
import parkingLotIcon       from "../assets/icons/parking-lot.png";
import parkingSpacesIcon    from "../assets/icons/parking-spaces.png";
import chargingStationIcon  from "../assets/icons/charging-station.png";
import trafficFlowIcon      from "../assets/icons/traffic-flow.png";
import accidentIcon         from "../assets/icons/accident.png";
import busStationIcon       from "../assets/icons/bus-station.png";
import bikeStationIcon      from "../assets/icons/bike-station.png";
// Energy
import powerConsumptionIcon     from "../assets/icons/power-consumption.png";
import renewableEnergyIcon      from "../assets/icons/renewable-energy.png";
import streetLightingIcon       from "../assets/icons/street-lighting.png";
import carbonEmissionsIcon      from "../assets/icons/carbon-emissions.png";
// Environment
import airQualityIcon       from "../assets/icons/air-quality.png";
import noisePollutionIcon   from "../assets/icons/noise-pollution.png";
import weatherStationIcon   from "../assets/icons/weather-station.png";
import waterQualityIcon     from "../assets/icons/water-quality.png";
import wasteManagementIcon  from "../assets/icons/waste-management.png";
// Health
import hospitalIcon         from "../assets/icons/hospital.png";
import pharmacyIcon         from "../assets/icons/pharmacy.png";
import diseaseMonitorIcon   from "../assets/icons/disease-monitoring.png";
import emergencyIcon        from "../assets/icons/emergency-response.png";
import healthAlertIcon      from "../assets/icons/health-alert.png";
// Culture
import upcomingEventsIcon   from "../assets/icons/upcoming-events.png";
import museumIcon           from "../assets/icons/museum.png";
import libraryIcon          from "../assets/icons/library.png";
import tourismIcon          from "../assets/icons/tourism.png";
import wifiIcon             from "../assets/icons/wifi.png";
// Sport
import facilityIcon         from "../assets/icons/facility.png";
import gymIcon              from "../assets/icons/gym.png";
import fitnessIcon          from "../assets/icons/fitness.png";
// Education
import schoolIcon           from "../assets/icons/school.png";
import schoolTransportIcon  from "../assets/icons/school-transport.png";
import literacyIcon         from "../assets/icons/literacy.png";
// Finance
import bankIcon             from "../assets/icons/bank.png";
import budgetIcon           from "../assets/icons/budget.png";
import taxIcon              from "../assets/icons/tax.png";
import paymentIcon          from "../assets/icons/payment.png";
import propertyIcon         from "../assets/icons/property.png";

// ─── Icon map: endpoint key → imported PNG ────────────────────────────────────
const ICON_MAP = {
  "mobility/parking-lots":                parkingLotIcon,
  "mobility/parking-spaces":             parkingSpacesIcon,
  "mobility/charging-stations":          chargingStationIcon,
  "mobility/traffic-flow":               trafficFlowIcon,
  "mobility/accidents":                  accidentIcon,
  "mobility/bus-stations":               busStationIcon,
  "mobility/bike-stations":              bikeStationIcon,
  "energy/power-consumption":            powerConsumptionIcon,
  "energy/renewable-energy":             renewableEnergyIcon,
  "energy/street-lighting":              streetLightingIcon,
  "energy/carbon-emissions":             carbonEmissionsIcon,
  "environment/air-quality":             airQualityIcon,
  "environment/noise-pollution":         noisePollutionIcon,
  "environment/weather-stations":        weatherStationIcon,
  "environment/water-quality":           waterQualityIcon,
  "environment/waste-management":        wasteManagementIcon,
  "health/hospitals":                    hospitalIcon,
  "health/pharmacies":                   pharmacyIcon,
  "health/disease-monitoring":           diseaseMonitorIcon,
  "health/emergency-response":           emergencyIcon,
  "health/health-alerts":                healthAlertIcon,
  "culture/upcoming-events":             upcomingEventsIcon,
  "culture/museums":                     museumIcon,
  "culture/public-libraries":            libraryIcon,
  "culture/tourism-analytics":           tourismIcon,
  "culture/wifi-zones":                  wifiIcon,
  "sport/facility-locations":            facilityIcon,
  "sport/gymnasiums":                    gymIcon,
  "sport/fitness-activity-trends":       fitnessIcon,
  "education/educational-institutions":  schoolIcon,
  "education/school-transports":         schoolTransportIcon,
  "education/literacy-statistics":       literacyIcon,
  "finance/banks-atms":                  bankIcon,
  "finance/budget-allocation":           budgetIcon,
  "finance/tax-revenue":                 taxIcon,
  "finance/smart-payment-systems":       paymentIcon,
  "finance/property-market-trends":      propertyIcon,
};

// ─── Create a Leaflet icon from a PNG ─────────────────────────────────────────
const makeIcon = (iconUrl) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: #33304e;
        border: 2px solid #00c6ff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,198,255,0.4);
      ">
        <img src="${iconUrl}" style="
          width: 18px;
          height: 18px;
          transform: rotate(45deg);
          object-fit: contain;
          filter: brightness(0) invert(1);
        " />
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -40],
  });

// ─── Fly to Tokyo on mount or when no data ────────────────────────────────────
const TOKYO = [35.6762, 139.6503];
const TOKYO_BOUNDS = [
    [35.4, 139.3],
    [35.9, 139.95],
];

function FlyToTokyo({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (!markers || markers.length === 0) {
      map.flyTo(TOKYO, 12, { duration: 1.2 });
    }
  }, [markers, map]);
  return null;
}

// ─── Format a popup card from any JSON shape ──────────────────────────────────
function PopupCard({ data }) {
  // Fields to skip (used internally for map positioning)
  const skip = new Set(["lat", "lng", "id"]);

  const entries = Object.entries(data).filter(
    ([key]) => !skip.has(key)
  );

  return (
    <div className={styles.popupCard}>
      <h3 className={styles.popupTitle}>{data.name || data.id || "Location"}</h3>
      <div className={styles.popupFields}>
        {entries.map(([key, value]) => {
          if (key === "name") return null;
          const label = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          const display = FIELD_FORMATTERS[key]
            ? FIELD_FORMATTERS[key](value)
            : typeof value === "object"
                ? JSON.stringify(value)
                : String(value);
          return (
            <div key={key} className={styles.popupRow}>
              <span className={styles.popupLabel}>{label}</span>
              <span className={styles.popupValue}>{display}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Map component ───────────────────────────────────────────────────────
// Props:
//   activeEndpoint — string like "culture/upcoming-events" passed from Navbar
function Map({ activeEndpoint }) {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeEndpoint) {
      setMarkers([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/${activeEndpoint}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Only keep items that have lat/lng
        const valid = data.filter(
          (item) => typeof item.lat === "number" && typeof item.lng === "number"
        );
        setMarkers(valid);
      } catch (err) {
        console.error("Map fetch error:", err);
        setError("Failed to load data.");
        setMarkers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeEndpoint]);

  const icon = activeEndpoint ? makeIcon(ICON_MAP[activeEndpoint]) : null;

  return (
    <div className={styles.mapWrapper}>
      {/* Status bar */}
      {loading && (
        <div className={styles.statusBar}>Loading markers...</div>
      )}
      {error && (
        <div className={`${styles.statusBar} ${styles.statusError}`}>{error}</div>
      )}
      {!loading && !error && markers.length > 0 && (
        <div className={styles.statusBar}>
          {markers.length} location{markers.length !== 1 ? "s" : ""} shown
        </div>
      )}

      <MapContainer
        center={TOKYO}
        zoom={12}
        minZoom={11}
        maxZoom={16}
        maxBounds={TOKYO_BOUNDS}
        maxBoundsViscosity={1.0}
        className={styles.map}
        zoomControl={true}
      >
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        <FlyToTokyo markers={markers} />

        {markers.map((item) => (
          <Marker
            key={item.id || `${item.lat}-${item.lng}`}
            position={[item.lat, item.lng]}
            icon={icon}
          >
            <Popup minWidth={240} maxWidth={320}>
              <PopupCard data={item} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
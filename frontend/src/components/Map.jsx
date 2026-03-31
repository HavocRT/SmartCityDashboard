import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { FIELD_FORMATTERS } from "./FieldFormatters";

import parkingLotIcon       from "../assets/icons/parking-lot.png";
import parkingSpacesIcon    from "../assets/icons/parking-spaces.png";
import chargingStationIcon  from "../assets/icons/charging-station.png";
import accidentIcon         from "../assets/icons/accident.png";
import busStationIcon       from "../assets/icons/bus-station.png";
import bikeStationIcon      from "../assets/icons/bike-station.png";
import powerConsumptionIcon from "../assets/icons/power-consumption.png";
import renewableEnergyIcon  from "../assets/icons/renewable-energy.png";
import streetLightingIcon   from "../assets/icons/street-lighting.png";
import carbonEmissionsIcon  from "../assets/icons/carbon-emissions.png";
import airQualityIcon       from "../assets/icons/air-quality.png";
import noisePollutionIcon   from "../assets/icons/noise-pollution.png";
import weatherStationIcon   from "../assets/icons/weather-station.png";
import waterQualityIcon     from "../assets/icons/water-quality.png";
import wasteManagementIcon  from "../assets/icons/waste-management.png";
import hospitalIcon         from "../assets/icons/hospital.png";
import pharmacyIcon         from "../assets/icons/pharmacy.png";
import diseaseMonitorIcon   from "../assets/icons/disease-monitoring.png";
import emergencyIcon        from "../assets/icons/emergency-response.png";
import healthAlertIcon      from "../assets/icons/health-alert.png";
import upcomingEventsIcon   from "../assets/icons/upcoming-events.png";
import museumIcon           from "../assets/icons/museum.png";
import libraryIcon          from "../assets/icons/library.png";
import tourismIcon          from "../assets/icons/tourism.png";
import wifiIcon             from "../assets/icons/wifi.png";
import facilityIcon         from "../assets/icons/facility.png";
import gymIcon              from "../assets/icons/gym.png";
import fitnessIcon          from "../assets/icons/fitness.png";
import schoolIcon           from "../assets/icons/school.png";
import schoolTransportIcon  from "../assets/icons/school-transport.png";
import literacyIcon         from "../assets/icons/literacy.png";
import bankIcon             from "../assets/icons/bank.png";
import budgetIcon           from "../assets/icons/budget.png";
import taxIcon              from "../assets/icons/tax.png";
import paymentIcon          from "../assets/icons/payment.png";
import propertyIcon         from "../assets/icons/property.png";

const ICON_MAP = {
  "mobility/parking-lots":                parkingLotIcon,
  "mobility/parking-spaces":             parkingSpacesIcon,
  "mobility/charging-stations":          chargingStationIcon,
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

const makeIcon = (iconUrl) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width: 36px;
        height: 36px;
        background: #0f1621;
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
        " onerror="this.style.display='none'" />
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -40],
  });

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

function PopupCard({ data }) {
  const skip = new Set(["lat", "lng", "id"]);
  const entries = Object.entries(data).filter(([key]) => !skip.has(key));

  return (
    <div className={styles.popupCard}>
      <h3 className={styles.popupTitle}>
        {data.name || data.title || data.id || "Location"}
      </h3>
      <div className={styles.popupFields}>
        {entries.map(([key, value]) => {
          if (key === "name" || key === "title") return null;
          const label = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
          const display = FIELD_FORMATTERS[key]
            ? FIELD_FORMATTERS[key](value)
            : typeof value === "object"
            ? JSON.stringify(value)
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())
            : String(value)
                .replace(/_/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
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

const SEVERITY_COLOR = {
  low:      "#00c6ff",
  moderate: "#f5a623",
  high:     "#ff4d4d",
  critical: "#cc0000",
};

function HealthAlertsPanel({ data }) {
  const [selected, setSelected] = useState(0);
  if (!data || data.length === 0) return null;
  const alert = data[selected];

  return (
    <div className={styles.alertPanel}>
      {data.length > 1 && (
        <div className={styles.alertTabs}>
          {data.map((a, i) => (
            <button
              key={a.id}
              className={`${styles.alertTab} ${i === selected ? styles.alertTabActive : ""}`}
              onClick={() => setSelected(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
      <div
        className={styles.alertHeader}
        style={{ borderLeftColor: SEVERITY_COLOR[alert.severity] || "#00c6ff" }}
      >
        <span
          className={styles.alertSeverity}
          style={{ color: SEVERITY_COLOR[alert.severity] || "#00c6ff" }}
        >
          {alert.severity?.toUpperCase()}
        </span>
        <h3 className={styles.alertTitle}>{alert.title}</h3>
      </div>
      <p className={styles.alertDescription}>{alert.description}</p>
      <div className={styles.alertMeta}>
        {alert.affected_districts && (
          <div className={styles.alertRow}>
            <span className={styles.alertLabel}>Districts</span>
            <span className={styles.alertValue}>{alert.affected_districts.join(", ")}</span>
          </div>
        )}
        {alert.issued_by && (
          <div className={styles.alertRow}>
            <span className={styles.alertLabel}>Issued by</span>
            <span className={styles.alertValue}>{alert.issued_by}</span>
          </div>
        )}
        {alert.date_issued && (
          <div className={styles.alertRow}>
            <span className={styles.alertLabel}>Date</span>
            <span className={styles.alertValue}>
              {FIELD_FORMATTERS.last_updated(alert.date_issued)}
            </span>
          </div>
        )}
        {alert.status && (
          <div className={styles.alertRow}>
            <span className={styles.alertLabel}>Status</span>
            <span
              className={styles.alertValue}
              style={{ color: alert.status === "active" ? "#00c6ff" : "#8a9bb0" }}
            >
              {alert.status.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Map({ activeEndpoint }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeEndpoint) {
      setData([]);
      return;
    }
    const fetchData = () => {
      setLoading(true);
      setError(null);

      fetch(`http://localhost:5000/${activeEndpoint}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((json) => {
          setData(json);
        })
        .catch((err) => {
          console.error("Map fetch error:", err);
          setError("Failed to load data.");
          setData([]);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [activeEndpoint]);

  const markers = data.filter(
    (item) => typeof item.lat === "number" && typeof item.lng === "number"
  );

  const icon = useMemo(() => {
    if (!activeEndpoint) return null;
    return makeIcon(ICON_MAP[activeEndpoint]);
  }, [activeEndpoint]);

  return (
    <div className={styles.mapWrapper}>
      {loading && (
        <div className={styles.statusBar}>Loading...</div>
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
        key={activeEndpoint}
        center={TOKYO}
        zoom={12}
        minZoom={11}
        maxZoom={12}
        maxBounds={TOKYO_BOUNDS}
        maxBoundsViscosity={1.0}
        className={styles.map}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          maxZoom={12}
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

      {activeEndpoint === "health/health-alerts" && data.length > 0 && (
        <HealthAlertsPanel data={data} />
      )}
    </div>
  );
}

export default Map;
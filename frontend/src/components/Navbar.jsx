import { useState } from "react";
import styles from "./Navbar.module.css";

import mobilityIcon from "../assets/icons/mobility.svg";
import energyIcon from "../assets/icons/energy.svg";
import environmentIcon from "../assets/icons/environment.svg";
import healthIcon from "../assets/icons/health.svg";
import cultureIcon from "../assets/icons/culture.svg";
import sportIcon from "../assets/icons/sport.svg";
import educationIcon from "../assets/icons/education.svg";
import financeIcon from "../assets/icons/finance.svg";

const menuItems = [
  {
    label: "Mobility",
    icon: mobilityIcon,
    key: "mobility",
    subItems: [
      { label: "Parking Lot",        key: "parking-lots" },
      { label: "Parking Spaces",     key: "parking-spaces" },
      { label: "Charging Stations",  key: "charging-stations" },
      { label: "Traffic Flow",       key: "traffic-flow" },
      { label: "Accidents",          key: "accidents" },
      { label: "Bus Stations",       key: "bus-stations" },
      { label: "Bike Stations",      key: "bike-stations" },
    ],
  },
  {
    label: "Energy",
    icon: energyIcon,
    key: "energy",
    subItems: [
      { label: "Power Consumption",          key: "power-consumption" },
      { label: "Renewable Energy Production",key: "renewable-energy" },
      { label: "Street Lighting System",     key: "street-lighting" },
      { label: "Carbon Emissions",           key: "carbon-emissions" },
    ],
  },
  {
    label: "Environment",
    icon: environmentIcon,
    key: "environment",
    subItems: [
      { label: "Air Quality Index",    key: "air-quality" },
      { label: "Noise Pollution Data", key: "noise-pollution" },
      { label: "Weather Station Data", key: "weather-stations" },
      { label: "Water Quality",        key: "water-quality" },
      { label: "Waste Management",     key: "waste-management" },
    ],
  },
  {
    label: "Health",
    icon: healthIcon,
    key: "health",
    subItems: [
      { label: "Hospitals",          key: "hospitals" },
      { label: "Pharmacies",         key: "pharmacies" },
      { label: "Disease Monitoring", key: "disease-monitoring" },
      { label: "Emergency Response", key: "emergency-response" },
      { label: "Health Alerts",      key: "health-alerts" },
    ],
  },
  {
    label: "Culture",
    icon: cultureIcon,
    key: "culture",
    subItems: [
      { label: "Upcoming Events",    key: "upcoming-events" },
      { label: "Museums",            key: "museums" },
      { label: "Public Libraries",   key: "public-libraries" },
      { label: "Tourism Analytics",  key: "tourism-analytics" },
      { label: "Public Wi-Fi Zones", key: "wifi-zones" },
    ],
  },
  {
    label: "Sport",
    icon: sportIcon,
    key: "sport",
    subItems: [
      { label: "Facility Locations",      key: "facility-locations" },
      { label: "Gymnasiums",              key: "gymnasiums" },
      { label: "Fitness Activity Trends", key: "fitness-activity-trends" },
    ],
  },
  {
    label: "Education",
    icon: educationIcon,
    key: "education",
    subItems: [
      { label: "Educational Institutions", key: "educational-institutions" },
      { label: "School Transports",        key: "school-transports" },
      { label: "Literacy Statistics",      key: "literacy-statistics" },
    ],
  },
  {
    label: "Finance",
    icon: financeIcon,
    key: "finance",
    subItems: [
      { label: "Banks & ATMs",           key: "banks-atms" },
      { label: "Budget Allocation",      key: "budget-allocation" },
      { label: "Tax Revenue Dashboard",  key: "tax-revenue" },
      { label: "Smart Payment Systems",  key: "smart-payment-systems" },
      { label: "Property Market Trends", key: "property-market-trends" },
    ],
  },
];

function Navbar({ onEndpointChange }) {
  const [openMenu, setOpenMenu] = useState(null);

  const [activeItem, setActiveItem] = useState(null);

  const handleMenuClick = (key) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  const handleSubItemClick = (menuKey, subKey) => {
    const fullKey = `${menuKey}/${subKey}`;
    setActiveItem(fullKey);
    onEndpointChange(fullKey);
  };

  return (
    <nav className={styles.navbar}>
      {menuItems.map((menu) => (
        <div key={menu.key} className={styles.menuGroup}>

          {/* Top-level menu item */}
          <button
            className={`${styles.menuItem} ${openMenu === menu.key ? styles.menuItemActive : ""}`}
            onClick={() => handleMenuClick(menu.key)}
          >
            <img src={menu.icon} alt={menu.label} className={styles.menuIcon} />
            <span className={styles.menuLabel}>{menu.label}</span>
            <span className={`${styles.arrow} ${openMenu === menu.key ? styles.arrowOpen : ""}`}>
              ‹
            </span>
          </button>

          {/* Submenu */}
          {openMenu === menu.key && (
            <div className={styles.subMenu}>
              {menu.subItems.map((sub) => (
                <button
                  key={sub.key}
                  className={`${styles.subItem} ${activeItem === `${menu.key}/${sub.key}` ? styles.subItemActive : ""}`}
                  onClick={() => handleSubItemClick(menu.key, sub.key)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

        </div>
      ))}
    </nav>
  );
}

export default Navbar;
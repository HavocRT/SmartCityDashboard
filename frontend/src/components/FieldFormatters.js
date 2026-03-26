// ─── Helper functions ─────────────────────────────────────────────────────────

// "2026-06-10T19:00:00" → "Jun 10, 2026 at 7:00 PM"
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateStr} at ${timeStr}`;
};

// "2026-03-24T08:45:00" → "8:45 AM"
const formatTimeOnly = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// "08:00-11:00" → "8:00 AM to 11:00 AM"
const formatTimeRange = (rangeStr) => {
  const [start, end] = rangeStr.split("-");
  const toAmPm = (t) => {
    const [h, m] = t.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
  };
  return `${toAmPm(start)} to ${toAmPm(end)}`;
};

// "18:00" → "6:00 PM"
const formatHHMM = (t) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

// ─── Field Formatters ─────────────────────────────────────────────────────────

export const FIELD_FORMATTERS = {

  // Arrays → comma separated strings
  connector_types:    (v) => v.join(", "),
  routes:             (v) => v.join(", "),
  major_sources:      (v) => v.join(", "),
  specialties:        (v) => v.map((s) => s.replace(/_/g, " ")).join(", "),
  affected_districts: (v) => v.join(", "),
  nearby_attractions: (v) => v.join(", "),
  nearby_landmarks:   (v) => v.join(", "),
  sports_supported:   (v) => v.map((s) => s.replace(/_/g, " ")).join(", "),
  courses_offered:    (v) => v.map((s) => s.replace(/_/g, " ")).join(", "),
  services:           (v) => v.map((s) => s.replace(/_/g, " ")).join(", "),
  supported_methods:  (v) => v.map((s) => s.replace(/_/g, " ")).join(", "),

  // Time ranges array → "8:00 AM to 11:00 AM, 6:00 PM to 10:00 PM"
  peak_hours: (v) => v.map(formatTimeRange).join(", "),

  // Single time range string → "6:00 PM to 10:00 PM"
  peak_time:       (v) => formatTimeRange(v),

  // ISO datetime → "8:45 AM"
  reported_time: (v) => formatTimeOnly(v),

  // ISO datetime → "Jun 10, 2026 at 7:00 PM"
  last_updated: (v) => formatDateTime(v),
  start_date:   (v) => formatDateTime(v),
  end_date:     (v) => formatDateTime(v),

  // Currency — free if 0, otherwise ¥
  ticket_price: (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}`),
  fee_per_hour: (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}/hr`),
  fee_per_kwh:  (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}/kWh`),

  // opening_hours: { open: "10:30", close: "21:00" }
  opening_hours: (v) =>
    `Open from ${formatHHMM(v.open)} to ${formatHHMM(v.close)}`,

  // peak_hour_range: { start: "18:00", end: "21:00" }
  peak_hour_range: (v) =>
    `${formatHHMM(v.start)} to ${formatHHMM(v.end)}`,

  // peak_usage_hours: { start: "17:00", end: "22:00" }
  peak_usage_hours: (v) =>
    `${formatHHMM(v.start)} to ${formatHHMM(v.end)}`,

  // top_nationalities: [{ country, percentage }]
  top_nationalities: (v) =>
    v.map((n) => `${n.country} ${n.percentage}%`).join(", "),

  // seasonality_index: { spring: 1.3, summer: 1.1, ... }
  seasonality_index: (v) =>
    Object.entries(v)
      .map(([season, val]) => `${season.charAt(0).toUpperCase() + season.slice(1)}: ${val}`)
      .join(", "),

  // network_speed_mbps: { avg: 60, peak: 140 }
  network_speed_mbps: (v) => `Average: ${v.avg} Mbps | Peak: ${v.peak} Mbps`,
};
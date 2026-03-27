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

const formatTimeOnly = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

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

const formatHHMM = (t) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};


export const FIELD_FORMATTERS = {

  connector_types:    (v) => v.join(", "),
  routes:             (v) => v.join(", "),
  major_sources:      (v) => v.map((str) => str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  specialties:        (v) => (v.map((s) => s.replace(/_/g, " "))).map((str) =>
                                            str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  affected_districts: (v) => v.map((str) => str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  nearby_attractions: (v) => v.map((str) => str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  nearby_landmarks:   (v) => v.map((str) => str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  sports_supported:   (v) => (v.map((s) => s.replace(/_/g, " "))).map((str) =>
                                            str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  courses_offered:    (v) => (v.map((s) => s.replace(/_/g, " "))).map((str) =>
                                            str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  services:           (v) => (v.map((s) => s.replace(/_/g, " "))).map((str) =>
                                            str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),
  supported_methods:  (v) => (v.map((s) => s.replace(/_/g, " "))).map((str) =>
                                            str.replace(/\b\w/g, match => match.toUpperCase())).join(", "),

  peak_hours: (v) => v.map(formatTimeRange).join(", "),

  peak_time:       (v) => formatTimeRange(v),

  reported_time: (v) => formatTimeOnly(v),

  last_updated: (v) => formatDateTime(v),
  start_date:   (v) => formatDateTime(v),
  end_date:     (v) => formatDateTime(v),

  ticket_price: (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}`),
  fee_per_hour: (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}/hr`),
  fee_per_kwh:  (v) => (v === 0 ? "Free" : `¥${v.toLocaleString()}/kWh`),

  opening_hours: (v) =>
    `Open from ${formatHHMM(v.open)} to ${formatHHMM(v.close)}`,

  peak_hour_range: (v) =>
    `${formatHHMM(v.start)} to ${formatHHMM(v.end)}`,

  peak_usage_hours: (v) =>
    `${formatHHMM(v.start)} to ${formatHHMM(v.end)}`,

  top_nationalities: (v) =>
    v.map((n) => `${n.country} ${n.percentage}%`).join(", "),

  seasonality_index: (v) =>
    Object.entries(v)
      .map(([season, val]) => `${season.charAt(0).toUpperCase() + season.slice(1)}: ${val}`)
      .join(", "),

  network_speed_mbps: (v) => `Average: ${v.avg} Mbps | Peak: ${v.peak} Mbps`,
};
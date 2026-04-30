// Service catalog — pořadí zachované pro modal výpis
export const services = [
  { id: 'display_original',  group: 'display',  label: 'Výměna displeje',           variant: 'ORIGINÁL', icon: 'ph-monitor' },
  { id: 'display_premium',   group: 'display',  label: 'Výměna displeje',           variant: 'PREMIUM',  icon: 'ph-monitor' },
  { id: 'battery_original',  group: 'battery',  label: 'Výměna baterie',            variant: 'ORIGINÁL', icon: 'ph-battery-charging-vertical' },
  { id: 'battery_premium',   group: 'battery',  label: 'Výměna baterie',            variant: 'PREMIUM',  icon: 'ph-battery-vertical-full' },
  { id: 'charging_port',     group: 'parts',    label: 'Výměna nabíjecího konektoru', icon: 'ph-plug' },
  { id: 'earpiece',          group: 'audio',    label: 'Výměna sluchátka',          icon: 'ph-speaker-simple-low' },
  { id: 'speaker',           group: 'audio',    label: 'Výměna reproduktoru',       icon: 'ph-speaker-high' },
  { id: 'rear_camera',       group: 'camera',   label: 'Výměna zadní kamery',       icon: 'ph-camera' },
  { id: 'back_glass',        group: 'parts',    label: 'Výměna zadního skla',       icon: 'ph-square' },
  { id: 'face_id',           group: 'parts',    label: 'Oprava Face ID',            icon: 'ph-scan' },
  { id: 'tempered_2d',       group: 'glass',    label: 'Nalepení tvrzeného skla',   variant: '2D',       icon: 'ph-shield' },
  { id: 'tempered_3d',       group: 'glass',    label: 'Nalepení tvrzeného skla',   variant: '3D',       icon: 'ph-shield-check' },
  { id: 'screen_protector',  group: 'glass',    label: 'Nalepení ochranné fólie',   icon: 'ph-sticker' },
  { id: 'other',             group: 'other',    label: 'Ostatní opravy',            icon: 'ph-gear-six' },
];

// Společné položky které platí pro všechny modely
const COMMON = {
  tempered_2d: 299,
  tempered_3d: 399,
  screen_protector: 499,
  other: 'Dle dohody',
};

// Per-device prices — přesné ceny dodané klientem
export const devices = {
  // iPhone 16 series
  'iphone-16-pro-max': {
    name: 'iPhone 16 Pro Max', year: 2024,
    prices: {
      display_original: 10999, display_premium: 5999,
      battery_original: 3499,  battery_premium: 1799,
      charging_port: 2999, earpiece: 1799, speaker: 1799,
      rear_camera: 3999, back_glass: 3499,
      ...COMMON,
    },
  },
  'iphone-16-pro': {
    name: 'iPhone 16 Pro', year: 2024,
    prices: {
      display_original: 9999, display_premium: 4999,
      battery_original: 3399, battery_premium: 1799,
      charging_port: 2999, earpiece: 1799, speaker: 1799,
      rear_camera: 3599, back_glass: 3399,
      ...COMMON,
    },
  },
  'iphone-16-plus': {
    name: 'iPhone 16 Plus', year: 2024,
    prices: {
      display_original: 7999, display_premium: 4199,
      battery_original: 2999, battery_premium: 1699,
      charging_port: 2799, earpiece: 1699, speaker: 1699,
      rear_camera: 3299, back_glass: 3099,
      ...COMMON,
    },
  },
  'iphone-16': {
    name: 'iPhone 16', year: 2024,
    prices: {
      display_original: 7599, display_premium: 3999,
      battery_original: 2999, battery_premium: 1699,
      charging_port: 2599, earpiece: 1699, speaker: 1699,
      rear_camera: 2999, back_glass: 2999,
      ...COMMON,
    },
  },
  'iphone-16e': {
    name: 'iPhone 16e', year: 2025,
    prices: {
      display_original: 5999, display_premium: 2999,
      battery_original: 2799, battery_premium: 1599,
      charging_port: 2499, earpiece: 1599, speaker: 1599,
      rear_camera: 2699, back_glass: 2999,
      ...COMMON,
    },
  },

  // iPhone 15 series
  'iphone-15-pro-max': {
    name: 'iPhone 15 Pro Max', year: 2023,
    prices: {
      display_original: 8590, display_premium: 3799,
      battery_original: 2999, battery_premium: 1699,
      charging_port: 2499, earpiece: 1699, speaker: 1699,
      rear_camera: 3499, back_glass: 3099,
      ...COMMON,
    },
  },
  'iphone-15-pro': {
    name: 'iPhone 15 Pro', year: 2023,
    prices: {
      display_original: 8399, display_premium: 3599,
      battery_original: 2999, battery_premium: 1699,
      charging_port: 2499, earpiece: 1699, speaker: 1699,
      rear_camera: 3399, back_glass: 2999,
      ...COMMON,
    },
  },
  'iphone-15-plus': {
    name: 'iPhone 15 Plus', year: 2023,
    prices: {
      display_original: 6899, display_premium: 2799,
      battery_original: 2899, battery_premium: 1599,
      charging_port: 2499, earpiece: 1599, speaker: 1599,
      rear_camera: 2599, back_glass: 2899,
      ...COMMON,
    },
  },
  'iphone-15': {
    name: 'iPhone 15', year: 2023,
    prices: {
      display_original: 6599, display_premium: 3499,
      battery_original: 2899, battery_premium: 1599,
      charging_port: 2499, earpiece: 1599, speaker: 1599,
      rear_camera: 2599, back_glass: 2799,
      ...COMMON,
    },
  },

  // iPhone 14 series
  'iphone-14-pro-max': {
    name: 'iPhone 14 Pro Max', year: 2022,
    prices: {
      display_original: 8299, display_premium: 3499,
      battery_original: 2899, battery_premium: 1599,
      charging_port: 2499, earpiece: 1599, speaker: 1599,
      rear_camera: 3499, back_glass: 3099,
      ...COMMON,
    },
  },
  'iphone-14-pro': {
    name: 'iPhone 14 Pro', year: 2022,
    prices: {
      display_original: 7499, display_premium: 3499,
      battery_original: 2799, battery_premium: 1599,
      charging_port: 2499, earpiece: 1599, speaker: 1599,
      rear_camera: 3399, back_glass: 2999,
      ...COMMON,
    },
  },
  'iphone-14-plus': {
    name: 'iPhone 14 Plus', year: 2022,
    prices: {
      display_original: 4699, display_premium: 2699,
      battery_original: 2799, battery_premium: 1399,
      charging_port: 2199, earpiece: 1499, speaker: 1499,
      rear_camera: 2499, back_glass: 2799,
      ...COMMON,
    },
  },
  'iphone-14': {
    name: 'iPhone 14', year: 2022,
    prices: {
      display_original: 3699, display_premium: 2499,
      battery_original: 2799, battery_premium: 1399,
      charging_port: 2099, earpiece: 1499, speaker: 1499,
      rear_camera: 2499, back_glass: 2699,
      ...COMMON,
    },
  },

  // iPhone 13 series
  'iphone-13-pro-max': {
    name: 'iPhone 13 Pro Max', year: 2021,
    prices: {
      display_original: 5699, display_premium: 2999,
      battery_original: 2599, battery_premium: 1399,
      charging_port: 1999, earpiece: 1399, speaker: 1399,
      rear_camera: 3499, back_glass: 2699,
      ...COMMON,
    },
  },
  'iphone-13-pro': {
    name: 'iPhone 13 Pro', year: 2021,
    prices: {
      display_original: 4599, display_premium: 2999,
      battery_original: 2599, battery_premium: 1399,
      charging_port: 1999, earpiece: 1399, speaker: 1399,
      rear_camera: 3399, back_glass: 2699,
      ...COMMON,
    },
  },
  'iphone-13': {
    name: 'iPhone 13', year: 2021,
    prices: {
      display_original: 3699, display_premium: 2699,
      battery_original: 2499, battery_premium: 1399,
      charging_port: 1799, earpiece: 1399, speaker: 1399,
      rear_camera: 1799, back_glass: 2599,
      ...COMMON,
    },
  },
  'iphone-13-mini': {
    name: 'iPhone 13 mini', year: 2021,
    prices: {
      display_original: 4399, display_premium: 3499,
      battery_original: 2999, battery_premium: 1999,
      charging_port: 1799, earpiece: 1399, speaker: 1399,
      rear_camera: 1899, back_glass: 2599,
      ...COMMON,
    },
  },

  // iPhone 12 series
  'iphone-12-pro-max': {
    name: 'iPhone 12 Pro Max', year: 2020,
    prices: {
      display_original: 4699, display_premium: 3399,
      battery_original: 2599, battery_premium: 1299,
      charging_port: 1899, earpiece: 1299, speaker: 1299,
      rear_camera: 2399, back_glass: 2599,
      face_id: 2999,
      ...COMMON,
    },
  },
  'iphone-12-pro': {
    name: 'iPhone 12 Pro', year: 2020,
    prices: {
      display_original: 3099, display_premium: 2499,
      battery_original: 2499, battery_premium: 1299,
      charging_port: 1799, earpiece: 1299, speaker: 1299,
      rear_camera: 2999, back_glass: 2499,
      face_id: 2999,
      ...COMMON,
    },
  },
  'iphone-12': {
    name: 'iPhone 12', year: 2020,
    prices: {
      display_original: 2999, display_premium: 2399,
      battery_original: 2499, battery_premium: 1299,
      charging_port: 1699, earpiece: 1299, speaker: 1299,
      rear_camera: 1699, back_glass: 2499,
      face_id: 2999,
      ...COMMON,
    },
  },
  'iphone-12-mini': {
    name: 'iPhone 12 mini', year: 2020,
    prices: {
      display_original: 3299,
      battery_original: 2999, battery_premium: 1999,
      charging_port: 1699, earpiece: 1299, speaker: 1299,
      rear_camera: 1899, back_glass: 2499,
      face_id: 2999,
      ...COMMON,
    },
  },

  // iPhone 11 series
  'iphone-11-pro-max': {
    name: 'iPhone 11 Pro Max', year: 2019,
    prices: {
      display_original: 3499, display_premium: 2699,
      battery_premium: 1199,
      charging_port: 1599, earpiece: 1199, speaker: 1199,
      rear_camera: 2199, back_glass: 2199,
      face_id: 2499,
      ...COMMON,
    },
  },
  'iphone-11-pro': {
    name: 'iPhone 11 Pro', year: 2019,
    prices: {
      display_original: 3299,
      battery_premium: 1199,
      charging_port: 1599, earpiece: 1199, speaker: 1199,
      rear_camera: 2299, back_glass: 2099,
      face_id: 2499,
      ...COMMON,
    },
  },
  'iphone-11': {
    name: 'iPhone 11', year: 2019,
    prices: {
      display_original: 2399, display_premium: 1699,
      battery_premium: 1199,
      charging_port: 1499, earpiece: 1199, speaker: 1199,
      rear_camera: 1299, back_glass: 1999,
      face_id: 2499,
      ...COMMON,
    },
  },

  // iPhone X series
  'iphone-xs-max': {
    name: 'iPhone XS Max', year: 2018,
    prices: {
      display_original: 3199, display_premium: 2599,
      battery_premium: 1099,
      charging_port: 1499, earpiece: 1099, speaker: 1099,
      rear_camera: 1399, back_glass: 1899,
      face_id: 1999,
      ...COMMON,
    },
  },
  'iphone-xs': {
    name: 'iPhone XS', year: 2018,
    prices: {
      display_original: 2599, display_premium: 2099,
      battery_premium: 1099,
      charging_port: 1399, earpiece: 1099, speaker: 1099,
      rear_camera: 1299, back_glass: 1799,
      face_id: 1999,
      ...COMMON,
    },
  },
  'iphone-xr': {
    name: 'iPhone XR', year: 2018,
    prices: {
      display_original: 2199, display_premium: 1599,
      battery_premium: 1099,
      charging_port: 1399, earpiece: 1099, speaker: 1099,
      rear_camera: 1199, back_glass: 1799,
      face_id: 1999,
      ...COMMON,
    },
  },
  'iphone-x': {
    name: 'iPhone X', year: 2017,
    prices: {
      display_original: 2499, display_premium: 1999,
      battery_premium: 1099,
      charging_port: 1399, earpiece: 1099, speaker: 1099,
      rear_camera: 1199, back_glass: 1799,
      face_id: 1999,
      ...COMMON,
    },
  },

  // iPhone SE & 8 series
  'iphone-se-2022': {
    name: 'iPhone SE (2022)', year: 2022,
    prices: {
      display_original: 1799,
      battery_original: 1999, battery_premium: 999,
      charging_port: 1199, earpiece: 999, speaker: 999,
      rear_camera: 1199, back_glass: 1999,
      ...COMMON,
    },
  },
  'iphone-se-2020': {
    name: 'iPhone SE (2020)', year: 2020,
    prices: {
      display_original: 1699,
      battery_premium: 999,
      charging_port: 1199, earpiece: 999, speaker: 999,
      rear_camera: 1099, back_glass: 1899,
      ...COMMON,
    },
  },
  'iphone-8-plus': {
    name: 'iPhone 8 Plus', year: 2017,
    prices: {
      display_original: 1799,
      battery_premium: 999,
      charging_port: 1199, earpiece: 999, speaker: 999,
      rear_camera: 1199, back_glass: 1799,
      ...COMMON,
    },
  },
  'iphone-8': {
    name: 'iPhone 8', year: 2017,
    prices: {
      display_original: 1699,
      battery_premium: 999,
      charging_port: 1199, earpiece: 999, speaker: 999,
      rear_camera: 1099, back_glass: 1699,
      ...COMMON,
    },
  },
};

export const getDevice = (id) => devices[id] || null;

// Vrátí pouze ty služby, které mají pro daný model definovanou cenu.
export const getServicesForDevice = (id) => {
  const dev = devices[id];
  if (!dev) return [];
  const prices = dev.prices || {};
  return services
    .filter((s) => s.id in prices)
    .map((s) => ({ ...s, price: prices[s.id] }));
};

export const formatPrice = (price) => {
  if (price == null) return 'Cena na dotaz';
  if (typeof price === 'string') return price;
  return `${price.toLocaleString('cs-CZ')} Kč`;
};

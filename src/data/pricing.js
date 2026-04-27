// Service catalog — pořadí zachované pro modal výpis
export const services = [
  { id: 'display_original',  group: 'display',  label: 'Výměna displeje',           variant: 'ORIGINÁL', icon: 'ph-monitor' },
  { id: 'display_premium',   group: 'display',  label: 'Výměna displeje',           variant: 'PREMIUM',  icon: 'ph-monitor' },
  { id: 'battery_original',  group: 'battery',  label: 'Výměna baterie',            variant: 'ORIGINÁL', icon: 'ph-battery-charging-vertical' },
  { id: 'battery_premium',   group: 'battery',  label: 'Výměna baterie',            variant: 'PREMIUM',  icon: 'ph-battery-vertical-full' },
  { id: 'battery_copy',      group: 'battery',  label: 'Výměna baterie',            variant: 'KOPIE',    icon: 'ph-battery-vertical-medium' },
  { id: 'charging_port',     group: 'parts',    label: 'Výměna nabíjecího konektoru', icon: 'ph-plug' },
  { id: 'earpiece',          group: 'audio',    label: 'Výměna sluchátka',          icon: 'ph-speaker-simple-low' },
  { id: 'speaker',           group: 'audio',    label: 'Výměna reproduktoru',       icon: 'ph-speaker-high' },
  { id: 'rear_camera',       group: 'camera',   label: 'Výměna zadní kamery',       icon: 'ph-camera' },
  { id: 'back_glass',        group: 'parts',    label: 'Výměna zadního skla',       icon: 'ph-square' },
  { id: 'face_id',           group: 'parts',    label: 'Oprava Face ID',            icon: 'ph-scan' },
  { id: 'tempered_2d',       group: 'glass',    label: 'Nalepení tvrzeného skla',   variant: '2D',       icon: 'ph-shield' },
  { id: 'tempered_premium',  group: 'glass',    label: 'Nalepení tvrzeného skla',   variant: 'PREMIUM',  icon: 'ph-shield-check' },
  { id: 'screen_protector',  group: 'glass',    label: 'Nalepení ochranné fólie',   icon: 'ph-sticker' },
  { id: 'other',             group: 'other',    label: 'Ostatní opravy',            icon: 'ph-gear-six' },
];

// Cenová matice po tierech
const tierPrices = {
  // Tier A — nejnovější Pro Max (iPhone 16 Pro Max)
  A: {
    display_original: 12990, display_premium: 5499,
    battery_original: 3499,  battery_premium: 1990, battery_copy: 1399,
    charging_port: 2999, earpiece: 1990, speaker: 1990,
    rear_camera: 3999, back_glass: 3499,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 499, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier B — Pro (iPhone 16 Pro / 15 Pro — používá REÁLNÉ ceny z PhoneTech)
  B: {
    display_original: 8399, display_premium: 3599,
    battery_original: 2999, battery_premium: 1699, battery_copy: 1199,
    charging_port: 2499, earpiece: 1699, speaker: 1699,
    rear_camera: 3399, back_glass: 2999,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier C — Plus / Standard latest (16/16 Plus/16e/15/15 Plus)
  C: {
    display_original: 6999, display_premium: 2999,
    battery_original: 2299, battery_premium: 1499, battery_copy: 1099,
    charging_port: 1990, earpiece: 1499, speaker: 1499,
    rear_camera: 2999, back_glass: 2499,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier D — Pro Max / Pro mid (14/13/12 Pro/Pro Max)
  D: {
    display_original: 5999, display_premium: 2799,
    battery_original: 1990, battery_premium: 1399, battery_copy: 999,
    charging_port: 1790, earpiece: 1399, speaker: 1399,
    rear_camera: 2799, back_glass: 2299,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier E — Standard mid (14/14 Plus/13/13 mini)
  E: {
    display_original: 4499, display_premium: 2299,
    battery_original: 1690, battery_premium: 1199, battery_copy: 899,
    charging_port: 1490, earpiece: 1199, speaker: 1199,
    rear_camera: 2299, back_glass: 1990,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier F — 11/12 standard
  F: {
    display_original: 3299, display_premium: 1790,
    battery_original: 1390, battery_premium: 990, battery_copy: 790,
    charging_port: 1290, earpiece: 990, speaker: 990,
    rear_camera: 1799, back_glass: 1499,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier G — X-řada (X/XS/XS Max/XR/12 mini)
  G: {
    display_original: 2799, display_premium: 1499,
    battery_original: 1190, battery_premium: 890, battery_copy: 690,
    charging_port: 1190, earpiece: 890, speaker: 890,
    rear_camera: 1599, back_glass: 1290,
    face_id: 'Po diagnostice',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
  // Tier H — SE/8 (nejstarší)
  H: {
    display_original: 1990, display_premium: 1190,
    battery_original: 890, battery_premium: 690, battery_copy: 490,
    charging_port: 890, earpiece: 690, speaker: 690,
    rear_camera: 1290, back_glass: 990,
    face_id: '-',
    tempered_2d: 299, tempered_premium: 399, screen_protector: 499,
    other: 'Dle dohody',
  },
};

// Mapping device → tier + meta
export const devices = {
  // Tier A — top
  'iphone-16-pro-max': { name: 'iPhone 16 Pro Max', year: 2024, tier: 'A' },
  // Tier B — Pro
  'iphone-16-pro':     { name: 'iPhone 16 Pro',     year: 2024, tier: 'B' },
  'iphone-15-pro-max': { name: 'iPhone 15 Pro Max', year: 2023, tier: 'A' },
  'iphone-15-pro':     { name: 'iPhone 15 Pro',     year: 2023, tier: 'B' },
  // Tier C — Plus / Standard latest
  'iphone-16-plus':    { name: 'iPhone 16 Plus',    year: 2024, tier: 'C' },
  'iphone-16':         { name: 'iPhone 16',         year: 2024, tier: 'C' },
  'iphone-16e':        { name: 'iPhone 16e',        year: 2025, tier: 'C' },
  'iphone-15-plus':    { name: 'iPhone 15 Plus',    year: 2023, tier: 'C' },
  'iphone-15':         { name: 'iPhone 15',         year: 2023, tier: 'C' },
  // Tier D — Pro mid (14/13/12 Pro)
  'iphone-14-pro-max': { name: 'iPhone 14 Pro Max', year: 2022, tier: 'D' },
  'iphone-14-pro':     { name: 'iPhone 14 Pro',     year: 2022, tier: 'D' },
  'iphone-13-pro-max': { name: 'iPhone 13 Pro Max', year: 2021, tier: 'D' },
  'iphone-13-pro':     { name: 'iPhone 13 Pro',     year: 2021, tier: 'D' },
  'iphone-12-pro-max': { name: 'iPhone 12 Pro Max', year: 2020, tier: 'D' },
  'iphone-12-pro':     { name: 'iPhone 12 Pro',     year: 2020, tier: 'D' },
  // Tier E — Standard mid
  'iphone-14-plus':    { name: 'iPhone 14 Plus',    year: 2022, tier: 'E' },
  'iphone-14':         { name: 'iPhone 14',         year: 2022, tier: 'E' },
  'iphone-13':         { name: 'iPhone 13',         year: 2021, tier: 'E' },
  'iphone-13-mini':    { name: 'iPhone 13 mini',    year: 2021, tier: 'E' },
  // Tier F — 11/12 standard
  'iphone-12':         { name: 'iPhone 12',         year: 2020, tier: 'F' },
  'iphone-11-pro-max': { name: 'iPhone 11 Pro Max', year: 2019, tier: 'F' },
  'iphone-11-pro':     { name: 'iPhone 11 Pro',     year: 2019, tier: 'F' },
  'iphone-11':         { name: 'iPhone 11',         year: 2019, tier: 'F' },
  // Tier G — X-řada / mini
  'iphone-12-mini':    { name: 'iPhone 12 mini',    year: 2020, tier: 'G' },
  'iphone-xs-max':     { name: 'iPhone XS Max',     year: 2018, tier: 'G' },
  'iphone-xs':         { name: 'iPhone XS',         year: 2018, tier: 'G' },
  'iphone-xr':         { name: 'iPhone XR',         year: 2018, tier: 'G' },
  'iphone-x':          { name: 'iPhone X',          year: 2017, tier: 'G' },
  // Tier H — SE/8
  'iphone-se-2022':    { name: 'iPhone SE (2022)',  year: 2022, tier: 'H' },
  'iphone-se-2020':    { name: 'iPhone SE (2020)',  year: 2020, tier: 'H' },
  'iphone-8-plus':     { name: 'iPhone 8 Plus',     year: 2017, tier: 'H' },
  'iphone-8':          { name: 'iPhone 8',          year: 2017, tier: 'H' },
};

export const getDevice = (id) => devices[id] || null;

export const getServicesForDevice = (id) => {
  const dev = devices[id];
  if (!dev) return [];
  const prices = tierPrices[dev.tier] || {};
  return services.map((s) => ({
    ...s,
    price: prices[s.id] ?? null,
  }));
};

export const formatPrice = (price) => {
  if (price == null) return 'Cena na dotaz';
  if (typeof price === 'string') return price;
  return `${price.toLocaleString('cs-CZ')} Kč`;
};

// Seznam zařízení — doplňte ceny a časy dle aktuálního ceníku servisu.
// priceFrom = cena výměny displeje v Kč, repairTime = orientační doba opravy.

export const devices = [
  // === Apple iPhone ===
  { id: 'iphone-16-pro-max', brand: 'Apple', name: 'iPhone 16 Pro Max', priceFrom: 12990, repairTime: '60–90 min' },
  { id: 'iphone-16-pro',     brand: 'Apple', name: 'iPhone 16 Pro',     priceFrom: 11490, repairTime: '60–90 min' },
  { id: 'iphone-16-plus',    brand: 'Apple', name: 'iPhone 16 Plus',    priceFrom: 9990,  repairTime: '60 min' },
  { id: 'iphone-16',         brand: 'Apple', name: 'iPhone 16',         priceFrom: 8990,  repairTime: '45–60 min' },
  { id: 'iphone-15-pro-max', brand: 'Apple', name: 'iPhone 15 Pro Max', priceFrom: 11990, repairTime: '60–90 min' },
  { id: 'iphone-15-pro',     brand: 'Apple', name: 'iPhone 15 Pro',     priceFrom: 10490, repairTime: '60 min' },
  { id: 'iphone-15-plus',    brand: 'Apple', name: 'iPhone 15 Plus',    priceFrom: 8990,  repairTime: '60 min' },
  { id: 'iphone-15',         brand: 'Apple', name: 'iPhone 15',         priceFrom: 7490,  repairTime: '45 min' },
  { id: 'iphone-14-pro-max', brand: 'Apple', name: 'iPhone 14 Pro Max', priceFrom: 9990,  repairTime: '60 min' },
  { id: 'iphone-14-pro',     brand: 'Apple', name: 'iPhone 14 Pro',     priceFrom: 8990,  repairTime: '60 min' },
  { id: 'iphone-14-plus',    brand: 'Apple', name: 'iPhone 14 Plus',    priceFrom: 7490,  repairTime: '45 min' },
  { id: 'iphone-14',         brand: 'Apple', name: 'iPhone 14',         priceFrom: 5990,  repairTime: '45 min' },
  { id: 'iphone-13-pro-max', brand: 'Apple', name: 'iPhone 13 Pro Max', priceFrom: 8490,  repairTime: '60 min' },
  { id: 'iphone-13-pro',     brand: 'Apple', name: 'iPhone 13 Pro',     priceFrom: 7490,  repairTime: '60 min' },
  { id: 'iphone-13',         brand: 'Apple', name: 'iPhone 13',         priceFrom: 4990,  repairTime: '45 min' },
  { id: 'iphone-13-mini',    brand: 'Apple', name: 'iPhone 13 mini',    priceFrom: 4990,  repairTime: '45 min' },
  { id: 'iphone-12-pro-max', brand: 'Apple', name: 'iPhone 12 Pro Max', priceFrom: 6990,  repairTime: '45 min' },
  { id: 'iphone-12-pro',     brand: 'Apple', name: 'iPhone 12 Pro',     priceFrom: 4990,  repairTime: '45 min' },
  { id: 'iphone-12',         brand: 'Apple', name: 'iPhone 12',         priceFrom: 3990,  repairTime: '30–45 min' },
  { id: 'iphone-12-mini',    brand: 'Apple', name: 'iPhone 12 mini',    priceFrom: 3990,  repairTime: '30–45 min' },
  { id: 'iphone-11-pro-max', brand: 'Apple', name: 'iPhone 11 Pro Max', priceFrom: 5990,  repairTime: '45 min' },
  { id: 'iphone-11-pro',     brand: 'Apple', name: 'iPhone 11 Pro',     priceFrom: 4990,  repairTime: '45 min' },
  { id: 'iphone-11',         brand: 'Apple', name: 'iPhone 11',         priceFrom: 2990,  repairTime: '30 min' },
  { id: 'iphone-se-2022',    brand: 'Apple', name: 'iPhone SE (2022)',  priceFrom: 2490,  repairTime: '30 min' },
  { id: 'iphone-xs-max',     brand: 'Apple', name: 'iPhone XS Max',     priceFrom: 4990,  repairTime: '45 min' },
  { id: 'iphone-xs',         brand: 'Apple', name: 'iPhone XS',         priceFrom: 3990,  repairTime: '45 min' },
  { id: 'iphone-xr',         brand: 'Apple', name: 'iPhone XR',         priceFrom: 2490,  repairTime: '30 min' },
  { id: 'iphone-x',          brand: 'Apple', name: 'iPhone X',          priceFrom: 3490,  repairTime: '45 min' },

  // === Samsung Galaxy S ===
  { id: 'samsung-s25-ultra', brand: 'Samsung', name: 'Galaxy S25 Ultra', priceFrom: 11990, repairTime: '60–90 min' },
  { id: 'samsung-s25-plus',  brand: 'Samsung', name: 'Galaxy S25+',      priceFrom: 9990,  repairTime: '60 min' },
  { id: 'samsung-s25',       brand: 'Samsung', name: 'Galaxy S25',       priceFrom: 8490,  repairTime: '60 min' },
  { id: 'samsung-s24-ultra', brand: 'Samsung', name: 'Galaxy S24 Ultra', priceFrom: 10990, repairTime: '60–90 min' },
  { id: 'samsung-s24-plus',  brand: 'Samsung', name: 'Galaxy S24+',      priceFrom: 8990,  repairTime: '60 min' },
  { id: 'samsung-s24',       brand: 'Samsung', name: 'Galaxy S24',       priceFrom: 7490,  repairTime: '45–60 min' },
  { id: 'samsung-s23-ultra', brand: 'Samsung', name: 'Galaxy S23 Ultra', priceFrom: 9990,  repairTime: '60–90 min' },
  { id: 'samsung-s23',       brand: 'Samsung', name: 'Galaxy S23',       priceFrom: 6990,  repairTime: '45 min' },
  { id: 'samsung-s22-ultra', brand: 'Samsung', name: 'Galaxy S22 Ultra', priceFrom: 8490,  repairTime: '60 min' },
  { id: 'samsung-s22',       brand: 'Samsung', name: 'Galaxy S22',       priceFrom: 5990,  repairTime: '45 min' },
  { id: 'samsung-s21',       brand: 'Samsung', name: 'Galaxy S21',       priceFrom: 4990,  repairTime: '45 min' },
  { id: 'samsung-s20',       brand: 'Samsung', name: 'Galaxy S20',       priceFrom: 4490,  repairTime: '45 min' },

  // === Samsung Galaxy A ===
  { id: 'samsung-a55',       brand: 'Samsung', name: 'Galaxy A55',       priceFrom: 3990,  repairTime: '45 min' },
  { id: 'samsung-a54',       brand: 'Samsung', name: 'Galaxy A54',       priceFrom: 3490,  repairTime: '45 min' },
  { id: 'samsung-a53',       brand: 'Samsung', name: 'Galaxy A53',       priceFrom: 3290,  repairTime: '45 min' },
  { id: 'samsung-a52',       brand: 'Samsung', name: 'Galaxy A52',       priceFrom: 2990,  repairTime: '45 min' },

  // === Samsung Fold / Flip ===
  { id: 'samsung-zfold5',    brand: 'Samsung', name: 'Galaxy Z Fold 5',  priceFrom: 14990, repairTime: '90 min' },
  { id: 'samsung-zflip5',    brand: 'Samsung', name: 'Galaxy Z Flip 5',  priceFrom: 9990,  repairTime: '75 min' },

  // === Xiaomi ===
  { id: 'xiaomi-14-ultra',   brand: 'Xiaomi',  name: '14 Ultra',         priceFrom: 7990,  repairTime: '60 min' },
  { id: 'xiaomi-14',         brand: 'Xiaomi',  name: '14',               priceFrom: 5990,  repairTime: '45 min' },
  { id: 'xiaomi-13',         brand: 'Xiaomi',  name: '13',               priceFrom: 4990,  repairTime: '45 min' },
  { id: 'xiaomi-redmi-13',   brand: 'Xiaomi',  name: 'Redmi Note 13',    priceFrom: 2490,  repairTime: '45 min' },
  { id: 'xiaomi-redmi-12',   brand: 'Xiaomi',  name: 'Redmi Note 12',    priceFrom: 2290,  repairTime: '45 min' },

  // === Huawei ===
  { id: 'huawei-p60-pro',    brand: 'Huawei',  name: 'P60 Pro',          priceFrom: 6490,  repairTime: '60 min' },
  { id: 'huawei-p50',        brand: 'Huawei',  name: 'P50',              priceFrom: 4990,  repairTime: '45 min' },
  { id: 'huawei-mate-50',    brand: 'Huawei',  name: 'Mate 50 Pro',      priceFrom: 5990,  repairTime: '60 min' },

  // === Google Pixel ===
  { id: 'pixel-9-pro',       brand: 'Google',  name: 'Pixel 9 Pro',      priceFrom: 6990,  repairTime: '60 min' },
  { id: 'pixel-8-pro',       brand: 'Google',  name: 'Pixel 8 Pro',      priceFrom: 6490,  repairTime: '60 min' },
  { id: 'pixel-8',           brand: 'Google',  name: 'Pixel 8',          priceFrom: 4990,  repairTime: '45 min' },
  { id: 'pixel-7-pro',       brand: 'Google',  name: 'Pixel 7 Pro',      priceFrom: 5490,  repairTime: '60 min' },
  { id: 'pixel-7',           brand: 'Google',  name: 'Pixel 7',          priceFrom: 3990,  repairTime: '45 min' },

  // === Sony ===
  { id: 'sony-xperia-1-v',   brand: 'Sony',    name: 'Xperia 1 V',       priceFrom: 5990,  repairTime: '60 min' },
  { id: 'sony-xperia-5-v',   brand: 'Sony',    name: 'Xperia 5 V',       priceFrom: 4990,  repairTime: '45 min' },

  // === Honor ===
  { id: 'honor-magic-6-pro', brand: 'Honor',   name: 'Magic 6 Pro',      priceFrom: 5990,  repairTime: '60 min' },
  { id: 'honor-90',          brand: 'Honor',   name: '90',               priceFrom: 3490,  repairTime: '45 min' },

  // === realme ===
  { id: 'realme-gt-5-pro',   brand: 'realme',  name: 'GT 5 Pro',         priceFrom: 4490,  repairTime: '45 min' },
  { id: 'realme-11-pro',     brand: 'realme',  name: '11 Pro',           priceFrom: 2990,  repairTime: '45 min' },

  // === vivo ===
  { id: 'vivo-x100-pro',     brand: 'vivo',    name: 'X100 Pro',         priceFrom: 5990,  repairTime: '60 min' },

  // === Motorola ===
  { id: 'motorola-edge-50',  brand: 'Motorola', name: 'Edge 50',         priceFrom: 3490,  repairTime: '45 min' },
];

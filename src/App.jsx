import React, { useState } from 'react';
import DetailLanding from './DetailLanding.jsx';

const locationsData = [
  { id: 0, name: "Жуков проезд 15Ас2", lat: 55.72344, lng: 37.63880, phone: "+7 (985) 018-78-78" },
  { id: 1, name: "Жуков проезд 19", lat: 55.72282, lng: 37.64152, phone: "+7 (985) 018-78-78" },
  { id: 2, name: "Садовнический проезд", lat: 55.74375, lng: 37.63345, phone: "+7 (985) 018-78-78" },
  { id: 3, name: "Щелковский проезд 7А", lat: 55.80595, lng: 37.77649, phone: "+7 (925) 654-00-04" },
  { id: 4, name: "ул. Рассветная аллея 5А", lat: 55.74157, lng: 37.80564, phone: "+7 (916) 758-47-46" },
  { id: 5, name: "Клемента Готвальда 4б", lat: 55.42099, lng: 37.53168, phone: "+7 (952) 349-60-52" },
  { id: 6, name: "Пятницкое шоссе", lat: 55.85000, lng: 37.35000, phone: "+7 (985) 018-78-78" },
  { id: 7, name: "Тестовская 10", lat: 55.75180, lng: 37.53265, phone: "+7 (929) 540-33-35" }
];

const pricesData = [
  // 0 и 1 — Жуков проезд (Павелецкая) — ТОЧНО ПО ПРАЙС-ЛИСТУ 2026
  {
    express: [450, 500, 600, 650, 700],
    standard: [850, 1000, 1050, 1150, 1250],
    basic: [1600, 1750, 1950, 2100, 2300],
    lux: [2900, 3300, 3700, 4200, 4700],
    premium: [5750, 6800, 7750, 8850, 9450],
    winter: [8000, 8800, 10650, 12000, 13550],

    // Покрытие Кузова
    lightCeramic: [2000, 2200, 2500, 2600, 3000],
    nanoWax: [500, 550, 600, 650, 700],
    quartz: [1200, 1300, 1400, 1500, 1600],
    liquidPolymer: [1000, 1200, 1250, 1300, 1400],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [300, 300, 400, 400, 500],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [3000, 3000, 3500, 4000, 4500],
    antiRainAll: [4500, 4500, 5000, 6000, 7000],

    // КОЛЕСА
    tireBlack: [300, 300, 300, 300, 300],
    wheelCleaning: [2000, 2000, 2000, 2000, 2000],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [300, 300, 350, 350, 450],
    tornadoSalon: [1000, 1200, 1500, 1500, 2000],
    wetCleaning: [300, 300, 350, 350, 450],
    trunkMatWash: [200, 200, 200, 200, 200],
    trunkVacuum: [200, 200, 200, 200, 200],
    glassCleaning: [400, 450, 500, 550, 600],
    leatherConditioner: [1000, 1200, 1300, 1400, 1500],
    plasticPolish: [800, 1000, 1100, 1200, 1300],
    dryFog: [3500, 3500, 3500, 3500, 4000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2700, 3300, 3700, 4000, 4500],
    bitumRemoval: ["От 400", "От 400", "От 400", "От 400", "От 400"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [1200, 1500, 1800, 2200, 2500],   // Мойка днища

    // ДВИГАТЕЛЬ
    engineWash: [1500, 1500, 2000, 2200, 2500],
    engineConserv: [3000, 3500, 4500, 4500, 5000],

    // ХИМЧИСТКА
    chemSeat: ["От 2500", "От 2500", "От 2500", "От 2500", "От 2500"],
    chemDoor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 3000", "От 3500", "От 4000", "От 4500", "От 5000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 15000", "От 20000", "От 25000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },
    // 1 — Жуков проезд 19 (Павелецкая) — точно по прайсу 2026
  {
    express: [450, 500, 600, 650, 700],
    standard: [850, 1000, 1050, 1150, 1250],
    basic: [1600, 1750, 1950, 2100, 2300],
    lux: [2900, 3300, 3700, 4200, 4700],
    premium: [5750, 6800, 7750, 8850, 9450],
    winter: [8000, 8800, 10650, 12000, 13550],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [2000, 2200, 2500, 2600, 3000],
    nanoWax: [500, 550, 600, 650, 700],
    quartz: [1200, 1300, 1400, 1500, 1600],
    liquidPolymer: [1000, 1200, 1250, 1300, 1400],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [300, 300, 400, 400, 500],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [3000, 3000, 3500, 4000, 4500],
    antiRainAll: [4500, 4500, 5000, 6000, 7000],

    // КОЛЕСА
    tireBlack: [300, 300, 300, 300, 300],
    wheelCleaning: [2000, 2000, 2000, 2000, 2000],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [300, 300, 350, 350, 450],
    tornadoSalon: [1000, 1200, 1500, 1500, 2000],
    wetCleaning: [300, 300, 350, 350, 450],
    trunkMatWash: [200, 200, 200, 200, 200],
    trunkVacuum: [200, 200, 200, 200, 200],
    glassCleaning: [400, 450, 500, 550, 600],
    leatherConditioner: [1000, 1200, 1300, 1400, 1500],
    plasticPolish: [800, 1000, 1100, 1200, 1300],
    dryFog: [3500, 3500, 3500, 3500, 4000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2700, 3300, 3700, 4000, 4500],
    bitumRemoval: ["От 400", "От 400", "От 400", "От 400", "От 400"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [1200, 1500, 1800, 2200, 2500],

    // ДВИГАТЕЛЬ
    engineWash: [1500, 1500, 2000, 2200, 2500],
    engineConserv: [3000, 3500, 4500, 4500, 5000],

    // ХИМЧИСТКА
    chemSeat: ["От 2500", "От 2500", "От 2500", "От 2500", "От 2500"],
    chemDoor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 3000", "От 3500", "От 4000", "От 4500", "От 5000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 15000", "От 20000", "От 25000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },
     // 2 — Садовнический проезд (Новокузнецкая) — точно по новому прайсу 2026
  {
    express: [450, 500, 600, 650, 700],
    standard: [850, 1000, 1050, 1150, 1250],
    basic: [1600, 1750, 1950, 2100, 2300],
    lux: [2900, 3300, 3700, 4200, 4700],
    premium: [5750, 6800, 7750, 8850, 9450],
    winter: [8000, 8800, 10650, 12000, 13550],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [2000, 2200, 2500, 2600, 3000],
    nanoWax: [500, 550, 600, 650, 700],
    quartz: [1200, 1300, 1400, 1500, 1600],
    liquidPolymer: [1000, 1200, 1250, 1300, 1400],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [300, 300, 400, 400, 500],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [3000, 3000, 3500, 4000, 4500],
    antiRainAll: [4500, 4500, 5000, 6000, 7000],

    // КОЛЕСА
    tireBlack: [300, 300, 300, 300, 300],
    wheelCleaning: [2000, 2000, 2000, 2000, 2000],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [300, 300, 350, 350, 450],
    tornadoSalon: [1000, 1200, 1500, 1500, 2000],
    wetCleaning: [300, 300, 350, 350, 450],
    trunkMatWash: [200, 200, 200, 200, 200],
    trunkVacuum: [200, 200, 200, 200, 200],
    glassCleaning: [400, 450, 500, 550, 600],
    leatherConditioner: [1000, 1200, 1300, 1400, 1500],
    plasticPolish: [800, 1000, 1100, 1200, 1300],
    dryFog: [3500, 3500, 3500, 3500, 4000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2700, 3300, 3700, 4000, 4500],
    bitumRemoval: ["От 400", "От 400", "От 400", "От 400", "От 400"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [1200, 1500, 1800, 2200, 2500],

    // ДВИГАТЕЛЬ
    engineWash: [1500, 1500, 2000, 2200, 2500],
    engineConserv: [3000, 3500, 4500, 4500, 5000],

    // ХИМЧИСТКА
    chemSeat: ["От 2500", "От 2500", "От 2500", "От 2500", "От 2500"],
    chemDoor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 3000", "От 3500", "От 4000", "От 4500", "От 5000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 15000", "От 20000", "От 25000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },

     // 3 — Щелковский проезд 7А (Щелковская) — точно по прайсу 2026
  {
    express: [300, 300, 400, 450, 450],
    standard: [850, 950, 1050, 1150, 1300],
    basic: [1400, 1600, 1750, 1850, 2000],
    lux: [2500, 2700, 3150, 3700, 4300],
    premium: [4800, 5500, 6100, 6900, 7700],
    winter: [5900, 6800, 7900, 9000, 10200],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [1000, 1100, 1200, 1300, 1400],
    nanoWax: [350, 400, 400, 500, 550],
    quartz: [700, 800, 900, 1000, 1100],
    liquidPolymer: [600, 700, 800, 900, 1000],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [200, 200, 300, 300, 400],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [2500, 2500, 2500, 3000, 3500],
    antiRainAll: [3500, 3500, 3500, 4000, 5000],

    // КОЛЕСА
    tireBlack: [250, 250, 250, 250, 250],
    wheelCleaning: [1200, 1200, 1200, 1200, 1200],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [250, 250, 250, 250, 300],
    tornadoSalon: [400, 600, 800, 1200, 1400],
    wetCleaning: [250, 250, 300, 300, 350],
    trunkMatWash: [150, 150, 150, 150, 150],
    trunkVacuum: [150, 150, 150, 150, 250],
    glassCleaning: [300, 300, 350, 400, 450],
    leatherConditioner: [600, 600, 800, 800, 1000],
    plasticPolish: [500, 600, 600, 600, 800],
    dryFog: [3000, 3000, 3000, 3000, 3000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2200, 2500, 2700, 3000, 3300],
    bitumRemoval: ["От 300", "От 300", "От 300", "От 300", "От 300"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [800, 1000, 1200, 1400, 1600],

    // ДВИГАТЕЛЬ
    engineWash: [1200, 1300, 1400, 1500, 1500],
    engineConserv: [2000, 2500, 3500, 3500, 4000],

    // ХИМЧИСТКА
    chemSeat: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    chemDoor: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 2000", "От 2500", "От 3000", "От 3500", "От 4000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 10000", "От 15000", "От 20000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },

  // 4 — ул. Рассветная аллея 5А (Новогиреево) — точно по прайсу 2026
  {
    express: [300, 300, 400, 450, 450],
    standard: [850, 950, 1050, 1150, 1300],
    basic: [1400, 1600, 1750, 1850, 2000],
    lux: [2500, 2700, 3150, 3700, 4300],
    premium: [4800, 5500, 6100, 6900, 7700],
    winter: [5900, 6800, 7900, 9000, 10200],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [1000, 1100, 1200, 1300, 1400],
    nanoWax: [350, 400, 400, 500, 550],
    quartz: [700, 800, 900, 1000, 1100],
    liquidPolymer: [600, 700, 800, 900, 1000],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [200, 200, 300, 300, 400],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [2500, 2500, 2500, 3000, 3500],
    antiRainAll: [3500, 3500, 3500, 4000, 5000],

    // КОЛЕСА
    tireBlack: [250, 250, 250, 250, 250],
    wheelCleaning: [1200, 1200, 1200, 1200, 1200],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [250, 250, 250, 250, 300],
    tornadoSalon: [400, 600, 800, 1200, 1400],
    wetCleaning: [250, 250, 300, 300, 350],
    trunkMatWash: [150, 150, 150, 150, 150],
    trunkVacuum: [150, 150, 150, 150, 250],
    glassCleaning: [300, 300, 350, 400, 450],
    leatherConditioner: [600, 600, 800, 800, 1000],
    plasticPolish: [500, 600, 600, 600, 800],
    dryFog: [3000, 3000, 3000, 3000, 3000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2200, 2500, 2700, 3000, 3300],
    bitumRemoval: ["От 300", "От 300", "От 300", "От 300", "От 300"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [800, 1000, 1200, 1400, 1600],

    // ДВИГАТЕЛЬ
    engineWash: [1200, 1300, 1400, 1500, 1500],
    engineConserv: [2000, 2500, 3500, 3500, 4000],

    // ХИМЧИСТКА
    chemSeat: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    chemDoor: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 2000", "От 2500", "От 3000", "От 3500", "От 4000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 10000", "От 15000", "От 20000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },
     // 5 — Клемента Готвальда 4б (Подольск) — точно по прайсу 2026
  {
    express: [400, 400, 450, 450, 550],
    standard: [800, 900, 1100, 1300, 1400],
    basic: [1400, 1600, 1800, 2000, 2200],
    lux: [2400, 2600, 2900, 3100, 3300],        // Комплекс "НАНО"

    // ПОКРЫТИЕ КУЗОВА
    nanoWax: [400, 400, 500, 500, 600],
    quartz: [700, 700, 900, 900, 1100],
    hardWax: [2500, 2500, 3000, 3500, 3500],
    siliconeSeals: [200, 200, 300, 300, 300],
    turboDry: [400, 400, 400, 400, 400],
    antiRainWindshield: [1500, 1500, 1500, 1500, 1500],
    antiRainFront: [2500, 2500, 2500, 3000, 3000],
    antiRainAll: [4000, 4000, 4000, 5000, 5000],

    // КОЛЕСА
    tireBlack: [200, 200, 200, 200, 200],
    wheelCleaning: [2000, 2000, 2500, 2500, 2500],

    // САЛОН
    matWash: [200, 200, 200, 200, 200],
    vacuumSalon: [300, 300, 300, 400, 400],
    wetCleaning: [300, 300, 300, 400, 400],
    trunkMatWash: [150, 150, 150, 150, 150],
    trunkVacuum: [150, 150, 150, 150, 150],
    glassCleaning: [300, 300, 300, 400, 400],
    leatherConditioner: [700, 700, 800, 900, 1000],
    leatherCream: [2000, 2000, 2000, 2300, 2500],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2500, 2500, 2500, 3000, 3000],
    bitumRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [2500, 2500, 3000, 3000, 3000],

    // ДНИЩЕ КУЗОВА
    underbodyWashWater: [700, 700, 700, 1000, 1000],      // Мойка днища водой
    underbodyWashFoam: [1500, 1500, 1500, 1800, 1800],    // Мойка днища вода+пена

    // ДВИГАТЕЛЬ
    engineWash: [2500, 2500, 2500, 2500, 2500],

    // ХИМЧИСТКА
    chemSeat: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemDoor: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    chemTrunk: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    chemFullSalon: ["От 10000", "От 15000", "От 15000", "От 15000", "От 15000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    polishHood: ["От 2000", "От 2000", "От 2000", "От 2500", "От 2500"],
    polishHeadlight: [1000, 1000, 1000, 1000, 1000],
    ceramicFull: ["От 20000", "От 20000", "От 30000", "От 30000", "От 40000"],
    liquidGlass: ["От 15000", "От 15000", "От 20000", "От 20000", "От 30000"]
  },

  // 6 — Пятницкое шоссе (Митино) — точно по прайсу 2026
  {
    express: [300, 300, 400, 450, 450],
    standard: [800, 900, 1000, 1050, 1250],
    basic: [1400, 1600, 1650, 1800, 2000],
    lux: [2500, 2700, 3150, 3700, 4300],
    premium: [4800, 5500, 6100, 6900, 7700],
    winter: [5900, 6800, 7900, 9000, 10200],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [1000, 1100, 1200, 1300, 1400],
    nanoWax: [350, 400, 400, 500, 550],
    quartz: [700, 800, 900, 1000, 1100],
    liquidPolymer: [600, 700, 800, 900, 1000],
    hardWax: [3000, 3500, 4000, 4500, 5000],
    siliconeSeals: [200, 200, 300, 300, 400],
    turboDry: [300, 300, 400, 400, 500],
    antiRainWindshield: [1000, 1000, 1000, 1000, 1000],
    antiRainFront: [2500, 2500, 2500, 3000, 3500],
    antiRainAll: [3500, 3500, 3500, 4000, 5000],

    // КОЛЕСА
    tireBlack: [250, 250, 250, 250, 250],
    wheelCleaning: [1200, 1200, 1200, 1200, 1200],

    // САЛОН
    matWash: [100, 100, 100, 100, 150],
    vacuumSalon: [250, 250, 250, 250, 300],
    tornadoSalon: [400, 600, 800, 1200, 1400],
    wetCleaning: [250, 250, 300, 300, 350],
    trunkMatWash: [150, 150, 150, 150, 150],
    trunkVacuum: [150, 150, 150, 150, 250],
    glassCleaning: [300, 300, 350, 400, 450],
    leatherConditioner: [600, 600, 800, 1000, 1000],   // исправлено по прайсу
    plasticPolish: [500, 600, 600, 800, 800],
    dryFog: [3000, 3000, 3000, 3000, 3000],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ОЧИСТКА КУЗОВА
    degreaseBody: [2200, 2500, 2700, 3000, 3300],
    bitumRemoval: ["От 300", "От 300", "От 300", "От 300", "От 300"],
    poplarRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],
    insectRemoval: [500, 500, 500, 500, 500],
    deepLkpClean: [4000, 4500, 5000, 6000, 7000],
    underbodyWash: [800, 1000, 1200, 1400, 1600],

    // ДВИГАТЕЛЬ
    engineWash: [1200, 1300, 1400, 1500, 1500],
    engineConserv: [2000, 2500, 3500, 3500, 4000],

    // ХИМЧИСТКА
    chemSeat: ["От 2000", "От 2000", "От 2000", "От 2000", "От 2000"],
    chemDoor: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 2000", "От 2500", "От 3000", "От 3500", "От 4000"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 10000", "От 15000", "От 20000", "От 25000", "От 30000"],
    chemSteering: ["От 1000", "От 1000", "От 1000", "От 1000", "От 1000"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2000, 2000, 2000, 2500, 2500],
    polishHeadlight: [1500, 1500, 1500, 1500, 1500],
    polishHeadlightLac: [2000, 2000, 2000, 2000, 2000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },

  // 7 — Тестовская 10 (Сити) — точно по прайсу 2026
  {
    express: [600, 700, 800, 900, 1000],
    standard: [1200, 1400, 1500, 1600, 1700],
    basic: [2500, 2900, 3100, 3500, 3800],
    lux: [3600, 4300, 4500, 5500, 6500],
    premium: [7300, 8500, 9500, 11000, 12000],
    winter: [9000, 10500, 12500, 15000, 16500],

    // ПОКРЫТИЕ КУЗОВА
    lightCeramic: [2000, 2500, 3000, 3500, 4000],
    nanoWax: [700, 800, 900, 900, 900],
    quartz: [1400, 1500, 1600, 1700, 1900],
    liquidPolymer: [1500, 1500, 1500, 1600, 1800],
    hardWax: [3500, 4500, 5000, 5500, 6000],
    siliconeSeals: [350, 350, 500, 500, 600],
    turboDry: [500, 500, 500, 500, 500],
    antiRainWindshield: [2000, 2000, 2500, 2500, 2500],
    antiRainFront: [3000, 3000, 4000, 4000, 4000],
    antiRainAll: [4500, 4500, 5000, 6000, 7000],

    // КОЛЕСА
    tireBlack: [300, 300, 300, 300, 300],
    wheelCleaning: [2500, 3000, 3500, 4000, 4000],
    wheelArchCleaning: ["От 4500", "От 4500", "От 4500", "От 4500", "От 4500"],

    // САЛОН — точно как на твоём скриншоте
    matWash: [200, 200, 200, 200, 200],
    vacuumSalon: [300, 400, 400, 500, 600],
    tornadoSalon: [1500, 1500, 1500, 1500, 2000],
    wetCleaning: [400, 400, 400, 400, 450],
    trunkMatWash: [300, 300, 300, 300, 300],
    trunkVacuum: [300, 300, 300, 400, 400],
    glassCleaning: [500, 500, 500, 600, 700],
    leatherConditioner: [1200, 1500, 1700, 2000, 2200],
    plasticPolish: [1000, 1100, 1200, 1500, 1500],
    dryFog: [3500, 3500, 3500, 3500, 3500],
    spotRemoval: ["От 500", "От 500", "От 500", "От 500", "От 500"],

    // ДВИГАТЕЛЬ
    engineWash: [2000, 2200, 2500, 2500, 2500],
    engineConserv: [3000, 3500, 4500, 4500, 4500],

    // ХИМЧИСТКА
    chemSeat: ["От 2500", "От 2500", "От 2500", "От 2500", "От 2500"],
    chemDoor: ["От 1200", "От 1200", "От 1200", "От 1200", "От 1200"],
    chemFloor: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],
    chemCeiling: ["От 3000", "От 4000", "От 4500", "От 5000", "От 5500"],
    chemTrunk: ["От 2000", "От 2500", "От 2500", "От 3000", "От 3000"],
    chemFullSalon: ["От 17000", "От 20000", "От 25000", "От 25000", "От 35000"],
    chemSteering: ["От 1500", "От 1500", "От 1500", "От 1500", "От 1500"],

    // ПОЛИРОВКА
    polishAbrasive: [2000, 2000, 2000, 2000, 2000],
    polishHood: [2500, 2500, 2500, 3000, 3000],
    polishHeadlight: [2500, 2500, 2500, 2500, 2500],
    polishHeadlightLac: [3000, 3000, 3000, 3000, 3000],
    ceramicFull: ["От 40000", "От 50000", "От 60000", "От 70000", "От 75000"],
    liquidGlass: ["От 15000", "От 20000", "От 25500", "От 35000", "От 40000"]
  },
];

const allServices = [
  // Основные
  { key: "express", name: "Мойка \"ЭКСПРЕСС\"", group: "main" },
  { key: "standard", name: "Мойка \"СТАНДАРТ\"", group: "main" },
  { key: "basic", name: "Комплекс \"БАЗОВЫЙ\"", group: "complex" },
 { key: "lux", name: "Комплекс \"НАНО\"", group: "complex" },
  { key: "premium", name: "Комплекс \"ПРЕМИУМ-ДЕТЕЙЛИНГ\"", group: "complex" },
  { key: "winter", name: "Комплекс \"ЗИМНИЙ ПАКЕТ\"", group: "complex" },

  // Покрытие Кузова — 8 услуг
  { key: "lightCeramic", name: "Легкая керамика", group: "Дополнительные услуги Покрытиие КУЗОВА" },
  { key: "nanoWax", name: "Обработка кузова Нано-воском KOCH NANOMAGIC", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "quartz", name: "Кварцевое Покрытие Кузова", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "liquidPolymer", name: "Нанесение \"Жидкий Полимер\"", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "hardWax", name: "Обработка кузова твердым воском", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "turboDry", name: "Турбо-сушка автомобиля (продув горячим воздухом)", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "siliconeSeals", name: "Обработка силиконом \"Уплотнители\"", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "antiRainAll", name: "Антидождь \"Все Стёкла\"", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "antiRainFront", name: "Антидождь \"Передняя Полусфера\"", group: "Дополнительные услуги Покрытие Кузова" },
  { key: "antiRainWindshield", name: "Антидождь \"Лобовое Стекло\"", group: "Дополнительные услуги Покрытие Кузова" },

  // Остальные группы
  { key: "underbodyWashWater", name: "Мойка днища водой", group: "Дополнительные услуги Очистка кузова" },
  { key: "underbodyWashFoam", name: "Мойка днища вода+пена", group: "Дополнительные услуги Очистка кузова" },
  { key: "tireBlack", name: "Чернение резины", group: "Дополнительные услуги Колеса" },
  { key: "wheelCleaning", name: "Химчистка колесных дисков", group: "Дополнительные услуги Колеса" },
  { key: "matWash", name: "Мойка ковриков", group: "Дополнительные услуги Салон" },
  { key: "vacuumSalon", name: "Уборка салона пылесосом", group: "Дополнительные услуги Салон" },
  { key: "tornadoSalon", name: "Уборка салона торнадором", group: "Дополнительные услуги Салон" },
  { key: "wetCleaning", name: "Влажная уборка салона", group: "Дополнительные услуги Салон" },
  { key: "trunkMatWash", name: "Мойка ковриков багажника", group: "Дополнительные услуги Салон" },
  { key: "trunkVacuum", name: "Уборка багажника пылесосом", group: "Дополнительные услуги Салон" },
  { key: "glassCleaning", name: "Чистка стёкол", group: "Дополнительные услуги Салон" },
  { key: "leatherConditioner", name: "Очистка кожаных поверхностей KOCH", group: "Дополнительные услуги Салон" },
  { key: "plasticPolish", name: "Полировка пластика KOCH", group: "Дополнительные услуги Салон" },
  { key: "dryFog", name: "Сухой Туман", group: "Дополнительные услуги Салон" },
  { key: "spotRemoval", name: "Удаление пятен в салоне", group: "Дополнительные услуги Салон" },
    { key: "leatherCream", name: "Очистка кожаных поверхностей кремом", group: "Дополнительные услуги Салон" },
  { key: "degreaseBody", name: "Обезжиривание кузова", group: "Дополнительные услуги Очистка кузова" },
  { key: "bitumRemoval", name: "Удаление битума (1 деталь)", group: "Дополнительные услуги Очистка кузова" },
  { key: "poplarRemoval", name: "Удаление Тополинного Клея \"1 Деталь\"", group: "Дополнительные услуги Очистка кузова" },
  { key: "insectRemoval", name: "Удаление Насекомых", group: "Дополнительные услуги Очистка кузова" },
  { key: "deepLkpClean", name: "Глубокая очистка ЛКП кузова", group: "Дополнительные услуги Очистка кузова" },
  { key: "underbodyWash", name: "Мойка днища", group: "Дополнительные услуги Очистка кузова" },
  { key: "engineWash", name: "Мойка двигателя", group: "Дополнительные услуги Двигатель" },
  { key: "engineConserv", name: "Мойка двигателя с консервацией", group: "Дополнительные услуги Двигатель" },
  { key: "chemSeat", name: "Химчистка \"1 Сиденье\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemDoor", name: "Химчистка \"1 Дверь\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemFloor", name: "Химчистка \"Пол-1 Место\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemCeiling", name: "Химчистка \"Потолок\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemTrunk", name: "Химчистка \"Багажник\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemFullSalon", name: "Химчистка \"Весь салон\"", group: "Дополнительные услуги Химчистка" },
  { key: "chemSteering", name: "Химчистка \"Рулевое Колесо\"", group: "Дополнительные услуги Химчистка" },
  { key: "polishAbrasive", name: "Полировка \"Абразивом 1 Деталь\"", group: "Дополнительные услуги Полировка" },
  { key: "polishHood", name: "Полировка \"Капот\"", group: "Дополнительные услуги Полировка" },
  { key: "polishHeadlight", name: "Полировка \"1 Фара\"", group: "Дополнительные услуги Полировка" },
  { key: "polishHeadlightLac", name: "Полировка \"1 Фара + Лак\"", group: "Дополнительные услуги Полировка" },
  { key: "ceramicFull", name: "Нанесение \"Керамика кузова\"", group: "Дополнительные услуги Полировка" },
  { key: "liquidGlass", name: "Нанесение \"Жидкое стекло\"", group: "Дополнительные услуги Полировка" }
];

function App() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [activeFilter, setActiveFilter] = useState("express");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedMultiple, setSelectedMultiple] = useState([]);

  const currentPrices = pricesData[currentLocationIndex] || pricesData[0];
  const currentLocation = locationsData[currentLocationIndex] || locationsData[0];
  const currentRouteUrl = `https://yandex.ru/maps/?rtext=~${currentLocation.lat}%2C${currentLocation.lng}&rtt=auto`;
  const currentMapEmbedUrl = `https://yandex.ru/map-widget/v1/?ll=${currentLocation.lng}%2C${currentLocation.lat}&mode=search&pt=${currentLocation.lng},${currentLocation.lat},pm2rdm&z=13`;

  // === ИСПРАВЛЕННЫЙ БЛОК ===
    let filteredServices = [];

  if (activeFilter === "express") {
    filteredServices = allServices.filter(s => s.key === "express" && currentPrices[s.key] !== undefined);
  } 
  else if (activeFilter === "standard") {
    filteredServices = allServices.filter(s => s.key === "standard" && currentPrices[s.key] !== undefined);
  } 
  else if (activeFilter === "complex") {
    // Для комплексов показываем только те, которые есть в текущем прайсе
    filteredServices = allServices.filter(s => 
      ["basic", "lux", "premium", "winter"].includes(s.key) && 
      currentPrices[s.key] !== undefined
    );
  } else if (activeFilter === "additional" && selectedGroup) {
  filteredServices = allServices
    .filter(s => 
      s.group.toLowerCase().includes(selectedGroup.toLowerCase()) || 
      selectedGroup.toLowerCase().includes(s.group.toLowerCase())
    )
    .filter(s => currentPrices[s.key] !== undefined);
}

  // Расчёт итого (тоже улучшил)
  let totalSum = 0;
  let hasFromPrice = false;

  selectedMultiple.forEach(key => {
    const priceData = currentPrices[key];
    if (priceData === undefined) return; // пропускаем, если услуги нет

    const price = priceData[currentCategory];
    if (typeof price === 'string' && price.startsWith('От ')) {
      hasFromPrice = true;
      const num = parseInt(price.replace('От ', ''), 10) || 0;
      totalSum += num;
    } else if (typeof price === 'number') {
      totalSum += price;
    }
  });

  const displayTotal = hasFromPrice ? `От ${totalSum} ₽` : `${totalSum} ₽`;

  if (window.location.pathname.startsWith('/detail')) {
    return (
      <div>
        <span
          ref={(node) => {
            const BUTTON_ID = 'vector-detail-header-home-link';

            if (!node) {
              const existing = document.getElementById(BUTTON_ID);
              if (existing) {
                existing.remove();
              }
              return;
            }

            const placeButton = (attempt = 0) => {
              const header = document.querySelector('header');
              if (!header) {
                if (attempt < 12) {
                  window.setTimeout(() => placeButton(attempt + 1), 120);
                }
                return;
              }

              const target = Array.from(header.querySelectorAll('a, button')).find((element) =>
                (element.textContent || '').trim().includes('Запис')
              );

              const logoWrap =
                header.querySelector('a')?.parentNode ||
                header.querySelector('header > div > div') ||
                header.querySelector('div');

              let button = document.getElementById(BUTTON_ID);
              if (!button) {
                button = document.createElement('a');
                button.id = BUTTON_ID;
                button.href = '/';
                button.textContent = 'Основной сайт';
                button.className =
                  'inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-amber-300/60 bg-zinc-950/95 px-3 py-2 text-center text-[11px] font-bold leading-none text-amber-300 shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition hover:bg-zinc-900 hover:text-amber-200 sm:px-4 sm:text-sm';
                button.style.margin = '0 1.25%';
                button.style.flex = '0 1 auto';
              }

              if (target && target.parentNode) {
                if (button.parentNode !== target.parentNode || button.nextSibling !== target) {
                  target.parentNode.insertBefore(button, target);
                }
                return;
              }

              if (logoWrap && logoWrap.parentNode) {
                if (button.parentNode !== logoWrap.parentNode) {
                  logoWrap.parentNode.insertBefore(button, logoWrap.nextSibling);
                }
              }
            };

            window.requestAnimationFrame(() => placeButton());
          }}
          style={{ display: 'none' }}
        />
        <DetailLanding />
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen font-sans">
     {/* ====================== ВЕРХНЯЯ ШАПКА (адаптивная) ====================== */}
<div className="bg-black border-b border-white/10 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">

    {/* Логотип + название */}
    <div className="flex items-center gap-3">
      <img 
        src="https://i.pinimg.com/736x/e4/71/17/e471179e1459e8428cc88f4542a6ce23.jpg" 
        alt="Vector Pro" 
        className="h-9 w-auto" 
      />
      <span className="text-3xl font-bold tracking-tighter text-amber-300">VECTOR PRO</span>
    </div>

    {/* Выбор филиала */}
          <a
            href="/detail"
            className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full border border-amber-300/60 bg-zinc-950/95 px-3 py-2 text-center text-[11px] font-bold leading-none text-amber-300 shadow-[0_8px_20px_rgba(0,0,0,0.14)] transition hover:bg-zinc-900 hover:text-amber-200 sm:px-4 sm:text-sm"
          >
            Детейлинг
          </a>
          <div className="flex flex-col gap-1 flex-1 min-w-[220px]">
  <span className="text-zinc-400 text-sm ml-1">Выберите филиал</span>
  <select
    value={currentLocationIndex}
    onChange={(e) => {
      const newIndex = Number(e.target.value);
      setCurrentLocationIndex(newIndex);
    }}
    className="bg-zinc-900 text-white px-5 py-3 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-amber-300 cursor-pointer flex-1"
  >
    {locationsData.map((loc, i) => (
      <option key={i} value={i}>
        {loc.name}
      </option>
    ))}
  </select>
</div>

{/* Правая часть шапки */}
<div className="flex items-center justify-between w-full max-w-[420px] ml-auto">
  {/* Номер телефона (слева) */}
  <a 
    href={`tel:${locationsData[currentLocationIndex]?.phone?.replace(/\D/g, '') || ''}`}
    className="text-white hover:text-amber-300 font-medium text-base sm:text-lg whitespace-nowrap"
  >
    {locationsData[currentLocationIndex]?.phone || '+7 (985) 018-78-78'}
  </a>

  {/* Кнопка Скачать (прижата к правому краю) */}
  <a 
    href="/downloads/vector-pro.apk" 
    download="Vector-Pro.apk"
    className="flex items-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-700 px-5 py-2.5 text-sm font-bold text-white transition-all active:scale-95 whitespace-nowrap"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v-4m0 0l4 4m-4-4l4-4m12 0v4m0 0l-4-4m4 4l-4 4" />
    </svg>
    Скачать
  </a>
</div>

  </div>
</div>

      {/* HERO с плавным переходом */}
      <header 
      
        className="relative h-[65vh] sm:h-[70vh] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: "url('/image/car.jpg')" 
        }}
      >
        {/* Плавный переход от картинки к контенту */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-zinc-950"></div>  
        
        {/* Дополнительный мягкий градиент снизу для лучшего перехода */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-950 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-[-2px] text-white">
            АВТОМОЙКА<br />ШИНОМОНТАЖ<br />ДЕТЕЙЛИНГ
          </h1>
        </div>
      </header>
      
  {/* ====================== КАТЕГОРИЯ АВТО (красиво на телефоне) ====================== */}
<div className="max-w-7xl mx-auto px-4">
  <p className="text-amber-300 text-sm font-medium mb-4 tracking-widest">КАТЕГОРИЯ АВТО</p>
  
  <div className="grid grid-cols-5 gap-2 md:gap-3">
    {[
      { num: "1", title: "Малый" },
      { num: "2", title: "Средний" },
      { num: "3", title: "бизнес и кроссоверы" },
      { num: "4", title: "Джипы" },
      { num: "5", title: "Микроавтобусы и внедорожники" }
    ].map((cat, index) => (
      <button
        key={cat.num}
        onClick={() => setCurrentCategory(index)}
        className={`flex flex-col items-center justify-center py-3 md:py-5 rounded-3xl transition-all text-center ${
          currentCategory === index 
            ? 'bg-amber-300 text-black' 
            : 'bg-zinc-900 hover:bg-zinc-800 text-white'
        }`}
      >
        <span className="text-3xl md:text-4xl font-bold leading-none">{cat.num}</span>
        <span className="text-[10px] md:text-xs font-medium mt-1 leading-tight px-1">
          {cat.title}
        </span>
      </button>
    ))}
  </div>
</div>

      {/* Основные кнопки фильтров */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => { setActiveFilter("express"); setSelectedGroup(null); setSelectedMultiple([]); }} 
                  className={`px-6 py-3.5 rounded-3xl text-base font-medium transition-all flex-1 sm:flex-none min-w-[140px] ${activeFilter === "express" ? 'bg-amber-300 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            Мойка "ЭКСПРЕСС"
          </button>
          <button onClick={() => { setActiveFilter("standard"); setSelectedGroup(null); setSelectedMultiple([]); }} 
                  className={`px-6 py-3.5 rounded-3xl text-base font-medium transition-all flex-1 sm:flex-none min-w-[140px] ${activeFilter === "standard" ? 'bg-amber-300 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            Мойка "СТАНДАРТ"
          </button>
          <button onClick={() => { setActiveFilter("complex"); setSelectedGroup(null); setSelectedMultiple([]); }} 
                  className={`px-6 py-3.5 rounded-3xl text-base font-medium transition-all flex-1 sm:flex-none min-w-[140px] ${activeFilter === "complex" ? 'bg-amber-300 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            КОМПЛЕКСЫ
          </button>
          <button onClick={() => { setActiveFilter("additional"); setSelectedGroup(null); setSelectedMultiple([]); }} 
                  className={`px-6 py-3.5 rounded-3xl text-base font-medium transition-all flex-1 sm:flex-none min-w-[140px] ${activeFilter === "additional" ? 'bg-amber-300 text-black' : 'bg-zinc-900 hover:bg-zinc-800'}`}>
            Доп. услуги
          </button>
        </div>
      </div>

            {/* Красивые карточки категорий */}
      {activeFilter === "additional" && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { 
                display: "Покрытие Кузова", 
                value: "Дополнительные услуги ПОКРЫТИЕ КУЗОВА",
                desc: "Защита и блеск кузова: керамика, кварц, воск"
              },
              { 
                display: "Колеса", 
                value: "Дополнительные услуги Колеса",
                desc: "Мойка дисков, чернение резины, химчистка арок"
              },
              { 
                display: "Салон", 
                value: "Дополнительные услуги Салон",
                desc: "Химчистка, уход за кожей, пластиком и ковриками"
              },
              { 
                display: "Очистка Кузова", 
                value: "Дополнительные услуги Очистка кузова",
                desc: "Удаление битума, тополя, насекомых и сложных загрязнений"
              },
              { 
                display: "Двигатель", 
                value: "Дополнительные услуги Двигатель",
                desc: "Мойка и обезжиривание моторного отсека"
              },
              { 
                display: "Химчистка", 
                value: "Дополнительные услуги Химчистка",
                desc: "Глубокая очистка салона и багажника"
              },
              { 
                display: "Полировка", 
                value: "Дополнительные услуги Полировка",
                desc: "Восстановление и защита лакокрасочного покрытия"
              }
            ].map(category => (
              <div
                key={category.value}
                onClick={() => {
                  setSelectedGroup(category.value);
                  setSelectedMultiple([]);
                }}
                className={`bg-zinc-900 hover:bg-zinc-800 p-6 rounded-3xl transition-all cursor-pointer border-2 ${
                  selectedGroup === category.value 
                    ? 'border-amber-300' 
                    : 'border-transparent'
                }`}
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {category.display}
                </h3>
                <p className="text-zinc-400 text-sm leading-snug">
                  {category.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Таблица с услугами */}
      {filteredServices.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-zinc-900 rounded-3xl p-5 sm:p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 text-zinc-400 font-normal text-sm sm:text-base">Услуга</th>
                  <th className="text-right py-4 text-amber-300 font-normal text-sm sm:text-base">Цена (кат. {currentCategory + 1})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm sm:text-base">
                {filteredServices.map(s => {
                  const price = currentPrices[s.key] ? currentPrices[s.key][currentCategory] : '—';
                  const display = typeof price === 'string' ? price : `${price} ₽`;
                  
                  return (
                    <tr
                      key={s.key}
                      onClick={() => { 
                        if (activeFilter === "additional") {
                          if (selectedMultiple.includes(s.key)) {
                            setSelectedMultiple(selectedMultiple.filter(k => k !== s.key));
                          } else {
                            setSelectedMultiple([...selectedMultiple, s.key]);
                          }
                        }
                      }}
                      className={`hover:bg-white/5 transition-colors cursor-pointer ${selectedMultiple.includes(s.key) ? 'bg-amber-300/20 text-amber-300 font-semibold' : ''}`}
                    >
                      <td className="py-5 pr-4">{s.name}</td>
                      <td className="text-right py-5 pl-4 text-xl sm:text-2xl font-semibold text-amber-300 whitespace-nowrap">{display}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {activeFilter === "additional" && selectedMultiple.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button onClick={() => setSelectedMultiple([])} className="text-red-400 hover:text-red-500 font-medium">Удалить выбранные</button>
                <div className="text-right">
                  <span className="text-zinc-400">Итого:</span>
                  <span className="ml-3 text-3xl font-bold text-amber-300">{displayTotal}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

     {/* КАРТА С ГЕОЛОКАЦИЕЙ */}
<section className="max-w-7xl mx-auto px-4 py-12">
  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
    <div>
      <h2 className="text-3xl font-bold text-amber-300">Филиал на карте</h2>
      <p className="text-zinc-400 mt-3 max-w-2xl">
        На карте всегда показан выбранный филиал. Нажмите на метку или кнопку ниже, чтобы сразу открыть маршрут в Яндекс.Картах.
      </p>
    </div>
    <a
      href={currentRouteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-2xl bg-amber-300 px-6 py-3 text-black font-semibold hover:bg-amber-200 transition"
    >
      Проложить маршрут
    </a>
  </div>

  <div className="w-full h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900">
    <iframe
      title={`Карта филиала ${currentLocation.name}`}
      src={currentMapEmbedUrl}
      className="h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>
</section>
      <footer className="bg-black py-12 text-center text-zinc-500 text-sm">
        © 2026 VECTOR PRO
      </footer>
    </div>
  );
}

export default App;

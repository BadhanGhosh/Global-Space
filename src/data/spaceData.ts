export interface CountryRecord {
  name: string;
  agencies: string;
  summary: string;
  url: string;
}

export interface UniverseTopic {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  keyFacts: string[];
  scientificSignificance: string;
}

export interface SpaceAgency {
  name: string;
  acronym: string;
  country: string;
  established: number;
  budgetBillionsUSD: number;
  headquarters: string;
  activeFleet: string;
  flagshipPrograms: string[];
  keyLaunchVehicles: string[];
  url: string;
  badgeColor: string;
  focus: string;
}

export interface SpaceCompany {
  name: string;
  country: string;
  founded: number;
  valuationOrFunding: string;
  sector: 'Launch Vehicles' | 'Earth Observation' | 'Satellite Platforms' | 'Space Stations & Habitation' | 'Lunar & Deep Space Logistics';
  coreCapability: string;
  flagshipVehicleOrConstellation: string;
  url: string;
}

export interface SpaceMission {
  id: string;
  name: string;
  agencyOrCompany: string;
  countryOrRegion: string;
  launchYear: number;
  destination: 'Earth Orbit' | 'Moon' | 'Mars' | 'Sun-Earth L2' | 'Jupiter & Outer Solar System' | 'Asteroid / Deep Space' | 'Heliocentric';
  status: 'Operational' | 'En Route' | 'Completed' | 'Historical' | 'In Development';
  objective: string;
  payloadInstruments: string[];
  trajectoryType: string;
  distanceFromEarthKm: number;
  url: string;
}

export interface NearEarthObject {
  id: string;
  name: string;
  designation: string;
  diameterMeters: number;
  velocityKmSec: number;
  missDistanceLunarDistances: number;
  missDistanceKm: number;
  closeApproachDate: string;
  isPotentiallyHazardous: boolean;
  torinoScale: number;
  eccentricity: number;
  semiMajorAxisAU: number;
  orbitClass: 'Apollo' | 'Aten' | 'Amor' | 'Atira';
}

export interface ExoplanetSpectralData {
  planetName: string;
  hostStar: string;
  distanceLightYears: number;
  discoveryYear: number;
  massEarthMasses: number;
  radiusEarthRadii: number;
  orbitalPeriodDays: number;
  equilibriumTempK: number;
  atmosphereKeyDetections: string[];
  spectrumPoints: { wavelengthMicrons: number; transitDepthPpm: number; uncertainty: number }[];
}

export const SPACE_AGENCIES: SpaceAgency[] = [
  {
    name: 'National Aeronautics and Space Administration',
    acronym: 'NASA',
    country: 'United States',
    established: 1958,
    budgetBillionsUSD: 25.4,
    headquarters: 'Washington, D.C.',
    activeFleet: 'JWST, Artemis, Mars Rovers (Perseverance, Curiosity), Europa Clipper, Voyager 1 & 2',
    flagshipPrograms: ['Artemis Lunar Architecture', 'Mars Sample Return', 'Commercial Crew & Cargo', 'Habitable Worlds Observatory'],
    keyLaunchVehicles: ['Space Launch System (SLS)', 'Commercial Providers (Falcon Heavy, Vulcan)'],
    url: 'https://www.nasa.gov',
    badgeColor: '#0b3d91',
    focus: 'Human spaceflight, deep-space planetary science, astrophysics & Earth observation'
  },
  {
    name: 'Indian Space Research Organisation',
    acronym: 'ISRO',
    country: 'India',
    established: 1969,
    budgetBillionsUSD: 1.6,
    headquarters: 'Bengaluru, Karnataka',
    activeFleet: 'Chandrayaan-3 Propulsion Module, Aditya-L1, XPoSat, Cartosat & RISAT constellations',
    flagshipPrograms: ['Gaganyaan Human Spaceflight', 'Chandrayaan-4 Sample Return', 'Shukrayaan Venus Orbiter', 'Bharatiya Antariksh Station (BAS)'],
    keyLaunchVehicles: ['LVM3', 'PSLV', 'GSLV Mk II', 'SSLV'],
    url: 'https://www.isro.gov.in',
    badgeColor: '#ff9933',
    focus: 'Cost-effective planetary exploration, indigenous launch systems, and satellite remote sensing'
  },
  {
    name: 'European Space Agency',
    acronym: 'ESA',
    country: 'Europe (22 Member States)',
    established: 1975,
    budgetBillionsUSD: 7.8,
    headquarters: 'Paris, France',
    activeFleet: 'Juice (Jupiter Icy Moons Explorer), Euclid, BepiColombo, Hera, Sentinel constellations',
    flagshipPrograms: ['Copernicus Earth Observation', 'Galileo Positioning', 'ExoMars Rosalind Franklin', 'LISA Gravitational Wave Observatory'],
    keyLaunchVehicles: ['Ariane 6', 'Vega-C'],
    url: 'https://www.esa.int',
    badgeColor: '#003399',
    focus: 'Intergovernmental space science, robotic planetary exploration, climate monitoring & astronomy'
  },
  {
    name: 'Japan Aerospace Exploration Agency',
    acronym: 'JAXA',
    country: 'Japan',
    established: 2003,
    budgetBillionsUSD: 1.9,
    headquarters: 'Chofu, Tokyo',
    activeFleet: 'SLIM (Smart Lander), XRISM X-ray Observatory, Akatsuki, Hayabusa2 Extended Mission',
    flagshipPrograms: ['Martian Moons eXploration (MMX)', 'LUPEX (Lunar Polar Exploration with ISRO)', 'HTV-X Cargo Resupply'],
    keyLaunchVehicles: ['H3', 'Epsilon-S'],
    url: 'https://global.jaxa.jp',
    badgeColor: '#b91c1c',
    focus: 'Precision pinpoint robotic landing, asteroid sample collection, astrophysics & lunar mobility'
  },
  {
    name: 'China National Space Administration',
    acronym: 'CNSA',
    country: 'China',
    established: 1993,
    budgetBillionsUSD: 12.0,
    headquarters: 'Haidian, Beijing',
    activeFleet: 'Tiangong Space Station, Chang\'e-6 Lunar Far-Side return, Tianwen-1 Mars Orbiter',
    flagshipPrograms: ['International Lunar Research Station (ILRS)', 'Tianwen-2 Asteroid Sample Return', 'Tianwen-3 Mars Sample Return'],
    keyLaunchVehicles: ['Long March 5', 'Long March 7', 'Long March 10'],
    url: 'https://www.cnsa.gov.cn',
    badgeColor: '#dc2626',
    focus: 'Permanent crewed orbital station, lunar south pole base development, deep interplanetary science'
  },
  {
    name: 'Canadian Space Agency',
    acronym: 'CSA / ASC',
    country: 'Canada',
    established: 1989,
    budgetBillionsUSD: 0.45,
    headquarters: 'Longueuil, Quebec',
    activeFleet: 'Canadarm2 (ISS), RADARSAT Constellation, Dextre, Artemis II Astronaut Crew Seat',
    flagshipPrograms: ['Canadarm3 for Lunar Gateway', 'WildFireSat', 'Deep Space Food Challenge'],
    keyLaunchVehicles: ['International Partner Launches'],
    url: 'https://www.asc-csa.gc.ca',
    badgeColor: '#ef4444',
    focus: 'Orbital robotics, radar earth observation, lunar gateway contributions & space medicine'
  },
  {
    name: 'UAE Space Agency / MBRSC',
    acronym: 'UAESA',
    country: 'United Arab Emirates',
    established: 2014,
    budgetBillionsUSD: 0.65,
    headquarters: 'Abu Dhabi & Dubai',
    activeFleet: 'Hope Mars Probe (EMM), Rashid Rover, MBZ-SAT',
    flagshipPrograms: ['EMA (Emirates Mission to the Asteroid Belt)', 'Mars 2117 Project', 'Rashid 2 Lunar Rover'],
    keyLaunchVehicles: ['Commercial Providers (H3, Falcon 9)'],
    url: 'https://www.space.gov.ae',
    badgeColor: '#059669',
    focus: 'Atmospheric Mars science, small planetary rovers, high-resolution Earth imaging & venture fund'
  },
  {
    name: 'Korea Aerospace Administration',
    acronym: 'KASA',
    country: 'South Korea',
    established: 2024,
    budgetBillionsUSD: 0.72,
    headquarters: 'Sacheon, Gyeongsangnam-do',
    activeFleet: 'Danuri (KPLO Lunar Orbiter), CAS500 satellites',
    flagshipPrograms: ['Indigenous Lunar Lander 2032', 'Next-Gen Launch Vehicle (KSLV-III)', 'Mars Landing 2045'],
    keyLaunchVehicles: ['Nuri (KSLV-II)', 'KSLV-III'],
    url: 'https://www.kasa.go.kr',
    badgeColor: '#2563eb',
    focus: 'National launch independence, cislunar exploration, deep space navigation & satellite industry'
  }
];

export const SPACE_COMPANIES: SpaceCompany[] = [
  {
    name: 'SpaceX',
    country: 'United States',
    founded: 2002,
    valuationOrFunding: '$180B+ valuation',
    sector: 'Launch Vehicles',
    coreCapability: 'Rapidly reusable orbital rocketry & massive satellite constellation deployment',
    flagshipVehicleOrConstellation: 'Starship & Falcon 9 / Starlink (6,000+ satellites in LEO)',
    url: 'https://www.spacex.com'
  },
  {
    name: 'Skyroot Aerospace',
    country: 'India',
    founded: 2018,
    valuationOrFunding: '$165M+ venture raised',
    sector: 'Launch Vehicles',
    coreCapability: 'Cost-effective small satellite launch vehicles powered by 3D-printed cryogenic engines',
    flagshipVehicleOrConstellation: 'Vikram-I orbital launch vehicle & Vikram-S suborbital demonstrator',
    url: 'https://skyroot.in'
  },
  {
    name: 'Rocket Lab',
    country: 'United States / New Zealand',
    founded: 2006,
    valuationOrFunding: 'Public (NASDAQ: RKLB)',
    sector: 'Launch Vehicles',
    coreCapability: 'Dedicated responsive small launches & vertically integrated spacecraft buses',
    flagshipVehicleOrConstellation: 'Electron rocket, Neutron medium-lift, and Photon / Pioneer satellite buses',
    url: 'https://www.rocketlabusa.com'
  },
  {
    name: 'Agnikul Cosmos',
    country: 'India',
    founded: 2017,
    valuationOrFunding: '$50M+ funding',
    sector: 'Launch Vehicles',
    coreCapability: 'Single-piece 3D-printed semi-cryogenic rocket engines (Agnilet) & mobile launchpads',
    flagshipVehicleOrConstellation: 'Agnibaan SOrTeD & Agnibaan sub-orbital to LEO multi-stage launcher',
    url: 'https://agnikul.in'
  },
  {
    name: 'Pixxel',
    country: 'India / United States',
    founded: 2019,
    valuationOrFunding: '$70M+ funding (Google-backed)',
    sector: 'Earth Observation',
    coreCapability: 'World-highest-resolution hyperspectral commercial satellite imaging constellation',
    flagshipVehicleOrConstellation: 'Fireflies commercial hyperspectral orbital constellation',
    url: 'https://www.pixxel.space'
  },
  {
    name: 'Blue Origin',
    country: 'United States',
    founded: 2000,
    valuationOrFunding: 'Private enterprise (Jeff Bezos)',
    sector: 'Lunar & Deep Space Logistics',
    coreCapability: 'Heavy lift orbital transport, methane/LOX BE-4 engines & Blue Moon lunar lander',
    flagshipVehicleOrConstellation: 'New Glenn heavy-lift launcher & Blue Moon Human Landing System (HLS)',
    url: 'https://www.blueorigin.com'
  },
  {
    name: 'Dhruva Space',
    country: 'India',
    founded: 2012,
    valuationOrFunding: '$25M+ raised',
    sector: 'Satellite Platforms',
    coreCapability: 'End-to-end space engineering: cubesat dispensers, satellite buses, ground station ops',
    flagshipVehicleOrConstellation: 'P-30 and P-90 nanosatellite and microsatellite bus architectures',
    url: 'https://dhruvaspace.com'
  },
  {
    name: 'Relativity Space',
    country: 'United States',
    founded: 2015,
    valuationOrFunding: '$1.3B+ funding',
    sector: 'Launch Vehicles',
    coreCapability: 'Industrial wire-arc additive manufacturing (Stargate) for entire rocket airframes',
    flagshipVehicleOrConstellation: 'Terran R reusable medium-to-heavy lift orbital rocket',
    url: 'https://www.relativityspace.com'
  },
  {
    name: 'Axiom Space',
    country: 'United States',
    founded: 2016,
    valuationOrFunding: '$500M+ funding',
    sector: 'Space Stations & Habitation',
    coreCapability: 'Commercial orbital space station architecture & next-generation Artemis EVA spacesuits',
    flagshipVehicleOrConstellation: 'Axiom Station modules (docking to ISS first) & AxEMU lunar spacesuit',
    url: 'https://www.axiomspace.com'
  },
  {
    name: 'Planet Labs',
    country: 'United States',
    founded: 2010,
    valuationOrFunding: 'Public (NYSE: PL)',
    sector: 'Earth Observation',
    coreCapability: 'Daily global imaging coverage of the entire Earth landmass with 200+ smallsats',
    flagshipVehicleOrConstellation: 'SuperDove (PlanetScope) and Pelican high-resolution fleet',
    url: 'https://www.planet.com'
  }
];

export const SPACE_MISSIONS: SpaceMission[] = [
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    agencyOrCompany: 'NASA / ESA / CSA',
    countryOrRegion: 'International',
    launchYear: 2021,
    destination: 'Sun-Earth L2',
    status: 'Operational',
    objective: 'Observe the earliest first stars and galaxies formed after the Big Bang, study planetary formation, and analyze exoplanet atmospheric chemistries in infrared.',
    payloadInstruments: ['NIRCam (Near-Infrared Camera)', 'NIRSpec (Spectrograph)', 'MIRI (Mid-Infrared Instrument)', 'FGS/NIRISS'],
    trajectoryType: 'Halo orbit around Sun-Earth Lagrange Point 2 (1.5 million km from Earth)',
    distanceFromEarthKm: 1512400,
    url: 'https://science.nasa.gov/mission/webb/'
  },
  {
    id: 'chandrayaan-3',
    name: 'Chandrayaan-3 (Vikram & Pragyan)',
    agencyOrCompany: 'ISRO',
    countryOrRegion: 'India',
    launchYear: 2023,
    destination: 'Moon',
    status: 'Completed',
    objective: 'Demonstrate safe soft-landing near the lunar south polar region (69.37° S) and in-situ rover chemical analysis of regolith elemental composition.',
    payloadInstruments: ['ChaSTE (Thermal probe)', 'ILSA (Seismometer)', 'APXS (Alpha Particle X-Ray Spectrometer)', 'LIBS (Laser Breakdown)'],
    trajectoryType: 'Earth-bound elliptic orbit raising -> Lunar Orbit Insertion -> Powered Descent',
    distanceFromEarthKm: 384400,
    url: 'https://www.isro.gov.in/Chandrayaan3.html'
  },
  {
    id: 'perseverance',
    name: 'Mars 2020 Perseverance & Ingenuity',
    agencyOrCompany: 'NASA / JPL',
    countryOrRegion: 'United States',
    launchYear: 2020,
    destination: 'Mars',
    status: 'Operational',
    objective: 'Seek signs of ancient microbial life in Jezero Crater delta, collect hermetically sealed geological core samples for Mars Sample Return, and test MOXIE oxygen generation.',
    payloadInstruments: ['Mastcam-Z', 'SuperCam laser', 'PIXL X-ray', 'SHERLOC UV Raman', 'MOXIE O2 generator', 'MEDA weather station'],
    trajectoryType: 'Direct hyperbolic interplanetary transfer (Hohmann elliptic arc)',
    distanceFromEarthKm: 228500000,
    url: 'https://mars.nasa.gov/mars2020/'
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agencyOrCompany: 'NASA',
    countryOrRegion: 'United States',
    launchYear: 2024,
    destination: 'Jupiter & Outer Solar System',
    status: 'En Route',
    objective: 'Determine whether Jupiter’s moon Europa harbors conditions suitable to support life beneath its icy crust, via 49 close flybys reaching as low as 25 km altitude.',
    payloadInstruments: ['REASON ice-penetrating radar', 'MISE infrared imaging', 'MASPEX neutral mass spectrometer', 'PIMS plasma sensor'],
    trajectoryType: 'Mars-Earth Gravity Assist (MEGA) trajectory cruising toward Jovian orbital insertion in 2030',
    distanceFromEarthKm: 615000000,
    url: 'https://science.nasa.gov/mission/europa-clipper/'
  },
  {
    id: 'voyager-1',
    name: 'Voyager 1 (Interstellar Probe)',
    agencyOrCompany: 'NASA / JPL',
    countryOrRegion: 'United States',
    launchYear: 1977,
    destination: 'Asteroid / Deep Space',
    status: 'Operational',
    objective: 'Explore the outer planets (Jupiter, Saturn, Titan) and continue pioneering the heliopause into true interstellar space, measuring galactic cosmic rays.',
    payloadInstruments: ['Cosmic Ray Subsystem (CRS)', 'Low-Energy Charged Particle (LECP)', 'Magnetometer (MAG)', 'Plasma Wave (PWS)'],
    trajectoryType: 'Hyperbolic escape trajectory traveling outbound at 17.0 km/s relative to the Sun',
    distanceFromEarthKm: 24480000000,
    url: 'https://voyager.jpl.nasa.gov/'
  },
  {
    id: 'artemis-2',
    name: 'Artemis II Crewed Lunar Flight',
    agencyOrCompany: 'NASA / CSA',
    countryOrRegion: 'United States / Canada',
    launchYear: 2025,
    destination: 'Moon',
    status: 'In Development',
    objective: 'First crewed test flight of Orion spacecraft and SLS rocket, carrying 4 astronauts on a lunar free-return trajectory over 10 days to validate life support systems.',
    payloadInstruments: ['Orion Environmental Control & Life Support (ECLSS)', 'Radiation Sensors', 'Optical Laser Comm (O2O)'],
    trajectoryType: 'High Earth Orbit burn -> Trans-Lunar Injection (TLI) -> Lunar Free-Return figure-8 trajectory',
    distanceFromEarthKm: 400000,
    url: 'https://www.nasa.gov/mission/artemis-ii/'
  },
  {
    id: 'aditya-l1',
    name: 'Aditya-L1 Solar Observatory',
    agencyOrCompany: 'ISRO',
    countryOrRegion: 'India',
    launchYear: 2023,
    destination: 'Heliocentric',
    status: 'Operational',
    objective: 'Stationed at Sun-Earth Lagrange Point 1 (L1) to monitor solar coronal mass ejections (CMEs), space weather dynamics, chromosphere heating, and magnetic flares.',
    payloadInstruments: ['VELC (Coronagraph)', 'SUIT (UV Imaging Telescope)', 'ASPEX (Solar wind analyzer)', 'PAPA (Plasma analyzer)'],
    trajectoryType: 'Halo orbit around Sun-Earth L1 (1.5 million km sunward)',
    distanceFromEarthKm: 1495000,
    url: 'https://www.isro.gov.in/Aditya_L1.html'
  },
  {
    id: 'hera',
    name: 'Hera Planetary Defense Probe',
    agencyOrCompany: 'ESA',
    countryOrRegion: 'Europe',
    launchYear: 2024,
    destination: 'Asteroid / Deep Space',
    status: 'En Route',
    objective: 'Perform detailed post-impact forensic investigation of asteroid Dimorphos, which was deflected by NASA’s DART kinetic impactor in 2022, measuring crater size and mass.',
    payloadInstruments: ['Asteroid Framing Camera (AFC)', 'PALT laser altimeter', 'TIRI thermal infrared', 'Milani & Juventas CubeSats'],
    trajectoryType: 'Mars gravity assist (2025) -> Rendezvous with Didymos binary asteroid system in late 2026',
    distanceFromEarthKm: 180000000,
    url: 'https://www.esa.int/Space_Safety/Hera'
  },
  {
    id: 'iss',
    name: 'International Space Station (ISS)',
    agencyOrCompany: 'NASA / ESA / JAXA / CSA / Roscosmos',
    countryOrRegion: 'International',
    launchYear: 1998,
    destination: 'Earth Orbit',
    status: 'Operational',
    objective: 'Continuously crewed microgravity research laboratory and biological testing ground orbiting Earth 16 times per day at 27,600 km/h.',
    payloadInstruments: ['AMS-02 (Alpha Magnetic Spectrometer)', 'NICER (Neutron star interior)', 'ECOSTRESS', 'Columbus & Kibo modules'],
    trajectoryType: 'Low Earth Orbit (LEO) at ~418 km mean altitude, 51.6° inclination',
    distanceFromEarthKm: 418,
    url: 'https://www.nasa.gov/international-space-station/'
  },
  {
    id: 'mom',
    name: 'Mars Orbiter Mission (Mangalyaan)',
    agencyOrCompany: 'ISRO',
    countryOrRegion: 'India',
    launchYear: 2013,
    destination: 'Mars',
    status: 'Completed',
    objective: 'First Asian nation to enter Mars orbit; demonstrated high-efficiency interplanetary navigation, autonomous orbital insertion, and surface albedo imaging.',
    payloadInstruments: ['MCC (Mars Colour Camera)', 'TIS (Thermal Infrared)', 'MSM (Methane Sensor for Mars)', 'MENCA (Exospheric analyzer)'],
    trajectoryType: 'Hyperbolic capture into high-eccentricity elliptical Martian orbit',
    distanceFromEarthKm: 225000000,
    url: 'https://www.isro.gov.in/MarsOrbiterMissionSpacecraft.html'
  }
];

export const NEAR_EARTH_OBJECTS: NearEarthObject[] = [
  {
    id: 'neo-99942',
    name: '99942 Apophis',
    designation: '2004 MN4',
    diameterMeters: 370,
    velocityKmSec: 30.73,
    missDistanceLunarDistances: 0.082, // Extremely close April 13, 2029 (under 32,000 km, inside geostationary ring)
    missDistanceKm: 31600,
    closeApproachDate: '2029-04-13',
    isPotentiallyHazardous: true,
    torinoScale: 0,
    eccentricity: 0.191,
    semiMajorAxisAU: 0.922,
    orbitClass: 'Aten'
  },
  {
    id: 'neo-101955',
    name: '101955 Bennu',
    designation: '1999 RQ36',
    diameterMeters: 490,
    velocityKmSec: 27.77,
    missDistanceLunarDistances: 1.95,
    missDistanceKm: 750000,
    closeApproachDate: '2037-09-23',
    isPotentiallyHazardous: true,
    torinoScale: 0,
    eccentricity: 0.204,
    semiMajorAxisAU: 1.126,
    orbitClass: 'Apollo'
  },
  {
    id: 'neo-2024yr4',
    name: '2024 YR4',
    designation: '2024 YR4',
    diameterMeters: 55,
    velocityKmSec: 17.12,
    missDistanceLunarDistances: 0.28,
    missDistanceKm: 107600,
    closeApproachDate: '2032-12-22',
    isPotentiallyHazardous: true,
    torinoScale: 1,
    eccentricity: 0.312,
    semiMajorAxisAU: 1.28,
    orbitClass: 'Apollo'
  },
  {
    id: 'neo-65803',
    name: '65803 Didymos',
    designation: '1996 GT',
    diameterMeters: 780,
    velocityKmSec: 23.4,
    missDistanceLunarDistances: 15.6,
    missDistanceKm: 6000000,
    closeApproachDate: '2026-11-14',
    isPotentiallyHazardous: true,
    torinoScale: 0,
    eccentricity: 0.384,
    semiMajorAxisAU: 1.644,
    orbitClass: 'Apollo'
  },
  {
    id: 'neo-162173',
    name: '162173 Ryugu',
    designation: '1999 JU3',
    diameterMeters: 900,
    velocityKmSec: 26.2,
    missDistanceLunarDistances: 23.8,
    missDistanceKm: 9150000,
    closeApproachDate: '2027-03-08',
    isPotentiallyHazardous: true,
    torinoScale: 0,
    eccentricity: 0.190,
    semiMajorAxisAU: 1.189,
    orbitClass: 'Apollo'
  },
  {
    id: 'neo-433',
    name: '433 Eros',
    designation: '1898 DQ',
    diameterMeters: 16840,
    velocityKmSec: 24.36,
    missDistanceLunarDistances: 69.4,
    missDistanceKm: 26700000,
    closeApproachDate: '2028-01-24',
    isPotentiallyHazardous: false,
    torinoScale: 0,
    eccentricity: 0.223,
    semiMajorAxisAU: 1.458,
    orbitClass: 'Amor'
  },
  {
    id: 'neo-3200',
    name: '3200 Phaethon',
    designation: '1983 TB',
    diameterMeters: 5800,
    velocityKmSec: 32.8,
    missDistanceLunarDistances: 26.8,
    missDistanceKm: 10300000,
    closeApproachDate: '2026-12-16',
    isPotentiallyHazardous: true,
    torinoScale: 0,
    eccentricity: 0.890,
    semiMajorAxisAU: 1.271,
    orbitClass: 'Apollo'
  }
];

export const EXOPLANET_SPECTRA: ExoplanetSpectralData[] = [
  {
    planetName: 'K2-18 b',
    hostStar: 'K2-18 (Red Dwarf in Leo)',
    distanceLightYears: 124,
    discoveryYear: 2015,
    massEarthMasses: 8.63,
    radiusEarthRadii: 2.61,
    orbitalPeriodDays: 32.9,
    equilibriumTempK: 255, // ~ -18°C (habitable zone boundary)
    atmosphereKeyDetections: ['Carbon Dioxide (CO2)', 'Methane (CH4)', 'Dimethyl Sulfide (DMS - tentative)', 'Absence of Ammonia (Hycean candidate)'],
    spectrumPoints: [
      { wavelengthMicrons: 0.9, transitDepthPpm: 2710, uncertainty: 25 },
      { wavelengthMicrons: 1.1, transitDepthPpm: 2725, uncertainty: 22 },
      { wavelengthMicrons: 1.4, transitDepthPpm: 2780, uncertainty: 30 }, // H2O/CH4 band
      { wavelengthMicrons: 1.7, transitDepthPpm: 2760, uncertainty: 26 },
      { wavelengthMicrons: 2.0, transitDepthPpm: 2740, uncertainty: 24 },
      { wavelengthMicrons: 2.3, transitDepthPpm: 2840, uncertainty: 35 }, // Strong CH4 peak
      { wavelengthMicrons: 2.8, transitDepthPpm: 2780, uncertainty: 28 },
      { wavelengthMicrons: 3.3, transitDepthPpm: 2890, uncertainty: 40 }, // Primary CH4 vibrational
      { wavelengthMicrons: 4.3, transitDepthPpm: 2950, uncertainty: 42 }, // Prominent CO2 absorption peak
      { wavelengthMicrons: 4.8, transitDepthPpm: 2810, uncertainty: 38 },
      { wavelengthMicrons: 5.2, transitDepthPpm: 2770, uncertainty: 32 }
    ]
  },
  {
    planetName: 'WASP-96 b',
    hostStar: 'WASP-96 (G-type yellow star in Phoenix)',
    distanceLightYears: 1150,
    discoveryYear: 2014,
    massEarthMasses: 152.5, // 0.48 Jupiter mass
    radiusEarthRadii: 13.4, // 1.20 Jupiter radius (puffy hot saturn)
    orbitalPeriodDays: 3.42,
    equilibriumTempK: 1285,
    atmosphereKeyDetections: ['Water Vapor (H2O)', 'Haze layers & Cloud scattering', 'Sodium (Na)', 'Potassium (K)'],
    spectrumPoints: [
      { wavelengthMicrons: 0.6, transitDepthPpm: 14850, uncertainty: 65 }, // Na doublet
      { wavelengthMicrons: 0.8, transitDepthPpm: 14720, uncertainty: 55 },
      { wavelengthMicrons: 1.15, transitDepthPpm: 14920, uncertainty: 50 }, // H2O overtone
      { wavelengthMicrons: 1.4, transitDepthPpm: 15320, uncertainty: 75 }, // Strong H2O peak
      { wavelengthMicrons: 1.8, transitDepthPpm: 15010, uncertainty: 60 },
      { wavelengthMicrons: 2.0, transitDepthPpm: 15150, uncertainty: 62 },
      { wavelengthMicrons: 2.7, transitDepthPpm: 15480, uncertainty: 80 }, // Major H2O absorption
      { wavelengthMicrons: 3.5, transitDepthPpm: 14980, uncertainty: 70 },
      { wavelengthMicrons: 4.4, transitDepthPpm: 15060, uncertainty: 72 }
    ]
  },
  {
    planetName: 'TRAPPIST-1 e',
    hostStar: 'TRAPPIST-1 (Ultra-cool red dwarf in Aquarius)',
    distanceLightYears: 39.5,
    discoveryYear: 2017,
    massEarthMasses: 0.69,
    radiusEarthRadii: 0.92,
    orbitalPeriodDays: 6.1,
    equilibriumTempK: 251,
    atmosphereKeyDetections: ['Compact Secondary Atmosphere Search', 'CO2 Band Screening', 'Surface Liquid Water Potential'],
    spectrumPoints: [
      { wavelengthMicrons: 1.0, transitDepthPpm: 5480, uncertainty: 40 },
      { wavelengthMicrons: 1.5, transitDepthPpm: 5510, uncertainty: 38 },
      { wavelengthMicrons: 2.0, transitDepthPpm: 5490, uncertainty: 42 },
      { wavelengthMicrons: 2.7, transitDepthPpm: 5560, uncertainty: 48 },
      { wavelengthMicrons: 3.5, transitDepthPpm: 5520, uncertainty: 45 },
      { wavelengthMicrons: 4.3, transitDepthPpm: 5680, uncertainty: 55 }, // CO2 limit detection
      { wavelengthMicrons: 5.0, transitDepthPpm: 5500, uncertainty: 46 }
    ]
  }
];

export const MARS_WEATHER_STATION = {
  sol: 1324,
  earthDate: '2026-11-08',
  location: 'Jezero Crater Delta (18.38°N, 77.58°E)',
  rover: 'Perseverance (Mars 2020)',
  pressurePascals: 742,
  pressureTrend: '+1.4 Pa/hr',
  airTemperatureMaxC: -14.2,
  airTemperatureMinC: -78.6,
  groundTemperatureMaxC: -4.1,
  groundTemperatureMinC: -82.4,
  windSpeedMps: 4.8,
  windDirectionDegrees: 245,
  windDirectionText: 'WSW',
  dustOpticalDepthTau: 0.62, // Clear to mild haze
  uvRadiationIndex: 'HIGH (No ozone attenuation)',
  sealedCoresCount: 38,
  totalCoreLengthMeters: 1.48
};

export const COUNTRIES: CountryRecord[] = [
  { name: 'United States', agencies: 'NASA; NOAA; USSF; federal programs', summary: 'Global aerospace leadership in human lunar/deep-space exploration, Mars robotic fleet, space astrophysics, commercial launch, and GPS constellation.', url: 'https://www.nasa.gov/' },
  { name: 'India', agencies: 'ISRO; IN-SPACe; NSIL', summary: 'Pioneered low-cost planetary missions (Chandrayaan lunar polar soft-landing, Mars Orbiter Mission MOM, Aditya-L1 solar halo observatory, Gaganyaan crewed program).', url: 'https://www.isro.gov.in/' },
  { name: 'China', agencies: 'CNSA; CMSA; CAS', summary: 'Independent space station (Tiangong), lunar far-side sample return (Chang\'e-6), Mars landing and rover operations (Tianwen-1).', url: 'https://www.cnsa.gov.cn/' },
  { name: 'Europe (ESA)', agencies: 'ESA; national agencies (CNES, DLR, ASI, UKSA)', summary: '22 member states collaborating on space science (Juice, Euclid, BepiColombo, Hera), Copernicus climate monitoring, and Ariane 6 launch operations.', url: 'https://www.esa.int/' },
  { name: 'Japan', agencies: 'JAXA; Cabinet Office Space Policy', summary: 'World-renowned precision pinpoint landing (SLIM), asteroid sample-return science (Hayabusa2), XRISM X-ray astrophysics, and HTV orbital resupply.', url: 'https://global.jaxa.jp/' },
  { name: 'South Korea', agencies: 'KASA; KARI', summary: 'Rapidly emerging space nation with indigenous Nuri orbital rocket, Danuri lunar orbiter, and national lunar/Mars landing initiatives.', url: 'https://www.kasa.go.kr/' },
  { name: 'Canada', agencies: 'CSA / ASC', summary: 'Specialist in orbital robotics (Canadarm2 on ISS, Canadarm3 on Lunar Gateway), radar Earth observation (RADARSAT), and astronaut deep-space flights.', url: 'https://www.asc-csa.gc.ca/' },
  { name: 'United Arab Emirates', agencies: 'UAE Space Agency; MBRSC', summary: 'First Arab interplanetary probe to Mars (Hope / EMM), Rashid lunar rovers, and the upcoming Emirates Mission to the Asteroid Belt (EMA).', url: 'https://www.space.gov.ae/' },
  { name: 'Australia', agencies: 'Australian Space Agency; CSIRO', summary: 'Host to Canberra Deep Space Communications Complex, regional launch sites, space situational awareness, and robotic rover collaboration.', url: 'https://www.space.gov.au/' },
  { name: 'United Kingdom', agencies: 'UK Space Agency', summary: 'Major European hub for small satellite design, manufacturing, space data services, and international science partnerships.', url: 'https://www.gov.uk/government/organisations/uk-space-agency' },
  { name: 'Brazil', agencies: 'AEB; INPE', summary: 'Decades of Earth observation and environmental monitoring of the Amazon basin, CBERS satellite partnership, and Alcântara launch center.', url: 'https://www.gov.br/aeb/' }
];

export const UNIVERSE_TOPICS: UniverseTopic[] = [
  {
    id: 'solar-system',
    title: 'Solar System & Planetary Systems',
    kicker: '01 / THE COSMOS',
    summary: 'The gravitationally bound system of the Sun and the objects that orbit it, either directly or indirectly, including the eight major planets, Kuiper Belt, and Oort Cloud.',
    keyFacts: [
      'Age: ~4.6 billion years since initial gravitational collapse of molecular cloud',
      'Mass distribution: Sun contains 99.86% of all mass in the Solar System',
      'Planetary classification: 4 terrestrial rocky worlds (Mercury, Venus, Earth, Mars) and 4 gas/ice giants (Jupiter, Saturn, Uranus, Neptune)'
    ],
    scientificSignificance: 'Provides the accessible ground-truth baseline for planetary formation, comparative planetology, and habitable zones around stars.'
  },
  {
    id: 'stars',
    title: 'Stars & Stellar Nurseries',
    kicker: '02 / THE COSMOS',
    summary: 'Luminous spheres of plasma held together by their own gravity, fusing hydrogen into helium and heavier elements to forge the building blocks of chemistry.',
    keyFacts: [
      'Stellar nucleosynthesis: Elements from carbon to iron are forged inside stellar cores',
      'Main sequence: Stars spend ~90% of their lifespans converting hydrogen to helium',
      'Stellar endpoints: White dwarfs, neutron stars (pulsars/magnetars), or stellar-mass black holes'
    ],
    scientificSignificance: 'Stellar lifecycles govern chemical enrichment of galaxies and provide the radiant energy that warms planetary surfaces.'
  },
  {
    id: 'galaxies',
    title: 'Galaxies & Cosmic Web',
    kicker: '03 / THE COSMOS',
    summary: 'Massive, gravitationally bound systems consisting of stars, stellar remnants, interstellar gas, dust, and dark matter arranged in cosmic filaments and clusters.',
    keyFacts: [
      'Milky Way: Barred spiral galaxy with ~100 to 400 billion stars and 100,000 ly diameter',
      'Morphology types: Spiral, elliptical, lenticular, and irregular structures',
      'Central engines: Almost all large galaxies harbor supermassive black holes at their galactic nuclei'
    ],
    scientificSignificance: 'Galaxy formation and clustering map out the dark matter framework and large-scale expansion of space-time since the Big Bang.'
  },
  {
    id: 'black-holes',
    title: 'Black Holes & Spacetime Curvature',
    kicker: '04 / THE COSMOS',
    summary: 'Regions of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from inside the event horizon.',
    keyFacts: [
      'Event horizon: Boundary where escape velocity equals the speed of light (c)',
      'Gravitational lensing: Bends passing photon paths, confirmed by JWST and Event Horizon Telescope (EHT)',
      'Hawking radiation: Quantum thermodynamic mechanism by which black holes slowly radiate mass'
    ],
    scientificSignificance: 'Testing grounds for general relativity at extreme gravitational limits and the elusive unification with quantum mechanics.'
  },
  {
    id: 'exoplanets',
    title: 'Exoplanets & Habitability',
    kicker: '05 / THE COSMOS',
    summary: 'Planets outside the Solar System. Over 5,600 confirmed exoplanets span hot Jupiters, mini-Neptunes, super-Earths, and temperate rocky worlds in stellar habitable zones.',
    keyFacts: [
      'Primary detection methods: Transit photometry (Kepler, TESS) and Radial Velocity (Doppler wobble)',
      'Atmospheric characterization: Transmission spectroscopy measuring planetary filtration of starlight',
      'Target systems: TRAPPIST-1, K2-18, Proxima Centauri b, WASP gas giants'
    ],
    scientificSignificance: 'Investigating whether planetary biospheres and liquid water oceans are common or extraordinarily rare in the Milky Way.'
  },
  {
    id: 'cosmology',
    title: 'Cosmology & the Expanding Universe',
    kicker: '06 / THE COSMOS',
    summary: 'The scientific study of the large-scale properties of the universe as a whole, from the Big Bang 13.8 billion years ago to cosmic inflation and dark energy.',
    keyFacts: [
      'Cosmic Microwave Background (CMB): Relic thermal radiation left over from ~380,000 years after the Big Bang',
      'Energy budget: 68% Dark Energy, 27% Dark Matter, and only 5% Ordinary Baryonic Matter',
      'Hubble-Lemaître expansion: Galaxies recede with velocity proportional to their distance'
    ],
    scientificSignificance: 'Constraining cosmological parameters (H0, Ω) and discovering the ultimate fate of the universe.'
  }
];

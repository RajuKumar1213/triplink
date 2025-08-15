// Centralized destination data & types. Later can be replaced with DB fetch.
// Theme accent: #fede58 / yellow palette.

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  image?: string;
};

export type PricingTier = {
  label: string;
  price: number; // base price in INR
  originalPrice?: number;
  includes?: string[];
  notes?: string;
};

export type FAQItem = { question: string; answer: string };

export interface DestinationData {
  slug: string;
  name: string;
  region: string;
  shortTagline: string;
  heroImage: string;
  gallery: string[];
  duration: string; // e.g. "6D / 5N"
  difficulty?: 'Easy' | 'Moderate' | 'Hard';
  altitude?: string;
  bestSeason?: string;
  overview: string[]; // paragraphs
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  pricing: PricingTier[];
  faqs: FAQItem[];
  bookingNote?: string;
  trending?: boolean;
  icon?: string; // icon filename in /public/icons
}

export const destinations: DestinationData[] = [
  {
    slug: 'chopta-tungnath-uttarakhand',
    name: 'Chopta – Tungnath & Chandrashila',
    region: 'Uttarakhand, India',
    shortTagline: 'Mini Switzerland of India: Meadows, mythic temples & sunrise summits.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg',
    gallery: [
      'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
      'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg'
    ],
    duration: '4D / 3N',
    difficulty: 'Easy',
    altitude: '4,000 m (Chandrashila peak)',
    bestSeason: 'Oct – Jun (Snow: Dec–Feb)',
    overview: [
      'Chopta is a serene alpine meadow base in Uttarakhand offering a compact Himalayan experience: forest trails, temple heritage, sunrise panoramas, and optional snow walks in winter.',
      'This itinerary blends comfortable travel, acclimatised ascent to Tungnath (the highest Shiva temple), and an early morning push to Chandrashila ridge for a 270° Himalayan skyline (Trishul, Nanda Devi, Chaukhamba on clear days).',
      'Suited for beginners & families seeking an introductory Himalayan trek without high-risk sections.'
    ],
    highlights: [
      'Golden sunrise from Chandrashila summit ridge',
      'Historic Tungnath Temple (One of the Panch Kedar)',
      'Rhododendron & oak forest trail',
      'Clear night sky & astrophotography opportunity',
      'Local Garhwali cuisine tasting',
      'Seasonal snow trekking (Winter departures)'
    ],
    inclusions: [
      'Surface transport ex Rishikesh/Haridwar (tempo traveller)',
      'Accommodation: Guesthouse / alpine lodge (triple / twin sharing)',
      'All breakfasts & dinners (nutritious local menus)',
      'Trek lead & support guide (ratio ≤ 1:10)',
      'Permit & entry fees where applicable',
      'Basic medical & first‑aid kit (incl. oximeter)',
      'Emergency support coordination'
    ],
    exclusions: [
      'Lunch meals & en‑route snacks',
      'Personal mule/porter charges',
      'Any airfare / rail fare',
      'Travel insurance (recommended)',
      'GST 5%',
      'Anything not expressly listed in inclusions'
    ],
    itinerary: [
      { day: 1, title: 'Rishikesh / Haridwar → Chopta Base', description: 'Early departure, river confluence viewpoints en route, reach Chopta by evening, acclimatisation walk, sunset meadow photography.' },
      { day: 2, title: 'Trek: Chopta → Tungnath → Chandrashila (Optional Sunset) → Return', description: 'Gradual forest-meadow ascent (approx 3.5 km to Tungnath). After temple visit, optional push to Chandrashila (steeper final 1 km). Descend before dusk. Bonfire (weather permitting).', activities: ['Packed trail snacks', 'Temple darshan', 'Summit ridge photography'] },
      { day: 3, title: 'Buffer / Birding & Deoriatal (Optional Add‑On)', description: 'Optional early start excursion to Deoriatal (additional drive + trek) OR leisure day with slow nature walk & bird watching (monals in season). Evening cultural interaction.' },
      { day: 4, title: 'Return Journey', description: 'Post breakfast depart for Rishikesh/Haridwar. Drop by late afternoon/evening.' }
    ],
    pricing: [
      { label: 'Triple Sharing', price: 8499, originalPrice: 9999, includes: ['All standard inclusions'] },
      { label: 'Twin Sharing', price: 9499 },
      { label: 'Solo (On Request)', price: 0, notes: 'Available with supplement; contact support.' }
    ],
    faqs: [
      { question: 'Do I need prior trekking experience?', answer: 'No. Trail is well‑defined; basic fitness (walk 5–6 km comfortably) is adequate.' },
      { question: 'Snow guarantee?', answer: 'Snow is typically present Dec–Feb, variable in early March—cannot be guaranteed.' },
      { question: 'Mobile network?', answer: 'Jio & BSNL patchy at base; near Tungnath usually weak. Download offline maps.' }
    ],
    bookingNote: 'Reserve with 40% advance. Limited winter batches (smaller group size for safety).',
    trending: true,
    icon: 'hill.png'
  },
  {
    slug: 'himachal-bir-rajgundha-jibhi-kasol-kalga',
    name: 'Himachal Bir – Rajgundha • Jibhi • Kasol • Kalga',
    region: 'Himachal Pradesh, India',
    shortTagline: 'Paraglides, pine valleys & café culture in one blended Himalayan circuit.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg',
    gallery: [
      'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
      'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
      'https://www.thomascook.in/images/campaign-pages/2025/april/genric-holiday-1920x545.jpg'
    ],
    duration: '7D / 6N',
    difficulty: 'Easy',
    altitude: '2,800 m',
    bestSeason: 'Oct – Jun',
    overview: [
      'Soak in a crafted Himalayan sampler covering gliding meadows of Bir, remote Rajgundha valley trails, misty riverside cafés of Kasol and forested escapes of Kalga & Jibhi.',
      'Balanced for new explorers & casual adventurers with curated stays, local food experiences and flexible add‑ons.'
    ],
    highlights: [
      'World-famous Bir Billing paragliding site',
      'Hidden Rajgundha valley hike',
      'Riverside café trail in Kasol',
      'Jibhi waterfalls & forest bridges',
      'Kalga sunrise & pine village vibes',
      'Optional stargazing & night photography'
    ],
    inclusions: [
      'Transportation (tempo traveller) ex Delhi/Chandigarh',
      'Accommodation (triple/dual sharing as selected)',
      'Breakfast & Dinner (local curated menus)',
      'Certified trek lead for hikes',
      'Paragliding coordination (ticket extra)',
      'First aid & basic medical kit'
    ],
    exclusions: [
      'Lunch meals',
      'Paragliding fee / adventure add‑ons',
      'Personal expenses & shopping',
      '5% GST',
      'Anything not mentioned in inclusions'
    ],
    itinerary: [
      { day: 1, title: 'Depart & Reach Bir', description: 'Overnight journey – check‑in, acclimatise, sunset walk, local cafés.' },
      { day: 2, title: 'Paragliding & Transfer to Rajgundha Base', description: 'Morning glide (weather permitting). Transfer + forest walk.' },
      { day: 3, title: 'Rajgundha Exploration', description: 'Valley hike, village interactions, bonfire evening.' },
      { day: 4, title: 'Drive to Jibhi', description: 'Waterfall visit, local market, optional trout tasting.' },
      { day: 5, title: 'Jibhi – Kasol', description: 'Transfer via scenic route, café hopping & riverside chill.' },
      { day: 6, title: 'Kasol – Kalga', description: 'Short hike to Kalga, meadow relaxation, sunset viewpoint.' },
      { day: 7, title: 'Return', description: 'Checkout & depart after breakfast.' }
    ],
    pricing: [
      { label: 'Triple Sharing', price: 12999, originalPrice: 15999, includes: ['All inclusions listed'] },
      { label: 'Dual Sharing', price: 14999, originalPrice: 17999 },
      { label: 'Solo (On Request)', price: 0, notes: 'Custom pricing available' }
    ],
    faqs: [
      { question: 'Is paragliding guaranteed?', answer: 'It is weather dependent; if cancelled you can opt for refund of the glide fee or shift slot.' },
      { question: 'Network availability?', answer: 'Bir & Kasol have decent 4G; Rajgundha & Kalga are patchy—use offline maps.' },
      { question: 'Age & fitness?', answer: 'Suitable for ages 12–55 with basic walking fitness. No technical trek sections.' }
    ],
    bookingNote: 'Early bird discount valid for the first 10 seats. Secure with a 40% advance.',
    trending: true,
    icon: 'mountain.png'
  },
  {
    slug: 'kashmir-paradise',
    name: 'Kashmir Paradise Circuit',
    region: 'Kashmir, India',
    shortTagline: 'Meadows, shikara rides & alpine dreams.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
    gallery: [
      'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg'
    ],
    duration: '6D / 5N',
    overview: ['Handcrafted scenic circuit across Srinagar, Gulmarg & Pahalgam with curated local stays.'],
    highlights: ['Shikara experience', 'Gulmarg meadows', 'Local wazwan tasting'],
    inclusions: ['Accommodation', 'Breakfast & Dinner', 'Internal transfers'],
    exclusions: ['Flight tickets', 'Lunch', 'Cable car tickets'],
    itinerary: [ { day: 1, title: 'Arrive Srinagar', description: 'Houseboat check‑in & lake sunset.' } ],
    pricing: [ { label: 'Standard', price: 18999 } ],
    faqs: [],
    bookingNote: 'Seasonal pricing varies.',
    icon: 'snow-storm.png'
  },
  {
    slug: 'jibhi-serene-retreat',
    name: 'Jibhi Serene Forest Retreat',
    region: 'Himachal Pradesh, India',
    shortTagline: 'Waterfalls, wooden homestays & slow-travel valley charm.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
    gallery: [],
    duration: '5D / 4N',
    difficulty: 'Easy',
    altitude: '2,200 m',
    bestSeason: 'Mar – Jun | Sep – Nov',
    overview: [
      'Jibhi offers a gentler Himachali atmosphere—pine scented trails, cascading streams & handcrafted wooden architecture.',
      'Designed for remote workers, creatives & leisure explorers wanting flexible day modules (short hikes, café blends, trout tasting).' 
    ],
    highlights: ['Jibhi Waterfall trail', 'Mini Thailand rock pools', 'Chehni Kothi heritage tower hike', 'Riverside café circuit', 'Optional Jalori Pass & Serolsar Lake'],
    inclusions: ['Surface transfers ex Aut / Bhuntar', 'Boutique homestay / lodge', 'Breakfast & Dinner', 'Guided heritage & waterfall walk', 'Basic first aid'],
    exclusions: ['Lunch', 'Any adventure add‑ons', 'Personal expenses', 'GST 5%'],
    itinerary: [
      { day: 1, title: 'Arrive & Settle', description: 'Check‑in, acclimatise, sunset stream walk.' },
      { day: 2, title: 'Waterfall & Heritage', description: 'Jibhi Waterfall + Chehni Kothi hike, evening bonfire.' },
      { day: 3, title: 'Jalori Pass Excursion', description: 'Drive & trek to Serolsar Lake (optional). Return via ridge viewpoints.' },
      { day: 4, title: 'Slow Day / Remote Work', description: 'Open schedule for café hopping, photography or optional trout farm visit.' },
      { day: 5, title: 'Departure', description: 'Breakfast & onward travel.' }
    ],
    pricing: [ { label: 'Standard', price: 10499 }, { label: 'Twin Sharing', price: 11499 } ],
    faqs: [ { question: 'Is Jalori Pass always accessible?', answer: 'Heavy snow can close access Dec–Feb; buffer routing or alternate activity provided.' } ],
    bookingNote: 'Mid-week batches available for workcation style stays.',
    icon: 'hills1.png'
  },
  {
    slug: 'kasol-manali-river-circuit',
    name: 'Kasol – Manali Chill & Adventure Circuit',
    region: 'Himachal Pradesh, India',
    shortTagline: 'Riverside cafés to alpine adventure hubs in one easy blend.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
    gallery: [],
    duration: '6D / 5N',
    difficulty: 'Easy',
    altitude: '2,050 m (Manali base)',
    bestSeason: 'Oct – Jun',
    overview: [ 'Balanced leisure + optional adventure add‑ons (rafting, paragliding, ATV) with curated café culture & village walks.' ],
    highlights: ['Parvati riverside cafés', 'Manali Old Town heritage walk', 'Solang Valley excursion', 'Optional adventure sports', 'Local Himachali Dham tasting'],
    inclusions: ['Transport ex Delhi/Chandigarh', 'Accommodation', 'Breakfast & Dinner', 'Solang / local sightseeing transfer', 'Trek / walk lead', 'First aid'],
    exclusions: ['Adventure activity fees', 'Lunch', 'Personal shopping', 'GST'],
    itinerary: [
      { day: 1, title: 'Delhi → Kasol', description: 'Overnight travel & check‑in; evening café crawl.' },
      { day: 2, title: 'Kasol Exploration', description: 'Chalal village walk & riverside downtime.' },
      { day: 3, title: 'Kasol → Manali', description: 'Transfer; Old Manali culture & music evening.' },
      { day: 4, title: 'Solang / Adventure Day', description: 'Cable / paragliding / ATV (optional).' },
      { day: 5, title: 'Leisure & Local Food', description: 'Free morning; visit Hadimba Temple & markets.' },
      { day: 6, title: 'Return', description: 'Depart after breakfast.' }
    ],
    pricing: [ { label: 'Triple', price: 13299 }, { label: 'Twin', price: 14299 } ],
    faqs: [ { question: 'Are adventure slots guaranteed?', answer: 'Weather & queue dependent; we pre‑coordinate but cannot guarantee extreme conditions clearance.' } ],
    bookingNote: 'Early summer batches fill fast. Book 30 days ahead for best pricing.',
    icon: 'hang-gliding.png'
  },
  {
    slug: 'kasol-manali-extended',
    name: 'Kasol – Manali Extended (Work & Wander)',
    region: 'Himachal Pradesh, India',
    shortTagline: 'Flexible longer format combining leisure + remote work modules.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
    gallery: [],
    duration: '10D / 9N',
    overview: [ 'Designed for remote professionals wanting stable Wi‑Fi pockets, interspersed with curated micro‑adventures & cultural immersion.' ],
    highlights: ['Cowork cafés', 'Short hikes', 'Local cuisine workshops', 'Optional weekend adventure bundle'],
    inclusions: ['Accommodation', 'Select breakfasts & dinners', 'Local orientation walks', 'Basic cowork guidance'],
    exclusions: ['Full meal plan', 'Adventure fees', 'Transit to base city'],
    itinerary: [ { day: 1, title: 'Arrival & Setup', description: 'Orientation & workspace check.' } ],
    pricing: [ { label: 'Long Stay Base', price: 25999 } ],
    faqs: [],
    icon: 'bush.png'
  },
  {
    slug: 'ladakh-leh-classic',
    name: 'Ladakh Leh High-Altitude Odyssey',
    region: 'Ladakh, India',
    shortTagline: 'Monasteries, moonscapes & turquoise high lakes.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg',
    gallery: [],
    duration: '7D / 6N',
    difficulty: 'Moderate',
    altitude: '5,359 m (Khardung La pass)',
    bestSeason: 'Jun – Sep',
    overview: [ 'Acclimatisation‑aware Ladakh circuit hitting cultural & landscape pillars: monasteries, high passes, Pangong & Nubra dunes.', 'Carefully staged elevation to reduce AMS risk.' ],
    highlights: ['Shanti Stupa sunset', 'Thiksey & Hemis monasteries', 'Pangong Lake', 'Nubra Valley dunes & Bactrian camels', 'Khardung La drive', 'Stargazing'],
    inclusions: ['Airport transfers', 'Inner line permits', 'Accommodation (standard hotels & camps)', 'Breakfast & Dinner', 'Oxygen cylinder on standby', 'Experienced Ladakh driver'],
    exclusions: ['Airfare to Leh', 'Lunch', 'Camel ride / ATV fees', 'GST 5%'],
    itinerary: [ { day: 1, title: 'Arrive Leh', description: 'Rest & acclimatise; evening market stroll.' } ],
    pricing: [ { label: 'Standard', price: 28999 }, { label: 'Premium', price: 34999 } ],
    faqs: [ { question: 'Is AMS common?', answer: 'Mild symptoms (headache, fatigue) can occur; we enforce hydration & rest windows.' } ],
    bookingNote: 'Avoid flying out same day after Pangong—buffer built in.',
    icon: 'snow-storm.png'
  },
  {
    slug: 'meghalaya-living-root',
    name: 'Meghalaya Living Root & Waterfall Trail',
    region: 'Meghalaya, India',
    shortTagline: 'Rainforest canyons, living bridges & blue pools.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
    gallery: [],
    duration: '6D / 5N',
    difficulty: 'Moderate',
    altitude: '1,500 m',
    bestSeason: 'Oct – Apr (Monsoon variant Jun–Aug)',
    overview: [ 'Curated eco‑adventure through Khasi & Jaintia hills blending culture with natural wonders: living root bridges, step trails & limestone pools.' ],
    highlights: ['Double decker root bridge trek', 'Dawki crystal river', 'Nohkalikai Falls', 'Mawlynnong clean village', 'Cave exploration (light)', 'Local Khasi cuisine'],
    inclusions: ['Surface transport ex Guwahati', 'Accommodation', 'Breakfast & Dinner', 'Guide for treks & caves', 'Entry fees (standard)'],
    exclusions: ['Lunch', 'Boat rides', 'Adventure caving upgrade', 'GST'],
    itinerary: [ { day: 1, title: 'Guwahati → Cherrapunji', description: 'Drive via viewpoints; check‑in.' } ],
    pricing: [ { label: 'Standard', price: 21499 } ],
    faqs: [],
    icon: 'bush.png'
  },
  {
    slug: 'rajasthan-royal-loop',
    name: 'Rajasthan Royal Heritage Loop',
    region: 'Rajasthan, India',
    shortTagline: 'Forts, frescoes & desert sunset dunes.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
    gallery: [],
    duration: '8D / 7N',
    overview: [ 'Jaipur–Jodhpur–Jaisalmer curated blend of architecture, craft markets & Thar desert camp night.' ],
    highlights: ['Amber Fort light', 'Blue lanes of Jodhpur', 'Sam Sand Dunes sunset', 'Haveli walk', 'Local cuisine workshop'],
    inclusions: ['AC transport', 'Accommodation', 'Breakfast', 'Desert camp dinner & cultural show'],
    exclusions: ['Monument camera fees', 'Lunch & remaining dinners', 'Camel safari'],
    itinerary: [ { day: 1, title: 'Arrive Jaipur', description: 'City orientation & local market.' } ],
    pricing: [ { label: 'Standard', price: 25999 } ],
    faqs: [],
    icon: 'dromedary.png'
  },
  {
    slug: 'sikkim-highland-explorer',
    name: 'Sikkim Highland Explorer',
    region: 'Sikkim, India',
    shortTagline: 'Monasteries, alpine lakes & tea ridge panoramas.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg',
    gallery: [],
    duration: '7D / 6N',
    overview: [ 'Gangtok–Lachen–Lachung route with Yumthang Valley bloom (seasonal) & Gurudongmar Lake (permits weather dependent).' ],
    highlights: ['Rumtek / Enchey monasteries', 'Gurudongmar Lake', 'Yumthang Valley', 'Local butter tea tasting'],
    inclusions: ['All permits', 'Transport', 'Accommodation', 'Breakfast & Dinner'],
    exclusions: ['Lunch', 'Personal oxygen canisters', 'GST'],
    itinerary: [ { day: 1, title: 'Arrive Gangtok', description: 'Evening MG Road leisure.' } ],
    pricing: [ { label: 'Standard', price: 31999 } ],
    faqs: [],
    icon: 'buddha.png'
  },
  {
    slug: 'spiti-valley-expedition',
    name: 'Spiti Valley Expedition',
    region: 'Himachal Pradesh, India',
    shortTagline: 'High desert monasteries, fossil villages & lunar valleys.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
    gallery: [],
    duration: '9D / 8N',
    difficulty: 'Moderate',
    altitude: '4,590 m (Komic vicinity)',
    bestSeason: 'Jun – Oct',
    overview: [ 'Overland expedition through the Trans‑Himalayan cold desert linking cultural gompas, fossil rich plateaus & stark canyon vistas.', 'Altitude paced to allow acclimatisation with hydration & rest windows built in.' ],
    highlights: ['Key Monastery sunrise', 'Hikkim (high altitude post)', 'Komic & Langza villages', 'Pin Valley landscapes', 'Chicham bridge', 'Stargazing & astrophotography'],
    inclusions: ['Surface transport (SUV/tempo 4×4 segments)', 'Accommodation (guesthouses & homestays)', 'Breakfast & Dinner', 'Basic oxygen cylinder', 'Local cultural guide (select days)'],
    exclusions: ['Lunch', 'Camera / monastery donation', 'GST 5%', 'Travel insurance'],
    itinerary: [ { day: 1, title: 'Shimla / Manali Base', description: 'Arrivals & briefing.' } ],
    pricing: [ { label: 'Standard', price: 27999 }, { label: 'Premium (Small Group)', price: 32999 } ],
    faqs: [ { question: 'Is Spiti suitable for first timers?', answer: 'Recommended to have prior hill travel; altitude & long drives can be taxing.' } ],
    icon: 'mountain.png'
  }
  ,
  {
    slug: 'turkey-cappadocia-ephesus',
    name: 'Turkey Cappadocia & Heritage Circuit',
    region: 'Turkey',
    shortTagline: 'Fairy chimneys, balloon dawns & Mediterranean antiquity.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/4.svg',
    gallery: [],
    duration: '8D / 7N',
    overview: [ 'Istanbul–Cappadocia–Pamukkale–Ephesus curated classic spanning geology wonders & cultural layers.' ],
    highlights: ['Hot air balloon ride (weather)', 'Goreme open air museum', 'Cotton terraces of Pamukkale', 'Ephesus ancient ruins', 'Bosphorus cruise'],
    inclusions: ['Internal flights (IST–NAV)', 'Accommodation', 'Breakfast', 'Airport transfers', 'English speaking guide (select tours)'],
    exclusions: ['International airfare', 'Balloon fee', 'Lunch & dinner', 'Entry tickets (multi‑site pass optional)'],
    itinerary: [ { day: 1, title: 'Arrive Istanbul', description: 'Evening leisure / optional cruise.' } ],
    pricing: [ { label: 'Standard', price: 79999 } ],
    faqs: [],
    icon: 'hot-air-balloon.png'
  },
  {
    slug: 'andaman-islands-discovery',
    name: 'Andaman Islands Discovery',
    region: 'Andaman & Nicobar, India',
    shortTagline: 'Turquoise lagoons, coral dives & colonial heritage.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/3.svg',
    gallery: [],
    duration: '6D / 5N',
    overview: [ 'Port Blair–Havelock–Neil Island island‑hopping circuit focusing on beaches, reefs & light eco experiences.' ],
    highlights: ['Radhanagar Beach sunset', 'Snorkel / dive session', 'Light & Sound show Cellular Jail', 'Neil Island natural bridge'],
    inclusions: ['Inter-island ferry tickets', 'Accommodation', 'Breakfast', 'Airport transfers'],
    exclusions: ['Scuba course fees', 'Lunch & dinner', 'GST'],
    itinerary: [ { day: 1, title: 'Arrive Port Blair', description: 'Cellular Jail & show.' } ],
    pricing: [ { label: 'Standard', price: 33999 } ],
    faqs: [],
    icon: 'island.png'
  },
  {
    slug: 'bali-culture-adventure',
    name: 'Bali Culture & Adventure Blend',
    region: 'Bali, Indonesia',
    shortTagline: 'Rice terraces, surf breaks & jungle temples.',
    heroImage: 'https://triplinkadventures.com/wp-content/uploads/2025/07/5.svg',
    gallery: [],
    duration: '7D / 6N',
    overview: [ 'South Bali coast + Ubud highland fusion: culture, waterfalls, optional volcano sunrise & reef snorkelling.' ],
    highlights: ['Uluwatu cliffs', 'Tegallalang rice terraces', 'Sacred Monkey Forest', 'Mount Batur sunrise (optional)', 'Nusa Penida day trip'],
    inclusions: ['Airport transfers', 'Accommodation (split stay)', 'Breakfast', 'Private transport driver-guide'],
    exclusions: ['International flights', 'Lunch & dinner', 'Entrance & activity tickets bundle'],
    itinerary: [ { day: 1, title: 'Arrive & Beach Ease', description: 'Check‑in & sunset coastal temple.' } ],
    pricing: [ { label: 'Standard', price: 58999 } ],
    faqs: [],
    icon: 'hot-air-balloon.png'
  }
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return destinations.find(d => d.slug === slug);
}

export function getAllDestinationSlugs(): string[] {
  return destinations.map(d => d.slug);
}

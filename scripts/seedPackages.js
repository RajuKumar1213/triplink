import mongoose from "mongoose";
import connectDb from "../src/db/connectDb.js";
import Package from "../src/models/Package.js";

const seedPackages = [
  {
    name: "Everest Base Camp Trek",
    region: "Nepal Himalayas",
    shortTagline: "Conquer the world's highest peak base camp",
    heroImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
      "https://images.unsplash.com/photo-1464822759844-d150bb3817b?w=800",
    ],
    duration: "14 Days",
    difficulty: "Challenging",
    altitude: "5,364m",
    bestSeason: "March to May, September to November",
    category: "adventure-treks",
    overview: [
      "Experience the ultimate Himalayan adventure",
      "Trek to the base camp of Mount Everest",
      "Witness breathtaking mountain views",
      "Immerse in Sherpa culture and traditions",
    ],
    highlights: [
      "Everest Base Camp at 5,364m",
      "Kala Patthar viewpoint",
      "Tengboche Monastery",
      "Sherpa villages and culture",
    ],
    inclusions: [
      "All meals during trek",
      "Licensed guide and porters",
      "TIMS card and permits",
      "Accommodation in teahouses",
      "Emergency evacuation insurance",
    ],
    exclusions: [
      "International flights",
      "Personal trekking gear",
      "Travel insurance",
      "Tips and gratuities",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description:
          "Arrive in Kathmandu and transfer to hotel. Evening cultural show.",
        activities: ["Airport pickup", "Hotel check-in", "Cultural dinner"],
      },
      {
        day: 2,
        title: "Fly to Lukla and trek to Phakding",
        description:
          "Early morning flight to Lukla, start trekking to Phakding.",
        activities: ["Flight to Lukla", "Trek to Phakding", "Acclimatization"],
      },
      {
        day: 3,
        title: "Trek to Namche Bazaar",
        description:
          "Trek through beautiful forests to Namche Bazaar, the gateway to Everest.",
        activities: ["Trek to Namche", "Market visit", "Everest view"],
      },
    ],
    pricing: [
      {
        label: "Standard Package",
        price: 1800,
        originalPrice: 2000,
        includes: ["Guide", "Meals", "Accommodation"],
        notes: "Best value for solo travelers",
      },
      {
        label: "Premium Package",
        price: 2200,
        includes: ["Private guide", "Luxury accommodation", "Porter"],
        notes: "For those seeking comfort",
      },
    ],
    faqs: [
      {
        question: "What is the best time to do Everest Base Camp trek?",
        answer:
          "March to May and September to November are the best seasons with clear weather and stable conditions.",
      },
      {
        question: "Do I need previous trekking experience?",
        answer:
          "Basic fitness and some trekking experience is recommended, but our guides will support you throughout.",
      },
    ],
    bookingNote:
      "Book at least 3 months in advance. Medical certificate required.",
    trending: true,
    icon: "https://images.unsplash.com/photo-1464822759844-d150bb3817b?w=100",
  },
  {
    name: "Annapurna Circuit Trek",
    region: "Nepal Himalayas",
    shortTagline: "Complete circuit around the Annapurna massif",
    heroImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    ],
    duration: "16 Days",
    difficulty: "Moderate to Challenging",
    altitude: "5,416m",
    bestSeason: "March to May, September to November",
    category: "adventure-treks",
    overview: [
      "One of the most diverse treks in Nepal",
      "Complete circuit around Annapurna mountains",
      "Experience different climates and cultures",
      "Spectacular mountain views throughout",
    ],
    highlights: [
      "Thorong La Pass (5,416m)",
      "Muktinath Temple",
      "Marpha village",
      "Pokhara lakeside",
    ],
    inclusions: [
      "All meals during trek",
      "Licensed guide and porters",
      "TIMS card and ACAP permit",
      "Teahouse accommodation",
      "Emergency medical kit",
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
      "Hot showers",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        description: "Welcome to Nepal! Transfer to hotel and trek briefing.",
        activities: ["Airport transfer", "Hotel check-in", "Trek preparation"],
      },
      {
        day: 2,
        title: "Drive to Pokhara and trek to Nayapul",
        description: "Scenic drive to Pokhara, then start trekking to Nayapul.",
        activities: ["Drive to Pokhara", "Trek to Nayapul", "Acclimatization"],
      },
    ],
    pricing: [
      {
        label: "Standard Trek",
        price: 1200,
        includes: ["Guide", "Meals", "Basic accommodation"],
        notes: "Perfect for budget travelers",
      },
      {
        label: "Comfort Trek",
        price: 1600,
        originalPrice: 1800,
        includes: ["Guide", "Meals", "Better accommodation"],
        notes: "More comfortable option",
      },
    ],
    faqs: [
      {
        question: "Is Annapurna Circuit difficult?",
        answer:
          "It's moderate to challenging with some steep sections, but suitable for most fit individuals.",
      },
    ],
    bookingNote: "Early booking recommended. Fitness certificate advised.",
    trending: false,
    icon: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100",
  },
  {
    name: "Bhutan Cultural Tour",
    region: "Bhutan Himalayas",
    shortTagline: "Discover the Last Shangri-La",
    heroImage:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    ],
    duration: "8 Days",
    difficulty: "Easy",
    altitude: "2,500m - 3,800m",
    bestSeason: "March to May, September to November",
    category: "cultural-tours",
    overview: [
      "Experience Bhutan's unique culture",
      "Visit ancient monasteries and fortresses",
      "Immerse in Buddhist traditions",
      "Spectacular Himalayan scenery",
    ],
    highlights: [
      "Paro Taktsang Monastery",
      "Punakha Dzong",
      "Dochula Pass",
      "Thimphu city tour",
    ],
    inclusions: [
      "All meals and accommodation",
      "Licensed guide",
      "All permits and entrance fees",
      "Cultural performances",
      "Ground transportation",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Druk Air flights",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Paro",
        description: "Welcome to Bhutan! Transfer to Thimphu.",
        activities: ["Airport welcome", "Drive to Thimphu", "City tour"],
      },
      {
        day: 2,
        title: "Thimphu Sightseeing",
        description: "Explore Bhutan's capital city.",
        activities: [
          "National Memorial Chorten",
          "Tashichho Dzong",
          "Local market",
        ],
      },
    ],
    pricing: [
      {
        label: "Standard Tour",
        price: 2500,
        includes: ["All meals", "Guide", "3-star hotels"],
        notes: "Includes sustainable development fee",
      },
      {
        label: "Luxury Tour",
        price: 3500,
        includes: ["All meals", "Guide", "5-star hotels"],
        notes: "Premium accommodation and services",
      },
    ],
    faqs: [
      {
        question: "Do I need a visa for Bhutan?",
        answer:
          "Yes, all tourists need a visa. We handle the visa process for you.",
      },
      {
        question: "What is the sustainable development fee?",
        answer:
          "It's a mandatory fee of $250 per person per night to support Bhutan's development.",
      },
    ],
    bookingNote: "Book 3-6 months in advance. Minimum daily tariff applies.",
    trending: true,
    icon: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100",
  },
  {
    name: "Kashmir Valley Tour",
    region: "Kashmir, India",
    shortTagline: "Paradise on Earth",
    heroImage:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    ],
    duration: "7 Days",
    difficulty: "Easy",
    altitude: "1,600m - 3,800m",
    bestSeason: "April to October",
    category: "cultural-tours",
    overview: [
      "Explore the beautiful Kashmir Valley",
      "Visit Mughal gardens and houseboats",
      "Experience Kashmiri culture",
      "Stunning mountain and lake views",
    ],
    highlights: [
      "Dal Lake houseboat stay",
      "Mughal Gardens",
      "Gulmarg meadows",
      "Shalimar Bagh",
    ],
    inclusions: [
      "All meals and accommodation",
      "Local guide",
      "Transportation",
      "Houseboat stay",
      "Garden entrance fees",
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
      "Camera fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar",
        description: "Welcome to Kashmir! Transfer to houseboat.",
        activities: [
          "Airport transfer",
          "Houseboat check-in",
          "City orientation",
        ],
      },
      {
        day: 2,
        title: "Srinagar Sightseeing",
        description: "Explore the city and its famous gardens.",
        activities: ["Mughal Gardens", "Local market", "Shikara ride"],
      },
    ],
    pricing: [
      {
        label: "Standard Package",
        price: 800,
        includes: ["Meals", "Houseboat", "Local transport"],
        notes: "Comfortable houseboat accommodation",
      },
      {
        label: "Deluxe Package",
        price: 1200,
        includes: ["Meals", "Luxury houseboat", "Private transport"],
        notes: "Premium experience with luxury amenities",
      },
    ],
    faqs: [
      {
        question: "What is the best time to visit Kashmir?",
        answer:
          "April to October is ideal, with July-August being the peak season for flower blooms.",
      },
      {
        question: "Are houseboats safe?",
        answer:
          "Yes, houseboats are a traditional and safe accommodation option in Dal Lake.",
      },
    ],
    bookingNote:
      "Book in advance during peak season. Weather can be unpredictable.",
    trending: false,
    icon: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=100",
  },
  {
    name: "Rajasthan Heritage Tour",
    region: "Rajasthan, India",
    shortTagline: "Land of Kings and Palaces",
    heroImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800",
    ],
    duration: "10 Days",
    difficulty: "Easy",
    altitude: "100m - 500m",
    bestSeason: "October to March",
    category: "cultural-tours",
    overview: [
      "Discover Rajasthan's royal heritage",
      "Visit magnificent palaces and forts",
      "Experience desert safari",
      "Immerse in Rajasthani culture",
    ],
    highlights: [
      "Amber Fort, Jaipur",
      "City Palace, Udaipur",
      "Jaisalmer Fort",
      "Desert safari in Jaisalmer",
    ],
    inclusions: [
      "All meals and accommodation",
      "Local guide",
      "Transportation",
      "Fort and palace entrance fees",
      "Camel safari",
    ],
    exclusions: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
      "Camera fees",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Delhi",
        description: "Welcome to India! Transfer to Jaipur.",
        activities: ["Airport transfer", "Drive to Jaipur", "Hotel check-in"],
      },
      {
        day: 2,
        title: "Jaipur Sightseeing",
        description: "Explore the Pink City of Jaipur.",
        activities: ["Amber Fort", "City Palace", "Hawa Mahal"],
      },
    ],
    pricing: [
      {
        label: "Heritage Package",
        price: 1000,
        includes: ["Meals", "Hotels", "Local transport"],
        notes: "Focus on heritage sites",
      },
      {
        label: "Royal Package",
        price: 1500,
        includes: ["Meals", "Heritage hotels", "Private transport"],
        notes: "Luxury experience in heritage properties",
      },
    ],
    faqs: [
      {
        question: "What should I wear in Rajasthan?",
        answer:
          "Light cotton clothing, comfortable walking shoes, and something to cover shoulders for temples.",
      },
      {
        question: "Is Rajasthan safe for tourists?",
        answer:
          "Yes, Rajasthan is generally safe for tourists with proper precautions.",
      },
    ],
    bookingNote: "Book 2-3 months in advance during peak season.",
    trending: true,
    icon: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=100",
  },
];

async function seedDatabase() {
  try {
    await connectDb();
    console.log("Connected to database");

    // Clear existing packages
    await Package.deleteMany({});
    console.log("Cleared existing packages");

    // Insert seed data
    const packages = await Package.insertMany(seedPackages);
    console.log(`Successfully seeded ${packages.length} packages`);

    // Log the created packages
    packages.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.name} - ${pkg.slug}`);
    });

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

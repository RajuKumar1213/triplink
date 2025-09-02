import { NextResponse } from "next/server";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/db/connectDb";
import Blog from "@/models/Blog";

const seedBlogs = [
  {
    title: "The Ultimate Guide to Himachal Pradesh",
    slug: "ultimate-guide-himachal-pradesh",
    excerpt: "Discover the breathtaking beauty of Himachal Pradesh with our comprehensive travel guide covering Shimla, Manali, and hidden gems.",
    content: `<p>Himachal Pradesh, the "Land of Gods," is a paradise nestled in the heart of the Himalayas. This enchanting state offers everything from snow-capped mountains to lush green valleys, making it a perfect destination for adventure seekers and peace lovers alike.</p>

<h2>Must-Visit Destinations</h2>

<h3>Shimla - The Queen of Hills</h3>
<p>Shimla, the capital city of Himachal Pradesh, is famous for its colonial architecture and pleasant climate. The Mall Road offers spectacular views and shopping opportunities, while the Shimla-Kalka toy train provides a scenic journey through the mountains.</p>

<h3>Manali - Adventure Capital</h3>
<p>Manali is a haven for adventure enthusiasts. From paragliding in Solang Valley to trekking in the Parvati Valley, there's something for everyone. The town also serves as a gateway to the famous Rohtang Pass.</p>

<h3>Dharamshala - The Little Lhasa</h3>
<p>Home to the Dalai Lama, Dharamshala offers a unique blend of Tibetan culture and natural beauty. McLeod Ganj, the upper reaches of Dharamshala, is perfect for those seeking spiritual peace.</p>

<h2>Best Time to Visit</h2>
<p>The best time to visit Himachal Pradesh depends on your preferences:</p>
<ul>
<li><strong>Summer (March to June):</strong> Perfect for sightseeing and outdoor activities</li>
<li><strong>Monsoon (July to September):</strong> Lush greenery but occasional landslides</li>
<li><strong>Winter (October to February):</strong> Snow activities and clear mountain views</li>
</ul>

<h2>Travel Tips</h2>
<p>Here are some essential tips for your Himachal Pradesh adventure:</p>
<ul>
<li>Pack layers of clothing as temperatures can vary significantly</li>
<li>Book accommodations in advance during peak season</li>
<li>Carry motion sickness medication for winding mountain roads</li>
<li>Respect local customs and traditions</li>
<li>Stay hydrated and protect yourself from sun exposure</li>
</ul>

<p>Himachal Pradesh promises an unforgettable experience with its pristine beauty, rich culture, and warm hospitality. Whether you're seeking adventure or tranquility, this Himalayan gem has something special waiting for you.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "destinations",
    tags: ["himachal", "mountains", "adventure", "travel-guide"],
    isPublished: true,
    views: 245
  },
  {
    title: "Kerala Backwaters: A Serene Journey",
    slug: "kerala-backwaters-serene-journey",
    excerpt: "Experience the tranquil beauty of Kerala's backwaters with our detailed guide to houseboats, local culture, and hidden gems.",
    content: `<p>Kerala's backwaters are a network of interconnected canals, rivers, lakes, and inlets along the Arabian Sea coast. This unique ecosystem offers one of the most peaceful and scenic experiences in India.</p>

<h2>The Houseboat Experience</h2>
<p>Staying on a traditional Kerala houseboat (Kettuvallam) is an experience like no other. These converted rice barges offer modern amenities while maintaining their traditional charm. Wake up to the gentle lapping of water and panoramic views of coconut groves.</p>

<h2>Top Backwater Destinations</h2>

<h3>Alleppey (Alappuzha)</h3>
<p>Known as the "Venice of the East," Alleppey is the most popular backwater destination. The town offers various houseboat options and is famous for its annual snake boat races.</p>

<h3>Kumarakom</h3>
<p>A quieter alternative to Alleppey, Kumarakom is perfect for bird watching and luxury resort experiences. The Kumarakom Bird Sanctuary is home to numerous migratory birds.</p>

<h3>Kollam</h3>
<p>The gateway to Kerala's backwaters, Kollam offers the longest backwater cruise experience. The journey from Kollam to Alleppey takes about 8 hours and covers the most scenic routes.</p>

<h2>Local Culture and Cuisine</h2>
<p>The backwater region is rich in culture and tradition. Experience:</p>
<ul>
<li>Traditional Kerala cuisine prepared with fresh coconut and spices</li>
<li>Kathakali performances and classical music</li>
<li>Village life and local fishing communities</li>
<li>Ayurvedic treatments and spa experiences</li>
<li>Coir making and other traditional crafts</li>
</ul>

<h2>Best Time to Visit</h2>
<p>October to March is the ideal time to visit Kerala's backwaters when the weather is pleasant and humidity is lower. The monsoon season (June to September) brings lush greenery but can be challenging for outdoor activities.</p>

<p>Kerala's backwaters offer a perfect escape from the hustle and bustle of city life. The serene waters, lush landscapes, and warm hospitality make it a must-visit destination for anyone seeking peace and natural beauty.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "destinations",
    tags: ["kerala", "backwaters", "houseboat", "nature"],
    isPublished: true,
    views: 189
  },
  {
    title: "Rajasthan: Land of Kings and Colors",
    slug: "rajasthan-land-of-kings-colors",
    excerpt: "Explore the royal heritage, vibrant culture, and architectural marvels of Rajasthan with our comprehensive travel guide.",
    content: `<p>Rajasthan, the largest state in India, is a land of royal heritage, magnificent palaces, and vibrant culture. From the golden sands of the Thar Desert to the blue city of Jodhpur, Rajasthan offers an incredible diversity of experiences.</p>

<h2>Royal Cities to Explore</h2>

<h3>Jaipur - The Pink City</h3>
<p>The capital city of Rajasthan, Jaipur is famous for its pink-colored buildings and rich history. Visit the magnificent Amber Fort, the intricate Hawa Mahal, and the astronomical wonder Jantar Mantar.</p>

<h3>Udaipur - The City of Lakes</h3>
<p>Often called the "Venice of the East," Udaipur is renowned for its beautiful lakes, romantic palaces, and stunning architecture. The City Palace and Lake Pichola are must-visit attractions.</p>

<h3>Jodhpur - The Blue City</h3>
<p>Dominated by the mighty Mehrangarh Fort, Jodhpur offers spectacular views of the blue-painted old city. The fort houses one of India's finest museums and offers breathtaking sunset views.</p>

<h3>Jaisalmer - The Golden City</h3>
<p>Rising from the golden sands of the Thar Desert, Jaisalmer is famous for its yellow sandstone architecture. The Jaisalmer Fort, still inhabited, is a UNESCO World Heritage Site.</p>

<h2>Cultural Experiences</h2>
<p>Rajasthan's rich culture comes alive through:</p>
<ul>
<li>Folk music and dance performances</li>
<li>Traditional puppet shows</li>
<li>Camel safaris in the desert</li>
<li>Staying in heritage hotels and palaces</li>
<li>Exploring local markets and handicrafts</li>
<li>Experiencing royal Rajasthani cuisine</li>
</ul>

<h2>Desert Adventures</h2>
<p>The Thar Desert offers unique experiences including camel safaris, camping under the stars, and watching spectacular sunsets over sand dunes. Pushkar and Sam Sand Dunes near Jaisalmer are popular desert destinations.</p>

<h2>Best Time to Visit</h2>
<p>October to March is the ideal time to visit Rajasthan when the weather is pleasant for sightseeing. Summer months (April to June) can be extremely hot, especially in desert areas.</p>

<p>Rajasthan is a photographer's paradise and a history lover's dream. The state's royal heritage, architectural marvels, and vibrant culture create an unforgettable travel experience that transports you to a bygone era of kings and queens.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "destinations",
    tags: ["rajasthan", "heritage", "desert", "palaces"],
    isPublished: true,
    views: 312
  },
  {
    title: "Goa: Beyond Beaches and Parties",
    slug: "goa-beyond-beaches-parties",
    excerpt: "Discover the hidden side of Goa with our guide to heritage sites, spice plantations, and authentic local experiences.",
    content: `<p>While Goa is famous for its beaches and vibrant nightlife, this coastal paradise offers much more than sun, sand, and parties. Discover the cultural richness, Portuguese heritage, and natural beauty that make Goa a diverse destination.</p>

<h2>Historical and Cultural Attractions</h2>

<h3>Old Goa</h3>
<p>Once the capital of Portuguese India, Old Goa is home to magnificent churches and convents. The Basilica of Bom Jesus, a UNESCO World Heritage Site, houses the remains of St. Francis Xavier.</p>

<h3>Fontainhas - Latin Quarter</h3>
<p>The colorful Portuguese quarter of Panaji showcases beautiful colonial architecture with narrow winding streets, art galleries, and charming cafes.</p>

<h3>Spice Plantations</h3>
<p>Visit the aromatic spice plantations in the Western Ghats where you can learn about organic farming, enjoy traditional Goan meals, and experience the region's agricultural heritage.</p>

<h2>Off-the-Beaten-Path Experiences</h2>
<ul>
<li><strong>Dudhsagar Falls:</strong> One of India's tallest waterfalls, best visited during monsoon</li>
<li><strong>Bhagwan Mahavir Wildlife Sanctuary:</strong> Home to diverse flora and fauna</li>
<li><strong>Chorla Ghat:</strong> Scenic mountain pass with stunning valley views</li>
<li><strong>Divar Island:</strong> Peaceful island accessible by ferry with traditional village life</li>
<li><strong>Netravali Wildlife Sanctuary:</strong> Known for its bubble lake and biodiversity</li>
</ul>

<h2>Authentic Goan Cuisine</h2>
<p>Beyond beach shacks, explore authentic Goan cuisine including:</p>
<ul>
<li>Fish curry rice - the staple meal</li>
<li>Vindaloo and Xacuti - spicy Portuguese-influenced curries</li>
<li>Bebinca - traditional layered dessert</li>
<li>Feni - local cashew or palm spirit</li>
<li>Prawn balchão - tangy pickled prawns</li>
</ul>

<h2>Local Markets and Shopping</h2>
<p>Experience the vibrant local markets:</p>
<ul>
<li><strong>Mapusa Market:</strong> Friday market with fresh produce and spices</li>
<li><strong>Anjuna Flea Market:</strong> Wednesday market with handicrafts and souvenirs</li>
<li><strong>Saturday Night Market, Arpora:</strong> Food, shopping, and entertainment</li>
</ul>

<h2>Sustainable Tourism</h2>
<p>Experience responsible travel by:</p>
<ul>
<li>Supporting local communities and businesses</li>
<li>Choosing eco-friendly accommodations</li>
<li>Participating in beach cleanup activities</li>
<li>Respecting local customs and traditions</li>
</ul>

<p>Goa's charm lies not just in its beaches but in its rich history, diverse culture, and warm hospitality. Take time to explore beyond the coastline and discover the soul of this beautiful destination.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "destinations",
    tags: ["goa", "culture", "heritage", "sustainable-travel"],
    isPublished: true,
    views: 198
  },
  {
    title: "Essential Travel Tips for First-Time India Visitors",
    slug: "essential-travel-tips-first-time-india-visitors",
    excerpt: "A comprehensive guide for first-time visitors to India covering cultural etiquette, safety tips, and practical advice for a smooth journey.",
    content: `<p>Traveling to India for the first time can be overwhelming yet incredibly rewarding. This diverse country offers a sensory overload of colors, sounds, flavors, and experiences. Here's your essential guide to navigating India like a pro.</p>

<h2>Before You Travel</h2>

<h3>Visa and Documentation</h3>
<p>Most visitors need a visa to enter India. The e-Tourist Visa is the most convenient option for tourism purposes. Ensure your passport is valid for at least 6 months from your entry date.</p>

<h3>Vaccinations and Health</h3>
<p>Consult your doctor about recommended vaccinations including Hepatitis A, Hepatitis B, Typhoid, and Japanese Encephalitis. Consider malaria prophylaxis for certain regions.</p>

<h3>Travel Insurance</h3>
<p>Comprehensive travel insurance is essential. Ensure it covers medical emergencies, trip cancellations, and adventure activities if planned.</p>

<h2>Cultural Etiquette</h2>

<h3>Dress Code</h3>
<ul>
<li>Dress modestly, especially when visiting religious sites</li>
<li>Remove shoes before entering temples and homes</li>
<li>Cover shoulders and knees in sacred places</li>
<li>Carry a scarf or shawl for covering head when required</li>
</ul>

<h3>Social Customs</h3>
<ul>
<li>Greet with "Namaste" (hands pressed together)</li>
<li>Use your right hand for eating and giving/receiving items</li>
<li>Avoid public displays of affection</li>
<li>Ask permission before photographing people</li>
</ul>

<h2>Health and Safety</h2>

<h3>Food and Water Safety</h3>
<ul>
<li>Drink only bottled or filtered water</li>
<li>Eat at busy restaurants with high turnover</li>
<li>Avoid raw vegetables and unpeeled fruits</li>
<li>Be cautious with street food initially</li>
<li>Carry hand sanitizer and use it frequently</li>
</ul>

<h3>Personal Safety</h3>
<ul>
<li>Keep copies of important documents</li>
<li>Use registered taxis or ride-sharing apps</li>
<li>Avoid displaying expensive items</li>
<li>Trust your instincts in crowded places</li>
<li>Learn basic Hindi phrases for emergencies</li>
</ul>

<h2>Transportation</h2>

<h3>Trains</h3>
<p>The Indian railway system is extensive and affordable. Book tickets in advance and choose AC classes for longer journeys. Download the IRCTC app for booking and checking schedules.</p>

<h3>Flights</h3>
<p>Domestic flights are reasonably priced and save time for long distances. Book in advance for better deals and choose reputable airlines.</p>

<h3>Local Transport</h3>
<ul>
<li>Auto-rickshaws: Negotiate fare beforehand or use meter</li>
<li>Taxi apps: Uber and Ola are widely available in cities</li>
<li>Local buses: Cheap but can be crowded</li>
<li>Metro: Available in major cities, clean and efficient</li>
</ul>

<h2>Money Matters</h2>
<ul>
<li>Carry a mix of cash and cards</li>
<li>Small denominations are useful for tips and small purchases</li>
<li>Inform your bank about travel plans</li>
<li>ATMs are widely available in cities</li>
<li>Bargaining is common in markets</li>
</ul>

<h2>Communication</h3>
<ul>
<li>Buy a local SIM card for cheaper data and calls</li>
<li>Download offline maps and translation apps</li>
<li>Learn basic Hindi or local language phrases</li>
<li>English is widely spoken in tourist areas</li>
</ul>

<h2>What to Pack</h2>
<ul>
<li>Comfortable walking shoes</li>
<li>Modest clothing suitable for the climate</li>
<li>Sunscreen and insect repellent</li>
<li>Basic medications and first aid kit</li>
<li>Power bank and universal adapter</li>
<li>Water purification tablets</li>
</ul>

<p>India is a country that will challenge and reward you in equal measure. Embrace the chaos, stay flexible with your plans, and approach each experience with an open mind. The warmth and hospitality of the Indian people will make your journey truly unforgettable.</p>`,
    featuredImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "tips",
    tags: ["travel-tips", "first-time", "india", "safety"],
    isPublished: true,
    views: 456
  }
];

export const POST = asyncHandler(async () => {
  await connectDb();

  try {
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log("Cleared existing blogs");

    // Insert seed data
    const blogs = await Blog.insertMany(seedBlogs);
    console.log(`Successfully seeded ${blogs.length} blogs`);

    return NextResponse.json(
      {
        success: true,
        message: `Successfully seeded ${blogs.length} blogs`,
        data: blogs.map((blog) => ({
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          isPublished: blog.isPublished,
        })),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding blogs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed blogs" },
      { status: 500 }
    );
  }
});

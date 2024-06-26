require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Package = require("../models/package.model");

// Create package data
  const packages = [
    {
      destinationId: "667471d084ccda8d5a96158c",
      packageName: "Stunning Vietnam Centre Beauty in 7 incredible days",
      noOfDays: 7,
      overviewDetails: "uploads/climate/Vietnam-weather.png",
      packageImage:"uploads/packages/vietnam/banner.png",
      amountPerPerson:150,
      locations:"Danang - Hoi An – My Son Sanctuary - Hue – Bach Ma National Park",
      highlights: ["Be enchanted by the charms of Hoi An ancient town.","Learn Vietnamese history under the Nguyen Dynasty through the royal tombs & ancient citadel in Hue.","Back to the mother nature by visiting Bach Ma National Park","Explore My Son Sanctuary – recognized as a world heritage site.","Relax at the beaches."],
      itinerary:[
        {
          shortDescription:"Day 1:Landing in Da Nang - drive to Hoi An.",
          longDescription:"Upon arrival at Da Nang International Airport, you will be greeted by the guide and transferred to the hotel in Hoi An. Please look for the Asia Pathfinders welcome sign in the arrival hall. The journey is about 40 minutes from Da Nang, the third-largest seaport city in Vietnam, to the ancient town of Hoi An. Hoi An is a charming World Heritage village that is being beautifully restored and preserved and will captivate you immediately. No matter what you like, you will find it here, whether it is shopping, restaurants, photography, history, architecture, golf, fishing, swimming, scuba, abseiling, massage, or lazing around. Hoi An has become famous for its tailoring, where there is a huge variety of fabrics to choose from.",
          meal:"Not Included",
          image:"uploads/packages/vietnam/day1.png"
        },
        {
          shortDescription:"Day 2:Hoi An: Visit the ancient town & learn to make a lantern.",
          longDescription:"Hoi An offers a respite from the hustle and bustle of Ho Chi Minh City, allowing your family to unwind and slowly absorb the charms of this small town on the coast. You can experience a slow-paced lifestyle by taking a city tour of UNESCO landmarks.On your walking tour, you will stop by a private house where the same family has lived for hundreds of years in a traditional way and one of the family chapels built by wealthy merchants or official families as places to honor their ancestors.Continue to the Sa Huynh Museum, which contains exhibitions from the earliest period of Hoi An’s history. Finally, continue to the famous Japanese Covered Bridge Pagoda, first constructed in 1593 by the Japanese community of Hoi An to link the town with the Chinese quarters across the stream. The second part of this morning is learning how to make a colorful lantern. You will visit a family with a tradition of making lanterns. Here, you can see many different types of lanterns, and with the guidance of a lantern craftsman, you will make your favorite lantern. Enjoy a tasty lunch in a local restaurant and walk back to the hotel. It’s time for your children to enjoy the hotel’s swimming pool and relax at the beach while you can try massage packages, which are inexpensive, enjoyable, and relaxing. Overnight in Hoi An.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day2.png"
        },
        {
          shortDescription:"Day 3:Hoi An: A half-day tour to discover My Son Sanctuary.",
          longDescription:"After breakfast, depart Hoi An for the 50-kilometer journey to My Son, which is a collection of temple ruins constructed between the 4th and 14th centuries by the kings of Champa. Influenced by Hinduism, these temples were places for worshipping Shiva and Vishnu. During the war, it became a base for the Viet Cong, which forced US bombing, leaving 20 of the 70 structures intact. The tour of the ruins takes approximately 1.5 hours. Lunch and dinner are on your own. The afternoon is free at your leisure. A free afternoon at your leisure. Dinner is on your own. You may choose to lounge by your resort pool, swim at the beach, or indulge in a massage, facial, or pedicure. For those wanting action, optional activities include a half-day countryside cycling tour, fishing, or a photography tour. We can include any of these in your itinerary. Overnight in Hoi An.",
          meal:"Breakfast, Lunch"
        },
        {
          shortDescription:"Day 4:Drive to Hue: Back of the bike tour in Hue.",
          longDescription:"After breakfast, you will be collected by your private guide and transferred in a private vehicle (approximately 4 hours) to the Royal City of Hue. You will stop to visit Marble Mountain, Non-Nuoc Stone Carving Village, and My Khe Beach which was home to American GIs during the war. Then, you will be driven over the Hai Van Pass. It is the highest and most beautiful pass in Vietnam (about 500 meters above sea level). There are some amazing views from the top and great photo opportunities. Arrive in Hue after midday and have lunch in a local restaurant. After lunch, you will do the Hue back of the bike tour. Our guide will meet you at your hotel and introduce you to our highly skilled and qualified drivers, who are sensitive to tentative pillion passengers and will travel at a gentle pace of 40km or less.  After a safety briefing, your adventure begins.  During the tour, you will ride through little laneways, beside canals, and through local markets, visit a king’s tomb, a pagoda, and local handicrafts.  During your journey, you will visit Hue’s Citadel and the Forbidden Purple City and learn about Vietnam’s emperors and their intriguing histories. This is a truly action-packed day of scenery, history, culture, and cuisine. You have the option of joining this tour by private air-conditioned vehicle. Overnight in Hue.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day4.png"
        },
        {
          shortDescription:"Day 5:Hue: Discover the beauty of Bach Ma National Park.",
          longDescription:"This is for nature and eco-tourism lovers! Bach Ma National Park is located high elevation of Truong Son mountain rank and it covers an area of the natural reserve is 22,031 ha. It is the home of over 330 species of birds and 55 species of mammals. It is a well-protected location, in line with the Annamist. Thus it has a combined climate and biological characteristics for both North and South Vietnam. The vast biodiversity, spectacular location, and lush resources make it a very attractive eco-tourism location. After breakfast, at around 8:00, we depart our hotel from Hue. At around 9:30, we will arrive at the foot of Bach Ma where our special birder guide will welcome us and brief the itinerary for the next 2 days. The trip will be started after a pleasant stop to watch the Brown Fish-owl nest on one of the main entrance pillars. Then we start our trek after a drive of 8 km to the Pheasant trail. The Pheasant Trail leads 2.5 km to the junction of two rivers where Blyth’s Kingfisher occurs and passes through. After 2 hours of trekking, we meet our driver again for an awesome drive up to 17 km where we have a sumptuous lunch and check in to Do Quyen guesthouse, where we will spend the night. In the afternoon, we discover the Five Lake trail. We can swim and relax in this area, and spot the Slaty-backed Forktail bird. We will have a quiet dinner in the summit area before retiring for the night. Overnight in Bach Ma National Park.",
          meal:"Breakfast, Lunch, Dinner.",
          image:"uploads/packages/vietnam/day5.png"
        },
        {
          shortDescription:"Day 6:Bach Ma National Park - Drive back Hoi An.",
          longDescription:"An early morning schedule is best for birders. After an early breakfast at 5:30 at the restaurant, we will start our day around 6:30 up to the Summit trail, followed by the Natural Exploration trail. Once we reach the summit, we can see a marvelous panoramic view of the ocean, and the tropical and sub-tropical evergreen monsoon forest. We then follow the Summit Trail, looping back to the restaurant through a secondary forest via the orchid garden along the Natural Explanation Trail. Look out for the Short-tailed Scimitar-babbler, Red-collared Woodpecker, Silver Pheasant, Rufous-throated Partridge, and Blue-rumped Pitta. In the afternoon, we will say goodbye to Bach Ma National Park and make our way downhill back to our hotel in Hoi An. Supplies to bring: Long trousers, a good pair of walking boots, torches, water, and insect repellent. Overnight in Hoi An.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day6.png"
        },
        {
          shortDescription:"Day 7:Hoi An - Da Nang - depart for home.",
          longDescription:"After breakfast and a leisurely morning on your own, you will check out by midday as this will mark the end of your 7 incredible days – Stunning Vietnam Centre Beauty. Your private driver will pick you up and take you back to Da Nang International airport for your departure flight home.",
          meal:"Breakfast",
          image:"uploads/packages/vietnam/day7.png"
        }
      ]
    },
    {
      destinationId: "667471d084ccda8d5a96158c",
      packageName: "Stunning Vietnam Centre Beauty in 7 incredible days",
      noOfDays: 7,
      overviewDetails: "uploads/climate/Vietnam-weather.png",
      packageImage:"uploads/packages/vietnam/banner.png",
      amountPerPerson:150,
      locations:"Danang - Hoi An – My Son Sanctuary - Hue – Bach Ma National Park",
      highlights: ["Be enchanted by the charms of Hoi An ancient town.","Learn Vietnamese history under the Nguyen Dynasty through the royal tombs & ancient citadel in Hue.","Back to the mother nature by visiting Bach Ma National Park","Explore My Son Sanctuary – recognized as a world heritage site.","Relax at the beaches."],
      itinerary:[
        {
          shortDescription:"Day 1:Landing in Da Nang - drive to Hoi An.",
          longDescription:"Upon arrival at Da Nang International Airport, you will be greeted by the guide and transferred to the hotel in Hoi An. Please look for the Asia Pathfinders welcome sign in the arrival hall. The journey is about 40 minutes from Da Nang, the third-largest seaport city in Vietnam, to the ancient town of Hoi An. Hoi An is a charming World Heritage village that is being beautifully restored and preserved and will captivate you immediately. No matter what you like, you will find it here, whether it is shopping, restaurants, photography, history, architecture, golf, fishing, swimming, scuba, abseiling, massage, or lazing around. Hoi An has become famous for its tailoring, where there is a huge variety of fabrics to choose from.",
          meal:"Not Included",
          image:"uploads/packages/vietnam/day1.png"
        },
        {
          shortDescription:"Day 2:Hoi An: Visit the ancient town & learn to make a lantern.",
          longDescription:"Hoi An offers a respite from the hustle and bustle of Ho Chi Minh City, allowing your family to unwind and slowly absorb the charms of this small town on the coast. You can experience a slow-paced lifestyle by taking a city tour of UNESCO landmarks.On your walking tour, you will stop by a private house where the same family has lived for hundreds of years in a traditional way and one of the family chapels built by wealthy merchants or official families as places to honor their ancestors.Continue to the Sa Huynh Museum, which contains exhibitions from the earliest period of Hoi An’s history. Finally, continue to the famous Japanese Covered Bridge Pagoda, first constructed in 1593 by the Japanese community of Hoi An to link the town with the Chinese quarters across the stream. The second part of this morning is learning how to make a colorful lantern. You will visit a family with a tradition of making lanterns. Here, you can see many different types of lanterns, and with the guidance of a lantern craftsman, you will make your favorite lantern. Enjoy a tasty lunch in a local restaurant and walk back to the hotel. It’s time for your children to enjoy the hotel’s swimming pool and relax at the beach while you can try massage packages, which are inexpensive, enjoyable, and relaxing. Overnight in Hoi An.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day2.png"
        },
        {
          shortDescription:"Day 3:Hoi An: A half-day tour to discover My Son Sanctuary.",
          longDescription:"After breakfast, depart Hoi An for the 50-kilometer journey to My Son, which is a collection of temple ruins constructed between the 4th and 14th centuries by the kings of Champa. Influenced by Hinduism, these temples were places for worshipping Shiva and Vishnu. During the war, it became a base for the Viet Cong, which forced US bombing, leaving 20 of the 70 structures intact. The tour of the ruins takes approximately 1.5 hours. Lunch and dinner are on your own. The afternoon is free at your leisure. A free afternoon at your leisure. Dinner is on your own. You may choose to lounge by your resort pool, swim at the beach, or indulge in a massage, facial, or pedicure. For those wanting action, optional activities include a half-day countryside cycling tour, fishing, or a photography tour. We can include any of these in your itinerary. Overnight in Hoi An.",
          meal:"Breakfast, Lunch"
        },
        {
          shortDescription:"Day 4:Drive to Hue: Back of the bike tour in Hue.",
          longDescription:"After breakfast, you will be collected by your private guide and transferred in a private vehicle (approximately 4 hours) to the Royal City of Hue. You will stop to visit Marble Mountain, Non-Nuoc Stone Carving Village, and My Khe Beach which was home to American GIs during the war. Then, you will be driven over the Hai Van Pass. It is the highest and most beautiful pass in Vietnam (about 500 meters above sea level). There are some amazing views from the top and great photo opportunities. Arrive in Hue after midday and have lunch in a local restaurant. After lunch, you will do the Hue back of the bike tour. Our guide will meet you at your hotel and introduce you to our highly skilled and qualified drivers, who are sensitive to tentative pillion passengers and will travel at a gentle pace of 40km or less.  After a safety briefing, your adventure begins.  During the tour, you will ride through little laneways, beside canals, and through local markets, visit a king’s tomb, a pagoda, and local handicrafts.  During your journey, you will visit Hue’s Citadel and the Forbidden Purple City and learn about Vietnam’s emperors and their intriguing histories. This is a truly action-packed day of scenery, history, culture, and cuisine. You have the option of joining this tour by private air-conditioned vehicle. Overnight in Hue.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day4.png"
        },
        {
          shortDescription:"Day 5:Hue: Discover the beauty of Bach Ma National Park.",
          longDescription:"This is for nature and eco-tourism lovers! Bach Ma National Park is located high elevation of Truong Son mountain rank and it covers an area of the natural reserve is 22,031 ha. It is the home of over 330 species of birds and 55 species of mammals. It is a well-protected location, in line with the Annamist. Thus it has a combined climate and biological characteristics for both North and South Vietnam. The vast biodiversity, spectacular location, and lush resources make it a very attractive eco-tourism location. After breakfast, at around 8:00, we depart our hotel from Hue. At around 9:30, we will arrive at the foot of Bach Ma where our special birder guide will welcome us and brief the itinerary for the next 2 days. The trip will be started after a pleasant stop to watch the Brown Fish-owl nest on one of the main entrance pillars. Then we start our trek after a drive of 8 km to the Pheasant trail. The Pheasant Trail leads 2.5 km to the junction of two rivers where Blyth’s Kingfisher occurs and passes through. After 2 hours of trekking, we meet our driver again for an awesome drive up to 17 km where we have a sumptuous lunch and check in to Do Quyen guesthouse, where we will spend the night. In the afternoon, we discover the Five Lake trail. We can swim and relax in this area, and spot the Slaty-backed Forktail bird. We will have a quiet dinner in the summit area before retiring for the night. Overnight in Bach Ma National Park.",
          meal:"Breakfast, Lunch, Dinner.",
          image:"uploads/packages/vietnam/day5.png"
        },
        {
          shortDescription:"Day 6:Bach Ma National Park - Drive back Hoi An.",
          longDescription:"An early morning schedule is best for birders. After an early breakfast at 5:30 at the restaurant, we will start our day around 6:30 up to the Summit trail, followed by the Natural Exploration trail. Once we reach the summit, we can see a marvelous panoramic view of the ocean, and the tropical and sub-tropical evergreen monsoon forest. We then follow the Summit Trail, looping back to the restaurant through a secondary forest via the orchid garden along the Natural Explanation Trail. Look out for the Short-tailed Scimitar-babbler, Red-collared Woodpecker, Silver Pheasant, Rufous-throated Partridge, and Blue-rumped Pitta. In the afternoon, we will say goodbye to Bach Ma National Park and make our way downhill back to our hotel in Hoi An. Supplies to bring: Long trousers, a good pair of walking boots, torches, water, and insect repellent. Overnight in Hoi An.",
          meal:"Breakfast, Lunch",
          image:"uploads/packages/vietnam/day6.png"
        },
        {
          shortDescription:"Day 7:Hoi An - Da Nang - depart for home.",
          longDescription:"After breakfast and a leisurely morning on your own, you will check out by midday as this will mark the end of your 7 incredible days – Stunning Vietnam Centre Beauty. Your private driver will pick you up and take you back to Da Nang International airport for your departure flight home.",
          meal:"Breakfast",
          image:"uploads/packages/vietnam/day7.png"
        }
      ]
    }

  ];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      // Clear existing packages
      await Package.deleteMany({});
      console.log('Existing packages removed');

      // Insert new seed data
      await Package.insertMany(packages);
      console.log('Packages seeded successfully');
    } catch (error) {
      console.error('Error seeding packages', error);
    } finally {
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
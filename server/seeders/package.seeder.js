require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Package = require("../models/package.model");

// Create package data
const packages = [
  {
    destinationId: "667471d084ccda8d5a96158c", //Vietnam
    packageName: "Go adventure to South Vietnam: fascinating 6-day tour",
    noOfDays: 6,
    overviewDetails: "uploads/climate/Vietnam-weather.png",
    packageImage: "uploads/packages/vietnam/banner.png",
    amountPerPerson: 145,
    locations: "Ho Chi Minh City - Cu Chi Tunnels - Mekong Delta (Cai Be & Can Tho)",
    highlights: ["Zoom through Ho Chi Minh City on the back of a vintage Vespa.", "Enjoy a one-hour speedboat ride along the Saigon River", "Discover the life underground at Cu Chi Tunnels", "See Vietnam’s vibrant waterways & touch in real life in the Mekong Delta"],
    itinerary: [
      {
        shortDescription: "Day 1:Ho Chi Minh City: the sounds of the South.",
        longDescription: "Xin chào Việt Nam! Hello Vietnam! A warm greeting awaits at Tan Son Nhat International Airport; process the immigration procedure (visa on arrival is available or obtained in advance via Vietnam E-visa ), your private guide and driver will meet you in the arrival lounge and transfer you to your hotel in Ho Chi Minh City. Bright neon lights, countless shopping opportunities, and trendy cafes are the most notable highlights in Ho Chi Minh City, previously Saigon. Wide boulevards lined with trees recall its French heritage, while rising buildings announce that the city has developed firmly in the 21st century. In contrast to this modern backdrop is the chaotic traffic of swarming motorbikes that are generally overloaded or carrying exotic passengers. This is people-watching at its best.",
        meal: "Not Included",
        image: "uploads/packages/vietnam/day1.png"
      },
      {
        shortDescription: "Day 2:Ho Chi Minh City: soak up the culture with a vintage Vespa.",
        longDescription: "See a Saigon local’s lifestyle. Our Vespa tour of modern-day Ho Chi Minh City will give you a view of the city, unlike anything visitors have often done before. And of course, it is more exciting than you could find on your own. As locals, our professional riders know Ho Chi Minh City and exactly how to take in the must-see landmarks while getting you off the crowded tourist trail. Take a peek at the history, the streets, and the sights that most visitors never hear about or see. The riders will take you through the Chinese district of Ho Chi Minh City, stop to see a sweet-smelling flower market, and visit a breathtaking yet hidden Buddhist pagoda. Visit the must-see attractions as well, such as the Gustave Eiffel-designed Saigon Cathedral & Post Office. Then get a brief history lesson in front of the Reunification Palace. You will end up on the day tour with lunch at Café Zoom before being back at the hotel. The remainder of the day is free on your own.",
        meal: "Breakfast, Lunch",
        image: "uploads/packages/vietnam/day2.png"
      },
      {
        shortDescription: "Day 3:Ho Chi Minh City: above the clouds and under the ground.",
        longDescription: "7.00 am Our guide will meet you at the hotel and you will proceed to the riverside to board our boat for a scenic speedboat ride along the Saigon River to the Cu Chi Tunnels.  Great excitement with excellent views from the comfort of your boat.  Upon arriving in Cu Chi, you will see the amazing network of communist guerrilla tunnels. There are many sights to see during this excursion, including the ingenuous traps, demonstrations of how their weapons and bombs were made, underground kitchens, and a brief propaganda video produced in 1969.  Plus, you can even explore a short section of the tunnels and fire an AK47 if you are feeling brave! You will return to Saigon by boat, arriving at approximately 1 pm.",
        meal: "Breakfast, Lunch"
      },
      {
        shortDescription: "Day 4:Mekong Delta: Go local for a richer experience.",
        longDescription: "After breakfast, our driver transfers you to Cai Be. Arriving early in the morning at around 9:30 AM, you will be visiting the first stop-over, Cao Dai Temple, in Cai Be which symbolizes the local unique religion, and then Cai Be Cathedral. Upon arrival, you visit the Cai Be inland market by bicycle, buy some fresh tropical fruits there, and engage in conversation with the local vendors. Continue to explore the town’s historic and French colonial homes. Leaving the town, you will be going on a local ferry from Cai Be to Tan Phong Islet, and then we will row on a sampan along the canals under the green canopy of water coconut trees. This is optional, depending on the tides of the Mekong River. Back at the wharf, you will be cycling to the Mekong Rustic Homestay on Tan Phong Islet, surrounded by lush tropical fruit gardens. Here, tourists will take a break for lunch while enjoying tea and other refreshments made by the Mekong Rustic host. Cycle through the serene Tan Phong Isles after a break. If it is a school day, consider making friends with the children at the neighborhood kindergarten and stopping by a local farmer’s house to enjoy a cup of tea and some of the region’s finest banana candy. At one of the Mekong River’s largest orchards, indulge in freshly selected tropical fruits while listening to Don Ca Tai Tu, a piece of Intangible Cultural Heritage designated by UNESCO. Say goodbye  we will continue cycling to the workshop where “nón bang” bang conical hats were made (optional), before leaving Tan Phong Isles and returning to the pier to go to Mekong Rustic Can Tho.",
        meal: "Breakfast, Lunch, Dinner",
        image: "uploads/packages/vietnam/day4.png"
      },
      {
        shortDescription: "Day 5:Mekong Delta: truly enjoy the local vibe",
        longDescription: "You will get on the boat in the morning at 6:00 AM to travel to the Phong Dien floating market, where locals select tropical fruits from their gardens to sell there, then encounter and talk with the vendors on their boats. If time permits, you continue to cruise through beautiful small canals to reach the Cai Rang floating market – The biggest wholesale of tropical fruits on the floating market. After experiencing the floating market(s), you will visit a local family that has been making noodles (“hủ tiu”) for three generations, and you can try to learn how to make noodles with them. A light breakfast is served in a local restaurant beside beautiful and quiet canals. Then, you are back to Mekong Rustic Can Tho at 10:00 to pack your luggage and check-out at noon. Enjoy the way back to Ho Chi Minh City. In the evening, you can venture to the popular Com Nieu Sai Gon Restaurant, which provides an experience that goes beyond the flavors and edges of cultural exploration. Taste the clay pot-baked rice that is dressed with scallions and a savory sauce.",
        meal: "Breakfast, Lunch, Dinner.",
        image: "uploads/packages/vietnam/day5.png"
      },
      {
        shortDescription: "Day 6:Ho Chi Minh City: depart for home",
        longDescription: "After breakfast and a leisurely morning on your own, you will check out by midday, as this marks the end of your six-day trip in southern Vietnam. You’ll soon arrive at the airport and be prepared for your flight back home thanks to your private transfer.",
        meal: "Breakfast",
        image: "uploads/packages/vietnam/day6.png"
      }
    ]
  },
  {
    destinationId: "667471d084ccda8d5a96158c", //Vietnam
    packageName: "Stunning Vietnam Centre Beauty in 7 incredible days",
    noOfDays: 7,
    overviewDetails: "uploads/climate/Vietnam-weather.png",
    packageImage: "uploads/packages/vietnam/banner.png",
    amountPerPerson: 150,
    locations: "Danang - Hoi An – My Son Sanctuary - Hue – Bach Ma National Park",
    highlights: ["Be enchanted by the charms of Hoi An ancient town.", "Learn Vietnamese history under the Nguyen Dynasty through the royal tombs & ancient citadel in Hue.", "Back to the mother nature by visiting Bach Ma National Park", "Explore My Son Sanctuary – recognized as a world heritage site.", "Relax at the beaches."],
    itinerary: [
      {
        shortDescription: "Day 1:Landing in Da Nang - drive to Hoi An.",
        longDescription: "Upon arrival at Da Nang International Airport, you will be greeted by the guide and transferred to the hotel in Hoi An. Please look for the Asia Pathfinders welcome sign in the arrival hall. The journey is about 40 minutes from Da Nang, the third-largest seaport city in Vietnam, to the ancient town of Hoi An. Hoi An is a charming World Heritage village that is being beautifully restored and preserved and will captivate you immediately. No matter what you like, you will find it here, whether it is shopping, restaurants, photography, history, architecture, golf, fishing, swimming, scuba, abseiling, massage, or lazing around. Hoi An has become famous for its tailoring, where there is a huge variety of fabrics to choose from.",
        meal: "Not Included",
        image: "uploads/packages/vietnam/day1.png"
      },
      {
        shortDescription: "Day 2:Hoi An: Visit the ancient town & learn to make a lantern.",
        longDescription: "Hoi An offers a respite from the hustle and bustle of Ho Chi Minh City, allowing your family to unwind and slowly absorb the charms of this small town on the coast. You can experience a slow-paced lifestyle by taking a city tour of UNESCO landmarks.On your walking tour, you will stop by a private house where the same family has lived for hundreds of years in a traditional way and one of the family chapels built by wealthy merchants or official families as places to honor their ancestors.Continue to the Sa Huynh Museum, which contains exhibitions from the earliest period of Hoi An’s history. Finally, continue to the famous Japanese Covered Bridge Pagoda, first constructed in 1593 by the Japanese community of Hoi An to link the town with the Chinese quarters across the stream. The second part of this morning is learning how to make a colorful lantern. You will visit a family with a tradition of making lanterns. Here, you can see many different types of lanterns, and with the guidance of a lantern craftsman, you will make your favorite lantern. Enjoy a tasty lunch in a local restaurant and walk back to the hotel. It’s time for your children to enjoy the hotel’s swimming pool and relax at the beach while you can try massage packages, which are inexpensive, enjoyable, and relaxing. Overnight in Hoi An.",
        meal: "Breakfast, Lunch",
        image: "uploads/packages/vietnam/day2.png"
      },
      {
        shortDescription: "Day 3:Hoi An: A half-day tour to discover My Son Sanctuary.",
        longDescription: "After breakfast, depart Hoi An for the 50-kilometer journey to My Son, which is a collection of temple ruins constructed between the 4th and 14th centuries by the kings of Champa. Influenced by Hinduism, these temples were places for worshipping Shiva and Vishnu. During the war, it became a base for the Viet Cong, which forced US bombing, leaving 20 of the 70 structures intact. The tour of the ruins takes approximately 1.5 hours. Lunch and dinner are on your own. The afternoon is free at your leisure. A free afternoon at your leisure. Dinner is on your own. You may choose to lounge by your resort pool, swim at the beach, or indulge in a massage, facial, or pedicure. For those wanting action, optional activities include a half-day countryside cycling tour, fishing, or a photography tour. We can include any of these in your itinerary. Overnight in Hoi An.",
        meal: "Breakfast, Lunch"
      },
      {
        shortDescription: "Day 4:Drive to Hue: Back of the bike tour in Hue.",
        longDescription: "After breakfast, you will be collected by your private guide and transferred in a private vehicle (approximately 4 hours) to the Royal City of Hue. You will stop to visit Marble Mountain, Non-Nuoc Stone Carving Village, and My Khe Beach which was home to American GIs during the war. Then, you will be driven over the Hai Van Pass. It is the highest and most beautiful pass in Vietnam (about 500 meters above sea level). There are some amazing views from the top and great photo opportunities. Arrive in Hue after midday and have lunch in a local restaurant. After lunch, you will do the Hue back of the bike tour. Our guide will meet you at your hotel and introduce you to our highly skilled and qualified drivers, who are sensitive to tentative pillion passengers and will travel at a gentle pace of 40km or less.  After a safety briefing, your adventure begins.  During the tour, you will ride through little laneways, beside canals, and through local markets, visit a king’s tomb, a pagoda, and local handicrafts.  During your journey, you will visit Hue’s Citadel and the Forbidden Purple City and learn about Vietnam’s emperors and their intriguing histories. This is a truly action-packed day of scenery, history, culture, and cuisine. You have the option of joining this tour by private air-conditioned vehicle. Overnight in Hue.",
        meal: "Breakfast, Lunch",
        image: "uploads/packages/vietnam/day4.png"
      },
      {
        shortDescription: "Day 5:Hue: Discover the beauty of Bach Ma National Park.",
        longDescription: "This is for nature and eco-tourism lovers! Bach Ma National Park is located high elevation of Truong Son mountain rank and it covers an area of the natural reserve is 22,031 ha. It is the home of over 330 species of birds and 55 species of mammals. It is a well-protected location, in line with the Annamist. Thus it has a combined climate and biological characteristics for both North and South Vietnam. The vast biodiversity, spectacular location, and lush resources make it a very attractive eco-tourism location. After breakfast, at around 8:00, we depart our hotel from Hue. At around 9:30, we will arrive at the foot of Bach Ma where our special birder guide will welcome us and brief the itinerary for the next 2 days. The trip will be started after a pleasant stop to watch the Brown Fish-owl nest on one of the main entrance pillars. Then we start our trek after a drive of 8 km to the Pheasant trail. The Pheasant Trail leads 2.5 km to the junction of two rivers where Blyth’s Kingfisher occurs and passes through. After 2 hours of trekking, we meet our driver again for an awesome drive up to 17 km where we have a sumptuous lunch and check in to Do Quyen guesthouse, where we will spend the night. In the afternoon, we discover the Five Lake trail. We can swim and relax in this area, and spot the Slaty-backed Forktail bird. We will have a quiet dinner in the summit area before retiring for the night. Overnight in Bach Ma National Park.",
        meal: "Breakfast, Lunch, Dinner.",
        image: "uploads/packages/vietnam/day5.png"
      },
      {
        shortDescription: "Day 6:Bach Ma National Park - Drive back Hoi An.",
        longDescription: "An early morning schedule is best for birders. After an early breakfast at 5:30 at the restaurant, we will start our day around 6:30 up to the Summit trail, followed by the Natural Exploration trail. Once we reach the summit, we can see a marvelous panoramic view of the ocean, and the tropical and sub-tropical evergreen monsoon forest. We then follow the Summit Trail, looping back to the restaurant through a secondary forest via the orchid garden along the Natural Explanation Trail. Look out for the Short-tailed Scimitar-babbler, Red-collared Woodpecker, Silver Pheasant, Rufous-throated Partridge, and Blue-rumped Pitta. In the afternoon, we will say goodbye to Bach Ma National Park and make our way downhill back to our hotel in Hoi An. Supplies to bring: Long trousers, a good pair of walking boots, torches, water, and insect repellent. Overnight in Hoi An.",
        meal: "Breakfast, Lunch",
        image: "uploads/packages/vietnam/day6.png"
      },
      {
        shortDescription: "Day 7:Hoi An - Da Nang - depart for home.",
        longDescription: "After breakfast and a leisurely morning on your own, you will check out by midday as this will mark the end of your 7 incredible days – Stunning Vietnam Centre Beauty. Your private driver will pick you up and take you back to Da Nang International airport for your departure flight home.",
        meal: "Breakfast",
        image: "uploads/packages/vietnam/day7.png"
      }
    ]
  },
  {
    destinationId: "667471d084ccda8d5a96158f", //Thailand
    packageName: "A 4-adventure days in Thailand exploring the less-touristy areas",
    noOfDays: 4,
    overviewDetails: "uploads/climate/Thailand-weather.png",
    packageImage: "uploads/packages/thailandd/banner.png",
    amountPerPerson: 110,
    locations: "Bangkok City – Damnoen Saduak floating market – River Kwai- Chiang Mai – Koh Samui Island",
    highlights: ["Enjoy a sunset cocktail while taking in panoramic views of Bangkok.", "Visit Bangkok’s highlight temples & enjoy a romantic cruise dinner on Chao Phraya River.", "Experience 2 Thai massage packages.", "Enjoy two sweet nights at a luxury floating villa at The Floating House River Kwai.", "Relax at the beaches."],
    itinerary: [
      {
        shortDescription: "Day 1:Landing in Bangkok, start your honeymoon in Thailand.",
        longDescription: "When arrive in Bangkok, you will be met by a representative who will expedite the immigration process. Be assisted with your luggage and introduced to your travel guide. Then, be driven by private car to the hotel, check-in, and enjoy a glass of welcome drink along with other honeymoon amenities thoughtfully arranged in advance for a delightfully romantic time together. In the late afternoon, meet the guide in the hotel lobby and be transported in a private air-conditioned car to Sirocco, located on the 65th floor of the State Tower at Lebua. Arrive at the Skybar just in time for a sunset cocktail while taking in panoramic views of Bangkok. Following that, it’s time for dinner. Overnight in Bangkok.",
        meal: "A welcome dinner.",
        image: "uploads/packages/thailand/day1.png"
      },
      {
        shortDescription: "Day 2:Bangkok’s highlight temples, enjoy a Thai massage package & cruise dinner.",
        longDescription: "Today, you can get-up late. Enjoy a delicious breakfast in hotel’s restaurant before doing tour. At 9:00 am, you start to discover Bangkok with your private tour guide and driver. Your first stop is at Wat Traimit to visit the largest Golden Buddha statue in the world (3 m high, weighing 5.5 tons, and carved in solid gold). Your next visit is to Wat Pho to admire the massive reclining Buddha statue, which represents the entry of Buddha into Nirvana and the end of all reincarnations. Just 800 m from Wat Pho, you will visit the Grand Palace. The dazzling, spectacular Grand Palace is undoubtedly the most famous landmark in Bangkok and a must-see. Continues with a visit to the Temple of Dawn before enjoy lunch. You must have heard a lot about Thai massage packages, so it’s time to get this authentic experience together. We book and you just enjoy it! Enjoy an evening dinner cruise on the Chao Phraya Princess, traveling along Bangkok’s main waterway. Experience the magic of the illumination of the city’s temples and other historic monuments. Overnight in Bangkok.",
        meal: "Breakfast, Lunch, River dinner cruise.",
        image: "uploads/packages/thailand/day2.png"
      },
      {
        shortDescription: "Day 3:Bangkok – Kanchanaburi: Historical day tour to River Kwai.",
        longDescription: "Start your day full of energy with a hot breakfast and a cup of coffee at the hotel restaurant. At 8:00 am, you meet your private tour guide and transfer 128 kilometers to the west of Bangkok for a full-day historical tour to River Kwai. Visit the Thailand–Burma Railway Centre, an interactive museum, informative center, and research facility dedicated to presenting the history of the Thailand – Burma Railway. The fully air-conditioned center provides an educational and moving experience for visitors. Visit the Allied War Cemetery, a memorial to some 6,000 allied prisoners of war (POWs) who perished along the death railway line and were moved post-war to this eternal resting place. Visit the world-famous Bridge over the River Kwai, a part of the Death Railway constructed by Allied POWs. You take a historic Death Railway Train, passing over the original wooden viaduct constructed by Allied POWs. After the train ride, you drive to The Floating House River Kwai for check-in. Overnight in the Floating House River Kwai.",
        meal: "Breakfast, Lunch"
      },
      {
        shortDescription: "Day 4:Koh Samui beach - depart for home.",
        longDescription: "Today is at your leisure. Breakfast is still included, and check-out is at midday. Depending on your departure time, a private driver will pick you up from the hotel (3 hours before your flight departure time) and transfer you back to the airport for your departure flight. End of your Thailand romantic honeymoon tour.",
        meal: "Breakfast",
        image: "uploads/packages/thailand/day4.png"
      }
    ]
  },
  {
    destinationId: "667471d084ccda8d5a96158f", //Thailand
    packageName: "A 7-day memorable honeymoon in Thailand",
    noOfDays: 7,
    overviewDetails: "uploads/climate/Thailand-weather.png",
    packageImage: "uploads/packages/thailandd/banner.png",
    amountPerPerson: 150,
    locations: "Bangkok - Ayutthaya - Lopburi - Phitsanulok - Sukhothai - Chiang Mai – Doi Suthep – Patara elephant farm - Krabi",
    highlights: ["In Bangkok: Visit the Royal Palace, try street food, and join a Muay Thai class.", "Travel from Bangkok to Chiang Mai to explore the north countryside by train.", "To have only one night on train to get a new experience.", "Have a happy ending with three wonderfully relaxing days on Krabi Island."],
    itinerary: [
      {
        shortDescription: "Day 1:Landing in Bangkok, the capital of Bangkok",
        longDescription: "Bangkok, the capital of Thailand, is known as the city of angels. This city is famous for its magnificent temple system, bustling shopping centers, all-night entertainment streets, colorful street food flavors, and friendly faces of the people. You are landing at Bangkok’s International Airport. Welcome to Bangkok, the capital city of Thailand, a must-see destination for any traveler interested in experiencing the rich history and culture of Southeast Asia. After collecting your luggage, please move to the arrival lounge where Viland Travel’s representative is waiting for you with a welcome signboard. After greeting, you are transferred 45 minutes to downtown. Check in to the room and spend the rest of the day to relax. Note: Hotel check-in time is at 2:00 pm; your room may or may not be ready before this time.",
        meal: "Not included",
        image: "uploads/packages/thailand/day1.png"
      },
      {
        shortDescription: "Day 2:Bangkok: A full-day of sightseeing, long-tail boat ride & tuk-tuk food tour",
        longDescription: "After breakfast at the hotel, you start to discover Bangkok with your private tour guide and driver. Your first stop is at Wat Traimit to visit the largest Golden Buddha statue in the world (3m high, weighs 5.5 tons, and is carved in solid gold). Your next visit is to Wat Pho to admire the massive reclining Buddha statue, which represents the entry of Buddha into Nirvana and the end of all reincarnations. You will visit the Grand Palace just 800m from Wat Pho. The dazzling, spectacular Grand Palace is undoubtedly the most famous landmark in Bangkok and a must-see. Continues with a long-tail boat ride along the canal to see Thai houses and typical rural life, as well as a visit to the Temple of Dawn before ending your day.",
        meal: "Breakfast, Lunch, Dinner",
        image: "uploads/packages/thailand/day2.png"
      },
      {
        shortDescription: "Day 3:Muay Thai Class by Watchara Muay Thai Gym",
        longDescription: "Immerse yourself in a local cultural practice while you get your blood pumping by joining this fun and exciting Muay Thai class in Bangkok that’ll teach you all you need about this ancient martial art! The Muay Thai class is run by Watchara MuayThai Gym, a local martial arts studio known for its friendly instructors and high-quality courses, where you’re sure to get that coveted adrenaline rush with the course you take. Beginners will enjoy the introductory courses, where they will learn the fundamentals as well as all of the necessary techniques to prepare them for more advanced maneuvers at the next level. On the other hand, more advanced participants will be able to work on their personal fitness goals and spar with their classmates inside the air-conditioned classroom. Get handy tips and tricks from your professional English-speaking instructors, who will guide you through the entire duration of the two-hour class tour. If you’re looking for a more personalized experience or simply want a hands-on class with your teacher, a private course is a perfect choice for both groups and individuals. Muay Thai is a must-try activity for those looking for new things and for those who crave an unforgettable experience during their days in Bangkok.",
        meal: "Breakfast"
      },
      {
        shortDescription: "Day 4:Bangkok – train to Ayutthaya: cycling to the historical park",
        longDescription: "After finishing breakfast, you check out. Viland Travel will bring you to Hua Lampong train station, where you can get a ticket and depart for Ayutthaya. Train transfer, Train #75, Dep. 08:20 Bangkok Hua Lampong – Arr. 09:39 Ayutthaya. This trip is a chance to see the scenery from the outskirts of the Thai capital down to the green farms and surrounding villages. Upon arrival, see Viland Travel’s driver and drive to the cycling starting point. Ride a bike to Ayutthaya Historical Park and visit the ancient palace grounds. Wat Phra Sri Sanphet, lying beside the Grand Palace, was once the most significant temple during the Ayutthaya period. Adjacent to Wat Phra Sri Sanphet is Wihan Phra Mongkhon Bophit, an impressive building that houses a seated bronze Buddha image. Lunch is at Malakor, a local Thai restaurant. After lunch, embark on a private transfer to Bang Pa-in Summer Palace, south of Ayutthaya. Visit the beautiful palace, followed by Wat Niwet Thammaprawat, the Gothic-style temple. End the tour there, and transfer to your hotel in the city.",
        meal: "Breakfast",
        image: "uploads/packages/thailand/day4.png"
      },
      {
        shortDescription: "Day 5:Ayutthaya – train to Lopburi: city tour - train to Phitsanulok",
        longDescription: "Saying goodbye to the ancient Ayutthaya, you ride a train, head to the north, and arrive in a small town called. Lopburi. Train 111, Dep. 08:37 Ayutthaya – Arr. 09:42. Upon arrival, meet your local tour guide and take a leisurely walk to Prang Sam Yot, situated just opposite the railway station. This more than 800-years-old temple is considered the most ancient religious structure here, built when the city was under the control of the Khmer empire. The temple consists of 3 main towers in the classical style of Khmer architecture. The most impressive scene at the temple is a group of monkeys freely walking around, making friends, and playing with tourists. Afterward, proceed by van transfer to King Narai’s Palace. Then, continue further along the Lopburi River to a local restaurant for lunch. Afterward, head back to the train station and board the train to Phitsanulok.",
        meal: "Breakfast, Lunch, Dinner.",
        image: "uploads/packages/thailand/day5.png"
      },
      {
        shortDescription: "Day 6:Phitsanulok - cycling tour in Sukhothai - Phitsanulok - train to Chiang Mai",
        longDescription: "Sukhothai is less affected by the process of urbanization and is known as the “dawn of happiness. To get an insight into the splendor and magnificence of Sukhothai’s past, you will take a full day of cycling tour exploring this area. Start from Ban Kheay, a small village on the Sukhothai outskirts. It would be a relaxing ride on the flat, paved rural roads. While your local guide tells you about farming life, you pass the endless rice paddies with beautiful views of the Kao Laung mountain range in Ramkhamhaeng National Park. Arrive at the Southern Gate, and explore some of Sukhothai’s famous ancient ruins. Marvel at beautiful Buddhist and Hindu architecture and be exposed. The tour offers the visitor a guided cultural experience, learning about Sukhothai’s history and complex architecture and the story of Buddhism in Thailand. After a delicious local lunch, ride along a small irrigation canal (Klong Mae Lampan), passing through rural villages before returning to town. The cool climate makes the 15km cycle trip easier than ever.",
        meal: "Breakfast, Lunch",
        image: "uploads/packages/thailand/day6.png"
      },
      {
        shortDescription: "Day 7:Krabi - departure",
        longDescription: "Free at leisure until the transfer to Krabi Airport for your onward flight.",
        meal: "Breakfast",
        image: "uploads/packages/thailand/day7.png"
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
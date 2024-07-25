require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');
const Package = require("../models/package.model");

// Create package data
const packages = [
  {
    destinationId: "667471d084ccda8d5a96158c", 
        packageName: "From Angkor Wat to Halong Bay: 4-day magical Tour",
        noOfDays: 4,
        overviewDetails: "Vietnam is legendary land  with majestic natural landscapes and diverse cultures. From Angkor Wat to Halong Bay, 4 days will see you exploring the most iconic sites, diving into the deep-rooted culture, and dining on delicious cuisine. The tour starts with the breathtaking majesty of the temples of Angkor, travels across all the highlights from the south to the north of Vietnam, and ends in the most relaxing way in beautiful Halong Bay. No matter if you’re traveling alone, with a group, or with your family, our travel experts will help you plan the perfect trip based on your interests.",
        packageImage: "uploads/packages/vietnam/banner.png",
        amountPerPerson: 145,
        locations: "Siem Reap – Ho Chi Minh City – Mekong Delta ",
        highlights: ["Learn the history of Angkor’s development.", "Visit the history and culture of Ho Chi Minh City.", "Capture the spirit of rural life in the Mekong Delta.", "Join a Vietnamese cooking class in Hoi An.", "Explore the charms of Hue by motorbike.", "Experience the diverse and eclectic history of Hanoi.", "Cruise through the stunning scenery of Ha Long Bay on an overnight cruise."],
        itinerary: [
          {
            shortDescription: "Day 1:Arrive in Siem Reap, Vitenam.",
            longDescription: "The collected images of vitenam’s history are vibrant in your mind and will soon come to life. A warm greeting awaits you at Siem Reap International airport; your private guide and driver will meet you in the arrivals lounge and transfer you to your hotel in Siem Reap. While every effort is made to have your room available upon arrival, check-in time is at 2:00 pm; your room may or may not be ready before this time.",
            meal: "none",
            image: "uploads/packages/vietnam/day1.png"
          },
          {
            shortDescription: "Day 2: Siem Reap – fly to Ho Chi Minh City, Vietnam.",
            longDescription: "The five towers of Angkor Wat are visible in the distance as you soar through the sky and arrive in Vietnam’s largest city, Ho Chi Minh City. The neighborhoods are vivacious and endlessly energetic. You can be swept up easily in the whirlwind of modern comforts that fill the city. The culture and traditions of the locals persist in the shadows of the spreading skyline. You will find the luscious scent of garlic and freshly made rice noodles. The decadent flavors of pho lure you into many delicious restaurants that hide around every corner.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/vietnam/day2.png"
          },
          {
            shortDescription: "Day 3: Journey to Halong: enjoy the spectacular scenery of the bay.",
            longDescription: "The scenery of Halong Bay, where thousands of limestone islands jut out of the emerald sea, sculpted into bizarre shapes, is truly an iconic image of Vietnam. An overnight boat trip is the best way to enjoy this Vietnamese must-see. Saying goodbye to Hanoi, you drive through the rich farmlands of the Red River Delta to the legendary Halong Bay. It takes you 3 hours, including a 20-minute stop. Arrive at the jetty in Halong City towards noon and proceed with check-in formalities. After a welcome onboard, enjoy a tasty lunch while cruising to the mythical bay. Around mid-afternoon, you participate in some activities to discover every corner of the bay. Each cruise operates a different itinerary, and caving, kayaking, rowing boat, and swimming are the most popular ones. Towards the end of the day, the cruise sets anchor for the night among the karst formations. Dinner is on board.",
            meal: "Breakfast, Lunch, Dinner."
          },
          {
            shortDescription: "Day 4:Hanoi – depart for home.",
            longDescription: "Your final breakfast in the country brings the bittersweet flavor of Vietnamese coffee to your palate. The bustling energy of Hanoi begins to swirl through the streets once again. The morning is yours to enjoy the neighborhood once more. Soon, your private transfer will meet you in the hotel lobby and take you to Noi Bai Airport, where you will continue the journey, but this time toward home.",
            meal: "Breakfast",
            image: "uploads/packages/vietnam/day4.png"
          }
        
        ]
      },
      
      {
        destinationId: "667471d084ccda8d5a96158c", //Vietnam
        packageName: "Indochina learning and exploring 5-day astounding tour",
        noOfDays: 5,
        overviewDetails: "Indochina tour – This tour is an ideal combination of Laos, Cambodia, and Vietnam for those with limited time. Let’s start this colorful journey in Siem Reap, Cambodia. Here, you will have an opportunity to experience the “tuk tuk” a famous local traditional vehicle, in the tour to explore the Angkor complex, the remarkable architectural achievement of the Khmer Empire. Next, you have four days to explore the most attractive city in Laos, Luang Prabang. Through a boat ride on the Mekong River, a visit to the picturesque Kuang Si waterfall, the bear rescue camp in the jungle, and one of the many elephant farms, you will get a chance to immerse yourself in nature in the most meaningful way. The trip ends with 11 days in Vietnam, showing you the diversity of terrain, the richness of cuisine, the rich history of culture, and the paradise of pristine beaches. Sign up for our newsletter for more Southeast Asia travel tips.",
        packageImage: "uploads/packages/vietnam/banner2.png",
        amountPerPerson: 150,
        locations: "Siem Reap – Luang Prabang – Hanoi – Hoi An – Ho Chi Minh City",
        highlights: ["Take in five of Indochina’s UNESCO World Heritage Sites.", "Enjoy a fun tuk-tuk ride when visiting Angkor.", "Explore Siem Reap’s colorful countryside with a quad bike.", "Interact with a giant friend of Elephant in Luang Prabang.", "Stroll around Hanoi Old Quarter for a street food tour.", "Kayak to discover Lan Ha Bay’s majestic scenery.", "Making lantern & do a cooking class in Hoi An", "Ride a boat trip in Mekong River.", "Enjoy sun, sand, and sea on one of the most beautiful beaches in Vietnam.", ],
        itinerary: [
          {
            shortDescription: "Day 1: Landing in Siem Reap, Vitenam.",
            longDescription: "A warm greeting awaits at Siem Reap International Airport, your private guide and driver will meet you in the arrivals lounge and transfer you to your hotel in downtown Siem Reap. Check-in time is at 2:00 pm; your room may or may not be ready before this time..",
            meal: "Not Included",
            image: "uploads/packages/vietnam/day1.png"
          },
          {
            shortDescription: "Day 2: Experience the life on the Tonle Sap Lake & enjoy sunset quadbike.",
            longDescription: "After breakfast, continue your journey to the local Village. With a warm welcome from the village guide, you will be given an introduction to the geography of the community while riding on an oxcart along the way. You see the organic vegetable farm, local activities, typical stilt houses, and authentic Cambodian living style, learning about Khmer culture, customs, and tradition. The Oxcart Tour will end at a nearby local pagoda. You will go to the local pagoda, where you should change into clothes you can get wet in, as here you will experience the ceremony “SrouchTeok”, which roughly translates into “Water Blessing.” A monk will chant in ancient Pali as he splashes water over you, washing away your sins and bad luck so you can start fresh, and being a good person can increase your good luck.",
            meal: "Lunch",
            image: "uploads/packages/vietnam/day2.png"
          },
          {
            shortDescription: "Day 3: Fly to Luang Prabang, the ancient town by the Mekong River.",
            longDescription: "After lunch, you are transferred to Siem Reap International Airport. Today, you fly to Luang Prabang. Hello Laos! Upon arrival, be greeted by the guide and transferred to the hotel. Please look for the Asia Pathfinders welcome sign in the arrival’s hall.",
            meal: "Breakfast"
          },
          {
            shortDescription: "Day 4:Spend a leisure morning in the bay- back to Hanoi & fly to Da Nang.",
            longDescription: "Get up early and don’t miss the chance to watch the sunrise at one of the most beautiful places on the planet. Participating in a tai chi class on the sundeck is a way to welcome a new day full of energy. At the end of the gentle training session, you move to the restaurant and enjoy a hot breakfast with a cup of fragrant coffee. Some gentle activities on the bay will be arranged and announced by the cruise’s staff. If you don’t want to participate, you can choose to relax on board: watching movies, reading books, or sightseeing are also attractive options. After all, a buffet brunch is served while sailing slowly back toward the port, where passengers disembark and transfer back to Noi Bai airport. Take a short flight to Danang, and on arrival in Danang, transfer 40 minutes to Hoi An, a major Asian trading port in the 17th and 18th centuries, whose architecture and relaxed lifestyle have changed little over the years.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/vietnam/day4.png"
          },
          {
            shortDescription: "Day 5: Nui Be - back to Ho Chi Minh City - departure.",
            longDescription: "Our car will pick you up at your resort and depart for Ho Chi Minh City. Tour ends..",
            meal: "Breakfast.",
            image: "uploads/packages/vietnam/day5.png"
          }
        ]
      },
      
      {
        destinationId: "667471d084ccda8d5a96158c", //Vietnam
        packageName: "Highlights of Southeast Asia 7-day impressive tour",
        noOfDays: 7,
        overviewDetails: "Some highlights of Southeast Asian countries like Vietnam, Cambodia, and Thailand include Siem Reap, Hanoi, Bangkok, and Phuket. In two weeks, Viland Travel will take you to the most famous places in Southeast Asia, give you a chance for sightseeing, and teach you about the local culture through architecture, beliefs, cuisine, and the most simple things in local daily life. Get started in Siem Reap, the most prosperous city of the Khmer Empire. Through the thousand-year-old capital of Hanoi, where the typical cultural features of the Vietnamese are summarized. Head to Bangkok, the capital of Thailand, known as the “city of angels,” to see magnificent temples and finish at one of the most beautiful beaches on the planet, Phuket.",
        packageImage: "uploads/packages/vietnam/banner3.png",
        amountPerPerson: 250,
        locations: "Siem Reap – Hanoi – Bangkok – Phuket",
        highlights: ["Watch the glorious sunrise over Angkor Wat.", "Visit Kulen – one of the most beautiful Cambodia waterfalls.", "Learn the quintessence of Hanoi on the antique Minsk.", "Discover the mythical Halong bay with a 2D1N overnight cruise trip.", "Admire the magnificent temples with intricate carvings and large Buddha statues in Bangkok.”, “Experience a floating market in Thailand.”, “Spend 4 days exploring some beautiful islands such as Phuket, Koh Phi Phi and Phang Nga Bay."],
        itinerary: [
          {
            shortDescription: "Day 1:Landing in Siem Reap, Cambodia.",
            longDescription: "The first city in your Southeast Asia tour! Upon your arrival in Siem Reap, you will be welcomed by a local English-speaking guide and transferred to your hotel for check-in. Siem Reap is the base for exploring the fabled temples of Angkor, the ancient capital of the Khmer Empire.",
            meal: "Not Included",
            image: "uploads/packages/vietnam/day1.png"
          },
          {
            shortDescription: "Day 2: Siem Reap: watch the sunrise over Angkor Wat & explore the complex.",
            longDescription: "Begin your tour with an early pickup from your hotel in an air-conditioned vehicle. Then, start your adventure by climbing the main entrance of Angkor Wat and admiring the stunning sunrise over the site and all the surrounding temples. Visit the South Gate of Angkor Thom. Angkor Thom comprises the renowned Bayon and Baphoun temples, originally made up of 54 towers and 216 faces of Bodhisattva Avalokiteshvara. During the visit, learn the historical facts of the Angkor Temples and the Khmer Empire, as well as all the main Angkor architectural elements, from your guide..",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/vietnam/day2.png"
          },
          {
            shortDescription: "Day 3:Hanoi: food & culture on the antique Minsk.",
            longDescription: "In the first part of our Hanoi motorcycle tour, we expose you to the REAL HANOI with a day in the life experience, featuring the parts-unknown of the city with slices of life in the maze of backstreets, tiny alleyways, local homes, schools, random markets, and the black market, experiencing where and how locals live, work, and play. On Hanoi Backstreet Tours’ journeys, we not only show you the good, but we also expose the bad and the weird of your destinations as it is. For us, the run-of-the-mill tourist sites are only the tip of the iceberg, the majority of your destinations remain hidden in parts unknown.",
            meal: "Breakfast, Lunch"
          },
          {
            shortDescription: "Day 4:Hanoi – Halong bay: relax in the garden of karst.",
            longDescription: "The scenery of Halong Bay, where thousands of limestone islands jut out of the emerald sea in bizarre shapes, is truly an iconic image for Vietnam. An overnight boat trip is the best way to enjoy this Vietnamese must-see.",
            meal: "Breakfast, Lunch, dinner",
            image: "uploads/packages/vietnam/day4.png"
          },
          {
            shortDescription: "Day 5: Bangkok – Phuket: enjoy the tropical island life.",
            longDescription: "Breakfast at the hotel, check out, and transfer back to Bangkok airport for a short flight bound for Phuket. Arrive in Phuket, located in Thailand’s southwest region and set amidst the sparkling Andaman Sea. Enjoy the remainder of the day at your leisure. Phuket is the nation’s largest island and a hugely popular holiday destination, ringed by limestone karst islands and countless white-sand beaches. This “Pearl of the South” presents the perfect playground of natural beauty, lively resort towns, and fishing villages, providing an endless supply of sporting and leisure activities as well as a rich cultural heritage.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/vietnam/day5.png"
          },
          {
            shortDescription: "Day 6:Phuket: relaxing day – optional tour: Phi Phi sunrise tour.",
            longDescription: "An early morning schedule is best for birders. After an early breakfast at 5:30 at the restaurant, we will start our day around 6:30 up to the Summit trail, followed by the Natural Exploration trail. Once we reach the summit, we can see a marvelous panoramic view of the ocean, and the tropical and sub-tropical evergreen monsoon forest. We then follow the Summit Trail, looping back to the restaurant through a secondary forest via the orchid garden along the Natural Explanation Trail. Look out for the Short-tailed Scimitar-babbler, Red-collared Woodpecker, Silver Pheasant, Rufous-throated Partridge, and Blue-rumped Pitta. In the afternoon, we will say goodbye to Bach Ma National Park and make our way downhill back to our hotel in Hoi An. Supplies to bring: Long trousers, a good pair of walking boots, torches, water, and insect repellent. Overnight in Hoi An.",
            meal: "Breakfast",
            image: "uploads/packages/vietnam/day6.png"
          },
          {
            shortDescription: "Day 7: Phuket: departure.",
            longDescription: "Free at leisure until the transfer to Phuket International Airport for your onward flight.",
            meal: "Breakfast",
            image: "uploads/packages/vietnam/day7.png"
          }
        ]
      },
      
      
      // Myanmar
      
      
      {
        destinationId: "667471d084ccda8d5a96158c", //Myanmar
        packageName: "Myanmar Beach break: 5 dreamy days discover islands & resorts",
        noOfDays: 5,
        overviewDetails: "A unique opportunity to discover the “One Island, One Resort” concept built on an unexplored island in the Andaman Sea of Southern Myanmar. It’s a brilliant idea to go camping in a natural way with the benefits of urban comfort on this private island, to discover a vast array of wildlife and sea species and the untouched beauty of colorful coral reefs by snorkeling, kayaking, hiking, and even diving. Book with us now to get the most fantastic trip this time to Myanmar or you can enter your dream trip in the next column, our travel experts will get back to you within 24 hours!",
        packageImage: "uploads/packages/Myanmar/banner.png",
        amountPerPerson: 350,
        locations: "Yangon - Kawthaung - Nyaung Oo Phee Island - Yangon",
        highlights: ["“One Island, One Resort” – concept built on an unexplored island.", "Camping in a natural way on this private island.", "The untouched beauty of colorful coral reefs."],
        itinerary: [
          {
            shortDescription: "Day 1:Yangon - Kawthaung",
            longDescription: "Flight from Yangon to Kawthaung. Arrive in Kawthaung, be picked up and transferred by car to Victoria Cliff Hotel & Resort for check-in. Sightseeing around Kawthaung town: Maliwun Waterfall, Natural Hot Spring, Pyi Taw Aye Pagoda, Bayintnaung Hill (the landmark of Kawthaung), 555 Hill viewpoint; here you will be amazed by the astounding bird’s eye view of Kawthaung & Andaman Sea.",
            meal: "Not Included",
            image: "uploads/packages/Myanmar/day1.png"
          },
          {
            shortDescription: "Day 2: Kawthaung - Nyaung Oo Phee island",
            longDescription: "Breakfast at Victoria Cliff Hotel & Resort; then, at 8 a.m., meet with a resort representative who will brief you on how to use a life jacket and share local knowledge about the way to the island; the boat will be shared with other passengers (the boat ride will take about 1 hour 30 minutes).",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day2.png"
          },
          {
            shortDescription: "Day 3: Nyaung Oo Phee island",
            longDescription: "After breakfast – meet at the lobby 8:30 for briefing and visit to Ja Lan island – lunch will be served at the Ja Lan Island. After lunch at around 2 p.m., return to the island by speed boat. Enjoy your time on the island. Dinner and the performance will start at 6:30 pm.",
            meal: "Breakfast, Lunch, Dinner",
          image: "uploads/packages/Myanmar/day3.png"
          },
          {
            shortDescription: "Day 4: Nyaung Oo Phee island - Kawthaung",
            longDescription: "After breakfast, the day is at leisure on the island. Lunch will be served at 11:30 am and, after that, you will be transferred by boat from the island to Kawthaung.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Myanmar/day4.png"
          },
          {
            shortDescription: "Day 5: Kawthaung - Yangon",
            longDescription: "After breakfast, transfer to the airport for your flight back to Yangon.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Myanmar/day5.png"
          }
        ]
          },
         
    {
        destinationId: "667471d084ccda8d5a96158c", //Myanmar
        packageName: "Myanmar Beach break: 5 dreamy days discover islands & resorts",
        noOfDays: 4,
        overviewDetails: "Myanmar Shalom’s Ngapali Beach Break Myanmar is ideal for travelers looking to experience a serene getaway at an unspoiled seaside destination. Ngapali is one of Myanmar’s finest sand beaches and offers the perfect setting for a blissful escape. 4 days in Ngapali will be the time for you to get away from the hustle and bustle city life, to immerse yourself in the clear sounds of nature: the murmur of coconut leaves, the sound of fishing nets being pulled, the chirping of birds as well as the sound of the fisherman laughing and joking. This tour package is highly recommended for those seeking a break in a peaceful beach location.",
        packageImage: "uploads/packages/Myanmar/banner2.png",
        amountPerPerson: 150,
        locations: "Yangon - Thandwe - Ngapali - Yangon",
        highlights: ["Ngapali – Myanmar’s finest sand beach.", "Camping in a natural way on this private island.", "The untouched beauty of colorful coral reefs."],
        itinerary: [
          {
            shortDescription: "Day 1: Yangon - Thandwe - Ngapali",
            longDescription: "Flight from Yangon to Thandwe. Transfer from Thandwe Airport to Ngapali Beach, 20 minutes away. Here, in the Bay of Bengal, is the beautiful beach of Ngapali, with its charming fishing village and coconut trees.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day1.png"
          },
          {
            shortDescription: "Day 2: Ngapali beach - free time",
            longDescription: "Enjoy two full days of leisure in Ngapali. You can simply relax on the beach, swim in the waters or take a biking excursion to nearby villages to meet local fishermen and observe their daily lifestyles. If you are seeking a more adventurous experience, take a boat trip to swim, snorkel, or dive around the surrounding islands.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day2.png"
          },
          {
            shortDescription: "Day 3:Ngapali beach - free time.",
            longDescription: "Enjoy two full days of leisure in Ngapali. You can simply relax on the beach, swim in the waters or take a biking excursion to nearby villages to meet local fishermen and observe their daily lifestyles. If you are seeking a more adventurous experience, take a boat trip to swim, snorkel, or dive around the surrounding islands.",
            meal: "Breakfast",
           image:"uploads/packages/Myanmar/day3.png"
          },
          {
            shortDescription: "Day 4:Ngapali beach - Yangon",
            longDescription: "After a leisurely day, transfer to the airport for your flight to Yangon.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day4.png"
          }
        ]
      },
        {
        destinationId: "667471d084ccda8d5a96158c", //Myanmar
        packageName: "Discover Myanmar’s 4 famous cities: 7-day tour with Travel nest",
        noOfDays: 7,
        overviewDetails: "This program is perfect for those who wish to see four major cities in a very short time. This tour will introduce you to the highlights of four major cities – Yangon, Mandalay, Bagan, and Inle Lake. On this Myanmar package tour, you will discover an enchanting country filled with historic temples, unspoiled lifestyles, and friendly people.",
        packageImage: "uploads/packages/Myanmar/banner3.png",
        amountPerPerson: 450,
        locations: "Yangon - Bagan - Mandalay - Inle - Yangon",
        highlights: ["Admire Sunset at Shwedagon Pagoda, Myanmar’s most important pagoda.", "Uncover the mystique and charm of ancient Bagan.", "Visit the 200-year-old teak bridge at U-Bein, one of the most photogenic sights in the country.", "Ride a boat across the Inle Lake for sightseeing, visit local markets, and learn the unique ways of local daily life."],
        itinerary: [
          {
            shortDescription: "Day 1:Yangon - Bagan - exploring the World Heritage Site.",
            longDescription: "Upon your arrival in Yangon, you will be welcomed by our tour guide and transferred to your hotel for check-in. Enjoy a private tour and drive through downtown to explore the city center and its fabulous mix of architecture and sites. The streets are filled with historical buildings, many of which have a faded colonial charm not seen elsewhere in Asia. Learn about the fascinating history of the city as well as get a taste of the more modern side of the city.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day1.png"
          },
          {
            shortDescription: "Day 2: Yangon - Bagan - exploring the World Heritage Site.",
            longDescription: "Morning flight to Bagan. Begin our exploration by visiting a busy local market and gaining an insight into the bustling market atmosphere in Bagan. You will spend the day going to some of the most important pagodas and temples, the architectural masterpieces of this amazing town.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day2.png"
          },
          {
            shortDescription: "Day 3: Bagan & village - mystique and charm in ancient Bagan.",
            longDescription: "More than just temples, our tour introduces you to and provides a great overview of Bagan’s history, culture, and local lifestyles. Today, see the real way of life for most Myanmar people by visiting villages near Bagan to view the local lifestyle. Continue sightseeing around Bagan and surroundings.",
            meal: "Breakfast, Lunch, Dinner",
            image: "uploads/packages/Myanmar/day3.png"
          },
          {
            shortDescription: "Day 4: Bagan - Mandalay - Amarapura Myanmar’s enchanting old capitals.",
            longDescription: "In the afternoon, visit the beautiful Golden palace teak monastery, the only remaining building from the 19th century Royal Palace. This grand teak building is known for its exquisite woodcarving.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Myanmar/day4.png"
          },
          {
            shortDescription: "Day 5: Mandalay - Heho- Inle Lake floating gardens and traditional village life.",
            longDescription: "Proceed to Inn Paw Khone village, meeting with residents to witness the traditional silk-weaving techniques with the stems of lotus flowers. Visiting Inle Lake is not just about being on the water but also about discovering the Shan and Intha villages, where you interact with locals and immerse yourself in village life.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Myanmar/day5.png"
          },
          {
            shortDescription: "Day 6: Inle Lake - Indein - village markets and unusual fishermen – Yangon.",
            longDescription: "After breakfast, begin your day with a visit to the market, which rotates locations every five days and where hill tribe people dress in colorful, traditional outfits to come and sell local products. We continue sightseeing in Inle Lake, maneuvering by boat through long, scenic channels. We will visit the fascinating village of Indein with its complex of ancient shrines and stupas and walk through exotic colonnades of stairways and shop stalls. We will visit the “long neck” tribal women, and weaving and craft villages perched on stilts. See the lake’s unique “leg rowers” – the Intha people row standing up with one leg. It is a feast for the senses and a photographer’s dream.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Myanmar/day6.png"
          },
          {
            shortDescription: "Day 7: Yangon - departure.",
            longDescription: "After breakfast, a day at leisure until you transfer to the airport for your international departure flight.",
            meal: "Breakfast",
            image: "uploads/packages/Myanmar/day7.png"
          }
        ]
      },
      //cambodia
          {
        destinationId: "667471d084ccda8d5a96158c", //cambodia
        packageName: "Explore authentic Cambodia in a 7-day classic tour",
        noOfDays: 7,
        overviewDetails: "On a 7-day classic tour, the destination experts of Viland Travel suggest two of Cambodia’s most favorite places, including the capital of Phnom Penh and the sacred land of Siem Reap. The trip is especially suitable for travelers who love culture, history, and architecture.",
        packageImage: "uploads/packages/Cambodia/banner.png",
        amountPerPerson: 450,
        locations: "Phnom Penh - Siem Reap",
        highlights: ["Learn about the historical stories behind the famous attractions in the capital, Phnom Penh.", "Admire the glorious sunrise over Angkor Wat.", "See the diverse Angkorian temples.", "Explore the rhythm of life by the largest lake in Southeast Asia.","Visit Kulen Mountain and relax by the Kulen waterfalls."],
        itinerary: [
          {
            shortDescription: "Day 1:Phnom Penh - the warmth of Cambodia.",
            longDescription: "Your flight lands at Phnom Penh International Airport, where your private transfer meets you upon arrival. The city stands at the confluence of the Mekong, Bassac, and Tonle Sap Rivers, combining big-city elegance with provincial charm.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day1.png"
          },
          {
            shortDescription: "Day 2: Phnom Penh: explore the capital’s past and present",
            longDescription: "This morning, gain insight into Cambodia’s recent dark history on a visit to the remarkable Tuol Sleng Genocide Museum, housed in the former school that was taken over by the Khmer Rouge and used as its main detention and torture center, named “S-21.” Also, visit the Killing Fields of Choeung Ek. ",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day2.png"
          },
          {
            shortDescription: "Day 3: Phnom Penh - fly to Siem Reap: visit the Angkor Museum & watch the Phare circus show",
            longDescription: "The collected images of Cambodia’s history are vibrant in your mind and will soon come to life. Your private transfer meets you at your hotel and escorts you back to the airport. Today, you will take a 45-minute flight to Siem Reap, the city known as the “Gateway to Angkor”. On arrival, you will be met by a new private guide and driver and transferred directly to your hotel downtown.",
            meal: "Breakfast, Lunch, Dinner",
            image: "uploads/packages/Cambodia/day3.png"
          },
          {
            shortDescription: "Day 4:Siem Reap: watch the sunrise over Angkor Wat & explore the complex",
            longDescription: "Watch the sunrise over the massive Angkor temple complex with a guided tour. Return to the hotel for a full-energy breakfast, and be ready for another full-day tour to immerse yourself in Khmer culture.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Cambodia/day4.png"
          },
          {
            shortDescription: "Day 5: Siem Reap: visit Kulen mountain by Jeep",
            longDescription: "Picked up from your hotel, sit back and relax on the way to Kulen Mountain, one of Cambodia’s most sacred mountains, with deeply revered ancient sites and ruins on its high plateau. Take in the scenic countryside as you pass by rice paddies, local markets, schools, villages, and Buddhist temples.",
            meal: "Breakfast, Lunch.",
            image: "uploads/packages/Cambodia/day5.png"
          },
          {
            shortDescription: "Day 6: Siem Reap: explore the rhythm of life by the largest lake in southeast asia",
            longDescription: "Enjoying a delicious breakfast with a cup of coffee is the best way to start a new day. This morning, you will have the opportunity to leave the center of Siem Reap and go to the countryside to discover the beauty of a less-known floating village on Tonle Lake. Kampong Khleang floating village is 55km from Siem Reap.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Cambodia/day6.png"
          },
          {
            shortDescription: "Day 7: Siem Reap - departure",
            longDescription: "After breakfast, your private transfer meets you at your hotel and escorts you to the airport. You board the plane filled with mixed emotions. You’re ready to journey home, but you know that you will miss Cambodia. Luckily, the memories will last a lifetime.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day7.png"
          }
        ]
      },
      
         
    {
        destinationId: "667471d084ccda8d5a96158c", //combodia
        packageName: "The very best of Cambodia 4-day tour with Travel Nest",
        noOfDays: 4,
        overviewDetails: "Cambodia is famous for its ancient Angkor Wat, peaceful countryside, paradise islands, and pristine sandy beaches. Viland travel experts have designed The best of Cambodia -14 Days for people who are looking for an answer to “What is Cambodia famous for?” It would be a beautiful drive from Siem Reap – gateway to the Angkor Complex; through the peaceful countryside of Battambang – Cambodia’s second largest city and experience the most unique transportation ever; a quick stop in Phnom Penh for the Royal Palace and the Killing Fields; and further along the southern coast to Kep town and Sihanouk Ville, before riding a speedboat to Koh Rong Island to enjoy beautiful beaches like heaven on earth. Book your trip right now and ready to discover Cambodia in two weeks.",
        packageImage: "uploads/packages/Cambodia/banner2.png",
        amountPerPerson: 200,
        locations: "Siem Reap - Battambang - Phnom Penh - Kep/Kampot - Koh Rong",
        highlights: ["Learn about the glorious period of the Khmer Dynasty through Angkor’s architecture.", "Get a new experience by riding an oxcart, tuk-tuk, quad-bike, or bamboo train.", "Have a beautiful drive from Siem Reap to Phnom Penh to see the differences in the countryside.","Search for a reason and history behind each beautiful attraction in Phnom Penh.","Back to nature with tours to Kulen Waterfalls, a Pepper plantation, and Kep National Park.","Get a happy ending with a few days to relax in Sihanouk Ville and Koh Rong beach."],
        itinerary: [
          {
            shortDescription: "Day 1:Landing in Siem Reap",
            longDescription: "Upon arrival at Siem Reap International Airport, process the immigration procedure (visa on arrival is available or obtained in advance via), then get your luggage and walk straight to the Exit Gate where our representative is waiting. After being self-introduced, you will transfer around 30 minutes to the hotel for check-in.",
            meal: "none",
            image: "uploads/packages/Cambodia/day1.png"
          },
          {
            shortDescription: "Day 2: Siem Reap: Tuk-Tuk tour to Angkor complex",
            longDescription: "We hop on a Tuk Tuk and ride to Angkor Thom, which was the masterpiece of King Jayavarman VII. Following the occupation of Angkor by the Chams from 1177 to 1181, the new king decided to build an impregnable fortress at the heart of his empire. We begin to visit Bayon Temple.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day2.png"
          },
          {
            shortDescription: "Day 3: Koh Rong island: free leisure.",
            longDescription: "Enjoy two full days of sun or swim in the warm coastal waters. This is the moment when the dream of going on vacation to an exotic land becomes reality.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day3.png"
          },
          {
            shortDescription: "Day 4: Koh Rong island - Sihanouk Ville - Phom Penh - depart for home.",
            longDescription: "We say farewell to the island and take an express boat back to Sihanouk Ville. Upon arrival at Sihanouk Ville port, meet your driver (without a guide) and drive back to Phnom Penh. Arrive in Phnom Penh and transfer to the airport for departure to the next destination. It’s time to say goodbye. We thank you for traveling with us and warmly welcome you to come again.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day4.png"
          }
        ]
      },
      
      {
        destinationId: "667471d084ccda8d5a96158c", //Cambodia
        packageName: "Uncover spectacular Siem Reap & Phnom Penh in 5 days",
        noOfDays: 5,
        overviewDetails: "Is a five-day trip enough for a trip to Cambodia? The answer is yes. Viland Travel would like to tell you about the “Cambodia Highlights” tour, which visits Siem Reap and Phnom Penh, two of the country’s most famous places. When Phnom Penh is the heart and soul of Cambodia, Siem Reap is the gateway to Angkor Wat, where the millenium-old temple ruins the Khmer. This tour gives you a bird’s-eye view of the Khmer empire and modern Cambodia. Let Viland Travel help you have wonderful experiences in Cambodia, where is famous for the gorgeous Angkor complex.",
        packageImage: "uploads/packages/Cambodia/banner3.png",
        amountPerPerson: 350,
        locations: "Siem Reap - Kampong Khleang - Phnom Penh",
        highlights: ["See the diverse Angkorian temples.", "Explore the rhythm of life by the largest lake in Southeast Asia.", "Discover the historical architecture and attractions in Phnom Penh."],
        itinerary: [
          {
            shortDescription: "Day 1:Landing in Siem Reap, Cambodia",
            longDescription: "Upon your arrival in Siem Reap, you will be welcomed by a local English-speaking guide and transferred to your hotel for check-in. Siem Reap is the base for exploring the fabled temples of Angkor, the ancient capital of the Khmer empire. Besides Angkor Complex, Siem Reap has many other beautiful sights to explore, which offer exciting activities, such as visiting the waterfalls of Kulen mountain, cycling through the peaceful countryside, or experiencing the rope swing. Adventure zipline Flight of Gibbon to see the Angkor complex from above.",
            meal: "Not Included",
            image: "uploads/packages/Cambodia/day1.png"
          },
          {
            shortDescription: "Day 2: Siem Reap: explore Angkor’s ancient wonders",
            longDescription: "Start your morning temple exploration at Ta Prohm, the most illustrious of the Small Circuit Temples. Ta Prohm is best at 7:30 am, just as the temple opens. Built in the mid-12th to early 13th centuries, Ta Prohm is unique in that it is overgrown by jungle. With many parts crumbling to the ground, it is one of the most picturesque Angkor temples. Alternatively, depending on the season and the crowds, you may wish to visit the Preah Khan temple. Built by the same king in a similar style, this larger temple complex has largely been buried in ruins and is known to very few visitors, making it a more intimate experience even in the high season.",
            meal: "Breakfast",
            image: "uploads/packages/Cambodia/day2.png"
          },
          {
            shortDescription: "Day 3: Siem Reap: visit Kampong Khleang floating village - fly to Phnom Penh",
            longDescription: "Enjoying a delicious breakfast with a cup of coffee is the best way to start a new day. This morning, you will have the opportunity to leave the center of Siem Reap and go to the countryside to discover the beauty of a less-known floating village on Tonle Lake. Kampong Khleang floating village is 55km from Siem Reap. With 10,000 people, this is currently the largest floating village in the area. After the main highway, you turn onto the winding dirt road. Stop for the hot sticky rice, and observe the local farmers working on their rice paddies. Upon arrival, you use a motor boat to explore Kampong Khleang, along with two other floating villages and the great lake.",
            meal: "Breakfast, Lunch, Dinner",
            image: "uploads/packages/Cambodia/day3.png"
          },
          {
            shortDescription: "Day 4: Phnom Penh: discover a pearl of Indochina",
            longDescription: "This morning, gain insight into Cambodia’s recent dark history on a visit to the remarkable Tuol Sleng Genocide Museum, housed in the former school that was taken over by the Khmer Rouge and used as its main detention and torture center, named “S-21.” Also, visit the Killing Fields of Choeung Ek. A moving but important visit that will allow you to dig below the surface and understand Cambodia better. After learning about some of Cambodia’s tragic past, it is time to put a smile back on your face and experience modern Khmer life.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Cambodia/day4.png"
          },
          {
            shortDescription: "Day 5: Phnom Penh - depart for home",
            longDescription: "Today is at your leisure. Breakfast is still included, and check-out is at mid-day. Depending on your departure time a private driver will pick you up from the hotel (3 hours before your flight departure time) and transfer you back to the airport for your departure flight.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Cambodia/day5.png"
          }
        ]
      },
        
        //thiland
        
      {
        destinationId: "667471d084ccda8d5a96158c", //thailand
        packageName: "7-day experience amazing Thailand: food, culture and nature",
        noOfDays: 7,
        overviewDetails: "Explore Thailand through the lenses of culture, nature, and food. This 14-day tour will take you to the highlight destinations of Thailand. Start in the bustling capital of Bangkok, which gives you the best overview of local food and Buddhist beliefs. Next, you move north to Chiang Rai and Chiang Mai, where you can immerse yourself in the green nature and learn about the daily life of the ethnic minorities there. End the trip with a dip in the crystal waters, enjoying the tropical climate and many exciting water activities in Phuket.",
        packageImage: "uploads/packages/Thailand/banner.png",
        amountPerPerson: 400,
        locations: "Bangkok - Grand Palace - Floating Market - River Kwai",
        highlights: ["Visit Bangkok to discover the magnificent architecture of ancient pagodas & street food in Chinatown.", "Experience the bridge over the River Kwai and the Dead Railway in Kanchanaburi.", "A day of experiencing Buddhist culture in Chiang Mai", "Come to Mae Tang District to visit a green tea plantation and friendly elephants.","Learn the customs and culture of the ethnic groups living in Chiang Rai."],
        itinerary: [
          {
            shortDescription: "Day 1: Landing in Bangkok, the capital of Thailand.",
            longDescription: "You are landing at Bangkok’s International Airport. Welcome to Bangkok, the capital city of Thailand, a must-see destination for any traveler interested in experiencing the rich history and culture of Southeast Asia.",
            meal: "None",
            image: "uploads/packages/Thailand/day1.png"
          },
          {
            shortDescription: "Day 2: A full-day to explore the highlights in Bangkok.",
            longDescription: " Your first stop is at Wat Traimit to visit the largest Golden Buddha statue in the world (3m high, weighs 5.5 tons, and is carved in solid gold). Your next visit is to Wat Pho to admire the massive reclining Buddha statue, which represents the entry of Buddha into Nirvana and the end of all reincarnations. Just 800m from Wat Pho, you will visit the Grand Palace. The dazzling, spectacular Grand Palace is undoubtedly the most famous landmark in Bangkok and a must-see. Continues with a long-tail boat ride along the canal to see Thai houses and typical rural life as well as a visit to the Temple of Dawn before ending your day.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day2.png"
          },
          {
            shortDescription: "Day 3: Visit a floating market & street food tour in China Town.",
            longDescription: "For food lovers, visiting Bangkok’s Chinatown at night is a memorable food tour. From 7 pm, Chinatown was bustling with colorful lights; food stalls with delicious Chinese dishes such as wonton noodles, dumplings, fried shrimp with cashew nuts, and candied gourds.",
            meal: "Breakfast, Lunch, Dinner",
          },
          {
            shortDescription: "Day 4: A full-day tour of Chiang Mai city & Thai cooking class.",
            longDescription: " Meet your private tour guide and driver at 6:00 for an early departure for Doi Suthep Mountain. You can expect to be there in time and participate in the local almsgiving ceremony, a custom in Theravada Buddhist countries that helps to sustain the monastic community. In Thailand, this ritual morning food donation to the monks, or almsgiving, is called DAK BAT, and the image of barefooted monks carrying their alms bowls in the dawn becomes a beauty that attracts many photographers.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Thailand/day4.png"
          },
          {
            shortDescription: "Day 5: Chiang Rai: Uncover the life on the Mekong River",
            longDescription: " This morning we’ll take you on a trip along the Upper Mekong at the Lao PDR border. Start at Chiang Saen, one of the oldest archaeological sites in northern Thailand; make a stop at Wat Phrathat Chomkiti. Visit Ban Had Bai, a Thai Lue weaving village.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Thailand/day5.png"
          },
          {
            shortDescription: "Day 6: Chiang Rai: Visit local hilltribes.",
            longDescription: " Start the day with visits to traditional Akha and Yao hill tribe villages. The Akha originated in Tibet and are among the poorest of Thailand’s ethnic minorities. The Yao originated in China and is strongly influenced by Chinese traditions. Although different in many ways, they have managed to live peacefully for decades.",
            meal: "Breakfast, Lunch",
            image: "uploads/packages/Thailand/day6.png"
          },
          {
            shortDescription: "Day 7: Departure for home.",
            longDescription: "After breakfast, a day at leisure until you transfer to the airport for your international departure flight.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day7.png"
          }
        ]
      },
      
       
    {
        destinationId: "667471d084ccda8d5a96158f", //Thailand
        packageName: "A 5-day memorable honeymoon in Thailand",
        noOfDays: 5,
        overviewDetails: " You are planning your first visit to Thailand. And you are looking for answers to the questions: where to go and what to do. Then, Viland Travel has designed Amazing Thailand Travel 5-day trip as a perfect suggestion just for you.",
        packageImage: "uploads/packages/Thailand/banner2.png",
        amountPerPerson: 350,
        locations: "Bangkok - Ayutthaya - Lopburi - Phitsanulok - Sukhothai - Chiang Mai ",
        highlights: ["In Bangkok: Visit the Royal Palace, try street food, and join a Muay Thai class.", "Travel from Bangkok to Chiang Mai to explore the north countryside by train.", "To have only one night on train to get a new experience.", "Have a happy ending with three wonderfully relaxing days on Krabi Island."],
        itinerary: [
          {
          
            shortDescription: "Day 1: Muay Thai Class by Watchara Muay Thai Gym",
            longDescription: "Immerse yourself in a local cultural practice while you get your blood pumping by joining this fun and exciting Muay Thai class in Bangkok that’ll teach you all you need about this ancient martial art! The Muay Thai class is run by Watchara MuayThai Gym, a local martial arts studio known for its friendly instructors and high-quality courses, where you’re sure to get that coveted adrenaline rush with the course you take. Beginners will enjoy the introductory courses, where they will learn the fundamentals as well as all of the necessary techniques to prepare them for more advanced maneuvers at the next level. On the other hand, more advanced participants will be able to work on their personal fitness goals and spar with their classmates inside the air-conditioned classroom. Get handy tips and tricks from your professional English-speaking instructors, who will guide you through the entire duration of the two-hour class tour. If you’re looking for a more personalized experience or simply want a hands-on class with your teacher, a private course is a perfect choice for both groups and individuals. Muay Thai is a must-try activity for those looking for new things and for those who crave an unforgettable experience during their days in Bangkok.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day1.png"
          },
          {
            shortDescription: "Day 2: Bangkok – train to Ayutthaya: cycling to the historical park",
            longDescription: "After finishing breakfast, you check out. Viland Travel will bring you to Hua Lampong train station, where you can get a ticket and depart for Ayutthaya. Train transfer, Train #75, Dep. 08:20 Bangkok Hua Lampong – Arr. 09:39 Ayutthaya. This trip is a chance to see the scenery from the outskirts of the Thai capital down to the green farms and surrounding villages. Upon arrival, see Viland Travel’s driver and drive to the cycling starting point. Ride a bike to Ayutthaya Historical Park and visit the ancient palace grounds. Wat Phra Sri Sanphet, lying beside the Grand Palace, was once the most significant temple during the Ayutthaya period. Adjacent to Wat Phra Sri Sanphet is Wihan Phra Mongkhon Bophit, an impressive building that houses a seated bronze Buddha image. Lunch is at Malakor, a local Thai restaurant. After lunch, embark on a private transfer to Bang Pa-in Summer Palace, south of Ayutthaya. Visit the beautiful palace, followed by Wat Niwet Thammaprawat, the Gothic-style temple. End the tour there, and transfer to your hotel in the city.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day2.png"
          },
          {
            shortDescription: "Day 3: Krabi: beach relaxation",
            longDescription: " Enjoy a wonderfully relaxing day together in Krabi. Laze on the beautiful beaches or spend time snorkeling or diving in the azure waters teeming with colorful coral reefs and tropical marine creatures",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Thailand/day3.png"
          },
            {
            shortDescription: "Day 4: Bangkok – train to Ayutthaya: cycling to the historical park",
            longDescription: "After finishing breakfast, you check out. Viland Travel will bring you to Hua Lampong train station, where you can get a ticket and depart for Ayutthaya. Train transfer, Train #75, Dep. 08:20 Bangkok Hua Lampong – Arr. 09:39 Ayutthaya. This trip is a chance to see the scenery from the outskirts of the Thai capital down to the green farms and surrounding villages. Upon arrival, see Viland Travel’s driver and drive to the cycling starting point. Ride a bike to Ayutthaya Historical Park and visit the ancient palace grounds. Wat Phra Sri Sanphet, lying beside the Grand Palace, was once the most significant temple during the Ayutthaya period. Adjacent to Wat Phra Sri Sanphet is Wihan Phra Mongkhon Bophit, an impressive building that houses a seated bronze Buddha image. Lunch is at Malakor, a local Thai restaurant. After lunch, embark on a private transfer to Bang Pa-in Summer Palace, south of Ayutthaya. Visit the beautiful palace, followed by Wat Niwet Thammaprawat, the Gothic-style temple. End the tour there, and transfer to your hotel in the city.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day4.png"
            },
          {
            shortDescription: "Day 5: Ayutthaya – train to Lopburi: city tour - train to Phitsanulok",
            longDescription: "Saying goodbye to the ancient Ayutthaya, you ride a train, head to the north, and arrive in a small town called. Lopburi. Train 111, Dep. 08:37 Ayutthaya – Arr. 09:42. Upon arrival, meet your local tour guide and take a leisurely walk to Prang Sam Yot, situated just opposite the railway station. This more than 800-years-old temple is considered the most ancient religious structure here, built when the city was under the control of the Khmer empire. The temple consists of 3 main towers in the classical style of Khmer architecture. The most impressive scene at the temple is a group of monkeys freely walking around, making friends, and playing with tourists. Afterward, proceed by van transfer to King Narai’s Palace. Then, continue further along the Lopburi River to a local restaurant for lunch. Afterward, head back to the train station and board the train to Phitsanulok.",
            meal: "Breakfast, Lunch, Dinner.",
            image: "uploads/packages/Thailand/day5.png"
          }
        ]
          },	   
      {
        destinationId: "667471d084ccda8d5a96158c", //thailand
        packageName: " Amazing Thailand Travel 4-Day Tour",
        noOfDays: 4,
        overviewDetails: "You are planning your first visit to Thailand. And you are looking for answers to the questions: where to go and what to do. Then, Viland Travel has designed Amazing Thailand Travel 4-day trip as a perfect suggestion just for you. Start from Bangkok, where you can learn about Buddhist beliefs through the magnificent architecture of temples and massive Buddha statues; surely you will not be able to miss the food tour by Tuk Tuk in this bustle and hustle capital. Move north to Chiang Mai to immerse yourself in nature and discover one of the most unique cuisines in the world; you will have the opportunity to get close to and take care of the friendly elephants as well as participate in a cooking class to make your own traditional Thai dishes. The trip ends with moving south, spending the last four days enjoying the paradise island of Phuket.",
        packageImage: "uploads/packages/Thailand/banner3.png",
        amountPerPerson: 250,
        locations: " Bangkok – Ayutthaya - Chiang Mai – Doi Su Thep ",
        highlights: ["Visit Bangkok to learn about the contracts in the flow of culture there.", " Explore Ayutthaya, the ancient capital of ups and downs.", " Admire the most beautiful ancient temples in Chiang Mai Old Town.”, “Take a cooking class to gain a deeper insight into Thai cuisine.”, “Spend a day learning and caring for baby elephants in the Patara Camp.”, “Enjoy the paradise island of Phuket with swimming, kayaking & snorkeling activities."],
        itinerary: [
          {
            shortDescription: "Day 1: Chiang Mai: Experience the baby elephant program in Patara Farm",
            longDescription: " The emphasis is on caring for our pregnant elephants and mothers with babies. You will learn about the conservation philosophy called “The Elephant Conservation In Action” and participate in the daily healthcare routine, which includes health inspection, feeding, walking with the elephants for exercise, and bathing. It is a great chance to observe the elephants interacting with their families in natural environments. Patara’s knowledgeable staff will provide you with further information regarding their daily care.",
            meal: "Not Included",
            image: "uploads/packages/Thailand/day1.png"
          },
          {
            shortDescription: "Day 2: Phuket - relax on the paradise island (Option: kayaking in Phang Nga Bay",
            longDescription: "Breakfast at Victoria Cliff Hotel & Resort; then, at 8 a.m., meet with a resort representative who will brief you on how to use a life jacket and share local knowledge about the way to the island; the boat will be shared with other passengers (the boat ride will take about 1 hour 30 minutes).",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day2.png"
          },
          {
            shortDescription: "Day 3: Bangkok – fly to Chiang Mai, UNESCO World Heritage Site",
            longDescription: " Depending on your departure time, a private driver will pick you up from the hotel (2 hours before your flight departure time) and transfer you to the airport for your flight to Chiang Mai. Upon arrival at Chiang Mai Airport, your private tour guide and driver will meet and transfer you to your hotel in the Old Town area to check-in. The rest of the day will be yours to explore at your leisure.",
            meal: "Breakfast, Lunch, Dinner"
          },
          {
            shortDescription: "Day 7: Departure for home.",
            longDescription: "After breakfast, a day at leisure until you transfer to the airport for your international departure flight.",
            meal: "Breakfast",
            image: "uploads/packages/Thailand/day4.png",
          }
        ]
      },
      
    ]
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
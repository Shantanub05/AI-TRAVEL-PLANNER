export const SelectTravelersList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'Solo traveler exploring the world',
    icon: '🧑🏻',
    people: "1"
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers journeying together',
    icon: '🧑🏻‍🤝‍👩🏻',
    people: "2"
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A family traveling together',
    icon: '👨🏻‍👩🏻‍👧🏻‍👦🏻',
    people: "4+"
  },
  {
    id: 4,
    title: 'Group',
    desc: 'A group of friends or colleagues on an adventure',
    icon: '👨🏻‍👩🏻‍👧🏻‍👦🏻👩‍👦👪',
    people: "6+"
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Save money while enjoying your trip',
    icon: '💰'
  },
  {
    id: 2,
    title: 'Mid-Range',
    desc: 'Balance between comfort and cost',
    icon: '💵'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experiences and accommodations',
    icon: '👑'
  },
  {
    id: 4,
    title: 'Ultra-Luxury',
    desc: 'Exclusive high-end travel experience',
    icon: '✨'
  }
];

export const AI_PROMPT=`Generate a comprehensive travel plan in JSON format for the following parameters:

    Location: {location}

    Duration: {totalDays} day(s) and {totalNights} night(s)

    Traveler Type: {travelerType}

    Budget Option: {budget}

The plan should include the following details:

    Flight Details:
        - Flight number and airline
        - Departure and arrival times
        - Flight price and a booking URL

    Hotel Options (Provide a list of hotels):
        - Hotel Name and Address
        - Price per night
        - Hotel image URL
        - Geo-coordinates (latitude and longitude)
        - Rating and a brief description

    Nearby Attractions (Provide a list of places to visit):
        - Place Name and detailed description
        - Place image URL
        - Geo-coordinates (latitude and longitude)
        - Ticket pricing information
        - Recommended best time to visit each attraction

    Itinerary (Outline a day-wise plan):
        For each day, provide a detailed itinerary that includes:
            - Scheduled activities with start times
            - Estimated travel times between locations
            - Best times to visit each location

Output the entire travel plan as valid JSON with clear keys for "flights", "hotels", "attractions", and "itinerary".`

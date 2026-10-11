export interface StateData {
  state: string;
  cities: string[];
}

export interface CountryData {
  country: string;
  states: StateData[];
}

export const LOCATIONS_DATA: CountryData[] = [
  {
    country: "Indonesia",
    states: [
      {
        state: "East Java",
        cities: [
          "Pasuruan",
          "Surabaya",
          "Malang",
          "Sidoarjo",
          "Banyuwangi",
          "Probolinggo",
          "Kediri",
          "Madiun",
          "Jember",
          "Blitar",
        ],
      },
      {
        state: "West Java",
        cities: ["Bandung", "Bekasi", "Bogor", "Depok", "Cirebon", "Sukabumi"],
      },
      {
        state: "Central Java",
        cities: ["Semarang", "Surakarta (Solo)", "Magelang", "Pekalongan", "Tegal"],
      },
      {
        state: "DKI Jakarta",
        cities: [
          "Central Jakarta",
          "South Jakarta",
          "West Jakarta",
          "North Jakarta",
          "East Jakarta",
        ],
      },
      {
        state: "Bali",
        cities: ["Denpasar", "Badung", "Gianyar", "Tabanan", "Buleleng"],
      },
      {
        state: "Yogyakarta",
        cities: ["Yogyakarta City", "Sleman", "Bantul", "Gunungkidul"],
      },
    ],
  },
  {
    country: "United States",
    states: [
      {
        state: "California",
        cities: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento"],
      },
      {
        state: "New York",
        cities: ["New York City", "Buffalo", "Rochester", "Albany"],
      },
      {
        state: "Texas",
        cities: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"],
      },
      {
        state: "Florida",
        cities: ["Miami", "Orlando", "Tampa", "Jacksonville"],
      },
    ],
  },
  {
    country: "Malaysia",
    states: [
      {
        state: "Kuala Lumpur",
        cities: ["Kuala Lumpur", "Cheras", "Bukit Bintang"],
      },
      {
        state: "Selangor",
        cities: ["Petaling Jaya", "Shah Alam", "Subang Jaya", "Klang"],
      },
      {
        state: "Penang",
        cities: ["George Town", "Butterworth", "Bayan Lepas"],
      },
    ],
  },
  {
    country: "United Kingdom",
    states: [
      {
        state: "England",
        cities: ["London", "Manchester", "Birmingham", "Liverpool", "Leeds"],
      },
      {
        state: "Scotland",
        cities: ["Edinburgh", "Glasgow", "Aberdeen"],
      },
    ],
  },
  {
    country: "Singapore",
    states: [
      {
        state: "Singapore",
        cities: ["Central Region", "West Region", "East Region", "North Region"],
      },
    ],
  },
  {
    country: "Australia",
    states: [
      {
        state: "New South Wales",
        cities: ["Sydney", "Newcastle", "Wollongong"],
      },
      {
        state: "Victoria",
        cities: ["Melbourne", "Geelong", "Ballarat"],
      },
      {
        state: "Queensland",
        cities: ["Brisbane", "Gold Coast", "Cairns"],
      },
    ],
  },
];

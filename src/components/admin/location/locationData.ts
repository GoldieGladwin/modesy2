import {
  CountryItem,
  StateItem,
  CityItem,
  LocationSettings,
} from "./types";

export const CONTINENTS = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

export const INITIAL_COUNTRIES: CountryItem[] = [
  { id: 1, name: "Afghanistan", slug: "afghanistan", continent: "Asia", status: "Active" },
  { id: 2, name: "Albania", slug: "albania", continent: "Europe", status: "Active" },
  { id: 3, name: "Algeria", slug: "algeria", continent: "Africa", status: "Active" },
  { id: 4, name: "American Samoa", slug: "american-samoa", continent: "Oceania", status: "Active" },
  { id: 5, name: "Andorra", slug: "andorra", continent: "Europe", status: "Active" },
  { id: 6, name: "Angola", slug: "angola", continent: "Africa", status: "Active" },
  { id: 7, name: "Anguilla", slug: "anguilla", continent: "North America", status: "Active" },
  { id: 8, name: "Antarctica", slug: "antarctica", continent: "Antarctica", status: "Active" },
  { id: 9, name: "Antigua and Barbuda", slug: "antigua-and-barbuda", continent: "North America", status: "Active" },
  { id: 10, name: "Argentina", slug: "argentina", continent: "South America", status: "Active" },
  { id: 11, name: "Armenia", slug: "armenia", continent: "Asia", status: "Active" },
  { id: 12, name: "Aruba", slug: "aruba", continent: "North America", status: "Active" },
  { id: 13, name: "Australia", slug: "australia", continent: "Oceania", status: "Active" },
  { id: 14, name: "Austria", slug: "austria", continent: "Europe", status: "Active" },
  { id: 15, name: "Azerbaijan", slug: "azerbaijan", continent: "Asia", status: "Active" },
  { id: 16, name: "Bahamas", slug: "bahamas", continent: "North America", status: "Active" },
  { id: 17, name: "Bahrain", slug: "bahrain", continent: "Asia", status: "Active" },
  { id: 18, name: "Bangladesh", slug: "bangladesh", continent: "Asia", status: "Active" },
  { id: 19, name: "Barbados", slug: "barbados", continent: "North America", status: "Active" },
  { id: 20, name: "Belarus", slug: "belarus", continent: "Europe", status: "Active" },
  { id: 21, name: "Belgium", slug: "belgium", continent: "Europe", status: "Active" },
  { id: 22, name: "Belize", slug: "belize", continent: "North America", status: "Active" },
  { id: 23, name: "Benin", slug: "benin", continent: "Africa", status: "Active" },
  { id: 24, name: "Bermuda", slug: "bermuda", continent: "North America", status: "Active" },
  { id: 25, name: "Bhutan", slug: "bhutan", continent: "Asia", status: "Active" },
  { id: 26, name: "Bolivia", slug: "bolivia", continent: "South America", status: "Active" },
  { id: 27, name: "Bosnia and Herzegovina", slug: "bosnia-and-herzegovina", continent: "Europe", status: "Active" },
  { id: 28, name: "Botswana", slug: "botswana", continent: "Africa", status: "Active" },
  { id: 29, name: "Brazil", slug: "brazil", continent: "South America", status: "Active" },
  { id: 30, name: "Brunei", slug: "brunei", continent: "Asia", status: "Active" },
  { id: 31, name: "Bulgaria", slug: "bulgaria", continent: "Europe", status: "Active" },
  { id: 32, name: "Burkina Faso", slug: "burkina-faso", continent: "Africa", status: "Active" },
  { id: 33, name: "Burundi", slug: "burundi", continent: "Africa", status: "Active" },
  { id: 34, name: "Cambodia", slug: "cambodia", continent: "Asia", status: "Active" },
  { id: 35, name: "Cameroon", slug: "cameroon", continent: "Africa", status: "Active" },
  { id: 36, name: "Canada", slug: "canada", continent: "North America", status: "Active" },
  { id: 37, name: "Cape Verde", slug: "cape-verde", continent: "Africa", status: "Active" },
  { id: 38, name: "Cayman Islands", slug: "cayman-islands", continent: "North America", status: "Active" },
  { id: 39, name: "Central African Republic", slug: "central-african-republic", continent: "Africa", status: "Active" },
  { id: 40, name: "Chad", slug: "chad", continent: "Africa", status: "Active" },
  { id: 41, name: "Chile", slug: "chile", continent: "South America", status: "Active" },
  { id: 42, name: "China", slug: "china", continent: "Asia", status: "Active" },
  { id: 43, name: "Colombia", slug: "colombia", continent: "South America", status: "Active" },
  { id: 44, name: "Comoros", slug: "comoros", continent: "Africa", status: "Active" },
  { id: 45, name: "Congo", slug: "congo", continent: "Africa", status: "Active" },
  { id: 46, name: "Costa Rica", slug: "costa-rica", continent: "North America", status: "Active" },
  { id: 47, name: "Croatia", slug: "croatia", continent: "Europe", status: "Active" },
  { id: 48, name: "Cuba", slug: "cuba", continent: "North America", status: "Active" },
  { id: 49, name: "Cyprus", slug: "cyprus", continent: "Europe", status: "Active" },
  { id: 50, name: "Czech Republic", slug: "czech-republic", continent: "Europe", status: "Active" },
  { id: 51, name: "Denmark", slug: "denmark", continent: "Europe", status: "Active" },
  { id: 52, name: "Djibouti", slug: "djibouti", continent: "Africa", status: "Active" },
  { id: 53, name: "Dominica", slug: "dominica", continent: "North America", status: "Active" },
  { id: 54, name: "Dominican Republic", slug: "dominican-republic", continent: "North America", status: "Active" },
  { id: 55, name: "East Timor", slug: "east-timor", continent: "Asia", status: "Active" },
  { id: 56, name: "Ecuador", slug: "ecuador", continent: "South America", status: "Active" },
  { id: 57, name: "Egypt", slug: "egypt", continent: "Africa", status: "Active" },
  { id: 58, name: "El Salvador", slug: "el-salvador", continent: "North America", status: "Active" },
  { id: 59, name: "Equatorial Guinea", slug: "equatorial-guinea", continent: "Africa", status: "Active" },
  { id: 60, name: "Eritrea", slug: "eritrea", continent: "Africa", status: "Active" },
  { id: 61, name: "Estonia", slug: "estonia", continent: "Europe", status: "Active" },
  { id: 62, name: "Eswatini", slug: "eswatini", continent: "Africa", status: "Active" },
  { id: 63, name: "Ethiopia", slug: "ethiopia", continent: "Africa", status: "Active" },
  { id: 64, name: "Fiji", slug: "fiji", continent: "Oceania", status: "Active" },
  { id: 65, name: "Finland", slug: "finland", continent: "Europe", status: "Active" },
  { id: 66, name: "France", slug: "france", continent: "Europe", status: "Active" },
  { id: 67, name: "French Guiana", slug: "french-guiana", continent: "South America", status: "Active" },
  { id: 68, name: "French Polynesia", slug: "french-polynesia", continent: "Oceania", status: "Active" },
  { id: 69, name: "Gabon", slug: "gabon", continent: "Africa", status: "Active" },
  { id: 70, name: "Gambia", slug: "gambia", continent: "Africa", status: "Active" },
  { id: 71, name: "Georgia", slug: "georgia", continent: "Asia", status: "Active" },
  { id: 72, name: "Germany", slug: "germany", continent: "Europe", status: "Active" },
  { id: 73, name: "Ghana", slug: "ghana", continent: "Africa", status: "Active" },
  { id: 74, name: "Gibraltar", slug: "gibraltar", continent: "Europe", status: "Active" },
  { id: 75, name: "Greece", slug: "greece", continent: "Europe", status: "Active" },
  { id: 76, name: "Greenland", slug: "greenland", continent: "North America", status: "Active" },
  { id: 77, name: "Grenada", slug: "grenada", continent: "North America", status: "Active" },
  { id: 78, name: "Guadeloupe", slug: "guadeloupe", continent: "North America", status: "Active" },
  { id: 79, name: "Guam", slug: "guam", continent: "Oceania", status: "Active" },
  { id: 80, name: "Guatemala", slug: "guatemala", continent: "North America", status: "Active" },
  { id: 81, name: "Guinea", slug: "guinea", continent: "Africa", status: "Active" },
  { id: 82, name: "Guinea-Bissau", slug: "guinea-bissau", continent: "Africa", status: "Active" },
  { id: 83, name: "Guyana", slug: "guyana", continent: "South America", status: "Active" },
  { id: 84, name: "Haiti", slug: "haiti", continent: "North America", status: "Active" },
  { id: 85, name: "Honduras", slug: "honduras", continent: "North America", status: "Active" },
  { id: 86, name: "Hong Kong", slug: "hong-kong", continent: "Asia", status: "Active" },
  { id: 87, name: "Hungary", slug: "hungary", continent: "Europe", status: "Active" },
  { id: 88, name: "Iceland", slug: "iceland", continent: "Europe", status: "Active" },
  { id: 89, name: "India", slug: "india", continent: "Asia", status: "Active" },
  { id: 90, name: "Indonesia", slug: "indonesia", continent: "Asia", status: "Active" },
  { id: 91, name: "Iran", slug: "iran", continent: "Asia", status: "Active" },
  { id: 92, name: "Iraq", slug: "iraq", continent: "Asia", status: "Active" },
  { id: 93, name: "Ireland", slug: "ireland", continent: "Europe", status: "Active" },
  { id: 94, name: "Israel", slug: "israel", continent: "Asia", status: "Active" },
  { id: 95, name: "Italy", slug: "italy", continent: "Europe", status: "Active" },
  { id: 96, name: "Ivory Coast", slug: "ivory-coast", continent: "Africa", status: "Active" },
  { id: 97, name: "Jamaica", slug: "jamaica", continent: "North America", status: "Active" },
  { id: 98, name: "Japan", slug: "japan", continent: "Asia", status: "Active" },
  { id: 99, name: "Jordan", slug: "jordan", continent: "Asia", status: "Active" },
  { id: 100, name: "Kazakhstan", slug: "kazakhstan", continent: "Asia", status: "Active" },
  { id: 101, name: "Kenya", slug: "kenya", continent: "Africa", status: "Active" },
  { id: 102, name: "Kiribati", slug: "kiribati", continent: "Oceania", status: "Active" },
  { id: 103, name: "Kuwait", slug: "kuwait", continent: "Asia", status: "Active" },
  { id: 104, name: "Kyrgyzstan", slug: "kyrgyzstan", continent: "Asia", status: "Active" },
  { id: 105, name: "Laos", slug: "laos", continent: "Asia", status: "Active" },
  { id: 106, name: "Latvia", slug: "latvia", continent: "Europe", status: "Active" },
  { id: 107, name: "Lebanon", slug: "lebanon", continent: "Asia", status: "Active" },
  { id: 108, name: "Lesotho", slug: "lesotho", continent: "Africa", status: "Active" },
  { id: 109, name: "Liberia", slug: "liberia", continent: "Africa", status: "Active" },
  { id: 110, name: "Libya", slug: "libya", continent: "Africa", status: "Active" },
  { id: 111, name: "Liechtenstein", slug: "liechtenstein", continent: "Europe", status: "Active" },
  { id: 112, name: "Lithuania", slug: "lithuania", continent: "Europe", status: "Active" },
  { id: 113, name: "Luxembourg", slug: "luxembourg", continent: "Europe", status: "Active" },
  { id: 114, name: "Macao", slug: "macao", continent: "Asia", status: "Active" },
  { id: 115, name: "Madagascar", slug: "madagascar", continent: "Africa", status: "Active" },
  { id: 116, name: "Malawi", slug: "malawi", continent: "Africa", status: "Active" },
  { id: 117, name: "Malaysia", slug: "malaysia", continent: "Asia", status: "Active" },
  { id: 118, name: "Maldives", slug: "maldives", continent: "Asia", status: "Active" },
  { id: 119, name: "Mali", slug: "mali", continent: "Africa", status: "Active" },
  { id: 120, name: "Malta", slug: "malta", continent: "Europe", status: "Active" },
  { id: 121, name: "Marshall Islands", slug: "marshall-islands", continent: "Oceania", status: "Active" },
  { id: 122, name: "Martinique", slug: "martinique", continent: "North America", status: "Active" },
  { id: 123, name: "Mauritania", slug: "mauritania", continent: "Africa", status: "Active" },
  { id: 124, name: "Mauritius", slug: "mauritius", continent: "Africa", status: "Active" },
  { id: 125, name: "Mexico", slug: "mexico", continent: "North America", status: "Active" },
  { id: 126, name: "Micronesia", slug: "micronesia", continent: "Oceania", status: "Active" },
  { id: 127, name: "Moldova", slug: "moldova", continent: "Europe", status: "Active" },
  { id: 128, name: "Monaco", slug: "monaco", continent: "Europe", status: "Active" },
  { id: 129, name: "Mongolia", slug: "mongolia", continent: "Asia", status: "Active" },
  { id: 130, name: "Montenegro", slug: "montenegro", continent: "Europe", status: "Active" },
  { id: 131, name: "Montserrat", slug: "montserrat", continent: "North America", status: "Active" },
  { id: 132, name: "Morocco", slug: "morocco", continent: "Africa", status: "Active" },
  { id: 133, name: "Mozambique", slug: "mozambique", continent: "Africa", status: "Active" },
  { id: 134, name: "Myanmar", slug: "myanmar", continent: "Asia", status: "Active" },
  { id: 135, name: "Namibia", slug: "namibia", continent: "Africa", status: "Active" },
  { id: 136, name: "Nauru", slug: "nauru", continent: "Oceania", status: "Active" },
  { id: 137, name: "Nepal", slug: "nepal", continent: "Asia", status: "Active" },
  { id: 138, name: "Netherlands", slug: "netherlands", continent: "Europe", status: "Active" },
  { id: 139, name: "New Caledonia", slug: "new-caledonia", continent: "Oceania", status: "Active" },
  { id: 140, name: "New Zealand", slug: "new-zealand", continent: "Oceania", status: "Active" },
  { id: 141, name: "Nicaragua", slug: "nicaragua", continent: "North America", status: "Active" },
  { id: 142, name: "Niger", slug: "niger", continent: "Africa", status: "Active" },
  { id: 143, name: "Nigeria", slug: "nigeria", continent: "Africa", status: "Active" },
  { id: 144, name: "North Korea", slug: "north-korea", continent: "Asia", status: "Active" },
  { id: 145, name: "North Macedonia", slug: "north-macedonia", continent: "Europe", status: "Active" },
  { id: 146, name: "Northern Mariana Islands", slug: "northern-mariana-islands", continent: "Oceania", status: "Active" },
  { id: 147, name: "Norway", slug: "norway", continent: "Europe", status: "Active" },
  { id: 148, name: "Oman", slug: "oman", continent: "Asia", status: "Active" },
  { id: 149, name: "Pakistan", slug: "pakistan", continent: "Asia", status: "Active" },
  { id: 150, name: "Palau", slug: "palau", continent: "Oceania", status: "Active" },
  { id: 151, name: "Palestine", slug: "palestine", continent: "Asia", status: "Active" },
  { id: 152, name: "Panama", slug: "panama", continent: "North America", status: "Active" },
  { id: 153, name: "Papua New Guinea", slug: "papua-new-guinea", continent: "Oceania", status: "Active" },
  { id: 154, name: "Paraguay", slug: "paraguay", continent: "South America", status: "Active" },
  { id: 155, name: "Peru", slug: "peru", continent: "South America", status: "Active" },
  { id: 156, name: "Philippines", slug: "philippines", continent: "Asia", status: "Active" },
  { id: 157, name: "Poland", slug: "poland", continent: "Europe", status: "Active" },
  { id: 158, name: "Portugal", slug: "portugal", continent: "Europe", status: "Active" },
  { id: 159, name: "Puerto Rico", slug: "puerto-rico", continent: "North America", status: "Active" },
  { id: 160, name: "Qatar", slug: "qatar", continent: "Asia", status: "Active" },
  { id: 161, name: "Reunion", slug: "reunion", continent: "Africa", status: "Active" },
  { id: 162, name: "Romania", slug: "romania", continent: "Europe", status: "Active" },
  { id: 163, name: "Russia", slug: "russia", continent: "Europe", status: "Active" },
  { id: 164, name: "Rwanda", slug: "rwanda", continent: "Africa", status: "Active" },
  { id: 165, name: "Saint Kitts and Nevis", slug: "saint-kitts-and-nevis", continent: "North America", status: "Active" },
  { id: 166, name: "Saint Lucia", slug: "saint-lucia", continent: "North America", status: "Active" },
  { id: 167, name: "Saint Martin", slug: "saint-martin", continent: "North America", status: "Active" },
  { id: 168, name: "Saint Vincent and the Grenadines", slug: "saint-vincent-and-the-grenadines", continent: "North America", status: "Active" },
  { id: 169, name: "Samoa", slug: "samoa", continent: "Oceania", status: "Active" },
  { id: 170, name: "San Marino", slug: "san-marino", continent: "Europe", status: "Active" },
  { id: 171, name: "Sao Tome and Principe", slug: "sao-tome-and-principe", continent: "Africa", status: "Active" },
  { id: 172, name: "Saudi Arabia", slug: "saudi-arabia", continent: "Asia", status: "Active" },
  { id: 173, name: "Senegal", slug: "senegal", continent: "Africa", status: "Active" },
  { id: 174, name: "Serbia", slug: "serbia", continent: "Europe", status: "Active" },
  { id: 175, name: "Seychelles", slug: "seychelles", continent: "Africa", status: "Active" },
  { id: 176, name: "Sierra Leone", slug: "sierra-leone", continent: "Africa", status: "Active" },
  { id: 177, name: "Singapore", slug: "singapore", continent: "Asia", status: "Active" },
  { id: 178, name: "Sint Maarten", slug: "sint-maarten", continent: "North America", status: "Active" },
  { id: 179, name: "Slovakia", slug: "slovakia", continent: "Europe", status: "Active" },
  { id: 180, name: "Slovenia", slug: "slovenia", continent: "Europe", status: "Active" },
  { id: 181, name: "Solomon Islands", slug: "solomon-islands", continent: "Oceania", status: "Active" },
  { id: 182, name: "Somalia", slug: "somalia", continent: "Africa", status: "Active" },
  { id: 183, name: "South Africa", slug: "south-africa", continent: "Africa", status: "Active" },
  { id: 184, name: "South Korea", slug: "south-korea", continent: "Asia", status: "Active" },
  { id: 185, name: "South Sudan", slug: "south-sudan", continent: "Africa", status: "Active" },
  { id: 186, name: "Spain", slug: "spain", continent: "Europe", status: "Active" },
  { id: 187, name: "Sri Lanka", slug: "sri-lanka", continent: "Asia", status: "Active" },
  { id: 188, name: "Sudan", slug: "sudan", continent: "Africa", status: "Active" },
  { id: 189, name: "Suriname", slug: "suriname", continent: "South America", status: "Active" },
  { id: 190, name: "Sweden", slug: "sweden", continent: "Europe", status: "Active" },
  { id: 191, name: "Switzerland", slug: "switzerland", continent: "Europe", status: "Active" },
  { id: 192, name: "Syria", slug: "syria", continent: "Asia", status: "Active" },
  { id: 193, name: "Taiwan", slug: "taiwan", continent: "Asia", status: "Active" },
  { id: 194, name: "Tajikistan", slug: "tajikistan", continent: "Asia", status: "Active" },
  { id: 195, name: "Tanzania", slug: "tanzania", continent: "Africa", status: "Active" },
  { id: 196, name: "Thailand", slug: "thailand", continent: "Asia", status: "Active" },
  { id: 197, name: "Togo", slug: "togo", continent: "Africa", status: "Active" },
  { id: 198, name: "Tonga", slug: "tonga", continent: "Oceania", status: "Active" },
  { id: 199, name: "Trinidad and Tobago", slug: "trinidad-and-tobago", continent: "North America", status: "Active" },
  { id: 200, name: "Tunisia", slug: "tunisia", continent: "Africa", status: "Active" },
  { id: 201, name: "Turkey", slug: "turkey", continent: "Europe", status: "Active" },
  { id: 202, name: "Turkmenistan", slug: "turkmenistan", continent: "Asia", status: "Active" },
  { id: 203, name: "Turks and Caicos Islands", slug: "turks-and-caicos-islands", continent: "North America", status: "Active" },
  { id: 204, name: "Tuvalu", slug: "tuvalu", continent: "Oceania", status: "Active" },
  { id: 205, name: "Uganda", slug: "uganda", continent: "Africa", status: "Active" },
  { id: 206, name: "Ukraine", slug: "ukraine", continent: "Europe", status: "Active" },
  { id: 207, name: "United Arab Emirates", slug: "united-arab-emirates", continent: "Asia", status: "Active" },
  { id: 208, name: "United Kingdom", slug: "united-kingdom", continent: "Europe", status: "Active" },
  { id: 209, name: "United States", slug: "united-states", continent: "North America", status: "Active" },
  { id: 210, name: "Uruguay", slug: "uruguay", continent: "South America", status: "Active" },
  { id: 211, name: "Uzbekistan", slug: "uzbekistan", continent: "Asia", status: "Active" },
  { id: 212, name: "Vanuatu", slug: "vanuatu", continent: "Oceania", status: "Active" },
  { id: 213, name: "Vatican City", slug: "vatican-city", continent: "Europe", status: "Active" },
  { id: 214, name: "Venezuela", slug: "venezuela", continent: "South America", status: "Active" },
  { id: 215, name: "Vietnam", slug: "vietnam", continent: "Asia", status: "Active" },
  { id: 216, name: "Virgin Islands, British", slug: "virgin-islands-british", continent: "North America", status: "Active" },
  { id: 217, name: "Virgin Islands, U.S.", slug: "virgin-islands-us", continent: "North America", status: "Active" },
  { id: 218, name: "Yemen", slug: "yemen", continent: "Asia", status: "Active" },
  { id: 219, name: "Zambia", slug: "zambia", continent: "Africa", status: "Active" },
  { id: 220, name: "Zimbabwe", slug: "zimbabwe", continent: "Africa", status: "Active" },
];

export const INITIAL_STATES: StateItem[] = [
  { id: 1, name: "Kabul", slug: "kabul", countryId: 1, countryName: "Afghanistan", status: "Active" },
  { id: 2, name: "Kandahar", slug: "kandahar", countryId: 1, countryName: "Afghanistan", status: "Active" },
  { id: 3, name: "Herat", slug: "herat", countryId: 1, countryName: "Afghanistan", status: "Active" },
  { id: 4, name: "Tirana", slug: "tirana", countryId: 2, countryName: "Albania", status: "Active" },
  { id: 5, name: "Durres", slug: "durres", countryId: 2, countryName: "Albania", status: "Active" },
  { id: 6, name: "Algiers", slug: "algiers", countryId: 3, countryName: "Algeria", status: "Active" },
  { id: 7, name: "Oran", slug: "oran", countryId: 3, countryName: "Algeria", status: "Active" },
  { id: 8, name: "Buenos Aires", slug: "buenos-aires", countryId: 10, countryName: "Argentina", status: "Active" },
  { id: 9, name: "Cordoba", slug: "cordoba", countryId: 10, countryName: "Argentina", status: "Active" },
  { id: 10, name: "New South Wales", slug: "new-south-wales", countryId: 13, countryName: "Australia", status: "Active" },
  { id: 11, name: "Victoria", slug: "victoria", countryId: 13, countryName: "Australia", status: "Active" },
  { id: 12, name: "Queensland", slug: "queensland", countryId: 13, countryName: "Australia", status: "Active" },
  { id: 13, name: "Vienna", slug: "vienna", countryId: 14, countryName: "Austria", status: "Active" },
  { id: 14, name: "Baku", slug: "baku", countryId: 15, countryName: "Azerbaijan", status: "Active" },
  { id: 15, name: "California", slug: "california", countryId: 209, countryName: "United States", status: "Active" },
  { id: 16, name: "Texas", slug: "texas", countryId: 209, countryName: "United States", status: "Active" },
  { id: 17, name: "New York", slug: "new-york", countryId: 209, countryName: "United States", status: "Active" },
  { id: 18, name: "Florida", slug: "florida", countryId: 209, countryName: "United States", status: "Active" },
  { id: 19, name: "DKI Jakarta", slug: "dki-jakarta", countryId: 90, countryName: "Indonesia", status: "Active" },
  { id: 20, name: "Jawa Barat", slug: "jawa-barat", countryId: 90, countryName: "Indonesia", status: "Active" },
  { id: 21, name: "Jawa Timur", slug: "jawa-timur", countryId: 90, countryName: "Indonesia", status: "Active" },
  { id: 22, name: "Bali", slug: "bali", countryId: 90, countryName: "Indonesia", status: "Active" },
];

export const INITIAL_CITIES: CityItem[] = [
  { id: 1, name: "Kabul City", slug: "kabul-city", countryId: 1, countryName: "Afghanistan", stateId: 1, stateName: "Kabul", status: "Active" },
  { id: 2, name: "Kandahar City", slug: "kandahar-city", countryId: 1, countryName: "Afghanistan", stateId: 2, stateName: "Kandahar", status: "Active" },
  { id: 3, name: "Tirana City", slug: "tirana-city", countryId: 2, countryName: "Albania", stateId: 4, stateName: "Tirana", status: "Active" },
  { id: 4, name: "Sydney", slug: "sydney", countryId: 13, countryName: "Australia", stateId: 10, stateName: "New South Wales", status: "Active" },
  { id: 5, name: "Melbourne", slug: "melbourne", countryId: 13, countryName: "Australia", stateId: 11, stateName: "Victoria", status: "Active" },
  { id: 6, name: "Brisbane", slug: "brisbane", countryId: 13, countryName: "Australia", stateId: 12, stateName: "Queensland", status: "Active" },
  { id: 7, name: "Los Angeles", slug: "los-angeles", countryId: 209, countryName: "United States", stateId: 15, stateName: "California", status: "Active" },
  { id: 8, name: "San Francisco", slug: "san-francisco", countryId: 209, countryName: "United States", stateId: 15, stateName: "California", status: "Active" },
  { id: 9, name: "San Diego", slug: "san-diego", countryId: 209, countryName: "United States", stateId: 15, stateName: "California", status: "Active" },
  { id: 10, name: "Houston", slug: "houston", countryId: 209, countryName: "United States", stateId: 16, stateName: "Texas", status: "Active" },
  { id: 11, name: "Austin", slug: "austin", countryId: 209, countryName: "United States", stateId: 16, stateName: "Texas", status: "Active" },
  { id: 12, name: "Dallas", slug: "dallas", countryId: 209, countryName: "United States", stateId: 16, stateName: "Texas", status: "Active" },
  { id: 13, name: "New York City", slug: "new-york-city", countryId: 209, countryName: "United States", stateId: 17, stateName: "New York", status: "Active" },
  { id: 14, name: "Buffalo", slug: "buffalo", countryId: 209, countryName: "United States", stateId: 17, stateName: "New York", status: "Active" },
  { id: 15, name: "Miami", slug: "miami", countryId: 209, countryName: "United States", stateId: 18, stateName: "Florida", status: "Active" },
  { id: 16, name: "Orlando", slug: "orlando", countryId: 209, countryName: "United States", stateId: 18, stateName: "Florida", status: "Active" },
  { id: 17, name: "Jakarta Pusat", slug: "jakarta-pusat", countryId: 90, countryName: "Indonesia", stateId: 19, stateName: "DKI Jakarta", status: "Active" },
  { id: 18, name: "Jakarta Selatan", slug: "jakarta-selatan", countryId: 90, countryName: "Indonesia", stateId: 19, stateName: "DKI Jakarta", status: "Active" },
  { id: 19, name: "Bandung", slug: "bandung", countryId: 90, countryName: "Indonesia", stateId: 20, stateName: "Jawa Barat", status: "Active" },
  { id: 20, name: "Surabaya", slug: "surabaya", countryId: 90, countryName: "Indonesia", stateId: 21, stateName: "Jawa Timur", status: "Active" },
  { id: 21, name: "Denpasar", slug: "denpasar", countryId: 90, countryName: "Indonesia", stateId: 22, stateName: "Bali", status: "Active" },
];

export const DEFAULT_LOCATION_SETTINGS: LocationSettings = {
  singleCountryMode: false,
  defaultCountryId: 1, // Afghanistan
};

const KEY_COUNTRIES = "modesy_location_countries_v2";
const KEY_STATES = "modesy_location_states_v2";
const KEY_CITIES = "modesy_location_cities_v2";
const KEY_SETTINGS = "modesy_location_settings_v2";

/* Helper for Countries */
export function getStoredCountries(): CountryItem[] {
  if (typeof window === "undefined") return INITIAL_COUNTRIES;
  try {
    const data = localStorage.getItem(KEY_COUNTRIES);
    if (!data) {
      localStorage.setItem(KEY_COUNTRIES, JSON.stringify(INITIAL_COUNTRIES));
      return INITIAL_COUNTRIES;
    }
    const parsed = JSON.parse(data);
    if (parsed.length < 100) {
      localStorage.setItem(KEY_COUNTRIES, JSON.stringify(INITIAL_COUNTRIES));
      return INITIAL_COUNTRIES;
    }
    return parsed;
  } catch {
    return INITIAL_COUNTRIES;
  }
}

export function saveStoredCountries(countries: CountryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_COUNTRIES, JSON.stringify(countries));
  } catch (e) {
    console.error("Failed to save countries", e);
  }
}

export function getCountryBySlug(slug: string): CountryItem | undefined {
  const countries = getStoredCountries();
  return countries.find((c) => c.slug === slug);
}

export function saveSingleCountry(updated: CountryItem): void {
  const countries = getStoredCountries();
  const idx = countries.findIndex((c) => c.id === updated.id || c.slug === updated.slug);
  if (idx >= 0) {
    countries[idx] = updated;
  } else {
    countries.push(updated);
  }
  saveStoredCountries(countries);
}

export function deleteStoredCountry(id: number): CountryItem[] {
  const countries = getStoredCountries();
  const updated = countries.filter((c) => c.id !== id);
  saveStoredCountries(updated);
  return updated;
}

export function bulkUpdateCountriesStatus(status: "Active" | "Inactive"): CountryItem[] {
  const countries = getStoredCountries();
  const updated = countries.map((c) => ({ ...c, status }));
  saveStoredCountries(updated);
  return updated;
}

/* Helper for States */
export function getStoredStates(): StateItem[] {
  if (typeof window === "undefined") return INITIAL_STATES;
  try {
    const data = localStorage.getItem(KEY_STATES);
    if (!data) {
      localStorage.setItem(KEY_STATES, JSON.stringify(INITIAL_STATES));
      return INITIAL_STATES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_STATES;
  }
}

export function saveStoredStates(states: StateItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_STATES, JSON.stringify(states));
  } catch (e) {
    console.error("Failed to save states", e);
  }
}

export function getStateBySlug(slug: string): StateItem | undefined {
  const states = getStoredStates();
  return states.find((s) => s.slug === slug);
}

export function saveSingleState(updated: StateItem): void {
  const states = getStoredStates();
  const idx = states.findIndex((s) => s.id === updated.id || s.slug === updated.slug);
  if (idx >= 0) {
    states[idx] = updated;
  } else {
    states.push(updated);
  }
  saveStoredStates(states);
}

export function deleteStoredState(id: number): StateItem[] {
  const states = getStoredStates();
  const updated = states.filter((s) => s.id !== id);
  saveStoredStates(updated);
  return updated;
}

export function bulkUpdateStatesStatus(status: "Active" | "Inactive"): StateItem[] {
  const states = getStoredStates();
  const updated = states.map((s) => ({ ...s, status }));
  saveStoredStates(updated);
  return updated;
}

/* Helper for Cities */
export function getStoredCities(): CityItem[] {
  if (typeof window === "undefined") return INITIAL_CITIES;
  try {
    const data = localStorage.getItem(KEY_CITIES);
    if (!data) {
      localStorage.setItem(KEY_CITIES, JSON.stringify(INITIAL_CITIES));
      return INITIAL_CITIES;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_CITIES;
  }
}

export function saveStoredCities(cities: CityItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_CITIES, JSON.stringify(cities));
  } catch (e) {
    console.error("Failed to save cities", e);
  }
}

export function getCityBySlug(slug: string): CityItem | undefined {
  const cities = getStoredCities();
  return cities.find((c) => c.slug === slug);
}

export function saveSingleCity(updated: CityItem): void {
  const cities = getStoredCities();
  const idx = cities.findIndex((c) => c.id === updated.id || c.slug === updated.slug);
  if (idx >= 0) {
    cities[idx] = updated;
  } else {
    cities.push(updated);
  }
  saveStoredCities(cities);
}

export function deleteStoredCity(id: number): CityItem[] {
  const cities = getStoredCities();
  const updated = cities.filter((c) => c.id !== id);
  saveStoredCities(updated);
  return updated;
}

export function bulkUpdateCitiesStatus(status: "Active" | "Inactive"): CityItem[] {
  const cities = getStoredCities();
  const updated = cities.map((c) => ({ ...c, status }));
  saveStoredCities(updated);
  return updated;
}

/* Helper for Settings */
export function getStoredLocationSettings(): LocationSettings {
  if (typeof window === "undefined") return DEFAULT_LOCATION_SETTINGS;
  try {
    const data = localStorage.getItem(KEY_SETTINGS);
    if (!data) {
      localStorage.setItem(KEY_SETTINGS, JSON.stringify(DEFAULT_LOCATION_SETTINGS));
      return DEFAULT_LOCATION_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_LOCATION_SETTINGS;
  }
}

export function saveStoredLocationSettings(settings: LocationSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save location settings", e);
  }
}

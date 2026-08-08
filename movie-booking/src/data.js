const movies = [
  {
    id: 1,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action, Crime",
    rating: 9.0,
    duration: "2h 32m",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    shows: [
      { id: 101, time: "11:00 AM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 102, time: "2:30 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 103, time: "6:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 104, time: "9:00 PM", screen: "Screen 2", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes increasingly uninhabitable.",
    genre: "Sci-Fi, Adventure",
    rating: 8.7,
    duration: "2h 49m",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    shows: [
      { id: 201, time: "9:30 AM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 202, time: "1:00 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 203, time: "4:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 204, time: "7:30 PM", screen: "Screen 3", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 3,
    title: "Attack on Titan",
    description: "Humanity fights for survival inside giant walls while mysterious Titans threaten to wipe out the last of them.",
    genre: "Anime, Action",
    rating: 8.8,
    duration: "1h 45m",
    poster: "https://i.pinimg.com/736x/97/e6/91/97e6917c4519ab0ae10d484034c556ef.jpg",
    shows: [
      { id: 301, time: "10:00 AM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 302, time: "1:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 303, time: "5:00 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 304, time: "8:30 PM", screen: "Screen 3", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 4,
    title: "Demon Slayer",
    description: "A young warrior joins the Demon Slayer Corps to avenge his family and protect his sister after a demon attack leaves her transformed.",
    genre: "Anime, Fantasy",
    rating: 8.7,
    duration: "1h 50m",
    poster: "https://i.pinimg.com/736x/cf/1e/8b/cf1e8b87bd9796167da4acfbc5ad2ac3.jpg",
    shows: [
      { id: 401, time: "10:30 AM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 402, time: "2:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 403, time: "5:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 404, time: "8:00 PM", screen: "Screen 1", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 5,
    title: "Naruto",
    description: "A young ninja with dreams of becoming the strongest leader of his village overcomes hardship with courage, friendship, and hard work.",
    genre: "Anime, Adventure",
    rating: 8.3,
    duration: "2h 10m",
    poster: "https://i.pinimg.com/1200x/26/66/5c/26665c12d6c84f439e0b9dc35b01a58a.jpg",
    shows: [
      { id: 501, time: "11:00 AM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 502, time: "3:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 503, time: "6:30 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 504, time: "9:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    description: "The remaining Avengers assemble once more to undo Thanos' damage and restore order to the universe.",
    genre: "Action, Sci-Fi",
    rating: 8.4,
    duration: "3h 1m",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    shows: [
      { id: 601, time: "10:00 AM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 602, time: "1:00 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 603, time: "4:00 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 604, time: "7:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 7,
    title: "Game of Thrones",
    description: "Noble families vie for control of the Iron Throne while ancient forces return to threaten the realm.",
    genre: "Fantasy, Drama",
    rating: 9.2,
    duration: "1h 5m",
    poster: "https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
    shows: [
      { id: 701, time: "9:00 AM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 702, time: "12:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 703, time: "4:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 704, time: "7:30 PM", screen: "Screen 1", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 8,
    title: "Tokyo Revengers",
    description: "A young man travels back in time to save his friends and alter the future in a dangerous gang war.",
    genre: "Anime, Action",
    rating: 7.8,
    duration: "1h 55m",
    poster: "https://i.pinimg.com/736x/59/ad/4d/59ad4d637e764daebd8e443da4ebe87c.jpg",
    shows: [
      { id: 801, time: "10:30 AM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 802, time: "2:00 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 803, time: "5:30 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 804, time: "8:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 9,
    title: "Wind Breaker",
    description: "An underground motorcycle gang races through city streets, fighting to protect their turf and one another.",
    genre: "Anime, Action",
    rating: 7.4,
    duration: "1h 40m",
    poster: "https://i.pinimg.com/736x/0a/3d/98/0a3d9830249823d8ffb9059df02ed125.jpg",
    shows: [
      { id: 901, time: "11:00 AM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 902, time: "2:30 PM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 903, time: "6:00 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 904, time: "9:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) }
    ]
  },
  {
    id: 10,
    title: "Avatar",
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    genre: "Sci-Fi, Adventure",
    rating: 7.9,
    duration: "2h 42m",
    poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    shows: [
      { id: 1001, time: "9:00 AM", screen: "Screen 1", seats: generateSeats(6, 10) },
      { id: 1002, time: "12:30 PM", screen: "Screen 2", seats: generateSeats(6, 10) },
      { id: 1003, time: "4:00 PM", screen: "Screen 3", seats: generateSeats(6, 10) },
      { id: 1004, time: "7:30 PM", screen: "Screen 1", seats: generateSeats(6, 10) }
    ]
  }
];

function generateSeats(rows, cols) {
  const seats = [];
  const rowLetters = "ABCDEF";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      seats.push({
        id: `${rowLetters[i]}${j + 1}`,
        row: rowLetters[i],
        number: j + 1,
        isBooked: false
      });
    }
  }
  const randomCount = Math.floor(Math.random() * 15) + 5;
  const indices = new Set();
  while (indices.size < randomCount) {
    indices.add(Math.floor(Math.random() * seats.length));
  }
  indices.forEach(idx => {
    seats[idx].isBooked = true;
  });
  return seats;
}

export default movies;

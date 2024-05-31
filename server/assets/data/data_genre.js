const Game = require("../js/api/models/items");
const genre_data = [{
        "id_of_genre": "action",
        "genre": "Action",
    },
    {
        "id_of_genre": "action_adventure",
        "genre": "Action-Adventure",
    },
    {
        "id_of_genre": "adventure",
        "genre": "Adventure",
    },
    {
        "id_of_genre": "card_game",
        "genre": "Card Game",
    },
    {
        "id_of_genre": "casual",
        "genre": "Casual",
    },
    {
        "id_of_genre": "city_builder",
        "genre": "City Builder",
    },
    {
        "id_of_genre": "dungeon_crawler",
        "genre": "Dungeon Crawler",
    },
    {
        "id_of_genre": "exploration",
        "genre": "Exploration",
    },
    {
        "id_of_genre": "fantasy",
        "genre": "Fantasy",
    },
    {
        "id_of_genre": "fighting",
        "genre": "Fighting",
    },
    {
        "id_of_genre": "horror",
        "genre": "Horror",
    },
    {
        "id_of_genre": "music",
        "genre": "Music",
    },
    {
        "id_of_genre": "narration",
        "genre": "Narration",
    },
    {
        "id_of_genre": "open_world",
        "genre": "Open World",
    },
    {
        "id_of_genre": "platformer",
        "genre": "Platformer",
    },
    {
        "id_of_genre": "puzzle",
        "genre": "Puzzle",
    },
    {
        "id_of_genre": "racing",
        "genre": "Racing",
    },
    {
        "id_of_genre": "rpg",
        "genre": "RPG",
    },
    {
        "id_of_genre": "rts",
        "genre": "RTS",
    },
    {
        "id_of_genre": "shooter",
        "genre": "Shooter",
    },
    {
        "id_of_genre": "simulation",
        "genre": "Simulation",
    },
    {
        "id_of_genre": "sports",
        "genre": "Sports",
    },
    {
        "id_of_genre": "stealth",
        "genre": "Stealth",
    },
    {
        "id_of_genre": "strategy",
        "genre": "Strategy",
    },
    {
        "id_of_genre": "survival",
        "genre": "Survival",
    },
    {
        "id_of_genre": "tower_defense",
        "genre": "Tower Defense",
    },
    {
        "id_of_genre": "fps",
        "genre": "FPS",
    },
    {
        "id_of_genre": "visual_novel",
        "genre": "Visual novel",
    },
    {
        "id_of_genre": "mmo",
        "genre": "MMO",
    },
    {
        "id_of_genre": "mmorpg",
        "genre": "MMORPG",
    },
    {
        "id_of_genre": "roguelike",
        "genre": "Roguelike",
    },
    {
        "id_of_genre": "battle_royale",
        "genre": "Battle Royale",
    },
    {
        "id_of_genre": "sandbox",
        "genre": "Sandbox",
    },
];


// for (let game in card) {
//     console.log(card[game]);
//     await new Game({
//         id_of_game: card[game].id,
//         img: card[game].img,
//         name: card[game].name,
//         price: card[game].price,
//         info: card[game].info,
//     }).save();
//
// }

module.exports = { genre_data };
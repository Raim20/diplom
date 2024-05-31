const Game = require("../js/api/models/items");
const data_of_site_for_save = [
    {
        "language": [
            "Kazakh",
            "English",
            "Russian",
            "China",
            "French",
            "German",
            "Italia",
            "Japanese",
            "Korean",
            "Polish",
            "Spanish",
            "Turkish",
            "Dutch",
            "Portuguese",
        ],
        "platform": {
            "pc": {
                "windows": {
                    "name": "Windows",
                    "version": [
                        "Windows 7",
                        "Windows 8",
                        "Windows 10",
                        "Windows 11",
                    ],
                },
                "macos": {
                    "name": "MacOS",
                    "version": [
                        "",
                    ],
                },
                "linux": {
                    "name": "Linux",
                    "version": [
                        "",
                    ],
                },
            },
            "console": {
                "playstation": {
                    "name": "PlayStation",
                    "version": [
                        "PS 1",
                        "PS 2",
                        "PS 3",
                        "PS 4",
                        "PS 5",
                    ],
                },
                "xbox": {
                    "name": "Xbox",
                    "version": [
                        "Xbox",
                        "Xbox 360",
                        "Xbox One",
                        "Xbox One S",
                        "Xbox One X",
                        "Xbox Series S",
                        "Xbox Series X",
                    ],
                },
                "nintendo": {
                    "name": "Nintendo",
                    "version": [
                        "Nintendo Switch",
                    ],
                },
            },
            "mobile": {
                "android": {
                    "name": "Android",
                    "version": [
                        "",
                    ],
                },
                "ios": {
                    "name": "IOS",
                    "version": [
                        "",
                    ],
                },
            },
        },
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

module.exports = { data_of_site_for_save };
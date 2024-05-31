const data = [ "Action", "Action-Adventure", "Adventure", "Card Game", "Casual", "City Builder",
    "Dungeon Crawler", "Exploration", "Fantasy", "Fighting", "Horror", "Music", "Narration",
    "Open World", "Platformer", "Puzzle", "Racing", "RPG", "RTS", "Shooter", "Simulation",
    "Sports", "Stealth", "Strategy", "Survival", "Tower Defense", "FPS", "Visual novel", "MMO",
    "MMORPG", "Roguelike", "Battle Royale", "Sandbox" ];

async function fetchGetPlatform() {
    const token = localStorage.getItem('token')

    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                Authorization: token
            },
        };

        const apiUrl = "http://localhost:5000/api/data/platform";

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.get_platform);
            const items = data.get_platform;
            for (const platformKey in items) {
                const platform = items[platformKey];
                console.log(platformKey);

                let data_for_print = `
                    <div>
                    <div class="checkbox_style">${platformKey.toUpperCase()}</div>`;

                for (const systemKey in platform) {
                    const system = platform[systemKey];

                    data_for_print += `
                        <div id="game_stats_platform_to_update" class="">
                            <div class="checkbox_style">${system.name}</div>
                            <div class="checkbox_flex">`;

                    for (const version of system.version) {
                        if (version.length > 0) {
                            data_for_print += `
                                <div class="platform_checkbox_flex">
                                    <div class="">
                                        <input id="game_stats_platform_to_update_label" class="" type="checkbox" placeholder="${version}" name="${version.toLowerCase()}" value="${version}">
                                        <label class="checkbox_style" for="">${version}</label>
                                    </div>
                                </div>`;
                        }
                    }
                    data_for_print += `
                            </div>
                        </div>`;
                }
                data_for_print += `</div>`;
                document.querySelector('#game_stats_platform_to_update_header').innerHTML += data_for_print;
            }
            /*
            const items = data.get_platform
            for (const itemsKey in items) {
                const item = itemsKey;
                console.log(item);
                for (const itemsKeyKey in item) {
                    console.log(itemsKeyKey);
                }
            }
            for (let item in items) {
                console.log(item);
                let data_for_print = `
                    <div>
                    <div>Pc</div>`;
                for (let item_platform in item) {
                    console.log(item[item_platform]);
                    data_for_print += `
                        <div id="game_stats_platform_to_create" class="">
                            <div class="checkbox_style">${item_platform.name}</div>
                            <div class="checkbox_flex">`;
                    for (let item_system in item_platform.version) {
                        console.log(item_system);
                        if (item_system.length > 0) {
                            data_for_print += `    
                                <div class="platform_checkbox_flex">
                                    <div class="">
                                        <input id="game_stats_platform_to_create_label" class="" type="checkbox" placeholder="${item_system}" name="${item_system.toLowerCase()}" value="${item_system}">
                                        <label class="checkbox_style" for="">${item_system}</label>
                                    </div>
                                </div>`;
                        }
                    }
                    data_for_print += `
                            </div>
                        </div>`;
                    if (item_platform.length > 0) {
                    }
                }
                data_for_print += `</div>`;
                document.querySelector('#game_stats_platform_to_create_header').innerHTML += data_for_print;
            }*/
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchGetPlatform();

function print(data) {
    for (let item in data) {
        const data_for_print = `
                    <input id="${data[item]}" class="" type="checkbox" placeholder="${capitalizeFirstLetter(data[item])}" name="${data[item]}" value="data[item]">
                    <label for="${data[item]}">${capitalizeFirstLetter(data[item])}</label>`;
        document.querySelector('.game_genres_to_create').innerHTML += data_for_print;
    }
}

// print(data);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
import { files } from './default.js';

async function fetchUploadFile(fileInput) {
    const token = localStorage.getItem('token')

    const formData = new FormData();
    formData.append('avatar', fileInput);

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                Authorization: token,
            },
            body: formData,
            //body: JSON.stringify({ id_of_game: id_of_game} )
        };

        const apiUrl = `http://localhost:5000/api/profile/avatar`;

        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();

        if (response.ok) {
            console.log(data.user);
            const user_avatar = document.getElementById("avatar_of_profile");
            user_avatar.src = files.server_api_url + "/" + data.user._id + "/" + data.user.avatar;
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}


document.addEventListener('click', (e) => {
    if (e.target.closest('.profile_img')) {
        console.log(e);
        const fileInput = document.getElementById("profile_avatar_upload");
        fileInput.click();
        // fileInput.addEventListener('change', async () => {
        //     const fileInput = document.getElementById('profile_avatar_upload');
        //     const file = fileInput.files[0];
        //     if (file) {
        //         fetchUploadFile(file);
        //     }
        // });
        // // fetchUploadFile(fileInput);
    }
});

document.getElementById('profile_avatar_upload').addEventListener('change', async (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
    if (file) {
        fetchUploadFile(file);
    }
});

// async function fetchUploadFile(fileInput) {
//     const token = localStorage.getItem('token')
//
//     const formData = new FormData();
//     formData.append('avatar', fileInput);
//
//     try {
//         const requestOptions = {
//             method: 'PATCH',
//             headers: {
//                 // 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//             body: formData,
//             //body: JSON.stringify({ id_of_game: id_of_game} )
//         };
//
//         const apiUrl = `http://localhost:5000/api/profile/create`;
//
//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();
//
//         if (response.ok) {
//             console.log(data.fileUrl);
//             const img_test = document.getElementById("img_test");
//             img_test.src = data.fileUrl;
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }
//
//
// document.addEventListener('click', (e) => {
//     if (e.target.closest('.profile_img')) {
//         console.log(e);
//         const fileInput = document.getElementById("profile_avatar_upload");
//         fileInput.click();
//         // fileInput.addEventListener('change', async () => {
//         //     const fileInput = document.getElementById('profile_avatar_upload');
//         //     const file = fileInput.files[0];
//         //     if (file) {
//         //         fetchUploadFile(file);
//         //     }
//         // });
//         // // fetchUploadFile(fileInput);
//     }
// });
//
// document.getElementById('profile_avatar_upload').addEventListener('change', async (e) => {
//     const fileInput = e.target;
//     const file = fileInput.files[0];
//     if (file) {
//         fetchUploadFile(file);
//     }
// });

// const fileList = document.getElementById('fileList');
// async function fetchUploadFile(fileInput) {
//     const token = localStorage.getItem('token')
//
//     const formData = new FormData();
//     formData.append('avatar', fileInput);
//
//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//                 // 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//             body: formData,
//             //body: JSON.stringify({ id_of_game: id_of_game} )
//         };
//
//         const apiUrl = `http://localhost:5000/api/profile/upload`;
//
//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();
//
//         if (response.ok) {
//             const fileUrl = data.fileUrl;
//             const fileLink = document.createElement('a');
//             fileLink.href = fileUrl;
//             fileLink.textContent = fileUrl;
//             fileList.appendChild(fileLink);
//             // console.log(data.fileUrl);
//             const img_test = document.getElementById("img_test");
//             img_test.src = data.fileUrl;
//             fetchUpdateProfile(data.fileUrl);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }
//
//
// document.addEventListener('click', (e) => {
//     if (e.target.closest('.profile_img')) {
//         console.log(e);
//         const fileInput = document.getElementById("profile_avatar_upload");
//         fileInput.click();
//         // fileInput.addEventListener('change', async () => {
//         //     const fileInput = document.getElementById('profile_avatar_upload');
//         //     const file = fileInput.files[0];
//         //     if (file) {
//         //         fetchUploadFile(file);
//         //     }
//         // });
//         // // fetchUploadFile(fileInput);
//     }
// });
//
// document.getElementById('profile_avatar_upload').addEventListener('change', async (e) => {
//     const fileInput = e.target;
//     const file = fileInput.files[0];
//     if (file) {
//         fetchUploadFile(file);
//     }
// });
//
// async function fetchUpdateProfile(fileUrl) {
//     const token = localStorage.getItem('token')
//
//     try {
//         const requestOptions = {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: token,
//             },
//             body: JSON.stringify({ fileUrl: fileUrl }),
//             //body: JSON.stringify({ id_of_game: id_of_game} )
//         };
//
//         const apiUrl = `http://localhost:5000/api/profile/upload`;
//
//         const response = await fetch(apiUrl, requestOptions);
//         const data = await response.json();
//
//         if (response.ok) {
//             console.log(data.message);
//         } else {
//             console.error(data.message);
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// }
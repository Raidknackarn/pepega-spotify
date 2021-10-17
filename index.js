const audio = document.querySelector('#audio-player');
const queryInput = document.querySelector('#query'); 
const searchForm = document.querySelector('#music-form');
const list = document.querySelector('#lista');


let token = '';

async function getToken() {
    const response = await fetch('https://blooming-reef-63913.herokuapp.com/api/token');
    const data = await response.json();
    token = data.token;
}

getToken();

//Anropa spotifys API

async function getSongs(song) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track`, {
        headers: {
            'authorization': `Bearer ${token}` 
        }
    });

    const data = await response.json();
    for(let i = 0; i < data.tracks.items.length; i++) {

        // skapar vi en list item.
        const songItem = document.createElement(`li`);
        songItem.innerHTML = `${data.tracks.items[i].name} <button class="track" data-song=${data.tracks.items[i].preview_url}">Play</button>`;
        list.appendChild(songItem);

    }

    const playButtons = document.querySelectorAll('.track');
    for(let i = 0; i < playButtons.length; i++ ) {
        playButtons[i].addEventListener('click', event => {
            playSong(event.target.dataset.song);
            console.log(event.target.dataset.song);
        });
    }

}


    //Spela låten
    function playSong(song) {
        if(song === 'null"') {
            audio.pause();
            alert('NAJ du! Deee blev inget med det NAJ');

        }   else {
            audio.src = song;
            audio.play();
        }
    }

   

    // Hantera det vi söker efter
    searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const query = queryInput.value;
    getSongs(query);
    });
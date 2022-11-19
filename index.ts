const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');

// Reads the songs.txt file and pushes each line to the songsArray
const songsArray: string[] = [];
fs.readFileSync('songs.txt', 'utf8').split('\n').forEach((line: string) => {
    if (line.trim().length > 0)
        songsArray.push(line);
});
console.log('Detected ' + songsArray.length + ' song(s)...');

dotenv.config();
const token: string = process.env.TOKEN as string;

downloadAlbumCovers(songsArray);

/**
 * Prevents Spotify from blocking the request with a 429 error.
 * 
 * @param ms a number
 * @returns a Promise<void>
 */
const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 * Downloads the album covers from Spotify.
 * 
 * @param songsArray a string[]
 */
async function downloadAlbumCovers(songsArray: string[]): Promise<void> {
    for (let i = 0; i < songsArray.length; i++) {
        console.log(`Downloading: ${songsArray[i]}`);
        let coverUrl = await getCoverFromSearch(songsArray[i]);
        await waitFor(1000);

        let j = 0;
        for (let url of coverUrl) {
            let cover = await axios.get(url, {
                responseType: 'arraybuffer'
            });
            fs.writeFileSync(`./${songsArray[i]} ${j}.jpg`, cover.data);
            j++;
        }
    }
    console.log('Done!');
}

/**
 * Gets the album cover from the Spotify API.
 * 
 * @param song a string
 * @returns a Promise<string[]>
 */
async function getCoverFromSearch(song: string): Promise<string[]> {
    let coverUrl: string[] = [];
    let [artist, title] = song.split(' - ');

    const response = await axios.get('https://api.spotify.com/v1/search', {
        params: {
            q: `${artist} ${title}`,
            type: 'track',
            // Good average limit to get the covers you actually want, if you ever put less,
            // Spotify will often return random covers first because their search algorithm sucks
            limit: 3
        },
        headers: {
            Accept: 'application/json',
            Content_Type: 'application/json',
            Authorization: 'Bearer ' + token
        }
    });

    const items = response.data.tracks.items;
    for (let i = 0; i < items.length; i++)
        coverUrl.push(items[i].album.images[0].url);
    return coverUrl;
}
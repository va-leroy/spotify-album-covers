# Steal Album Covers From Spotify!
![License](https://img.shields.io/badge/License-MIT-orange.svg) ![Version](https://img.shields.io/badge/Version-1.0.0-green.svg) ![Typescript](https://img.shields.io/badge/Typescript-4.8.4-blue.svg)

## 🎯 Introduction

A very simple (*and not so fast*) script to download all the album covers of your favorite songs, thanks to the [Spotify API](https://developer.spotify.com/console/search/). It's written in Typescript, and it will help you tidy your music folder, instead of having a bunch of songs with no cover or hideous YouTube thumbnails.

## 📦 Getting Started

Make sure you have a `songs.txt` file at the root of the project, containing all the songs you want to download the album covers of. Each song must be on a new line. You can use the following example:

```
The Chainsmokers, Ship Wrek - The Fall
Harry Styles - Late Night Talking
alt-J (∆) - Left Hand Free
Tate McRae - You're So Cool
```

> **Note**<br>
> You don't need to specify all the artists except if you want to be really precise (but it often works to your disadvantage).
> Just make sure it follows the `Artist - Title` format.

Also, please generate a Spotify API token and put it in the `.env` file of your repository. You can find more information about how to generate a token [here](https://developer.spotify.com/documentation/general/guides/authorization/).

## 🔨 Built With

You will find the languages and frameworks used to develop this tiny app down below.

* [Node.js](https://nodejs.org/en/)
  * [NPM](https://www.npmjs.com/)
  * [Axios](https://www.npmjs.com/package/axios)
  * [dotenv](https://www.npmjs.com/package/dotenv)
  * [fs](https://www.npmjs.com/package/fs)
* [Typescript](https://www.typescriptlang.org/)

## 🧬 Tree structure

> **Warning**<br>
> Before trying to launch the project, please make sure you installed **all the packages** with `npm i`.

```sh
a-star/
├── node_modules/
│   ├── .../
│   │    └── ...
│   └── .../
│        └── ...
├── .env
├── .gitignore
├── songs.txt # Put all your tracks' names here!
├── LICENSE.md # Optional
├── README.md # Optional
├── index.ts
├── package-lock.json
└── package.json
```

## ⚡️ Start the project

If you've done everything correctly, you should be able to start the project with the following command.

```sh
npm run start # Launches script
```

Here is an example of the output you should get.

```sh
valeroy@valentins-macbook-pro spotify-album-covers % npm run start

> spotify-album-covers@1.0.0 start
> npx ts-node index.ts

Detected 3 song(s)...
Downloading: Afrojack, Muni Long, Black V Neck - Day N Night 
Downloading: The Maine - Black Butterflies and Déjà Vu
Downloading: David Guetta, Martin Garrix & Brooks - Like I Do
Done!
```

It will download 3 images for each songs, but feel free to change the `limit` variable in `index.ts` if you want to download more or less images. Then just pick the one that suits your needs!

This program uses a 1 second delay between each request to avoid being blocked by the Spotify API with a `429` *Too Many Requests* error.

Finally, you can use this command to delete all the downloaded images.

```sh
npm run clean # Deletes all covers
```

## 📖 License

This project is free and open-source, licensed under the [MIT License](LICENSE.md).
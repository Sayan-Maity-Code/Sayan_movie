import express from "express";
import axios from 'axios';
import fs from 'fs';
import cron from "node-cron";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDk1MzIwOGM2YmUzMTJmMWYwZWJkZmRkMmNiNGUyMSIsInN1YiI6IjY2MTU1NTNlYWM2MTdjMDE3ZGIyZmQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XiMNuR8JqgQSIVIpJxhIlualjFPqu-kqNUmYLyg-gNw";
const app = express();

// Function to fetch media details from TMDb API and update JSON file
const fetchAndUpdateMedia = async () => {
    try {
        let allMovieTitles = [];
        let allTVShowTitles = [];
        let totalMoviePages = 20;
        let totalTVShowPages = 20;

        // Fetch movie details from all pages
        for (let page = 1; page <= totalMoviePages; page++) {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + TMDB_TOKEN
                }
            };

            const response = await axios.request(options);

            // Extract unique movie titles from the current page
            const movieTitles = response.data.results.reduce((uniqueTitles, movie) => {
                if (!uniqueTitles.some(item => item.title === movie.title)) {
                    uniqueTitles.push({ title: movie.title, download_link: '' });
                }
                return uniqueTitles;
            }, []);

            // Combine movie titles from all pages
            allMovieTitles = [...allMovieTitles, ...movieTitles];
        }

        // Fetch TV show details from all pages
        for (let page = 1; page <= totalTVShowPages; page++) {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer ' + TMDB_TOKEN
                }
            };

            const response = await axios.request(options);

            // Extract unique TV show titles from the current page
            const tvShowTitles = response.data.results.reduce((uniqueTitles, tvShow) => {
                if (!uniqueTitles.some(item => item.title === tvShow.name)) {
                    uniqueTitles.push({ title: tvShow.name, download_link: '' });
                }
                return uniqueTitles;
            }, []);

            // Combine TV show titles from all pages
            allTVShowTitles = [...allTVShowTitles, ...tvShowTitles];
        }

        // Read existing JSON file, if it exists
        let existingData = { movies: [], tv: [] };
        try {
            const rawData = fs.readFileSync('./movies_series.json');
            existingData = JSON.parse(rawData);
        } catch (error) {
            console.log('Error reading JSON file:', error.message);
        }

        // Merge new movie titles with existing ones and remove duplicates
        const updatedMovies = [
            ...(existingData.movies || []),
            ...allMovieTitles
        ];

        // Merge new TV show titles with existing ones and remove duplicates
        const updatedTVShows = [
            ...(existingData.tv || []),
            ...allTVShowTitles
        ];

        // Write updated titles to JSON file
        fs.writeFileSync('./movies_series.json', JSON.stringify({ movies: updatedMovies, tv: updatedTVShows }, null, 2));

        console.log('Movies and TV shows updated successfully');
    } catch (error) {
        console.error('Error fetching and updating media:', error);
    }
};

// Schedule cron job to fetch and update media every 24 hours
cron.schedule('0 0 * * *', () => {
    fetchAndUpdateMedia();
});

// json-server --watch --port 3000 movies_series.json --- for json server



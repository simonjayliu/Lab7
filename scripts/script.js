// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

const setting = document.querySelector('img[alt="settings"]');
const header = document.querySelector('h1');

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost); 
      });
    });
});

setting.addEventListener('click', (event) => {
  event.preventDefault();
  router.setState('setting');
})

header.addEventListener('click', (event) => {
  event.preventDefault();
  router.setState('header');
})


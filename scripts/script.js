// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

const setting = document.querySelector('img[alt="settings"]');
const header = document.querySelector('h1');
const entry = document.querySelector('body');
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let count = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.number = count;
        newPost.addEventListener('click', () => {
          router.setState({page:'entry', 'entry': entry, number: newPost.number});
        })
      
        document.querySelector('main').appendChild(newPost); 
        count++;
      });
    });
});

setting.addEventListener('click', (event) => {
  event.preventDefault();
  router.setState({page: 'settings'});
})

header.addEventListener('click', (event) => {
  event.preventDefault();
  router.setState({page: 'home'});
})


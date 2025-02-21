import * as api from './js/pixabay-api';
import * as ai from './js/gemini-api';
import * as render from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader-placeholder');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  const searchInputValue = form.elements.input.value.trim();
  if (searchInputValue === '') {
    render.showError('Please fill out this field');
    return;
  }
  render.clearGallery();
  loader.classList.add('loader');

  let prompt = ai.pixabayPrompt(searchInputValue);

  ai.askAI(prompt)
    .then(response => {
      let params = response.data.candidates[0].content.parts[0].text;
      console.log(params);
      api
        .searchImage(params)
        .then(response => {
          console.log(response);
          if (response.data.hits.length === 0) {
            render.showError(
              'Sorry, there are no images matching your search query. Please, try again!'
            );
            return;
          }
          render.showGallery(response.data.hits);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loader.classList.remove('loader');
    });
});

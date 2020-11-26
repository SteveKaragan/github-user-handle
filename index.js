
  'use strict';

const apiKey = "";


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();

  for (let i = 0; i < responseJson.length; i++){

    $('#results-list').append(
      `<li>
      <h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].git_url}">${responseJson[i].git_url}</a></p>
      </li>`
    )};
  
  $('#results').removeClass('hidden');
};

function getRepos(userName) {
  
  const url = `https://api.github.com/users/${userName}/repos`

  const options = { 
    headers: new Headers({ 
        "Authorization": apiKey}),
         mode: 'cors' 
     };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getRepos(userName);
  });
}

$(watchForm);
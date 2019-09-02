'use strict';


const searchURL = "https://api.github.com/users/:username/repos";


function displayResults(responseJson) {
  console.log(responseJson[3].html_url);
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the response array
  for (let i = 0; i < responseJson.length; i++){
    // add name of repo and url of repo
    $('#results-list').append(
      `<li>
      <h3>${responseJson[i].name}</h3></li>
      <li><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(username) {
  console.log('getRepos works');
  const url = `https://api.github.com/users/${username}/repos`;
  console.log(url);
  /*const options = {
    headers: new Headers({
      "Authorization: token OAUTH-TOKEN"})
  }; */
  fetch(url)
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
    const searchName = $('#js-search-name').val();
    console.log(searchName);
    getRepos(searchName);
  });
}

$(watchForm);
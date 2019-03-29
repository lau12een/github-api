'use strict';
//https://developer.github.com/v3/search/
const GIT_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromApi(searchTerm, callback) {
    const settings = {
      url: GIT_SEARCH_URL,
      data: {
        q: `${searchTerm} in:name`,
        per_page:5
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };

  $.ajax(settings);
  // $.getJSON(GIT_SEARCH_URL, searchTerm, callback);
}


function renderResult(result) {
  return `
     <div class="render-results">
       <h2>
       <a class="result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
       <p>Number of watchers: <span class="watchers-count">${result.watchers_count}</span></p>
       <p>Number of open issues: <span class="issues-count">${result.open_issues}</span></p>
     </div>
   `;
 }

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.search-results').html(results);
}

function watchSubmit() {
  $('.search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.search-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
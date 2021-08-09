const url = "https://jsonplaceholder.typicode.com/comments";

let comments = [];

fetch(url)
  .then((res) => res.json())
  .then((data) => (comments = data));

function findMatches(wordToMatch, comments) {
  return comments.filter((comment) => {
    //regex that filters out if the comments array matches that matches the search. g- global(all) and i- case insenstive searches
    const regex = new RegExp(wordToMatch, "gi");
    //return id or name (from response data) that matches regex
    return comment.email.match(regex) || comment.name.match(regex);
  });
}

function displayMatches() {
    //params input value and comments array
  const matchArray = findMatches(this.value, comments);

  const html = matchArray
    .map((comment) => {
      //regex for each item (do something*) in the array if the comment search matches the search
      const regex = new RegExp(this.value, "gi");

      //*replace created regex with span hl (styling in css)
      const highlightName = comment.name.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const highlightEmail = comment.email.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      //this part is what is displayed in the browser
      return `
        <li>
        <span class="postId">${comment.postId}. ${highlightName}  </span>
        <span class="email">
        ${highlightEmail}</span>
        </li>
        `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

const url = "https://jsonplaceholder.typicode.com/comments"

let comments = []

fetch(url)
.then(res => res.json())
.then(data => comments = data)

function findMatches (wordToMatch, comments) {
    return comments.filter(comment => {
        //figure out if the comment matches the search. g- global(all) and i- case insenstive searches
        const regex = new RegExp(wordToMatch, 'gi')
        //return id or name (from response data) that matches regex
        return comment.email.match(regex) || comment.name.match(regex)
    })
}

function displayMatches(){
    const matchArray = findMatches(this.value, comments)

    const html = matchArray.map(comment => {
        //value that is typed
        const regex = new RegExp(this.value, 'gi')
        //replace created regex with span hl
        const highlightName = comment.name.replace(regex, `<span class="hl">${this.value}</span>`)
        const highlightEmail = comment.email.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <li>
        <span class="postId">${comment.postId}. ${highlightName}  </span>
        <span class="email">
        ${highlightEmail}</span>
        </li>
        `
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
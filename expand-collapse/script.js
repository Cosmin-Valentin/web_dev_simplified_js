const LOCAL_STORAGE_PREFIX = 'EXPAND_COLLAPSE'
const EXPAND_COLLAPSE_KEY = `${LOCAL_STORAGE_PREFIX}-states`
const card = document.querySelector('.card')

async function getPosts() {
  try {
    const response = await fetch('https://dummyjson.com/posts?limit=10')
    const data = await response.json()
    return data.posts
  } catch (error) {
    console.error(error)
  }
}

getPosts().then((posts) => printPosts(posts))

function printPosts(posts) {
  posts.forEach((post) => {
    const postClone = card.cloneNode(true)
    postClone.dataset.postId = post.id
    const title = postClone.querySelector('.title')
    title.innerText = post.title
    const body = postClone.querySelector('.card-body')
    body.innerText = post.body
    document.body.appendChild(postClone)
  })
  card.remove()
  renderStates()
}

document.addEventListener('click', (e) => {
  if (!e.target.matches('button.expand-button')) return

  const parent = e.target.closest('.card')
  parent.querySelector('.card-body').classList.toggle('show')
  e.target.innerText = e.target.innerText === 'Expand' ? 'Collapse' : 'Expand'
  saveState()
})

function saveState() {
  let cardStates = []
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    if (card.querySelector('.show')) {
      card.dataset.expanded = true
    } else {
      card.dataset.expanded = false
    }
    const postId = card.dataset.postId
    const state = card.dataset.expanded
    const cardState = {
      id: postId,
      state: state
    }
    cardStates.push(cardState)
  })
  storeStates(cardStates)
}

function storeStates(states) {
  localStorage.setItem(EXPAND_COLLAPSE_KEY, JSON.stringify(states))
}

function loadStates() {
  const storedStates = localStorage.getItem(EXPAND_COLLAPSE_KEY)
  return JSON.parse(storedStates) || []
}

function renderStates() {
  const storedStates = loadStates()
  storedStates.forEach((el) => {
    const post = document.querySelector(`.card[data-post-id="${el.id}"]`)
    post.dataset.expanded = el.state
    if (el.state === 'true') {
      post.querySelector('.card-body').classList.toggle('show')
      post.querySelector('.expand-button').innerText = 'Collapse'
    }
  })
}

console.log(loadStates())

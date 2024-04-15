const list = document.querySelector('.product-list')
const listItem = document.querySelector('.product-item')
const main = document.querySelector('.main-column')
const LOCAL_STORAGE = 'EXPAND_COLLASE_V2'
const LOCAL_STORAGE_KEY = LOCAL_STORAGE + '-states'

document.addEventListener('click', (e) => {
  if (!e.target.matches('button.get-button')) return
  if (list.children.length > 1) return

  getResponse().then((data) => populateItems(data))
})

document.addEventListener('click', (e) => {
  if (!e.target.matches('.description-button')) return

  const parent = e.target.closest('.product-item')
  parent.querySelector('.product-full').classList.toggle('show')
  if (e.target.innerText === 'Expand') {
    e.target.innerText = 'Collapse'
    parent.dataset.state = true
  } else {
    e.target.innerText = 'Expand'
    parent.dataset.state = false
  }

  verifyStates()
})

async function getResponse() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10')
    const data = await response.json()
    return data
  } catch (error) {
    alert('Could not retrieve products')
  }
}

function populateItems(elements) {
  elements.products.forEach((product) => {
    const listItemClone = listItem.cloneNode(true)
    const prodThumbnail = listItemClone.querySelector('.product-thumbnail img')
    prodThumbnail.src = product.thumbnail
    const prodTitle = listItemClone.querySelector('.product-title')
    prodTitle.innerText = product.title
    const prodPrice = listItemClone.querySelector('.price')
    prodPrice.innerText = product.price
    const prodImage = listItemClone.querySelector('.product-image img')
    prodImage.src = product.images[0]
    const prodDescription = listItemClone.querySelector('.product-description')
    prodDescription.innerText = product.description
    const prodRating = listItemClone.querySelector('.rating')
    prodRating.innerText = product.rating
    const prodDiscount = listItemClone.querySelector('.discount')
    prodDiscount.innerText = product.discountPercentage
    listItemClone.dataset.prodId = product.id
    listItemClone.dataset.state = false
    list.appendChild(listItemClone)
  })
  listItem.remove()
  main.classList.remove('hide')
  verifyStates(true)
}

function verifyStates(onStart) {
  const states = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (onStart) {
    states.forEach((element) => {
      const item = list.querySelector(`[data-prod-id="${element.id}"]`)
      item.dataset.state = element.state
    })
    const openedEl = document.querySelectorAll('[data-state="true"]')
    openedEl.forEach((el) => {
      el.querySelector('.description-button').innerText = 'Collapse'
      el.querySelector('.product-full').classList.add('show')
    })
  } else {
    const stateArray = []
    list.querySelectorAll('.product-item').forEach((product) => {
      const elementId = product.dataset.prodId
      const elementState = product.dataset.state
      const element = {
        id: elementId,
        state: elementState
      }
      stateArray.push(element)
    })
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateArray))
  }
}

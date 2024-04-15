import { dollarFormat } from './utils/helper'

const template = document.querySelector('#store-item-template')
const productWrapper = document.querySelector('[data-products]')
const cartButton = document.querySelector('[data-cart-button]')
const cartContainer = document.querySelector('[data-cart-container]')
const cartItemTemplate = document.querySelector('#cart-item-template')
let currentCartItems = []
let items = {}
let runOnce = false
const ATC_SESSION_KEY = 'ATC_SESSION_KEY_cart-products'

export function setUpStore() {
  getProducts().then((data) => renderItems(data))
}

export function setUpCart() {
  cartContainer.classList.add('invisible')
  cartButton.addEventListener('click', () => {
    const cartItems = document.querySelectorAll('[data-cart-item]')
    if (cartItems.length === 0) return
    cartContainer.classList.toggle('invisible')
  })
  globalEventListener('click', '[data-add-to-cart-button]', (e) => {
    const id = parseInt(e.target.closest('[data-store-item]').dataset.itemId)
    addTocart(id)
  })
  globalEventListener('click', '[data-remove-from-cart-button]', (e) => {
    const id = parseInt(e.target.closest('[data-cart-item]').dataset.itemId)
    currentCartItems = currentCartItems.filter((item) => {
      return item.id !== id
    })
    e.target.closest('[data-cart-item]').remove()
  })
  setCartItems()
}

function renderItems(data) {
  items = data.products
  setSessionCartOnStartUp()
  data.products.forEach(renderStoreItem)
}

async function getProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=10')
    const data = await response.json()
    return data
  } catch (error) {
    alert(error)
  }
}

function renderStoreItem(item) {
  if (productWrapper == null) return
  const clone = template.content.cloneNode(true)
  const container = clone.querySelector('[data-store-item]')
  container.dataset.itemId = item.id
  const prodCategory = container.querySelector('[data-category]')
  prodCategory.innerText = item.category
  const prodName = container.querySelector('[data-name]')
  prodName.innerText = item.title
  const prodPrice = container.querySelector('[data-price]')
  prodPrice.innerText = dollarFormat(item.price)
  const prodImage = container.querySelector('[data-image] img')
  prodImage.src = item.images[0]
  productWrapper.appendChild(container)
}

function addTocart(id, storedItems) {
  const product = items.find((item) => {
    return item.id === id
  })

  const currentItem = currentCartItems.find((item) => {
    return item.id === id
  })
  if (currentItem == null) {
    const cartItemClone = cartItemTemplate.content.cloneNode(true)
    const cartItem = cartItemClone.querySelector('[data-cart-item]')
    cartItem.dataset.itemId = product.id
    const itemName = cartItem.querySelector('[data-name]')
    itemName.innerText = product.title
    const itemImage = cartItem.querySelector('[data-image] img')
    itemImage.src = product.images[0]
    const itemPrice = cartItem.querySelector('[data-price]')
    itemPrice.innerText = dollarFormat(product.price)

    const cartElement = {
      id: product.id,
      quantity: 1
    }

    if (storedItems) {
      const currentStored = storedItems.find((item) => {
        return item.id === id
      })
      if (currentStored && currentStored.quantity > 1) {
        const itemQuantity = cartItem.querySelector('[data-quantity]')
        itemQuantity.innerText = 'x' + currentStored.quantity
        const itemPrice = cartItem.querySelector('[data-price]')
        itemPrice.innerText = dollarFormat(
          product.price * currentStored.quantity
        )

        cartElement.quantity = currentStored.quantity
      }
    }

    document.querySelector('[data-cart-item-container]').appendChild(cartItem)

    currentCartItems.push(cartElement)
  } else {
    currentItem.quantity = currentItem.quantity + 1
    const itemQuantity = document.querySelector(
      `[data-item-id="${id}"] [data-quantity]`
    )
    itemQuantity.innerText = 'x' + currentItem.quantity
    const itemPrice = document.querySelector(
      `[data-cart-item][data-item-id="${id}"] [data-price]`
    )
    itemPrice.innerText = dollarFormat(product.price * currentItem.quantity)
  }
}

function globalEventListener(type, element, callback) {
  document.addEventListener(type, (e) => {
    if (!e.target.matches(element)) return
    callback(e)
    setCartItems()
  })
}

function setCartItems() {
  if (runOnce) {
    sessionStorage.setItem(ATC_SESSION_KEY, JSON.stringify(currentCartItems))
  }
  runOnce = true
  const cartItems = document.querySelectorAll('[data-cart-item]')
  const cartElements = cartItems.length || 0
  document.querySelector('[data-cart-items]').innerText = cartElements

  if (cartItems.length === 0) cartContainer.classList.add('invisible')

  const total = document.querySelector('[data-cart-total]')
  let totalValue = 0
  const cartValues = document.querySelectorAll(
    '[data-cart-item-container] [data-price]'
  )
  cartValues.forEach((value) => {
    let thisValue = value.textContent.substring(1)
    thisValue = parseInt(thisValue.replaceAll(',', ''))
    totalValue = totalValue + thisValue
  })
  total.innerText = dollarFormat(totalValue)
}

function setSessionCartOnStartUp() {
  const storedCurrentItems = JSON.parse(sessionStorage.getItem(ATC_SESSION_KEY))

  if (storedCurrentItems != null) {
    storedCurrentItems.forEach((item) => {
      addTocart(item.id, storedCurrentItems)
    })
    setCartItems()
  }
}

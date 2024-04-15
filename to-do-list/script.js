const form = document.querySelector('#new-item-form')
const input = document.querySelector('#item-input')
const list = document.querySelector('#list')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const item = document.createElement('li')
  item.innerText = input.value
  item.classList = 'list-item'
  list.appendChild(item)
  input.value = ''
  item.addEventListener('click', (e) => {
    list.removeChild(item)
  })
})

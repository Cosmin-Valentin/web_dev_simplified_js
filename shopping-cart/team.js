const userTemplate = document.querySelector('#user-item-template')
const userwrapper = document.querySelector('[data-user-wrapper]')

export function setUpTeam() {
  getUsers().then((data) => {
    renderUsers(data)
  })
}

async function getUsers() {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=9')
    const data = await response.json()
    return data
  } catch (error) {
    alert(error)
  }
}

function renderUsers(data) {
  const users = data.users
  users.forEach(renderUserItem)
}

function renderUserItem(user) {
  if (userTemplate == null) return
  const clone = userTemplate.content.cloneNode(true)
  const container = clone.querySelector('[data-user-container]')
  const userImg = container.querySelector('[data-user-image]')
  userImg.src = user.image
  const userName = container.querySelector('[data-user-name]')
  userName.innerText = `${user.firstName} ${user.maidenName.charAt(0)}. ${
    user.lastName
  }`
  const userTitle = container.querySelector('[data-user-title]')
  userTitle.innerText = user.company.title

  userwrapper.appendChild(container)
}

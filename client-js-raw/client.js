const GITHUB_API = 'https://api.github.com/graphql'
const GITHUB_KEY = '4f345abf8189735e4966e8f594b9fee747cd7f62'

const QUERY = `
  query ($first:Int) {
    viewer {
      name
      company
      avatarUrl (size: 150)
      repositories (first: $first) {
        nodes {
          name
          url
        }
      }
    }
  }
`


async function send (query) {
  const response = await fetch(GITHUB_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_KEY}`
    },
    body: JSON.stringify({
      query: query,
      variables: {
        first: 10
      }
    })
  })

  return await response.json()
}


async function render () {
  const result = await send(QUERY)
  const data = result.data.viewer

  const app = document.getElementById('app')

  app.appendChild(Name(data.name))
  app.appendChild(Avatar(data.avatarUrl))
  app.appendChild(Company(data.company))
  app.appendChild(Repositories(data.repositories.nodes))
}


function Name (name) {
  const h1 = document.createElement('h1')
  h1.innerText = name

  return h1
}


function Avatar (src) {
  const img = document.createElement('img')
  img.src = src

  return img
}


function Company (name) {
  const p = document.createElement('p')
  p.innerText = name

  return p
}


function Repositories (repositories) {
  const ul = document.createElement('ul')
  repositories.forEach(repository => {
    const li = document.createElement('li')
    li.innerHTML = `<a href="${repository.url}">${repository.name}</a>`
    ul.appendChild(li)
  })

  return ul
}


render()

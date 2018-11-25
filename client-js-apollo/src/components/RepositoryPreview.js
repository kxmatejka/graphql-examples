import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Heading = styled.div`
  font-weight: bold;
  font-size: 18px;
`

function RepositoryPreview ({repository}) {
  const {
    name,
    owner: {
      login
    },
    description,
    stargazers: {
      totalCount: stars
    },
    primaryLanguage
  } = repository
  const language = primaryLanguage ? `| ${primaryLanguage.name}` : ''

  return (
    <div>
      <Link to={`/repository/${login}/${name}`}>
        <Heading>{name}</Heading>
      </Link>
      <p>{description}</p>
      <p>{stars} stars {language}</p>
    </div>
  )
}

export default RepositoryPreview

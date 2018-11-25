import React from 'react'
import styled from 'styled-components'
import {Query} from 'react-apollo'
import Result from './Result'
import {REPOSITORY_DETAIL_QUERY} from '../graphql/Repository'
import RepositoryStar from './RepositoryStar'

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    display: inline-block;
  }

  & > li:before {
    display: inline-block;
    content: "|";
    margin: 10px;
  }

  & > li:first-child:before, & > li:first-child:after {
    display: none;
  }
`

const Button = styled.button`
  cursor: pointer;
  padding: 3px 7px;
  background: ${p => p.starred ? '#eee' : '#f1d654'};
  border: 1px solid ${p => p.starred ? '#ccc' : '#3333'};
  
  &:active {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`

function RepositoryDetail ({match}) {
  const {
    params: {
      owner,
      name
    }
  } = match

  return (
    <Query query={REPOSITORY_DETAIL_QUERY} variables={{owner, name}}>
      {({data, loading, error}) => (
        <Result data={data} loading={loading} error={error}>
          {(data) => {
            const {
              repository: {
                viewerHasStarred,
                stargazers: {
                  totalCount
                },
                issues
              }
            } = data

            return (
              <div>
                <h1>{owner} / {name}</h1>
                <Ul>
                  <li>
                    <RepositoryStar id={data.repository.id} stars={totalCount} isStarred={viewerHasStarred}/>
                  </li>
                  <li>
                    <a href={data.repository.url}>view on github</a>
                  </li>
                  <li style={{display: data.repository.primaryLanguage ? 'inline-block': 'none'}}>
                    {data.repository.primaryLanguage && data.repository.primaryLanguage.name}
                  </li>
                </Ul>
                <p>{data.repository.description}</p>
                <h2>{issues.totalCount} Issues</h2>
                <ul>
                {
                  issues.nodes.map(issue => (
                    <li key={issue.id}>
                      <h3>{issue.title}</h3>
                      <p dangerouslySetInnerHTML={{__html: issue.bodyHTML}}/>
                    </li>
                  ))
                }
                </ul>
              </div>
            )
          }}
        </Result>
      )}
    </Query>
  )
}

export default RepositoryDetail

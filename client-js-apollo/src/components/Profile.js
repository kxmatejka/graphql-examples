import React from 'react'
import {Query} from 'react-apollo'
import Result from './Result'
import {VIEWER_QUERY} from '../graphql/Viewer.js'
import RepositoryPreview from './RepositoryPreview'

function Profile () {
  return (
    <Query query={VIEWER_QUERY}>
      {({data, loading, error}) => (
        <Result data={data} loading={loading} error={error}>
          {(data) => {
            const {
              viewer: {
                name,
                company,
                avatarUrl,
                repositories: {
                  totalCount,
                  nodes: repositories
                }
              }
            } = data

            return (
              <>
                <h1>{name}</h1>
                <p>{company}</p>
                <img src={avatarUrl} alt={name}/>
                <h2>{totalCount} repositories</h2>
                <ul>
                  {repositories.map(repository => (
                    <li key={repository.id}>
                      <RepositoryPreview repository={repository} />
                    </li>
                  ))}
                </ul>
              </>
            )
          }}
        </Result>
      )}
    </Query>
  )
}

export default Profile

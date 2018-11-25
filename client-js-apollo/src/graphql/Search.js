import gql from 'graphql-tag'
import {REPOSITORY_PREVIEW_FRAGMENT} from './Repository'

const SEARCH_QUERY = gql`
query ($query: String!) {
    search (
        query: $query
        type: REPOSITORY
        first: 10
    ) {
        nodes {
            __typename
            ... on Repository {
                ...RepositoryPreviewFragment
            }
        }
        repositoryCount
    }
}
${REPOSITORY_PREVIEW_FRAGMENT}
`

export {
  SEARCH_QUERY
}

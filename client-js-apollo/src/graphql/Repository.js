import gql from 'graphql-tag'

const REPOSITORY_DETAIL_QUERY = gql`
    query ($owner: String!, $name: String!) {
        repository (
            owner: $owner,
            name: $name
        ) {
            id
            url
            description
            viewerHasStarred
            primaryLanguage {
                name
            }
            stargazers {
                totalCount
            }
            issues (first:20) {
                totalCount
                nodes {
                    id
                    title
                    bodyHTML
                }
            }
        }
    }
`

const REPOSITORY_TOGGLE_STAR_RESPONSE_FRAGMENT = gql`
    fragment repositoryStarFragment on Starrable {
        viewerHasStarred
        stargazers {
            totalCount
        }
    }
`

const ADD_REPOSITORY_STAR_MUTATION = gql`
    mutation ($id: ID!) {
        result: addStar (input: {starrableId: $id}) {
            starrable {
                ...repositoryStarFragment
            }
        }
    }
    ${REPOSITORY_TOGGLE_STAR_RESPONSE_FRAGMENT}
`

const REMOVE_REPOSITORY_STAR_MUTATION = gql`
    mutation ($id: ID!) {
        result: removeStar (input: {starrableId: $id}) {
            starrable {
                ...repositoryStarFragment
            }
        }
    }
    ${REPOSITORY_TOGGLE_STAR_RESPONSE_FRAGMENT}
`

const REPOSITORY_PREVIEW_FRAGMENT = gql`
    fragment RepositoryPreviewFragment on Repository {
        id
        url
        name
        description
        owner {
            login
        }
        primaryLanguage {
            name
        }
        stargazers {
            totalCount
        }
    }
`

export {
  REPOSITORY_DETAIL_QUERY,
  ADD_REPOSITORY_STAR_MUTATION,
  REMOVE_REPOSITORY_STAR_MUTATION,
  REPOSITORY_PREVIEW_FRAGMENT
}

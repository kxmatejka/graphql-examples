import gql from 'graphql-tag'
import { REPOSITORY_PREVIEW_FRAGMENT } from './Repository'

const VIEWER_QUERY = gql`
query viewer {
    viewer {
        name
        login
        company
        avatarUrl (size: 150)
        repositories (first: 10) {
            nodes {
                ...RepositoryPreviewFragment
            }
            totalCount
        }
    }
}
${REPOSITORY_PREVIEW_FRAGMENT}
`

export {
  VIEWER_QUERY
}

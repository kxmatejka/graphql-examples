import React, {PureComponent} from 'react'
import {Query} from 'react-apollo'
import Result from './Result'
import {SEARCH_QUERY} from '../graphql/Search'
import RepositoryPreview from './RepositoryPreview'

class Search extends PureComponent {
  state = {
    query: ''
  }

  textBoxRef = React.createRef()

  handleSearch = () => {
    this.setState(({
      query: this.textBoxRef.current.value
    }))
  }

  render() {
    const {
      state: {
        query
      }
    } = this

    return (
      <form onSubmit={(event) => {
          event.preventDefault()
          this.handleSearch()
        }}>
        <input type='text' ref={this.textBoxRef} id='text' autoComplete='off'/>
        <button onClick={this.handleSearch}>Search!</button>

        {query && <Query query={SEARCH_QUERY} variables={{query}}>
          {({data, loading, error}) => (
            <Result data={data} loading={loading} error={error}>
              {(data) => {
                const {
                  search
                } = data

                return (
                  <>
                    <ul>
                      {search.nodes.map(node => (
                        <li key={node.id}>
                          <RepositoryPreview repository={node}/>
                        </li>
                      ))}
                    </ul>
                    <div>number of results: {search.repositoryCount}</div>
                  </>
                )
              }}
            </Result>
          )}
        </Query>}
      </form>
    )
  }
}

export default Search

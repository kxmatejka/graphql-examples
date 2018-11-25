import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {Mutation} from 'react-apollo'
import {ADD_REPOSITORY_STAR_MUTATION, REMOVE_REPOSITORY_STAR_MUTATION} from '../graphql/Repository'

const Button = styled.button`
  cursor: pointer;
  padding: 3px 7px;
  background: ${p => p.starred ? '#f1d654' : '#eee'};
  border: 1px solid ${p => p.starred ? '#3333' : '#ccc'};
  
  &:active {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`

function ToggleStar ({gqlMutation, id, stars, isStarred, handler}) {
  return (
    <Mutation
      mutation={gqlMutation}
      variables={{id}}
      onCompleted={(data) => {
        const {
          result: {
            starrable: {
              stargazers: {
                totalCount
              },
              viewerHasStarred
            }
          }
        } = data

        handler({stars: totalCount, isStarred: viewerHasStarred})
      }}
    >
      {(mutation) => {
        return (
          <Button starred={isStarred} onClick={mutation}>
            {stars} stars
          </Button>
        )}}
    </Mutation>
  )
}

class RepositoryStar extends PureComponent {
  state = {
    stars: this.props.stars,
    isStarred: this.props.isStarred
  }

  handleToggleStar = ({stars, isStarred}) => {
    this.setState({
      stars,
      isStarred
    })
  }

  render () {
    const {
      state: {
        stars,
        isStarred
      },
      props: {
        id
      }
    } = this
    const gqlMutation = isStarred ? REMOVE_REPOSITORY_STAR_MUTATION : ADD_REPOSITORY_STAR_MUTATION

    return (
      <ToggleStar
        gqlMutation={gqlMutation}
        id={id} stars={stars} isStarred={isStarred}
        handler={this.handleToggleStar}
      />
    )
  }
}

export default RepositoryStar

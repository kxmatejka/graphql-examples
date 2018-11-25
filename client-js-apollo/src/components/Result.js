import React from 'react'

function Result ({data, loading, error, children}) {
  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error.toString()}</div>
  }

  return children(data)
}

export default Result

import React from 'react'
import { connect } from 'react-redux'
import { searchRestaurants } from '../redux/actions'

const Header = ({ dispatch }) => {
  const keywordInput = React.createRef()

  function search(e) {
    e.preventDefault()
    e.stopPropagation()
    
    const keyword = keywordInput.current.value
    dispatch(searchRestaurants({ keyword }))
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Restaurants Finder</a>
      </nav>
      <form className="form-inline my-2">
        <input className="form-control" ref={keywordInput} placeholder="keyword" />
        <button type="button" className="btn btn-secondary ml-2" onClick={(e) => search(e)}>Search</button>
      </form>
    </React.Fragment>
  )
}

export default connect()(Header)
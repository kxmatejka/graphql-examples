class Author {
  constructor(props) {
    Object.assign(this, props)
  }

  get articles () {
    return this.articleRepository.findByAuthor(this.id)
  }

  get comments () {
    return this.commentRepository.findByAuthor(this.id)
  }

  get articleRepository () {
    if (!this._articleRepository) {
      this._articleRepository = require('./article')
    }

    return this._articleRepository
  }

  get commentRepository () {
    if (!this._commnetRepository) {
      this._commnetRepository = require('./comment')
    }

    return this._commnetRepository
  }
}

class AuthorRepository {
  constructor () {
    this.data = []
  }

  findAll () {
    return this.data
  }

  findById (id) {
    return this.data.find(author => author.id === id)
  }

  create (data) {
    const author = new Author({id: this.data.length + 1, ...data})
    this.data.push(author)

    return author
  }
}

module.exports = new AuthorRepository()

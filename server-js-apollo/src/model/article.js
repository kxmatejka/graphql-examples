class Article {
  constructor(props) {
    Object.assign(this, props)
  }

  get author () {
    return this.authorRepository.findById(this.authorId)
  }

  get comments () {
    return this.commentRepository.findByArticle(this.id)
  }

  get authorRepository () {
    if (!this._authorRepository) {
      this._authorRepository = require('./author')
    }

    return this._authorRepository
  }

  get commentRepository () {
    if (!this._commnetRepository) {
      this._commnetRepository = require('./comment')
    }

    return this._commnetRepository
  }
}

class ArticleRepository {
  constructor () {
    this.data = []
  }

  findAll () {
    return this.data
  }

  findById (id) {
    return this.data.find(article => article.id === id)
  }

  findByAuthor (author) {
    return this.data.filter(article => article.authorId === author)
  }

  create (data) {
    const article = new Article({id: this.data.length + 1, ...data})
    this.data.push(article)

    return article
  }

  update (id, data) {
    const index = this.data.findIndex(article => article.id === id)
    const article = new Article({id: this.data.length + 1, ...data})
    this.data[index] = article

    return article
  }

  delete (id) {
    const index = this.data.findIndex(article => article.id === id)
    const article = this.data[index]
    this.data = [
      ...this.data.slice(0, index),
      ...this.data.slice(index + 1),
    ]

    return article
  }
}

module.exports = new ArticleRepository()

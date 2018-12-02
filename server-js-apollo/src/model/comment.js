class Comment {
  constructor(props) {
    Object.assign(this, props)
  }

  get author () {
    return this.authorRepository.findById(this.authorId)
  }

  get article () {
    return this.authorRepository.findById(this.articleId)
  }

  get authorRepository () {
    if (!this._authorRepository) {
      this._authorRepository = require('./author')
    }

    return this._authorRepository
  }

  get articleRepository () {
    if (!this._articleRepository) {
      this._articleRepository = require('./article')
    }

    return this._articleRepository
  }
}

class CommentRepository {
  constructor () {
    this.data = []
  }

  findById (id) {
    return this.data.find(comment => comment.id === id)
  }

  findByAuthor (author) {
    return this.data.filter(comment => comment.authorId === author)
  }

  findByArticle (article) {
    return this.data.filter(comment => comment.articleId === article)
  }

  create (data) {
    const comment = new Comment({id: this.data.length + 1, ...data})
    this.data.push(comment)

    return comment
  }
}


module.exports = new CommentRepository()

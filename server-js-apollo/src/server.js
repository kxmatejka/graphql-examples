const {ApolloServer, gql} = require('apollo-server')
const {populateArticles, populateAuthors, populateComments} = require('./populate')
const article = require('./model/article')
const author = require('./model/author')
const comment = require('./model/comment')

populateArticles(article)
populateAuthors(author)
populateComments(comment)

const typeDefs = gql`
    type Article {
        id: Int
        source: String
        title: String
        author: Author
        comments: [Comment]
    }

    type Author {
        id: Int
        name: String
        articles: [Article]
        comments: [Comment]
    }

    type Comment {
        id: Int
        content: String
        author: Author
        article: Article
    }

    type Query {
        version: String
        articles: [Article]
        article (id: Int!): Article
        authors: [Author]
        author (id: Int!): Author
    }

    type Mutation {
        addArticle (title: String!, authorId: Int!): Article
        addAuthor (name: String!): Author
        addComment (content: String!, authorId: Int!, articleId: Int!): Comment
        removeArticle (id: Int!): Article
    }
`

const resolvers = {
  Query: {
    version: () => process.env.npm_package_version,
    articles: () => article.findAll(),
    article: (parent, args) => article.findById(args.id),
    authors: () => author.findAll(),
    author: (parent, args) => author.findById(args.id)
  },
  Mutation: {
    addArticle: (parent, args) => article.create(args),
    addAuthor: (parent, args) => author.create(args),
    addComment: (parent, args) => comment.create(args),
    removeArticle: (parent, args) => article.delete(args.id)
  }
}

const server = new ApolloServer({typeDefs, resolvers})

module.exports = server

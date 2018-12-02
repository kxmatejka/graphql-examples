module.exports.populateArticles = (repository) => {
  repository.create({
    source: 'aktualne',
    title: 'Stát chystá omezení slevových akcí.',
    authorId: 1
  })
  repository.create({
    source: 'aktualne',
    title: 'Česku hrozí extrémní ledovka.',
    authorId: 1
  })
  repository.create({
    source: 'aktualne',
    title: 'ANO by teď volil každý třetí Čech.',
    authorId: 2
  })
  repository.create({
    source: 'aktualne',
    title: 'Tak si žil narkobaron Escobar.',
    authorId: 3
  })
  repository.create({
    source: 'ct24',
    title: 'Dotace jsou spolupachatelem korupce.',
    authorId: 4
  })
}

module.exports.populateAuthors = (repository) => {
  repository.create({
    name: 'Petr Zenkner'
  })
  repository.create({
    name: 'ČTK'
  })
  repository.create({
    name: 'Dan Poláček'
  })
  repository.create({
    name: 'mka'
  })
}

module.exports.populateComments = (repository) => {
  repository.create({
    content: 'Lorem ipsum',
    authorId: 1,
    articleId: 1
  })
}

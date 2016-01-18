require('../helper')

describe('Users Routes', function () {
  describe('create', function () {
    it('creates a user', async function (done) {
      request(app.listen())
        .post('/users')
        .send({user: {username: 'tester', password: 'foobar',
          email: 'test@example.com'}})
        .expect(201)
        .end( (err, res) => {
          expect(err).to.not.exist
          expect(res.body.token).to.exist
          done()
        })
    })

    it('returns an error if a user exists', async function (done) {
      await new User({email: 'test@example.com', password: 'foobar'}).save()
      request(app.listen())
        .post('/users')
        .send({user: {username: 'tester', password: 'foobar',
          email: 'test@example.com'}})
        .expect(422, done)
    })
  })

  describe('login', function () {
    beforeEach( async function (done) {
      this.user = new User({
        email: 'test@example.com', password: 'foobar'})
      await this.user.hashPassword()
      await this.user.save()
      done()
    })

    it('returns error for no user', async function (done) {
      request(app.listen())
        .post('/login')
        .send({ email: 'fake@example.com' })
        .expect(401, done)
    })

    it('returns error for invalid password', async function (done) {
      request(app.listen())
        .post('/login')
        .send({ email: 'test@example.com', password: 'foobar2' })
        .expect(401, done)
    })

    it('returns token for valid details', async function (done) {
      request(app.listen())
        .post('/login')
        .send({ email: 'test@example.com', password: 'foobar' })
        .expect(200)
        .end( (err, res) => {
          expect(err).to.not.exist
          expect(res.body.token).to.eql(this.user.token)
          done()
        })
    })
  })
})

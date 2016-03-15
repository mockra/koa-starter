require('../helper')

describe('User Model', function () {
  var user

  beforeEach( function () {
    user = new User({
      password: 'foobar'
    })
  })

  describe('hashPassword', function () {
    it('hashes the password', async function () {
      await user.hashPassword()
      expect(user.password).to.not.eql('foobar')
      expect(user.password).to.exist
    })
  })

  describe('comparePassword', function () {
    it('compares to hashed password', async function () {
      await user.hashPassword()
      const isMatch = await user.comparePassword('foobar')
      expect(isMatch).to.eq(true)
    })

    it('returns false for bad passwords', async function () {
      await user.hashPassword()
      const isMatch = await user.comparePassword('notfoobar')
      expect(isMatch).to.eq(false)
    })
  })

  describe('generateToken', function () {
    it('generates a token', async function () {
      await user.generateToken()
      expect(user.token).to.exist
    })

    it('will not generate a duplicate token', async function () {
      const oldUser = await new User({}).save()
      user.token = oldUser.token
      await user.generateToken()
      expect(user.token).to.not.eq(oldUser.token)
    })
  })
})

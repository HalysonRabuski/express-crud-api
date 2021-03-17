const env = process.env.NODE_ENV || 'development'

const config = () => {
  switch (env) {
    case 'development':
      return {
        jwt: 'abde7fd81bb43cd2920165451d9a0338c45ae58d2c06abc00da605e87146e0f2',
        expiration: '7d',
      }
    case 'test':
      return {
        jwt: 'e6027d63337ba7c2f1655666210322362f8e9c6fd7796be38d8422f7c643442b',
        expiration: '7d',
      }
    case 'production':
      return {
        jwt: '2b4bd9af8cd7df5bc3847ecbbbc0923f7448e87fabd92e004afb02db4d6ef71e',
        expiration: '7d',
      }
    default:
      return {}
  }
}

module.exports = config()

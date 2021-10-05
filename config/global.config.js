const config = {
    jwt: {
        secret: '@captain12',
        signOptions: {
            expiresIn: '300s'
        }
    },

    mongodb: {
        url: 'mongodb://localhost:27017/dev',
        dbOptions: {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user: 'max',
            pass: '12345'
        }
    }
}

module.exports = config;
'use-strict';

const Hapi = require('hapi')
const Boom = require('boom');
const HapiAuthBasic = require('hapi-auth-basic');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        const user = { name: 'hapi', password: 'auth' };

        const validate = (request, username, password) => {
            const isValid = username === user.name && password === user.password;

            return { isValid: isValid, credentials: { name: user.name} }
        }

        await server.register(HapiAuthBasic);
        server.auth.strategy('simple', 'basic', { validate });

        server.route({
            method: 'GET',
            path: '/',
            options: {
                auth: 'simple'
            },
            handler: (request, h) => {
                
                return 'Welcome'
            },

        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();
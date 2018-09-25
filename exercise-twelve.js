'use-strict';

const Hapi = require('hapi')
const Boom = require('boom');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        server.state('session', {
            encoding: 'base64json',
            ttl: 10,
            domain: 'localhost',
            path: '/',
            isSecure: false,
            isHttpOnly: false,
            isSameSite: false
        })

        server.route({
            method: 'GET',
            path: '/set-cookie',
            handler: (request, h) => {
                
                return h.response('success').state('session', { key: 'makemehapi' })
            },
            options: {
                state: {
                    parse: true,
                    failAction: 'log'
                }
            }
        })

        server.route({
            method: 'GET',
            path: '/check-cookie',
            handler: (request, h) => {
                if (request.state.session) {
                    const ret = { user: 'hapi' }

                    return JSON.stringify(ret)
                } else {
                    return Boom.unauthorized('Missing authentication')
                }
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();
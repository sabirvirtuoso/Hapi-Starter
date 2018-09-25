'use-strict';

const Hapi = require('hapi');
const H2o2 = require('h2o2');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })
    
        await server.register(H2o2);

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return "Hello hapi"
            }
        })

        server.route({
            method: 'GET',
            path: '/proxy',
            handler: {
                proxy: {
                    host: '127.0.0.1',
                    port: 65535
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

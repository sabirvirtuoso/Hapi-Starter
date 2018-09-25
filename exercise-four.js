'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })
    
        await server.register(Inert);

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return "Hello hapi"
            }
        })

        server.route({
            method: 'GET',
            path: '/foo/bar/baz/{param*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, 'public'),
                    index: ['index.html']
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

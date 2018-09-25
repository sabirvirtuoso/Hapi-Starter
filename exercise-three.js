'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080),
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, 'public')
                }
            }
        })
    
        await server.register(Inert);

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file('index.html')
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();

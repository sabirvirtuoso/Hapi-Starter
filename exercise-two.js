'use strict';

const Hapi = require('hapi');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })
    
        server.route({
            method: 'GET',
            path: '/{name}',
            handler: (request, h) => {
                return `Hello ${encodeURIComponent(request.params.name)}`
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();

'use strict';

const Hapi = require('hapi');
const Path = require('path');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })
    
        await server.register(require('vision'));

        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: __dirname,
            path: 'templates' // Path.join(__dirname, 'templates') can also be written
        })

        server.route({
            method: 'GET',
            path: '/',
            handler: {
                view: 'index.html'
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();

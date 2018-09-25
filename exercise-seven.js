'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Handlebars = require('handlebars');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })
    
        await server.register(Vision);

        server.views({
            engines: {
                html: Handlebars
            },
            relativeTo: __dirname,
            path: 'templates', // Path.join(__dirname, 'templates') can also be written
            helpersPath: 'helpers'
        })

        server.route({
            method: 'GET',
            path: '/',
            handler: {
                view: 'template.html'
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();

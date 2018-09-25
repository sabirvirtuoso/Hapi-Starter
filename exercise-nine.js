'use-strict';

const Hapi = require('hapi');
const Joi = require('joi');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        server.route({
            method: 'GET',
            path: '/chickens/{breed?}',
            handler: (request, h) => {
                
                return `Hello ${request.params.breed}`
            },
            options: {
                validate: {
                    params: {
                        breed: Joi.string().required()
                    }
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
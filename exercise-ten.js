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
            method: 'POST',
            path: '/login',
            handler: (request, h) => {
                
                return 'login successful'
            },
            options: {
                validate: {
                    payload: Joi.object({
                        isGuest: Joi.boolean().required(),
                        username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
                        accessToken: Joi.string().alphanum(),
                        password: Joi.string().alphanum()
                    }).options({ allowUnknown: true }).without('password', 'accessToken')
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
'use-strict'

const Hapi = require('hapi');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        server.route({
            method: 'POST',
            path: '/upload',
            handler: (request, h) => {
                return new Promise((resolve, reject) => {
                    const description = request.payload.description;
                    const file = request.payload.file;

                    var body = '';

                    file.on('data', (data) => {
                        body += data
                    })

                    file.on('end', () => {
                        const response = {
                            description: description,
                            file: {
                                data: body,
                                filename: file.hapi.filename,
                                headers: file.hapi.headers
                            }
                        }

                        return resolve(JSON.stringify(response))
                    })

                    file.on('error', (err) => {
                        return reject(err)
                    })
                })
            },
            options: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
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
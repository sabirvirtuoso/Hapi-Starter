'use-strict';

const Hapi = require('hapi')
const Fs = require('fs');
var Rot13 = require("rot13-transform");
var Path = require('path');

(async () => {
    try {
        const server = Hapi.Server({
            host: 'localhost',
            port: Number(process.argv[2] || 8080)
        })

        server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                const thisFile = Fs.createReadStream(Path.join(__dirname, 'foo.txt'));

                return thisFile.pipe(Rot13())
            }
        })
    
        await server.start()
        console.log(`Server is running at ${server.info.uri}`)
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
})();

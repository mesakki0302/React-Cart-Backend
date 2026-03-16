const swaggerautogen = require('swagger-autogen')()

const doc = {
    info:{
        title:"Product API",
        description:"Swagger autogen UI"
    },
    host:'localhost:5000',
    schemes:['http'],
}

const outputFile = './swagger-output.json'
const endpointsFile = ['./server.js']

swaggerautogen(outputFile,endpointsFile,doc)
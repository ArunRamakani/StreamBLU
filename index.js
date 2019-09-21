// Load GRPC and proto loader node Module and 
const grpc = require('grpc')
var protoLoader = require("@grpc/proto-loader");

// Load My SQL helper module
var sqltools = require('./sqltools');

// Load the protocal
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("datastreamblu.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

// Parse input parameter to receive mysql host and pass on to MYSQL util
var host = process.argv.slice(2).toString();
console.log(host)
sqltools.loadSQLHost(host)

// implementation Server Streaming proto method definition 
// receives existing data and push to into MySQL util
function ServerStreaming(call, callback) {

    //place holder for user data 
    values = []

    // call back for stream push 
    call.on('data', function (chunk) {
        // Add data into place holder on each push
        values.push([parseInt(chunk.user.id), chunk.user.name, chunk.user.message])
    })
    // call back for stream error 
    call.on('error', function (chunk) {
        console.log("error")
        // Respond back to the client with en error
        callback({
            result: proto.datastreamblu.DataStreamResult.FAILURE
        })
    })
    // call back for stream end 
    call.on('end', function () {
        console.log(values)
        // push the data in to MYSQL util as a BATCH
        sqltools.pushUserDataToDB(values)
        // Respond back to the client with success
        callback(null, {
            result: proto.datastreamblu.DataStreamResult.SUCESS
        })
    })
}


// initialize the GRPC Server
const server = new grpc.Server()
server.bind("[::]:50051", grpc.ServerCredentials.createInsecure())
console.log('Server running at http://[::]:50051')
server.start()

// implementation method mapping for all the service definition in GRPC Server
server.addService(proto.datastreamblu.GRPCDataStreamBLU.service, {
    ServerStreaming: ServerStreaming
})

const grpc = require('grpc')
//const dataStreamProto = grpc.load('datastream.proto')
const server = new grpc.Server()
var mysql = require('node-mysql');
var protoLoader = require("@grpc/proto-loader");

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("datastream.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "user"
});

function ClientStreaming(call, callback) {

    var sql = "INSERT INTO user.usr (id, name, message) VALUES ?";
    values = []

    call.on('data', function (chunk) {
        values.push([parseInt(chunk.user.id), chunk.user.name, chunk.user.message])
        console.log(chunk.user.id)
    })
    call.on('error', function (chunk) {
        console.log("error")
        callback({
            result: proto.datastream.DataStreamResult.FAILURE
        })
    })
    call.on('end', function () {
        console.log("end")
        console.log(values)

        conn.query(sql, [values], function (err) {
            if (err) throw err;
            conn.end();
        });

        callback(null, {
            result: proto.datastream.DataStreamResult.SUCESS
        })
    })
}
server.addService(proto.datastream.GRPCDataStream.service, {
    ClientStreaming: ClientStreaming
})



server.bind('127.0.0.1:50052', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()

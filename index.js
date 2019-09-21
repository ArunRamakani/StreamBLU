const grpc = require('grpc')
//const dataStreamProto = grpc.load('datastream.proto')
const server = new grpc.Server()
var mysql      = require('mysql');
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

var host = process.argv.slice(2).toString();
console.log(host)

var con = mysql.createConnection({
    host: host,
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

        con.query(sql, [values], function (err) {
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




server.bind("[::]:50051", grpc.ServerCredentials.createInsecure())
console.log('Server running at http://[::]:50051')
server.start()

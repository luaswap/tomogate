const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const config = require('config')
const AUTH_PROTO_PATH = path.resolve(__dirname, '../config/auth.proto')
const PROJECT_PROTO_PATH = path.resolve(__dirname, '../config/projects.proto')

const packageDefinitionAuth = protoLoader.loadSync(
    AUTH_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
    }
)

const packageDefinitionProject = protoLoader.loadSync(
    PROJECT_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        arrays: true
    }
)

const GRPCAuth = grpc.loadPackageDefinition(packageDefinitionAuth).gateway.v1

const GRPCProject = grpc.loadPackageDefinition(packageDefinitionProject).gateway.v1

const authAPI = new GRPCAuth.AuthService(
    config.get('serverAPI'),
    grpc.credentials.createInsecure()
)

const projectAPI = new GRPCProject.ProjectService(
    config.get('serverAPI'),
    grpc.credentials.createInsecure()
)

module.exports = { authAPI, projectAPI }

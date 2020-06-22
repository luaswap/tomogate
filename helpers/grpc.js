const path = require('path')
const GRPCClient = require('node-grpc-client')
const config = require('config')
const AUTH_PROTO_PATH = path.resolve(__dirname, '../config/auth.proto')
const PROJECT_PROTO_PATH = path.resolve(__dirname, '../config/projects.proto')

const authAPI = new GRPCClient(AUTH_PROTO_PATH, 'gateway.v1', 'AuthService', config.get('serverAPI'))

const projectAPI = new GRPCClient(PROJECT_PROTO_PATH, 'gateway.v1', 'ProjectService', config.get('serverAPI'))

module.exports = { authAPI, projectAPI }

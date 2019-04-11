const https = require('https')
const express = require('express')
const proxy = require('http-proxy-middleware')
const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.join(__dirname, '../../localhost-key.pem'), 'utf8')
const certificate = fs.readFileSync(path.join(__dirname, '../../localhost.pem'), 'utf8')

const credentials = { key: privateKey, cert: certificate }

const app = express()

app.use('*', proxy({ target: 'http://localhost:3000', changeOrigin: true, logLevel: 'debug' }))

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(3443)

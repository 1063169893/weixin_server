var sha1 = require("sha1");
var Accessid = require("./require")
var getRowBody = require("raw-body")
var xml2js =require("./xml2js")
module.exports = function (opts) {
    var access = new Accessid(opts)
    return function* (next) {
        var token = opts.Token
        var signature = this.query.signature
        var echostr = this.query.echostr
        var timestamp = this.query.timestamp
        var nonce = this.query.nonce
        var str = [token, timestamp, nonce].sort().join('')
        var sha = sha1(str)
        console.log('this', this)
        console.log(this.method)
        console.log(this.request.method)
        if (this.request.method === 'GET') {
            if (sha === signature) {
                this.body = echostr + ''
            } else (
                this.body = 'woron'
            )
        } else if (this.request.method === 'POST') {
            if (sha !== signature) {
                this.body = 'woron'
                return false
            }
            var data = yield getRowBody(this.req, {
                length: this.length,
                limit: '10mb',
                encoding: 'utf-8'
            })
            var centent = yield xml2js(data)
            console.log('data', centent)
        }
    }
}
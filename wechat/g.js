var sha1 = require("sha1");
var Accessid = require("./require")
var getRowBody = require("raw-body")
var xml2js = require("./xml2js")
var compiled = require("./tpl")
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
        var _this = this
        if (this.request.method === 'GET') {
            if (sha === signature) {
                console.log('验证成功')
                this.body = echostr + ''
            } else (
                _this.response.body = 'Wrong'
            )
        } else if (this.request.method === 'POST') {
            if (sha !== signature) {
                this.body = 'Wrong'
                return false
            }
            var data = yield getRowBody(this.req, {
                length: this.length,
                limit: '10mb',
                encoding: 'utf-8'
            })
            var centent = yield xml2js.gatUserData(data)

            var datanew = yield xml2js.formatCentent(centent.xml)
            console.log(datanew)
            var center = yield access.setOpenUserData(datanew)
            var xml2Data = compiled.compiled(center)
            console.log(xml2Data)
            _this.response.status = 200
            _this.response.type = 'application/xml'
            _this.response.body = xml2Data
        }
    }
}
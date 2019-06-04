var sha1 = require("sha1");
var Accessid = require("./require")
var getRowBody = require("raw-body")
var xml2js = require("./xml2js")
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
                _this.response.body = 'woron 002315165sadasdsda0202031dAFSADCVSERVARADVERVADCSVAW'
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
            var centent = yield xml2js.gatUserData(data)

            var data = yield xml2js.formatCentent(centent.xml)
            console.log(data)
            var text = '欢迎关注我的公众号哦！！'
            if (data.MsgType === 'event') {
                if (data.Event === 'subscribe') {
                    var now = new Date().getTime()
                    if (data.FromUserName === 'oO9M05iHPC6bEqQww9OzGxqvHb7c') {
                        _this.response.status = 200
                        _this.response.type = 'application/xml'
                        _this.response.body = ('<xml>' +
                            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                            '<CreateTime>' + now + '</CreateTime>' +
                            '<MsgType><![CDATA[text]]></MsgType>' +
                            '<Content><![CDATA[霞姐，欢迎关注我的公众号哦！]]></Content>' +
                            '</xml>')
                        return
                    }
                    if (data.FromUserName === 'oO9M05lUR5nGNxRIChnijtGNms94') {
                        _this.response.status = 200
                        _this.response.type = 'application/xml'
                        _this.response.body = ('<xml>' +
                            '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                            '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                            '<CreateTime>' + now + '</CreateTime>' +
                            '<MsgType><![CDATA[text]]></MsgType>' +
                            '<Content><![CDATA[嗨婷婷，欢迎关注我的公众号哦！]]></Content>' +
                            '</xml>')
                    }
                    _this.response.status = 200
                    _this.response.type = 'application/xml'
                    _this.response.body = ('<xml>' +
                        '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                        '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                        '<CreateTime>' + now + '</CreateTime>' +
                        '<MsgType><![CDATA[text]]></MsgType>' +
                        '<Content><![CDATA[' + text + ']]></Content>' +
                        '</xml>')

                }
            }
            if (data.MsgType === 'text') {
                _this.response.status = 200
                _this.response.type = 'application/xml'
                _this.response.body = "<xml>" +
                    '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                    '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                    "<CreateTime>" + now + "</CreateTime>" +
                    "<MsgType><![CDATA[text]]></MsgType>" +
                    "<Content><![CDATA[还没开发好哈，不用试了！！！]]></Content>" +
                    "<MsgId>" + data.MsgId + "</MsgId>" +
                    "</xml>"
                if (data.Content === '我爱你') {
                    _this.response.status = 200
                    _this.response.type = 'application/xml'
                    _this.response.body = "<xml>" +
                        '<ToUserName><![CDATA[' + data.FromUserName + ']]></ToUserName>' +
                        '<FromUserName><![CDATA[' + data.ToUserName + ']]></FromUserName>' +
                        "<CreateTime>" + now + "</CreateTime>" +
                        "<MsgType><![CDATA[text]]></MsgType>" +
                        "<Content><![CDATA[嘿嘿，你好骚！！！]]></Content>" +
                        "<MsgId>" + data.MsgId + "</MsgId>" +
                        "</xml>"
                }
            }
        }
    }
}
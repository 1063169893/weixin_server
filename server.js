var koa = require("koa");
var wechat = require("./wechat/g")
var utill = require('./wechat/utill')
var config = {
    wechat: {
        appID: 'wxb1d2a7b79554ff96',
        appsecret: 'cfea3267544a9340ab800ce030d8387e',
        Token: 'askdnlnfiwnndkfnsofoadlfskdjflka',
        getDirWords: function (filename, options) {
            return utill.getDirWord(filename, options)
        },
        settDirWords: function (filename, options) {
            return utill.settDirWord(filename, options)
        }
    }
}
var app = new koa()
app.use(wechat(config.wechat))
app.listen(80)
console.log("运行在80端口")
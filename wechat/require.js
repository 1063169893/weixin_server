var path = require('path');
var wechat = path.join(__dirname, '../bili/wechat.txt')
var axios = require('axios')
module.exports = function Accessid(opts) {
    let _this = this
    _this.appID = opts.appID
    _this.appsecret = opts.appsecret
    _this.Token = opts.Token
    _this.getDirWords = opts.getDirWords
    _this.settDirWords = opts.settDirWords

    _this.getDirWords(wechat, 'utf-8')
        .then(res => {
            try {
                if (res) {
                    if (_this.verificationlegitimate(JSON.parse(res))) {
                        console.log(res)
                    } else {
                        _this.updateaAccessid(_this)
                    }
                } else {
                    _this.updateaAccessid(_this)
                }
            }
            catch {
                console.log('错误')
            }
        })
    Accessid.prototype.verificationlegitimate = function (data) {
        if (!data || !data.access_token || !data.expires_in) {
            return false
        }
        var nowDate = (new Date().getTime()) - data.ontime + 200
        console.log(nowDate / 1000, '秒')
        var outTime = data.expires_in * 1000
        if (nowDate < outTime) {
            return true
        }
    }
    Accessid.prototype.updateaAccessid = function (_this) {
        axios.get(`https://api.weixin.qq.com/cgi-bin/token?`, {
            params: {
                grant_type: 'client_credential',
                appid: _this.appID,
                secret: _this.appsecret
            }
        }
        ).then(function (res) {
            res.data.ontime = (new Date()).valueOf()
            _this.settDirWords(wechat, JSON.stringify(res.data))
        }).catch(function (err) {
            console.log('222222222222', err)
        })
    }

}

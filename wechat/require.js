var path = require('path');
var wechat = path.join(__dirname, '../bili/wechat.txt')
var axios = require('axios')
var axiosHttp = require('./menu')
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
                        axiosHttp(res)
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
        console.log('access_token时间', nowDate / 1000, '秒')
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
            console.log('22', err)
        })
    }
    Accessid.prototype.setOpenUserData = function (datas) {
        // if (datas.MsgType === 'text')
        return new Promise(function (resolve, reject) {
            var now = new Date().getTime()
            var cententData = {
                toUser: datas.FromUserName,
                fromUser: datas.ToUserName,
                time: now,
                MsgType: 'text',
                content: null
            }
            if (datas.MsgType === 'event') {
                if (datas.Event === 'subscribe') {
                    cententData.content = {
                        text: '欢迎关注这是一个正在开发的测试公众号！'
                    }
                }
            }
            if (datas.MsgType === 'text') {
                if (datas.Content === '【收到不支持的消息类型，暂无法显示】') {
                    cententData.content = {
                        text: '调皮，乱发什么不知道',
                        MsgId: datas.MsgId
                    }
                } else {
                    cententData.content = {
                        text: '你刚才发了' + datas.Content + '给我 https://www.baidu.com',
                        MsgId: datas.MsgId
                    }
                }

            }
            if (datas.MsgType === 'image') {
                cententData.MsgType = 'image'
                cententData.PicUrl = datas.PicUrl
                cententData.content = {
                    MediaId: datas.MediaId
                }
            }
            if (datas.MsgType === 'voice') {
                cententData.MsgType = 'text'
                cententData.content = {
                    text: '你刚才说了-' + datas.Recognition,
                    MediaId: datas.MediaId
                }
            }
            if (datas.MsgType === 'video') {
                cententData.MsgType = 'text'
                cententData.content = {
                    text: '这个视频看不了，我先留着',
                    MediaId: datas.MediaId
                }
            }
            if (cententData.content) {
                resolve(cententData)
            }
        }).then(res => {
            return res
        })

    }
    // return new Promise(function (resolve, reject) {
    //     datas.MsgType === 'text'
    // })
}

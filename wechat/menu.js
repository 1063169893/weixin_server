var axios = require('axios')
var btn = {
    "button": [{
        "type": "click",
        "name": "今日歌曲",
        "key": "V1001_TODAY_MUSIC"
    },
    {
        "name": "菜单",
        "sub_button": [{
            "type": "view",
            "name": "搜索",
            "url": "https://www.baidu.com/"
        },
        {
            "type": "click",
            "name": "赞一下我们",
            "key": "V1001_GOOD"
        }
        ]
    }
    ]
}
module.exports = function axiosHttp(accessToken) {
    var access = JSON.parse(accessToken).access_token
    axios({
        timeout: 5000,
        method: 'post',
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + access,
        data: JSON.stringify(btn),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err)
    })
}
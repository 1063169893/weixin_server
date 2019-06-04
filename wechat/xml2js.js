var xml2js = require("xml2js").parseString
exports.gatUserData = function (data) {
    return new Promise(function (resolve, reject) {
        xml2js(data, { trim: true }, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
function formatCentent(data) {
    var fromartXml = {}
    if (typeof data === 'object') {
        var keys = Object.keys(data)
        for (var i = 0; i < keys.length; i++) {
            var item = data[keys[i]]
            var keyName = keys[i]
            if (!(item instanceof Array) || item.length === 0) {
                continue
            }
            if (item.length === 1) {
                var val = item[0]
                if (typeof val === 'object') {
                    fromartXml[keyName] = formatCentent(val)
                } else {
                    fromartXml[keyName] = (val || '').trim()
                }
            } else {
                fromartXml[keyName] = []
                for (var t = 0; t < item.length; t++) {
                    fromartXml[keyName].push(formatCentent(item.t))
                }
            }
            // console.log('aaa', keys[i], data[keys[i]])
        }
    }
    return fromartXml
}
exports.formatCentent = function (data) {
    return new Promise(function (resolve, reject) {
        resolve(formatCentent(data))
    })
}
var xml2js = require("xml2js").parseString
module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        xml2js(data, { trim: true }, function (err, result) {
            if (err) reject(err)
            else resolve(result)
        })
    })
}
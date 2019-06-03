'use strict';
var fs = require('fs');

exports.getDirWord = function(filename, options) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, options, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    }).then(function (res) {
        return res
    }).catch(function (err) {
        return err
    })
}

exports.settDirWord = function(filename, options) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filename, options, (err, data) => {
            if (!err) {
                resolve(1)
            } else {
                reject(0)
            }
        })
    }).then(function (res) {
        return res
    }).catch(function (err) {
        return err
    })
}

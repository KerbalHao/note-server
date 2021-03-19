/*
 * @Date: 2021-03-17 16:33:15
 * @LastEditors: KerbalHao
 * @FilePath: \server\helpers\util.js
 */
let  shajs = require("sha.js")

module.exports = {
  hash: (str) => {
    return shajs("sha256").update(str).digest("hex");
  },

  randomId: () => {
    let str = shajs("sha1")
      .update(Date.now() + "")
      .digest("hex");
    return str.substr(str.length - 10);
  }
};

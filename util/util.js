String.prototype.repeat = function(n) {
    var n = n || 1;
    return Array(n + 1).join(this);
};


String.prototype.fillLength = function(l, ch, isRight){
    var source;
    if ((source = String(this)).length < l) {
            var ar = new Array(l - source.length);
            ar[isRight ? 'unshift' : 'push'](source);
            source = ar.join(ch || '0');
    }
    return source;
};

Date.prototype.format = function(str) {
    var fn = this;
    var lang ='zh-CN',
        wk = {
            'en':['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            "zh-CN":['日', '一', '二', '三', '四', '五', '六']
        }, 
        map={y:"getYear",Y:"getFullYear",M:"getMonth",d:"getDate",h:"getHours",m:"getMinutes",s:"getSeconds",D:"getDay"};

    var val,p1f;
    var _re =  /([yYMdhmsD]{1,4})/g;
    return str.replace(_re,function(match,p1,offset,s){
        p1f = p1.charAt(0);
        if(!map[p1f]) return match;
        val = fn[map[p1f]]();
        p1f == 'y' && (val %= 100);
        (p1f.toLowerCase() == 'y') && (p1.length == 4) && (val = fn[map['Y']]())
        p1f == 'M' && val++;
        p1f == 'D' && (val = wk[lang][val]);
        return val < 10 && p1.length > 1 ? String(val).fillLength(2) : String(val);
    })
}



 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
if (!window.JSON) {
  window.JSON = {
    parse: function (sJSON) { return eval("(" + sJSON + ")"); },
    stringify: function (vContent) {
      if (vContent instanceof Object) {
        var sOutput = "";
        if (vContent.constructor === Array) {
          for (var nId = 0; nId < vContent.length; sOutput += this.stringify(vContent[nId]) + ",", nId++);
          return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
        }
        if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
        for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; }
        return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
      }
      return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
    }
  };
}
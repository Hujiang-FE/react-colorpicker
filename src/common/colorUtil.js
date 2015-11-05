// copied from another zhuanti-designer!

function hexToRGB(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) /255,
        g: parseInt(result[2], 16) /255,
        b: parseInt(result[3], 16) /255
    } : null;
}

function rgbToHex(r, g, b) {
    var s = (65536 * Math.round(255 * r) + 256 * Math.round(255 * g) + Math.round(255 * b)).toString(16);
    return "#" + "00000".substr(0, 6 - s.length) + s
}

// function rgbToHex(r, g, b) {
//     var s = (65536 * parseInt(255 * r) + 256 * parseInt(255 * g) + parseInt(255 * b)).toString(16),
//         color = "#" + "00000".substr(0, 6 - s.length) + s;

//     console.log(65536 * parseInt(256 * r), 256 * parseInt(256 * g), parseInt(256 * b));
//     return color;
//}


// t = Hue(色彩), i = saturation(饱和度), e = value（亮度）
function getRGBFromHSV(t, i, e) {
    var s, a, r,
        n = Math.min(5, Math.floor(6 * t)),
        o = 6 * t - n,
        h = e * (1 - i),
        l = e * (1 - o * i),
        C = e * (1 - (1 - o) * i);

    switch (n) {
        case 0:
            s = e, a = C, r = h;
            break;
        case 1:
            s = l, a = e, r = h;
            break;
        case 2:
            s = h, a = e, r = C;
            break;
        case 3:
            s = h, a = l, r = e;
            break;
        case 4:
            s = C, a = h, r = e;
            break;
        case 5:
            s = e, a = h, r = l
    }
    return {
        red: s,
        green: a,
        blue: r
    }
}


// t = Red, i = Green, e = Blue
// all value is a number between 0, 1
function getHSVFromRGB (t, i, e) {
    var s, a = Math.max(t, i, e),
        r = Math.min(t, i, e),
        n = a - r,
        o = 0 === a ? 0 : n / a;
    if (0 === n)
        s = 0;
    else
        switch (a) {
            case t:
                s = (i - e) / n / 6 + (e > i ? 1 : 0);
                break;
            case i:
                s = (e - t) / n / 6 + 1 / 3;
                break;
            case e:
                s = (t - i) / n / 6 + 2 / 3
        }
    return {
        hue: s,
        saturation: o,
        value: a
    }
}

exports.getHexFromHSV = function(hsv) { 
    var rgb = getRGBFromHSV(hsv.hue, hsv.saturation, hsv.value);
    return rgbToHex(rgb.red, rgb.green, rgb.blue);
}

exports.hexToRGB = hexToRGB ;

exports.getRGBFromHSV = getRGBFromHSV;

exports.getHSVFromRGB = getHSVFromRGB;

exports.rgbToHex = rgbToHex;

// t = Red, i = Green, e = Blue
// all value is a number between 0, 1
exports.rgbToCSSValue = function(t, i, e) {
    return "rgb(" + Math.round(255 * t) + ", " + Math.round(255 * i) + ", " + Math.round(255 * e) + ")";
}

exports.STANDARD_COLORS = 
    ["#000000", "#003300", "#006600", "#009900", "#00CC00", "#00FF00", "#330000", "#333300", "#336600", 
     "#339900", "#33CC00", "#33FF00", "#660000", "#663300", "#666600", "#669900", "#66CC00", "#66FF00", "#000033", 
     "#003333", "#006633", "#009933", "#00CC33", "#00FF33", "#330033", "#333333", "#336633", "#339933", "#33CC33", 
     "#33FF33", "#660033", "#663333", "#666633", "#669933", "#66CC33", "#66FF33", "#000066", "#003366", "#006666", 
     "#009966", "#00CC66", "#00FF66", "#330066", "#333366", "#336666", "#339966", "#33CC66", "#33FF66", "#660066", 
     "#663366", "#666666", "#669966", "#66CC66", "#66FF66", "#000099", "#003399", "#006699", "#009999", "#00CC99", 
     "#00FF99", "#330099", "#333399", "#336699", "#339999", "#33CC99", "#33FF99", "#660099", "#663399", "#666699", 
     "#669999", "#66CC99", "#66FF99", "#0000CC", "#0033CC", "#0066CC", "#0099CC", "#00CCCC", "#00FFCC", "#3300CC", 
     "#3333CC", "#3366CC", "#3399CC", "#33CCCC", "#33FFCC", "#6600CC", "#6633CC", "#6666CC", "#6699CC", "#66CCCC", 
     "#66FFCC", "#0000FF", "#0033FF", "#0066FF", "#0099FF", "#00CCFF", "#00FFFF", "#3300FF", "#3333FF", "#3366FF", 
     "#3399FF", "#33CCFF", "#33FFFF", "#6600FF", "#6633FF", "#6666FF", "#6699FF", "#66CCFF", "#66FFFF", "#990000", 
     "#993300", "#996600", "#999900", "#99CC00", "#99FF00", "#CC0000", "#CC3300", "#CC6600", "#CC9900", "#CCCC00", 
     "#CCFF00", "#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#FFFF00", "#990033", "#993333", "#996633", 
     "#999933", "#99CC33", "#99FF33", "#CC0033", "#CC3333", "#CC6633", "#CC9933", "#CCCC33", "#CCFF33", "#FF0033", 
     "#FF3333", "#FF6633", "#FF9933", "#FFCC33", "#FFFF33", "#990066", "#993366", "#996666", "#999966", "#99CC66", 
     "#99FF66", "#CC0066", "#CC3366", "#CC6666", "#CC9966", "#CCCC66", "#CCFF66", "#FF0066", "#FF3366", "#FF6666", 
     "#FF9966", "#FFCC66", "#FFFF66", "#990099", "#993399", "#996699", "#999999", "#99CC99", "#99FF99", "#CC0099", 
     "#CC3399", "#CC6699", "#CC9999", "#CCCC99", "#CCFF99", "#FF0099", "#FF3399", "#FF6699", "#FF9999", "#FFCC99", 
     "#FFFF99", "#9900CC", "#9933CC", "#9966CC", "#9999CC", "#99CCCC", "#99FFCC", "#CC00CC", "#CC33CC", "#CC66CC", 
     "#CC99CC", "#CCCCCC", "#CCFFCC", "#FF00CC", "#FF33CC", "#FF66CC", "#FF99CC", "#FFCCCC", "#FFFFCC", "#9900FF", 
     "#9933FF", "#9966FF", "#9999FF", "#99CCFF", "#99FFFF", "#CC00FF", "#CC33FF", "#CC66FF", "#CC99FF", "#CCCCFF", 
     "#CCFFFF", "#FF00FF", "#FF33FF", "#FF66FF", "#FF99FF", "#FFCCFF", "#FFFFFF"];

exports.COMMON_COLORS = 
    ["#000", "#333", "#666", "#999", "#ccc", "#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
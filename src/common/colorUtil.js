// copied from another zhuanti-designer!

function hexToRGB(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16) /256,
        g: parseInt(result[2], 16) /256,
        b: parseInt(result[3], 16) /256
    } : null;
}

function rgbToHex(r, g, b) {
    var s = (65536 * Math.round(255 * r) + 256 * Math.round(255 * g) + Math.round(255 * b)).toString(16);
    return "#" + "00000".substr(0, 6 - s.length) + s
}


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

    return rgbToHex(rgb.red, rgb.blue, rgb.green);
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
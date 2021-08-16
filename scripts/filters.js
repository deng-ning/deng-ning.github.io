var originalImg = null;
var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
// const image = document.getElementById('source');

// image.addEventListener('load', e => {
//   ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
// });

function loadImage() {
    var file = document.getElementById("fileInput");
    originalImg = new SimpleImage(file);
    originalImg.drawTo(cvs);
}

function reset() {
    clearCanvas();
    originalImg.drawTo(cvs);
}

function clearCanvas(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}

function imageIsLoaded(picture) {
    if (picture != null && picture.complete()) {
        var size = document.getElementById("size");
        console.log(originalImg.getWidth(), originalImg.getHeight());
        size.innerHTML = "Size: " + originalImg.getWidth() + " x " + originalImg.getHeight();
        return true;
    } else {
        alert("File has not uploaded yet. ");
        return false;
    }
}

function doGray() {
    if (!imageIsLoaded(originalImg)) return;
    makeGray();
}

function makeGray() {
    var filtered = new SimpleImage(originalImg.getWidth(), originalImg.getHeight());
    for (var px of originalImg.values()) {
        var red = px.getRed();
        var green = px.getGreen();
        var blue = px.getBlue();
        var avrg = (red + green + blue)/3;
        var targetPixel = filtered.getPixel(px.getX(),px.getY());
        targetPixel.setRed(avrg);
        targetPixel.setGreen(avrg);
        targetPixel.setBlue(avrg);
    }
    clearCanvas();
    filtered.drawTo(cvs);
}

function doRed() {
    if (!imageIsLoaded(originalImg)) return;
    makeRed();
}

function makeRed() {
    var filtered = new SimpleImage(originalImg.getWidth(), originalImg.getHeight());
    for (var px of originalImg.values()) {
        var red = px.getRed();
        var green = px.getGreen();
        var blue = px.getBlue();
        var avrg = (red + green + blue)/3;
        var targetPixel = filtered.getPixel(px.getX(),px.getY());
        if (avrg < 128) {
            targetPixel.setRed(2 * avrg);
            targetPixel.setGreen(0);
            targetPixel.setBlue(0);
        } else {
            targetPixel.setRed(255);
            targetPixel.setGreen(2 * avrg - 255);
            targetPixel.setBlue(2 * avrg - 255);
        }
    }
    clearCanvas();
    filtered.drawTo(cvs);
}

function doDiscreteRainbow() {
    if (!imageIsLoaded(originalImg)) return;
    makeDiscreteRainbow();
}

function makeDiscreteRainbow() {
    var filtered = new SimpleImage(originalImg.getWidth(), originalImg.getHeight());
    for (var px of originalImg.values()) {
        var red = px.getRed();
        var green = px.getGreen();
        var targetPixel = filtered.getPixel(px.getX(),px.getY());
        targetPixel.setRed((red < 205) ? red + 50 : 255);
        targetPixel.setGreen((green < 205) ? green + 50 : 255);
    }
    clearCanvas();
    filtered.drawTo(cvs);
}

function doContinuousRainbow() {
    if (!imageIsLoaded(originalImg)) return;
    makeContinuousRainbow();
}

function makeContinuousRainbow() {
    var saturation = 1.0;
    var filtered = new SimpleImage(originalImg.getWidth(), originalImg.getHeight());
    for (var px of originalImg.values()) {
        var x = px.getX();
        var y = px.getY();
        var red = px.getRed();
        var green = px.getGreen();
        var blue = px.getBlue();
        var hue = 360.0 * y/originalImg.getHeight();
        var lightness = 1.0 * (Math.min(red,green,blue) + Math.max(red,green,blue))/2/255;
        let [newRed, newGreen, newBlue] = hsl2rgb(hue, saturation, lightness);
        var newPixel = filtered.getPixel(x,y);
        newPixel.setRed(newRed);
        newPixel.setGreen(newGreen);
        newPixel.setBlue(newBlue);
    }
    clearCanvas();
    filtered.drawTo(cvs);
}

function hsl2rgb(h, s ,l) {
    // reference: https://www.rapidtables.com/convert/color/hsl-to-rgb.html 
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var rr,gg,bb, r, g, b;
    if (0 <= h && h < 60) {
        rr = c;
        gg = x;
        bb = 0;
    } else if (h < 120) {
        rr = x;
        gg = c;
        bb = 0;
    } else if (h < 180) {
        rr = 0;
        gg = c;
        bb = x;
    } else if (h < 240) {
        rr = 0;
        gg = x;
        bb = c;
    } else if (h < 300) {
        rr = x;
        gg = 0;
        bb = c;
    } else {
        rr = c;
        gg = 0;
        bb = x;
    }
    r = (rr + m) * 255;
    g = (gg + m) * 255;
    b = (bb + m) * 255;
    return [r,g,b];
}

function doDiscreteRainbow() {
    if (!imageIsLoaded(originalImg)) return;
    makeDiscreteRainbow();
}

function makeDiscreteRainbow() {
    var red = [255, 0, 0];
    var orange = [255, 102, 0];
    var yellow = [255, 255, 0];
    var green = [0, 255, 0];
    var blue = [0, 0, 255];
    var indigo = [102, 0, 255];
    var violet = [204, 0, 204];
    var colors = [red, orange, yellow, green, blue, indigo, violet];
    var filtered = new SimpleImage(originalImg.getWidth(), originalImg.getHeight());
    for (var px of originalImg.values()) {
        var avg = (px.getRed() + px.getGreen() + px.getBlue())/3;
        var x = px.getX();
        var y = px.getY();
        var color = colors[Math.floor(7.0 * y / originalImg.getHeight())];
        var newRed, newGreen, newBlue;
        if (avg < 128) {
            newRed = color[0] / 127.5 * avg;
            newGreen = color[1] / 127.5 * avg;
            newBlue = color[2] / 127.5 * avg;
        } else {
            newRed = (2 - color[0] / 127.5) * avg + 2 * color[0] - 255;
            newGreen = (2 - color[1] / 127.5) * avg + 2 * color[1] - 255;
            newBlue = (2 - color[2] / 127.5) * avg + 2 * color[2] - 255;
        }
        var newPixel = filtered.getPixel(x,y);
        newPixel.setRed(newRed);
        newPixel.setGreen(newGreen);
        newPixel.setBlue(newBlue);
    }
    clearCanvas();
    filtered.drawTo(cvs);
}

function doBlur() {
    if (!imageIsLoaded(originalImg)) return;
    makeBlur();
}

function makeBlur() {
    var w = originalImg.getWidth();
    var h = originalImg.getHeight();
    var filtered = new SimpleImage(w, h);
    const RANGE = Math.floor((w + h) / 50.0);
    for (var px of originalImg.values()) {
        var x = px.getX();
        var y = px.getY();
        var newPixel = filtered.getPixel(x,y);
        var random = Math.random();
        if (random < 0.7) {
            newPixel.setAllFrom(px);
        } else {
            var dx = 0;
            var dy = 0;
            while (dx * dy == 0 || x + dx < 0 || x + dx >= w || y + dy < 0 || y + dy >= h) {
                dx = Math.floor(Math.random() * RANGE * 2) - RANGE;
                dy = Math.floor(Math.random() * RANGE * 2) - RANGE;
            }
            newPixel.setAllFrom(originalImg.getPixel(x + dx, y + dy));
        }
    }
    clearCanvas();
    filtered.drawTo(cvs);
}
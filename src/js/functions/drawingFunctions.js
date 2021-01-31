
__FILL__ = true;
__STROKE__ = true;
__FONTSIZE__ = 12;

function circle (x, y, r) {
    const circle = new Path2D();
    circle.moveTo(x, y);
    circle.arc(x, y, r, 0, 2 * Math.PI);
    __FILL__ && ctx.fill(circle);
    __STROKE__ && ctx.stroke(circle);
}

function fill(r, g, b, a=1) {
    __FILL__ = true;
    ctx.fillStyle = _defineColor(r, g, b, a);
}

function fontSize(size) {
    __FONTSIZE__ = size;
}

function lineWidth(width) {
    ctx.lineWidth = width;
}

const noFill = () => __FILL__ = false;
const noStroke = () => __STROKE__ = false;

function point (x, y) {
    rect(x, y, 1);
}

function rect (x, y, width, height) {
    height = height || width;
    __FILL__ && ctx.fillRect(x, y, width, height);
    __STROKE__ && ctx.strokeRect(x, y, width, height);
}

function stroke(r, g, b, a=1) {
    __STROKE__ = true;
    ctx.strokeStyle = _defineColor(r, g, b, a);
}

function text(str, x, y) {
    ctx.font = `${__FONTSIZE__}px serif`;
    ctx.textAlign = "center";
    __FILL__ && ctx.fillText(...arguments);
    __STROKE__ && ctx.fillText(...arguments);
}

function _defineColor(r, g, b, a=1) {
    if (typeof r == 'string') {
        return r;
    } else if (r !== undefined) {
        if (g !== undefined) {
            if (b !== undefined) {
                // RGB (0 - 255) {+ Opacity (0.0 - 1.0)}
                return `rgba(${r}, ${g}, ${b}, ${a})`;
            } else {
                // Gray (0 - 255) + Opacity (0.0 - 1.0)
                return `rgba(${r}, ${r}, ${r}, ${g})`;
            }
        } else {
            // 255 shades of Gray
            return `rgb(${r}, ${r}, ${r})`;
        }
    }
}

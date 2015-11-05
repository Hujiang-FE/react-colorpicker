(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ColorPicker"] = factory();
	else
		root["ColorPicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _colorpicker = __webpack_require__(1);

	var _colorpicker2 = _interopRequireDefault(_colorpicker);

	var colorPickerProps = {
		currentColor: '#5ea629',
		onChange: function onChange(data) {
			document.querySelector('body').style.backgroundColor = data.color;
		}
	};

	var widgets = React.createElement(
		'div',
		null,
		React.createElement(_colorpicker2['default'], colorPickerProps)
	);

	React.render(widgets, document.querySelector('body'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mixinsDrag = __webpack_require__(2);

	var _mixinsDrag2 = _interopRequireDefault(_mixinsDrag);

	var _commonColorUtil = __webpack_require__(4);

	var _commonColorUtil2 = _interopRequireDefault(_commonColorUtil);

	var container_bound = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};

	var ColorPicker = React.createClass({

		displayName: 'ColorPicker',

		mixins: [_mixinsDrag2['default']],

		propTypes: {
			currentColor: '#fff',
			onChange: React.PropTypes.func
		},

		getInitialState: function getInitialState() {
			var crgb = _commonColorUtil2['default'].hexToRGB(this.props.currentColor),
			    hsv = _commonColorUtil2['default'].getHSVFromRGB(crgb.r, crgb.g, crgb.b);

			return {
				toggleClass: 'arrow-up',
				isCommonColorShow: false,
				currentHSV: _commonColorUtil2['default'].getHSVFromRGB(crgb.r, crgb.g, crgb.b)
			};
		},

		changeColor: function changeColor(color) {

			this.fire('onChange', {
				color: color
			});
		},

		_calculateHSV: function _calculateHSV(position) {
			var radioX = position.x / container_bound.width,
			    radioY = position.y / container_bound.height;

			return {
				saturation: radioX,
				value: 1 - radioY
			};
		},

		_calculatePosition: function _calculatePosition(offset) {
			var rx, ry, x, y;

			rx = offset.pageX - container_bound.left;
			ry = offset.pageY - container_bound.top;

			if (rx < 0) x = 0;else if (rx > container_bound.width) x = container_bound.width;else x = rx;

			if (ry < 0) y = 0;else if (ry > container_bound.height) y = container_bound.height;else y = ry;

			return { x: x, y: y };
		},

		handlerPickerClick: function handlerPickerClick(event) {
			var el = event.target,
			    color = el.getAttribute('data-color'),
			    crgb = _commonColorUtil2['default'].hexToRGB(color),
			    hsv = _commonColorUtil2['default'].getHSVFromRGB(crgb.r, crgb.g, crgb.b);

			this.setState({
				currentHSV: hsv
			});

			this.changeColor(color);
		},

		handleToggle: function handleToggle(event) {
			var isShow = this.state.isCommonColorShow;
			this.setState({
				isCommonColorShow: !isShow
			});
		},

		handleTranClick: function handleTranClick(event) {
			return this.changeColor('transparent');
		},

		handleClearClick: function handleClearClick(event) {
			return this.changeColor('');
		},

		handleDragStart: function handleDragStart(event) {
			var el = event.currentTarget,
			    offset = $(el).offset();

			container_bound.left = offset.left;
			container_bound.top = offset.top;
			container_bound.width = el.clientWidth;
			container_bound.height = el.clientHeight;
		},

		handleDrag: function handleDrag(event, offset) {
			var position = this._calculatePosition(offset),
			    HSV = this._calculateHSV(position),
			    self = this;

			this.setState({
				currentHSV: {
					hue: this.state.currentHSV.hue,
					saturation: HSV.saturation,
					value: HSV.value
				}
			}, function () {
				self.changeColor(self._getCurrentColor());
			});
		},

		handleRulerClick: function handleRulerClick(event) {
			var el = event.currentTarget,
			    height = el.clientHeight,
			    offsetTop = $(el).offset().top,
			    offsetY,
			    hue,
			    self = this;

			offsetY = event.pageY - offsetTop;
			hue = offsetY / height;

			this.setState({
				currentHSV: {
					hue: hue,
					saturation: this.state.currentHSV.saturation,
					value: this.state.currentHSV.value
				}
			}, function () {
				self.changeColor(self._getCurrentColor());
			});
		},

		fire: function fire(name, data) {
			//fire custom event
			if (typeof this.props[name] === 'function') {
				this.props[name].call(this, data);
			}
		},

		restoreFromHistory: function restoreFromHistory(key) {
			return store.get(key);
		},

		recordToHistory: function recordToHistory(key, value) {
			return store.set(key, value);
		},

		_getCustomZoneBClr: function _getCustomZoneBClr() {
			var rgb = _commonColorUtil2['default'].getRGBFromHSV(this.state.currentHSV.hue, 1, 1);
			return _commonColorUtil2['default'].rgbToCSSValue(rgb.red, rgb.green, rgb.blue);
		},

		_getCurrentColor: function _getCurrentColor() {
			return _commonColorUtil2['default'].getHexFromHSV(this.state.currentHSV);
		},

		_getDragPositon: function _getDragPositon() {
			return {
				x: this.state.currentHSV.saturation * 100 + '%',
				y: (1 - this.state.currentHSV.value) * 100 + '%'
			};
		},

		_getRulerPosition: function _getRulerPosition() {
			return this.state.currentHSV.hue * 100 + '%';
		},

		_renderColor: function _renderColor(colors) {
			if (!colors) return;

			var self = this,
			    children = [];

			colors.forEach(function (color, index) {
				children.push(React.createElement('i', { 'data-color': color, style: { backgroundColor: color }, onClick: self.handlerPickerClick }));
			});

			return children;
		},

		renderPickers: function renderPickers() {
			return this._renderColor(_commonColorUtil2['default'].STANDARD_COLORS);
		},

		renderHistory: function renderHistory() {
			var storedColors = this.restoreFromHistory('used_colors'),
			    colors = [],
			    len = storedColors && storedColors.length || 0;

			for (var i = len; i < 20; i++) {
				colors.push('#fff');
			}
			return this._renderColor(colors);
		},

		renderCommonColors: function renderCommonColors() {
			return this._renderColor(_commonColorUtil2['default'].COMMON_COLORS);
		},

		renderHeadbar: function renderHeadbar() {

			var curColor = this._getCurrentColor();
			return React.createElement(
				'div',
				{ className: 'header' },
				React.createElement(
					'div',
					{ className: 'color' },
					React.createElement('span', { className: 'current-color', style: { backgroundColor: curColor } }),
					React.createElement(
						'span',
						{ className: 'transparent', onClick: this.handleTranClick },
						React.createElement('i', null)
					),
					React.createElement(
						'span',
						{ className: 'clear', onClick: this.handleClearClick },
						React.createElement('i', null)
					)
				),
				React.createElement(
					'div',
					{ className: 'input' },
					React.createElement('input', { type: 'text', value: curColor })
				),
				React.createElement(
					'div',
					{ className: 'more' },
					React.createElement(
						'button',
						{ className: this.state.toggleClass, onClick: this.handleToggle },
						' '
					)
				)
			);
		},

		renderCustomZone: function renderCustomZone() {
			var dragPosition = this._getDragPositon(),
			    containerProps = {
				className: "advanced",
				style: {
					display: !this.state.isCommonColorShow ? 'block' : 'none'
				}
			},
			    customoneProps = {
				className: "custom-zone",
				onMouseDown: this.handleMousedown,
				style: {
					backgroundColor: this._getCustomZoneBClr()
				}
			},
			    rulerProps = {
				className: 'ruler',
				onClick: this.handleRulerClick
			},
			    draggerProps = {
				className: "dragger",
				style: {
					left: dragPosition.x,
					top: dragPosition.y
				}
			},
			    rulerMarkProps = { //
				style: {
					top: this._getRulerPosition()
				}
			};

			return React.createElement(
				'div',
				containerProps,
				React.createElement(
					'div',
					customoneProps,
					React.createElement('div', draggerProps)
				),
				React.createElement(
					'div',
					rulerProps,
					React.createElement('i', rulerMarkProps),
					React.createElement('span', null)
				)
			);
		},

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'hui-colorpicker' },
				this.renderHeadbar(),
				React.createElement(
					'div',
					{ className: 'select-zone', style: { display: this.state.isCommonColorShow ? 'block' : 'none' } },
					React.createElement(
						'div',
						{ className: 'history' },
						this.renderHistory()
					),
					React.createElement(
						'div',
						{ className: 'colors' },
						React.createElement(
							'div',
							{ className: 'common' },
							this.renderCommonColors()
						),
						React.createElement(
							'div',
							{ className: 'standard' },
							this.renderPickers()
						)
					)
				),
				this.renderCustomZone()
			);
		}

	});

	exports['default'] = ColorPicker;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//import store from 'store.js'
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _commonEventJs = __webpack_require__(3);

	var _commonEventJs2 = _interopRequireDefault(_commonEventJs);

	function getClientOffset(event) {
		return {
			pageX: event.pageX,
			pageY: event.pageY
		};
	}

	var dragEventFor = { //care about mouse events only.
		start: 'mousedown', //'touchstart',
		move: 'mousemove', //'touchmove',
		end: 'mouseup' //'touchend'
	};

	module.exports = {

		// placeholders:
		// handleDragStart
		// handleDrag
		// handleDragEnd

		handleMousedown: function handleMousedown(e) {

			this._dragStart = true;

			this.handleDragStart && this.handleDragStart(e);

			_commonEventJs2['default'].addEvent(document, dragEventFor.move, this.handleMousemove);
			_commonEventJs2['default'].addEvent(document, dragEventFor.end, this.handleMouseup);

			e.preventDefault();
		},

		handleMousemove: function handleMousemove(e) {

			var offset = getClientOffset(e);

			this.handleDrag && this.handleDrag(e, offset);
		},

		handleMouseup: function handleMouseup(e) {

			this._dragStart = false;

			this.handleDragEnd && this.handleDragEnd(e);

			// Remove event handlers
			_commonEventJs2['default'].removeEvent(document, dragEventFor.move, this.handleMousemove);
			_commonEventJs2['default'].removeEvent(document, dragEventFor.end, this.handleMouseup);
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function addEvent(el, event, handler) {
		if (!el) return;

		if (el.attachEvent) {
			el.attachEvent('on' + event, handler);
		} else if (el.addEventListener) {
			el.addEventListener(event, handler, true);
		} else {
			el['on' + event] = handler;
		}
	}

	function removeEvent(el, event, handler) {
		if (!el) return;

		if (el.detachEvent) {
			el.detachEvent('on' + event, handler);
		} else if (el.removeEventListener) {
			el.removeEventListener(event, handler, true);
		} else {
			el['on' + event] = null;
		}
	}

	module.exports = {
		addEvent: addEvent,
		removeEvent: removeEvent
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	// copied from another zhuanti-designer!

	"use strict";

	function hexToRGB(hex) {
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16) / 255,
	        g: parseInt(result[2], 16) / 255,
	        b: parseInt(result[3], 16) / 255
	    } : null;
	}

	function rgbToHex(r, g, b) {
	    var s = (65536 * Math.round(255 * r) + 256 * Math.round(255 * g) + Math.round(255 * b)).toString(16);
	    return "#" + "00000".substr(0, 6 - s.length) + s;
	}

	// function rgbToHex(r, g, b) {
	//     var s = (65536 * parseInt(255 * r) + 256 * parseInt(255 * g) + parseInt(255 * b)).toString(16),
	//         color = "#" + "00000".substr(0, 6 - s.length) + s;

	//     console.log(65536 * parseInt(256 * r), 256 * parseInt(256 * g), parseInt(256 * b));
	//     return color;
	//}

	// t = Hue(色彩), i = saturation(饱和度), e = value（亮度）
	function getRGBFromHSV(t, i, e) {
	    var s,
	        a,
	        r,
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
	            s = e, a = h, r = l;
	    }
	    return {
	        red: s,
	        green: a,
	        blue: r
	    };
	}

	// t = Red, i = Green, e = Blue
	// all value is a number between 0, 1
	function getHSVFromRGB(t, i, e) {
	    var s,
	        a = Math.max(t, i, e),
	        r = Math.min(t, i, e),
	        n = a - r,
	        o = 0 === a ? 0 : n / a;
	    if (0 === n) s = 0;else switch (a) {
	        case t:
	            s = (i - e) / n / 6 + (e > i ? 1 : 0);
	            break;
	        case i:
	            s = (e - t) / n / 6 + 1 / 3;
	            break;
	        case e:
	            s = (t - i) / n / 6 + 2 / 3;
	    }
	    return {
	        hue: s,
	        saturation: o,
	        value: a
	    };
	}

	exports.getHexFromHSV = function (hsv) {
	    var rgb = getRGBFromHSV(hsv.hue, hsv.saturation, hsv.value);
	    return rgbToHex(rgb.red, rgb.green, rgb.blue);
	};

	exports.hexToRGB = hexToRGB;

	exports.getRGBFromHSV = getRGBFromHSV;

	exports.getHSVFromRGB = getHSVFromRGB;

	exports.rgbToHex = rgbToHex;

	// t = Red, i = Green, e = Blue
	// all value is a number between 0, 1
	exports.rgbToCSSValue = function (t, i, e) {
	    return "rgb(" + Math.round(255 * t) + ", " + Math.round(255 * i) + ", " + Math.round(255 * e) + ")";
	};

	exports.STANDARD_COLORS = ["#000000", "#003300", "#006600", "#009900", "#00CC00", "#00FF00", "#330000", "#333300", "#336600", "#339900", "#33CC00", "#33FF00", "#660000", "#663300", "#666600", "#669900", "#66CC00", "#66FF00", "#000033", "#003333", "#006633", "#009933", "#00CC33", "#00FF33", "#330033", "#333333", "#336633", "#339933", "#33CC33", "#33FF33", "#660033", "#663333", "#666633", "#669933", "#66CC33", "#66FF33", "#000066", "#003366", "#006666", "#009966", "#00CC66", "#00FF66", "#330066", "#333366", "#336666", "#339966", "#33CC66", "#33FF66", "#660066", "#663366", "#666666", "#669966", "#66CC66", "#66FF66", "#000099", "#003399", "#006699", "#009999", "#00CC99", "#00FF99", "#330099", "#333399", "#336699", "#339999", "#33CC99", "#33FF99", "#660099", "#663399", "#666699", "#669999", "#66CC99", "#66FF99", "#0000CC", "#0033CC", "#0066CC", "#0099CC", "#00CCCC", "#00FFCC", "#3300CC", "#3333CC", "#3366CC", "#3399CC", "#33CCCC", "#33FFCC", "#6600CC", "#6633CC", "#6666CC", "#6699CC", "#66CCCC", "#66FFCC", "#0000FF", "#0033FF", "#0066FF", "#0099FF", "#00CCFF", "#00FFFF", "#3300FF", "#3333FF", "#3366FF", "#3399FF", "#33CCFF", "#33FFFF", "#6600FF", "#6633FF", "#6666FF", "#6699FF", "#66CCFF", "#66FFFF", "#990000", "#993300", "#996600", "#999900", "#99CC00", "#99FF00", "#CC0000", "#CC3300", "#CC6600", "#CC9900", "#CCCC00", "#CCFF00", "#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#FFFF00", "#990033", "#993333", "#996633", "#999933", "#99CC33", "#99FF33", "#CC0033", "#CC3333", "#CC6633", "#CC9933", "#CCCC33", "#CCFF33", "#FF0033", "#FF3333", "#FF6633", "#FF9933", "#FFCC33", "#FFFF33", "#990066", "#993366", "#996666", "#999966", "#99CC66", "#99FF66", "#CC0066", "#CC3366", "#CC6666", "#CC9966", "#CCCC66", "#CCFF66", "#FF0066", "#FF3366", "#FF6666", "#FF9966", "#FFCC66", "#FFFF66", "#990099", "#993399", "#996699", "#999999", "#99CC99", "#99FF99", "#CC0099", "#CC3399", "#CC6699", "#CC9999", "#CCCC99", "#CCFF99", "#FF0099", "#FF3399", "#FF6699", "#FF9999", "#FFCC99", "#FFFF99", "#9900CC", "#9933CC", "#9966CC", "#9999CC", "#99CCCC", "#99FFCC", "#CC00CC", "#CC33CC", "#CC66CC", "#CC99CC", "#CCCCCC", "#CCFFCC", "#FF00CC", "#FF33CC", "#FF66CC", "#FF99CC", "#FFCCCC", "#FFFFCC", "#9900FF", "#9933FF", "#9966FF", "#9999FF", "#99CCFF", "#99FFFF", "#CC00FF", "#CC33FF", "#CC66FF", "#CC99FF", "#CCCCFF", "#CCFFFF", "#FF00FF", "#FF33FF", "#FF66FF", "#FF99FF", "#FFCCFF", "#FFFFFF"];

	exports.COMMON_COLORS = ["#000", "#333", "#666", "#999", "#ccc", "#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];

/***/ }
/******/ ])
});
;
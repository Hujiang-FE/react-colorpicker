import dragMixin from './mixins/drag';
import colorUtil from './common/colorUtil';

const container_bound = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};


const ColorPicker = React.createClass({

	displayName: 'ColorPicker',

	mixins: [dragMixin],

	propTypes: {
		currentColor: '#fff',
		onChange: React.PropTypes.func
	},

	getInitialState() {
		var crgb = colorUtil.hexToRGB(this.props.currentColor),
			hsv = colorUtil.getHSVFromRGB(crgb.r, crgb.g, crgb.b);

		return {
			toggleClass:'arrow-up',
			isCommonColorShow: false,
			currentHSV: colorUtil.getHSVFromRGB(crgb.r, crgb.g, crgb.b)
		}
	},

	changeColor(color){

		this.fire('onChange', {
			color: color
		})
	},

	_calculateHSV(position){
		var radioX = position.x / container_bound.width,
			radioY = position.y / container_bound.height;

		return {
			saturation : radioX,
			value: 1 - radioY
		};
	},

	_calculatePosition(offset){
		var rx, ry, x, y;

		rx = offset.pageX - container_bound.left;
		ry = offset.pageY - container_bound.top;

		if(rx < 0) x = 0;
		else if(rx > container_bound.width ) x = container_bound.width;
		else x = rx;

		if(ry < 0) y = 0;
		else if(ry > container_bound.height) y = container_bound.height;
		else y = ry;

		return { x: x, y: y }
	},

	handlerPickerClick(event){
		var el = event.target,
			color = el.getAttribute('data-color'),
			crgb = colorUtil.hexToRGB(color),
			hsv = colorUtil.getHSVFromRGB(crgb.r, crgb.g, crgb.b);

		this.setState({
			currentHSV:hsv
		});

		this.changeColor(color);
	},

	handleToggle(event){
		var isShow = this.state.isCommonColorShow;
		this.setState({
			isCommonColorShow: !isShow
		});
	},

	handleTranClick(event){
		return this.changeColor('transparent');
	},

	handleClearClick(event){
		return this.changeColor('');
	},

	handleDragStart: function(event){
		var el = event.currentTarget,
			offset = $(el).offset();

		container_bound.left =  offset.left;
		container_bound.top = offset.top;
		container_bound.width =  el.clientWidth;
		container_bound.height =  el.clientHeight;
	},

	handleDrag(event, offset){
		var position = this._calculatePosition(offset),
			HSV = this._calculateHSV(position),
			self = this;

		this.setState({
			currentHSV: {
				hue: this.state.currentHSV.hue,
				saturation: HSV.saturation,
				value: HSV.value
			}
		}, function(){
			self.changeColor(self._getCurrentColor());
		});

	},

	handleRulerClick(event){
		var el = event.currentTarget,
			height = el.clientHeight, 
			offsetTop = $(el).offset().top,
			offsetY, hue, self = this;

		offsetY = event.pageY - offsetTop;
		hue = offsetY / height;

		this.setState({
			currentHSV: { 
				hue: hue,
				saturation: this.state.currentHSV.saturation,
				value: this.state.currentHSV.value 
			}
		}, function(){
			self.changeColor(self._getCurrentColor());
		});
	},


	fire(name, data){ //fire custom event
		if(typeof this.props[name] === 'function') {
			this.props[name].call(this, data);
		}
	},

	restoreFromHistory(key){
		return store.get(key);
	},

	recordToHistory(key, value){
		return store.set(key, value);
	},

	_getCustomZoneBClr(){
		var rgb = colorUtil.getRGBFromHSV(this.state.currentHSV.hue, 1, 1);
		return colorUtil.rgbToCSSValue(rgb.red, rgb.green, rgb.blue);
	},

	_getCurrentColor(){
		return colorUtil.getHexFromHSV(this.state.currentHSV);
	},

	_getDragPositon(){
		return {
			x: this.state.currentHSV.saturation * 100 + '%',
			y: (1 - this.state.currentHSV.value) * 100 + '%'
		}
	},

	_getRulerPosition(){
		return this.state.currentHSV.hue * 100 + '%'
	},

	_renderColor(colors){
		if(!colors) return;

		var self = this,
			children = [];

		colors.forEach(function(color, index){
			children.push(<i data-color={color} style={{backgroundColor:color}} onClick={self.handlerPickerClick}></i>);
		});

		return children;
	},

	renderPickers() {
		return this._renderColor(colorUtil.STANDARD_COLORS);
	},

	renderHistory(){
		var storedColors = this.restoreFromHistory('used_colors'), 
			colors = [], 
			len = (storedColors && storedColors.length) || 0;

		for(var i = len; i < 20; i++) {
			colors.push('#fff');
		}
		return this._renderColor(colors);
	},

	renderCommonColors(){
		return this._renderColor(colorUtil.COMMON_COLORS);
	},

	renderHeadbar(){

		var curColor = this._getCurrentColor();
		return (
			<div className="header">
				<div className="color">
					<span className="current-color" style={{backgroundColor: curColor}}></span>
					<span className="transparent" onClick={this.handleTranClick}><i></i></span>
					<span className="clear" onClick={this.handleClearClick}><i></i></span>
				</div>
				<div className="input"><input type="text" value={curColor}/></div>
				<div className="more"><button className={this.state.toggleClass} onClick={this.handleToggle}>&nbsp;</button></div>
			</div>
		);
	},

	renderCustomZone(){
		var dragPosition = this._getDragPositon(),

			containerProps = {
				className : "advanced",
				style: {
					display: !this.state.isCommonColorShow ? 'block' : 'none'
				}
			},
			customoneProps = {
				className:"custom-zone",
				onMouseDown:this.handleMousedown,
				style: {
					backgroundColor: this._getCustomZoneBClr()
				}
			},

			rulerProps = {
				className: 'ruler',
				onClick: this.handleRulerClick
			},

			draggerProps = {
				className:"dragger",
				style: {
					left: dragPosition.x, 
					top: dragPosition.y
				}
			},
			
			rulerMarkProps = {//
				style: {
					top: this._getRulerPosition()
				}
			};

		return (
			<div {...containerProps}>
				<div {...customoneProps}>
					<div {...draggerProps}></div>
				</div>
				<div {...rulerProps}>
					<i {...rulerMarkProps}></i>
					<span></span>
				</div>
			</div>
		);
	},

	render() {
		return (
			<div className="hui-colorpicker">
				{this.renderHeadbar()}
				<div className='select-zone' style={{display: this.state.isCommonColorShow ? 'block' : 'none'}}>
					<div className="history">
					{this.renderHistory()}
					</div>
					<div className="colors">
						<div className="common">
						{this.renderCommonColors()}
						</div>
						<div className="standard">
						{this.renderPickers()}
						</div>
					</div>
				</div>
				{this.renderCustomZone()}
			</div>
		);
	}

});

export default ColorPicker
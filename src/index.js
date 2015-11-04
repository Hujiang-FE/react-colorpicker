import ColorPicker from './colorpicker';


var colorPickerProps = {
	currentColor: '#5ea629',
	onChange: function(data) {
		document.querySelector('body').style.backgroundColor = data.color;
	}
};

var widgets = (
	<div>
		<ColorPicker {...colorPickerProps}/>
	</div>
)
		
React.render(widgets, document.querySelector('body'));

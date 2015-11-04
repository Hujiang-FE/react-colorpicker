//import store from 'store.js'
import eventUtil from '../common/event.js'

function getClientOffset(event) {
	return {
		pageX: event.pageX,
		pageY: event.pageY
	}
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

	handleMousedown(e) {

		this._dragStart = true;

		this.handleDragStart && this.handleDragStart(e);

		eventUtil.addEvent(document, dragEventFor.move, this.handleMousemove);
		eventUtil.addEvent(document, dragEventFor.end, this.handleMouseup);

		e.preventDefault();
	},

	handleMousemove(e) {

		var offset = getClientOffset(e);

		this.handleDrag && this.handleDrag(e, offset);
	},

	handleMouseup(e) {

		this._dragStart = false;

		this.handleDragEnd && this.handleDragEnd(e);

		// Remove event handlers
		eventUtil.removeEvent(document, dragEventFor.move, this.handleMousemove);
		eventUtil.removeEvent(document, dragEventFor.end, this.handleMouseup);
	}
}
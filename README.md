# react-colorpicker

An implement of colorpicker component with react.js


## Snapshot
![snapshot](http://7xlsqt.com1.z0.glb.clouddn.com/colorpicker1.png)
![snapshot](http://7xlsqt.com1.z0.glb.clouddn.com/colorpicker2.png)

* support ie8+,chrome,firefox,safari


## Example

http://localhost:8008/examples/


## Usage

```js
import ColorPicker from 'ColorPicker';

React.render(
  <ColorPicker autoCheckNodes={true}>
  </ColorPicker>,
  document.querySelector('body'));
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>currentColor</td>
          <td>bool</td>
          <td></td>
          <td>Set default color to color-picker</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>bool</td>
          <td></td>
          <td>Fired when current selected color changed!</td>
        </tr>
    </tbody>
</table>

## License

react-colorpicker is released under the MIT license.

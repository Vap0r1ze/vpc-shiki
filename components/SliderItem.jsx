const { React, getModule, getModuleByDisplayName } = require('powercord/webpack')
const { AsyncComponent } = require('powercord/components')

const Slider = AsyncComponent.from(getModuleByDisplayName('Slider'))
const FormText = AsyncComponent.from(getModuleByDisplayName('FormText'))
const FormDivider = AsyncComponent.from(getModuleByDisplayName('FormDivider'))
const FormItem = AsyncComponent.from(getModuleByDisplayName('FormItem'))

const { marginBottom20 } = getModule(['marginBottom20'], false)
const { dividerDefault } = getModule(['dividerDefault'], false)
const { description } = getModule(['formText', 'description'], false)
const { vertical, justifyStart, alignStretch, noWrap } = getModule(['vertical', 'justifyStart', 'alignStretch', 'noWrap'], false)

module.exports = class SliderItem extends React.PureComponent {
  render () {
    return (
      <FormItem
        className={`${vertical} ${justifyStart} ${alignStretch} ${noWrap} ${marginBottom20}`}
        title={this.props.children}
      >
        <Slider
            initialValue={this.props.value}
            asValueChanges={value => this.props.onChange(value)}
            handleSize={this.props.handleSize || 10}
            keyboardStep={this.props.keyboardStep || 1}
            maxValue={this.props.maxValue}
            minValue={this.props.minValue}
            stickToMarkers={this.props.stickToMarkers || false}
        />
        {this.props.note && <FormText
          className={description}
          type="description"
        >
          {this.props.note}
        </FormText>}
        <FormDivider className={dividerDefault}/>
      </FormItem>
    )
  }
}

import React, {Component} from 'react'

export default class SliderItem extends Component {
  render() {
    let style={
      width:this.props.images.length*790+'px',
      left:-790*this.props.index+'px',
      transitionDuration:this.props.speed+'s'
    }
    return (
      <ul className="sliders" style={style}>
        {
          this.props.images.map((item,index)=>(
            <li key={index} className="slider">
              <img src={item.src} alt={item.alt}/>
            </li>
          ))
        }
      </ul>
    )
  }
}

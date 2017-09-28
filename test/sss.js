import React,{Component} from 'react'
import SliderItem from './SliderItem.js'
import SliderDots from './SliderDots.js'
import SliderArrow from './SliderArrow.js'
import './index.css'

export default class Slider extends Component{
  constructor(){
    super()
    this.state={index:0}
  }
  componentDidMount(){
    if(this.props.auto){
      this.go()
    }
  }
  go=()=>{
    this.timer=setInterval(()=>{
      this.turn(1)
    },this.props.delay*1000)
  }
  turn=(step)=>{
    let index=this.state.index;
    index+=step;
    if(index>this.props.images.length){
      index=0
    }
    if(index<0){
      index=this.props.images.length-1
    }
    this.setState({index})
  }
  render(){
    return(
      <div className="slider-wrapper"
    onMouseOver={()=>{clearInterval(this.timer)}}
    onMouseOut={()=>{this.go()}}
  >
  <SliderItem
    images={this.props.images}
    speed={this.props.speed}
    index={this.state.index}
  />
  <SliderArrow turn={this.turn}/>
  <SliderDots images={this.props.images} turn={this.turn} index={this.state.index}/>
  </div>
  )
  }
}

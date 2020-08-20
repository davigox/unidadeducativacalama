import React,{useState} from 'react';
import './styles/Slider.css';
import Imagen from './Imagen'
import imagen1 from '../images/imagen1.jpg';
import imagen2 from '../images/imagen2.jpg';
import imagen3 from '../images/imagen3.jpg';
import left from '../images/left.svg'
import right from '../images/right.svg'


function Slider(){
    let sliderArr = [<Imagen src={imagen1} />,<Imagen src={imagen2} />,<Imagen src={imagen3} />];
    const [x,setX]= useState(0);
    const goLeft=()=>{
        console.log(x);
        x === 0 ? setX(-100 * (sliderArr.length -1)) : setX(x + 100);
    }
    const goRight=()=>{
        console.log(x);
        x === -100 * (sliderArr.length - 1)? setX(0) : setX(x - 100);
        // setX(x-100);

    }
    return(
        <div className="slider">
            {
                sliderArr.map((item,index)=>{
                    return(
                        <div key={index} className="slide" style={{transform: `translateX(${x}%)`}}>
                            {item}
                        </div>
                    )
                })
            }
            <button id="goLeft" onClick={goLeft}>
                <img src={left} alt="Left"/>
            </button>
            <button id="goRight" onClick={goRight}>
                <img src={right} alt="Left"/>
            </button>
        </div>
    )
}

export default Slider;
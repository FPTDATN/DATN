
import Slider, { Settings } from "react-slick";
import RenderImage from "./RenderImage";
import {RiArrowLeftSLine,RiArrowRightSLine} from 'react-icons/ri'
import { useEffect, useState } from "react";

type Props = {}


const NextArrow = (props:any) => {
    const {  onClick } = props;
    return <div className="bg-gradient-to-l text-xl from-gray-400/40 z-10 cursor-pointer text-black flex items-center absolute right-0 top-0 bottom-0 px-2" onClick={onClick}>
        <RiArrowRightSLine/>
    </div>
}

const PrevArrow = (props:any) => {

    const { onClick } = props;
    return <div className="bg-gradient-to-r text-xl from-gray-400/40 z-10 cursor-pointer text-black flex items-center absolute left-0 top-0 bottom-0 px-2" onClick={onClick}>
        <RiArrowLeftSLine/>
    </div>
}


const RelatedProducts = ({ }: Props) => {

    const [screen,setScreen] =useState(window.innerWidth)

    const [showSlide,setShowSlide] = useState(4)

    const resize = () =>{
        setScreen(window.innerWidth)
    }

    useEffect(() => {

        window.addEventListener('resize', resize)


        return () => {
            window.removeEventListener('resize', resize)
        }

    }, [screen])

    useEffect(() => {
        if(screen <= 800) {
            setShowSlide(3)

            if(screen <= 425) {
                setShowSlide(2)
            }
        } else {
            setShowSlide(4)
        }
    },[screen])

    
    

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: showSlide,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000,
        arrows:true,
        nextArrow: <NextArrow/>,
        prevArrow:<PrevArrow/>
    };

    return (
        <div>
            <h1 className="text-2xl px-4 mb-2 font-semibold">Sản phẩm liên quan</h1>

            {/* Window */}
            <Slider  {...settings} className="relative" >
                <RenderImage/>
                <RenderImage/>
                <RenderImage/>
                <RenderImage/>
                <RenderImage/>
                <RenderImage/>
                <RenderImage/>
            </Slider>
        </div>
    )
}

export default RelatedProducts
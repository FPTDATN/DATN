import './detail.css'
import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Modal } from "antd";

const ProductDetail = () => {


    // size
    const [selectedSize, setSelectedSize] = useState("");

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };
    // img
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const slider1Ref = useRef(null);
    const slider2Ref = useRef(null);

    useEffect(() => {
        setNav1(slider1Ref.current);
        setNav2(slider2Ref.current);
    }, []);
    // bảng size
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    // mo tả
    const [isDescriptionOpen, setDescriptionOpen] = useState(false);
    const [isInstructionsOpen, setInstructionsOpen] = useState(false);

    const handleDescriptionClick = () => {
        setDescriptionOpen(!isDescriptionOpen);
    };

    const handleInstructionsClick = () => {
        setInstructionsOpen(!isInstructionsOpen);
    };
    //   
    return (

        <section aria-label="Main content" role="main" className="product-detail ">
            <div className="shadow ">


                <div className="_cont detail-top">



                    <div className="cols">
                        <div className="left-col">
                            <div className="abc">
                                <Slider asNavFor={nav1}
                                    ref={slider2Ref}
                                    slidesToShow={3}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    vertical={true}
                                    verticalSwiping={true}



                                >
                                    <a className="thumb-image " >
                                        <span> <img
                                            src="https://i.ibb.co/NWXd8Bh/8ts23c006-sk010-1.webp"
                                            alt=""
                                            className=""
                                        /></span>
                                    </a>
                                    <a className="thumb-image" >
                                        <span><img
                                            src="https://i.ibb.co/mvVZ4D8/8ts23c006-se131-1.webp"
                                            alt=""
                                            className=""

                                        /></span>
                                    </a>
                                    <a className="thumb-image" >
                                        <span><img
                                            src="https://i.ibb.co/kGMS1sz/8ts23c006-sm517-1.webp"
                                            alt=""
                                            className=""

                                        /></span>
                                    </a>
                                    <a className="thumb-image" >
                                        <span><img
                                            src="https://i.ibb.co/mzFf596/8ts22a004-sb397-1.webp"
                                            alt=""
                                            className=""

                                        /></span>
                                    </a>
                                </Slider>
                            </div>
                            <div className="big">
                                <Slider
                                    asNavFor={nav2} ref={slider1Ref}
                                >
                                    <span> <img
                                        src="https://i.ibb.co/NWXd8Bh/8ts23c006-sk010-1.webp"
                                        alt=""
                                        className=""
                                    /></span>
                                    <span><img
                                        src="https://i.ibb.co/mvVZ4D8/8ts23c006-se131-1.webp"
                                        alt=""
                                        className=""

                                    /></span>
                                    <span><img
                                        src="https://i.ibb.co/kGMS1sz/8ts23c006-sm517-1.webp"
                                        alt=""
                                        className=""

                                    /></span>
                                    <span><img
                                        src="https://i.ibb.co/mzFf596/8ts22a004-sb397-1.webp"
                                        alt=""
                                        className=""

                                    /></span>
                                </Slider>





                                <div className="detail-socials">
                                    <div className="social-sharing" data-permalink="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york">
                                        <a target="_blank" className="share-facebook" title="Share"></a>
                                        <a target="_blank" className="share-twitter" title="Tweet"></a>
                                        <a target="_blank" className="share-pinterest" title="Pin it"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-col md:py-2 py-2">
                            <h1>Quần soóc nam có túi hai bên</h1>
                            <div   >


                                <div className="price-shipping">
                                    <div className="text-3xl font-bold price md:py-2 py-2">
                                        239.000 đ
                                    </div>




                                </div>
                                <div className="swatches">
                                    <div className="swatch clearfix" data-option-index="0">
                                        <div className="header flex">Kích cỡ : <p className='px-2 font-bold'>{selectedSize}</p> </div>
                                        <div
                                            data-value="M"
                                            className={`swatch-element plain m ${selectedSize === "M" ? "selected" : ""}`}
                                            onClick={handleSizeChange}
                                        >
                                            <input
                                                id="swatch-0-m"
                                                type="radio"
                                                name="option-1"
                                                value="M"
                                                checked={selectedSize === "M"}

                                            />
                                            <label htmlFor="swatch-0-m">M</label>
                                        </div>
                                        <div
                                            data-value="L"
                                            className={`swatch-element plain l ${selectedSize === "L" ? "selected" : ""}`}
                                            onClick={handleSizeChange}
                                        >
                                            <input
                                                id="swatch-0-l"
                                                type="radio"
                                                name="option-1"
                                                value="L"
                                                checked={selectedSize === "L"}

                                            />
                                            <label htmlFor="swatch-0-l">L</label>
                                        </div>
                                        <div
                                            data-value="XL"
                                            className={`swatch-element plain xl ${selectedSize === "XL" ? "selected" : ""}`}
                                            onClick={handleSizeChange}
                                        >
                                            <input
                                                id="swatch-0-xl"
                                                type="radio"
                                                name="option-1"
                                                value="XL"
                                                checked={selectedSize === "XL"}

                                            />
                                            <label htmlFor="swatch-0-xl">XL</label>
                                        </div>
                                        <div
                                            data-value="XXL"
                                            className={`swatch-element plain xxl ${selectedSize === "XXL" ? "selected" : ""}`}
                                            onClick={handleSizeChange}
                                        >
                                            <input
                                                id="swatch-0-xxl"
                                                type="radio"
                                                name="option-1"
                                                value="XXL"
                                                checked={selectedSize === "XXL"}

                                            />
                                            <label htmlFor="swatch-0-xxl">XXL</label>
                                        </div>
                                    </div>
                                    <div className="swatch clearfix md:mt-5" >
                                        <div className="header">Màu sắc:</div>
                                        <div className="swatch-element color pink ">
                                            <div className="tooltip">Pink</div>
                                            <input id="swatch-1-blue" type="radio" name="option-0" />
                                            <label htmlFor="swatch-1-blue" style={{ borderColor: "pink" }}>
                                                <span style={{ backgroundColor: "pink" }}></span>
                                            </label>
                                        </div>
                                        <div className="swatch-element color black ">
                                            <div className="tooltip">black</div>
                                            <input id="swatch-1-black" type="radio" name="option-0" />
                                            <label htmlFor="swatch-1-black" style={{ borderColor: "black" }}>
                                                <span style={{ backgroundColor: "black" }}></span>
                                            </label>
                                        </div>
                                        <div className="swatch-element color yellow ">
                                            <div className="tooltip">Yellow</div>
                                            <input id="swatch-1-yellow" type="radio" name="option-0" />
                                            <label htmlFor="swatch-1-yellow">
                                                <span style={{ backgroundColor: "gray" }}></span>
                                            </label>

                                        </div>
                                        <div className="swatch-element color blue ">
                                            <div className="tooltip">blue</div>
                                            <input id="swatch-1-blue" type="radio" name="option-0" />
                                            <label htmlFor="swatch-1-blue" style={{ borderColor: "blue" }}>
                                                <span style={{ backgroundColor: "blue" }}></span>
                                            </label>
                                        </div>

                                    </div>


                                </div>
                                <div className="px-1 md:ml-0 ml-20">
                                    <div className="flex justify-items-center">
                                        <img src="https://i.ibb.co/Vmyp1zm/measuring-tape.png" alt="" className='w-5' />
                                        <a onClick={handleButtonClick} className='px-1 text-center p-1  decoration-solid'>
                                            Bảng kích cỡ
                                        </a>
                                    </div>
                                    <Modal
                                        title="  Hướng dẫn chọn size"
                                        visible={showModal}
                                        onCancel={handleCloseModal}
                                        footer={null}
                                    >
                                        <form action="">
                                            <img src="https://i.ibb.co/tm9gTh5/379659684-622028456790872-7779907120569349537-n.png" alt="" className='' />
                                        </form>
                                    </Modal>
                                </div>



                                <div className="btn-and-quantity-wrap mt-8 md:ml-0 ml-11">
                                    <div className="btn-and-quantity" >

                                        <div id="AddToCart"  >
                                            <a >Add to Cart</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="tabs">
                                    <details
                                        className={`overflow-hidden rounded ${isDescriptionOpen ? "open" : ""}`}
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 p-2 mt-2 text-gray-900 transition"
                                            onClick={handleDescriptionClick}
                                        >
                                            <span className="font-medium text-lg"> Mô Tả </span>
                                            <span
                                                className={`transition ${isDescriptionOpen ? "open" : ""} text-2xl`}
                                            >
                                                {isDescriptionOpen ? "_" : "+"}
                                            </span>
                                        </summary>
                                        <div className="border-t border-gray-200 bg-white">
                                            <ul className="space-y-1 border-t border-gray-200 pl-2">
                                                <li>
                                                    <p className="text-base font-mono">
                                                        Quần soóc chất liệu cotton, cạp thường cài cúc, túi chéo 2 bên.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>

                                    <details
                                        className={`overflow-hidden rounded ${isInstructionsOpen ? "open" : ""}`}
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 p-2 mt-2 text-gray-900 transition"
                                            onClick={handleInstructionsClick}
                                        >
                                            <span className="text-lg font-medium">Hướng dẫn sử dụng</span>
                                            <span
                                                className={`transition ${isInstructionsOpen ? "open" : ""} text-2xl`}
                                            >
                                                {isInstructionsOpen ? "_" : "+"}
                                            </span>
                                        </summary>
                                        <div className="border-t border-gray-200 bg-white">
                                            <ul className="space-y-1 border-t border-gray-200 pl-2">
                                                <li>
                                                    <p className="text-base font-mono">
                                                        Giặt máy ở nhiệt độ thường. <br />
                                                        Phơi trong bóng mát.<br />
                                                        Sấy khô, nhẹ nhàng.<br />
                                                        Là ở nhiệt độ thấp 110 độ C.<br />
                                                        Giặt với sản phẩm cùng màu.<br />
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                <div className="social-sharing-btn-wrapper">
                                    <span id="social_sharing_btn">Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:flex md:justify-between mt-4 mb-3 py-1 shadow-2xl rounded md:px-0 px-3 max-w-[1200px] mx-auto">
                <div className="flex md:py-0 py-2 md:px-0 px-1  ">
                    <img src="https://i.ibb.co/6FJM6gs/service1.png" alt="" className='px-2 w-16' />
                    <div className="">
                        <p className='md:text-lg text-[#333f48] font-semibold text-base'> Thanh toán khi nhận hàng.
                        </p>
                        <p className='md:text-sm text-[rgba(51,63,72,.5)] font-light text-xs'>Giao hàng toàn quốc.</p>
                    </div>

                </div>

                <div className="flex md:py-0 py-2 md:px-0 px-1">
                    <img src="https://i.ibb.co/k4VFqGK/service2.png" alt="" className='px-2 w-16' />
                    <div className="">
                        <p className='md:text-lg text-[#333f48] font-semibold text-base'> Miễn phí giao hàng
                        </p>
                        <p className='md:text-sm text-[rgba(51,63,72,.5)] font-light text-xs'>Với đơn hàng trên 599.000đ.</p>
                    </div>

                </div>
                <div className="flex md:py-0 py-2 md:px-0 px-1">
                    <img src="https://i.ibb.co/ccY2Zw9/service3.png" alt="" className='px-2 w-16 ' />
                    <div className="">
                        <p className='md:text-lg text-[#333f48] font-semibold text-base'>   Đổi hàng miễn phí
                        </p>
                        <p className='md:text-sm text-[rgba(51,63,72,.5)] font-light text-xs'>Trong 30 ngày kể từ ngày mua.</p>
                    </div>

                </div>

            </div>





            
        </section>





    )
}



export default ProductDetail


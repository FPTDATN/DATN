import React, { useRef } from 'react';
import Slider from 'react-slick';

const ColorSwatchSlider = () => {
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  const handleColorClick = (index) => {
    slider1Ref.current.slickGoTo(index); // Go to the corresponding slide in the big image slider
  };

  return (
    <div>
      <div className="thumb-image">
        <Slider
          asNavFor={slider2Ref.current}
          ref={slider1Ref}
        >
          {/* Big image items */}
          <div>
            <img
              src="https://i.ibb.co/NWXd8Bh/8ts23c006-sk010-1.webp"
              alt=""
              className="w-2"
            />
          </div>
          <div>
            <img
              src="https://i.ibb.co/mvVZ4D8/8ts23c006-se131-1.webp"
              alt=""
              className=""
            />
          </div>
          <div>
            <img
              src="https://i.ibb.co/kGMS1sz/8ts23c006-sm517-1.webp"
              alt=""
              className=""
            />
          </div>
          <div>
            <img
              src="https://i.ibb.co/mzFf596/8ts22a004-sb397-1.webp"
              alt=""
              className=""
            />
          </div>
        </Slider>
      </div>

      <div className="big">
        <Slider
          asNavFor={slider1Ref.current}
          ref={slider2Ref}
        >
          {/* Color swatch items */}
          <div
            className="swatch-element color pink"
            onClick={() => handleColorClick(0)}
          >
            <div className="tooltip">Pink</div>
            <input id="swatch-1-pink" type="radio" name="option-0" />
            <label htmlFor="swatch-1-pink" style={{ borderColor: 'pink' }}>
              <span style={{ backgroundColor: 'pink' }}></span>
            </label>
          </div>
          <div
            className="swatch-element color black"
            onClick={() => handleColorClick(1)}
          >
            <div className="tooltip">Black</div>
            <input id="swatch-1-black" type="radio" name="option-0" />
            <label htmlFor="swatch-1-black" style={{ borderColor: 'black' }}>
              <span style={{ backgroundColor: 'black' }}></span>
            </label>
          </div>
          <div
            className="swatch-element color yellow"
            onClick={() => handleColorClick(2)}
          >
            <div className="tooltip">Yellow</div>
            <input id="swatch-1-yellow" type="radio" name="option-0" />
            <label htmlFor="swatch-1-yellow">
              <span style={{ backgroundColor: 'gray' }}></span>
            </label>
          </div>
          <div
            className="swatch-element color blue"
            onClick={() => handleColorClick(3)}
          >
            <div className="tooltip">Blue</div>
            <input id="swatch-1-blue" type="radio" name="option-0" />
            <label htmlFor="swatch-1-blue" style={{ borderColor: 'blue' }}>
              <span style={{ backgroundColor: 'blue' }}></span>
            </label>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default ColorSwatchSlider;
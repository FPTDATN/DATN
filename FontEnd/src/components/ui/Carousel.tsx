import { FunctionComponent } from 'react';
import { Carousel } from 'antd';

interface CarouselProps {}

const slides = [
    {
        id: 1,
        bannerUrl: 'https://tmluxury.vn/wp-content/uploads/banner-thoi-trang-nam-tm-luxury.jpg',
        title: '',
        link: '',
    },
    {
        id: 2,
        bannerUrl: 'https://mayaothuncaocap.com/wp-content/uploads/2017/11/banner-ao-thun-dong-phuc-1.jpg',
        title: '',
        link: '',
    },
    {
        id: 3,
        bannerUrl: 'https://dokcrazy.com/storage/uploads/full/banner-21.jpg',
        title: '',
        link: '',
    },
    {
        id: 4,
        bannerUrl: 'https://dosi-in.com/images/facebook_brand/50/dosiin-Banner_qc50165.jpg',
        title: '',
        link: '',
    },
];

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const CarouselSlide: FunctionComponent<CarouselProps> = () => {
    return (
        <div className="p-10 max-[800px]:p-4 relative flex justify-center">
            <img
                className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
                src="https://img.lovepik.com/background/20211022/medium/lovepik-black-cool-mens-full-screen-poster-psd-background-image_605818479.jpg"
                alt=""
            />

            <div className='max-w-6xl w-full'>
                <Carousel swipeToSlide={true} autoplay dotPosition="bottom" className="mx-auto">
                    {slides.map((slide) => (
                        <div
                            className="h-[520px] max-md:h-[360px] max-[400px]:h-[200px]"
                            key={slide.id}
                            style={contentStyle}
                        >
                            <img className="w-full h-full object-cover" src={slide.bannerUrl} alt="" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CarouselSlide;

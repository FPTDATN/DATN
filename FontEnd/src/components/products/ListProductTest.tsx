import { ProductType } from '@/types/Product';
import { FunctionComponent } from 'react';
import './ListItems.css'
import ScrollCarousel from 'scroll-carousel-react';
interface ListProductTestProps {
    heading?: string;
    hostProducts?: ProductType[];
}

const ListProductTest: FunctionComponent<ListProductTestProps> = () => {
    const imageUrls = [
        'https://i.pinimg.com/564x/51/3f/e3/513fe38254502f567062174dbff16324.jpg',
        'https://i.pinimg.com/564x/70/6e/33/706e33cf61b02e97aa4330b6e958d5b0.jpg',
        'https://i.pinimg.com/564x/09/36/26/09362669ffdf5c7feb30c35cab57680e.jpg',
        'https://i.pinimg.com/564x/be/38/52/be3852a4633aa913ec3bd59367b25719.jpg',
        'https://i.pinimg.com/564x/23/73/0f/23730fe86fa2170a795ec2147d959692.jpg',
        'https://i.pinimg.com/564x/ec/bb/77/ecbb776cb1080a9e4c89b5a90d5a1dff.jpg',
        'https://i.pinimg.com/564x/82/56/78/825678d4abff4887caa7e488e17994ce.jpg',
        'https://i.pinimg.com/564x/a5/9a/49/a59a499b44939934d9dc5dab0f4aa604.jpg'
    ]
    return (
        <section className="container mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 background__product">
            <div className="mt-6 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <h2 className="pb-2 uppercase text-xl font-semibold text-left text-gray-800 md:text-3xl dark:text-gray-400">
                Mẫu Nữ
            </h2>
            <div className="w-20 mb-6 border-b border-red-700 dark:border-gray-400"></div>
            <div className="test_1 py-10">
                    <ScrollCarousel
                        autoplay
                        autoplaySpeed={8}
                        speed={7}
                        onReady={() => console.log('I am ready')}
                    >
                        {imageUrls.map((imageUrl, index) => (
                        <div key={index} className='h-56 w-48'>
                            <a href="#">
                                <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className='h-56 w-48 object-cover rounded'
                                />
                            </a>
                           
                        </div>
                        ))}
                    </ScrollCarousel>
                </div>
               

            </div>
        </section>



    );
};

export default ListProductTest;

import { useGetCategoriesQuery } from '@/services/category';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface GalleryProps {}

const Gallery: FunctionComponent<GalleryProps> = () => {
    const { data } = useGetCategoriesQuery();

    return (
        <section className="flex items-center bg-gray-100  py-16  dark:bg-gray-800 font-poppins">
            <div className="p-4 mx-auto max-w-6xl">
                <h2 className="pb-4  font-bold text-center text-gray-800 text-4xl dark:text-gray-400">Danh mục</h2>
                <div className="mx-auto mb-10 border-b border-red-700 w-44 dark:border-gray-400"></div>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
                    {data?.docs.map((category) => {
                        return (
                            <Link
                                to={''}
                                key={category._id}
                                className="relative rounded-md shadow-sm overflow-hidden group"
                            >
                                <img
                                    src={
                                        'https://dwinofficial.com/wp-content/uploads/2022/10/ao-thun-unisex-black-T-Shirt-thoi-trang-DWin-basic-tee-phong-tron-nam-nu-tay-lo-oversize-7.jpg'
                                    }
                                    className="group-hover:origin-center group-hover:scale-110 group-hover:rotate-3 h-[300px] w-full transition duration-500 object-cover"
                                    alt={category.name}
                                />
                                <div className="absolute inset-0 h-[300px] group-hover:bg-black opacity-50 transition duration-500 z-0"></div>
                                <div>
                                    <div className="absolute z-10 group-hover:block bottom-4 left-4">
                                        <div className="h6 text-lg font-medium text-gray-800 hover:text-white transition duration-500">
                                            {category.name}
                                        </div>
                                        <p className="text-gray-300 text-xs mb-0">Robert</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Gallery;

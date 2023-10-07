import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface GalleryProps {

}

const galleries = [
    {
        id: 1,
        url: 'https://dwinofficial.com/wp-content/uploads/2022/10/ao-thun-unisex-black-T-Shirt-thoi-trang-DWin-basic-tee-phong-tron-nam-nu-tay-lo-oversize-7.jpg',
        link: '',
    },
    {
        id: 2,
        url: 'https://media.sellycdn.net/files/md_2023_03_27_09_26_40_0700_pKkhYqUyrr.jpg',
        link: '',
    },
    {
        id: 3,
        url: 'https://product.hstatic.net/1000348721/product/3x2a5926_3f558b8a4dd04ec193415bccc7da7226_master.jpg',
        link: '',
    },
    {
        id: 4,
        url: 'https://vn-test-11.slatic.net/p/a2c55ba4ca7dad33cac17f5d1b2351ff.jpg',
        link: '',
    },
    {
        id: 5,
        url: 'https://cbu01.alicdn.com/img/ibank/O1CN01qCLAYN1Pzk5TkMKK1_!!2201498831912-0-cib.jpg',
        link: '',
    },
    {
        id: 6,
        url: 'https://tanphuong.vn/wp-content/uploads/2020/04/ao-thun-thoi-trang-nam-nu-yourtee-tpx21-3.jpg',
        link: '',
    },
    {
        id: 7,
        url: 'https://zeanus.vn/upload/product/zn-0013/ao-thun-100-cotton-trang-axh-174-0.jpg',
        link: '',
    },
    {
        id: 8,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgrICCEQOGzBCtuFTDCaeu_82OawXKKkmATg&usqp=CAU',
        link: '',
    },
]

const Gallery: FunctionComponent<GalleryProps> = () => {
    return (
        <section className="flex items-center bg-gray-100  py-16  dark:bg-gray-800 font-poppins">
            <div className="p-4 mx-auto max-w-6xl">
                <h2 className="pb-4  font-bold text-center text-gray-800 text-4xl dark:text-gray-400">
                    Categories
                </h2>
                <div className="mx-auto mb-10 border-b border-red-700 w-44 dark:border-gray-400"></div>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
                    {galleries.map((gall) => (

                        <Link to={''} key={gall.id} className="relative rounded-md shadow-sm overflow-hidden group">
                            <img src={gall.url}
                                className="group-hover:origin-center group-hover:scale-110 group-hover:rotate-3 h-[300px] w-full transition duration-500 object-cover"
                                alt="" />
                            <div className="absolute inset-0 h-[300px] group-hover:bg-black opacity-50 transition duration-500 z-0">
                            </div>
                            <div>
                                
                                <div className="absolute z-10 group-hover:block bottom-4 left-4">
                                    <div
                                        className="h6 text-lg font-medium text-gray-800 hover:text-white transition duration-500">
                                        Artificial Inteligence</div>
                                    <p className="text-gray-300 text-xs mb-0">Robert</p>
                                </div>
                            </div>
                        </Link>
                    ))}




                </div>
            </div>
        </section>
    )
}

export default Gallery;
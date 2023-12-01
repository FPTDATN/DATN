import { useGetCategoriesQuery } from "@/services/category";


const CategoryTest = () => {
    const { data: categories, isLoading } = useGetCategoriesQuery();

    return (
        <div className="container_danhmuc-product">
            <div className="danhmuc_container flex justify-center" style={{ cursor: 'grab' }}>
                <div className="danhmuc_swiper-wrapper flex justify-center" style={{ transform: 'translate3d(0px, 0px, 0px)', transitionDuration: '0ms' }}>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        categories?.docs.map((category) => (
                            <div key={category._id} className="dm_swiper-slider" style={{ width: '160px', margin: '25px' }}>
                                <a href="" title={`test demo code html ${category.name}`}></a>
                                <div className="danhmuc_img">
                                    <img src={category.img} alt="" className="rounded-full" />
                                    <span className='image_shadow'></span>
                                </div>

                                <div className="danhmuc_st">
                                    <h3 className="text-center py-2 font-bold">{category.name}</h3>
                                    <div className="text-center text-sm " >+ {category.products.length} sản phẩm</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryTest;

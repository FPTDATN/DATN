import CategoryTest from "@/components/category/CategoryTest";
import Gallery from "@/components/gallery/Gallery";
import SliderTestDemo from "@/components/gallery/SliderTestDemo";
import ListProductItems from "@/components/products/ListItems";
import ListProductTest from "@/components/products/ListProductTest";
// import CarouselSlide from "@/components/ui/Carousel";
import { FunctionComponent } from "react";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return <div>
        {/* <CarouselSlide /> */}
        <SliderTestDemo/>

        <div className="my-10">
            <CategoryTest/>
        </div>
        
        <div className="my-10">
            <ListProductTest/>
        </div>


        <div className="my-10 ">
            <ListProductItems heading="Sản phẩm HOT" />
        </div>

        <div className="p-6">
            <Gallery />
        </div>

        <div className="my-10">
            <ListProductItems heading="New Products" />
        </div>
    </div>
}

export default Home;
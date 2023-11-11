import Gallery from "@/components/gallery/Gallery";
import ListProductItems from "@/components/products/ListItems";
import CarouselSlide from "@/components/ui/Carousel";
import { FunctionComponent } from "react";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return <div>
        <CarouselSlide />

        <div className="mt-6 px-4">
            <ListProductItems heading="Sản phẩm HOT" />
        </div>

        <div className="p-6">
            <Gallery />
        </div>

        <div className="px-4">
            <ListProductItems heading="New Products" />
        </div>
    </div>
}

export default Home;
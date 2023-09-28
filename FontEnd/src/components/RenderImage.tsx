type Props = {
    className?:string;
}

const RenderImage = ({className}:Props) => {
    return (
        <img
            alt="..."
            className={className}
            src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
        />
    )
}

export default RenderImage
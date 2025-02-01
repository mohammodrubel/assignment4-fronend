import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import SlickSlider from "react-slick";
import acc1 from '../assets/acc1.jpg'
import acc2 from '../assets/acc2.jpg'
import acc3 from '../assets/acc3.jpg'
import acc4 from '../assets/acc4.jpg'
import "slick-carousel/slick/slick.css";

const CustomSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        doted: false,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <SlickSlider {...settings}>
            <div className="px-4"> {/* Add padding for spacing */}
                <Card
                    className="bg-custom"
                    cover={
                        <img
                            alt="example"
                            src={acc1}
                        />
                    }
                >
                    <Meta
                        title={<div className="text-white">Card title</div>}
                        description={<div className="text-white">This is the description</div>}
                    />
                    <Button className="mt-4" type="primary">Add To Cart</Button>
                </Card>
            </div>

            <div className="px-4"> {/* Add padding for spacing */}
                <Card
                    className="bg-custom"
                    cover={
                        <img
                            alt="example"
                            src={acc2}
                        />
                    }
                >
                    <Meta
                        title={<div className="text-white">Card title</div>}
                        description={<div className="text-white">This is the description</div>}
                    />
                    <Button className="mt-4" type="primary">Add To Cart</Button>
                </Card>
            </div>

            <div className="px-4"> {/* Add padding for spacing */}
                <Card
                    className="bg-custom"
                    cover={
                        <img
                            alt="example"
                            src={acc3}
                        />
                    }
                >
                    <Meta
                        title={<div className="text-white">Card title</div>}
                        description={<div className="text-white">This is the description</div>}
                    />
                    <Button className="mt-4" type="primary">Add To Cart</Button>
                </Card>
            </div>

            <div className="px-4"> {/* Add padding for spacing */}
                <Card
                    className="bg-custom"
                    cover={
                        <img
                            alt="example"
                            src={acc4}
                        />
                    }
                >
                    <Meta
                        title={<div className="text-white">Card title</div>}
                        description={<div className="text-white">This is the description</div>}
                    />
                    <Button className="mt-4" type="primary">Add To Cart</Button>
                </Card>
            </div>
        </SlickSlider>
    );
};

export default CustomSlider;

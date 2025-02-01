import { Button } from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import '../style/Banner.css';
import CustomSlider from './SlickSlider';
import Container from './ui/Container';

function Banner() {
  useEffect(() => {
    AOS.init({
      duration: 5000,
      easing: 'ease-in-out',
      once: false,
    });
  }, []);

  return (
    <div className="banner p-5">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 justify-center items-center">
          {/* Left Side */}
          <div
            data-aos="fade-up"
            className="lg:col-span-2 md:col-span-1 h-[60vh] flex flex-col justify-center px-4 animate-up-down"
          >
            <h1 className="text-4xl text-[#2cb1ec] md:text-6xl font-bold">
              Best MotorCycle <br /> Parts and Bikes
            </h1>
            <p className="font-medium text-[#2cb1ec] max-w-xl mt-4">
              Our custom bikes are meticulously crafted to reflect your individual style and deliver unmatched performance on the road.
            </p>
            <div className=" mt-5">
              <Button type="primary" size="large">
                Shop For Purchase
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-3 md:col-span-1">
            <CustomSlider />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Banner;

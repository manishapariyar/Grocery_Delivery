
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import { imageSlider } from '../assets/assets';

const MainBanner = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full flex justify-center items-center bg-transparent py-4 px-2 sm:px-2">
      <div className="w-full max-w-screen-lg">
        <Carousel
          arrows={false}
          showDots={true}
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={3000}
        >
          {imageSlider.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={item.images}
                alt={`Slide ${index + 1}`}
                className="sm:w-full  w-[120px]h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px] object-cover rounded-lg shadow-md transition-transform duration-700 transform scale-100 hover:scale-95"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MainBanner;

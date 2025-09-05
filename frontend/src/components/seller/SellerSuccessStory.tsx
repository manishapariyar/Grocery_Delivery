
import Carousel from "react-multi-carousel";

import { testimonials } from "../../assets/assets";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 2000, min: 1036 }, // ≥ 2xl
    items: 3,
    gutter: 32,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 }, // lg–xl
    items: 3,
    gutter: 24,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 }, // sm–md
    items: 2,
    gutter: 20,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 }, // < sm
    items: 1,
    gutter: 16,
  },
};

const SellerSuccessStory = () => {
  return (
    <div className="w-full pt-4" id="sellers">
      <Carousel
        arrows={false}
        showDots={false}
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={3000}
      >
        {testimonials.map(({ id, name, address, img, text }) => (
          <div
            key={id}
            className="min-w-[20rem] min-h-[15rem] flex flex-col justify-between text-sm my-20 mx-4
                       border border-gray-500/30 pb-6 rounded-lg bg-white
                       shadow-[0_4px_15px_0] shadow-black/5"
          >
            <div className="flex flex-col items-center px-5 py-6 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                src={img}
                alt={name}
              />
              <div className="pt-10 text-center">
                <h1 className="text-lg font-medium text-gray-800">{name}</h1>
                <p className="text-gray-800/80">{address}</p>
              </div>
            </div>
            <p className="text-gray-900 p-2 mb-10 text-center">{text}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
export default SellerSuccessStory;
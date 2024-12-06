import PropTypes from 'prop-types';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyStory from './MyStory';

const Stories = ({ stories }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 394,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-2">
      <Slider {...settings}>
        <div className='pl-4'>
          <MyStory />
        </div>
        {stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center justify-center ml-4">
            <div className="w-20 h-20 rounded-full border-2 border-[#00bcd4] overflow-hidden flex items-center justify-center">
              <img src={story.imageUrl} alt="Story" className="w-full h-full p-0.5 object-cover rounded-full" />
            </div>
              <span className="text-xs mr-2 mt-2 text-gray-500 text-center block">{story.title}</span>
        </div>
        ))}
      </Slider>
    </div>
  );
};

Stories.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Stories;

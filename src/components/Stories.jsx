import PropTypes from 'prop-types';
import Slider from 'react-slick';
import MyStory from './MyStory';

const Stories = ({ stories }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="p-4">
      <Slider {...settings}>
        <div>
          <MyStory />
        </div>
        {stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
          <div className="w-24 h-24 rounded-full border-4 border-[#00bcd4] overflow-hidden">
            <img src={story.imageUrl} alt="Story" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-xs font-medium mt-2 text-gray-700">{story.title}</span>
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

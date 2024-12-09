import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyStory from "./MyStory";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../features/stories/storiesSlice";
import PropTypes from "prop-types";

const Stories = ({ categories, imageMap }) => {
  const dispatch = useDispatch();
  const viewedCategories = useSelector((state) => state.stories.viewedCategories);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 7, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 6, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 394, settings: { slidesToShow: 4, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="p-2 max-w-screen-xl mx-auto overflow-hidden">
      <Slider {...settings}>
        <div className="pl-4">
          <MyStory />
        </div>
        {categories.map((category, index) => {
          const firstStory = category.stories[0];
          const imageSrc = firstStory ? imageMap[firstStory.id] : null;
          const isViewed = viewedCategories.includes(index);

          return (
            <div
              key={category.name}
              className="flex flex-col items-center justify-center ml-4 cursor-pointer text-center"
              onClick={() => dispatch(setActiveCategory(index))}
            >
              <div
                className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                  isViewed ? "border-gray-400" : "border-[#00bcd4]"
                }`}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={firstStory.title}
                    className="w-full h-full object-cover rounded-full p-0.5"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <span className="text-xs mr-2 mt-2">{category.name}</span>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

Stories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      stories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  imageMap: PropTypes.object.isRequired,
};

export default Stories;

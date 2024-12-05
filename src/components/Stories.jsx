const storiesData = [
  { id: 1, label: 'My Story', img: '/assets/story-add.png' },
  { id: 2, label: 'Sights', img: '/assets/sights.png' },
  { id: 3, label: 'Palma', img: '/assets/palma.png' },
  { id: 4, label: 'Food', img: '/assets/food.png' },
];

const Stories = () => {
  return (
    <div className="flex space-x-4 p-4 overflow-x-auto">
      {storiesData.map((story) => (
        <div key={story.id} className="flex flex-col items-center">
          <img src={story.img} alt={story.label} className="w-16 h-16 rounded-full border-2 border-primary" />
          <span className="text-sm mt-2">{story.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;

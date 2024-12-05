const NewsSection = () => {
  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">News</h2>
      <div className="grid grid-cols-2 gap-4">
        <img src="/assets/news1.png" alt="News 1" className="w-full h-40 object-cover rounded-lg" />
        <img src="/assets/news2.png" alt="News 2" className="w-full h-40 object-cover rounded-lg" />
      </div>
    </section>
  );
};

export default NewsSection;

const NewsGrid = ({ news }) => {
  // Function to check if the image URL is valid
  const isValidImage = (url) => {
    return url && url.startsWith("http");
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {news
        .filter((item) => isValidImage(item.urlToImage))
        .map((items) => (
          <div
            className="w-full max-w-xs mx-auto rounded-lg shadow-lg bg-gray-800 overflow-hidden"
            key={crypto.randomUUID()}
          >
            <img
              className="object-cover w-full h-48"
              src={items.urlToImage}
              alt="News"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop if placeholder fails
                e.target.src = "/path/to/placeholder-image.jpg"; // Placeholder image URL
              }}
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-100 mb-2">
                {items.title}
              </h4>
              <p className="mb-2 text-gray-300">
                {items.content || "Content not available"}
              </p>
              <div className="flex flex-col md:flex-row justify-between items-start">
                <a
                  href={items.url}
                  className="text-blue-400 hover:text-blue-300 mb-2 md:mb-0"
                >
                  Read more
                </a>
                <div className="text-gray-500 text-sm">
                  <div className="font-semibold">
                    {items.author || "Unknown"}
                  </div>
                  <div>{items.publishedAt}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsGrid;

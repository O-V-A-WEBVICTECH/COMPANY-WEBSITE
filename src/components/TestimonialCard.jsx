const TestimonialCard = ({ quote, author, title }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-300 ease-in-out hover:scale-105">
      <p className="text-lg italic text-gray-600 mb-6">"{quote}"</p>
      <div className="text-gray-800">
        <p className="font-bold text-lg text-blue-600">{author}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;

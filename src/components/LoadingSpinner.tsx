const LoadingSpinner = () => {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-yellow-300 border-t-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

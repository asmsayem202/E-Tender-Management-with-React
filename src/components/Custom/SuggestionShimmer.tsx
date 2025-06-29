const SuggestionShimmer: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full space-y-2 p-2 relative overflow-hidden">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div key={rowIndex} className="relative">
          <div className="h-7 w-full bg-gray-200/95 rounded-md animate-pulse"></div>
        </div>
      ))}

      {/* Shimmer effect */}
      <div className="absolute top-0 left-0 w-full h-full shimmer"></div>

      <style>{`
          .shimmer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              120deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0) 40%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0) 60%,
              rgba(255, 255, 255, 0) 100%
            );
            animation: shimmer-animation 0.9s linear infinite;
            z-index: 1;
          }
  
          .relative {
            position: relative;
          }
  
          @keyframes shimmer-animation {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
    </div>
  );
};

export default SuggestionShimmer;

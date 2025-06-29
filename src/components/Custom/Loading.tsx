import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <Loader2 className="animate-spin" size={20} />
      Loading...
    </div>
  );
};

export default Loading;

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
    <div className="skeleton w-full h-48" />
    <div className="p-5 space-y-3">
      <div className="flex justify-between items-center">
        <div className="skeleton h-5 w-3/4 rounded-xl" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
      <div className="skeleton h-4 w-full rounded-xl" />
      <div className="skeleton h-4 w-2/3 rounded-xl" />
      <div className="flex items-center justify-between pt-2">
        <div className="skeleton h-7 w-14 rounded-xl" />
        <div className="skeleton h-9 w-24 rounded-full" />
      </div>
    </div>
  </div>
);
export default SkeletonCard;

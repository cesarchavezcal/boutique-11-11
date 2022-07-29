export function OrderListCardSkeleton() {
  return (
    <div
      role="status"
      className="flex animate-pulse flex-wrap gap-2 rounded-3xl bg-white p-4"
    >
      <div className="bg-black-light/30 h-24 w-24 flex-shrink-0 rounded-3xl" />
      <div className="grid flex-1 gap-1">
        <div className="bg-black-light/30 h-6 w-full rounded-full" />
        <div className="bg-black-light/30 h-4 w-full rounded-full" />
        <div className="bg-black-light/30 h-4 w-full rounded-full" />
        <div className="bg-black-light/30 h-4 w-full rounded-full" />
        <div className="bg-black-light/30 h-3 w-full rounded-full" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default OrderListCardSkeleton;

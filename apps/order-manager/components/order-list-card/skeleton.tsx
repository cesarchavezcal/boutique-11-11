export function OrderListCardSkeleton() {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-wrap gap-2 bg-white p-4 rounded-3xl"
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-3xl bg-black-light/30" />
      <div className="flex-1 grid gap-1">
        <div className="h-6 rounded-full bg-black-light/30 w-full" />
        <div className="h-4 rounded-full bg-black-light/30 w-full" />
        <div className="h-4 rounded-full bg-black-light/30 w-full" />
        <div className="h-4 rounded-full bg-black-light/30 w-full" />
        <div className="h-3 rounded-full bg-black-light/30 w-full" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default OrderListCardSkeleton;

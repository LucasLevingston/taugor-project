export function Loading() {
  return (
    <div className="flex-center size-full h-screen gap-3 text-white">
      <img
        alt="loader"
        className="animate-spin"
        height={3240}
        src="src/assets/svgs/loader.svg"
        width={40}
      />
    </div>
  )
}

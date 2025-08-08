export function Loading() {
  return (
    <div className="flex-center size-full h-4 w-4 gap-3 text-white">
      <img
        alt="loader"
        className="animate-spin"
        height={40}
        src="src/assets/svgs/loader.svg"
        width={40}
      />
    </div>
  )
}

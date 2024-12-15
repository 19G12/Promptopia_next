
const SkeletonLoader = () => {

    const loaderColor = "bg-gray-400";
  return (
    <div className="rounded-md pt-6 w-full flex justify-center items-center">
      <div className="animate-pulse flex flex-col w-3/4 p-4 skeletal-shadow">
        <div className={`rounded-full mx-4 ${loaderColor} h-14 w-14`}></div>
        <div className="flex mt-4 gap-y-4 flex-col justify-start items-start pl-4 w-full">
            <div className="flex flex-row justify-start items-center w-full gap-x-4">
                <div className={`w-[10%] h-2 rounded ${loaderColor}`}></div>
                <div className={`w-[20%] h-2 rounded ${loaderColor}`}></div>
            </div>
            <div className={`w-4/5 h-2 rounded ${loaderColor}`}></div>
            <div className={`w-4/5 h-2 rounded ${loaderColor}`}></div>
            <div className={`w-4/5 h-2 rounded ${loaderColor}`}></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonLoader
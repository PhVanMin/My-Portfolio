export default function Controls({
  width = 100,
  height = 30,
  slide,
  pOnclick,
  cOnClick,
  nOnclick,
  isPlaying,
}) {
  const ctrlWidth = width ? `${width}px` : "auto";
  const ctrlHeight = height ? `${height}px` : "auto";
  return (
    <div
      style={{
        width: ctrlWidth,
        height: ctrlHeight,
      }}
      className="p-2 flex justify-center items-center relative overflow-hidden">
      <div
        className={`left-0 flex justify-center items-center ease-out duration-300 ${
          !slide ? "absolute translate-x-[-100%]" : ""
        }`}>
        <div className="cursor-pointer hover:text-blue-400" onClick={pOnclick}>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
          </svg>
        </div>
        <div className="cursor-pointer hover:text-blue-400" onClick={cOnClick}>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            {isPlaying ? (
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            ) : (
              <path d="M4 3.25v13.5L16.75 10 4 3.25z" />
            )}
          </svg>
        </div>
        <div className="cursor-pointer hover:text-blue-400" onClick={nOnclick}>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
          </svg>
        </div>
      </div>
      <div
        className={`w-full content-center h-full text-center left-0 ease-out duration-300 ${
          slide ? "absolute translate-x-[100%]" : ""
        }`}>
        Music
      </div>
    </div>
  );
}

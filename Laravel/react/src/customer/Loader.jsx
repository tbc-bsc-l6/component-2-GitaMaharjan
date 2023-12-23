
import CircularColor from "../trial/CircularColor";


const Loader = ({ type }) => {
  const renderLoader = () => {
    return (
      <div className={getLoaderContainerClassName(type)}>
    {/* <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full height of the viewport
        backgroundColor: '#1E1E1E', // Set a background color for the body
      }}
    >
      <h1 className="mb-4 text-white">
        <CircularColor />
      </h1>
    </div> */}
        {type === 'four' && <CircularColor />}
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  const getLoaderContainerClassName = (type) => {
    switch (type) {
      case 'two':
        return 'absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] items-center block max-w-sm p-6 bg-transparent border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700';
      case 'three':
        return 'w-full h-[70vh] bg-white opacity-70 flex items-center justify-center';
      case 'four':
        return 'w-full h-screen bg-white opacity-70 flex items-center justify-center';
      default:
        return ''; // Handle other cases or provide a default class
    }
  };

  return renderLoader();
};

export default Loader;

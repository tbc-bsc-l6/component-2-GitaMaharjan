import { Link } from 'react-router-dom';

const DropdownItem = ({ label, to, imageSrc, topic }) => {
  return (
    <Link
      to={to}
      className="flex items-center text-body-color dark:text-dark-6 transition-all duration-300 hover:bg-black hover:text-primary block px-4 py-3 text-base max-w-[400px] mx-2"
      // Updated px-5 to px-4 and kept py-3 for added padding
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={label}
          className="w-8 h-8 rounded-full mr-4"
        />
      )}
      <div>
        <p className="font-semibold">{label}</p>
        {topic && <p className="text-sm text-gray-500">{topic}</p>}
      </div>
    </Link>
  );
};

export default DropdownItem;

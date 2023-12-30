import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ callSearchValue }) => {
  const [valueSearch, setValueSearch] = useState('');

  const handleChange = (e) => {
    setValueSearch(e.target.value);
    callSearchValue(e.target.value);
  };

  return (
    <div className="mb-3">
      <div className="relative mb-4 flex items-stretch">
        <div style={{width:'400px'}}>
      <input
        value={valueSearch}
        onChange={(e) => {
          handleChange(e);
        }}
        type="search"
        className="relative m-0 -mr-0.5 block w-full rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Search product"
        aria-label="Search"
        aria-describedby="button-addon1"
      />
      </div>

        <button
          className="text-[grey] relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          type="button"
          id="button-addon3"
          data-te-ripple-init
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;

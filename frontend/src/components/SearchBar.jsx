import React from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
    return (
        <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
            <img src="/assets/icon-search.svg" alt="Search" className="w-6 h-6 md:w-8 md:h-8" />
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onSearch(e.target.value)}
                className="bg-transparent border-none text-heading-m md:text-heading-l font-light text-white placeholder-opacity-50 focus:outline-none focus:border-b focus:border-greyishBlue w-full caret-red pb-4"
            />
        </div>
    );
};

export default SearchBar;

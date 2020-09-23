import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import './searchbox.scss';
import { FaSearch } from 'react-icons/fa';
import { filterStories, setSearchKeyword } from '../../redux/actions/storyActions';

const SearchBox = () => {

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');


    const handleChange = (e) => {
        setSearch(e.target.value);
        debouncedSearch(e.target.value);
    }

    const debouncedSearch = useCallback(
        debounce(nextValue => {
            dispatch(setSearchKeyword(nextValue));
            dispatch(filterStories(nextValue));
        }, 500),
        [],
    );

    return (
        <div className="search__box--wrapper">
            <div className="search__box">
                <input type="text" name="search" value={search} onChange={(e) => handleChange(e)} className="search__box--input" autoComplete="off" spellCheck="false" />
                <button className="search__box--btn">
                    <FaSearch size={25} color="white" />
                </button>
            </div>
        </div>
    )
}

export default SearchBox;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, changeFilter } from 'redux/contactsSlice';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilter = event => {
    dispatch(changeFilter(event.currentTarget.value));
  };
  return (
    <>
      <label>
        Find contacts by name
        <input type="text" value={filter} onChange={handleFilter} />
      </label>
    </>
  );
};

export default Filter;

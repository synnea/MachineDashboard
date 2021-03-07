import React, { useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

import './Search.css';

interface SearchProps {
  search: (searchContent: string) => void;
}

const Search = (props: SearchProps) => {
  const [enteredSearch, setEnteredSearch] = useState('');
  let inputEl = React.useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredSearch(e.target.value);

    const inputValue = (document.getElementById(
      'outlined-basic'
    ) as HTMLInputElement).value;
    props.search(inputValue);
  };

  return (
    <div className="search-container">
      <TextField
        id="outlined-basic"
        ref={inputEl}
        type="text"
        label="Search By ID"
        value={enteredSearch}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event)
        }
      />
    </div>
  );
};

export default Search;

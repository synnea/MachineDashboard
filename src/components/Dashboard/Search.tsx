import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  ChangeEvent,
} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Search.css';
import { errorAction } from '../../helpers/types';

const errorReducer = (
  curErrorState: { isError: boolean; errorMessage: string },
  action: errorAction
) => {
  switch (action.type) {
    case 'SET':
      return { isError: true, errorMessage: action.errorMessage };
    default:
      return curErrorState;
  }
};

const Search = () => {
  const [enteredSearch, setEnteredSearch] = useState('');
  const [isButtonDisabled, setButtonToEnabled] = useState(true);

  const [errorState, dispatchError] = useReducer(errorReducer, {
    isError: false,
    errorMessage: '',
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredSearch(e.target.value);
    if (enteredSearch.length > 4) {
      setButtonToEnabled(false);
    }
  };

  const onSubmitHandler = () => {
    const id = Number(enteredSearch);
    if (typeof Number !== 'number') {
      dispatchError({ type: 'SET', errorMessage: 'Only numbers, please!' });
    }
  };

  return (
    <div className="search-container">
      <TextField
        error={errorState.isError}
        id="outlined-basic"
        type="text"
        helperText={errorState.errorMessage}
        label="Enter ID (min 5 numbers)"
        value={enteredSearch}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChangeHandler(event)
        }
      />
      <Button
        className="search-button"
        disabled={isButtonDisabled}
        onClick={onSubmitHandler}
      >
        Search now
      </Button>
    </div>
  );
};

export default Search;

import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './Search.css';
import { errorAction } from '../../helpers/types';
import { isPropertySignature } from 'typescript';

interface SearchProps {
  search: (searchContent: string) => void;
  clearfilter: () => void;
  notFound: boolean;
}

const errorReducer = (
  curErrorState: { isError: boolean; errorMessage: string },
  action: errorAction
) => {
  switch (action.type) {
    case 'SET':
      return { isError: true, errorMessage: action.errorMessage };
    case 'CLEAR':
      return { isError: false, errorMessage: action.errorMessage };
    default:
      return curErrorState;
  }
};

const Search = (props: SearchProps) => {
  const [enteredSearch, setEnteredSearch] = useState('');
  const [isButtonDisabled, setButtonToEnabled] = useState(true);

  const [errorState, dispatchError] = useReducer(errorReducer, {
    isError: false,
    errorMessage: '',
  });

  useEffect(() => {
    console.log('notFound' + props.notFound);
    if (props.notFound) {
      dispatchError({
        type: 'SET',
        errorMessage: `Sorry, we couldn't find a match for that ID!`,
      });
    }
  }, [props.notFound]);

  useEffect(() => {
    console.log('Searchprops' + JSON.stringify(props.notFound));
  }, [props]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEnteredSearch(e.target.value);
    if (enteredSearch.length > 4) {
      setButtonToEnabled(false);
    }
    if (errorState.isError) {
      dispatchError({ type: 'CLEAR', errorMessage: '' });
    }
    if (props.notFound === false || props.notFound === true) {
      dispatchError({ type: 'CLEAR', errorMessage: '' });
      props.clearfilter();
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = () => {
    if (enteredSearch.length < 5) {
      return dispatchError({
        type: 'SET',
        errorMessage: 'Please add at least 5 digits!',
      });
    }
    const id = Number(enteredSearch);
    if (isNaN(id)) {
      return dispatchError({
        type: 'SET',
        errorMessage: 'Only numbers, please!',
      });
    } else {
      return props.search(enteredSearch);
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
        onKeyPress={onKeyPressHandler}
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

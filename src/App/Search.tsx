// libs
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

// ours
import SearchIcon from '../images/icons/search.svg';

const SearchBox = styled.form`
  display: flex;
  background: white;
  margin-top: 10px;
  border-radius: 20px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
`;

const Input = styled.input`
  display: inline-block;
  font-size: 14px;
  border: none;
  width: 100%;
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
  background: url(${SearchIcon}) no-repeat;
  display: inline-block;
  width: 20px;
  height: 20px;
`;

// typings for hooks
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type SearchProps = {
  fetchSongs: (searchKeyword?: string, levels?: number[]) => void;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

const Search: FunctionComponent<SearchProps> = ({ fetchSongs, searchKeyword, setSearchKeyword }) => {
  // in milliseconds, the magic number came from https://stackoverflow.com/a/44755058/3994190
  const waitForUserToStopTyping = 275;
  const handleInputChange = debounce((inputContent: string) => setSearchKeyword(inputContent), waitForUserToStopTyping);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSongs(searchKeyword);
  };

  return (
    <SearchBox onSubmit={handleSubmit}>
      <Input
        data-testid="SearchComponentInputBox"
        id="search"
        type="search"
        placeholder="Search for songs by artist or title"
        onChange={event => handleInputChange(event.target.value)}
      />
      <Button type="submit" data-testid="SearchSubmitButton" />
    </SearchBox>
  );
};

export default Search;

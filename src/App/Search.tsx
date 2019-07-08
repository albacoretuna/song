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
  fetchSongs: (searchKeyword?: string, start?: number, ) => void;
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
};

const Search: FunctionComponent<SearchProps> = ({ fetchSongs, searchKeyword, setSearchKeyword }) => {

  const handleInputChange = debounce((inputContent: string) => setSearchKeyword(inputContent), 800);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSongs(searchKeyword);
  };

  return (
    <SearchBox onSubmit={handleSubmit}>
      <Input
        id="search"
        type="search"
        placeholder="Search for songs by artist or title"
        onChange={event => handleInputChange(event.target.value)}
      />
      <Button type="submit" />
    </SearchBox>
  );
};

export default Search;

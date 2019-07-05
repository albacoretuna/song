// libs
import React, { FunctionComponent, Fragment } from 'react';
import styled from 'styled-components';

// ours
import SearchIcon from './images/icons/search.svg';

const SearchBox = styled.form`
  display: flex;
  background: white;
  margin-top: 10px;
  border: 2px solid grey;
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
  setSearchText: Dispatch<SetStateAction<string>>
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
}

const Search: FunctionComponent<SearchProps> = ({setSearchText}) => <Fragment>
      <SearchBox onSubmit={handleSubmit}>
        <Input
          id="search"
          type="search"
          placeholder="Search for songs by artist or title"
          onChange={event => setSearchText(event.target.value.toLowerCase())}
        />
        <Button type="submit"/>
       </SearchBox>
</Fragment>

export default Search;


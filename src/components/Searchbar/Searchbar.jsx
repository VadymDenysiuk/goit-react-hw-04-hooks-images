import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQuerySearch = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Введите что-то');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Label className="button-label">Search</Label>
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQuerySearch}
        />
      </Form>
    </Header>
  );
}

export default Searchbar;

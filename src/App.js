import './App.css';
import { useState } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import { Container } from './App.styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <Container>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} />
    </Container>
  );
}

export default App;

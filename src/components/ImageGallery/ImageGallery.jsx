import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadButton from '../Button';
import Modal from '../Modal';
import apiImages from '../../services/api';
import { List } from './ImageGallert.styled';
import { toast } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';

function ImageGallery({ query }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);
  const [error, setError] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setPage(1);

    setStatus('pending');

    try {
      apiImages(query, 1).then(query => {
        if (!query.hits.length) {
          setStatus('idle');
          toast.error('Данные по Вашему запросу отсутствуют :(');
        } else {
          setPage(1);
          setItems(query.hits);
          setStatus('resolved');
        }
      });
    } catch (error) {
      setError(error);
    }
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      try {
        apiImages(query, page).then(query => {
          setStatus('resolved');
          setItems(prevState => [...prevState, ...query.hits]);
        });
      } catch (error) {
        this.setState({ error });
      }
    }
  }, [page]);

  const incrementPage = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = url => {
    setShowModal(prevState => !prevState);
    setModalUrl(url);
  };
  const closeModal = () => {
    setShowModal(prevState => !prevState);
  };

  if (status === 'idle') {
    return null;
  }

  if (status === 'resolved') {
    return (
      <>
        <List className="gallery">
          {items.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                onClick={() => openModal(largeImageURL)}
              />
            );
          })}
        </List>
        <LoadButton onClick={incrementPage} />
        {showModal && (
          <Modal onClose={closeModal}>
            <img src={modalUrl} alt="" />
          </Modal>
        )}
      </>
    );
  }

  if (status === 'pending') {
    return <Oval type="Puff" color="#00BFFF" height={100} width={100} timeout={2500} />;
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string,
};

export default ImageGallery;

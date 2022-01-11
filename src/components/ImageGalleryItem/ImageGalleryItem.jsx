import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ smallImg, onClick }) {
  return (
    <Item>
      <Image src={smallImg} onClick={onClick} alt="" />
    </Item>
  );
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;

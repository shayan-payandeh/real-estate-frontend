import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { BiRightArrow } from 'react-icons/bi';

function CarouselComponent({ requestImages }) {
  const images = requestImages?.map((item) => ({
    original: item.src,
    thumbnail: item.src,
    // originalClass: style.original,
    // thumbnailClass: style.thumbnail,
  }));

  return (
    <>
      {requestImages && (
        <ImageGallery
          items={images}
          autoPlay
          isRTL={true}
          showPlayButton={false}
          showBullets={true}
          showIndex={true}
        />
      )}
    </>
  );
}

export default CarouselComponent;

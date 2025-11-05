import { useState } from 'react';
import './ImageGallery.css';

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    { id: 1, url: 'https://picsum.photos/300/200?random=1', title: 'Nature 1' },
    { id: 2, url: 'https://picsum.photos/300/200?random=2', title: 'Nature 2' },
    { id: 3, url: 'https://picsum.photos/300/200?random=3', title: 'Nature 3' },
    { id: 4, url: 'https://picsum.photos/300/200?random=4', title: 'Nature 4' },
  ];

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img
              src={image.url}
              alt={image.title}
              onClick={() => setSelectedImage(image)}
            />
            <p>{image.title}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage.url} alt={selectedImage.title} />
            <p>{selectedImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
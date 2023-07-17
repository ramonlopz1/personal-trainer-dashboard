import AliceCarousel from 'react-alice-carousel';
import React from 'react';

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
];

const HomePage: React.FC = () => {
  const expirationDate = '2023-06-01';

  return (
    <AliceCarousel mouseTracking items={items} />
  );
};

export default HomePage;

import ProductDeadline from '@/components/profile/organisms/CodeDeadLine';
import React from 'react';

const HomePage: React.FC = () => {
  const expirationDate = '2023-06-01';

  return (
    <div>
      <h1>Product Details</h1>
      <ProductDeadline startDate={expirationDate} />
    </div>
  );
};

export default HomePage;

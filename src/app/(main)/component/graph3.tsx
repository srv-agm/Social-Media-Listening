import React from 'react';
import { Bar } from 'react-chartjs-2';


interface ProductData {
  name: string; 
  totalMentions: any; 
  positiveMentions: any; 
  negativeMentions: any; 
  topIssue: string; 
}


interface ProductSpecificMentionsProps {
  productData: ProductData[]; 
}

const ProductSpecificMentions: React.FC<ProductSpecificMentionsProps> = ({ productData }) => {
  const barChartData = {
    labels: productData.map(product => product.name),
    datasets: [
      {
        label: 'Positive',
        data: productData.map(product => product.positiveMentions),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Negative',
        data: productData.map(product => product.negativeMentions),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="product-specific-mentions">
      <h2>Product-Specific Mentions</h2>
      <Bar data={barChartData} />
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Mentions</th>
            <th>Top Issue Highlight</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.totalMentions}</td>
              <td>{product.topIssue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecificMentions;

'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

export default function Products() {
  const [products, setProducts] = useState([]);
  console.log(products);
  console.log(products[0]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      let rjson = await response.json();
      setProducts(rjson.product);
    };
    fetchProducts();
  }, []);

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th isNumeric>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(({ _id, slug, quantity, price }) => (
            <Tr key={_id}>
              <Td>{slug}1</Td>
              <Td>{quantity}2</Td>
              <Td isNumeric>{price}3</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

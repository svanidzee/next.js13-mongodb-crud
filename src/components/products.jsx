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
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  Input,
} from '@chakra-ui/react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        '/api/product',
        // {
        // // cache: 'no-store',
        // next: {
        //   revalidate: 1,
        // },
        // }
      );
      let rjson = await response.json();
      setProducts(rjson.product);
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/product?id=${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log(1);
      } else {
        console.error('Error deleting product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    const response = await fetch('/api/product');
    let rjson = await response.json();
    setProducts(rjson.product);
  };

  return (
    <>
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
            {products?.map(({ _id, slug, quantity, price }) => (
              <Tr key={_id}>
                <Td>{slug}</Td>
                <Td>{quantity}</Td>
                <Td isNumeric>{price}</Td>
                <Td>
                  <button
                    onClick={() => {
                      deleteProduct(_id);
                    }}>
                    DELETE
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

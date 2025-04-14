import { useEffect } from 'react';
import { Box, Heading, Text, Image, Spinner } from '@chakra-ui/react';
import Stars from '../Stars/Stars';
import { useProductStore } from '@/store/useProductStore';

export default function ProductDetails({ id }: { id: number }) {
  const { products, fetchProducts, initialized } = useProductStore();

  useEffect(() => {
    if (!initialized) {
      fetchProducts();
    }
  }, [initialized, fetchProducts]);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Box mt='20px'>
        <Spinner />
        <Text mt='10px'>Загрузка информации о продукте...</Text>
      </Box>
    );
  }

  return (
    <div>
      <Heading fontWeight='bold'>{product.title}</Heading>
      <Box display='flex' flexDirection='row' gap='20px' mt='10px'>
        <Box maxWidth='400px' width='100%'>
          <Image src={product.image} alt={product.title} />
        </Box>
        <Box display='flex' flexDirection='column' mt='40px'>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Цена:</span> {product.price} $
          </Text>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Описание:</span>{' '}
            {product.description}
          </Text>
          {product.rating?.rate && <Stars product={product} />}
        </Box>
      </Box>
    </div>
  );
}

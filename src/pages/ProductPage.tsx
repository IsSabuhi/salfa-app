import Stars from '@/components/Stars/Stars';
import { useProductStore } from '@/store/useProductStore';
import { Box, Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import styles from '@/styles/pages/ProductPage.module.scss';

const ProductPage = () => {
  const { id } = useParams();
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
    <div className={styles.container}>
      <Heading className={styles.title}>{product.title}</Heading>
      <div className={styles.main}>
        <div className={styles.image_block}>
          <Image src={product.image} alt={product.title} />
        </div>
        <div className={styles.content}>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Цена:</span> {product.price} $
          </Text>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Описание:</span>{' '}
            {product.description}
          </Text>
          {product.rating?.rate && <Stars product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

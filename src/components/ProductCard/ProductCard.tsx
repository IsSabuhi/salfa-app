import React from 'react';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import styles from './ProductCard.module.scss';
import { Button, Image, Text } from '@chakra-ui/react';
import Stars from '../Stars/Stars';
import { ProductType } from '../../types/ProductType';
import { useFilterStore } from '../../store/useFilterStore';
import { Link } from 'react-router';

const ProductCard = ({
  product,
  onRemove,
}: {
  product: ProductType;
  onRemove: (id: number) => void;
}) => {
  const { toggleFavorite, favorites } = useFilterStore();
  const isFavorite = favorites.includes(product.id);

  if (!product.id) {
    return <div>Нет товаров</div>;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
    }
  };

  const noRatings = product.rating.rate && product.rating.count;

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={(e: React.MouseEvent) => handleCardClick(e)}
      className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <Image
          src={product.image}
          className={styles.productImage}
          alt={product.title}
          fit='contain'
        />
        <div className={styles.btn_block}>
          <Button
            className={`${styles.favoriteButton} ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(product.id)}
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </Button>

          {onRemove && product.id && (
            <Button
              className={styles.deleteButton}
              onClick={() => onRemove(product.id!)}
              aria-label='Delete product'>
              <FaTrash />
            </Button>
          )}
        </div>
      </div>

      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>{product.title}</h3>
        {noRatings == 0 ? (
          <Text className={styles.text_rate}>Нет отзывов</Text>
        ) : (
          <Stars product={product} />
        )}

        <p className={styles.productDescription}>
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>

        {/* 
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>
            ${product.price.toFixed(2)}
          </span>
        </div> */}
      </div>
    </Link>
  );
};

export default ProductCard;

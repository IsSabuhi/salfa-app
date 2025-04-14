import styles from './Stars.module.scss';
import { ProductType } from '@/types/ProductType';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const RenderRatingStars = (rate: number) => {
  const stars = [];
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className={styles.star} />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className={styles.star} />);
    } else {
      stars.push(
        <FaStar key={i} className={`${styles.star} ${styles.emptyStar}`} />
      );
    }
  }

  return stars;
};

const Stars = ({ product }: { product: ProductType }) => {
  return (
    <div className={styles.stars}>
      {RenderRatingStars(product?.rating?.rate)}
      <span className={styles.ratingValue}>
        {product.rating.rate.toFixed(1)}
      </span>
    </div>
  );
};

export default Stars;

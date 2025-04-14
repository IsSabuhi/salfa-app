import { useEffect, useState } from 'react';
import { Button, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from 'react-icons/lu';
import { toast } from 'react-toastify';
import { useProductStore } from '@/store/useProductStore';
import { useFilterStore } from '@/store/useFilterStore';
import { useSearchStore } from '@/store/useSearchStore';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from '@/styles/pages/HomePage.module.scss';

const HomePage = () => {
  const { products, removeProduct, fetchProducts } = useProductStore();
  const { filter, favorites } = useFilterStore();
  const { searchTerm } = useSearchStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  const searchFilteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts =
    filter === 'favorites'
      ? searchFilteredProducts.filter((product) =>
          favorites.includes(product.id)
        )
      : searchFilteredProducts;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handleRemove = async (productId: number) => {
    try {
      await removeProduct(productId);
      toast.success('Товар удален');

      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error('Ошибка при удалении товара');
      console.error(error);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await fetchProducts();
      } catch (error) {
        toast.error('Ошибка загрузки товаров');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  if (isLoading) {
    return (
      <Center h='70vh'>
        <Spinner size='xl' color='blue.500' />
        <Text ml={4}>Загрузка товаров...</Text>
      </Center>
    );
  }

  console.log(products);

  return (
    <div>
      <div className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <Center w='100%' h='60vh'>
            <Text fontSize='xl' color='gray.500'>
              Товары не найдены по вашему запросу.
            </Text>
          </Center>
        ) : (
          currentItems.map((item) => (
            <ProductCard key={item.id} product={item} onRemove={handleRemove} />
          ))
        )}
      </div>

      {filteredProducts.length > itemsPerPage && (
        <Flex
          justifyContent='center'
          alignItems='center'
          gap={2}
          flexWrap='wrap'>
          <Button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            size='sm'
            variant='outline'
            aria-label='First page'>
            <LuChevronsLeft />
          </Button>

          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            size='sm'
            variant='outline'
            aria-label='Previous page'>
            <LuChevronLeft />
          </Button>

          {startPage > 1 && (
            <>
              <Button size='sm' variant='ghost' onClick={() => paginate(1)}>
                1
              </Button>
              {startPage > 2 && <Text>...</Text>}
            </>
          )}

          {pageNumbers.map((number) => (
            <Button
              key={number}
              size='sm'
              variant={currentPage === number ? 'solid' : 'outline'}
              colorScheme={currentPage === number ? 'blue' : undefined}
              onClick={() => paginate(number)}>
              {number}
            </Button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <Text>...</Text>}
              <Button
                size='sm'
                variant='ghost'
                onClick={() => paginate(totalPages)}>
                {totalPages}
              </Button>
            </>
          )}

          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            size='sm'
            variant='outline'
            aria-label='Next page'>
            <LuChevronRight />
          </Button>

          <Button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            size='sm'
            variant='outline'
            aria-label='Last page'>
            <LuChevronsRight />
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default HomePage;

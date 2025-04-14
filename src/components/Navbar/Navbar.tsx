import { Box, Button, Input, Menu, Portal, Text } from '@chakra-ui/react';
import styles from './Navbar.module.scss';
import { FiFilter, FiHeart, FiList } from 'react-icons/fi';
import { useSearchStore } from '../../store/useSearchStore';
import { useFilterStore } from '../../store/useFilterStore';
import { Link } from 'react-router';
import { NAVBAR_LINKS } from '../../configs/navbarLinks';

const Navbar = () => {
  const { filter, setFilter } = useFilterStore();

  const { searchTerm, setSearchTerm } = useSearchStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Text>SAlfa-app</Text>
      </div>

      <div className={styles.navbar_links}>
        <ul className={styles.navbar_ul}>
          {NAVBAR_LINKS.map((item, index) => {
            return (
              <Link to={item.link} className={styles.navbar_li} key={index}>
                {item.title}
              </Link>
            );
          })}
        </ul>
      </div>

      <div className={styles.navbar_filter}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box display='flex' alignItems='center' gap='10px'>
              <FiFilter />
              <Button variant='plain' _hover={{ color: '#40bfc1' }}>
                Фильтры
              </Button>
            </Box>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.RadioItemGroup
                  value={filter}
                  onValueChange={(e) =>
                    setFilter(e.value as 'all' | 'favorites')
                  }
                  style={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}>
                  <Menu.RadioItem value='all'>
                    <FiList />
                    Все товары
                  </Menu.RadioItem>
                  <Menu.RadioItem value='favorites'>
                    <FiHeart />
                    Избранные товары
                  </Menu.RadioItem>
                </Menu.RadioItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <div className={styles.search}>
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Поиск товаров...'
            size='sm'
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

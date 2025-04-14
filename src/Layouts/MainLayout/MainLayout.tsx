import styles from './MainLayout.module.scss';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

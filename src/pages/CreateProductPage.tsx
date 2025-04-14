import { Heading, Input, Text, Button, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useProductStore } from '@/store/useProductStore';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import styles from '@/styles/pages/CreateProductPage.module.scss';

const CreateProductPage = () => {
  const addProduct = useProductStore((state) => state.addProduct);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      description: '',
      image: '',
      rating: { rate: 0, count: 0 },
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        addProduct(values);
        toast.success('Товар создан');
        resetForm();
      } catch (error) {
        console.error('Ошибка при создании товара:', error);
        toast.error('Ошибка при создании товара');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className={styles.container}>
      <Heading w='100%' textAlign={'center'} fontWeight='normal' mb={4}>
        Создание товара
      </Heading>

      <form onSubmit={formik.handleSubmit} className={styles.product_form}>
        <div>
          <Text>Название товара</Text>
          <Input
            id='title'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder='Введите название'
            required
          />
        </div>

        <div>
          <Text>Цена ($)</Text>
          <Input
            id='price'
            name='price'
            value={formik.values.price}
            onChange={formik.handleChange}
            type='number'
            required
          />
        </div>

        <div>
          <Text>Описание</Text>
          <Textarea
            id='description'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Подробное описание товара'
            rows={4}
          />
        </div>

        <div>
          <Text>Ссылка на изображение</Text>
          <Input
            id='image'
            name='image'
            value={formik.values.image}
            onChange={formik.handleChange}
            placeholder='https://example.com/image.jpg'
          />
          {formik.values.image && (
            <div className={styles.preview_img}>
              <img
                src={formik.values.image}
                alt='Preview'
                className={styles.imagePreview}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                width='100%'
                height='100%'
              />
            </div>
          )}
        </div>

        <Button
          type='submit'
          loading={formik.isSubmitting}
          loadingText='Создание...'
          width='full'
          className={styles.form_button}>
          Создать товар
        </Button>
      </form>
      <ToastContainer
        position='bottom-left'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
    </div>
  );
};

export default CreateProductPage;

import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getElectronicsProducts } from '../../features/products/productSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';

const ElectronicsProducts = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const { electronics, isLoading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getElectronicsProducts({
        page: 1,
        limit: 20,
        search: '',
        category: 'Electronics',
        minPrice: '',
        maxPrice: '',
        sortBy: '',
        sortOrder: '',
      })
    );
  }, [dispatch]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Electronics</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-full shadow-sm transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-full shadow-sm transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-600">Loading electronics products...</p>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center py-12">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      )}

      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 20 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="px-2"
      >
        {electronics?.map((product) => (
          <SwiperSlide key={product?._id} className="py-2">
            <ProductCard
             id={product?._id}
              title={product.name}
              image={product?.images[0]?.url}
              price={product?.price}
              category={product.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ElectronicsProducts;
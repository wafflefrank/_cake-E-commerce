import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export function useSimpleSwiper() {
  const swiperModules = [Navigation, Pagination, Autoplay]

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true
    },
    navigation: true,
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  }

  return {
    SwiperComponent,
    SwiperSlide,
    swiperModules,
    swiperOptions
  }
}

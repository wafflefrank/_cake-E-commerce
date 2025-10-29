import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {
  // 商品資料
  const products = ref([
    {
      id: 1,
      name: '伯爵巧克力夾餡',
      nameEn: 'Earl Grey Chocolate Sandwich',
      price: 350,
      image: '/src/assets/images/earl grey.jpg',
      description: '濃郁的伯爵茶香搭配絲滑巧克力，每一口都是驚喜',
      category: '夾餡餅乾',
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: '壓模餅乾',
      nameEn: 'Compression Molded Biscuits',
      price: 280,
      image: '/src/assets/images/handmade.jpg',
      description: '精緻造型的壓模餅乾，口感酥脆香濃',
      category: '造型餅乾',
      inStock: true,
      featured: true
    },
    {
      id: 3,
      name: '香辣起司條',
      nameEn: 'Spicy Cheese Stick',
      price: 320,
      image: '/src/assets/images/cheese.JPG',
      description: '微辣起司條，涮嘴好滋味，看劇必備',
      category: '鹹味餅乾',
      inStock: true,
      featured: true
    },
    {
      id: 4,
      name: '雪球餅乾',
      nameEn: 'Snow Ball',
      price: 300,
      image: '/src/assets/images/snowball2.jpg',
      description: '經典雪球餅乾，外層糖粉如雪花般美麗',
      category: '經典餅乾',
      inStock: true,
      featured: false
    }
  ])

  // 禮盒商品
  const giftBoxes = ref([
    {
      id: 101,
      name: '精緻禮袋',
      nameEn: 'Elegant Gift Bag',
      price: 200,
      image: '/src/assets/images/rectangel/littelbag.JPG',
      description: '一人一包獨享剛剛好',
      category: '禮盒',
      inStock: true
    },
    {
      id: 102,
      name: '紙盒禮盒',
      nameEn: 'Paper Gift Box',
      price: 400,
      image: '/src/assets/images/rectangel/woodbox.jpg',
      description: '三五好友聊天的好選擇',
      category: '禮盒',
      inStock: true
    },
    {
      id: 103,
      name: '鐵盒禮盒',
      nameEn: 'Metal Gift Box',
      price: 600,
      image: '/src/assets/images/rectangel/大鐵盒正方形.jpg',
      description: '送禮最佳質感挑這盒',
      category: '禮盒',
      inStock: true
    }
  ])

  // 客戶回饋
  const testimonials = ref([
    {
      id: 1,
      name: '客戶A',
      content:
        '伯爵夾心餅乾很喜歡，一吃下去中間的伯爵巧克力餡撲鼻而來，栗子造型餅乾也很可愛，大推這款！',
      rating: 5
    },
    {
      id: 2,
      name: '客戶B',
      content:
        '謝謝老闆娘幫我趕訂單，在活動之前公司需要餅乾點心，但是比較趕著要，數量比較多老闆娘還是幫我趕出來（跪。',
      rating: 5
    },
    {
      id: 3,
      name: '客戶C',
      content:
        '賣家很親切，餅乾很好吃～辣起司條很涮嘴，我跟男友邊看netflix吃就把一包吃完了哈哈哈。',
      rating: 5
    }
  ])

  // 計算屬性
  const featuredProducts = computed(() => products.value.filter((product) => product.featured))

  const allProducts = computed(() => [...products.value, ...giftBoxes.value])

  // 方法
  const getProductById = (id) => {
    return allProducts.value.find((product) => product.id === id)
  }

  const getProductsByCategory = (category) => {
    return products.value.filter((product) => product.category === category)
  }

  return {
    products,
    giftBoxes,
    testimonials,
    featuredProducts,
    allProducts,
    getProductById,
    getProductsByCategory
  }
})

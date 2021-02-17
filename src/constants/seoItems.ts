export const DEFAULT_DESCRIPTION = {
  ru:
    'Роскошные женские платья, дизайнерские женские пиджаки, красивые блузы, стильные женские брюки. Вся одежда Blind высокого качества.',
  en:
    "Luxurious women's dresses, designer women's blazers, beautiful blouses, stylish women's pants. All Blind clothes are of high quality.",
};

export const SEO_ITEMS = {
  ru: {
    cartPage: {
      title: 'Корзина',
      description: 'Корзина',
      breadcrumbName: 'Корзина',
      link: '/cart',
    },
    checkoutPage: {
      title: 'Оформление заказа',
      description: 'Оформление заказа',
      breadcrumbName: 'Оформление заказа',
      link: '/checkout',
    },
    indexPage: {
      title: 'Женская одежда BLIND fashion atelier',
      description: DEFAULT_DESCRIPTION.ru,
      breadcrumbName: 'Главная',
      link: '/',
    },
    salesPage: {
      title: 'Скидки',
      description: DEFAULT_DESCRIPTION.ru,
      breadcrumbName: 'Скидки',
      link: '/sales',
    },
  },
  en: {
    cartPage: {
      title: 'Cart',
      description: 'Cart',
      breadcrumbName: 'Cart',
      link: '/en/cart',
    },
    checkoutPage: {
      title: 'Checkout',
      description: 'Checkout',
      breadcrumbName: 'Checkout',
      link: '/en/checkout',
    },
    indexPage: {
      title: "Women's clothing BLIND fashion atelier",
      description: DEFAULT_DESCRIPTION.en,
      breadcrumbName: 'Main Page',
      link: '/en',
    },
    salesPage: {
      title: 'Stocks',
      description: DEFAULT_DESCRIPTION.en,
      breadcrumbName: 'Stocks',
      link: '/en/sales',
    },
  },
};

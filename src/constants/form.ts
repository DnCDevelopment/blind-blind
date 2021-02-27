import * as Yup from 'yup';
import { TRANSLATE } from './languages';

export const FORM = {
  ru: {
    cm: 'см',
    tooSmall: 'cлишком малое значение',
    tooLarge: 'cлишком большое значение',
    required: 'обязательное поле',
    wrongInput: 'неверное значение',
    lettersRequired: 'некорректный ввод',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Почта',
    phone: 'Телефон',
    country: 'Страна',
    city: 'Город',
    paymentMethod: 'Способ оплаты',
    paymentOnline: 'Оплата онлайн',
    paymentManager: 'Оплата через менеджера',
    receiverName: 'Имя получателя',
    receiverEmail: 'Почта получателя',
    yourName: 'Ваше имя',
    yourEmail: 'Ваша почта',
    giftTheme: 'Тема подарочного сертификата',
    giftThemes: ['День рождения', 'Общий', 'Рождество'],
    giftMessage: 'Сообщение (необязательно)',
    giftAmount: 'Сумма (от 1 грн до 1000 грн)',
  },
  en: {
    cm: 'cm',
    tooSmall: 'too small value',
    tooLarge: 'too large value',
    required: 'required',
    wrongInput: 'wrong input',
    lettersRequired: 'letters required',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    country: 'Country',
    city: 'City',
    paymentMethod: 'Payment method',
    paymentOnline: 'Online payment',
    paymentManager: 'Payment with manager',
    receiverName: 'Receiver name',
    receiverEmail: 'Receiver email',
    yourName: 'Your name',
    yourEmail: 'Your email',
    giftTheme: 'Gift certificate theme',
    giftThemes: ['Birthday', 'General', 'Christmas'],
    giftMessage: 'Message (optional)',
    giftAmount: 'Amount (between 1 UAH and 1000 UAH)',
  },
};

export const FORMIK = {
  shippingDiscount: {
    values: {
      code: '',
    },
  },
  shippingMain: {
    values: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      paymentMethod: '',
      checkbox: false,
    },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        firstName: Yup.string()
          .matches(/^[a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .required(FORM[locale].required),
        lastName: Yup.string()
          .matches(/^[a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .required(FORM[locale].required),
        email: Yup.string()
          .email(FORM[locale].wrongInput)
          .required(FORM[locale].required),
        phone: Yup.number()
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
        country: Yup.string().required(FORM[locale].required),
        city: Yup.string().required(FORM[locale].required),
        paymentMethod: Yup.string().required(FORM[locale].required),
      }),
    types: {
      firstName: 'text',
      lastName: 'text',
      email: 'text',
      phone: 'text',
      country: 'text',
      city: 'text',
      paymentMethod: 'select',
      checkbox: 'checkbox',
    },
    selectOptions: (locale: 'ru' | 'en') => ({
      paymentMethod: [FORM[locale].paymentOnline, FORM[locale].paymentManager],
    }),
    placeholders: (locale: 'ru' | 'en') => ({
      firstName: FORM[locale].firstName,
      lastName: FORM[locale].lastName,
      email: FORM[locale].email,
      phone: FORM[locale].phone,
      country: FORM[locale].country,
      city: FORM[locale].city,
      paymentMethod: FORM[locale].paymentMethod,
    }),
  },
  goodsExclusive: {
    values: {
      growth: '',
      bust: '',
      waist: '',
      hips: '',
    },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        growth: Yup.number()
          .min(100, FORM[locale].tooSmall)
          .max(300, FORM[locale].tooLarge)
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
        bust: Yup.number()
          .min(20, FORM[locale].tooSmall)
          .max(200, FORM[locale].tooLarge)
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
        waist: Yup.number()
          .min(20, FORM[locale].tooSmall)
          .max(200, FORM[locale].tooLarge)
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
        hips: Yup.number()
          .min(20, FORM[locale].tooSmall)
          .max(200, FORM[locale].tooLarge)
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
      }),
    types: {
      growth: 'text',
      bust: 'text',
      waist: 'text',
      hips: 'text',
    },
    suffixes: (locale: 'ru' | 'en') => ({
      growth: TRANSLATE[locale].cm,
      bust: TRANSLATE[locale].cm,
      waist: TRANSLATE[locale].cm,
      hips: TRANSLATE[locale].cm,
    }),
    placeholders: (locale: 'ru' | 'en') => ({
      growth: TRANSLATE[locale].growth,
      bust: TRANSLATE[locale].bustVolume,
      waist: TRANSLATE[locale].waistVolume,
      hips: TRANSLATE[locale].hipsVolume,
    }),
  },
  footerForm: {
    values: { phone: '' },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        phone: Yup.number().typeError(FORM[locale].wrongInput),
      }),
    types: { phone: 'text' },
    placeholders: (locale: 'ru' | 'en') => ({
      phone: FORM[locale].phone,
    }),
  },
  voucher: {
    values: {
      receiverName: '',
      receiverEmail: '',
      yourName: '',
      yourEmail: '',
      theme: '',
      message: '',
      price: '',
    },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        receiverName: Yup.string()
          .matches(/^[ a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .typeError(FORM[locale].wrongInput)
          .required(FORM[locale].required),
        receiverEmail: Yup.string().email().required(FORM[locale].required),
        yourName: Yup.string()
          .matches(/^[ a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .typeError(FORM[locale].wrongInput)
          .required(FORM[locale].required),
        yourEmail: Yup.string().email().required(FORM[locale].required),
        price: Yup.number()
          .min(1, FORM[locale].tooSmall)
          .max(1000, FORM[locale].tooLarge)
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
        theme: Yup.string().required(FORM[locale].required),
      }),
    types: {
      receiverName: 'text',
      receiverEmail: 'text',
      yourName: 'text',
      yourEmail: 'text',
      theme: 'select',
      message: 'textArea',
      price: 'text',
    },
    selectOptions: (locale: 'ru' | 'en') => ({
      theme: FORM[locale].giftThemes,
    }),
    suffixes: {
      price: 'UAH',
    },
    placeholders: (locale: 'ru' | 'en') => ({
      receiverName: FORM[locale].receiverName,
      receiverEmail: FORM[locale].receiverEmail,
      yourName: FORM[locale].yourName,
      yourEmail: FORM[locale].yourEmail,
      theme: FORM[locale].giftTheme,
      message: FORM[locale].giftMessage,
      price: FORM[locale].giftAmount,
    }),
  },
};

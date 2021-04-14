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
    phone: '+380000000',
    country: 'Страна',
    city: 'Город',
    paymentMethod: 'Способ оплаты',
    paymentOnline: 'Оплата онлайн',
    paymentManager: 'Оплата через менеджера',
    receiverName: 'Имя получателя',
    receiverEmail: 'Почта получателя',
    yourName: 'Ваше имя',
    yourEmail: 'Ваша почта',
    giftMessage: 'Сообщение (необязательно)',
    giftAmount: 'Введите любую сумму сертификата',
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
    phone: '+380000000',
    country: 'Country',
    city: 'City',
    paymentMethod: 'Payment method',
    paymentOnline: 'Online payment',
    paymentManager: 'Payment with manager',
    receiverName: 'Receiver name',
    receiverEmail: 'Receiver email',
    yourName: 'Your name',
    yourEmail: 'Your email',
    giftMessage: 'Message (optional)',
    giftAmount: 'Enter any amount of the certificate',
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
      phone: 'phone',
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
        phone: Yup.string()
          .min(10, FORM[locale].wrongInput)
          .typeError(FORM[locale].wrongInput),
      }),
    types: { phone: 'phone' },
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
          .required(FORM[locale].required)
          .typeError(FORM[locale].wrongInput),
      }),
    types: {
      receiverName: 'text',
      receiverEmail: 'text',
      yourName: 'text',
      yourEmail: 'text',
      message: 'textArea',
      price: 'text',
    },
    suffixes: {
      price: 'UAH',
    },
    placeholders: (locale: 'ru' | 'en') => ({
      receiverName: FORM[locale].receiverName,
      receiverEmail: FORM[locale].receiverEmail,
      yourName: FORM[locale].yourName,
      yourEmail: FORM[locale].yourEmail,
      message: FORM[locale].giftMessage,
      price: FORM[locale].giftAmount,
    }),
  },
};

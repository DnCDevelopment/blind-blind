import * as Yup from 'yup';
import {} from 'yup/lib/Condition';
import { TRANSLATE } from './languages';

export const FORM = {
  ru: {
    cm: 'см',
    tooSmall: 'занадто мале значення',
    tooLarge: 'занадто велике значення',
    required: "обов'язкове поле",
    wrongInput: 'неправильне значення',
    lettersRequired: 'некоректне введення',
    firstName: "Ім'я",
    lastName: 'Прізвище',
    email: 'Електронна пошта',
    phone: '000000000',
    country: 'Країна',
    city: 'Місто',
    street: 'Вулиця',
    house: 'Дім',
    flat: 'Квартира',
    paymentMethod: 'Спосіб оплати',
    paymentOnline: 'Оплата онлайн',
    paymentManager: 'Оплата через менеджера',
    novaPoshta: '"Нова Пошта" (по Україні)',
    ukrPoshta: '"Укр Пошта" (за кордон)',
    courierNovaPoshta: 'Кур\'єром "Нова Пошта"',
    delivery: 'Доставка',
    receiverName: "Ім'я одержувача",
    receiverEmail: 'Пошта одержувача',
    yourName: "Ваше ім'я",
    yourEmail: 'Ваша пошта',
    giftMessage: "Повідомлення (необов 'язково)",
    giftAmount: 'Введіть будь-яку суму сертифіката',
    warehouse: 'Відділення',
    dob: 'Дата народження',
    russia: 'Вибачте, ми не доставляємо наші товари в Росію',
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
    phone: '000000000',
    country: 'Country',
    city: 'City',
    street: 'Street',
    house: 'House',
    flat: 'Flat',
    paymentMethod: 'Payment method',
    paymentOnline: 'Online payment',
    delivery: 'Delivery',
    paymentManager: 'Payment with manager',
    novaPoshta: '"Nova Poshta"(in Ukraine)',
    ukrPoshta: '"Urk Poshta"(abroad)',
    courierNovaPoshta: 'Courier "Nova Poshta"',
    receiverName: 'Receiver name',
    receiverEmail: 'Receiver email',
    yourName: 'Your name',
    yourEmail: 'Your email',
    giftMessage: 'Message (optional)',
    giftAmount: 'Enter any amount of the certificate',
    warehouse: 'Warehouse',
    dob: 'Date of birth',
    russia: "Sorry, we don't deliver our goods to Russia",
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
      deliveryMethod: '',
      warehouse: '',
      street: '',
      house: '',
      flat: '',
      checkbox: false,
    },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        firstName: Yup.string()
          .matches(/^[ a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .required(FORM[locale].required),
        lastName: Yup.string()
          .matches(/^[ a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .required(FORM[locale].required),
        email: Yup.string()
          .email(FORM[locale].wrongInput)
          .required(FORM[locale].required),
        phone: Yup.string()
          .required(FORM[locale].required)
          .min(11, FORM[locale].wrongInput)
          .max(15, FORM[locale].wrongInput)
          .typeError(FORM[locale].wrongInput),
        country: Yup.string()
          .matches(
            /^(?!russia|россия|рф|rf|российская\sфедерация).*$/giu,
            FORM[locale].russia
          )
          .required(FORM[locale].required),
        city: Yup.string().required(FORM[locale].required),
        paymentMethod: Yup.string().required(FORM[locale].required),
        deliveryMethod: Yup.string().required(FORM[locale].required),
        warehouse: Yup.string().when('deliveryMethod', {
          is: FORM[locale].novaPoshta,
          then: Yup.string().required(FORM[locale].required),
        }),
        street: Yup.string().when('deliveryMethod', {
          is: FORM[locale].courierNovaPoshta,
          then: Yup.string().required(FORM[locale].required),
        }),
        house: Yup.string().when('deliveryMethod', {
          is: FORM[locale].courierNovaPoshta,
          then: Yup.string().required(FORM[locale].required),
        }),
        flat: Yup.string(),
      }),
    types: {
      firstName: 'text',
      lastName: 'text',
      email: 'text',
      phone: 'phone',
      country: 'text',
      city: 'text',
      paymentMethod: 'select',
      deliveryMethod: 'delivery',
      warehouse: 'warehouse',
      street: 'text',
      house: 'text',
      flat: 'text',
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
      street: FORM[locale].street,
      house: FORM[locale].house,
      flat: FORM[locale].flat,
      paymentMethod: FORM[locale].paymentMethod,
      deliveryMethod: FORM[locale].delivery,
      warehouse: FORM[locale].warehouse,
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
          .min(11, FORM[locale].wrongInput)
          .max(15, FORM[locale].wrongInput)
          .typeError(FORM[locale].wrongInput),
      }),
    types: { phone: 'phone' },
    placeholders: (locale: 'ru' | 'en') => ({
      phone: FORM[locale].phone,
    }),
  },
  modalStartForm: {
    values: {
      firstName: '',
      email: '',
      phone: '',
      dob: '',
    },
    validationSchema: (locale: 'ru' | 'en') =>
      Yup.object({
        firstName: Yup.string()
          .matches(/^[ a-zA-Zа-яА-Я]+$/, FORM[locale].lettersRequired)
          .typeError(FORM[locale].wrongInput)
          .required(FORM[locale].required),
        email: Yup.string().email().required(FORM[locale].required),
        phone: Yup.string()
          .required(FORM[locale].required)
          .min(11, FORM[locale].wrongInput)
          .max(15, FORM[locale].wrongInput)
          .typeError(FORM[locale].wrongInput),
        dob: Yup.string().required(FORM[locale].required),
      }),
    types: { firstName: 'text', email: 'text', phone: 'phone', dob: 'text' },
    placeholders: (locale: 'ru' | 'en') => ({
      firstName: FORM[locale].firstName,
      email: FORM[locale].email,
      phone: FORM[locale].phone,
      dob: FORM[locale].dob,
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

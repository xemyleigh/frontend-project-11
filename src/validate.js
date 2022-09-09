import { object, string, setLocale } from 'yup';
import i18next from 'i18next';

const validate = (url, state) => {
  setLocale({
    mixed: {
      notOneOf: i18next.t('errors.alreadyAdded'),
    },
    string: {
      matches: i18next.t('errors.notValid'),
    },
  });

  const schema = object({
    url: string()
      .notOneOf(state.formInfo.addedUrls)
      .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/),
  });
  return schema.validate({ url });
};

export default validate;

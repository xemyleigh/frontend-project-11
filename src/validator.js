import {object, string} from 'yup';
import watchState from './view.js';
import { setLocale } from 'yup';
import i18next from 'i18next';
import ru from './texts.js';

export default () => {

    const i18nInstance = i18next.createInstance();
    i18nInstance.init({lng: 'ru', debug: true, resources: { ru }})

    const state = {
        form: {
            url: '',
            urlValid: '',
        },
        formInfo: {
            addedUrls: [],
            status: ''    
        }
    }

    const errorBox = document.querySelector('.feedback')
    const submit = document.querySelector('[type="submit"]')
    const input = document.querySelector('input')
    const form = document.querySelector('form')
    
    const watchedStateForm = watchState(state, errorBox)    

    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const url = input.value
        state.url = url

        setLocale({
            mixed: {
                notOneOf: i18nInstance.t('errors.alreadyAdded'),
            },
            string: {
                matches: i18nInstance.t('errors.notValid'),
            }
        })
    
        const schema = object({
            url: string()
                .notOneOf(state.formInfo.addedUrls)
                .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
        })
    
        schema.validate({url})
            .then(data => {
                state.formInfo.addedUrls.push(url)
                state.formInfo.status = i18nInstance.t('successfullyAdded')
                watchedStateForm.urlValid = true
            })
            .catch(e => {
                state.formInfo.status = e.errors
                watchedStateForm.urlValid = false
            })

        state.form.urlValid = ''

        input.focus()
        form.reset()
    })
}
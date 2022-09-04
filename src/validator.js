import {object, string} from 'yup';
import watchedState from './watchedState.js';
import { setLocale } from 'yup';
import i18next from 'i18next';
import ru from './texts.js';




export default () => {
    console.log({
        resuorces: ru
    })
    const i18nInstance = i18next.createInstance();
    i18nInstance.init({lng: 'ru', debug: true, resources: {ru}})

    let errors = []
    const addedUrls = []
    let startIndex = -1

    const state = watchedState
    const submit = document.querySelector('[type="submit"]')
    const input = document.querySelector('input')
    input.focus()

    submit.addEventListener('click', (e) => {
        e.preventDefault()
        const url = input.value
        state.url = url
        state.status = 'send'
        console.log(addedUrls)

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
                .notOneOf(addedUrls)
                .matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
        })
    
        const promise = schema.validate({url})
            .catch(e => {
                errors.push(e.name)
                console.log(errors)
                console.log(e.errors)
            })
            .then(data => {
                console.log(23423423423424)
                if (errors.includes('ValidationError')) {
                    state.valid = false
                    errors = []
                } else {
                    state.valid = true
                }
        
                if (addedUrls.includes(url)) {
                    state.addedStatus = true
                } else {
                    state.addedStatus = false
                }
                addedUrls.push(url)
                console.log(addedUrls)
                console.log(state)
        
                input.value = ''
                input.focus()
            })
    })
}
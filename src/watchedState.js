
const render = (container, state) => {
    console.log(state)
    const input = document.querySelector('input')

    container.textContent = state.formInfo.status
    if (state.form.urlValid === true) {
        container.classList.remove('text-danger')
        container.classList.add('text-success')
        input.classList.remove('is-invalid')
    } 
    
    if (state.form.urlValid === false) {
        container.classList.remove('text-success')
        container.classList.add('text-danger')
        input.classList.add('is-invalid')
    }    
}

export default render

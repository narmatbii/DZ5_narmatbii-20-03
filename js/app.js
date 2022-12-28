const tabItems = document.querySelectorAll('.tabheader__item')
const tabContent = document.querySelectorAll('.tabcontent')
const tabMain = document.querySelector('.tabheader__items')


const hideContent = () => {
    tabContent.forEach((item) => {
        item.classList.add('hide')
        item.classList.remove('show')
    })
    tabItems.forEach((item) => {
        item.classList.remove('tabheader__item_active')
    })
}


const showContent = (i = 0) => {
    tabContent[i].classList.add('show')
    tabContent[i].classList.remove('hide')

    tabItems[i].classList.add('tabheader__item_active')
}
hideContent()
showContent()


tabMain.addEventListener('click',(event) => {
    const target = event.target
    if (!target.classList.contains('tabheader__item_active')){
        tabItems.forEach((tab,idx) => {
            if (target === tab){
                hideContent()
                showContent(idx)
            }
        })
    }
})

const modalBtn = document.querySelector('.header__right-block')
const modalClose = document.querySelector('.modal__close')
const modal = document.querySelector('.modal')

modalBtn.addEventListener('click',() => {
    modal.style.display = 'block'
})

modalClose.addEventListener('click',() => {
    modal.style.display = 'none'
})


/////////////



const messageText = {
    // loading: 'loading...',
    success: 'Все успешно сохронено!',
    error: 'ошибка при запросе!'

}



const forms = document.querySelectorAll('form')
const loader = document.querySelector('.loader')

forms.forEach((form) => {
    postData(form)
})



function postData(form) {
    form.addEventListener('submit',(event) => {
        event.preventDefault()

        const messageBlock = document.createElement('div')
        // messageBlock.textContent = messageText.loading
        loader.style.display = 'block'
        form.append(messageBlock)

        messageBlock.style.color = 'green'
        messageBlock.style.textAlign = 'center'
        messageBlock.style.fontFamily = 'Impact, fantasy'
        messageBlock.style.marginTop = '20px'


        const request = new XMLHttpRequest()
        request.open('POST','server.php')
        // request.setRequestHeader('Content-Type','multipart/form-data')

         const formData = new FormData(form)



         const obj = {}
         formData.forEach((value,key) => {
             obj[key] = value
         })
         request.send(formData)
         request.addEventListener('load',() => {
            if(request.status === 200) {
                const response = request.response
                console.log(response,'response from server')
            messageBlock.textContent = messageText.success

            } else {
                console.log('request error')
            messageBlock.textContent = messageText.error
            }
             loader.style.display = 'none'
         })
    })
}





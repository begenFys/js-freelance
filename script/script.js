document.addEventListener('DOMContentLoaded', () => { //ждём загрузки дом дерева, а потом делаем функцию(стрелочная)
    'use strict';
    /*
    "use strict"; (перевод: «использовать строгий») - это установка, 
    которая заставляет код обрабатываться в строгом режиме. 
    Без этой установки код обрабатывается в неограниченном режиме.
    https://learn.javascript.ru/strict-mode
    */
    //const создаёт константу
    const customer = document.getElementById('customer'),/* выбирает элемент по id */
        freelancer = document.getElementById('freelancer'),
        blockCustomer = document.getElementById('block-customer'),
        blockFreelancer = document.getElementById('block-freelancer'),
    // пишется в горбатом стиле(каждое следующее слово пишется с большой буквы)
        blockChoice = document.getElementById('block-choice'),
        btnExit = document.getElementById('btn-exit'),
        formCustomer = document.getElementById('form-customer');

    const orders = [];

    customer.addEventListener('click', () => {  //обработчик событий
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block'; //обращаемся к свойствам через .
        btnExit.style.display = 'block';
    })

    freelancer.addEventListener('click', () => {  //обработчик событий
        blockChoice.style.display = 'none';
        blockFreelancer.style.display = 'block';
        btnExit.style.display = 'block';
    })

    btnExit.addEventListener('click', () => {
        btnExit.style.display = 'none';
        blockFreelancer.style.display = 'none';
        blockCustomer.style.display = 'none';
        blockChoice.style.display = 'block';
    })

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const obj = {};
        
        // первый способ
        // for (const elem of formCustomer.elements){
        //     if ((elem.tagName === 'INPUT' && elem.type !== 'radio') || 
        //     (elem.type === 'radio' && elem.checked) ||
        //     (elem.tagName === 'TEXTAREA')){
        //         obj[elem.name] = elem.value;
        //     }
        // };
        
        
        //способ через филтер
        const Filters = (elem) => {
            const res =  (elem.tagName === 'INPUT' && elem.type !== 'radio') || 
            (elem.type === 'radio' && elem.checked) ||
            (elem.tagName === 'TEXTAREA')
            obj[elem.name] = elem.value;
            //очистка
            if (elem.type !== 'radio'){
                elem.value = ''
            }
            return res
        }
        const formElement = [...formCustomer.elements].filter(Filters)

        orders.push(obj);
        console.log(orders);
    });
})
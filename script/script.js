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
        formCustomer = document.getElementById('form-customer'),
        ordersTable = document.getElementById('orders'),
        modalOrder = document.getElementById('order_read'),
        modalOrderActive = document.getElementById('order_active');

    const orders = [];

    const renderOrders = () => {

        ordersTable.textContent = '';

        orders.forEach((order, i) => {
        // ${} - интерполяция, это как f'{}' в python
        ordersTable.innerHTML += `
            <tr class="order taken" data-number-order="${i}">
                <td>${i+1}</td>
                <td>${order.title}</td>
                <td class="${order.currency}"></td>
                <td>${order.deadline}</td>
            </tr>`;

    });
    };

    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        // тернарный оператор - (if формально) условие ? что будет : грубо говоря else
        const modal = order.active ?  modalOrderActive : modalOrder;
        
        const titleBlock = document.querySelector('.modal-title'),
            firstNameBlock = document.querySelector('.firstName'),
            emailBlock = document.querySelector('.email'),
            descriptionBlock = document.querySelector('.description'),
            currencyBlock = document.querySelector('.currency_img'),
            countBlock = document.querySelector('.count'),
            phoneBlock = document.querySelector('.phone'),
            deadlineBlock = document.querySelector('.deadline');

        titleBlock.textContent = order.title;
        firstNameBlock.textContent = order.firstName;
        emailBlock.textContent = order.email;
        descriptionBlock.textContent = order.description;
        currencyBlock.classList.add(`${order.currency}`);
        countBlock.textContent =  order.amount;
        phoneBlock.textContent = order.phone;
        deadlineBlock.textContent = order.deadline;

        modal.style.display = 'block';
    };


    ordersTable.addEventListener('click', (event) => {
        const target = event.target;
        console.log('target: ', target);

        const targetOrder = target.closest('.order')
        if (targetOrder){
            openModal(targetOrder.dataset.numberOrder);
        };
    });




    customer.addEventListener('click', () => {  //обработчик событий
        blockChoice.style.display = 'none';
        blockCustomer.style.display = 'block'; //обращаемся к свойствам через .
        btnExit.style.display = 'block';
    })

    freelancer.addEventListener('click', () => {  //обработчик событий
        blockChoice.style.display = 'none';
        renderOrders();
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
        event.preventDefault();
        
        const obj = {};

        // первый способ
        // for (const elem of formCustomer.elements){
        //     if ((elem.tagName === 'INPUT' && elem.type !== 'radio') || 
        //     (elem.type === 'radio' && elem.checked) ||
        //     (elem.tagName === 'TEXTAREA')){
        //         obj[elem.name] = elem.value;
        //     }
        // };

        //способ через forEach

        [...formCustomer.elements].forEach((elem) => {
            if((elem.tagName === 'INPUT' && elem.type !== 'radio') || 
            (elem.type === 'radio' && elem.checked) ||
            (elem.tagName === 'TEXTAREA')){
                obj[elem.name] = elem.value;
            };
        });

        formCustomer.reset();
        orders.push(obj);
        console.log(orders);
    });

});
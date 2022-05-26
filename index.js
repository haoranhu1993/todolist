// ~~~~~~~~~~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Api = (() => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    const path = 'todos';

    const getTodos = () => 
        fetch([baseUrl, path].join('/'))
            .then((response) => response.json());

    return {
        getTodos,
    }
})();

// ~~~~~~~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domstr = {
        todolist: '.todo-container',
    }

    const render = (ele, tmp) => {
        ele.innerHTML = tmp
    }

    const createTmp = (arr) => {
        let tmp = '';
        arr.forEach(todo => {
            tmp += `
                <li>
                    <span>${todo.title}</span>
                </li>
            `;
        });
        return tmp
    }

    return {
        render,
        createTmp,
        domstr
    };
})();

// ~~~~~~~~~~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Model = ((api) => {
    const { getTodos } = api;

    return {
        getTodos,
    };
})(Api);

// ~~~~~~~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {

    const init = () => {
        model.getTodos().then(todolist => {
            const todolistEle = document.querySelector(view.domstr.todolist);
            const tmp = view.createTmp(todolist);

            view.render(todolistEle, tmp);
        });
    }

    return { init };
})(Model, View);

Controller.init();
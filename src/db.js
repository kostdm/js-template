/**
 * Глобальная вероятность успеха для удобства тестирования
 */
const GLOBAL_PROPABILITY = 0.9;
const BAD_JSON_PROPABILITY = 0.2;

/**
 * Получить все записи из хранилища
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON 
 */
export async function all(){
    try {
        await TimeoutPropabiliry(300, GLOBAL_PROPABILITY);
        return serverAnswer(articlesStorage);
    }
    catch(error) {
        return error;
    }
}

/**
 * Получить статью по id
 * @param {int} id Id статьи
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON 
 */
export async function get(id){
    try {
        await TimeoutPropabiliry(300, GLOBAL_PROPABILITY);
        return serverAnswer(articlesStorage[mapArticles[id]]);
    }
    catch(error) {
        return error;
    }
}

/**
 * Удалить статью из базы
 * @param {int} id Id статьи
 * @param {callable} onAnswer Функция, обрабатывающая ответ от сервера в формате JSON  
 */
export async function remove(id){
    try {
        await TimeoutPropabiliry(300, GLOBAL_PROPABILITY);
        if (id in mapArticles) {
            let num = mapArticles[id];
            delete mapArticles[id];
            articlesStorage.splice(num, 1);
            return serverAnswer(true);
        }
        else{
            return false;
        }
    }
    catch(error) {
        return error;
    }
}

/* полуприватная часть, вдруг захотите сделать промис :) */
function TimeoutPropabiliry(time, probability){
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            Math.random() < probability ? resolve() : reject(serverAnswer('', 100500, "Propability Error"));
        }, time);
    });
}

function serverAnswer(data, code = 200, status = "OK"){
    if(Math.random() < BAD_JSON_PROPABILITY){
        return 'incoorect json';
    }

    return JSON.stringify({
        code, 
        status,
        data
    });
}

/*  приватная часть */ 
let articlesStorage = [
    {
        id: 1,
        title: 'Профисификация кода',
        dt: '2018-12-06',
        text: 'Код без промисов бывает жестью, но и с ними можно изобразить много странного.'
    },
    {
        id: 2,
        title: 'Итераторы и генераторы',
        dt: '2018-12-01',
        text: 'Сначала пугают всех, кто к ним прикасается, а Symbol кажется бредом.'
    },
    {
        id: 5,
        title: 'Javascript',
        dt: '2018-12-02',
        text: 'Всё равно хороший язык программирования.'
    }
];

let mapArticles = {};

articlesStorage.forEach((item, i) => {
    mapArticles[item.id] = i;
});


import '@babel/polyfill';

async function reqData(url, method, bodyData = {}){
    try {
        let data = await fetch(url, {
            method,
            body: JSON.stringify(bodyData)
        }).then(response => {
            return response.json();
        });
        return data;
    }
    catch {
        throw ('Не удалось получить данные');
    }
}

(async function(){
    try {
        // получаем данные
        // let data = await reqData('http://localhost:8080/clients', 'get');
        // console.log(data);

        // добавляем данные
        let add = await reqData('http://localhost:8080/clients', 'post', {
            name: 'Добавлялов Юрий Юрьевич',
            phone: '+7 901 121 12-12',
            mail: 'test@test.com',
            admin: true
        });
        console.log(add);

        // берем случайный эллемент
        let rnd = Math.floor(Math.random() * data.length);
        console.log(`random is: ${rnd}, _id is: ${data[rnd]._id}`);

        // получаем данные по id
        let one = await reqData(`http://localhost:8080/clients/${data[rnd]._id}`, 'get');
        console.log(one);
    }
    catch(err) {
        console.log('Error : ' + err);
    }
})();
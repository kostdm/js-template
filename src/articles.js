export async function all(){
    let data = await makeRequest(`http://localhost:8080/clients`);
    return data;
}

export async function one(id){
    let data = await makeRequest(`http://localhost:8080/clients/${id}`);
    return data;
}

export async function remove(id){
    let data = await makeRequest(`http://localhost:8080/clients/${id}`,{
        method: 'delete'
    });
    return data;
}

export async function add(client){
    let data = await makeRequest(`http://localhost:8080/clients`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(client)
    });

    return data;
}

function makeRequest(url, options = {}){
    return fetch(url, options).then(response => {
        if (response.status !== 200 && response.status !== 201) {
            return response.text().then(text => {
                throw new Error(text);
            });
        }

        return response.json();
    });
}
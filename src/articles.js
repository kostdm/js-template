import * as serverApi from './db';

function checkData(response, place) {
    let info;
    
    try {
        info = JSON.parse(response);
    }
    catch {
        throw (`Bad JSON${place}: ${response}`);
    }
    
    if (info.code === 200) {
        return info.data;
    }
    else {
        throw info.status + place;
    }
}

async function all(){
    let response = await serverApi.all();
    return checkData(response,' in articles list');
}

async function one(id){
    let response = await serverApi.get(id);
    return checkData(response,' in articles one');
}

async function remove(id){
    let response = await serverApi.remove(id);
    return checkData(response,' in articles delete');
}

export {all, one, remove};
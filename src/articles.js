import * as serverApi from './db';

async function all(){
    let response = await serverApi.all();
    try {
        let info = JSON.parse(response);

        if (info.code === 200) {
            return info.data;
        }
        else {
            throw info.status;
        }
    }
    catch(error) {
        throw (error + ' in articles list');
    }
}

async function one(id){
    let response = await serverApi.get(id);
    try {
        let info = JSON.parse(response);

        if (info.code === 200) {
            return info.data;
        }
        else {
            throw info.status;
        }
    }
    catch(error) {
        throw (error + ' in articles one');
    }
}

async function remove(id){
    let response = await serverApi.remove(id);
    try {
        let info = JSON.parse(response);

        if (info.code === 200) {
            return info.data;
        }
        else {
            throw info.status;
        }
    }
    catch(error) {
        throw (error + ' in articles delete');
    }
}

export {all, one, remove};
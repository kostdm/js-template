import api from './api';

async function all(){
    try {
        const response = await api.get('articles');
        return response;
    }
    catch (error) {
        throw error;
    }
}

export {all};
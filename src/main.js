import '@babel/polyfill';
import * as ArticlesModel from './articles';

(async function() {
    try {
        let articles = await ArticlesModel.all();
        console.log('articles count = ' + articles.length);
    }
    catch (error) {
        console.log(error);
    }
})();
import '@babel/polyfill';
import * as ArticlesModel from './articles';

(async function() {
    try {
        let articles = await ArticlesModel.all();
        console.log('articles count = ' + articles.length);

        // берём случайный индекс
        let ind = Math.floor(Math.random() * articles.length);
        console.log('select index ' + ind + ', id = ' + articles[ind].id)
        
        // получаем статью по id
        let article = await ArticlesModel.one(articles[ind].id);
        console.log(article);

        // пробуем удалить её
        let res = await ArticlesModel.remove(article.id);
        console.log('что с удалением? - ' + res);

        // а сколько статей в базе сейчас
        try {
            articles = await ArticlesModel.all();
            console.log('articles count = ' + articles.length);
        }
        catch(error) {
            console.log(error + ' after delete');
        }
    }
    catch (error) {
        console.log(error);
    }
})();
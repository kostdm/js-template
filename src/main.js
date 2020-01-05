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
        let one = await ArticlesModel.one(articles[ind].id);
        console.log(one)
    }
    catch (error) {
        console.log(error);
    }
})();

// ArticlesModel.all((articles) => {
//     console.log('articles count = ' + articles.length);
    
//     // берём случайный индекс
//     let ind = Math.floor(Math.random() * articles.length);
//     console.log('select index ' + ind + ', id = ' + articles[ind].id)

//     // получаем статью по id
//     ArticlesModel.one(articles[ind].id, (article) => {
//         console.log(article);

//         // пробуем удалить её
//         ArticlesModel.remove(article.id, (res) => {
//             console.log('что с удалением? - ' + res);

//             // а сколько статей в базе сейчас
//             ArticlesModel.all((articles) => {
//                 console.log('articles count = ' + articles.length);
//             }, (error) => {
//                 console.log(error + ' in articles list after delete');
//             });
//         }, (error) => {
//             console.log(error + ' in articles delete');
//         })

//     }, (error) => {
//         console.log(error + ' in articles one');
//     });

// }, (error) => {
//     console.log(error + ' in articles list');
// });
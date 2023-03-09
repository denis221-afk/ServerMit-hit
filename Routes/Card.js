const {Router} = require('express');
const ModelsCard = require('../Models/Cards');
const uuid = require('uuid').v4;
const telegramBot = require('node-telegram-bot-api');
const token = "5622124642:AAGkEqjnUA5a7bG790Ow0oS3XnyGAKrBsaQ";
const chatid = "-706834197";
const bot = new telegramBot(token, { polling: true });

const router = Router();


router.post('/API/Add', async (req, res) => {
    const {Title, Subtitle, fileFollder, Price, Descer, types, Weight, Like} = req.body; 

    const card = new ModelsCard({
        Title,
        Subtitle,
        fileFollder,
        Price,
        Descer,
        types,
        Weight,
        Like
    })

    await card.save();
    res.status(200).json({masenge: 'Товар добавлино'})
})



router.get('/API/GET', async (req, res) => {
    const data = await ModelsCard.find({})
    res.status(200).json({cards: data});
})


router.post('/API/SEARCH', async (req, res) => {
    const {Title} = req.body;
    const candidate = await ModelsCard.find({ Title })
    if(candidate.length <= 0) {
       return res.status(404).json({masenge: 'Товар не знайдено'})
    } 
    res.status(200).json({data: candidate});
});


router.get('/API/GETBOX', async (req, res) => {
    const candidate = await ModelsCard.find({ types: 'box' })
    if(candidate.length <= 0) {
       return res.status(500).json({masenge: 'Сталася помилка'})
    } 
    res.status(200).json({data: candidate});
})

router.post('/API/LIKE', async (req, res) => {
    const {_id} = req.body;
    const candidate = await ModelsCard.findOne({ _id });
    const newLike = candidate.Like
    candidate.Like = newLike + 1

    await candidate.save();
    res.status(200)
})

router.post('/API/ITEM', async (req, res) => {
    const {_id} = req.body;

    const dataItem = await ModelsCard.findById(_id)
    if(dataItem) {
        res.status(200).json({
            data: dataItem,
        })
    }
})


router.post('/API/ORDER', async (req, res) => {
    const {Username, Userphone, Useradress, data, total, payStatus} = await req.body;

    


    const order = {
        id: uuid(), 
        Username: Username,
        Userphone: Userphone,
        Useradress: Useradress,
        data: data, 
        price: total,
        payStatus: payStatus
    }



    const element = data.map(item => {
        const{Title, Subtitle, Price, Weight} = item;

        return `<b>Товар:</b> ${Title}: ${Subtitle} : ${Price}грн ${Weight}г  `
    })
    const htmlMessage = `
    <b>У вас нови замовлиння!</b>${new Date().toLocaleString()}
    <b>Ім'я користувача:</b> ${order.Username}
    <b>Телефон:</b> ${order.Userphone}
    <b>Адреса:</b> ${order.Useradress}
    <b>Спосіб Оплати:</b> ${order.payStatus}
    ${element}
    <b>Остаточна ціна</b>: ${total}

`;

    bot.sendMessage(chatid, htmlMessage, { parse_mode: 'HTML' });
    res.status(200).json('Sucsess');
})
module.exports = router
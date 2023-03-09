import  Axios  from "axios";
import {Component} from 'react'


class NPstep extends Component {
    constructor(props) {
        super(props);
    }

     
            render() {
                 return(
                        <div style={{textAlign: 'center'}}>
                                    <div className="Bay_panel uk-margin-large">
                                        <span className="setep">1</span>
                                        <span className="setep">2</span>
                                        <span className="setep" style={{opacity: 1}}>3</span>
                                    </div>
                            <div>
                            <div >Дякуємо! ваш заказ успішно прийнято</div>
                            <span>Ми відправимо замовлиння протягом доби!</span>
                            </div>
                        </div>
                     )
                }

    }



// const NPstep = ({basketData, total}) => {

//     useEffect(() => {
//       sendOrder();
//     },[])


//     async  function sendOrder() {
//         const data = JSON.parse(localStorage.getItem('userData'));
//         const chose = JSON.parse(localStorage.getItem('cohoseStatus'));
//             const order = {
//                 Username: data.Username,
//                 Userphone: data.Userphone,
//                 Useradress: data.Useradress,
//                 data: basketData,
//                 total: total,
//                 payStatus: chose 
//             }
//            await Axios
//                 .post('http://192.168.0.8:7000/API/ORDER', order)
             
//         }

//         sendOrder()

      
//     )
// }

export default NPstep;
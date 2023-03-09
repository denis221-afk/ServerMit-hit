import { useState } from 'react';
import Axios from 'axios';
const ChoseOrder = ({finalPage ,basketData, total}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [status, setStatus] = useState(null);
  




    function sendOrder() {
        const data = JSON.parse(localStorage.getItem('userData'));
        const chose = JSON.parse(localStorage.getItem('cohoseStatus'));
            const order = {
                Username: data.Username,
                Userphone: data.Userphone,
                Useradress: data.Useradress,
                data: basketData,
                total: total,
                payStatus: chose 
            }
            Axios
                .post('http://192.168.0.8:7000/API/ORDER', order)
    }

   async function target(e) {
      setSelectedOption(e.target.value);
      if(e.target.value == 'Накладний Платіж "Нова Пошта"') {
        setStatus(true)
      } else{
        setStatus(false)
      }
    }

  async  function onSubmit(e) {
        e.preventDefault();
        const jsonStr = JSON.stringify(selectedOption);
        localStorage.setItem('cohoseStatus', jsonStr);
        sendOrder(); 
        
    }

    return(
        <div className="step_1">
            <h2>Виберіть Спосіб оплати</h2>
            <div className="Bay_panel">
                <span className="setep">1</span>
                <span className="setep" style={{opacity: 1}}>2</span>
                <span className="setep">3</span>
            </div>

            <div className="bay_tabs">
                <div className="bay_tab">
                <form onSubmit={(e) => {
                    onSubmit(e);
                    finalPage(status);
                    
                }}>
                    <div className="uk-margin">
                        <select className="uk-select" aria-label="Select" onChange={target}>
                        <option disabled={toString()} selected={toString()}>Виберіть метод оплати</option>
                            <option>Накладний Платіж "Нова Пошта"</option>
                            <option>Оплата картою</option>
                        </select>
                    </div>
                    <button className="btn uk-button uk-button-danger" disabled={!selectedOption}>Наступний крок</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default ChoseOrder;
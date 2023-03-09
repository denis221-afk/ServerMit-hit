import { useState } from "react";
import UIkit from "uikit";
import axios from "axios";

const StepOne = ({step,}) => {
    const [inputName, setNameUser] = useState('');
    const [inputPhone, setPhoneUser] = useState('');
    const [inputAdress, setAdressUser] = useState('');
    const [NpAdress, setNp] = useState([]);
    let stylesDatalist = {
        transition: '0.5s ease-in',
        height: 0,
    }



    function showDatalist() {
       return stylesDatalist = {...stylesDatalist, height: 48 * NpAdress.length + 12}
    }

    function onChange(e) {

       if(e.target.name == 'username') {
            setNameUser(e.target.value);
       } else if(e.target.name == 'phone') {
            setPhoneUser(e.target.value)
       } else if(e.target.name == 'adress') {
        setAdressUser(e.target.value);
        
    axios.post('https://api.novaposhta.ua/v2.0/json/AddressGeneral/getSettlements/', {
        "apiKey": "07c82a28ada20b174780c53008d43172",
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "CityName" : e.target.value,
            "Limit" : "10"
        }
    })
        .then(response => {
           setNp(response.data.data) // список відділень
        })
        .catch(error => {
            console.log(error);
        });
    }}

  async function onSubmit() {
        const obj = {
            Username: inputName,
            Userphone: inputPhone, 
            Useradress: inputAdress
        }

        const jsonStr = JSON.stringify(obj);
        await localStorage.setItem('userData', jsonStr)
   
    }

    const dataListElement = NpAdress.map((item, i) => {
        const {Description} = item;

        if(inputAdress.length !== 0) {
            return (
                <span onClick={() => setAdressUser(Description)}>{Description}</span>
            )
        }
    })

    const elemSpan =  NpAdress.length > 0 &&  inputAdress.length > 3 ? <span style={{cursor: 'pointer'}} onClick={stylesDatalist = showDatalist()}>Вибиріть Віділиня Новой пошти</span> : null;
    console.log(stylesDatalist)
    return(
        <div className="step_1">
         <h2>Вкажіть контактні дані про себе</h2>
            <div className="Bay_panel">
                <span className="setep" style={{opacity: 1}}>1</span>
                <span className="setep">2</span>
                <span className="setep">3</span>
            </div>

            <div className="bay_tabs">
                <div className="bay_tab">
                    <form className="forms" onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                        step();
                    }}>
                    
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Ваше повне ім'я"  name="username" className="inputs" required value={inputName} onChange={(e) => onChange(e)}/>
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Номер телефону"  name="phone"  className="inputs" required value={inputPhone} onChange={(e) => onChange(e)}/>
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input" type="text" placeholder="Ваше місто" id="adress"    name="adress" className="inputs" autocomplete="off" value={inputAdress} required onChange={(e) => onChange(e)}/>
                        <div className="uk-margin-small">
                         {elemSpan}
                        </div>
                        <div className="datalist" style={stylesDatalist}>
                            {dataListElement}
                        </div>
                    </div>
                    <div class="uk-margin">
                        <label><input class="uk-checkbox" type="checkbox" required  /> Я погоджуюся з <a href="#">політикою конфідиційность</a></label>
                    </div>
                    <button className="btn uk-button uk-button-danger">Наступний крок</button>
                    </form>
                </div>
            </div>
      
      </div>
    )
}

export default StepOne;
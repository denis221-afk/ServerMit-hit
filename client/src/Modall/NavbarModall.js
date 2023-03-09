import {Component} from 'react';
import ItemSarch from '../Component/Item-search/ItemSearch';
import Axios from 'axios';
import BasketItem from '../Component/Basket-item/BasketItem';
import { NavLink } from 'react-router-dom';




// icon
import intagram from '../Assets/Icon/icons8-instagram-30.png';
import TikTok from '../Assets/Icon/icons8-tik-tok-24.png';
import Telegram from '../Assets/Icon/icons8-telegram-app-30.png';

class NavbarModall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            data: [],
        }
    }

    componentDidMount() {
        this.onModall();
    }







    getClientTerm = (event) => {
        const value = event.target.value;
        this.setState({
            term: value
        })
     }


     clearInputs = () => {
        setTimeout(() => {
            this.setState({
                term: ''
            })
        }, 3000);
     }


     onSubmit = (e) => {
        e.preventDefault();
        this.setState({spinner: true})

        const {term} = this.state
        Axios.post('http://192.168.0.8:7000/API/SEARCH', {
            Title: term
        })
        .then(this.setState({spinner: false}))
        .then(res => this.setState({data: res.data.data}))
        .catch(err => this.setState({term: err.response.data.masenge}))
        .finally(this.clearInputs())
     }

    onModall = () => {
        const {active, setActive, setActiveBasket} = this.props;
        window.document.addEventListener('keydown', (e) => {
            if(e.code == 'Escape') {
                setActive(false);
                setActiveBasket(false);
            } 
        })
    }

   

    render() {
       const {term, data, spinner} = this.state;
       const {active, setActive, activeBasket, setActiveBasket, basketData, total} = this.props;
       let element 
       if(data.length > 0) {
         element = data.map((item, i) => {
            const {fileFollder, Title, Price, _id, Subtitle} = item;
            if(i < 6) {
            return(
                <ItemSarch fileFollder={fileFollder} Title={Title} Price={Price} key={_id} index={i} Subtitle={Subtitle}/>
            )
            }
        })
       }


       const item = basketData.map((item, i) => {
        const {fileFollder, Title, Price, Subtitle} = item;
        const {deleteItem} = this.props
        return(
            <BasketItem fileFollder={fileFollder} Title={Title} Price={Price} key={i} deleteItem={() => deleteItem(i)} Subtitle={Subtitle}/>
        )
       })

       let styles = null;
       if(item.length <= 0) {
         styles = {
            pointerEvents: 'none',
            opacity: 0.5
          }
       } 

      
        return(
            <>
            <div id="offcanvas-usage" className="navbarmodall" uk-offcanvas={toString()}>
                <div className="uk-offcanvas-bar">
                    <div className="navbar__header">
                        <div className="logo"><span>M</span>EAT-HIT</div>
                    </div>
                    <div className="navbar__body">
                    <div className="uk-width-1-1@s">
                        <ul className="uk-nav-default uk-nav-divider" uk-nav={toString()}>
                            <li><NavLink to="/Catalog">Каталог</NavLink></li>
                            <li><NavLink to="/AboutUs">Про нас</NavLink></li>
                            <li><NavLink to="/Client">Відгуки клієнтів</NavLink></li>
                            <li><NavLink to="/Pay&Get">Оплата і доставка</NavLink></li>
                            <li><a href="https://www.instagram.com/_meathit_/">Наш Instagram</a></li>
                            <li><a href="https://t.me/matrof">Наш Telegram</a></li>
                            <li><a href="https://vm.tiktok.com/ZMNSyFVC9/">Наш TikTOK</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="navbar__footer">
                        <a href="https://www.instagram.com/_meathit_/" target="_blank"><img src={intagram} alt="Instagram" /></a>
                        <a href="https://vm.tiktok.com/ZMNSyFVC9/" target="_blank"><img src={TikTok} alt="TIK TOK" /></a>
                        <a href="https://t.me/matrof" target="_blank"><img src={Telegram} alt="telegram" /></a>
                    </div>
                </div>
            </div>
    
                <div className={active ? 'modall_search active_modall' : 'modall_search'} onClick={() => setActive(false)}>
                    <div className='uk-background-muted uk-padding uk-panel modall-dialog uk-width-1-3' style={{
                        backgroundColor: '#000'
                    }} onClick={e => e.stopPropagation()}>
                    <form className="uk-search uk-search-default search uk-width-1-1" onSubmit={(e) => this.onSubmit(e)}>
                        <input className="uk-search-input" type="search" placeholder="Search" aria-label="Пошук" value={term} onChange={(event) => this.getClientTerm(event)} />
                        <button className='btn btn-search'>Пошук</button>
                    </form>
                
                    <ul className={data.length > 0 ? 'uk-list uk-list-divider listItem' : 'uk-list uk-list-divider'}>
                        {element}
                    </ul>
                    </div>
                </div>



                <div className={activeBasket ? 'modall_basket active_modall' : 'modall_basket'} onClick={() => setActiveBasket(false)}>
                    <div className='uk-background-secondary uk-panel modall-dialog uk-width-1-3@m' onClick={e => e.stopPropagation()}>
                        <div className='basket_header'>
                            <div className='basket_logo'><span>M</span>EAT-HIT</div>
                            <a href="#" onClick={() => setActiveBasket(false)} uk-icon="icon: close"></a>
                        </div>
                        <div className='basket_body'>
                        <ul className="uk-list uk-list-divider">
                            {item}
                        </ul>
                        </div>
                        <div className='basket_footer'>
                        <div>
                          <NavLink to="/bayPage" style={styles} onClick={() => {
                            setActiveBasket(false);

                        }}><button className="uk-button uk-button-danger btn">Купити</button></NavLink>  
                            <span>Загальна ціна : {total}грн</span>
                        </div>
                        </div>
                    </div> 
                </div>
            </>
        )
    }
}

export default NavbarModall;

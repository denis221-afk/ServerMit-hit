import NavbarModall from '../../Modall/NavbarModall';
import { NavLink } from 'react-router-dom';
import {useState} from 'react';

const Navbar = ({basketData, total, deleteItem}) => {

    const [active, setActiveModall] = useState(false);
    const [activeBasket, setActiveBasket] = useState(false);
    const [indexBasket, setIndexBasket] = useState(false)
 

 

    if(active || activeBasket) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '12px'
    } else {
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px'
    }

    return(
        <div className="Navbar">
            <div className="Container">
                <div className="flex_container">
                    <div className='burger'>
                        <a href="#offcanvas-usage" uk-toggle="target: #offcanvas-usage" uk-icon="menu"></a>
                    </div>

                    <div className='panel'>
                        <nav className='menu'>
                            <NavLink to="/"><span uk-icon="icon: home"></span>Головна</NavLink>
                            <a href="#" onClick={() => setActiveModall(true)} className="search"><span uk-icon="icon: search"></span>Пошук</a>
                            <a href="#" onClick={() => setActiveBasket(true)} className={indexBasket ? 'active_basket': 'basket_link'}><span uk-icon="icon: cart"></span>Корзина <span className="uk-badge">{basketData.length}</span></a>
                        </nav>
                    </div>
                </div>
            </div>
            <NavbarModall  active={active} setActive={setActiveModall} activeBasket={activeBasket} setActiveBasket={setActiveBasket} basketData={basketData} total={total} deleteItem={deleteItem}/>
        </div>
    )
}

export default Navbar
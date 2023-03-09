import { NavLink } from "react-router-dom";
const CardItem = ({fileFollder, Title, Subtitle, Descer, Weight, Price, Like, onLike, onItem, _id, getID}) => {

    function onFunction(event) {
        event.preventDefault();
        onItem();
    }


    

    return(
        <div className="CardItem">
            <img src={`/fileFolder/${fileFollder}/Main.jpg`} alt="" />
            <div className="cardInfo">
                <div className="card__title">{Title}</div>
                <div className="card__subtutle">{Subtitle}</div>
                <div className="right_panel">{Weight}г</div>
                <div className="card_footer">
                    <div>
                    <NavLink to={`/Product/${_id}`} className="uk-button uk-button-danger uk-margin-small-right btn" onClick={() => getID()}>Відкрити</NavLink>
                    <a href="#" className="uk-margin-small-right" onClick={(event) => onFunction(event)}><span uk-icon="bag"></span></a>
                    <span>{Price}грн</span>
                    </div>
                    <div className="like" onClick={() => onLike()}><span uk-icon="heart"></span>{Like}</div>
                </div>
            </div>
        </div>
    )
}

export default CardItem;
import { NavLink } from "react-router-dom";
const SliderElementItem = ({card, _id, click}) => {
    return (
        <NavLink to={`/Product/${_id}`} onClick={click}>
        <li className="slideItemElements">
         <div class="uk-card uk-card-default">
                <div class="uk-card-media-top">
                    <img src={`/fileFolder/${card.fileFollder}/Main.jpg`}width="550px" height="300" alt="" />
                </div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">{card.Title}</h3>
                    <h5>{card.Subtitle}</h5>
                </div>
            </div>
        </li>
        </NavLink>
    )
}

export default SliderElementItem;
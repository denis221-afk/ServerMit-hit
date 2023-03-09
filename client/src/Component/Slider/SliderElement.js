import SliderElementItem from "./SlideElementItem";
const SliderElement = ({data, type, click}) => {
    const arrData = data
    let indexItem = 0
 
    const newData = arrData.map((item , index) => {
        const {Title, fileFollder, Subtitle, Price, Weight, types, _id} = item;
 
        if(types == type && indexItem < 5) {
            indexItem++
            return(
                <SliderElementItem card={item} key={index} type={types} _id={_id} click={() => click(_id)}/>
            )
        }
     
    })


    return(
        <div class="uk-slider-container-offset" uk-slider={toString()}>
            <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

                <ul class="uk-slider-items uk-child-width-1-2@s uk-grid">
                    {newData}
                </ul>

                <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous={toString()} uk-slider-item="previous"></a>
                <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next={toString()} uk-slider-item="next"></a>
            </div>

            <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>

        </div>
    )
}

export default SliderElement;
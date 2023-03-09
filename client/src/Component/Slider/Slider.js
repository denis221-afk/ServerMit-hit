import {Component} from 'react';
import SlideItem from "./Slide-item";
import  Axios  from 'axios';
import axios from 'axios';
// IGQVJXZAEQzZAzM1cGRmOGdWV2ZA5c1IzazV6T1k1Yy1ab1ZA6ZAlI0NWZABZAy1FaWRhRmR4ankzaWNkSjRoMHIzMGJTakFBd3VEUk1YbW5SN3UwdFhLTDFHQ2NrbkZA6OU0yVm01NXRMR3hRNVNudG5JY1dydQZDZD

class Slider extends Component {
    constructor() {
        super();
        

        this.state = {
            data: [],
        }
    }




    componentDidMount() {
        this.getInstagramData();
    }


    getInstagramData = () => {
        axios 
          .get('https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=IGQVJXZAEQzZAzM1cGRmOGdWV2ZA5c1IzazV6T1k1Yy1ab1ZA6ZAlI0NWZABZAy1FaWRhRmR4ankzaWNkSjRoMHIzMGJTakFBd3VEUk1YbW5SN3UwdFhLTDFHQ2NrbkZA6OU0yVm01NXRMR3hRNVNudG5JY1dydQZDZD')
          .then(res => {
            // Filter out videos and keep only photos with valid URLs
            const photosOnly = res.data.data.filter(media => 
             !media.media_url.startsWith("https://video")
            );
            this.setState({ data: photosOnly });
          })
      }

    render() {
        const {data} = this.state;
        const element = data.map((item, i) => {
            const {media_url, caption, id ,permalink } = item;
            let index = 0;
    
            const captionNewText = caption.slice(0, 200) + "...";
            if(i <= 8) {
                index++;
                
                return (
                    <SlideItem url={media_url} descer={captionNewText} key={i} id={permalink}/>
                )
            }


        })
        return (
            <div className="Container">
                <div className="uk-slider-container-offset" uk-slider={toString()}>
                    <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1">
                        <ul className="uk-slider-items uk-child-width-1-2@s uk-grid list" >     
                         {element}
                        </ul>
                        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous={toString()} uk-slider-item="previous"></a>
                        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next={toString()} uk-slider-item="next"></a>
                    </div>
                    <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
                    </div>
            </div>
        )
    }
}
export default Slider
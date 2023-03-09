import  Axios  from 'axios';
import {Component} from 'react';
import { Navigate } from 'react-router-dom';
import SliderElement from '../../Component/Slider/SliderElement';

class ItemElenet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            FullData: [],
            clickedSlide: null, 
        }
    }

    async componentDidMount() {
        await this.getElementFromDB(this.props.id);
        this.getMoreElement();
      
    }


    getMoreElement = () => {
        Axios
        .get('http://192.168.0.8:7000/API/GET', )
        .then(res => this.setState({
            FullData: res.data.cards
        }))
    }
    getElementFromDB = (id) => {
        const _id = id
        if(_id !== ""){
            Axios
            .post('http://192.168.0.8:7000/API/ITEM', {_id: _id})
            .then(res => this.setState({
                data: res.data.data
            }))
        }
    }

     renderComponent = (uid) => {
        this.getElementFromDB(uid);
    }

    render() {
        
          const {id, onItem} = this.props; 
          const {data, FullData} = this.state;
          const type = data.types;
          localStorage.setItem('type', JSON.stringify(type))

        if(id == "") {
            return(
                <div className='itemElement'>
                    <div className='item_info'>
                        <Navigate to="/" /> 
                    </div>
                </div>
            )
        }

        return(
            <div className='itemElement'>
                <div class="Container">
                <div className='item_info'>
                 <h2>{data.Subtitle}</h2>
                 <h4>{data.Title}</h4>
                 <p>{data.Descer}</p>
                 <div className='uk-margin price'><span>{data.Price}грн.</span><br></br><span>{data.Weight}г.</span></div>
                 <div className='item_panel'>
                    <button className='btn' onClick={() => onItem(id)}>Добавити в корзину</button>
                 </div>
                </div>
                <h2 className='uk-margin'>Похожі товари</h2>
                <div className='moreItem'>
                    <SliderElement   data={FullData} type={type} click={this.renderComponent} />
                </div>
                </div>


                <div className='item_images'>
                    <img src={`/fileFolder/${data.fileFollder}/Body.jpg`} alt="backgarund" />    
                </div> 
            </div>
        )

    }
}

export default ItemElenet;
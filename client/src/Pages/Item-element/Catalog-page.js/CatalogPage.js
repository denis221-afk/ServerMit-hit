import CardItem from "../../../Component/Cards/CardsItem";
import {Component} from "react";
import axios from "axios";



class CatalogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            indexElement: 9
        }

    }


    componentDidMount() {
        this.getData();
    }
    
    getData = async () => {
        await axios 
             .get('http://192.168.0.8:7000/API/GET')
             .then(res => this.setState({data: res.data.cards})) 

     }


     showMoreElement = () => {
        const indexElem = this.state.indexElement;

        this.setState({
            indexElement: indexElem + 3
        })
     }


     onLike = async (id) => {
        const data = this.state.data
        await this.onSlice(data, id);

        axios.post('http://192.168.0.8:7000/API/LIKE', {
            _id: id
        })
     }

     onSlice = (data, id) => {
        data.map(item => {
            if(item._id == id) {
                item.Like++
            }
        })
        this.setState({data: data})
     }


     fillterCategori = async (e) => {
        let fillterData = [];


        await axios 
        .get('http://192.168.0.8:7000/API/GET')
        .then(res => fillterData = res.data.cards) 
        

        const target = e.target;
        let sortData;
        const targetElement = document.querySelectorAll('.panel_link').forEach(item => {
            item.style.color = '';
        })

        if(target.className == 'panel_link') {
            target.style.color = "#811811"
            sortData = fillterData.filter(item => {
                if(item.types == target.id) {
                    return item
                } else if(target.id == 'all'){
                    this.getData();
                }
            })

            this.setState({data: sortData})
        } 
     }
     


    render() {
        const {onItem, getID} = this.props;
        const {data} = this.state;
  




        let element = data.map((item, i) => {
            const {fileFollder, Title, Subtitle, Descer, Weight, Price, Like, _id} = item; 

            if(this.state.indexElement > i) {
                return(
                    <CardItem fileFollder={fileFollder} Title={Title} Subtitle={Subtitle} Weight={Weight} Price={Price} Like={Like} key={i}  onItem={() => onItem(_id)} _id={_id} getID={() => getID(_id)} onLike={() => this.onLike(_id)} />
                )
            }
        })
        return(
            <div className="Catalog_page">
                       <div class="Container">
                            <div class="Catalog_Promo">
                                <h1><span>M</span>EAT-HIT</h1>
                                <div className="panel_catalog">
                                    <a className="panel_link" onClick={(e) => this.fillterCategori(e)} id="all">Всі товари</a>
                                   <a className="panel_link" onClick={(e) => this.fillterCategori(e)} id="Dzerks">Джирки</a>
                                   <a className="panel_link" onClick={(e) => this.fillterCategori(e)} id="box">Набори</a>
                                   <a className="panel_link" onClick={(e) => this.fillterCategori(e)}>Ковбаски</a>
                                   <a className="panel_link" onClick={(e) => this.fillterCategori(e)}>Грінки</a>
                                 </div>
                             </div>
                             <div class="Catalog_wrapper">
                                 {element}
                             </div>
                             <div className="center">
                            <button className="uk-button uk-button-danger uk-margin-small-right btn" onClick={() => this.showMoreElement()}>Показати білше</button>
                             </div>
                         </div>
                     </div> 
        )
    }
}


export default CatalogPage;
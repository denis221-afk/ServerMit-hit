import {Component} from 'react';
import './Style/index.scss';

import IndexPage from './Pages/IndexPage';
import Loaddings from './Component/Loadding/Loadding';
import axios from 'axios';
class App extends Component {
  constructor() {
    super();
    this.state = {
      Loadding: true,
      basketData: [],
      total: 0, 
      id: '',
    }
  }

  componentDidMount() {
    this.stopLoadding();
  }

  stopLoadding = () => {
    setTimeout(() => {
      this.setState({
        Loadding: false
      })
    }, 6000);
  }

  getItemBasket = async (id) => {
    const oldData = this.state.basketData;
    await axios
      .post('http://192.168.0.8:7000/API/ITEM', {
        _id: id
      })
      .then(res => oldData.push(res.data.data))
      .then(this.setState({
        basketData: oldData
      }))
      this.calcTotal();
  }


  getID = (id) => {
    this.setState({
      id: id
    })
  }

  calcTotal = () => {
    try{
      const {basketData} = this.state;
      let total = 0
      for (let index = 0; index < basketData.length; index++) {
       total += basketData[index].Price 
      }
      this.setState({
        total: total
      })
  
    } catch(e) {
      console.log(e);
    }
  }


  deleteBasketItem = (index) => {
    const data = this.state.basketData;
    data.splice(index, 1);
    this.setState({
      basketData: data
    })
    this.calcTotal()

  }

  render() {
    const {Loadding, basketData, total, id} = this.state;

    const onLoadding = Loadding ? <Loaddings /> : null;
    return(
      <div className='App'>
        {onLoadding}
        <IndexPage basketData={basketData} onItem={(id) => this.getItemBasket(id)} total={total} deleteItem={(index) => this.deleteBasketItem(index)} getID={(id) => this.getID(id)} id={id}/>
      </div>
    )
  }
}

export default App;

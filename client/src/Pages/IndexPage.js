import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Assets/Footer/Footer";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./Main-page/MainPage";
import ItemElenet from "./Item-element/ItemElement";
import CatalogPage from "./Item-element/Catalog-page.js/CatalogPage";
import BayPage from "./BayPage";
import AboutUs from "./AboutUs/AboutUs";
import PayOrder from "./PayOrder";
import ClientMasenge from "./ClientMasenge";
const IndexPage = ({basketData, onItem, total, deleteItem, getID, id}) => {
    return(
        <div>
            <BrowserRouter >
                <Navbar  basketData={basketData} total={total}  deleteItem={deleteItem}/>
                <Routes>
                    <Route path="/" element={<MainPage  onItem={onItem} getID={getID}/>} />
                    <Route path="/Product/:itemID" element={<ItemElenet id={id} getID={getID} onItem={onItem}/>} />
                    <Route path="*" element={<MainPage  onItem={onItem} getID={getID}/>} />
                    <Route path="/Catalog" element={<CatalogPage onItem={onItem} getID={getID} />} /> 
                    <Route path="/bayPage" element={<BayPage basketData={basketData} total={total} />} /> 
                    <Route path="/AboutUs" element={<AboutUs />} /> 
                    <Route path="/Pay&Get" element={<PayOrder />} /> 
                    <Route path="/Client" element={<ClientMasenge />} /> 
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>

        </div>
    )
}

export default IndexPage
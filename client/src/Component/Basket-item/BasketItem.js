const BasketItem = ({fileFollder, Title, Price, deleteItem, Subtitle}) => {
    return(
        <li className="basketItem">
            <div>
                <img src={`/fileFolder/${fileFollder}/Main.jpg`} alt="Item" />
                <span className="Name">{Title}</span>
            </div>
            <div>
                
                <div className="number">{Price}грн</div>
               
            </div>
            <a href="#" uk-icon="icon: trash" onClick={() => deleteItem()}></a>
        </li>
    )
} 

export default BasketItem
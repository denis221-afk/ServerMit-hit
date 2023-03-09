const ItemSarch = ({index, Title, fileFollder, Price, Subtitle}) => {
    return(
        <li className="itemSarch">
            <div className="info">
            <span>{index + 1}</span>
            <img src={`fileFolder/${fileFollder}/Main.jpg`} alt="Item" />
            <span>{Title}</span>
            <span>({Subtitle})</span>
            </div>
            <span>{Price}грн</span>
        </li>
    )
}

export default ItemSarch;
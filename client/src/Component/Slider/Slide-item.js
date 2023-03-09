import Images1 from '../../Assets/Images/Images_1.jpg';
const SlideItem = ({url, descer, id}) => {
    return (
    <li className="silde_item">
        <div className='info'>
          <div className='slide_descer'>{descer}</div>
          <a href={id} className='uk-button uk-button-danger btn'>Прийти</a>  
        </div>
         <img src={url} alt="Box" />
    </li>
    )
}

export default SlideItem
import React, { useState, useEffect } from 'react';
import Loadding from '../../Assets/Loadding/Main.mp4';
import LoaddingMobile from '../../Assets/Loadding/Main(Inst).mp4'

const Loaddings = () => {
  const [videoSrc, setVideoSrc] = useState(Loadding);
  
  useEffect(() => {
    function handleResize() {
      const isMobile = window.innerWidth <= 767; // Задайте тут значення, яке визначає, що це мобільний пристрій
      if (isMobile) {
        setVideoSrc(LoaddingMobile);
      } else {
        setVideoSrc(Loadding);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
       <video className='Loadding' src={videoSrc} muted={true} autoPlay={true} playsInline={true}></video>
    </>
  );
};

export default Loaddings;










// import Loadding from '../../Assets/Loadding/Main.mp4';
// const Loaddings = () => {

//     return(
//        <>
//          <video className='Loadding' src={Loadding} muted={true} autoPlay={true} playsInline={true}></video>
//        </>
//     )
// }

// export default Loaddings




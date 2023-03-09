import { useEffect, useState } from "react";
import ChoseOrder from "../Component/BaySteps/choseOrder";
import NPstep from "../Component/BaySteps/NPstep";
import StepOne from "../Component/BaySteps/StepOne";

const BayPage = ({basketData, total}) => {
    const [content, setContent] = useState(); 


    const data = JSON.parse(localStorage.getItem('userData'));
    const chose = JSON.parse(localStorage.getItem('cohoseStatus'));



    useEffect(() => {
        setContent(<StepOne step={() =>stepNext()} />)
    },[])

   function stepNext() {
        setContent(<ChoseOrder finalPage={(status) => finalPage(status)} basketData={basketData} total={total} />)
    }


    function finalPage(status) {     
        if(status) {
            setContent(<NPstep basketData={basketData} total={total} />)
        }
    }

    return(
        <div className="Bay_warapper">
            {content}
        </div>
    )
}
export default BayPage;
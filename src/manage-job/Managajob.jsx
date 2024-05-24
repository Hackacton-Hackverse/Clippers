import './managejob.css'
import {useEffect, useState} from "react";
import axiosInstance from "../axios.js";


function Managajob(props) {
    const [offers, setOffers] = useState({});
    const [isloadind, setIsloadind] = useState(true)
    useEffect(() => {
        if (props.isAuthenticated===true) {
                axiosInstance.get(`/user/offre`)
                    .then(function (response) {
                        console.log(response)
                        setOffers(response.data)
                        setIsloadind(false)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        }

        // eslint-disable-next-line react/prop-types
    }, [props.isAuthenticated]);
    if(isloadind===true){
        return <div>is loading</div>
    }
    return (
        <div>
            <img src={offers[0].lienphoto} className="image-job"/>
            <div><strong>Nom </strong>{offers[0].name}</div>
            <div><strong>Description </strong>{offers[0].description}</div>
        </div>

    );
}

export default Managajob;
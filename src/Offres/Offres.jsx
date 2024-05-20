import "./TemplateOffre.css"
import "/src/Accueil/Accueil.css"

import React, {useEffect, useState} from 'react';
import TemplateOffre from "./TemplateOffre.jsx";
import axiosInstance from "../axios.js";

function Offres(props) {

    const [offres, setOffres]=useState([]);

    const getoffres = async () => {
        try{
            const response = await  axiosInstance.get("/offres")
            setOffres(response.data)
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.title = 'Offres';
        getoffres();
    }, []);

    return (
        <div className="offre">
            <div className="container">
                <div className="lastoffer">
                    <div className="center-title"><h1>Ensembles des offres d'emploi dispo</h1></div>

                    <div className="all-offer">
                        {offres.map((offres,index) => (
                            // eslint-disable-next-line react/jsx-key
                            <TemplateOffre  offer_id ={offres.id} source={offres.lienphoto} title={offres.name} date={offres.created_at} description={offres.description} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offres;

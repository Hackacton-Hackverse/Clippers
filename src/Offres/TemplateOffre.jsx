import React from 'react';
import "./TemplateOffre.css"
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios.js";

// Récupérer l'UUID du cookie

function TemplateOffre(props) {
    const navigate = useNavigate();


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}-${month}-${year} : ${hours}:${minutes}`;
    };


    const postuler = async (e) =>{
        e.preventDefault();
        try {
            const formData = {
                offer_id: props.offer_id,
            };
            const response = await axiosInstance.post('/offre-cv', formData);
            if(response.status === 201){
                console.log(response.data);
                alert("vous avez souscrit avec succes a cet offre d'emploi une conversation a ete initialise vous la verrez dans les conversations")
            } else if (response.status === 422){
                alert("vous n'avez pas de cv creer en un d'abord")
                navigate('/cv')
            } else {
                alert("probleme de serveur ressayer plus tard")
            }
                    // Faites quelque chose avec la réponse réussie
        } catch (error) {
            console.error(error);
            // Gérez l'erreur renvoyée par Axios
        }


    }
    return (
        <div className="offers">
            <div className="offer">
                <div className="about-job">
                    <div className="containerimg-job">
                        <img src={props.source} alt={props.title} className="imgJob"/>
                    </div>
                    <div className="description-job">
                        <h3 className="title-job">{props.title}</h3>
                        <p className="date-online-job">{formatDate(props.date)}</p>
                        <p className="small-info">{props.description}</p>
                        <div className="Postuler">
                            <button onClick={postuler}>
                                Postuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateOffre;
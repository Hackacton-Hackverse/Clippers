import React from 'react';
import "./TemplateOffre.css"
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";
import axios from "axios";

// Récupérer l'UUID du cookie

function TemplateOffre(props) {
    const navigate = useNavigate();
    const cvUuid = Cookies.get('cv_uuid');

    const postuler = async (e) =>{
        e.preventDefault();
        if (cvUuid !== undefined) {
            // L'UUID est défini

            console.log(cvUuid)

                try {
                    const formData = {
                        id_offer: 1,
                        uuid_user: "9be52a31-82fe-476e-b639-abf08e2a3a68",
                    };

                    const response = await axios.post('http://127.0.0.1:8000/api/offeruser', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log(response.data);
                    alert("vous avez souscrit avec succes a cet offre d'emploi")
                    // Faites quelque chose avec la réponse réussie
                } catch (error) {
                    console.error(error);
                    // Gérez l'erreur renvoyée par Axios
                }

        } else {
            // L'UUID n'est pas défini
            alert("your cv doesn't exist")
            navigate('/cv')
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
                        <p className="date-online-job">{props.date}</p>
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
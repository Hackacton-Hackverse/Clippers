import "./Accueil.css"
import TemplateOffre from "../Offres/TemplateOffre.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "../axios.js";

function Accueil() {

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
        document.title = 'Pipo-app';
        getoffres()
    }, []);
    return (
        <div className="accueil">
            <div className="header">
                <div className="overlay"></div>
                <h1>
                    <strong>Bienvenue chez JobClippers</strong>
                </h1>
                <p>
                    Trouvez votre emploi de rêve parmi nos offres exclusives. Rejoignez-nous aujourd'hui et boostez votre carrière!

                </p>

                <button className='decouvrir'>Découvrir</button>
            </div>
            <div className="aboutus">
                <h1>À Propos de Nous</h1>
                <p>
                    Nous sommes des personnes voulant que toutes personnes ayant des competences necessaires dans un domaines soit en mesure de trouver facilement un emploi, un stage, un job.
                </p>
                <p>
                    consulter toutes nos offres d'emploi et de stage ou celle cncernant votre domaine dans la section <a href="#">Offre</a>
                </p>
                <p>
                    Rejoignez nous maintenant pour ne rien rater
                </p>
            </div>
            <div className="container">
                <div className="lastoffer">
                    <div className="center-title"><h1>Dernières Offres d'Emploi</h1></div>
                    <div className="all-offer">
                        {offres.map((offre, index) => {
                            if (index < 4) {
                                return (
                                    <TemplateOffre
                                        key={offre.id}
                                        offer_id={offre.id}
                                        source={offre.lienphoto}
                                        title={offre.name}
                                        date={offre.created_at}
                                        description={offre.description}
                                    />
                                );
                            }
                            return null; // Ignorer les éléments après la 4e itération
                        })}
                    </div>

                </div>
            </div>
            <div className="register">
                <h1>Rejoignez-nous pour un avenir brillant</h1>
            </div>

        </div>
    );
}

export default Accueil;
import "./Accueil.css"
import TemplateOffre from "../Offres/TemplateOffre.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function Accueil() {
    return (
        <div className="accueil">
            <Navbar />
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
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
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
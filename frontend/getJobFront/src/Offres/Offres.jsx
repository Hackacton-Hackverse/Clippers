import "./TemplateOffre.css"
import "/src/Accueil/Accueil.css"

import React from 'react';
import TemplateOffre from "./TemplateOffre.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function Offres(props) {
    return (
        <div className="offre">
            <Navbar />
            <div className="container">
                <div className="lastoffer">
                    <div className="center-title"><h1>Ensembles des offres d'emploi dispo</h1></div>
                    <div className="all-offer">
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                        <TemplateOffre source="/imageJob/info.jpeg" title="Hackeur Pro" date="16 avril " description="Rejoignez nous maintenant"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offres;

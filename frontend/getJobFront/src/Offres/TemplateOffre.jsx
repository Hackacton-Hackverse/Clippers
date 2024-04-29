import React from 'react';
import "./TemplateOffre.css"
function TemplateOffre(props) {
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
                            <button>
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
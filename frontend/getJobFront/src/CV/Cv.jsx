import{ useEffect, useState, useRef } from 'react';
import "./Cv.css"
import Navbar from "../Navbar/Navbar.jsx";
import axios from "axios";
import Cookies from 'js-cookie';

function Cv() {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const inputFileRef = useRef(null);
    const [occupations, setoccupations] = useState([{
        datedebut: '',
        datefin:'',
        occupation:''

    }])
    const [formdata, setFormdata] = useState({
        name:'',
        uuid_user:"9be52a31-82fe-476e-b639-abf08e2a3a68",
        surname:'',
        email: '',
        tel:'',
        dob:'',
        git:'',
        wakatime:'',
        facebook:'',
        linkedin:'',
        instagram:'',
        twitter:'',
        photo:'',
        occupations: [{
            datedebut: '',
            datefin:'',
            occupation:''

        }]


    })

    const displayImage = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            // Lecture du fichier et stockage des données dans formdata
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormdata({
                    ...formdata,
                    photo: reader.result // Stockage des données de l'image dans formdata
                });
            };
            reader.readAsDataURL(selectedFile); // Lecture du fichier comme une URL de données
        }
    }


    const removeImage = () => {
        setFile(null);
        setPreview(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = null;
        }
        setFormdata({
            ...formdata,
            photo: null
        });
    }

    const handleOccupationChange = (event, index) => {
        let data = [...occupations];
        occupations[index][event.target.name] = event.target.value;

        setoccupations(data)
        setFormdata({
            ...formdata, occupations: data
        })
        console.log(index, event.target.name,formdata)

    }
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormdata({
            ...formdata, [name]:value
        })
    }


    const addfield = () => {
        let object = {
            datedebut: '',
            datefin:'',
            occupation:''
        }

        setoccupations([...occupations, object])
    }

    const removefield = (index)=>{
        if (index === 0) {
            alert("you must delete the first field")
        } else {
            let data = [...occupations]
            data.splice(index,1)
            setoccupations(data)
            setFormdata({
                ...formdata, occupations: data
            })
        }
    }

    const save = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            // Ajoutez les champs texte s'ils ont une valeur définie
            if (formdata.name) formData.append('name', formdata.name);
            if (formdata.uuid_user) formData.append('uuid_user', formdata.uuid_user);
            if (formdata.surname) formData.append('surname', formdata.surname);
            if (formdata.email) formData.append('email', formdata.email);
            if (formdata.tel) formData.append('tel', formdata.tel);
            if (formdata.dob) formData.append('dob', formdata.dob);
            if (formdata.git) formData.append('git', formdata.git);
            if (formdata.wakatime) formData.append('wakatime', formdata.wakatime);
            if (formdata.facebook) formData.append('facebook', formdata.facebook);
            if (formdata.linkedin) formData.append('linkedin', formdata.linkedin);
            if (formdata.instagram) formData.append('instagram', formdata.instagram);
            if (formdata.twitter) formData.append('twitter', formdata.twitter);

            // Ajoutez le fichier photo s'il est défini
            if (file) formData.append('photo', file);

            // Ajoutez les occupations (tableau d'objets) s'ils sont définis
            if (formdata.occupations && formdata.occupations.length > 0) {
                formdata.occupations.forEach((occupation, index) => {
                    if (occupation.datedebut) formData.append(`occupations[${index}][datedebut]`, occupation.datedebut);
                    if (occupation.datefin) formData.append(`occupations[${index}][datefin]`, occupation.datefin);
                    if (occupation.occupation) formData.append(`occupations[${index}][occupation]`, occupation.occupation);
                });
            }

            const response = await axios.post('http://127.0.0.1:8000/api/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Assurez-vous de définir le type de contenu sur 'multipart/form-data'
                },
            });

            const cvUuid = response.data.uuid;
            alert(cvUuid)

            // Stocker l'UUID dans les cookies
            Cookies.set('cv_uuid', cvUuid);

            console.log(response.data);
            // Faites quelque chose avec la réponse réussie
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.log('Validation failed:', error.response.data);
                // Gérez les erreurs de validation renvoyées par le serveur
            } else {
                console.error('Request failed:', error.message);
                // Gérez d'autres types d'erreurs
            }
        }
    };




    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div className="cvcontainer">
            <Navbar />
            <div className="cvform">
                <form>
                    <div className="headform">
                        <div className="photoUser">
                            {preview && <img src={preview} alt="Preview" className="yourprofilephoto"/>}
                        </div>
                        <div className="edit-delete-photo">
                            <label htmlFor="chooseFile" className="choosephoto">Choisir votre photo</label>
                            <input ref={inputFileRef} type="file" id="chooseFile" name="votre photo" accept="image/*"
                                   onChange={displayImage} style={{display: "none"}}/>
                            {preview &&
                                <button type="button" onClick={removeImage} className="removephoto">Supprimer</button>}

                        </div>
                    </div>
                    <div className="input-box">
                        <span>uuid_user</span>
                        <input
                            type='text'
                            name='uuid_user'
                            placeholder='uuid_user'
                            required
                            value={formdata.uuid_user}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>name</span>
                        <input
                            type='text'
                            name='name'
                            placeholder='name'
                            required
                            value={formdata.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>surname</span>
                        <input
                            type='text'
                            name='surname'
                            placeholder='surname'
                            value={formdata.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>date de naissance</span>
                        <input
                            type='date'
                            name='dob'
                            placeholder='date de naissance'
                            required
                            value={formdata.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>phone number</span>
                        <input
                            type='tel'
                            name='tel'
                            placeholder='phone number'
                            value={formdata.tel}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>Email</span>
                        <input
                            type='email'
                            name='email'
                            placeholder='email@email.com'
                            required
                            value={formdata.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>github</span>
                        <input
                            type='url'
                            name='git'
                            placeholder='https//lien git....'
                            value={formdata.git}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>wakatime</span>
                        <input
                            type='url'
                            name='wakatime'
                            placeholder='https//lien wakatime....'
                            value={formdata.wakatime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>Facebook</span>
                        <input
                            type='url'
                            name='facebook'
                            placeholder='https//lien facebook....'
                            value={formdata.facebook}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>Linkedin</span>
                        <input
                            type='url'
                            name='linkedin'
                            placeholder='https//lien linkedin....'
                            value={formdata.linkedin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>Twitter</span>
                        <input
                            type='url'
                            name='twitter'
                            placeholder='https//lien twitter....'
                            value={formdata.twitter}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <span>Instagram</span>
                        <input
                            type='url'
                            name='instagram'
                            placeholder='https//lien instagram....'
                            value={formdata.instagram}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="occupations">
                        {occupations.map((occ, index) => {
                            return (
                                <div className="input-box" key={index}>
                                    <div className="datejob"><input type="date" name="datedebut"
                                                                    placeholder="date de debut"
                                                                    value={occ.datedebut} required
                                                                    onChange={event => handleOccupationChange(event, index)}/>
                                    </div>
                                    <div className="datejob"><input type="date" name="datefin" placeholder="date de fin"
                                                                    value={occ.datefin}
                                                                    onChange={event => handleOccupationChange(event, index)}/>
                                    </div>
                                    <div className="occupation"><input type="text" name="occupation"
                                                                       placeholder="votre poste pendant cette periode"
                                                                       value={occ.occupation}
                                                                       required
                                                                       onChange={event => handleOccupationChange(event, index)}/>
                                    </div>
                                    <div>
                                        <button className="removeoccupation" onClick={() => removefield(index)}>remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        <button className="addoccupation" onClick={addfield}>Add more</button>

                    </div>
                    <div className="savemyform">
                        <button className="saveCv" onClick={save}>save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cv;

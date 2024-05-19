import {useState, useRef, useEffect} from 'react';
import './Addjob.css'
import {GoPaperclip} from "react-icons/go";
import axiosInstance from "../axios.js";

function Addjob() {

    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const inputFileRef = useRef(null);
    const [formdata, setFormdata] = useState({
        name:'',
        description:'',
        lienphoto:'',
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
                    lienphoto: reader.result // Stockage des données de l'image dans formdata
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

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormdata({
            ...formdata, [name]:value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        if(formdata.name && formdata.description  && formdata.lienphoto) {
            const formData = new FormData()
            formData.append('name', formdata.name);
            formData.append('description', formdata.description);
            formData.append('lienphoto', file);

            const response = await axiosInstance.post('/offre',formData);
            if (response.status === 201) {
                alert('votre offre a ete cree avec succes')
            }else {
                alert("votre offre n'a pas ete creer reessayer plus tard")
            }
        }else{
            alert('tu as oublie certain champ')
        }
    }

    useEffect(() => {
        if(!file){
            setPreview(null)
            return;
        }
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <div className="Addjob">
            <div className="container-Addjob">
                <form>
                    <label htmlFor="chooseImgJob" className="imageJob"><GoPaperclip className="paperclip"/>Choisir une
                        image</label>
                    <input
                        ref={inputFileRef}
                        name="image-job"
                        id="chooseImgJob"
                        type="file"
                        accept="image/*"
                        onChange={displayImage}
                        style={{display: "none"}}
                        // value={formdata.photo}
                        required/>
                    <div className="InputBox">
                        <span>name</span>
                        <input
                            type='text'
                            name='name'
                            placeholder='name'
                            required
                            value={formdata.name}
                            onChange={handleChange}/>
                    </div>
                    <div className="InputBox">
                        <span>description</span>
                        <textarea
                            type='text'
                            name='description'
                            placeholder='small description of the job'
                            required
                            value={formdata.description}
                            onChange={handleChange}>
                    </textarea>
                    </div>
                    <button className="validate" onClick={handleClick}>
                        OK
                    </button>
                </form>
                <div className="set-image">
                    {preview && <img src={preview} alt="Preview" className="imgJob" style={{zIndex: 10}}/>}
                    {!preview && <span className="default-message" style={{position: "absolute"}}>votre image sera affichée ici</span>}
                </div>
            </div>
        </div>
    );
}

export default Addjob;
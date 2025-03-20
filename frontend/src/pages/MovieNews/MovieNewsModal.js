import React, { useRef, useState } from "react";
import styles from "./MovieNewsModal.module.scss";
import { MdOutlineImage } from "react-icons/md";
import axiosInstance from "../../services/axiosInstance";

function MovieNewsModal({ isOpen, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState(""); //For showing preview
    // const [errorMsg, setErrorMsg] = useState("");
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            // const allowedTypes = ["image/jpeg", "im"]
            console.log("Selected file:", file); 
            setImageFile(file);    
        }
    };

    const handleUpload = async () => {

        if (!title.trim()) {
            alert("Please enter a movie title");
            return;
        }
        
        if(!imageFile) {
            alert("Please upload image");
            return;
        }

        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", imageFile); 
        console.log("Uploading data:", { title, description, imageFile });
        try {
            //console.log("Sending data to backend:", { title, description, imageFile });
    
            const response = await axiosInstance.post("/movienews/addmovienews", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
    
            if (response.status === 201) {
                alert("Movie News added successfully!");
                onClose();
                setTitle("");
                setDescription("");
                setImageFile(null);
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error adding movie news:", error.response?.data || error);
            alert("Failed to add movie news: " + (error.response?.data?.message || "Unknown error"));
        }
    };
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>✖</button>
                <h2>Add Movie News</h2>

                <label>Title</label>
                <div className={styles.inputContainer}>
                    
                    <input 
                        type="text"
                        placeholder="Enter movie title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.inputField}
                    />
                </div>
                
                <label>Description</label>
                <div className={styles.textarea}>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textAreaField}
                    />
                </div>
 
                <label>Thumbnail Image</label>
                <div className={styles.inputContainer}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
                    <input
                        type="text"
                        placeholder="Select Image"
                        onChange={() => {
                            setImageFile(null); 
                        }}
                        disabled={imageFile !== null} 
                            // className={styles.inputField}
                    />
                    <MdOutlineImage className={styles.icon} onClick={handleIconClick} />
                        {/* <button onClick={() => fileInputRef.current.click()} className={styles.uploadButton}>
                            Upload Image
                        </button> */}
                    
                </div>

                <div className={styles.modalActions}>
                    <button onClick={handleUpload} className={styles.add}>Upload News</button>
                </div>
            </div>
        </div>
    );
}

export default MovieNewsModal;

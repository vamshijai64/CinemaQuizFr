import axiosInstance from '../../../services/axiosInstance';
import styles from './MovieTitleModal.module.scss';
import { useRef, useState } from "react";
import { MdOutlineImage } from "react-icons/md";

function MovieTitlesModal({isOpen, onClose, sectionId}){
    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // setImageUrl(""); 
        }
    };

    const handleUpload = async () => {
        if(!title.trim()) {
            alert("Please enter movie title");
            return;
        }

        if(!imageFile) {
            alert("Please upload again");
            return;
        }
        console.log("section ID: ",sectionId);
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("imageUrl", imageFile);

        try{
            const response = await axiosInstance.post(`/title/addTitle/${sectionId}`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            if(response.status === 200) {
                alert("Movie title for reviews added successfully");
                // onReviewAdded();
                onClose();
                setTitle("");
                setImageFile(null);
                fileInputRef.current.value = "";
            }
        } catch (error) {
            console.error("Error Details:", error);
            alert("Failed to add movie title for reviews:" + (error.response?.data?.message || "unknown error"));
        }
    }


    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.cancel}>X</button>
                <label>Movie Title</label>
                <div className={styles.inputContainer}>
                    <input 
                        type="text"
                        placeholder="Enter Movie title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
        
                <label>Movie title Thumbnail Image</label>
                <div className={styles.inputContainer}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
                    <input
                        type="text"
                        placeholder="Select Image"
                        // value={imageUrl}
                        onChange={() => setImageFile(null)}
                        disabled={imageFile !== null} 
                    />
                    <MdOutlineImage className={styles.icon} onClick={handleIconClick} />
                </div>

                <div className={styles.modalActions}>
                    <button onClick={handleUpload} className={styles.add}>Upload Movie Title</button>
                </div>
            </div>
        </div>
    )
}

export default MovieTitlesModal;
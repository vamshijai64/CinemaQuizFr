import { useEffect, useRef, useState } from 'react';
import styles from './EditCategory.module.scss'
import { MdOutlineImage } from "react-icons/md";
import axiosInstance from '../../../services/axiosInstance';


function EditCategory({isOpen, onClose, categoryName, categoryId, imageUrl}) {
    const [categoryNewName, setCategoryNewName] = useState("");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setCategoryNewName(categoryName || "");
        setNewImageUrl(imageUrl || "");
    }, [categoryName,imageUrl]);

    if(!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setNewImageUrl("");
        }
    }

    const handleIconClick = () => {
        fileInputRef.current.click();
    }

    const handleEdit = async () => {
        if(!categoryNewName){
            alert("Please enter category name");
            return;
        }

        console.log("Name: ", categoryNewName);
        
        const formData = new FormData();
        // formData.append("name", categoryNewName);
        formData.append("title", categoryNewName);

        if(imageFile){
            formData.append("image", imageFile);
        } else {
            formData.append("imageUrl", imageUrl);
        }

        try{
            const response = await axiosInstance.put(`/categories/${categoryId}`,formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            if(response.status === 200) {
                alert("Category updated successfully");
                setCategoryNewName("");
                setNewImageUrl("");
                setImageFile(null);
                onClose(); 
            }
        } catch(error){
            console.error("Error updating category:", error?.response?.data || error.message);
            alert("Failed to edit category");
        }
    }
    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.cancel}>X</button>
                <label>Category Name</label>
                <div className={styles.inputContainer}>
                    <input type='text' 
                        value={categoryNewName || ""}
                        onChange={(e) => setCategoryNewName(e.target.value)}
                    />
                </div>

                <label>Category Url</label>
                <div className={styles.inputContainer}>
                    <input type='file' ref={fileInputRef} onChange={handleFileChange} hidden />
                    <input type='text' 
                        placeholder='Enter image URL'
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)} 
                        disabled={imageFile!==null}
                    />
                    <MdOutlineImage className={styles.icon}  onClick={handleIconClick}/>
                </div>  

                <div className={styles.modalActions}>
                    <button type='submit' onClick={handleEdit} className={styles.edit}>Edit Category</button>
                </div>
            </div>
        </div>
    )
}

export default EditCategory;

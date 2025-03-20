import { useRef, useState } from "react";
import styles from "./SubCategories.module.scss";
import { MdOutlineImage } from "react-icons/md";
import axiosInstance from "../../services/axiosInstance";

function SubCategories({ isOpen, onClose, categoryId }) {
    const [subcategoryName, setSubcategoryName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    console.log("Image: ",imageFile);
    
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageUrl(""); // Clear URL input when file is selected
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryId) {
            alert("Category ID is missing!");
            return;
        }

        const formData = new FormData();
        // formData.append("name", subcategoryName);
        formData.append("title", subcategoryName);

        formData.append("category", categoryId);
        if (imageFile) {
            formData.append("imageFile", imageFile); 
        } else {
            formData.append("imageUrl", imageUrl); 
        }

        try {
            await axiosInstance.post("/subcategories/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Subcategory added successfully!");
            setSubcategoryName("");
            setImageUrl("");
            setImageFile(null);
            onClose();
        } catch (error) {
            console.error("Error adding subcategory:", error);
            alert("Failed to add subcategory!");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.cancel}>X</button>
                <h2>Add Subcategory</h2>
                
                <label>Sub-Category Name</label>
                <div className={styles.inputContainer}>
                    <input 
                        type="text" 
                        placeholder="Enter subcategory name"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        required
                    />
                </div>

                <label>Sub-Category Thumbnail Image</label>
                <div className={styles.inputContainer}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
                    <input
                        type="text"
                        placeholder="Enter Image URL or Select Image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        disabled={imageFile !== null} // Disable if file is selected
                    />
                    <MdOutlineImage className={styles.icon} onClick={handleIconClick} />
                </div>

                <div className={styles.modalActions}>
                    <button onClick={handleSubmit} className={styles.add}>Add Subcategory</button>
                </div>
            </div>
        </div>
    );
}

export default SubCategories;

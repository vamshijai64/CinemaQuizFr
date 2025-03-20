import styles from "./CategoryModal.module.scss";
import { MdOutlineImage } from "react-icons/md";
import { useRef, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function CategoryModal({ isOpen, onClose, onCategoryAdded}) {
    const [categoryName, setCategoryName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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
            setImageUrl(""); // Clear URL input if a file is selected
        }
    };

    const handleUpload = async () => {
        if (!categoryName) {
            alert("Please enter category name");
            return;
        }

        const formData = new FormData();
        // formData.append("name", categoryName);
        formData.append("title", categoryName);

        if (imageFile) {
            formData.append("image", imageFile);
        } else if (imageUrl) {
            formData.append("imageUrl", imageUrl); 
        }

        try {
            const response = await axiosInstance.post("/categories/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                alert("Category added successfully!");
                onCategoryAdded();
                setCategoryName(""); 
                setImageUrl("");
                setImageFile(null);
                onClose(); 
                
            }
        } catch (error) {
            console.error("Error creating category:", error);
            alert("Failed to create category");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.cancel}>X</button>
                <label>Category Name</label>
                <div className={styles.inputContainer}>
                    <input 
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>

                <label>Category Thumbnail Image</label>
                <div className={styles.inputContainer}>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
                    <input
                        type="text"
                        placeholder="Enter Image URL or Select Image"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        disabled={imageFile !== null} // To Disable if the file is selected
                    />
                    <MdOutlineImage className={styles.icon} onClick={handleIconClick} />
                </div>

                <div className={styles.modalActions}>
                    <button onClick={handleUpload} className={styles.add}>Upload Category</button>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;

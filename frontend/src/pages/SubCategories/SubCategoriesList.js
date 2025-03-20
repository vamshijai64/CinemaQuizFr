import { useState, useEffect } from "react";
import styles from "./SubCategoriesList.module.scss";
import axiosInstance from "../../services/axiosInstance";
import AddQuiz from './AddQuiz/AddQuiz';

function SubCategoryList({ isOpen, onClose, categoryId }) {
    const [subcategories, setSubcategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState(null); // Track selected subcategory

    useEffect(() => {
        if (!categoryId || !isOpen) return; // Prevent API calls when modal is closed

        const fetchSubcategories = async () => {
            try {
                const response = await axiosInstance.get(`/categories/${categoryId}`);
                //console.log("Subcategories fetched:", response.data);
                setSubcategories(response.data.subcategories || []);
                // setCategoryName(response.data.name || "Unknown Category");
                // setCategoryImage(response.data.image || "");
                setCategoryName(response.data.title || "Unknown Category");
                setCategoryImage(response.data.imageUrl || "");
            } catch (error) {
                //console.error("Error fetching subcategories:", error);
                setSubcategories([]);
            }
        };

        fetchSubcategories();
    }, [categoryId, isOpen]);

    if (!isOpen) return null; // Hide modal if not open

    // const getImageUrl = (imagePath) => {
    //     if (!imagePath) return "";
    //     if (imagePath.startsWith("http")) return imagePath;
    
    //     const fullUrl = `http://36.255.253.67:3003${imagePath}`;
    //     // const fullUrl = `http://localhost:5000${imagePath}`;
    //     console.log("Formatted Image URL:", fullUrl); // Check if this logs correctly
    //     return fullUrl;
    // };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";

        if (imagePath.startsWith("http")) return imagePath;
    
        // Get the base URL from axiosInstance
        const baseUrl = axiosInstance.defaults.baseURL;
    
        // Construct the full URL dynamically
        const fullUrl = `${baseUrl}${imagePath}`;
        //console.log("Formatted Image URL:", fullUrl); // Debugging
        return fullUrl;
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                
                {/* Category Header with Image */}
                <h2>{categoryName}:</h2>
                
                {/* Subcategory List */}
                <div className={styles.subcategoryContainer}>
                    {subcategories.length > 0 ? (
                        subcategories.map((item) => (
                            <div key={item._id} className={styles.subcategoryCard}>
                                <img src={getImageUrl(item.imageUrl)} alt={item.title} className={styles.subcategoryImage} />

                        {/* <img src={getImageUrl(category.imageUrl)} alt="Category" style={{ width: "100px", height: "100px" }} /> */}

                                <p className={styles.subTitle}>{item.title}</p>
                                <button 
                                    className={styles.addQuiz} 
                                    onClick={() => setSelectedSubcategory(item)} // Open modal for specific subcategory
                                >
                                    Add Quiz
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No subcategories found.</p>
                    )}
                </div>
            </div>

            {/* AddQuiz Modal: Open when selectedSubcategory is not null */}
            {selectedSubcategory && (
                <AddQuiz
                    isOpen={true} 
                    onClose={() => setSelectedSubcategory(null)} 
                    subcategory={selectedSubcategory} 
                />
            )}
        </div>
    );
}

export default SubCategoryList;

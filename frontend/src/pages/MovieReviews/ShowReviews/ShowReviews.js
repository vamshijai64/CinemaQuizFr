import { useEffect, useState } from 'react';
import styles from './ShowReviews.module.scss';
import axiosInstance from '../../../services/axiosInstance';
import {  MdDelete } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

function ShowReviews({titleId, onBack}) {
    const [title, setTitle] = useState("");
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 5;  

    // if (!isOpen) return null; 

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                const response = await axiosInstance.get(`/title/getTitle/${titleId}`);
                setTitle(response.data.title);
                
            } catch(error){
                alert("Failed to get Title name");
            }
        }
    
        const fetchReviews = async () => {
            try{
                const response = await axiosInstance.get(`/review/reviews/${titleId}`);
                console.log("Hi",response.data.reviews);
                setReviews(response.data.reviews); 
                
            } catch(error){
                alert("Failed to get reviews");
            }
        };
        fetchTitle();
        fetchReviews();
    }, [titleId]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
    
        // Get the base URL from axiosInstance
        const baseUrl = axiosInstance.defaults.baseURL;
    
        // Construct the full URL dynamically
        const fullUrl = `${baseUrl}${imagePath}`;
        console.log("Formatted Image URL:", fullUrl); 
        return fullUrl;
    };

    const renderStars = (rating) => {
        const stars = [];
        for(let i=1; i<=5; i++){
            if(i<= Math.floor(rating)) {
                stars.push(<FaStar key={i} className={styles.starFilled} />) //This is for Full stars
            } else if(i === Math.ceil(rating) && rating% 1 !== 0) {
                stars.push(<FaStarHalfAlt key={i} className={styles.starHalf} />); //For Half stars
            } else {
                stars.push(<FaRegStar key={i} className={styles.starEmpty} />);  //For Empty stars
            }
        }
        return stars;
    }

    const handleDelete = async(reviewId) => {
            if(!window.confirm("Are you sure you want to delete this review?: ",reviewId)) return;
            console.log("Deleting review with ID:", reviewId);


            try{
                await axiosInstance.delete(`/review/admin/${reviewId}`);
                setReviews(reviews.filter(review => review.reviewId !== reviewId));
                alert("Review deleted successfully");

                if((currentPage-1) * reviewsPerPage >= reviews.length - 1) {
                    setCurrentPage(prev => Math.max(prev -1, 1));
                }
            } catch(error){
                alert("Failed to delete Review");
            }
    }

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div className={styles.review}>
            <div className={styles.title}>
                <button onClick={onBack} className={styles.backButton}>Back to Titles</button>
                <h2>Title: {title}</h2>

                {/* <h1>{titleId}</h1> */}
             </div>

             <div className={styles.reviewList}>
                {currentReviews.length>0 ? (
                    currentReviews.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewContent}>
                            <div className={styles.userInfo}>
                                
                                {/* <img 
                                    src={review.profileImage} 
                                /> */}

                                <img 
                                    src={getImageUrl(review.profileImage)}
                                    alt={`${review.username}'s profile`}
                                    className={styles.profileImage}
                                />
                                <div className={styles.userDetails}>
                                    <h3 className={styles.username}>{review.username}</h3>
                                    <div className={styles.rating}>{renderStars(review.rating)}</div>
                                </div>
                            </div>
                            
                                <p className={styles.reviewText}>{review.reviewText}</p>
                            </div>
                            <button className={styles.deleteButton} onClick={() => handleDelete(review.reviewId)}>
                                <MdDelete />
                            </button>
                        </div>

                    ))
                ) : (
                    <p>No reviews found for this title</p>
                )}
             </div>

             <div className={styles.pagination}>
                <button 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className={styles.pageButton}
                >
                    Prev
                </button>
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
                    <button 
                        key={i + 1} 
                        onClick={() => paginate(i + 1)} 
                        className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)} 
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
        
    );
}

export default ShowReviews; 
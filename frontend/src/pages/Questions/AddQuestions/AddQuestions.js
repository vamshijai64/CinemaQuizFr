import styles from "./AddQuestions.module.scss";
import { MdOutlineImage } from "react-icons/md";

function AddQuestions() {
    return (
        <div>
            {/* <div className={styles.addQuestions}>
                <h2 className={styles.title}>Questions module</h2>
            </div> */}

            <div className={styles.selectContainer}>
                <div className={styles.dropdown}>
                    <label>Category Name</label>
                    <select>
                        <option value="">Select Category</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Subcategory Name</label>
                    <input type="text" placeholder="Enter subcategory name" />
                </div>
            </div>
            
            <div className={styles.thumbnailContainer}>
                <div className={styles.thumbnailLabel}>
                    <label>SubCategory Thumbnail Image</label>
                </div>
                <div className={styles.inputWrapper}>
                    <input type="file"  hidden />
                    <input 
                        type="text" 
                        placeholder="Enter Image URL or Select Image"     
                    />
                    <MdOutlineImage className={styles.icon} />
                </div>
            </div>
                
            <div className={styles.inputContainer1}>
                <div className={styles.thumbnailLabel}>
                    <label>Question Title</label>
                </div>
                <input type="text" placeholder="Enter Question"  />
            </div>

            <div className={styles.selectContainer}>
                <div className={styles.inputContainer}>
                    <label>Option A</label>
                    <input type='text' placeholder='Enter Option A' ></input>
                </div>
                <div className={styles.inputContainer}>
                    <label>Option B</label>
                    <input type='text' placeholder='Enter Option B' ></input>
                </div>
            </div>
            
            <div className={styles.selectContainer}>
                <div className={styles.inputContainer}>
                    <label>Option C</label>
                    <input type='text' placeholder='Enter Option C' ></input>
                </div>
                <div className={styles.inputContainer}>
                    <label>Option D</label>
                    <input type='text' placeholder='Enter Option D' ></input>
                </div>
            </div>

            <div className={styles.customDropdown}>
                <label>Correct Answer</label>
                <select >
                    <option value="">Select Correct Answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                </select>
            </div>
            <br />
            <div className={styles.textarea}>
                <label>Hint</label>
                <textarea 
                    placeholder="Your text here"
                    className={styles.textareaField} 
                                        
                />
            </div>

            <div className={styles.modalActions}>
            
                
                    <button className={styles.prev} >Prev</button>
                
                    <button className={styles.submitButton} >
                        Upload Question
                    </button>
            
                    <button className={styles.next} >Next</button>
            </div>
        </div>
    );
}

export default AddQuestions;

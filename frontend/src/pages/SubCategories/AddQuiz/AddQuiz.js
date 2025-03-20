import styles from './AddQuiz.module.scss';
import {useState} from "react";
import axiosInstance from "../../../services/axiosInstance";


function AddQuiz({ isOpen, onClose, subcategory }) {
    const [questions, setQuestions] = useState([]); // For storing all questions
    const [currentIndex, setCurrentIndex] = useState(0); // For tracking current question index
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState({A:"", B:"", C:"", D:""});
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [hint, setHint] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Handling input changing for question
    const handleQuestionChange = (e) => setQuestion(e.target.value);

    //Handling input change for options
    const handleOptionChange = (option, value) => {
        setOptions((prevOptions) => ({...prevOptions, [option]: value}));
    }

    const handleNext = () => {
        if (!question || !options.A || !options.B || !options.C || !options.D || !correctAnswer) {
            setError("All fields are required before adding a new question.");
            return;
        }
    
        const newQuestion = {
            question,
            options: [
                { id: "A", name: options.A },
                { id: "B", name: options.B },
                { id: "C", name: options.C },
                { id: "D", name: options.D }
            ],
            correctOption: { id: correctAnswer, name: options[correctAnswer] },
            hint
        };
    
        let updatedQuestions = [...questions];
    
        if (currentIndex < questions.length) {
            // Update an existing question
            updatedQuestions[currentIndex] = newQuestion;
        } else {
            // Add a new question
            updatedQuestions.push(newQuestion);
        }
    
        setQuestions(updatedQuestions); // Save to state
        const nextIndex = currentIndex + 1;

    if (nextIndex < updatedQuestions.length) {
        // Load existing next question
        const nextQuestion = updatedQuestions[nextIndex];
        setQuestion(nextQuestion.question);
        setOptions({
            A: nextQuestion.options.find(opt => opt.id === "A")?.name || "",
            B: nextQuestion.options.find(opt => opt.id === "B")?.name || "",
            C: nextQuestion.options.find(opt => opt.id === "C")?.name || "",
            D: nextQuestion.options.find(opt => opt.id === "D")?.name || "",
        });
        setCorrectAnswer(nextQuestion.correctOption.id);
        setHint(nextQuestion.hint);
    } else {
        // Reset fields for a new question
        setQuestion("");
        setOptions({ A: "", B: "", C: "", D: "" });
        setCorrectAnswer("");
        setHint("");
    }

    setCurrentIndex(nextIndex);
    setError(null);
    };
    

    const handlePrevious = () => {
        if (currentIndex === 0) return;  // Prevent going below 0
    
        const prevQuestion = questions[currentIndex - 1];
    
        // Restore previous question fields
        setQuestion(prevQuestion.question);
        setOptions({
            A: prevQuestion.options.find(opt => opt.id === "A")?.name || "",
            B: prevQuestion.options.find(opt => opt.id === "B")?.name || "",
            C: prevQuestion.options.find(opt => opt.id === "C")?.name || "",
            D: prevQuestion.options.find(opt => opt.id === "D")?.name || "",
        });
        setCorrectAnswer(prevQuestion.correctOption.id);
        setHint(prevQuestion.hint);
    
        setCurrentIndex(currentIndex - 1);  // Move to previous index
    };
    


    //Handle Form submission
    const handleSubmit = async () => {
        console.log("Questions before submitting:", questions);
    
        if (!question || !options.A || !options.B || !options.C || !options.D || !correctAnswer) {
            setError("All fields are required before submitting.");
            return;
        }
    
        setLoading(true);
        setError(null);
    
        let updatedQuestions = [...questions];
    
        // Add or update the laaast question before submitting
        const newQuestion = {
            question,
            options: [
                { id: "A", name: options.A },
                { id: "B", name: options.B },
                { id: "C", name: options.C },
                { id: "D", name: options.D }
            ],
            correctOption: { id: correctAnswer, name: options[correctAnswer] },
            hint
        };
    
        if (currentIndex < questions.length) {
            // Updating an existing question
            updatedQuestions[currentIndex] = newQuestion;
        } else {
            // Adding a new question
            updatedQuestions.push(newQuestion);
        }
    
        console.log("Final Questions before API call:", updatedQuestions); 
    
        const quizData = {
            subcategory: subcategory?._id,
            category: subcategory?.category,
            questions: updatedQuestions
        };
    
        try {
            const response = await axiosInstance.post("/quizzes/create", quizData);
            console.log("Question added successfully", response.data);
            alert("Question added successfully");
            resetForm();
        } catch (error) {
            console.error("Error adding Quiz: ", error);
            setError("Failed to save the quiz. Please try again.");
        }
    
        setLoading(false);
    };

    const resetForm = () => {
            setQuestions([]);
            setCurrentIndex(0);
            setQuestion("");
            setOptions({ A: "", B: "", C: "", D: "" });
            setCorrectAnswer("");
            setHint("");
            onClose();
    }
    
    
    return (
        <div className={styles.quizModalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.quizModalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Adding Quiz for: {subcategory?.title}</h2>

                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.QuesNumber}>Question ({currentIndex + 1})</p>
                <label>Question Title</label>
                <div className={styles.inputContainer}>
                    <input type='text' placeholder='Enter Question' value={question} onChange={handleQuestionChange}/>
                </div>

                <div className={styles.optionsContainer}>
                    <div className={styles.optionBox}>
                        <label>Option A</label>
                        <input type='text' placeholder='Enter Option A' value={options.A} onChange={(e) => handleOptionChange("A", e.target.value)}></input>
                    </div>
                    <div className={styles.optionBox}>
                        <label>Option B</label>
                        <input type='text' placeholder='Enter Option B' value={options.B} onChange={(e) => handleOptionChange("B",e.target.value)}></input>
                    </div>
                </div>

                <div className={styles.optionsContainer}>
                    <div className={styles.optionBox}>
                        <label>Option C</label>
                        <input type='text' placeholder='Enter Option C' value={options.C} onChange={(e) => handleOptionChange("C", e.target.value)}></input>
                    </div>
                    <div className={styles.optionBox}>
                        <label>Option D</label>
                        <input type='text' placeholder='Enter Option D' value={options.D} onChange={(e) => handleOptionChange("D", e.target.value)}></input>
                    </div>
                </div>

                {/* Correct Answer Dropdown */}
                <div className={styles.customDropdown}>
                    <label>Correct Answer</label>
                        <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
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
                            value={hint}
                            onChange={(e) => setHint(e.target.value)}
                        />
                </div>

                <div className={styles.modalActions}>

                    {currentIndex>0 && (
                        <button className={styles.prev} onClick={handlePrevious}>Prev ({currentIndex})</button>
                    )}
                    <button className={styles.submitButton} onClick={handleSubmit} disabled={loading}>
                        {loading ? "Uploading..." : "Upload Question"}
                    </button>

                    <button className={styles.next} onClick={handleNext}>Next ({currentIndex+2})</button>
                </div>
            </div>
        </div>
    );
}

export default AddQuiz

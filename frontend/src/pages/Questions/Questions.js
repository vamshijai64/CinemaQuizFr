import { useState } from 'react';
import styles from './Questions.module.scss';
import AddQuestions from './AddQuestions/AddQuestions';
import Add from './AddQuestions/Add';

function Questions() {
    const [showAddQuestion, setShowAddQuestion] = useState(false);

    if (showAddQuestion) {
        // return <AddQuestions onBack={() => setShowAddQuestion(false)} />;
        return <Add onBack={() => setShowAddQuestion(false)} />;
    }

    return (
        <div className={styles.main}>
            <div className={styles.questions}>
                <h2 className={styles.title}>All Questions</h2>
                <div>
                    <button 
                        className={styles.add} 
                        onClick={() => setShowAddQuestion(true)}
                    >
                        + Add Question
                    </button>
                    <button className={styles.add}>Import Questions</button>
                </div>
            </div>
        </div>
    );
}

export default Questions;

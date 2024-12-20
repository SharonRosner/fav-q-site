import axios from 'axios';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import QuotesTable from './quotesTable';
import { BE_URL } from '../../config';

import './style.scss';

const NUMERIC_ALLOWED_CHARS = '1234567890'.split('');

function Quotes(props) {
    const [numberOfQuotes, setNumberOfQuotes] = useState(1);
    const [tag, setTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quoteList, setQuoteList] = useState([]);

    const onNumericKeyDown = (event) => {
        if (event.keyCode === 8) return;

        const currentChar = event.key;
        if (!NUMERIC_ALLOWED_CHARS.includes(currentChar)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    const submit = async () => {
        setIsSubmitting(true);

        const results = await axios.post(`${BE_URL}/favQ/getRandomQuotes`, { number: numberOfQuotes, tag });
        setQuoteList(results?.data);

        setIsSubmitting(false);
    }

    const renderInputContainer = () => {
        return <div className='input-container'>
            <div className='prompt'>Please enter number of desired random quotes: </div>
            <TextField type='number' value={numberOfQuotes} onKeyDown={onNumericKeyDown} onChange={(e) => setNumberOfQuotes(e.target.value)} />
            <div className='prompt'>Provide tag(optional, replaces randomality): </div>
            <TextField value={tag} onChange={(e) => setTag(e.target.value)} />
            <Button className='submit-button' disabled={isSubmitting} onClick={submit}> SUBMIT </Button>
        </div>;
    }

    const renderOutputContainer = () => {
        return <div className='output-container'>
            {
                isSubmitting ?
                    <div className='loader-wrapper'><CircularProgress /> </div>
                    :
                    <QuotesTable quotes={quoteList} />
            }
        </div>;
    }

    return (
        <div className='quotes-main'>
            {renderInputContainer()}
            {renderOutputContainer()}
        </div>
    );

}

export default Quotes;
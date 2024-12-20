import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

import './style.scss';

function QuotesTable(props) {
    const { quotes } = props;

    const renderTableHeaders = () => {
        return (
            <TableRow>
                <TableCell>Quote</TableCell>
                <TableCell>Author</TableCell>
            </TableRow>
        );
    }

    const renderTableRow = (quote, index) => {
        return (
          <TableRow key={'quote-row-'+index}>
            <TableCell>{quote.body}</TableCell>
            <TableCell>{quote.author}</TableCell>
          </TableRow>
        );
      }

    return (
        <div className='quotes-table'>
            <TableContainer className='quotes-table-element' component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        {renderTableHeaders()}
                    </TableHead>
                    <TableBody>
                        {quotes.map((quote, i) => {
                            return renderTableRow(quote, i);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default QuotesTable;
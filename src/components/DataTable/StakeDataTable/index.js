import * as React from 'react';
import { Button, IconButton, Paper } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import { makeStyles } from '@mui/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BACKEND_URL } from '../../../static/constants';
import { Box } from '@mui/system';

const useStyles = makeStyles(() => ({
    root : {
        "& .MuiTableCell-root" : {
            cursor : "pointer" ,
            color : "black" ,
            textAlign : 'center'
        },
        "& .MuiPaper-root" : {
            overflowX : "scroll" ,
            marginTop : '20px'
        },
        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                backgroundColor : "lightgray" ,
                fontWeight : "bold" 
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root:nth-child(even)" :{
                backgroundColor : "lightgray" ,
            },
            "& .MuiTableRow-root:hover": {
                backgroundColor: "#aaa !important",
            },
            "& .MuiTableRow-root:active": {
                backgroundColor: "#ddd !important",
            },
        },
        "& .MuiTablePagination-root" : {
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        }
    }
}));

const TokenDataTable = (props) => {

    const classes = useStyles();

    const {
        tableheader,
        tabledata,
        removeHandleClick,
        stakeHandleClick,
    } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.root}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Table aria-label="custom pagination table">
                    <TableHead  > 
                        <TableRow >
                        {
                            tableheader.map((row, i) => (
                                <TableCell key={i}>{row}</TableCell>
                            ))
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? tabledata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tabledata
                        ).map((row, i) => (
                            <TableRow key={i} onClick = {(event) => stakeHandleClick(event, i)}>
                                <TableCell ><img src={BACKEND_URL + row.token_id.logo_url} style={{width:30, height:30}}/>{row.token_id.symbol}</TableCell>
                                <TableCell >{row.product}</TableCell>
                                <TableCell >{row.est_apy}%</TableCell>
                                <TableCell >{row.finish_date.toString().split("T")[0]}</TableCell>
                                <TableCell > 
                                    <Button onClick={(event) => removeHandleClick(event, row._id, page * rowsPerPage + i)} variant='contained' color='error' size='small' sx={{ p: '10px' }} aria-label="remove" >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter >
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100, { label: 'All', value: -1 }]}
                                colSpan={12}
                                count={tabledata.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    select: {
                                        'aria-label': 'rows per page',
                                    },
                                    actions: {
                                        showFirstButton: true,
                                        showLastButton: true,
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </div>
    );
}
export default TokenDataTable ;
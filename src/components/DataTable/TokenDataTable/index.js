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
        approveHandleClick,
        denyHandleClick,
        removeHandleClick,
        uploadShortVersionHandleClick,
        uploadLongVersionHandleClick,
        tokenHandleClick,
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
                            <TableRow key={i} onClick = {(event) => tokenHandleClick(event, i)}>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.symbol}</TableCell>
                                <TableCell >{row.decimal}</TableCell>
                                <TableCell >{row.pair_type}</TableCell>
                                <TableCell ><img src={BACKEND_URL + row.logo_url} style={{width:30, height:30}}/></TableCell>
                                <TableCell style={{minWidth:"120px"}}>
                                    <Box component="a" href={BACKEND_URL + row.short_version_pdf_url} target="_blank">
                                        <IconButton   style={row.short_version_pdf_url?{}:{ display: 'none' }}>
                                            <VisibilityIcon color='primary' />
                                        </IconButton>
                                    </Box>
                                    <input
                                        style={{ display: 'none' }}
                                        id={"short_version_file" + i}
                                        type="file"
                                        onChange={(event) => uploadShortVersionHandleClick(event, row._id)}
                                    />
                                    <label htmlFor={"short_version_file" + i}>
                                        <IconButton variant="raised" component="span" color='success'> S </IconButton>
                                    </label>
                                </TableCell>
                                
                                <TableCell style={{minWidth:"120px"}}>
                                    <Box component="a" href={BACKEND_URL + row.long_version_pdf_url} target="_blank">
                                        <IconButton   style={row.long_version_pdf_url?{}:{ display: 'none' }}>
                                            <VisibilityIcon color='primary' />
                                        </IconButton>
                                    </Box>
                                    <input
                                        style={{ display: 'none' }}
                                        id={"long_version_file" + i}
                                        type="file"
                                        onChange={(event) => uploadLongVersionHandleClick(event, row._id)}
                                    />
                                    <label htmlFor={"long_version_file" + i}>
                                        <IconButton variant="raised" component="span" color='success'> L </IconButton>
                                    </label>
                                </TableCell>
                                <TableCell >{row.status}</TableCell>
                                <TableCell style={{minWidth:"270px"}}> 
                                    <Button onClick={(event) => approveHandleClick(event, row._id, page * rowsPerPage + i)} variant='contained' color='primary' size='small' sx={{ p: '10px' }} aria-label="approve" disabled={row.status == 'approved'}>
                                        Approve
                                    </Button>
                                    <Button onClick={(event) => denyHandleClick(event, row._id, page * rowsPerPage + i)} variant='contained' color='secondary' size='small' sx={{ p: '10px' }} aria-label="deny" disabled={row.status == 'denied'}>
                                        Deny
                                    </Button>
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
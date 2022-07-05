import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Rule } from '@prisma/client';
import { get, post } from '../../fetch';
import { utcDayjs } from '../../../utils';
import EditRules from './update';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

async function fetchRules() {
  const res = await get('b/rule/query');
  const json = await res.json();
  return json.data;
}

export default function CustomizedTables() {
  const [rules, setRules] = useState<Array<Rule>>([]);
  const [editRule, setEditRule] = useState(false);
  const [currentRule, setCurrentRule] = useState<Rule>();

  const handleOpen = () => {
    setEditRule(true);
  };
  const handleClose = () => {
    setEditRule(false);
  };

  useEffect(() => {
    (async () => {
      const rules = await fetchRules();
      setRules(rules);
    })();
    return () => {};
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>任务名</StyledTableCell>
              <StyledTableCell align='right'>任务类型</StyledTableCell>
              <StyledTableCell align='right'>Function</StyledTableCell>
              <StyledTableCell align='right'>优先级</StyledTableCell>
              <StyledTableCell align='right'>最后更新时间</StyledTableCell>
              <StyledTableCell align='right'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((rule) => (
              <StyledTableRow key={rule.id}>
                <StyledTableCell component='th' scope='row'>
                  {rule.name}
                </StyledTableCell>
                <StyledTableCell align='right'>{rule.type}</StyledTableCell>
                <StyledTableCell align='right'>
                  <Button
                    variant='text'
                    onClick={() => {
                      setCurrentRule(rule);
                      setEditRule(true);
                    }}
                  >
                    查看/修改函数
                  </Button>
                </StyledTableCell>
                <StyledTableCell align='right'>{rule.priority}</StyledTableCell>
                <StyledTableCell align='right'>
                  {utcDayjs(rule.updatedAt).format('M月D日 HH:mm')}
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <Button variant='text' onClick={() => {}}>
                    编辑
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editRule && (
        <EditRules
          rule={currentRule}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
    </>
  );
}

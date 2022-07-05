import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { $get, $post } from '../../fetch';
import { RobotType } from '@prisma/client';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const StyledFormControl = styled(FormControl)`
  margin: 20px 0;
`;

export default function RobotEdit() {
  const [robotTypes, setRobotTypes] = useState<Array<RobotType>>([]);

  const [robotTypeId, setRobotTypeId] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [secret, setSecret] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSaveRobot() {
    setLoading(true);
    const robot = await $post('/api/b/robot/create', {
      name,
      token,
      secret,
      robotTypeId,
    });

    console.log(robot);

    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const types = await $get('/api/b/robotType/query');
      setRobotTypes(types);
    })();
    return () => {};
  }, []);

  return (
    <Box component='form' noValidate autoComplete='off'>
      <Container>
        <Typography variant='h5'>创建一个机器人吧 🤖️</Typography>
        <StyledFormControl fullWidth>
          <TextField
            required
            id='outlined-required'
            label='起一个名字吧'
            defaultValue=''
            onChange={(event) => {
              setName(event.target.value as string);
            }}
          />
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <InputLabel id='type-select-label'>是什么类型</InputLabel>
          <Select
            labelId='type-select-label'
            id='type-simple-select'
            value={robotTypeId}
            input={<OutlinedInput label='机器人类型' />}
            onChange={(event: SelectChangeEvent) => {
              setRobotTypeId(event.target.value as string);
            }}
          >
            {robotTypes.map((robotType) => {
              return (
                <MenuItem key={robotType.id} value={robotType.id}>
                  {robotType.name}
                </MenuItem>
              );
            })}
          </Select>
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <TextField
            id='outlined-required'
            label='密钥（可选）'
            defaultValue=''
            onChange={(event) => {
              setSecret(event.target.value as string);
            }}
          />
        </StyledFormControl>

        <StyledFormControl fullWidth>
          <TextField
            id='outlined-required'
            label='Token（可选）'
            defaultValue=''
            onChange={(event) => {
              setToken(event.target.value as string);
            }}
          />
        </StyledFormControl>

        <LoadingButton
          loading={loading}
          loadingPosition='start'
          startIcon={<SaveIcon />}
          variant='outlined'
          onClick={() => handleSaveRobot()}
        >
          创建
        </LoadingButton>
      </Container>
    </Box>
  );
}

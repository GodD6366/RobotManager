import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { Prisma, Robot, Rule } from '@prisma/client';
import { get, post } from '../../fetch';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Partiall } from '../../../types';
import { Box, Button, Modal } from '@mui/material';

async function fetchRobots() {
  const res = await get('b/robot/query');
  const json = await res.json();
  return json.data;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function EditRules(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [robots, setRobots] = useState<Array<Robot>>([]);
  const { rule, handleOpen, handleClose } = props;

  useEffect(() => {
    (async () => {
      const robots = await fetchRobots();
      setRobots(robots);
    })();
    return () => {};
  }, []);

  let tempcode = '';
  function onRuleCodeChange(code) {
    tempcode = code;
  }

  async function onRuleUpdate() {
    const result = await post('b/rule/update', {
      id: rule.id,
      func: tempcode,
    });
    const json = await result.json();
    if (json.success) {
      tempcode = '';
      handleClose();
    }
  }

  return (
    <div>
      <Modal
        open={!!rule}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style }}>
          <CodeMirror
            value={rule?.func}
            height='50vh'
            extensions={[javascript({ typescript: true })]}
            placeholder='function index(data){}'
            onChange={onRuleCodeChange}
          />
          <Button
            onClick={() => {
              onRuleUpdate();
            }}
          >
            更新
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            取消
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { allPostsData: {} },
  };
};

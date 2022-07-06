import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { Prisma, Robot, Rule } from '@prisma/client';
import { get, post } from '../../fetch';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Partiall } from '../../../types';
import { Button, Modal } from '@mui/material';

async function fetchRobots() {
  const res = await get('b/robot/query');
  const json = await res.json();
  return json.data;
}

export default function CreateRules() {
  const [currentRule, setCurrentRule] = useState<Partiall<Rule>>({
    name: '',
    priority: 1000,
    robotId: 0,
    func: `function index(data) {
    const text = this.getMessage(data)
    // do something
}`,
  });
  const [robots, setRobots] = useState<Array<Robot>>([]);

  useEffect(() => {
    (async () => {
      const robots = await fetchRobots();
      setRobots(robots);
    })();
    return () => {};
  }, []);

  return <Button>新建规则</Button>;
}

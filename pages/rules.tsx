import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { get, post } from '../client';
import { Prisma, Rule } from '@prisma/client';
import { utcDayjs } from '../utils';
import CreateRules from '../client/components/rule/createRules';

async function fetchRobots() {
  const res = await get('b/rule/query');
  const json = await res.json();
  return json.data;
}

export default function Robots(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [rules, setRules] = useState<Array<Rule>>([]);
  const [currentRule, setCurrentRule] = useState<Rule>();

  useEffect(() => {
    (async () => {
      const robots = await fetchRobots();
      setRules(robots);
    })();
    return () => {};
  }, []);

  let tempcode = '';
  function onRuleCodeChange(code) {
    tempcode = code;
  }

  async function onRuleUpdate() {
    const result = await post('b/rule/update', {
      id: currentRule.id,
      func: tempcode,
    });
    const json = await result.json();
    if (json.success) {
      tempcode = '';
    }
  }

  return (
    <>
      <div>22</div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { allPostsData: {} },
  };
};

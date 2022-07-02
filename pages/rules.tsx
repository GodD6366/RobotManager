import {
  Flex,
  Table,
  Center,
  Thead,
  TableCaption,
  Button,
  Tr,
  Th,
  Td,
  Tbody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { get, post } from '../client';
import { Prisma } from '@prisma/client';
import { utcDayjs } from '../utils';

async function fetchRobots() {
  const res = await get('b/rule/query');
  const json = await res.json();
  return json.data;
}

export default function Robots(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [robots, setRobots] = useState<Array<Prisma.RuleSelect>>([]);
  const [currentRule, setCurrentRule] = useState<Prisma.RuleSelect>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const result = await post('b/robot/update', {
      id: currentRule.id,
      function: tempcode,
    });
    const json = await result.json();
    if (json.success) {
      tempcode = '';
      onClose();
    }
  }

  return (
    <>
      <Flex
        mt='50px'
        color='white'
        align='center'
        justify='center'
        direction='column'
      >
        <Center w='90%' mb='50px' style={{ overflow: 'auto' }}>
          <Table variant='striped' colorScheme='telegram'>
            <TableCaption>power by firebase</TableCaption>
            <Thead>
              <Tr>
                <Th>任务名</Th>
                <Th>任务类型</Th>
                <Th>function</Th>
                <Th>优先级</Th>
                <Th>最后更新时间</Th>
                <Th>tools</Th>
              </Tr>
            </Thead>

            <Tbody>
              {robots.map((robot, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{robot.name}</Td>
                    <Td>{robot.type}</Td>
                    <Td>
                      <Button
                        colorScheme='teal'
                        size='xs'
                        onClick={() => {
                          setCurrentRule(robot);
                          onOpen();
                        }}
                      >
                        查看/修改
                      </Button>
                    </Td>
                    <Td>{robot.priority}</Td>
                    <Td>{utcDayjs(robot.updatedAt).format('M月D日 HH:mm')}</Td>
                    <Td>
                      <Button
                        colorScheme='teal'
                        size='xs'
                        onClick={() => {
                          setCurrentRule(robot);
                          onOpen();
                        }}
                      >
                        修改
                      </Button>

                      {/* {robot.enable ? (
                      <Button colorScheme='red' size='xs' ml='10px'>
                        禁用
                      </Button>
                    ) : (
                      <Button colorScheme='green' size='xs' ml='10px'>
                        启用
                      </Button>
                    )} */}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Center>
      </Flex>

      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改 Function</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CodeMirror
              value={currentRule.function}
              height="50vh"
              extensions={[javascript({ js: true })]}
              options={{
                keyMap: 'sublime',
                mode: 'ts',
              }}
              placeholder='function index(data){}'
              onChange={onRuleCodeChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onRuleUpdate}>
              更新
            </Button>
            <Button variant='ghost' onClick={onClose}>
              取消
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { allPostsData: {} },
  };
};

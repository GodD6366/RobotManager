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
  Input,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  GridItem,
} from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { Prisma, Robot, Rule } from '@prisma/client';
import { get, post } from '../../fetch';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Partiall } from '../../../types';

async function fetchRobots() {
  const res = await get('b/robot/query');
  const json = await res.json();
  return json.data;
}

export default function CreateRules(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [currentRule, setCurrentRule] = useState<Partiall<Rule>>({
    name: '',
    priority: 1000,
    robotId: 0,
    func: `function index(data) {
    const text = this.getMessage(data)
    // do something
}`,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [robots, setRobots] = useState<Array<Robot>>([]);

  useEffect(() => {
    (async () => {
      const robots = await fetchRobots();
      setRobots(robots);
    })();
    return () => {};
  }, []);

  return (
    <>
      <Button colorScheme='teal' size='xs' onClick={onOpen}>
        新建规则
      </Button>

      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={currentRule}
            enableReinitialize={true}
            onSubmit={async (values, actions) => {
              const result = await post('b/rule/create', values);
              const json = await result.json();
              if (json.success) {
                actions.setSubmitting(false);
                actions.resetForm();
                onClose();
              }
            }}
          >
            {() => {
              return (
                <Form style={{ width: '100%' }}>
                  <ModalHeader>创建新规则</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Stack spacing={4}>
                      <Field name='name'>
                        {({ field, form }) => (
                          <FormControl>
                            <InputGroup>
                              <InputLeftAddon children='规则名' />
                              <Input {...field} id='name' placeholder='name' />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='priority'>
                        {({ field, form }) => (
                          <FormControl>
                            <InputGroup>
                              <InputLeftAddon children='优先级' />
                              <Input
                                {...field}
                                type='number'
                                placeholder='priority'
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='robotId'>
                        {({ field }) => (
                          <FormControl>
                            <InputGroup>
                              <Select placeholder='Select Robot' {...field}>
                                {robots.map((robot) => (
                                  <option key={robot.id} value={robot.id}>
                                    {robot.name}
                                  </option>
                                ))}
                              </Select>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='func'>
                        {({ field }) => (
                          <CodeMirror
                            height='50vh'
                            extensions={[javascript({ typescript: true })]}
                            placeholder='function index(data){}'
                            // value={currentRule?.func}
                            {...field}
                            onChange={(value) => {
                              field.onChange({
                                target: { name: 'func', value },
                              });
                            }}
                          />
                        )}
                      </Field>
                    </Stack>
                  </ModalBody>

                  <ModalFooter>
                    <GridItem colSpan={[6, 6]}>
                      <Button type='submit'>创建</Button>
                      <Button ml={5} variant='ghost' onClick={onClose}>
                        取消
                      </Button>
                    </GridItem>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
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

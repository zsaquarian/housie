import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Table,
  Tr,
  Tbody,
  Td,
  Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

export const App = () => {
  const [list, setList] = useState([] as number[]);
  const [table, setTable] = useState([] as JSX.Element[]);

  const makeTable = () => {
    let ret = [];

    for (let i = 0; i < 9; i++) {
      let children: JSX.Element[] = [];

      for (let j = 0; j < 10; j++) {
        const num = i * 10 + j + 1;
        const inList = list.includes(num);
        let color = inList ? 'darkgray' : 'lightgray';

        if (inList && list.indexOf(num) === list.length - 1) {
          color = 'darkslategray';
        }

        children.push(
          <Td border="2px" backgroundColor={color} width="1%">
            {num}
          </Td>
        );
      }

      ret.push(<Tr>{children}</Tr>);
    }

    setTable(ret);
  };

  useEffect(makeTable, [list]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex alignItems="center" justifyContent="space-around" m={4}>
          <Button
            onClick={() => {
              if (list.length <= 90) {
                let random = Math.floor(Math.random() * 91);
                while (list.includes(random))
                  random = Math.floor(Math.random() * 91);
                setList(list.concat(random));
                makeTable();
              } else {
                alert('Game has ended. What you doing, man?');
              }
            }}
          >
            New Number
          </Button>
          <Text fontSize="3xl">{list[list.length - 1]}</Text>
          <Button backgroundColor="red" onClick={() => setList([])}>
            Clear
          </Button>
        </Flex>
        <Table m={4} width="98%">
          <Tbody>{table}</Tbody>
        </Table>
      </Box>
    </ChakraProvider>
  );
};

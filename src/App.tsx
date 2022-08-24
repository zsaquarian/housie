import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Button,
  Grid,
  GridItem,
  Flex,
  extendTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const App = () => {
  const [list, setList] = useState([] as number[]);
  const [table, setTable] = useState([] as JSX.Element[]);
  let disabled = list.length >= 90;
  
  useEffect(() => {
    document.title = 'Housie';
  })

  const makeTable = () => {
    let ret = [];

    for (let i = 0; i < 9; i++) {
      let children: JSX.Element[] = [];

      for (let j = 0; j < 10; j++) {
        const num = i * 10 + j + 1;
        const inList = list.includes(num);
        let color = inList ? 'darkgray' : 'slate';

        if (inList && list.indexOf(num) === list.length - 1) {
          color = 'red';
        }

        children.push(
          <GridItem backgroundColor={color} rounded="md" w='10' h='10'>
            {num}
          </GridItem>
        );
      }

      ret.push(...children);
    }

    setTable(ret);
  };

  useEffect(makeTable, [list]);
  

  return (
    <ChakraProvider theme={theme}>
      <Flex textAlign="center" fontSize="xl" direction='column' height='calc(100vh)'>
        <Flex alignItems="center" justifyContent="space-around" m={4}>
          <Button
            disabled={disabled}
            onClick={() => {
              if (list.length <= 90) {
                let random = Math.floor(Math.random() * 90) + 1;
                while (list.includes(random))
                  random = Math.floor(Math.random() * 90) + 1;
                setList(list.concat(random));
                makeTable();
              }
            }}
          >
            New Number
          </Button>
          <Text fontSize="6xl">{list[list.length - 1]}</Text>
          <Button
            backgroundColor="red"
            color="white"
            onClick={() => {
              setList([]);
              disabled = false;
            }}
          >
            Clear
          </Button>
        </Flex>
        <Grid p={8} templateColumns="repeat(10, 1fr)" gap="2" width='min-content' alignSelf='center'>
          {table}
        </Grid>
        <Flex justifyContent="center" flexDirection="column">
          <Text fontSize="4xl">{list[list.length - 1]}</Text>
          {[...list]
            .reverse()
            .slice(1, 5)
            .map((val) => (
              <Text>{val.toString()}</Text>
            ))}
        </Flex>
        <ColorModeSwitcher position='absolute' bottom={2} left={2} />
      </Flex>
    </ChakraProvider>
  );
};

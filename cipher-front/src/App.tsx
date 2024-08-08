import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { Container } from './components/Container/Container';

export const App: React.FC = () => {
  return (
    <Container>
      <TextArea rows={5} placeholder={'Decoded message…'} />
      <Flex justify={'space-between'} gap={'small'} style={{ width: '100%' }}>
        <Input placeholder={'Password…'} />
        <Flex gap={'small'}>
          <Button type={'text'} icon={<UpOutlined />} />
          <Button type={'text'} icon={<DownOutlined />} />
        </Flex>
      </Flex>
      <TextArea rows={5} placeholder={'Encoded message…'} />
    </Container>
  );
};

import React, { useState, useEffect } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Input, message, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container } from '../../components/Container/Container';
import type { CipherText } from '../../types';
import { selectDecode, selectEncode } from './mainSlice';
import { decodeMessage, encodeMessage } from './mainThunks';

export const Main: React.FC = () => {
  const encode = useAppSelector(selectEncode);
  const decode = useAppSelector(selectDecode);
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState({
    decode: '',
    encode: '',
    password: '',
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (encode !== null) {
      setMessages((prevState) => ({
        ...prevState,
        encode: encode.encoded,
      }));
    }
  }, [encode]);

  useEffect(() => {
    if (decode !== null) {
      setMessages((prevState) => ({
        ...prevState,
        decode: decode.decoded,
      }));
    }
  }, [decode]);

  const onEncode = async () => {
    try {
      const message: CipherText = {
        message: messages.decode,
        password: messages.password,
      };

      if (messages.password !== '' && messages.decode !== '') {
        await dispatch(encodeMessage(message)).unwrap();
      } else {
        messageApi.open({
          type: 'warning',
          content: 'The password and decode fields cannot be empty',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDecode = async () => {
    try {
      const message: CipherText = {
        message: messages.encode,
        password: messages.password,
      };

      if (messages.password !== '' && messages.encode !== '') {
        await dispatch(decodeMessage(message)).unwrap();
      } else {
        messageApi.open({
          type: 'warning',
          content: 'The password and encode fields cannot be empty',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;

    setMessages((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      {contextHolder}
      <TextArea
        allowClear
        rows={5}
        placeholder={'Decoded message…'}
        name={'decode'}
        value={messages.decode}
        onChange={onChange}
        style={{ resize: 'none' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          width: '100%',
        }}
      >
        <Input
          allowClear
          placeholder={'Password…'}
          name={'password'}
          value={messages.password}
          onChange={onChange}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title={'Encode'}>
            <Button onClick={onEncode} type={'text'} icon={<DownOutlined />} />
          </Tooltip>
          <Tooltip title={'Decode'}>
            <Button onClick={onDecode} type={'text'} icon={<UpOutlined />} />
          </Tooltip>
        </div>
      </div>
      <TextArea
        allowClear
        rows={5}
        placeholder={'Encoded message…'}
        name={'encode'}
        value={messages.encode}
        onChange={onChange}
        style={{ resize: 'none' }}
      />
    </Container>
  );
};

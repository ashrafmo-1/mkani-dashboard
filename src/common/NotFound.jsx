import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }} className='w-full'>
      <Result
        status="404"
        title={<div style={{ fontSize: '72px', color: '#ff4d4f' }}>404</div>}
        subTitle={<div style={{ fontSize: '24px', color: '#595959' }}>Sorry, the page you visited does not exist.</div>}
        extra={<Button type="primary" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }} onClick={() => navigate('/')}>Back Home</Button>}
      />
    </div>
  );
};
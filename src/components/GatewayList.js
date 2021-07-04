import React from 'react';
import { Table } from "antd";

const columns = [
  {
    title: 'Serial Number',
    dataIndex: 'serialNumber',
    key: 'serialNumber'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Customize Devices',
    dataIndex: 'devices',
    key: 'devices'
  }
];
export function GatewayList({ gateways, loading }) {    
  return (
    <div>
      <Table
        loading={loading} 
        pagination={false} 
        dataSource={gateways} 
        columns={columns} 
      />
    </div>
  );
}


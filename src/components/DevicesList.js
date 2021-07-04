import React from 'react';
import { Table } from "antd";
import { gatewayService } from "../services";
import { useParams, useHistory } from "react-router-dom";
const columns = [
  {
    title: 'Uid',
    dataIndex: 'uid',
    key: 'uid'
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created'
  }
];
export function DevicesList({ devices, loading, selected, setSelected }) {  
  const { serialNumber } = useParams();
  let history = useHistory();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: selected.length >= 10 && selected.findIndex(s => s === record.uid) === -1, // Column configuration not to be checked
      name: record.name      
    })
  };
  React.useEffect(() => {
    (async () => {
      try {
        const resp = await gatewayService.getDevices(serialNumber);
        const uids = resp.data.map(d => d.uid);
        setSelected(uids);
      } catch(err) {
        history.push("/page-not-found");
      }
    })();    
  }, [serialNumber, setSelected, history])
  return (
    <div>
      <Table
        rowSelection={{
          selectedRowKeys: selected,
          type: "checkbox",
          ...rowSelection,
          hideSelectAll: true
        }}
        loading={loading} 
        pagination={false} 
        dataSource={devices} 
        columns={columns}
      />
    </div>
  );
}


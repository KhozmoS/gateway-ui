import React, { useState } from 'react';
import { Modal, Button, Form, Input, Alert } from 'antd';
import { gatewayService } from "../services";
export const AddGatewayModal = ({ onAdded }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSave = async () => {
    try {
      setSaving(true);    
      await gatewayService.postGateway(form.getFieldsValue());
      handleCancel();
      onAdded();
    } catch (err) {
      let message = err?.response?.data?.title || "Unexpected error.";
      const errorObj = err?.response?.data.errors;
      if (errorObj && Object.keys(errorObj).length > 0) {
        message = errorObj[Object.keys(errorObj)[0]][0];
      }
            
      setTimeout(() => {
        setErrorMessage(message);
      }, 300);
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 300);      
    }
  }
  const handleOk = () => {   
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Gateway
      </Button>
      <Modal 
        title="Add Gateway" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        onOk={handleOk} 
        confirmLoading={saving}
        okText="Save" 
        okButtonProps={{ htmlType: "submit" }}
      >        
        <Form
          form={form}
          name="add_gateway"
          initialValues={{ remember: true }}
          onFinish={handleSave}
        >          
          <Form.Item
            name="SerialNumber"
            rules={[{ required: true, message: 'Please input gateway Serial Number!' }]}
          >
            <Input placeholder="Serial Number" />
          </Form.Item>
          <Form.Item
            name="Name"
            rules={[{ required: true, message: 'Please input gateway Name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="Address"
            rules={[{ required: true, message: 'Please input gateway Address!' }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          {
            errorMessage && 
            <Alert 
              message={errorMessage} 
              type="error" 
              onClose={() => setErrorMessage("")} 
              closable={true}
            />
          }
        </Form>
      </Modal>
    </>
  );
};
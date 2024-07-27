import React from 'react';
import { Modal, Form, Input, DatePicker , Select, Button } from 'antd';
function Expense(props) {
  const [form] = Form.useForm();
  return (
    <div>
        <Modal title="Total Expense" open={props.open} onOk={()=>props.onOk(false)} onCancel={()=>props.onCancel(false)} footer={null}>
        <Form  
            form={form}
            layout='vertical' 
            variant='outline' 
            onFinish={(values)=>{
                props.onFinish(values,"expense");
                form.resetFields();
                }}
        >
                <Form.Item
                    name="note"
                    label="Note"
                    rules={[
                    {
                        required: true,
                        message: "Enter the transaction name!"
                    },
                    ]}
                >
                    <Input type="text" style={{border:"none",outline:"none"}}/>
                </Form.Item>
                <Form.Item
                    name="amt"
                    label="Amount"
                    rules={[
                    {
                        required: true,
                        message: "Enter the Amount!"
                    },
                    ]}
                >
                    <Input type="number" style={{border:"none",outline:"none"}}/>
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                        required: true,
                        message: 'Enter the Date!',
                        },
                    ]}
                >
                    <DatePicker style={{backgroundColor:"black"}}/>
                </Form.Item>
                <Form.Item
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                        required: true,
                        message: 'Select the tag!',
                        },
                    ]}
                    >
                    <Select style={{backgroundColor:"black"}}>
                        <Select.Option value="Food" />
                        <Select.Option value="Entertainment" />
                        <Select.Option value="Shopping" />
                        <Select.Option value="Education" />
                        <Select.Option value="Travel" />
                        <Select.Option value="Medical" />
                        <Select.Option value="Investment" />
                        <Select.Option value="EMI" />
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Enter</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default Expense
import React from 'react';
import { Modal, Form, Input, DatePicker , Select, Button } from 'antd';
function Income(props) {
  const [form] = Form.useForm();
  return (
    <div>
        <Modal title="Total Income" open={props.open} onOk={()=>props.onOk(false)} onCancel={()=>props.onCancel(false)} footer={null}>
            <Form  
            form={form}
            layout='vertical' 
            variant='outline' 
            onFinish={(values)=>{
                props.onFinish(values,"income");
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
                        <Select.Option value="Salary" />
                        <Select.Option value="Freelance" />
                        <Select.Option value="Business" />
                        <Select.Option value="PocketMoney" />
                        <Select.Option value="Dividend" />
                        <Select.Option value="Borrowing" />
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

export default Income
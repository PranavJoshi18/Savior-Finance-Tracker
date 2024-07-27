import React, { useState } from 'react';
import './Trans.css';
import { Table, Tag } from 'antd';
function Trans({data}) {
  const uniqueTags = Array.from(new Set(data.map(item => item.tag)));
  const type = [{text:"Income", value:"income"},{text:"Expense",value:"expense"}];
  const columns = [
        {
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
          align: "center",
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          align: "center",
          sorter: (a, b) => a.amount - b.amount,
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
          align: "center",
          filters: uniqueTags.map(tag => ({ text: tag, value: tag })),
          onFilter: (value, record) => record.tag === value, //where record is the row and value is the filter applied!
          render: (tag) => <Tag>{tag.toUpperCase()}</Tag>
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
          align: "center",
          filters: type,
          onFilter: (value,record) => record.type === value,
          render: (type) => <Tag color={type=="income" ? "green" : "volcano"}>{type.toUpperCase()}</Tag>,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          align: "center",
          },
  ];
  return (
    <div className='trans'>
            <div>
                <Table columns={columns} dataSource={data} className='table' scroll={{ x: 'max-content' }}/>
            </div>
    </div>
  )
}

export default Trans
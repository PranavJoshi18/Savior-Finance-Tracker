import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import { ConfigProvider, theme } from "antd";
import Expense from '../components/Modals/Expense';
import Income from '../components/Modals/Income';
import { toast } from 'react-toastify';
import moment from 'moment';
import { auth, db } from '../libs/firebase';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Trans from '../components/Trans/Trans';
import Button from '../components/Button/Button';
import { parse, unparse } from 'papaparse';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { Modal } from 'antd';
function Dashboard() {
  const [user] = useAuthState(auth);
  const [isIncomeModelVisible,setIsIncomeModelVisible] = useState(false);
  const [isExpenseModelVisible,setIsExpenseModelVisible] = useState(false);
  const [isBalanceModelVisible,setIsBalanceModelVisible] = useState(false);
  const [trans,setTrans] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [username, setUsername] = useState("");
  const fileInputRef = useRef(null);
  function handleIncomeModel() {
    setIsIncomeModelVisible(true);
  }
  function handleExpenseModel() {
    setIsExpenseModelVisible(true);
  }
  function handleBalanceModel() {
    setIsBalanceModelVisible(true);
  }
  async function onFinish(values,type) {
    const newTransaction = {
      type : type,
      date : moment(values.date.$d).format("YYYY-MM-DD"),
      amount : parseInt(values.amt),
      note : values.note,
      tag : values.tag 
    };
    try {
      await updateDoc(doc(db,"users",user.uid),{
        transactions : arrayUnion({
          newTransaction
        })
      })
      toast.success("Success!");
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        const data = doc.data();
        setUsername(data.username);
        const transactions = data.transactions || [];
        let inc = 0;
        let exp = 0;
        const newTrans = [];
        transactions.forEach((txn) => {
            try {
              if (txn.newTransaction.type === "income") {
              inc += txn.newTransaction.amount;
              } else if (txn.newTransaction.type === "expense") {
              exp += txn.newTransaction.amount;
              }
              newTrans.push(txn.newTransaction);
            }
            catch (error) {  //if there is an import from .csv file (coz there is no .newTransaction)
              if (txn.type === "income") {
              inc += parseInt(txn.amount);
              } else if (txn.type === "expense") {
              exp += parseInt(txn.amount);
              }
              newTrans.push(txn);
            }
        });
        setTotalIncome(inc);
        setTotalExpense(exp);
        setTotalBalance(inc - exp);
        setTrans(newTrans);
      });
      return () => unsubscribe();
    }
  },[user]);
  function handleExport() {
    var csv = unparse({
      "fields": ["note","amount","tag","type","date"],
      "data": trans
    });
    // to download the created csv
    var data = new Blob([csv], {type: 'text/csv:charset=utf-8;'});
    var csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
  function handleImport(e) {
    fileInputRef.current.click();
    parse(e.target.files[0], {
      header: true,
      complete: async function (results) {
        const importedTrans = results.data;
        setTrans(importedTrans);
        try {
          await updateDoc(doc(db,"users",user.uid),{
            transactions: arrayUnion(...importedTrans)
          })
          toast.success("Success!");
        }
        catch (error) {
          toast.error(error.message);
        }
      }
    })
  }
  let sortedTrans = trans.sort((a,b)=>{
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <Header />
      <div class="user"><h4>Welcome <span style={{color:"var(--bg"}}>{username}</span> 👋</h4></div>
      <div className='top-cards'>
        <Card title="Current Balance" text="Reset Balance" amt={totalBalance} loss={totalBalance<0 ? true : false} onClick={handleBalanceModel}/>
        <Card title="Total Income" text="Add Balance" amt={totalIncome} onClick={handleIncomeModel}/>
        <Card title="Total Expenses" text="Add Expense" amt={totalExpense} onClick={handleExpenseModel} loss={totalExpense>totalIncome ? true : false}/>
      </div>
      {trans.length!=0 ? (
          <div className='chart'>
            <h4>Analytics Dashboard</h4>
            <div className='charts'>
              <LineChart sortedTrans={sortedTrans}/>
              <PieChart trans={trans}/>
            </div>
          </div>
        ) : (
          ""
        )}
      <div className='heading'>
        <h4>Transaction History</h4>
        <div className="buttons">
        <Button skyblue={true} text="Export CSV" onClick={handleExport}/>
        <Button skyblue={true} text="Import CSV" onClick={handleImport}/>
        <input
        type="file"
        accept='.csv'
        ref={fileInputRef}
        required
        style={{ display: 'none' }}
        onChange={(e)=>handleImport(e)}
        />
        </div>
      </div>
      <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        <Modal title="Reset Balance" open={isBalanceModelVisible} onOk={()=>setIsBalanceModelVisible(false)} onCancel={()=>setIsBalanceModelVisible(false)}>To reset balance, add income or expense</Modal>
        <Income open={isIncomeModelVisible} onOk={setIsIncomeModelVisible} onCancel={setIsIncomeModelVisible} onFinish={onFinish}/>
        <Expense open={isExpenseModelVisible} onOk={setIsExpenseModelVisible} onCancel={setIsExpenseModelVisible} onFinish={onFinish}/>
        {trans.length!=0 ? (<Trans data={trans}/>) : (
            <div className='empty'>
                <p style={{fontSize:20}}>You don't have any Transactions <span style={{fontWeight:"bold",color:"var(--bg)"}}>Yet!</span></p>
                <p style={{fontSize:14,fontStyle:"italic"}}>They will be displayed here</p>
            </div>
        )}
      </ConfigProvider>
    </div>
  )
}

export default Dashboard
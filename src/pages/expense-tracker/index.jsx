import {useAddTransaction} from '../../hooks/useAddTransaction';
import {useGetTransactions} from '../../hooks/useGetTransactions';
import {useGetUserInfo} from '../../hooks/useGetUserInfo.';
import { useState } from "react";
import "./styles.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import {useNavigate} from 'react-router-dom';

export const ExpenseTracker =() => {
    const {addTransaction}= useAddTransaction();
    const {transactions,transactionTotals}=useGetTransactions();
    const {name,profilePhoto}=useGetUserInfo();
    const navigate=useNavigate();


    const [description,setDescription] =useState("");
    const[ transactionAmount,setTransactionAmount]=useState(0);
    const [transactionType,setTransactionType]=useState("expense");



    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({description,transactionAmount, transactionType});
    };

    const signUserOut= async() => {
        try{
        await signOut(auth);
        localStorage.clear();
        navigate("/")
        }
        catch(err){
            console.error(err);
        }
    };


    return( 
        <>
    <div className="expense-tracker">
        <div className="container">
            <h1> {name}'s Pantry Tracker</h1>
            
          
                <form class="form-group" onSubmit={onSubmit}>
                    <input type="text" 
                    class="form-control"
                    placeholder="Description" 
                    required 
                    onChange={(e)=>setDescription(e.target.value)}/>
                    <input type="number" 
                    class="form-control"
                    placeholder="Quantity" 
                    required 
                    onChange={(e)=>setTransactionAmount(e.target.value)}/>
                    <input type="radio" 
                    id="expense" 
                    value="expense" 
                    checked={transactionType=="expense"}
                    onChange={(e)=>setTransactionType(e.target.value)}/>
                    <label htmlFor="expense">Adding</label>
                    <input type="radio" 
                    id="income" 
                    value="income" 
                    checked={transactionType=="income"}
                    onChange={(e)=>setTransactionType(e.target.value)}/>
                    <label htmlFor="income">Used</label>
                
                    <button type="submit" class="btn btn-secondary">Add Item</button>
                </form>
            </div>
            {profilePhoto && (
                <div className='profile'><img className='profile-photo' src={profilePhoto}/> 
                <button className='sign-out-button' onClick={signUserOut}>Sign Out</button></div>
            )}
        
    </div>
    <div className="transactions">
        <h3>Items</h3>
        <ul class="list-group">{transactions.map((transaction)=>{
            const{description,transactionAmount, transactionType} = transaction;
            return (<li class="list-group-item list-group-item-dark">
                {" "}
                <h4> {description}</h4>
                <p>Quantity: {transactionAmount}</p>
                
            </li>
            )
            
        })}</ul>
    </div>
    </>
    );
}
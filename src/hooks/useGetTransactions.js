import {useState,useEffect} from 'react';
import {query,collection,orderBy,where,onSnapshot} from 'firebase/firestore';
import {db} from '../config/firebase-config';
import {useGetUserInfo} from './useGetUserInfo.';


export const useGetTransactions = () =>{
    const [transactions, setTransactions]=useState([]);
    const transactionCollectionRef =collection(db,"transaction");
    const [transactionTotals, setTransactionTotals]=useState({
        balance:0.0,
        income: 0.0,
        expenses: 0.0,
    });

    const {userID} =useGetUserInfo();
    const getTransactions = async () =>{
        let unsubscribe;
        let totalIncome = 0;
        let totalExpenses = 0;
        let transactionBalance =0;
        try {
            
            const queryTransactions = query(transactionCollectionRef,
                                        where("userID", "==",userID),
                                        orderBy("createdAt"));

            unsubscribe = onSnapshot(queryTransactions,(snapshot)=>{

                let docs =[];
                snapshot.forEach((doc)=>{
                    const data= doc.data();
                    const id=doc.id;
                    docs.push({...data,id});
                    if (data.transactionType==="expense"){
                        totalExpenses+=Number(data.transactionAmount);
                    }
                    else if(data.transactionType==="income"){
                        totalIncome+=Number(data.transactionAmount);
                    }



                });
            setTransactions(docs);
            transactionBalance=totalIncome-totalExpenses;
            console.log(transactionBalance,totalIncome,totalExpenses);
            setTransactionTotals({
                balance: transactionBalance,
                income: totalIncome,
                expenses: totalExpenses,
            });
            });


        } catch (err){
            console.error(err)
        }
        return () =>  unsubscribe ();

    }
    
    useEffect(()=>{
        getTransactions()
    },[])
    
    return {transactions,transactionTotals}
}
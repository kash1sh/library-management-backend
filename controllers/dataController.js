const { get,toArray } = require("lodash");
const moment = require('moment');
const Circulation = require("../models/Circulation");
const Book = require("../models/Book");


const getBooks = async(req,res)=>{
    try{
        const books = await Book.find();
        return res.json({data:books});
    }catch(e){
        console.log("error in getBooks controller",e);
    }
}
const checkout = async(req,res) =>{
    const {BookID, BookName,MemberID,NumberOfCopies} = req.body;
    try{
        const transaction = await Circulation.findOne({BookID,BookName});
        const active = get(transaction,"active","");
        if(active){
            return res.json({message:"This book has already been disbursed, please pick any other book", status:false});
        }
        const IssueDate = moment().toDate();
        const ReturnDate = moment().add(7, 'days'); 
        const newTransaction = new Circulation({
            BookID,
            BookName,
            MemberID,
            IssueDate,
            ReturnDate,
            active:true,
        })
        await newTransaction.save();

        await Book.findOneAndUpdate({BookID},{
            $set:{
                NumberOfCopies:NumberOfCopies-1
            }
        })
        return res.json({message:"Checkout Out Successfully", status:true});
    }catch(e){
        console.log("error in checkout controller",e);
    }
    
}

const returnBook = async(req,res) =>{
    const {BookID, BookName} = req.body;
    try{
        const transaction = await Circulation.findOne({BookID,BookName});
        const active = get(transaction,"active","");
        if(!active){
            return res.json({message:"No associated book found", status:false});
        }
       await Circulation.findOneAndUpdate({BookID},{
        $set:{
            active:false
        }
       });
        return res.json({message:"Checkout Out Successfully", status:true});
    }catch(e){
        console.log("error in checkout controller",e);
    }
}

const transactionDetails = async(req,res) =>{
    const {MemberID} = req.body;
    try{
        const transactionArray = await Circulation.find({MemberID});
       if(transactionArray.length==0){
        return res.json({message:"No checked out books", status:true});
       }
       let totalFine=0,overDueBooks=0;
       for(let i=0;i<transactionArray.length;i++){
            let transaction=transactionArray[i];
            if(transaction.active)overDueBooks++;
            let currentDate = moment();
            let ReturnDate = transaction.ReturnDate;
            let days = Math.abs(currentDate.diff(ReturnDate, 'days'));

            if(days > 7){
                let fine = (days-7)*50;
                totalFine+=fine;
            }
       }
       const data = {
        overDueBooks,
        totalFine
       }
    return res.json(data);
    }catch(e){
        console.log("error in checkout controller",e);
    }
}

module.exports = {
    getBooks,
    checkout,
    returnBook,
    transactionDetails
}
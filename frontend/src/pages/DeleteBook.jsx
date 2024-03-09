import React, {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
  const[loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = () =>{
    setLoading(true);
    axios.delete(`http://localhost:3000/books/${id}`).then(()=>{
      setLoading(false);
      alert('Book Deleted Successfully!')
      navigate('/');
    }).catch((error)=>{
      setLoading(false);
      alert('An error occured! Please check console.');
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl p-4 my-4 text-center'>Delete Book</h1>
      {loading ? <Spinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl '>Are you sure you want to delete this book? </h3>
        <button className='p-4 m-8 w-full rounded-full bg-red-600 hover:bg-red-500 text-white' onClick={handleDeleteBook}>Yes, delete it!</button>
      </div>
    </div>
  )
}

export default DeleteBook
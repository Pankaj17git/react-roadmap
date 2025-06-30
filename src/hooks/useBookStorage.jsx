/* eslint-disable no-debugger */
import { useState, useEffect } from "react";

export default function useBookStorage() {
  const [readBooks, setReadBooks] = useState([]);
  const [unreadBooks, setUnreadBooks] = useState([]);
  const unreadData = JSON.parse(localStorage.getItem('listItemUnread')) ?? [];
  const readData = JSON.parse(localStorage.getItem('listItemRead')) ?? [];


  useEffect(() => {
    setUnreadBooks(unreadData);
    setReadBooks(readData);
    console.log('rendered');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = (book) => {
    debugger;
    const list = book.isComplete ? readBooks : unreadBooks;
    const newList = [...list, book];
    const key = book.isComplete ? 'listItemRead' : 'listItemUnread';

    if (book.isComplete) {
      setReadBooks(newList);
    } else {
      setUnreadBooks(newList);
    }

    localStorage.setItem(key, JSON.stringify(newList));
  }

  const removeBook = (id, isRead) => {
    debugger;
    const key = isRead ? 'listItemRead' : 'listItemUnread';
    const updateList = (isRead ? readBooks : unreadBooks).filter(item => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updateList));

    isRead ? setReadBooks(updateList) : setUnreadBooks(updateList)
  };

  const updateBookInLists = (bookId, updatedBook) => {
    debugger;
    const currentKey = updatedBook.isComplete ? 'listItemRead' : 'listItemUnread';
    const otherKey = updatedBook.isComplete ? 'listItemUnread' : 'listItemRead';

    let currentList = JSON.parse(localStorage.getItem(currentKey)) ?? [];
    let otherList = JSON.parse(localStorage.getItem(otherKey)) ?? [];

    let index = currentList.findIndex(book => book.id === bookId);

    if (index !== -1) {
      currentList[index] = updatedBook;
    } else {
      otherList = otherList.filter(book => book.id !== bookId);
      currentList = [...currentList, updatedBook]
      localStorage.setItem(otherKey, JSON.stringify(otherList));
    }

    localStorage.setItem(currentKey, JSON.stringify(currentList));

    if (updatedBook.isComplete) {
      setReadBooks(currentList);
      setUnreadBooks(otherList);      
    } else {
      setUnreadBooks(currentList);
      setReadBooks(otherList);
    }

  };

  const toggleReadStatus = (book) => {
    debugger;
   
    const updatedBook = {
    ...book,
    isComplete: book.isComplete ? 0 : 1, // toggle
    };

    const currentKey = updatedBook.isComplete ? 'listItemRead' : 'listItemUnread';
    const otherKey = updatedBook.isComplete ? 'listItemUnread' : 'listItemRead';

    let targetList = JSON.parse(localStorage.getItem(currentKey)) ?? [];
    let sourceList = JSON.parse(localStorage.getItem(otherKey)) ?? [];
  
    sourceList = sourceList.filter(b => b.id !== book.id);
    localStorage.setItem(otherKey,JSON.stringify(sourceList))

    targetList = [updatedBook, ...targetList];
    localStorage.setItem(currentKey,JSON.stringify(targetList));

    // Update state
    if (updatedBook.isComplete) {
      setReadBooks(targetList);
      setUnreadBooks(sourceList);
    } else {
      setUnreadBooks(targetList);
      setReadBooks(sourceList);
    }
  };

  return {
    readBooks,
    unreadBooks,
    addBook,
    removeBook,
    updateBookInLists,
    toggleReadStatus
  };
} 
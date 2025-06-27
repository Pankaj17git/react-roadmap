import { useState} from 'react';
import useBookStorage from '../hooks/useBookStorage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DisplayData from '../components/DispalyData';
import BookForm from '../components/BookForm';
import 'bootstrap/dist/css/bootstrap.css';
import Header from '../components/header';


const Form = () => {
  const [read, setRead] = useState(0)
  const [books, setBooks] = useState({
    id: '',
    title: '',
    author: '',
    year: '',
    isComplete: 0,
    isAvailable: '',
    format: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);


  const {readBooks, unreadBooks, removeBook, addBook, updateBookInLists, toggleReadStatus} = useBookStorage();

  const HandleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      ...books,
      id: Date.now().toString(), // ✅ generated only once
      isComplete: read ? 1 : 0,
    };

    if (isEditMode) {
      updateBookInLists(books.id, newBook); //  Update existing
    } else {
      newBook.id = Date.now().toString(); //  New book only gets new ID
      addBook(newBook);
    }

    setBooks({
      id: '',
      title: '',
      author: '',
      year: '',
      isComplete: 0,
      isAvailable: '',
      format: '',
    });

    setRead(0);
    setIsEditMode(false)

    console.log("Data saved successfully:", );
  }

  const HandleReset = () => {
    setBooks({
    id: '',
    title: '',
    author: '',
    year: '',
    isComplete: 0,
    isAvailable: '',
    format: '',
    });
    setRead(0);
    setIsEditMode(false);
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="alert alert-primary text-center">Bookshelf Apps</h1>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <BookForm books={books} setBooks={setBooks} read={read} setRead={setRead} onSubmit={HandleSubmit} reset={HandleReset}/>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h2>Unread</h2>

                <div className="table-responsive">
                  <table id="datatable" className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>In Stock</th>
                        <th>Format</th>
                        <th>Read</th>
                        <th>Edit</th>
                        <th>Hapus</th>
                      </tr>
                    </thead>
                    <tbody id="table">
                      <DisplayData 
                        bookList={unreadBooks}
                        isRead={false} 
                        removeData={removeBook}
                        onEdit = {(book) => {
                          setBooks(book);
                          setRead(book.isComplete);
                          setIsEditMode(true);
                        }}
                        toggleReadStatus={toggleReadStatus}
                      />
                    </tbody>
                  </table>
                </div><hr />

                <h2>Read</h2>

                <div className="table-responsive">
                  <table id="datatable" className="table table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>In Stock</th>
                        <th>Format</th>
                        <th>Unread</th>
                        <th>Edit</th>
                        <th>Hapus</th>
                      </tr>
                    </thead>
                    <tbody id="table2">
                      <DisplayData 
                        bookList={readBooks} 
                        isRead={true} 
                        removeData={removeBook}
                        onEdit = {(book) => {
                          console.log("Editing book:", book);
                          setBooks(book);
                          setRead(book.isComplete);
                          setIsEditMode(true);
                        }}
                        toggleReadStatus = {toggleReadStatus}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Form;



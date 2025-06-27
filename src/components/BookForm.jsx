import Button from "./Button";

const BookForm = ({books, setBooks, read, setRead, onSubmit, reset }) => (
  <form id="form" onSubmit={onSubmit} onReset={reset}>
    <input type="hidden" name="id" id="inputBookId" />

    <label htmlFor="inputBookTitle">Title</label>
    <input type="text" placeholder="Title" className="form-control" id="inputBookTitle"
      name='title'
      value={books.title}
      onChange={(e) => setBooks({ ...books, title: e.target.value })}
      required />
    <br />
    <label htmlFor="inputAuthor">Author</label>
    <input type="text" placeholder="Author" className="form-control" id="inputBookAuthor"
      name='author'
      value={books.author}
      onChange={(e) => setBooks({ ...books, author: e.target.value })}
      required />
    <br />
    <label htmlFor="inputBookYear">Year</label>
    <input type="number" placeholder="Year" className="form-control" id="inputBookYear"
      name='year'
      value={books.year}
      onChange={(e) => setBooks({ ...books, year: e.target.value })}
      required />
    <br />
    <label htmlFor="inputBookIsComplete">Finished reading</label>
    <input type="checkbox" id="inputBookIsComplete"
      name='isComplete'
      checked={read}
      onChange={(e) => setRead(e.target.checked ? 1 : 0)}
    />
    <br />
    <br />
    <label htmlFor="inputBookIsAvailable">Available</label>
    <input type="radio" id="inputBookIsAvailable" className="js-stock" name="Stock" value="Available"
      onChange={(e) => setBooks({ ...books, isAvailable: e.target.value })}
      checked={books.isAvailable === 'Available'}
      required />
    <label htmlFor="inputBookIsNotAvailable">Not Available</label>
    <input type="radio" id="inputBookIsNotAvailable" name="Stock" className="js-stock" value="Not Available"
      onChange={(e) => setBooks({ ...books, isAvailable: e.target.value })}
      checked={books.isAvailable === 'Not Available'}
      required />
    <br />
    <br />
    <label style={{ marginBottom: '5px', fontWeight: "600" }}>Format</label><br />
    <input type="radio" id="ebook" className="inputBookFormat" name="Format" value="eBook"
      onChange={(e) => setBooks({ ...books, format: e.target.value })}
      checked={books.format === 'eBook'}
      required />
    <label htmlFor="ebook">eBook</label>
    <input type="radio" id="physical" className="inputBookFormat" name="Format" value="Physical"
      onChange={(e) => setBooks({ ...books, format: e.target.value })}
      checked={books.format === 'Physical'}
      required />
    <label htmlFor="physical">Physical Book</label>
    <br />
    <br />
    <Button />
  </form>
);

export default BookForm;

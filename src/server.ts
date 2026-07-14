import express from 'express';

const app = express();

// PENTING: ini biar Express bisa baca JSON dari body request (POST/PUT)
app.use(express.json());

// Middleware buat cek API Key
function checkAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const apiKey = req.header('x-api-key');

    if (apiKey !== 'rahasia123') {
        return res.status(401).json({ message: "Unauthorized: API Key salah atau tidak ada" });
    }

    next();
}

// ==== DATA DUMMY (in-memory, hilang kalau server restart) ====
let books = [
    { id: 1, title: "Laskar Pelangi", authorId: 1 },
    { id: 2, title: "Bumi Manusia", authorId: 2 }
];

let authors = [
    { id: 1, name: "Andrea Hirata" },
    { id: 2, name: "Pramoedya Ananta Toer" }
];

// ==================== ENDPOINT BOOKS ====================

// 1. GET semua buku (tidak perlu auth)
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. GET satu buku by id (tidak perlu auth)
app.get('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }
    res.json(book);
});

// 3. POST tambah buku baru (perlu auth)
app.post('/books', checkAuth, (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        authorId: req.body.authorId
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. PUT update buku (perlu auth)
app.put('/books/:id', checkAuth, (req, res) => {
    const id = Number(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    book.title = req.body.title ?? book.title;
    book.authorId = req.body.authorId ?? book.authorId;
    res.json(book);
});

// 5. DELETE hapus buku (perlu auth)
app.delete('/books/:id', checkAuth, (req, res) => {
    const id = Number(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    books.splice(index, 1);
    res.json({ message: "Buku berhasil dihapus" });
});

// ==================== ENDPOINT AUTHORS ====================

// 6. GET semua author (tidak perlu auth)
app.get('/authors', (req, res) => {
    res.json(authors);
});

// 7. GET satu author by id (tidak perlu auth)
app.get('/authors/:id', (req, res) => {
    const id = Number(req.params.id);
    const author = authors.find(a => a.id === id);

    if (!author) {
        return res.status(404).json({ message: "Author tidak ditemukan" });
    }
    res.json(author);
});

// 8. POST tambah author baru (perlu auth)
app.post('/authors', checkAuth, (req, res) => {
    const newAuthor = {
        id: authors.length + 1,
        name: req.body.name
    };
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

// 9. PUT update author (perlu auth)
app.put('/authors/:id', checkAuth, (req, res) => {
    const id = Number(req.params.id);
    const author = authors.find(a => a.id === id);

    if (!author) {
        return res.status(404).json({ message: "Author tidak ditemukan" });
    }

    author.name = req.body.name ?? author.name;
    res.json(author);
});

// 10. DELETE hapus author (perlu auth)
app.delete('/authors/:id', checkAuth, (req, res) => {
    const id = Number(req.params.id);
    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Author tidak ditemukan" });
    }

    authors.splice(index, 1);
    res.json({ message: "Author berhasil dihapus" });
});

app.listen(3000, () => {
    console.log("Server aktif di port 3000");
});
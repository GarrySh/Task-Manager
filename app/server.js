import app from '.';

const PORT = process.env.PORT || 5000;

app().listen(PORT, (err) => {
  if (err) {
    throw new Error('error start web server', err);
  }
  console.log(`server start on port ${PORT}`);
});


const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// STATIC FOLDER
app.use(express.static(path.join(__dirname, '../client/build')));

// Start Express listening
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});

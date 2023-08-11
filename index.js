const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});


app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// %-----------EXPERIENCE-----------------
// \section{Experience}
//   \resumeSubHeadingListStart

//     \resumeSubheading
//       {XYZ Company Name}{Location}
//       {XXXXXXXXXXX \& YYYYYYYYYYYY Intern}{May 2019 - Jul. 2019}
//       \resumeItemListStart
//     \item {Work Done List 1}
//     \item {Work Done List 2}
//     % \item {More work done } .....
//     \resumeItemListEnd
    
//     % \resumeSubheading
//     %   {Company A}{Bengaluru, India}
//     %   {API Developer \& Machine Learning Intern}{May. 2018 - Jul. 2018}
//     %   \resumeItemListStart
//     % \item {XXXXXXXXXXXXXXX}
//     %     \item {YYYYYYYYYYYYYYYYYY}
//     % \resumeItemListEnd
      
//   \resumeSubHeadingListEnd
// \vspace{-5.5mm}
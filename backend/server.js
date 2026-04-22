import { PORT } from "./src/config/env.js";
import app from "./src/app.js";

const port = PORT || 3000


app.listen(port, ()=>{
    console.log(`app listened on port ${port}`);
})
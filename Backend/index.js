import express from 'express';
import dotenv from 'dotenv';
import router from './Router/router.js';
import { UAParser } from 'ua-parser-js';
import requestIp from 'request-ip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectdb } from './Database/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // Allow credentials (cookies, authorization headers)
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Your detailed logging middleware (uncommented and fixed)
app.use("/", (req, res, next) => {

    const userAgent = req.headers['user-agent'];
    const ipAddress = requestIp.getClientIp(req).split(':').pop();
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browser = result.browser.name || 'Unknown';
    const os = result.os.name || 'Unknown';

    const formattedTime = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }).format(new Date());

    const info = {
        ipAddress,
        os,
        browser,
        requestTime: formattedTime
    };

    req.info = info;


    // asyncronously write the log to a .csv file
    const currentpathurl = fileURLToPath(import.meta.url);
    const currentdirectory = path.dirname(currentpathurl);

    const logdirectory = path.join(currentdirectory, process.env.LOG_DIRECTORY);
    const logfilepath = path.join(logdirectory, 'log_entry.csv');

    fs.writeFile(logfilepath, `${info.ipAddress},${info.os},${info.browser},${info.requestTime}\n`, { flag: 'a' }, (err) => {
        if (err) {
            console.error(err);
        }

    });


    next();
});

app.get('/', (req, res) => {
    res.send(req.info);
});


connectdb();
app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
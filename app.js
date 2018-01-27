const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./models/index');
const router = require('./router/index');
const colors = require('colors');
const cors = require('cors');
const errorMessage = require('./services/helpers/error')();
const login = require('./services/login')();
const linebot = require('linebot');
const env = process.env.NODE_ENV || 'development';
const lineConfig = require('./config/line.config.json')[env];

const bot = linebot({
  channelId: lineConfig.CHANNEL_ID,
  channelSecret: lineConfig.CHANNEL_SECRET,
  channelAccessToken: lineConfig.CHANNEL_ACCESS_TOKEN
});

bot.on('message', function (event) {
  event.reply(event.message.text).then(function (data) {
    console.log('event.message.text', event.message.text);
    console.log('data', data);
    // success
  }).catch(function (error) {
    console.error(error);
    // error
  });
});

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//token middleware檢查，除了/login 
app.use(/^\/(?!(login$)).*/, (req, res, next) => {
  try {
    let token = req.headers.token;
    let decode = login.verifyToken(token);
    if (decode) {
      if (req.body) {
        req.body.CreateUser = `${decode.Account}`;
        req.body.ModifyUser = `${decode.Account}`;
        req.body.Updator = `${decode.Account}`;
      }
      next();
    }
    else {
      res.status(403).json(errorMessage.logicSend('decode', 'decode 無資料'));
    }
  } catch (error) {
    res.status(403).json(errorMessage.moduleSend('jsonwebtoken', error));
  }
});

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
  const msg = `資料庫已連線並準備完畢`;
  console.log(colors.green('系統訊息: %s'), msg);
});

router(app, db);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;

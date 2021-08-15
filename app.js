const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const connect = require('./schemas');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

// mongoDB 연결 모듈을 불러옵니다.


const app = express();
app.set('port', process.env.PORT || 3002);
app.set('view engine', 'html');
// app을 만들어 줍니다. 포트 번호와 템플릿 엔진을 html(nunjucks)로 설정해줍니다.


nunjucks.configure('views', {
  express : app,
  watch : true
});
// nunjucks의 configure에 app이라는 어플리케이션을 사용하고 바뀔때마다 새로 렌더링한다고 해줍니다.
connect();

app.use(morgan('dev'));
// 개발모드로 morgan을 사용합니다.
app.use(express.static(path.join(__dirname, 'public')));
// 정적 파일의 경로는 public입니다.
app.use(express.json());
// json파일은 express.json()이 다루도록 할 것입니다.
app.use(express.urlencoded({extended : false}));
// extended을 false로 설정해줍니다.

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next)=>{
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트에서 대기중');
});
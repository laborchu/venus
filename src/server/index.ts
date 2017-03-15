import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import Mongodb from './mongodb';
import session = require('express-session');
import cookieParser = require('cookie-parser');
import * as connectRedis from "connect-redis";

let RedisStore = connectRedis(session);

import { MvSession } from './models/index';

/**
 * Client Dir
 * @note `dev` default.
 */
var _clientDir = '../../client/dev';

var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',//通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  name: 'connect.sid',
  store: new RedisStore({
    host: '192.168.1.188',
    port: 32769
  }),
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: 3600000 },
  rolling: false,//每次请求都重会重置cookie的 maxAge，默认值为 false
  resave: true,//即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: true
}));


export function init(port: number, mode: string) {

  //连接mongodb
  let mongdb: Mongodb = new Mongodb();
  mongdb.connect();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(compression());

  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
  });


  /**
   * Dev Mode.
   * @note Dev server will only give for you middleware.
   */
  if (mode == 'dev') {
    let root = path.resolve(process.cwd());
    let clientRoot = path.resolve(process.cwd(), './dist/client/dev');
    app.use(express.static(root));
    app.use(express.static(clientRoot));

    app.all('/*', function(req, res, next) {
      let mvSession: MvSession = <MvSession>req.session;
      if (mvSession.user) {
        next();
      } else {
        // 解析用户请求的路径
        var arr = req.url.split('/');
        // 去除 GET 请求路径上携带的参数
        for (var i = 0, length = arr.length; i < length; i++) {
          arr[i] = arr[i].split('?')[0];
        }
        // api开口的拦截
        if (arr.length > 1 && arr[1] == 'api') {
          res.send({ code: 2 });
        } else {
          next();
        }
      }
    });

    //初始化路由
    let routes = require('./routes');
    routes.init(app);

    var renderIndex = (req: express.Request, res: express.Response) => {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };
    app.get('/*', renderIndex);

    /**
     * Api Routes for `Development`.
     */
  } else {
    /**
     * Prod Mode.
     * @note Prod mod will give you static + middleware.
     */

    /**
     * Client Dir
     */
    _clientDir = '../../client/prod';

    /**
     * Static.
     */
    app.use('/js', express.static(path.resolve(__dirname, _clientDir + '/js')));
    app.use('/css', express.static(path.resolve(__dirname, _clientDir + '/css')));
    app.use('/assets', express.static(path.resolve(__dirname, _clientDir + '/assets')));
    app.use('/fonts', express.static(path.resolve(__dirname, _clientDir + '/fonts')));

    //初始化路由
    let routes = require('./routes');
    routes.init(app);

    /**
     * Spa Res Sender.
     * @param req {any}
     * @param res {any}
     */
    var renderIndex = function(req: express.Request, res: express.Response) {
      res.sendFile(path.resolve(__dirname, _clientDir + '/index.html'));
    };

    /**
     * Prevent server routing and use @ng2-router.
     */
    app.get('/*', renderIndex);
  }

  /**
   * Server with gzip compression.
   */
  return new Promise<http.Server>((resolve, reject) => {
    let server = app.listen(port, () => {
      var port = server.address().port;
      console.log('App is listening on port:' + port);
      resolve(server);
    });
  });
};

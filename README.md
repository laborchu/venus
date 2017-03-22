# venus

venus是基于测试模型的用例在线维护平台，可以生成[macaca](https://macacajs.github.io/)自动化测试脚本

## 服务和环境

- mongodb  #项目配置在venus/src/server/env.json
- redis	#项目配置在venus/src/server/env.json
- nodejs  #类unix环境可以使用[nvm](https://github.com/creationix/nvm)来安装
- pm2  #npm install -g pm2 


## 配置项目

```bash
git clone https://github.com/laborchu/venus.git
cd venus
npm install or cnpm install
```

## 启动项目

### 开发模式
- 启动服务器 pm2 start app.server.dev.js
- 启动前端代理 npm run express.dev -- --scss


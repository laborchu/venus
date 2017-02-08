import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let projects = [
            { id: 11, name: '三通两平台Android' },
            { id: 12, name: '三通两平台Ios' },
            { id: 13, name: '三通两平台Os' }
        ];
        let ucgroups = [
            { id: 10, name: "其他", projectId: 11 },
            { id: 1, name: "信息", projectId: 11 },
            { id: 2, name: "发现", projectId: 11 },
            { id: 3, name: "ios-信息", projectId: 12 },
            { id: 4, name: "ios-发现", projectId: 12 },
            { id: 5, name: "os-信息", projectId: 13 },
            { id: 6, name: "os-发现", projectId: 13 }
        ];
        let ucs = [
            { id: 10, ucKey: "ucKey", sleep: 1000, name: "登陆", groupId: 10, director: "胡立波", build: 0, handler: 1, filter: 1, only: 1 },
            { id: 1, ucKey: "ucKey", sleep: 1000, name: "找回密码", groupId: 10, director: "胡立波", build: 1, handler: 0, filter: 1, only: 1 },
            { id: 2, ucKey: "ucKey", sleep: 1000, name: "会话页面", groupId: 1, director: "胡立波", build: 1, handler: 1, filter: 0, only: 1 },
            { id: 3, ucKey: "ucKey", sleep: 1000, name: "聊天页面", groupId: 1, director: "胡立波", build: 0, handler: 0, filter: 1, only: 1 },
            { id: 4, ucKey: "ucKey", sleep: 1000, name: "教学圈", groupId: 2, director: "胡立波", build: 1, handler: 1, filter: 1, only: 0 },
            { id: 5, ucKey: "ucKey", sleep: 1000, name: "网盘", groupId: 2, director: "胡立波", build: 0, handler: 1, filter: 0, only: 1 },
            { id: 6, ucKey: "ucKey", sleep: 1000, name: "资源库", groupId: 2, director: "胡立波", build: 1, handler: 1, filter: 1, only: 1 }
        ];
        let nodes = [
            { id: 1, name: "验证用户名和密码是否可为空", ucId: 10 },
            { id: 2, name: "验证用户名和密码错误", ucId: 10 }
        ];
        let paths = [
            { id: 1, name: "点击登录", nodeId: 1, type: "click" },
            { id: 2, name: "输入错误用户名", nodeId: 1, type: "input" },
            { id: 2, name: "点击登录", nodeId: 1, type: "click" }
        ];
        return { projects, ucgroups, ucs, nodes, paths };
    }
}
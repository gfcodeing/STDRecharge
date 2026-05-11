# 部署文档

## 环境要求

- Docker
- 云服务器（Linux）

---

## Docker 部署

### 1. 构建镜像

```bash
cd /项目根目录
docker build -t recharge-portal .
```

### 2. 运行容器

```bash
docker run -d --name recharge -p 80:80 recharge-portal
```

访问 `http://你的服务器IP` 即可。

### 3. 自定义端口

如果 80 端口被占用：

```bash
docker run -d --name recharge -p 8080:80 recharge-portal
```

### 4. 更新部署

```bash
docker stop recharge && docker rm recharge
docker build -t recharge-portal .
docker run -d --name recharge -p 80:80 recharge-portal
```

### 5. Docker Compose（可选）

创建 `docker-compose.yml`：

```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "80:80"
    restart: always
```

启动：

```bash
docker compose up -d --build
```

更新时重新执行同一条命令即可。

---

## 注意事项

- 本项目是纯前端，无后端进程，Nginx 托管静态文件即可
- API 请求直接发往 `https://k.171mail.com`，需要甲方服务器允许你域名的跨域访问（CORS）
- 如果遇到跨域问题，可在 Nginx 配置（`nginx.conf`）中加一层反向代理：

```nginx
location /api/ {
    proxy_pass https://k.171mail.com/api/;
    proxy_set_header Host k.171mail.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_ssl_server_name on;
}
```

然后把 `src/config.js` 中的 `API_BASE_URL` 改回 `/api`，重新构建镜像部署。

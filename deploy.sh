#!/bin/bash
# ===== 配置区 =====
# 镜像名称（Docker镜像名）
IMAGE_NAME="recharge-portal"
# 容器名称（Docker容器名）
CONTAINER_NAME="recharge"
# 映射端口（宿主机端口:容器端口）
HOST_PORT=7734
# 仓库地址（Git仓库地址）
REPO_URL="https://github.com/gfcodeing/STDRecharge.git"
# 部署目录（服务器上的项目路径）
DEPLOY_DIR="/opt/STDRecharge"
# ===== 配置区 END =====

set -e

echo "====== 开始部署 ======"

# 拉取/更新代码
if [ -d "$DEPLOY_DIR" ]; then
  echo "[1/4] 更新代码..."
  cd "$DEPLOY_DIR"
  git pull
else
  echo "[1/4] 拉取代码..."
  git clone "$REPO_URL" "$DEPLOY_DIR"
  cd "$DEPLOY_DIR"
fi

# 停止并删除旧容器（如果存在）
echo "[2/4] 清理旧容器..."
docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

# 构建镜像
echo "[3/4] 构建镜像..."
docker build -t "$IMAGE_NAME" .

# 启动容器
echo "[4/4] 启动容器..."
docker run -d \
  --name "$CONTAINER_NAME" \
  -p 127.0.0.1:"$HOST_PORT":80 \
  --restart always \
  "$IMAGE_NAME"

echo "====== 部署完成 ======"
echo "访问地址: http://$(hostname -I | awk '{print $1}'):$HOST_PORT"

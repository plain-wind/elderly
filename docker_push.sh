#!/bin/zsh

# --- 变量配置 ---
IMG_NAME="elderly-app"
SERVER="root@60.205.210.214"
PORT="22" # SSH 端口
EXT_PORT="8080" # 对外访问端口
INT_PORT="80" # 容器内部端口
TAR_NAME="${IMG_NAME}.tar"

echo "🛠️ 开始本地构建..."
docker build -t $IMG_NAME .
echo "✅ 镜像 $IMG_NAME 构建成功！"

echo "📦 正在导出镜像..."
docker save -o $TAR_NAME $IMG_NAME
echo "✅ 镜像 $IMG_NAME 导出成功！"

echo "🚚 正在上传到服务器 (免密模式)..."
# -P 是指定 SSH 端口
scp -P $PORT $TAR_NAME $SERVER:/tmp/
echo "✅ 镜像上传服务器成功！"

echo "📦 正在清理本地临时文件..."
rm $TAR_NAME
echo "✅ 本地临时文件清理完成！"

echo "🚀 远程部署中..."
# 这里使用 << EOF 模式，后续命令都会在远程执行
ssh -p $PORT $SERVER << EOF

    # 远程安装 Docker（如未安装）
    if ! command -v docker &>/dev/null; then
		echo "❌ 未安装 Docker，开始自动安装..."
		curl -fsSL https://get.docker.com | bash
		systemctl enable docker
		systemctl start docker
		echo "✅ Docker 安装完成！"
    fi

    # 加载镜像
	echo "📦 正在加载镜像..."
    docker load -i /tmp/$TAR_NAME
	echo "✅ 镜像加载成功！"
    
    # 停止并移除旧容器（如果存在）
    docker stop $IMG_NAME 2>/dev/null || true
    docker rm $IMG_NAME 2>/dev/null || true
    
    # 启动新容器
	echo "🚀 正在启动容器..."
    docker run -d \
        --name $IMG_NAME \
        -p $EXT_PORT:$INT_PORT \
        --restart=always \
        $IMG_NAME
	echo "✅ 容器启动成功！"
    
    # 清理临时文件和虚悬镜像
    rm /tmp/$TAR_NAME
    docker image prune -f
    
    echo "✅ 远程部署完成！"
    docker ps | grep $IMG_NAME
EOF

echo "✨ 全部流程已完成！"
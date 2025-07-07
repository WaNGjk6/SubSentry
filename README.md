# SubSentry - 服务监控与到期时间

这是一个使用 Node.js 和 Express 构建的简单后端服务，用于监控和管理各项服务的订阅情况。它提供了一套 RESTful API，用于追踪服务的供应商、名称、起始日期和到期日期等详细信息。以及手动续期以防止云资源过多导致忘记续费而丢失数据





## 效果图
![image](https://github.com/user-attachments/assets/5e74d681-815f-402e-ad9d-c918a931c7a2)

## 环境要求

在开始之前，请确保您已安装以下软件：
- [Node.js](https://nodejs.org/) 
- [MySQL](https://www.mysql.com/) 

## 快速开始

请按照以下步骤来设置并运行您的本地开发环境。

### 1. 克隆代码仓库

首先，将此代码仓库克隆到您的本地计算机。
```bash
# 如果您正在使用 Git，可以像这样克隆它：
# git clone <repository-url>
# cd service-monitor-backend
```

### 2. 安装依赖

在项目的根目录中运行以下命令，以安装所需的 npm 包：
```bash
npm install
```

### 3. 设置数据库

项目提供了一个 SQL 脚本来初始化数据库并创建所需的表。

1.  请确保您的 MySQL 服务器正在运行。
2.  连接到您的 MySQL 客户端并运行该脚本。您可以通过命令行执行此操作：
    ```bash
    # 将 'your_username' 替换为您的真实 MySQL 用户名
    mysql -u your_username -p < database.sql
    ```
3.  系统将提示您输入 MySQL 密码以执行脚本。这将创建 `service_monitor` 数据库和 `services` 表。

### 4. 配置环境变量

使用 `.env` 文件来管理配置数据库凭据。

1.  创建示例环境文件的副本，并将其命名为 `.env`：
    ```bash
    # 在 Windows 上，您可以使用：
    copy .env.example .env
    
    # 在 macOS/Linux 上，您可以使用：
    # cp .env.example .env
    ```
2.  打开新创建的 `.env` 文件，并更新数据库凭据（`DB_USER`、`DB_PASSWORD` 等）以匹配您的 MySQL 账号密码。

## 运行应用

设置完成后，您可以使用以下命令启动服务器：
```bash
npm start
```
后端服务器将会启动，您应该会在控制台中看到一条确认消息：
```
✅ 服务器已启动，正在监听 http://localhost:3000
```
这时，您就可以直接打开Index查看效果并配置了。
强烈建议将MySql数据库部署到靠谱的云服务上，以防止数据库丢失导致的数据丢失。
## API 接口

应用提供了以下 API 接口：

-   `GET /api/services`: 获取所有服务的列表，按到期日期排序。
-   `POST /api/services`: 向数据库中添加一个新服务。
-   `PUT /api/services/:id/renew`: 通过更新其到期日期来续订现有服务。
-   `DELETE /api/services/:id`: 从数据库中删除一个服务。

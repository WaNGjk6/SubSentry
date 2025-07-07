// 引入所需模块
require('dotenv').config(); // 在文件顶部加载 .env 配置文件
const express = require('express');
const mysql = require('mysql2/promise'); // 引入 promise 版本的 mysql2 库
const cors = require('cors');

// --- 应用基本配置 ---
const app = express();
const PORT = process.env.PORT || 3000; // 从环境变量读取服务器端口，如果未定义则使用 3000

// --- 数据库连接配置 ---
// 从环境变量中读取数据库连接信息
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// --- 中间件设置 ---
app.use(cors()); // 启用 CORS，允许所有来源的跨域请求，便于前后端分离开发
app.use(express.json()); // 启用 Express 内置的 JSON 解析中间件，用于解析请求体中的 JSON 数据

// --- API 路由定义 ---

// GET /api/services - 获取所有服务的列表
app.get('/api/services', async (req, res) => {
    try {
        // 建立数据库连接
        const connection = await mysql.createConnection(dbConfig);
        // 执行查询，获取所有服务，并按到期日期升序排序
        const [rows] = await connection.execute('SELECT *, DATE_FORMAT(start_date, "%Y-%m-%d") as startDate, DATE_FORMAT(expiry_date, "%Y-%m-%d") as expiryDate FROM services ORDER BY expiry_date ASC');
        // 关闭数据库连接
        await connection.end();
        // 以 JSON 格式返回查询结果
        res.json(rows);
    } catch (error) {
        console.error('获取数据失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// POST /api/services - 添加一个新的服务
app.post('/api/services', async (req, res) => {
    try {
        // 从请求体中解构出服务信息
        const { vendor, name, category, startDate, expiryDate } = req.body;
        // 建立数据库连接
        const connection = await mysql.createConnection(dbConfig);
        // 执行插入操作
        const [result] = await connection.execute(
            'INSERT INTO services (vendor, name, category, start_date, expiry_date) VALUES (?, ?, ?, ?, ?)',
            [vendor, name, category, startDate, expiryDate]
        );
        // 关闭数据库连接
        await connection.end();
        // 返回成功状态码 201 和新创建的服务信息
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error('添加数据失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// PUT /api/services/:id/renew - 续订一个服务
app.put('/api/services/:id/renew', async (req, res) => {
    try {
        // 从 URL 参数中获取服务 ID
        const { id } = req.params;
        // 从请求体中获取新的到期日期
        const { newExpiryDate } = req.body;
        // 建立数据库连接
        const connection = await mysql.createConnection(dbConfig);
        // 执行更新操作
        await connection.execute('UPDATE services SET expiry_date = ? WHERE id = ?', [newExpiryDate, id]);
        // 关闭数据库连接
        await connection.end();
        // 返回成功消息
        res.json({ message: '续费成功' });
    } catch (error) {
        console.error('续费失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// DELETE /api/services/:id - 删除一个服务
app.delete('/api/services/:id', async (req, res) => {
    try {
        // 从 URL 参数中获取服务 ID
        const { id } = req.params;
        // 建立数据库连接
        const connection = await mysql.createConnection(dbConfig);
        // 执行删除操作
        await connection.execute('DELETE FROM services WHERE id = ?', [id]);
        // 关闭数据库连接
        await connection.end();
        // 返回成功消息
        res.json({ message: '删除成功' });
    } catch (error) {
        console.error('删除失败:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});


// --- 启动服务器 ---
app.listen(PORT, () => {
    console.log(`✅ 服务器已启动，正在监听 http://localhost:${PORT}`);
});

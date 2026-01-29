# 企业微信客户管理系统 - 第一期 MVP 设计文档

## 📦 文件说明

本次交付包含以下文件:

### 1. 企业微信客户管理系统_MVP设计文档.docx
**详细的功能设计文档**,包含:
- 项目概述与目标
- 技术架构设计
- 功能详细设计(客户管理、员工通讯录、跟进记录、数据统计)
- 数据库设计(完整的表结构)
- API接口设计
- 开发计划与时间安排

### 2. 页面设计原型.html
**可交互的页面设计原型**,包含以下页面:
- 数据概览 Dashboard
- 客户列表页
- 客户详情页
- 员工通讯录页
- 跟进记录页

**使用方法**: 直接在浏览器中打开此HTML文件即可查看和交互

---

## 🎯 第一期 MVP 核心功能

### 1. 客户信息管理
- ✅ 客户列表展示与搜索
- ✅ 客户详情查看
- ✅ 客户标签管理
- ✅ 客户备注编辑

### 2. 员工通讯录同步
- ✅ 组织架构树形展示
- ✅ 员工信息管理
- ✅ 部门层级结构

### 3. 客户跟进记录
- ✅ 添加跟进记录
- ✅ 跟进历史时间线
- ✅ 跟进记录筛选与搜索

### 4. 基础数据统计
- ✅ 核心指标卡片
- ✅ 客户增长趋势
- ✅ 员工业绩排行

---

## 🛠 技术栈

### 前端
- **框架**: Vue 3.4 + TypeScript 5.0
- **UI组件库**: Ant Design Vue 4.2.6
- **构建工具**: Vite 5.0
- **状态管理**: Pinia 2.1
- **路由**: Vue Router 4.0
- **HTTP请求**: Axios
- **图表**: ECharts

### 后端
- **语言**: Golang 1.21+
- **Web框架**: Gin 1.9
- **ORM**: GORM 1.23
- **配置管理**: Viper
- **日志**: Logrus
- **API文档**: Swagger (swaggo/gin-swagger)

### 数据库
- **主数据库**: MySQL 8.0
- **缓存**: Redis 7.0

### 企业微信集成
- **API文档**: https://developer.work.weixin.qq.com/document/

### 部署
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx

---

## 📊 核心数据模型 (GORM)

### Customer (客户模型)
```go
type Customer struct {
    ID             uint      `gorm:"primaryKey"`
    ExternalUserID string    `gorm:"uniqueIndex;size:100;not null"`
    Name           string    `gorm:"size:100"`
    Avatar         string    `gorm:"size:500"`
    Gender         int8      `gorm:"default:0"`
    CorpName       string    `gorm:"size:200"`
    Position       string    `gorm:"size:100"`
    UserID         string    `gorm:"size:100;index"`
    Remark         string    `gorm:"type:text"`
    CreateTime     int64     `gorm:"index"`
    CreatedAt      time.Time
    UpdatedAt      time.Time
    DeletedAt      gorm.DeletedAt `gorm:"index"`
}
```

### Employee (员工模型)
```go
type Employee struct {
    ID            uint      `gorm:"primaryKey"`
    UserID        string    `gorm:"uniqueIndex;size:100;not null"`
    Name          string    `gorm:"size:100"`
    Avatar        string    `gorm:"size:500"`
    Position      string    `gorm:"size:100"`
    Mobile        string    `gorm:"size:20"`
    Email         string    `gorm:"size:100"`
    DepartmentIDs string    `gorm:"type:text"` // JSON array
    Status        int8      `gorm:"default:1"`
    CreatedAt     time.Time
    UpdatedAt     time.Time
    DeletedAt     gorm.DeletedAt `gorm:"index"`
}
```

### FollowRecord (跟进记录模型)
```go
type FollowRecord struct {
    ID             uint      `gorm:"primaryKey"`
    CustomerID     uint      `gorm:"index;not null"`
    EmployeeID     uint      `gorm:"index;not null"`
    FollowTime     time.Time `gorm:"index;not null"`
    FollowType     string    `gorm:"size:20"` // phone/wechat/meeting/email
    Content        string    `gorm:"type:text;not null"`
    Feedback       string    `gorm:"type:text"`
    NextFollowTime *time.Time
    Attachments    string    `gorm:"type:text"` // JSON array
    CreatedAt      time.Time
    UpdatedAt      time.Time
    DeletedAt      gorm.DeletedAt `gorm:"index"`
    
    // Associations
    Customer       Customer  `gorm:"foreignKey:CustomerID"`
    Employee       Employee  `gorm:"foreignKey:EmployeeID"`
}
```

---

## 🚀 开发计划

### 第一阶段: 基础框架搭建 (1周)
- 前后端项目脚手架
- 数据库表结构创建
- 企业微信API对接测试

### 第二阶段: 核心功能开发 (2-3周)
- 数据同步模块
- 客户管理模块
- 员工通讯录模块
- 跟进记录模块

### 第三阶段: 统计分析与优化 (1-2周)
- Dashboard统计模块
- 图表展示
- 性能优化

### 第四阶段: 测试与上线 (1周)
- 功能测试
- Bug修复
- 部署上线

**预计总开发周期**: 5-7周

---

## 📝 后续扩展方向

第一期MVP完成后,可以考虑以下扩展功能:

- 客户群管理
- 营销工具(群发、素材库)
- 销售线索与商机管理
- 高级数据分析
- 自动化规则
- 会话存档与敏感词监控
- 移动端支持

---

## 🔗 企业微信API参考

### 主要API接口

**通讯录管理**
- GET https://qyapi.weixin.qq.com/cgi-bin/user/list - 获取部门成员
- GET https://qyapi.weixin.qq.com/cgi-bin/department/list - 获取部门列表

**客户联系**
- POST https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_follow_user_list - 获取配置了客户联系功能的成员列表
- GET https://qyapi.weixin.qq.com/cgi-bin/externalcontact/list - 获取客户列表
- GET https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get - 获取客户详情

**获取Access Token**
- GET https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRET

---

## 💡 Golang开发建议

1. **项目结构**
   - 遵循标准Golang项目布局
   - cmd/server/main.go 作为程序入口
   - internal/ 存放私有应用代码
   - pkg/ 存放可复用的公共库

2. **GORM最佳实践**
   - 使用AutoMigrate自动创建表结构
   - 合理使用预加载(Preload)避免N+1查询
   - 使用事务保证数据一致性
   - 软删除保护重要数据

3. **并发处理**
   - 使用Goroutine并发调用企业微信API
   - 使用sync.WaitGroup等待所有goroutine完成
   - 使用channel进行goroutine间通信
   - 注意并发安全,使用mutex保护共享资源

4. **性能优化**
   - 使用Redis缓存高频访问数据(access_token等)
   - 数据库查询添加合适的索引
   - 使用连接池管理数据库连接
   - 分页查询大数据量列表

5. **错误处理**
   - 统一错误处理和日志记录
   - API返回统一的错误码和错误信息
   - 敏感信息不要暴露在错误消息中

6. **代码规范**
   - 遵循Go官方代码规范
   - 使用golangci-lint进行代码检查
   - 编写单元测试,保证代码质量
   - 使用godoc生成API文档

---

## 📞 联系方式

如有任何问题或需要进一步讨论,欢迎随时联系。

---

**文档版本**: v1.1  
**创建日期**: 2026-01-28  
**最后更新**: 2026-01-28  
**技术栈**: Vue 3 + Ant Design Vue 4.2.6 + Golang + Gin + GORM

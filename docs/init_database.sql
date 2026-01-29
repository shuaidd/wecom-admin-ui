-- =============================================
-- 企业微信客户管理系统数据库初始化脚本
-- 版本: v1.0
-- 创建日期: 2026-01-29
-- =============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS wecom_admin DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wecom_admin;

-- =============================================
-- 1. 客户相关表
-- =============================================

-- 客户信息表
CREATE TABLE IF NOT EXISTS `customers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    
    -- 企业微信字段
    `external_userid` VARCHAR(100) NOT NULL UNIQUE COMMENT '企业微信外部联系人ID',
    `name` VARCHAR(100) DEFAULT '' COMMENT '客户姓名',
    `avatar` VARCHAR(500) DEFAULT '' COMMENT '客户头像URL',
    `gender` TINYINT DEFAULT 0 COMMENT '性别:0未知,1男,2女',
    `type` TINYINT DEFAULT 1 COMMENT '类型:1微信用户,2企业微信用户',
    
    -- 企业信息
    `corp_name` VARCHAR(200) DEFAULT '' COMMENT '客户公司名称',
    `corp_full_name` VARCHAR(300) DEFAULT '' COMMENT '客户公司全称',
    `position` VARCHAR(100) DEFAULT '' COMMENT '客户职位',
    
    -- 联系方式
    `unionid` VARCHAR(100) DEFAULT '' COMMENT '微信UnionID',
    
    -- 扩展信息
    `external_profile` TEXT COMMENT '客户扩展信息JSON',
    
    -- 统计字段
    `follow_user_count` INT DEFAULT 0 COMMENT '跟进员工数',
    `follow_count` INT DEFAULT 0 COMMENT '跟进记录数',
    `last_follow_time` DATETIME NULL COMMENT '最后跟进时间',
    
    -- 业务字段
    `source` VARCHAR(50) DEFAULT '' COMMENT '客户来源',
    `status` VARCHAR(20) DEFAULT 'normal' COMMENT '客户状态:normal正常,lost流失,deleted删除',
    `priority` TINYINT DEFAULT 0 COMMENT '优先级:0普通,1重要,2非常重要',
    
    INDEX `idx_deleted_at` (`deleted_at`),
    INDEX `idx_unionid` (`unionid`),
    INDEX `idx_status` (`status`),
    INDEX `idx_last_follow_time` (`last_follow_time`),
    INDEX `idx_corp_name` (`corp_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户信息表';

-- 客户跟进用户关系表
CREATE TABLE IF NOT EXISTS `customer_follow_users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    
    `customer_id` BIGINT UNSIGNED NOT NULL COMMENT '客户ID',
    `employee_id` BIGINT UNSIGNED NOT NULL COMMENT '员工ID',
    `userid` VARCHAR(100) NOT NULL COMMENT '企业微信员工UserID',
    
    -- 跟进信息
    `remark` VARCHAR(200) DEFAULT '' COMMENT '员工对客户的备注',
    `description` TEXT COMMENT '员工对客户的描述',
    `remark_corp_name` VARCHAR(200) DEFAULT '' COMMENT '员工备注的客户公司名',
    `remark_mobiles` TEXT COMMENT '员工备注的客户手机号JSON数组',
    
    -- 添加信息
    `add_way` TINYINT DEFAULT 0 COMMENT '添加方式',
    `add_time` DATETIME NOT NULL COMMENT '添加时间',
    `state` VARCHAR(100) DEFAULT '' COMMENT '渠道标识',
    `oper_userid` VARCHAR(100) DEFAULT '' COMMENT '操作人UserID',
    
    -- 视频号信息
    `wechat_channels` TEXT COMMENT '视频号信息JSON',
    
    -- 统计字段
    `follow_count` INT DEFAULT 0 COMMENT '跟进次数',
    `last_follow_time` DATETIME NULL COMMENT '最后跟进时间',
    
    `status` VARCHAR(20) DEFAULT 'normal' COMMENT '关系状态',
    
    INDEX `idx_customer_id` (`customer_id`),
    INDEX `idx_employee_id` (`employee_id`),
    INDEX `idx_userid` (`userid`),
    INDEX `idx_status` (`status`),
    UNIQUE INDEX `idx_customer_employee` (`customer_id`, `employee_id`),
    
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户跟进用户关系表';

-- 客户标签表
CREATE TABLE IF NOT EXISTS `customer_tags` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    
    `tag_id` VARCHAR(100) NOT NULL UNIQUE COMMENT '企业微信标签ID',
    `tag_name` VARCHAR(100) NOT NULL COMMENT '标签名称',
    `group_name` VARCHAR(100) DEFAULT '' COMMENT '标签组名称',
    `type` TINYINT DEFAULT 1 COMMENT '标签类型:1企业标签,2个人标签,3规则组标签',
    
    `color` VARCHAR(20) DEFAULT 'blue' COMMENT '标签颜色',
    `order` INT DEFAULT 0 COMMENT '排序',
    
    `customer_count` INT DEFAULT 0 COMMENT '使用该标签的客户数',
    
    INDEX `idx_tag_name` (`tag_name`),
    INDEX `idx_group_name` (`group_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户标签表';

-- 客户标签关系表
CREATE TABLE IF NOT EXISTS `customer_tag_relations` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` BIGINT UNSIGNED NOT NULL COMMENT '客户ID',
    `tag_id` BIGINT UNSIGNED NOT NULL COMMENT '标签ID',
    `employee_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '打标签的员工ID',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    
    INDEX `idx_customer_id` (`customer_id`),
    INDEX `idx_tag_id` (`tag_id`),
    INDEX `idx_employee_id` (`employee_id`),
    UNIQUE INDEX `idx_customer_tag` (`customer_id`, `tag_id`),
    
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`tag_id`) REFERENCES `customer_tags`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='客户标签关系表';

-- =============================================
-- 2. 员工和部门表
-- =============================================

-- 员工信息表
CREATE TABLE IF NOT EXISTS `employees` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    
    -- 企业微信字段
    `userid` VARCHAR(100) NOT NULL UNIQUE COMMENT '企业微信UserID',
    `name` VARCHAR(100) DEFAULT '' COMMENT '员工姓名',
    `alias` VARCHAR(100) DEFAULT '' COMMENT '别名',
    
    -- 头像
    `avatar` VARCHAR(500) DEFAULT '' COMMENT '头像URL',
    `thumb_avatar` VARCHAR(500) DEFAULT '' COMMENT '缩略图URL',
    
    -- 基本信息
    `gender` VARCHAR(10) DEFAULT '0' COMMENT '性别:1男,2女',
    `position` VARCHAR(100) DEFAULT '' COMMENT '职位',
    `mobile` VARCHAR(20) DEFAULT '' COMMENT '手机号',
    `email` VARCHAR(100) DEFAULT '' COMMENT '邮箱',
    `biz_mail` VARCHAR(100) DEFAULT '' COMMENT '企业邮箱',
    `telephone` VARCHAR(50) DEFAULT '' COMMENT '座机',
    `address` VARCHAR(200) DEFAULT '' COMMENT '地址',
    
    -- 部门信息
    `main_department` INT DEFAULT 0 COMMENT '主部门ID',
    `department_ids` TEXT COMMENT '部门ID列表JSON',
    `orders` TEXT COMMENT '部门内排序JSON',
    `is_leader_in_dept` TEXT COMMENT '是否部门领导JSON',
    `direct_leader` TEXT COMMENT '直属上级JSON',
    
    -- 对外信息
    `external_position` VARCHAR(100) DEFAULT '' COMMENT '对外职务',
    `external_profile` TEXT COMMENT '对外扩展信息JSON',
    
    -- 扩展属性
    `extattr` TEXT COMMENT '扩展属性JSON',
    
    -- 状态
    `status` TINYINT DEFAULT 1 COMMENT '状态:1已激活,2已禁用,4未激活,5退出企业',
    `qr_code` VARCHAR(500) DEFAULT '' COMMENT '员工二维码',
    `open_userid` VARCHAR(100) DEFAULT '' COMMENT 'OpenUserID',
    
    -- 统计字段
    `customer_count` INT DEFAULT 0 COMMENT '客户数量',
    `follow_count` INT DEFAULT 0 COMMENT '跟进记录数',
    
    INDEX `idx_deleted_at` (`deleted_at`),
    INDEX `idx_name` (`name`),
    INDEX `idx_mobile` (`mobile`),
    INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工信息表';

-- 部门信息表
CREATE TABLE IF NOT EXISTS `departments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    
    `dept_id` INT NOT NULL UNIQUE COMMENT '企业微信部门ID',
    `name` VARCHAR(100) NOT NULL COMMENT '部门名称',
    `name_en` VARCHAR(100) DEFAULT '' COMMENT '部门英文名',
    `parentid` INT DEFAULT 0 COMMENT '父部门ID',
    `order` INT DEFAULT 0 COMMENT '排序',
    
    `department_leader` TEXT COMMENT '部门负责人UserID列表JSON',
    
    `employee_count` INT DEFAULT 0 COMMENT '部门员工数',
    `child_count` INT DEFAULT 0 COMMENT '子部门数',
    
    INDEX `idx_dept_id` (`dept_id`),
    INDEX `idx_parentid` (`parentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='部门信息表';

-- 员工部门关系表
CREATE TABLE IF NOT EXISTS `employee_departments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `employee_id` BIGINT UNSIGNED NOT NULL COMMENT '员工ID',
    `department_id` BIGINT UNSIGNED NOT NULL COMMENT '部门ID',
    `order` INT DEFAULT 0 COMMENT '部门内排序',
    `is_leader` TINYINT DEFAULT 0 COMMENT '是否部门领导',
    
    INDEX `idx_employee_id` (`employee_id`),
    INDEX `idx_department_id` (`department_id`),
    UNIQUE INDEX `idx_employee_department` (`employee_id`, `department_id`),
    
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工部门关系表';

-- =============================================
-- 3. 跟进记录表
-- =============================================

CREATE TABLE IF NOT EXISTS `follow_records` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    
    `customer_id` BIGINT UNSIGNED NOT NULL COMMENT '客户ID',
    `employee_id` BIGINT UNSIGNED NOT NULL COMMENT '员工ID',
    
    -- 跟进信息
    `follow_time` DATETIME NOT NULL COMMENT '跟进时间',
    `follow_type` VARCHAR(20) NOT NULL COMMENT '跟进方式:phone,wechat,meeting,email,visit,other',
    
    -- 内容
    `content` TEXT NOT NULL COMMENT '跟进内容',
    `feedback` TEXT COMMENT '客户反馈',
    
    -- 下次跟进
    `next_follow_time` DATETIME NULL COMMENT '下次跟进时间',
    `next_follow_plan` TEXT COMMENT '下次跟进计划',
    
    -- 附件
    `attachments` TEXT COMMENT '附件JSON数组',
    `images` TEXT COMMENT '图片JSON数组',
    
    -- 业务字段
    `stage` VARCHAR(50) DEFAULT 'lead' COMMENT '客户阶段:lead线索,opportunity商机,customer客户',
    `intent` TINYINT DEFAULT 0 COMMENT '意向度:0无,1低,2中,3高',
    `amount` DECIMAL(15,2) DEFAULT 0.00 COMMENT '预计金额',
    
    `duration` INT DEFAULT 0 COMMENT '沟通时长(分钟)',
    
    INDEX `idx_deleted_at` (`deleted_at`),
    INDEX `idx_customer_id` (`customer_id`),
    INDEX `idx_employee_id` (`employee_id`),
    INDEX `idx_follow_time` (`follow_time`),
    INDEX `idx_next_follow_time` (`next_follow_time`),
    INDEX `idx_follow_type` (`follow_type`),
    
    FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='跟进记录表';

-- =============================================
-- 4. 系统管理表
-- =============================================

-- 同步日志表
CREATE TABLE IF NOT EXISTS `sync_logs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    
    `sync_type` VARCHAR(50) NOT NULL COMMENT '同步类型:employee,department,customer',
    `sync_mode` VARCHAR(20) NOT NULL COMMENT '同步模式:manual,auto,scheduled',
    
    `status` VARCHAR(20) NOT NULL COMMENT '状态:running,success,failed',
    `total_count` INT DEFAULT 0 COMMENT '总数量',
    `success_count` INT DEFAULT 0 COMMENT '成功数量',
    `failed_count` INT DEFAULT 0 COMMENT '失败数量',
    
    `start_time` DATETIME NOT NULL COMMENT '开始时间',
    `end_time` DATETIME NULL COMMENT '结束时间',
    `duration` INT DEFAULT 0 COMMENT '耗时(秒)',
    
    `error_msg` TEXT COMMENT '错误信息',
    `detail` TEXT COMMENT '详细信息JSON',
    
    `operator_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '操作人ID',
    `operator_name` VARCHAR(100) DEFAULT '' COMMENT '操作人姓名',
    
    INDEX `idx_sync_type` (`sync_type`),
    INDEX `idx_status` (`status`),
    INDEX `idx_start_time` (`start_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据同步日志表';

-- 系统配置表
CREATE TABLE IF NOT EXISTS `system_configs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    
    `config_key` VARCHAR(100) NOT NULL UNIQUE COMMENT '配置键',
    `config_value` TEXT COMMENT '配置值',
    `config_type` VARCHAR(20) DEFAULT 'string' COMMENT '配置类型:string,number,bool,json',
    
    `name` VARCHAR(100) DEFAULT '' COMMENT '配置名称',
    `description` TEXT COMMENT '配置描述',
    `category` VARCHAR(50) DEFAULT '' COMMENT '配置分类',
    
    `is_public` TINYINT(1) DEFAULT 0 COMMENT '是否公开',
    `is_editable` TINYINT(1) DEFAULT 1 COMMENT '是否可编辑',
    
    INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- 用户表(后台管理)
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    
    `username` VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    `password` VARCHAR(200) NOT NULL COMMENT '密码(加密)',
    `salt` VARCHAR(50) DEFAULT '' COMMENT '密码盐',
    
    `name` VARCHAR(100) DEFAULT '' COMMENT '姓名',
    `email` VARCHAR(100) DEFAULT '' COMMENT '邮箱',
    `mobile` VARCHAR(20) DEFAULT '' COMMENT '手机号',
    `avatar` VARCHAR(500) DEFAULT '' COMMENT '头像',
    
    `role` VARCHAR(20) DEFAULT 'user' COMMENT '角色:admin,manager,user',
    
    `employee_id` BIGINT UNSIGNED DEFAULT NULL COMMENT '关联的员工ID',
    `employee_userid` VARCHAR(100) DEFAULT '' COMMENT '关联的员工UserID',
    
    `status` TINYINT DEFAULT 1 COMMENT '状态:1正常,2禁用',
    `last_login` DATETIME NULL COMMENT '最后登录时间',
    `last_login_ip` VARCHAR(50) DEFAULT '' COMMENT '最后登录IP',
    
    INDEX `idx_deleted_at` (`deleted_at`),
    INDEX `idx_employee_id` (`employee_id`),
    
    FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- =============================================
-- 5. 初始化配置数据
-- =============================================

INSERT INTO `system_configs` (`config_key`, `config_value`, `config_type`, `name`, `description`, `category`, `is_public`, `is_editable`) VALUES
('wechat.corp_id', '', 'string', '企业ID', '企业微信CorpID', 'wechat', 0, 1),
('wechat.contact_secret', '', 'string', '通讯录Secret', '通讯录管理Secret', 'wechat', 0, 1),
('wechat.customer_secret', '', 'string', '客户联系Secret', '客户联系Secret', 'wechat', 0, 1),
('sync.auto_enabled', 'true', 'bool', '自动同步开关', '是否开启自动定时同步', 'sync', 1, 1),
('sync.interval_hours', '2', 'number', '同步间隔(小时)', '自动同步的时间间隔', 'sync', 1, 1),
('sync.batch_size', '100', 'number', '批次大小', '每批次同步的数量', 'sync', 1, 1),
('system.timezone', 'Asia/Shanghai', 'string', '时区', '系统时区设置', 'system', 1, 1),
('system.page_size', '20', 'number', '默认分页大小', '列表页默认每页显示数量', 'system', 1, 1);

-- =============================================
-- 6. 示例数据 (可选,用于测试)
-- =============================================

-- 插入示例部门
INSERT INTO `departments` (`dept_id`, `name`, `name_en`, `parentid`, `order`) VALUES
(1, '全公司', 'Company', 0, 1),
(2, '销售部', 'Sales', 1, 1),
(3, '技术部', 'Technology', 1, 2),
(4, '市场部', 'Marketing', 1, 3),
(5, '运营部', 'Operations', 1, 4);

-- 插入示例员工
INSERT INTO `employees` (`userid`, `name`, `position`, `mobile`, `email`, `main_department`, `status`) VALUES
('lisales', '李销售', '销售经理', '13800000001', 'lisales@company.com', 2, 1),
('zhangadvisor', '张顾问', '客户顾问', '13800000002', 'zhangadvisor@company.com', 2, 1),
('wangmanager', '王经理', '市场经理', '13800000003', 'wangmanager@company.com', 4, 1),
('zhaoeng', '赵工程师', '技术支持', '13800000004', 'zhaoeng@company.com', 3, 1);

-- 插入示例用户
INSERT INTO `users` (`username`, `password`, `name`, `email`, `role`, `status`) VALUES
('admin', '$2a$10$dummy_hash_for_password_admin', '管理员', 'admin@company.com', 'admin', 1);

-- 插入示例标签
INSERT INTO `customer_tags` (`tag_id`, `tag_name`, `group_name`, `type`, `color`) VALUES
('tag_001', '高意向', '客户状态', 1, 'blue'),
('tag_002', '待跟进', '客户状态', 1, 'orange'),
('tag_003', '互联网', '行业分类', 1, 'green'),
('tag_004', '金融', '行业分类', 1, 'purple'),
('tag_005', 'VIP客户', '客户等级', 1, 'red');

-- =============================================
-- 7. 创建视图(用于常用查询)
-- =============================================

-- 客户统计视图
CREATE OR REPLACE VIEW `v_customer_statistics` AS
SELECT 
    DATE(c.created_at) as date,
    COUNT(*) as new_count,
    COUNT(CASE WHEN c.status = 'lost' THEN 1 END) as lost_count,
    COUNT(CASE WHEN c.status = 'normal' THEN 1 END) as active_count
FROM customers c
WHERE c.deleted_at IS NULL
GROUP BY DATE(c.created_at);

-- 员工业绩视图
CREATE OR REPLACE VIEW `v_employee_performance` AS
SELECT 
    e.id as employee_id,
    e.userid,
    e.name as employee_name,
    e.position,
    COUNT(DISTINCT cfu.customer_id) as customer_count,
    COUNT(DISTINCT fr.id) as follow_count,
    MAX(fr.follow_time) as last_follow_time
FROM employees e
LEFT JOIN customer_follow_users cfu ON e.id = cfu.employee_id AND cfu.status = 'normal'
LEFT JOIN follow_records fr ON e.id = fr.employee_id AND fr.deleted_at IS NULL
WHERE e.deleted_at IS NULL AND e.status = 1
GROUP BY e.id, e.userid, e.name, e.position;

-- =============================================
-- 8. 创建存储过程(用于数据统计)
-- =============================================

DELIMITER //

-- 更新客户统计字段的存储过程
CREATE PROCEDURE `sp_update_customer_stats`(IN customer_id BIGINT)
BEGIN
    UPDATE customers c
    SET 
        follow_user_count = (
            SELECT COUNT(*) FROM customer_follow_users 
            WHERE customer_id = c.id AND status = 'normal'
        ),
        follow_count = (
            SELECT COUNT(*) FROM follow_records 
            WHERE customer_id = c.id AND deleted_at IS NULL
        ),
        last_follow_time = (
            SELECT MAX(follow_time) FROM follow_records 
            WHERE customer_id = c.id AND deleted_at IS NULL
        )
    WHERE c.id = customer_id;
END //

-- 更新员工统计字段的存储过程
CREATE PROCEDURE `sp_update_employee_stats`(IN employee_id BIGINT)
BEGIN
    UPDATE employees e
    SET 
        customer_count = (
            SELECT COUNT(*) FROM customer_follow_users 
            WHERE employee_id = e.id AND status = 'normal'
        ),
        follow_count = (
            SELECT COUNT(*) FROM follow_records 
            WHERE employee_id = e.id AND deleted_at IS NULL
        )
    WHERE e.id = employee_id;
END //

-- 更新标签统计字段的存储过程
CREATE PROCEDURE `sp_update_tag_stats`(IN tag_id BIGINT)
BEGIN
    UPDATE customer_tags ct
    SET 
        customer_count = (
            SELECT COUNT(*) FROM customer_tag_relations 
            WHERE tag_id = ct.id
        )
    WHERE ct.id = tag_id;
END //

DELIMITER ;

-- =============================================
-- 9. 创建触发器(自动更新统计)
-- =============================================

DELIMITER //

-- 跟进记录插入后触发器
CREATE TRIGGER `trg_after_follow_insert` 
AFTER INSERT ON `follow_records`
FOR EACH ROW
BEGIN
    CALL sp_update_customer_stats(NEW.customer_id);
    CALL sp_update_employee_stats(NEW.employee_id);
END //

-- 跟进记录删除后触发器
CREATE TRIGGER `trg_after_follow_delete` 
AFTER UPDATE ON `follow_records`
FOR EACH ROW
BEGIN
    IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
        CALL sp_update_customer_stats(NEW.customer_id);
        CALL sp_update_employee_stats(NEW.employee_id);
    END IF;
END //

DELIMITER ;

-- =============================================
-- 10. 授权(根据实际情况修改)
-- =============================================

-- 创建应用用户
-- CREATE USER 'wechat_crm'@'%' IDENTIFIED BY 'your_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON wechat_crm.* TO 'wechat_crm'@'%';
-- FLUSH PRIVILEGES;

-- =============================================
-- 完成
-- =============================================
SELECT '数据库初始化完成!' as message;

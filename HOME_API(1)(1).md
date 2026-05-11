# Index API 对接文档

本文档描述了公开的 API 接口，主要用于前台主页功能的对接，包括卡密查询、充值及 ChatGPT 账号检查。

- **服务器地址**: `https://171mail.com`

## 1. 卡密查询接口

用于查询卡密的状态、关联商品及应用信息。

- **URL**: `/api/home/card/query`
- **Method**: `POST`
- **Content-Type**: `application/json`

### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| secret | string | 是 | 卡密字符串 |

### 响应参数

**成功响应 (code=0)**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| code | int | 状态码，0 表示成功 |
| msg | string | 提示信息 |
| data | object | 数据对象 |
| data.status | int | 卡密状态：1=未使用, 2=已使用, 0=禁用 |
| data.app_name | string | 关联的应用名称 |
| data.product_name | string | 关联的商品名称 |
| data.used_at | string/null | 使用时间 (如果已使用) |
| data.charge_info | string | 充值信息 (如果已使用) |

**失败响应 (code!=0)**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| code | int | 状态码，非 0 表示失败 |
| msg | string | 错误提示信息 |

### 示例

**请求示例**

```json
{
    "secret": "CARD-1234567890"
}
```

**成功响应示例**

```json
{
    "code": 0,
    "msg": "查询成功",
    "data": {
        "status": 1,
        "app_name": "ChatGPT",
        "product_name": "Plus Subscription",
        "used_at": null,
        "charge_info": ""
    }
}
```

---

## 2. ChatGPT 账号检查接口

用于验证 ChatGPT Access Token 并获取账号信息。

- **URL**: `/api/home/chatgpt/check`
- **Method**: `POST`
- **Content-Type**: `application/json`

### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| content | string | 是 | Access Token 字符串，或者包含 `accessToken` 字段的 JSON 字符串 |
| secret | string | 是 | 卡密字符串，用于验证是否有权查询 |

### 响应参数

**成功响应 (code=0)**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| code | int | 状态码，0 表示成功 |
| msg | string | 提示信息 |
| data | object | 账号信息对象 |
| data.email | string | 账号邮箱 |
| data.name | string | 账号名称 |
| data.user_id | string | 用户 ID |
| data.plan_type | string | 订阅计划类型 (如 free, plus) |
| data.account_id | string | 账号 ID |
| data.payload | string | 加密后的账号信息（包含 account_id, email 和 timestamp） |

**失败响应 (code!=0)**

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| code | int | 状态码，非 0 表示失败 |
| msg | string | 错误详情 |

### 示例

**请求示例 (纯 Token)**

```json
{
    "content": "eyJhbGciOiJSUzI1NiIs...",
    "secret": "CARD-1234567890"
}
```

**请求示例 (JSON 格式)**

```json
{
    "content": "{\"accessToken\": \"eyJhbGciOiJSUzI1NiIs...\"}",
    "secret": "CARD-1234567890"
}
```

**成功响应示例**

```json
{
    "code": 0,
    "msg": "success",
    "data": {
        "email": "user@example.com",
        "name": "John Doe",
        "user_id": "user-123456",
        "plan_type": "free",
        "account_id": "org-123456",
        "payload": "base64_encoded_encrypted_string..."
    }
}
```

---

## 3. 卡密充值接口

用于使用卡密进行充值操作。

- **URL**: `/api/home/card/charge`
- **Method**: `POST`
- **Content-Type**: `application/json`

### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
| :--- | :--- | :--- | :--- |
| secret | string | 是 | 卡密字符串 |
| payload | string | 是 | 加密后的账号信息（包含时间戳，有效期 10 分钟） |

### 响应参数

| 参数名 | 类型 | 说明 |
| :--- | :--- | :--- |
| code | int | 状态码，0 表示成功 |
| msg | string | 提示信息 |

### 示例

**请求示例**

```json
{
    "secret": "CARD-1234567890",
    "payload": "base64_encoded_encrypted_string..."
}
```

**成功响应示例**

```json
{
    "code": 0,
    "msg": "充值成功：请自行检查账号是否到账"
}
```

**失败响应示例**

```json
{
    "code": 1,
    "msg": "卡密不存在或已被使用/禁用"
}
```

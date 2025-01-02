# 在线文档


**简介**:在线文档


**HOST**:http://bac.rebuildherplanet.cn


**联系人**:wjune


**Version**:1.0.0


**接口路径**:/v3/api-docs/base_file


[TOC]






# app-文件上传


## 根据文件id下载文件


**接口地址**:`/x/file/down`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据文件id下载文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id||query|true|integer(int64)||
|Token|用户信息|header|true|string||
|Authorization|客户端信息|header|true|string||
|ApplicationId|应用ID|header|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||
|400|Bad Request|RObject|
|401|Unauthorized|RObject|
|403|Forbidden|RObject|


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


## 根据文件id打包下载文件


**接口地址**:`/x/file/download`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>根据文件id打包下载文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ids||query|true|array|integer|
|Token|用户信息|header|true|string||
|Authorization|客户端信息|header|true|string||
|ApplicationId|应用ID|header|true|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK||
|400|Bad Request|RObject|
|401|Unauthorized|RObject|
|403|Forbidden|RObject|


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


## 根据文件id查询文件的临时访问路径


**接口地址**:`/x/file/findUrlById`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded,application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>根据文件id查询文件的临时访问路径</p>



**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Token|用户信息|header|true|string||
|Authorization|客户端信息|header|true|string||
|ApplicationId|应用ID|header|true|string||
|integers|integer|body|true|array||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RMapLongString|
|400|Bad Request|RObject|
|401|Unauthorized|RObject|
|403|Forbidden|RObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


## 上传文件


**接口地址**:`/x/file/upload`


**请求方式**:`POST`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:<p>上传文件</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|bizType|业务类型|query|true|string||
|file|附件|query|true|MultipartFile||
|Token|用户信息|header|true|string||
|Authorization|客户端信息|header|true|string||
|ApplicationId|应用ID|header|true|string||
|bucket|桶|query|false|string||
|storageType|存储类型|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|RFileResultVO|
|400|Bad Request|RObject|
|401|Unauthorized|RObject|
|403|Forbidden|RObject|


**响应状态码-200**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data||FileResultVO|FileResultVO|
|&emsp;&emsp;bizType|业务类型|string||
|&emsp;&emsp;fileType|文件类型-枚举,可用值:IMAGE,VIDEO,AUDIO,DOC,OTHER|string||
|&emsp;&emsp;storageType|文件存储类型,可用值:LOCAL,FAST_DFS,MIN_IO,ALI_OSS,QINIU_OSS,HUAWEI_OSS|string||
|&emsp;&emsp;bucket|桶|string||
|&emsp;&emsp;path|文件相对地址|string||
|&emsp;&emsp;url|文件访问地址|string||
|&emsp;&emsp;uniqueFileName|唯一文件名|string||
|&emsp;&emsp;fileMd5|文件md5|string||
|&emsp;&emsp;originalFileName|原始文件名|string||
|&emsp;&emsp;contentType|文件类型|string||
|&emsp;&emsp;suffix|后缀|string||
|&emsp;&emsp;size|大小|integer(int64)||
|&emsp;&emsp;id|主键|integer(int64)||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"bizType": "",
		"fileType": "",
		"storageType": "",
		"bucket": "",
		"path": "",
		"url": "",
		"uniqueFileName": "",
		"fileMd5": "",
		"originalFileName": "",
		"contentType": "",
		"suffix": "",
		"size": 0,
		"id": 0
	},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-400**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-401**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```


**响应状态码-403**:


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code|响应编码:0/200-请求处理成功|integer(int32)|integer(int32)|
|data|响应数据|object||
|msg|提示消息|string||
|path|请求路径|string||
|extra|附加数据|object||
|timestamp|响应时间戳|integer(int64)|integer(int64)|
|errorMsg|异常消息|string||
|isSuccess||boolean||


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"msg": "",
	"path": "",
	"extra": {},
	"timestamp": 0,
	"errorMsg": "",
	"isSuccess": true
}
```
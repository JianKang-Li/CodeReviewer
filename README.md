# codereviewer README

## 自定义检查规则
在setting.json中做如下配置
```json
"codeReview.rules": {
    ":w": ":[^\\s]",
    "){": "\\)\\{",
    "{adb}":  "\\{\\w|\\w\\}",
    "} )": "\\}\\s\\)",
    "你a":  "[\\u4e00-\\u9fa5]\\w",
    ",abd": ",[^\\d\\s]",
    "123": "123"
  },
```
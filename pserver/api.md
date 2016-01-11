# Askbar 


+ 登录： /login 
    - method: post
    - params: {userName, Password}
    - return: {
+ 获取问题分类： /categories
    - method: get
    - return: cid
+ 获取问题列表（按分类）：/getAskList
    - method: get
    - params: page, cid
    
+ 获取问题列表（全部）： /getAskList
    - method: get
    - params: page
    

+ 问题详情：/getQuestionDetail
    - method: get
    - params: questionId


+ 问题的有关回答： /getQuestionAnswers
    - method: get
    - params: questionId
    
+ 问题的最佳回答： /getQuestionBestAnswers
    - method: get
    - params: questionId

+ 发布问题： /submitQuestion
    - method: post
    - params: guid, title, content, cid

+ 回答详情： /getAnswerDetail
    - method: get
    - params: answerId

+ 发布回答： /submitAnswer
    - method: post
    - params: guid, content, questionId
    
    
+ 赞同：/likeAnswer
    - method: post
    - params: guid, answerId

+ 取消赞同：/cancelLikeAnswer
    - method: post
    - params: guid, answerId

+ 反对：/dislikeAnswer
    - method: post
    - params: guid, answerId

+ 赞同：/cancelDiskLikeAnswer
    - method: post
    - params: guid, answerId
    
+ 设为最佳： /setBestAnswer
    - method: post
    - params: guid, answerId

+ 赞同：/cancelSetBestAnswer
    - method: post
    - params: guid, answerId

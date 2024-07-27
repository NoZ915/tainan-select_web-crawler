# Tainan Select 爬蟲
[Note](https://hackmd.io/@noz915/H1Ggmo1u0)

**注意：** 
在爬新資料時，務必確認爬的新資料的學期是最新的，否則當遇到重複課程時，semester欄位以及courseURL欄位會被舊的資料給取代更新掉。（目前還沒有寫判斷式來判斷哪個學期是比較新的）

****
## Step 0
1. 先`npm i`，下載好package
2. 重新建立一份.env檔案，並依照.env.example格式完成所需要的內容：
   * PORT
   * MONGO_URI

## Step 1
1. 選擇好要爬得學期
2. 記得按下「查詢」

![image](./img/1.jpeg)

## Step 2
1. 打開chorme devtool > Network > 找到剛剛按下「查詢」後發送的request
2. 對該request點擊右鍵 > copy > copy as cURL

![image](./img/2.jpeg)

## Step 3
1. 來到"[Convert curl to node.js](https://curlconverter.com/node-axios/)"
2. 將Step 2複製的cURL貼上
3. 選擇Node.js > axios（他就會將 chrome 發出去的 request 變成 node 程式碼，就可以直接拿來使用了）

![image](./img/3.jpeg)

## Step 4
複製下圖中反白的部份即可（也就是第二個參數）

![image](./img/4.jpeg)

## Step 5
回到專案的utils資料夾底下的googleRequestCURL.js檔案中，將Step 4複製的部份貼到cURL變數後方作為他的值。
執行`npm run dev`後便會將該學期的課程大綱更新、插入至database中。
有時候（可能網路問題）不會把整學期的資料都爬下來，可以多執行幾次

![image](./img/5.jpeg)

var ejs = require('ejs')
var heredoc = require('heredoc')
var tpl = heredoc(function () {/*
    <xml>
        <ToUserName><![CDATA[<%= toUser %>]]></ToUserName>
        <FromUserName><![CDATA[<%= fromUser %>]]></FromUserName>
        <CreateTime><%= time %></CreateTime>
        <MsgType><![CDATA[<%= MsgType %>]]></MsgType>
        <% if(MsgType === 'text') { %>
            <Content><![CDATA[<%= content.text %>]]></Content>
        <%} else if (MsgType === 'image') {%>
        <Image>
            <MediaId><![CDATA[<%= content.MediaId %>]]></MediaId>
        </Image>
        <%} else if (MsgType === 'voice') {%>
            <Content><![CDATA[<%= content.text %>]]></Content>
//         <Voice>
//             <MediaId><![CDATA[<% content.MediaId %>]]></MediaId>
//         </Voice>
        <%} else if (MsgType === 'video') {%>
            <Content><![CDATA[<%= content.text %>]]></Content>
//         <Video>
//             <MediaId><![CDATA[<% content.media_id %>]]></MediaId>
//             <Title><![CDATA[<% content.title %>]]></Title>
//             <Description><![CDATA[<% content.description %>]]></Description>
//         </Video>
        <% } %>
     </xml>
*/})
console.log('调用模板处理引擎')
// var tpl = heredoc(function () {/*
//     <xml>
//         <ToUserName><![CDATA[<%= toUser %>]]></ToUserName>
//         <FromUserName><![CDATA[<%= fromUser %>]]></FromUserName>
//         <CreateTime><%= time %></CreateTime>
//         <MsgType><![CDATA[<%= MsgType %>]]></MsgType>
//         <% if(MsgType === 'text') { %>
//             <Content><![CDATA[<%= content.text %>]]></Content>
//         <%} else if (MsgType === 'image') {%>
//         <Image>
//             <MediaId><![CDATA[<% content.media_id %>]]></MediaId>
//         </Image>
//         <% else if (MsgType === 'voice') {%>
//         <Voice>
//             <MediaId><![CDATA[<% content.media_id %>]]></MediaId>
//         </Voice>
//         <% else if (MsgType === 'video') {%>
//         <Video>
//             <MediaId><![CDATA[<% content.media_id %>]]></MediaId>
//             <Title><![CDATA[<% content.title %>]]></Title>
//             <Description><![CDATA[<% content.description %>]]></Description>
//         </Video>
//         <% else if (MsgType === 'music') {%>
//         <Music>
//             <Title><![CDATA[<% content.title %>]]></Title>
//             <Description><![CDATA[<% content.description %>]]></Description>
//             <MusicUrl><![CDATA[<% content.MUSIC_Url %>]]></MusicUrl>
//             <HQMusicUrl><![CDATA[<% content.HQ_MUSIC_Url %>]]></HQMusicUrl>
//             <ThumbMediaId><![CDATA[<% content.media_id %>]]></ThumbMediaId>
//         </Music>
//         <% else if (MsgType === 'news') {%>
//              <ArticleCount><% content.length %></ArticleCount>
//             <Articles>
//             <% content.forEach(element => { %>
//                 <item>
//                     <Title><![CDATA[<% element.title %>]]></Title>
//                     <Description><![CDATA[<% element.description %>]]></Description>
//                     <PicUrl><![CDATA[<% element.picurl %>]]></PicUrl>
//                     <Url><![CDATA[<% element.url %>]]></Url>
//                 </item>
//             <% }) %>
//             </Articles>
//         <% } %>
//     </xml>
// */})
var compled = ejs.compile(tpl)

module.exports = {
    compiled: compled
}

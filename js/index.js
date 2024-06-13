// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set,update,remove, onChildAdded,onChildChanged, onChildRemoved,get}
    from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "chat"); //RealtimeDB内の"chat"を使う
let num = 0;

  // Read the data and count the number of children
 await get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
        const count = snapshot.size;  // For Firebase 9, use size instead of numChildren
        num = count;
        console.log('Number of children: ' + count);
    } else {
        console.log('No data available');
    }
}).catch((error) => {
    console.error('Error reading data: ', error);
});

import { normalize } from 'https://cdn.skypack.dev/@geolonia/normalize-japanese-addresses';
const uploadPhotoButton = document.querySelector('#imgUpload');
// let temp;
// let photo_0;
  
uploadPhotoButton.addEventListener("change", function() {        
    let file = uploadPhotoButton.files[0]; //読み込んだファイルを格納
    const reader = new FileReader(); //ファイル読み込みのためのオブジェクトのインスタンス化
    reader.onload = () => { 
      // console.dir(file);        //onload 読み込みが終わったときに発火する
      // let photo_0 = reader.result;  //読み込んだ画像ファイルを格納
      // localStorage.setItem('dataURLimg', photo); //localstorageに保存
    }
    reader.readAsDataURL(file);     //アップロードファイルのDataURL化
});
//チャットの履歴を登録する
// let chat_history = []//chat_history={name1:[[key1_1,msg1_1],[key1_2,msg1_2]],name2:[[key2_1,msg2_1],[key2_2,msg2_2]],...]
// function chat_history(name, key, history){
//     for(i==0;i<length(chat_history);i++){
//         if
//     }

// }

function getSelectedValue() {
    // <select>要素を取得
    var selectElement = document.getElementById("design_code");
    // 選択されたオプションの値を取得
    var selectedValue = selectElement.value;
    // 取得した値をコンソールに表示（デバッグ用）
    console.log("選択された設計基準:", selectedValue);
    // 必要に応じて他の操作をここで行う
}
//データ登録(Click)



    

$("#send").on("click",function(){
    const uname = $("#uname").val();
    const text = $("#text_building_name").val();
    const Address = $("#Address").val();
    let selectElement = document.getElementById("design_code");;
    let design_code = selectElement.value;
    const img =  $("#imgUpload").val();

    //表示の確認
    console.log(uname,'名前')
    console.log(text,"テキスト")
    console.log(design_code,"Design Code")

    // 画像ファイルの処理
    let file =[];
   
        
        file[num-1] = uploadPhotoButton.files[0];
        
    
        const reader = new FileReader(); //ファイル読み込みのためのオブジェクトのインスタンス化
        reader.onload = () => { 
           console.dir(file[num-1]);        //onload 読み込みが終わったときに発火する
           let photo = reader.result;  //読み込んだ画像ファイルを格納
           let img_src_temp = photo;
        //   //  localStorage.setItem('dataURLimg', photo); //localstorageに保存
        //    localStorage.setItem(key, JSON.stringify([value_01,value_02,value_03]));
        //送信のデータの塊を作ります
        const msg = {
            uname: uname,
            text:  text,
            address: Address,
            design_code: design_code,
            img_src:img_src_temp
        }
        //送信処理を書きます
    //firebaseにpush=送る準備をする. dbRefはみなさんの秘密の鍵の情報
    //dbRefは、firebaseの"Realtime Database"の"データ"のこと、とイメージすると良い
    const newPostRef = push(dbRef)//ユニークキーを生成
    // console.log(newPostRef);
    set(newPostRef, msg)

        }
        reader.readAsDataURL(file[num-1]);     //アップロードファイルのDataURL化

    

    
    // 送信した後に入力欄をからにし、入力しやすくしてみましょう
    $("#uname").val("");
    $("#text_building_name").val("");
    $("#Address").val("");

    //この下の部分は消さない
})

//データ削除(Click)
$("#delete").on("click",function(){
    
})

//データ登録(Enter)


//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
let num_onc = 0;
onChildAdded(dbRef, function(data){
    num_onc += 1;
    const msg = data.val();
    const key = data.key;//削除・更新に必須
    
    console.log(msg,"data_msg")
    console.log(msg.uname,"msg.uname")

    // if(markerData[0].name=='test'){
    //     markerData.shift();
    //  }
    console.log(msg.address, 'msg.address');
    // console.log(msg.address[0], 'msg[0].address');
        // img_src[i] = msg.img_src; 
      
            // debugger
            console.log(msg.address, 'msg[i].address');
        normalize(msg.address).then(result => {
            let logo_img ='';

            console.log(msg.uname, 'name_for_logo_img');
        if($("#sort_by").val()=="Name"){
            if(String(msg.uname)=='Kohsaku'){
                logo_img = 'img/celtics.png'
 
             }else if(String(msg.uname)=='Mitsuhashi'){
                logo_img = 'img/test.png'
 
             }else{
                logo_img ='img/KM_LOGO.png'}
            console.log(logo_img, 'logo_img');
             }else if($("#sort_by").val()=="Standard"){
                if(String(msg.design_code)=='Japanese_Code'){
                    logo_img = 'img/japan.jpeg'
     
                 }else if(String(msg.design_code)=='American_Code'){
                    logo_img = 'img/US.png'
     
                 }else{
                    logo_img ='img/EU.jpeg'}
                console.log(logo_img, 'logo_img');
             }else{
                logo_img = 'img/purple_grey.png';
             }

            markerData.push({
            name: msg.uname,
            text: msg.text,
            address:msg.address,
            design_code:msg.design_code,
            lat: result.lat,
            lng: result.lng,
            icon:logo_img
          })
           
          img_src.push(msg.img_src);
        

         
  
          // return  {lat: latitude, lng: longitude}
  


        // initMap(loc_map); 

    

    
        
    
        console.log(markerData.length,"markerData_length")

        console.log(img_src.length,"img_src_length")
console.log(num_onc,"num_onc")
  if(num_onc===num){
    initMap();
  }
//htmlとして埋め込みたいので、テンプレートリテラルを使う

let html=`
<div class="msg" id=${key}>
<p>${msg.uname}</p>
<p><span contentEditable="true" id="${key}+'_update'">${msg.text}</span></p>
<p><span contentEditable="true" id="${key}+'_update_01'">${msg.address}</span></p>
<p><span contentEditable="true" id="${key}+'_update_01'">${msg.design_code}</span></p>
<div>
<p><span id="${key}+'_update_02'"><img src=${msg.img_src} style= "width:100%"></span></p>
</div>
<p><span class="remove" data-key=${key}>🚮</span></p>
<p><span class="update" data-key=${key}>🆙</span></p>
</div>
`

    // #outputの最後に追加
    $('#output').append(html);

})
        
})


//地図更新イベント
$("#refresh_map").on("click",function(){
    console.log(markerData.length);
    for(let i=0;i<markerData.length;i++){
        if($("#sort_by").val()=="Name"){
            if(markerData[i].name=='Kohsaku'){
                markerData[i].icon = 'img/celtics.png'
 
             }else if(markerData[i].name=='Mitsuhashi'){
                markerData[i].icon = 'img/test.png'
 
             }else{
                markerData[i].icon ='img/KM_LOGO.png'}
            
             }else if($("#sort_by").val()=="Standard"){
                if(markerData[i].design_code=='Japanese_Code'){
                    markerData[i].icon = 'img/japan.jpeg'
     
                 }else if(markerData[i].design_code=='American_Code'){
                    markerData[i].icon = 'img/US.png'
     
                 }else{
                    markerData[i].icon ='img/EU.jpeg'}
                
             }else{
                markerData[i].icon = 'img/purple_grey.png';
             }

    if(i==markerData.length-1){
    initMap();
    }
}
});

//更新イベント
$("#output").on("click",".update",function(){
    const key = $(this).attr("data-key");
    update(ref(db,"chat/"+key),{
        text: $("#"+key+'_update').html()
    });
});

$("#output").on("click",".update",function(){
    const key = $(this).attr("data-key");
    update(ref(db,"chat/"+key),{
        address: $("#"+key+'_update_01').html()
    });
});

$("#output").on("click",".update",function(){
    const key = $(this).attr("data-key");
    update(ref(db,"chat/"+key),{
        text: $("#"+key+'_update_02').html()
    });
});

//削除処理がFirebase側で実行されたらイベント発生!
onChildRemoved(dbRef,(data) => {
 $("#"+data.key).remove(); //DOM操作関数(対象を削除)
});

//更新処理がFirebase側で実行されたらイベント発生！
onChildChanged(dbRef,(data)=>{
    $("#"+data.key+'_update').html(data.val().text);
    $("#"+data.key+'_update').fadOut(800).fadeIn(800);
});
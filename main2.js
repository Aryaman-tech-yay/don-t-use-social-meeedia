 var firebaseConfig = {
     apiKey: "AIzaSyCGcJmk0pGZKOrYheDib6s6AMxs7rddhlQ",
     authDomain: "eat-heads-with-social-media.firebaseapp.com",
     databaseURL: "https://eat-heads-with-social-media-default-rtdb.firebaseio.com",
     projectId: "eat-heads-with-social-media",
     storageBucket: "eat-heads-with-social-media.appspot.com",
     messagingSenderId: "295136048658",
     appId: "1:295136048658:web:86322fd83e4ae926d24acb"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");

 function send() {
     msg = document.getElementById("msg").value;
     firebase.database().ref(room_name).push({
         name: user_name,
         message: msg,
         like: 0
     });

     document.getElementById("msg").value = "";
 }

 function getData() {
     firebase.database().ref("/" + room_name).on('value', function (snapshot) {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key;
             childData = childSnapshot.val();
             if (childKey != "purpose") {
                 firebase_message_id = childKey;
                 message_data = childData;
                 //Start code
                 console.log(firebase_message_id);
                 console.log(message_data);
                 name = message_data['name'];
                 message = message_data['message'];
                 like = message_data['like'];
                 name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                 message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                 like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                 span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                 row = name_with_tag + message_with_tag + like_button + span_with_tag;
                 document.getElementById("output").innerHTML += row;
                 //End code
             }
         });
     });
 }
 getData();

 function updateLike(message_id) {
     console.log("clicked on like button - " + message_id);
     button_id = message_id;
     likes = document.getElementById(button_id).value;
     updated_likes = Number(likes) + 1;
     console.log(updated_likes);

     firebase.database().ref(room_name).child(message_id).update({
         like: updated_likes
     });

 }

 function logout() {
     localStorage.removeItem("user_name");
     localStorage.removeItem("room_name");
     window.location.replace("kwitter.html");
 }


 user_name = localStorage.getItem("user_name");

 document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

 function addRoom() {
     room_name = document.getElementById("room_name").value;

     firebase.database().ref("/").child(room_name).update({
         purpose: "adding room name"
     });

     localStorage.setItem("room_name", room_name);

     window.location = "kwitter_page.html";
 }

 function getData() {
     firebase.database().ref("/").on('value', function (snapshot) {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key;
             Room_names = childKey;
             console.log("Room Name - " + Room_names);
             row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
             document.getElementById("output").innerHTML += row;
         });
     });

 }

 getData();

 function redirectToRoomName(name) {
     console.log(name);
     localStorage.setItem("room_name", name);
     window.location = "kwitter_page.html";
 }

 function logout() {
     localStorage.removeItem("user_name");
     localStorage.removeItem("room_name");
     window.location = "index.html";
 }

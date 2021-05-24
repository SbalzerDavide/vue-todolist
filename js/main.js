const app = new Vue ({
    el: '#app',

    data: {
        saluto: 'salutone',
        toDoList : [],
        // toDoList:[
        //     {
        //         item: 'Fare la spesa',
        //         check: 'opacity-hidden',
        //     },
        //     {
        //         item: 'Chiamare Giovanni',
        //         check: 'opacity-hidden',
        //     },
        //     {
        //         item: 'Aperitivo',
        //         check: 'opacity-hidden',
        //     },
        // ],
        message:'',
    },
    created(){
          
        // if ('serviceWorker' in navigator) {
        //     window.addEventListener('load', function() {
        //       navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(registration) {
        //         // Registration was successful
        //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
        //       }, function(err) {
        //         // registration failed :(
        //         console.log('ServiceWorker registration failed: ', err);
        //       });
        //   });
        // }
        // localStorage.setItem("todo", this.toDoList);
        let localStor = localStorage.getItem("todo")
        if ( localStor != null){
            this.toDoList = JSON.parse(localStor || "[]");;
        } else {
            localStorage.setItem("todo", this.toDoList);
        }
        console.log(this.toDoList);
        // window.global = window.global || [];        
    },
    // beforeDestroy(){
    //     localStorage.setItem("todo", this.toDoList);
    // },
    methods:{
        refreshStore(){
            localStorage.setItem("todo", JSON.stringify(this.toDoList) );
        },
        addItem(index){
            if (this.message.trim() != ''){
                this.toDoList.push({
                    item:this.message,
                    check:'opacity-hidden',
                });
            };
            this.message='';
            this.refreshStore();
        },
        removeItem(index){
            this.toDoList.splice(index,1);
            this.refreshStore();
        },
        done(index){
            if (this.toDoList[index].check === 'opacity-hidden'){
                this.toDoList[index].check = 'opacity-show';
            } else{
                this.toDoList[index].check = 'opacity-hidden';
            }
            this.refreshStore();
        }
    }

    

});
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

let sw = null;

const messaging = firebase.messaging();


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(registration) {
        sw = registration;
        Notification.requestPermission()
            .then(function (permission) {
            // MsgElem.innerHTML = "Notification permission granted." 
            console.log("Notification permission granted.");
            if (permission === "granted"){
                return messaging.getToken(
                    {
                        serviceWorkersRegistration: sw
                    }
                )

            }
        // get the token in the form of promise
    })
    .then(function(token) {
        // print the token on the HTML page
        console.log(token);
        // TokenElem.innerHTML = "Device token is : <br>" + token
    })
    .catch(function (err) {
    // ErrElem.innerHTML = ErrElem.innerHTML + "; " + err
        console.log("Unable to get permission to notify.", err);
});

        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}




// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});

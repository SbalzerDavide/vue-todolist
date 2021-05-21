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
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('./scripts/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
              }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
              });
          });
      
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

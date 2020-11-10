const app = new Vue ({
    el: '#app',

    data: {
        saluto: 'salutone',
        toDoList:[
            'Fare la spesa',
            'Chiamare Giovanni',
            'Aperitivo',
            'Controllare Chiarella',
        ],
        message:'',
        

        

    },

    created(){

    },

    methods:{
        addItem(){
            console.log('click');
            if (this.message != ''){
                this.toDoList.push(this.message);
            };
            console.log(this.toDoList);
            this.message='';
        },
        removeItem(index){
            console.log(index),
            console.log('removed'),
            this.toDoList.splice(index,1);

        }
        



        // readM(){
        //     console.log(this.message);
        // },
    }

    

});
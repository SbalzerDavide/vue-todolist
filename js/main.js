const app = new Vue ({
    el: '#app',

    data: {
        saluto: 'salutone',
        toDoList:[
            {
                item: 'Fare la spesa',
                check: 'opacity-hidden',
            },
            {
                item: 'Chiamare Giovanni',
                check: 'opacity-hidden',
            },
            {
                item: 'Aperitivo',
                check: 'opacity-hidden',
            },
        ],
        message:'',
    },

    methods:{
        addItem(index){
            if (this.message.trim() != ''){
                this.toDoList.push({
                    item:this.message,
                    check:'opacity-hidden',
                });
            };
            this.message='';
        },
        removeItem(index){
            this.toDoList.splice(index,1);
        },
        done(index){
            if (this.toDoList[index].check === 'opacity-hidden'){
                this.toDoList[index].check = 'opacity-show';
            } else{
                this.toDoList[index].check = 'opacity-hidden';
            }
        }
    }

    

});
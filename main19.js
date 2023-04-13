function* generateQuestions(questions){
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        yield question;
    }
}

class Game {
    usedHelps=[];
    currentQuestion
    constructor(playerName){
        this.playerName = playerName;
        this.untachMonay = 0;
        this.questionElement = document.getElementById("quest");
        this.answers = document.getElementsByClassName("winItem");
        this.answer = document.getElementById("answers")
        this.halfElement = document.getElementById("half");
        this.callElement = document.getElementById("call");
        this.hallElement = document.getElementById("hall");
        this.hallDivsElement = document.getElementById("hallDivs");
        this.a = document.getElementById("a")
        this.b = document.getElementById("b")
        this.c = document.getElementById("c")
        this.d = document.getElementById("d")
        this.pox = document.getElementById("pox")
        this.p1 = document.getElementById("p1")
        this.p2 = document.getElementById("p2")
        this.p3 = document.getElementById("p3")
        this.p4 = document.getElementById("p4")
        this.value = 9;
        this.cash = document.getElementById("cash")
        this.money = document.getElementsByClassName("moneys");
        const ques = [
            // Հարց 1
            new Question("Ո՞ր օրն է համարվում շաբաթվա առաջին օրը Իսրայելում ?",new Answer(["Կիրակի", "Շաբաթ ", "Ուրբաթ", "Երկուշաբթի"])),
            //  Հարց 2
            new Question("Ի՞նչպես է կոչվում մարդկային մարմնի մոդելը՝ բժիշկների ուսուցման իրազննականության համար ?", new Answer(["Ֆանտոմ", "Խրտվիլակ", "Ուրվական", "Ոգի"])),
            //   Հարց 3
            new Question("Ո՞ր քիմիական տարրի հայտնագործման պատվին են Ֆրանսիայում 19-րդ դարում հատել Ապոլոնի պատկերով մեդալ ?", new Answer(["Հելիում", "Ռադիում", "Ջրածին", "Տիտան"])),
            // Հարց 4 
            new Question("Ավանդաբար ի՞նչ են անում երաժիշտները Հայդնի «Հրաժեշտի սիմֆոնիան» նվագելիս ?", new Answer(["Հանգցնում են մոմերը", "Գլխարկ են հագնում", "Օդային համբույրներ են ուղարկում", "Երգում են "])),
            // Հարց 5
            new Question("Ըստ իր խոստովանության ինչի՞ աստվածն էր Օլե Լուկոյեն՝ Անդերսենի համանուն հեքիաթից ?", new Answer(["Երազների", "Հեքիաթների", "Գիշերվա", "Մանկության "])),
            //  Հարց 6 
            new Question("Ո՞վ էր Հենրի Թեյթը, ում անունով է կոչվում Լոնդոնի պատկերասրահը ?", new Answer(["Բարերար", "Ճարտարապետ", "Նկարիչ", "Ծովահեն  "])),
            // Հարց 7
            new Question("Ո՞ւմ են պարգևատրում Ֆյոդոր Պլևակոի անվան մեդալով ?", new Answer(["Փաստաբաններին", "Բժիշկներին", "Լուսանկարիչներին", "Լրագրողներին"])),
            // Հարց 8
            new Question("Ո՞ր կենդանին չի կարող ձայն հանել, քանի որ չունի վոկալային լարեր ?", new Answer(["Ընձուղտ", "Վարազ", "Ձի", "Կրիա "])),
            // Հարց 9
            new Question("Ո՞ր կենդանու ուղեղն է ընկույզի չափ ?", new Answer(["Կոկորդիլոս", "Կրիա", "խոզ ", "Ընձուղտ"])),
            // Հարց 10
            new Question("Ո՞ր վիտամինն է, որ օրգանիզմը չի կարող ինքնուրույն արտադրել ?", new Answer(["A ", "PP", "K", "D "])),
        ]
        this.questions  = generateQuestions(ques);
        this.handleListeners()
    }
    handleListeners(){
   for (const winItem of this.answers) {
    winItem.addEventListener("click",()=>{
        this.checkAnswer(winItem.innerHTML);
        this.money[this.value].style.background = "green";
        this.value--;
        if(this.value === 6){
            this.untachMonay = 50000
        }
        if(this.value === 1 ){
            this.untachMonay = 500000 
            
        };
        console.log(this.untachMonay);
    })
   
   }
   this.halfElement.addEventListener("click",()=>{
    const half = HelpHalf.half(this.currentQuestion.value.answer);
    console.log(half);
    for (const winItem of this.answers){
       if(half.indexOf(winItem.innerHTML)===-1){
        winItem.parentNode.classList.add("hide")
       } 
    }
   })
   this.callElement.addEventListener("click",()=>{
    const call = HelpCall.call(this.currentQuestion.value.answer);
    console.log(call);
    for (const winItem of this.answers){
       if(call.indexOf(winItem.innerHTML)===-1){
        winItem.parentNode.classList.add("hide")
       } 
    }
   })
   this.hallElement.addEventListener("click",()=>{
    const hall = HelpHall.hall(this.currentQuestion.value.answer);
    console.log(hall);
    this.hallElement.remove();
 
    for (const answer of this.answers){
        if(hall[0] === answer.innerHTML){
            this.p1.innerHTML = answer.innerHTML +"47%" 
        }else{
            this.p2.innerHTML = "18%"
            this.p3.innerHTML = "20%"
            this.p4.innerHTML = "15%"
        }
     }
     this.a.style.opacity = 0.8;
     this.b.style.opacity = 0.8;
     this.c.style.opacity = 0.8;
     this.d.style.opacity = 0.8;

setTimeout(() => {
    this.hallDivsElement.style.visibility = "hidden"
        },5000)

   })
   }
    checkAnswer(answer){
        if(answer === this.currentQuestion.value.answer.options[0]){
           

            this.askQuestion();

        }else{
            
           
           
            this.gameOver()
            
        }
    }
    play(){
        this.askQuestion();
    }
    reset(){
        for (const winItem of this.answers){
            if(winItem.parentNode.classList.contains("hide")){
             winItem.parentNode.classList.remove("hide")
            } }
    };
    askQuestion(){
        this.reset()
        this.currentQuestion = this.questions.next();
        if(this.currentQuestion.done){
            this.finish()
            return
        };
        this.questionElement.innerHTML = this.currentQuestion.value.question;
        const indexes = [];
        do {
            const i = Math.floor(Math.random()*4);
            if(indexes.indexOf(i)===-1){
                indexes.push(i)
            }
        } while (indexes.length<4);
        for (let i = 0; i < 4; i++) {
            this.answers[i].innerHTML = this.currentQuestion.value.answer.options[indexes[i]];
        }
    }

    finish(){
        this.questionElement.style.background = "green"
        this.questionElement.innerHTML = `Դուք դուք միլիոնատեր եք, շնորհավորում ենք`;
        this.answer.style.opacity = 0;
        this.halfElement.style.opacity = 0;
        this.callElement.style.opacity = 0;
        this.hallElement.style.opacity = 0;
        this.cash.style.opacity = 0;
        
    }
    gameOver(){
                   this.questionElement.style.background = "red"
        this.questionElement.innerHTML = `ցավոք Դուք պարտվեցիրք Դուք վաստակել եք ${this.untachMonay} AMD անձեռնմխելի գումար`;
        this.answer.style.opacity = 0;
        this.halfElement.style.opacity = 0;
        this.callElement.style.opacity = 0;
        this.hallElement.style.opacity = 0;
        this.cash.style.opacity = 0;
        this.value++;
}}
class Question {
    constructor(question,answer){
        this.question = question;
        this.answer = answer;
       
    }
}

class Answer {
    options=[];
    constructor(options){
        this.options = options
    }

}

let half = document.getElementById("half")
half.addEventListener('click', function() {
    half.style.visibility = "hidden";
  });
  let call = document.getElementById("call")
  call.addEventListener('click', function() {
    call.style.visibility = "hidden";
  });

class HelpHalf {
    static half(anwser){
        const result = [];
        result.push(anwser.options[0])
        const randIndex = Math.floor(Math.random()*anwser.options.length+1)
        result.push(anwser.options[randIndex]);
        return  result
    }
    
}
class HelpCall {
    static call(anwser){
        const result = [];
        result.push(anwser.options[0])
        const randIndex = Math.floor(Math.random()*anwser.options.length+4)
        result.push(anwser.options[randIndex]);
        return  result
    }
    
}
class HelpHall {
    static hall(anwser){
        const chisht = anwser.options[0]
        const result = [];
        result.push(chisht) 
        result.push(anwser.options[1],anwser.options[2],anwser.options[3]);
        return  result
    }
    
}

const milioner = new Game();
milioner.play()

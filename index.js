(function(){
    var QuizApp = {
        time:10,//in minutes
        current:0,
        correctAns:0,
        showResult:function(){
            // show appropriate screen
            document.getElementById('quizScreen').style.display= "none";
            document.getElementById('resultScreen').style.display= "block";
            //get resultScreen elements
            var percentage = document.getElementById('percentage');
            var correct = document.getElementById('correct');
            var total = document.getElementById('total');
            // update resultScreen with result
            percentage.innerHTML = ((this.correctAns/this.questions.length) * 100).toFixed(1) + "%"
            correct.innerHTML = this.correctAns;
            total.innerHTML = this.questions.length;
        },
        startQuiz:function(){
            var $this = this;//QuizApp object wont be available inside functions so setting it to variable $this for later reference
            // show appropriate screen
            document.getElementById('startScreen').style.display= "none";
            document.getElementById('quizScreen').style.display= "block";
            // initial time, it will be decremented by 1000 as each second pass by
            var timeInMilliSeconds = (this.time) * 60 * 1000;
            var seconds = 0;
            
            var time = document.getElementById('time');
            
            $this.printQuestion();

            var interval = setInterval(function(){
                // if time is over
                if(timeInMilliSeconds <= 0){
                    $this.showResult();
                    time.innerHTML = "00:00";
                    clearInterval(interval);
                }
                else{
                    // remaining minutes
                    var minutes = Math.floor((timeInMilliSeconds/1000)/60);
                    var formattedTime = (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                    seconds = seconds > 0 ? seconds - 1 : 59;
                    time.innerHTML = formattedTime;

                    timeInMilliSeconds -= 1000;
                }
                
            },1000);
            // choices for each question will be printed in choicesForm 
            var choicesForm = document.getElementById("choices");
            choicesForm.onsubmit = function(e){
                e.preventDefault();//prevents reload
                // get all the choices in current question
                var choices = choicesForm.getElementsByClassName('choice');
                // getElementsByClassName return Collection so converting it to array
                choices = Array.prototype.slice.call(choices);
                for(var i = 0, l = choices.length; i< l; i+=1){
                    // if user has checked one of the choice
                    if(choices[i].checked){
                        // if the choice is correct
                        if(i === $this.questions[$this.current].correct){
                            $this.correctAns++;
                        }
                        // if there are remaining questions, print them
                        if($this.current < $this.questions.length - 1){
                            $this.current++;
                            $this.printQuestion();
                        }
                        else{//if no question is left, show the result
                            $this.showResult();
                            clearInterval(interval);//stop the timer
                        }
                        break;
                    } 
                }
            };
        },
        printQuestion:function(){
            var questionText = document.getElementById("questionText"),
            questionDesc = document.getElementById("questionDesc"),
            choicesForm = document.getElementById("choices"),
            nextBtn = "<div class='centeredText withMargin'><button type='submit' id='next'>Next</button></div>";

            var currentQuestion = this.questions[this.current];
            var choicesHtml = "";

            for(var i = 0, l = currentQuestion.choices.length; i< l; i+=1){
                var choiceHtml = "<div><label for='_"+i+"'><input type='radio' name='choice' class='choice' id='_"+i+"' value='"+currentQuestion.choices[i]+"' required/> &nbsp;"+currentQuestion.choices[i]+"</label></div>"
                choicesHtml += choiceHtml;
            }
            
            choicesForm.innerHTML = choicesHtml + nextBtn;
            questionText.innerHTML = currentQuestion.qText;
            questionDesc.innerHTML = currentQuestion.qDesc ? currentQuestion.qDesc : '';
        },
        questions:[
            {
                qText:"What does this function do?",
                qDesc:"function whatDoesItDo(val){\n\treturn val ? 1 : 2;\n}",
                choices:["It returns val","It always return 2","It returns 1 if val is truthful, otherwise 2"],
                correct:2
            },
            {
                qText:"Which statement is true about document object?",
                choices:["It represents the window of the browser","It represents the web page\'s content"],
                correct:1
            },
            {
                qText:"Which function among the following lets to register a function to be invoked once?",
                choices:["setTimeout()","setTotaltime()","setInterval()"],
                correct:0
            },
            {
                qText:"How many primitive types are there in Javascript?",
                choices:["5","4","6"],
                correct:0
            },
            {
                qText:"What does this code return?",
                qDesc:"typeof Number(123)",
                choices:["number","object","function"],
                correct:0
            },
            {
                qText:"What node does document.childNodes[0] return for the following html?",
                qDesc:"&lt;!doctype html&gt;\n&lt;html&gt;\n\t&lt;head&gt;&lt;/head&gt;\n\t&lt;body&gt;&lt;/body&gt;\n&lt;/html&gt;",
                choices:["&lt;!doctype html&gt;","&lt;html&gt;","#text"],
                correct:0
            },
            {
                qText:"What does this code print?",
                qDesc:"console.log('' || 'Javascript' || true)",
                choices:["' '","true","Javascript"],
                correct:2
            },
            {
                qText:"What does this code print?",
                qDesc:"function Vehicle(){\n\tthis.tyres = 4;\n}\nfunction Car(type){\n\tthis.type = type;\n}\nCar.prototype = new Vehicle();\nvar car = new Car('sedan');\nconsole.log(car.tyres);",
                choices:["Error in line 7","4","undefined"],
                correct:1
            },
            {
                qText:"What does this function do?",
                qDesc:"function returnColor(color){\n\tif(color !== 'blue' || color !== 'green'){\n\t\tcolor = 'red';\n\t}\n\treturn color;\n}",
                choices:["Always return red","Returns blue, green or red, depending on the parameter 'color'","Returns only blue and green"],
                correct:0
            }
        ]
    };
    function init(){
        document.getElementById('quizScreen').style.display= "none";
        document.getElementById('resultScreen').style.display= "none";
        document.getElementById('start').onclick = function(){
            QuizApp.startQuiz();    
        };
    }
    window.onload = init;
})();
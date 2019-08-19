//-----Function initialization-----
save = document.querySelector('.save');
function todo() {
    var currentBtn = '<div class="inline_third"><button class="btn_complete"><i class="fas fa-check-circle"></i></button>' +
        '<button class="btn_edit"><i class="fas fa-pen"></i></button><button class="btn_delete"><i class="fas fa-trash"></i></button></div>'
    var completeBtn = '<div class="inline_third_complete"><button class="btn_edit"><i class="fas fa-pen"></i></button>' +
        '<button class="btn_delete"><i class="fas fa-trash"></i></button></div>'
    var deleteBtn = '<div class="inline_third_delete"><button class="btn_return"><i class="fas fa-undo"></i></button></div>'
    var index = $(this).closest('section').index()
    var names = document.querySelector('input[name=\'name\']')
    var describes = document.querySelector('textarea[name=\'describe\']')
    var newNames = document.querySelector('input[name=\'newName\']')
    var newDescribes = document.querySelector('textarea[name=\'newDescribe\']')
    var newModal = document.querySelector('.newModal');
    var task = {
        current: [],
        completed: [],
        deleted: []
    };


    (function init() {
        if (localStorage.getItem('ToDoo')) {
            task = JSON.parse(localStorage.getItem('ToDoo'));
            out(task.current, currentBtn, $('.frame_current'));
            out(task.completed, completeBtn, $('.frame_complete'));
            out(task.deleted, deleteBtn, $('.frame_delete'));
                  
        }
     })();
        event()
 
//-----describe events of function-----
    function event() {
        $(document).on('click', '.new', function () {
            reset()
        });
        $(".clear").click(function (event) {
            localStorage.clear();
            event.preventDefault();
            setTimeout(reload, 2500);
        });
        $(".save").click(function () {
            validate();      
        });
        $(document).on('click', '.btn_complete', function () {
            var index = $(this).closest('section').index()
            var elem = this.closest('section');
            completeTask(index, elem)
            counterMinus()
        });
        $(document).on('click', '.btn_delete', function () {
            var index = $(this).closest('section').index()
            var elem = this.closest('section');
            var tab = $('.active.content').attr('aria-labelledby');
            deleteTask(index, tab, elem);
    deleteCounter()
        });
        $(document).on('click', '.btn_return', function () {

           var index = $(this).closest('section').index()
           var elem = this.closest('section');
           tab = $('.active.content').attr('aria-labelledby');
            returnTask(index, tab, elem);
            counterPlus()
        });

        $(document).on('click', '.btn_edit', function () {
            index = $(this).closest('section').index();
            tab = $('.active.content').attr('aria-labelledby');
            setValue(tab, index)
        });
        $(document).on('click', '.newSave', function () {
            createTask(index, tab);
            reset()
        });
        $( document ).ready(function() {
          load()
        });
     }
 //-----Function count-----
          function load()
           {
           if(localStorage.getItem("counter")!=null)
                 {
                    $(".count").css('display', 'block')
                     counter = Number(localStorage.getItem("counter"));
                     document.querySelector(".count").innerHTML = counter;
                 }

           }
         var counter= 0;        

         function counterPlus() {    
            $(".count").css('display', 'block')
            counter = Number(localStorage.getItem("counter"));
            console.log(counter);
            counter += 1;
            localStorage.setItem("counter",counter);             
            document.querySelector(".count").innerHTML = counter;
         }
 function counterMinus() {          
            counter = Number(localStorage.getItem("counter"));

            console.log(counter);
            counter -= 1;
            localStorage.setItem("counter",counter);             
            document.querySelector(".count").innerHTML = counter;
            if (counter == 0){
                 $(".count").css('display', 'none')
            }
         }
  function deleteCounter() {
       var tab = $('.active.content').attr('aria-labelledby');
      console.log(tab)
          if(tab === 'current') {
          counterMinus()
        } 
    }
    
 //-----Function edit-----
    function createTask(index, tab) {
        newModal.style.display = 'block';
        if(newNames.value){
            if(tab === 'current') {
            $(this).closest('section').remove();
            task.current[index].name = $('input[name="newName"]').val();
            task.current[index].describe = $('textarea[name="newDescribe"]').val();
            task.current[index].priority = $('input[name="newPriority"]:checked').val();
            out(task.current, currentBtn, $('.frame_current'));
            localStorage.setItem('ToDoo', JSON.stringify(task));
        } else if (tab === 'completed') {
            task.completed[index].name = $('input[name="newName"]').val();
            task.completed[index].describe = $('textarea[name="newDescribe"]').val();
            task.completed[index].priority = $('input[name="newPriority"]:checked').val();
            out(task.completed, completeBtn, $('.frame_complete'));
             localStorage.setItem('ToDoo', JSON.stringify(task));
        }
    }
    }

    function reset() {
        newModal.style.display = 'none';
        newNames.value = '';
        newDescribes.value = '';
    }

    function setValue(tab, index) {
           newModal.style.display = 'block';
        $('input[name="newName"]').attr('value', task[tab][index].name);
        $('textarea[name="newDescribe"]').attr('value', task[tab][index].describe);
        $('input[name="newPriority"]:checked').attr('value', task[tab][index].priority);
     }

//-----Function return-----
    function returnTask(index, tab, elem) {
        console.log("dfg")
        task.current.push(task[tab][index]);
        task[tab].splice(index, 1);
        elem.remove(index);
        out(task.current, currentBtn, $('.frame_current'));
        localStorage.setItem('ToDoo', JSON.stringify(task));
    }

//-----Function delete task-----
    function deleteTask(index, tab, elem) {
        task.deleted.push(task[tab][index]);
        task[tab].splice(index, 1);
        elem.remove(index);
        out(task.deleted, deleteBtn, $('.frame_delete'));
        localStorage.setItem('ToDoo', JSON.stringify(task));
    }

    //-----Function complete-----
    function completeTask(index, elem) {
        var completedTask = task.current[index];
        task.current.splice(index, 1);
        elem.remove(index);
        task.completed.push(completedTask);
        out(task.completed, completeBtn, $('.frame_complete'));
        localStorage.setItem('ToDoo', JSON.stringify(task));
    }

//-----Add new task-----
    function addTask() {
        NewTask = {};

        NewTask.name = $(".form-group input[name='name']").val();
        NewTask.describe = $(".form-group textarea[name='describe']").val();
        NewTask.priority = $("input[name='priority']:checked").val();
        task.current.push(NewTask);
        $('.close').trigger('click');
        out(task.current, currentBtn, $('.frame_current'));
        localStorage.setItem('ToDoo', JSON.stringify(task));
    };

    function out(data,  buttons, tab) {
        var outCreate = '';
        for (var i = 0; i < data.length; i++) {
            outCreate += '<section class="task">' + '<div class="inline_first">' + data[i].priority + '</div>' + '<div class="inline_second">' +
                '<div class="name">' + data[i].name + '</div>' + '<div class="describe">' + data[i].describe + '</div>' + buttons + '</section>';
        }
        tab.html(outCreate);
        colorTable()
    }
    function validate() {
        if (names.value) {
             $("#recipient-name").css('border','1px solid #ced4da')
            addTask()
            counterPlus() 
        }
        else{
            $("#recipient-name").css('border','1px solid red')
        }
        names.value = '';
        describes.value = '';
    }

    function colorTable() {
        var inline_first = $('.inline_first');
        for (var i = 0; i < inline_first.length; i++) {
            if (inline_first[i].innerHTML === 'trial') {
                $(inline_first[i].closest('section')).css('background-color', '#DBFFA4')
            }
            if (inline_first[i].innerHTML === 'urgent') {
                $(inline_first[i].closest('section')).css('background-color', '#FFA4A4')
            }
            if (inline_first[i].innerHTML === 'perpetual') {
                $(inline_first[i].closest('section')).css('background-color', '#FFE6A4')
            }
        }
    }

    function reload(event) {
        location.reload()
    };

}

todo()
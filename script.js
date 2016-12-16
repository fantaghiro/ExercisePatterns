window.onload = function(){
    var contentParas = [].slice.call(document.getElementsByClassName('content'));
    var chunkChoices = [].slice.call(document.getElementsByClassName('chunkChoice'));
    var errorCorrections = [].slice.call(document.getElementsByClassName('errorCorrection'));
    var brainstorms = [].slice.call(document.getElementsByClassName('brainstorm'));
    var chunksCount;
    var choiceItems;
    var chunk;

    /*添加每个chunk前面的编号，将总共有多少chunks的数量绑到每个.content.paragraph上*/
    contentParas.forEach(function(contentNode, idx){
        var chunks = [].slice.call(contentNode.getElementsByClassName('chunk'));
        chunks.forEach(function(chunk, idx){
            var no = document.createElement('span');
            no.textContent = '' + (idx + 1);
            no.className = 'chunkNo';
            chunk.insertBefore(no, chunk.childNodes[0]);
            chunk.id = contentNode.parentNode.id + '-' + (idx + 1);
        })
        contentNode.parentNode.chunkCount = chunks.length;
    })

    /*为每一个问题下面自动添加选项*/
    chunkChoices.forEach(function(chunkChoice, idx){
        exNode = document.getElementById(chunkChoice.dataset.exid);
        chunkCount = exNode.chunkCount;
        choices = document.createElement('div');
        choices.dataset.exid= exNode.id;
        choices.className = 'chunkChoices';
        for(var i = 0; i < chunkCount; i++){
            var span = document.createElement('span');
            span.textContent = i + 1 + '';
            span.className = 'choiceItem';
            choices.appendChild(span);
        }
        chunkChoice.appendChild(choices);
    });

    choiceItems = [].slice.call(document.getElementsByClassName('choiceItem'));

    /*为每一个选项添加提示文本中语块的效果*/
    choiceItems.forEach(function(choiceItem, idx){

        /*用mouseenter和mouseleave模拟hover效果*/
        choiceItem.addEventListener('mouseover', function(ev){
            ev.stopPropagation();
            chunk = document.getElementById(choiceItem.parentNode.dataset.exid + '-' + (Number(choiceItem.textContent)));
            chunk.className += ' highlight';
        }, false);

        choiceItem.addEventListener('mouseleave', function(ev){
            ev.stopPropagation();
            chunk = document.getElementById(choiceItem.parentNode.dataset.exid + '-' + (Number(choiceItem.textContent)));
            chunk.className = chunk.className.replace(/ highlight/, '');
        }, false);

        /*点击某个选项时*/
        choiceItem.addEventListener('click', function(ev){
            var siblingChoiceItems = [].slice.call(choiceItem.parentNode.getElementsByClassName('choiceItem'));

            /*单选题时*/
            if(/singleChoice/.test(choiceItem.parentNode.parentNode.className)){
                siblingChoiceItems.forEach(function(elem){
                    elem.className = elem.className.replace(/( highlight| choiceSelected)/, '');
                })
                choiceItem.className += ' choiceSelected';
            }
            /*多选题时*/
            else if(/multiChoices/.test(choiceItem.parentNode.parentNode.className)){
                if(/ choiceSelected/.test(choiceItem.className)){
                    choiceItem.className = choiceItem.className.replace(/ choiceSelected/, '')
                } else {
                        choiceItem.className += ' choiceSelected';
                    };
                }
            /*删除题时*/
            else if(/deleteChoices/.test(choiceItem.parentNode.parentNode.className)){
                chunk = document.getElementById(choiceItem.parentNode.dataset.exid + '-' + (Number(choiceItem.textContent)));
                if(/ choiceSelected/.test(choiceItem.className)){
                    choiceItem.className = choiceItem.className.replace(/ choiceSelected/, '');
                    chunk.className = chunk.className.replace(/ chunkDeleted/, '');
                } else {
                    choiceItem.className += ' choiceSelected';
                    chunk.className += ' chunkDeleted';
                };
            }
        }, false);
    });

    /*改错题*/
    errorCorrections.forEach(function(errorCorrection, idx){
       var originalText = errorCorrection.textContent;
       console.log(originalText);
       errorCorrection.addEventListener('focus', function(ev){
           errorCorrection.innerHTML = originalText;
       })
       errorCorrection.addEventListener('blur', function(ev){
           var newText = errorCorrection.textContent;
           console.log(originalText, newText);
           errorCorrection.innerHTML = diffString(originalText, newText);
       });
    });

    /*brainstorm中的题目*/
    brainstorms.forEach(function(brainstorm, idx){
        brainstorm.addEventListener('keyup', function(ev){
            var text = brainstorm.value;
            var ideas;
            if(ev.keyCode == 188){
                ideas = [].slice.call(text.split(','));
                ideas.forEach(function(idea, idx){

                })
            }
        })
    })
};
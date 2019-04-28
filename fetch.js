const sendButton = document.getElementById('fetchReposBtn');
sendButton.addEventListener('click', (e) => {
    const userName = document.getElementById('targetUserTxt').value;
    fetchRepos(userName);

    e.preventDefault();
});

const reposList = document.getElementById('reposList');

function printRepoList() {
    var responseObj = JSON.parse(this.responseText);  
    p=document.getElementById('error-message');
    if(responseObj.length==0){
        reposList.innerHTML='';
       p.innerHTML="Error! The id is not valid!";
    }
    else{
        p.innerHTML='';
        while(reposList.firstChild) {
            reposList.removeChild(responseObj);
        }
        CreateElement(responseObj);
    }
}

function CreateElement(responseObj){
    var div = document.createElement('div'); 
    div.className ='list-group';
    div.id='list-tab';
    div.role='tablist';
    reposList.appendChild(div);   
    var img=document.createElement('img');
    owner=responseObj[0].owner;
    img.className='rounded';
    img.src=owner.avatar_url;
    div.appendChild(img);             
    for (var i = 0,l = responseObj.length; i < l; i++) {
        var a = document.createElement('a');
        a.addEventListener("click", function(e){
            e.preventDefault();
            var str=e.target.href;
            var res=str.split("/");
            getReposDetails(e.target.innerText,res[3]);
        });
        a.className ='list-group-item list-group-item-action';
        a.href=responseObj[i].html_url;
        a.role='tab';
        div.appendChild(a); 
        a.innerHTML += responseObj[i].name;
    }
}

function fetchRepos(userName){
    var address = 'https://api.github.com/users/' + userName + '/repos';
    var request = new XMLHttpRequest();
    request.onload = printRepoList;        
    request.open('get', address, true);
    request.send();
}

function getReposDetails(resposname,githubid){
    const userName = document.getElementById('targetUserTxt').value;
    var address='https://api.github.com/repos/'+githubid+'/'+resposname;
    var request = new XMLHttpRequest();
    request.onload = printRepoDetails;        
    request.open('get', address, true);
    request.send();
}

function printRepoDetails(){
    var responseObj = JSON.parse(this.responseText);
    var forks =document.getElementById('forks');
    var date =document.getElementById('date');
    var link =document.getElementById('link');
    forks.innerHTML='Forks: '+responseObj.forks;
    link.innerHTML='Open The Page';
    link.href=responseObj.html_url;
    var dt = new Date(responseObj.created_at);
    var dtm = dt.getMonth();
    date.innerHTML='Create Date: '+dtm+' months ago';
    document.getElementById("stars").innerHTML = 'Rating: '+getStars(responseObj.stargazers_count);

}

function getStars(rating) {

  let output = [];
  if (rating!=0)
  {
    for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true"></i>&nbsp;');   
  }
  else
  {
      output.push('None');
  }
  return output.join('');

}


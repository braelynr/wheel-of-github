
// const btnRepos = document.getElementById("btnIssue")
// btnRepos.addEventListener("click", getRepos)


async function getRepos() {
    clear();

    const url = "https://api.github.com/search/repositories?q=language:" + lang + " good-first-issues:>1";
    console.log(url);
    const response = await fetch(url)
    const result = await response.json()
    var max = result.items.length;

    const rand = Math.floor(Math.random() * max);
    console.log(rand);
    console.log(max);

    const repoNameSpan = document.getElementById("repo-name")
    const anchor = document.createElement("a")
    anchor.href = result.items[rand].html_url;
    anchor.textContent = result.items[rand].full_name;
    repoNameSpan.appendChild(anchor)
    repoNameSpan.appendChild(document.createElement("br"))

    await getIssues(result.items[rand].full_name);


}

async function getIssues( repoName) {
    const url = "https://api.github.com/repos/" + repoName + "/issues?q=state:open type:issue"
    const response = await fetch(url)
    const result = await response.json()
    var max = result.length;

    const rand = Math.floor(Math.random() * max);

    const issueNameSpan = document.getElementById("issue-name");
    const anchor = document.createElement("a")
    anchor.href = result[rand].html_url;
    anchor.textContent = result[rand].title;
    issueNameSpan.appendChild(anchor)
    issueNameSpan.appendChild(document.createElement("br"))
    $("#exampleModalCenter").modal()

}

function clear(){
    const repoNameSpan = document.getElementById("repo-name")
    while(repoNameSpan.firstChild) {
        repoNameSpan.removeChild(repoNameSpan.firstChild);
    }

    const issueNameSpan = document.getElementById("issue-name");
    while(issueNameSpan.firstChild) {
        issueNameSpan.removeChild(issueNameSpan.firstChild)
    }
}

function rotateFunction(){
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";

    setTimeout(function(){
        lang = document.getElementById("languages").value;
        getRepos();
      }, 5000);

  }
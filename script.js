async function getPinnedRepos(f) {
    await fetch("https://gh-pinned-repos.egoist.dev/?username=YuriShimoi")
    .then((res) => res.json()).then((data) => {
        return f(data);
    });
}

function clickItem(e) {
    return e.getElementsByTagName('a')[0].click();
}

function buildProjectItem(title, description, link, stars=0) {
    let pitem = buildHTML("DIV", null, "project-item", (e) => {clickItem(e)});

    let primg = buildHTML("IMG");
    primg.src = "images/githubpage.png";

    let telem = buildHTML("H1");
    let tlink = buildHTML("A");
    tlink.href      = link;
    tlink.target    = "_target";
    tlink.innerHTML = title;
    if(stars > 0) tlink.innerHTML += `<span class="project-starts">${stars}</span>`;

    let resum = buildHTML("DIV", null, "project-resume");
    resum.innerHTML = description?? " ";
    
    pitem.appendChild(primg);

    telem.appendChild(tlink);
    pitem.appendChild(telem);

    pitem.appendChild(resum);

    return pitem;
}

function buildHTML(element, eid=null, classes=null, onclick=null) {
    let new_element = document.createElement(element);
    if(eid)     new_element.id = eid;
    if(classes) new_element.classList.add(classes);
    if(onclick) new_element.onclick = () => {onclick(new_element)};
    return new_element;
}

getPinnedRepos((repos) => {
    let plist = document.getElementById("pinned-projects");
    plist.innerHTML = "";
    for(let r in repos) {
        let rep = repos[r];
        plist.appendChild(buildProjectItem(rep.repo, rep.description, rep.link, rep.stars));
    }
});
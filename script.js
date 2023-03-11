// initialize the variables
const get = (id) => document.getElementById(`${id}`);

const searchBar = get("searchInput");
const searchbtn = get("search-btn");
const searchInput = get("searchInput");
const profileName = get("profileName");
const userName = get("username");
const avatar = get("avatar");
const bio = get("bio");
const joinDate = get("joinDate");
const repoCount = get("repo"); 
const followerCount = get("followers");
const followingCount = get("following");
const userlocation = get("location");
const twitterId = get("twitterLink");
const companyName = get("company");
const portfolioLink = get("portfolioLink");
const url = "https://api.github.com/users/";
 
const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* in case of an error */
const noResultText = get("noResultText");


/* initializing */
getUserData("nishantwhiz");

async function updateProfile(data){
    avatar.src = data.avatar_url;
    profileName.innerText = data.name;
    userName.innerText = "@"+data.login;
    userName.href = data.html_url;
    bio.innerText = data.bio ? data.bio : "This profile has no bio";

    let date = data.created_at.split("T").shift().split("-");
    joinDate.innerText = `Joined ${date[2]} ${months[parseInt(date[1])]} ${date[0]}`

    repoCount.innerText = data.public_repos;
    followerCount.innerText = data.followers;
    followingCount.innerText = data.following;
    userlocation.innerText = data.location ? data.location : "Not Available";
    companyName.innerText = data.company ? data.company : "Not Available";
    if(data.twitter_username){
        twitterId.innerText = data.twitter_username;
        twitterId.href = "https://twitter.com/" + data.twitter_username;
    }
    else{
        twitterId.innerText = "Not Available";
        twitterId.href = "#"
    }
    if(data.blog){
        portfolioLink.innerText = portfolioLink.href = data.blog;
        portfolioLink.target = "_blank";
    }
    else{
        portfolioLink.innerText = "Not Available";
        portfolioLink.href = "#"
        portfolioLink.target = "";
    }
}


function getUserData(userId){
    const finalUrl = url+userId;

    fetch(finalUrl)
    .then(        
        data => {
            if(!data.ok) throw Error(data.status);
            return data.json();
        }
    )
    .then(
        (data) => {
            // console.log(data);
            updateProfile(data);
        }        
    )
    .catch(
        e=>{
            if(e.message==404){
                noResultText.style.display = "block";
                noResultText.innerText = "No results found!";
                return;
            }
            noResultText.style.display = "block";
            noResultText.innerText = "error occurred!"
            console.log(e);
        }
    )
}



/* event listeners */
searchbtn.addEventListener("click", ()=>{
    if(searchInput.value!=""){
        getUserData(searchInput.value);
    }
}
)


searchBar.addEventListener("input", ()=>{
    noResultText.style.display = "none";
})
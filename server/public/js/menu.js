var highlightedId="0";

$("nav").click((e)=>{
    highlightedId=e.target.id;
    alert("Target id:" + e.target.id);
    resetActive();
});
function resetActive(){
        alert("Start");
        $("a.nav-link").each(function() {
            $( this ).addClass("F");
            console.log("1");
          });
    alert("Koniec");
}